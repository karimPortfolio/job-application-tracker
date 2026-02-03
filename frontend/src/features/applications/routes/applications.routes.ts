export const APPLICATIONS_ROUTES = {
  getApplications: `${process.env.NEXT_PUBLIC_API_VERSION || ''}/applications`,
  createApplication: `${process.env.NEXT_PUBLIC_API_VERSION || ''}/applications`,
  updateApplication: (id: string) => `${process.env.NEXT_PUBLIC_API_VERSION || ''}/applications/${id}`,
  getApplication: (id: string) => `${process.env.NEXT_PUBLIC_API_VERSION || ''}/applications/${id}`,
  deleteApplication: (id: string) => `${process.env.NEXT_PUBLIC_API_VERSION || ''}/applications/${id}`,
  exportApplications: `${process.env.NEXT_PUBLIC_API_VERSION || ''}/applications/export`,
  changeStatus: (id: string) => `${process.env.NEXT_PUBLIC_API_VERSION || ''}/applications/${id}/status`,
  changeStage: (id: string) => `${process.env.NEXT_PUBLIC_API_VERSION || ''}/applications/${id}/stage`,
} as const;
