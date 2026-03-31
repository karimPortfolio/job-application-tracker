
export const PUBLIC_JOBS_ROUTES = {
  getPublicJobs: `${process.env.NEXT_PUBLIC_API_VERSION || ''}/public-jobs`,
  getPublicJob: (id: string) => `${process.env.NEXT_PUBLIC_API_VERSION || ''}/public-jobs/${id}`,
} as const;