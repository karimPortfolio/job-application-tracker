import { useEffect, useState } from "react";
import { MonthlyStats, TotalStats } from "../types/dashboard.types";
import { useApiError } from "@/hooks/useApiError";
import {
  getApplicationsMonthlyStats,
  getApplicationsTotalStats,
  getDepartmentsTotalStats,
  getJobsTotalStats,
} from "../services/dashboard.service";

export function useDashboardStats() {
  const { handleError, error, clearError } = useApiError();
  const [departmentsStats, setDepartmentsStats] = useState<TotalStats | null>(
    null,
  );
  const [jobsStats, setJobsStats] = useState<TotalStats | null>(null);
  const [applicationsStats, setApplicationsStats] = useState<TotalStats | null>(
    null,
  );
  const [applicationsMonthlyStats, setApplicationsMonthlyStats] =
    useState<MonthlyStats | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchDepartmentsTotalStats() {
    clearError();
    try {
      const { data } = await getDepartmentsTotalStats();
      setDepartmentsStats(data);
    } catch (err) {
      handleError(err);
    }
  }

  async function fetchJobsTotalStats() {
    clearError();
    try {
      const { data } = await getJobsTotalStats();
      setJobsStats(data);
    } catch (err) {
      handleError(err);
    }
  }

  async function fetchApplicationsTotalStats() {
    clearError();
    try {
      const { data } = await getApplicationsTotalStats();
      setApplicationsStats(data);
    } catch (err) {
      handleError(err);
    }
  }

  async function fetchApplicationsMonthlyStats(year: string) {
    clearError();
    try {
      const { data } = await getApplicationsMonthlyStats(year);
      setApplicationsMonthlyStats(data);
    } catch (err) {
      handleError(err);
    }
  }

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchDepartmentsTotalStats(),
      fetchJobsTotalStats(),
      fetchApplicationsTotalStats(),
      fetchApplicationsMonthlyStats(new Date().getFullYear().toString()),
    ]).finally(() => setLoading(false));
  }, []);

  return {
    departmentsStats,
    jobsStats,
    applicationsStats,
    applicationsMonthlyStats,
    loading,

    fetchApplicationsMonthlyStats,

    error,
    clearError,
  };
}
