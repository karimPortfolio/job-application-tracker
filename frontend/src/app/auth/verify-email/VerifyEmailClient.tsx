"use client";

import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, AlertCircle, MailCheck, ArrowRight } from "lucide-react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Status = "idle" | "loading" | "success" | "error";

export function VerifyEmailClient() {
  const searchParams = useSearchParams();
  const { verifyEmail, clearApiError, user, apiError } = useAuth();

  if (user && user.emailVerifiedAt) redirect("/dashboard");

  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);
  const email = useMemo(() => searchParams.get("email") || "", [searchParams]);

  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  const canVerify = Boolean(token && email);

  useEffect(() => {
    if (!canVerify || status !== "idle") return;

    handleVerify();
  }, [canVerify]);

  const handleVerify = async () => {
    if (!canVerify) {
      setStatus("error");
      setMessage("Missing verification details. Please use the link from your email.");
      return;
    }

    clearApiError();
    setStatus("loading");
    setMessage("");

    try {
      await verifyEmail(token, email);
      setStatus("success");
      setMessage("Your email is verified. You can now sign in.");
    } catch (err) {
      setStatus("error");
      setMessage(apiError?.message || "Verification failed. Please try again.");
    }
  };

  const headline = (() => {
    if (status === "success") return "Email verified";
    if (status === "error") return "Verification issue";
    return "Verifying your email";
  })();

  const subtext = (() => {
    if (status === "success") return "You are all set. Continue to sign in.";
    if (status === "error") return "We could not confirm your email. You can retry below.";
    return "Please wait while we confirm your email address.";
  })();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#c7d2fe,transparent_35%),radial-gradient(circle_at_80%_0%,#fde68a,transparent_25%),radial-gradient(circle_at_40%_80%,#fecdd3,transparent_30%)] dark:bg-[radial-gradient(circle_at_20%_20%,#312e81,transparent_35%),radial-gradient(circle_at_80%_0%,#0f172a,transparent_25%),radial-gradient(circle_at_40%_80%,#1f2937,transparent_30%)]">
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/90 dark:from-black/70 dark:via-black/50 dark:to-black/70" />

      <div className="relative mx-auto flex min-h-screen max-w-5xl items-center px-6 py-16">
        <div className="w-full">
          <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
            <Card className="bg-white/90 backdrop-blur-xl dark:bg-slate-900/70 border-white/60 dark:border-white/10 shadow-[0_25px_70px_-25px_rgba(15,23,42,0.35)]">
              <CardHeader className="pb-2 space-y-3">
                <div className="inline-flex items-center w-fit py-2 gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700 dark:border-blue-900/40 dark:bg-blue-900/30 dark:text-blue-100">
                  <MailCheck className="h-4 w-4" />
                  Email verification
                </div>
                <CardTitle className="text-3xl font-bold leading-tight text-slate-900 dark:text-white md:text-4xl">
                  {headline}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
                  {subtext}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {status === "error" && (
                  <Alert variant="destructive" className="border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950/60 dark:text-red-100">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle className="font-semibold">{message || "Verification failed."}</AlertTitle>
                    {apiError?.message && (
                      <AlertDescription className="text-sm text-red-700 dark:text-red-200/90">
                        {apiError.message}
                      </AlertDescription>
                    )}
                  </Alert>
                )}

                {status === "success" && (
                  <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950/60 dark:text-green-100">
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle className="font-semibold">{message}</AlertTitle>
                  </Alert>
                )}

                {status === "loading" && (
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-200">
                    <Spinner className="h-5 w-5" />
                    <span>Verifying your email...</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-3 pt-2">
                  <LoadingButton
                    onClick={handleVerify}
                    isLoading={status === "loading"}
                    disabled={!canVerify || status === "loading"}
                    size="lg"
                  >
                    {status === "success" ? "Re-verify" : "Verify email"}
                  </LoadingButton>

                  <Button asChild variant="outline" size="lg">
                    <Link href={status === "success" ? "/auth/login" : "/auth/email-verification"}>
                      <ArrowRight className="h-4 w-4" />
                      {status === "success" ? "Go to sign in" : "Back to verification"}
                    </Link>
                  </Button>
                </div>

                {!canVerify && (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    The link seems incomplete. Please open the verification link directly from your email.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-500 text-white border-none shadow-xl">
              <CardContent className="space-y-5">
                <div className="flex items-center justify-between text-sm font-semibold text-white/80">
                  <span>Status</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">Secure</span>
                </div>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className={`h-5 w-5 ${status === "success" ? "text-lime-200" : "text-white/60"}`} />
                    <div>
                      <p className="font-semibold">Confirm ownership</p>
                      <p className="text-sm text-white/80">We validate the link sent to your inbox.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MailCheck className="h-5 w-5 text-white" />
                    <div>
                      <p className="font-semibold">Protect your account</p>
                      <p className="text-sm text-white/80">Verification helps keep your data safe and recoverable.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className={`h-5 w-5 ${status === "error" ? "text-amber-200" : "text-white/60"}`} />
                    <div>
                      <p className="font-semibold">Need help?</p>
                      <p className="text-sm text-white/80">If this keeps failing, request a new link from the verification page.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

