import { FormDialog } from "@/components/common/dialogs/FormDialog";
import { useEffect, useRef, useState } from "react";
import { Form } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateApplicationSchema } from "../schemas/update-application.schema";
import { useApplicationsActions } from "../hooks/useApplicationsActions";
import { useResumeParsing } from "../hooks/useResumeParsing";
import type { UpdateApplicationPayload } from "../types/applications.types";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface UpdateApplicationFormDialogProps {
  onSuccess: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

export function UpdateApplicationFormDialog({
  onSuccess,
  open = false,
  setOpen,
  id,
}: UpdateApplicationFormDialogProps) {
  const { update, findApplication, loading, apiError, clearApiError } =
    useApplicationsActions();
  const [changeResume, setChangeResume] = useState<any>(false);

  const form = useForm<UpdateApplicationPayload>({
    resolver: zodResolver(updateApplicationSchema as any),
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

  const initialValuesRef = useRef<UpdateApplicationPayload | null>(null);

  const handleResumeSelect = (file: File) => {
    form.setValue("resume", file, { shouldDirty: true });
  };

  const handleSubmit: SubmitHandler<UpdateApplicationPayload> = async (
    values,
  ) => {
    clearApiError();
    try {
      const dirtyFields = form.formState.dirtyFields;
      const dirtyValues: Partial<UpdateApplicationPayload> = {};
      Object.keys(dirtyFields).forEach((key) => {
        if (dirtyFields[key as keyof UpdateApplicationPayload]) {
          const value = values[key as keyof UpdateApplicationPayload];
          (dirtyValues as any)[key] = value;
        }
      });

      await update(id, dirtyValues as UpdateApplicationPayload);
      form.reset();
      setChangeResume(false);
      onSuccess();
    } catch {
      //errors handled via useDepartmentActions/useApiError
    }
  };

  const handleClose = () => {
    form.reset();
    clearApiError();
    setOpen(false);
    setChangeResume(false);
  };

  useEffect(() => {
    async function fetchApplication() {
      if (open) {
        const application = await findApplication(id);
        const jobId =
          typeof application.job === "string"
            ? application.job
            : application.job?._id || "";
        const initialValues: UpdateApplicationPayload = {
          fullName: application.fullName,
          email: application.email,
          phoneNumber: application.phoneNumber,
          country: application.country || "",
          job: String(jobId),
          linkedInUrl: application.linkedInUrl || "",
          portfolioUrl: application.portfolioUrl || "",
          resume: undefined,
          city: application.city || "",
          status: application.status,
          stage: application.stage,
        };
        initialValuesRef.current = initialValues;
        form.reset(initialValues);

        //=== give the DynamicSelect time to load options before setting the job value
        setTimeout(() => {
          form.setValue("job", String(jobId), { shouldDirty: false });
        }, 100);
      }
    }
    fetchApplication();
  }, [open, id, form]);

  useEffect(() => {
    if (apiError?.validationErrors) {
      apiError.validationErrors.forEach((error) => {
        form.setError(error.field as keyof UpdateApplicationPayload, {
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
      title="Update Application"
      isOpen={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      loading={loading}
      formId="updateApplicationForm"
      className="max-h-3/4 sm:max-h-fit sm:max-w-2xl overflow-auto"
    >
      <Form {...form}>
        <form
          id="updateApplicationForm"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 mt-3 mb-2"
        >
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
          <div className="w-full">
            <div className="flex gap-3 items-center">
              <Checkbox
                checked={changeResume}
                onCheckedChange={setChangeResume}
                id="resumeChangeCheckbox"
              />
              <div className="flex flex-col">
                <Label htmlFor="resumeChangeCheckbox" className="text-sm">
                  Change Resume
                </Label>
                <small className="text-gray-700 dark:text-gray-400">
                  Check this box if you want to upload a new resume.
                </small>
              </div>
            </div>
            {changeResume && (
              <FileInput
                control={form.control as any}
                onFileSelect={handleResumeSelect}
                disabled={loading}
                className="pt-6"
              />
            )}
          </div>
        </form>
      </Form>
    </FormDialog>
  );
}
