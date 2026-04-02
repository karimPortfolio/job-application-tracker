import { Logo } from "@/components/Logo";
import Link from "next/link";

export function HomeFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-slate-950/90">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/4 via-transparent to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 py-14 lg:px-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Logo width={150} />
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
              AI-powered hiring workflows for teams that want to move faster, stay aligned, and
              hire with confidence.
            </p>
          </div>

          <FooterColumn
            title="Product"
            links={[
              { href: "/learn-more", label: "Overview" },
              { href: "/pricing", label: "Pricing" },
              { href: "/contact", label: "Demo" },
              { href: "/learn-more", label: "Features" },
            ]}
          />

          <FooterColumn
            title="Company"
            links={[
              { href: "/about", label: "About" },
              { href: "/contact", label: "Careers" },
              { href: "/contact", label: "Contact" },
              { href: "/learn-more", label: "Customers" },
            ]}
          />

          <FooterColumn
            title="Resources"
            links={[
              { href: "/learn-more", label: "Documentation" },
              { href: "/learn-more", label: "Help Center" },
              { href: "/learn-more", label: "API" },
              { href: "/learn-more", label: "Status" },
            ]}
          />
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Hirely. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/privacy"
              className="rounded transition hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="rounded transition hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              Terms
            </Link>
            <Link
              href="/contact"
              className="rounded transition hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ href: string; label: string }>;
}) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-300/85">{title}</p>
      <div className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <Link
            key={`${title}-${link.label}`}
            href={link.href}
            className="w-fit rounded text-sm text-slate-400 transition hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
