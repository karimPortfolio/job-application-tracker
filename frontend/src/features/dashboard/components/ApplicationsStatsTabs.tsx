import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import { useDashboardStats } from "../hooks/useDashboardStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusTabContent } from "./tabs-content/StatusTabContent";
import { StagesTabContent } from "./tabs-content/StagesTabContent";

export function ApplicationsStatsTabs() {
  const {
    applicationsStatsByStatus,
    applicationsStatsByStages,
    fetchApplicationsStatsByStatus,
    fetchApplicationsStatsByStages,
    loading,
  } = useDashboardStats();
  const [currentYear, setCurrentYear] = useState<string>(
    new Date().getFullYear().toString(),
  );
  const [currentTab, setCurrentTab] = useState<string>("status");

  useEffect(() => {
    const fetchCurrentTabData = async () => {
      if (currentTab === "status") {
        return await fetchApplicationsStatsByStatus(currentYear);
      }
      return await fetchApplicationsStatsByStages(currentYear);
    };

    fetchCurrentTabData();
  }, [currentTab, currentYear]);

  if (loading) {
    return (
      <Card className="animate-pulse">
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
          <Skeleton className="h-48 rounded w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Tabs defaultValue={currentTab} onValueChange={setCurrentTab}>
      <Card className="shadow-none p-3 gap-3">
        <CardHeader className="flex justify-between items-center gap-3 px-0 mb-2">
          <div>
            <div className="text-sm font-medium">
              Applications by {currentTab}
            </div>
            <div className="text-xs text-gray-700 dark:text-gray-500">
              Showing total applications by {currentTab}
            </div>
          </div>
          <TabsList>
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="stages">Stages</TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent className="px-0">
          <StatusTabContent
            applicationsStatsByStatus={applicationsStatsByStatus}
            loading={loading}
          />
          <StagesTabContent
            applicationsStatsByStages={applicationsStatsByStages}
            loading={loading}
          />
        </CardContent>
      </Card>
    </Tabs>
  );
}
