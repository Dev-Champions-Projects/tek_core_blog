"use client";

import {
  Calendar,
  Home,
  Inbox,
  Search,
  LogOut,
  ShieldIcon,
  X,
  Bookmark,
} from "lucide-react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Posts",
    url: "/posts",
    icon: Inbox,
  },
  {
    title: "Categories",
    url: "/categories",
    icon: Calendar,
  },
  {
    title: "Saved Posts",
    url: "/saved-posts",
    icon: Bookmark,
  },
];

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const { isMobile, setOpenMobile } = useSidebar();

  const closeMobileSidebar = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        {/* Sidebar Header */}
        <div className="flex min-h-16 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <ShieldIcon className="size-5 text-green-900" />

            <h2 className="text-lg font-semibold text-app-green">
              Admin Panel
            </h2>
          </div>

          {/* Mobile / Tablet Close Button */}
          {isMobile && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setOpenMobile(false)}
              className="size-9 shrink-0 rounded-md"
              aria-label="Close sidebar"
            >
              <X className="size-5" />
            </Button>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive =
                  pathname === item.url ||
                  (item.url !== "/dashboard" &&
                    pathname?.startsWith(`${item.url}/`));

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link
                        href={item.url}
                        onClick={(event) => {
                          /*
                           * If we're already on this page,
                           * don't navigate again.
                           *
                           * Just close the mobile sidebar.
                           */
                          if (isActive) {
                            event.preventDefault();
                            closeMobileSidebar();
                            return;
                          }

                          /*
                           * For another page, let Next.js Link
                           * perform normal client-side navigation.
                           */
                          closeMobileSidebar();
                        }}
                      >
                        <item.icon />

                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-3">
          <Button
            variant="outline"
            className="flex w-full cursor-pointer items-center justify-start gap-2 text-red-600 hover:text-red-500"
            onClick={async () => {
              await authClient.signOut();

              closeMobileSidebar();

              router.replace("/");
            }}
          >
            <LogOut className="size-4" />
            Logout
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
