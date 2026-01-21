import RegisterForm from '@/features/auth/components/RegisterForm'
import RegisterClient from './RegisterClient'

export async function generateMetadata() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Hirely'

  return {
    title: `Sign Up - ${appName}`,
    description: 'Sign up to start tracking your job applications and manage your career efficiently.',
  }
}

export default function RegisterPage() {
  return <RegisterClient />
}
