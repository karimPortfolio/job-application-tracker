import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JOB_EMPLOYMENT_TYPE_OPTIONS } from "@/features/jobs/constants/job-constants";
import { JobEmploymentTypeOption } from "@/features/types/jobs.types";
import { Control } from "react-hook-form";
import { CreateJobPayload } from "../../types/jobs.types";

interface EmploymentTypeSelectProps {
  control: Control<CreateJobPayload>;
}

export function EmploymentTypeSelect({ control }: EmploymentTypeSelectProps) {
  return (
    <FormField
      control={control}
      name="employmentType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Employment Type</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value ?? ""}>
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
