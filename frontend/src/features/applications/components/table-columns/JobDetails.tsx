import Link from "next/link";
import { Application } from "../../types/applications.types";

interface JobDetailsProps {
  row: Application;
}

export function JobDetails({ row }: JobDetailsProps) {
  return (
    <span className="flex flex-col">
      <span className="text-gray-900 dark:text-gray-100 font-medium">
        <Link
          href={`/dashboard/jobs/${typeof row.job === "string" ? row.job : row.job?._id}/edit`}
        >
          {typeof row.job === "string" ? row.job : (row.job?.title ?? "N/A")}
        </Link>
      </span>
      <span className="text-xs text-gray-600 dark:text-gray-400">
        {typeof row.job !== "string" ? row.job?.department?.title : ""}
      </span>
    </span>
  );
}
