"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { AvatarDropdown } from "../common/AvatarDropdown";
import { AvatarDropdownItem } from "@/app/(protected)/onboarding/OnboardingClient";
import { CreditCardIcon, SettingsIcon, UserIcon } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import { NotificationsDropdown } from "../common/NotificationDropdown";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function DashboardNavbar() {
  const { user, logout, loading } = useAuth();

  const items: AvatarDropdownItem[] = [
    {
      label: "Profile",
      icon: <UserIcon />,
      onClick: () => {},
      disabled: false,
    },
    {
      label: "Billing",
      icon: <CreditCardIcon />,
      onClick: () => {},
      disabled: false,
    },
    {
      label: "Settings",
      icon: <SettingsIcon />,
      onClick: () => {},
      disabled: false,
    },
  ];

  return (
    <div className="flex justify-between items-center p-3">
      <div>
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarTrigger className="dark:text-dark-300 text-gray-600" />
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Toggle sidebar</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex items-center gap-4">
        <NotificationsDropdown />

        <AvatarDropdown
          user={user}
          logout={logout}
          loading={loading}
          items={items}
          showUserInfo={true}
        />
      </div>
    </div>
  );
}
