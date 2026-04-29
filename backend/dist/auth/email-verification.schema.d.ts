import { Document } from 'mongoose';
export declare class EmailVerification extends Document {
    email: string;
    token: string;
    expiresAt: Date;
}
export declare const EmailVerificationSchema: import("mongoose").Schema<EmailVerification, import("mongoose").Model<EmailVerification, any, any, any, (Document<unknown, any, EmailVerification, any, import("mongoose").DefaultSchemaOptions> & EmailVerification & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, EmailVerification, any, import("mongoose").DefaultSchemaOptions> & EmailVerification & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}), any, EmailVerification>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, EmailVerification, Document<unknown, {}, EmailVerification, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<EmailVerification & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, EmailVerification, Document<unknown, {}, EmailVerification, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<EmailVerification & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string, EmailVerification, Document<unknown, {}, EmailVerification, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<EmailVerification & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    token?: import("mongoose").SchemaDefinitionProperty<string, EmailVerification, Document<unknown, {}, EmailVerification, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<EmailVerification & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    expiresAt?: import("mongoose").SchemaDefinitionProperty<Date, EmailVerification, Document<unknown, {}, EmailVerification, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<EmailVerification & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, EmailVerification>;
