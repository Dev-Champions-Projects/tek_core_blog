import { Skeleton } from "@/components/ui/skeleton";

/* Helper component for animated skeleton */
function AnimatedSkeleton({ className }: { className: string }) {
  return (
    <div className="relative overflow-hidden">
      <Skeleton className={className} />
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}

/* ---------------- NAVBAR ---------------- */

export function NavbarSkeleton() {
  return (
    <div className="mx-auto my-5 w-full max-w-7xl px-3 sm:px-4">
      <div className="flex h-16 items-center justify-between rounded-md bg-white px-3 shadow-md">
        <AnimatedSkeleton className="h-6 w-24" />

        <div className="hidden items-center gap-6 md:flex">
          <AnimatedSkeleton className="h-4 w-16" />
          <AnimatedSkeleton className="h-9 w-28 rounded-lg" />
        </div>

        <div className="flex items-center gap-3">
          <AnimatedSkeleton className="h-10 w-10 rounded-full" />
          <AnimatedSkeleton className="h-11 w-16 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

/* ---------------- HEADER ---------------- */

export function HeaderSkeleton() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex min-h-[240px] w-full flex-col items-center justify-center gap-4 rounded-md bg-slate-950 px-6">
        <AnimatedSkeleton className="h-7 w-full max-w-xl bg-slate-800" />
        <AnimatedSkeleton className="h-7 w-full max-w-md bg-slate-800" />

        <div className="mt-3 flex w-full max-w-2xl flex-col items-center gap-2">
          <AnimatedSkeleton className="h-4 w-full bg-slate-800" />
          <AnimatedSkeleton className="h-4 w-4/5 bg-slate-800" />
        </div>
      </div>
    </div>
  );
}

/* ---------------- POST CARD ---------------- */

export function PostCardSkeleton() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white">
      <AnimatedSkeleton className="h-32 w-full rounded-none sm:h-40 md:h-48" />

      <div className="space-y-4 p-4">
        <div className="space-y-2">
          <AnimatedSkeleton className="h-5 w-4/5" />
          <AnimatedSkeleton className="h-5 w-3/5" />
        </div>

        <div className="space-y-2">
          <AnimatedSkeleton className="h-3 w-full" />
          <AnimatedSkeleton className="h-3 w-full" />
          <AnimatedSkeleton className="h-3 w-2/3" />
        </div>

        <div className="flex gap-2">
          <AnimatedSkeleton className="h-5 w-16 rounded-full" />
          <AnimatedSkeleton className="h-5 w-20 rounded-full" />
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-2">
            <AnimatedSkeleton className="h-8 w-8 rounded-full" />

            <div className="space-y-1">
              <AnimatedSkeleton className="h-3 w-20" />
              <AnimatedSkeleton className="h-2.5 w-16" />
            </div>
          </div>

          <AnimatedSkeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

/* ---------------- PUBLIC POST LIST ---------------- */

export function PublicListingSkeleton() {
  return (
    <div className="w-full">
      <HeaderSkeleton />

      <div className="container mx-auto grid grid-cols-1 gap-6 p-4 py-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

/* ---------------- ARTICLE ---------------- */

export function ArticleSkeleton() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <div className="space-y-6">
        <AnimatedSkeleton className="h-5 w-28 rounded-full" />

        <div className="space-y-3">
          <AnimatedSkeleton className="h-9 w-full max-w-3xl" />
          <AnimatedSkeleton className="h-9 w-4/5 max-w-2xl" />
        </div>

        <div className="flex items-center gap-3">
          <AnimatedSkeleton className="h-10 w-10 rounded-full" />

          <div className="space-y-2">
            <AnimatedSkeleton className="h-3 w-28" />
            <AnimatedSkeleton className="h-3 w-20" />
          </div>
        </div>

        <AnimatedSkeleton className="h-[300px] w-full rounded-xl sm:h-[420px]" />

        <div className="space-y-4 pt-4">
          <AnimatedSkeleton className="h-4 w-full" />
          <AnimatedSkeleton className="h-4 w-full" />
          <AnimatedSkeleton className="h-4 w-[92%]" />
          <AnimatedSkeleton className="h-4 w-full" />
          <AnimatedSkeleton className="h-4 w-[85%]" />
          <AnimatedSkeleton className="h-4 w-[96%]" />
          <AnimatedSkeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}

/* ---------------- DASHBOARD ---------------- */

export function DashboardSkeleton() {
  return (
    <div className="w-full space-y-8">
      <div className="space-y-4 py-4">
        <AnimatedSkeleton className="h-5 w-36" />
        <AnimatedSkeleton className="h-8 w-56" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="min-h-36 rounded-xl border bg-white p-6">
            <div className="flex items-center justify-between">
              <AnimatedSkeleton className="h-4 w-36" />
              <AnimatedSkeleton className="h-6 w-6 rounded-md" />
            </div>

            <AnimatedSkeleton className="mt-6 h-8 w-16" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="rounded-xl border bg-white p-5">
          <AnimatedSkeleton className="mb-6 h-5 w-36" />
          <AnimatedSkeleton className="h-[280px] w-full rounded-lg" />
        </div>

        <div className="rounded-xl border bg-white p-5">
          <AnimatedSkeleton className="mb-6 h-5 w-40" />

          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <AnimatedSkeleton className="h-4 w-32" />
                <AnimatedSkeleton className="h-4 w-10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- ADMIN TABLE ---------------- */

export function AdminTableSkeleton({ title = "Loading" }: { title?: string }) {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <AnimatedSkeleton className="h-8 w-40" />
          <AnimatedSkeleton className="h-4 w-60 max-w-full" />
        </div>

        <AnimatedSkeleton className="h-10 w-28 rounded-md" />
      </div>

      <div className="overflow-hidden rounded-xl border bg-white">
        <div className="border-b p-4">
          <AnimatedSkeleton className="h-10 w-full max-w-sm" />
        </div>

        <div className="space-y-1">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-4 border-b p-4 last:border-b-0"
            >
              <AnimatedSkeleton className="h-4 w-full" />
              <AnimatedSkeleton className="h-4 w-full" />
              <AnimatedSkeleton className="h-4 w-full" />
              <AnimatedSkeleton className="h-4 w-12" />
            </div>
          ))}
        </div>
      </div>

      <span className="sr-only">{title}</span>
    </div>
  );
}

/* ---------------- AUTH ---------------- */

export function AuthSkeleton() {
  return (
    <div className="w-full max-w-md space-y-6 rounded-xl border bg-white p-6">
      <div className="space-y-2">
        <AnimatedSkeleton className="mx-auto h-8 w-40" />
        <AnimatedSkeleton className="mx-auto h-4 w-64 max-w-full" />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <AnimatedSkeleton className="h-4 w-20" />
          <AnimatedSkeleton className="h-11 w-full" />
        </div>

        <div className="space-y-2">
          <AnimatedSkeleton className="h-4 w-20" />
          <AnimatedSkeleton className="h-11 w-full" />
        </div>

        <AnimatedSkeleton className="h-11 w-full rounded-md" />
      </div>
    </div>
  );
}
