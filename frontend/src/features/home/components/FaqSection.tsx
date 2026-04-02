"use client";

import { RevealOnView } from "@/components/RevealOnView";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How quickly can we set up JobLoop for our team?",
    answer:
      "Most teams are fully set up in less than a day. You can connect your workflow, import open roles, and start tracking candidates immediately.",
  },
  {
    question: "Can we use JobLoop with our current hiring tools?",
    answer:
      "Yes. JobLoop is designed to fit into your existing process and centralize visibility, so recruiters and hiring managers stay aligned without switching contexts.",
  },
  {
    question: "How does AI ranking remain fair and transparent?",
    answer:
      "We provide explainable scoring signals and structured evaluation inputs. Teams can review factors behind rankings and keep decision-making accountable.",
  },
  {
    question: "Is JobLoop suitable for both startups and enterprise teams?",
    answer:
      "Absolutely. Start with lightweight workflows and scale up to role-based access, auditability, and advanced reporting as your hiring volume grows.",
  },
  {
    question: "Do candidates have a better application experience?",
    answer:
      "Yes. With simplified application flows, timely updates, and smoother scheduling, candidates move through your process with less friction.",
  },
];

export function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="relative py-24 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-slate-950 via-slate-900/30 to-slate-950"
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-12">
        <RevealOnView>
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300/80">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Answers to common questions
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              Everything you need to know before rolling JobLoop out to your recruiting team.
            </p>
          </div>
        </RevealOnView>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <RevealOnView key={faq.question}>
                <div
                  className={cn(
                    "rounded-2xl border bg-white/5 backdrop-blur-sm transition duration-300",
                    isOpen
                      ? "border-blue-400/50 bg-white/10 shadow-[0_16px_60px_-30px_rgba(59,130,246,0.65)]"
                      : "border-white/10 hover:border-blue-300/35 hover:bg-white/8"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                  >
                    <span className="font-medium text-white sm:text-lg">{faq.question}</span>
                    <ChevronDown
                      className={cn(
                        "size-5 shrink-0 text-slate-300 transition-transform duration-300",
                        isOpen && "rotate-180 text-blue-200"
                      )}
                    />
                  </button>

                  <div
                    id={`faq-panel-${index}`}
                    className={cn(
                      "grid transition-all duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden px-5">
                      <p className="border-t border-white/10 pb-5 pt-4 text-sm leading-relaxed text-slate-300">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </RevealOnView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
