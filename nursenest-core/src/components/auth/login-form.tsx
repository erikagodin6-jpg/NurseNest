"use client";

import { useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setError(null);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const result = await signIn("credentials", { email, password, redirect: false });
    if (result?.error) {
      setError("Invalid email/password.");
      return;
    }
    router.refresh();
    const session = await getSession();
    const role = (session?.user as { role?: string } | undefined)?.role;
    router.push(role === "ADMIN" ? "/admin" : "/app");
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
