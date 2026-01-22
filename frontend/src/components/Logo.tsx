import { useTheme } from "next-themes";
import Link from "next/link";

export function Logo({
  width,
  height,
  disableDark=false
}: {
  width?: number | string;
  height?: number | string;
  disableDark?: boolean;
}) {
  const { theme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Link href="/">
          <img src="/images/logo-dark.png" alt="Logo" className={!disableDark ? "hidden dark:block" : "block"} width={width} height={height}  />
          {!disableDark && <img src="/images/logo.png" alt="Logo" className="block dark:hidden" width={width} height={height}  />}
      </Link>
    </div>
  );
}
