import { getBlogPostBySlug, getRelatedPosts, updatePostViews } from "@/app/actions/blog";
import { getCommentsByPostId } from "@/app/actions/comments";
import RichTextViewer from "@/components/rich-text-viewer";
import CommentList from "@/components/comment-list";
import PostCard from "@/components/post-card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

// Render this page dynamically so comments and replies are always fresh
export const dynamic = "force-dynamic";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getBlogPostBySlug(slug);

  if (!post) return null;

  await updatePostViews(post.id);
  const comments = await getCommentsByPostId(post.id);
  // Ensure comment timestamps are strings for client components
  const serializedComments = comments.map((c: any) => ({
    ...c,
    createdAt: typeof c.createdAt === "string" ? c.createdAt : c.createdAt.toISOString(),
    replies: c.replies.map((r: any) => ({
      ...r,
      createdAt: typeof r.createdAt === "string" ? r.createdAt : r.createdAt.toISOString(),
    })),
  }));
  const relatedPosts = await getRelatedPosts(post.id, post.categoryId, post.tags);
 
  return (
    <div className="w-full flex flex-col items-center p-6 md:p-0">
      <div className="flex max-w-6xl flex-col gap-6 justify-center">
        <h1 className="text-2xl md:text-5xl font-semibold">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex gap-4 items-center">
            <div className="relative h-10 w-10 rounded-full overflow-hidden shadow-sm">
              <Image
                src={post.user.image && post.user.image.trim() !== "" ? post.user.image : "/default-avatar.png"}
                alt={post.user.name}
                className="object-cover"
                fill
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">{post.user.name}</span>
              <span className="text-xs text-neutral-500 font-medium">
                {format(post.createdAt, "MM/dd/yyyy")}
              </span>
            </div>
          </div>
          <Link href={`/blog/category/${post.categoryId}`} className="ml-auto rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-800 hover:bg-slate-200">
            {post.category?.name}
          </Link>
        </div>

        <div className="relative h-80 w-full overflow-hidden rounded-xl shadow-lg">
          <Image
            src={post.imageUrl}
            alt={post.title}
            className="rounded-xl object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="prose prose-slate max-w-none text-base dark:prose-invert">
          <RichTextViewer content={post.content} />
        </div>

        <div className="flex flex-wrap gap-2 py-6">
          {post.tags.map((tag) => (
            <Link href={`/blog/tag/${tag}`} key={tag}>
              <Badge variant="secondary">#{tag}</Badge>
            </Link>
          ))}
        </div>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-100 p-4 dark:bg-slate-950">
            <div>
              <h2 className="text-xl font-semibold">People are talking</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Leave a comment and reply to other readers.
              </p>
            </div>
          </div>
          <CommentList postId={post.id} comments={serializedComments as any} />
        </section>

        {relatedPosts.length > 0 ? (
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Related posts</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  More posts from this category and similar tags.
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {relatedPosts.map((relatedPost) => (
                <PostCard key={relatedPost.id} post={relatedPost} compact={true} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
