import { api } from "@/lib/api/axios";
import { ONBOARDING_ROUTES } from "../routes/onboarding.routes";
import type { OnboardingPayload, OnboardingResponse } from "../types/onboarding.types";

export async function createCompany(payload: OnboardingPayload) {
  const response = await api.post<OnboardingResponse>(ONBOARDING_ROUTES.createCompany, payload);
  return response.data;
}
