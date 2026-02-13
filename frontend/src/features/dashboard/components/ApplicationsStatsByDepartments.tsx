import { useCallback, useMemo, useState } from "react";
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
import { Label, Pie, PieChart } from "recharts";
import { useDashboardStats } from "../hooks/useDashboardStats";
import chroma from "chroma-js";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export function ApplicationsStatsByDepartments() {
  const {
    applicationsStatsByDepartments,
    fetchApplicationsStatsByDepartments,
    loading,
  } = useDashboardStats();
  const [currentYear, setCurrentYear] = useState<string>(
    new Date().getFullYear().toString(),
  );

  const palette = useMemo(() => {
    const base = "#2550ad";
    return chroma
      .scale([chroma(base).brighten(0.6), chroma(base).darken(0.4)])
      .mode("lab")
      .colors(Math.max(applicationsStatsByDepartments?.length ?? 0, 1));
  }, [applicationsStatsByDepartments]);

  const dataWithColor = useMemo(() => {
    if (!applicationsStatsByDepartments) return [];
    return applicationsStatsByDepartments.map((item, idx) => ({
      ...item,
      fill: palette[idx % palette.length],
    }));
  }, [applicationsStatsByDepartments, palette]);

  const chartConfig = {
    label: {
      color: "var(--color-white)",
    },
  } satisfies ChartConfig;

  const totalApplications = useMemo(() => {
    if (!applicationsStatsByDepartments) return 0;
    return applicationsStatsByDepartments.reduce(
      (total, item) => total + item.total,
      0,
    );
  }, [applicationsStatsByDepartments]);

  const yearsOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => ({
      label: (currentYear - i).toString(),
      value: (currentYear - i).toString(),
    }));
  }, []);

  const handleYearChange = useCallback(
    async (year: string) => {
      setCurrentYear(year);
      await fetchApplicationsStatsByDepartments(year);
    },
    [fetchApplicationsStatsByDepartments],
  );

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
          <div className="text-sm font-medium">Applications by Departments</div>
          <div className="text-xs text-gray-700 dark:text-gray-500">
            Showing total applications by department
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
        {dataWithColor.length > 0 && (
          <ChartContainer config={chartConfig} className="max-h-60">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent className="" />}
              />
              <Pie
                data={dataWithColor ?? ([] as any)}
                dataKey="total"
                nameKey="department"
                innerRadius={50}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalApplications.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Applications
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
        {dataWithColor.length === 0 && (
          <Alert>
            <InfoIcon />
            <AlertDescription>
              No applications found for the selected year.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
