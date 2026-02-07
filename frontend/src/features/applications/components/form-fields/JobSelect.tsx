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
import { DynamicSelect } from "@/components/common/DynamicSelect";
import { APPLICATIONS_ROUTES } from "../../routes/applications.routes";

type ApplicationFormValues = CreateApplicationPayload | UpdateApplicationPayload;

export const JobSelect = memo(function JobSelect<T extends ApplicationFormValues = ApplicationFormValues>({
  control,
}: {
  control: Control<T>;
}) {
  return (
    <FormField
      control={control}
      name={"job" as any}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Job</FormLabel>
          <FormControl>
            <DynamicSelect
              placeholder="Select a job"
              endpoint={APPLICATIONS_ROUTES.getApplicationsJobs}
              label="title"
              value="_id"
              field={field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
});