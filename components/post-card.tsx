"use client";

import { Category, Post } from "@/lib/generated/prisma/client";
import { stripHtml, getPlainTextFromRichContent } from "@/lib/utils";
import { format } from "date-fns";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface PostProps {
  post: Post & { category: Category | null } & {
    user: {
      name: string;
      id: string;
      image: string | null;
      savedPosts: string[];
    };
  };
  compact?: boolean;
}

export default function PostCard({ post, compact }: PostProps) {
  const excertp = getPlainTextFromRichContent(post.content);

  return (
    // <Card className="w-full p-0 pb-4 border-0 shadow-md gap-1 relative">
    //   <div className="relative h-60">
    //     {post.imageUrl ? (
    //       <Image
    //         src={post.imageUrl}
    //         alt={post.title}
    //         fill
    //         className="rounded-sm object-cover"
    //         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    //       />
    //     ) : null}
    //   </div>
    //   <CardHeader className="gap-0">
    //     <CardTitle className="font-semibold line-clamp-3 pt-2">
    //       {post.title}
    //     </CardTitle>
    //   </CardHeader>
    //   <CardContent>
    //     <p className="text-sm line-clamp-3">{excertp} </p>

    //     <div className="flex gap-2 py-6 flex-wrap">
    //       {post.tags.map((tag) => (
    //         <Link href={`/blog/tag/${tag}`} key={tag}>
    //           <Badge variant="secondary">#{tag}</Badge>
    //         </Link>
    //       ))}
    //     </div>

    //     <div className="flex justify-between w-full gap-2">
    //       <div className="flex gap-1">
    //         <div className="relative h-8 w-8 rounded-full shadow-lg">
              
    //             <Image
    //               className="rounded-full shadow-lg"
    //             src={post.user.image && post.user.image.trim() !== "" ? post.user.image : "/default-avatar.png"}

    //               alt={post.user.name}
    //               fill
    //               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    //             />
            
    //         </div>

    //         <div className="flex flex-col gap-1">
    //           <span className="text-[10px] font-semibold">
    //             {post.user.name}
    //           </span>
    //           <span className="text-[10px] text-neutral-500 font-semibold">
    //             {format(post.createdAt, "dd/MM/yyyy")}
    //           </span>
    //         </div>
    //       </div>

    //       <Link
    //         href={`/blog/posts/${post.slug}`}
    //         className="flex gap-1 text-sx items-center font-medium"
    //       >
    //         Read more <MoveRight />
    //       </Link>
    //     </div>
    //   </CardContent>
    // </Card>

//     <Card className="w-full p-0 pb-4 border-0 shadow-md gap-1 relative">
//   <div className="relative h-48 sm:h-60 md:h-72">
//     {post.imageUrl && (
//       <Image
//         src={post.imageUrl}
//         alt={post.title}
//         fill
//         className="rounded-sm object-cover"
//         sizes="100vw"
//       />
//     )}
//   </div>
//   <CardHeader>
//     <CardTitle className="font-semibold line-clamp-3 pt-2 text-base sm:text-lg">
//       {post.title}
//     </CardTitle>
//   </CardHeader>
//   <CardContent>
//     <p className="text-sm line-clamp-3">{excertp}</p>

//     <div className="flex gap-2 py-6 flex-wrap">
//       {post.tags.map((tag) => (
//         <Link href={`/blog/tag/${tag}`} key={tag}>
//           <Badge variant="secondary">#{tag}</Badge>
//         </Link>
//       ))}
//     </div>

//     <div className="flex justify-between w-full gap-2 flex-wrap">
//       {/* User info */}
//       <div className="flex gap-2 items-center">
//         <div className="relative h-8 w-8 rounded-full overflow-hidden">
//           <Image
//             src={post.user.image || "/default-avatar.png"}
//             alt={post.user.name}
//             fill
//             className="object-cover"
//           />
//         </div>
//         <div className="flex flex-col">
//           <span className="text-xs font-semibold">{post.user.name}</span>
//           <span className="text-xs text-neutral-500">
//             {format(post.createdAt, "dd/MM/yyyy")}
//           </span>
//         </div>
//       </div>

//       {/* Read more */}
//       <Link
//         href={`/blog/posts/${post.slug}`}
//         className="flex gap-1 items-center text-sm font-medium"
//       >
//         Read more <MoveRight />
//       </Link>
//     </div>
//   </CardContent>
// </Card>
<Card className="w-full p-0 pb-3 border-0 shadow-md">
  <div className={`relative ${compact ? "h-24 sm:h-28 md:h-32" : "h-32 sm:h-40 md:h-48"}`}>
    {post.imageUrl && (
      <Image
        src={post.imageUrl}
        alt={post.title}
        fill
        className="rounded-sm object-cover"
        sizes="100vw"
      />
    )}
  </div>
  <CardHeader>
    <CardTitle className={`${compact ? "line-clamp-1 text-sm" : "line-clamp-2 text-base sm:text-lg"} pt-2`}>
      {post.title}
    </CardTitle>
  </CardHeader>
  <CardContent>
    <p className={`${compact ? "text-xs line-clamp-1" : "text-sm line-clamp-2"}`}>{excertp}</p>

    <div className={compact ? "py-2 flex gap-2 flex-wrap" : "py-3 flex gap-2 flex-wrap"}>
      {!compact && post.tags.map((tag) => (
        <Link href={`/blog/tag/${tag}`} key={tag}>
          <Badge variant="secondary">#{tag}</Badge>
        </Link>
      ))}
    </div>

    <div className="flex justify-between items-center w-full gap-2">
      <div className="flex gap-2 items-center">
        <div className={`relative rounded-full overflow-hidden ${compact ? "h-6 w-6" : "h-8 w-8"}`}>
          <Image
            src={post.user.image || "/default-avatar.png"}
            alt={post.user.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col leading-tight">
          <span className={`font-semibold ${compact ? "text-xs" : "text-xs"}`}>{post.user.name}</span>
          {!compact && (
            <span className="text-xs text-neutral-500">
              {format(post.createdAt, "dd/MM/yyyy")}
            </span>
          )}
        </div>
      </div>
      <Link
        href={`/blog/posts/${post.slug}`}
        className={`flex gap-1 items-center font-medium ${compact ? "text-xs" : "text-sm"}`}
      >
        Read more <MoveRight size={compact ? 14 : 16} />
      </Link>
    </div>
  </CardContent>
</Card>


  );
}
