import type { ReactNode } from "react";
import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { AlliedSubNav } from "./allied-sub-nav";

export function AlliedLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  const isCareerPage = /^\/(rrt|paramedic|pharmacy-technician|mlt|imaging|occupational-therapy|physical-therapy|social-work|psychotherapy|addictions|health-info-mgmt)(\/|$)/.test(location);

  return (
    <div className="min-h-screen flex flex-col" data-testid="allied-layout">
      <Navigation />
      {isCareerPage && <AlliedSubNav />}
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
