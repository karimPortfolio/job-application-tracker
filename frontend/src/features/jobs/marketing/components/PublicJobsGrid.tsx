"use client";

import type { Job } from "@/features/jobs/types/jobs.types";
import { PublicJobCard } from "./PublicJobCard";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Dispatch, SetStateAction } from "react";
import type {
  JobQuery,
  PaginatedResponse,
} from "@/features/jobs/types/jobs.types";

interface PublicJobsGridProps {
  jobs: Job[];
  loading: boolean;
  onSelectJob: (job: Job) => void;
  meta: PaginatedResponse<Job> | null;
  query: JobQuery;
  setQuery: Dispatch<SetStateAction<JobQuery>>;
  refetch: () => Promise<any>;
}

export function PublicJobsGrid({
  jobs,
  loading,
  onSelectJob,
  meta,
  query,
  setQuery,
  refetch
}: PublicJobsGridProps) {
  const page = meta?.page ?? 1;
  const totalPages = meta?.totalPages ?? 1;
  const canGoPrev = meta?.hasPrevPage ?? page > 1;
  const canGoNext = meta?.hasNextPage ?? page < totalPages;

  if (loading) {
    return (
      <div className="grid  grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="space-y-4 rounded-2xl p-5">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-9 w-full" />
          </Card>
        ))}
      </div>
    );
  }

  if (!jobs.length) {
    return (
      <Card className="rounded-2xl border-dashed p-10 text-center dark:bg-slate-900">
        <p className="text-base font-medium">No jobs found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Try changing your search or filters to discover more roles.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {jobs.map((job) => (
          <PublicJobCard
            key={job.id || job._id}
            job={job}
            onViewDetails={onSelectJob}
            refetch={refetch}
            refetching={loading}
          />
        ))}
      </div>

      {meta ? (
        <div className="bg-white dark:bg-slate-900/70 flex flex-col gap-3 rounded-2xl border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing page {meta.page} of {meta.totalPages}
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:justify-end">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Rows:</span>
              <Select
                value={String(query.limit ?? 9)}
                onValueChange={(value) =>
                  setQuery((prev) => ({
                    ...prev,
                    page: 1,
                    limit: Number(value),
                  }))
                }
              >
                <SelectTrigger className="h-9 w-24">
                  <SelectValue placeholder="Rows" />
                </SelectTrigger>
                <SelectContent>
                  {[6, 9, 12, 18].map((option) => (
                    <SelectItem key={option} value={String(option)}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Pagination className="mx-0 w-auto">
              <PaginationContent>
                <PaginationPrevious
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    if (!canGoPrev) return;
                    setQuery((prev) => ({
                      ...prev,
                      page: Math.max(page - 1, 1),
                    }));
                  }}
                  aria-disabled={!canGoPrev}
                  className={cn(!canGoPrev && "pointer-events-none opacity-50")}
                />

                <PaginationItem>
                  <span className="px-2 text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                  </span>
                </PaginationItem>

                <PaginationNext
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    if (!canGoNext) return;
                    setQuery((prev) => ({
                      ...prev,
                      page: Math.min(page + 1, totalPages),
                    }));
                  }}
                  aria-disabled={!canGoNext}
                  className={cn(!canGoNext && "pointer-events-none opacity-50")}
                />
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      ) : null}
    </div>
  );
}
