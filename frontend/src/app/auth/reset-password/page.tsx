import ResetPasswordClient from './ResetPasswordClient'

export async function generateMetadata() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Hirely'
  return {
    title: `Reset password - ${appName}`,
    description: 'Enter your new password to regain access to your account.',
  }
}

export default function ResetPasswordPage() {
  return <ResetPasswordClient />
}
