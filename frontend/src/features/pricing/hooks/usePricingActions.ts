"use client";
import { useApiError } from "@/hooks/useApiError";
import { useState } from "react";
import { SubscriptionPayload } from "../types/pricing.types";
import { api } from "@/lib/api/axios";
import { PRICING_ROUTES } from "../routes/pricing.routes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function usePricingActions() {
  const [loading, setLoading] = useState(false);
  const { error, clearError, handleError } = useApiError();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  async function subscriptionCheckout(payload: SubscriptionPayload) {
    setLoading(true);
    try {
      const response = await api.post<{ url: string }>(
        PRICING_ROUTES.subscriptionCheckout,
        payload,
      );
      return response.data.url;
    } catch (err: any) {
      handleError(err);
      if (err.response && err.response.status && err.response.status === 401) {
        console.log("entered");
        const query = searchParams.toString();
        const nextUrl = query ? `${pathname}?${query}` : pathname;
        await router.push(`/auth/login?next=${encodeURIComponent(nextUrl as string)}`);
        return;
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    subscriptionCheckout,
    apiError: error,
    clearApiError: clearError,
  };
}
