"use client";

import { PageHeader } from "@/components/PageHeader";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname } from "next/navigation";

export interface ProfileTab {
  label: string;
  value: string;
  href?: string;
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const tabs: ProfileTab[] = [
    {
      label: "Personal Informations",
      value: "general",
      href: "/dashboard/profile/general",
    },
    {
      label: "Security Settings",
      value: "security",
      href: "/dashboard/profile/security",
    },
  ];

  return (
    <div className="w-full">
      <PageHeader title="Profile" description="Manage your profile." />

      <Tabs value={pathname}>
        <TabsList>
          {tabs.map((tab: ProfileTab) => (
            <TabsTrigger key={tab.value} value={tab.href ?? tab.value} href={tab.href ?? undefined}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-6">{children}</div>
      </Tabs>
    </div>
  );
}
