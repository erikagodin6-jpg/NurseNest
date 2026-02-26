import { Link } from "wouter";
import { ThemedLogo } from "@/components/themed-logo";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-white border-t border-primary/10 py-12 mt-auto text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <ThemedLogo width={160} />
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-500">
            <Link href="/terms" className="hover:text-primary transition-colors">{t("footer.terms")}</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">{t("footer.privacy")}</Link>
            <Link href="/disclaimer" className="hover:text-primary transition-colors">{t("footer.disclaimer")}</Link>
            <Link href="/refund-policy" className="hover:text-primary transition-colors">{t("footer.refundPolicy")}</Link>
            <Link href="/faq" className="hover:text-primary transition-colors">{t("footer.faq")}</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">{t("footer.contact")}</Link>
            <Link href="/blog" className="hover:text-primary transition-colors">{t("nav.blog")}</Link>
          </div>
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} NurseNest. {t("footer.rights")}
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-gray-400 max-w-3xl mx-auto leading-relaxed">
          {t("footer.legalDisclaimer")}
        </div>
      </div>
    </footer>
  );
}
