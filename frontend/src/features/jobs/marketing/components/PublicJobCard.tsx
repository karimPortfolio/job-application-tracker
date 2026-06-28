"use client";

import type { Job } from "@/features/jobs/types/jobs.types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building2,
  BriefcaseBusiness,
  Clock3,
  Globe,
  MapPin,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useJobActions } from "../../hooks/useJobsActions";
import { LoadingButton } from "@/components/ui/loading-button";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useMemo } from "react";

interface PublicJobCardProps {
  job: Job;
  onViewDetails: (job: Job) => void;
  refetch: () => Promise<any>;
  refetching: boolean;
}

const formatEmploymentType = (value: Job["employmentType"]) =>
  value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("-");

const formatSalaryRange = (salaryMin?: number, salaryMax?: number) => {
  if (!salaryMin || !salaryMax) return "Salary not specified";
  return `$${salaryMin.toLocaleString()} - $${salaryMax.toLocaleString()}`;
};

export function PublicJobCard({ job, onViewDetails, refetch, refetching }: PublicJobCardProps) {
  const { savePublicJob, unsavePublicJob, loading } = useJobActions();
  const { isAuthenticated } = useAuth();

  const bookmarkIcon = useMemo(() => {
    if (!job || loading || refetching) return null;

    if (job.saved) {
      return <Bookmark className="size-5.5" fill="#2550ad" stroke="#2550ad" />;
    }

    return <Bookmark className="size-5.5" />;
  }, [job?.saved]);

  const saveOrUnsaveJob = async (id: string) => {
    if (job.saved) {
      await unsavePublicJob(id);
    } else {
      await savePublicJob(id);
    }

    await refetch();
  };

  return (
    <Card className="flex shadow-none h-full flex-col rounded-2xl border-slate-200/80 bg-white/90 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800/90 dark:bg-slate-900/70">
      <CardHeader className="space-y-4 pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="line-clamp-2 text-base font-semibold text-slate-900 dark:text-slate-100 sm:text-lg">
              {job.title}
            </h3>
            <p className="inline-flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
              <Building2 className="size-4" />
              {job.company?.name || "Unknown company"}
            </p>
          </div>
          <Badge variant="secondary" className="capitalize text-white">
            {job.experienceLevel}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="font-normal">
            <BriefcaseBusiness className="mr-1 size-3.5" />
            {formatEmploymentType(job.employmentType)}
          </Badge>
          <Badge variant="outline" className="font-normal">
            {job.isRemote ? (
              <>
                <Globe className="mr-1 size-3.5" /> Remote
              </>
            ) : (
              <>
                <MapPin className="mr-1 size-3.5" />
                {job.country}
                {job.city ? `, ${job.city}` : ""}
              </>
            )}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex items-center justify-between pb-4 space-y-1">
        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
          {formatSalaryRange(job.salaryMin, job.salaryMax)}
        </p>
        <p className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
          <Clock3 className="size-3.5" />
          Posted {job.createdAtDiff || job.createdAt}
        </p>
      </CardContent>

      <CardFooter className="mt-auto flex items-center justify-between border-t border-slate-200/80 pt-4 dark:border-slate-800/80">
        {isAuthenticated && (
          <Tooltip>
            <TooltipTrigger asChild>
              <LoadingButton
                variant="ghost"
                isLoading={loading || refetching}
                onClick={() => saveOrUnsaveJob(job.id)}
                className="shadow-none"
              >
                {bookmarkIcon}
              </LoadingButton>
            </TooltipTrigger>
            <TooltipContent>
              {job.saved && <p>Job already saved</p>}
              {!job.saved && <p>Save job</p>}
            </TooltipContent>
          </Tooltip>
        )}

        <Button type="button" onClick={() => onViewDetails(job)}>
          View details
        </Button>
      </CardFooter>
    </Card>
  );
}
