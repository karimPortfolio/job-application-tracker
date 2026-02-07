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
import { APPLICATION_STAGES } from "../constants/application-constants";
import { changeApplicationStageSchema } from "../schemas/change-application-stage.schema";

type ChangeStageFormData = z.infer<typeof changeApplicationStageSchema>;

interface ChangeStageFormDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  application: Application;
  onSuccess: () => void;
}

const changeStageResolver = zodResolver(changeApplicationStageSchema);
export function ChangeStageFormDialog({
  open,
  setOpen,
  application,
  onSuccess,
}: ChangeStageFormDialogProps) {
  const { changeStage, apiError, clearApiError, loading } = useApplicationsActions();

  const form = useForm<ChangeStageFormData>({
    resolver: changeStageResolver,
    defaultValues: {
      stage: (application?.stage as ChangeStageFormData['stage']),
    },
  });

  const handleSubmit = async (values: ChangeStageFormData) => {
    clearApiError();
    try {
      if (application) {
        await changeStage(application.id, values.stage);
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
      const stage = APPLICATION_STAGES.find((s) => s.value === application.stage);
      if (stage) {
        form.setValue("stage", stage.value as ChangeStageFormData['stage']);
      }
    }
  }, [open, application, form]);

  useEffect(() => {
    if (apiError?.validationErrors) {
      apiError.validationErrors.forEach((error) => {
        form.setError(error.field as "stage", {
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
      title="Change Application Stage"
      isOpen={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      loading={loading}
      formId="changeApplicationStageForm"
    >
      <Form {...form}>
        <form
          id="changeApplicationStageForm"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 mt-3 mb-2"
        >
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="stage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stage</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={typeof field.value === "string" ? field.value : ""}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {APPLICATION_STAGES.map((option) => (
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
