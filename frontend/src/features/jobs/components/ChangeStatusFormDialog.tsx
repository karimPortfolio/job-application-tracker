import { FormDialog } from "@/components/common/dialogs/FormDialog";
import { Job } from "../types/jobs.types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useJobActions } from "../hooks/useJobsActions";
import { JOB_STATUSES } from "../constants/job-constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeJobStatusSchema } from "../schemas/change-job-status.schema";
import { z } from "zod";

type ChangeStatusFormData = z.infer<typeof changeJobStatusSchema>;

interface ChangeStatusFormDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  job: Job | null;
  onSuccess: () => void;
}

const changeStatusResolver = zodResolver(changeJobStatusSchema);

export function ChangeStatusFormDialog({
  open,
  setOpen,
  job,
  onSuccess,
}: ChangeStatusFormDialogProps) {
  const { changeJobStatus, apiError, clearApiError, loading } = useJobActions();

  const form = useForm<ChangeStatusFormData>({
    resolver: changeStatusResolver,
    defaultValues: {
      status: (job?.status as ChangeStatusFormData['status']),
    },
  });

  const handleSubmit = async (values: ChangeStatusFormData) => {
    clearApiError();
    try {
      if (job?.id) {
        await changeJobStatus(job.id, values.status);
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
      title="Change Job Status"
      isOpen={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      loading={loading}
      formId="changeJobStatus"
    >
      <Form {...form}>
        <form
          id="changeJobStatus"
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
                        {JOB_STATUSES.map((option) => (
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
