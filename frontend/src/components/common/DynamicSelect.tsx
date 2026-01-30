import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ControllerRenderProps } from "react-hook-form";
import { api } from "@/lib/api/axios";

interface DynamicSelectProps {
  endpoint: string;
  label: string;
  value: string;
  onChange?: (value: string) => void;
  field: ControllerRenderProps<any, any>;
  placeholder?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  children?: React.ReactNode;
}

export function DynamicSelect({
  endpoint,
  label,
  value,
  onChange,
  field,
  placeholder,
  isLoading,
  isDisabled,
  children,
}: DynamicSelectProps) {
  const [fetchedOptions, setFetchedOptions] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  // Cache options per endpoint so dialog remounts don't refetch
  const cache = getOptionsCache();
  const inflight = getInflightRequests();

  useEffect(() => {
    let cancelled = false;

    async function fetchOptions() {
      if (cache.has(endpoint)) {
        setFetchedOptions(cache.get(endpoint) || []);
        setIsFetching(false);
        return;
      }

      setIsFetching(true);

      if (!inflight.has(endpoint)) {
        inflight.set(
          endpoint,
          api
            .get<any>(endpoint)
            .then((response) => {
              const raw = Array.isArray(response.data)
                ? response.data
                : response.data?.docs || [];
              const normalized = raw.map((option: any) => ({ ...option }));
              cache.set(endpoint, normalized);
              return normalized;
            })
            .catch((error) => {
              console.error("Error fetching options:", error);
              cache.set(endpoint, []);
              return [];
            })
            .finally(() => {
              inflight.delete(endpoint);
            })
        );
      }

      const options = await inflight.get(endpoint);
      if (cancelled) return;

      setFetchedOptions(options || []);
      setIsFetching(false);
    }

    fetchOptions();

    return () => {
      cancelled = true;
    };
  }, [cache, endpoint, inflight]);

  const handleValueChange = (val: string) => {
    field.onChange(val);
    if (onChange) onChange(val);
  };

  return (
    <Select
      onValueChange={handleValueChange}
      value={field.value ?? ""}
      disabled={isDisabled || isLoading || isFetching}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {children}
        {!children && (
          <SelectGroup>
            {fetchedOptions.map((option) => (
              <SelectItem
                key={String(option[value])}
                value={String(option[value])}
              >
                {String(option[label])}
              </SelectItem>
            ))}
          </SelectGroup>
        )}
      </SelectContent>
    </Select>
  );
}

// Module-level caches to avoid refetch across mounts
let optionsCache: Map<string, any[]> | null = null;
let inflightRequests: Map<string, Promise<any[]>> | null = null;

const getOptionsCache = () => {
  if (!optionsCache) optionsCache = new Map();
  return optionsCache;
};

const getInflightRequests = () => {
  if (!inflightRequests) inflightRequests = new Map();
  return inflightRequests;
};
