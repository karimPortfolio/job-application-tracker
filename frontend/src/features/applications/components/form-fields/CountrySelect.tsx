import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import type { Control, Path } from "react-hook-form";
import { useCountries } from "@/shared/hooks/useCountries";
import type {
  UpdateApplicationPayload,
  CreateApplicationPayload,
} from "../../types/applications.types";

type ApplicationFormValues =
  | CreateApplicationPayload
  | UpdateApplicationPayload;

interface CountrySelectProps<
  T extends ApplicationFormValues =
    | CreateApplicationPayload
    | UpdateApplicationPayload,
> {
  control: Control<T>;
}

export function CountrySelect<
  T extends ApplicationFormValues =
    | CreateApplicationPayload
    | UpdateApplicationPayload,
>({ control }: CountrySelectProps<T>) {
  const { countries } = useCountries();
  const countryField = "country" as Path<T>;
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredCountries = useMemo(() => {
    if (searchTerm.trim() === "") {
      return countries;
    }
    const term = searchTerm.toLowerCase();
    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(term) ||
        country.code.toLowerCase().includes(term),
    );
  }, [countries, searchTerm]);

  const options = useMemo(
    () =>
      filteredCountries.map((country) => (
        <SelectItem key={country.code} value={country.name}>
          <img src={country.flag} alt={country.name} height={15} width={20} />
          <span>{country.name}</span>
        </SelectItem>
      )),
    [filteredCountries],
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
                  <SelectContent position="popper" className="max-h-80">
                    <div className="p-2">
                      <Input
                        placeholder="Search country..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.stopPropagation()}
                        className="h-8"
                      />
                    </div>
                    <Separator className="my-2" />
                    <div className="max-h-72 overflow-y-auto">
                      <SelectGroup>
                        {options.length > 0 ? (
                          options
                        ) : (
                          <div className="px-2 py-1.5 text-sm text-muted-foreground">
                            No countries found
                          </div>
                        )}
                      </SelectGroup>
                    </div>
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
