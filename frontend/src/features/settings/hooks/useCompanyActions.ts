import { useApiError } from "@/hooks/useApiError";
import { useState } from "react";
import { CompanyPayload } from "../types/settings.types";
import { updateCompany } from "../services/settings.service";

export function useCompanyActions() {
  const [loading, setLoading] = useState(false);
  const { error, clearError, handleError } = useApiError();


  async function updateCompanyDetails(payload: CompanyPayload) {
    setLoading(true);
    try {
      await updateCompany(payload);
    } catch (err) {
      handleError(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    updateCompany: updateCompanyDetails,

    apiError: error,
    clearApiError: clearError,
  };
}
