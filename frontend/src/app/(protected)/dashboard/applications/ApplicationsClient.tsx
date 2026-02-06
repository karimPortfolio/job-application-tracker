"use client";

import { PageHeader } from "@/components/PageHeader";
import { ApplicationsTable } from "@/features/applications/components/ApplicationsTable";
import { CreateApplicationFormDialog } from "@/features/applications/components/CreateApplicationFormDialog";
import { UpdateApplicationFormDialog } from "@/features/applications/components/UpdateApplicationFormDialog";
import { useApplicationsList } from "@/features/applications/hooks/useApplicationsList";
import { Application } from "@/features/applications/types/applications.types";
import { Plus } from "lucide-react";
import { useState } from "react";

export function ApplicationsClient() {
  const applicationsList = useApplicationsList();
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);
  const [openViewDialog, setOpenViewDialog] = useState<boolean>(false);
  const [selectedApplicationId, setSelectedApplication] =
    useState<string | null>(null);

  const handleUpdate = (application: Application) => {
    setSelectedApplication(application.id);
    setOpenUpdateDialog(true);
  };

  const handleView = (application: Application) => {
    setSelectedApplication(application.id);
    setOpenViewDialog(true);
  };

  const handleCreateSuccess = async () => {
    setOpenCreateDialog(false);
    await applicationsList.refetch();
  };

  const handleUpdateSuccess = async () => {
    setSelectedApplication(null);
    setOpenUpdateDialog(false);
    await applicationsList.refetch();
  };

  return (
    <div className="w-full">
      {/* PAGE INCLUDES */}
      <CreateApplicationFormDialog
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        onSuccess={handleCreateSuccess}
      />

      <UpdateApplicationFormDialog
        open={openUpdateDialog}
        setOpen={setOpenUpdateDialog}
        onSuccess={handleUpdateSuccess}
        id={selectedApplicationId!}
      />

      {/* <ViewDepartmentDialog
        open={openViewDialog}
        setOpen={setOpenViewDialog}
        id={selectedDepartmentId!}
      /> */}
     
     
     {/*  PAGE CONTENT  */}
      <PageHeader
        title="Applications"
        description="Manage your company applications effectively."
        actionLabel="Create Application"
        actionIcon={<Plus className="mr-2 h-4 w-4" />}
        action={() => setOpenCreateDialog(true)}
      />

      <ApplicationsTable
        applications={applicationsList.applications}
        meta={applicationsList.meta}
        loading={applicationsList.loading}
        query={applicationsList.query}
        setQuery={applicationsList.setQuery}
        refetch={applicationsList.refetch}
        onEdit={handleUpdate}
        onChangeStatus={handleUpdate}
        onView={handleView}
      />
    </div>
  );
}
