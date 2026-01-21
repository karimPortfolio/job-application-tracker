"use client";

import AuthHero from "@/features/auth/components/AuthHero";
import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";
import Link from "next/link";
import { useMemo } from "react";

export default function ForgotPasswordClient() {

  const appName = useMemo(() => {
    return process.env.NEXT_PUBLIC_APP_NAME || "Intevio";
  }, []);

  return (
    <div className="auth-container grid grid-cols-1 lg:grid-cols-3 h-screen w-full">
      <div className="col-span-1 flex min-h-screen flex-col items-center justify-center p-10">
        <h1 className="text-3xl sm:text-4xl mb-2 text-start font-bold w-full">
          Forgot your password?
        </h1>
        <p className="text-xs sm:text-sm mb-12 w-full dark:text-gray-600 text-gray-500 ">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        <ForgotPasswordForm />

        <div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              href="/auth/login"
              className="font-medium text-black hover:underline dark:text-white"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <div className="col-span-2 p-2">
        <AuthHero appName={appName} subheadline="Track your job applications and stay organized." />
      </div>
    </div>
  );
}
