"use client";

import { useEffect } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Spinner } from "@/components/ui/spinner";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { fetchUser, initialized } = useAuth();

  useEffect(() => {
    fetchUser();
  }, []);

  if (!initialized) return (
    <div className="flex justify-center items-center h-44" >
      <Spinner className="size-8" />
    </div>
  );

  return <>{children}</>;
}
