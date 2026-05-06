"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Compass, Cpu, Search } from "lucide-react";
import { useTheme } from "next-themes";

export function GenesisSection() {

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const cardGlassStyle = {
    background: isDark ? "rgba(45, 99, 237, 0.05)" : "transparent",
    backdropFilter: "blur(12px)",
  };

  return (
    <section className="relative w-full font-sans text-white flex items-center justify-center">
      <div className="absolute left-150 dark:hidden inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_60%)] pointer-events-none"></div>
      <div className="absolute -left-150 dark:hidden inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_20%)] pointer-events-none"></div>

      <div className="px-5 sm:px-0 max-w-full sm:max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8 tracking-tight text-black dark:text-white">
          Our Genesis
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
          <Card style={cardGlassStyle} className="md:col-span-2 border rounded-lg bg-transparent dark:border-white/5 text-white flex flex-col justify-between transition-transform hover:-translate-y-1 duration-300 shadow-none">
            <CardHeader className="p-6 pb-0">
              <Search className="w-6 h-6 text-primary" strokeWidth={2.5} />
            </CardHeader>
            <CardContent className="p-8 pt-12 md:pt-8">
              <CardTitle className="text-3xl font-semibold mb-3 tracking-tight border-none text-black dark:text-white">
                The Inefficiency Problem
              </CardTitle>
              <CardDescription className="text-[#8B92A5] text-sm leading-relaxed max-w-xl">
                Traditional recruitment was fundamentally broken—a slow, biased,
                and noisy process that left both candidates and companies
                frustrated. We saw an opportunity to inject clarity into chaos.
              </CardDescription>
            </CardContent>
          </Card>

          <Card style={cardGlassStyle} className="md:col-span-1 border rounded-lg dark:border-white/5 text-white flex flex-col justify-between transition-transform hover:-translate-y-1 duration-300 shadow-none">
            <CardHeader className="p-6 pb-0 flex flex-row justify-end items-start space-y-0">
              <Cpu className="w-8 h-8 text-[#3A3F58]" strokeWidth={1.5} />
            </CardHeader>
            <CardContent className="p-8 pb-5 pt-12 md:pt-8">
              <CardTitle className="text-3xl font-semibold mb-2 tracking-tight border-none text-black dark:text-white">
                2021
              </CardTitle>
              <CardDescription className="text-[#8B92A5] text-sm leading-relaxed">
                Founded by a collective of data scientists and talent
                strategists.
              </CardDescription>
            </CardContent>
          </Card>

          <Card style={cardGlassStyle} className="md:col-span-1 border rounded-lg dark:border-white/5 text-white flex flex-col justify-end transition-transform hover:-translate-y-1 duration-300 shadow-none">
            <CardContent className="p-8 pb-5">
              <CardTitle className="text-3xl font-semibold mb-2 tracking-tight border-none text-black dark:text-white">
                10M+
              </CardTitle>
              <CardDescription className="text-[#8B92A5] text-sm leading-relaxed">
                Data points analyzed daily to refine our matching algorithms.
              </CardDescription>
            </CardContent>
          </Card>

          <Card style={cardGlassStyle} className="md:col-span-2 border rounded-lg dark:border-white/5 text-white flex flex-col justify-between transition-transform hover:-translate-y-1 duration-300 shadow-none">
            <CardHeader className="p-6 pb-0">
              <Compass className="w-6 h-6 text-primary" strokeWidth={2.5} />
            </CardHeader>
            <CardContent className="p-8 pb-5 pt-12 md:pt-8">
              <CardTitle className="text-3xl font-semibold mb-3 tracking-tight border-none text-black dark:text-white">
                The Algorithmic Solution
              </CardTitle>
              <CardDescription className="text-[#8B92A5] text-sm leading-relaxed max-w-2xl text-balance">
                We built an engine that reads beyond the resume. By mapping
                semantic relationships between skills, company culture, and
                career trajectories, we engineered a system that predicts
                success, not just keyword matches.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
