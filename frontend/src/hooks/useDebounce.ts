import { useEffect, useRef, useState } from 'react'

// Simple reusable debounce hook for any value.
// Returns the debounced value plus a clearValue helper to reset immediately.
export function useDebounce<T>(value: T, delay = 300): { debouncedValue: T; clearValue: () => void } {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const clearValue = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setDebouncedValue(value)
  }

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value)
      timerRef.current = null
    }, delay)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [value, delay])

  return { debouncedValue, clearValue }
}
