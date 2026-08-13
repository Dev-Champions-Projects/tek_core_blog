export const siteConfig = {
    name: "Dev Champions",
    title: "Dev Champions | AI, Tech, and Developer Insights",
    description:
        "Dev Champions is a modern technology and AI blog for developers, students, and creators sharing insights, tutorials, and stories across software, AI, and digital innovation.",
    url: "https://core.dev-champions.tech",
    author: "Dev Champions",
    locale: "en-NG",
    keywords: [
        "developer blog",
        "AI blog",
        "software engineering",
        "web development",
        "tech tutorials",
        "Lagos developer blog",
        "Nigeria tech",
        "African developers",
        "AI insights",
        "developer community",
        "Dev Champions",
    ],
};

export const metadataBase = new URL(siteConfig.url);

export function getSeoTitle(title: string) {
    const trimmed = title.trim();
    return trimmed.endsWith(`| ${siteConfig.name}`)
        ? trimmed
        : `${trimmed} | ${siteConfig.name}`;
}

export function getSeoDescription(description: string) {
    const normalized = description.trim().replace(/\s+/g, " ");
    if (normalized.length <= 160) return normalized;
    return `${normalized.slice(0, 157).trim()}...`;
}

export function getSocialImageUrl(coverImage?: string | null) {
    if (coverImage) {
        return coverImage.startsWith("http")
            ? coverImage
            : `${siteConfig.url}${coverImage.startsWith("/") ? "" : "/"}${coverImage}`;
    }

    return `${siteConfig.url}/favicon.jpg`;
}
