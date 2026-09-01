import Link from "next/link";

import { ArrowLeft, Bookmark } from "lucide-react";

import { getSavedPosts } from "@/app/actions/saved-posts";

import PostCard from "@/components/post-card";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function SavedPostsPage() {
  const savedPosts = await getSavedPosts();

  return (
    <div className="mx-auto w-full max-w-7xl px-1 py-6 sm:px-2 lg:px-6">
      <div className="mb-8 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-full bg-slate-900 text-white">
            <Bookmark className="size-5" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Saved Posts
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Articles you saved for later.
            </p>
          </div>
        </div>
      </div>

      {savedPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {savedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div
          className="
            flex
            min-h-[380px]
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-slate-300
            bg-slate-50/60
            px-6
            text-center
          "
        >
          <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-white shadow-sm">
            <Bookmark className="size-7 text-slate-500" />
          </div>

          <h2 className="text-xl font-semibold text-slate-900">
            No saved posts yet
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            When you find an article you want to read later, click the bookmark
            icon and it will appear here.
          </p>

          <Button asChild variant="outline" className="mt-6 rounded-full">
            <Link href="/">
              <ArrowLeft className="mr-2 size-4" />
              Browse articles
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
