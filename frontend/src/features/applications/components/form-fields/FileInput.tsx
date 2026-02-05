import { FileDropZone } from "@/components/common/FileDropZone";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { Control } from "react-hook-form";
import type { CreateApplicationPayload, UpdateApplicationPayload } from "../../types/applications.types";

type ApplicationFormValues = CreateApplicationPayload | UpdateApplicationPayload;

export const FileInput = <T extends ApplicationFormValues = ApplicationFormValues>({
  control,
  onFileSelect,
  onFileClear,
  disabled = false,
}: {
  control: Control<T>;
  onFileSelect?: (file: File) => void;
  onFileClear?: () => void;
  disabled?: boolean;
}) => {
  return (
    <FormField
      control={control}
      name={"resume" as any}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Resume</FormLabel>
          <FormControl>
            <FileDropZone
              acceptedTypes={[
                "application/pdf",
                "text/plain",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              ]}
              onFileSelect={(file: File) => {
                field.onChange(file);
                onFileSelect?.(file);
              }}
              onFileClear={() => {
                field.onChange(undefined);
                onFileClear?.();
              }}
              disabled={disabled}
              label="Upload Resume"
              description="PDF, TXT, or DOCX (max 2MB)"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
