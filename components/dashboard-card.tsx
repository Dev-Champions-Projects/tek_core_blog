import { Combine } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface CardProps {
  totalCategories: number;
  totalPosts: number;
  totalViews: number;
}

export default function DashboardCard({
  totalCategories,
  totalPosts,
  totalViews,
}: CardProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <Card className="shadow-lg min-h-36 flex items-center flex-col justify-center">
        <CardHeader className="flex flex-col w-full">
          <div className="w-full flex justify-between">
            <CardDescription className="text-sm font-medium sm:text-base">
              Total number of categories
            </CardDescription>
            <Combine />
          </div>
          <CardTitle className="text-2xl">{totalCategories} </CardTitle>
        </CardHeader>
      </Card>

      <Card className="shadow-lg min-h-36 flex items-center flex-col justify-center">
        <CardHeader className="flex flex-col w-full">
          <div className="w-full flex justify-between">
            <CardDescription className="text-sm font-medium sm:text-base">
              Total number of posts
            </CardDescription>
            <Combine />
          </div>
          <CardTitle className="text-2xl">{totalPosts} </CardTitle>
        </CardHeader>
      </Card>

      <Card className="shadow-lg min-h-36 flex items-center flex-col justify-center">
        <CardHeader className="flex flex-col w-full">
          <div className="w-full flex justify-between">
            <CardDescription className="text-sm font-medium sm:text-base">
              Total number of views
            </CardDescription>
            <Combine />
          </div>
          <CardTitle className="text-2xl">{totalViews} </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
