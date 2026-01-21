

export async function generateMetadata() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Hirely'

  return {
    title: `Dashboard`,
    description: 'Manage your job applications and track your career progress with ease.',
  }
}

export default function DashboardPage() {
  return (
    <div className="text-center mt-5">Dashboard</div>
  )
}
