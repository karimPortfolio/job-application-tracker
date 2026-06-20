import { Model, type PaginateModel } from 'mongoose';
import { Job, JobDocument } from './jobs.schema';
import { JobQueryDto } from './dto/job-query.dto';
import { CompanyDocument } from '../companies/company.schema';
import { UserDocument } from '../users/user.schema';
import { CreateJobDto } from './dto/create-job.dto';
import { DepartmentDocument } from '../departments/departments.schema';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobsCsvExporter } from './exporters/jobs-csv.exporter';
import { JobsXlsxExporter } from './exporters/jobs-xlsx.exporter';
import { UpdateJobStatusDto } from './dto/update-job-status.dto';
import { GenerateJobDto } from './dto/generate-job.dto';
import { AIService } from 'src/ai/ai.service';
import { SavedJobsDocument } from './saved-jobs-schema';
import { Cache } from '@nestjs/cache-manager';
export declare class JobsService {
    private readonly jobModel;
    private readonly savedJobsModel;
    private readonly companyModel;
    private readonly departmentModel;
    private readonly userModel;
    private readonly csvExporter;
    private readonly xlsxExporter;
    private readonly aiService;
    private cache;
    constructor(jobModel: PaginateModel<JobDocument>, savedJobsModel: PaginateModel<SavedJobsDocument>, companyModel: Model<CompanyDocument>, departmentModel: Model<DepartmentDocument>, userModel: Model<UserDocument>, csvExporter: JobsCsvExporter, xlsxExporter: JobsXlsxExporter, aiService: AIService, cache: Cache);
    private readonly logger;
    findAll(query: JobQueryDto): Promise<import("mongoose").PaginateResult<(import("mongoose").Document<unknown, {}, Job, {}, import("mongoose").DefaultSchemaOptions> & Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Job, {}, import("mongoose").DefaultSchemaOptions> & Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Job, {}, import("mongoose").DefaultSchemaOptions> & Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | (import("mongoose").Document<unknown, {}, Job, {}, import("mongoose").DefaultSchemaOptions> & Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & {
        id: string;
    }) | (import("mongoose").Document<unknown, {}, Job, {}, import("mongoose").DefaultSchemaOptions> & Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & {
        [key: string]: any;
    })>>;
    getCompanyJobs(companyId: string, query: JobQueryDto): Promise<import("mongoose").PaginateResult<(import("mongoose").Document<unknown, {}, Job, {}, import("mongoose").DefaultSchemaOptions> & Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Job, {}, import("mongoose").DefaultSchemaOptions> & Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Job, {}, import("mongoose").DefaultSchemaOptions> & Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | (import("mongoose").Document<unknown, {}, Job, {}, import("mongoose").DefaultSchemaOptions> & Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & {
        id: string;
    }) | (import("mongoose").Document<unknown, {}, Job, {}, import("mongoose").DefaultSchemaOptions> & Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & {
        [key: string]: any;
    })>>;
    createJob(companyId: string, user: {
        sub: string;
    }, dto: CreateJobDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Job, {}, import("mongoose").DefaultSchemaOptions> & Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Job, {}, import("mongoose").DefaultSchemaOptions> & Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getJobById(jobId: string, companyId: string): Promise<{}>;
    getPublicJobById(jobId: string, user: {
        sub: string;
    } | null): Promise<{}>;
    saveJob(jobId: string, user: {
        sub: string;
    }): Promise<{
        message: string;
    }>;
    unsaveJob(jobId: string, user: {
        sub: string;
    }): Promise<{
        message: string;
    }>;
    updateJob(jobId: string, companyId: string, dto: UpdateJobDto): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Job, {}, import("mongoose").DefaultSchemaOptions> & Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Job, {}, import("mongoose").DefaultSchemaOptions> & Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    incrementApplicationsCount(jobId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Job, {}, import("mongoose").DefaultSchemaOptions> & Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Job, {}, import("mongoose").DefaultSchemaOptions> & Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    incrementViewsCount(jobId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Job, {}, import("mongoose").DefaultSchemaOptions> & Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Job, {}, import("mongoose").DefaultSchemaOptions> & Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    deleteJob(jobId: string, companyId: string): Promise<{
        message: string;
    }>;
    exportJobs(companyId: string, format: 'csv' | 'xlsx', query: JobQueryDto): Promise<import("stream").PassThrough>;
    updateJobStatus(jobId: string, companyId: string, dto: UpdateJobStatusDto): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Job, {}, import("mongoose").DefaultSchemaOptions> & Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Job, {}, import("mongoose").DefaultSchemaOptions> & Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    getCompanyDepartments(companyId: string): Promise<{}>;
    getGeneratedJobDescription(dto: GenerateJobDto): Promise<{
        context: string;
    }>;
    private getCachedJob;
    private getCompanyDepartmentsCacheKey;
    private getCacheKey;
    private getCompanyOrThrow;
    private getUserorThrow;
    private getDepartmentOrThrow;
}
