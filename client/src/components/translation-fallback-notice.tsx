import { useI18n } from "@/lib/i18n";
import { AlertTriangle } from "lucide-react";

export function TranslationFallbackNotice() {
  const { language, t, isFallback } = useI18n();

  if (language === "en") return null;

  const showNotice = isFallback("intl.hub.title");
  if (!showNotice) return null;

  return (
    <div
      className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-6 flex items-start gap-3"
      data-testid="translation-fallback-notice"
    >
      <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
      <div className="text-sm text-amber-800">
        <p>{t("intl.fallback.notice")}</p>
        <p className="mt-1 text-amber-600 text-xs">{t("intl.fallback.translationComing")}</p>
      </div>
    </div>
  );
}
