"use client";

import { PageHeader } from "@/components/PageHeader";
import { ApplicationsTable } from "@/features/applications/components/ApplicationsTable";
import { useApplicationsList } from "@/features/applications/hooks/useApplicationsList";
import { Plus } from "lucide-react";

export function ApplicationsClient() {
  const applicationsList = useApplicationsList();
  const handleCreateApplication = () => {};

  return (
    <div className="w-full">
      <PageHeader
        title="Applications"
        description="Manage your company applications effectively."
        actionLabel="Create Application"
        actionIcon={<Plus className="mr-2 h-4 w-4" />}
        action={handleCreateApplication}
      />

      <ApplicationsTable
        applications={applicationsList.applications}
        meta={applicationsList.meta}
        loading={applicationsList.loading}
        query={applicationsList.query}
        setQuery={applicationsList.setQuery}
        refetch={applicationsList.refetch}
        // onEdit={handleUpdateJob}
        // onChangeStatus={handleChangeStatus}
        // onView={handleViewJob}
      />
    </div>
  );
}
