export const dynamic = "force-dynamic";

import { NavMenu } from "@/components/navbar";
import { authSession } from "@/lib/auth-utils";
import { CategoriesProvider } from "@/components/categories-context";

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authSession();

  return (
    <CategoriesProvider>
      <div className="relative w-full">
        <NavMenu
          userName={session?.user.name}
          userImage={session?.user.image as string}
        />

        {children}
      </div>
    </CategoriesProvider>
  );
}
