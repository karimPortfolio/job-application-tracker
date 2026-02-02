import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Save } from "lucide-react";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import type { ReactNode } from "react";

interface FormDialogProps<T extends FieldValues = FieldValues> {
  title: string;
  description?: string;
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<T>;
  submitLabel?: string;
  children: ReactNode;
  loading?: boolean;
  formId: string;
  className?: string;
  forceMount?: boolean;
}

export function FormDialog<T extends FieldValues = FieldValues>({
  title,
  description,
  isOpen,
  onClose,
  onSubmit,
  submitLabel,
  loading,
  children,
  formId,
  className,
  forceMount,
}: FormDialogProps<T>) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
        <DialogContent forceMount={forceMount || undefined} className={cn("sm:max-w-125", className)}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (<DialogDescription>{description}</DialogDescription>)}
          </DialogHeader>
            {children}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={onClose}>Cancel</Button>
            </DialogClose>
            <Button type="submit" form={formId} disabled={loading}>
                <Save className="mr-2 size-4" />
                {loading ? 'Saving...' : submitLabel || 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}
