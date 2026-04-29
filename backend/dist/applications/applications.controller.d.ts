import { ApplicationsService } from './applications.service';
import { ApplicationQueryDto } from './dto/application-query.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
import { UpdateApplicationStageDto } from './dto/update-application-stage.dto';
import type { Response } from 'express';
import { SmartScreeningApplicationDto } from './dto/smart-screenig-application.dto';
export declare class ApplicationsController {
    private readonly applicationsService;
    constructor(applicationsService: ApplicationsService);
    getCompanyApplications(req: any, query: ApplicationQueryDto): Promise<import("mongoose").PaginateResult<(import("mongoose").Document<unknown, {}, import("./applications.schema").Application, {}, import("mongoose").DefaultSchemaOptions> & import("./applications.schema").Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./applications.schema").Application, {}, import("mongoose").DefaultSchemaOptions> & import("./applications.schema").Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./applications.schema").Application, {}, import("mongoose").DefaultSchemaOptions> & import("./applications.schema").Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | (import("mongoose").Document<unknown, {}, import("./applications.schema").Application, {}, import("mongoose").DefaultSchemaOptions> & import("./applications.schema").Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & {
        id: string;
    }) | (import("mongoose").Document<unknown, {}, import("./applications.schema").Application, {}, import("mongoose").DefaultSchemaOptions> & import("./applications.schema").Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & {
        [key: string]: any;
    })>>;
    exportApplications(format: "csv" | "xlsx" | undefined, req: any, query: ApplicationQueryDto, res: Response): Promise<void>;
    createApplication(user: {
        sub: string;
    }, req: any, dto: CreateApplicationDto, file: Express.Multer.File): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./applications.schema").Application, {}, import("mongoose").DefaultSchemaOptions> & import("./applications.schema").Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./applications.schema").Application, {}, import("mongoose").DefaultSchemaOptions> & import("./applications.schema").Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
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
    getApplicationsJobs(req: any): Promise<{}>;
    getApplicationById(req: any, applicationId: string): Promise<any>;
    updateApplication(req: any, applicationId: string, dto: UpdateApplicationDto, file?: Express.Multer.File): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./applications.schema").Application, {}, import("mongoose").DefaultSchemaOptions> & import("./applications.schema").Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./applications.schema").Application, {}, import("mongoose").DefaultSchemaOptions> & import("./applications.schema").Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    deleteApplication(applicationId: string, req: any): Promise<{
        message: string;
    }>;
    updateApplicationStatus(req: any, applicationId: string, dto: UpdateApplicationStatusDto): Promise<{
        message: string;
    }>;
    updateApplicationStage(req: any, applicationId: string, dto: UpdateApplicationStageDto): Promise<{
        message: string;
    }>;
    runningSmartScreening(req: any, body: SmartScreeningApplicationDto): Promise<import("./types/applications.types").SmartScreeningAiResponse>;
}
