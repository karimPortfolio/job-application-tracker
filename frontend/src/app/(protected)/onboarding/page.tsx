import { OnboardingClient } from "./OnboardingClient"

export async function generateMetadata() {
  return {
    title: `Onboarding`,
    description: 'Manage your job applications and track your career progress with ease.',
  }
}

export default function OnboardingPage() {
  return <OnboardingClient />
}
