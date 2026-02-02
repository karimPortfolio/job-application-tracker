"use client";

import { PageHeader } from "@/components/PageHeader";
import { ChangeStatusFormDialog } from "@/features/jobs/components/ChangeStatusFormDialog";
import { JobsTable } from "@/features/jobs/components/JobsTable";
import { Job } from "@/features/jobs/types/jobs.types";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { useJobsList } from "@/features/jobs/hooks/useJobsList";
import { ViewJobDialog } from "@/features/jobs/components/ViewJobDialog";

export function JobsClient() {
  const router = useRouter();
  const jobsList = useJobsList();
  const [open, setOpen] = useState<boolean>(false);
  const [viewOpen, setViewOpen] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleCreateJob = useCallback(() => {
    router.push("/dashboard/jobs/create");
  }, [router]);

  const handleUpdateJob = useCallback((job: Job) => {
    router.push(`/dashboard/jobs/${job.id}/edit`);
  }, [router]);

  const handleSuccess = useCallback(async () => {
    setOpen(false);
    setSelectedJob(null);
    await jobsList.refetch();
  }, [jobsList]);

  const handleChangeStatus = useCallback((job: Job) => {
    setSelectedJob(job);
    setOpen(true);
  }, []);

  const handleViewJob = useCallback((job: Job) => {
    setSelectedJob(job);
    setViewOpen(true);
  }, []);

  return (
    <div className="w-full">
      {/* PAGE INCLUDES */}
      <ChangeStatusFormDialog
        open={open}
        setOpen={setOpen}
        onSuccess={handleSuccess}
        job={selectedJob!}
      />

      <ViewJobDialog
        id={selectedJob ? selectedJob.id : ""}
        open={viewOpen}
        setOpen={setViewOpen}
      />

      {/* PAGE CONTENT */}
      <PageHeader
        title="Jobs"
        description="Manage your company jobs effectively."
        actionLabel="Create Job"
        actionIcon={<Plus className="mr-2 h-4 w-4" />}
        action={handleCreateJob}
      />

      <JobsTable
        jobs={jobsList.jobs}
        meta={jobsList.meta}
        loading={jobsList.loading}
        query={jobsList.query}
        setQuery={jobsList.setQuery}
        refetch={jobsList.refetch}
        onEdit={handleUpdateJob}
        onChangeStatus={handleChangeStatus}
        onView={handleViewJob}
      />
    </div>
  );
}
