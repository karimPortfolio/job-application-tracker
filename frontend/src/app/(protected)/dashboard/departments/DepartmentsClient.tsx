"use client";

import { PageHeader } from "@/components/PageHeader";
import { CreateDepartmentFormDialog } from "@/features/departments/components/CreateDepartmentFormDialog";
import { DepartmentsTable } from "@/features/departments/components/DepartmentsTable";
import { useDepartmentsList } from "@/features/departments/hooks/useDepartmentsList";
import { Plus } from "lucide-react";
import { useState } from "react";

export function DepartmentsClient() {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const { refetch } = useDepartmentsList();

  const handleCreateSuccess = async () => {
    setOpenCreateDialog(false);
    await refetch();
  };

  return (
    <div>
      {/* PAGE INCLUDES */}
      <CreateDepartmentFormDialog
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        onSuccess={handleCreateSuccess}
      />

      {/* PAGE CONTENT */}
      <PageHeader
        title="Departments"
        description="Manage your company departments effectively."
        actionLabel="Create Department"
        actionIcon={<Plus className="mr-2 h-4 w-4" />}
        action={() => setOpenCreateDialog(true)}
      />
      <DepartmentsTable />
    </div>
  );
}
