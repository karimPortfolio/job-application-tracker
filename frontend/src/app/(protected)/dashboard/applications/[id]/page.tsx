import { ApplicationDetailsClient } from "./ApplicationDetailsClient";

export async function generateMetadata() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Hirely'
  return {
    title: `Applications - ${appName}`,
    description: 'Manage your company applications effectively.',
  }
}

export default async function ApplicationDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ApplicationDetailsClient id={id} />
}

