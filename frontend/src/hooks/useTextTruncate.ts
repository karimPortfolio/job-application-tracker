'use client'

import { useMemo } from 'react'

/**
 * Truncate text to a maximum length and append an ellipsis when exceeded.
 * @param text The original string to truncate.
 * @param maxLength Maximum allowed length before truncating.
 */
export function useTextTruncate() {
  const truncate = (text: string, maxLength: number): string => {
    if (typeof text !== 'string') return ''
    if (maxLength <= 0) return ''
    if (text.length <= maxLength) return text
    return `${text.slice(0, Math.max(0, maxLength - 1))}…`
  };

  return {
    truncate,
  }
}