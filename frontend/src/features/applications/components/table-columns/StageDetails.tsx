import { Badge } from "@/components/ui/badge";
import { Application } from "../../types/applications.types";
import { cn } from "@/lib/utils";

interface StageDetailsProps {
  row: Application;
  applicationStagesMap: {
    [key: string]: { label: string; colorClass: string };
  };
}

export function StageDetails({ row, applicationStagesMap }: StageDetailsProps) {
  return (
    <span className="text-sm text-gray-600 dark:text-gray-400">
      <Badge
        className={cn(applicationStagesMap[row.stage ?? "screening"]?.colorClass)}
      >
        {applicationStagesMap[row.stage ?? "screening"]?.label || row.stage}
      </Badge>
    </span>
  );
}
