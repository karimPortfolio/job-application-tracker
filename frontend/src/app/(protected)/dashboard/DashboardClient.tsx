"use client";

import { ApplicationsStatsByCountriesChartCard } from "@/features/dashboard/components/ApplicationsStatsByCountriesChartCard";
import { ApplicationsStatsByJobsChartCard } from "@/features/dashboard/components/ApplicationsStatsByJobsChartCard";
import { ApplicationsStatsTabs } from "@/features/dashboard/components/ApplicationsStatsTabs";
import { MonthlyStatsChartCard } from "@/features/dashboard/components/MonthlyStatsChartCard";
import { TotalStatsCards } from "@/features/dashboard/components/TotalStatsCards";

export function DashboardClient() {
  return (
    <div className="grid lg:grid-cols-3 gap-3">
      <TotalStatsCards />
      <ApplicationsStatsByCountriesChartCard className="row-span-2" />
      <MonthlyStatsChartCard />
      <ApplicationsStatsByJobsChartCard />
      <ApplicationsStatsTabs />
    </div>
  );
}
