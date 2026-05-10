import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function MarketingCtaSection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden transition-colors duration-300">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-500/10 dark:bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto relative">
        <div className="relative group overflow-hidden border rounded-3xl border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#1B1E36]/40 backdrop-blur-xl p-8 md:p-20 text-center">
          
          <div className="absolute inset-0 p-px rounded-3xl bg-gradient-to-b from-blue-500/20 to-transparent pointer-events-none"></div>

          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-white mb-8 shadow-[0_0_30px_rgba(37,99,235,0.3)] group-hover:scale-110 transition-transform duration-500">
            <Sparkles className="w-8 h-8" />
          </div>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            Ready to architect your <br className="hidden md:block" /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
              dream team?
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join the hundreds of forward-thinking enterprises using Hirely to fuse 
            human intuition with algorithmic precision. Your next 10x hire is one click away.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="h-14 px-8 bg-primary hover:bg-primary/90 text-white text-lg font-semibold shadow-lg shadow-blue-600/20 group/btn transition-all"
            >
              Start Hiring Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="h-14 px-8  border-gray-300 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-900 dark:text-white text-lg font-semibold transition-all"
            >
              Talk to Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};