import { SavedJobsClient } from "@/features/saved-jobs/components/SavedJobsClient"

export async function generateMetadata() {
  return {
    title: `Saved Jobs - Job Application Tracker`,
    description: 'Manage your job applications and track your career progress with ease.',
  }
}

export default function SavedJobsPage() {
  return <SavedJobsClient />
}
