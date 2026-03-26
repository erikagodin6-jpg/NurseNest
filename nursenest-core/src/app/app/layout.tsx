import Link from "next/link";
import { requireUser } from "@/lib/auth/guards";
import { signOut } from "@/lib/auth";

export default async function LearnerLayout({ children }: { children: React.ReactNode }) {
  await requireUser();
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <nav className="flex gap-2 text-sm font-medium">
          <Link className="rounded-lg bg-card px-3 py-2" href="/app">
            Dashboard
          </Link>
          <Link className="rounded-lg bg-card px-3 py-2" href="/app/lessons">
            Lessons
          </Link>
          <Link className="rounded-lg bg-card px-3 py-2" href="/app/questions">
            Question Bank
          </Link>
          <Link className="rounded-lg bg-card px-3 py-2" href="/app/exams">
            Practice Exams
          </Link>
        </nav>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button className="rounded-lg border border-border bg-card px-3 py-2 text-sm">Logout</button>
        </form>
      </header>
      {children}
    </div>
  );
}
