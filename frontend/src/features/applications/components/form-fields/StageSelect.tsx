import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Control, Path } from "react-hook-form";
import { APPLICATION_STAGES } from "../../constants/application-constants";
import type { CreateApplicationPayload, UpdateApplicationPayload } from "../../types/applications.types";

type ApplicationFormValues = CreateApplicationPayload | UpdateApplicationPayload;

interface StageSelectProps<T extends ApplicationFormValues = CreateApplicationPayload | UpdateApplicationPayload> {
  control: Control<T>;
}

export function StageSelect<T extends ApplicationFormValues = CreateApplicationPayload | UpdateApplicationPayload>({
  control,
}: StageSelectProps<T>) {
  const stageField = "stage" as Path<T>;

  return (
    <FormField
      control={control}
      name={stageField}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Stage</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={typeof field.value === "string" ? field.value : ""}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {APPLICATION_STAGES.map((stage) => (
                    <SelectItem key={stage.value} value={stage.value}>
                      {stage.label}
                    </SelectItem>
                  ))}
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
