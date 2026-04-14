import { redirect } from "next/navigation"

export async function generateMetadata() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Hirely'
  return {
    title: `Profile - ${appName}`,
    description: 'Manage your profile effectively.',
  }
}

export default function ProfilePage() {
    return redirect('/dashboard/profile/general');
}
