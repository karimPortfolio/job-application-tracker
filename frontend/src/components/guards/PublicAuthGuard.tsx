"use client";

import { ReactNode } from "react";
import { Spinner } from "@/components/ui/spinner";
import { redirect } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";

export function PublicAuthGuard({ children }: { children: ReactNode }) {
  const { user, initialized } = useAuthStore();

  if (!initialized) return <Spinner className="size-6" />;

  if (user) {
    redirect(`/dashboard`);
  }

  return <>{children}</>;
}
