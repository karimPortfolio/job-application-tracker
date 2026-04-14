import { SecurityClient } from "./SecurityClient"

export async function generateMetadata() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Hirely'
  return {
    title: `Profile - ${appName}`,
    description: 'Manage your profile effectively.',
  }
}

export default function SecurityPage() {
    return <SecurityClient />
}

