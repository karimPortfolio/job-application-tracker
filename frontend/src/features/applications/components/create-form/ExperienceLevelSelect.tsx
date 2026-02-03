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
import { JOB_EMPLOYMENT_TYPE_OPTIONS, JOB_EXPERIENCE_LEVEL_OPTIONS } from "@/features/jobs/constants/job-constants";
import { JobEmploymentTypeOption, JobExperienceLevelOption } from "@/features/types/jobs.types";
import { Control, Path } from "react-hook-form";
import { CreateJobPayload, UpdateJobPayload } from "../../types/jobs.types";

type JobFormValues = CreateJobPayload | UpdateJobPayload;

interface ExperienceLevelSelectProps<T extends JobFormValues = CreateJobPayload> {
  control: Control<T>;
}

export function ExperienceLevelSelect<T extends JobFormValues = CreateJobPayload>({
  control,
}: ExperienceLevelSelectProps<T>) {
  const experienceLevelField = "experienceLevel" as Path<T>;
  return (
    <FormField
      control={control}
      name={experienceLevelField}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Experience Level</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={typeof field.value === "string" ? field.value : ""}>
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
