import { ViewDialog } from "@/components/common/dialogs/ViewDialog";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useDepartmentsActions } from "../hooks/useDepartmentsActions";
import { Alert } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ViewDepartmentDialogProps {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function ViewDepartmentDialog({
  id,
  open,
  setOpen,
}: ViewDepartmentDialogProps) {
  const [department, setDepartment] = useState<any>(null);
  const { findDepartment, loading } = useDepartmentsActions();

  const handleClose = () => {
    setDepartment(null);
    setOpen(false);
  };

  useEffect(() => {
    const fetchDepartment = async () => {
      if (open && id) {
        const departmentData = await findDepartment(id);
        setDepartment(departmentData);
      }
    };

    fetchDepartment();
  }, [id, open]);

  return (
    <ViewDialog
      title="Department Details"
      isOpen={open}
      onClose={handleClose}
      loading={loading}
    >
      <Card className="bg-transparent shadow-none border-0 pb-3">
        {!department && !loading && (
          <CardContent className="space-y-6">
            <Alert variant="default">
              <AlertCircle className="mr-2 h-4 w-4" />
              Department not found or has been deleted.
            </Alert>
          </CardContent>
        )}

        {department && (
          <CardContent className="space-y-4 px-0">
            <div className="flex justify-between items-center">
              <div className="font-medium">Title</div>
              <div className="text-gray-600 dark:text-gray-400 text-end">
                {department.title}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="font-medium">Creation Date</div>
              <div className="text-gray-600 dark:text-gray-400 text-end">
                {department.createdAtDiff}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="font-medium">Description</div>
              <div className="text-gray-600 dark:text-gray-400 text-end">
                {department.description}
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </ViewDialog>
  );
}
