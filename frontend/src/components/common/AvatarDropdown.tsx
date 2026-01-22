import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from "@/features/auth/types";
import {
  ChevronDown,
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { Spinner } from "../ui/spinner";
import { AvatarDropdownItem } from "@/app/(protected)/onboarding/OnboardingClient";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

interface AvatarDropdownProps {
  user: User | null;
  logout: () => void;
  items?: AvatarDropdownItem[];
  loading?: boolean;
  showUserInfo?: boolean;
}

function getInitials(name?: string | null): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  const combo = `${first}${last}`.trim();
  return combo ? combo.toUpperCase() : "?";
}

export function AvatarDropdown({
  user,
  logout,
  loading,
  items,
  showUserInfo = false,
}: AvatarDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center justify-center py-6 px-4"
          aria-label={user?.name ? `${user.name} menu` : "User menu"}
        >
          <Avatar>
            <AvatarImage
              src={user?.avatarUrl ?? undefined}
              alt={user?.name ?? "User"}
            />
            <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
          </Avatar>
          {showUserInfo && (
            <>
              <div>
                <div className="text-start text-xs">{user?.name}</div>
                <div className="text-start text-xs dark:text-gray-400 text-gray-600">
                  {user?.email}
                </div>
              </div>
              <ChevronDown className="ml-2 size-4" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        {items &&
          items.length > 0 &&
          items.map((item) => (
            <DropdownMenuItem
              key={item.label}
              disabled={item.disabled}
              onClick={item.onClick}
              className="cursor-pointer"
            >
              {item.icon}
              {item.label}
            </DropdownMenuItem>
          ))}

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logout}
          variant="destructive"
          className="cursor-pointer"
        >
          {!loading && (
            <>
              <LogOutIcon />
              Log out
            </>
          )}
          {loading && (
            <>
              <Spinner className="size-3" />
              Logging out...
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
