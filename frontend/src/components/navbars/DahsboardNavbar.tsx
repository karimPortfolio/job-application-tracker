"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { AvatarDropdown } from "../common/AvatarDropdown";
import { AvatarDropdownItem } from "@/app/(protected)/onboarding/OnboardingClient";
import { CreditCardIcon, SettingsIcon, UserIcon } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import { NotificationsDropdown } from "../common/NotificationDropdown";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { ThemeSwitcher } from "../ThemeSwitcher";

export function DashboardNavbar() {
  const { user, logout, loading } = useAuth();
  const pathname = usePathname();

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

  const currentRoute = useMemo(() => pathname.split("/")[2] || "dashboard", [pathname]);

  return (
    <div className="flex justify-between items-center p-3 pt-1">
      <div className="flex items-center gap-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarTrigger className="dark:text-dark-300 text-gray-600" />
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Toggle sidebar</p>
          </TooltipContent>
        </Tooltip>
        <div>
            <nav>
              <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                 {currentRoute !== "dashboard" && <BreadcrumbLink href="/dashboard" className="text-muted-foreground cursor-pointer">Dashboard</BreadcrumbLink>}
                 {currentRoute === "dashboard" && <BreadcrumbPage className="capitalize">Dashboard</BreadcrumbPage>}
                </BreadcrumbItem>
                {currentRoute !== "dashboard" && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                <BreadcrumbPage className="capitalize">
                  {currentRoute !== "dashboard" && currentRoute.replace("-", " ")}
                </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
              </Breadcrumb>
            </nav>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ThemeSwitcher />
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
