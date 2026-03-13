import { useState } from "react";
import { Mail, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EmailSignupPromptProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  variant?: "inline" | "banner" | "card";
  className?: string;
}

export function EmailSignupPrompt({
  title = "Get Free Nursing Study Tips",
  subtitle = "Weekly NCLEX strategies, clinical pearls, and exam prep resources delivered to your inbox.",
  buttonText = "Subscribe",
  variant = "card",
  className = "",
}: EmailSignupPromptProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/email-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={`flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl ${className}`} data-testid="email-signup-success">
        <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
        <p className="text-sm text-emerald-800 font-medium">You are subscribed. Check your inbox for a welcome email.</p>
      </div>
    );
  }

  if (variant === "banner") {
    return (
      <div className={`bg-gradient-to-r from-primary/10 via-purple-50 to-primary/5 border border-primary/15 rounded-2xl p-6 ${className}`} data-testid="email-signup-banner">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
              <p className="text-xs text-gray-500">{subtitle}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 w-full sm:w-auto">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-9 text-sm min-w-[200px]"
              required
              data-testid="input-email-signup"
            />
            <Button type="submit" size="sm" disabled={status === "loading"} className="shrink-0" data-testid="button-email-subscribe">
              {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : buttonText}
            </Button>
          </form>
        </div>
        {status === "error" && <p className="text-xs text-red-500 mt-2" data-testid="text-signup-error">Something went wrong. Please try again.</p>}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`} data-testid="email-signup-inline">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-10 text-sm"
          required
          data-testid="input-email-signup"
        />
        <Button type="submit" disabled={status === "loading"} className="shrink-0" data-testid="button-email-subscribe">
          {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : buttonText}
        </Button>
      </form>
    );
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-2xl p-6 shadow-sm ${className}`} data-testid="email-signup-card">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Mail className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-10 text-sm"
          required
          data-testid="input-email-signup"
        />
        <Button type="submit" disabled={status === "loading"} className="shrink-0" data-testid="button-email-subscribe">
          {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : buttonText}
        </Button>
      </form>
      {status === "error" && <p className="text-xs text-red-500 mt-2" data-testid="text-signup-error">Something went wrong. Please try again.</p>}
      <p className="text-xs text-gray-400 mt-2">No spam. Unsubscribe anytime.</p>
    </div>
  );
}
