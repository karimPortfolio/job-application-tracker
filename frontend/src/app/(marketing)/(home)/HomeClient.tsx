"use client";
import LightRays from "@/components/LightRays";
import { MarketingFooter } from "@/components/MarketingFooter";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { CoreCapabilitiesSection } from "@/features/home/components/CoreCapabilitiesSection";
import { CreateJobMarketingSection } from "@/features/home/components/CreateJobMarketingSection";
import { CtaSection } from "@/features/home/components/CtaSection";
import { FaqSection } from "@/features/home/components/FaqSection";
import { FeatureShowcaseAccordion } from "@/features/home/components/FeatureShowcaseAccordion";
import { HeroSection } from "@/features/home/components/HeroSection";
import { PartnersSection } from "@/features/home/components/PartnersSection";
import { ProductPreviewSection } from "@/features/home/components/ProductPreviewSection";
import { TestimonialsSection } from "@/features/home/components/TestimonialsSection";
import { useTheme } from "next-themes";

export function HomeClient() {
  const { user } = useAuth();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <main className="relative w-full overflow-x-clip bg-zinc-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="h-screen">
        {isDark && (
          <LightRays
            raysOrigin="bottom-center"
            raysColor="#3a88fe"
            raysSpeed={1}
            lightSpread={50}
            rayLength={20}
            pulsating={false}
            fadeDistance={1}
            saturation={1}
            followMouse
            mouseInfluence={0.1}
            noiseAmount={0}
            distortion={0}
            className="h-full w-full"
          />
        )}

        <HeroSection
          user={user}
          headline="Hire Smarter. Faster. With AI."
          description="Streamline your entire recruitment process with AI-powered resume analysis, automated interview workflows, and intelligent candidate scoring — all in one powerful dashboard."
          link="/signup"
          linkLabel="Get Started"
          secondaryLink="/learn-more"
          secondaryLinkLabel="Learn More"
        />
      </div>

      <PartnersSection />

      <CoreCapabilitiesSection />

      <ProductPreviewSection />

      <CreateJobMarketingSection />

      <FeatureShowcaseAccordion />

      <TestimonialsSection />

      <FaqSection />

      <CtaSection />
    </main>
  );
}
