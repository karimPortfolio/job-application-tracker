import React from "react";
import { Zap, Network, CheckCircle2, ArrowRight, BrainCircuit } from "lucide-react";
import { AIChipSvg } from "./AIChipSvg";

export default function EngineOfIntelligence() {
  const floatAnimationStyle = {
    animation: "float 6s ease-in-out infinite",
  };

  return (
    <section className="py-24  transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative w-full aspect-square flex items-center justify-center">
            <div className="absolute w-[80%] h-[80%] bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl transition-colors duration-300" />

            <div className="absolute w-[95%] sm:w-[85%] lg:w-[100%] aspect-square border border-dashed border-slate-300 dark:border-slate-600/50 rounded-full transition-colors duration-300" />

            <div className="absolute w-[70%] sm:w-[60%] lg:w-[75%] aspect-square border border-dashed border-slate-300 dark:border-slate-600/60 rounded-full transition-colors duration-300" />

            <div style={floatAnimationStyle} className="relative">
              <div className="absolute w-40 h-40 top-40 left-44 rounded-2xl bg-black/70 blur-lg"></div>
              <AIChipSvg className="relative z-10" />
            </div>

            <div className="absolute top-[15%] left-[25%] w-2 h-2 bg-blue-500 rounded-full blur-[1px] animate-pulse" />
            <div className="absolute bottom-[20%] right-[15%] w-2 h-2 bg-blue-400 rounded-full blur-[1px] animate-pulse" />
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-sm font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase transition-colors duration-300">
              Neural Infrastructure
            </span>

            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight transition-colors duration-300">
              The Engine of
              <br />
              Intelligence
            </h2>

            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-300">
              Our proprietary AI Neural Core is the backbone of the Hirely
              ecosystem. It processes millions of data points across global
              talent pools to deliver unparalleled accuracy in candidate
              matching.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 transition-colors duration-300">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white transition-colors duration-300">
                  Sub-Millisecond
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-300">
                  Real-time processing of massive datasets with ultra-low
                  latency architecture.
                </p>
              </div>

              <div>
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 transition-colors duration-300">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white transition-colors duration-300">
                  Deep Learning
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-300">
                  Self-evolving models that improve with every successful hire
                  in your organization.
                </p>
              </div>
            </div>

            <div className="mt-10">
              <a
                href="#"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300 group"
              >
                Learn about the architecture
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
