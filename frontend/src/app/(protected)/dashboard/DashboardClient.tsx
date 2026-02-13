"use client";

import { ApplicationsStatsByCountries } from "@/features/dashboard/components/ApplicationsStatsByCountries";
import { ApplicationsStatsByDepartments } from "@/features/dashboard/components/ApplicationsStatsByDepartments";
import { ApplicationsStatsByJobs } from "@/features/dashboard/components/ApplicationsStatsByJobs";
import { ApplicationsStatsTabs } from "@/features/dashboard/components/ApplicationsStatsTabs";
import { MonthlyStatsChartCard } from "@/features/dashboard/components/MonthlyStatsChartCard";
import { TopJobsByApplications } from "@/features/dashboard/components/TopJobsByApplications";
import { TotalStatsCards } from "@/features/dashboard/components/TotalStatsCards";

export function DashboardClient() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      <TotalStatsCards />
      <ApplicationsStatsByCountries className="lg:row-span-2 h-133 lg:h-auto" />
      <MonthlyStatsChartCard />
      <ApplicationsStatsByJobs />
      <ApplicationsStatsTabs />
      <ApplicationsStatsByDepartments />
      <TopJobsByApplications />
    </div>
  );
}
