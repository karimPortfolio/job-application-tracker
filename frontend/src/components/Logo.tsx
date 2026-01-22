import { useTheme } from "next-themes";
import Link from "next/link";

export function Logo({
  width,
  height,
}: {
  width?: number | string;
  height?: number | string;
}) {
  const { theme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Link href="/">
          <img src="/images/logo-dark.png" alt="Logo" className="hidden dark:block" width={width} height={height}  />
          <img src="/images/logo.png" alt="Logo" className="block dark:hidden" width={width} height={height}  />
      </Link>
    </div>
  );
}
