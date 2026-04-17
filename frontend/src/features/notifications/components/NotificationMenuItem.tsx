import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Notification } from "../types/notifications.types";
import { memo, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Bell, CircleAlert, Megaphone, Settings } from "lucide-react";

interface NotificationMenuItemProps {
  notification: Notification;
  className?: string;
  markAsRead: (id: string) => Promise<{ message: string }>
}

const NOTIFICATIONS_TYPES_ICONS = {
  SETTINGS: {
    icon: <Settings className="size-6 text-yellow-500 dark:text-yellow-300" />,
    className: "bg-yellow-50 dark:bg-yellow-700",
  },
  ERROR: {
    icon: <CircleAlert className="size-6 text-red-500 dark:text-red-300" />,
    className: "bg-red-50 dark:bg-red-700",
  },
  ANNOUNCMENT: {
    icon: <Megaphone className="size-6 text-green-500 dark:text-green-300" />,
    className: "bg-green-50 dark:bg-green-700",
  },
  NOTIFICATION: {
    icon: <Bell className="size-6 text-purple-500 dark:text-purple-300" />,
    className: "bg-purple-50 dark:bg-purple-700",
  },
};

export function NotificationMenuItem({
  notification,
  className,
  markAsRead
}: NotificationMenuItemProps) {
  const creationDate = useMemo(() => {
    if (notification.createdAtDiff) return notification.createdAtDiff;

    return new Date(notification.createdAt).toString();
  }, [notification.createdAt, notification.createdAtDiff]);

  const handleMarkAsRead = async () => {
    if (notification.readAt) return;

    await markAsRead(notification._id);
  }

  return (
    <DropdownMenuItem
      className={cn(
        "flex items-start gap-3 py-3 my-2",
        !notification.readAt ? "bg-gray-100 dark:bg-black/20" : "bg-transparent",
        className,
      )}
      onClick={handleMarkAsRead}
    >
      <NotificationIcon type={notification.type} />

      <div className="flex flex-col items-start gap-1">
        <div className="text-sm font-medium leading-tight">
          {notification.data.title}
        </div>
        {notification.data.message && (
          <div className="text-xs text-muted-foreground leading-snug">
            {notification.data.message}
          </div>
        )}
        <div className="text-xs text-muted-foreground leading-snug">
          {creationDate}
        </div>
      </div>
    </DropdownMenuItem>
  );
}

const NotificationIcon = memo(({ type }: { type: Notification["type"] }) => (
  <div
    className={cn(
      "p-3 rounded-md",
      NOTIFICATIONS_TYPES_ICONS[type]["className"],
    )}
  >
    {NOTIFICATIONS_TYPES_ICONS[type]["icon"]}
  </div>
));
