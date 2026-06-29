import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Model, type PaginateModel } from 'mongoose';
import { Job, JobDocument } from './jobs.schema';
import { JobQueryDto } from './dto/job-query.dto';
import { buildJobFilter } from './filters/jobs.filters';
import { buildJobSort } from './filters/jobs.sort';
import { CompanyDocument } from '../companies/company.schema';
import { UserDocument } from '../users/user.schema';
import { CreateJobDto } from './dto/create-job.dto';
import { DepartmentDocument } from '../departments/departments.schema';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobsCsvExporter } from './exporters/jobs-csv.exporter';
import { JobsXlsxExporter } from './exporters/jobs-xlsx.exporter';
import { UpdateJobStatusDto } from './dto/update-job-status.dto';
import { GenerateJobDto } from './dto/generate-job.dto';
import { buildJobDescriptionPrompt } from 'src/ai/prompts/job-description.prompt';
import { AIService } from 'src/ai/ai.service';
import { JobStatus } from './types/jobs.types';
import { SavedJobs, SavedJobsDocument } from './saved-jobs-schema';
import { Cache } from '@nestjs/cache-manager';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name)
    private readonly jobModel: PaginateModel<JobDocument>,
    @InjectModel(SavedJobs.name)
    private readonly savedJobsModel: PaginateModel<SavedJobsDocument>,
    @InjectModel('Company')
    private readonly companyModel: Model<CompanyDocument>,
    @InjectModel('Department')
    private readonly departmentModel: Model<DepartmentDocument>,
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
    private readonly csvExporter: JobsCsvExporter,
    private readonly xlsxExporter: JobsXlsxExporter,
    private readonly aiService: AIService,
    @Inject('CACHE_MANAGER') private cache: Cache,
  ) {}

  private readonly logger = new Logger(JobsService.name);

  async findPublicJobs(query: JobQueryDto, user: { sub: string } | null) {
    const filter = buildJobFilter(query);
    const sort = buildJobSort(query);
    filter.status = JobStatus.PUBLISHED;

    const paginatedResult = await this.jobModel.paginate(filter, {
      page: query.page || 1,
      limit: query.limit || 10,
      sort,
      select: '-user -description',
      populate: [
        { path: 'department', select: 'title' },
        { path: 'company', select: 'name' },
      ],
      lean: true,
      leanWithVirtuals: true,
    } as any);

    if (!user || !user.sub) return paginatedResult;

    const savedJobs = await this.savedJobsModel
      .find({ user: user.sub })
      .select('job')
      .lean();
    const savedJobIdsSet = new Set(savedJobs.map((sj) => sj.job.toString()));

    paginatedResult.docs = paginatedResult.docs.map((job: any) => ({
      ...job,
      saved: savedJobIdsSet.has(job._id.toString()),
    }));

    return paginatedResult;
  }

  async getCompanyJobs(companyId: string, query: JobQueryDto) {
    const company = await this.getCompanyOrThrow(companyId);
    const filter = buildJobFilter(query, company);
    const sort = buildJobSort(query);

    return await this.jobModel.paginate(filter, {
      page: query.page || 1,
      limit: query.limit || 10,
      sort,
      select: '-description -user',
      populate: [{ path: 'department', select: 'title' }],
      lean: true,
      leanWithVirtuals: true,
    } as any);
  }

  async createJob(companyId: string, user: { sub: string }, dto: CreateJobDto) {
    const company = await this.getCompanyOrThrow(companyId);
    const userId = await this.getUserorThrow(user.sub);
    const department = await this.getDepartmentOrThrow(dto.department);

    const job = await this.jobModel.create({
      title: dto.title,
      description: dto.description,
      country: dto.country,
      city: dto.city,
      status: dto.status,
      employmentType: dto.employmentType,
      experienceLevel: dto.experienceLevel,
      isRemote: dto.isRemote,
      salaryMin: dto.salaryMin,
      salaryMax: dto.salaryMax,
      company: company,
      department: department,
      user: userId,
    });

    return job;
  }

  async getJobById(jobId: string, companyId: string) {
    const chachedJob = await this.getCachedJob(jobId, companyId);
    if (chachedJob) return chachedJob;

    const job = await this.jobModel.findById(jobId);
    if (!job) throw new BadRequestException('Job not found');

    if (job.company?.toString() !== companyId.toString()) {
      throw new ForbiddenException('Access to this resource is forbidden');
    }

    await job.populate([
      { path: 'department', select: 'title' },
      { path: 'company', select: 'name' },
    ]);

    await this.cache.set(this.getCacheKey(jobId), job, 60 * 1000);

    return job;
  }

  async getPublicJobById(jobId: string, user: { sub: string } | null) {
    const cachedJob = await this.cache.get(this.getCacheKey(jobId));
    if (cachedJob) return cachedJob;

    const selectedJob = await this.jobModel
      .findOne({
        _id: jobId,
        status: 'published',
      })
      .select('-user -__v')
      .populate([
        { path: 'department', select: 'title' },
        { path: 'company', select: 'name' },
      ])
      .lean({ virtuals: true });

    if (!selectedJob)
      throw new BadRequestException(
        'Selected job not found or not available. It may have been removed or is not published.',
      );

    if (!user) {
      await this.cache.set(this.getCacheKey(jobId), selectedJob, 60 * 1000);
      return selectedJob;
    }

    const userId = await this.getUserorThrow(user.sub);
    const isSaved = await this.savedJobsModel.exists({
      job: jobId,
      user: userId,
    });

    const job = {
      ...selectedJob,
      saved: !!isSaved,
    };

    await this.cache.set(this.getCacheKey(jobId), job, 60 * 1000);
    return job;
  }

  async saveJob(jobId: string, user: { sub: string }) {
    const job = await this.jobModel
      .findOne({
        _id: jobId,
        status: 'published',
      })
      .select('_id')
      .lean();

    if (!job)
      throw new BadRequestException(
        'Selected job not found or not available. It may have been removed or is not published.',
      );

    const userId = await this.getUserorThrow(user.sub);

    try {
      const result = await this.savedJobsModel.findOneAndUpdate(
        { job: job._id.toString(), user: userId },
        { $setOnInsert: { job: job._id.toString(), user: userId } },
        {
          upsert: true,
          new: true,
          rawResult: true,
          includeResultMetadata: true,
        },
      );

      if (!result.lastErrorObject?.upserted) {
        throw new BadRequestException(
          'This job is already saved to your list.',
        );
      }
    } catch (error: any) {
      if (error.code === 11000) {
        throw new BadRequestException(
          'This job is already saved to your list.',
        );
      }
      throw error;
    }

    await this.cache.del(this.getCacheKey(jobId));

    return { message: 'Job saved with success.', saved: true };
  }

  async unsaveJob(jobId: string, user: { sub: string }) {
    const userId = await this.getUserorThrow(user.sub);

    const deletedDoc = await this.savedJobsModel.findOneAndDelete({
      job: jobId,
      user: userId,
    });

    if (!deletedDoc) {
      throw new BadRequestException('This job is not saved in your list.');
    }

    await this.cache.del(this.getCacheKey(jobId));

    return {
      message: 'Job removed from saved list successfully.',
      unsaved: true,
    };
  }

  async findSavedJobs(query: JobQueryDto, user: { sub: string }) {
    const userId = await this.getUserorThrow(user.sub);
    if (!userId) throw new UnauthorizedException();

    const filter = buildJobFilter(query);
    const sort = buildJobSort(query);
    filter.user = userId;

    return await this.savedJobsModel.paginate(filter, {
      page: query.page || 1,
      limit: query.limit || 10,
      sort,
      select: '-user -description',
      populate: [
        {
          path: 'job',
          select: '-description -user -__v',
          populate: [
            { path: 'department', select: 'title' },
            { path: 'company', select: 'name' },
          ],
        },
      ],
      lean: true,
      leanWithVirtuals: true,
    } as any);
  }

  async updateJob(jobId: string, companyId: string, dto: UpdateJobDto) {
    const job = await this.jobModel.findOne({ _id: jobId, company: companyId });
    if (!job)
      throw new ForbiddenException('Access to this resource is forbidden');

    await this.jobModel.updateOne({ _id: jobId }, { $set: dto });
    const updatedJob = await this.jobModel.findById(jobId);

    await this.cache.set(this.getCacheKey(jobId), updatedJob, 60 * 1000);

    return updatedJob;
  }

  async incrementApplicationsCount(jobId: string) {
    const job = await this.jobModel.findById(jobId);
    if (!job) throw new BadRequestException('Job not found');

    job.applicationsCount = (job.applicationsCount || 0) + 1;
    await job.save();

    return job;
  }

  async incrementViewsCount(jobId: string) {
    const job = await this.jobModel.findById(jobId);
    if (!job) throw new BadRequestException('Job not found');

    job.viewsCount = (job.viewsCount || 0) + 1;
    await job.save();

    return job;
  }

  async deleteJob(jobId: string, companyId: string) {
    const job = await this.jobModel.findOne({ _id: jobId, company: companyId });
    if (!job)
      throw new ForbiddenException('Access to this resource is forbidden');

    await this.jobModel.deleteOne({ _id: jobId });

    await this.cache.del(this.getCacheKey(jobId));

    return { message: 'Job deleted successfully' };
  }

  async exportJobs(
    companyId: string,
    format: 'csv' | 'xlsx',
    query: JobQueryDto,
  ) {
    const company = await this.getCompanyOrThrow(companyId);
    const filter = buildJobFilter(query, company);
    const sort = buildJobSort(query);

    const jobs = await this.jobModel
      .find(filter)
      .sort(sort)
      .populate([{ path: 'department', select: 'title' }])
      .lean();

    const exportRows = jobs.map((job: any) => ({
      ...job,
      departmentTitle: job?.department?.title ?? '',
    }));

    if (format === 'xlsx') {
      return this.xlsxExporter.export(exportRows);
    }

    return this.csvExporter.export(exportRows);
  }

  async updateJobStatus(
    jobId: string,
    companyId: string,
    dto: UpdateJobStatusDto,
  ) {
    const job = await this.jobModel.findById(jobId);

    if (!job) throw new BadRequestException('Job not found');

    if (job.company?.toString() !== companyId.toString()) {
      throw new ForbiddenException('Access to this resource is forbidden');
    }

    await this.jobModel.updateOne({ _id: jobId }, { $set: dto });

    // Clear the cache to force fresh fetch on next read
    await this.cache.del(this.getCacheKey(jobId));

    const updatedJob = await this.jobModel.findById(jobId);

    return updatedJob;
  }

  async getCompanyDepartments(companyId: string) {
    const company = await this.getCompanyOrThrow(companyId);

    const cachedDepartments = await this.cache.get(
      this.getCompanyDepartmentsCacheKey(company),
    );

    if (cachedDepartments) {
      return cachedDepartments;
    }

    const departments = await this.departmentModel
      .find({ company })
      .select('title _id')
      .lean();

    await this.cache.set(
      this.getCompanyDepartmentsCacheKey(company),
      departments,
      60 * 1000,
    );

    return departments;
  }

  async getGeneratedJobDescription(dto: GenerateJobDto) {
    const prompt = buildJobDescriptionPrompt(dto);

    const text = await this.aiService.run({
      prompt,
      maxTokens: 1000,
      feature: 'job-description',
      temperature: 0.7,
    });

    return {
      context: text,
    };
  }

  private async getCachedJob(jobId: string, companyId: string) {
    const cachedJob = await this.cache.get(this.getCacheKey(jobId));
    if (!cachedJob) return null;

    return cachedJob;
  }

  private getCompanyDepartmentsCacheKey(companyId: string) {
    return `${companyId}:jobs:departments`;
  }

  private getCacheKey(jobId: string) {
    return `job:${jobId}`;
  }

  private async getCompanyOrThrow(companyId: string) {
    const company = await this.companyModel.findById(companyId);
    if (!company) throw new BadRequestException('Company not found');

    return companyId;
  }

  private async getUserorThrow(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new BadRequestException('User not found');
    return userId;
  }

  private async getDepartmentOrThrow(departmentId: string) {
    const department = await this.departmentModel.findById(departmentId);
    if (!department) throw new BadRequestException('Department not found');
    return departmentId;
  }
}
