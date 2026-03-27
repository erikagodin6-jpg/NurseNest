import { requireAdmin } from "@/lib/auth/guards";
import { prisma } from "@/lib/db";

export default async function AdminPage() {
  await requireAdmin();

  const [lessonCount, questionCount] = await Promise.all([
    prisma.lesson.count(),
    prisma.question.count(),
  ]);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-bold">Admin panel</h1>
      <p className="mt-2 text-muted">Manage lessons, questions, publishing, and exam mappings.</p>
      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        <article className="nn-card p-6">
          <p className="text-sm text-muted">Lessons</p>
          <p className="mt-1 text-3xl font-bold">{lessonCount}</p>
        </article>
        <article className="nn-card p-6">
          <p className="text-sm text-muted">Questions</p>
          <p className="mt-1 text-3xl font-bold">{questionCount}</p>
        </article>
      </section>
    </main>
  );
}
