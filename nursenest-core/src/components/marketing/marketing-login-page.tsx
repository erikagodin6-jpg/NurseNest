import { LoginForm } from "@/components/auth/login-form";
import { loadMarketingMessages } from "@/lib/marketing-i18n/load-marketing-messages";

/** Pass `""` for `(default)` routes and `` `/${locale}` `` for `[locale]` routes so links stay on the same URL scheme. */
export async function MarketingLoginPage({
  locale,
  recoveryPathPrefix,
  callbackUrl,
  registered,
}: {
  locale: string;
  recoveryPathPrefix: string;
  /** Post-login redirect (validated in LoginForm — same-origin path only). */
  callbackUrl?: string;
  /** From `?registered=1` after successful signup */
  registered?: boolean;
}) {
  const m = await loadMarketingMessages(locale);
  return (
    <main className="mx-auto w-full max-w-md px-6 py-16">
      <div className="nn-card p-8">
        <h1 className="text-3xl font-bold">{m["pages.login.welcome"]}</h1>
        <p className="mt-2 text-sm text-muted">{m["pages.login.subtitle"]}</p>
        {registered ? (
          <p className="mt-4 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-sm text-foreground">
            Account created. Sign in with your email and password.
          </p>
        ) : null}
        <LoginForm
          recoveryPathPrefix={recoveryPathPrefix}
          callbackUrl={callbackUrl}
          forgotPasswordLabel={m["pages.login.forgotPassword"]}
          forgotEmailLabel={m["pages.login.forgotEmail"]}
        />
      </div>
    </main>
  );
}
