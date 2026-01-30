import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JOB_EMPLOYMENT_TYPE_OPTIONS, JOB_EXPERIENCE_LEVEL_OPTIONS } from "@/features/constants/job-constants";
import { JobEmploymentTypeOption, JobExperienceLevelOption } from "@/features/types/jobs.types";
import { Control } from "react-hook-form";
import { CreateJobPayload } from "../../types/jobs.types";

interface ExperienceLevelSelectProps {
  control: Control<CreateJobPayload>;
}

export function ExperienceLevelSelect({ control }: ExperienceLevelSelectProps) {
  return (
    <FormField
      control={control}
      name="experienceLevel"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Experience Level</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value ?? ""}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {JOB_EXPERIENCE_LEVEL_OPTIONS.map(
                    (type: JobExperienceLevelOption) => (
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
