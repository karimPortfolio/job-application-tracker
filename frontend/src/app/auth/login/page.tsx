import LoginClient from './LoginClient'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Hirely'

  return {
    title: `Login - ${appName}`,
    description: 'Login to your account to manage your job applications.',
  }
}

export default function LoginPage({ params }: { params: { locale: string } }) {
  return <LoginClient />
}
