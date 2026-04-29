import { Model, type PaginateModel } from 'mongoose';
import type { CompanyDocument } from '../companies/company.schema';
import { UserDocument } from '../users/user.schema';
import { JobDocument } from '../jobs/jobs.schema';
import { ApplicationsCsvExporter } from './exporters/applications-csv.exporter';
import { ApplicationsXlsxExporter } from './exporters/applications-xlsx.exporter';
import { S3Uploader } from 'src/common/utils/s3-uploader';
import { Application, ApplicationDocument } from './applications.schema';
import { ApplicationQueryDto } from './dto/application-query.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { AIService } from '../ai/ai.service';
import { CreatePublicApplicationDto } from './dto/create-public-application.dto';
import { SmartScreeningAiResponse } from './types/applications.types';
import type { Cache } from 'cache-manager';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class ApplicationsService {
    private readonly applicationModel;
    private readonly companyModel;
    private readonly jobModel;
    private readonly userModel;
    private readonly aiService;
    private readonly csvExporter;
    private readonly xlsxExporter;
    private readonly s3Uploader;
    private eventEmitter;
    private cache;
    constructor(applicationModel: PaginateModel<ApplicationDocument>, companyModel: Model<CompanyDocument>, jobModel: Model<JobDocument>, userModel: Model<UserDocument>, aiService: AIService, csvExporter: ApplicationsCsvExporter, xlsxExporter: ApplicationsXlsxExporter, s3Uploader: S3Uploader, eventEmitter: EventEmitter2, cache: Cache);
    private readonly logger;
    getCompanyApplications(companyId: string, query: ApplicationQueryDto): Promise<import("mongoose").PaginateResult<(import("mongoose").Document<unknown, {}, Application, {}, import("mongoose").DefaultSchemaOptions> & Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Application, {}, import("mongoose").DefaultSchemaOptions> & Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Application, {}, import("mongoose").DefaultSchemaOptions> & Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | (import("mongoose").Document<unknown, {}, Application, {}, import("mongoose").DefaultSchemaOptions> & Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & {
        id: string;
    }) | (import("mongoose").Document<unknown, {}, Application, {}, import("mongoose").DefaultSchemaOptions> & Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & {
        [key: string]: any;
    })>>;
    createApplication(companyId: string, user: {
        sub: string;
    }, dto: CreateApplicationDto, file?: Express.Multer.File): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Application, {}, import("mongoose").DefaultSchemaOptions> & Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Application, {}, import("mongoose").DefaultSchemaOptions> & Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    createPublicApplication(dto: CreatePublicApplicationDto, file: Express.Multer.File): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Application, {}, import("mongoose").DefaultSchemaOptions> & Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Application, {}, import("mongoose").DefaultSchemaOptions> & Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getApplicationById(applicationId: string, companyId: string): Promise<any>;
    updateApplication(applicationId: string, companyId: string, dto: UpdateApplicationDto, file?: Express.Multer.File): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Application, {}, import("mongoose").DefaultSchemaOptions> & Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Application, {}, import("mongoose").DefaultSchemaOptions> & Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    deleteApplication(applicationId: string, companyId: string): Promise<{
        message: string;
    }>;
    exportApplications(companyId: string, format: 'csv' | 'xlsx', query: ApplicationQueryDto): Promise<import("stream").PassThrough>;
    updateApplicationStatus(applicationId: string, companyId: string, status: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Application, {}, import("mongoose").DefaultSchemaOptions> & Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Application, {}, import("mongoose").DefaultSchemaOptions> & Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    updateApplicationStage(applicationId: string, companyId: string, stage: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Application, {}, import("mongoose").DefaultSchemaOptions> & Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Application, {}, import("mongoose").DefaultSchemaOptions> & Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    getApplicationsJobs(companyId: string): Promise<{}>;
    parseCandidateResume(file: Express.Multer.File): Promise<{
        fullName: any;
        email: any;
        phone: any;
        linkedin: any;
        github: any;
        portfolio: any;
        country: any;
        city: any;
    }>;
    runningSmartScreening(applicationId: string, companyId: string): Promise<SmartScreeningAiResponse>;
    private getCachedApplication;
    private getCacheKey;
    private getApplicationsJobsCacheKey;
    private getCleanedAiResponse;
    private parsedAiResponse;
    private getCompanyOrThrow;
    private uploadResumeToS3;
    private deleteResumeFromS3;
    private getFileFromS3;
    private getFileMimetypeFromUrl;
    private getUserOrThrow;
    private getJobOrThrow;
}
