import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bell, CheckCheck } from "lucide-react";
import { useNotificationsList } from "../hooks/useNotificationsList";
import Link from "next/link";
import { NotificationMenuItem } from "./NotificationMenuItem";
import React, { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNotificationsActions } from "../hooks/useNotificationsActions";
import { markAllAsRead } from "../services/notifications.service";

export function NotificationsDropdown() {
  const { notifications, meta, loading, fetch, refetch, query } =
    useNotificationsList();
  const { markNotificationAsRead, markAllNotificationsAsRead } =
    useNotificationsActions(refetch);

  const [fetched, setFetched] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen && !fetched) {
      fetch();
      setFetched(true);
    }
  };

  const handleNext = () => {
    if (!meta?.hasNextPage || loading) return;

    const nextPage = meta?.nextPage ?? (meta?.page ?? 1) + 1;

    fetch(nextPage);
  };

  return (
    <DropdownMenu open={open} onOpenChange={handleOpenChange}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full w-9 h-9">
              <Bell className="size-4" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Notifications</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end" className="w-96 h-96 p-2">
        <DropdownMenuHeader className="flex justify-between items-center">
          <DropdownMenuLabel className="font-medium text-lg">
            Notifications
            <Badge className="ms-2">{meta?.totalDocs ?? 0}</Badge>
          </DropdownMenuLabel>
          <Button onClick={markAllAsRead} variant="ghost">
            <CheckCheck />
            Mark all as read
          </Button>
        </DropdownMenuHeader>
        <Separator className="my-2" color="primary" />
        {loading &&
          Array.from({ length: 3 }).map((_, i) => (
            <DropdownMenuItemPlaceholder key={i} />
          ))}

        {notifications.length === 0 && !loading && (
          <div className="px-2 py-6 text-sm text-muted-foreground text-center">
            You're all caught up.
          </div>
        )}

        <InfiniteScroll
          dataLength={notifications.length}
          next={handleNext}
          hasMore={meta?.hasNextPage ?? false}
          loader={<DropdownMenuItemPlaceholder />}
        >
          {notifications.map((item) => {
            if (item.data.linkUrl) {
              return (
                <Link key={item.id} href={item.data.linkUrl}>
                  <NotificationMenuItem
                    notification={item}
                    markAsRead={markNotificationAsRead}
                    className="cursor-pointer"
                  />
                </Link>
              );
            }

            return (
              <NotificationMenuItem
                key={item._id}
                notification={item}
                markAsRead={markNotificationAsRead}
              />
            );
          })}
        </InfiniteScroll>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const DropdownMenuHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={className}>{children}</div>;

const DropdownMenuItemPlaceholder = () => (
  <DropdownMenuItem className="flex items-start gap-3 py-3 w-full !bg-transparent">
    <Skeleton className="w-16 h-12 rounded-md" />
    <div className="flex flex-col gap-2 w-full">
      <Skeleton className="w-1/2 h-4 rounded-md" />
      <Skeleton className="w-full h-3" />
      <Skeleton className="w-1/3 h-3" />
    </div>
  </DropdownMenuItem>
);
