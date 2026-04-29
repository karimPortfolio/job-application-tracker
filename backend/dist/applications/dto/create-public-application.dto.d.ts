export declare class CreatePublicApplicationDto {
    fullName: string;
    email: string;
    phoneNumber: string;
    linkedInUrl: string;
    portfolioUrl: string;
    resumeUrl: string;
    country: string;
    city?: string;
    job: string;
    status?: 'applied' | 'in_review' | 'interview' | 'offer' | 'hired' | 'rejected';
    stage?: 'screening' | 'technical_interview' | 'hr_interview' | 'final_interview' | 'offer';
    source?: string;
    appliedAt?: string;
}
