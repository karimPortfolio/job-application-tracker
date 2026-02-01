import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JOB_STATUS_OPTIONS } from "@/features/jobs/constants/job-constants";
import { JobStatusOption } from "@/features/types/jobs.types";
import { Control, Path } from "react-hook-form";
import { CreateJobPayload, UpdateJobPayload } from "../../types/jobs.types";

type JobFormValues = CreateJobPayload | UpdateJobPayload;

interface StatusSelectProps<T extends JobFormValues = CreateJobPayload> {
  control: Control<T>;
}

export function StatusSelect<T extends JobFormValues = CreateJobPayload>({
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
                  {JOB_STATUS_OPTIONS.map(
                    (status: JobStatusOption) => (
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
