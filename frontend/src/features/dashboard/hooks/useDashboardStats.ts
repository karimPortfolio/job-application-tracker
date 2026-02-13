import { useEffect, useState } from "react";
import {
  ApplicationsStatsByCountries,
  ApplicationsStatsByDepartments,
  ApplicationsStatsByJobs,
  ApplicationsStatsByStages,
  ApplicationsStatsByStatus,
  MonthlyStats,
  TopJobByApplications,
  TotalStats,
} from "../types/dashboard.types";
import { useApiError } from "@/hooks/useApiError";
import {
  getApplicationsMonthlyStats,
  getApplicationsStatsByCountries,
  getApplicationsStatsByDepartments,
  getApplicationsStatsByJobs,
  getApplicationsStatsByStages,
  getApplicationsStatsByStatus,
  getApplicationsTotalStats,
  getDepartmentsTotalStats,
  getJobsTotalStats,
  getTopJobsByApplications,
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
  const [applicationsStatsByJobs, setApplicationsStatsByJobs] = useState<
    ApplicationsStatsByJobs[] | null
  >(null);
  const [applicationsStatsByCountries, setApplicationsStatsByCountries] =
    useState<ApplicationsStatsByCountries | null>(null);
  const [applicationsStatsByStatus, setApplicationsStatsByStatus] = useState<
    ApplicationsStatsByStatus[] | null
  >(null);
  const [applicationsStatsByStages, setApplicationsStatsByStages] = useState<
    ApplicationsStatsByStages[] | null
  >(null);
  const [applicationsStatsByDepartments, setApplicationsStatsByDepartments] =
    useState<ApplicationsStatsByDepartments[] | null>(null);
  const [topJobsByApplications, setTopJobsByApplications] = useState<
    TopJobByApplications[] | null
  >(null);
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
    setLoading(true);
    clearError();
    try {
      const { data } = await getApplicationsMonthlyStats(year);
      setApplicationsMonthlyStats(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchApplicationsStatsByJobs(year: string) {
    setLoading(true);
    clearError();
    try {
      const { data } = await getApplicationsStatsByJobs(year);
      setApplicationsStatsByJobs(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchApplicationsStatsByCountries(year: string) {
    setLoading(true);
    clearError();
    try {
      const { data } = await getApplicationsStatsByCountries(year);
      setApplicationsStatsByCountries(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchApplicationsStatsByStatus(year: string) {
    setLoading(true);
    clearError();
    try {
      const { data } = await getApplicationsStatsByStatus(year);
      setApplicationsStatsByStatus(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchApplicationsStatsByStages(year: string) {
    setLoading(true);
    clearError();
    try {
      const { data } = await getApplicationsStatsByStages(year);
      setApplicationsStatsByStages(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchApplicationsStatsByDepartments(year: string) {
    setLoading(true);
    clearError();
    try {
      const { data } = await getApplicationsStatsByDepartments(year);
      setApplicationsStatsByDepartments(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchTopJobsByApplications(year: string) {
    setLoading(true);
    clearError();
    try {
      const { data } = await getTopJobsByApplications(year);
      setTopJobsByApplications(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchDepartmentsTotalStats(),
      fetchJobsTotalStats(),
      fetchApplicationsTotalStats(),
      fetchApplicationsMonthlyStats(new Date().getFullYear().toString()),
      fetchApplicationsStatsByJobs(new Date().getFullYear().toString()),
      fetchApplicationsStatsByCountries(new Date().getFullYear().toString()),
      fetchApplicationsStatsByDepartments(new Date().getFullYear().toString()),
      fetchTopJobsByApplications(new Date().getFullYear().toString()),
    ]).finally(() => setLoading(false));
  }, []);

  return {
    departmentsStats,
    jobsStats,
    applicationsStats,
    applicationsMonthlyStats,
    applicationsStatsByJobs,
    applicationsStatsByCountries,
    applicationsStatsByStatus,
    applicationsStatsByStages,
    applicationsStatsByDepartments,
    topJobsByApplications,
    loading,

    fetchApplicationsMonthlyStats,
    fetchApplicationsStatsByJobs,
    fetchApplicationsStatsByCountries,
    fetchApplicationsStatsByStatus,
    fetchApplicationsStatsByStages,
    fetchApplicationsStatsByDepartments,
    fetchTopJobsByApplications,

    error,
    clearError,
  };
}
