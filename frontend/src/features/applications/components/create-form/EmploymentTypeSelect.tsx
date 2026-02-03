import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JOB_EMPLOYMENT_TYPE_OPTIONS } from "@/features/jobs/constants/job-constants";
import { JobEmploymentTypeOption } from "@/features/types/jobs.types";
import { Control, Path } from "react-hook-form";
import { CreateJobPayload, UpdateJobPayload } from "../../types/jobs.types";

type JobFormValues = CreateJobPayload | UpdateJobPayload;

interface EmploymentTypeSelectProps<T extends JobFormValues = CreateJobPayload> {
  control: Control<T>;
}

export function EmploymentTypeSelect<T extends JobFormValues = CreateJobPayload>({
  control,
}: EmploymentTypeSelectProps<T>) {
  const employmentTypeField = "employmentType" as Path<T>;
  return (
    <FormField
      control={control}
      name={employmentTypeField}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Employment Type</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={typeof field.value === "string" ? field.value : ""}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select employment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {JOB_EMPLOYMENT_TYPE_OPTIONS.map(
                    (type: JobEmploymentTypeOption) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
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
