import * as React from 'react'
import { Button } from './button'
import { Spinner } from './spinner'

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  isLoading?: boolean
  loadingText?: React.ReactNode
}

export const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ isLoading = false, loadingText, children, disabled, ...props }, ref) => {
    return (
      <Button ref={ref} disabled={isLoading || disabled} {...props}>
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <Spinner className="size-4" />
            <span>{loadingText ?? children}</span>
          </span>
        ) : (
          children
        )}
      </Button>
    )
  }
)

LoadingButton.displayName = 'LoadingButton'
