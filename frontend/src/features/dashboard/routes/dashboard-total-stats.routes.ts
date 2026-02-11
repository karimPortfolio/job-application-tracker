import { getApplication, getApplications } from "@/features/applications/services/applications.service";

export const DASHBOARD_STATS_ROUTES = {
  getDepartmentsTotalStats: `${process.env.NEXT_PUBLIC_API_VERSION || ''}/dashboard/departments/stats`,
  getJobsTotalStats: `${process.env.NEXT_PUBLIC_API_VERSION || ''}/dashboard/jobs/stats`,
  getApplicationsTotalStats: `${process.env.NEXT_PUBLIC_API_VERSION || ''}/dashboard/applications/stats`,
  getApplicationsMonthlyStats: `${process.env.NEXT_PUBLIC_API_VERSION || ''}/dashboard/applications/monthly-stats`,
  getApplicationsStatsByJobs: `${process.env.NEXT_PUBLIC_API_VERSION || ''}/dashboard/applications/stats-by-jobs`,
  getApplicationsStatsByCountries: `${process.env.NEXT_PUBLIC_API_VERSION || ''}/dashboard/applications/stats-by-countries`,
  getApplicationsStatsByStatus: `${process.env.NEXT_PUBLIC_API_VERSION || ''}/dashboard/applications/stats-by-status`,
  getApplicationsStatsByStages: `${process.env.NEXT_PUBLIC_API_VERSION || ''}/dashboard/applications/stats-by-stages`,
  getApplicationsStatsByDepartments: `${process.env.NEXT_PUBLIC_API_VERSION || ''}/dashboard/applications/stats-by-departments`,
} as const;
