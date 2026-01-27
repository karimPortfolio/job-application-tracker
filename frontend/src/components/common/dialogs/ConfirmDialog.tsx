'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useConfirmStore } from '@/stores/confirm.store'

export function ConfirmDialog() {
  const {
    open,
    title,
    description,
    confirmText,
    cancelText,
    destructive,
    resolve,
    close,
  } = useConfirmStore()
  return (
    <AlertDialog open={open} onOpenChange={(isOpen) => { if (!isOpen) close(false) }}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>
              {description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => close(false)}>
            {cancelText}
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              variant={destructive ? 'destructive' : 'default'}
              className={destructive ? cn('bg-destructive/90 hover:bg-destructive/100') : ''}
              onClick={() => close(true)}
              >
              {confirmText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
