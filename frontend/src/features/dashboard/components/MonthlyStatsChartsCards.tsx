import { useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useDashboardStats } from "../hooks/useDashboardStats";

export function MonthlyStatsChartsCards() {
  const { applicationsMonthlyStats, fetchApplicationsMonthlyStats, loading } = useDashboardStats();

  const chartConfig = {
    applications: {
      label: "Applications",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  const yearsOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => ({
      label: (currentYear - i).toString(),
      value: (currentYear - i).toString(),
    }));
  }, []);

  const handleYearChange = async (year: string) => {
    await fetchApplicationsMonthlyStats(year);
  }

  if (loading) {
    return (
      <div className="grid lg:grid-cols-2 col-span-2 gap-4">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="animate-pulse">
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
        ))}
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 col-span-2 gap-4">
      <Card className="shadow-none p-3 gap-3">
        <CardHeader className="flex justify-between items-center gap-3 px-0">
          <div>
            <div className="text-sm font-medium">Monthly Applications</div>
            <div className="text-xs text-gray-700 dark:text-gray-500">Showing total applications by month</div>
          </div>
          <Select onValueChange={handleYearChange}>
            <SelectTrigger className="h-8 w-32">
              <SelectValue placeholder={new Date().getFullYear().toString()} />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                {yearsOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="px-0">
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={applicationsMonthlyStats ?? [] as any}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="total"
                type="natural"
                fill="#2550ad"
                fillOpacity={0.4}
                stroke="#2550ad"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
