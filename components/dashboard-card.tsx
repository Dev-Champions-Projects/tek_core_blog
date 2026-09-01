"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface DashboardCardProps {
  totalPosts: number;
  totalCategories: number;
  totalViews: number;
}

export default function DashboardCard({
  totalPosts,
  totalCategories,
  totalViews,
}: DashboardCardProps) {
  const stats = [
    {
      title: "Total Posts",
      value: totalPosts,
      description: "Published posts",
    },
    {
      title: "Total Categories",
      value: totalCategories,
      description: "Active categories",
    },
    {
      title: "Total Views",
      value: totalViews,
      description: "Page views",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title} className="h-full">
          <CardHeader>
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
