import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Control, Path } from "react-hook-form";
import { APPLICATION_STATUSES } from "../../constants/application-constants";
import type { ApplicationStatus, CreateApplicationPayload, UpdateApplicationPayload } from "../../types/applications.types";

type ApplicationFormValues = CreateApplicationPayload | UpdateApplicationPayload;

interface StatusSelectProps<T extends ApplicationFormValues = CreateApplicationPayload | UpdateApplicationPayload> {
  control: Control<T>;
}

export function StatusSelect<T extends ApplicationFormValues = CreateApplicationPayload | UpdateApplicationPayload>({
  control,
}: StatusSelectProps<T>) {
  const statusField = "status" as Path<T>;
  return (
    <FormField
      control={control}
      name={statusField}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Status</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={typeof field.value === "string" ? field.value : ""}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {APPLICATION_STATUSES.map(
                    (status: ApplicationStatus) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ),
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
