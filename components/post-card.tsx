"use client";

import { Category, Post } from "@/lib/generated/prisma/client";
import { getPlainTextFromRichContent } from "@/lib/utils";
import { format } from "date-fns";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

interface PostProps {
  post: Post & { category: Category | null } & {
    user: {
      name: string;
      id: string;
      image: string | null;
      savedPosts: string[];
    };
  };
  compact?: boolean;
}

export default function PostCard({ post, compact }: PostProps) {
  const excerpt = getPlainTextFromRichContent(post.content);

  const handleArticleClick = () => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];

      if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: "select_content",
          content_type: "article",
          item_id: post.slug,
          item_name: post.title,
        });
      }
    }
  };

  return (
    <Link
      href={`/blog/posts/${post.slug}`}
      onClick={handleArticleClick}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
      aria-label={`Read article: ${post.title}`}
    >
      <Card className="relative h-full overflow-hidden border border-slate-200/80 bg-white/95 p-0 pb-3 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-sky-500/70">
        <div
          className={`relative overflow-hidden ${compact ? "h-24 sm:h-28 md:h-32" : "h-32 sm:h-40 md:h-48"}`}
        >
          {post.imageUrl ? (
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="100vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-sky-100 via-indigo-50 to-violet-100 text-sm font-semibold text-slate-600 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 dark:text-slate-200">
              Tech Story
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-transparent opacity-80" />
          <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-slate-900 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1 dark:bg-slate-900/80 dark:text-slate-100">
            Read article
            <MoveRight size={12} />
          </div>
        </div>

        <CardHeader className="px-4 pb-2 pt-4">
          <CardTitle
            className={`${
              compact
                ? "line-clamp-1 text-sm"
                : "line-clamp-2 text-base sm:text-lg"
            } font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-sky-700 dark:text-slate-50 dark:group-hover:text-sky-400`}
          >
            {post.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="px-4">
          <p
            className={`${
              compact ? "line-clamp-1 text-xs" : "line-clamp-3 text-sm"
            } text-slate-600 dark:text-slate-300`}
          >
            {excerpt}
          </p>

          {!compact && post.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="rounded-full border border-slate-200 bg-slate-100 text-[10px] font-medium text-slate-700 transition-colors duration-200 group-hover:border-sky-200 group-hover:bg-sky-50 group-hover:text-sky-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:group-hover:border-sky-500/70 dark:group-hover:bg-sky-500/10 dark:group-hover:text-sky-300"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-200/80 pt-3 dark:border-slate-700/80">
            <div className="flex min-w-0 items-center gap-2">
              <div
                className={`relative overflow-hidden rounded-full ${compact ? "h-6 w-6" : "h-8 w-8"}`}
              >
                <Image
                  src={post.user.image || "/default-avatar.png"}
                  alt={post.user.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                  {post.user.name}
                </p>
                {!compact && (
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    {format(post.createdAt, "dd MMM yyyy")}
                  </p>
                )}
              </div>
            </div>

            <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 transition-colors duration-200 group-hover:text-sky-700 dark:text-slate-200 dark:group-hover:text-sky-400">
              Read more
              <MoveRight size={14} />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
