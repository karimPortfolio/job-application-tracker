import { Sidebar } from "@/components/common/Sidebar"
import { DashboardNavbar } from "@/components/navbars/DahsboardNavbar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar />

        <div className="flex flex-col flex-1">
          <DashboardNavbar />
          <main className="flex-1 p-5 pt-0 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
