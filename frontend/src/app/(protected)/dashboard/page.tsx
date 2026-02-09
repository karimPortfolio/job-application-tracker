import { DashboardClient } from "./DashboardClient"


export async function generateMetadata() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Hirely'

  return {
    title: `Dashboard - ${appName}`,
    description: 'Manage your job applications and track your career progress with ease.',
  }
}

export default function DashboardPage() {
  return <DashboardClient />
}
