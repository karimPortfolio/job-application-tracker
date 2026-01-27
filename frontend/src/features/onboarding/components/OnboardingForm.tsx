"use client";

import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { IndustryOptions, OnboardingPayload } from "../types/onboarding.types";
import { onboardingSchema } from "../schemas/onboarding.schema";
import { useOnboarding } from "../hooks/useOnboarding";

const industryOptions: IndustryOptions = [
  { value: "software", label: "Software & AI" },
  { value: "design", label: "Design & Creative" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "consulting", label: "Consulting" },
  { value: "finance", label: "Financial Services" },
];

export function OnboardingForm({ onSuccess }: { onSuccess: () => void }) {
  const { submit, isSubmitting, apiError, clearApiError } = useOnboarding();

  const resolver = useMemo(() => zodResolver(onboardingSchema), []);

  const form = useForm<OnboardingPayload>({
    resolver,
    defaultValues: {
      name: "",
      industry: "",
      websiteUrl: undefined,
    },
  });


  const handleSubmit: SubmitHandler<OnboardingPayload> = async (values) => {
    clearApiError();
    await submit(values);
    onSuccess();
  };

  useEffect(() => {
    if (apiError?.validationErrors) {
      apiError.validationErrors.forEach((error) => {
        form.setError(error.field as keyof OnboardingPayload, {
          type: "server",
          message: error.errors[0],
        });
      });
    } else {
      form.clearErrors();
    }
  }, [apiError?.validationErrors, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid gap-4 items-start md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Acme Corp" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full justify-between">
                      <SelectValue placeholder="Select an industry" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {industryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="websiteUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website URL</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. https://www.example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center">
          <div className="text-sm text-slate-600 dark:text-white/70">
            Fields marked with * are required.
          </div>
          <LoadingButton
            type="submit"
            className="w-full sm:w-auto bg-primary"
            isLoading={isSubmitting}
            loadingText="Saving..."
          >
            Continue
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
