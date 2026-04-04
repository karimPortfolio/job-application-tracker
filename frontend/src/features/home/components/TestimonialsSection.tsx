import { RevealOnView } from "@/components/RevealOnView";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const testimonials = [
  {
    avatar: "https://i.pravatar.cc/160?img=12",
    quote:
      "We cut time-to-hire by 37% in two quarters while improving candidate quality across every team.",
    name: "Sarah Patel",
    role: "Head of Talent, NorthPeak",
    company: "NorthPeak",
    colSpan: "md:col-span-2 lg:col-span-3",
  },
  {
    avatar: "https://i.pravatar.cc/160?img=32",
    quote:
      "The AI summaries and scorecards removed hours of admin every week for our recruiters.",
    name: "Marcus Bell",
    role: "Recruiting Lead, Fluxive",
    company: "Fluxive",
    colSpan: "md:col-span-2 lg:col-span-3",
  },
  {
    avatar: "https://i.pravatar.cc/160?img=41",
    quote:
      "JobLoop gave leadership a clear pipeline view and helped us scale hiring without chaos.",
    name: "Olivia Chen",
    role: "VP People, Lantern Cloud",
    company: "Lantern Cloud",
    colSpan: "md:col-span-2 lg:col-span-2",
  },
  {
    avatar: "https://i.pravatar.cc/160?img=19",
    quote:
      "Interview scheduling and feedback loops became effortless. Hiring managers finally stay aligned without chasing updates.",
    name: "Daniel Ross",
    role: "Talent Operations Manager, Verdan",
    company: "Verdan",
    colSpan: "md:col-span-2 lg:col-span-2",
  },
  {
    avatar: "https://i.pravatar.cc/160?img=7",
    quote:
      "The quality bar is higher now. We spend less time screening and more time with the right candidates.",
    name: "Jason Wu",
    role: "Head of Recruiting, HelioStack",
    company: "HelioStack",
    colSpan: "md:col-span-2 lg:col-span-2",
  },
  {
    avatar: "https://i.pravatar.cc/160?img=25",
    quote:
      "We launched two new departments and still kept hiring velocity high because workflow automation handled the busywork.",
    name: "Amira Hadad",
    role: "Chief People Officer, Arclight",
    company: "Arclight",
    colSpan: "md:col-span-2 lg:col-span-4",
  },
  {
    avatar: "https://i.pravatar.cc/160?img=53",
    quote:
      "The platform helped us reduce hiring bottlenecks and gave every stakeholder a clear view of where candidates stand.",
    name: "Nora Ibrahim",
    role: "Talent Acquisition Director, Crescent Labs",
    company: "Crescent Labs",
    colSpan: "md:col-span-2 lg:col-span-2",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-zinc-50 via-blue-50/40 to-zinc-50 dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-0">
        <RevealOnView>
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700/80 dark:text-blue-300/80">
              What teams say
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Loved by recruiters and hiring leaders
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
              Real teams scaling faster hiring workflows with better signal,
              less admin, and stronger alignment.
            </p>
          </div>
        </RevealOnView>

        <div className="relative grid grid-cols-1 gap-3 md:grid-cols-4 lg:grid-cols-6">
          {testimonials.map((item) => (
            <RevealOnView key={item.name} className={`${item.colSpan}`}>
              <Card className="group h-full gap-0 border-slate-200/80 bg-white/90 shadow-[0_24px_70px_-35px_rgba(59,130,246,0.25)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-white dark:border-white/10 dark:bg-white/6 dark:shadow-[0_24px_70px_-35px_rgba(59,130,246,0.55)] dark:hover:bg-white/10">
                <CardHeader>
                  <p className="mt-3 text-xs uppercase tracking-[0.16em] text-blue-700/85 dark:text-blue-300/85">
                    {item.company}
                  </p>
                  <p className="my-3 grow text-lg leading-relaxed text-slate-700 dark:text-slate-200">
                    “{item.quote}”
                  </p>
                </CardHeader>
                <CardContent className="flex h-full flex-col">
                  <div className="mt-auto border-t border-slate-200/80 pt-4 dark:border-white/10">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.avatar}
                        alt={`${item.name} profile`}
                        loading="lazy"
                        className="h-11 w-11 rounded-full border border-slate-300/70 object-cover dark:border-white/20"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-900 dark:text-white">
                          {item.name}
                        </p>
                        <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </RevealOnView>
          ))}

          {/* <div
            className="pointer-events-none absolute -bottom-8 left-0 right-0 h-28 bg-linear-to-t from-slate-950 via-slate-950/85 to-transparent"
            aria-hidden
          /> */}
        </div>
        {/* <div
            className="pointer-events-none absolute -bottom-16 left-1/2 h-36 w-full -translate-x-1/2 bg-blue-300/30 blur-2xl shadow-[0_-20px_90px_35px_rgba(15,23,42,0.95)]"
            aria-hidden
          /> */}
      </div>
    </section>
  );
}
