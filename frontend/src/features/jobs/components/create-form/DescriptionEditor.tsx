import type { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import type { CreateJobPayload, UpdateJobPayload } from "../../types/jobs.types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useJobActions } from "../../hooks/useJobsActions";
import { memo, useMemo } from "react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

type JobFormValues = CreateJobPayload | UpdateJobPayload;
type JobFormBase = FieldValues & {
  description?: string;
  title?: string;
  department?: string;
  employmentType?: string;
  country?: string;
  experienceLevel?: string;
};

interface DescriptionEditorProps<
  T extends JobFormBase = CreateJobPayload,
> {
  form: UseFormReturn<T>;
}

export function DescriptionEditor<T extends JobFormBase = CreateJobPayload>({
  form,
}: DescriptionEditorProps<T>) {
  const { generateDescription, loading } = useJobActions();
  const descriptionField = "description" as Path<T>;
  const descriptionValue = form.watch(descriptionField);
  const getButtonText = useMemo(
    () => (descriptionValue ? "Enhance with AI" : "Generate with AI"),
    [descriptionValue],
  );

  const handleGenerateDescription = async () => {
    try {
      const values = form.getValues();
      if (!values.title || !values.department) {
        throw new Error("Title and Department are required to generate a description.");
      }

      const generatedDescription = await generateDescription({
        title: values.title ?? "",
        department: values.department ?? "",
        employmentType: values.employmentType,
        location: values.country,
        seniority: values.experienceLevel,
      });
      form.setValue(
        descriptionField,
        (generatedDescription?.context ?? "") as PathValue<T, Path<T>>,
      );
    } catch (error) {
      toast.error(
        (error as Error).message ||
          "An error occurred while generating the job description."
      );
    }
  };

  return (
    <FormField
      control={form.control}
      name={descriptionField}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="mb-0 flex justify-between items-center">
            <div>Description</div>
            <div>
              <Button
                size="sm"
                type="button"
                onClick={handleGenerateDescription}
                disabled={loading}
                className="border border-transparent text-white shadow-sm hover:opacity-90 disabled:opacity-70"
                style={{
                  background:
                    "linear-gradient(#0f172a, #0f172a) padding-box, linear-gradient(90deg, #4338ca, #0284c7) border-box",
                }}
              >
                <ButtonLoadingWrapper
                  isLoading={loading}
                  loadingText="Generating..."
                >
                  <Sparkles className="h-4 w-4 text-white" />
                  {getButtonText}
                </ButtonLoadingWrapper>
              </Button>
            </div>
          </FormLabel>
          <FormControl>
            <RichTextEditor
              value={typeof field.value === "string" ? field.value : ""}
              onChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

const ButtonLoadingWrapper = memo(function ButtonLoadingWrapper({
  isLoading,
  loadingText,
  children,
}: {
  isLoading: boolean;
  loadingText: string;
  children: React.ReactNode;
}) {
  if (isLoading) {
    return (
      <>
        <Spinner className="mr-2 h-4 w-4" />
        <span>{loadingText}</span>
      </>
    );
  }

  return <>{children}</>;
});
