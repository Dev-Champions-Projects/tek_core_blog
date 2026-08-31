import { getCategoriesWithUser } from "@/app/actions/categories";
import { getPostsByUser } from "@/app/actions/posts";
import DashboardCard from "@/components/dashboard-card";
import DashboardCategories from "@/components/dashboard-categories";
import DashboardChart from "@/components/dashboard-chart";
import { authSession } from "@/lib/auth-utils";
import { Rocket } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  // await requireAuth();
  const session = await authSession();
  const posts = await getPostsByUser();
  const categories = await getCategoriesWithUser();

  const totalViews = posts.reduce((acc, item) => acc + item.views!, 0);

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">
            Hi, {session?.user.name}
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s an overview of your Tek Core content.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
        >
          Visit public site
          <Rocket className="size-4" />
        </Link>
      </div>

      <DashboardCard
        totalPosts={posts.length}
        totalCategories={categories.length}
        totalViews={totalViews}
      />

      <div className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-2">
        <DashboardChart data={posts} />

        <DashboardCategories categories={categories} />
      </div>
    </div>
  );
}
