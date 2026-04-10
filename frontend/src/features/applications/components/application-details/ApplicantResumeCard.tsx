import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLinkIcon, File } from "lucide-react";
import Link from "next/link";
import { resume } from "react-dom/server";

interface ApplicantResumeCardProps {
  resumeUrl: string;
}

export function ApplicantResumeCard({ resumeUrl }: ApplicantResumeCardProps) {
  return (
    <Card className="col-span-3 lg:col-span-2 gap-4 h-full lg:h-[500px] shadow-none">
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="bg-accent flex items-center p-2 size-10">
            <File className="h-6 w-6" />
          </Avatar>
          <div className="space-y-1">
            <CardTitle>Candidate Resume</CardTitle>
            <CardDescription>View the candidate's resume.</CardDescription>
          </div>
        </div>
        <Link href={resumeUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="outline">
            Preview Resume
            <ExternalLinkIcon className="ms-2 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="h-full space-y-2 mt-0">
        <iframe
          src={`https://docs.google.com/viewer?url=${resumeUrl}&embedded=true`}
          frameBorder="0"
          height="100%"
          width="100%"
          className="rounded-sm"
        ></iframe>
      </CardContent>
    </Card>
  );
}
