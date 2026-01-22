"use client";

import { AvatarDropdown } from "@/components/common/AvatarDropdown";
import { Logo } from "@/components/Logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { OnboardingForm } from "@/features/onboarding/components/OnboardingForm";
import { CreditCardIcon, SettingsIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export interface AvatarDropdownItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export function OnboardingClient() {
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const handleSuccess = () => {
    router.replace("/dashboard");
  };

  const avatarDropdownItems: AvatarDropdownItem[] = [
    { label: "Profile", icon: <UserIcon />, onClick: () => {}, disabled: true },
    {
      label: "Billing",
      icon: <CreditCardIcon />,
      onClick: () => {},
      disabled: true,
    },
    {
      label: "Settings",
      icon: <SettingsIcon />,
      onClick: () => {},
      disabled: true,
    },
  ];

  return (
    <div className="relative min-h-screen w-full px-4 py-5">
      <div className="flex justify-between items-center mb-15">
        <Logo width={150} height={60} />
        <AvatarDropdown
          user={user}
          loading={loading}
          logout={logout}
          items={avatarDropdownItems}
        />
      </div>
      <div className="relative mx-auto flex max-w-5xl items-center justify-center">
        <Card className="relative w-full border bg-white/80 text-slate-900 shadow-xs dark:border-white/10 dark:bg-white/5 dark:text-white">
          <CardHeader className="relative space-y-4">
            <div className="inline-flex items-center gap-2  w-fit rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-secondary dark:text-white">
              Company setup
            </div>
            <CardTitle className="text-3xl leading-tight mb-0">
              Set up your company workspace
            </CardTitle>
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
