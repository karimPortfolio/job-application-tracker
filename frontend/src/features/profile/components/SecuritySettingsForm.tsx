import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/auth.store";
import { SubmitHandler, useForm } from "react-hook-form";
import { PasswordUpdatePayload } from "../types/profile.types";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useProfileActions } from "../hooks/useProfileActions";
import { Separator } from "@/components/ui/separator";
import { FormFieldGrid } from "./shared-components/FormFieldGrid";
import { Spinner } from "@/components/ui/spinner";
import { updatePasswordSchema } from "../schemas/update-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const formResolver = zodResolver(updatePasswordSchema);

export function SecuritySettingsForm() {
  const { updatePassword, loading, apiError, clearApiError } =
    useProfileActions();

  const form = useForm<PasswordUpdatePayload>({
    resolver: formResolver,
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
  });

  const handleSubmit: SubmitHandler<PasswordUpdatePayload> = async (values) => {
    clearApiError();
    try {
      await updatePassword(values);
      form.reset();
    } catch (err) {}
  };

    useEffect(() => {
      if (apiError?.validationErrors) {
        apiError.validationErrors?.forEach((error) => {
          form.setError(error.field as keyof PasswordUpdatePayload, {
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
        id="updatePasswordForm"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 mt-3 mb-2"
      >
        <FormFieldGrid
          label="Current Password"
          description="Enter your current account password in use"
        >
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormFieldGrid>

        <Separator />

        <FormFieldGrid label="New Password">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormFieldGrid>

        <Separator />

        <FormFieldGrid
          label="New Password Confirm"
          description="Confirm your new password"
        >
          <FormField
            control={form.control}
            name="newPasswordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormFieldGrid>

        <Separator />

        <div className="w-full flex justify-end">
          <Button form="updatePasswordForm" disabled={!!loading}>
            {!loading && (
              <>
                <Save className="h-3 w-3" />
                Save
              </>
            )}

            {loading && (
              <>
                <Spinner className="w-8" />
                Submitting
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
