import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GoogleButtonProps extends React.ComponentProps<typeof Button> {
  isLoading?: boolean;
  label?: string;
}

const GoogleIcon = () => (
  <svg
    aria-hidden
    focusable="false"
    viewBox="0 0 24 24"
    className="size-5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#EA4335"
      d="M12 10.2v3.6h5.02a4.59 4.59 0 0 1-1.99 3.01l3.21 2.49c1.88-1.74 2.96-4.31 2.96-7.33 0-.7-.06-1.37-.17-2.01H12Z"
    />
    <path
      fill="#34A853"
      d="M6.53 14.32l-.82.63-2.61 2.05C4.61 19.9 8.09 22 12 22c2.7 0 4.97-.89 6.63-2.42l-3.21-2.49c-.89.6-2.04.96-3.42.96-2.63 0-4.86-1.77-5.64-4.17Z"
    />
    <path
      fill="#4A90E2"
      d="M3.1 6.99A9.96 9.96 0 0 0 2 12c0 1.64.39 3.19 1.07 4.55 0 .02 3.46-2.69 3.46-2.69a5.86 5.86 0 0 1-.32-1.86c0-.65.12-1.28.32-1.86Z"
    />
    <path
      fill="#FBBC05"
      d="M12 5.18c1.47 0 2.79.51 3.83 1.52l2.86-2.86C16.96 2.61 14.7 1.8 12 1.8 8.09 1.8 4.61 3.9 2.93 7.12l3.46 2.69C7.14 6.95 9.37 5.18 12 5.18Z"
    />
    <path fill="none" d="M2 2h20v20H2Z" />
  </svg>
);

export const GoogleButton = React.forwardRef<
  HTMLButtonElement,
  GoogleButtonProps
>(
  (
    {
      isLoading = false,
      label = "Continue with Google",
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        variant="outline"
        className={cn(
          "w-full border shadow-2xs bg-transparent text-black cursor-pointer  hover:bg-gray-50",
          "dark:text-white dark:hover:bg-transparent dark:border-gray-700",
          className
        )}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2 text-sm">
            <span className="relative flex size-4">
              <span className="absolute inset-0 animate-spin rounded-full border-2 border-white/60 border-t-transparent dark:border-black/40" />
            </span>
            <span>{label}</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 text-sm">
            <GoogleIcon />
            <span>{children ?? label}</span>
          </span>
        )}
      </Button>
    );
  }
);

GoogleButton.displayName = "GoogleButton";
