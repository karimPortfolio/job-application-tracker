"use client";
import {
  SubscriptionPlan,
  SubscriptionStatus,
} from "@/features/pricing/enums/pricing.enums";
import { useAuthStore } from "@/stores/auth.store";
import { ReactNode } from "react";

export function ActiveSubscriptionGuard({
  children,
  redirectTo,
}: {
  children: ReactNode;
  redirectTo: string;
}) {
  const { user } = useAuthStore();

  const redirecting = () => {
    window.location.href = redirectTo;
    return null;
  };

  if (!user || !user.company) {
    return redirecting();
  }

  const company = user.company;

  if (company.subscriptionStatus !== SubscriptionStatus.ACTIVE) {
    return redirecting();
  }

  // const expiresAt = company.subscriptionExpiresAt
  //   ? new Date(company.subscriptionExpiresAt)
  //   : null;

  // if (!expiresAt || expiresAt.getTime() < Date.now()) {
  //   return redirecting();
  // }

  return <>{children}</>;
}
