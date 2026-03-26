"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setError(null);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      country: String(formData.get("country") ?? "CA"),
      tier: String(formData.get("tier") ?? "RN"),
    };

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setError("Unable to create account. Please check your details.");
      return;
    }
    router.push("/login");
  }

  return (
    <form action={onSubmit} className="mt-6 space-y-4">
      <input className="w-full rounded-xl border border-border bg-white px-3 py-2" type="text" name="name" placeholder="Full name" required />
      <input className="w-full rounded-xl border border-border bg-white px-3 py-2" type="email" name="email" placeholder="Email" required />
      <input className="w-full rounded-xl border border-border bg-white px-3 py-2" type="password" name="password" placeholder="Password (8+ chars)" required />
      <div className="grid gap-3 sm:grid-cols-2">
        <select className="rounded-xl border border-border bg-white px-3 py-2" name="country" defaultValue="CA">
          <option value="CA">Canada</option>
          <option value="US">United States</option>
        </select>
        <select className="rounded-xl border border-border bg-white px-3 py-2" name="tier" defaultValue="RN">
          <option value="RPN">RPN</option>
          <option value="LVN_LPN">LVN/LPN</option>
          <option value="RN">RN</option>
          <option value="NP">NP</option>
        </select>
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button className="w-full rounded-xl bg-primary px-4 py-2 font-semibold" type="submit">
        Create account
      </button>
    </form>
  );
}
