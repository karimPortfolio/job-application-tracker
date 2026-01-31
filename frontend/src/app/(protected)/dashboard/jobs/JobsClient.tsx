"use client";

import { PageHeader } from "@/components/PageHeader";
import { JobsTable } from "@/features/jobs/components/JobsTable";
import { Job } from "@/features/jobs/types/jobs.types";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export function JobsClient() {
  const router = useRouter();

  const handleCreateJob = () => {
    router.push("/dashboard/jobs/create");
  }

  const handleUpdateJob = (job: Job) => {
    router.push(`/dashboard/jobs/${job.id}/edit`);
  }

  return (
    <div className="w-full">

      {/* PAGE CONTENT */}
      <PageHeader
        title="Jobs"
        description="Manage your company jobs effectively."
        actionLabel="Create Job"
        actionIcon={<Plus className="mr-2 h-4 w-4" />}
        action={handleCreateJob}
      />
      <JobsTable onEdit={handleUpdateJob} />
    </div>
  );
}
