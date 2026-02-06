import {
  MoreHorizontal,
  Eye,
  Pencil,
  Trash,
  ArrowRightLeft,
  Route,
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

interface ActionsDropdownProps {
  onView?: (application: Application) => void;
  onEdit?: (application: Application) => void;
  onChangeStatus?: (application: Application) => void;
  onChangeStage?: (application: Application) => void;
  onDelete?: (application: Application) => void;
  isDeleting?: boolean;
  confirmDelete?: (application: Application) => void;
  row: Application;
}

export function ActionsDropdown({
  onView,
  onEdit,
  onChangeStatus,
  onChangeStage,
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
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => onView?.(row)}
        >
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>
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
