import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Model, type PaginateModel } from 'mongoose';
import { CompanyDocument } from '../companies/company.schema';
import { UserDocument } from '../users/user.schema';
import { JobDocument } from '../jobs/jobs.schema';
import { ApplicationsCsvExporter } from './exporters/applications-csv.exporter';
import { ApplicationsXlsxExporter } from './exporters/applications-xlsx.exporter';
import { S3Uploader } from 'src/common/utils/s3-uploader';
import { Application, ApplicationDocument } from './applications.schema';
import { ApplicationQueryDto } from './dto/application-query.dto';
import { buildApplicationFilter } from './filters/applications.filters';
import { buildApplicationSort } from './filters/applications.sort';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { parseFileContent } from '../common/utils/fileParser';
import { buildCandidateResumeParsingPrompt } from 'src/ai/prompts/candidate-resume-parsing.prompt';
import { AIService } from '../ai/ai.service';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel(Application.name)
    private readonly applicationModel: PaginateModel<ApplicationDocument>,
    @InjectModel('Company')
    private readonly companyModel: Model<CompanyDocument>,
    @InjectModel('Job')
    private readonly jobModel: Model<JobDocument>,
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
    @Inject()
    private readonly aiService: AIService,
    private readonly csvExporter: ApplicationsCsvExporter,
    private readonly xlsxExporter: ApplicationsXlsxExporter,
    private readonly s3Uploader: S3Uploader,
    @Inject('CACHE_MANAGER') private cache: any,
  ) {}

  private readonly logger = new Logger(ApplicationsService.name);

  async getCompanyApplications(companyId: string, query: ApplicationQueryDto) {
    const company = await this.getCompanyOrThrow(companyId);
    const filter = buildApplicationFilter(company, query);
    const sort = buildApplicationSort(query);

    return this.applicationModel.paginate(filter, {
      page: query.page || 1,
      limit: query.limit || 10,
      sort,
      populate: [
        {
          path: 'job',
          select: 'title',
          populate: { path: 'department', select: 'title' },
        },
        { path: 'user', select: 'name' },
      ],
      lean: true,
      leanWithVirtuals: true,
    } as any);
  }

  async createApplication(
    companyId: string,
    user: { sub: string },
    dto: CreateApplicationDto,
    file?: Express.Multer.File,
  ) {
    const company = await this.getCompanyOrThrow(companyId);
    const userId = await this.getUserOrThrow(user.sub);
    const job = await this.getJobOrThrow(dto.job);

    let resumeUrl = dto.resumeUrl;
    if (file && this.s3Uploader.isS3Configured()) {
      resumeUrl = await this.uploadResumeToS3(companyId, dto.email, file);
    }

    if (dto.appliedAt && new Date(dto.appliedAt) > new Date()) {
      throw new UnprocessableEntityException({
        message: 'Validation failed',
        errors: [
          {
            field: 'appliedAt',
            errors: ['Applied date cannot be in the future'],
          },
        ],
      });
    }

    const application = await this.applicationModel.create({
      fullName: dto.fullName,
      email: dto.email,
      phoneNumber: dto.phoneNumber,
      linkedInUrl: dto.linkedInUrl,
      resumeUrl,
      country: dto.country,
      city: dto.city,
      job: job,
      status: dto.status || 'applied',
      stage: dto.stage || 'screening',
      source: dto.source,
      referalName: dto.referalName,
      referalEmail: dto.referalEmail,
      appliedAt: dto.appliedAt ?? new Date().toISOString(),
      company: company,
      user: userId,
    });

    return application;
  }

  async getApplicationById(applicationId: string, companyId: string) {
    const cachedApplication = await this.getCachedApplication(
      applicationId,
      companyId,
    );
    if (cachedApplication) return cachedApplication;

    const application = await this.applicationModel
      .findById(applicationId)
      .populate([{ path: 'job', select: 'title' }]);
    if (!application) throw new BadRequestException('Application not found');

    if (application.company?.toString() !== companyId) {
      throw new ForbiddenException('Access to this resource is forbidden');
    }

    await this.cache.set(
      this.getCacheKey(applicationId),
      application,
      60 * 1000,
    );

    return application;
  }

  async updateApplication(
    applicationId: string,
    companyId: string,
    dto: UpdateApplicationDto,
    file?: Express.Multer.File,
  ) {
    const application = await this.applicationModel.findOne({
      _id: applicationId,
      company: companyId,
    });
    if (!application)
      throw new ForbiddenException('Access to this resource is forbidden');

    let resumeUrl = application.resumeUrl;
    if (file && this.s3Uploader.isS3Configured()) {
      await this.deleteResumeFromS3(resumeUrl || '');
      resumeUrl = await this.uploadResumeToS3(companyId, dto.email, file);
    }

    dto.resumeUrl = resumeUrl;
    await this.applicationModel.updateOne(
      { _id: applicationId },
      { $set: dto },
    );
    const updatedApplication =
      await this.applicationModel.findById(applicationId);

    await this.cache.set(
      this.getCacheKey(applicationId),
      updatedApplication,
      60 * 1000,
    );

    return updatedApplication;
  }

  async deleteApplication(applicationId: string, companyId: string) {
    const application = await this.applicationModel.findOne({
      _id: applicationId,
      company: companyId,
    });
    if (!application)
      throw new ForbiddenException('Access to this resource is forbidden');

    if (application.resumeUrl) {
      await this.deleteResumeFromS3(application.resumeUrl);
    }

    const job = application.job?.toString() || '';

    await this.applicationModel.deleteOne({ _id: applicationId });

    if (job) {
      await this.jobModel.updateOne(
        { _id: job },
        { $inc: { applicationsCount: -1 } },
      );
    }

    await this.cache.del(this.getCacheKey(applicationId));

    return { message: 'Application deleted successfully' };
  }

  async exportApplications(
    companyId: string,
    format: 'csv' | 'xlsx',
    query: ApplicationQueryDto,
  ) {
    const company = await this.getCompanyOrThrow(companyId);
    const filter = buildApplicationFilter(company, query);
    const sort = buildApplicationSort(query);

    const applications = await this.applicationModel
      .find(filter)
      .sort(sort)
      .populate([
        { path: 'job', select: 'title' },
        { path: 'company', select: 'name' },
      ])
      .lean();

    const exportRows = applications.map((application: any) => ({
      ...application,
      jobTitle: application?.job?.title ?? '',
      companyName: application?.company?.name ?? '',
    }));

    if (format === 'xlsx') {
      return this.xlsxExporter.export(exportRows);
    }

    return this.csvExporter.export(exportRows);
  }

  async updateApplicationStatus(
    applicationId: string,
    companyId: string,
    status: string,
  ) {
    const application = await this.applicationModel.findById(applicationId);

    if (!application) throw new BadRequestException('Application not found');

    if (application.company?.toString() !== companyId) {
      throw new ForbiddenException('Access to this resource is forbidden');
    }

    await this.applicationModel.updateOne(
      { _id: applicationId },
      { $set: { status } },
    );

    const updatedApplication =
      await this.applicationModel.findById(applicationId);

    await this.cache.set(
      this.getCacheKey(applicationId),
      updatedApplication,
      60 * 1000,
    );

    return updatedApplication;
  }

  async updateApplicationStage(
    applicationId: string,
    companyId: string,
    stage: string,
  ) {
    const application = await this.applicationModel.findById(applicationId);

    if (!application) throw new BadRequestException('Application not found');

    if (application.company?.toString() !== companyId) {
      throw new ForbiddenException('Access to this resource is forbidden');
    }

    await this.applicationModel.updateOne(
      { _id: applicationId },
      { $set: { stage } },
    );

    const updatedApplication =
      await this.applicationModel.findById(applicationId);

    await this.cache.set(
      this.getCacheKey(applicationId),
      updatedApplication,
      60 * 1000,
    );

    return updatedApplication;
  }

  async getApplicationsJobs(companyId: string) {
    const company = await this.getCompanyOrThrow(companyId);
    const cachedJobs = await this.cache.get(
      this.getApplicationsJobsCacheKey(company),
    );

    if (cachedJobs) {
      return cachedJobs;
    }

    const jobs = await this.jobModel
      .find({
        company: company,
        status: {
          $in: ['published', 'closed'],
        },
      })
      .select('title');

    await this.cache.set(
      this.getApplicationsJobsCacheKey(company),
      jobs,
      60 * 1000,
    );

    return jobs;
  }

  async parseCandidateResume(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const content = await parseFileContent(file);

    if (!content) {
      throw new BadRequestException('Unable to parse file content');
    }

    const email = content.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0];
    const phone = content.match(
      /(\+?\d{1,3})?[\s.-]?\(?\d{2,3}\)?[\s.-]?\d{3,4}[\s.-]?\d{4}/,
    )?.[0];

    const prompt = buildCandidateResumeParsingPrompt(content, email, phone);
    const candidateInfo = await this.aiService.run({
      prompt,
      temperature: 0.2,
      maxTokens: 600,
      feature: 'generic',
    });
    const cleaned = this.getCleanedAiResponse(candidateInfo);
    const parsedResponse = this.parsedAiResponse(cleaned);

    return {
      fullName: parsedResponse.fullName ?? null,
      email: parsedResponse.contactInformation?.email ?? parsedResponse.email ?? null,
      phone: parsedResponse.contactInformation?.phoneNumber ?? parsedResponse.phone ?? null,
      linkedin: parsedResponse.links?.linkedin ?? null,
      github: parsedResponse.links?.github ?? null,
      portfolio: parsedResponse.links?.portfolio ?? null,
      country: parsedResponse.location?.country ?? null,
      city: parsedResponse.location?.city ?? null,
    };
  }

  private async getCachedApplication(applicationId: string, companyId: string) {
    const cachedApplication = await this.cache.get(
      this.getCacheKey(applicationId),
    );
    if (!cachedApplication) return null;

    // if (cachedApplication.company?._id?.toString() !== companyId) {
    //   throw new ForbiddenException('Access to this resource is forbidden');
    // }

    return cachedApplication;
  }

  private getCacheKey(applicationId: string) {
    return `application:${applicationId}`;
  }

  private getApplicationsJobsCacheKey(companyId: string) {
    return `${companyId}:applications:jobs`;
  }

  private getCleanedAiResponse(response: any) {
    const firstBrace = response.indexOf('{');
    const lastBrace = response.lastIndexOf('}');

    if (firstBrace === -1 || lastBrace === -1) return null;

    return response.slice(firstBrace, lastBrace + 1);
  }

  private parsedAiResponse(response: any) {
    let parsed: any;
    console.log('AI Response:', response);
    try {
      parsed = JSON.parse(response);
    } catch (err) {
      throw new Error('Invalid AI JSON response');
    }

    return parsed;
  }

  private async getCompanyOrThrow(companyId: string) {
    const company = await this.companyModel.findById(companyId);
    if (!company) throw new BadRequestException('Company not found');

    return companyId;
  }

  private async uploadResumeToS3(
    companyId: string,
    email: string | undefined,
    file: Express.Multer.File,
  ) {
    return this.s3Uploader.upload({
      file,
      keyPrefix: `applications/resumes/${companyId}`,
      metadata: { email: email || '' },
      acl: 'private',
      errMessage: 'Resume is required and must be a valid file',
    });
  }

  private async deleteResumeFromS3(resumeUrl: string) {
    if (!this.s3Uploader.isS3Configured()) return;

    const url = new URL(resumeUrl);
    const key = url.pathname.substring(1); //=== remove leading '/'

    return await this.s3Uploader.delete(key);
  }

  private async getUserOrThrow(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new BadRequestException('User not found');
    return userId;
  }

  private async getJobOrThrow(jobId: string) {
    const job = await this.jobModel.findById(jobId);
    if (!job) throw new BadRequestException('Job not found');
    return jobId;
  }
}
