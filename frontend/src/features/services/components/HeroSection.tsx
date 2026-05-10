

export function HeroSection() {
  return (
    <section className="relative md:pt-10 min-h-screen flex items-center justify-center dark:bg-[#131527] px-4 overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_60%)] pointer-events-none"></div>
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-900 dark:text-white mb-8">
          Next-Gen <span className="text-primary ">Recruitment Tools.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-[#8B92A5] max-w-2xl mx-auto mb-10 leading-relaxed">
          Beyond software. We partner with your leadership to architect
          high-performance teams using bespoke AI models and human-centric
          strategy.
        </p>
      </div>
    </section>
  );
}
