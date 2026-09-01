"use client";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

export function AdminSidebarTrigger() {
  const { toggleSidebar, openMobile } = useSidebar();

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="lg:hidden"
      onClick={toggleSidebar}
      aria-label={
        openMobile ? "Close admin navigation" : "Open admin navigation"
      }
      aria-expanded={openMobile}
    >
      <Menu className="size-5" />
    </Button>
  );
}
