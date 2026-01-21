"use client";

import { ReactNode } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { redirect, usePathname, useSearchParams } from "next/navigation";

export function CompanyGuard({ children }: { children: ReactNode }) {
  const { user, initialized } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!initialized) return null;

  const query = searchParams.toString();
  const nextUrl = query ? `${pathname}?${query}` : pathname;

  if (!user) {
    redirect(`/auth/login?next=${encodeURIComponent(nextUrl)}`);
  }

  if (pathname !== "/onboarding" && !user?.company) {
    redirect(`/onboarding?next=${encodeURIComponent(nextUrl)}`);
  }

  if (pathname === "/onboarding" && user?.company) {
    redirect(`/dashboard`);
  }

  return <>{children}</>;
}
