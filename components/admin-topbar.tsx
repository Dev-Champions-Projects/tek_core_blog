"use client";

import Link from "next/link";
import { Home, LayoutDashboard, LogOut, Menu } from "lucide-react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { getNameInitials } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useSidebar } from "@/components/ui/sidebar";

interface AdminTopbarProps {
  userName?: string | null;
  userImage?: string | null;
}

export default function AdminTopbar({ userName, userImage }: AdminTopbarProps) {
  const router = useRouter();
  const { toggleSidebar } = useSidebar();

  async function handleLogout() {
    await authClient.signOut();

    router.replace("/sign-in");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/95 px-3 backdrop-blur sm:px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Open navigation"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
        >
          <Menu className="h-5 w-5" />

          <span className="sr-only">Open navigation</span>
        </button>

        <div>
          <p className="text-sm font-semibold">Tek Core</p>

          <p className="hidden text-xs text-muted-foreground sm:block">
            Content dashboard
          </p>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label="Open account menu"
            className="rounded-full outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={userImage ?? undefined}
                alt={userName ?? "User"}
              />

              <AvatarFallback>
                {userName ? getNameInitials(userName) : "U"}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" sideOffset={8} className="w-56">
          <DropdownMenuLabel className="truncate">
            {userName ?? "My account"}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href="/dashboard">
              <LayoutDashboard />
              Dashboard
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/">
              <Home />
              Public site
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant="destructive"
            onSelect={() => {
              void handleLogout();
            }}
          >
            <LogOut />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
