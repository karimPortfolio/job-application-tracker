"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Lightbulb, Heart, Zap, BrainCircuit } from "lucide-react";
import { useTheme } from "next-themes";
import { Globe3D, GlobeMarker } from "@/components/ui/3d-globe";

export function ImpactAndPrinciplesSection() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const cardGlassStyle = {
    background: isDark ? "rgba(45, 99, 237, 0.05)" : "transparent",
    backdropFilter: "blur(12px)",
  };

  const sampleMarkers: GlobeMarker[] = [
    {
      lat: 40.7128,
      lng: -74.006,
      src: "https://assets.aceternity.com/avatars/1.webp",
      label: "New York",
    },
    {
      lat: 51.5074,
      lng: -0.1278,
      src: "https://assets.aceternity.com/avatars/2.webp",
      label: "London",
    },
    {
      lat: 35.6762,
      lng: 139.6503,
      src: "https://assets.aceternity.com/avatars/3.webp",
      label: "Tokyo",
    },
    {
      lat: -33.8688,
      lng: 151.2093,
      src: "https://assets.aceternity.com/avatars/4.webp",
      label: "Sydney",
    },
    {
      lat: 48.8566,
      lng: 2.3522,
      src: "https://assets.aceternity.com/avatars/5.webp",
      label: "Paris",
    },
    {
      lat: 28.6139,
      lng: 77.209,
      src: "https://assets.aceternity.com/avatars/6.webp",
      label: "New Delhi",
    },
    {
      lat: 55.7558,
      lng: 37.6173,
      src: "https://assets.aceternity.com/avatars/7.webp",
      label: "Moscow",
    },
    {
      lat: -22.9068,
      lng: -43.1729,
      src: "https://assets.aceternity.com/avatars/8.webp",
      label: "Rio de Janeiro",
    },
    {
      lat: 31.2304,
      lng: 121.4737,
      src: "https://assets.aceternity.com/avatars/9.webp",
      label: "Shanghai",
    },
    {
      lat: 25.2048,
      lng: 55.2708,
      src: "https://assets.aceternity.com/avatars/10.webp",
      label: "Dubai",
    },
    {
      lat: -34.6037,
      lng: -58.3816,
      src: "https://assets.aceternity.com/avatars/11.webp",
      label: "Buenos Aires",
    },
    {
      lat: 1.3521,
      lng: 103.8198,
      src: "https://assets.aceternity.com/avatars/12.webp",
      label: "Singapore",
    },
    {
      lat: 37.5665,
      lng: 126.978,
      src: "https://assets.aceternity.com/avatars/13.webp",
      label: "Seoul",
    },
  ];

  return (
    <section className="relative min-h-screen py-20 px-6 font-sans text-white">
      <div className="max-w-7xl mx-auto space-y-32">
        <Card
          style={cardGlassStyle}
          className="relative border-gay-500 dark:border-white/5 rounded-3xl overflow-hidden shadow-none"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-semibold mb-4 tracking-tight">
                Our Global Impact
              </h2>
              <p className="text-[#8B92A5] text-sm md:text-base leading-relaxed mb-12 max-w-md">
                Hirely scales across borders, connecting specialized talent with
                visionary enterprises regardless of geography. Our data-driven
                reach spans the globe.
              </p>

              <div className="grid grid-cols-2 gap-y-10 gap-x-6">
                <div className="border-l-2 border-primary pl-4">
                  <div className="text-3xl font-bold mb-1">500k+</div>
                  <div className="text-[10px] md:text-xs font-bold text-[#8B92A5] tracking-wider uppercase">
                    Successful Placements
                  </div>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <div className="text-3xl font-bold mb-1">50+</div>
                  <div className="text-[10px] md:text-xs font-bold text-[#8B92A5] tracking-wider uppercase">
                    Countries Served
                  </div>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <div className="text-3xl font-bold mb-1">98%</div>
                  <div className="text-[10px] md:text-xs font-bold text-[#8B92A5] tracking-wider uppercase">
                    Client Satisfaction
                  </div>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <div className="text-3xl font-bold mb-1">40%</div>
                  <div className="text-[10px] md:text-xs font-bold text-[#8B92A5] tracking-wider uppercase">
                    Efficiency Gain
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center items-center min-h-75">
              <div className="relative z-10 w-16 h-16 bg-primary/20 dark:bg-[#131527] rounded-full flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                {/* <Globe className="w-8 h-8 text-primary" strokeWidth={1.5} /> */}
                <div className="absolute -bottom-105 z-10 size-160  md:size-180">
                  <Globe3D
                    className="h-full w-full"
                    markers={sampleMarkers}
                    config={{
                      atmosphereColor: "#4da6ff",
                      atmosphereIntensity: 20,
                      bumpScale: 5,
                      autoRotateSpeed: 0.3,
                    }}
                    onMarkerClick={(marker) => {
                      console.log("Clicked marker:", marker.label);
                    }}
                    onMarkerHover={(marker) => {
                      if (marker) {
                        console.log("Hovering:", marker.label);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute left-150 dark:hidden inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_60%)] pointer-events-none"></div>
        </Card>

        <div className="relative">
          <div className="text-center mb-12">
            <h2 className="text-black dark:text-white text-3xl md:text-4xl font-semibold mb-3 tracking-tight">
              Core Principles
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
              The foundational vectors that guide our engineering and
              operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <PrincipleCard
              icon={<BrainCircuit className="w-6 h-6 text-primary" />}
              title="Transparency"
              description="Clear, explainable AI models. We eliminate black boxes in algorithmic decision-making."
              cardGlassStyle={cardGlassStyle}
            />
            <PrincipleCard
              icon={<Lightbulb className="w-6 h-6 text-primary" />}
              title="Innovation"
              description="Relentlessly pushing the computational boundaries of talent acquisition technology."
              cardGlassStyle={cardGlassStyle}
            />
            <PrincipleCard
              icon={<Heart className="w-6 h-6 text-primary" />}
              title="Empathy"
              description="Algorithms meticulously calibrated to understand profound human nuances and potential."
              cardGlassStyle={cardGlassStyle}
            />
            <PrincipleCard
              icon={<Zap className="w-6 h-6 text-primary" />}
              title="Efficiency"
              description="Radically optimizing time-to-hire workflows without compromising matching precision."
              cardGlassStyle={cardGlassStyle}
            />
          </div>
        </div>
      </div>
    </section>
    // </main>
  );
}

function PrincipleCard({
  icon,
  title,
  description,
  cardGlassStyle,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  cardGlassStyle: any;
}) {
  return (
    <Card
      style={cardGlassStyle}
      className="relative border-gay-500 dark:border-white/5 hover:border-primary/30 transition-all duration-300 group shadow-none"
    >
      <CardHeader className="pb-2">
        <div className="mb-4 p-3 w-fit rounded-3xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      </CardContent>
      <div className="absolute dark:hidden w-md inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_60%)] pointer-events-none"></div>
    </Card>
  );
}
