"use client";

import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { createForgotPasswordSchema } from "../schemas/forgot-password.schema";
import { useAuth } from "../hooks/useAuth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { AlertCircleIcon, CheckCircle2 } from "lucide-react";
import { LoadingButton } from "@/components/ui/loading-button";

type ForgotPasswordFormValues = z.infer<
  ReturnType<typeof createForgotPasswordSchema>
>;

export function ForgotPasswordForm() {
  const { requestPasswordReset, apiError, clearApiError } = useAuth();
  const schema = useMemo(() => createForgotPasswordSchema(), []);
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = async (values) => {
    clearApiError();
    setEmailSent(false);

    try {
      await requestPasswordReset(values);
      setEmailSent(true);
    } catch {
      setEmailSent(false);
    }
  };

  useEffect(() => {
    if (apiError?.validationErrors) {
      apiError.validationErrors.forEach((error) => {
        form.setError(error.field as keyof ForgotPasswordFormValues, {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        {apiError?.message && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>{apiError.message}</AlertTitle>
          </Alert>
        )}

        {emailSent && (
          <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              Your password reset link has been sent.
            </AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input  type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          type="submit"
          className="w-full"
          isLoading={form.formState.isSubmitting}
          loadingText="Sending..."
        >
          Send Reset Link
        </LoadingButton>
      </form>
    </Form>
  );
}
