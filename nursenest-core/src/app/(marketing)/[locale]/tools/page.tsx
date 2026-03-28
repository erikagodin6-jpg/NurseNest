import type { Metadata } from "next";
import { ToolsHubPage } from "@/components/marketing/tools-hub-page";
import { loadMarketingMessages } from "@/lib/marketing-i18n/load-marketing-messages";
import { formatMarketingMessage } from "@/lib/marketing-i18n-core";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await loadMarketingMessages(locale);
  return {
    title: formatMarketingMessage(messages, "pages.tools.title"),
    description: formatMarketingMessage(messages, "pages.tools.description"),
    alternates: { canonical: `/${locale}/tools` },
  };
}

export default async function LocalizedToolsIndexPage({ params }: Props) {
  const { locale } = await params;
  return <ToolsHubPage locale={locale} />;
}
