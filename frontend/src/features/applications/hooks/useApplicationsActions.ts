import { use, useState } from "react";
import { useConfirm } from "@/hooks/useConfirm";
import { useApiError } from "@/hooks/useApiError";
import { changeApplicationStage, changeApplicationStatus, createApplication, deleteApplication, getApplication, updateApplication } from "../services/applications.service";
import { Application, CreateApplicationPayload, UpdateApplicationPayload } from "../types/applications.types";

export function useApplicationsActions(refetch?: () => Promise<void>) {
  const [loading, setLoading] = useState(false);
  const { error, clearError, handleError } = useApiError();
  const confirm = useConfirm();

  const findApplication = async (id: string) => {
    setLoading(true);
    try {
      const res = await getApplication(id);
      return res.data;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const create = async (payload: CreateApplicationPayload) => {
    setLoading(true);
    try {
      const res = await createApplication(payload);
      return res.data;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, payload: UpdateApplicationPayload) => {
    setLoading(true);
    try {
      const res = await updateApplication(id, payload);
      return res.data;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const destroy = async (id: string) => {
    setLoading(true);
    try {
      await deleteApplication(id);
      if (refetch) await refetch();
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async (application: Application) => {
    const ok = await confirm({
      title: "Delete application",
      description: `Are you sure you want to delete "${application.fullName}"? This action cannot be undone.`,
      confirmText: "Delete",
      destructive: true,
    });

    if (!ok) return;

    await destroy(application.id ?? application._id);
  };

  const changeStatus = async (id: string, status: string) => {
    setLoading(true);
    try {
      await changeApplicationStatus(id, status);
      if (refetch) await refetch();
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  const changeStage= async (id: string, status: string) => {
    setLoading(true);
    try {
      await changeApplicationStage(id, status);
      if (refetch) await refetch();
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    findApplication,
    create,
    update,
    destroy,
    changeStatus, 
    changeStage,
    confirmDelete,
    apiError: error,
    clearApiError: clearError,
  };
}
