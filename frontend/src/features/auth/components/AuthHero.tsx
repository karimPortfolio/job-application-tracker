import Image from "next/image";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import Silk from "@/components/Silk";

type AuthHeroProps = {
  appName?: string;
  headline?: string;
  subheadline?: string;
};

export default function AuthHero({
  appName = "Intevio",
  headline = "Design smarter spaces.",
  subheadline = "Seamless collaboration, visual approvals, and faster delivery for every project.",
}: AuthHeroProps) {
  return (
    <div className="relative hidden h-full rounded-lg min-h-[480px] w-full overflow-hidden bg-black text-white lg:block">
      <div className="absolute inset-0">
        <Silk
          speed={5}
          scale={0.9}
          color="#2550ad"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />

      <div className="relative z-10 flex h-full flex-col justify-between p-10">
        <div>
          <button
            onClick={() => (window.location.href = "/")}
            className="group mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-white/85 backdrop-blur transition hover:bg-white/25 hover:text-white hover:cursor-pointer"
          >
            <span className="inline-flex size-5 items-center justify-center transition-transform duration-200 group-hover:-translate-x-0.5">
              <ChevronLeftIcon className="size-3.5" />
            </span>
            <span>Back Home</span>
          </button>
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-4xl xl:text-5xl">
            {appName}
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/80 sm:text-lg">
            {headline}
          </p>
          <p className="mt-2 max-w-lg text-sm text-white/70 sm:text-base">
            {subheadline}
          </p>
        </div>

        <div className="flex items-center gap-3 text-sm text-white/70">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-sm font-semibold">
            24/7
          </span>
          <div>
            <p className="font-semibold text-white">Dedicated support</p>
            <p className="text-white/70">We're here to help you every step of the way.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
