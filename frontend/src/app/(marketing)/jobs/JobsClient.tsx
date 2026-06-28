"use client";

import { PublicJobDetailsModal } from "@/features/jobs/marketing/components/PublicJobDetailsModal";
import { PublicJobsGrid } from "@/features/jobs/marketing/components/PublicJobsGrid";
import { PublicJobsSearchBar } from "@/features/jobs/marketing/components/PublicJobsSearchBar";
import { usePublicJobsList } from "@/features/jobs/hooks/usePublicJobsList";
import { Job } from "@/features/jobs/types/jobs.types";
import { useIsMobile } from "@/hooks/useMobile";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { CreatePublicApplicationDialog } from "@/features/applications/marketing/components/CreatePublicApplicationDialog";

export function JobsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();
  const { jobs, meta, loading, query, setQuery, refetch } = usePublicJobsList({
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
    console.log("clicked");
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
      <CreatePublicApplicationDialog
        open={createPublicApplicationOpen}
        setOpen={setCreatePublicApplicationOpen}
        jobId={activeJobId}
        onSuccess={onSuccessfulApplicationCreation}
      />

      <div className="mx-auto -mt-10 max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
        <section className="relative mt-32 mb-8 flex items-center justify-center px-4 overflow-hidden font-sans">
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-900 dark:text-white mb-4">
              Find your <span className="text-primary ">next role.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-[#8B92A5] max-w-2xl mx-auto leading-relaxed">
              Browse open opportunities from trusted companies.
            </p>
          </div>
        </section>

        <PublicJobsSearchBar
          query={query}
          meta={meta}
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
          refetch={refetch}
        />

        <PublicJobDetailsModal
          id={activeJobId}
          open={isDetailsOpen}
          setOpen={handleDetailsOpen}
          handleCreateApplicationOpen={handleCreatePublicApplicationOpen}
        />
      </div>
    </div>
  );
}
