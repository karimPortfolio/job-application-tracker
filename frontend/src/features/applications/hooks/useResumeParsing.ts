import axios from "axios";
import { useCallback, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useApiError } from "@/hooks/useApiError";
import { parseResume } from "../services/applications.service";
import { CreateApplicationPayload } from "../types/applications.types";

export function useResumeParsing(form: UseFormReturn<CreateApplicationPayload>) {
  const { handleError } = useApiError();
  const [parsingResume, setParsingResume] = useState(false);
  const [controller, setController] = useState<AbortController | null>(null);

  const handleResumeSelect = useCallback(
    async (file: File) => {
      setParsingResume(true);
      const abortController = new AbortController();
      setController(abortController);

      const formData = new FormData();
      formData.append("resume", file);

      try {
        const parsed = await parseResume(formData, abortController.signal).then((res) => res.data ?? res);

        if (parsed?.fullName) {
          form.setValue("fullName", parsed.fullName, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }

        const email = parsed?.email || parsed?.contactInformation?.email || parsed?.contact_information?.email;
        if (email) {
          form.setValue("email", email, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }

        const phoneNumber =
          parsed?.phone ||
          parsed?.phoneNumber ||
          parsed?.contactInformation?.phoneNumber ||
          parsed?.contact_information?.phone ||
          parsed?.contact_information?.phoneNumber;
        if (phoneNumber) {
          form.setValue("phoneNumber", phoneNumber, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }

        const linkedInUrl =
          parsed?.linkedin ||
          parsed?.linkedInUrl ||
          parsed?.links?.linkedin ||
          parsed?.links?.linkedIn;
        if (linkedInUrl) {
          form.setValue("linkedInUrl", linkedInUrl, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }

        const portfolioUrl =
          parsed?.portfolio ||
          parsed?.portfolioUrl ||
          parsed?.links?.portfolio ||
          parsed?.links?.portfolioUrl ||
          parsed?.github;
        if (portfolioUrl) {
          form.setValue("portfolioUrl", portfolioUrl, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }

        const githubUrl = parsed?.github || parsed?.links?.github;
        if (githubUrl) {
          form.setValue("githubUrl", githubUrl, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }

        const country = parsed?.country;
        if (country) {
          form.setValue("country", country, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }

        const city = parsed?.city;
        if (city) {
          form.setValue("city", city, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }
      } catch (err: any) {
        const canceled = axios.isCancel(err) || err?.code === "ERR_CANCELED" || err?.name === "AbortError";
        if (!canceled) {
          handleError(err);
          throw err;
        }
      } finally {
        setParsingResume(false);
        setController(null);
      }
    },
    [form, handleError]
  );

  const cancelParsing = useCallback(() => {
    controller?.abort();
    setParsingResume(false);
    setController(null);
  }, [controller]);

  return { parsingResume, handleResumeSelect, cancelParsing };
}