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

/** Default page size for `/blog` and `/blog/tag/*` lists (bounded memory per request). */
export const BLOG_LIST_PAGE_SIZE = 24;

export async function countPublishedBlogPosts(): Promise<number> {
  return withBlogFallback(
    () => prisma.blogPost.count({ where: { published: true } }),
    0,
  );
}

export async function getPublishedBlogPostsPage(
  page: number,
  pageSize: number,
): Promise<{ posts: BlogIndexPost[]; total: number; page: number; pageSize: number }> {
  const safePage = Math.max(1, page);
  const safeSize = Math.min(100, Math.max(1, Math.floor(pageSize)));
  const where = { published: true as const };
  const [posts, total] = await Promise.all([
    withBlogFallback(
      () =>
        prisma.blogPost.findMany({
          where,
          orderBy: { createdAt: "desc" },
          select: indexSelect,
          skip: (safePage - 1) * safeSize,
          take: safeSize,
        }),
      [],
    ),
    countPublishedBlogPosts(),
  ]);
  return { posts, total, page: safePage, pageSize: safeSize };
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

export async function getPublishedBlogPostsByTagPage(
  tag: string,
  page: number,
  pageSize: number,
): Promise<{ posts: BlogTagListPost[]; total: number; page: number; pageSize: number }> {
  const safePage = Math.max(1, page);
  const safeSize = Math.min(100, Math.max(1, Math.floor(pageSize)));
  const where = { published: true as const, tags: { has: tag } };
  const [posts, total] = await Promise.all([
    withBlogFallback(
      () =>
        prisma.blogPost.findMany({
          where,
          orderBy: { createdAt: "desc" },
          select: tagListSelect,
          skip: (safePage - 1) * safeSize,
          take: safeSize,
        }),
      [],
    ),
    withBlogFallback(() => prisma.blogPost.count({ where }), 0),
  ]);
  return { posts, total, page: safePage, pageSize: safeSize };
}

/** Sitemap helpers: hard cap per sitemap spec (~50k URLs); split indexes if you exceed this. */
const SITEMAP_BLOG_ROW_CAP = 50_000;

export async function getSitemapPublishedBlogSlugs(): Promise<{ slug: string; updatedAt: Date }[]> {
  return withBlogFallback(
    () =>
      prisma.blogPost.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
        orderBy: { slug: "asc" },
        take: SITEMAP_BLOG_ROW_CAP,
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
        orderBy: { slug: "asc" },
        take: SITEMAP_BLOG_ROW_CAP,
      }),
    [],
  );
}
