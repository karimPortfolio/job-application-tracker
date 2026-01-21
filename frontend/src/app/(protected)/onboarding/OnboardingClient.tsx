"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OnboardingForm } from "@/features/onboarding/components/OnboardingForm";
import { useRouter } from "next/navigation";

export function OnboardingClient() {
  const router = useRouter();
  const handleSuccess = () => {
    router.replace("/dashboard");
  };

  return (
    <div className="relative min-h-screen w-full px-4 py-10">
      <div className="relative mx-auto flex max-w-5xl items-center justify-center">
        <Card className="relative w-full border bg-white/80 text-slate-900 shadow-xs dark:border-white/10 dark:bg-white/5 dark:text-white">
          <CardHeader className="relative space-y-4">
            <div className="inline-flex items-center gap-2 w-fit rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-secondary dark:text-white">
              Company setup
            </div>
            <CardTitle className="text-3xl leading-tight mb-0">Set up your company workspace</CardTitle>
            <CardDescription className="text-base text-slate-600 dark:text-white/70">
              Provide some details about your company to get started.
            </CardDescription>
          </CardHeader>

          <CardContent className="relative">
            <OnboardingForm onSuccess={handleSuccess} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

