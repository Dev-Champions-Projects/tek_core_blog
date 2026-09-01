import { getCategories } from "@/app/actions/categories";
import { authSession } from "@/lib/auth-utils";

import { CategoriesProvider } from "@/components/categories-context";
import { NavMenu } from "@/components/navbar";

export async function SiteNavbar() {
  const [session, categories] = await Promise.all([
    authSession(),
    getCategories(),
  ]);

  return (
    <CategoriesProvider initialCategories={categories}>
      <NavMenu
        userName={session?.user.name}
        userImage={session?.user.image ?? undefined}
      />
    </CategoriesProvider>
  );
}
