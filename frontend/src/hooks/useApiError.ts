"use client"

import { ApiErrorState } from '@/types/api-error.types'
import { useCallback, useState } from 'react'

export function useApiError() {
  const [error, setError] = useState<ApiErrorState | null>(null)

  const clearError = useCallback(() => setError(null), [])

  const handleError = useCallback((err: any) => {
    const status = err?.response?.status
    const data = err?.response?.data
    switch (status) {
      case 401:
        setError({
          title: 'Unauthenticated',
          status,
          message: 'You need to log in to access this resource.',
        })
        break

      case 403:
        setError({
          title: 'Forbidden',
          status,
          message: 'You do not have permission to access this resource.',
        })
        break

      case 404:
        setError({
          title: 'Not Found',
          status,
          message: 'The requested resource could not be found.',
        })
        break

      case 422:
        setError({
          title: 'Validation Error',
          status,
          message: 'There was a problem with your submission.',
          validationErrors: data?.errors ?? {},
        })
        break

      case 429:
        setError({
          title: 'Too Many Requests',
          status,
          message: 'You have made too many requests. Please try again later.',
        })
        break

      case 500:
        setError({
          title: 'Server Error',
          status,
          message: 'An internal server error occurred. Please try again later.',
        })
        break

      default:
        setError({
          title: 'Unexpected Error',
          status: status ?? null,
          message: 'An unexpected error occurred. Please try again.',
        })
    }
  }, [])

  return {
    error,
    handleError,
    clearError,
  }
}
