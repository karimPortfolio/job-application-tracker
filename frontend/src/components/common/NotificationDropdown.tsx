import { Bell } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { SidebarTrigger } from "../ui/sidebar";

export function NotificationsDropdown() {
  const notifications = [
    {
      id: 1,
      title: "New applicant",
      body: "Jane Doe applied to Frontend Engineer",
    },
    {
      id: 2,
      title: "Interview scheduled",
      body: "Interview set for Backend Engineer",
    },
    { id: 3, title: "Reminder", body: "Follow up with Acme Co. recruiter" },
  ];

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="ml-4 rounded-full w-9 h-9">
              <Bell className="size-4" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Notifications</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end" className="w-72 p-2">
        {notifications.length === 0 && (
          <div className="px-2 py-6 text-sm text-muted-foreground text-center">
            You're all caught up.
          </div>
        )}

        {notifications.map((item) => (
          <DropdownMenuItem
            key={item.id}
            className="flex flex-col items-start gap-1 py-3"
          >
            <div className="text-sm font-medium leading-tight">
              {item.title}
            </div>
            <div className="text-xs text-muted-foreground leading-snug">
              {item.body}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
