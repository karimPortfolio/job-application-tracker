import { useConfirmStore } from '@/stores/confirm.store'

type ConfirmOptions = {
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  destructive?: boolean
}

export function useConfirm() {
  const openConfirm = useConfirmStore(
    (state) => state.openConfirm
  )

  return (options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      openConfirm(options, resolve)
    })
  }
}
