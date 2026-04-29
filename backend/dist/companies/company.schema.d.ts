import { HydratedDocument, Types } from 'mongoose';
export type CompanyDocument = HydratedDocument<Company>;
export declare class Company {
    name: string;
    industry: string;
    websiteUrl?: string;
}
export declare const CompanySchema: import("mongoose").Schema<Company, import("mongoose").Model<Company, any, any, any, (import("mongoose").Document<unknown, any, Company, any, import("mongoose").DefaultSchemaOptions> & Company & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (import("mongoose").Document<unknown, any, Company, any, import("mongoose").DefaultSchemaOptions> & Company & {
    _id: Types.ObjectId;
} & {
    __v: number;
}), any, Company>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Company, import("mongoose").Document<unknown, {}, Company, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Company & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Company, import("mongoose").Document<unknown, {}, Company, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Company & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    industry?: import("mongoose").SchemaDefinitionProperty<string, Company, import("mongoose").Document<unknown, {}, Company, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Company & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    websiteUrl?: import("mongoose").SchemaDefinitionProperty<string | undefined, Company, import("mongoose").Document<unknown, {}, Company, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Company & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Company>;
