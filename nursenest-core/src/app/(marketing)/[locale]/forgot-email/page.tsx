import type { Metadata } from "next";
import { ForgotEmailForm } from "@/components/auth/forgot-email-form";
import { loadMarketingMessages } from "@/lib/marketing-i18n/load-marketing-messages";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const m = await loadMarketingMessages(locale);
  return {
    title: m["pages.recovery.forgotEmail.title"],
    description: m["pages.recovery.forgotEmail.description"],
    alternates: { canonical: `/${locale}/forgot-email` },
  };
}

export default async function LocalizedForgotEmailPage({ params }: Props) {
  const { locale } = await params;
  const m = await loadMarketingMessages(locale);
  return (
    <main className="mx-auto w-full max-w-md px-6 py-16">
      <div className="nn-card p-8">
        <h1 className="text-3xl font-bold">{m["pages.recovery.forgotEmail.title"]}</h1>
        <p className="mt-2 text-sm text-muted">{m["pages.recovery.forgotEmail.subtitle"]}</p>
        <ForgotEmailForm pathPrefix={`/${locale}`} />
      </div>
    </main>
  );
}
