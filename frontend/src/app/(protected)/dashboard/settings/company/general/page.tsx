import { PageHeader } from "@/components/PageHeader";
import { UpdateCompanyForm } from "@/features/settings/components/company/UpdateCompanyForm";
import { SettingsBreadcrumb } from "@/features/settings/components/SettingsBreadcrumb";

export default function GeneralPage() {
  return (
    <div className="w-full">
      <SettingsBreadcrumb pageTitle="General Informations" />
      <PageHeader title="General Informations" />
      <UpdateCompanyForm />
    </div>
  );
}
