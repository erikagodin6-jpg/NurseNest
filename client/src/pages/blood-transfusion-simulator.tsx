import { LocaleLink } from "@/lib/LocaleLink";
import { useState, useMemo, useCallback } from "react";
import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { Footer } from "@/components/footer";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { convertTemp, type UnitMode } from "@/lib/unit-conversion";
import {
  Droplets,
  Heart,
  Activity,
  Wind,
  Thermometer,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RotateCcw,
  Lock,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Stethoscope,
  Syringe,
  ClipboardCheck,
  Trophy,
  Info,
  ChevronRight,
} from "lucide-react";
import { AdminEditButton } from "@/components/admin-edit-button";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";

const paidTiers = ["rpn", "rn", "np", "admin", "all_access"];

type BloodType = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

const allBloodTypes: BloodType[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const compatibilityMap: Record<BloodType, BloodType[]> = {
  "O-":  ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
  "O+":  ["O+", "A+", "B+", "AB+"],
  "A-":  ["A-", "A+", "AB-", "AB+"],
  "A+":  ["A+", "AB+"],
  "B-":  ["B-", "B+", "AB-", "AB+"],
  "B+":  ["B+", "AB+"],
  "AB-": ["AB-", "AB+"],
  "AB+": ["AB+"],
};

function canReceive(patient: BloodType, donor: BloodType): boolean {
  return compatibilityMap[donor]?.includes(patient) ?? false;
}

function getCompatibilityRationale(patient: BloodType, donor: BloodType): string {
  const patientABO = patient.replace(/[+-]/, "");
  const donorABO = donor.replace(/[+-]/, "");
  const patientRh = patient.includes("+");
  const donorRh = donor.includes("+");

  if (canReceive(patient, donor)) {
    if (donor === "O-") return "O- is the universal RBC donor  -  it lacks A, B antigens and Rh factor, so no ABO or Rh incompatibility occurs.";
    if (patient === "AB+") return "AB+ is the universal recipient  -  AB plasma has no anti-A or anti-B antibodies, and Rh+ can receive Rh+ or Rh- blood.";
    if (patientABO === donorABO && patientRh === donorRh) return `Exact type match (${donor}). No antigen-antibody mismatch  -  safest transfusion option.`;
    if (patientABO === donorABO) return `ABO match. Rh-negative donor blood is safe for Rh-positive recipients since there is no D antigen to trigger anti-D antibodies.`;
    if (donorABO === "O") return "Type O donor lacks A and B antigens, so recipient's anti-A/anti-B antibodies have nothing to attack. ABO-compatible.";
    return `Compatible: the donor RBCs do not carry antigens that the recipient's plasma antibodies would attack. No hemolysis risk.`;
  }

  const reasons: string[] = [];
  if (!patientRh && donorRh) reasons.push("Rh incompatibility: Rh-negative patients must NOT receive Rh-positive blood  -  it triggers anti-D antibody production and hemolysis.");
  const patientAntibodies = patientABO === "A" ? ["B"] : patientABO === "B" ? ["A"] : patientABO === "O" ? ["A", "B"] : [];
  const donorAntigens = donorABO === "A" ? ["A"] : donorABO === "B" ? ["B"] : donorABO === "AB" ? ["A", "B"] : [];
  const conflict = donorAntigens.filter(a => patientAntibodies.includes(a));
  if (conflict.length > 0) reasons.push(`ABO incompatibility: patient has anti-${conflict.join(" and anti-")} antibodies that attack donor ${conflict.join("/")} antigens → acute hemolytic reaction risk.`);
  return reasons.length > 0 ? reasons.join(" ") : "Incompatible transfusion  -  antigen-antibody mismatch leads to hemolysis risk.";
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRound(): { patient: BloodType; donors: BloodType[] } {
  const patient = pickRandom(allBloodTypes);
  const compatible = allBloodTypes.filter(d => canReceive(patient, d));
  const incompatible = allBloodTypes.filter(d => !canReceive(patient, d));
  const numCompatible = Math.min(compatible.length, Math.max(1, Math.floor(Math.random() * 3) + 1));
  const numIncompatible = Math.min(incompatible.length, 5 - numCompatible);
  const donors = shuffle([...shuffle(compatible).slice(0, numCompatible), ...shuffle(incompatible).slice(0, numIncompatible)]);
  return { patient, donors: donors.slice(0, Math.max(4, Math.min(6, donors.length))) };
}

type ReactionType = "acute_hemolytic" | "febrile_nonhemolytic" | "mild_allergic" | "anaphylactic" | "taco" | "trali";

const reactionLabels: Record<ReactionType, string> = {
  acute_hemolytic: "Acute Hemolytic Reaction",
  febrile_nonhemolytic: "Febrile Non-Hemolytic Reaction",
  mild_allergic: "Mild Allergic Reaction",
  anaphylactic: "Anaphylactic Reaction",
  taco: "TACO (Transfusion-Associated Circulatory Overload)",
  trali: "TRALI (Transfusion-Related Acute Lung Injury)",
};

interface TransfusionScenario {
  id: string;
  timeSinceStart: string;
  patientBackground: string;
  symptoms: string[];
  vitals: { hr: number; bp: string; rr: number; spo2: number; temp: number };
  reactionType: ReactionType;
  priorityAction: string;
  examTrap?: string;
  rationale: string;
}

const scenarios: TransfusionScenario[] = [
  {
    id: "s1",
    timeSinceStart: "5 minutes",
    patientBackground: "68-year-old male receiving first unit of PRBCs for Hgb 62 g/L post-GI bleed.",
    symptoms: ["Sudden fever (39.2°C)", "Severe chills/rigors", "Flank and low back pain", "Dark red-brown urine noted in catheter bag", "Restlessness and anxiety"],
    vitals: { hr: 118, bp: "82/48", rr: 26, spo2: 93, temp: 39.2 },
    reactionType: "acute_hemolytic",
    priorityAction: "STOP the transfusion immediately and maintain IV access with NS using new tubing.",
    rationale: "Acute hemolytic reactions occur within minutes due to ABO incompatibility. Donor RBCs are destroyed by recipient antibodies → free hemoglobin → renal tubule obstruction → hemoglobinuria. Hypotension and DIC may follow. This is a medical emergency.",
    examTrap: "Exam Trap: Fever + flank pain + hemoglobinuria within minutes = HEMOLYTIC, not febrile non-hemolytic. The presence of hemoglobinuria (dark urine) and rapid onset distinguishes this from a benign febrile reaction."
  },
  {
    id: "s2",
    timeSinceStart: "45 minutes",
    patientBackground: "54-year-old female receiving second unit of PRBCs for chronic anemia. History of multiple prior transfusions.",
    symptoms: ["Temperature rise from 36.8°C to 38.3°C", "Mild chills", "Headache", "No flank pain", "Urine remains clear yellow"],
    vitals: { hr: 92, bp: "128/76", rr: 18, spo2: 97, temp: 38.3 },
    reactionType: "febrile_nonhemolytic",
    priorityAction: "Stop transfusion, assess patient, administer antipyretics as ordered, and notify provider.",
    rationale: "Febrile non-hemolytic reactions result from recipient antibodies against donor WBC antigens or cytokines accumulated in stored blood. Fever occurs 30-60 minutes after start. No hemoglobinuria or hemodynamic instability differentiates this from hemolytic reactions.",
    examTrap: "Exam Trap: Fever alone does NOT equal hemolytic reaction. Without hemoglobinuria, flank pain, or hypotension, this is febrile non-hemolytic. Always check urine color and hemodynamic status before concluding hemolytic."
  },
  {
    id: "s3",
    timeSinceStart: "20 minutes",
    patientBackground: "32-year-old female receiving platelets post-chemotherapy. No prior transfusion reactions.",
    symptoms: ["Localized urticaria (hives) on trunk and arms", "Generalized pruritus (itching)", "Mild facial flushing", "No respiratory distress", "No swelling of lips or tongue"],
    vitals: { hr: 78, bp: "122/74", rr: 16, spo2: 98, temp: 37.0 },
    reactionType: "mild_allergic",
    priorityAction: "Stop transfusion, administer antihistamines (diphenhydramine) as ordered, and monitor for progression.",
    rationale: "Mild allergic reactions are caused by recipient IgE antibodies reacting to donor plasma proteins. Present as urticaria and pruritus without systemic compromise. Key: no airway involvement, no hypotension. May resume transfusion after symptoms resolve if provider approves."
  },
  {
    id: "s4",
    timeSinceStart: "10 minutes",
    patientBackground: "41-year-old male with IgA deficiency receiving FFP. First transfusion product this admission.",
    symptoms: ["Sudden severe dyspnea", "Audible wheezing and stridor", "Facial and lip angioedema", "Diffuse urticaria progressing rapidly", "Chest tightness and sense of doom"],
    vitals: { hr: 132, bp: "70/40", rr: 34, spo2: 84, temp: 37.1 },
    reactionType: "anaphylactic",
    priorityAction: "STOP transfusion immediately, administer epinephrine IM, support airway, call rapid response.",
    rationale: "Anaphylactic transfusion reactions are IgE-mediated (or anti-IgA in IgA-deficient patients). Massive histamine release → bronchospasm, vasodilation, cardiovascular collapse. Epinephrine is the FIRST-LINE drug. This is immediately life-threatening.",
    examTrap: "Exam Trap: Itching + hives = mild allergic. But add airway compromise, hypotension, and wheezing = ANAPHYLAXIS. The progression from cutaneous to systemic symptoms is the critical differentiator. Never give 'just antihistamine' for anaphylaxis."
  },
  {
    id: "s5",
    timeSinceStart: "2 hours (rapid infusion of second unit)",
    patientBackground: "82-year-old female with CHF, receiving PRBCs for Hgb 70 g/L. Two units infused over 2 hours.",
    symptoms: ["Progressive dyspnea", "Orthopnea (can't lie flat)", "Bilateral crackles on auscultation", "Jugular venous distension (JVD)", "Peripheral edema worsening", "Elevated blood pressure"],
    vitals: { hr: 108, bp: "178/96", rr: 30, spo2: 89, temp: 36.9 },
    reactionType: "taco",
    priorityAction: "Stop or slow transfusion, position upright, administer diuretics (furosemide) as ordered, apply oxygen.",
    rationale: "TACO is volume overload from rapid or excessive transfusion. The heart cannot handle the increased preload → pulmonary edema. Classic findings: hypertension, JVD, crackles, elevated BNP. Treat with diuretics and positioning. Risk factors: elderly, CHF, renal disease.",
    examTrap: "Exam Trap: TACO vs TRALI  -  both cause respiratory distress. TACO = hypertension + JVD + fluid overload signs + responds to diuretics. TRALI = hypotension/normal BP + NO fluid overload + bilateral infiltrates. BNP is elevated in TACO, normal in TRALI."
  },
  {
    id: "s6",
    timeSinceStart: "3 hours",
    patientBackground: "45-year-old male post-operative, receiving second unit of PRBCs. No cardiac history.",
    symptoms: ["Acute respiratory distress", "Hypoxemia unresponsive to supplemental O₂", "Bilateral pulmonary infiltrates on chest X-ray", "No JVD or peripheral edema", "Fever (38.1°C)"],
    vitals: { hr: 112, bp: "98/62", rr: 32, spo2: 82, temp: 38.1 },
    reactionType: "trali",
    priorityAction: "Stop transfusion, provide aggressive respiratory support (high-flow O₂, may need intubation), notify provider immediately.",
    rationale: "TRALI is caused by donor antibodies activating recipient neutrophils in pulmonary vasculature → capillary leak → non-cardiogenic pulmonary edema. Occurs within 6 hours. Key: NO fluid overload signs (normal BNP, no JVD). Diuretics are NOT helpful  -  this is a permeability problem, not a volume problem.",
    examTrap: "Exam Trap: TRALI vs TACO  -  TRALI shows bilateral infiltrates WITHOUT fluid overload. Blood pressure is normal or LOW (not elevated). Diuretics will NOT help and may worsen hypotension. Supportive respiratory care is the priority."
  },
  {
    id: "s7",
    timeSinceStart: "8 minutes",
    patientBackground: "72-year-old female with blood type A+ mistakenly receiving B+ PRBCs due to labeling error.",
    symptoms: ["Sudden severe back pain", "Feeling of 'impending doom'", "Hypotension developing rapidly", "Tea-colored urine output", "Oozing from IV site (early DIC)"],
    vitals: { hr: 128, bp: "76/42", rr: 28, spo2: 91, temp: 39.5 },
    reactionType: "acute_hemolytic",
    priorityAction: "STOP transfusion immediately, maintain IV with NS (new tubing), send blood bag + tubing to lab, draw direct Coombs test.",
    rationale: "This is a classic ABO-incompatible transfusion  -  a never event. Anti-B antibodies in the type A patient attack the type B donor RBCs → massive intravascular hemolysis → free hemoglobin → DIC + renal failure. Oozing from IV site indicates early DIC. This is the deadliest transfusion reaction."
  },
  {
    id: "s8",
    timeSinceStart: "30 minutes",
    patientBackground: "28-year-old postpartum female receiving PRBCs for hemorrhage. First-time transfusion recipient.",
    symptoms: ["Mild temperature elevation to 37.9°C", "Localized hives on forearms", "Mild itching around IV site", "Feeling slightly warm", "No respiratory symptoms"],
    vitals: { hr: 86, bp: "118/72", rr: 16, spo2: 98, temp: 37.9 },
    reactionType: "mild_allergic",
    priorityAction: "Pause transfusion, administer diphenhydramine, monitor closely for any progression to systemic symptoms.",
    rationale: "Mild allergic reactions present with localized urticaria and pruritus. The mild temperature elevation is not significant enough to indicate a febrile reaction (threshold typically >1°C above baseline). With stable vitals and no respiratory symptoms, this is managed with antihistamines."
  },
  {
    id: "s9",
    timeSinceStart: "1.5 hours (third unit running fast)",
    patientBackground: "78-year-old male with CKD stage 4 and diastolic dysfunction, receiving third unit of PRBCs.",
    symptoms: ["Acute onset cough with pink frothy sputum", "Cannot breathe lying down", "Bilateral basilar crackles to mid-lung fields", "Distended neck veins", "Rapid weight gain (1.5 kg in 4 hours)"],
    vitals: { hr: 116, bp: "186/102", rr: 34, spo2: 86, temp: 37.0 },
    reactionType: "taco",
    priorityAction: "Stop transfusion, sit patient upright, administer IV furosemide, apply high-flow oxygen, prepare for possible BiPAP.",
    rationale: "Classic TACO presentation in a high-risk patient (elderly, CKD, diastolic dysfunction). Multiple units given too rapidly overwhelmed the compromised heart. Pink frothy sputum = pulmonary edema. Key differentiator from TRALI: hypertension, JVD, elevated BNP, responds to diuresis."
  },
  {
    id: "s10",
    timeSinceStart: "15 minutes",
    patientBackground: "35-year-old male with known IgA deficiency, receiving plasma products during surgery.",
    symptoms: ["Bronchospasm with audible wheezing", "Rapidly dropping blood pressure", "Generalized erythema and urticaria", "Laryngeal edema  -  voice becoming hoarse", "Tachycardia"],
    vitals: { hr: 140, bp: "64/38", rr: 36, spo2: 78, temp: 37.2 },
    reactionType: "anaphylactic",
    priorityAction: "STOP transfusion, administer epinephrine 0.3 mg IM immediately, establish second IV, prepare for intubation.",
    rationale: "Anaphylaxis in IgA-deficient patients receiving IgA-containing products is a well-known trigger. Anti-IgA antibodies cause massive mast cell degranulation. Epinephrine reverses bronchospasm and vasodilation. Delay in epinephrine = death. Antihistamines alone are INSUFFICIENT."
  },
];

interface InterventionItem {
  id: string;
  label: string;
  applicableTo: ReactionType[];
  rationaleIfWrong: Record<string, string>;
  rationaleIfCorrect: string;
}

const interventions: InterventionItem[] = [
  {
    id: "stop_transfusion",
    label: "Stop the transfusion immediately",
    applicableTo: ["acute_hemolytic", "febrile_nonhemolytic", "mild_allergic", "anaphylactic", "taco", "trali"],
    rationaleIfWrong: {},
    rationaleIfCorrect: "Stopping the transfusion is the FIRST action for ANY suspected transfusion reaction. This prevents further antigen exposure and worsening of the reaction."
  },
  {
    id: "maintain_iv_ns",
    label: "Maintain IV access with normal saline (new tubing)",
    applicableTo: ["acute_hemolytic", "febrile_nonhemolytic", "anaphylactic", "taco", "trali"],
    rationaleIfWrong: { mild_allergic: "For mild allergic reactions, maintaining IV is good practice but new tubing is not always required if transfusion is only paused temporarily." },
    rationaleIfCorrect: "New tubing prevents any remaining blood product from entering the patient. NS keeps the vein open for emergency medications."
  },
  {
    id: "notify_provider",
    label: "Notify provider and blood bank",
    applicableTo: ["acute_hemolytic", "febrile_nonhemolytic", "mild_allergic", "anaphylactic", "taco", "trali"],
    rationaleIfWrong: {},
    rationaleIfCorrect: "The provider must be notified for orders and the blood bank must be alerted for investigation. This is required for ALL transfusion reactions."
  },
  {
    id: "assess_vitals",
    label: "Obtain and monitor vital signs",
    applicableTo: ["acute_hemolytic", "febrile_nonhemolytic", "mild_allergic", "anaphylactic", "taco", "trali"],
    rationaleIfWrong: {},
    rationaleIfCorrect: "Frequent vital sign monitoring detects deterioration. Compare to baseline to assess severity and guide treatment."
  },
  {
    id: "support_airway",
    label: "Support airway and administer supplemental oxygen",
    applicableTo: ["acute_hemolytic", "anaphylactic", "taco", "trali"],
    rationaleIfWrong: {
      febrile_nonhemolytic: "Febrile non-hemolytic reactions typically do not cause respiratory compromise. Oxygen is not routinely needed unless SpO₂ drops.",
      mild_allergic: "Mild allergic reactions do not involve airway compromise. Oxygen is not indicated unless symptoms progress to anaphylaxis."
    },
    rationaleIfCorrect: "Airway support and oxygen are critical when respiratory compromise is present. Anticipate intubation for anaphylaxis and severe TRALI."
  },
  {
    id: "monitor_urine",
    label: "Monitor urine output and color",
    applicableTo: ["acute_hemolytic"],
    rationaleIfWrong: {
      febrile_nonhemolytic: "Urine monitoring is not a priority for febrile reactions as hemolysis does not occur.",
      mild_allergic: "No hemolysis occurs in allergic reactions  -  urine monitoring is not specifically indicated.",
      anaphylactic: "While important for overall assessment, urine monitoring is not a priority intervention in anaphylaxis  -  focus on epinephrine and airway.",
      taco: "Urine output monitoring helps assess diuretic response in TACO, but it is secondary to the primary interventions.",
      trali: "TRALI does not involve hemolysis, so urine color monitoring is not specifically indicated."
    },
    rationaleIfCorrect: "In acute hemolytic reactions, free hemoglobin from lysed RBCs is filtered by the kidneys → hemoglobinuria (dark urine) and risk of acute renal tubular necrosis. Monitoring output guides fluid resuscitation."
  },
  {
    id: "epinephrine",
    label: "Administer epinephrine (IM)",
    applicableTo: ["anaphylactic"],
    rationaleIfWrong: {
      acute_hemolytic: "Epinephrine is NOT indicated for hemolytic reactions. Treatment focuses on stopping the transfusion, IV fluids, and renal protection.",
      febrile_nonhemolytic: "Epinephrine is NOT indicated for febrile reactions. Antipyretics are the appropriate pharmacologic intervention.",
      mild_allergic: "Epinephrine is NOT indicated for mild allergic reactions. Antihistamines (diphenhydramine) are sufficient. Escalate to epinephrine ONLY if anaphylaxis develops.",
      taco: "Epinephrine is NOT indicated for TACO. Diuretics and positioning are the treatments. Epinephrine would worsen tachycardia and increase cardiac workload.",
      trali: "Epinephrine is NOT indicated for TRALI. Supportive respiratory care is the treatment. Vasopressors may be used for hypotension but epinephrine IM is not first-line."
    },
    rationaleIfCorrect: "Epinephrine is the FIRST-LINE drug for anaphylaxis. It reverses bronchospasm (β₂), increases BP via vasoconstriction (α₁), and reduces mast cell degranulation. Give 0.3-0.5 mg IM in the anterolateral thigh. DELAY = DEATH."
  },
  {
    id: "antipyretics",
    label: "Administer antipyretics (acetaminophen)",
    applicableTo: ["febrile_nonhemolytic"],
    rationaleIfWrong: {
      acute_hemolytic: "While fever is present, antipyretics do NOT address the underlying hemolysis. The priority is stopping the transfusion and preventing renal failure.",
      mild_allergic: "Antipyretics are not indicated for allergic reactions  -  antihistamines are the correct pharmacologic treatment.",
      anaphylactic: "Antipyretics will NOT treat anaphylaxis. Epinephrine is the only first-line treatment.",
      taco: "Antipyretics are not indicated for TACO  -  the issue is volume overload, not fever.",
      trali: "While low-grade fever may be present in TRALI, antipyretics do not address the pulmonary pathology."
    },
    rationaleIfCorrect: "Acetaminophen treats the fever and discomfort caused by cytokine-mediated inflammatory response to donor WBC antigens. This is the standard pharmacologic intervention for febrile non-hemolytic reactions."
  },
  {
    id: "diuretics",
    label: "Administer diuretics (furosemide)",
    applicableTo: ["taco"],
    rationaleIfWrong: {
      acute_hemolytic: "Diuretics may be considered to maintain urine output in hemolytic reactions, but they are not the primary intervention.",
      febrile_nonhemolytic: "Diuretics are NOT indicated for febrile reactions. There is no volume overload.",
      mild_allergic: "Diuretics are NOT indicated for allergic reactions.",
      anaphylactic: "Diuretics are CONTRAINDICATED in anaphylaxis  -  the patient is already hypotensive from vasodilation. Removing volume would worsen shock.",
      trali: "Diuretics are NOT indicated for TRALI and may WORSEN outcomes. TRALI is a permeability problem (capillary leak), NOT a volume problem. Diuretics reduce preload in an already hypotensive patient."
    },
    rationaleIfCorrect: "Furosemide (loop diuretic) promotes rapid diuresis to reduce intravascular volume → decreased preload → relief of pulmonary congestion. TACO is the ONE transfusion reaction where diuretics are clearly indicated."
  },
  {
    id: "send_blood_bag",
    label: "Send blood bag and tubing to blood bank/lab",
    applicableTo: ["acute_hemolytic", "febrile_nonhemolytic", "anaphylactic"],
    rationaleIfWrong: {
      mild_allergic: "For mild allergic reactions, the blood product is typically held (not discarded) but sending to lab is not always required unless the reaction is severe.",
      taco: "TACO is a volume-related problem, not a blood product problem. The blood bank does not need the bag for investigation.",
      trali: "While the blood bank should be notified, the focus in TRALI is on respiratory support. The bag may be sent but is less critical than in hemolytic reactions."
    },
    rationaleIfCorrect: "The blood bag and tubing are sent to the blood bank for investigation  -  direct Coombs test, repeat crossmatch, culture for contamination. This helps identify the cause and prevent future reactions."
  },
];

function getCorrectInterventions(reaction: ReactionType): string[] {
  return interventions.filter(i => i.applicableTo.includes(reaction)).map(i => i.id);
}

const TOTAL_ROUNDS = 10;

const tabConfig = [
  { id: "compatibility", label: "ABO & Rh Compatibility", icon: Droplets },
  { id: "reactions", label: "Reaction Recognition", icon: AlertTriangle },
  { id: "interventions", label: "Nursing Interventions", icon: ClipboardCheck },
] as const;

type TabId = typeof tabConfig[number]["id"];

function CompatibilityGrid() {
  return (
    <Card className="border border-gray-100 bg-white">
      <CardContent className="p-4 sm:p-6">
        <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-500" />
          RBC Compatibility Reference Grid
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs" data-testid="table-compatibility-grid">
            <thead>
              <tr>
                <th className="p-2 text-left font-bold text-gray-500 border-b border-gray-100">Donor ↓ / Recipient →</th>
                {allBloodTypes.map(bt => (
                  <th key={bt} className="p-2 text-center font-bold text-gray-700 border-b border-gray-100">{bt}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allBloodTypes.map(donor => (
                <tr key={donor}>
                  <td className="p-2 font-bold text-gray-700 border-b border-gray-50">{donor}</td>
                  {allBloodTypes.map(recipient => {
                    const ok = canReceive(recipient, donor);
                    return (
                      <td key={recipient} className={`p-2 text-center border-b border-gray-50 ${ok ? "bg-emerald-50 text-emerald-600" : "bg-red-50/30 text-red-300"}`}>
                        {ok ? "✓" : "✗"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap gap-4 mt-3 text-[10px] text-gray-400">
          <span>O− = Universal RBC Donor</span>
          <span>AB+ = Universal Recipient</span>
          <span>Rh− cannot receive Rh+</span>
        </div>
      </CardContent>
    </Card>
  );
}

function CompatibilitySimulator() {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [roundData, setRoundData] = useState(() => generateRound());
  const [selectedDonor, setSelectedDonor] = useState<BloodType | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

  const handleSelect = (donor: BloodType) => {
    if (showResult) return;
    setSelectedDonor(donor);
    setShowResult(true);
    if (canReceive(roundData.patient, donor)) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (round >= TOTAL_ROUNDS) {
      setCompleted(true);
      return;
    }
    setRound(r => r + 1);
    setRoundData(generateRound());
    setSelectedDonor(null);
    setShowResult(false);
  };

  const handleRestart = () => {
    setRound(1);
    setScore(0);
    setRoundData(generateRound());
    setSelectedDonor(null);
    setShowResult(false);
    setCompleted(false);
  };

  if (completed) {
    const pct = Math.round((score / TOTAL_ROUNDS) * 100);
    return (
      <div className="space-y-6">
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="p-8 text-center">
            <Trophy className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Compatibility Challenge Complete!</h3>
            <p className="text-4xl font-bold text-primary mb-2" data-testid="text-compatibility-score">{score}/{TOTAL_ROUNDS}</p>
            <p className="text-sm text-gray-500 mb-1">{pct}% accuracy</p>
            <p className="text-sm text-gray-600 mt-4 max-w-md mx-auto">
              {pct >= 90 ? "Excellent! You demonstrate strong blood type compatibility knowledge." :
               pct >= 70 ? "Good work! Review the compatibility grid to strengthen weak areas." :
               "Keep practicing! Understanding ABO/Rh compatibility is critical for patient safety."}
            </p>
            <Button className="mt-6 rounded-full gap-2" onClick={handleRestart} data-testid="button-restart-compatibility">
              <RotateCcw className="w-4 h-4" /> Try Again
            </Button>
          </CardContent>
        </Card>
        <CompatibilityGrid />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Round {round}/{TOTAL_ROUNDS}</span>
          <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full" data-testid="text-compat-running-score">Score: {score}/{round - (showResult ? 0 : 1)}</span>
        </div>
        <Button variant="ghost" size="sm" className="text-xs gap-1" onClick={() => setShowGrid(g => !g)} data-testid="button-toggle-grid">
          <Info className="w-3 h-3" /> {showGrid ? "Hide" : "Show"} Grid
        </Button>
      </div>

      <Card className="border-2 border-blue-100 bg-blue-50/30">
        <CardContent className="p-6 text-center">
          <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-2">Patient Blood Type</p>
          <p className="text-5xl font-bold text-blue-700" data-testid="text-patient-blood-type">{roundData.patient}</p>
          <p className="text-sm text-blue-600 mt-2">Select a compatible donor unit</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {roundData.donors.map((donor) => {
          const isSelected = selectedDonor === donor;
          const isCompatible = canReceive(roundData.patient, donor);
          let style = "border-gray-100 hover:border-primary/30 hover:shadow-sm cursor-pointer";
          if (showResult && isSelected && isCompatible) style = "border-emerald-300 bg-emerald-50/50";
          else if (showResult && isSelected && !isCompatible) style = "border-red-300 bg-red-50/50";
          else if (showResult && isCompatible) style = "border-emerald-200 bg-emerald-50/20";
          else if (showResult) style = "border-gray-100 opacity-50";
          else if (isSelected) style = "border-primary bg-primary/5";

          return (
            <Card
              key={donor}
              className={`border-2 transition-all ${style}`}
              onClick={() => handleSelect(donor)}
              data-testid={`card-donor-${donor}`}
            >
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Droplets className="w-4 h-4 text-red-400" />
                  <span className="text-xs font-bold text-gray-400 uppercase">Donor</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{donor}</p>
                {showResult && (
                  <div className="mt-2">
                    {isCompatible ? (
                      <span className="text-[10px] font-bold text-emerald-600 flex items-center justify-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Compatible
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-red-500 flex items-center justify-center gap-1">
                        <XCircle className="w-3 h-3" /> Incompatible
                      </span>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {showResult && selectedDonor && (
        <Card className={`border-2 ${canReceive(roundData.patient, selectedDonor) ? "border-emerald-200 bg-emerald-50/30" : "border-red-200 bg-red-50/30"}`}>
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              {canReceive(roundData.patient, selectedDonor) ? (
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">
                  {canReceive(roundData.patient, selectedDonor) ? "Correct  -  Compatible Transfusion" : "Incorrect  -  Incompatible Transfusion"}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed" data-testid="text-compatibility-rationale">
                  {getCompatibilityRationale(roundData.patient, selectedDonor)}
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button className="rounded-full gap-2" onClick={handleNext} data-testid="button-next-round">
                {round >= TOTAL_ROUNDS ? "View Results" : "Next Round"} <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {showGrid && <CompatibilityGrid />}

      <div className="mt-8">
        <Card className="border border-gray-100 bg-white">
          <CardContent className="p-4 sm:p-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2" data-testid="text-compat-reference-title">
              <Stethoscope className="w-4 h-4 text-primary" />
              ABO/Rh Compatibility Reference
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">ABO System</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><span className="font-semibold text-gray-900">Type A:</span> Has A antigens, anti-B antibodies</p>
                  <p><span className="font-semibold text-gray-900">Type B:</span> Has B antigens, anti-A antibodies</p>
                  <p><span className="font-semibold text-gray-900">Type AB:</span> Has A and B antigens, no ABO antibodies</p>
                  <p><span className="font-semibold text-gray-900">Type O:</span> No ABO antigens, has anti-A and anti-B antibodies</p>
                </div>
              </div>
              <div className="bg-red-50/50 rounded-xl p-4 border border-red-100">
                <p className="text-xs font-bold text-red-700 uppercase tracking-wider mb-2">Rh Factor</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><span className="font-semibold text-gray-900">Rh+ (Positive):</span> Has D antigen on RBC surface</p>
                  <p><span className="font-semibold text-gray-900">Rh- (Negative):</span> No D antigen; cannot receive Rh+ blood</p>
                  <p><span className="font-semibold text-gray-900">Key Rule:</span> Rh- patients must receive Rh- blood only</p>
                  <p><span className="font-semibold text-gray-900">Exception:</span> Rh+ patients can receive Rh+ or Rh- blood</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100">
                <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">Universal Donor & Recipient</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><span className="font-semibold text-gray-900">O- (Universal RBC Donor):</span> No A, B, or Rh antigens; safe for all recipients</p>
                  <p><span className="font-semibold text-gray-900">AB+ (Universal Recipient):</span> No ABO antibodies and Rh+; can receive any RBC type</p>
                  <p><span className="font-semibold text-gray-900">AB (Universal Plasma Donor):</span> Plasma has no anti-A or anti-B antibodies</p>
                  <p><span className="font-semibold text-gray-900">O (Universal Plasma Recipient):</span> Plasma has all ABO antibodies, can receive any</p>
                </div>
              </div>
              <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-100">
                <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">Clinical Pearls</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><span className="font-semibold text-gray-900">Type & Crossmatch:</span> Blood bank tests patient serum against donor RBCs</p>
                  <p><span className="font-semibold text-gray-900">Two-Nurse Verification:</span> Mandatory bedside check of patient ID and blood label</p>
                  <p><span className="font-semibold text-gray-900">ABO Mismatch:</span> Most common cause is clerical error, not lab error</p>
                  <p><span className="font-semibold text-gray-900">Emergency:</span> O- PRBCs and AB FFP when no time for crossmatch</p>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Compatibility Grid</p>
              <table className="w-full text-xs" data-testid="table-full-compatibility-grid">
                <thead>
                  <tr>
                    <th className="p-2 text-left font-bold text-gray-500 border-b border-gray-200 bg-gray-50">Donor &#8595; / Recipient &#8594;</th>
                    {allBloodTypes.map(bt => (
                      <th key={bt} className="p-2 text-center font-bold text-gray-700 border-b border-gray-200 bg-gray-50">{bt}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allBloodTypes.map(donor => (
                    <tr key={donor} className="hover:bg-gray-50/50">
                      <td className="p-2 font-bold text-gray-700 border-b border-gray-50 bg-gray-50/50">{donor}</td>
                      {allBloodTypes.map(recipient => {
                        const ok = canReceive(recipient, donor);
                        return (
                          <td key={recipient} className={`p-2 text-center border-b border-gray-50 font-semibold ${ok ? "bg-emerald-50 text-emerald-600" : "bg-red-50/30 text-red-300"}`}>
                            {ok ? "Safe" : "--"}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap gap-4 mt-3 text-[10px] text-gray-400">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Safe = Compatible</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-300 inline-block" /> -- = Incompatible</span>
              <span>O- donates to all 8 types</span>
              <span>AB+ receives from all 8 types</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function VitalsBar({ vitals, unitMode }: { vitals: TransfusionScenario["vitals"]; unitMode: UnitMode }) {
  const items = [
    { label: "HR", value: `${vitals.hr}`, unit: "bpm", icon: Heart, danger: vitals.hr > 110 || vitals.hr < 50 },
    { label: "BP", value: vitals.bp, unit: "mmHg", icon: Activity, danger: parseInt(vitals.bp) < 90 || parseInt(vitals.bp) > 160 },
    { label: "RR", value: `${vitals.rr}`, unit: "/min", icon: Wind, danger: vitals.rr > 24 || vitals.rr < 10 },
    { label: "SpO₂", value: `${vitals.spo2}`, unit: "%", icon: Droplets, danger: vitals.spo2 < 92 },
    { label: "Temp", value: convertTemp(vitals.temp, unitMode).replace("°C","").replace("°F",""), unit: unitMode === "metric" ? "°C" : "°F", icon: Thermometer, danger: vitals.temp > 38.5 || vitals.temp < 36 },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
      {items.map(v => (
        <div key={v.label} className={`text-center p-2.5 rounded-lg border ${v.danger ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-100"}`}>
          <div className="flex items-center justify-center gap-1 mb-1">
            <v.icon className={`w-3 h-3 ${v.danger ? "text-red-500" : "text-gray-400"}`} />
            <span className={`text-[10px] font-bold uppercase tracking-wider ${v.danger ? "text-red-500" : "text-gray-400"}`}>{v.label}</span>
          </div>
          <div className={`text-lg font-bold ${v.danger ? "text-red-700" : "text-gray-900"}`}>{v.value}</div>
          <div className="text-[10px] text-gray-400">{v.unit}</div>
        </div>
      ))}
    </div>
  );
}

function ReactionRecognition() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedReaction, setSelectedReaction] = useState<ReactionType | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [shuffledScenarios] = useState(() => shuffle(scenarios));
  const unitMode: UnitMode = "metric";

  const scenario = shuffledScenarios[currentIndex];

  const handleSelect = (reaction: ReactionType) => {
    if (showAnswer) return;
    setSelectedReaction(reaction);
    setShowAnswer(true);
    if (reaction === scenario.reactionType) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex >= shuffledScenarios.length - 1) {
      setCompleted(true);
      return;
    }
    setCurrentIndex(i => i + 1);
    setSelectedReaction(null);
    setShowAnswer(false);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedReaction(null);
    setShowAnswer(false);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    const pct = Math.round((score / shuffledScenarios.length) * 100);
    return (
      <div className="space-y-6">
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="p-8 text-center">
            <Trophy className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Reaction Recognition Complete!</h3>
            <p className="text-4xl font-bold text-primary mb-2" data-testid="text-reaction-score">{score}/{shuffledScenarios.length}</p>
            <p className="text-sm text-gray-500">{pct}% accuracy</p>
            <p className="text-sm text-gray-600 mt-4 max-w-md mx-auto">
              {pct >= 90 ? "Outstanding! You can rapidly identify transfusion reaction types." :
               pct >= 70 ? "Good clinical reasoning! Review the exam trap scenarios to sharpen your differentiation." :
               "Keep studying reaction patterns  -  accurate recognition saves lives."}
            </p>
            <Button className="mt-6 rounded-full gap-2" onClick={handleRestart} data-testid="button-restart-reactions">
              <RotateCcw className="w-4 h-4" /> Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const reactionOptions: ReactionType[] = ["acute_hemolytic", "febrile_nonhemolytic", "mild_allergic", "anaphylactic", "taco", "trali"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Scenario {currentIndex + 1}/{shuffledScenarios.length}</span>
        <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full" data-testid="text-reaction-running-score">Score: {score}</span>
      </div>

      <Card className="border border-gray-100">
        <CardContent className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs text-amber-600 font-semibold bg-amber-50 rounded-lg px-3 py-2">
            <AlertTriangle className="w-3.5 h-3.5" />
            Time since transfusion start: {scenario.timeSinceStart}
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{scenario.patientBackground}</p>

          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Presenting Symptoms</p>
            <div className="space-y-1.5">
              {scenario.symptoms.map((s, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <ShieldAlert className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Vital Signs</p>
            <VitalsBar vitals={scenario.vitals} unitMode={unitMode} />
          </div>
        </CardContent>
      </Card>

      <div>
        <p className="text-sm font-bold text-gray-900 mb-3">Identify the reaction type:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {reactionOptions.map(rt => {
            const isSelected = selectedReaction === rt;
            const isCorrect = rt === scenario.reactionType;
            let cls = "border-gray-100 hover:border-primary/30 cursor-pointer";
            if (showAnswer && isSelected && isCorrect) cls = "border-emerald-300 bg-emerald-50/50";
            else if (showAnswer && isSelected && !isCorrect) cls = "border-red-300 bg-red-50/50";
            else if (showAnswer && isCorrect) cls = "border-emerald-200 bg-emerald-50/20";
            else if (showAnswer) cls = "border-gray-100 opacity-50";
            else if (isSelected) cls = "border-primary bg-primary/5";

            return (
              <Card
                key={rt}
                className={`border-2 transition-all ${cls}`}
                onClick={() => handleSelect(rt)}
                data-testid={`card-reaction-${rt}`}
              >
                <CardContent className="p-3 flex items-center gap-2">
                  {showAnswer ? (
                    isCorrect ? <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" /> : <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  ) : (
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${isSelected ? "border-primary bg-primary" : "border-gray-300"}`} />
                  )}
                  <span className="text-sm text-gray-700">{reactionLabels[rt]}</span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {showAnswer && (
        <div className="space-y-4">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="p-5 space-y-3">
              <p className="text-sm font-bold text-gray-900">Priority Nursing Action:</p>
              <p className="text-sm text-gray-700 leading-relaxed">{scenario.priorityAction}</p>
              <p className="text-sm font-bold text-gray-900 mt-3">Rationale:</p>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario.rationale}</p>
            </CardContent>
          </Card>
          {scenario.examTrap && (
            <Card className="border-2 border-amber-200 bg-amber-50/30">
              <CardContent className="p-5">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800 leading-relaxed" data-testid="text-exam-trap">{scenario.examTrap}</p>
                </div>
              </CardContent>
            </Card>
          )}
          <div className="flex justify-end">
            <Button className="rounded-full gap-2" onClick={handleNext} data-testid="button-next-scenario">
              {currentIndex >= shuffledScenarios.length - 1 ? "View Results" : "Next Scenario"} <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function InterventionDecision() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [selectedInterventions, setSelectedInterventions] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [shuffledScenarios] = useState(() => shuffle(scenarios));

  const scenario = shuffledScenarios[scenarioIndex];
  const correctIds = useMemo(() => getCorrectInterventions(scenario.reactionType), [scenario]);
  const unitMode: UnitMode = "metric";

  const toggleIntervention = (id: string) => {
    if (submitted) return;
    setSelectedInterventions(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const selected = Array.from(selectedInterventions);
    const allCorrectSelected = correctIds.every(id => selected.includes(id));
    const noIncorrect = selected.every(id => correctIds.includes(id));
    if (allCorrectSelected && noIncorrect) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (scenarioIndex >= shuffledScenarios.length - 1) {
      setCompleted(true);
      return;
    }
    setScenarioIndex(i => i + 1);
    setSelectedInterventions(new Set());
    setSubmitted(false);
  };

  const handleRestart = () => {
    setScenarioIndex(0);
    setSelectedInterventions(new Set());
    setSubmitted(false);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    const pct = Math.round((score / shuffledScenarios.length) * 100);
    return (
      <div className="space-y-6">
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="p-8 text-center">
            <Trophy className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Intervention Challenge Complete!</h3>
            <p className="text-4xl font-bold text-primary mb-2" data-testid="text-intervention-score">{score}/{shuffledScenarios.length}</p>
            <p className="text-sm text-gray-500">{pct}% perfect selections</p>
            <p className="text-sm text-gray-600 mt-4 max-w-md mx-auto">
              {pct >= 90 ? "Exceptional! You know exactly which interventions match each reaction type." :
               pct >= 70 ? "Strong nursing judgment! Review the rationales for any missed interventions." :
               "Practice distinguishing reaction-specific interventions  -  each reaction has a unique treatment protocol."}
            </p>
            <Button className="mt-6 rounded-full gap-2" onClick={handleRestart} data-testid="button-restart-interventions">
              <RotateCcw className="w-4 h-4" /> Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Scenario {scenarioIndex + 1}/{shuffledScenarios.length}</span>
        <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full" data-testid="text-intervention-running-score">Score: {score}</span>
      </div>

      <Card className="border border-gray-100">
        <CardContent className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold bg-rose-50 text-rose-600 rounded-lg px-3 py-2">
            <Syringe className="w-3.5 h-3.5" />
            Reaction identified: {reactionLabels[scenario.reactionType]}
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{scenario.patientBackground}</p>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Current Vitals</p>
            <VitalsBar vitals={scenario.vitals} unitMode={unitMode} />
          </div>
          <div className="space-y-1.5">
            {scenario.symptoms.slice(0, 3).map((s, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <ChevronRight className="w-3 h-3 text-gray-300 flex-shrink-0 mt-1" />
                <span>{s}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div>
        <p className="text-sm font-bold text-gray-900 mb-3">Select ALL appropriate nursing interventions:</p>
        <div className="space-y-2">
          {interventions.map(item => {
            const isSelected = selectedInterventions.has(item.id);
            const isCorrect = correctIds.includes(item.id);
            let cls = "border-gray-100 hover:border-primary/20 cursor-pointer";
            if (submitted && isSelected && isCorrect) cls = "border-emerald-300 bg-emerald-50/50";
            else if (submitted && isSelected && !isCorrect) cls = "border-red-300 bg-red-50/50";
            else if (submitted && !isSelected && isCorrect) cls = "border-amber-300 bg-amber-50/30";
            else if (submitted) cls = "border-gray-100 opacity-50";
            else if (isSelected) cls = "border-primary bg-primary/5";

            const showRationale = submitted && ((isSelected && !isCorrect) || (isSelected && isCorrect) || (!isSelected && isCorrect));
            let rationaleText = "";
            if (submitted && isSelected && isCorrect) rationaleText = item.rationaleIfCorrect;
            else if (submitted && isSelected && !isCorrect) rationaleText = item.rationaleIfWrong[scenario.reactionType] || "This intervention is not indicated for this reaction type.";
            else if (submitted && !isSelected && isCorrect) rationaleText = `Missed: ${item.rationaleIfCorrect}`;

            return (
              <Card
                key={item.id}
                className={`border-2 transition-all ${cls}`}
                onClick={() => toggleIntervention(item.id)}
                data-testid={`card-intervention-${item.id}`}
              >
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    {submitted ? (
                      isSelected && isCorrect ? <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /> :
                      isSelected && !isCorrect ? <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" /> :
                      !isSelected && isCorrect ? <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" /> :
                      <div className="w-4 h-4 flex-shrink-0" />
                    ) : (
                      <div className={`w-4 h-4 rounded border-2 flex-shrink-0 mt-0.5 ${isSelected ? "border-primary bg-primary" : "border-gray-300"}`}>
                        {isSelected && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                    )}
                    <div className="flex-1">
                      <span className="text-sm text-gray-700">{item.label}</span>
                      {showRationale && rationaleText && (
                        <p className={`text-xs mt-1.5 leading-relaxed ${isSelected && !isCorrect ? "text-red-600" : !isSelected && isCorrect ? "text-amber-700" : "text-emerald-700"}`}>
                          {rationaleText}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {!submitted ? (
        <div className="flex justify-end">
          <Button
            className="rounded-full gap-2"
            onClick={handleSubmit}
            disabled={selectedInterventions.size === 0}
            data-testid="button-submit-interventions"
          >
            <ClipboardCheck className="w-4 h-4" /> Submit Selections
          </Button>
        </div>
      ) : (
        <div className="flex justify-end">
          <Button className="rounded-full gap-2" onClick={handleNext} data-testid="button-next-intervention">
            {scenarioIndex >= shuffledScenarios.length - 1 ? "View Results" : "Next Scenario"} <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default function BloodTransfusionSimulatorPage() {
  const { user, effectiveTier } = useAuth();
  const hasPaidAccess = paidTiers.includes(effectiveTier);
  const [activeTab, setActiveTab] = useState<TabId>("compatibility");

  return (
    <div className={`min-h-screen bg-warmwhite flex flex-col font-sans ${user?.tier !== "admin" ? "select-none" : ""}`} onContextMenu={user?.tier !== "admin" ? (e) => e.preventDefault() : undefined}>
      <SEO
        title="Blood Transfusion Compatibility & Reaction Simulator | NurseNest"
        description="Master blood transfusion safety with interactive ABO/Rh compatibility challenges, transfusion reaction recognition scenarios, and nursing intervention decision-making. Practice identifying hemolytic, febrile, allergic, anaphylactic, TACO, and TRALI reactions."
        keywords="blood transfusion nursing, ABO compatibility, Rh factor, transfusion reactions, hemolytic reaction, TACO vs TRALI, nursing simulation, blood bank nursing, transfusion safety"
        canonicalPath="/blood-transfusion-simulator"
        ogType="website"
      />
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <BreadcrumbNav />
        {!hasPaidAccess ? (
          <div className="text-center py-16">
            <div className="max-w-lg mx-auto">
              <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
                <Lock className="w-10 h-10 text-red-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">Blood Transfusion Simulator</h1>
              <p className="text-lg text-gray-600 mb-2">Premium Interactive Tool</p>
              <p className="text-sm text-gray-500 mb-8 leading-relaxed max-w-md mx-auto">
                Master blood transfusion compatibility, reaction recognition, and nursing interventions with interactive scenarios. Available exclusively for RPN, RN, and NP subscribers.
              </p>
              <LocaleLink href="/pricing">
                <Button className="rounded-full px-8 h-12 gap-2 bg-primary text-white hover:brightness-110 shadow-lg" data-testid="button-upgrade-transfusion">
                  <Sparkles className="w-4 h-4" />
                  View Subscription Plans
                </Button>
              </LocaleLink>
              {!user && (
                <p className="text-xs text-gray-400 mt-4">
                  Already subscribed? <LocaleLink href="/login" className="text-primary hover:underline">Sign in</LocaleLink> to access.
                </p>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900" data-testid="text-page-title">
                    Blood Transfusion Simulator
                  </h1>
                  <p className="text-sm text-red-500 font-semibold uppercase tracking-wider mt-0.5">
                    Compatibility & Reaction Safety
                  </p>
                </div>
              </div>
              <p className="text-base text-gray-600 max-w-3xl leading-relaxed mt-3">
                Practice ABO/Rh compatibility decisions, identify transfusion reaction types from clinical presentations, and select the correct nursing interventions for each scenario.
              </p>
            </div>

            <div className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-8 overflow-x-auto" data-testid="tabs-container">
              {tabConfig.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all flex-1 justify-center ${
                      isActive ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                    }`}
                    data-testid={`tab-${tab.id}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {activeTab === "compatibility" && <CompatibilitySimulator />}
            {activeTab === "reactions" && <ReactionRecognition />}
            {activeTab === "interventions" && <InterventionDecision />}
          </div>
        )}
      </main>
      <AdminEditButton pageName="blood-transfusion-simulator" />
      <Footer />
    </div>
  );
}