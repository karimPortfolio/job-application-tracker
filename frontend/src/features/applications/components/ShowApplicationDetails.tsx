import { ViewDialog } from "@/components/common/dialogs/ViewDialog";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useApplicationsActions } from "../hooks/useApplicationsActions";
import { Application } from "../types/applications.types";
import { Separator } from "@/components/ui/separator";
import { CandidateInformationsCard } from "./application-details/CandidateInformationsCard";
import { ApplicationInformations } from "./application-details/ApplicationInformations";
import { ApplicantResumeCard } from "./application-details/ApplicantResumeCard";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { SmartScreeningResultsCard } from "./application-details/SmartScreeningResultsCard";

interface ShowApplicationDetailsProps {
  id: string | undefined;
}

export function ShowApplicationDetails({ id }: ShowApplicationDetailsProps) {
  const [application, setApplication] = useState<Application | null>(null);
  const { findApplication, loading } = useApplicationsActions();

  const fetchApplication = async () => {
    if (id) {
      const applicationData = await findApplication(id);
      setApplication(applicationData);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, [id]);

  return (
    <Card className="bg-transparent shadow-none border-0 pb-3 pt-2">
      {!application && !loading && (
        <CardContent className="space-y-6">
          <Alert variant="default">
            <AlertCircle className="mr-2 h-4 w-4" />
            Application not found or has been deleted.
          </Alert>
        </CardContent>
      )}

      {application && (
        <CardContent className="px-0 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
          <div className="space-y-4 col-span-3 lg:col-span-1">
            {/* === CANDIDATE INFORMATIONS === */}
            <CandidateInformationsCard application={application} />

            {/* == APPLICATION INFORMAITONS == */}
            <ApplicationInformations application={application} />
          </div>

          <ApplicantResumeCard resumeUrl={application.resumeUrl} />

          <SmartScreeningResultsCard
            application={application}
            refetch={fetchApplication}
          />
        </CardContent>
      )}

      {loading && (
        <CardContent className="px-0 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
          <div className="space-y-4 col-span-1 sm:pb-10">
            {Array.from({ length: 2 }).map((_, index) => (
              <LoadingSkeletonsCard
                key={index}
                loading={loading}
                height="h-4"
                contentSkeletonsCount={3}
              />
            ))}
          </div>

          <div className="sm:col-span-2">
            <LoadingSkeletonsCard
              loading={loading}
              height="h-[330px]"
              contentSkeletonsCount={1}
            />
          </div>
        </CardContent>
      )}
    </Card>
  );
}

const LoadingSkeletonsCard = ({
  loading,
  height,
  contentSkeletonsCount = 3,
}: {
  loading: boolean;
  height: string;
  contentSkeletonsCount?: number;
}) => {
  if (!loading) return null;

  return (
    <Card className="gap-4 shadow-none">
      <CardHeader className="flex items-center gap-4">
        <Skeleton className="w-6 h-6 rounded-full" />
        <div className="space-y-1 w-full">
          <Skeleton className="w-1/2 h-4 rounded" />
          <Skeleton className="w-1/3 h-3 rounded" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2 mt-0">
        {Array.from({ length: contentSkeletonsCount }).map((_, index) => (
          <Skeleton className={cn("w-full rounded", height)} key={index} />
        ))}
      </CardContent>
    </Card>
  );
};
