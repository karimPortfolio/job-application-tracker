import { Document } from 'mongoose';
export declare class PasswordReset extends Document {
    email: string;
    token: string;
    expiresAt: Date;
}
export declare const PasswordResetSchema: import("mongoose").Schema<PasswordReset, import("mongoose").Model<PasswordReset, any, any, any, (Document<unknown, any, PasswordReset, any, import("mongoose").DefaultSchemaOptions> & PasswordReset & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, PasswordReset, any, import("mongoose").DefaultSchemaOptions> & PasswordReset & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}), any, PasswordReset>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PasswordReset, Document<unknown, {}, PasswordReset, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<PasswordReset & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, PasswordReset, Document<unknown, {}, PasswordReset, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<PasswordReset & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string, PasswordReset, Document<unknown, {}, PasswordReset, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<PasswordReset & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    token?: import("mongoose").SchemaDefinitionProperty<string, PasswordReset, Document<unknown, {}, PasswordReset, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<PasswordReset & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    expiresAt?: import("mongoose").SchemaDefinitionProperty<Date, PasswordReset, Document<unknown, {}, PasswordReset, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<PasswordReset & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, PasswordReset>;
