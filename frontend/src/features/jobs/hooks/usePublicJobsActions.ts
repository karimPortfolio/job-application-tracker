import { useState } from "react";
import { useApiError } from "@/hooks/useApiError";
import { getPublicJob } from "../services/public-jobs.service";

export function usePublicJobActions(refetch?: () => Promise<void>) {
  const [loading, setLoading] = useState(false);
  const { error, clearError, handleError } = useApiError();

  const findJob = async (id: string) => {
    setLoading(true);
    try {
      const res = await getPublicJob(id);
      return res.data;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    findJob: findJob,
    apiError: error,
    clearApiError: clearError,
  };
}
