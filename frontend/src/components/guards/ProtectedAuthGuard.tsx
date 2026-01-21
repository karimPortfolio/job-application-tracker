"use client";

import { ReactNode } from "react";
import { Spinner } from "@/components/ui/spinner";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";

export function ProtectedAuthGuard({ children }: { children: ReactNode }) {
  const { user, initialized } = useAuthStore();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!initialized) return <Spinner className="size-6" />;

  if (!user) {
    const query = searchParams.toString();
    const nextUrl = query ? `${pathname}?${query}` : pathname;

    redirect(`/auth/login?next=${encodeURIComponent(nextUrl)}`);
  }

  return <>{children}</>;
}
