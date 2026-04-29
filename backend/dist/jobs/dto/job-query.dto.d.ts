export declare class JobQueryDto {
    page?: number;
    limit?: number;
    search?: string;
    department?: string;
    status?: string;
    employmentType?: string;
    experienceLevel?: string;
    isRemote?: boolean;
    createdAtStart?: string;
    createdAtEnd?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    order?: 'asc' | 'desc';
}
