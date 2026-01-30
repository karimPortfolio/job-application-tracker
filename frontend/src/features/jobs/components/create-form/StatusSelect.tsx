import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JOB_STATUS_OPTIONS } from "@/features/constants/job-constants";
import { JobStatusOption } from "@/features/types/jobs.types";
import { Control } from "react-hook-form";
import { CreateJobPayload } from "../../types/jobs.types";

interface StatusSelectProps {
  control: Control<CreateJobPayload>;
}

export function StatusSelect({ control }: StatusSelectProps) {
  return (
    <FormField
      control={control}
      name="status"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Status</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value ?? ""}>
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
