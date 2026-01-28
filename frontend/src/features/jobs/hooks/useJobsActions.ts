import { use, useState } from "react";
import { useConfirm } from "@/hooks/useConfirm";
import { useApiError } from "@/hooks/useApiError";
import { createJob, deleteJob, getJob, updateJob } from "../services/jobs.service";
import { CreateJobPayload, Job, UpdateJobPayload } from "../types/jobs.types";

export function useJobActions() {
  const [loading, setLoading] = useState(false);
  const { error, clearError, handleError } = useApiError();
  const confirm = useConfirm();

  const findJob = async (id: string) => {
    setLoading(true);
    try {
      const res = await getJob(id);
      return res.data;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const create = async (payload: CreateJobPayload) => {
    setLoading(true);
    try {
      const res = await createJob(payload);
      return res.data;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, payload: UpdateJobPayload) => {
    setLoading(true);
    try {
      const res = await updateJob(id, payload);
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
      await deleteJob(id);
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async (job: Job) => {
    const ok = await confirm({
      title: "Delete job",
      description: `Are you sure you want to delete "${job.title}"? This action cannot be undone.`,
      confirmText: "Delete",
      destructive: true,
    });

    if (!ok) return;

    await destroy(job.id ?? job._id);
  };

  return {
    loading,
    findJob: findJob,
    create,
    update,
    destroy,
    confirmDelete,
    apiError: error,
    clearApiError: clearError,
  };
}
