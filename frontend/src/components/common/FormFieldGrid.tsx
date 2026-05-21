import { cn } from "@/lib/utils";

interface FormFieldGridProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: any;
}

export function FormFieldGrid({
  title,
  description,
  children,
  className,
}: FormFieldGridProps) {
  return (
    <div
      className={cn(
        "w-full grid grid-cols-2 items-center justify-between gap-4 pb-5",
        className && className,
      )}
    >
      <div className="flex flex-col gap-1">
        <div className="font-medium">{title}</div>
        {description && (
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            {description}
          </div>
        )}
      </div>
      <div className="flex justify-end">{children}</div>
    </div>
  );
}
