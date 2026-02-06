"use client";

import { PageHeader } from "@/components/PageHeader";
import { ApplicationsTable } from "@/features/applications/components/ApplicationsTable";
import { ChangeStageFormDialog } from "@/features/applications/components/ChangeStageFormDialog";
import { ChangeStatusFormDialog } from "@/features/applications/components/ChangeStatusFormDialog";
import { CreateApplicationFormDialog } from "@/features/applications/components/CreateApplicationFormDialog";
import { UpdateApplicationFormDialog } from "@/features/applications/components/UpdateApplicationFormDialog";
import { useApplicationsList } from "@/features/applications/hooks/useApplicationsList";
import { Application } from "@/features/applications/types/applications.types";
import { Plus } from "lucide-react";
import { useCallback, useState } from "react";

export function ApplicationsClient() {
  const applicationsList = useApplicationsList();
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);
  const [openChangeStatusDialog, setOpenChangeStatusDialog] = useState<boolean>(false);
  const [openChangeStageDialog, setOpenChangeStageDialog] = useState<boolean>(false);
  const [openViewDialog, setOpenViewDialog] = useState<boolean>(false);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  const handleUpdate = (application: Application) => {
    setSelectedApplication(application);
    setOpenUpdateDialog(true);
  };

  const handleView = useCallback((application: Application) => {
    setSelectedApplication(application);
    setOpenViewDialog(true);
  }, []);

  const handleChangeStatus = useCallback((application: Application) => {
    setSelectedApplication(application);
    setOpenChangeStatusDialog(true);
  }, []);

  const handleChangeStage = useCallback((application: Application) => {
    setSelectedApplication(application);
    setOpenChangeStageDialog(true);
  }, []);

  const handleCreateSuccess = useCallback(async () => {
    setOpenCreateDialog(false);
    await applicationsList.refetch();
  }, [applicationsList]);

  const handleUpdateSuccess = useCallback(async () => {
    setSelectedApplication(null);
    setOpenUpdateDialog(false);
    await applicationsList.refetch();
  }, [applicationsList]);

  const handleStatusChangeSuccess = useCallback(async () => {
    setSelectedApplication(null);
    setOpenChangeStatusDialog(false);
    await applicationsList.refetch();
  }, [applicationsList]);

  const handleStageChangeSuccess = useCallback(async () => {
    setSelectedApplication(null);
    setOpenChangeStageDialog(false);
    await applicationsList.refetch();
  }, [applicationsList]);


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
        application={selectedApplication!}
      />

      <ChangeStatusFormDialog 
        open={openChangeStatusDialog}
        setOpen={setOpenChangeStatusDialog}
        application={selectedApplication!}
        onSuccess={handleStatusChangeSuccess}
      />

      <ChangeStageFormDialog 
        open={openChangeStageDialog}
        setOpen={setOpenChangeStageDialog}
        application={selectedApplication!}
        onSuccess={handleStageChangeSuccess}
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
        onChangeStatus={handleChangeStatus}
        onChangeStage={handleChangeStage}
        onView={handleView}
      />
    </div>
  );
}
