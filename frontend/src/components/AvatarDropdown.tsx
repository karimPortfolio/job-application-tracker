import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from "@/features/auth/types";
import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { Spinner } from "./ui/spinner";
import { AvatarDropdownItem } from "@/app/(protected)/onboarding/OnboardingClient";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface AvatarDropdownProps {
  user: User | null;
  logout: () => void;
  avatarDropdownItems?: AvatarDropdownItem[];
  loading?: boolean;
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
    avatarDropdownItems,
  }: AvatarDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted text-sm font-semibold uppercase text-foreground shadow-sm focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-ring"
          aria-label={user?.name ? `${user.name} menu` : "User menu"}
        >
          <Avatar>
            <AvatarImage src={user?.avatarUrl ?? undefined} alt={user?.name ?? "User"} />
            <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>

        {avatarDropdownItems &&
          avatarDropdownItems.length > 0 &&
          avatarDropdownItems.map((item) => (
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
        <DropdownMenuItem onClick={logout} variant="destructive" className="cursor-pointer">
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
