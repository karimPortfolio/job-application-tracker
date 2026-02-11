"use client";
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

import { ResponsiveChoropleth } from "@nivo/geo";
import { useDashboardStats } from "../hooks/useDashboardStats";
import { cn } from "@/lib/utils";
import { worldFeatures } from "../geo/world-features";
import { ScrollArea } from "@/components/ui/scroll-area";
import { iso2ToCountryName, iso2ToFlagSrc } from "../geo/country-iso";

export function ApplicationsStatsByCountries({
  className,
}: {
  className?: string;
}) {
  const {
    applicationsStatsByCountries,
    fetchApplicationsStatsByCountries,
    loading,
  } = useDashboardStats();
  const [currentYear, setCurrentYear] = useState<string>(
    new Date().getFullYear().toString(),
  );

  const yearsOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => ({
      label: (currentYear - i).toString(),
      value: (currentYear - i).toString(),
    }));
  }, []);

  const handleYearChange = async (year: string) => {
    setCurrentYear(year);
    await fetchApplicationsStatsByCountries(year);
  };

  if (loading) {
    return (
      <Card className={cn("animate-pulse", className)}>
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
    <Card className={cn(className, "shadow-none py-3 px-0 gap-3")}>
      <CardHeader className="flex justify-between items-center gap-3 px-3 mb-2">
        <div>
          <div className="text-sm font-medium">Applications by Countries</div>
          <div className="text-xs text-gray-700 dark:text-gray-500">
            Showing total applications by countries
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
      <CardContent className="px-2 h-2/3">
        <div className="h-full">
          <ResponsiveChoropleth
            data={applicationsStatsByCountries?.countries || []}
            features={worldFeatures as any}
            colors={["#2550ad"]}
            domain={[
              0,
              Math.max(
                ...(applicationsStatsByCountries?.countries?.map(
                  (d) => d.value,
                ) || [0]),
              ),
            ]}
            unknownColor="#f1f5f9"
            label="properties.name"
            valueFormat=".0f"
            projectionType="equalEarth"
            projectionScale={100}
            // projectionTranslation={[0.5, 0.5]}
            borderWidth={0.5}
            borderColor="#64748b"
            theme={{
              tooltip: {
                container: {
                  background: "#020617",
                  color: "#fff",
                  fontSize: 12,
                },
              },
            }}
          />
        </div>
        <ScrollArea className="px-1 pt-2 h-2/5 overflow-auto relative bottom-6 bg-card">
          {applicationsStatsByCountries?.countries
            .filter((c) => c.value > 0)
            .map((c) => {
              const flagSrc = iso2ToFlagSrc(c.id)
              const fullName = iso2ToCountryName(c.id)
              return (
                <div
                  key={c.id}
                  className="flex items-center justify-between text-sm mb-1"
                >
                  <span className="flex items-center gap-2">
                    <img
                      src={flagSrc}
                      alt={`${fullName} flag`}
                      className="h-4 w-6 rounded-sm border border-muted"
                      loading="lazy"
                    />
                    <span>{fullName}</span>
                  </span>
                  <span className="font-medium text-gray-700 dark:text-gray-400">
                    {c.value} {c.value === 1 ? "application" : "applications"}
                  </span>
                </div>
              )
            })}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
