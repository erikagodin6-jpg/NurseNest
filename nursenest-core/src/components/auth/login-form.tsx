"use client";

import { useState } from "react";
import Link from "next/link";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { trackAuthEvent } from "@/lib/observability/client-auth-events";

type Props = {
  /** e.g. "" for default locale routes, "/fr" for localized routes */
  recoveryPathPrefix?: string;
  /** From server `searchParams` — only same-origin paths applied after sign-in */
  callbackUrl?: string;
  forgotPasswordLabel?: string;
  forgotEmailLabel?: string;
};

/** Only allow same-origin relative redirects after sign-in. */
function safePostLoginPath(raw: string | null): string {
  if (!raw || typeof raw !== "string") return "/app";
  const t = raw.trim();
  if (!t.startsWith("/") || t.startsWith("//")) return "/app";
  return t;
}

export function LoginForm({
  recoveryPathPrefix = "",
  callbackUrl: callbackUrlProp,
  forgotPasswordLabel = "Forgot password?",
  forgotEmailLabel = "Forgot email or login ID?",
}: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const p = recoveryPathPrefix.replace(/\/$/, "");
  const callbackUrl = safePostLoginPath(callbackUrlProp ?? null);

  async function onSubmit(formData: FormData) {
    setError(null);
    setPending(true);
    trackAuthEvent("auth_login_attempt", {});
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    try {
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) {
        setError("We couldn’t sign you in with that email and password. Check for typos, or reset your password.");
        trackAuthEvent("auth_login_failed", { reason: "credentials" });
        return;
      }
      router.refresh();
      const session = await getSession();
      const role = (session?.user as { role?: string } | undefined)?.role;
      trackAuthEvent("auth_login_success", { role: role ?? "unknown" });
      router.push(role === "ADMIN" ? "/admin" : callbackUrl);
    } catch {
      setError("Something went wrong. Check your connection and try again.");
      trackAuthEvent("auth_login_failed", { reason: "network_or_unknown" });
    } finally {
      setPending(false);
    }
  }

  return (
    <form action={onSubmit} className="mt-6 space-y-4">
      <input
        className="w-full rounded-xl border border-border bg-white px-3 py-2"
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="email"
        required
        disabled={pending}
      />
      <input
        className="w-full rounded-xl border border-border bg-white px-3 py-2"
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="current-password"
        required
        disabled={pending}
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div className="flex flex-col gap-1 text-sm">
        <Link className="text-primary underline" href={`${p}/forgot-password`}>
          {forgotPasswordLabel}
        </Link>
        <Link className="text-primary underline" href={`${p}/forgot-email`}>
          {forgotEmailLabel}
        </Link>
      </div>
      <button className="w-full rounded-xl bg-primary px-4 py-2 font-semibold disabled:opacity-60" type="submit" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
