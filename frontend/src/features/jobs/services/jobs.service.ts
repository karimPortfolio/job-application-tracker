import { api } from "@/lib/api/axios";
import { JOBS_ROUTES } from "../routes/jobs.routes";
import { CreateJobPayload, Job, JobQuery, PaginatedResponse, UpdateJobPayload } from "../types/jobs.types";


export const getJobs = (query: JobQuery) => {
  return api.get<PaginatedResponse<Job>>(
    JOBS_ROUTES.getJobs,
    { params: query },
  );
};

export const getJob = (id: string) => {
  return api.get<Job>(JOBS_ROUTES.getJob(id));
};

export const createJob = (payload: CreateJobPayload) => {
  return api.post(JOBS_ROUTES.createJob, payload);
};

export const updateJob = (
  id: string,
  payload: UpdateJobPayload,
) => {
  return api.patch(JOBS_ROUTES.updateJob(id), payload);
};

export const deleteJob = (id: string) => {
  return api.delete(JOBS_ROUTES.deleteJob(id));
};
