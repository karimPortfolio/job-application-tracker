import { useCallback, useState } from "react";
import { toast } from "sonner";

import type { OnboardingPayload, OnboardingResponse } from "../types/onboarding.types";
import { createCompany } from "../services/onboarding.service";
import { useApiError } from "@/hooks/useApiError";
import { api } from "@/lib/api/axios";

export function useOnboarding() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { error, handleError, clearError } = useApiError();

  const submit = useCallback(async (payload: OnboardingPayload): Promise<OnboardingResponse> => {
    setIsSubmitting(true);
    clearError();
    try {
      const result = await createCompany(payload);
      toast.success("Company profile saved", {
        description: "You can adjust this later in settings.",
      });
      return result;
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { 
    submit,
    isSubmitting,
    apiError: error,
    clearApiError: clearError,
  };
}
