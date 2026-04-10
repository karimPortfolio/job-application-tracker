import { FormDialog } from "@/components/common/dialogs/FormDialog";
import { CreateApplicationPayload } from "@/features/applications/types/applications.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileInput } from "../../components/form-fields/FileInput";
import { FullNameInput } from "../../components/form-fields/FullNameInput";
import { EmailInput } from "../../components/form-fields/EmailInput";
import { PhoneNumberInput } from "../../components/form-fields/PhoneNumberInput";
import { CountrySelect } from "../../components/form-fields/CountrySelect";
import { CityInput } from "../../components/form-fields/CityInput";
import { LinkedinUrlInput } from "../../components/form-fields/LinkedinUrlInput";
import { PortfolioUrlInput } from "../../components/form-fields/PortfolioUrlInput";
import { createPublicApplicationSchema } from "../schemas/create-public-application.schema";
import ReCAPTCHA from "react-google-recaptcha";
import { usePublicApplicationsActions } from "../hooks/usePublicApplicationsActions";
import { useResumeParsing } from "../hooks/useResumeParsing";

interface CreatePublicApplicationDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
  jobId: string;
}

const createPublicApplicationResolver = zodResolver(
  createPublicApplicationSchema,
);

export const CreatePublicApplicationDialog = ({
  open,
  setOpen,
  onSuccess,
  jobId,
}: CreatePublicApplicationDialogProps) => {
  const { create, loading, apiError, clearApiError } =
    usePublicApplicationsActions();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsVerified] = useState(false);

  const form = useForm<CreateApplicationPayload>({
    // resolver: createPublicApplicationResolver,
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      country: "",
      linkedInUrl: "",
      portfolioUrl: "",
      resume: undefined,
      city: "",
    },
  });

  const { parsingResume, handleResumeSelect, cancelParsing } =
    useResumeParsing(form);

  const isFormBusy = loading || parsingResume;

  const handleCaptchaChange = (token: string | null) => {
    setIsVerified(!!token);
  };

  const handleSubmit: SubmitHandler<CreateApplicationPayload> = async (
    values,
  ) => {
    clearApiError();
    try {
      const token = recaptchaRef.current?.getValue();

      if (!token || !jobId) {
        return;
      }

      values.job = jobId;
      values.recaptchaToken = token;

      await create(values, {
        "x-recaptcha-token": token,
      });
      
      form.reset();
      onSuccess();
    } catch {
      //error handling is done in the hook, so we don't need to do anything here
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

  if (!open) {
    return null;
  }

  return (
    <FormDialog
      title="Apply for this job"
      isOpen={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      loading={loading}
      formId="createPublicApplicationForm"
      className="max-h-3/4 sm:max-h-fit sm:max-w-2xl overflow-auto"
      onInteractOutside={(e) => e.preventDefault()}
      disableSubmitButton={!isVerified}
    >
      <FormProvider {...form}>
        <form
          id="createPublicApplicationForm"
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
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Please wait, this will only take a moment.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={cancelParsing}
                  className="mt-1"
                >
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
                <LinkedinUrlInput control={form.control as any} />
              </div>

              <div className="grid sm:grid-cols-2 items-start gap-4">
                <CountrySelect control={form.control as any} />
                <CityInput control={form.control as any} />
              </div>

              <PortfolioUrlInput control={form.control as any} />

              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={handleCaptchaChange}
                ref={recaptchaRef}
              />
            </fieldset>
          </div>
        </form>
      </FormProvider>
    </FormDialog>
  );
};
