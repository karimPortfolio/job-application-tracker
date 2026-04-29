import { HydratedDocument, Types } from 'mongoose';
import { Company } from '../companies/company.schema';
import { Department } from '../departments/departments.schema';
import { User } from '../users/user.schema';
export type JobDocument = HydratedDocument<Job>;
export declare class Job {
    title: string;
    description: string;
    country: string;
    city?: string;
    status: string;
    employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
    experienceLevel: 'junior' | 'mid' | 'senior' | 'lead';
    isRemote: boolean;
    salaryMin?: number;
    salaryMax?: number;
    applicationsCount: number;
    viewsCount: number;
    company: Company | String | null;
    department: Department | String | null;
    user: User | String | null;
    createdAt: Date;
}
export declare const JobSchema: import("mongoose").Schema<Job, import("mongoose").Model<Job, any, any, any, (import("mongoose").Document<unknown, any, Job, any, import("mongoose").DefaultSchemaOptions> & Job & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (import("mongoose").Document<unknown, any, Job, any, import("mongoose").DefaultSchemaOptions> & Job & {
    _id: Types.ObjectId;
} & {
    __v: number;
}), any, Job>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Job, import("mongoose").Document<unknown, {}, Job, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Job & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    title?: import("mongoose").SchemaDefinitionProperty<string, Job, import("mongoose").Document<unknown, {}, Job, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Job & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Job, import("mongoose").Document<unknown, {}, Job, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Job & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    country?: import("mongoose").SchemaDefinitionProperty<string, Job, import("mongoose").Document<unknown, {}, Job, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Job & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    city?: import("mongoose").SchemaDefinitionProperty<string | undefined, Job, import("mongoose").Document<unknown, {}, Job, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Job & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Job, import("mongoose").Document<unknown, {}, Job, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Job & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    employmentType?: import("mongoose").SchemaDefinitionProperty<"full-time" | "part-time" | "contract" | "internship", Job, import("mongoose").Document<unknown, {}, Job, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Job & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    experienceLevel?: import("mongoose").SchemaDefinitionProperty<"junior" | "mid" | "senior" | "lead", Job, import("mongoose").Document<unknown, {}, Job, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Job & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isRemote?: import("mongoose").SchemaDefinitionProperty<boolean, Job, import("mongoose").Document<unknown, {}, Job, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Job & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    salaryMin?: import("mongoose").SchemaDefinitionProperty<number | undefined, Job, import("mongoose").Document<unknown, {}, Job, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Job & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    salaryMax?: import("mongoose").SchemaDefinitionProperty<number | undefined, Job, import("mongoose").Document<unknown, {}, Job, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Job & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    applicationsCount?: import("mongoose").SchemaDefinitionProperty<number, Job, import("mongoose").Document<unknown, {}, Job, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Job & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    viewsCount?: import("mongoose").SchemaDefinitionProperty<number, Job, import("mongoose").Document<unknown, {}, Job, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Job & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    company?: import("mongoose").SchemaDefinitionProperty<String | Company | null, Job, import("mongoose").Document<unknown, {}, Job, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Job & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    department?: import("mongoose").SchemaDefinitionProperty<String | Department | null, Job, import("mongoose").Document<unknown, {}, Job, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Job & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    user?: import("mongoose").SchemaDefinitionProperty<String | User | null, Job, import("mongoose").Document<unknown, {}, Job, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Job & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, Job, import("mongoose").Document<unknown, {}, Job, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Job & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Job>;
