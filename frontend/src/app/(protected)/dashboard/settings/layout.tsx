import { SettingsSidebar } from "@/components/common/SettingsSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function SettingsPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="gap-10">
      <SettingsSidebar />
      <section className="flex-1">{children}</section>
    </SidebarProvider>
  );
}
