import { useState } from "react";
import { useApiError } from "@/hooks/useApiError";
import { CreateApplicationPayload } from "../../types/applications.types";
import { createPublicApplication } from "../../services/public-applications.service";


export function usePublicApplicationsActions(refetch?: () => Promise<void>) {
  const [loading, setLoading] = useState(false);
  const { error, clearError, handleError } = useApiError();

  const create = async (payload: CreateApplicationPayload, headers: any) => {
    setLoading(true);
    try {
      const res = await createPublicApplication(payload, headers);
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
    create,
    apiError: error,
    clearApiError: clearError,
  };
}
