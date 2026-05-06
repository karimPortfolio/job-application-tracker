import { Metadata } from "next";
import { HomeClient } from "./HomeClient";

export const metadata: Metadata = {
  title: 'Job Application Tracker | Manage Your Job Search Effortlessly',
  description: 'Track, organize, and manage all your job applications in one place. Job Application Tracker helps you stay on top of your job search with an intuitive and simple interface.',
  keywords: ['job application tracker', 'job search management', 'career tracker', 'application tracker', 'job management', 'job organization'],
  openGraph: {
    title: 'Job Application Tracker | Manage Your Job Search Effortlessly',
    description: 'Track and organize all your job applications in one place',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Job Application Tracker | Manage Your Job Search',
    description: 'Track and organize all your job applications effortlessly',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center font-sans">
      <HomeClient />
    </main>
  );
}
