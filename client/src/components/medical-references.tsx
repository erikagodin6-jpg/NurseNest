import { BookOpen, ExternalLink } from "lucide-react";

interface Reference {
  source: string;
  title: string;
  url?: string;
  year?: string;
}

const COMMON_REFERENCES: Reference[] = [
  {
    source: "World Health Organization (WHO)",
    title: "International Classification of Diseases and Clinical Guidelines",
    url: "https://www.who.int",
  },
  {
    source: "Centers for Disease Control and Prevention (CDC)",
    title: "Clinical Practice Guidelines and Disease Prevention",
    url: "https://www.cdc.gov",
  },
  {
    source: "National Institutes of Health (NIH)",
    title: "National Library of Medicine Clinical Resources",
    url: "https://www.nih.gov",
  },
  {
    source: "Registered Nurses' Association of Ontario (RNAO)",
    title: "Best Practice Guidelines for Clinical Nursing",
    url: "https://rnao.ca/bpg",
  },
];

const TOPIC_REFERENCES: Record<string, Reference[]> = {
  cardiovascular: [
    { source: "American Heart Association (AHA)", title: "Guidelines for Cardiovascular Disease Prevention and Management", url: "https://www.heart.org", year: "2024" },
    { source: "Heart & Stroke Foundation of Canada", title: "Clinical Practice Guidelines for Heart Disease", url: "https://www.heartandstroke.ca" },
  ],
  respiratory: [
    { source: "American Thoracic Society (ATS)", title: "Clinical Practice Guidelines for Respiratory Care", url: "https://www.thoracic.org" },
    { source: "Canadian Thoracic Society", title: "Respiratory Disease Management Guidelines", url: "https://cts-sct.ca" },
  ],
  pharmacology: [
    { source: "Health Canada Drug Product Database", title: "Approved Drug Information and Safety Alerts", url: "https://www.canada.ca/en/health-canada.html" },
    { source: "Institute for Safe Medication Practices (ISMP)", title: "Medication Safety Resources and High-Alert Medications", url: "https://www.ismp.org" },
  ],
  neurological: [
    { source: "American Academy of Neurology (AAN)", title: "Clinical Practice Guidelines for Neurological Disorders", url: "https://www.aan.com" },
  ],
  pediatrics: [
    { source: "Canadian Paediatric Society (CPS)", title: "Position Statements and Practice Guidelines", url: "https://cps.ca" },
    { source: "American Academy of Pediatrics (AAP)", title: "Clinical Practice Guidelines for Pediatric Care", url: "https://www.aap.org" },
  ],
  maternity: [
    { source: "Society of Obstetricians and Gynaecologists of Canada (SOGC)", title: "Clinical Practice Guidelines for Maternal-Fetal Medicine", url: "https://www.sogc.org" },
  ],
  "mental-health": [
    { source: "American Psychiatric Association (APA)", title: "Practice Guidelines for Mental Health Disorders", url: "https://www.psychiatry.org" },
    { source: "Mental Health Commission of Canada", title: "Standards and Guidelines for Mental Health Nursing", url: "https://mentalhealthcommission.ca" },
  ],
  oncology: [
    { source: "Canadian Cancer Society", title: "Clinical Practice Guidelines for Cancer Care", url: "https://cancer.ca" },
    { source: "Oncology Nursing Society (ONS)", title: "Evidence-Based Practice Resources", url: "https://www.ons.org" },
  ],
  "infection-control": [
    { source: "Public Health Agency of Canada (PHAC)", title: "Infection Prevention and Control Guidelines", url: "https://www.canada.ca/en/public-health.html" },
    { source: "Association for Professionals in Infection Control (APIC)", title: "Infection Prevention Resources", url: "https://apic.org" },
  ],
  endocrine: [
    { source: "Canadian Diabetes Association (Diabetes Canada)", title: "Clinical Practice Guidelines for Diabetes Management", url: "https://www.diabetes.ca" },
    { source: "American Association of Clinical Endocrinology (AACE)", title: "Endocrine Practice Guidelines", url: "https://www.aace.com" },
  ],
  gastrointestinal: [
    { source: "Canadian Association of Gastroenterology (CAG)", title: "Clinical Practice Guidelines for GI Disorders", url: "https://www.cag-acg.org" },
  ],
  renal: [
    { source: "Kidney Foundation of Canada", title: "Clinical Practice Guidelines for Kidney Disease", url: "https://kidney.ca" },
  ],
  hematology: [
    { source: "Canadian Blood Services", title: "Clinical Guide to Transfusion", url: "https://www.blood.ca" },
  ],
};

function getTopicReferences(lessonId: string): Reference[] {
  const id = lessonId.toLowerCase();
  for (const [topic, refs] of Object.entries(TOPIC_REFERENCES)) {
    if (id.includes(topic)) return refs;
  }
  if (id.includes("cardiac") || id.includes("heart") || id.includes("aortic") || id.includes("arrhythmia") || id.includes("dvt") || id.includes("hypertens"))
    return TOPIC_REFERENCES.cardiovascular || [];
  if (id.includes("lung") || id.includes("asthma") || id.includes("copd") || id.includes("pneumo") || id.includes("bronch"))
    return TOPIC_REFERENCES.respiratory || [];
  if (id.includes("drug") || id.includes("medic") || id.includes("pharma"))
    return TOPIC_REFERENCES.pharmacology || [];
  if (id.includes("neuro") || id.includes("stroke") || id.includes("seizure") || id.includes("brain"))
    return TOPIC_REFERENCES.neurological || [];
  if (id.includes("pedia") || id.includes("child") || id.includes("neonat") || id.includes("infant"))
    return TOPIC_REFERENCES.pediatrics || [];
  if (id.includes("matern") || id.includes("pregn") || id.includes("obstet") || id.includes("postpartum") || id.includes("labor"))
    return TOPIC_REFERENCES.maternity || [];
  if (id.includes("psych") || id.includes("mental") || id.includes("anxiety") || id.includes("depress"))
    return TOPIC_REFERENCES["mental-health"] || [];
  if (id.includes("cancer") || id.includes("tumor") || id.includes("chemo") || id.includes("oncol"))
    return TOPIC_REFERENCES.oncology || [];
  if (id.includes("infect") || id.includes("sepsis") || id.includes("sterili"))
    return TOPIC_REFERENCES["infection-control"] || [];
  if (id.includes("diabet") || id.includes("thyroid") || id.includes("adrenal") || id.includes("insulin"))
    return TOPIC_REFERENCES.endocrine || [];
  if (id.includes("liver") || id.includes("bowel") || id.includes("gastro") || id.includes("pancrea"))
    return TOPIC_REFERENCES.gastrointestinal || [];
  if (id.includes("kidney") || id.includes("renal") || id.includes("dialysis"))
    return TOPIC_REFERENCES.renal || [];
  if (id.includes("blood") || id.includes("anemia") || id.includes("transfus") || id.includes("hemato"))
    return TOPIC_REFERENCES.hematology || [];
  return [];
}

interface MedicalReferencesProps {
  lessonId: string;
  className?: string;
}

export function MedicalReferences({ lessonId, className = "" }: MedicalReferencesProps) {
  const topicRefs = getTopicReferences(lessonId);
  const allRefs = [...topicRefs, ...COMMON_REFERENCES];

  return (
    <section className={`rounded-xl border border-gray-200 bg-gray-50/50 p-6 ${className}`} data-testid="section-medical-references">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">References & Clinical Sources</h3>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        This content is based on evidence from peer-reviewed clinical guidelines and recognized healthcare authorities.
      </p>
      <ol className="space-y-2 list-decimal list-inside">
        {allRefs.map((ref, i) => (
          <li key={i} className="text-sm text-gray-700 leading-relaxed">
            <span className="font-medium">{ref.source}</span>
            {ref.year && <span className="text-gray-400"> ({ref.year})</span>}
            . <span className="italic">{ref.title}</span>.
            {ref.url && (
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 ml-1 text-primary hover:underline"
                data-testid={`link-reference-${i}`}
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </li>
        ))}
      </ol>
      <p className="text-xs text-gray-400 mt-4 border-t border-gray-200 pt-3">
        Content is for educational purposes and nursing exam preparation. Always refer to current institutional protocols and clinical guidelines in practice.
      </p>
    </section>
  );
}
