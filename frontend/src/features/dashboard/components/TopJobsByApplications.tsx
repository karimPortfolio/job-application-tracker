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
import { useDashboardStats } from "../hooks/useDashboardStats";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Briefcase, InfoIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useTextTruncate } from "@/hooks/useTextTruncate";

export function TopJobsByApplications() {
  const { topJobsByApplications, fetchTopJobsByApplications, loading } =
    useDashboardStats();
  const { truncate } = useTextTruncate();
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
    await fetchTopJobsByApplications(year);
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
          <div className="text-sm font-medium">Top Jobs</div>
          <div className="text-xs text-gray-700 dark:text-gray-500">
            Showing top 5 jobs by applications
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
      <CardContent className="px-0 space-y-3">
        {topJobsByApplications &&
          topJobsByApplications.length > 0 &&
          topJobsByApplications.map((job, index) => (
            <Card
              key={index}
              className="flex flex-row items-center gap-3 p-0 border-0 shadow-none"
            >
              <CardContent className="p-0">
                <div className="p-2 bg-primary/20 text-primary w-fit rounded-sm">
                  <Briefcase className="w-5 h-5" />
                </div>
              </CardContent>
              <CardContent className="flex-1 p-0 h-full">
                <div className="flex justify-between items-center">
                  <div className="font-medium text-sm">
                    {truncate(job.job, 30)}
                  </div>
                  <div className="text-gray-700 dark:text-gray-400 text-sm">
                    {job.total}{" "}
                    {job.total === 1 ? "application" : "applications"}
                  </div>
                </div>
                {index < topJobsByApplications.length - 1 && (
                  <Separator className="relative top-3" />
                )}
              </CardContent>
            </Card>
          ))}
        {!topJobsByApplications || topJobsByApplications.length === 0 ? (
          <Alert>
            <InfoIcon />
            <AlertDescription>No applications found.</AlertDescription>
          </Alert>
        ) : null}
      </CardContent>
    </Card>
  );
}
