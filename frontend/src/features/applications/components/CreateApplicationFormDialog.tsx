import { FormDialog } from "@/components/common/dialogs/FormDialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Form } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createApplicationSchema } from "../schemas/create-application.schema";
import { useApplicationsActions } from "../hooks/useApplicationsActions";
import { useResumeParsing } from "../hooks/useResumeParsing";
import type { CreateApplicationPayload } from "../types/applications.types";
import { FileInput } from "./form-fields/FileInput";
import { CountrySelect } from "./form-fields/CountrySelect";
import { JobSelect } from "./form-fields/JobSelect";
import { StatusSelect } from "./form-fields/StatusSelect";
import { StageSelect } from "./form-fields/StageSelect";
import { FullNameInput } from "./form-fields/FullNameInput";
import { EmailInput } from "./form-fields/EmailInput";
import { PhoneNumberInput } from "./form-fields/PhoneNumberInput";
import { CityInput } from "./form-fields/CityInput";
import { LinkedinUrlInput } from "./form-fields/LinkedinUrlInput";
import { PortfolioUrlInput } from "./form-fields/PortfolioUrlInput";

const createApplicationResolver = zodResolver(createApplicationSchema);

interface CreateApplicationFormDialogProps {
  onSuccess: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function CreateApplicationFormDialog({
  onSuccess,
  open = false,
  setOpen,
}: CreateApplicationFormDialogProps) {
  const { create, loading, apiError, clearApiError } = useApplicationsActions();

  const form = useForm<CreateApplicationPayload>({
    resolver: createApplicationResolver,
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      country: "",
      job: "",
      linkedInUrl: "",
      portfolioUrl: "",
      resume: undefined,
      city: "",
      status: "applied",
      stage: "screening",
    },
  });

  const { parsingResume, handleResumeSelect, cancelParsing } = useResumeParsing(form);

  const isFormBusy = loading || parsingResume;

  const handleSubmit: SubmitHandler<CreateApplicationPayload> = async (
    values,
  ) => {
    clearApiError();
    try {
      await create(values);
      form.reset();
      onSuccess();
    } catch {
      //errors handled via useDepartmentActions/useApiError
    }
  };

  const handleClose = () => {
    form.reset();
    clearApiError();
    setOpen(false);
  };

  useEffect(() => {
    if (apiError?.validationErrors) {
      apiError.validationErrors.forEach((error) => {
        form.setError(error.field as keyof CreateApplicationPayload, {
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
      title="Create Application"
      isOpen={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      loading={loading}
      formId="createApplicationForm"
      className="max-h-3/4 sm:max-h-fit sm:max-w-2xl overflow-auto"
    >
      <Form {...form}>
        <form
          id="createApplicationForm"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 mt-3 mb-2"
        >
          <div className="relative">
            {parsingResume && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-lg bg-white/80 p-4 text-sm font-medium text-gray-700 backdrop-blur-sm dark:bg-zinc-900/80 dark:text-gray-100">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Generating information from resume...</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Please wait, this will only take a moment.</p>
                <Button size="sm" variant="outline" onClick={cancelParsing} className="mt-1">
                  Cancel parsing
                </Button>
              </div>
            )}

            <fieldset
              disabled={isFormBusy}
              className={`space-y-5 ${isFormBusy ? "pointer-events-none opacity-60" : ""}`}
            >
              <div className="w-full">
                <FileInput
                  control={form.control as any}
                  onFileSelect={handleResumeSelect}
                  disabled={isFormBusy}
                />
              </div>
              <div className="grid sm:grid-cols-2 items-start gap-4">
                <FullNameInput control={form.control as any} />
                <EmailInput control={form.control as any} />
              </div>

              <div className="grid sm:grid-cols-2 items-start gap-4">
                <PhoneNumberInput control={form.control as any} />
                <JobSelect control={form.control as any} />
              </div>

              <div className="grid sm:grid-cols-2 items-start gap-4">
                <CountrySelect control={form.control as any} />
                <CityInput control={form.control as any} />
              </div>

              <div className="grid sm:grid-cols-2 items-start gap-4">
                <StatusSelect control={form.control as any} />
                <StageSelect control={form.control as any} />
              </div>
              <div className="grid sm:grid-cols-2 items-start gap-4">
                <LinkedinUrlInput control={form.control as any} />
                <PortfolioUrlInput control={form.control as any} />
              </div>
            </fieldset>
          </div>
        </form>
      </Form>
    </FormDialog>
  );
}
