import { PublicAuthGuard } from "@/components/guards/PublicAuthGuard";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PublicAuthGuard>
      {children}
    </PublicAuthGuard>
  );
}
