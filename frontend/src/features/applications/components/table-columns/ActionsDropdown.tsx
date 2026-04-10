import {
  MoreHorizontal,
  Eye,
  Pencil,
  Trash,
  ArrowRightLeft,
  Route,
  BrainCircuit,
  Zap,
  Sparkles,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Application } from "../../types/applications.types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

interface ActionsDropdownProps {
  onView?: (application: Application) => void;
  onEdit?: (application: Application) => void;
  onChangeStatus?: (application: Application) => void;
  onChangeStage?: (application: Application) => void;
  onDelete?: (application: Application) => void;
  onRunningSmartScreening?: (application: Application) => void;
  isDeleting?: boolean;
  confirmDelete?: (application: Application) => void;
  row: Application;
}

export function ActionsDropdown({
  onView,
  onEdit,
  onChangeStatus,
  onChangeStage,
  onRunningSmartScreening,
  isDeleting,
  confirmDelete,
  row,
}: ActionsDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link
          href={`/dashboard/applications/${row.id}`}
        >
          <DropdownMenuItem className="cursor-pointer">
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => onEdit?.(row)}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => onChangeStatus?.(row)}
        >
          <ArrowRightLeft className="mr-2 h-4 w-4" />
          Change Status
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => onChangeStage?.(row)}
        >
          <Route className="mr-2 h-4 w-4" />
          Change Stage
        </DropdownMenuItem>
        <Tooltip>
          <TooltipTrigger>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => onRunningSmartScreening?.(row)}
            >
              <BrainCircuit className=" mr-2 w-4" />
              Run Smart Screening
            </DropdownMenuItem>
          </TooltipTrigger>
          <TooltipContent side="left" className="w-52">
            <p>
              Runs an automated evaluation of this candidate. The AI ranks the
              applicant’s fit for the role by cross-referencing their background
              with the specific needs of the job.
            </p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer"
          disabled={isDeleting}
          onClick={() => confirmDelete?.(row)}
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
