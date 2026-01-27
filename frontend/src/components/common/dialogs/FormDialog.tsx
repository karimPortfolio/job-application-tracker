import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Save } from "lucide-react";
import type { SubmitHandler } from "react-hook-form";

interface FormDialogProps{
  title: string;
  description?: string;
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<T>;
  submitLabel?: string;
  children: React.ReactNode;
  loading?: boolean;
  formId: string;
}

export function FormDialog({
  title,
  description,
  isOpen,
  onClose,
  onSubmit,
  submitLabel,
  loading,
  children,
  formId
}: FormDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
        <DialogContent className="sm:max-w-[425px]">
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
