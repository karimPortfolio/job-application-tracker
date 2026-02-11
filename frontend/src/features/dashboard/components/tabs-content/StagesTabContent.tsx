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
import { ApplicationsStatsByStages } from "../../types/dashboard.types";
import chroma from "chroma-js";

interface StagesTabContentProps {
  applicationsStatsByStages: ApplicationsStatsByStages[] | null;
  loading: boolean;
}

export function StagesTabContent({
  applicationsStatsByStages,
  loading,
}: StagesTabContentProps) {

  const palette = useMemo(() => {
    const base = "#2550ad";
    return chroma
      .scale([chroma(base).brighten(0.6), chroma(base).darken(0.4)])
      .mode("lab")
      .colors(Math.max(applicationsStatsByStages?.length ?? 0, 1));
  }, [applicationsStatsByStages]);

  const dataWithColor = useMemo(() => {
    if (!applicationsStatsByStages) return [];
    return applicationsStatsByStages.map((item, idx) => ({
      ...item,
      fill: palette[idx % palette.length],
    }));
  }, [applicationsStatsByStages, palette]);

  const chartConfig = {
    label: {
      color: "var(--color-white)",
    },
  } satisfies ChartConfig;

  const totalApplications = useMemo(() => {
    if (!applicationsStatsByStages) return 0;
    return applicationsStatsByStages.reduce(
      (total, item) => total + item.total,
      0,
    );
  }, [applicationsStatsByStages]);

  if (loading) {
    return (
      <TabsContent value="stages" className="animate-pulse">
        <Skeleton className="w-full h-full rounded-full" />
      </TabsContent>
    );
  }

  return (
    <TabsContent value="stages">
      <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-60">
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={dataWithColor ?? ([] as any)}
            dataKey="total"
            nameKey="stage"
            innerRadius={60}
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
    </TabsContent>
  );
}
