"use client";

import { PageHeader } from "@/components/PageHeader";
import { CreateJobFormDialog } from "@/features/jobs/components/CreateJobFormDialog";
import { JobsTable } from "@/features/jobs/components/JobsTable";
import { useJobsList } from "@/features/jobs/hooks/useJobsList";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function JobsClient() {
  const { refetch } = useJobsList();
  const router = useRouter();

  const handleCreateJob = () => {
    router.push("/dashboard/jobs/create");
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
      <JobsTable />
    </div>
  );
}
