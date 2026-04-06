"use client";

import { PublicJobDetailsModal } from "@/features/jobs/marketing/components/PublicJobDetailsModal";
import { PublicJobsGrid } from "@/features/jobs/marketing/components/PublicJobsGrid";
import { PublicJobsSearchBar } from "@/features/jobs/marketing/components/PublicJobsSearchBar";
import { usePublicJobsList } from "@/features/jobs/hooks/usePublicJobsList";
import { HomeFooter } from "@/features/home/components/HomeFooter";
import { Job } from "@/features/jobs/types/jobs.types";
import { useIsMobile } from "@/hooks/useMobile";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { CreatePublicApplicationModal } from "@/features/applications/marketing/components/CreatePublicApplicationModal";

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
  const [createPublicApplicationOpen, setCreatePublicApplicationOpen] =
    useState(false);

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

  const handleCreatePublicApplicationOpen = useCallback(() => {
    console.log('clicked');
    setCreatePublicApplicationOpen(true);
  }, []);

  const onSuccessfulApplicationCreation = useCallback(() => {
    setCreatePublicApplicationOpen(false);
    if (isMobile) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("jobId");
      const queryString = params.toString();
      router.push(queryString ? `/jobs?${queryString}` : "/jobs");
    } else {
      setDetailsOpen(false);
      setSelectedJobId("");
    }
  }, [isMobile, router, searchParams]);

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
    <div className="relative w-full overflow-x-clip bg-zinc-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      {/* ==== PAGE INCLUDES ==== */}
      <CreatePublicApplicationModal
        open={createPublicApplicationOpen}
        setOpen={setCreatePublicApplicationOpen}
        jobId={activeJobId}
        onSuccess={onSuccessfulApplicationCreation}
      />

      <div className="mx-auto pt-40 max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl text-center font-semibold tracking-tight text-primary">
            Find your next role
          </h1>
          <p className="mt-5 text-sm md:text-lg text-center text-slate-700 dark:text-slate-200 sm:text-base">
            Browse open opportunities from trusted companies.
          </p>
          <p className="text-xs pt-16 font-medium uppercase tracking-wide text-muted-foreground">
            {title}
          </p>
        </div>

        <PublicJobsSearchBar
          query={query}
          loading={loading}
          onSearchSubmit={(value) =>
            setQuery((prev) => ({
              ...prev,
              search: value || undefined,
              page: 1,
            }))
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
          handleCreateApplicationOpen={handleCreatePublicApplicationOpen}
        />
      </div>
      <HomeFooter />
    </div>
  );
}
