import { MarketingFooter } from "@/components/MarketingFooter";
import { MarketingNavbar } from "@/components/navbars/MarketingNavbar";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="min-h-screen bg-zinc-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <MarketingNavbar />
      {children}
      <MarketingFooter />
    </div>
  );
}
