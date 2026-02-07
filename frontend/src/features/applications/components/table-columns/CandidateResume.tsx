import { ExternalLink } from "lucide-react";
import { Application } from "../../types/applications.types";

interface CandidateResumeProps {
  row: Application;
}

export function CandidateResume({ row }: CandidateResumeProps) {
  return (
    <span>
      {row.resumeUrl && (
        <a
          href={row.resumeUrl}
          target="_blank"
          className="text-blue-500 text-xs flex items-center gap-1 mt-1"
        >
          Resume
          <ExternalLink className="size-3" />
        </a>
      )}
    </span>
  );
}
