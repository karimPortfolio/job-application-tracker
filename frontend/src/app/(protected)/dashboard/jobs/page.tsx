import { JobsClient } from "./JobsClient";

export async function generateMetadata() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Hirely'
  return {
    title: `Jobs - ${appName}`,
    description: 'Manage your company jobs effectively.',
  }
}

export default function JobsPage() {
  return <JobsClient />;
}