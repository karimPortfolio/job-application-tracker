export const JOBS_ROUTES = {
  getJobs: `${process.env.NEXT_PUBLIC_API_VERSION || ''}/jobs`,
  createJob: `${process.env.NEXT_PUBLIC_API_VERSION || ''}/jobs`,
  updateJob: (id: string) => `${process.env.NEXT_PUBLIC_API_VERSION || ''}/jobs/${id}`,
  getJob: (id: string) => `${process.env.NEXT_PUBLIC_API_VERSION || ''}/jobs/${id}`,
  deleteJob: (id: string) => `${process.env.NEXT_PUBLIC_API_VERSION || ''}/jobs/${id}`,
  exportJobs: `${process.env.NEXT_PUBLIC_API_VERSION || ''}/jobs/export`,
  generateDescription: `${process.env.NEXT_PUBLIC_API_VERSION || ''}/jobs/generate-description`,
} as const;
