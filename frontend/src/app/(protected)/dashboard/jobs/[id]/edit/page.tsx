import { UpdateJobClient } from "./UpdateJobClient";

export async function generateMetadata() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Hirely'
  return {
    title: `Update Job - ${appName}`,
    description: 'Update and manage your company jobs effectively.',
  }
}

export default function UpdatePage() {
  return <UpdateJobClient />;
}
