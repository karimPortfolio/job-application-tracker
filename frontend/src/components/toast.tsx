'use client'

import { useEffect, useState } from 'react'

type ToastLevel = 'success' | 'error'

type ToastPayload = {
  id: number
  level: ToastLevel
  message: string
}

const createEmitter = () => {
  if (typeof window !== 'undefined') return window
  return new EventTarget()
}

const emitter = createEmitter()

let uid = 0

function emit(level: ToastLevel, message: string) {
  const detail: ToastPayload = { id: ++uid, level, message }
  const event = new CustomEvent<ToastPayload>('app:toast', { detail })
  emitter.dispatchEvent(event)
}

export const toast = {
  success: (message: string) => emit('success', message),
  error: (message: string) => emit('error', message),
}

export function ToastViewport() {
  const [items, setItems] = useState<ToastPayload[]>([])

  useEffect(() => {
    const handler = (event: Event) => {
      const custom = event as CustomEvent<ToastPayload>
      setItems((prev) => [...prev, custom.detail])
      setTimeout(() => {
        setItems((prev) => prev.filter((t) => t.id !== custom.detail.id))
      }, 3600)
    }

    emitter.addEventListener('app:toast', handler as EventListener)
    return () => emitter.removeEventListener('app:toast', handler as EventListener)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] flex items-start justify-end px-4 py-6 sm:p-6">
      <div className="flex w-full max-w-sm flex-col gap-3">
        {items.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto overflow-hidden rounded-lg border shadow-lg backdrop-blur bg-white/90 dark:bg-zinc-900/90 dark:border-zinc-800 ${
              toast.level === 'success'
                ? 'border-emerald-200 text-emerald-900 dark:text-emerald-100'
                : 'border-red-200 text-red-900 dark:text-red-100'
            }`}
          >
            <div className="p-4">
              <p className="text-sm font-semibold">
                {toast.level === 'success' ? 'Success' : 'Error'}
              </p>
              <p className="mt-1 text-sm opacity-90">{toast.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
