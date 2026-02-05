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

export const FullNameInput = memo(function FullNameInput<T extends ApplicationFormValues = ApplicationFormValues>({
  control,
}: {
  control: Control<T>;
}) {
  return (
    <FormField
      control={control}
      name={"fullName" as any}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Full Name</FormLabel>
          <FormControl>
            <Input placeholder="e.g. John Doe" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
});
