import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import type { UserDocument } from '../users/user.schema';
import type { JwtPayload } from '../auth/types/jwt-payload.type';
export declare class CompaniesController {
    private readonly companiesService;
    constructor(companiesService: CompaniesService);
    create(dto: CreateCompanyDto, user: JwtPayload, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./company.schema").Company, {}, import("mongoose").DefaultSchemaOptions> & import("./company.schema").Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./company.schema").Company, {}, import("mongoose").DefaultSchemaOptions> & import("./company.schema").Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    show(user: UserDocument): Promise<import("./company.schema").Company | null>;
}
