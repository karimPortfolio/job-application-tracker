"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import Link from "next/link";

export function HomeClient() {
  const { user } = useAuth();

  return (
    <div>
      Home Client Component
      <div>
        {!user && <Link href="/auth/login">Sign In</Link>}
        {user && <Link href="/dashboard">Dashboard</Link>}
      </div>
    </div>
  );
}
