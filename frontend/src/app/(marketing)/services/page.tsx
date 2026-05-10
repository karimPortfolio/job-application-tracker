import { MarketingCtaSection } from "@/components/MarketingCtaSection";
import EngineOfIntelligence from "@/features/services/components/EngineOfIntelligence";
import FeaturesBentoSection from "@/features/services/components/FeaturesBentoSection";
import { HeroSection } from "@/features/services/components/HeroSection";
import SetupToSuccessGrid from "@/features/services/components/SetupToSuccessGrid";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Hirely Services | AI-Powered Recruitment & Job Management Tools",
  description:
    "Discover Hirely's comprehensive recruitment services: AI resume parsing, smart candidate screening, job description generation, and intelligent application tracking. Streamline your hiring workflow with our modern platform.",
  keywords: [
    "recruitment services",
    "AI resume parsing",
    "smart screening",
    "job description generator",
    "application tracking",
    "hiring management",
    "talent management",
    "recruitment platform",
  ],
  openGraph: {
    title: "Hirely Services | AI-Powered Recruitment Tools",
    description:
      "Streamline your recruitment with AI-powered resume parsing, smart screening, and job management",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/services`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Hirely Services | AI Recruitment Platform",
    description:
      "AI resume parsing, smart screening, and automated job management in one platform",
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
        <FeaturesBentoSection />
        <EngineOfIntelligence />
        <MarketingCtaSection />
    </main>
  )
}