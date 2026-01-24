"use client";

import { ReactNode } from "react";
import { Spinner } from "@/components/ui/spinner";
import { redirect, usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";

export function PublicAuthGuard({ children }: { children: ReactNode }) {
  const { user, initialized } = useAuthStore();
  const pathname = usePathname();

  const isEmailVerificationFlow = pathname?.startsWith("/auth/email-verification") || pathname?.startsWith("/auth/verify-email");

  if (!initialized) return <Spinner className="size-6" />;

  if (user && !isEmailVerificationFlow) {
    redirect(`/dashboard`);
  }

  return <>{children}</>;
}
