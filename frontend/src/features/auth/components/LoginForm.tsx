"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { createLoginSchema } from "../schemas/login.schema";
import { useDebounce } from "@/hooks/useDebounce";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { LoadingButton } from "@/components/ui/loading-button";
import { AlertCircleIcon } from "lucide-react";
import Link from "next/link";

type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;

export default function LoginForm() {
  const router = useRouter();
  const { login, apiError, clearApiError } = useAuth();
  const searchParams = useSearchParams();
  const schema = useMemo(() => createLoginSchema(), []);

  const form = useForm<LoginFormValues>({
    // resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      remember_me: false,
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    clearApiError();

    try {
      await login(values);
      const next = searchParams.get("next");

      const isSafe =
        next &&
        next.startsWith("/") &&
        !next.startsWith("//") &&
        !next.includes("http");

      router.replace(isSafe ? next : "/dashboard");
    } catch {
      // errors handled via useAuth/useApiError
    }
  };

  useEffect(() => {
    if (apiError?.validationErrors) {
      apiError.validationErrors.forEach((error) => {
        form.setError(error.field as keyof LoginFormValues, {
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

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2">
          <FormField
            control={form.control}
            name="remember_me"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-nowrap items-center gap-2">
                  <FormControl>
                    <Checkbox
                      ref={field.ref}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm">Remember me</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end text-end text-sm">
            <Link
              href="/auth/forgot-password"
              className="font-medium text-black hover:underline dark:text-white w-full"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        <LoadingButton
          type="submit"
          className="w-full"
          isLoading={form.formState.isSubmitting}
          loadingText="Signing in..."
        >
          Sign In
        </LoadingButton>
      </form>
    </Form>
  );
}
