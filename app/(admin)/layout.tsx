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
      <div className="p-6 w-full">{children}</div>
    </SidebarProvider>
  );
}