import { getCategoriesWithUser } from "@/app/actions/categories";
import { getPostsByUser } from "@/app/actions/posts";

import DashboardCard from "@/components/dashboard-card";
import DashboardCategories from "@/components/dashboard-categories";
import DashboardChart from "@/components/dashboard-chart";

import { authSession } from "@/lib/auth-utils";

import { Rocket } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await authSession();

  const [postsResult, categoriesResult] = await Promise.all([
    getPostsByUser(),
    getCategoriesWithUser(),
  ]);

  const posts = Array.isArray(postsResult) ? postsResult : [];

  const categories = Array.isArray(categoriesResult) ? categoriesResult : [];

  const totalViews = posts.reduce(
    (total, post) => total + (post.views ?? 0),
    0,
  );

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex w-full flex-col gap-4 px-1 py-6 sm:px-2 sm:py-8 lg:gap-6 lg:px-6 lg:py-12">
        <Link
          href="/"
          className="flex w-fit items-center gap-2 font-medium text-blue-600 transition-colors hover:text-blue-700"
        >
          <span>Visit public site</span>
          <Rocket className="size-5" />
        </Link>

        <h1 className="text-2xl font-semibold">
          Hi, {session?.user?.name ?? "Admin"}
        </h1>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <DashboardCard
            totalPosts={posts.length}
            totalCategories={categories.length}
            totalViews={totalViews}
          />
        </div>

        <div className="px-0 sm:px-2 lg:px-6">
          <div className="grid w-full grid-cols-1 items-stretch gap-5 xl:grid-cols-2">
            <DashboardChart data={posts} />

            <DashboardCategories categories={categories} />
          </div>
        </div>
      </div>
    </div>
  );
}
