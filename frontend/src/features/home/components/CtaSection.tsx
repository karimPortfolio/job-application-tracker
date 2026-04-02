import { RevealOnView } from "@/components/RevealOnView";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CtaSection() {
  return (
    <section className="pb-24 pt-14">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <RevealOnView>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm sm:p-12">
            <div
              className="pointer-events-none absolute inset-0 bg-linear-to-r from-blue-500/10 via-transparent to-cyan-400/10"
              aria-hidden
            />
            <div className="relative">
              <h2 className="text-3xl font-semibold sm:text-4xl">
                Ready to make hiring your competitive edge?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                Join teams using JobLoop to reduce manual work, accelerate decisions, and hire top
                talent with confidence.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="bg-blue-500 text-white hover:bg-blue-400 focus-visible:ring-2 focus-visible:ring-blue-200"
                  >
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="/learn-more">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                  >
                    Book a Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </RevealOnView>
      </div>
    </section>
  );
}
