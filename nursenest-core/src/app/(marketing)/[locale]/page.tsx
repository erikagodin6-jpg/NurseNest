import type { Metadata } from "next";
import HomeRestoredClient from "@/components/marketing/home-restored-client";
import { loadMarketingMessages } from "@/lib/marketing-i18n/load-marketing-messages";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const m = await loadMarketingMessages(locale);
  return {
    title: m["pages.home.metaTitle"],
    description: m["pages.home.metaDescription"],
    alternates: { canonical: `/${locale}` },
  };
}

export default function LocalizedHomePage() {
  return <HomeRestoredClient />;
}
