import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { LOGOS } from "../constants/home.constants";

export const CreateJobMarketingSection = () => {
  return (
    <section className="relative w-full min-h-175 bg-blue-300/80 overflow-hidden pt-20 px-4">
      <div className="mb-20 relative z-20 flex flex-col justify-center items-center w-full">
        <h2 className="mb-4 text-center text-4xl md:text-5xl font-bold text-slate-950 md:max-w-3/4 lg:max-w-3xl">
          Post your job ad to hundreds of job boards. With a single click.
        </h2>
        <p className="mb-8 text-center md:text-lg text-slate-700">
          Discover your next career move with our curated job listings.
        </p>
        <div className="flex items-center justify-center">
          <Link href="dashboard/jobs">
            <Button size="lg" className="p-6 px-10">
              Create Job
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center">
        {/* Background/Floating Logos Container */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          {/* Left Side Logos */}
          <div className="absolute left-[-5%] top-110 md:top-1/2 -translate-y-1/2 grid grid-cols-3 gap-6 opacity-40 md:opacity-100 rotate-12 scale-90">
            {LOGOS.slice(0, 9).map((logo, i) => (
              <div
                key={i}
                className="flex h-16 w-16 transform items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 shadow-lg transition-transform hover:scale-110 dark:border-slate-700 dark:bg-slate-900 md:h-20 md:w-20"
              >
                <img
                  src={logo.url}
                  alt={logo.name}
                  loading="lazy"
                  className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </div>

          {/* Right Side Logos */}
          <div className="absolute right-[-5%] top-110 md:top-1/2 -translate-y-1/2 grid grid-cols-3 gap-6 opacity-40 md:opacity-100 -rotate-12 scale-90">
            {LOGOS.slice(3, 12).map((logo, i) => (
              <div
                key={i}
                className="flex h-16 w-16 transform items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 shadow-lg transition-transform hover:scale-110 dark:border-slate-700 dark:bg-slate-900 md:h-20 md:w-20"
              >
                <img
                  src={logo.url}
                  alt={logo.name}
                  className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Central Job Card */}
        <Card className="relative top-7 z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900 md:p-10">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content (2/3 width) */}
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-200 flex items-center justify-center text-rose-600 font-bold text-xs p-2">
                  Acme
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Acme Inc.</p>
                  <div className="h-1.5 w-24 rounded-full bg-gray-100 dark:bg-gray-700" />
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  Senior Project Manager (m/f/d)
                </h2>
                <p className="font-medium text-slate-500 dark:text-slate-400">Berlin, Germany</p>
              </div>

              {/* Sections with Skeletons */}
              {["About", "Tasks", "Requirements"].map((title) => (
                <div key={title} className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    {title}
                  </h3>
                  <div className="space-y-2">
                    <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-slate-700" />
                    <div className="h-2 w-4/5 rounded-full bg-gray-100 dark:bg-slate-700" />
                    <div className="h-2 w-2/3 rounded-full bg-gray-100 dark:bg-slate-700" />
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar Area (1/3 width) */}
            <div className="space-y-4">
              {/* Form Card */}
              <div className="space-y-4 rounded-2xl border border-gray-200 bg-gray-50/70 p-6 dark:border-slate-700 dark:bg-slate-800/80">
                <div className="space-y-3">
                  <div className="h-8 w-full rounded-md border border-gray-200 bg-white shadow-sm dark:border-slate-600 dark:bg-slate-700" />
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-8 rounded-md border border-gray-200 bg-white shadow-sm dark:border-slate-600 dark:bg-slate-700" />
                    <div className="h-8 rounded-md border border-gray-200 bg-white shadow-sm dark:border-slate-600 dark:bg-slate-700" />
                  </div>
                  <div className="h-20 w-full rounded-md border border-gray-200 bg-white shadow-sm dark:border-slate-600 dark:bg-slate-700" />
                </div>
                <Button className="w-full rounded-xl bg-primary py-6 text-lg font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 dark:shadow-blue-900/40">
                  Apply Now
                </Button>
              </div>

              {/* Recruiter Card */}
              <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/90">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="h-2 w-20 rounded-full bg-gray-200 dark:bg-slate-600" />
                  <div className="h-2 w-32 rounded-full bg-gray-100 dark:bg-slate-700" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

