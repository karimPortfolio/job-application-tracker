export const DEPARTMENTS_ROUTES = {
  getDepartments: `${process.env.NEXT_PUBLIC_API_VERSION || ''}/departments`,
  createDepartment: `${process.env.NEXT_PUBLIC_API_VERSION || ''}/departments`,
  updateDepartment: (id: string) => `${process.env.NEXT_PUBLIC_API_VERSION || ''}/departments/${id}`,
  getDepartment: (id: string) => `${process.env.NEXT_PUBLIC_API_VERSION || ''}/departments/${id}`,
  deleteDepartment: (id: string) => `${process.env.NEXT_PUBLIC_API_VERSION || ''}/departments/${id}`,
} as const;
