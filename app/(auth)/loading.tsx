import { AuthSkeleton } from "@/components/loading-skeletons";

export default function Loading() {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center px-4">
      <AuthSkeleton />
    </div>
  );
}
