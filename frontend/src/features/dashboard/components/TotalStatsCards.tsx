import { useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ArrowDownRight,
  ArrowUpRight,
  Briefcase,
  ClipboardCheck,
  Network,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useDashboardStats } from "../hooks/useDashboardStats";

export function TotalStatsCards() {
  const { applicationsStats, departmentsStats, jobsStats, loading } =
    useDashboardStats();

  const data = useMemo(() => {
    if (loading) [];

    return [
      {
        label: "Applications",
        stats: applicationsStats,
        icon: <ClipboardCheck size={20} className="text-primary" />,
      },
      {
        label: "Jobs",
        stats: jobsStats,
        icon: <Briefcase size={20} className="text-primary" />,
      },
      {
        label: "Departments",
        stats: departmentsStats,
        icon: <Network size={20} className="text-primary" />,
      },
    ];
  }, [applicationsStats, departmentsStats, jobsStats, loading]);

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 col-span-2 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton className="w-4 h-6 rounded-full" />
                <Skeleton className="h-4 rounded w-24" />
              </div>
              <div>
                <Skeleton className="h-4 rounded w-24" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-6 rounded w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 col-span-2 gap-4">
      {data.map((item, index) => (
        <Card key={index} className="shadow-none p-3 gap-3">
          <CardHeader className="flex items-center gap-3 px-0">
            <div className="p-2 bg-primary/25 rounded-sm">{item.icon}</div>
            <div className="text-lg font-medium">{item.label}</div>
          </CardHeader>
          <CardContent className="px-0">
            <div className="flex gap-4 items-center">
              <div className="text-3xl font-semibold">{item.stats?.total}</div>
              <div
                className={cn(
                  item.stats?.monthsDiff.direction === "up"
                    ? "text-green-500"
                    : "text-red-500",
                  "text-sm flex items-center gap-1",
                )}
              >
                <span>{item.stats?.monthsDiff.percentage}%</span>
                {item.stats?.monthsDiff.direction === "up" ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
              </div>
            </div>
            <div className="text-gray-700 dark:text-gray-500 text-sm">
              {item.stats?.monthsDiff.percentage}% from last month
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
