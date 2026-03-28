import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedBlogPostsForIndex } from "@/lib/blog/safe-blog-queries";

export const metadata: Metadata = {
  title: "Clinical education blog | NurseNest",
  description: "Evidence-based nursing articles on clinical reasoning, pharmacology, lab interpretation, and exam preparation.",
  alternates: { canonical: "/blog" },
};

export const dynamic = "force-dynamic";

export default async function BlogIndexPage() {
  const posts = await getPublishedBlogPostsForIndex();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--theme-heading-text)]">Clinical education blog</h1>
        <p className="mt-2 text-[var(--theme-muted-text)]">Scholarly articles for nursing and allied health exam preparation.</p>
      </header>
      {posts.length === 0 ? (
        <p className="text-sm text-[var(--theme-muted-text)]">No posts yet. Run <code className="rounded bg-[var(--theme-page-bg)] px-1">npx tsx scripts/import-blog.ts</code> after migrating content.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((p) => (
            <li key={p.slug} className="border-b border-[var(--theme-separator)] pb-6">
              <Link href={`/blog/${p.slug}`} className="text-lg font-semibold text-primary hover:underline">
                {p.title}
              </Link>
              {p.category ? (
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[var(--theme-muted-text)]">{p.category}</p>
              ) : null}
              <p className="mt-2 line-clamp-3 text-sm text-[var(--theme-muted-text)]">{p.excerpt}</p>
              <p className="mt-2 text-xs text-[var(--theme-muted-text)]">{p.createdAt.toISOString().slice(0, 10)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
