"use client";

import Link from "next/link";
import { useMarketingI18n } from "@/lib/marketing-i18n";
import { withMarketingLocale } from "@/lib/i18n/marketing-path";

type Props = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function ToolShell({ title, description, children }: Props) {
  const { locale, t } = useMarketingI18n();
  const toolsHref = withMarketingLocale(locale, "/tools");

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-[var(--theme-muted-text)]">
        <Link href={toolsHref} className="font-medium text-primary hover:underline">
          Tools
        </Link>
        <span className="mx-2" aria-hidden>
          /
        </span>
        <span className="text-[var(--theme-heading-text)]">{title}</span>
      </nav>
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--theme-heading-text)] sm:text-3xl">{title}</h1>
        {description ? <p className="mt-2 text-sm leading-relaxed text-[var(--theme-muted-text)]">{description}</p> : null}
      </header>
      {children}
      <p className="mt-10 rounded-lg border border-[var(--theme-nav-border)] bg-[var(--theme-card-bg)]/80 p-4 text-xs leading-relaxed text-[var(--theme-muted-text)]">
        {t("tools.disclaimer")}
      </p>
    </div>
  );
}
