import { useMemo, useState } from "react";
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
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import { useDashboardStats } from "../hooks/useDashboardStats";

export function ApplicationsStatsByJobs() {
  const { applicationsStatsByJobs, fetchApplicationsStatsByJobs, loading } =
    useDashboardStats();
  const [currentYear, setCurrentYear] = useState<string>(
    new Date().getFullYear().toString(),
  );

  const chartConfig = {
    applications: {
      label: "Applications",
      color: "#2563eb",
    },
    label: {
      color: "var(--color-white)",
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
    setCurrentYear(year);
    await fetchApplicationsStatsByJobs(year);
  };

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
    <Card className="shadow-none p-3 gap-3">
      <CardHeader className="flex justify-between items-center gap-3 px-0 mb-2">
        <div>
          <div className="text-sm font-medium">Applications by Jobs</div>
          <div className="text-xs text-gray-700 dark:text-gray-500">
            Showing total applications by jobs
          </div>
        </div>
        <Select onValueChange={handleYearChange} value={currentYear}>
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
          <BarChart
            accessibilityLayer
            data={applicationsStatsByJobs ?? ([] as any)}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="total" type="number" hide />
            <YAxis
              dataKey="job"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="total"
              layout="vertical"
              fill="var(--color-primary)"
              radius={4}
            >
              <LabelList
                dataKey="job"
                position="insideLeft"
                offset={8}
                fill="white"
                fontSize={12}
                width={300}
              />
              <LabelList
                dataKey="total"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
                width={300}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
