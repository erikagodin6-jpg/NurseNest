import type { BlogPost, Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { isDatabaseUrlConfigured, withDatabaseFallback } from "@/lib/db/safe-database";

/** @deprecated Use `isDatabaseUrlConfigured` from `@/lib/db/safe-database`. */
export const isBlogDatabaseConfigured = isDatabaseUrlConfigured;

async function withBlogFallback<T>(run: () => Promise<T>, fallback: T): Promise<T> {
  return withDatabaseFallback(run, fallback);
}

const indexSelect = {
  slug: true,
  title: true,
  excerpt: true,
  category: true,
  createdAt: true,
} satisfies Prisma.BlogPostSelect;

export type BlogIndexPost = Prisma.BlogPostGetPayload<{ select: typeof indexSelect }>;

export async function getPublishedBlogPostsForIndex(): Promise<BlogIndexPost[]> {
  return withBlogFallback(
    () =>
      prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
        select: indexSelect,
      }),
    [],
  );
}

const metaSelect = {
  title: true,
  excerpt: true,
  published: true,
} satisfies Prisma.BlogPostSelect;

export type BlogPostMeta = Prisma.BlogPostGetPayload<{ select: typeof metaSelect }>;

export async function getBlogPostMetaBySlug(slug: string): Promise<BlogPostMeta | null> {
  return withBlogFallback(
    () =>
      prisma.blogPost.findUnique({
        where: { slug },
        select: metaSelect,
      }),
    null,
  );
}

export async function getPublishedBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return withBlogFallback(() => prisma.blogPost.findUnique({ where: { slug } }), null);
}

export async function countPublishedPostsWithTag(tag: string): Promise<number> {
  return withBlogFallback(
    () =>
      prisma.blogPost.count({
        where: { published: true, tags: { has: tag } },
      }),
    0,
  );
}

const tagListSelect = {
  slug: true,
  title: true,
  excerpt: true,
  createdAt: true,
} satisfies Prisma.BlogPostSelect;

export type BlogTagListPost = Prisma.BlogPostGetPayload<{ select: typeof tagListSelect }>;

export async function getPublishedBlogPostsByTag(tag: string): Promise<BlogTagListPost[]> {
  return withBlogFallback(
    () =>
      prisma.blogPost.findMany({
        where: { published: true, tags: { has: tag } },
        orderBy: { createdAt: "desc" },
        select: tagListSelect,
      }),
    [],
  );
}

export async function getSitemapPublishedBlogSlugs(): Promise<{ slug: string; updatedAt: Date }[]> {
  return withBlogFallback(
    () =>
      prisma.blogPost.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
    [],
  );
}

export async function getSitemapBlogTagRows(): Promise<{ tags: string[] }[]> {
  return withBlogFallback(
    () =>
      prisma.blogPost.findMany({
        where: { published: true },
        select: { tags: true },
      }),
    [],
  );
}
