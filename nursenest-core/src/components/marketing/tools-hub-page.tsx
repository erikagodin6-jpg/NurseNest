import Link from "next/link";
import { hubTools } from "@/lib/platform-tools/tool-registry";
import { isToolSlugEnabled } from "@/lib/platform-tools/tool-flags";
import { loadMarketingMessages } from "@/lib/marketing-i18n/load-marketing-messages";
import { formatMarketingMessage } from "@/lib/marketing-i18n-core";
import { withMarketingLocale } from "@/lib/i18n/marketing-path";

type Props = { locale: string };

export async function ToolsHubPage({ locale }: Props) {
  const messages = await loadMarketingMessages(locale);
  const list = hubTools().filter((t) => isToolSlugEnabled(t.slug));
  const h1 = formatMarketingMessage(messages, "pages.tools.h1");
  const intro = formatMarketingMessage(messages, "pages.tools.intro");

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--theme-heading-text)] sm:text-4xl">{h1}</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--theme-muted-text)]">{intro}</p>
      </header>
      <ul className="grid gap-4 sm:grid-cols-2">
        {list.map((tool) => {
          const title = formatMarketingMessage(messages, tool.titleKey);
          const description = formatMarketingMessage(messages, tool.descriptionKey);
          const href = withMarketingLocale(locale, `/tools/${tool.slug}`);
          return (
            <li key={tool.slug}>
              <Link
                href={href}
                className="block h-full rounded-xl border border-[var(--theme-nav-border)] bg-[var(--theme-card-bg)] p-5 shadow-sm transition hover:border-primary/40 hover:shadow-md"
              >
                <h2 className="text-lg font-semibold text-[var(--theme-heading-text)]">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--theme-muted-text)]">{description}</p>
                <p className="mt-3 text-sm font-medium text-primary">Open →</p>
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="mt-10 text-xs leading-relaxed text-[var(--theme-muted-text)]">
        {formatMarketingMessage(messages, "tools.disclaimer")}
      </p>
    </div>
  );
}
