import { HydratedDocument, Types } from 'mongoose';
export type DepartmentDocument = HydratedDocument<Department>;
export declare class Department {
    title: string;
    description: string;
    company: string;
    user: string;
    createdAt: Date;
}
export declare const DepartmentSchema: import("mongoose").Schema<Department, import("mongoose").Model<Department, any, any, any, (import("mongoose").Document<unknown, any, Department, any, import("mongoose").DefaultSchemaOptions> & Department & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (import("mongoose").Document<unknown, any, Department, any, import("mongoose").DefaultSchemaOptions> & Department & {
    _id: Types.ObjectId;
} & {
    __v: number;
}), any, Department>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Department, import("mongoose").Document<unknown, {}, Department, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Department & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    title?: import("mongoose").SchemaDefinitionProperty<string, Department, import("mongoose").Document<unknown, {}, Department, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Department & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Department, import("mongoose").Document<unknown, {}, Department, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Department & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    company?: import("mongoose").SchemaDefinitionProperty<string, Department, import("mongoose").Document<unknown, {}, Department, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Department & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    user?: import("mongoose").SchemaDefinitionProperty<string, Department, import("mongoose").Document<unknown, {}, Department, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Department & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, Department, import("mongoose").Document<unknown, {}, Department, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Department & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Department>;
