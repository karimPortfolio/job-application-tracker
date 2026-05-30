import { PageHeader } from "@/components/PageHeader";
import { BillingDetails } from "@/features/settings/components/company/BillingDetails";
import { UpdateCompanyForm } from "@/features/settings/components/company/UpdateCompanyForm";
import { SettingsBreadcrumb } from "@/features/settings/components/SettingsBreadcrumb";

export default function BillingPage() {
  return (
    <div className="w-full">
      <SettingsBreadcrumb pageTitle="Billing" />
      <PageHeader title="Billing" />
      <BillingDetails />
    </div>
  );
}
