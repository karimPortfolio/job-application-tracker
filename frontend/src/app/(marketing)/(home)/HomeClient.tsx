"use client";
import LightRays from "@/components/LightRays";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { HeroSection } from "@/features/home/components/HeroSection";
import { PartnersSection } from "@/features/home/components/PartnersSection";
import Link from "next/link";

export function HomeClient() {
  const { user } = useAuth();

  return (
    <div className="w-full relative">
      <div className="h-screen">
        <LightRays
          raysOrigin="top-center"
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
          className="w-full h-full"
        />
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
    </div>
  );
}
