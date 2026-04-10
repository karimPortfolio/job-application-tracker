'use client';
import { PageHeader } from "@/components/PageHeader";
import { ShowApplicationDetails } from "@/features/applications/components/ShowApplicationDetails";


export function ApplicationDetailsClient({ id }: { id: string }) {
  return (
    <div className="w-full">
      <PageHeader
        title="Application Details"
        description="View and manage the details of your company application."
      />

      <ShowApplicationDetails id={id} />
    </div>
  );
}
