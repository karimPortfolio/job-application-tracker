import { Button } from "./ui/button";

interface PageHeaderProps {
    title: string;
    description?: string;
    actionLabel?: string;
    action?: () => void;
    children?: React.ReactNode;
    actions?: React.ReactNode;
}

export function PageHeader({ title, description, actionLabel, action, children, actions }: PageHeaderProps) {
    if (children) {
        return children;
    }

    return (
        <div className="mb-4 flex items-center justify-between">
            <div>
                <h1 className="text-xl font-bold">{title}</h1>
                {description && <p className="text-muted-foreground text-sm">{description}</p>}
            </div>
            {actionLabel && action && (
                <Button
                    onClick={action}
                    className="btn btn-primary"
                >
                    {actionLabel}
                </Button>
            )}
            {actions && <div>{actions}</div>}
        </div>
    )
}
