"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/db";
import { authSession } from "@/lib/auth-utils";
import { PostStatus } from "@/lib/generated/prisma/client";

export async function getSavedPostIds() {
    const session = await authSession();

    if (!session?.user?.id) {
        return [];
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
        select: {
            savedPosts: true,
        },
    });

    return user?.savedPosts ?? [];
}

export async function toggleSavedPost(postId: string) {
    const session = await authSession();

    if (!session?.user?.id) {
        return {
            success: false,
            status: "unauthenticated" as const,
            saved: false,
        };
    }

    try {
        const [user, post] = await Promise.all([
            prisma.user.findUnique({
                where: {
                    id: session.user.id,
                },
                select: {
                    savedPosts: true,
                },
            }),

            prisma.post.findUnique({
                where: {
                    id: postId,
                },
                select: {
                    id: true,
                    status: true,
                },
            }),
        ]);

        if (!user) {
            return {
                success: false,
                status: "unauthenticated" as const,
                saved: false,
            };
        }

        if (!post || post.status !== PostStatus.published) {
            return {
                success: false,
                status: "not-found" as const,
                saved: false,
            };
        }

        const alreadySaved = user.savedPosts.includes(postId);

        const updatedSavedPosts = alreadySaved
            ? user.savedPosts.filter((id) => id !== postId)
            : [...user.savedPosts, postId];

        await prisma.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                savedPosts: updatedSavedPosts,
            },
        });

        revalidatePath("/saved-posts");

        return {
            success: true,
            status: "success" as const,
            saved: !alreadySaved,
        };
    } catch (error) {
        console.error("toggleSavedPost error:", error);

        return {
            success: false,
            status: "error" as const,
            saved: false,
        };
    }
}

export async function getSavedPosts() {
    const session = await authSession();

    if (!session?.user?.id) {
        return [];
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: session.user.id,
            },
            select: {
                savedPosts: true,
            },
        });

        const savedPostIds = user?.savedPosts ?? [];

        if (savedPostIds.length === 0) {
            return [];
        }

        const posts = await prisma.post.findMany({
            where: {
                id: {
                    in: savedPostIds,
                },
                status: PostStatus.published,
            },
            include: {
                category: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
            },
            orderBy: {
                updatedAt: "desc",
            },
        });

        return posts.map((post) => ({
            ...post,
            savedPosts: savedPostIds,
        }));
    } catch (error) {
        console.error("getSavedPosts error:", error);
        return [];
    }
}