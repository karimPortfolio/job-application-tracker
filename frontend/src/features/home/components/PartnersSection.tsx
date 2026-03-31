import LogoLoop from "@/components/LogoLoop";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function PartnersSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  const techLogos = [
    { node: <GoogleLogo />, title: "Google", href: "https://www.google.com" },
    { node: <MicrosoftLogo />, title: "Microsoft", href: "https://www.microsoft.com" },
    { node: <AmazonLogo />, title: "Amazon", href: "https://www.amazon.com" },
    { node: <FacebookLogo />, title: "Facebook", href: "https://www.facebook.com" },
    { node: <AppleLogo />, title: "Apple", href: "https://www.apple.com" },
    { node: <NetflixLogo />, title: "Netflix", href: "https://www.netflix.com" },
    { node: <TeslaLogo />, title: "Tesla", href: "https://www.tesla.com" },
    { node: <IBMLogo />, title: "IBM", href: "https://www.ibm.com" },
    { node: <IntelLogo />, title: "Intel", href: "https://www.intel.com" },
    { node: <OracleLogo />, title: "Oracle", href: "https://www.oracle.com" },
    { node: <SalesforceLogo />, title: "Salesforce", href: "https://www.salesforce.com" },
    { node: <AdobeLogo />, title: "Adobe", href: "https://www.adobe.com" },
    { node: <SpotifyLogo />, title: "Spotify", href: "https://www.spotify.com" },
  ];
  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setInView(entry.isIntersecting);
        });
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const widthClass = inView ? "lg:w-full" : "lg:w-3/4";

  return (
    <section className="w-full py-16">
      <div className="max-w-7xl mx-auto px-5">
        <div className="w-full flex justify-center " ref={containerRef}>
          <div
            className={`ring-8 ring-white/50 relative z-30 rounded-lg bottom-60 w-full ${widthClass} left-0 transition-all duration-700 ease-out overflow-visible before:content-[''] before:absolute before:-z-10 before:inset-[18%] before:blur-3xl before:opacity-80 before:rounded-[32px] before:bg-[radial-gradient(circle_at_20%_30%,rgba(37,80,173,0.55),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(77,116,201,0.5),transparent_50%),radial-gradient(circle_at_50%_50%,rgba(233,238,251,0.3),transparent_60%)] after:content-[''] after:absolute after:-z-10 after:inset-[-12%] after:blur-2xl after:opacity-70 after:rounded-[32px] after:bg-[linear-gradient(135deg,rgba(37,80,173,0.35),rgba(77,116,201,0.25),rgba(233,238,251,0.35))]`}
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
          {/* <LogoLoop
            logos={techLogos}
            speed={100}
            direction="left"
            logoHeight={60}
            gap={60}
            hoverSpeed={0}
            fadeOut
          /> */}
        </div>
      </div>
    </section>
  );
}

const GoogleLogo = () => (
    <Image
        src="/logos/google.png"
        alt="Google Logo"
        width={120}
        height={60}
        className="object-contain"
    />
);

const MicrosoftLogo = () => (
    <Image
        src="/logos/microsoft.png"
        alt="Microsoft Logo"
        width={120}
        height={60}
        className="object-contain"
    />
);

const AmazonLogo = () => (
    <Image
        src="/logos/amazon.png"
        alt="Amazon Logo"
        width={120}
        height={60}
        className="object-contain"
    />
);

const FacebookLogo = () => (
    <Image
        src="/logos/facebook.png"
        alt="Facebook Logo"
        width={120}
        height={60}
        className="object-contain"
    />
);

const AppleLogo = () => (  
    <Image
        src="/logos/apple.png"
        alt="Apple Logo"
        width={120}
        height={60}
        className="object-contain"
    />
);

const NetflixLogo = () => (
    <Image
        src="/logos/netflix.png"
        alt="Netflix Logo"
        width={120}
        height={60}
        className="object-contain"
    />
);

const TeslaLogo = () => (
    <Image
        src="/logos/tesla.png"
        alt="Tesla Logo"
        width={120}
        height={60}
        className="object-contain"
    />
);

const IBMLogo = () => (
    <Image
        src="/logos/ibm.png"
        alt="IBM Logo"
        width={120}
        height={60}
        className="object-contain"
    />
);

const IntelLogo = () => (
    <Image
        src="/logos/intel.png"
        alt="Intel Logo"
        width={120}
        height={60}
        className="object-contain"
    />
);

const OracleLogo = () => (
    <Image
        src="/logos/oracle.png"
        alt="Oracle Logo"
        width={120}
        height={60}
        className="object-contain"
    />
);

const SalesforceLogo = () => (
    <Image
        src="/logos/salesforce.png"
        alt="Salesforce Logo"
        width={120}
        height={60}
        className="object-contain"
    />
);

const AdobeLogo = () => (
    <Image
        src="/logos/adobe.png"
        alt="Adobe Logo"
        width={120}
        height={60}
        className="object-contain"
    />
);

const SpotifyLogo = () => (
    <Image
        src="/logos/spotify.png"
        alt="Spotify Logo"
        width={120}
        height={60}
        className="object-contain"
    />
);
