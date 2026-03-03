import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Target,
  Stethoscope,
  CheckCircle2,
  ArrowRight,
  X,
} from "lucide-react";
import { useExitIntent } from "@/hooks/use-exit-intent";

const VALUE_PROPS = [
  { icon: Target, text: "Free diagnostic exam to find your weak areas" },
  { icon: BookOpen, text: "Access to pathophysiology study resources" },
  { icon: Stethoscope, text: "Clinical practice questions with rationales" },
];

export function ExitIntentModal() {
  const { showModal, dismiss, dismissPermanently } = useExitIntent();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, frequency: "weekly" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Subscription failed.");
      }
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <Dialog open={showModal} onOpenChange={(open) => { if (!open) dismiss(); }}>
      <DialogContent
        className="sm:max-w-md p-0 overflow-hidden"
        data-testid="exit-intent-modal"
      >
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent px-6 pt-6 pb-4">
          <DialogHeader>
            <DialogTitle
              className="text-xl font-bold text-gray-900"
              data-testid="text-exit-intent-heading"
            >
              Wait — don't leave empty-handed!
            </DialogTitle>
            <DialogDescription
              className="text-sm text-gray-600 mt-1"
              data-testid="text-exit-intent-description"
            >
              Get a personalized study plan and free diagnostic exam sent straight to your inbox.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 py-4 space-y-4">
          {status === "success" ? (
            <div className="text-center py-4 space-y-3" data-testid="exit-intent-success">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <p className="text-lg font-semibold text-gray-900">You're in!</p>
              <p className="text-sm text-gray-600">
                Check your inbox for your free study plan and diagnostic exam link.
              </p>
              <Button
                variant="outline"
                className="mt-2"
                onClick={dismiss}
                data-testid="button-exit-intent-close-success"
              >
                Continue Browsing
              </Button>
            </div>
          ) : (
            <>
              <ul className="space-y-2.5">
                {VALUE_PROPS.map((prop) => {
                  const Icon = prop.icon;
                  return (
                    <li key={prop.text} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm text-gray-700">{prop.text}</span>
                    </li>
                  );
                })}
              </ul>

              <form onSubmit={handleSubmit} className="space-y-3 pt-2">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                  className="h-11"
                  data-testid="input-exit-intent-email"
                  disabled={status === "loading"}
                />
                {status === "error" && (
                  <p className="text-xs text-red-500" data-testid="text-exit-intent-error">
                    {errorMsg}
                  </p>
                )}
                <Button
                  type="submit"
                  className="w-full h-11 text-sm font-medium"
                  disabled={status === "loading"}
                  data-testid="button-exit-intent-submit"
                >
                  {status === "loading" ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Subscribing...
                    </span>
                  ) : (
                    <>
                      Get Your Free Study Plan
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              <button
                className="w-full text-center text-xs text-gray-400 hover:text-gray-600 transition-colors py-1"
                onClick={dismissPermanently}
                data-testid="button-exit-intent-dont-show"
              >
                Don't show this again
              </button>

              <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                No spam, ever. Unsubscribe anytime. We respect your privacy.
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
