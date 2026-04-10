import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Application } from "../../types/applications.types";
import { User } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

interface CandidateInformationsCardProps {
  application: Application;
}

export function CandidateInformationsCard({
  application,
}: CandidateInformationsCardProps) {
  return (
      <Card className="gap-4 shadow-none">
        <CardHeader className="flex items-center gap-4">
          <Avatar className="bg-accent flex items-center p-2 size-10" >
              <User className="h-6 w-6" />
          </Avatar>
          <div className="space-y-1">
            <CardTitle>Candidate Information</CardTitle>
            <CardDescription>
              View the candidate's personal information.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 mt-0">
          <div className="flex justify-between gap-3 items-center">
            <div className="font-medium">Name</div>
            <div className="text-gray-600 dark:text-gray-400 text-end">
              {application.fullName}
            </div>
          </div>

          <div className="flex justify-between gap-3 items-center">
            <div className="font-medium">Email</div>
            <div className="text-gray-600 dark:text-gray-400 text-end">
              <a href={`mailto:${application.email}`}>{application.email}</a>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="font-medium">Phone</div>
            <div className="text-gray-600 dark:text-gray-400 text-end">
              {application.phoneNumber}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="font-medium">Country</div>
            <div className="text-gray-600 dark:text-gray-400 text-end">
              {application.country} {application.city && `, ${application.city}`}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="font-medium">LinkedIn</div>
            <div className="text-end">
              {application.linkedInUrl !== "" ? (
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

          <div className="flex justify-between items-center">
            <div className="font-medium">Portfolio</div>
            <div className="text-end">
              {application.portfolioUrl ? (
                <a
                  href={application.portfolioUrl}
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
        </CardContent>
    </Card>
  );
}
