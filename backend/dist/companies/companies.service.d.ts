import { Model } from 'mongoose';
import type { Cache } from 'cache-manager';
import { Company, CompanyDocument } from './company.schema';
import { UserDocument } from '../users/user.schema';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
export declare class CompaniesService {
    private readonly companyModel;
    private readonly userModel;
    private cache;
    constructor(companyModel: Model<CompanyDocument>, userModel: Model<UserDocument>, cache: Cache);
    private cacheKey;
    create(dto: CreateCompanyDto, user: {
        sub: string;
    }): Promise<{
        company: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Company, {}, import("mongoose").DefaultSchemaOptions> & Company & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Company, {}, import("mongoose").DefaultSchemaOptions> & Company & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        user: {
            sub: string;
        };
    }>;
    findMyCompany(user: any): Promise<Company | null>;
    update(dto: UpdateCompanyDto, user: any): Promise<(import("mongoose").Document<unknown, {}, Company, {}, import("mongoose").DefaultSchemaOptions> & Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
}
