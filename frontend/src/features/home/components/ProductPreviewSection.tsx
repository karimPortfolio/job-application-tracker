import { RevealOnView } from "@/components/RevealOnView";

export function ProductPreviewSection() {
  return (
    <section className="py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:px-12">
        <RevealOnView>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300/80">
            Product preview
          </p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            A dashboard designed for confident decisions
          </h2>
          <p className="mt-4 max-w-lg text-slate-300">
            Get instant visibility across open roles, candidate movement, and hiring velocity.
            Spot pipeline risks early and take action before delays impact your team goals.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs text-blue-200">
              Real-time pipeline health
            </span>
            <span className="rounded-full border border-cyan-300/30 bg-cyan-500/10 px-4 py-2 text-xs text-cyan-100">
              Team workload balancing
            </span>
            <span className="rounded-full border border-slate-300/20 bg-white/5 px-4 py-2 text-xs text-slate-200">
              Role-level conversion analytics
            </span>
          </div>
        </RevealOnView>

        <RevealOnView>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-2 shadow-[0_20px_70px_-20px_rgba(59,130,246,0.45)]">
            <div
              className="absolute -top-20 right-6 h-40 w-40 rounded-full bg-blue-500/30 blur-3xl"
              aria-hidden
            />
            <div
              className="absolute -bottom-16 -left-10 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl"
              aria-hidden
            />
            <div className="relative rounded-2xl border border-white/10 bg-slate-900/90 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <StatCard label="Open roles" value="48" delta="+12% this month" />
                <StatCard label="Avg time-to-hire" value="21d" delta="-9 days vs last qtr" />
                <StatCard
                  label="Qualified applicants"
                  value="1,284"
                  delta="Top 18% auto-prioritized"
                />
                <StatCard label="Interview-to-offer" value="34%" delta="+7% conversion gain" />
              </div>
            </div>
          </div>
        </RevealOnView>
      </div>
    </section>
  );
}

function StatCard({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs text-blue-200">{delta}</p>
    </div>
  );
}
