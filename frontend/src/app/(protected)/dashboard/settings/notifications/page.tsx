import { PageHeader } from "@/components/PageHeader";
import { NotificationsForm } from "@/features/settings/components/preferences/NotificationsForm";
import { SettingsBreadcrumb } from "@/features/settings/components/SettingsBreadcrumb";

export default function NotificationsPage() {
  return (
    <div className="w-full">
      <SettingsBreadcrumb pageTitle="Notifications" />
      <PageHeader
        title="Notifications"
        // description="Control your alert settings and stay up to date on your workspace activity. Select which updates you receive via email, in-app badges, or marketing notifications."
      />
      <NotificationsForm />
    </div>
  );
}
