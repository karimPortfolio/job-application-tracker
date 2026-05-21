import { useApiError } from "@/hooks/useApiError";
import { useState } from "react";
import { CompanyPayload, PreferencePayload } from "../types/settings.types";
import {
  cancelBilling,
  updateCompany,
  updatePreferences,
} from "../services/settings.service";

export function usePreferencesActions() {
  const [loading, setLoading] = useState(false);
  const { error, clearError, handleError } = useApiError();

  async function updatePersonalPreferences(payload: PreferencePayload) {
    setLoading(true);
    try {
      await updatePreferences(payload);
    } catch (err) {
      handleError(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  // async function updateCompanyDetails(payload: CompanyPayload) {
  //   setLoading(true);
  //   try {
  //     await updateCompany(payload);
  //   } catch (err) {
  //     handleError(err);
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // async function cancelCompanyBilling() {
  //   setLoading(true);
  //   try {
  //     await cancelBilling();
  //   } catch (err) {
  //     handleError(err);
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  return {
    loading,
    updatePreferences: updatePersonalPreferences,

    apiError: error,
    clearApiError: clearError,
  };
}
