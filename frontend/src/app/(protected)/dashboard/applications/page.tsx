import { ApplicationsClient } from "./ApplicationsClient";

export async function generateMetadata() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Hirely'
  return {
    title: `Applications - ${appName}`,
    description: 'Manage your company applications effectively.',
  }
}

export default function ApplicationsPage() {
  return <ApplicationsClient />;
}