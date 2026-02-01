"use client";

import Link from 'next/link';
import { ArrowLeft, Compass, Home, LogIn, Map, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Logo } from '@/components/Logo';

export default function ForbiddenClient() {
  const { user, initialized } = useAuth();

  const quickLinks = [
    { href: '/', label: 'Back to home', icon: Home },
    user
      ? { href: '/dashboard', label: 'Open dashboard', icon: Compass }
      : { href: '/auth/login', label: 'Sign in', icon: LogIn },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#c7d2fe,transparent_35%),radial-gradient(circle_at_80%_0%,#fde68a,transparent_25%),radial-gradient(circle_at_40%_80%,#fecdd3,transparent_30%)] dark:bg-[radial-gradient(circle_at_20%_20%,#312e81,transparent_35%),radial-gradient(circle_at_80%_0%,#0f172a,transparent_25%),radial-gradient(circle_at_40%_80%,#1f2937,transparent_30%)]">
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-white/90 dark:from-black/60 dark:via-black/40 dark:to-black/70" />
      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-20">
        <div className='flex justify-center mb-5'>
            <Logo width={210} height={80} />
        </div>
        <div className="mb-10 flex flex-wrap items-center gap-3 rounded-full border border-white/40 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 backdrop-blur-md shadow-sm dark:border-white/5 dark:bg-white/10 dark:text-slate-100">
          <Sparkles className="h-4 w-4" />
        Access Forbidden
        </div>

        <div className="w-full overflow-hidden rounded-2xl border border-white/60 bg-white/90 p-8 shadow-[0_25px_70px_-25px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="space-y-4 md:max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-200">403</p>
              <h1 className="text-4xl font-bold leading-tight text-slate-900 dark:text-white md:text-5xl">
                You do not have permission to access this page.
              </h1>
              <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
                You do not have permission to access this page. Use the quick links below to get back on track.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/">
                    <ArrowLeft className="h-4 w-4" />
                    Go back home
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" disabled={!initialized}>
                  <Link href={user ? '/dashboard' : '/auth/login'}>
                    {!initialized ? <Spinner className="h-4 w-4" /> : null}
                    {initialized ? (user ? 'Open dashboard' : 'Sign in') : 'Loading...'}
                  </Link>
                </Button>
              </div>
            </div>

            <div className="mt-4 grid w-full max-w-xs grid-cols-1 gap-3 md:mt-0">
              {quickLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-center justify-between rounded-xl border border-slate-200/70 bg-white/70 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:hover:border-white/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-800 ring-1 ring-black/5 transition group-hover:bg-white group-hover:text-slate-900 dark:bg-white/10 dark:text-white/80 dark:ring-white/5 dark:group-hover:bg-white/15">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span>{label}</span>
                  </div>
                  <Map className="h-4 w-4 text-slate-400 transition group-hover:text-slate-600 dark:text-white/30 dark:group-hover:text-white/60" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
