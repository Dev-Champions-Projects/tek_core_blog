import type { Metadata } from "next";
import { getPosts } from "@/app/actions/blog";
import Header from "@/components/header";
import { NavMenu } from "@/components/navbar";
import Pagination from "@/components/pagination";
import PostCard from "@/components/post-card";
import { authSession } from "@/lib/auth-utils";
import { getSeoDescription, metadataBase, siteConfig } from "@/lib/seo";

import { getCategories } from "@/app/actions/categories";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  metadataBase,
  title: "AI, Tech, and Developer Insights",
  description: getSeoDescription(
    "Explore AI, software engineering, product stories, and developer insights from the Dev Champions community.",
  ),
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "Dev Champions | AI, Tech, and Developer Insights",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev Champions | AI, Tech, and Developer Insights",
    description: siteConfig.description,
  },
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const { posts, totalPages, currentPage } = await getPosts(page);
  const session = await authSession();

  const categories = await getCategories();

  return (
    <>
      <div className="relative w-full">
        <NavMenu
          userName={session?.user.name}
          userImage={session?.user.image as string}
        />
      </div>
      <Header />
      <div className="flex flex-col gap-6 justify-center">
        {/* <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-4 gap-6 py-6"> */}
        {/* <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 py-6"> */}
        <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
        {posts.length > 0 && (
          <Pagination
            page={page}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        )}
      </div>
      <Footer />
    </>
  );
}
