"use client";

import { useEffect, useState, useTransition } from "react";

import { Bookmark, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { toggleSavedPost } from "@/app/actions/saved-posts";

interface SavePostButtonProps {
  postId: string;
  initialSaved?: boolean;
  className?: string;
}

export default function SavePostButton({
  postId,
  initialSaved = false,
  className = "",
}: SavePostButtonProps) {
  const router = useRouter();

  const [isSaved, setIsSaved] = useState(initialSaved);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsSaved(initialSaved);
  }, [initialSaved]);

  const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (isPending) return;

    startTransition(async () => {
      const result = await toggleSavedPost(postId);

      if (result.status === "unauthenticated") {
        alert("Please login to save posts.");
        return;
      }

      if (!result.success) {
        toast.error("Unable to update saved posts.");
        return;
      }

      setIsSaved(result.saved);

      if (result.saved) {
        toast.success("Post saved.");
      } else {
        toast.success("Post removed from saved posts.");
      }

      router.refresh();
    });
  };

  return (
    <button
      type="button"
      onClick={handleSave}
      disabled={isPending}
      aria-label={isSaved ? "Remove post from saved posts" : "Save post"}
      aria-pressed={isSaved}
      title={isSaved ? "Remove from saved posts" : "Save post"}
      className={`
        inline-flex
        size-10
        cursor-pointer
        items-center
        justify-center
        rounded-full
        border
        border-slate-200
        bg-white/95
        text-slate-700
        shadow-sm
        backdrop-blur
        transition-all
        hover:scale-105
        hover:bg-white
        hover:text-sky-700
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-sky-500
        disabled:cursor-not-allowed
        disabled:opacity-60
        dark:border-slate-700
        dark:bg-slate-900/95
        dark:text-slate-200
        ${className}
      `}
    >
      {isPending ? (
        <Loader2 className="size-5 animate-spin" />
      ) : (
        <Bookmark
          className={`size-5 ${isSaved ? "fill-current text-sky-600" : ""}`}
        />
      )}
    </button>
  );
}
