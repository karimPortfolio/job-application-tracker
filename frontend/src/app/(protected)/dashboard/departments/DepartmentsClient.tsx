"use client";

import { PageHeader } from "@/components/PageHeader";
import { DepartmentsTable } from "@/features/departments/components/DepartmentsTable";

export function DepartmentsClient() {
  return (
    <div>
      <PageHeader
        title="Departments"
        description="Manage your company departments effectively."
      />
      <DepartmentsTable />
    </div>
  );
}
