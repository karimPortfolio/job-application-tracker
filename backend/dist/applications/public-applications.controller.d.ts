import { ApplicationsService } from './applications.service';
import { CreatePublicApplicationDto } from './dto/create-public-application.dto';
export declare class PublicApplicationsController {
    private readonly applicationsService;
    constructor(applicationsService: ApplicationsService);
    createPublicApplication(createApplicationDto: CreatePublicApplicationDto, file: Express.Multer.File): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./applications.schema").Application, {}, import("mongoose").DefaultSchemaOptions> & import("./applications.schema").Application & {
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
    parseResume(file: Express.Multer.File): Promise<{
        fullName: any;
        email: any;
        phone: any;
        linkedin: any;
        github: any;
        portfolio: any;
        country: any;
        city: any;
    }>;
}
