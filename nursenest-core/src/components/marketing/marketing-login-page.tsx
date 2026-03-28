import { LoginForm } from "@/components/auth/login-form";
import { loadMarketingMessages } from "@/lib/marketing-i18n/load-marketing-messages";

/** Pass `""` for `(default)` routes and `` `/${locale}` `` for `[locale]` routes so links stay on the same URL scheme. */
export async function MarketingLoginPage({
  locale,
  recoveryPathPrefix,
}: {
  locale: string;
  recoveryPathPrefix: string;
}) {
  const m = await loadMarketingMessages(locale);
  return (
    <main className="mx-auto w-full max-w-md px-6 py-16">
      <div className="nn-card p-8">
        <h1 className="text-3xl font-bold">{m["pages.login.welcome"]}</h1>
        <p className="mt-2 text-sm text-muted">{m["pages.login.subtitle"]}</p>
        <LoginForm
          recoveryPathPrefix={recoveryPathPrefix}
          forgotPasswordLabel={m["pages.login.forgotPassword"]}
          forgotEmailLabel={m["pages.login.forgotEmail"]}
        />
      </div>
    </main>
  );
}
