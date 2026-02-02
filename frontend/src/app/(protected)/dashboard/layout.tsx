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
      <div className="flex min-h-screen w-full min-w-0">
        <Sidebar />

        <div className="flex flex-col flex-1 min-w-0">
          <DashboardNavbar />
          <main className="flex-1 min-w-0 p-5 pt-0">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
