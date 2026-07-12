import { getPosts } from "@/app/actions/blog";
import Header from "@/components/header";
import { NavMenu } from "@/components/navbar";
import Pagination from "@/components/pagination";
import PostCard from "@/components/post-card";
import { authSession } from "@/lib/auth-utils";

import { getCategories } from "@/app/actions/categories";
import Footer from "@/components/footer";
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
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
