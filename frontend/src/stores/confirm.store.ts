import { create } from 'zustand'

type ConfirmOptions = {
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  destructive?: boolean
}

type ConfirmState = {
  open: boolean
  title: string
  description?: string
  confirmText: string
  cancelText: string
  destructive: boolean
  resolve: (value: boolean) => void
  openConfirm: (
    options: ConfirmOptions,
    resolve: (value: boolean) => void
  ) => void
  close: (value?: boolean) => void
}

export const useConfirmStore = create<ConfirmState>((set) => ({
  open: false,
  title: '',
  description: undefined,
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  destructive: false,
  resolve: () => {},

  openConfirm: (options, resolve) =>
    set({
      open: true,
      title: options.title,
      description: options.description,
      confirmText: options.confirmText ?? 'Confirm',
      cancelText: options.cancelText ?? 'Cancel',
      destructive: options.destructive,
      resolve,
    }),

  close: (value = false) =>
    set((state) => {
      state.resolve(value)
      return { open: false }
    }),
}))
