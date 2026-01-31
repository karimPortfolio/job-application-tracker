"use client";

import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { CreateJobForm } from "@/features/jobs/components/CreateJobForm";
import { UpdateJobForm } from "@/features/jobs/components/UpdateJobForm";
import { useJobActions } from "@/features/jobs/hooks/useJobsActions";
import { useJobsList } from "@/features/jobs/hooks/useJobsList";
import { Job } from "@/features/jobs/types/jobs.types";
import { AxiosError } from "axios";
import { Save } from "lucide-react";
import { redirect, useParams } from "next/navigation";
import { memo, useEffect, useState } from "react";

export function UpdateJobClient() {
  const { refetch } = useJobsList();
  const { loading, findJob } = useJobActions();
  const [job, setJob] = useState<Job | null>(null);
  const params = useParams();
  const id = params?.id as string | undefined;

  useEffect(() => {
    async function loadJob() {
      if (typeof id !== "string") return;

      try {
        const fetchedJob = await findJob(id);
        setJob(fetchedJob);
      } catch (error) {
        setJob(null);
        if (error instanceof AxiosError && error.response?.status === 403) {
          redirect("/forbidden");
        }
      }
    }

    loadJob();
  }, [id]);

  return (
    <div className="w-full">
      <PageHeader
        title={`Update Job ${job ? `"${job.title}"` : ""}`}
        description="Fill in the details to update the job opening."
        renderActions={() => (
          <Button disabled={loading} type="submit" form="update-job-form">
            <ButtonLoadingWrapper isLoading={loading } loadingText="Updating...">
              <Save className="mr-2 h-4 w-4" />
              Save
            </ButtonLoadingWrapper>
          </Button>
        )}
      />

      <UpdateJobForm job={job} onSuccess={() => refetch()} />
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
