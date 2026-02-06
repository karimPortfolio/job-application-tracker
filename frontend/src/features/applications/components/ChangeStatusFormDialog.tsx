import { FormDialog } from "@/components/common/dialogs/FormDialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useApplicationsActions } from "../hooks/useApplicationsActions";
import { Application } from "../types/applications.types";
import { APPLICATION_STATUSES } from "../constants/application-constants";
import { changeApplicationStatusSchema } from "../schemas/change-application-status.schema";

type ChangeStatusFormData = z.infer<typeof changeApplicationStatusSchema>;

interface ChangeStatusFormDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  application: Application;
  onSuccess: () => void;
}

const changeStatusResolver = zodResolver(changeApplicationStatusSchema);

export function ChangeStatusFormDialog({
  open,
  setOpen,
  application,
  onSuccess,
}: ChangeStatusFormDialogProps) {
  const { changeStatus, apiError, clearApiError, loading } = useApplicationsActions();

  const form = useForm<ChangeStatusFormData>({
    resolver: changeStatusResolver,
    defaultValues: {
      status: (application?.status as ChangeStatusFormData['status']),
    },
  });

  const handleSubmit = async (values: ChangeStatusFormData) => {
    clearApiError();
    try {
      if (application) {
        await changeStatus(application.id, values.status);
        onSuccess();
      }
    } catch {
      //==== errors handled via useJobActions/useApiError
    }
  };

  const handleClose = () => {
    form.reset();
    setOpen(false);
  };

  useEffect(() => {
    if (open && application) {
      const status = APPLICATION_STATUSES.find((s) => s.value === application.status);
      if (status) {
        form.setValue("status", status.value as ChangeStatusFormData['status']);
      }
    }
  }, [open, application, form]);

  useEffect(() => {
    if (apiError?.validationErrors) {
      apiError.validationErrors.forEach((error) => {
        form.setError(error.field as "status", {
          type: "server",
          message: error.errors[0],
        });
      });
    } else {
      form.clearErrors();
    }
  }, [apiError?.validationErrors, form]);

  return (
    <FormDialog
      title="Change Application Status"
      isOpen={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      loading={loading}
      formId="changeApplicationStatus"
    >
      <Form {...form}>
        <form
          id="changeApplicationStatus"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 mt-3 mb-2"
        >
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={typeof field.value === "string" ? field.value : ""}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {APPLICATION_STATUSES.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </FormDialog>
  );
}
