import { RevealOnView } from "@/components/RevealOnView";
import { cn } from "@/lib/utils";
import Image from "next/image";

const coreFeatures = [
  {
    image: "/images/features/job-alerts.png",
    badge: "Real-time",
    metric: "< 3 min alert",
    span: "md:col-span-2 lg:col-span-3",
    accent: "from-blue-500/30 via-indigo-500/10 to-transparent",
    title: "Job Alerts in Real-Time",
    description:
      "Get instant AI-powered insights on new applicants, candidate movement, and pipeline risks — so you can act fast and stay ahead of hiring goals.",
  },
  {
    image: "/images/features/ai-powered-matching.png",
    badge: "AI Core",
    metric: "Top-fit ranking",
    span: "md:col-span-2 lg:col-span-3",
    accent: "from-cyan-500/25 via-sky-500/10 to-transparent",
    title: "AI-Powered Candidate Matching",
    description:
      "Our AI analyzes resumes and job descriptions to surface top-fit candidates, prioritize outreach, and reduce time spent on manual screening.",
  },
  {
    image: "/images/features/one-click-applications.png",
    badge: "Frictionless",
    metric: "+42% apply rate",
    span: "md:col-span-2 lg:col-span-2",
    accent: "from-indigo-500/30 via-blue-500/10 to-transparent",
    title: "One-Click Applications",
    description:
      "Candidates can apply to your jobs with one click using their LinkedIn or Indeed profiles, making it easier than ever to capture top talent.",
  },
  {
    image: "/images/features/job-recommendations.png",
    badge: "Predictive",
    metric: "Smart suggestions",
    span: "md:col-span-2 lg:col-span-4",
    accent: "from-sky-500/25 via-blue-500/10 to-transparent",
    title: "Intelligent Job Recommendations",
    description:
      "Our AI continuously learns from your hiring patterns to recommend candidates and jobs that are the best fit, helping you fill roles faster.",
  },
];

export function CoreCapabilitiesSection() {
  return (
    <section className="relative py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-slate-950 via-slate-900/40 to-slate-950"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
        <RevealOnView>
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300/80">
              Core capabilities
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Built for modern recruiting teams
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              Everything your team needs to source, evaluate, and hire top talent from one
              intelligent platform.
            </p>
          </div>
        </RevealOnView>

        <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-6">
          {coreFeatures.map((feature) => (
            <RevealOnView key={feature.title} className={feature.span}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-white/10">
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-linear-to-br opacity-90",
                    feature.accent
                  )}
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-400/25 blur-3xl transition group-hover:scale-110"
                  aria-hidden
                />

                <div className="relative flex h-full flex-col">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full border border-blue-300/30 bg-blue-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-100">
                      {feature.badge}
                    </span>
                    <span className="text-xs font-medium text-cyan-100">{feature.metric}</span>
                  </div>

                  <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={900}
                      height={520}
                      loading="eager"
                      className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{feature.description}</p>
                </div>
              </article>
            </RevealOnView>
          ))}
        </div>
      </div>
    </section>
  );
}
