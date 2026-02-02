"use client";

import { PageHeader } from "@/components/PageHeader";
import { CreateDepartmentFormDialog } from "@/features/departments/components/CreateDepartmentFormDialog";
import { DepartmentsTable } from "@/features/departments/components/DepartmentsTable";
import { UpdateDepartmentFormDialog } from "@/features/departments/components/UpdateDepartmentFormDialog";
import { ViewDepartmentDialog } from "@/features/departments/components/ViewDepartmentDialog";
import { useDepartmentsList } from "@/features/departments/hooks/useDepartmentsList";
import { Plus } from "lucide-react";
import { useState } from "react";

export function DepartmentsClient() {
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);
  const [openViewDialog, setOpenViewDialog] = useState<boolean>(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);
  const list = useDepartmentsList();

  const handleUpdate = (id: string) => {
    setSelectedDepartmentId(id);
    setOpenUpdateDialog(true);
  }

  const handleView = (id: string) => {
    setSelectedDepartmentId(id);
    setOpenViewDialog(true);
  }

  const handleCreateSuccess = async () => {
    setOpenCreateDialog(false);
    await list.refetch();
  };

  const handleUpdateSuccess = async () => {
    setSelectedDepartmentId(null);
    setOpenUpdateDialog(false);
    await list.refetch();
  };

  return (
    <div>
      {/* PAGE INCLUDES */}
      <CreateDepartmentFormDialog
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        onSuccess={handleCreateSuccess}
      />

      <UpdateDepartmentFormDialog 
        open={openUpdateDialog}
        setOpen={setOpenUpdateDialog}
        onSuccess={handleUpdateSuccess}
        id={selectedDepartmentId!}
      />

      <ViewDepartmentDialog 
        open={openViewDialog}
        setOpen={setOpenViewDialog}
        id={selectedDepartmentId!}
      />

      {/* PAGE CONTENT */}
      <PageHeader
        title="Departments"
        description="Manage your company departments effectively."
        actionLabel="Create Department"
        actionIcon={<Plus className="mr-2 h-4 w-4" />}
        action={() => setOpenCreateDialog(true)}
      />
      <DepartmentsTable
        onEdit={handleUpdate}
        onView={handleView}
        list={list}
      />
    </div>
  );
}
