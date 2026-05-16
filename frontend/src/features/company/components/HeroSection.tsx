export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_60%)] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full dark:bg-[#1B1E36] border border-gray-300 dark:border-[#2D3154] mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          <span className="text-sm font-medium text-slate-300 tracking-wide">
            The Future of Recruitment
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
          <span className="block mb-2">Human Ingenuity.</span>
          <span className="block text-primary">AI Precision.</span>
        </h1>

        <p className="max-w-2xl text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
          We are engineering a paradigm shift in talent acquisition. By fusing
          advanced machine learning with profound human empathy, Hirely doesn't
          just fill roles— it architects optimized teams.
        </p>
      </div>
    </section>
  );
}
