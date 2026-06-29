export interface SavedJob {
  _id: string,
  createdAtDiff: string,
  job: {
    _id: string;
    id: string;
    title: string;
    description: string;
    country: string;
    city?: string;
    employmentType: "full-time" | "part-time" | "contract" | "internship";
    experienceLevel: "junior" | "mid" | "senior" | "lead";
    isRemote?: boolean;
    saved?: boolean;
    status: "draft" | "published" | "closed" | "archived";
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
    };
    createdAt: string;
    createdAtDiff: string;
    updatedAt: string;
  };
}
