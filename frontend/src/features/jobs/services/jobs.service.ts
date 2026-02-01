import { api } from "@/lib/api/axios";
import { JOBS_ROUTES } from "../routes/jobs.routes";
import { CreateJobPayload, GenerateJobDescriptionPayload, Job, JobQuery, PaginatedResponse, UpdateJobPayload } from "../types/jobs.types";
import { Department } from "@/features/departments/types/departments.types";


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

export const generateJobDescription = (payload: GenerateJobDescriptionPayload) => {
  return api.post<{ context: string }>(
    JOBS_ROUTES.generateDescription,
    payload,
  );
}

export const getDepartments = () => {
  return api.get<Department[]>(JOBS_ROUTES.departments);
};

export const changeStatus = (id: string, status: string) => {
  return api.patch(JOBS_ROUTES.changeStatus(id), { status });
}