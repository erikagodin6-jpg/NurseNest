import { useAuth } from "@/lib/auth";
import { useState } from "react";
import { X, TestTube, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TesterFeedbackDialog } from "@/components/tester-feedback-dialog";

export function TesterBanner() {
  const { user, isTester } = useAuth();
  const [dismissed, setDismissed] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  if (!isTester || dismissed) return null;

  const expiryDate = user?.testerExpiry ? new Date(user.testerExpiry) : null;
  const daysLeft = expiryDate ? Math.max(0, Math.ceil((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))) : null;

  return (
    <>
      <div className="bg-gradient-to-r from-[#BFA6F6]/15 to-[#AEE3E1]/15 border-b border-[#BFA6F6]/20" data-testid="tester-banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm">
            <TestTube className="w-4 h-4 text-[#BFA6F6] flex-shrink-0" />
            <span className="text-[#2E3A59] font-medium">
              Beta Tester Access
            </span>
            {daysLeft !== null && (
              <span className="text-gray-500">
                {daysLeft > 0 ? `${daysLeft} days remaining` : "Expiring today"}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="text-xs text-[#BFA6F6] hover:text-[#BFA6F6]/80 hover:bg-[#BFA6F6]/10 h-7 px-2"
              onClick={() => setFeedbackOpen(true)}
              data-testid="button-tester-feedback"
            >
              <MessageSquare className="w-3.5 h-3.5 mr-1" />
              Send Feedback
            </Button>
            <button
              onClick={() => setDismissed(true)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Dismiss banner"
              data-testid="button-dismiss-tester-banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <TesterFeedbackDialog open={feedbackOpen} onOpenChange={setFeedbackOpen} />
    </>
  );
}
