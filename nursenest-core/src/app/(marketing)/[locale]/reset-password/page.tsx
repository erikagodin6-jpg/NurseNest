import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { loadMarketingMessages } from "@/lib/marketing-i18n/load-marketing-messages";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const m = await loadMarketingMessages(locale);
  return {
    title: m["pages.recovery.resetPassword.title"],
    description: m["pages.recovery.resetPassword.description"],
    alternates: { canonical: `/${locale}/reset-password` },
  };
}

export default async function LocalizedResetPasswordPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const m = await loadMarketingMessages(locale);
  const sp = await searchParams;
  const token = typeof sp.token === "string" ? sp.token : null;

  return (
    <main className="mx-auto w-full max-w-md px-6 py-16">
      <div className="nn-card p-8">
        <h1 className="text-3xl font-bold">{m["pages.recovery.resetPassword.title"]}</h1>
        <p className="mt-2 text-sm text-muted">{m["pages.recovery.resetPassword.subtitle"]}</p>
        <ResetPasswordForm token={token} pathPrefix={`/${locale}`} />
      </div>
    </main>
  );
}
