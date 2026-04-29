import { Job } from "src/jobs/jobs.schema";
export declare class ApplicationQueryDto {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: 'fullName' | 'createdAt' | 'phoneNumber' | 'appliedAt' | 'rating' | 'aiScore';
    order?: 'asc' | 'desc';
    fullName?: string;
    country?: string;
    city?: string;
    job?: string | Job;
    status?: string;
    stage?: string;
    source?: string;
    appliedAtStart?: string;
    appliedAtEnd?: string;
}
