import { memo } from "react";
import type { Control } from "react-hook-form";
import type { CreateApplicationPayload, UpdateApplicationPayload } from "../../types/applications.types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type ApplicationFormValues = CreateApplicationPayload | UpdateApplicationPayload;

export const LinkedinUrlInput = memo(function LinkedinUrlInput<T extends ApplicationFormValues = ApplicationFormValues>({
  control,
}: {
  control: Control<T>;
}) {
  return (
    <FormField
      control={control}
      name={"linkedInUrl" as any}
      render={({ field }) => (
        <FormItem>
          <FormLabel>LinkedIn URL</FormLabel>
          <FormControl>
            <Input placeholder="e.g. https://www.linkedin.com/in/johndoe" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
});
