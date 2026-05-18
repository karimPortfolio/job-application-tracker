"use client";
import {
  SubscriptionPlan,
  SubscriptionStatus,
} from "@/features/pricing/enums/pricing.enums";
import { useAuthStore } from "@/stores/auth.store";
import { ReactNode } from "react";

export function SubscriptionGuard({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode | (() => ReactNode);
}) {
  const { user } = useAuthStore();

  const renderFallback = () =>
    typeof fallback === "function" ? fallback() : fallback ?? null;

  if (!user || !user.company) {
    return renderFallback();
  }

  const company = user.company;

  if (company.subscriptionStatus !== SubscriptionStatus.ACTIVE) {
    return renderFallback();
  }

  if (company.plan === SubscriptionPlan.FREE) {
    return renderFallback();
  }

  const expiresAt = company.subscriptionExpiresAt
    ? new Date(company.subscriptionExpiresAt)
    : null;

  if (!expiresAt || expiresAt.getTime() < Date.now()) {
    return renderFallback();
  }

  return <>{children}</>;
}