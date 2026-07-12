"use server";

import { authSession } from "@/lib/auth-utils";
import { PostStatus } from "@/lib/generated/prisma/client";
import prisma from "@/lib/db";

const PAGE_SIZE = 10;

export const getPosts = async (page: number) => {
  const skip = (page - 1) * PAGE_SIZE;
  const session = await authSession();

  const currentUser = session?.user.id
    ? await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { savedPosts: true },
      })
    : null;

  try {
    try {
      const [posts, totalCount] = await prisma.$transaction([
        prisma.post.findMany({
          skip,
          take: PAGE_SIZE,
          orderBy: { updatedAt: "desc" },
          include: {
            user: {
              select: { image: true, name: true, id: true, savedPosts: true },
            },
            category: true,
          },
        }),
        prisma.post.count(),
      ]);

      return {
        posts: posts.map((post) => ({
          ...post,
          savedPosts: currentUser?.savedPosts ?? [],
        })),
        totalPages: Math.ceil(totalCount / PAGE_SIZE),
        currentPage: page,
      };
    } catch (txErr) {
      // If transaction fails (some DB providers or connection issues), fallback to separate queries
      console.warn("Transaction failed, falling back to separate queries", txErr);
      const posts = await prisma.post.findMany({
        skip,
        take: PAGE_SIZE,
        orderBy: { updatedAt: "desc" },
        include: {
          user: { select: { image: true, name: true, id: true, savedPosts: true } },
          category: true,
        },
      });

      const totalCount = await prisma.post.count();

      return {
        posts: posts.map((post) => ({
          ...post,
          savedPosts: currentUser?.savedPosts ?? [],
        })),
        totalPages: Math.ceil(totalCount / PAGE_SIZE),
        currentPage: page,
      };
    }
  } catch (err) {
    console.error("getPosts error:", err);
    // include original message for easier debugging in server logs
    throw new Error(
      `Something went wrong while fetching posts: ${err instanceof Error ? err.message : String(err)}`
    );
  }
};

export const getBlogPostBySlug = async (slug: string) => {
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        user: { select: { name: true, image: true, id: true } },
        category: true,
      },
    });

    return post;
  } catch (err) {
    console.error({ err });
    throw new Error("Something went wrong");
  }
};

export const updatePostViews = async (id: string) => {
  try {
    const post = await prisma.post.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    return post;
  } catch (err) {
    console.error({ err });
    throw new Error("Something went wrong");
  }
};

export const getPostsByCategory = async (categoryId: string, page: number) => {
  const skip = (page - 1) * PAGE_SIZE;
  const session = await authSession();

  const currentUser = session?.user.id
    ? await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { savedPosts: true },
      })
    : null;

  try {
    const [posts, totalCount] = await prisma.$transaction([
      prisma.post.findMany({
        where: { categoryId },
        skip,
        take: PAGE_SIZE,
        orderBy: { updatedAt: "desc" },
        include: {
          user: {
            select: { image: true, name: true, id: true, savedPosts: true },
          },
          category: true,
        },
      }),
      prisma.post.count({ where: { categoryId } }),
    ]);

    return {
      posts: posts.map((post) => ({
        ...post,
        savedPosts: currentUser?.savedPosts ?? [],
      })),
      totalPages: Math.ceil(totalCount / PAGE_SIZE),
      currentPage: page,
    };
  } catch (err) {
    console.error({ err });
    throw new Error("Something went wrong");
  }
};

export const getPostsByTag = async (tag: string, page: number) => {
  const skip = (page - 1) * PAGE_SIZE;
  const session = await authSession();

  const currentUser = session?.user.id
    ? await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { savedPosts: true },
      })
    : null;

  try {
    const [posts, totalCount] = await prisma.$transaction([
      prisma.post.findMany({
        where: { tags: { has: tag } },
        skip,
        take: PAGE_SIZE,
        orderBy: { updatedAt: "desc" },
        include: {
          user: {
            select: { image: true, name: true, id: true, savedPosts: true },
          },
          category: true,
        },
      }),
      prisma.post.count({ where: { tags: { has: tag } } }),
    ]);

    return {
      posts: posts.map((post) => ({
        ...post,
        savedPosts: currentUser?.savedPosts ?? [],
      })),
      totalPages: Math.ceil(totalCount / PAGE_SIZE),
      currentPage: page,
    };
  } catch (err) {
    console.error({ err });
    throw new Error("Something went wrong");
  }
};

export const getRelatedPosts = async (
  currentPostId: string,
  categoryId: string | null,
  tags: string[],
  limit = 4
) => {
  try {
    const where: any = {
      id: { not: currentPostId },
      status: PostStatus.published,
      OR: [],
    };

    if (categoryId) {
      where.OR.push({ categoryId });
    }

    if (tags.length > 0) {
      where.OR.push({ tags: { hasSome: tags } });
    }

    if (where.OR.length === 0) {
      return [];
    }

    const posts = await prisma.post.findMany({
      where,
      take: limit,
      orderBy: [
        { categoryId: "desc" },
        { updatedAt: "desc" },
      ],
      include: {
        user: {
          select: { image: true, name: true, id: true, savedPosts: true },
        },
        category: true,
      },
    });

    return posts;
  } catch (err) {
    console.error({ err });
    throw new Error("Something went wrong");
  }
};

export const getRecentPosts = async (currentPostId: string, limit = 6) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        id: { not: currentPostId },
        status: PostStatus.published,
      },
      take: limit,
      orderBy: { updatedAt: "desc" },
      include: {
        user: {
          select: { image: true, name: true, id: true, savedPosts: true },
        },
        category: true,
      },
    });

    return posts;
  } catch (err) {
    console.error({ err });
    throw new Error("Something went wrong");
  }
};
