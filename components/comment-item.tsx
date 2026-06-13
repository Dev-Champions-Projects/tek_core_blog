"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createComment } from "@/app/actions/comments";
import { authClient } from "@/lib/auth-client";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface CommentAuthor {
  id: string;
  name: string;
  image?: string | null;
}

interface CommentItemProps {
  id: string;
  content: string;
  author: CommentAuthor;
  createdAt: string | Date;
  replies: Array<{
    id: string;
    content: string;
    author: CommentAuthor;
    createdAt: string | Date;
  }>;
  postId: string;
}

export default function CommentItem({
  id,
  content,
  author,
  createdAt,
  replies,
  postId,
}: CommentItemProps) {
  const router = useRouter();
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const raw = (await authClient.getSession()) as any;
        // better-auth returns { data: session } or { data: null }
        const session = raw?.data ?? null;
        setIsSignedIn(Boolean(session));
      } catch {
        setIsSignedIn(false);
      }
    };

    void checkAuth();
  }, []);

  const handleReply = async () => {
    if (!replyText.trim() || !isSignedIn) return;
    setSubmitting(true);
    try {
      await createComment(postId, replyText, id);
      setReplyText("");
      setReplying(false);
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-start gap-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-slate-100">
          <Image
            src={author.image || "/default-avatar.png"}
            alt={author.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold">{author.name}</span>
            <Badge variant="secondary">Comment</Badge>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {content}
          </p>
          <div className="mt-3 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span>{new Date(createdAt).toLocaleString()}</span>
            <button
              type="button"
              className="font-medium text-sky-600 hover:text-sky-700"
              onClick={() => setReplying((value) => !value)}
            >
              Reply
            </button>
          </div>
        </div>
      </div>

      {replying ? (
        <div className="space-y-2 rounded border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
          {isSignedIn ? (
            <>
              <Textarea
                value={replyText}
                onChange={(event) => setReplyText(event.target.value)}
                placeholder="Write your reply..."
              />
              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={handleReply}
                  disabled={submitting}
                >
                  {submitting ? "Replying..." : "Reply"}
                </Button>
              </div>
            </>
          ) : (
            <div className="rounded-md border border-slate-200 bg-white p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              <p>You need to sign in to reply to comments.</p>
            </div>
          )}
        </div>
      ) : null}

      {replies.length > 0 ? (
        <div className="space-y-3 border-l border-slate-200 pl-4 dark:border-slate-700">
          {replies.map((reply) => (
            <div key={reply.id} className="space-y-2 rounded-lg bg-slate-50 p-3 dark:bg-slate-950">
              <div className="flex items-center gap-3 text-sm font-semibold">
                <span>{reply.author.name}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {new Date(reply.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300">{reply.content}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
