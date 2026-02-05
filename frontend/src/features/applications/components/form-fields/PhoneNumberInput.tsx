import { memo, useEffect, useMemo, useState } from "react";
import type { Control } from "react-hook-form";
import { useWatch } from "react-hook-form";
import type { CreateApplicationPayload, UpdateApplicationPayload } from "../../types/applications.types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCountries } from "@/shared/hooks/useCountries";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

type ApplicationFormValues = CreateApplicationPayload | UpdateApplicationPayload;

function parsePhoneNumber(value?: string) {
  const raw = (value ?? "").trim();
  if (!raw.startsWith("+")) {
    return { code: "", number: raw };
  }

  const codeMatch = raw.match(/^\+\d+/);
  const code = codeMatch ? codeMatch[0] : "";
  const number = raw.slice(code.length).trim();
  return { code, number };
}

// function buildPhoneValue(code: string, number: string) {
//   const trimmedCode = code.trim();
//   const trimmedNumber = number.trim();

//   if (!trimmedCode) return trimmedNumber;
//   if (!trimmedNumber) return trimmedCode;

//   const formattedCode = trimmedCode.startsWith("+") ? trimmedCode : `+${trimmedCode}`;
//   return `${formattedCode} ${trimmedNumber}`;
// }

function applyPhoneMask(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 0) return "";
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  if (digits.length <= 10)
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}${digits.slice(6)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}${digits.slice(6, 10)}`;
}

export const PhoneNumberInput = memo(function PhoneNumberInput<T extends ApplicationFormValues = ApplicationFormValues>({
  control,
}: {
  control: Control<T>;
}) {
  const { countries, loading } = useCountries();
  const phoneNumberValue = useWatch({ control, name: "phoneNumber" as any });

  const [selectedCode, setSelectedCode] = useState<string>("");
  const [phoneDigits, setPhoneDigits] = useState<string>("");
  const [searchedCountryCode, setSearchedCountryCode] = useState<string>("");

  useEffect(() => {
    const { code, number } = parsePhoneNumber(
      typeof phoneNumberValue === "string" ? phoneNumberValue : "",
    );
    setSelectedCode(code || "");
    setPhoneDigits(number || "");
  }, [phoneNumberValue]);

  const phoneCodeOptions = useMemo(() => {
    const seen = new Set<string>();
    let options =
      countries
        .filter((country) => country.phoneCode)
        .filter((country) => {
          if (seen.has(country.phoneCode)) {
            return false;
          }
          seen.add(country.phoneCode);
          return true;
        })
        .map((country) => ({
          code: country.code,
          name: country.name,
          flag: country.flag,
          phoneCode: country.phoneCode,
        })) ?? [];

    if (searchedCountryCode.trim() !== "") {
      const searchTerm = searchedCountryCode.toLowerCase();
      options = options.filter(
        (option) =>
          option.phoneCode.toLowerCase().includes(searchTerm) ||
          option.code.toLowerCase().includes(searchTerm) ||
          option.name.toLowerCase().includes(searchTerm),
      );
    }

    return options;
  }, [countries, searchedCountryCode]);

  const handleCodeChange = (nextCode: string) => {
    setSelectedCode(nextCode);
    const mergedValue =
      nextCode && phoneDigits
        ? `${nextCode} ${phoneDigits}`
        : nextCode || phoneDigits;
    control._formValues.phoneNumber = mergedValue;
  };

  const handlePhoneChange = (rawValue: string) => {
    setPhoneDigits(rawValue);
    const mergedValue =
      selectedCode && rawValue
        ? `${selectedCode} ${rawValue}`
        : selectedCode || rawValue;
    control._formValues.phoneNumber = mergedValue;
  };

  return (
    <FormField
      control={control}
      name={"phoneNumber" as any}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
          <FormControl>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
              <Select
                value={selectedCode || ""}
                onValueChange={handleCodeChange}
                disabled={loading}
              >
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="+1" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <div>
                    <Input
                      placeholder="Search country code"
                      value={searchedCountryCode}
                      onChange={(e) => setSearchedCountryCode(e.target.value)}
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                  </div>
                  <Separator className="my-2" />
                  <SelectGroup>
                    {phoneCodeOptions.length > 0 ? (
                      phoneCodeOptions.map((country, index) => (
                        <SelectItem key={index} value={country.phoneCode}>
                          <span className="flex items-center gap-2">
                            <img
                              src={country.flag}
                              alt={country.code}
                              width={20}
                              height={14}
                              className="rounded-sm"
                            />
                            <span className="font-medium">
                              {country.phoneCode}
                            </span>
                          </span>
                        </SelectItem>
                      ))
                    ) : (
                      <div className="px-2 py-1.5 text-sm text-muted-foreground">
                        No countries found
                      </div>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div className="flex-1">
                <Input
                  placeholder="000-0000"
                  value={applyPhoneMask(phoneDigits)}
                  onChange={(event) => {
                    const rawValue = event.target.value.replace(/\D/g, "");
                    handlePhoneChange(rawValue);
                  }}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  className="flex-1"
                  id="phoneNumber"
                />
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
});
