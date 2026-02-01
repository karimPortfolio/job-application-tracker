import { Button } from "./ui/button";

interface PageHeaderProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionIcon?: React.ReactNode;
  action?: () => void;
  children?: React.ReactNode;
  renderActions?: () => React.ReactNode;
}

export function PageHeader({
  title,
  description,
  actionLabel,
  actionIcon,
  action,
  children,
  renderActions
}: PageHeaderProps) {
  if (children) {
    return children;
  }

  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold">{title}</h1>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </div>
      {actionLabel && action && (
        <Button onClick={action} className="btn btn-primary">
          {actionIcon && actionIcon}
          {actionLabel}
        </Button>
      )}
      {renderActions && <div>{renderActions()}</div>}
    </div>
  );
}
