"use client";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  LogOut,
  ShieldIcon,
} from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

import { usePathname, useRouter } from "next/navigation";

// Menu items.
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
    url: "saved-posts",
    icon: Search,
  },
];

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Sidebar className="pt-12">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-4 border-b border-app-border">
            <h2 className="text-lg font-semibold text-app-green flex items-center gap-1 mb-2">
              <ShieldIcon className="size-5 text-green-900" /> Admin Panel
            </h2>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url || pathname?.startsWith(item.url + "/");
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.url}>
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
        {/* Logout Button */}
        <div className="mt-2">
          <Button
            variant="outline"
            className="w-full text-red-600 hover:text-red-400 cursor-pointer flex items-center gap-2 justify-start"
            onClick={async () => {
              await authClient.signOut();
              // window.location.href = "/sign-in";
              router.push("/");
            }}
          >
            <LogOut className="mr-2" />
            Logout
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
