import { ProtectedAuthGuard } from "@/components/guards/ProtectedAuthGuard"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedAuthGuard>
        {children}
    </ProtectedAuthGuard>
  )
}
