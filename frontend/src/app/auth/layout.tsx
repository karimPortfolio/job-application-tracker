import { PublicAuthGuard } from "@/components/guards/PublicAuthGuard";
import { Toaster } from "@/components/ui/sonner";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PublicAuthGuard>
      {children}
      <Toaster richColors closeButton position="top-right" />
    </PublicAuthGuard>
  );
}
