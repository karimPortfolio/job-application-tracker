import { VerifyEmailClient } from "./VerifyEmailClient"

export async function generateMetadata() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Hirely'
  return {
    title: `Verify Email - ${appName}`,
    description: 'Please verify your email address to access all features of your account.',
  }
}

export default function VerifyEmailPage() {
  return <VerifyEmailClient />
}
