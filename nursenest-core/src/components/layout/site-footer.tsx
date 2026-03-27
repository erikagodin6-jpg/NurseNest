import Link from "next/link";

const columns = [
  {
    title: "Study Tools",
    links: [
      { href: "/app/lessons", label: "Clinical Lessons" },
      { href: "/app/questions", label: "Question Bank" },
      { href: "/app/exams", label: "Practice Exams" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Learner Paths",
    links: [
      { href: "/pricing", label: "RPN / LVN-LPN Prep" },
      { href: "/pricing", label: "RN / NCLEX Prep" },
      { href: "/pricing", label: "NP Certification Prep" },
      { href: "/signup", label: "Start Free Trial" },
    ],
  },
  {
    title: "Platform",
    links: [
      { href: "/", label: "Homepage" },
      { href: "/login", label: "Log In" },
      { href: "/signup", label: "Create Account" },
      { href: "/app", label: "Dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/", label: "About NurseNest" },
      { href: "/pricing", label: "Plans" },
      { href: "/signup", label: "For Schools" },
      { href: "/login", label: "Support" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--theme-nav-border)] bg-[var(--theme-card-bg)] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--theme-separator)] pb-6">
          <div>
            <p className="text-lg font-extrabold tracking-tight text-[var(--theme-heading-text)]">NurseNest</p>
            <p className="mt-1 text-sm text-[var(--theme-muted-text)]">Exam prep for nursing and healthcare pathways.</p>
          </div>
          <Link href="/signup" className="nn-btn-primary px-5 py-2.5 text-sm font-bold">
            Start Free
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((group) => (
            <section key={group.title}>
              <h3 className="mb-3 text-sm font-semibold text-[var(--theme-heading-text)]">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-[var(--theme-muted-text)] transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-10 border-t border-[var(--theme-separator)] pt-6 text-center text-xs text-[var(--theme-muted-text)]">
          <p>© {new Date().getFullYear()} NurseNest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
