import { ViewDialog } from "@/components/common/dialogs/ViewDialog";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useApplicationsActions } from "../hooks/useApplicationsActions";
import { Application } from "../types/applications.types";
import { useIsMobile } from "@/hooks/useMobile";
import { Separator } from "@/components/ui/separator";
import {
  APPLICATION_STAGES,
  APPLICATION_STATUSES,
} from "../constants/application-constants";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ViewApplicationDialogProps {
  id: string | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function ViewApplicationDialog({
  id,
  open,
  setOpen,
}: ViewApplicationDialogProps) {
  const [application, setApplication] = useState<Application | null>(null);
  const { findApplication, loading } = useApplicationsActions();

  const handleClose = () => {
    setApplication(null);
    setOpen(false);
  };

  const applicationJob = useMemo(() => {
    if (!application) return null;
    if (typeof application.job === "string") {
      return { _id: application.job, title: application.job, department: null };
    }
    return application.job;
  }, [application]);

  const applicationStatus = useMemo(() => {
    if (!application) return null;
    return APPLICATION_STATUSES.find(
      (status) => status.value === application.status,
    );
  }, [application]);

  const applicationStage = useMemo(() => {
    if (!application) return null;
    return APPLICATION_STAGES.find(
      (stage) => stage.value === application.stage,
    );
  }, [application]);

  useEffect(() => {
    const fetchApplication = async () => {
      if (open && id) {
        const applicationData = await findApplication(id);
        setApplication(applicationData);
      }
    };

    fetchApplication();
  }, [id, open]);

  return (
    <ViewDialog
      title="Application Details"
      isOpen={open}
      onClose={handleClose}
      loading={loading}
      className="sm:max-w-fit"
    >
      <Card className="bg-transparent shadow-none border-0 pb-3">
        {!application && !loading && (
          <CardContent className="space-y-6">
            <Alert variant="default">
              <AlertCircle className="mr-2 h-4 w-4" />
              Application not found or has been deleted.
            </Alert>
          </CardContent>
        )}

        {application && (
          <CardContent className="px-0 grid sm:grid-cols-2 gap-8 h-full">
            <div className="space-y-4 sm:pb-10">
              {/* == CANDIDATE NAME == */}
              <div className="flex justify-between gap-3 items-center">
                <div className="font-medium">Candidate Name</div>
                <div className="text-gray-600 dark:text-gray-400 text-end">
                  {application?.fullName}
                </div>
              </div>

              {/* == CANDIDATE EMAIL == */}
              <div className="flex justify-between gap-3 items-center">
                <div className="font-medium">Candidate Email</div>
                <div className="text-gray-600 dark:text-gray-400 text-end">
                  <a href={`mailto:${application?.email}`}>
                    {application?.email}
                  </a>
                </div>
              </div>

              {/* == CANDIDATE PHONE == */}
              <div className="flex justify-between items-center">
                <div className="font-medium">Candidate Phone</div>
                <div className="text-gray-600 dark:text-gray-400 text-end">
                  {application?.phoneNumber}
                </div>
              </div>

              {/* == JOB APPLIED FOR == */}
              <div className="flex justify-between items-center">
                <div className="font-medium">Job</div>
                <div className="text-gray-600 dark:text-gray-400 text-end">
                  {applicationJob?.title ? (
                    <Link href={`/dashboard/jobs/${applicationJob?._id}/edit`} target="_blank">
                      {applicationJob?.title}
                    </Link>
                  ) : (
                    "Not specified"
                  )}
                </div>
              </div>

              {/* == COUNTRY == */}
              <div className="flex justify-between items-center">
                <div className="font-medium">Country</div>
                <div className="text-gray-600 dark:text-gray-400 text-end">
                  {application?.country}{" "}
                  {application.city && `, ${application.city}`}
                </div>
              </div>

              {/* == STATUS == */}
              <div className="flex justify-between items-center">
                <div className="font-medium">Status</div>
                <div className="text-gray-600 dark:text-gray-400 text-end">
                  <Badge className={cn(applicationStatus?.colorClass)}>
                    {applicationStatus?.label || application.status}
                  </Badge>
                </div>
              </div>

              {/* == STAGE == */}
              <div className="flex justify-between items-center">
                <div className="font-medium">Stage</div>
                <div className="text-gray-600 dark:text-gray-400 text-end">
                  <Badge className={cn(applicationStage?.colorClass)}>
                    {applicationStage?.label || application.stage}
                  </Badge>
                </div>
              </div>

              {/* == LINKEDIN == */}
              <div className="flex justify-between items-center">
                <div className="font-medium">LinkedIn</div>
                <div className="text-end">
                  {application?.linkedInUrl !== "" ? (
                    <a
                      href={application.linkedInUrl}
                      target="_blank"
                      className="text-blue-500"
                    >
                      Visit LinkedIn Profile
                    </a>
                  ) : (
                    <span className="text-gray-600 dark:text-gray-400">
                      Not specified
                    </span>
                  )}
                </div>
              </div>

              {/* == PORTFOLIO == */}
              <div className="flex justify-between items-center">
                <div className="font-medium">Portfolio</div>
                <div className="text-end">
                  {application?.portfolioUrl ? (
                    <a
                      href={application?.portfolioUrl}
                      target="_blank"
                      className="text-blue-500"
                    >
                      Candidate Portfolio
                    </a>
                  ) : (
                    <span className="text-gray-600 dark:text-gray-400">
                      Not specified
                    </span>
                  )}
                </div>
              </div>

              <Separator className="mb-2 mt-5 hidden sm:block" />
              {/* == APPLICATION CREATED AT == */}
              <div className="flex justify-between items-center">
                <div className="font-medium">Creation Date</div>
                <div className="text-gray-600 dark:text-gray-400 text-end">
                  {application.createdAtDiff}
                </div>
              </div>
            </div>
            <Separator className="block sm:hidden" />
            <div className="h-[330px] sm:h-full">
              <iframe
                src={`https://docs.google.com/viewer?url=${application.resumeUrl}&embedded=true`}
                frameBorder="0"
                height="100%"
                width="100%"
                className="rounded-sm"
              ></iframe>
            </div>
          </CardContent>
        )}
      </Card>
    </ViewDialog>
  );
}
