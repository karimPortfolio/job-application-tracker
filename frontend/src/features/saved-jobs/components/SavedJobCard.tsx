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
} from "lucide-react";
import { SavedJob } from "../types/saved-jobs.type";

interface SavedJobCardProps {
  savedJob: SavedJob;
  onViewDetails: (job: SavedJob["job"]) => void;
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

export function SavedJobCard({ savedJob, onViewDetails }: SavedJobCardProps) {
  return (
    <Card className="flex shadow-none h-full flex-col rounded-2xl border-slate-200/80 bg-white/90 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800/90 dark:bg-slate-900/70">
      <CardHeader className="space-y-4 pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="line-clamp-2 text-base font-semibold text-slate-900 dark:text-slate-100 sm:text-lg">
              {savedJob.job.title}
            </h3>
            <p className="inline-flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
              <Building2 className="size-4" />
              {savedJob.job.company?.name || "Unknown company"}
            </p>
          </div>
          <Badge variant="secondary" className="capitalize text-white">
            {savedJob.job.experienceLevel}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="font-normal">
            <BriefcaseBusiness className="mr-1 size-3.5" />
            {savedJob.job.employmentType &&
              formatEmploymentType(savedJob.job.employmentType)}
          </Badge>
          <Badge variant="outline" className="font-normal">
            {savedJob.job.isRemote ? (
              <>
                <Globe className="mr-1 size-3.5" /> Remote
              </>
            ) : (
              <>
                <MapPin className="mr-1 size-3.5" />
                {savedJob.job.country}
                {savedJob.job.city ? `, ${savedJob.job.city}` : ""}
              </>
            )}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex items-center justify-between pb-4 space-y-1">
        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
          {formatSalaryRange(savedJob.job.salaryMin, savedJob.job.salaryMax)}
        </p>
        <p className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
          <Clock3 className="size-3.5" />
          Posted {savedJob.job.createdAtDiff || savedJob.job.createdAt}
        </p>
      </CardContent>

      <CardFooter className="mt-auto flex items-center justify-between border-t border-slate-200/80 pt-4 dark:border-slate-800/80">
        {savedJob.createdAtDiff && (
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            Saved {savedJob.createdAtDiff}
          </div>
        )}
        <Button type="button" onClick={() => onViewDetails(savedJob.job)}>
          View details
        </Button>
      </CardFooter>
    </Card>
  );
}
