
export const PUBLIC_APPLICATIONS_ROUTES = {
  createPublicApplication: `${process.env.NEXT_PUBLIC_API_VERSION || ''}/public-applications`,
} as const;
