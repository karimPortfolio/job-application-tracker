"use client";
import { UserRole } from "@/features/auth/types";
import { useAuthStore } from "@/stores/auth.store";
import { redirect, usePathname, useSearchParams } from "next/navigation";

export function RecruiterRoleGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, initialized } = useAuthStore();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!initialized) return null;

  const query = searchParams.toString();
  const nextUrl = query ? `${pathname}?${query}` : pathname;

  if (!user) {
    redirect(`/auth/login?next=${encodeURIComponent(nextUrl)}`);
  }

  const isRecruiter = user.role && user.role === UserRole.RECRUITER;
  const isPrivateRoute =
    pathname.includes("dashboard") || pathname.includes("onboarding");

  if (isPrivateRoute && !isRecruiter) {
    redirect(`/`);
  }

  return children;
}
