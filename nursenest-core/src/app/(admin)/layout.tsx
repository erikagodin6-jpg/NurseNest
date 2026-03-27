import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import "../(marketing)/marketing-dark-utilities.css";

export default function AdminGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="nn-marketing-surface flex min-h-screen flex-col bg-[var(--theme-page-bg)]">
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}
