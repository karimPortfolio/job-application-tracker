import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Application } from "../../types/applications.types";
import { useMemo } from "react";
import {
  APPLICATION_STAGES,
  APPLICATION_STATUSES,
} from "../../constants/application-constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { ClipboardCheck, User } from "lucide-react";

interface ApplicationInformationsProps {
  application: Application;
}

export function ApplicationInformations({
  application,
}: ApplicationInformationsProps) {
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

  return (
    <Card className="gap-4 shadow-none">
      <CardHeader className="flex items-center gap-4">
        <Avatar className="bg-accent flex items-center p-2 size-10">
          <ClipboardCheck className="h-6 w-6" />
        </Avatar>
        <div className="space-y-1">
          <CardTitle>Application Information</CardTitle>
          <CardDescription>
            View the application details.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 mt-0">
        <div className="flex justify-between items-center">
          <div className="font-medium">Job</div>
          <div className="text-gray-600 dark:text-gray-400 text-end">
            {applicationJob?.title ? (
              <Link
                href={`/dashboard/jobs/${applicationJob?._id}/edit`}
                target="_blank"
              >
                {applicationJob?.title}
              </Link>
            ) : (
              "Not specified"
            )}
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

        {/* == APPLICATION CREATED AT == */}
        <div className="flex justify-between items-center">
          <div className="font-medium">Creation Date</div>
          <div className="text-gray-600 dark:text-gray-400 text-end">
            {application.createdAtDiff}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
