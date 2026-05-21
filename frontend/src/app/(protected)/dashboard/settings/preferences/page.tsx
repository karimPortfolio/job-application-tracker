import { PageHeader } from "@/components/PageHeader";
import { ThemeForm } from "@/features/settings/components/preferences/ThemeForm";
import { SettingsBreadcrumb } from "@/features/settings/components/SettingsBreadcrumb";

export default function PreferencesPage() {
  return (
    <div className="w-full">
      <SettingsBreadcrumb pageTitle="Preferences" />
      <PageHeader title="Preferences" />
      <ThemeForm />
    </div>
  );
}
