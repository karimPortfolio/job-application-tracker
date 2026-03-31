import { MarketingNavbar } from "@/components/navbars/MarketingNavbar";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
    <MarketingNavbar />
    {children}
    </>
  );
}
