"use client";

import AuthHero from "@/features/auth/components/AuthHero";
import { GoogleButton } from "@/features/auth/components/GoogleButton";
import RegisterForm from "@/features/auth/components/RegisterForm";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useMemo } from "react";

export default function RegisterClient() {
  const { googleOAuthRedirect } = useAuth();

  const appName = useMemo(() => {
    return process.env.NEXT_PUBLIC_APP_NAME || "Intevio";
  }, []);

  return (
    <div className="auth-container grid grid-cols-1 lg:grid-cols-2 h-screen w-full">
      <div className="p-2 rounded-lg">
        <AuthHero appName={appName} />
      </div>

      <div className="flex flex-col items-center px-10 sm:px-32 py-6 h-screen overflow-auto">

        {/* == TITLE AND DESCRIPTION == */}
        <h1 className="text-3xl sm:text-4xl mb-2 text-start font-bold w-full">
          Create your account
        </h1>
        <p className="text-xs sm:text-sm mb-8 w-full dark:text-gray-600 text-gray-500 ">
          Sign up to start tracking your job applications and manage your career efficiently.
        </p>

        <RegisterForm />

       {/* == HAVE ACCOUNT LINK == */}
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

        {/* == GOOGLE OAUTH == */}
        <div className="w-full flex items-center gap-3 my-8">
          <span className="h-px flex-1 bg-gray-200 dark:bg-zinc-800" />
          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-500 dark:text-gray-400">
            Or continue with Google
          </span>
          <span className="h-px flex-1 bg-gray-200 dark:bg-zinc-800" />
        </div>

        <div className="mb-2 w-full">
          <GoogleButton
            label="Sign up with Google"
            onClick={() => googleOAuthRedirect()}
          />
        </div>
      </div>
    </div>
  );
}
