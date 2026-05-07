import { Card } from "@/components/ui/card";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { Brain, NetworkIcon } from "lucide-react";

export function CultureSection() {
  return (
    <section className="py-26 px-6 font-sans bg-gray-50 dark:bg-[#131527] transition-colors duration-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <DirectionAwareHover
          className="!w-auto"
          imageUrl={"/images/company/green-offices.jpg"}
        >
          <p className="font-bold text-xl">Sustainable Growth</p>
          <p className="font-normal text-sm">
            Growing responsibly with nature-inspired, eco-conscious values
          </p>
        </DirectionAwareHover>

        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900 dark:text-white transition-colors">
            The Hirely Culture
          </h2>
          <p className="text-gray-600 dark:text-[#8B92A5] text-base leading-relaxed mb-12 max-w-lg transition-colors">
            We don't just build AI; we live the values of human-centric
            technology. Our workspace is an incubator for radical ideas and
            ethical engineering.
          </p>

          <div className="space-y-8">
            <div className="flex gap-4 group">
              <div className="mt-1">
                <NetworkIcon
                  className="w-6 h-6 text-blue-600 dark:text-blue-500 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors"
                  strokeWidth={2}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 transition-colors">
                  Radical Transparency
                </h3>
                <p className="text-gray-600 dark:text-[#8B92A5] text-sm leading-relaxed max-w-md transition-colors">
                  Every line of code and every strategic decision is open to
                  internal scrutiny, fostering a culture of trust.
                </p>
              </div>
            </div>

            <div className="flex gap-4 group">
              <div className="mt-1">
                <Brain
                  className="w-6 h-6 text-blue-600 dark:text-blue-500 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors"
                  strokeWidth={2}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 transition-colors">
                  Human-First AI
                </h3>
                <p className="text-gray-600 dark:text-[#8B92A5] text-sm leading-relaxed max-w-md transition-colors">
                  We prioritize human well-being and career fulfillment over raw
                  algorithmic output, ensuring technology serves people.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
