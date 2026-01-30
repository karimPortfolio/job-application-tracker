import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Control, ControllerRenderProps } from "react-hook-form";
import { useCountries } from "@/shared/hooks/useCountries";
import type { CreateJobPayload } from "../../types/jobs.types";

interface CountrySelectProps {
  control: Control<CreateJobPayload>;
}

// Lazy-load country options only after first open to keep dialog snappy
export function CountrySelect({ control }: CountrySelectProps) {
  const { countries } = useCountries();
  const [showOptions, setShowOptions] = useState(false);

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
        name="country"
        render={({ field }: { field: ControllerRenderProps<CreateJobPayload, "country"> }) => (
          <FormItem>
            <FormLabel>Country</FormLabel>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                value={field.value ?? ""}
                onOpenChange={(open) => {
                  if (open && !showOptions) setShowOptions(true);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                {showOptions && (
                  <SelectContent>
                    <SelectGroup>{options}</SelectGroup>
                  </SelectContent>
                )}
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
