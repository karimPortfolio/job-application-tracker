"use client";

import { Logo } from "../Logo";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { AvatarDropdown } from "../common/AvatarDropdown";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  CreditCardIcon,
  LayoutDashboardIcon,
  Menu,
  SettingsIcon,
  UserIcon,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export function MarketingNavbar() {
  const { user, logout, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const navigationItems = [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Jobs", href: "/jobs" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];

  const userMenuItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboardIcon />,
      onClick: () => redirect("/dashboard"),
      disabled: false,
    },
    {
      label: "Profile",
      icon: <UserIcon />,
      onClick: () => {},
      disabled: false,
    },
    {
      label: "Billing",
      icon: <CreditCardIcon />,
      onClick: () => {},
      disabled: false,
    },
    {
      label: "Settings",
      icon: <SettingsIcon />,
      onClick: () => {},
      disabled: false,
    },
  ];

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        isScrolled || mobileOpen
          ? "border-b border-white/10 bg-slate-950/70 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <Logo width={120} height={50} />
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:block">
          <NavigationMenu>
            <NavigationMenuList className="gap-7">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    className="font-medium bg-transparent hover:bg-gray-800/10"
                    asChild
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop auth */}
        <div className="hidden lg:flex items-center">
          {user && (
            <AvatarDropdown
              user={user}
              logout={logout}
              loading={loading}
              items={userMenuItems}
              showUserInfo={false}
            />
          )}
          {!user && (
            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="text-sm font-medium text-primary hover:underline"
              >
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link
                href="/auth/register"
                className="text-sm font-medium text-primary hover:underline"
              >
                <Button>Get Started</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden inline-flex items-center justify-center rounded-md border border-border p-2 text-foreground hover:bg-muted"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur px-5 pb-4 shadow-sm">
          <div className="flex flex-col gap-3 pt-3">
            {navigationItems.map((item) => (
              <ListItem
                key={item.href}
                title={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
              />
            ))}

            <div className="flex flex-col gap-2 pt-2">
              {user ? (
                <AvatarDropdown
                  user={user}
                  logout={logout}
                  loading={loading}
                  items={userMenuItems}
                  showUserInfo={true}
                />
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function ListItem({
  title,
  children,
  href,
  onClick,
}: {
  title: string;
  href: string;
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="w-full rounded-md px-2 py-2 text-sm hover:bg-muted"
    >
      <div className="flex flex-col gap-1 text-sm">
        <div className="leading-none font-medium">{title}</div>
        {children && (
          <div className="text-muted-foreground line-clamp-2">{children}</div>
        )}
      </div>
    </Link>
  );
}
