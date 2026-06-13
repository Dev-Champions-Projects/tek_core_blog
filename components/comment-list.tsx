"use client";

import { useEffect, useState } from "react";
import { createComment } from "@/app/actions/comments";
import { useRouter } from "next/navigation";
import CommentItem from "./comment-item";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";

interface CommentAuthor {
  id: string;
  name: string;
  image?: string | null;
}

interface CommentProps {
  id: string;
  content: string;
  author: CommentAuthor;
  createdAt: string;
  replies: Array<{
    id: string;
    content: string;
    author: CommentAuthor;
    createdAt: string;
  }>;
}

interface CommentListProps {
  postId: string;
  comments: CommentProps[];
}

export default function CommentList({ postId, comments }: CommentListProps) {
  const router = useRouter();
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authClient.getSession();
        // better-auth returns { data: session } or { data: null }
        setIsSignedIn(Boolean(response?.data?.user));
      } catch (err) {
        setIsSignedIn(false);
      }
    };

    void checkAuth();
  }, []);

  const handleSubmit = async () => {
    if (!commentText.trim()) return;

    setIsSubmitting(true);
    try {
      await createComment(postId, commentText);
      setCommentText("");
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-950">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Comments</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Join the discussion and reply to other readers.
        </p>
      </div>

      {isSignedIn ? (
        <div className="space-y-3">
          <Textarea
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            placeholder="Write a comment..."
          />
          <div className="flex justify-end">
            <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : "Post comment"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          <p>You must be signed in to post a comment.</p>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Sign in or create an account to participate in the discussion.</p>
        </div>
      )}

      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem key={comment.id} {...comment} postId={postId} />
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
            No comments yet. Be the first to leave a thought.
          </div>
        )}
      </div>
    </div>
  );
}
