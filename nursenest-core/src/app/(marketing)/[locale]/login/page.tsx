import type { Metadata } from "next";
import { MarketingLoginPage } from "@/components/marketing/marketing-login-page";
import { loadMarketingMessages } from "@/lib/marketing-i18n/load-marketing-messages";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ callbackUrl?: string; registered?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const m = await loadMarketingMessages(locale);
  return {
    title: m["pages.login.title"],
    description: m["pages.login.description"],
    alternates: { canonical: `/${locale}/login` },
  };
}

export default async function LocalizedLoginPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const q = await searchParams;
  return (
    <MarketingLoginPage
      locale={locale}
      recoveryPathPrefix={`/${locale}`}
      callbackUrl={q.callbackUrl}
      registered={q.registered === "1"}
    />
  );
}
