import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

type Props = { params: Promise<{ tag: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: `Posts tagged “${decoded}” | NurseNest blog`,
    alternates: { canonical: `/blog/tag/${encodeURIComponent(decoded)}` },
  };
}

export default async function BlogTagPage({ params }: Props) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag).trim();
  if (!decoded) notFound();

  const posts = await prisma.blogPost.findMany({
    where: { published: true, tags: { has: decoded } },
    orderBy: { createdAt: "desc" },
    select: { slug: true, title: true, excerpt: true, createdAt: true },
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/blog" className="text-sm font-medium text-primary hover:underline">
        ← Blog
      </Link>
      <header className="mt-6 mb-10">
        <h1 className="text-2xl font-extrabold tracking-tight text-[var(--theme-heading-text)]">Tag: {decoded}</h1>
        <p className="mt-2 text-sm text-[var(--theme-muted-text)]">{posts.length} post{posts.length === 1 ? "" : "s"}</p>
      </header>
      {posts.length === 0 ? (
        <p className="text-sm text-[var(--theme-muted-text)]">No published posts with this tag yet.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((p) => (
            <li key={p.slug} className="border-b border-[var(--theme-separator)] pb-6">
              <Link href={`/blog/${p.slug}`} className="text-lg font-semibold text-primary hover:underline">
                {p.title}
              </Link>
              <p className="mt-2 line-clamp-2 text-sm text-[var(--theme-muted-text)]">{p.excerpt}</p>
              <p className="mt-2 text-xs text-[var(--theme-muted-text)]">{p.createdAt.toISOString().slice(0, 10)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
