"use client";
import { LoadingButton } from "@/components/ui/loading-button";
import { Save } from "lucide-react";
import { ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form";
import { PreferencePayload } from "../../types/settings.types";
import { usePreferencesActions } from "../../hooks/usePreferencesActions";
import { useAuthStore } from "@/stores/auth.store";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { FormFieldGrid } from "@/components/common/FormFieldGrid";

interface FormField {
  title: string;
  description?: string;
  name: any;
  render: (field: ControllerRenderProps<PreferencePayload, any>) => any;
}

export function NotificationsForm() {
  const { user } = useAuthStore();
  const { updatePreferences, clearApiError, loading } = usePreferencesActions();

  const formFields: FormField[] = [
    {
      title: "Allow email notifications",
      description:
        "These are notifications that are sent primarly to your email",
      name: "notifications.email",
      render: (field: ControllerRenderProps<PreferencePayload, "notifications.email">) => (
        <FormItem>
          <FormControl>
            <Switch
              checked={field.value ?? true}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      ),
    },
    {
      title: "Allow in-app notifications",
      description: "These are notifications that are delivered with the app",
      name: "notifications.push",
      render: (field: ControllerRenderProps<PreferencePayload, "notifications.push">) => (
        <FormItem>
          <FormControl>
            <Switch
              checked={field.value ?? true}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      ),
    },
    {
      title: "Allow marketing notifications",
      description:
        "Receive promotional messages, product updates, and special offers via email or in-app.",
      name: "notifications.marketing",
      render: (
        field: ControllerRenderProps<PreferencePayload, "notifications.marketing">,
      ) => (
        <FormItem>
          <FormControl>
            <Switch
              checked={field.value ?? true}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      ),
    },
  ];

  const form = useForm<PreferencePayload>({
    defaultValues: {
      notifications: {
        email: user?.preferences?.notifications?.email ?? true,
        push: user?.preferences?.notifications?.push ?? true,
        marketing: user?.preferences?.notifications?.marketing ?? true,
      },
    },
  });

  const handleSubmit: SubmitHandler<PreferencePayload> = async (values) => {
    clearApiError();
    try {
      await updatePreferences(values);
    } catch (err) {}
  };

  return (
    <Form {...form}>
      <form
        id="update-notifications-form"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 mt-7 mb-2"
      >
        <div className="flex flex-col space-y-4">
          {formFields.map((formField: FormField, index: number) => (
            <FormFieldGrid
              title={formField.title}
              description={formField.description}
              className={cn(index !== formFields.length - 1 && "border-b-1")}
              key={formField.name}
            >
              <FormField
                control={form.control}
                name={formField.name}
                render={({ field }) => formField.render(field)}
              />
            </FormFieldGrid>
          ))}
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
