import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

type Props = { params: Promise<{ slug: string }> };

/** DB-backed posts; avoid build-time Prisma when DATABASE_URL is unset. */
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    select: { title: true, excerpt: true, published: true },
  });
  if (!post?.published) return {};
  return {
    title: post.title,
    description: post.excerpt.slice(0, 160),
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });
  if (!post?.published) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/blog" className="text-sm font-medium text-primary hover:underline">
        ← Blog
      </Link>
      <header className="mt-6 space-y-2">
        {post.category ? (
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--theme-muted-text)]">{post.category}</p>
        ) : null}
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--theme-heading-text)]">{post.title}</h1>
        <p className="text-sm text-[var(--theme-muted-text)]">{post.createdAt.toISOString().slice(0, 10)}</p>
      </header>
      {post.coverImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.coverImage} alt="" className="mt-8 w-full rounded-xl border border-[var(--theme-card-border)] object-cover" />
      ) : null}
      <div
        className="prose prose-neutral mt-8 max-w-none dark:prose-invert [&_a]:text-primary [&_h2]:text-[var(--theme-heading-text)] [&_h3]:text-[var(--theme-heading-text)]"
        dangerouslySetInnerHTML={{ __html: post.body }}
      />
      {post.tags.length > 0 ? (
        <footer className="mt-10 flex flex-wrap gap-2 border-t border-[var(--theme-separator)] pt-6">
          {post.tags.map((t) => (
            <Link
              key={t}
              href={`/blog/tag/${encodeURIComponent(t)}`}
              className="rounded-full bg-[var(--theme-page-bg)] px-2 py-0.5 text-xs text-[var(--theme-muted-text)] hover:text-primary hover:underline"
            >
              {t}
            </Link>
          ))}
        </footer>
      ) : null}
    </article>
  );
}
