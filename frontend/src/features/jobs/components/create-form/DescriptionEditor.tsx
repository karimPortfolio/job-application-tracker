import type { UseFormReturn } from "react-hook-form";
import { CreateJobPayload } from "../../types/jobs.types";
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

interface DescriptionEditorProps {
  form: UseFormReturn<CreateJobPayload>;
}

export function DescriptionEditor({ form }: DescriptionEditorProps) {
  const { generateDescription, loading } = useJobActions();
  
  const descriptionValue = form.watch("description");
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
        title: values.title,
        department: values.department,
        employmentType: values.employmentType,
        location: values.country,
        seniority: values.experienceLevel,
      });
      form.setValue("description", generatedDescription?.context ?? "");
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
      name="description"
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
              >
                <ButtonLoadingWrapper
                  isLoading={loading}
                  loadingText="Generating..."
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  {getButtonText}
                </ButtonLoadingWrapper>
              </Button>
            </div>
          </FormLabel>
          <FormControl>
            <RichTextEditor
              value={field.value ?? ""}
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
