"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function safeCallbackPath(raw: string | null): string | null {
  if (!raw?.trim()) return null;
  try {
    const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost";
    const u = new URL(raw, origin);
    if (u.origin !== new URL(origin).origin) return null;
    if (!u.pathname.startsWith("/")) return null;
    return `${u.pathname}${u.search}${u.hash}`;
  } catch {
    return null;
  }
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setError(null);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const fromQuery = safeCallbackPath(searchParams.get("callbackUrl"));
    const redirectTarget = fromQuery ?? "/app";

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      redirectTo: redirectTarget,
    });

    if (result?.error) {
      setError("Invalid email/password.");
      return;
    }
    if (result && result.ok === false) {
      setError("Unable to sign in. Try again.");
      return;
    }

    router.refresh();
    router.push(redirectTarget);
  }

  return (
    <form action={onSubmit} className="mt-6 space-y-4">
      <input className="w-full rounded-xl border border-border bg-white px-3 py-2" type="email" name="email" placeholder="Email" required />
      <input className="w-full rounded-xl border border-border bg-white px-3 py-2" type="password" name="password" placeholder="Password" required />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button className="w-full rounded-xl bg-primary px-4 py-2 font-semibold" type="submit">
        Sign in
      </button>
    </form>
  );
}
