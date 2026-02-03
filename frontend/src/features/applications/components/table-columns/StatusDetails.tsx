import { Badge } from "@/components/ui/badge";
import { Application } from "../../types/applications.types";
import { cn } from "@/lib/utils";

interface StatusDetailsProps {
  row: Application;
  applicationStatusMap: {
    [key: string]: { label: string; colorClass: string };
  };
}

export function StatusDetails({ row, applicationStatusMap }: StatusDetailsProps) {
  return (
    <span className="text-sm text-gray-600 dark:text-gray-400">
      <Badge
        className={cn(applicationStatusMap[row.status ?? "draft"]?.colorClass)}
      >
        {applicationStatusMap[row.status ?? "draft"]?.label || row.status}
      </Badge>
    </span>
  );
}
