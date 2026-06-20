import { JobsService } from './jobs.service';
import { JobQueryDto } from './dto/job-query.dto';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import type { Response } from 'express';
import { JobResponseDto } from './dto/job-response.dto';
import { UpdateJobStatusDto } from './dto/update-job-status.dto';
import { GenerateJobDto } from './dto/generate-job.dto';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    getCompanyJobs(req: any, query: JobQueryDto): Promise<{
        docs: JobResponseDto[];
        totalDocs: number;
        limit: number;
        hasPrevPage: boolean;
        hasNextPage: boolean;
        page?: number | undefined;
        totalPages: number;
        offset: number;
        prevPage?: number | null | undefined;
        nextPage?: number | null | undefined;
        pagingCounter: number;
        meta?: any;
    }>;
    exportJobs(format: "csv" | "xlsx" | undefined, req: any, query: JobQueryDto, res: Response): Promise<void>;
    createJob(user: {
        sub: string;
    }, req: any, dto: CreateJobDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./jobs.schema").Job, {}, import("mongoose").DefaultSchemaOptions> & import("./jobs.schema").Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./jobs.schema").Job, {}, import("mongoose").DefaultSchemaOptions> & import("./jobs.schema").Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    generateJobDescription(dto: GenerateJobDto): Promise<{
        context: string;
    }>;
    getCompanyDepartments(req: any): Promise<{}>;
    getJobById(req: any, jobId: string): Promise<{}>;
    updateJob(req: any, jobId: string, dto: UpdateJobDto): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./jobs.schema").Job, {}, import("mongoose").DefaultSchemaOptions> & import("./jobs.schema").Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./jobs.schema").Job, {}, import("mongoose").DefaultSchemaOptions> & import("./jobs.schema").Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    deleteJob(id: string, req: any): Promise<{
        message: string;
    }>;
    incrementApplicationsCount(jobId: string): Promise<{
        message: string;
    }>;
    incrementViewsCount(jobId: string): Promise<{
        message: string;
    }>;
    updateJobStatus(req: any, jobId: string, dto: UpdateJobStatusDto): Promise<{
        message: string;
    }>;
    saveJob(user: {
        sub: string;
    }, jobId: string): Promise<{
        message: string;
    }>;
    unsaveJob(user: {
        sub: string;
    }, jobId: string): Promise<{
        message: string;
    }>;
}
