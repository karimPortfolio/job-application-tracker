"use client";

import AuthHero from "@/features/auth/components/AuthHero";
import { GoogleButton } from "@/features/auth/components/GoogleButton";
import LoginForm from "@/features/auth/components/LoginForm";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Link from "next/link";
import { Suspense, useMemo } from "react";

export default function LoginClient() {
  const { googleOAuthRedirect } = useAuth();

  const appName = useMemo(() => {
    return process.env.NEXT_PUBLIC_APP_NAME || "Hirely";
  }, []);

  return (
    <div className="auth-container grid grid-cols-1 lg:grid-cols-3 h-screen w-full">
      <div className="col-span-1 flex min-h-screen flex-col items-center justify-center p-10">
        <h1 className="text-3xl sm:text-4xl mb-2 text-start font-bold w-full">
          Sign in
        </h1>
        <p className="text-xs sm:text-sm mb-12 w-full dark:text-gray-600 text-gray-500 ">
          Welcome back! Please sign in to continue.
        </p>

        <div className="mb-2 w-full">
          <GoogleButton
            label="Sign in with Google"
            onClick={() => googleOAuthRedirect()}
          />
        </div>

        <div className="w-full flex items-center gap-3 my-8">
          <span className="h-px flex-1 bg-gray-200 dark:bg-zinc-800" />
          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-500 dark:text-gray-400">
            Or continue with email
          </span>
          <span className="h-px flex-1 bg-gray-200 dark:bg-zinc-800" />
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>

        <div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-black hover:underline dark:text-white"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <div className="col-span-2 p-2">
        <AuthHero
          appName={appName}
          subheadline="Track your job applications and stay organized."
        />
      </div>
    </div>
  );
}
