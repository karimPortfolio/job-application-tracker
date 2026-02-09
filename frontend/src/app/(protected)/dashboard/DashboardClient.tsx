"use client";

import { MonthlyStatsChartsCards } from "@/features/dashboard/components/MonthlyStatsChartsCards";
import { TotalStatsCards } from "@/features/dashboard/components/TotalStatsCards";

export function DashboardClient() {
  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <TotalStatsCards />
      <div className="row-span-2"></div>
      <MonthlyStatsChartsCards />
    </div>
  );
}
