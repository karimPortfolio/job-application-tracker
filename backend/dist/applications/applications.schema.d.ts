import { HydratedDocument } from 'mongoose';
import { User } from 'src/users/user.schema';
export type ApplicationDocument = HydratedDocument<Application>;
export declare class Application {
    fullName: string;
    email: string;
    phoneNumber: string;
    linkedInUrl?: string;
    githubUrl?: string;
    portfolioUrl?: string;
    resumeUrl: string;
    country?: string;
    city?: string;
    job: string;
    company: string;
    status: string;
    stage?: string;
    source?: string;
    referalName?: string;
    referalEmail?: string;
    appliedAt: Date;
    notes?: string;
    rating?: number;
    aiScore?: number;
    aiSummary?: string;
    aiDecision?: string;
    user?: string | User;
    archivedAt?: Date;
    viewedAt?: Date;
    rejectedAt?: Date;
    createdAt: Date;
}
export declare const ApplicationSchema: import("mongoose").Schema<Application, import("mongoose").Model<Application, any, any, any, (import("mongoose").Document<unknown, any, Application, any, import("mongoose").DefaultSchemaOptions> & Application & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (import("mongoose").Document<unknown, any, Application, any, import("mongoose").DefaultSchemaOptions> & Application & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}), any, Application>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Application, import("mongoose").Document<unknown, {}, Application, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Application & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    fullName?: import("mongoose").SchemaDefinitionProperty<string, Application, import("mongoose").Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string, Application, import("mongoose").Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    phoneNumber?: import("mongoose").SchemaDefinitionProperty<string, Application, import("mongoose").Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    linkedInUrl?: import("mongoose").SchemaDefinitionProperty<string | undefined, Application, import("mongoose").Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    githubUrl?: import("mongoose").SchemaDefinitionProperty<string | undefined, Application, import("mongoose").Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    portfolioUrl?: import("mongoose").SchemaDefinitionProperty<string | undefined, Application, import("mongoose").Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    resumeUrl?: import("mongoose").SchemaDefinitionProperty<string, Application, import("mongoose").Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    country?: import("mongoose").SchemaDefinitionProperty<string | undefined, Application, import("mongoose").Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    city?: import("mongoose").SchemaDefinitionProperty<string | undefined, Application, import("mongoose").Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    job?: import("mongoose").SchemaDefinitionProperty<string, Application, import("mongoose").Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    company?: import("mongoose").SchemaDefinitionProperty<string, Application, import("mongoose").Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Application, import("mongoose").Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    stage?: import("mongoose").SchemaDefinitionProperty<string | undefined, Application, import("mongoose").Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    source?: import("mongoose").SchemaDefinitionProperty<string | undefined, Application, import("mongoose").Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    referalName?: import("mongoose").SchemaDefinitionProperty<string | undefined, Application, import("mongoose").Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    referalEmail?: import("mongoose").SchemaDefinitionProperty<string | undefined, Application, import("mongoose").Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    appliedAt?: import("mongoose").SchemaDefinitionProperty<Date, Application, import("mongoose").Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    notes?: import("mongoose").SchemaDefinitionProperty<string | undefined, Application, import("mongoose").Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    rating?: import("mongoose").SchemaDefinitionProperty<number | undefined, Application, import("mongoose").Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    aiScore?: import("mongoose").SchemaDefinitionProperty<number | undefined, Application, import("mongoose").Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    aiSummary?: import("mongoose").SchemaDefinitionProperty<string | undefined, Application, import("mongoose").Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    aiDecision?: import("mongoose").SchemaDefinitionProperty<string | undefined, Application, import("mongoose").Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    user?: import("mongoose").SchemaDefinitionProperty<string | User | undefined, Application, import("mongoose").Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    archivedAt?: import("mongoose").SchemaDefinitionProperty<Date | undefined, Application, import("mongoose").Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    viewedAt?: import("mongoose").SchemaDefinitionProperty<Date | undefined, Application, import("mongoose").Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    rejectedAt?: import("mongoose").SchemaDefinitionProperty<Date | undefined, Application, import("mongoose").Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, Application, import("mongoose").Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Application>;
