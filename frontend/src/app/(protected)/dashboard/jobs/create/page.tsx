import { CreateJobClient } from "./CreateJobClient";

export async function generateMetadata() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Hirely'
  return {
    title: `Create Job - ${appName}`,
    description: 'Create and manage your company jobs effectively.',
  }
}

export default function CreatePage() {
  return <CreateJobClient />;
}
