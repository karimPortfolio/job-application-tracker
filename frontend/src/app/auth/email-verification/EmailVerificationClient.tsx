"use client";

import AuthHero from "@/features/auth/components/AuthHero";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { LoadingButton } from "@/components/ui/loading-button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, CheckCircle2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { redirect } from "next/navigation";

export default function EmailVerificationClient() {
  const { resentVerification, user, apiError, clearApiError } = useAuth();

  if (user && user.emailVerifiedAt) redirect("/dashboard");

  const appName = useMemo(() => {
    return process.env.NEXT_PUBLIC_APP_NAME || "Intevio";
  }, []);

  const [cooldown, setCooldown] = useState(0);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  const handleResend = async () => {
    clearApiError();
    setSent(false);
    setSending(true);

    try {
      await resentVerification();
      setSent(true);
      setCooldown(30);
    } catch {
      // apiError handled centrally
    } finally {
      setSending(false);
    }
  };

  const isDisabled = sending || cooldown > 0;

  return (
    <div className="auth-container grid grid-cols-1 lg:grid-cols-3 h-screen w-full">
      <div className="col-span-1 flex min-h-screen flex-col items-center justify-center p-10">
        <h1 className="text-3xl sm:text-4xl mb-2 text-start font-bold w-full">
          Verify your email
        </h1>
        <p className="text-xs sm:text-sm mb-8 w-full dark:text-gray-600 text-gray-500 ">
          We emailed you a verification link. Please confirm your address to activate your account.
        </p>

        {apiError?.message && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle>{apiError.message}</AlertTitle>
          </Alert>
        )}

        {sent && (
          <Alert className="mb-4 border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Verification email sent</AlertTitle>
          </Alert>
        )}

        <LoadingButton
          type="button"
          className="w-full"
          isLoading={sending}
          disabled={isDisabled}
          loadingText="Sending..."
          onClick={handleResend}
        >
          {cooldown > 0
            ? `Resend available in ${cooldown}s`
            : 'Resend verification email'}
        </LoadingButton>
      </div>

      <div className="col-span-2 p-2">
        <AuthHero
          appName={appName}
          subheadline="Stay organized and track every application in one place."
        />
      </div>
    </div>
  );
}
