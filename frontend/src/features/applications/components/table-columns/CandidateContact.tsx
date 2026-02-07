import { Application } from "../../types/applications.types";

interface CandidateContactProps {
  row: Application;
}

export function CandidateContact({ row }: CandidateContactProps) {
  return (
    <span>
      <span className="flex text-gray-900 dark:text-gray-100 font-medium">
        {row.email}
      </span>
      <span className="flex text-xs text-gray-600 dark:text-gray-400">
        {row.phoneNumber}
      </span>
    </span>
  );
}
