"use client";

import AuthHero from "@/features/auth/components/AuthHero";
import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordClient() {
  const searchParams = useSearchParams();

  const token = searchParams.get("token") || undefined;
  const email = searchParams.get("email") || undefined;

  const appName = useMemo(() => {
    return process.env.NEXT_PUBLIC_APP_NAME || "Intevio";
  }, []);

  return (
    <div className="auth-container grid grid-cols-1 lg:grid-cols-3 h-screen w-full">
      <div className="col-span-1 flex min-h-screen flex-col items-center justify-center p-10">
        <h1 className="text-3xl sm:text-4xl mb-2 text-start font-bold w-full">
          Reset your password
        </h1>
        <p className="text-xs sm:text-sm mb-12 w-full dark:text-gray-600 text-gray-500 ">
          Enter your new password to regain access to your account.
        </p>

        <ResetPasswordForm token={token} email={email} />

        <div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Remembered your password?{' '}
            <a
              href="/auth/login"
              className="font-medium text-black hover:underline dark:text-white"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>

      <div className="col-span-2 p-2">
        <AuthHero appName={appName} subheadline="Track your job applications and stay organized." />
      </div>
    </div>
  );
}
