import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-background to-muted/20 px-4">
      <div className="w-full max-w-sm">
        {/* Animated Logo/Title */}
        <div className="mb-12 flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 blur-2xl opacity-30 animate-pulse" />
            <h1 className="relative text-4xl font-black tracking-wider text-foreground">
              TEK CORE
            </h1>
          </div>

          {/* Animated dots */}
          <div className="flex items-center justify-center gap-1">
            <span
              className="inline-block h-2 w-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: "0s" }}
            />
            <span
              className="inline-block h-2 w-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: "0.15s" }}
            />
            <span
              className="inline-block h-2 w-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: "0.3s" }}
            />
          </div>
        </div>

        {/* Animated skeleton content */}
        <div className="space-y-6">
          {/* Text skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-3/4 rounded-lg" />
            <Skeleton className="h-4 w-1/2 rounded-lg" />
          </div>

          {/* Card skeleton with stagger animation */}
          <div className="grid grid-cols-3 gap-3 pt-3">
            {[0, 1, 2].map((i) => (
              <Skeleton
                key={i}
                className="h-20 w-full rounded-xl"
                style={{
                  animationDelay: `${i * 100}ms`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Loading text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Loading<span className="animate-pulse">...</span>
          </p>
        </div>
      </div>
    </div>
  );
}
