import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { Control, Path } from "react-hook-form";
import { useCountries } from "@/shared/hooks/useCountries";
import type { CreateJobPayload, UpdateJobPayload } from "../../types/jobs.types";

type JobFormValues = CreateJobPayload | UpdateJobPayload;

interface CountrySelectProps<T extends JobFormValues = CreateJobPayload> {
  control: Control<T>;
}

export function CountrySelect<T extends JobFormValues = CreateJobPayload>({
  control,
}: CountrySelectProps<T>) {
  const { countries } = useCountries();
  const countryField = "country" as Path<T>;

  const options = useMemo(
    () =>
      countries.map((country) => (
        <SelectItem key={country.code} value={country.name}>
          <img src={country.flag} alt={country.name} height={15} width={20} />
          <span>{country.name}</span>
        </SelectItem>
      )),
    [countries],
  );
  
  return (
    <>
      <FormField
        control={control}
        name={countryField}
        render={({ field }) => {
          const fieldValue = typeof field.value === "string" ? field.value : "";
          return (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={String(fieldValue)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {options}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </>
  );
}
