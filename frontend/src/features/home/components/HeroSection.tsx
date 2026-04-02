import StarBorder from "@/components/StarBorder";
import { Button } from "@/components/ui/button";
import { User } from "@/features/auth/types";
import Link from "next/link";

interface HeroSectionProps {
  user: User | null;
  headline: string;
  description?: string;
  link?: string;
  linkLabel?: string;
  secondaryLink?: string;
  secondaryLinkLabel?: string;
}

export function HeroSection({
  user,
  headline,
  description,
  link,
  linkLabel,
  secondaryLink,
  secondaryLinkLabel,
}: HeroSectionProps) {
  return (
    <section className="py-12 absolute h-screen w-full z-20 top-0 left-0">
      <div className="container mx-auto px-4 text-center flex flex-col justify-center items-center h-full">
        <h1 className="text-5xl text-primary dark:text-white font-bold mb-4">
          {headline}
        </h1>
        <div className="w-full flex justify-center">
          {description && (
            <p className="text-md text-gray-700 dark:text-gray-400 mb-8 md:w-2/4">
              {description}
            </p>
          )}
        </div>
        <div className="flex " >
          {link && linkLabel && (
            <Link href={link}>
              <Button size="lg">
                <span className="relative text-sm z-10">{linkLabel}</span>
              </Button>
            </Link>
          )}
          {secondaryLink && secondaryLinkLabel && (
            <Link href={secondaryLink} className="ml-4">
              <Button variant="outline" size="lg">
                <span className="relative z-10">{secondaryLinkLabel}</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
