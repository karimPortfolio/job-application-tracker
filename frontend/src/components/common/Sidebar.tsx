"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Briefcase,
  Building2,
  UserRound,
  Settings,
  Bell,
  Plus,
  Building,
} from "lucide-react";
import { Logo } from "../Logo";
import { useAuth } from "@/features/auth/hooks/useAuth";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: React.ReactNode;
};

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const mainNav: NavItem[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    { label: "Jobs", href: "/dashboard/jobs", icon: <Briefcase size={18} /> },
    {
      label: "Companies",
      href: "/dashboard/companies",
      icon: <Building2 size={18} />,
    },
    {
      label: "Candidates",
      href: "/dashboard/candidates",
      icon: <UserRound size={18} />,
    },
  ];

  const workflowNav: NavItem[] = [
    {
      label: "Notifications",
      href: "/dashboard/notifications",
      icon: <Bell size={18} />,
      badge: "12",
    },
    { label: "New Job", href: "/dashboard/jobs/new", icon: <Plus size={18} /> },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: <Settings size={18} />,
    },
  ];

  const renderGroup = (title: string, items: NavItem[]) => (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={pathname?.startsWith(item.href)}
              >
                <Link href={item.href}>
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge ? (
                    <span className="ml-auto text-xs text-muted-foreground">
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <ShadcnSidebar className="bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-900/80">
      <SidebarHeader className="px-4 py-3">
        <Logo width={130} height={60} />
      </SidebarHeader>
      <SidebarContent className="px-3 py-4 space-y-4">
        {renderGroup("Main", mainNav)}
        {renderGroup("Workflow", workflowNav)}
      </SidebarContent>
    <SidebarFooter className="px-4 py-3 border-t border-gray-200 dark:border-white/5">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-md bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-200">
         <Building className="size-4" />
        </div>
        <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 truncate">
          {user?.company?.name || "N/A"}
        </p>
        <p className="text-xs text-gray-500">Member</p>
        </div>
      </div>
    </SidebarFooter>
    </ShadcnSidebar>
  );
}
