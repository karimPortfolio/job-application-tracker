export declare class JobResponseDto {
    id: string;
    title: string;
    description: string;
    country: string;
    city?: string;
    status: string;
    employmentType: string;
    experienceLevel: string;
    isRemote: boolean;
    salaryMin?: number;
    salaryMax?: number;
    applicationsCount: number;
    viewsCount: number;
    user: {
        _id: string;
        name: string;
    } | null;
    department: {
        _id: string;
        title: string;
    } | null;
    createdAt: Date;
    createdAtDiff: string;
}
