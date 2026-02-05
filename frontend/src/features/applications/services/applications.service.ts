import { api } from "@/lib/api/axios";
import { APPLICATIONS_ROUTES } from "../routes/applications.routes";
import {
  Application,
  ApplicationQuery,
  ApplicationStage,
  ApplicationStatus,
  CreateApplicationPayload,
  PaginatedResponse,
  UpdateApplicationPayload,
} from "../types/applications.types";

export const getApplications = (query?: ApplicationQuery) => {
  return api.get<PaginatedResponse<Application>>(
    APPLICATIONS_ROUTES.getApplications,
    { params: query },
  );
};

export const getApplication = (id: string) => {
  return api.get<Application>(APPLICATIONS_ROUTES.getApplication(id));
};

export const createApplication = (payload: CreateApplicationPayload | FormData) => {
  console.log(payload);
  return api.post(APPLICATIONS_ROUTES.createApplication, payload, {
    headers:{ "Content-Type": "multipart/form-data" }
  });
};

export const updateApplication = (
  id: string,
  payload: UpdateApplicationPayload | FormData,
) => {
  return api.patch(APPLICATIONS_ROUTES.updateApplication(id), payload, {
    headers:
      payload instanceof FormData
        ? { "Content-Type": "multipart/form-data" }
        : {},
  });
};

export const deleteApplication = (id: string) => {
  return api.delete(APPLICATIONS_ROUTES.deleteApplication(id));
};

export const exportApplications = (format: "csv" | "xlsx") => {
  return api.get(APPLICATIONS_ROUTES.exportApplications, {
    params: { format },
    responseType: "blob",
  });
};

export const changeApplicationStatus = (id: string, status: string) => {
  return api.patch(APPLICATIONS_ROUTES.changeStatus(id), { status });
};

export const changeApplicationStage = (id: string, stage: string) => {
  return api.patch(APPLICATIONS_ROUTES.changeStage(id), { stage });
};

export const parseResume = (payload: FormData, signal?: AbortSignal) => {
  return api.post<Record<string, any>>(APPLICATIONS_ROUTES.parseResume, payload, {
    headers: { "Content-Type": "multipart/form-data" },
    signal,
  });
};

export const getApplicationsJobs = () => {
  return api.get<{ id: string; title: string }[]>(
    APPLICATIONS_ROUTES.getApplicationsJobs,
  );
};