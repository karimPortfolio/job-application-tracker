import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const handleThemeToggle = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          aria-label="Toggle Dark Mode"
          className="rounded-full w-9 h-9 transition"
          onClick={handleThemeToggle}
        >
          {theme === "dark" ? (
            <Moon className="w-5 h-5 text-white" />
          ) : (
            <Sun className="w-5 h-5 text-gray-800" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>Toggle Dark Mode</p>
      </TooltipContent>
    </Tooltip>
  );
}
