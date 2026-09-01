export const dynamic = "force-dynamic";

import { AdminSidebarTrigger } from "@/components/admin-sidebar-trigger";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { requireAuth } from "@/lib/auth-utils";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth();

  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="min-w-0 flex-1">
        <div className="sticky top-0 z-30 flex h-14 items-center border-b bg-background/95 px-3 backdrop-blur sm:px-4 lg:hidden">
          <AdminSidebarTrigger />

          <span className="ml-3 text-sm font-semibold">Admin Panel</span>
        </div>

        <div className="w-full min-w-0 p-3 sm:p-4 lg:p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
