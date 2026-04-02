"use client";

import type { Job } from "@/features/jobs/types/jobs.types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, BriefcaseBusiness, Clock3, Globe, MapPin } from "lucide-react";

interface PublicJobCardProps {
  job: Job;
  onViewDetails: (job: Job) => void;
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

export function PublicJobCard({ job, onViewDetails }: PublicJobCardProps) {
  return (
    <Card className="flex h-full flex-col rounded-2xl border-border/80 bg-background/80 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="space-y-4 pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="line-clamp-2 text-base font-semibold sm:text-lg">{job.title}</h3>
            <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <Building2 className="size-4" />
              {job.company?.name || "Unknown company"}
            </p>
          </div>
          <Badge variant="secondary" className="capitalize">
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

      <CardContent className="flex-1 pb-4">
        <p className="line-clamp-4 text-sm text-muted-foreground">{job.description}</p>
      </CardContent>

      <CardFooter className="mt-auto flex items-center justify-between border-t pt-4">
        <div className="space-y-1">
          <p className="text-sm font-medium">{formatSalaryRange(job.salaryMin, job.salaryMax)}</p>
          <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock3 className="size-3.5" />
            Posted {job.createdAtDiff || job.createdAt}
          </p>
        </div>

        <Button type="button" onClick={() => onViewDetails(job)}>
          View details
        </Button>
      </CardFooter>
    </Card>
  );
}
