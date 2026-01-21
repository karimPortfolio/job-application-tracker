import { CompanyGuard } from "@/components/guards/CompanyGuard";
import { ProtectedAuthGuard } from "@/components/guards/ProtectedAuthGuard";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedAuthGuard>
      <CompanyGuard>{children}</CompanyGuard>
    </ProtectedAuthGuard>
  );
}
