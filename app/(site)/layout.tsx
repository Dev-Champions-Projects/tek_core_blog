import { Suspense } from "react";

import Footer from "@/components/footer";
import { SiteNavbar } from "@/components/site-navbar";
import { NavbarSkeleton } from "@/components/loading-skeletons";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh w-full flex-col">
      <Suspense fallback={<NavbarSkeleton />}>
        <SiteNavbar />
      </Suspense>

      <main className="min-w-0 flex-1">{children}</main>

      <Footer />
    </div>
  );
}
