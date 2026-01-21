'use client'

import { useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { createResetPasswordSchema } from '../schemas/reset-password.schema'
import { useAuth } from '../hooks/useAuth'
import { useDebounce } from '@/hooks/useDebounce'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { LoadingButton } from '@/components/ui/loading-button'
import { AlertCircleIcon, CheckCircle2 } from 'lucide-react'


type ResetPasswordFormValues = z.infer<ReturnType<typeof createResetPasswordSchema>>

export function ResetPasswordForm({ token, email }: { token?: string; email?: string }) {
  const { resetPassword, apiError, clearApiError } = useAuth()
  const schema = useMemo(() => createResetPasswordSchema(), [])
  const [success, setSuccess] = useState(false)

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: email || '',
      token: token || '',
      password: '',
      password_confirmation: '',
    },
  })

  const passwordValue = form.watch('password') ?? ''
  const { debouncedValue: debouncedPassword } = useDebounce(passwordValue, 250)

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

  const onSubmit: SubmitHandler<ResetPasswordFormValues> = async (values) => {
    clearApiError()
    setSuccess(false)

    try {
      await resetPassword(values)
      setSuccess(true)
    } catch {
      setSuccess(false)
    }
  }

  useEffect(() => {
    if (apiError?.validationErrors) {
       apiError.validationErrors.forEach((error) => {
        form.setError(error.field as keyof ResetPasswordFormValues, {
          type: "server",
          message: error.errors[0],
        });
      });
    } else {
      form.clearErrors()
    }
  }, [apiError?.validationErrors, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        {apiError?.message && (
          <Alert variant="destructive" >
            <AlertCircleIcon />
            <AlertTitle>{apiError.message}</AlertTitle>
          </Alert>
        )}

        {success && (
          <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Password updated</AlertTitle>
            <AlertDescription>Your password has been reset. You can now sign in.</AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  readOnly={!!email}
                  disabled={!!email}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reset token</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Paste the reset token from your email"
                  readOnly={!!token}
                  disabled={!!token}
                  {...field}
                />
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
              <FormLabel>New password</FormLabel>
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

        <LoadingButton
          type="submit"
          className="w-full"
          isLoading={form.formState.isSubmitting}
          loadingText="Updating password..."
        >
          Reset Password
        </LoadingButton>
      </form>
    </Form>
  )
}
