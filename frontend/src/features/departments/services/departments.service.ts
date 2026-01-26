import { api } from "@/lib/api/axios";
import { DEPARTMENTS_ROUTES } from "../routes/departments.routes";
import type {
  CreateDepartmentPayload,
  Department,
  DepartmentQuery,
  PaginatedResponse,
  UpdateDepartmentPayload,
} from "../types/departments.types";

export const getDepartments = (query: DepartmentQuery) => {
  return api.get<PaginatedResponse<Department>>(
    DEPARTMENTS_ROUTES.getDepartments,
    { params: query },
  );
};

export const getDepartment = (id: string) => {
  return api.get<Department>(DEPARTMENTS_ROUTES.getDepartment(id));
};

export const createDepartment = (payload: CreateDepartmentPayload) => {
  return api.post(DEPARTMENTS_ROUTES.createDepartment, payload);
};

export const updateDepartment = (
  id: string,
  payload: UpdateDepartmentPayload,
) => {
  return api.patch(DEPARTMENTS_ROUTES.updateDepartment(id), payload);
};

export const deleteDepartment = (id: string) => {
  return api.delete(DEPARTMENTS_ROUTES.deleteDepartment(id));
};
