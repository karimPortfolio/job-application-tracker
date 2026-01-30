"use client";

import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { CreateJobForm } from "@/features/jobs/components/CreateJobForm";
import { useJobActions } from "@/features/jobs/hooks/useJobsActions";
import { useJobsList } from "@/features/jobs/hooks/useJobsList";
import { Save } from "lucide-react";
import { memo } from "react";

export function CreateJobClient() {
  const { refetch } = useJobsList();
  const { loading } = useJobActions();

  return (
    <div className="w-full">
      <PageHeader
        title="Create Job"
        description="Fill in the details to publish a new job opening."
        renderActions={() => (
          <Button disabled={loading} type="submit" form="create-job-form">
            <ButtonLoadingWrapper isLoading={loading } loadingText="Creating...">
              <Save className="mr-2 h-4 w-4" />
              Save
            </ButtonLoadingWrapper>
          </Button>
        )}
      />

      <CreateJobForm onSuccess={() => refetch()} />
    </div>
  );
}

const ButtonLoadingWrapper = memo(function ButtonLoadingWrapper({
  isLoading,
  loadingText,
  children,
}: {
  isLoading: boolean;
  loadingText: string;
  children: React.ReactNode;
}) {
  if (isLoading) {
    return (
      <>
        <Spinner className="mr-2 h-4 w-4" />
        <span>{loadingText}</span>
      </>
    );
  }

  return <>{children}</>;
});
