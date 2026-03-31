import { api } from "@/lib/api/axios";
import { PUBLIC_JOBS_ROUTES } from "../routes/public-jobs.routes";
import { Job, JobQuery, PaginatedResponse } from "../types/jobs.types";


export const getPublicJobs = async (query: JobQuery) => {
  return api.get<PaginatedResponse<Job>>(PUBLIC_JOBS_ROUTES.getPublicJobs, { params: query });
};

export const getPublicJob = async (id: string) => {
  return api.get<Job>(PUBLIC_JOBS_ROUTES.getPublicJob(id));
}