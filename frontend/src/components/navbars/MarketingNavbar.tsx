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
import { ThemeSwitcher } from "../ThemeSwitcher";
import {
  Bookmark,
  CreditCardIcon,
  LayoutDashboardIcon,
  Menu,
  SettingsIcon,
  UserIcon,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { redirect } from "next/navigation";
import { UserRole } from "@/features/auth/types";

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
    { label: "Company", href: "/company" },
    { label: "Services", href: "/services" },
    { label: "Jobs", href: "/jobs" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];

  const recruiterMenuItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboardIcon />,
      onClick: () => redirect("/dashboard"),
      href: "/dashboard",
      disabled: false,
    },
    {
      label: "Profile",
      icon: <UserIcon />,
      onClick: () => {},
      href: "/dashboard/profile",
      disabled: false,
    },
    {
      label: "Billing",
      icon: <CreditCardIcon />,
      onClick: () => {},
      href: "/dashboard/settings/company/billing",
      disabled: false,
    },
    {
      label: "Settings",
      icon: <SettingsIcon />,
      onClick: () => {},
      href: "/dashboard/settings/company",
      disabled: false,
    },
  ];

  const userMenuItems = [
    {
      label: "Saved Jobs",
      icon: <Bookmark />,
      onClick: () => {},
      href: "/saved-jobs",
      disabled: false,
    },
  ];

  const menuItems = useMemo(() => {
    return user?.role === UserRole.RECRUITER
      ? recruiterMenuItems
      : userMenuItems;
  }, [user?.role, recruiterMenuItems, userMenuItems]);

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        isScrolled || mobileOpen
          ? "border-b border-border/60 bg-zinc-50/85 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-10">
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
                      className="bg-transparent text-md font-medium text-slate-700 hover:bg-slate-200/70 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
                      asChild
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Desktop auth */}
        <div className="hidden lg:flex items-center gap-2">
          <ThemeSwitcher />
          {user && (
            <AvatarDropdown
              user={user}
              logout={logout}
              loading={loading}
              items={menuItems}
              showUserInfo={false}
            />
          )}
          {!user && (
            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="text-sm font-medium hover:underline"
              >
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-slate-700 text-md font-medium hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
                >
                  Sign In
                </Button>
              </Link>
              <Link
                href="/auth/register"
                className="text-md font-medium hover:underline"
              >
                <Button size="lg">Get Started</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="inline-flex items-center justify-center rounded-md border border-slate-300 p-2 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
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
        <div className="border-t border-slate-200 bg-zinc-50/95 px-5 pb-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 lg:hidden">
          <div className="flex flex-col gap-3 pt-3">
            <div className="flex justify-end">
              <ThemeSwitcher />
            </div>
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
                  items={menuItems}
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
      className="w-full rounded-md px-2 py-2 text-md font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
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
