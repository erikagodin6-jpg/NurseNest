import type { ReactNode } from "react";
import { AlliedNavigation } from "./allied-navigation";
import { AlliedFooter } from "./allied-footer";
import { AlliedBreadcrumbs } from "./allied-breadcrumbs";

export function AlliedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-teal-50/30 to-white" data-testid="allied-layout">
      <AlliedNavigation />
      <AlliedBreadcrumbs />
      <main className="flex-1">
        {children}
      </main>
      <AlliedFooter />
    </div>
  );
}
