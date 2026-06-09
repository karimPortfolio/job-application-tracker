import { useApiError } from "@/hooks/useApiError";
import { useState } from "react";
import { BillingDetails } from "../types/settings.types";
import { cancelBilling, getBillingDetails } from "../services/settings.service";

export function useBillingActions() {
  const [loading, setLoading] = useState<boolean>(false);
  const [billingDetails, setBillingDetails] = useState<BillingDetails|null>(null);
  const { error, clearError, handleError } = useApiError();


  async function fetchCompanyBillingDetails() {
    setLoading(true);
    try {
      const response = await getBillingDetails();
      setBillingDetails(response.data);
    } catch (err) {
      handleError(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function cancelCompanySubscription() {
    setLoading(true);
    try {
      const response = await cancelBilling();
      return response;
    }  catch (err) {
      handleError(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    billingDetails,
    fetchCompanyBillingDetails,
    cancelCompanySubscription,

    apiError: error,
    clearApiError: clearError,
  };
}
