import { useApiError } from "@/hooks/useApiError";
import { useCallback, useState } from "react";
import { PasswordUpdatePayload, ProfileUpdatePayload } from "../types/profile.types";
import { passwordUpdate, update } from "../services/profile.service";

export function useProfileActions() {
  const [loading, setLoading] = useState(false);
  const { error, handleError, clearError } = useApiError();

  const updateProfile = useCallback(async (payload: ProfileUpdatePayload | FormData) => {
    setLoading(true);
    try {
      const res = await update(payload);
      return res.data ?? res.data.data ?? null;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const updatePassword = useCallback(async (payload: PasswordUpdatePayload) => {
    setLoading(true);
    try {
      const res = await passwordUpdate(payload);
      return res.data ?? res.data.data ?? null;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [handleError]);


  return {
    updateProfile,
    updatePassword,
    loading,
    
    apiError: error,
    clearApiError: clearError
  }
}
