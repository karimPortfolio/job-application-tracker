import LogoLoop from "@/components/LogoLoop";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function PartnersSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  const techLogos = [
    {
      node: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
          alt="Google Logo"
          className="h-12 w-auto object-contain"
        />
      ),
      title: "Google",
      href: "https://www.google.com",
    },
    {
      node: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg"
          alt="Microsoft Logo"
          className="h-12 w-auto object-contain"
        />
      ),
      title: "Microsoft",
      href: "https://www.microsoft.com",
    },
    {
      node: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon Logo"
          className="h-12 w-auto object-contain"
        />
      ),
      title: "Amazon",
      href: "https://www.amazon.com",
    },
    {
      node: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
          className="h-12 w-auto object-contain"
        />
      ),
      title: "Netflix",
      href: "https://www.netflix.com",
    },
    {
      node: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg"
          alt="Tesla Logo"
          className="h-12 w-auto object-contain"
        />
      ),
      title: "Tesla",
      href: "https://www.tesla.com",
    },
    {
      node: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
          alt="IBM Logo"
          className="h-12 w-auto object-contain"
        />
      ),
      title: "IBM",
      href: "https://www.ibm.com",
    },
    {
      node: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg"
          alt="Oracle Logo"
          className="h-12 w-auto object-contain"
        />
      ),
      title: "Oracle",
      href: "https://www.oracle.com",
    },
    {
      node: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
          alt="Spotify Logo"
          className="h-12 w-auto object-contain"
        />
      ),
      title: "Spotify",
      href: "https://www.spotify.com",
    },
  ];
  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setInView(entry.isIntersecting);
        });
      },
      { threshold: 0.35 },
    );
    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, []);

  const widthClass = inView ? "lg:w-full" : "lg:w-3/4";

  return (
    <section className="w-full py-16">
      <div className="max-w-7xl mx-auto px-5">
        <div className="w-full flex justify-center " ref={containerRef}>
          <div
            className={`hidden md:block border-8 border-white/20 ring-1 ring-white/30 relative z-30 rounded-2xl bottom-60 w-full ${widthClass} left-0 transition-all duration-700 ease-out overflow-visible before:content-[''] before:absolute before:-z-10 before:inset-[18%] before:blur-3xl before:opacity-80 before:rounded-[32px] before:bg-[radial-gradient(circle_at_20%_30%,rgba(37,80,173,0.55),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(77,116,201,0.5),transparent_50%),radial-gradient(circle_at_50%_50%,rgba(233,238,251,0.3),transparent_60%)] after:content-[''] after:absolute after:-z-10 after:inset-[-12%] after:blur-2xl after:opacity-70 after:rounded-[32px] after:bg-[linear-gradient(135deg,rgba(37,80,173,0.35),rgba(77,116,201,0.25),rgba(233,238,251,0.35))]`}
          >
            <Image
              src="/images/applications-page.png"
              alt="Applications Page"
              width={1200}
              height={600}
              className="rounded-lg"
            />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center mb-10">
          Trusted by Leading Companies
        </h2>
        <div className="w-full">
          <LogoLoop
            logos={techLogos}
            speed={120}
            hoverSpeed={60}
            pauseOnHover
            fadeOut
            logoHeight={48}
            className="gap-14"
            ariaLabel="Partner logos"
          />
        </div>
      </div>
    </section>
  );
}