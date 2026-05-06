import { Card } from "@/components/ui/card";
import { NetworkIcon, UserCheck } from "lucide-react";


export function CultureSection() {
  return (
    <section className="min-h-screen py-20 px-6 font-sans bg-gray-50 dark:bg-[#131527] transition-colors duration-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* --- LEFT COLUMN: Visual Grid --- */}
        <div className="grid grid-cols-2 gap-4 h-[500px]">
          {/* Top Left: Team Image */}
          <Card className="col-span-1 row-span-1 overflow-hidden border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none bg-white dark:bg-[#1D213A] rounded-[1.5rem]">
            <div
              className="w-full h-full bg-cover bg-center grayscale opacity-80 dark:opacity-60 mix-blend-multiply dark:mix-blend-normal"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop')",
              }}
            />
          </Card>

          {/* Right: Abstract Glowing Graphic (Spans 2 rows) */}
          <Card className="col-span-1 row-span-2 overflow-hidden border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none bg-white dark:bg-[#1D213A] rounded-[1.5rem] relative flex items-center justify-center">
            {/* Simulating the glowing radar/eye effect */}
            <div className="absolute w-[80%] h-[80%] rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center">
              <div className="w-[70%] h-[70%] rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center">
                <div className="w-[40%] h-[40%] rounded-full border border-gray-300 dark:border-white/20 bg-gray-100 dark:bg-white/5 shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)] dark:shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse"></div>
                </div>
              </div>
            </div>
          </Card>

          {/* Bottom Left: "SAFE WORK" Badge */}
          <Card className="col-span-1 row-span-1 border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none bg-white dark:bg-[#1D213A] rounded-[1.5rem] flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border border-gray-300 dark:border-gray-700 shadow-[inset_0_4px_10px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_4px_10px_rgba(0,0,0,0.4)] flex items-center justify-center flex-col leading-tight">
              <span className="text-gray-500 dark:text-gray-400 font-bold text-xs tracking-widest uppercase">
                Safe
              </span>
              <span className="text-gray-500 dark:text-gray-400 font-bold text-xs tracking-widest uppercase">
                Work
              </span>
            </div>
          </Card>
        </div>

        {/* --- RIGHT COLUMN: Text Content --- */}
        <div>
          {/* Section Badge */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gray-200 dark:bg-[#1B1E36] border border-gray-300 dark:border-[#2D3154] mb-6 transition-colors">
            <span className="text-xs font-semibold text-gray-700 dark:text-slate-300 tracking-wide">
              Inside Hirely
            </span>
          </div>

          {/* Headings */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900 dark:text-white transition-colors">
            The Hirely Culture
          </h2>
          <p className="text-gray-600 dark:text-[#8B92A5] text-base leading-relaxed mb-12 max-w-lg transition-colors">
            We don't just build AI; we live the values of human-centric
            technology. Our workspace is an incubator for radical ideas and
            ethical engineering.
          </p>

          {/* Features List */}
          <div className="space-y-8">
            {/* Feature 1 */}
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

            {/* Feature 2 */}
            <div className="flex gap-4 group">
              <div className="mt-1">
                <UserCheck 
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
