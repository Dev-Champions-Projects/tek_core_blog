"use client";

import { Post } from "@/lib/generated/prisma/client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  views: {
    label: "Views",
  },
} satisfies ChartConfig;

interface ChartProps {
  data?: Post[];
}

export default function DashboardChart({ data = [] }: ChartProps) {
  const safeData = Array.isArray(data) ? data : [];

  const formatTitle = (value: unknown) => {
    if (typeof value !== "string") {
      return "";
    }

    if (value.length > 12) {
      return `${value.substring(0, 12)}...`;
    }

    return value;
  };

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="shrink-0">
        <CardTitle>Views</CardTitle>

        <CardDescription>Trending posts by number of views</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1">
        {safeData.length > 0 ? (
          <ChartContainer
            config={chartConfig}
            className="
              h-[280px]
              w-full
              sm:h-[320px]
              lg:h-[350px]
              xl:h-full
              xl:min-h-[360px]
            "
          >
            <BarChart data={safeData} maxBarSize={60} accessibilityLayer>
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="title"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={formatTitle}
              />

              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

              <Bar dataKey="views" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="flex min-h-[280px] w-full flex-1 items-center justify-center">
            <p className="text-sm text-muted-foreground">
              No post view data available yet.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
