import { JobsService } from "./jobs.service";
import { JobQueryDto } from "./dto/job-query.dto";
export declare class PublicJobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    findAll(query: JobQueryDto): Promise<import("mongoose").PaginateResult<(import("mongoose").Document<unknown, {}, import("./jobs.schema").Job, {}, import("mongoose").DefaultSchemaOptions> & import("./jobs.schema").Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./jobs.schema").Job, {}, import("mongoose").DefaultSchemaOptions> & import("./jobs.schema").Job & {
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
    }>) | (import("mongoose").Document<unknown, {}, import("./jobs.schema").Job, {}, import("mongoose").DefaultSchemaOptions> & import("./jobs.schema").Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & {
        id: string;
    }) | (import("mongoose").Document<unknown, {}, import("./jobs.schema").Job, {}, import("mongoose").DefaultSchemaOptions> & import("./jobs.schema").Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & {
        [key: string]: any;
    })>>;
    findOne(id: string): Promise<any>;
}
