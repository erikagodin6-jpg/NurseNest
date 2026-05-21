"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { ClinicalSkillStep } from "@/lib/clinical-skills/types";

export function SkillWalkthrough({ steps }: { steps: ClinicalSkillStep[] }) {
  return (
    <div className="nn-card p-4 sm:p-6" data-testid="clinical-skill-walkthrough">
      <h2 className="text-lg font-semibold text-[var(--theme-heading-text)]">Procedure walkthrough</h2>
      <p className="mt-1 text-sm text-[var(--theme-muted-text)]">
        Expand each step for bedside-oriented guidance. Always follow institutional policy and scope.
      </p>
      <Accordion type="multiple" className="mt-4 space-y-2">
        {steps.map((step, idx) => (
          <AccordionItem
            key={step.id}
            value={step.id}
            className="rounded-xl border border-border bg-card px-4 data-[state=open]:shadow-sm"
          >
            <AccordionTrigger className="py-4 text-left text-sm font-semibold text-[var(--theme-heading-text)] hover:no-underline">
              <span className="mr-2 text-[var(--theme-muted-text)]">{idx + 1}.</span>
              {step.title}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-sm leading-relaxed text-[var(--theme-body-text)]">
              {step.detail}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
