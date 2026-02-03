export interface Application {
  _id: string;
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  linkedInUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  resumeUrl: string;
  country?: string;
  city?: string;
  job: {
    _id: string;
    title: string;
    department: {
      _id: string;
      title: string;
    }
  } | string;
  company: {
    _id: string;
    name: string;
  } | string;
  status: 'applied' | 'in_review' | 'interview' | 'offer' | 'hired' | 'rejected';
  stage?: 'screening' | 'technical_interview' | 'hr_interview' | 'final_interview' | 'offer';
  source?: string;
  referalName?: string;
  referalEmail?: string;
  appliedAt?: string;
  notes?: string;
  rating?: number;
  aiScore?: number;
  aiSummary?: string;
  user?: string;
  archivedAt?: string;
  viewedAt?: string;
  rejectedAt?: string;
  createdAt: string;
  createdAtDiff?: string;
  updatedAt: string;
}

export interface ApplicationStatus {
  label: string;
  value: 'applied' | 'in_review' | 'interview' | 'offer' | 'hired' | 'rejected';
  colorClass: string;
}

export interface ApplicationStage {
  label: string;
  value: 'screening' | 'technical_interview' | 'hr_interview' | 'final_interview' | 'offer';
  colorClass: string;
}

export interface ApplicationQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  stage?: string;
  job?: string;
  country?: string;
  city?: string;
  fullName?: string;
  sortBy?: 'createdAt' | 'fullName' | 'appliedAt' | 'rating' | 'phoneNumber' | 'aiScore';
  order?: 'asc' | 'desc';
  appliedAtStart?: string;
  appliedAtEnd?: string;
}

export interface CreateApplicationPayload {
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
  status?: 'applied' | 'in_review' | 'interview' | 'offer' | 'hired' | 'rejected';
  stage?: 'screening' | 'technical_interview' | 'hr_interview' | 'final_interview' | 'offer';
  source?: string;
  referalName?: string;
  referalEmail?: string;
}

export interface UpdateApplicationPayload {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  linkedInUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  resumeUrl?: string;
  country?: string;
  city?: string;
  status?: 'applied' | 'in_review' | 'interview' | 'offer' | 'hired' | 'rejected';
  stage?: 'screening' | 'technical_interview' | 'hr_interview' | 'final_interview' | 'offer';
  source?: string;
  referalName?: string;
  referalEmail?: string;
  notes?: string;
  rating?: number;
}

export interface PaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
