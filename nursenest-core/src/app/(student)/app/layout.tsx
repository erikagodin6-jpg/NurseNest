import Link from "next/link";
import { requireUser } from "@/lib/auth/guards";
import { signOut } from "@/lib/auth";
import { LearnerThemeControl } from "@/components/student/learner-theme-control";

export default async function LearnerLayout({ children }: { children: React.ReactNode }) {
  await requireUser();
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8">
      <header className="nn-card mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl p-4">
        <nav className="flex flex-wrap items-center gap-2 text-sm font-medium">
          <Link className="rounded-full border border-primary/15 bg-primary/8 px-3 py-2 text-primary" href="/app">
            Dashboard
          </Link>
          <Link className="rounded-full border border-border bg-white px-3 py-2 hover:bg-gray-50" href="/app/lessons">
            Lessons
          </Link>
          <Link className="rounded-full border border-border bg-white px-3 py-2 hover:bg-gray-50" href="/app/questions">
            Question Bank
          </Link>
          <Link className="rounded-full border border-border bg-white px-3 py-2 hover:bg-gray-50" href="/app/exams">
            Practice Exams
          </Link>
        </nav>
        <div className="flex flex-wrap items-center gap-3">
          <LearnerThemeControl />
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button className="rounded-full border border-border bg-white px-3 py-2 text-sm hover:bg-gray-50">Logout</button>
        </form>
        </div>
      </header>
      {children}
    </div>
  );
}
