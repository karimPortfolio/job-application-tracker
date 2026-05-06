import { Metadata } from "next";
import { JobsClient } from "./JobsClient";

export const metadata: Metadata = {
  title: 'Job Listings | Find Your Next Opportunity',
  description: 'Browse available job openings and start tracking your applications with Job Application Tracker. Organize and manage your job search effectively.',
  keywords: ['job listings', 'career opportunities', 'job search', 'job applications', 'hiring', 'employment'],
  openGraph: {
    title: 'Job Listings | Find Your Next Opportunity',
    description: 'Discover job openings and manage your applications in one place',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/jobs`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Job Listings | Find Your Next Opportunity',
    description: 'Browse job openings and track your applications',
  },
  robots: {
    index: true,
    follow: true,
  },
};
export default function JobsPage() {
  return (
    <main className="min-h-screen font-sans">
      <JobsClient />
    </main>
  );
}
