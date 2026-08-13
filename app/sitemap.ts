import type { MetadataRoute } from "next";
import prisma from "@/lib/db";
import { PostStatus } from "@/lib/generated/prisma/client";
import { siteConfig } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [posts, categories] = await Promise.all([
        prisma.post.findMany({
            where: { status: PostStatus.published },
            select: {
                slug: true,
                updatedAt: true,
                tags: true,
            },
            orderBy: { updatedAt: "desc" },
        }),
        prisma.category.findMany({
            select: {
                id: true,
                updatedAt: true,
            },
            orderBy: { updatedAt: "desc" },
        }),
    ]);

    const tagUrls = Array.from(
        new Set(posts.flatMap((post) => post.tags ?? []))
    ).map((tag) => ({
        url: `${siteConfig.url}/blog/tag/${encodeURIComponent(tag)}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
    }));

    const postUrls = posts.map((post) => ({
        url: `${siteConfig.url}/blog/posts/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    const categoryUrls = categories.map((category) => ({
        url: `${siteConfig.url}/blog/category/${category.id}`,
        lastModified: category.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    return [
        {
            url: siteConfig.url,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${siteConfig.url}/blog`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        ...categoryUrls,
        ...tagUrls,
        ...postUrls,
    ];
}
