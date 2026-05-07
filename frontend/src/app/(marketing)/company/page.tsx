import { CtaSection } from "@/features/company/components/CtaSection";
import { CultureSection } from "@/features/company/components/CultureSection";
import { FoundersSection } from "@/features/company/components/FoundersSection";
import { GenesisSection } from "@/features/company/components/GenesisSection";
import { HeroSection } from "@/features/company/components/HeroSection";
import { ImpactAndPrinciplesSection } from "@/features/company/components/ImpactAndPrinciplesSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company Hirely | Manage Your Job Search",
  description:
    "Learn About Hirely, the simple and effective tool to organize, track, and manage all your job applications in one place.",
  keywords: [
    "job tracker",
    "job application",
    "job search",
    "career management",
  ],
  openGraph: {
    title: "Company Hirely | Manage Your Job Search",
    description: "Organize and track your job applications efficiently",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/company`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Company Job Application Tracker",
    description: "Manage your job search with our simple tracking tool",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CompanyPage() {
  return (
    <main className="min-h-screen font-sans space-y-24">
      <HeroSection />
      <GenesisSection />
      <ImpactAndPrinciplesSection />
      <CultureSection />
      <FoundersSection />
      <CtaSection />
    </main>
  );
}
