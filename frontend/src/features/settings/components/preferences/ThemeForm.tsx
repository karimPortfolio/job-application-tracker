"use client";
import { LoadingButton } from "@/components/ui/loading-button";
import { CheckCircle2, Monitor, Moon, Save, Sun } from "lucide-react";
import { useState } from "react";
import { PreferencePayload } from "../../types/settings.types";
import { cn } from "@/lib/utils";
import { usePreferencesActions } from "../../hooks/usePreferencesActions";
import { useAuthStore } from "@/stores/auth.store";

interface ThemeCardProps {
  id: PreferencePayload["theme"];
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}

export function ThemeForm() {
   const { user } = useAuthStore();
  const [activeTheme, setActiveTheme] =
    useState<PreferencePayload["theme"]>(user?.preferences?.theme ?? "system");
  const { updatePreferences, clearApiError, loading } = usePreferencesActions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearApiError();
    try {
      await updatePreferences({ theme: activeTheme });
    } catch (err) {}
  };

  return (
    <form
      id="update-preferences-form"
      onSubmit={handleSubmit}
      className="space-y-6 mt-7 mb-2"
    >
      <div className="w-full">
        <div className="font-medium text-gray-900 dark:text-white tracking-tight">
          Theme
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Customize how Hirely looks on your device. Choose a light theme, dark
          theme, or sync with your system.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <ThemeCard
          id="light"
          title="Light Mode"
          description="Clean and crisp light aesthetic."
          selected={activeTheme === "light"}
          onClick={() => setActiveTheme("light")}
          icon={<Sun className="w-5 h-5 text-amber-500" />}
        />

        <ThemeCard
          id="dark"
          title="Dark Mode"
          description="Deep navy space-palette layout."
          selected={activeTheme === "dark"}
          onClick={() => setActiveTheme("dark")}
          icon={<Moon className="w-5 h-5 text-indigo-400" />}
        />

        <ThemeCard
          id="system"
          title="System Preference"
          description="Sync seamlessly with your OS."
          selected={activeTheme === "system"}
          onClick={() => setActiveTheme("system")}
          icon={<Monitor className="w-5 h-5 text-emerald-500" />}
        />
      </div>

      <div className="w-full flex justify-end">
        <LoadingButton type="submit" isLoading={loading}>
          {loading && "Saving"}
          {!loading && (
            <span className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save
            </span>
          )}
        </LoadingButton>
      </div>
    </form>
  );
}

function ThemeCard({
  id,
  title,
  description,
  selected,
  onClick,
  icon,
}: ThemeCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative cursor-pointer rounded-2xl border p-5 flex flex-col justify-between h-40 transition-all duration-300 select-none",
        selected
          ? "border-blue-500 bg-white dark:bg-[#1D213A] shadow-md shadow-blue-500/5"
          : "border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#131527]/50 hover:border-gray-300 dark:hover:border-gray-700 hover:-trangray-y-0.5",
      )}
    >
      <div className="flex items-center justify-between w-full">
        <div
          className={cn(
            "p-2 rounded-xl transition-colors duration-300",
            selected
              ? "bg-blue-50 dark:bg-blue-950/40"
              : "bg-gray-100 dark:bg-[#1D213A]",
          )}
        >
          {icon}
        </div>

        <div className="relative w-5 h-5">
          <CheckCircle2
            className={cn(
              "w-5 h-5 absolute inset-0 text-blue-500 transition-all duration-300 transform",
              selected ? "opacity-100 scale-100" : "opacity-0 scale-75",
            )}
          />
          <div
            className={cn(
              "w-5 h-5 absolute inset-0 rounded-full border transition-all duration-300",
              selected
                ? "border-transparent scale-0"
                : "border-gray-300 dark:border-gray-700 group-hover:border-gray-400 dark:group-hover:border-gray-600",
            )}
          />
        </div>
      </div>

      <div className="mt-4">
        <span className="block text-sm font-semibold text-gray-900 dark:text-white">
          {title}
        </span>
        <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
          {description}
        </span>
      </div>

      <div className="absolute bottom-0 right-4 w-20 h-10 border border-b-0 border-gray-200 dark:border-gray-800/80 rounded-t-lg bg-white dark:bg-[#131527] p-1.5 space-y-1 overflow-hidden opacity-40 group-hover:opacity-60 transition-opacity">
        <div
          className={`h-1.5 w-8 rounded-full ${id === "light" ? "bg-gray-300" : "bg-gray-700"}`}
        />
        <div className="flex space-x-1">
          <div
            className={`h-3 w-6 rounded-sm ${id === "light" ? "bg-gray-200" : "bg-gray-800"}`}
          />
          <div
            className={`h-3 w-10 rounded-sm ${id === "light" ? "bg-gray-100" : "bg-[#1D213A]"}`}
          />
        </div>
      </div>
    </div>
  );
}
