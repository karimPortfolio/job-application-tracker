import { CompanyGuard } from "@/components/guards/CompanyGuard";
import { ProtectedAuthGuard } from "@/components/guards/ProtectedAuthGuard";
import { RecruiterRoleGuard } from "@/components/guards/RecruiterRoleGuard";
import { VerifiedGuard } from "@/components/guards/VerifiedGuard";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedAuthGuard>
      <VerifiedGuard>
        <RecruiterRoleGuard>
          <CompanyGuard>{children}</CompanyGuard>
        </RecruiterRoleGuard>
      </VerifiedGuard>
    </ProtectedAuthGuard>
  );
}
