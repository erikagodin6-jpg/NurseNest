import Link from "next/link";
import { auth } from "@/lib/auth";
import { requireUser } from "@/lib/auth/guards";
import { signOut } from "@/lib/auth";
import { CheckoutSuccessBanner } from "@/components/student/checkout-success-banner";
import { LearnerThemeControl } from "@/components/student/learner-theme-control";
import { SentryLearnerShell } from "@/components/observability/sentry-learner-shell";

export default async function LearnerShellLayout({ children }: { children: React.ReactNode }) {
  await requireUser();
  const session = await auth();
  const userId = (session?.user as { id?: string })?.id ?? "";

  return (
    <SentryLearnerShell userId={userId}>
    <div className="mx-auto w-full max-w-6xl px-6 py-8">
      <header className="nn-card mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl p-4">
        <nav className="flex flex-wrap items-center gap-2 text-sm font-medium" aria-label="App">
          <Link
            className="inline-flex min-h-11 min-w-[44px] items-center justify-center rounded-full border border-primary/15 bg-primary/8 px-3 py-2 text-primary"
            href="/app"
          >
            Dashboard
          </Link>
          <Link
            className="inline-flex min-h-11 min-w-[44px] items-center justify-center rounded-full border border-border bg-white px-3 py-2 hover:bg-gray-50"
            href="/app/lessons"
          >
            Lessons
          </Link>
          <Link
            className="inline-flex min-h-11 min-w-[44px] items-center justify-center rounded-full border border-border bg-white px-3 py-2 hover:bg-gray-50"
            href="/app/questions"
          >
            Question Bank
          </Link>
          <Link
            className="inline-flex min-h-11 min-w-[44px] items-center justify-center rounded-full border border-border bg-white px-3 py-2 hover:bg-gray-50"
            href="/app/exams"
          >
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
            <button type="submit" className="rounded-full border border-border bg-white px-3 py-2 text-sm hover:bg-gray-50">
              Logout
            </button>
          </form>
        </div>
      </header>
      <CheckoutSuccessBanner />
      {children}
    </div>
    </SentryLearnerShell>
  );
}
