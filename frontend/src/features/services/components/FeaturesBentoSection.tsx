"use client";

import { Scan, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTheme } from "next-themes";

export default function FeaturesBentoSection() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const glassCardStyle = {
    background: isDark
      ? "rgba(45, 99, 237, 0.05)"
      : "oklch(96.7% 0.001 286.375)",
    backdropFilter: "blur(12px)",
    border: isDark ? "1px solid rgba(255, 255, 255, 0.05)" : "",
  };

  return (
    <section className="py-24 px-6 font-sans transition-colors duration-300">
      <div className="text-center mb-24 max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-6 leading-tight">
          Intelligent Infrastructure for the Modern Recruiters
        </h2>
        <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl mx-auto">
          Our suite of AI-powered tools is designed to eliminate busywork and focus your attention on what matters: the best candidates.
        </p>
      </div>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <Card
            style={glassCardStyle}
            className="lg:col-span-3 flex flex-col overflow-hidden border-gray-200 dark:border-[#202532] shadow-none dark:shadow-none rounded-3xl transition-colors min-h-[420px]"
          >
            <div className="p-10 pb-0 relative z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-[#1D243A] text-primary dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-5">
                DASHBOARD
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100 tracking-tight">
                Intelligent Insights
              </h3>
              <p className="text-gray-600 dark:text-[#828DA9] text-[15px] leading-relaxed max-w-lg">
                Get a bird's-eye view of your entire recruitment pipeline.
                Uncover trends, track conversions, and optimize your hiring
                velocity with real-time analytics.
              </p>
            </div>
            <div className="relative mt-8 px-10 flex-1 flex items-end">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-3/4 bg-primary/70 blur-[70px] rounded-full pointer-events-none"></div>
              <img
                src="/images/services/dashboard-page.png"
                alt="Intelligent Insights Dashboard"
                className="relative top-16 z-10 w-full h-auto object-cover object-top rounded-t-xl border border-gray-200 dark:border-white/5 shadow-2xl translate-y-2"
              />
            </div>
          </Card>

          <Card
            style={glassCardStyle}
            className="lg:col-span-2 flex flex-col border-gray-200 dark:border-[#202532] shadow-none dark:shadow-none rounded-3xl transition-colors min-h-[420px]"
          >
            <div className="p-10 flex flex-col h-full">
              <div className="w-12 h-12 rounded-[14px] bg-gray-100 dark:bg-[#181C26] border border-gray-200 dark:border-[#252B3B] flex items-center justify-center mb-8">
                <Scan className="w-5 h-5 text-primary dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100 tracking-tight">
                AI Resume Analysis
              </h3>
              <p className="text-gray-600 dark:text-[#828DA9] text-[15px] leading-relaxed">
                Instantly extract skills, experience, and nuanced qualifications
                from any resume format. Our neural networks understand context,
                not just keywords.
              </p>
              <div className="mt-auto pt-8">
                <a
                  href="#"
                  className="inline-flex items-center text-[14px] font-medium text-primary dark:text-blue-400 hover:opacity-80 transition-opacity group"
                >
                  Explore Analysis
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </Card>

          <Card
            style={glassCardStyle}
            className="lg:col-span-2 flex flex-col overflow-hidden border-gray-200 dark:border-[#202532] shadow-none dark:shadow-none rounded-3xl transition-colors min-h-[420px]"
          >
            <div className="p-10 pb-0 relative z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-[#1D243A] text-primary dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-5">
                SCORING
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100 tracking-tight">
                Precision Matching
              </h3>
              <p className="text-gray-600 dark:text-[#828DA9] text-[15px] leading-relaxed">
                Rank applicants dynamically based on custom job role
                requirements and historical success data. Let intelligent
                scoring surface top talent instantly.
              </p>
            </div>
            <div className="relative mt-8 px-10 flex-1 flex items-end">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-3/4 dark:bg-primary/70 blur-[70px] rounded-full pointer-events-none"></div>
              <img
                src="/images/services/smart-screening.png"
                alt="Precision Matching Interface"
                className="absolute top-6 z-10 w-full h-auto object-cover object-top rounded-t-xl border border-gray-200 dark:border-white/5 shadow-2xl translate-y-2"
              />
            </div>
          </Card>

          <Card
            style={glassCardStyle}
            className="lg:col-span-3 flex flex-col overflow-hidden bg-white dark:bg-[#12151C] border-gray-200 dark:border-[#202532] shadow-none dark:shadow-none rounded-3xl transition-colors min-h-[420px]"
          >
            <div className="p-10 pb-0 relative z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-[#1D243A] text-primary dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-5">
                PIPELINES
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100 tracking-tight">
                Seamless Workflow
              </h3>
              <p className="text-gray-600 dark:text-[#828DA9] text-[15px] leading-relaxed max-w-lg">
                Build complex, multi-stage interview pipelines that run
                themselves. From scheduling to follow-ups, keep candidates
                engaged without the manual overhead.
              </p>
            </div>
            <div className="relative mt-8 px-10 flex-1 flex items-end">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-3/4 dark:bg-primary/70 blur-[70px] rounded-full pointer-events-none"></div>
              <img
                src="images/services/applications-page.png"
                alt="Seamless Workflow Pipelines"
                className="relative top-16 z-10 w-full h-auto object-cover object-top rounded-t-xl border border-gray-200 dark:border-white/5 shadow-2xl translate-y-2"
              />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
