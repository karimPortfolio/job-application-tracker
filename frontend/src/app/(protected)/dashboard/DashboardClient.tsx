"use client";

import { ApplicationsStatsByJobsChartCard } from "@/features/dashboard/components/ApplicationsStatsByJobsChartCard";
import { MonthlyStatsChartCard } from "@/features/dashboard/components/MonthlyStatsChartCard";
import { TotalStatsCards } from "@/features/dashboard/components/TotalStatsCards";

export function DashboardClient() {
  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <TotalStatsCards />
      <div className="row-span-2"></div>
      <MonthlyStatsChartCard />
      <ApplicationsStatsByJobsChartCard />
    </div>
  );
}
