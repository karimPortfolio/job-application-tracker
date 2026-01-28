import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
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

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name)
    private readonly jobModel: PaginateModel<JobDocument>,
    @InjectModel('Company')
    private readonly companyModel: Model<CompanyDocument>,
    @InjectModel('Department')
    private readonly departmentModel: Model<DepartmentDocument>,
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
    private readonly csvExporter: JobsCsvExporter,
    private readonly xlsxExporter: JobsXlsxExporter,
  ) {}

  async getCompanyJobs(
    companyId: string,
    query: JobQueryDto,
  ) {
    const company = await this.getCompanyOrThrow(companyId);
    const filter = buildJobFilter(company, query);
    const sort = buildJobSort(query);

    return this.jobModel.paginate(filter, {
      page: query.page || 1,
      limit: query.limit || 10,
      sort,
      populate: [
        { path: 'department', select: 'title' },
        { path: 'user', select: 'name' },
      ],
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
    const job = await this.jobModel.findById(jobId);

    if (!job) throw new BadRequestException('Job not found');

    if (job.company?.toString() !== companyId) {
      throw new ForbiddenException('Access to this resource is forbidden');
    }

    return job;
  }

  async updateJob(
    jobId: string,
    companyId: string,
    dto: UpdateJobDto,
  ) {
    const job = await this.jobModel.findById(jobId);

    if (!job) throw new BadRequestException('Job not found');

    if (job.company?.toString() !== companyId) {
      throw new ForbiddenException('Access to this resource is forbidden');
    }

    Object.assign(job, dto);
    await job.save();

    return job;
  }

  async incrementApplicationsCount(jobId: string, companyId: string) {
    const job = await this.jobModel.findById(jobId);
    if (!job) throw new BadRequestException('Job not found');

    if (job.company?.toString() !== companyId) {
      throw new ForbiddenException('Access to this resource is forbidden');
    }

    job.applicationsCount = (job.applicationsCount || 0) + 1;
    await job.save();

    return job;
  }

  async incrementViewsCount(jobId: string, companyId: string) {
    const job = await this.jobModel.findById(jobId);
    if (!job) throw new BadRequestException('Job not found');

    if (job.company?.toString() !== companyId) {
      throw new ForbiddenException('Access to this resource is forbidden');
    }

    job.viewsCount = (job.viewsCount || 0) + 1;
    await job.save();

    return job;
  }

  async deleteJob(jobId: string, companyId: string) {
    console.log(jobId);
    const job = await this.jobModel.findById(jobId);
    if (!job) throw new BadRequestException('Job not found');

    if (job.company?.toString() !== companyId) {
      throw new ForbiddenException('Access to this resource is forbidden');
    }

    await this.jobModel.deleteOne({ _id: jobId });

    return { message: 'Job deleted successfully' };
  }

  async exportJobs(
    companyId: string,
    format: 'csv' | 'xlsx',
    query: JobQueryDto,
  ) {
    const company = await this.getCompanyOrThrow(companyId);
    const filter = buildJobFilter(company, query);
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

    if (job.company?.toString() !== companyId) {
      throw new ForbiddenException('Access to this resource is forbidden');
    }

    job.status = dto.status;
    await job.save();

    return job;
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
