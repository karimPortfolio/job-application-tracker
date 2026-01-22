import { useTheme } from "next-themes";
import Link from "next/link";

export function Logo() {
  const { theme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Link href="/">
        {theme === "dark" && (
          <img src="/images/logo-dark.png" alt="Logo" className="h-10 w-28 sm:h-16 sm:w-40" />
        )}
        {theme !== "dark" && (
          <img src="/images/logo.png" alt="Logo" className="h-10 w-28 sm:h-16 sm:w-40" />
        )}
      </Link>
    </div>
  );
}
