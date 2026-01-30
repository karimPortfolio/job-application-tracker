export interface Job {
  _id: string;
  id: string;
  title: string;
  description: string;
  country: string;
  city?: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  experienceLevel: 'junior' | 'mid' | 'senior' | 'lead';
  isRemote?: boolean;
  status: 'draft' | 'published' | 'closed' | 'archived';
  salaryMin?: number;
  salaryMax?: number;
  applicationsCount: number;
  viewsCount: number;
  company: {
    _id: string;
    name: string;
    industry?: string;
    websiteUrl?: string;
  };
  department: {
    _id: string;
    title: string;
  }
  createdAt: string;
  createdAtDiff: string;
  updatedAt: string;
}

export interface JobStatus {
  label: string;
  value: 'draft' | 'published' | 'closed' | 'archived';
  colorClass: string;
}

export interface JobQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  employmentType?: 'full-time' | 'part-time' | 'contract' | 'internship';
  experienceLevel?: 'junior' | 'mid' | 'senior' | 'lead';
  isRemote?: boolean;
  sortBy?: 'createdAt' | 'title' | 'applicationsCount' | 'viewsCount';
  order?: 'asc' | 'desc';
}

export interface CreateJobPayload {
  title: string;
  description: string;
  country: string;
  city?: string;
  status?: 'draft' | 'published';
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  experienceLevel: 'junior' | 'mid' | 'senior' | 'lead';
  isRemote?: boolean;
  salaryMin?: number;
  salaryMax?: number;
  department: string;
}

export interface UpdateJobPayload {
  title?: string;
  description?: string;
  country?: string;
  city?: string;
  employmentType?: 'full-time' | 'part-time' | 'contract' | 'internship';
  experienceLevel?: 'junior' | 'mid' | 'senior' | 'lead';
  isRemote?: boolean;
  salaryMin?: number;
  salaryMax?: number;
  status?: 'draft' | 'published' | 'closed' | 'archived';
  department?: string;
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
