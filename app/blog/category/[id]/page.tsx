import { getPostsByCategory } from "@/app/actions/blog";
import { getCategoryById } from "@/app/actions/categories";

import Header from "@/components/header";
import Pagination from "@/components/pagination";
import PostCard from "@/components/post-card";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import { Button } from "@/components/ui/button";

import { ArrowLeft, Clock3, FolderOpen } from "lucide-react";

import Link from "next/link";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const searchArgs = await searchParams;

  const page = Number(searchArgs.page) || 1;

  const [{ posts, totalPages, currentPage }, category] = await Promise.all([
    getPostsByCategory(id, page),
    getCategoryById(id),
  ]);

  return (
    <>
      <Header about={category?.name} />

      <main className="min-h-[60vh]">
        {posts.length > 0 ? (
          <>
            <div
              className="
                container
                mx-auto
                my-8
                grid
                grid-cols-1
                gap-6
                p-4
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
              "
            >
              {posts.map((post) => (
                <PostCard post={post} key={post.id} />
              ))}
            </div>

            <Pagination
              page={page}
              currentPage={currentPage}
              totalPages={totalPages}
              pageUrl={`/blog/category/${id}`}
            />
          </>
        ) : (
          <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
            <Empty
              className="
                mx-auto
                min-h-[360px]
                max-w-3xl
                border
                border-dashed
                border-slate-200
                bg-slate-50/50
                px-5
                py-12
                sm:px-10
                sm:py-16
              "
            >
              <EmptyMedia
                variant="icon"
                className="
                  size-16
                  rounded-full
                  bg-slate-900
                  text-white
                  [&_svg]:size-7
                "
              >
                <FolderOpen />
              </EmptyMedia>

              <EmptyHeader>
                <EmptyTitle className="text-xl font-semibold text-slate-900 sm:text-2xl">
                  Nothing here just yet
                </EmptyTitle>

                <EmptyDescription className="max-w-md text-sm leading-6 text-slate-500 sm:text-base">
                  There are currently no articles available
                  {category?.name
                    ? ` in ${category.name}`
                    : " in this category"}
                  . We&apos;re working on new content, so please check back
                  again soon.
                </EmptyDescription>
              </EmptyHeader>

              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-slate-500 shadow-sm ring-1 ring-slate-200 sm:text-sm">
                <Clock3 className="size-4" />

                <span>New content is coming soon</span>
              </div>

              <EmptyContent>
                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-full px-5"
                >
                  <Link href="/">
                    <ArrowLeft className="mr-2 size-4" />
                    Explore other articles
                  </Link>
                </Button>
              </EmptyContent>
            </Empty>
          </div>
        )}
      </main>
    </>
  );
}
