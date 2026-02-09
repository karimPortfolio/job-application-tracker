import { getApplication } from "@/features/applications/services/applications.service";

export const DASHBOARD_STATS_ROUTES = {
  getDepartmentsTotalStats: `${process.env.NEXT_PUBLIC_API_VERSION || ''}/dashboard/departments/stats`,
  getJobsTotalStats: `${process.env.NEXT_PUBLIC_API_VERSION || ''}/dashboard/jobs/stats`,
  getApplicationsTotalStats: `${process.env.NEXT_PUBLIC_API_VERSION || ''}/dashboard/applications/stats`,
  getApplicationsMonthlyStats: `${process.env.NEXT_PUBLIC_API_VERSION || ''}/dashboard/applications/monthly-stats`,
} as const;
