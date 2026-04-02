"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Gauge, Link2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type ShowcaseItem = {
  id: string;
  title: string;
  summary: string;
  detail: string;
  image: string;
  metric: string;
  icon: typeof Link2;
};

const showcaseItems: ShowcaseItem[] = [
  {
    id: "01",
    title: "Connect Your Hiring Stack",
    summary: "Bring your jobs, candidates, and workflows together in minutes.",
    detail:
      "Sync openings, stages, and team assignments from your current tools into one unified hiring workspace.",
    image: "/images/features/job-alerts.png",
    metric: "Setup in < 15 min",
    icon: Link2,
  },
  {
    id: "02",
    title: "Let AI Prioritize",
    summary:
      "JobLoop surfaces top-fit talent and flags bottlenecks before they grow.",
    detail:
      "Automatically rank candidates, detect stalled stages, and recommend your highest-impact next action.",
    image: "/images/features/ai-powered-matching.png",
    metric: "Top-fit ranking",
    icon: Bot,
  },
  {
    id: "03",
    title: "Hire Faster With Confidence",
    summary:
      "Collaborate, decide, and close roles with predictable speed and quality.",
    detail:
      "Use aligned scorecards, structured feedback, and transparent pipeline health to speed up final decisions.",
    image: "/images/features/job-recommendations.png",
    metric: "Faster time-to-hire",
    icon: Gauge,
  },
];

const AUTOPLAY_MS = 5000;

export function FeatureShowcaseAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [resetTick, setResetTick] = useState(0);

  const activeKey = useMemo(
    () => `${showcaseItems[activeIndex]?.id}-${resetTick}`,
    [activeIndex, resetTick],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % showcaseItems.length);
    }, AUTOPLAY_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex, resetTick]);

  const onSelect = (index: number) => {
    setActiveIndex(index);
    setResetTick((prev) => prev + 1);
  };

  return (
    <section className="relative py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-slate-950 via-slate-900/35 to-slate-950"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-0">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300/80">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Feature showcase accordion
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            A guided workflow that auto-rotates through each hiring stage while
            letting your team take control at any moment.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div className="space-y-4">
            {showcaseItems.map((item, index) => {
              const isActive = index === activeIndex;
              const Icon = item.icon;

              return (
                <Card
                  key={item.id}
                  className={cn(
                    "relative border-0 bg-transparent overflow-hidden transition-all duration-300",
                    isActive
                      ? "border-blue-400/50"
                      : "hover:border-blue-300/35 hover:bg-slate-900/65",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => onSelect(index)}
                    aria-expanded={isActive}
                    aria-controls={`feature-showcase-panel-${item.id}`}
                    className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                  >
                    <CardContent className="relative p-3 md:p-4">
                      <div className="flex items-start gap-4">
                        <span
                          className={cn(
                            "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-sm",
                            isActive
                              ? "border-cyan-300/45 bg-cyan-500/10 text-cyan-100"
                              : "border-white/20 bg-white/5 text-slate-300",
                          )}
                        >
                          <Icon className="size-5" />
                        </span>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <CardTitle className="text-xl leading-tight text-white">
                              {item.title}
                            </CardTitle>
                            <span
                              className={cn(
                                "rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]",
                                isActive
                                  ? "border-blue-300/45 bg-blue-500/15 text-blue-100"
                                  : "border-white/20 bg-white/5 text-slate-300",
                              )}
                            >
                              {item.metric}
                            </span>
                          </div>

                          <p className="mt-2 text-sm text-slate-500">
                            {item.summary}
                          </p>

                          <AnimatePresence initial={false} mode="wait">
                            {isActive && (
                              <motion.div
                                key={item.id}
                                id={`feature-showcase-panel-${item.id}`}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.35, ease: "easeOut" }}
                                className="overflow-hidden"
                              >
                                <p className="mt-4 text-sm leading-relaxed text-slate-200">
                                  {item.detail}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </CardContent>
                  </button>

                  {isActive && (
                    <div className="absolute inset-x-0 bottom-0 h-px bg-white/10">
                      <motion.div
                        key={activeKey}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration: AUTOPLAY_MS / 1000,
                          ease: "linear",
                        }}
                        className="h-full bg-linear-to-r from-blue-300/90 via-cyan-300/80 to-blue-300/90"
                      />
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          <div className="flex items-center h-full">
            <Card className="overflow-hidden rounded-2xl p-3 border-0 bg-primary/30 shadow-[0_24px_80px_-30px_rgba(59,130,246,0.55)]">
              <CardContent className="p-0">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={showcaseItems[activeIndex].id}
                    initial={{ opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.985 }}
                    transition={{ duration: 0.32, ease: "easeOut" }}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/65"
                  >
                    <Image
                      src={showcaseItems[activeIndex].image}
                      alt={showcaseItems[activeIndex].title}
                      width={900}
                      height={620}
                      className="h-96 w-full object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
