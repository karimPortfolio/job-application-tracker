"use client";

import { PublicJobDetailsModal } from "@/features/jobs/public/components/PublicJobDetailsModal";
import { PublicJobsGrid } from "@/features/jobs/public/components/PublicJobsGrid";
import { PublicJobsSearchBar } from "@/features/jobs/public/components/PublicJobsSearchBar";
import { usePublicJobsList } from "@/features/jobs/hooks/usePublicJobsList";
import { Job } from "@/features/jobs/types/jobs.types";
import { useIsMobile } from "@/hooks/useMobile";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

export function JobsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();
  const { jobs, meta, loading, query, setQuery } = usePublicJobsList({
    limit: 9,
    sortBy: "createdAt",
    order: "desc",
  });
  const [selectedJobId, setSelectedJobId] = useState<string>("");
  const [detailsOpen, setDetailsOpen] = useState(false);

  const mobileJobId = searchParams.get("jobId");
  const activeJobId = isMobile ? mobileJobId || "" : selectedJobId;
  const isDetailsOpen = isMobile ? Boolean(mobileJobId) : detailsOpen;

  const handleSelectJob = useCallback(
    (job: Job) => {
      const id = job.id || job._id;
      if (isMobile) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("jobId", id);
        router.push(`/jobs?${params.toString()}`);
        return;
      }

      setSelectedJobId(id);
      setDetailsOpen(true);
    },
    [isMobile, router, searchParams],
  );

  const handleDetailsOpen = useCallback(
    (open: boolean) => {
      if (isMobile) {
        if (!open) {
          const params = new URLSearchParams(searchParams.toString());
          params.delete("jobId");
          const queryString = params.toString();
          router.push(queryString ? `/jobs?${queryString}` : "/jobs");
        }
        return;
      }

      setDetailsOpen(open);
      if (!open) setSelectedJobId("");
    },
    [isMobile, router, searchParams],
  );

  const handleResetFilters = useCallback(() => {
    setQuery((prev) => ({
      ...prev,
      page: 1,
      search: undefined,
      employmentType: undefined,
      experienceLevel: undefined,
      isRemote: undefined,
    }));
  }, [setQuery]);

  const title = useMemo(() => {
    if (!meta) return "Public Jobs";
    return `${meta.totalDocs ?? jobs.length} job${(meta.totalDocs ?? jobs.length) === 1 ? "" : "s"} available`;
  }, [jobs.length, meta]);

  return (
    <div className="w-full max-w-7xl px-4 py-10 mt-20 sm:px-6 lg:px-8">
      <div className="mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl text-primary font-semibold tracking-tight sm:text-4xl">Find your next role</h1>
          <p className="text-sm text-white sm:text-base">
            Browse open opportunities from trusted companies.
          </p>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {title}
          </p>
        </div>

        <PublicJobsSearchBar
          query={query}
          loading={loading}
          onSearchChange={(value) =>
            setQuery((prev) => ({ ...prev, search: value || undefined, page: 1 }))
          }
          onEmploymentTypeChange={(value) =>
            setQuery((prev) => ({ ...prev, employmentType: value, page: 1 }))
          }
          onExperienceLevelChange={(value) =>
            setQuery((prev) => ({ ...prev, experienceLevel: value, page: 1 }))
          }
          onRemoteChange={(value) =>
            setQuery((prev) => ({ ...prev, isRemote: value, page: 1 }))
          }
          onReset={handleResetFilters}
        />

        <PublicJobsGrid
          jobs={jobs}
          loading={loading}
          onSelectJob={handleSelectJob}
          meta={meta}
          query={query}
          setQuery={setQuery}
        />

        <PublicJobDetailsModal
          id={activeJobId}
          open={isDetailsOpen}
          setOpen={handleDetailsOpen}
        />
      </div>
    </div>
  );
}
