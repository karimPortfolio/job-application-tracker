import { CultureSection } from "@/features/about/components/CultureSection";
import { GenesisSection } from "@/features/about/components/GenesisSection";
import { HeroSection } from "@/features/about/components/HeroSection";
import { ImpactAndPrinciplesSection } from "@/features/about/components/ImpactAndPrinciplesSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Hirely | Manage Your Job Search",
  description:
    "Learn about Hirely, the simple and effective tool to organize, track, and manage all your job applications in one place.",
  keywords: [
    "job tracker",
    "job application",
    "job search",
    "career management",
  ],
  openGraph: {
    title: "About Hirely | Manage Your Job Search",
    description: "Organize and track your job applications efficiently",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/about`,
  },
  twitter: {
    card: "summary_large_image",
    title: "About Job Application Tracker",
    description: "Manage your job search with our simple tracking tool",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function JobsPage() {
  return (
    <main className="min-h-screen font-sans space-y-24">
      <HeroSection />
      <GenesisSection />
      <ImpactAndPrinciplesSection />
      <CultureSection />
    </main>
  );
}
