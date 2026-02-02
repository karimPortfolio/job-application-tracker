import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ViewDialogProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
}

export function ViewDialog({
  title,
  description,
  isOpen,
  onClose,
  children,
  className,
  loading,
}: ViewDialogProps) {

  if (loading) {
    return (
      <ViewDialogLoadingPlaceholder
        isOpen={isOpen}
        onClose={onClose}
        className={className}
        title={title}
        description={description}
        loading={loading}
        children={children}
      />
    );
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className={cn("sm:max-w-125", className)}>
        <DialogHeader>
          <DialogTitle className="text-start" >{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        {/* <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={onClose}>Close</Button>
            </DialogClose>
          </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

const ViewDialogLoadingPlaceholder = ({
  isOpen,
  onClose,
  className,
  title,
  description,
}: ViewDialogProps) => (
  <Dialog
    open={isOpen}
  >
    <DialogContent className={cn("sm:max-w-125", className)}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>
      <ViewDialogSkeleton />
    </DialogContent>
  </Dialog>
);

const ViewDialogSkeleton = () => (
  <div className="animate-pulse space-y-4 p-4">
    {[...Array(5)].map((_, index) => (
      <Skeleton key={index} className="h-4 w-full" />
    ))}
  </div>
);
