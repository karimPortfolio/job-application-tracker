import { CompanyGuard } from "@/components/guards/CompanyGuard";
import { ProtectedAuthGuard } from "@/components/guards/ProtectedAuthGuard";
import { SubscriptionGuard } from "@/components/guards/SubscrpitionGuard";
import { VerifiedGuard } from "@/components/guards/VerifiedGuard";
import { redirect } from "next/navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedAuthGuard>
      <VerifiedGuard>
        <CompanyGuard>
          <SubscriptionGuard redirectTo="/pricing">
            {children}
          </SubscriptionGuard>
        </CompanyGuard>
      </VerifiedGuard>
    </ProtectedAuthGuard>
  );
}
