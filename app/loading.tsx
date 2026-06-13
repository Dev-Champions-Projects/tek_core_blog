import Header from "@/components/header";
import { NavMenu } from "@/components/navbar";
import { SkeletonCard } from "@/components/skeleton-card";
import { authSession } from "@/lib/auth-utils";


export default function Loading() {
  return (
    <div className="w-full min-w-dvw flex flex-col min-h-dvh overflow-hidden">
      <div className="realitve w-full">
        <NavMenu />
      </div>
      <Header />

      <div className="flex flex-col gap-6 justify-center">
        {/* <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 my-8"> */}
        <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 py-6">

          {Array.from({ length: 8 }, (k, v) => v).map((item) => (
            <SkeletonCard key={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
