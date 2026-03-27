import Link from "next/link";
import { requireUser } from "@/lib/auth/guards";
import "./exam-shell.css";

/**
 * Isolated exam surface: no marketing chrome, no ThemePicker, no learner nav.
 * Theme tokens are locked to a light, high-contrast baseline for item readability.
 */
export default async function ExamShellLayout({ children }: { children: React.ReactNode }) {
  await requireUser();
  return (
    <div className="nn-exam-surface mx-auto w-full max-w-4xl px-6 py-8">
      <nav className="mb-6 text-sm">
        <Link href="/app" className="font-medium text-primary hover:underline">
          ← Back to dashboard
        </Link>
      </nav>
      {children}
    </div>
  );
}
