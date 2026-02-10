import { api } from "@/lib/api/axios";
import { TotalStats } from "../types/dashboard.types";
import { DASHBOARD_STATS_ROUTES } from "../routes/dashboard-total-stats.routes";



export const getDepartmentsTotalStats = () => {
    return api.get<TotalStats>(DASHBOARD_STATS_ROUTES.getDepartmentsTotalStats);
}

export const getJobsTotalStats = () => {
    return api.get<TotalStats>(DASHBOARD_STATS_ROUTES.getJobsTotalStats);
}

export const getApplicationsTotalStats = () => {
    return api.get<TotalStats>(DASHBOARD_STATS_ROUTES.getApplicationsTotalStats);
}

export const getApplicationsMonthlyStats = (year: string) => {
    return api.get(`${DASHBOARD_STATS_ROUTES.getApplicationsMonthlyStats}?year=${year}`);
}

export const getApplicationsStatsByJobs = (year: string) => {
    return api.get(`${DASHBOARD_STATS_ROUTES.getApplicationsStatsByJobs}?year=${year}`);
}
