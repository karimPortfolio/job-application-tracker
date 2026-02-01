import { useCallback, useState } from "react";
import type {
  CreateDepartmentPayload,
  Department,
  UpdateDepartmentPayload,
} from "../types/departments.types";
import {
  createDepartment,
  deleteDepartment,
  getDepartment,
  updateDepartment,
} from "../services/departments.service";
import { useConfirm } from "@/hooks/useConfirm";
import { useApiError } from "@/hooks/useApiError";

export function useDepartmentsActions() {
  const [loading, setLoading] = useState(false);
  const { error, clearError, handleError } = useApiError();
  const confirm = useConfirm();

  const findDepartment = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        const res = await getDepartment(id);
        return res.data;
      } catch (err) {
        handleError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [handleError],
  );

  const create = useCallback(
    async (payload: CreateDepartmentPayload) => {
      setLoading(true);
      try {
        const res = await createDepartment(payload);
        return res.data;
      } catch (err) {
        handleError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [handleError],
  );

  const update = useCallback(
    async (id: string, payload: UpdateDepartmentPayload) => {
      setLoading(true);
      try {
        const res = await updateDepartment(id, payload);
        return res.data;
      } catch (err) {
        handleError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [handleError],
  );

  const destroy = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        await deleteDepartment(id);
      } catch (err) {
        handleError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [handleError],
  );

  const confirmDelete = useCallback(
    async (department: Department) => {
      const ok = await confirm({
        title: "Delete department",
        description: `Are you sure you want to delete "${department.title}"? This action cannot be undone.`,
        confirmText: "Delete",
        destructive: true,
      });

      if (!ok) return;

      await destroy(department._id);
    },
    [confirm, destroy],
  );

  return {
    loading,
    findDepartment,
    create,
    update,
    destroy,
    confirmDelete,
    apiError: error,
    clearApiError: clearError,
  };
}
