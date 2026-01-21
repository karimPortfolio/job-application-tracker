"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { useAuth } from "../hooks/useAuth";
import { createRegisterSchema } from "../schemas/register.schema";
import { useDebounce } from "@/hooks/useDebounce";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { LoadingButton } from '@/components/ui/loading-button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircleIcon } from 'lucide-react'

type RegisterFormValues = z.infer<ReturnType<typeof createRegisterSchema>>;

export default function RegisterForm() {
  const router = useRouter();
  const { register, apiError, clearApiError } = useAuth();

  const schema = useMemo(() => createRegisterSchema(), [])

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      accepted_terms: false,
    },
  })

  const passwordValue = form.watch('password') ?? ''
  const { debouncedValue: debouncedPassword } = useDebounce(passwordValue, 250)

  const onSubmit: SubmitHandler<RegisterFormValues> = async (values) => {
    clearApiError();
    try {
      await register(values);
      router.push("/dashboard");
    } catch {
      // handled centrally via apiError
    }
  };

  const strength = useMemo(() => {
    if (!debouncedPassword) {
      return { label: 'Weak', percent: 0, barClass: 'bg-gray-200', textClass: 'text-gray-500' }
    }

    const checks = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/]
    const score = checks.reduce((acc, regex) => acc + (regex.test(debouncedPassword) ? 1 : 0), 0) + (debouncedPassword.length >= 12 ? 1 : 0)

    if (score >= 4) return { label: 'Strong', percent: 100, barClass: 'bg-green-500', textClass: 'text-green-700' }
    if (score >= 2) return { label: 'Medium', percent: 60, barClass: 'bg-yellow-400', textClass: 'text-yellow-700' }
    return { label: 'Weak', percent: 30, barClass: 'bg-red-500', textClass: 'text-red-700' }
  }, [debouncedPassword])

  useEffect(() => {
    if (apiError?.validationErrors) {
      Object.entries(apiError.validationErrors).forEach(([field, messages]) => {
        const message = Array.isArray(messages) ? messages[0] : String(messages)
        form.setError(field as keyof RegisterFormValues, {
          type: 'server',
          message,
        })
      })
    } else {
      form.clearErrors()
    }
  }, [apiError?.validationErrors, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        {apiError?.message && (
          <Alert variant="destructive">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle>{apiError.message}</AlertTitle>
          </Alert>
        )}

        <div className="flex items-center gap-4 flex-col sm:flex-row">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="First name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
              <div className="space-y-1">
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className={`h-2 rounded-full transition-all duration-200 ${strength.barClass}`}
                    style={{ width: `${strength.percent}%` }}
                  />
                </div>
                <p className={`text-xs font-medium ${strength.textClass}`}>
                  Password strength: {strength.label}
                </p>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accepted_terms"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <div className="flex items-center space-x-2 mb-2">
                <FormControl>
                  <Checkbox
                    ref={field.ref}
                    checked={field.value}
                    onChange={(event) => field.onChange(event.target)}
                  />
                </FormControl>
                <FormLabel className="text-sm font-medium leading-none">
                  I accept the terms and conditions
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          type="submit"
          className="w-full"
          isLoading={form.formState.isSubmitting}
          loadingText="Signing up..."
        >
          Sign Up
        </LoadingButton>
      </form>
    </Form>
  );
}
