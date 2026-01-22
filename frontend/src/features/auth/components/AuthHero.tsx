import Image from "next/image";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import Silk from "@/components/Silk";
import { ChevronLeft } from "lucide-react";
import { Logo } from "@/components/Logo";

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
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-4xl xl:text-5xl">
            <Logo width={170} height={70} disableDark={true} />
          </h1>
          <p className="mt-2 max-w-xl text-base text-white sm:text-lg">
            {headline}
          </p>
          <p className=" max-w-lg text-sm text-white/70 sm:text-base">
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
