
export const PUBLIC_APPLICATIONS_ROUTES = {
  createPublicApplication: `${process.env.NEXT_PUBLIC_API_VERSION || ''}/public-applications`,
  parseResume: `${process.env.NEXT_PUBLIC_API_VERSION || ''}/public-applications/parse-resume`,
} as const;
