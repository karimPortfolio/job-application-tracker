import { CompanyGuard } from "@/components/guards/CompanyGuard";
import { ProtectedAuthGuard } from "@/components/guards/ProtectedAuthGuard";
import { VerifiedGuard } from "@/components/guards/VerifiedGuard";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedAuthGuard>
      <VerifiedGuard>
        <CompanyGuard>{children}</CompanyGuard>
      </VerifiedGuard>
    </ProtectedAuthGuard>
  );
}
