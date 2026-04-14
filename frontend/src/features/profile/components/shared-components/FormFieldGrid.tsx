import { FormLabel } from "@/components/ui/form";

interface FormFieldGridProps {
  label: string;
  description?: string;
  children: React.ReactElement;
}

export function FormFieldGrid({
  label,
  description,
  children,
}: FormFieldGridProps ) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 lg:items-center">
      <div className="col-span-1 mb-4 lg:mb-0">
        <FormLabel>{label}</FormLabel>
        {description && (
          <small className="text-gray-700 dark:text-gray-400">
            {description}
          </small>
        )}
      </div>
      <div className="col-span-1 lg:col-span-2">{children}</div>
    </div>
  );
}