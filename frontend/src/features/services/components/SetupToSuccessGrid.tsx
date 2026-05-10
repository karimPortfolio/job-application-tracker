import React from 'react';
import { Building2, Briefcase, Sparkles, Globe2, Inbox, Search } from 'lucide-react';

export default function SetupToSuccessGrid() {
  const steps = [
    { id: '01', title: "Creating Departments", desc: "Structure your organization with precision.", icon: Building2 },
    { id: '02', title: "Create Jobs", desc: "Launch new opportunities in seconds.", icon: Briefcase },
    { id: '03', title: "AI Job Descriptions", desc: "Let our intelligence craft the perfect pitch.", icon: Sparkles },
    { id: '04', title: "Publish to Public", desc: "Reach top talent across the global network.", icon: Globe2 },
    { id: '05', title: "Receive Applications", desc: "Gather a pool of high-potential candidates.", icon: Inbox },
    { id: '06', title: "Smart AI Screening", desc: "Build your dream team with data-driven confidence.", icon: Search },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#131527] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight transition-colors duration-300">
            From Setup to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Success</span>
          </h2>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 transition-colors duration-300">
            Experience a seamless, intelligent recruitment lifecycle designed to accelerate your hiring velocity from day one.
          </p>
        </div>

        {/* Modern Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.id} 
                className="group relative p-8 bg-white dark:bg-[#1D213A] rounded-[2rem] border border-slate-200 dark:border-white/5 hover:border-blue-500/30 dark:hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between min-h-[280px]"
              >
                {/* Subtle Hover Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-500/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none" />

                {/* Top Section: Icon & Watermark Number */}
                <div className="flex justify-between items-start relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-[#131527] border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-all duration-300 shadow-sm">
                    <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  
                  {/* Decorative Step Number */}
                  <span className="text-5xl font-black text-slate-100 dark:text-slate-800/50 group-hover:text-blue-50 dark:group-hover:text-blue-900/30 transition-colors duration-300 select-none tracking-tighter">
                    {step.id}
                  </span>
                </div>

                {/* Bottom Section: Text Content */}
                <div className="relative z-10 mt-8">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-300">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}