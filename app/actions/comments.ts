"use server";

import { authSession } from "@/lib/auth-utils";
import prisma from "@/lib/db";

export const getCommentsByPostId = async (postId: string) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { postId, parentId: null },
      orderBy: { createdAt: "asc" },
      include: {
        author: {
          select: { id: true, name: true, image: true },
        },
        replies: {
          orderBy: { createdAt: "asc" },
          include: {
            author: {
              select: { id: true, name: true, image: true },
            },
          },
        },
      },
    });

    return comments;
  } catch (err) {
    console.error({ err });
    throw new Error("Something went wrong");
  }
};

export const createComment = async (
  postId: string,
  content: string,
  parentId: string | null = null
) => {
  const session = await authSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (!content.trim()) {
    throw new Error("Comment content cannot be empty");
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        postId,
        content: content.trim(),
        parentId,
        authorId: session.user.id,
      },
      include: {
        author: {
          select: { id: true, name: true, image: true },
        },
      },
    });

    return comment;
  } catch (err) {
    console.error({ err });
    throw new Error("Something went wrong");
  }
};
