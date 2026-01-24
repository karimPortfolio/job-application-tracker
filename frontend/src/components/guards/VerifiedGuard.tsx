"use client";

import { ReactNode } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { redirect, usePathname, useSearchParams } from "next/navigation";

export function VerifiedGuard({ children }: { children: ReactNode }) {
  const { user, initialized } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isVerificationPath = pathname?.startsWith("/auth/email-verification") || pathname?.startsWith("/auth/email-verified");

  const query = searchParams.toString();
  const nextUrl = query ? `${pathname}?${query}` : pathname;

  if (!initialized) return null;

  if (!user) {
    redirect(`/auth/login?next=${encodeURIComponent(nextUrl)}`);
  }

  if (!user?.emailVerifiedAt && !isVerificationPath) {
    redirect(`/auth/email-verification?next=${encodeURIComponent(nextUrl)}`);
  }


  return <>{children}</>;
}
