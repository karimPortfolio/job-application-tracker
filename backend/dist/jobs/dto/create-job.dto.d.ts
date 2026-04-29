export declare class CreateJobDto {
    title: string;
    description: string;
    country: string;
    city?: string;
    status?: 'draft' | 'published';
    employmentType: string;
    experienceLevel: string;
    isRemote?: boolean;
    salaryMin?: number;
    salaryMax?: number;
    department: string;
}
