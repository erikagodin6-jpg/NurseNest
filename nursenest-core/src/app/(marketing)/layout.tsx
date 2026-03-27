import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import "./marketing-dark-utilities.css";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="nn-marketing-surface flex min-h-screen flex-col bg-[var(--theme-page-bg)]">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
