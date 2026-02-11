import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TabsContent } from "@/components/ui/tabs";
import { Label, Pie, PieChart } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";
import { ApplicationsStatsByStatus } from "../../types/dashboard.types";
import chroma from "chroma-js";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

interface StatusTabContentProps {
  applicationsStatsByStatus: ApplicationsStatsByStatus[] | null;
  loading: boolean;
}

export function StatusTabContent({
  applicationsStatsByStatus,
  loading,
}: StatusTabContentProps) {
  const palette = useMemo(() => {
    const base = "#2550ad";
    return chroma
      .scale([chroma(base).brighten(0.6), chroma(base).darken(0.4)])
      .mode("lab")
      .colors(Math.max(applicationsStatsByStatus?.length ?? 0, 1));
  }, [applicationsStatsByStatus]);

  const dataWithColor = useMemo(() => {
    if (!applicationsStatsByStatus) return [];
    return applicationsStatsByStatus.map((item, idx) => ({
      ...item,
      fill: palette[idx % palette.length],
    }));
  }, [applicationsStatsByStatus, palette]);

  const chartConfig = {
    label: {
      color: "var(--color-white)",
    },
  } satisfies ChartConfig;

  const totalApplications = useMemo(() => {
    if (!applicationsStatsByStatus) return 0;
    return applicationsStatsByStatus.reduce(
      (total, item) => total + item.total,
      0,
    );
  }, [applicationsStatsByStatus]);

  if (loading) {
    return (
      <TabsContent value="status" className="animate-pulse">
        <Skeleton className="w-full h-full rounded-full" />
      </TabsContent>
    );
  }

  return (
    <TabsContent value="status">
      {dataWithColor.length > 0 && (
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-60"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={dataWithColor ?? ([] as any)}
              dataKey="total"
              nameKey="status"
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
            No applications found.
          </AlertDescription>
        </Alert>
      )}
    </TabsContent>
  );
}
