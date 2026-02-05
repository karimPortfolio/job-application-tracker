import { memo } from "react";
import type { Control } from "react-hook-form";
import type { CreateApplicationPayload, UpdateApplicationPayload } from "../../types/applications.types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type ApplicationFormValues = CreateApplicationPayload | UpdateApplicationPayload;

export const PortfolioUrlInput = memo(function PortfolioUrlInput<T extends ApplicationFormValues = ApplicationFormValues>({
  control,
}: {
  control: Control<T>;
}) {
  return (
    <FormField
      control={control}
      name={"portfolioUrl" as any}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Portfolio URL</FormLabel>
          <FormControl>
            <Input placeholder="portfolio, GitHub, etc" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
});
