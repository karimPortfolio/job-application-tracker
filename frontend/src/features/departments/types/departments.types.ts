export interface Department {
  _id: string;
  title: string;
  description?: string;
  company: {
    _id: string;
    name: string;
    industry?: string;
    websiteUrl?: string;
  };
  jobsCount?: number;
  createdAt: string;
  createdAtDiff: string;
  updatedAt: string;
}

export interface DepartmentQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sortBy?: 'createdAt' | 'title';
  order?: 'asc' | 'desc';
}

export interface CreateDepartmentPayload {
  title: string;
  description?: string;
}

export interface UpdateDepartmentPayload {
  title?: string;
  description?: string;
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
