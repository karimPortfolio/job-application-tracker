import EmailVerificationClient from "./EmailVerificationClient";

export async function generateMetadata() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Hirely'

  return {
    title: `Email Verification - ${appName}`,
    description: 'Verify your email to activate your account.',
  }
}

export default function EmailVerificationPage() {
  return <EmailVerificationClient />;
}
