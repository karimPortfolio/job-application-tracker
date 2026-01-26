import { DepartmentsClient } from "./DepartmentsClient"

export async function generateMetadata() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Hirely'
  return {
    title: `Departments - ${appName}`,
    description: 'Manage your company departments effectively.',
  }
}

export default function DepartmentsPage() {
  return <DepartmentsClient />
}
