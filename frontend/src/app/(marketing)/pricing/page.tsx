import { HeroSection } from "@/features/pricing/components/HeroSection";
import { PricingPlansSection } from "@/features/pricing/components/PricingPlansSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Hirely — AI Recruitment Plans (Free, Pro, Enterprise)",
  description:
    "Find the right Hirely plan to supercharge your hiring. Compare Free, Pro, and Enterprise tiers — featuring AI resume parsing, smart candidate screening, automated job description generation, and a data-driven dashboard for jobs, applications, and departments.",
  keywords: [
    "pricing",
    "hirely pricing",
    "subscription plans",
    "AI recruitment",
    "resume parsing",
    "smart screening",
    "job description generator",
    "dashboard analytics",
    "enterprise hiring",
    "team plans",
  ],
  openGraph: {
    title: "Pricing | Hirely — AI Recruitment Plans",
    description:
      "Compare Hirely plans (Free, Pro, Enterprise) and pick the best fit for your hiring team. Includes AI resume parsing, smart screening, JD generation, and an insights dashboard.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/pricing`,
    siteName: "Hirely",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | Hirely — AI Recruitment Plans",
    description:
      "Choose Hirely: Free, Pro, or Enterprise plans with AI resume parsing, smart screening, and a data-driven dashboard.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen font-sans space-y-24 mb-32">
      <HeroSection />
      <PricingPlansSection />
    </main>
  );
}
