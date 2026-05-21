"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { CompanyPayload } from "../../types/settings.types";
import { useAuthStore } from "@/stores/auth.store";
import { useCompanyActions } from "../../hooks/useCompanyActions";
import { useEffect } from "react";
import { FormFieldGrid } from "@/components/common/FormFieldGrid";
import { Input } from "@/components/ui/input";
import { industryOptions } from "@/features/onboarding/components/OnboardingForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingButton } from "@/components/ui/loading-button";
import { Save } from "lucide-react";

export function UpdateCompanyForm() {
  const { user } = useAuthStore();
  const { updateCompany, clearApiError, apiError, loading } =
    useCompanyActions();

  const form = useForm<CompanyPayload>({
    defaultValues: {
      name: user?.company?.name ?? "",
      industry: user?.company?.industry ?? "",
      websiteUrl: user?.company?.websiteUrl ?? "",
    },
  });

  const handleSubmit: SubmitHandler<CompanyPayload> = async (values) => {
    clearApiError();
    try {
      await updateCompany(values);
    } catch (err) {}
  };

  useEffect(() => {
    if (apiError?.validationErrors) {
      apiError.validationErrors.forEach((error) => {
        form.setError(error.field as keyof CompanyPayload, {
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
      <form
        id="update-notifications-form"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 mt-7 mb-2"
      >
        <div className="flex flex-col space-y-4">
          <FormFieldGrid
            title="Company Name"
            description="The official name of your company as it should appear in Hirely."
            className="border-b-1 grid-cols-1 md:grid-cols-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormFieldGrid>

          <FormFieldGrid
            title="Industry"
            description="The primary industry or sector your company operates in."
            className="border-b-1 grid-cols-1 md:grid-cols-2"
          >
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Select value={typeof field.value === "string" ? field.value : ""} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full justify-between">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {industryOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormFieldGrid>

          <FormFieldGrid
            title="Website URL"
            description="Your company’s public website or careers page."
            className="grid-cols-1 md:grid-cols-2"
          >
            <FormField
              control={form.control}
              name="websiteUrl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="e.g. https://www.example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormFieldGrid>
        </div>

        <div className="w-full flex justify-end">
          <LoadingButton
            type="submit"
            form="update-notifications-form"
            isLoading={loading}
          >
            {loading && "Saving"}
            {!loading && (
              <span className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save
              </span>
            )}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
