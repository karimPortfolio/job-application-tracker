import ForgotPasswordClient from './ForgotPasswordClient'

export async function generateMetadata() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Hirely'
  return {
    title: `Forgot password - ${appName}`,
    description: 'Reset your password to regain access to your account.',
  }
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />
}
