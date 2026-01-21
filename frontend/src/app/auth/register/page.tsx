import RegisterForm from '@/features/auth/components/RegisterForm'
import RegisterClient from './RegisterClient'

export async function generateMetadata() {
  return {
    title: 'Create your account',
    description: 'Sign up to start tracking your job applications and manage your career efficiently.',
  }
}

export default function RegisterPage() {
  return <RegisterClient />
}
