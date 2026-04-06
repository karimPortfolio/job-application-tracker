"use client";

import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ViewDialog } from "@/components/common/dialogs/ViewDialog";
import { usePublicJobActions } from "@/features/jobs/hooks/usePublicJobsActions";
import { useSafeHtmlRender } from "@/hooks/useSafeHtmlRender";
import type { Job } from "@/features/jobs/types/jobs.types";
import {
  AlertCircle,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  Clock3,
  Globe,
  MapPin,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PublicJobDetailsModalProps {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  handleCreateApplicationOpen?: () => void;
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

export function PublicJobDetailsModal({
  id,
  open,
  setOpen,
  handleCreateApplicationOpen,
}: PublicJobDetailsModalProps) {
  const [job, setJob] = useState<Job | null>(null);
  const { findJob, loading, apiError, clearApiError } = usePublicJobActions();
  const safeDescription = useSafeHtmlRender(job?.description ?? "");

  useEffect(() => {
    const fetchJob = async () => {
      if (!open || !id) return;
      try {
        const data = await findJob(id);
        setJob(data);
      } catch {
        setJob(null);
      }
    };

    fetchJob();
  }, [id, open]);

  const handleClose = () => {
    setOpen(false);
    setJob(null);
    clearApiError();
  };

  return (
    <ViewDialog
      title="Job details"
      isOpen={open}
      onClose={handleClose}
      loading={false}
      className="w-full max-w-sm sm:max-w-md md:max-w-3xl lg:max-w-5xl max-h-[88vh] overflow-y-auto"
    >
      {loading ? (
        <div className="space-y-4 p-1">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-48 w-full" />
        </div>
      ) : null}

      {!loading && apiError ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{apiError.title}</AlertTitle>
          <AlertDescription>{apiError.message}</AlertDescription>
        </Alert>
      ) : null}

      {!loading && !apiError && !job ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Job not found</AlertTitle>
          <AlertDescription>
            The selected job no longer exists or could not be loaded.
          </AlertDescription>
        </Alert>
      ) : null}

      {job ? (
        <Card className="border-0 bg-transparent shadow-none">
          <CardContent className="space-y-6 px-0">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xl font-semibold">{job.title}</p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Building2 className="size-4" />
                  {job.company?.name || "Unknown company"}
                </p>
              </div>
              <Badge variant="secondary" className="capitalize">
                {job.experienceLevel}
              </Badge>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-[2fr_1fr]">
              <div>
                <h3 className="mb-3 text-base font-semibold">
                  Job description
                </h3>
                <div
                  className="text-sm text-muted-foreground whitespace-pre-wrap [&_ul]:ml-5 [&_ul]:list-disc [&_ol]:ml-5 [&_ol]:list-decimal [&_li]:mb-1"
                  dangerouslySetInnerHTML={{ __html: safeDescription }}
                />
              </div>

              <div className="space-y-3 md:sticky md:top-4 md:self-start">
                <InfoRow
                  icon={<BriefcaseBusiness className="size-4" />}
                  label="Employment"
                  value={formatEmploymentType(job.employmentType)}
                />
                <InfoRow
                  icon={
                    job.isRemote ? (
                      <Globe className="size-4" />
                    ) : (
                      <MapPin className="size-4" />
                    )
                  }
                  label="Location"
                  value={
                    job.isRemote
                      ? "Remote"
                      : `${job.country}${job.city ? `, ${job.city}` : ""}`
                  }
                />
                <InfoRow
                  icon={<Clock3 className="size-4" />}
                  label="Posted"
                  value={job.createdAtDiff || job.createdAt}
                />
                <InfoRow
                  icon={<Building2 className="size-4" />}
                  label="Department"
                  value={job.department?.title || "Not specified"}
                />
                <InfoRow
                  icon={<BriefcaseBusiness className="size-4" />}
                  label="Salary"
                  value={formatSalaryRange(job.salaryMin, job.salaryMax)}
                />
                <div className="grid md:grid-cols-4 gap-3">
                  <Button
                    type="button"
                    onClick={handleCreateApplicationOpen}
                    className="w-full col-span-2 lg:col-span-3"
                  >
                    Apply now
                  </Button>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full col-span-2 lg:col-span-1"
                      >
                        <Bookmark className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Save job</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="button" onClick={handleClose} variant="outline">
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </ViewDialog>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border p-3">
      <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon}
        {label}
      </p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}
