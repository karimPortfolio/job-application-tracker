"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Bell, BrushCleaning, Building2, CreditCard, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const MAIN_PATH = "/dashboard/settings";

export function SettingsSidebar() {
  const pathname = usePathname();

  const personalNavs = [
    {
      label: "Preferences",
      icon: <BrushCleaning />,
      href: `${MAIN_PATH}/preferences`,
    },
    {
      label: "Notifications",
      icon: <Bell />,
      href: `${MAIN_PATH}/notifications`,
    },
  ];

  const companyNavs = [
    {
      label: "General Informations",
      icon: <Building2 />,
      href: `${MAIN_PATH}/company/general`,
    },
    {
      label: "Billing",
      icon: <CreditCard />,
      href: `${MAIN_PATH}/company/billing`,
    },
  ];

  const renderGroup = (title: string, items: NavItem[]) => (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link href={item.href}>
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar
      collapsible="none"
      className="hidden md:flex rounded-lg pb-10 h-fit bg-transparent"
    >
      <SidebarHeader>
        <SidebarMenu>
            <SidebarMenuItem className="font-medium text-lg px-2 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Settings
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {renderGroup("Personal", personalNavs)}
        {renderGroup("Company", companyNavs)}
      </SidebarContent>
    </Sidebar>
  );
}
