"use client";

import { Category, User } from "@/lib/generated/prisma/client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CategoryWithUser = Category & {
  user: User;
};

interface DashboardCategoriesProps {
  categories?: CategoryWithUser[];
}

export default function DashboardCategories({
  categories,
}: DashboardCategoriesProps) {
  const safeCategories = Array.isArray(categories) ? categories : [];

  const latestCategories = safeCategories.filter((_, index) => index < 5);

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>Latest categories</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4">
        {latestCategories.length === 0 ? (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed p-10">
            <p className="text-sm text-muted-foreground">
              No categories have been added yet.
            </p>
          </div>
        ) : (
          latestCategories.map((category) => (
            <div
              key={category.id}
              className="flex min-h-[70px] items-center rounded-xl border px-4 py-3 shadow-sm xl:flex-1"
            >
              <p className="font-medium">{category.name}</p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
