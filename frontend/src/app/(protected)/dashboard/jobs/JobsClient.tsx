import { PageHeader } from "@/components/PageHeader";
import { JobsTable } from "@/features/jobs/components/JobsTable";

export function JobsClient() {
  return (
    <div className="w-full">
      <PageHeader
        title="Jobs"
        description="Manage your company jobs effectively."
      />
      <JobsTable />
    </div>
  );
}
