import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";
import { useState } from "react";
import { LocaleLink } from "@/lib/LocaleLink";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { buildFaqStructuredData, PARENT_EDUCATIONAL_ORG } from "@/lib/structured-data";
import { EndOfContentLeadCapture } from "@/components/lead-capture";
import {
  BookOpen, ChevronDown, ArrowRight, HelpCircle,
  Stethoscope, Activity, FileText, Brain, Target,
  GraduationCap, ClipboardList, CheckCircle, Layers,
  Award, Shield, Pill, Heart, AlertTriangle, Star,
  Microscope, Thermometer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FAQ {
  question: string;
  answer: string;
}

interface InternalLink {
  label: string;
  url: string;
  description: string;
}

interface ContentSection {
  id: string;
  title: string;
  icon: typeof BookOpen;
  htmlContent: string;
}

interface AuthorityGuidePage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  heroHeading: string;
  heroSubheading: string;
  heroDescription: string;
  color: string;
  colorAccent: string;
  badgeLabel: string;
  sections: ContentSection[];
  faqs: FAQ[];
  internalLinks: InternalLink[];
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimaryLabel: string;
  ctaPrimaryUrl: string;
  breadcrumbs: { name: string; url: string }[];
}

const AUTHORITY_GUIDES: Record<string, AuthorityGuidePage> = {
  "electrolytes-nursing-exam-guide": {
    slug: "electrolytes-nursing-exam-guide",
    title: "Electrolytes for Nursing Exams — Complete Study Guide",
    metaTitle: "Electrolytes for Nursing Exams | Na, K, Ca, Mg Imbalances Guide | NurseNest",
    metaDescription: "Master electrolyte imbalances for NCLEX and REx-PN exams. Comprehensive guide covering sodium, potassium, calcium, and magnesium disorders with normal values, clinical signs, nursing interventions, and exam-focused practice questions.",
    keywords: "electrolytes nursing exam, electrolyte imbalances NCLEX, hypokalemia nursing, hypernatremia, hypocalcemia, magnesium nursing, electrolyte study guide",
    heroHeading: "Electrolytes for Nursing Exams",
    heroSubheading: "Master Every Electrolyte Imbalance for NCLEX & REx-PN",
    heroDescription: "Electrolyte imbalances are among the most heavily tested topics on nursing licensing exams. This comprehensive guide covers every major electrolyte disorder — sodium, potassium, calcium, magnesium, and phosphorus — with normal values, clinical manifestations, priority nursing interventions, and exam-specific strategies to help you answer electrolyte questions confidently.",
    color: "#2563EB",
    colorAccent: "#DBEAFE",
    badgeLabel: "Authority Guide",
    sections: [
      {
        id: "overview",
        title: "Why Electrolytes Matter on Nursing Exams",
        icon: Brain,
        htmlContent: `<p>Electrolyte questions appear on every nursing licensing exam — NCLEX-RN, NCLEX-PN, and REx-PN. They test your ability to recognize imbalances from clinical data, prioritize nursing interventions, and understand the pathophysiology behind treatment decisions. The NCSBN test plan places electrolytes primarily under Physiological Adaptation and Reduction of Risk Potential, which together account for 20-32% of the NCLEX-RN exam.</p>
<p>To succeed with electrolyte questions, you need to understand three things for each electrolyte: (1) the normal range and what drives it up or down, (2) the clinical signs and symptoms of both excess and deficit, and (3) the priority nursing interventions including monitoring, medication administration, and patient safety measures.</p>
<p><strong>Key principle:</strong> Electrolyte imbalances rarely occur in isolation. Hypomagnesemia often accompanies hypokalemia. Hypocalcemia frequently coexists with hypomagnesemia. When you see one imbalance on an exam question, look for others that commonly co-occur — this pattern recognition is exactly what the NCLEX tests.</p>`,
      },
      {
        id: "sodium",
        title: "Sodium Disorders (Na⁺)",
        icon: Activity,
        htmlContent: `<p><strong>Normal range: 135-145 mEq/L</strong></p>
<p>Sodium is the most abundant extracellular cation and the primary determinant of serum osmolality. Sodium imbalances are fundamentally water balance disorders — hyponatremia usually reflects water excess, while hypernatremia reflects water deficit.</p>

<h3>Hyponatremia (Na⁺ < 135 mEq/L)</h3>
<p><strong>Causes:</strong> SIADH (most common exam cause), excessive hypotonic IV fluids, heart failure, cirrhosis, psychogenic polydipsia, thiazide diuretics, vomiting/diarrhea with water replacement</p>
<p><strong>Clinical signs:</strong> Confusion, lethargy, headache, nausea/vomiting, seizures (severe), cerebral edema. Symptoms correlate with rate of decline — acute onset is more dangerous than chronic.</p>
<p><strong>Priority nursing interventions:</strong></p>
<ul>
<li>Fluid restriction (dilutional hyponatremia / SIADH) — typically 800-1000 mL/day</li>
<li>Hypertonic saline (3% NaCl) for severe symptomatic hyponatremia with seizures — administer via infusion pump with frequent Na⁺ monitoring</li>
<li>Monitor neuro status every 1-2 hours — confusion, lethargy, and seizures indicate worsening</li>
<li>Correct slowly: no more than 8-12 mEq/L per 24 hours to prevent osmotic demyelination syndrome (ODS)</li>
<li>Strict I&O, daily weights, seizure precautions</li>
</ul>

<h3>Hypernatremia (Na⁺ > 145 mEq/L)</h3>
<p><strong>Causes:</strong> Diabetes insipidus, dehydration, excessive sodium intake, hypertonic tube feedings, heatstroke, watery diarrhea without fluid replacement</p>
<p><strong>Clinical signs:</strong> Intense thirst, dry mucous membranes, flushed skin, low-grade fever, restlessness, irritability, muscle twitching, seizures (severe)</p>
<p><strong>Priority nursing interventions:</strong></p>
<ul>
<li>Administer hypotonic fluids (0.45% NS or D5W) as ordered — correct gradually to prevent cerebral edema</li>
<li>For diabetes insipidus: administer desmopressin (DDAVP) as ordered</li>
<li>Monitor urine specific gravity (normal: 1.005-1.030) — low in DI, high in dehydration</li>
<li>Strict I&O, daily weights, safety measures for confusion</li>
</ul>

<div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
<p class="text-sm text-amber-800"><strong>Exam Trap:</strong> Do not confuse dilutional hyponatremia (fluid overload, treat with fluid restriction) with depletional hyponatremia (sodium loss, treat with saline replacement). The treatment is opposite — getting this wrong on the exam means choosing a harmful intervention.</p>
</div>`,
      },
      {
        id: "potassium",
        title: "Potassium Disorders (K⁺)",
        icon: Heart,
        htmlContent: `<p><strong>Normal range: 3.5-5.0 mEq/L</strong></p>
<p>Potassium is the most abundant intracellular cation and is critical for cardiac conduction, neuromuscular function, and acid-base balance. Both hypokalemia and hyperkalemia can cause life-threatening cardiac dysrhythmias, making potassium the most frequently tested electrolyte on nursing exams. ECG changes are a priority assessment finding.</p>

<h3>Hypokalemia (K⁺ < 3.5 mEq/L)</h3>
<p><strong>Causes:</strong> Loop and thiazide diuretics (most common), vomiting, NG suction, diarrhea, alkalosis, insulin administration, excessive laxative use</p>
<p><strong>Clinical signs:</strong> Muscle weakness, leg cramps, decreased DTRs, constipation/ileus, fatigue, cardiac dysrhythmias</p>
<p><strong>ECG changes:</strong> Flattened T waves, ST depression, prominent U waves, prolonged QT interval</p>
<p><strong>Priority nursing interventions:</strong></p>
<ul>
<li>Oral potassium replacement preferred (KCl tablets with full glass of water and food to reduce GI irritation)</li>
<li>IV potassium: NEVER give by IV push — maximum rate 10-20 mEq/hour via infusion pump with cardiac monitoring</li>
<li>Dilute IV potassium: maximum concentration 40 mEq/L for peripheral IV, 80 mEq/L for central line</li>
<li>Monitor ECG continuously during IV replacement</li>
<li>Assess for digoxin toxicity — hypokalemia increases sensitivity to digoxin</li>
<li>Check magnesium level — hypokalemia will not correct until hypomagnesemia is treated</li>
</ul>

<h3>Hyperkalemia (K⁺ > 5.0 mEq/L)</h3>
<p><strong>Causes:</strong> Renal failure (most common), potassium-sparing diuretics, ACE inhibitors, tissue trauma/burns, acidosis, hemolyzed blood sample (false elevation)</p>
<p><strong>Clinical signs:</strong> Muscle weakness progressing to flaccid paralysis, paresthesias, abdominal cramping, diarrhea, cardiac arrest</p>
<p><strong>ECG changes:</strong> Tall peaked T waves → widened QRS → absent P waves → sine wave pattern → ventricular fibrillation/asystole</p>
<p><strong>Priority nursing interventions (emergency):</strong></p>
<ul>
<li>Calcium gluconate IV — stabilizes cardiac membrane (does NOT lower K⁺, protects the heart)</li>
<li>Regular insulin + D50 IV — drives K⁺ into cells (temporary, monitor glucose closely)</li>
<li>Sodium bicarbonate IV — shifts K⁺ intracellularly in metabolic acidosis</li>
<li>Kayexalate (sodium polystyrene sulfonate) — exchanges sodium for potassium in the gut (delayed onset)</li>
<li>Albuterol nebulizer — shifts K⁺ into cells via beta-2 receptor stimulation</li>
<li>Dialysis — definitive treatment for severe or refractory hyperkalemia</li>
<li>Discontinue all potassium supplements and potassium-sparing medications</li>
</ul>

<div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
<p class="text-sm text-amber-800"><strong>Exam Trap:</strong> IV potassium push causes fatal cardiac arrest. This is one of the most commonly tested safety questions on the NCLEX. Always administer IV potassium diluted and infused slowly with cardiac monitoring. Never add KCl to a hanging IV bag — always use premixed solutions or infusion pump.</p>
</div>`,
      },
      {
        id: "calcium-magnesium",
        title: "Calcium & Magnesium Disorders",
        icon: Stethoscope,
        htmlContent: `<h3>Calcium (Ca²⁺) — Normal range: 8.5-10.5 mg/dL (total) / 4.5-5.5 mg/dL (ionized)</h3>
<p>Calcium is essential for bone integrity, muscle contraction, blood clotting, and nerve transmission. Ionized (free) calcium is the physiologically active form. Always check albumin levels — for every 1 g/dL decrease in albumin, total calcium decreases by approximately 0.8 mg/dL (corrected calcium calculation).</p>

<h4>Hypocalcemia (Ca²⁺ < 8.5 mg/dL)</h4>
<p><strong>Causes:</strong> Hypoparathyroidism, chronic kidney disease, pancreatitis, inadequate vitamin D, hypomagnesemia, massive blood transfusions (citrate binds calcium), thyroidectomy</p>
<p><strong>Clinical signs:</strong> Trousseau's sign (carpal spasm with BP cuff inflation), Chvostek's sign (facial twitching on tapping facial nerve), tetany, laryngospasm, seizures, prolonged QT interval</p>
<p><strong>Priority nursing interventions:</strong></p>
<ul>
<li>Administer IV calcium gluconate slowly (10-20 minutes) — monitor for bradycardia and hypotension</li>
<li>Keep emergency airway equipment at bedside (risk of laryngospasm)</li>
<li>Seizure precautions, continuous cardiac monitoring</li>
<li>Oral calcium supplements with vitamin D for chronic management</li>
<li>Post-thyroidectomy: assess for Chvostek's and Trousseau's signs every 4 hours for 48 hours</li>
</ul>

<h4>Hypercalcemia (Ca²⁺ > 10.5 mg/dL)</h4>
<p><strong>Causes:</strong> Hyperparathyroidism, malignancy (bone metastases), prolonged immobilization, excessive vitamin D, thiazide diuretics</p>
<p><strong>Clinical signs:</strong> Remember "stones, bones, groans, moans" — kidney stones, bone pain, abdominal pain/constipation, confusion/lethargy. Shortened QT, cardiac arrest at severe levels.</p>
<p><strong>Priority nursing interventions:</strong></p>
<ul>
<li>IV normal saline hydration (aggressive) — dilutes calcium and promotes renal excretion</li>
<li>Loop diuretics (furosemide) after adequate hydration — promotes calciuresis</li>
<li>Calcitonin, bisphosphonates (zoledronic acid) for malignancy-related hypercalcemia</li>
<li>Encourage mobility, monitor for renal calculi, strain urine</li>
</ul>

<h3>Magnesium (Mg²⁺) — Normal range: 1.5-2.5 mEq/L</h3>
<p>Magnesium is critical for neuromuscular function and is closely linked to potassium and calcium balance. Hypomagnesemia must be corrected before hypokalemia will respond to treatment — this is a high-yield exam concept.</p>

<h4>Hypomagnesemia (Mg²⁺ < 1.5 mEq/L)</h4>
<p><strong>Causes:</strong> Chronic alcoholism (most common), malnutrition, loop/thiazide diuretics, GI losses, proton pump inhibitors</p>
<p><strong>Clinical signs:</strong> Similar to hypocalcemia — tremors, hyperactive DTRs, positive Trousseau's/Chvostek's, tetany, seizures, cardiac dysrhythmias (torsades de pointes)</p>
<p><strong>Priority nursing interventions:</strong></p>
<ul>
<li>IV magnesium sulfate for severe depletion — administer slowly, monitor DTRs, respiratory rate, and urine output</li>
<li>Check and correct potassium simultaneously</li>
<li>Seizure precautions, fall precautions (neuromuscular irritability)</li>
<li>Dietary sources: green leafy vegetables, nuts, legumes, whole grains</li>
</ul>

<h4>Hypermagnesemia (Mg²⁺ > 2.5 mEq/L)</h4>
<p><strong>Causes:</strong> Renal failure (cannot excrete), excessive magnesium-containing antacids/laxatives, preeclampsia treatment (magnesium sulfate toxicity)</p>
<p><strong>Clinical signs:</strong> Decreased DTRs (earliest sign), lethargy, bradycardia, respiratory depression, cardiac arrest</p>
<p><strong>Priority nursing interventions:</strong></p>
<ul>
<li>Antidote: Calcium gluconate IV — keep at bedside during magnesium sulfate infusions</li>
<li>Monitor DTRs before each magnesium sulfate dose (hold if absent)</li>
<li>Monitor respiratory rate (hold if < 12/min) and urine output (hold if < 30 mL/hr)</li>
<li>Discontinue magnesium-containing medications</li>
</ul>

<div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
<p class="text-sm text-amber-800"><strong>Exam Trap:</strong> On preeclampsia questions, always assess DTRs, respiratory rate (>12), and urine output (>30 mL/hr) before administering magnesium sulfate. Loss of DTRs is the earliest sign of magnesium toxicity. The antidote is calcium gluconate — it must be at the bedside.</p>
</div>`,
      },
      {
        id: "phosphorus",
        title: "Phosphorus Disorders (PO₄³⁻)",
        icon: Microscope,
        htmlContent: `<p><strong>Normal range: 2.5-4.5 mg/dL</strong></p>
<p>Phosphorus has an inverse relationship with calcium — when one goes up, the other goes down. This reciprocal relationship is a frequently tested concept. Phosphorus is essential for ATP production, bone mineralization, and acid-base buffering.</p>

<h3>Hypophosphatemia (PO₄ < 2.5 mg/dL)</h3>
<p><strong>Causes:</strong> Refeeding syndrome (most commonly tested), chronic alcoholism, diabetic ketoacidosis recovery (insulin drives PO₄ into cells), phosphate-binding antacids, respiratory alkalosis</p>
<p><strong>Clinical signs:</strong> Muscle weakness, respiratory failure (diaphragm weakness), confusion, seizures, rhabdomyolysis, impaired WBC function</p>
<p><strong>Priority nursing interventions:</strong></p>
<ul>
<li>Oral phosphorus supplements (Neutra-Phos) with meals</li>
<li>IV sodium or potassium phosphate for severe deficiency — infuse slowly</li>
<li>Refeeding syndrome prevention: advance nutrition gradually in malnourished patients</li>
<li>Monitor for associated hypocalcemia and hypomagnesemia</li>
</ul>

<h3>Hyperphosphatemia (PO₄ > 4.5 mg/dL)</h3>
<p><strong>Causes:</strong> Renal failure (cannot excrete), excessive phosphorus intake, hypoparathyroidism, tumor lysis syndrome, rhabdomyolysis</p>
<p><strong>Clinical signs:</strong> Signs of associated hypocalcemia (tetany, Chvostek's/Trousseau's), soft tissue calcification, pruritus</p>
<p><strong>Priority nursing interventions:</strong></p>
<ul>
<li>Phosphate-binding medications (calcium carbonate, sevelamer) — administer WITH meals to bind dietary phosphorus</li>
<li>Low-phosphorus diet: limit dairy, cola, processed meats, nuts</li>
<li>Dialysis for severe or refractory elevation</li>
<li>Monitor calcium levels (inverse relationship)</li>
</ul>

<div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
<p class="text-sm text-amber-800"><strong>Exam Trap:</strong> Refeeding syndrome is a life-threatening complication of rapidly restarting nutrition in malnourished patients. As cells take up glucose, phosphorus, potassium, and magnesium shift intracellularly causing dangerous drops. This is heavily tested in context of eating disorder patients and prolonged NPO status.</p>
</div>`,
      },
      {
        id: "iv-fluids",
        title: "IV Fluid Therapy & Electrolytes",
        icon: Pill,
        htmlContent: `<p>Understanding IV fluid tonicity is essential for managing electrolyte imbalances safely. Selecting the wrong IV fluid can worsen the imbalance and cause harm — this is why IV fluid questions are common on nursing exams.</p>

<h3>Isotonic Solutions (Same osmolality as blood: ~275-295 mOsm/L)</h3>
<ul>
<li><strong>0.9% Normal Saline (NS)</strong> — first-line for dehydration, blood transfusions, and shock resuscitation. Does not shift fluid between compartments.</li>
<li><strong>Lactated Ringer's (LR)</strong> — preferred for surgical patients and burns (Parkland formula). Contains electrolytes (Na, K, Ca, lactate). Contraindicated in liver failure (cannot metabolize lactate) and hyperkalemia.</li>
<li><strong>D5W</strong> — isotonic in the bag, becomes hypotonic once dextrose is metabolized. Used for medication dilution and maintenance hydration.</li>
</ul>

<h3>Hypotonic Solutions (< 275 mOsm/L)</h3>
<ul>
<li><strong>0.45% NS (Half-Normal Saline)</strong> — used for hypernatremia, cellular dehydration. Fluid shifts FROM vascular space INTO cells.</li>
<li><strong>Contraindications:</strong> Increased intracranial pressure (worsens cerebral edema), burns (third-spacing), hypovolemia</li>
</ul>

<h3>Hypertonic Solutions (> 295 mOsm/L)</h3>
<ul>
<li><strong>3% Saline</strong> — used for severe symptomatic hyponatremia with seizures. Fluid shifts FROM cells INTO vascular space.</li>
<li><strong>D10W, D50W</strong> — used for hypoglycemia treatment</li>
<li><strong>Contraindications:</strong> Dehydration (cellular shrinkage), hypernatremia</li>
<li><strong>Administration:</strong> Via infusion pump only, central line preferred, frequent sodium monitoring (every 2-4 hours)</li>
</ul>

<div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
<p class="text-sm text-amber-800"><strong>Exam Trap:</strong> D5W is isotonic in the bag but becomes hypotonic once infused (the dextrose is rapidly metabolized, leaving free water). Therefore, D5W should NOT be used for patients with increased ICP or those at risk for cerebral edema. This distinction is commonly tested.</p>
</div>`,
      },
      {
        id: "exam-strategies",
        title: "Exam Strategies for Electrolyte Questions",
        icon: Target,
        htmlContent: `<p>Electrolyte questions on the NCLEX and REx-PN follow predictable patterns. Knowing these patterns helps you answer efficiently and accurately, even when the clinical scenario is unfamiliar.</p>

<h3>Strategy 1: Identify the Electrolyte First</h3>
<p>Read the lab values carefully. Identify which electrolyte is abnormal and whether it is high or low. Many students make errors because they focus on the clinical scenario before checking the labs.</p>

<h3>Strategy 2: Match Signs to the Imbalance</h3>
<p>Key pattern recognition shortcuts:</p>
<ul>
<li><strong>Cardiac symptoms</strong> (ECG changes, dysrhythmias) → think potassium or calcium</li>
<li><strong>Neuromuscular symptoms</strong> (tetany, Trousseau's, Chvostek's) → think calcium or magnesium deficit</li>
<li><strong>Neurological symptoms</strong> (confusion, seizures) → think sodium or severe calcium imbalance</li>
<li><strong>GI symptoms</strong> (constipation or diarrhea) → think potassium or calcium</li>
</ul>

<h3>Strategy 3: Know the Priority Intervention</h3>
<p>For each electrolyte, know the single most important nursing action:</p>
<ul>
<li><strong>Hyperkalemia:</strong> Cardiac monitoring + calcium gluconate (stabilize the heart first)</li>
<li><strong>Hypokalemia:</strong> Replace potassium (NEVER IV push) + monitor ECG</li>
<li><strong>Hyponatremia (SIADH):</strong> Fluid restriction</li>
<li><strong>Hypernatremia:</strong> Hypotonic fluids + monitor neuro status</li>
<li><strong>Hypocalcemia:</strong> IV calcium gluconate + airway equipment at bedside</li>
<li><strong>Hypermagnesemia:</strong> Calcium gluconate (antidote) + assess DTRs</li>
</ul>

<h3>Strategy 4: Watch for Safety Questions</h3>
<p>The NCLEX loves patient safety questions involving electrolytes:</p>
<ul>
<li>IV potassium: always diluted, always via pump, never by push</li>
<li>Magnesium sulfate: check DTRs, RR > 12, UO > 30 mL/hr; calcium gluconate at bedside</li>
<li>3% saline: infusion pump, frequent Na⁺ monitoring, correct slowly</li>
<li>Calcium gluconate: slow IV push (10-20 min), monitor for bradycardia</li>
</ul>`,
      },
    ],
    faqs: [
      { question: "What are the most commonly tested electrolytes on the NCLEX?", answer: "Potassium (hypokalemia and hyperkalemia) is the most frequently tested electrolyte, followed by sodium (hyponatremia), calcium (hypocalcemia), and magnesium. Focus on ECG changes for potassium, neuromuscular signs for calcium/magnesium, and neurological signs for sodium." },
      { question: "How do I remember which IV fluid to use for electrolyte imbalances?", answer: "Use the principle of opposites: hypotonic fluids (0.45% NS) for hypertonic conditions (hypernatremia/dehydration), hypertonic fluids (3% saline) for hypotonic conditions (severe hyponatremia). Isotonic fluids (0.9% NS, LR) are for volume replacement without shifting. Remember: D5W is isotonic in the bag but hypotonic in the body." },
      { question: "Why must hypomagnesemia be corrected before hypokalemia?", answer: "Magnesium is required for the sodium-potassium ATPase pump to function properly. When magnesium is low, the pump cannot retain potassium in cells, so potassium leaks out through renal tubules faster than it can be replaced. You can give potassium all day, but levels will not normalize until magnesium is corrected first." },
      { question: "What is the Trousseau's sign and when should I assess for it?", answer: "Trousseau's sign is a carpal spasm (hand cramping into a characteristic position) that occurs when you inflate a blood pressure cuff above systolic pressure for 3 minutes. It is a sign of hypocalcemia or hypomagnesemia. Assess for it post-thyroidectomy (parathyroid damage risk) and whenever calcium levels are low." },
      { question: "Why can't you give IV potassium by push?", answer: "IV potassium push delivers a bolus of potassium directly to the heart, which can cause fatal cardiac arrest (ventricular fibrillation). Potassium must be diluted and infused slowly (maximum 10-20 mEq/hour) with continuous cardiac monitoring. This is a critical patient safety principle tested on every nursing exam." },
      { question: "How do I interpret ABGs in relation to electrolytes?", answer: "Acid-base status directly affects potassium and calcium. In acidosis, H⁺ ions move into cells and K⁺ moves out → apparent hyperkalemia. In alkalosis, the opposite occurs → apparent hypokalemia. For calcium, alkalosis decreases ionized (active) calcium even if total calcium is normal, which can cause tetany symptoms." },
    ],
    internalLinks: [
      { label: "Electrolyte & Acid-Base Study Guide", url: "/study-guide/electrolytes-acid-base-nursing-guide", description: "Comprehensive hub for electrolyte lessons" },
      { label: "Hypokalemia Lesson", url: "/lessons/hypokalemia", description: "Deep-dive on hypokalemia" },
      { label: "Hyperkalemia Lesson", url: "/lessons/hyperkalemia", description: "Emergency treatment guide" },
      { label: "Electrolyte Flashcards", url: "/flashcards", description: "Spaced-repetition flashcards" },
      { label: "Electrolyte & ABG Simulator", url: "/electrolyte-abg-simulator", description: "Interactive electrolyte practice" },
      { label: "NCLEX Practice Questions", url: "/nclex-rn-practice-questions", description: "NCLEX-style exam questions" },
      { label: "REx-PN Practice Questions", url: "/rex-pn-practice-questions", description: "REx-PN exam questions" },
      { label: "Lab Values Reference", url: "/lab-values", description: "Complete lab values guide" },
    ],
    ctaTitle: "Master Electrolytes with Practice Questions",
    ctaDescription: "Test your understanding of electrolyte imbalances with exam-style questions featuring detailed rationales.",
    ctaPrimaryLabel: "Start Electrolyte Questions",
    ctaPrimaryUrl: "/practice-questions",
    breadcrumbs: [
      { name: "Home", url: "https://www.nursenest.ca" },
      { name: "Study Guides", url: "https://www.nursenest.ca/exam-prep" },
      { name: "Electrolytes for Nursing Exams", url: "https://www.nursenest.ca/electrolytes-nursing-exam-guide" },
    ],
  },

  "acid-base-disorders-nursing-guide": {
    slug: "acid-base-disorders-nursing-guide",
    title: "Acid-Base Disorders Explained for Nurses — ABG Interpretation Guide",
    metaTitle: "Acid-Base Disorders for Nurses | ABG Interpretation Guide | NurseNest",
    metaDescription: "Master acid-base disorders and ABG interpretation for nursing exams. Covers respiratory and metabolic acidosis/alkalosis, compensation mechanisms, the ROME method, and clinical nursing interventions. Essential NCLEX and REx-PN study guide.",
    keywords: "acid base disorders nursing, ABG interpretation, respiratory acidosis, metabolic alkalosis, ROME method nursing, arterial blood gas nursing, acid base balance NCLEX",
    heroHeading: "Acid-Base Disorders Explained for Nurses",
    heroSubheading: "ABG Interpretation & Clinical Management Guide",
    heroDescription: "Arterial blood gas (ABG) interpretation is a fundamental nursing skill tested extensively on NCLEX and REx-PN exams. This comprehensive guide walks you through each acid-base disorder, teaches you systematic ABG interpretation using the ROME method, explains compensation mechanisms, and connects you to the clinical nursing interventions for each imbalance.",
    color: "#059669",
    colorAccent: "#D1FAE5",
    badgeLabel: "Authority Guide",
    sections: [
      {
        id: "abg-fundamentals",
        title: "ABG Fundamentals & Normal Values",
        icon: BookOpen,
        htmlContent: `<p>Arterial blood gas (ABG) analysis provides a snapshot of a patient's acid-base status, oxygenation, and ventilation. Understanding ABGs is essential for nursing assessment, recognizing respiratory failure, and guiding treatment decisions. Every nursing exam tests ABG interpretation — typically 3-8 questions on the NCLEX.</p>

<h3>Normal ABG Values</h3>
<ul>
<li><strong>pH:</strong> 7.35 - 7.45 (below 7.35 = acidosis; above 7.45 = alkalosis)</li>
<li><strong>PaCO₂:</strong> 35 - 45 mmHg (respiratory component — controlled by the lungs)</li>
<li><strong>HCO₃⁻:</strong> 22 - 26 mEq/L (metabolic component — controlled by the kidneys)</li>
<li><strong>PaO₂:</strong> 80 - 100 mmHg (oxygenation — not directly related to acid-base but critical for assessment)</li>
<li><strong>SaO₂:</strong> 95 - 100% (oxygen saturation)</li>
</ul>

<h3>The Two Regulators</h3>
<p><strong>Lungs (respiratory):</strong> Regulate CO₂ levels within minutes. Hyperventilation blows off CO₂ (raises pH). Hypoventilation retains CO₂ (lowers pH). CO₂ is an acid when dissolved in blood (forms carbonic acid, H₂CO₃).</p>
<p><strong>Kidneys (metabolic):</strong> Regulate HCO₃⁻ (bicarbonate) levels over hours to days. The kidneys can either retain or excrete bicarbonate and hydrogen ions. This is a slower but more sustained compensatory mechanism.</p>

<p><strong>Key concept:</strong> pH is determined by the ratio of HCO₃⁻ to CO₂. Normal ratio is 20:1 (bicarbonate to carbonic acid). Any process that changes this ratio will alter the pH.</p>`,
      },
      {
        id: "rome-method",
        title: "The ROME Method for ABG Interpretation",
        icon: Brain,
        htmlContent: `<p>The ROME method is the most reliable systematic approach to ABG interpretation on nursing exams. It eliminates guesswork and works for every ABG scenario.</p>

<h3>ROME = Respiratory Opposite, Metabolic Equal</h3>
<ul>
<li><strong>Respiratory = Opposite:</strong> In respiratory disorders, pH and PaCO₂ move in opposite directions. If CO₂ is high (>45), pH is low (<7.35) → respiratory acidosis. If CO₂ is low (<35), pH is high (>7.45) → respiratory alkalosis.</li>
<li><strong>Metabolic = Equal:</strong> In metabolic disorders, pH and HCO₃⁻ move in the same direction. If HCO₃⁻ is low (<22), pH is low (<7.35) → metabolic acidosis. If HCO₃⁻ is high (>26), pH is high (>7.45) → metabolic alkalosis.</li>
</ul>

<h3>Step-by-Step ABG Interpretation</h3>
<ol>
<li><strong>Step 1: Look at pH.</strong> Is it acidotic (<7.35) or alkalotic (>7.45)? If 7.35-7.45, check which end it is closer to — this tells you the primary disorder.</li>
<li><strong>Step 2: Check PaCO₂.</strong> Is it normal (35-45), high (>45 = respiratory acidosis), or low (<35 = respiratory alkalosis)?</li>
<li><strong>Step 3: Check HCO₃⁻.</strong> Is it normal (22-26), low (<22 = metabolic acidosis), or high (>26 = metabolic alkalosis)?</li>
<li><strong>Step 4: Match the pH.</strong> Which value (CO₂ or HCO₃⁻) explains the pH direction? That is the primary disorder.</li>
<li><strong>Step 5: Check for compensation.</strong> Is the other value also abnormal? If yes, the body is compensating. If the other value is normal, the disorder is uncompensated.</li>
</ol>

<h3>Compensation Types</h3>
<ul>
<li><strong>Uncompensated:</strong> pH is abnormal, only one value (CO₂ or HCO₃⁻) is abnormal. The body has not yet begun to compensate.</li>
<li><strong>Partially compensated:</strong> pH is still abnormal, but both CO₂ and HCO₃⁻ are abnormal. The body is trying to compensate but has not fully corrected the pH.</li>
<li><strong>Fully compensated:</strong> pH is within normal range (7.35-7.45), but both CO₂ and HCO₃⁻ are abnormal. Look at which end of normal the pH falls to determine the primary disorder.</li>
</ul>

<div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
<p class="text-sm text-amber-800"><strong>Exam Tip:</strong> In fully compensated ABGs, the pH is normal but both CO₂ and HCO₃⁻ are abnormal. To determine the primary disorder, look at which side of 7.40 the pH falls. If pH is 7.35-7.39, the primary disorder is acidosis. If pH is 7.41-7.45, the primary disorder is alkalosis.</p>
</div>`,
      },
      {
        id: "respiratory-acidosis",
        title: "Respiratory Acidosis",
        icon: Activity,
        htmlContent: `<p><strong>ABG pattern: pH ↓ (<7.35), PaCO₂ ↑ (>45 mmHg)</strong></p>
<p><strong>Mechanism:</strong> CO₂ retention due to hypoventilation or impaired gas exchange. CO₂ combines with water to form carbonic acid, lowering pH.</p>

<h3>Causes</h3>
<ul>
<li><strong>Acute:</strong> Opioid/sedative overdose, pneumothorax, airway obstruction, neuromuscular disease (Guillain-Barré, myasthenia gravis), severe asthma, pneumonia, ARDS, anesthesia</li>
<li><strong>Chronic:</strong> COPD (most common), obesity hypoventilation syndrome, kyphoscoliosis, chronic neuromuscular disorders</li>
</ul>

<h3>Clinical Signs</h3>
<p>Headache, confusion, drowsiness progressing to coma, warm flushed skin (CO₂ vasodilation), tachycardia, dysrhythmias. In chronic COPD: elevated HCO₃⁻ indicates renal compensation.</p>

<h3>Priority Nursing Interventions</h3>
<ul>
<li>Improve ventilation: position upright (high Fowler's), incentive spirometry, assist with breathing exercises</li>
<li>Opioid overdose: administer naloxone (Narcan) — monitor for re-sedation</li>
<li>COPD: low-flow O₂ (1-2 L/min, target SpO₂ 88-92%). Do NOT give high-flow O₂ — removes hypoxic respiratory drive</li>
<li>Prepare for possible intubation/mechanical ventilation if PaCO₂ continues to rise</li>
<li>Monitor respiratory rate, depth, and pattern every 1-2 hours</li>
<li>Bronchodilators (albuterol) for bronchospasm, suction as needed for secretion clearance</li>
</ul>

<div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
<p class="text-sm text-amber-800"><strong>Exam Trap:</strong> COPD patients are chronic CO₂ retainers. Their respiratory drive depends on hypoxia, not CO₂ levels. Giving high-flow O₂ eliminates the hypoxic drive and can cause respiratory arrest. Always use low-flow O₂ targeting SpO₂ 88-92%.</p>
</div>`,
      },
      {
        id: "respiratory-alkalosis",
        title: "Respiratory Alkalosis",
        icon: Activity,
        htmlContent: `<p><strong>ABG pattern: pH ↑ (>7.45), PaCO₂ ↓ (<35 mmHg)</strong></p>
<p><strong>Mechanism:</strong> Excessive CO₂ elimination due to hyperventilation. Loss of CO₂ (acid) raises pH.</p>

<h3>Causes</h3>
<ul>
<li>Anxiety/panic attacks (most common), pain, fever, early sepsis</li>
<li>Hypoxemia (PE, pneumonia, altitude) — compensatory hyperventilation</li>
<li>Mechanical ventilation (rate or tidal volume set too high)</li>
<li>CNS disorders (head injury, brain tumor), salicylate (aspirin) toxicity (early)</li>
<li>Pregnancy (progesterone stimulates respiration)</li>
</ul>

<h3>Clinical Signs</h3>
<p>Lightheadedness, dizziness, tingling/numbness (circumoral and extremities), muscle cramps, tetany (alkalosis decreases ionized calcium), palpitations, syncope.</p>

<h3>Priority Nursing Interventions</h3>
<ul>
<li>Anxiety-related: calm reassurance, coached slow breathing, paper bag rebreathing (increases CO₂ inhalation) — use cautiously</li>
<li>Treat underlying cause: analgesics for pain, antipyretics for fever, anxiolytics for anxiety</li>
<li>Mechanical ventilation: reduce rate or tidal volume as ordered</li>
<li>If hypoxia-driven: treat the hypoxemia (oxygen therapy, PE management)</li>
<li>Monitor for tetany and cardiac dysrhythmias (alkalosis-related hypocalcemia)</li>
</ul>`,
      },
      {
        id: "metabolic-acidosis",
        title: "Metabolic Acidosis",
        icon: AlertTriangle,
        htmlContent: `<p><strong>ABG pattern: pH ↓ (<7.35), HCO₃⁻ ↓ (<22 mEq/L)</strong></p>
<p><strong>Mechanism:</strong> Either too much acid production/ingestion or too much bicarbonate loss. Use the anion gap to differentiate.</p>

<h3>Anion Gap = Na⁺ - (Cl⁻ + HCO₃⁻) — Normal: 8-12 mEq/L</h3>

<h4>High Anion Gap Metabolic Acidosis (MUDPILES)</h4>
<p>Something is adding acid to the body:</p>
<ul>
<li><strong>M</strong>ethanol poisoning</li>
<li><strong>U</strong>remia (renal failure — cannot excrete acids)</li>
<li><strong>D</strong>iabetic ketoacidosis (DKA) — most commonly tested</li>
<li><strong>P</strong>ropylene glycol toxicity</li>
<li><strong>I</strong>soniazid / Iron toxicity</li>
<li><strong>L</strong>actic acidosis (sepsis, shock, hypoxia)</li>
<li><strong>E</strong>thylene glycol poisoning</li>
<li><strong>S</strong>alicylate (aspirin) toxicity (late)</li>
</ul>

<h4>Normal Anion Gap (Hyperchloremic) Metabolic Acidosis</h4>
<p>Bicarbonate is being lost from the body:</p>
<ul>
<li>Diarrhea (most common — GI tract loses HCO₃⁻)</li>
<li>Renal tubular acidosis</li>
<li>Pancreatic fistula/drainage</li>
<li>Ureterosigmoidostomy</li>
</ul>

<h3>Clinical Signs</h3>
<p>Kussmaul respirations (deep rapid breathing — respiratory compensation), fruity breath (DKA), confusion, lethargy, warm flushed skin, nausea/vomiting, hyperkalemia (H⁺/K⁺ exchange)</p>

<h3>Priority Nursing Interventions</h3>
<ul>
<li>Treat the underlying cause (insulin for DKA, antibiotics for sepsis, dialysis for renal failure)</li>
<li>IV sodium bicarbonate for pH < 7.1 (severe, life-threatening acidosis only)</li>
<li>IV fluid resuscitation (isotonic crystalloid for DKA and sepsis)</li>
<li>Monitor potassium closely — as acidosis corrects, K⁺ shifts back into cells causing hypokalemia</li>
<li>Do NOT suppress Kussmaul respirations — they are the body's compensation mechanism</li>
</ul>

<div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
<p class="text-sm text-amber-800"><strong>Exam Trap:</strong> In DKA, potassium may initially appear normal or high (acidosis pushes K⁺ out of cells). But as you correct the acidosis with insulin and fluids, K⁺ shifts back into cells causing dangerous hypokalemia. Always replace potassium when K⁺ < 5.0 before or during insulin administration.</p>
</div>`,
      },
      {
        id: "metabolic-alkalosis",
        title: "Metabolic Alkalosis",
        icon: AlertTriangle,
        htmlContent: `<p><strong>ABG pattern: pH ↑ (>7.45), HCO₃⁻ ↑ (>26 mEq/L)</strong></p>
<p><strong>Mechanism:</strong> Either excessive loss of acid (H⁺) or excessive retention/administration of base (HCO₃⁻).</p>

<h3>Causes</h3>
<ul>
<li>Vomiting/NG suctioning (loss of HCl from stomach — most commonly tested)</li>
<li>Excessive sodium bicarbonate administration</li>
<li>Diuretic use (loop/thiazide — causes contraction alkalosis via volume depletion)</li>
<li>Cushing syndrome / corticosteroid excess</li>
<li>Hyperaldosteronism (sodium retention, H⁺ and K⁺ excretion)</li>
<li>Excessive antacid use</li>
</ul>

<h3>Clinical Signs</h3>
<p>Shallow slow respirations (compensatory hypoventilation), confusion, irritability, muscle cramps, tetany (alkalosis decreases ionized calcium), hypokalemia (H⁺/K⁺ exchange), cardiac dysrhythmias</p>

<h3>Priority Nursing Interventions</h3>
<ul>
<li>Treat the underlying cause: antiemetics for vomiting, replace NG losses with appropriate fluids</li>
<li>IV normal saline for chloride-responsive alkalosis (restores volume and chloride)</li>
<li>Replace potassium (hypokalemia is both a cause and consequence of metabolic alkalosis)</li>
<li>Acetazolamide (Diamox) — a carbonic anhydrase inhibitor that causes renal HCO₃⁻ wasting (rarely used)</li>
<li>Monitor for hypoventilation and hypoxemia (respiratory compensation)</li>
<li>Monitor ECG for dysrhythmias related to hypokalemia</li>
</ul>`,
      },
      {
        id: "mixed-disorders",
        title: "Mixed Acid-Base Disorders & Clinical Application",
        icon: Stethoscope,
        htmlContent: `<p>In clinical practice and on advanced exam questions, patients may have two or more acid-base disorders simultaneously. Recognizing mixed disorders requires understanding expected compensation ranges.</p>

<h3>Expected Compensation</h3>
<ul>
<li><strong>Respiratory acidosis (acute):</strong> HCO₃⁻ increases 1 mEq/L for every 10 mmHg rise in CO₂</li>
<li><strong>Respiratory acidosis (chronic):</strong> HCO₃⁻ increases 3.5 mEq/L for every 10 mmHg rise in CO₂</li>
<li><strong>Respiratory alkalosis (acute):</strong> HCO₃⁻ decreases 2 mEq/L for every 10 mmHg fall in CO₂</li>
<li><strong>Metabolic acidosis:</strong> CO₂ decreases 1.2 mmHg for every 1 mEq/L decrease in HCO₃⁻ (Winter's formula)</li>
<li><strong>Metabolic alkalosis:</strong> CO₂ increases 0.7 mmHg for every 1 mEq/L increase in HCO₃⁻</li>
</ul>

<p>If the actual compensation is more or less than expected, a mixed disorder is present. For example, a patient with DKA (metabolic acidosis) and pneumonia (respiratory acidosis) would have both low HCO₃⁻ AND high CO₂ — the pH would be very low because both systems are contributing to acidosis.</p>

<h3>Clinical Application: Practice ABG Interpretation</h3>
<p><strong>Example 1:</strong> pH 7.28, PaCO₂ 55, HCO₃⁻ 24 → Uncompensated respiratory acidosis (pH low, CO₂ high, HCO₃⁻ normal). Think: COPD exacerbation, opioid overdose, or pneumonia.</p>
<p><strong>Example 2:</strong> pH 7.32, PaCO₂ 30, HCO₃⁻ 15 → Partially compensated metabolic acidosis (pH low, HCO₃⁻ low, CO₂ low from respiratory compensation). Think: DKA, lactic acidosis, or renal failure.</p>
<p><strong>Example 3:</strong> pH 7.48, PaCO₂ 28, HCO₃⁻ 24 → Uncompensated respiratory alkalosis (pH high, CO₂ low, HCO₃⁻ normal). Think: anxiety, pain, PE, or early sepsis.</p>
<p><strong>Example 4:</strong> pH 7.50, PaCO₂ 46, HCO₃⁻ 34 → Partially compensated metabolic alkalosis (pH high, HCO₃⁻ high, CO₂ slightly elevated from respiratory compensation). Think: vomiting, NG suctioning, or diuretic use.</p>`,
      },
    ],
    faqs: [
      { question: "How do I quickly interpret ABGs on the NCLEX?", answer: "Use the ROME method: Respiratory = Opposite (pH and CO₂ move in opposite directions), Metabolic = Equal (pH and HCO₃ move in the same direction). First check pH (acidotic or alkalotic?), then check which value (CO₂ or HCO₃) matches the pH direction. Finally, check if the other value is abnormal to determine compensation." },
      { question: "What is the difference between respiratory and metabolic acidosis?", answer: "Respiratory acidosis is caused by CO₂ retention from hypoventilation (COPD, opioid overdose, pneumonia). Metabolic acidosis is caused by either excessive acid production (DKA, lactic acidosis) or bicarbonate loss (diarrhea). The ABG differentiates them: respiratory = high CO₂ with normal HCO₃; metabolic = low HCO₃ with normal CO₂." },
      { question: "What is compensation in acid-base disorders?", answer: "Compensation is the body's attempt to normalize pH when an acid-base disorder occurs. If the primary disorder is respiratory, the kidneys compensate by adjusting HCO₃ (takes hours to days). If the primary disorder is metabolic, the lungs compensate by adjusting CO₂ (takes minutes). Full compensation returns pH to normal range; partial compensation moves pH toward normal but it remains abnormal." },
      { question: "What is the anion gap and when do I use it?", answer: "Anion gap = Na - (Cl + HCO₃). Normal is 8-12 mEq/L. Calculate it whenever you see metabolic acidosis to determine the cause. High anion gap = acid is being added (DKA, lactic acidosis, renal failure, poisoning — use MUDPILES mnemonic). Normal anion gap = bicarbonate is being lost (diarrhea, renal tubular acidosis)." },
      { question: "Why do COPD patients retain CO₂?", answer: "In COPD, the airways are narrowed and alveoli are damaged (emphysema). This impairs the ability to exhale CO₂ effectively. Over time, the body adapts to chronically elevated CO₂ levels, and the respiratory drive shifts from CO₂-mediated (normal) to hypoxia-mediated. This is why high-flow O₂ is dangerous in COPD — it removes the hypoxic drive, causing hypoventilation and further CO₂ retention." },
      { question: "How does DKA cause metabolic acidosis?", answer: "In DKA, insulin deficiency prevents glucose from entering cells. The body breaks down fat for energy, producing ketone bodies (beta-hydroxybutyrate, acetoacetate) which are acids. These ketoacids accumulate faster than the kidneys can excrete them, overwhelming the bicarbonate buffer system and causing a high anion gap metabolic acidosis." },
    ],
    internalLinks: [
      { label: "Electrolytes & Acid-Base Study Guide", url: "/study-guide/electrolytes-acid-base-nursing-guide", description: "Complete electrolyte and acid-base hub" },
      { label: "Electrolytes for Nursing Exams", url: "/electrolytes-nursing-exam-guide", description: "Electrolyte imbalances guide" },
      { label: "Electrolyte & ABG Simulator", url: "/electrolyte-abg-simulator", description: "Interactive ABG practice" },
      { label: "Respiratory Acidosis Lesson", url: "/lessons/respiratory-acidosis", description: "Deep-dive on respiratory acidosis" },
      { label: "Metabolic Acidosis Lesson", url: "/lessons/metabolic-acidosis", description: "Metabolic acidosis guide" },
      { label: "NCLEX Practice Questions", url: "/nclex-rn-practice-questions", description: "Exam-style practice questions" },
      { label: "Lab Values Reference", url: "/lab-values", description: "Complete lab values guide" },
      { label: "Flashcard Decks", url: "/flashcards", description: "Spaced-repetition flashcards" },
    ],
    ctaTitle: "Practice ABG Interpretation",
    ctaDescription: "Test your ABG interpretation skills with our interactive simulator and exam-style practice questions.",
    ctaPrimaryLabel: "Open ABG Simulator",
    ctaPrimaryUrl: "/electrolyte-abg-simulator",
    breadcrumbs: [
      { name: "Home", url: "https://www.nursenest.ca" },
      { name: "Study Guides", url: "https://www.nursenest.ca/exam-prep" },
      { name: "Acid-Base Disorders", url: "https://www.nursenest.ca/acid-base-disorders-nursing-guide" },
    ],
  },

  "nursing-clinical-assessment-guide": {
    slug: "nursing-clinical-assessment-guide",
    title: "Nursing Clinical Assessment Guide — Head-to-Toe Assessment for Exams",
    metaTitle: "Nursing Clinical Assessment Guide | Head-to-Toe Assessment | NurseNest",
    metaDescription: "Complete nursing clinical assessment guide for NCLEX and REx-PN exams. Covers systematic head-to-toe assessment, vital signs interpretation, focused assessments, documentation standards, and clinical decision-making frameworks used in professional nursing practice.",
    keywords: "nursing clinical assessment, head to toe assessment nursing, nursing physical assessment, vital signs interpretation, focused assessment nursing, clinical assessment NCLEX, nursing assessment guide",
    heroHeading: "Nursing Clinical Assessment Guide",
    heroSubheading: "Master Systematic Assessment for Exams & Clinical Practice",
    heroDescription: "Clinical assessment is the foundation of all nursing care and a core competency tested on every nursing licensing exam. This comprehensive guide covers systematic head-to-toe assessment, vital signs interpretation, focused assessments for common conditions, and the clinical decision-making frameworks that help you connect assessment findings to nursing interventions.",
    color: "#7C3AED",
    colorAccent: "#EDE9FE",
    badgeLabel: "Authority Guide",
    sections: [
      {
        id: "assessment-overview",
        title: "Clinical Assessment on Nursing Exams",
        icon: BookOpen,
        htmlContent: `<p>Clinical assessment questions comprise approximately 15-25% of nursing licensing exams (NCLEX and REx-PN). These questions test your ability to gather and interpret patient data, recognize abnormal findings, and prioritize nursing actions based on assessment results. The NCSBN Clinical Judgment Measurement Model begins with "Recognize Cues" — which is fundamentally assessment.</p>

<p>Assessment questions on nursing exams typically follow one of four patterns:</p>
<ul>
<li><strong>Pattern 1: Recognition</strong> — "Which assessment finding indicates..." or "The nurse should assess for which complication?"</li>
<li><strong>Pattern 2: Priority</strong> — "Which assessment finding requires immediate intervention?" or "Which patient should the nurse see first?"</li>
<li><strong>Pattern 3: Interpretation</strong> — "Based on these assessment findings, the nurse suspects..." or "Which assessment finding is expected for this condition?"</li>
<li><strong>Pattern 4: Follow-up</strong> — "After this intervention, the nurse should assess for..." or "Which finding indicates the treatment is effective?"</li>
</ul>

<p><strong>Key principle:</strong> Always assess before intervening. On exam questions, "assess" or "evaluate" is almost always the correct first action unless the patient is in immediate danger (e.g., airway obstruction, cardiac arrest, hemorrhage). Even then, your assessment is rapid — it just happens in seconds rather than minutes.</p>`,
      },
      {
        id: "head-to-toe",
        title: "Systematic Head-to-Toe Assessment",
        icon: ClipboardList,
        htmlContent: `<p>A systematic head-to-toe assessment ensures no body system is missed. While the order may vary between institutions, the principle of systematic evaluation is consistent. On exam questions, you need to know which assessments are relevant for each body system and what abnormal findings indicate.</p>

<h3>Neurological Assessment</h3>
<ul>
<li><strong>Level of consciousness:</strong> Alert, Verbal, Pain, Unresponsive (AVPU) or Glasgow Coma Scale (GCS: 3-15)</li>
<li><strong>Orientation:</strong> Person, place, time, situation (documented as "A&Ox4" or partial)</li>
<li><strong>Pupils:</strong> PERRLA (Pupils Equal, Round, Reactive to Light and Accommodation) — unequal or fixed/dilated = emergency</li>
<li><strong>Motor/sensory:</strong> Equal strength bilaterally, sensation intact, gait/balance</li>
<li><strong>Cranial nerves:</strong> Facial symmetry (CN VII), swallowing (CN IX/X), speech clarity</li>
<li><strong>Red flags:</strong> Sudden unilateral weakness, slurred speech, severe headache, pupil changes, decreasing GCS</li>
</ul>

<h3>Cardiovascular Assessment</h3>
<ul>
<li><strong>Heart sounds:</strong> S1 (mitral/tricuspid closure), S2 (aortic/pulmonic closure), S3 (HF indicator in adults), S4 (decreased compliance), murmurs</li>
<li><strong>Peripheral circulation:</strong> Pulses (radial, pedal, posterior tibial — rate, rhythm, quality), capillary refill (<3 seconds), skin color/temperature</li>
<li><strong>Edema assessment:</strong> Scale 1+ to 4+ pitting, location, onset pattern (bilateral vs unilateral)</li>
<li><strong>JVD:</strong> Assess at 45° — distension above 3 cm suggests right-sided heart failure or fluid overload</li>
<li><strong>Red flags:</strong> Chest pain, irregular rhythm, absent pulses, cool/mottled extremities, JVD</li>
</ul>

<h3>Respiratory Assessment</h3>
<ul>
<li><strong>Inspection:</strong> Rate (12-20/min), depth, pattern (regular, Cheyne-Stokes, Kussmaul, Biot's), use of accessory muscles, chest symmetry</li>
<li><strong>Auscultation:</strong> All lung fields anteriorly and posteriorly — normal: vesicular, bronchial, bronchovesicular</li>
<li><strong>Adventitious sounds:</strong> Crackles (fluid/atelectasis), wheezes (bronchospasm), stridor (upper airway), pleural friction rub</li>
<li><strong>Oxygen saturation:</strong> SpO₂ 95-100% (88-92% for COPD patients)</li>
<li><strong>Red flags:</strong> SpO₂ < 90%, respiratory rate > 30 or < 8, stridor, tracheal deviation, absent breath sounds</li>
</ul>

<h3>Gastrointestinal Assessment</h3>
<ul>
<li><strong>Assessment order:</strong> Inspect, Auscultate, Percuss, Palpate (auscultate BEFORE palpation to avoid stimulating bowel sounds)</li>
<li><strong>Bowel sounds:</strong> Normal: 5-30/min in all four quadrants. Hyperactive: diarrhea, early obstruction. Hypoactive/absent: ileus, post-operative</li>
<li><strong>Abdomen:</strong> Soft, non-tender, non-distended. Rebound tenderness = peritoneal irritation (emergency)</li>
<li><strong>Red flags:</strong> Rigid/board-like abdomen, rebound tenderness, absent bowel sounds, hematemesis, melena</li>
</ul>

<h3>Genitourinary Assessment</h3>
<ul>
<li><strong>Urine output:</strong> Normal: ≥0.5 mL/kg/hr (≥30 mL/hr for most adults). Oliguria: < 400 mL/day. Anuria: < 100 mL/day</li>
<li><strong>Urine characteristics:</strong> Clear, pale yellow to amber. Dark/concentrated = dehydration. Cloudy/foul-smelling = infection. Pink/red = hematuria</li>
<li><strong>Red flags:</strong> Anuria, gross hematuria, suprapubic distension, flank pain with fever</li>
</ul>

<h3>Integumentary Assessment</h3>
<ul>
<li><strong>Skin:</strong> Color, temperature, moisture, turgor (test over sternum or forehead in elderly), integrity</li>
<li><strong>Wounds:</strong> Size, depth, drainage (serous, sanguineous, purulent), wound bed color, periwound skin</li>
<li><strong>Pressure injury staging:</strong> Stage 1 (non-blanchable erythema) through Stage 4 (full-thickness with exposed bone/tendon), Unstageable, DTPI</li>
<li><strong>Red flags:</strong> New pressure injury, signs of wound infection, crepitus (subcutaneous emphysema), cyanosis</li>
</ul>

<h3>Musculoskeletal Assessment</h3>
<ul>
<li><strong>ROM:</strong> Active and passive range of motion, crepitus, swelling</li>
<li><strong>Strength:</strong> 0/5 (no contraction) to 5/5 (full strength against resistance) bilaterally</li>
<li><strong>Neurovascular checks:</strong> 5 P's — Pain, Pallor, Pulselessness, Paresthesia, Paralysis (compartment syndrome)</li>
<li><strong>Red flags:</strong> Asymmetric weakness, compartment syndrome signs, new onset of unilateral swelling (DVT)</li>
</ul>`,
      },
      {
        id: "vital-signs",
        title: "Vital Signs Interpretation",
        icon: Thermometer,
        htmlContent: `<p>Vital signs are the most basic and most critical assessment data. Knowing normal ranges, understanding what deviations mean, and recognizing life-threatening vital sign patterns is essential for both exam success and clinical practice.</p>

<h3>Normal Adult Vital Signs</h3>
<ul>
<li><strong>Temperature:</strong> 36.5-37.5°C (97.7-99.5°F) oral. Tympanic and temporal are slightly higher than oral. Rectal is 0.5-1°F higher. Axillary is 0.5-1°F lower.</li>
<li><strong>Heart Rate:</strong> 60-100 bpm. Bradycardia < 60. Tachycardia > 100.</li>
<li><strong>Respiratory Rate:</strong> 12-20 breaths/min. Tachypnea > 20. Bradypnea < 12.</li>
<li><strong>Blood Pressure:</strong> <120/80 mmHg (normal). 120-129/<80 (elevated). 130-139/80-89 (Stage 1 HTN). ≥140/≥90 (Stage 2 HTN). ≥180/≥120 (hypertensive crisis).</li>
<li><strong>Oxygen Saturation:</strong> 95-100%. COPD target: 88-92%.</li>
<li><strong>Pain:</strong> Often considered the "5th vital sign." Use appropriate scale for patient population.</li>
</ul>

<h3>Vital Sign Patterns to Recognize</h3>
<ul>
<li><strong>Cushing's triad</strong> (increased ICP): Hypertension (widening pulse pressure) + Bradycardia + Irregular respirations → neurosurgical emergency</li>
<li><strong>Beck's triad</strong> (cardiac tamponade): Hypotension + JVD + Muffled heart sounds → pericardiocentesis needed</li>
<li><strong>Shock pattern:</strong> Hypotension + Tachycardia + Tachypnea + Altered mental status → immediate intervention</li>
<li><strong>Sepsis pattern:</strong> Temperature > 38.3°C or < 36°C + Heart rate > 90 + Respiratory rate > 20 + Altered mental status</li>
<li><strong>Neurogenic shock:</strong> Hypotension + Bradycardia (differs from other shock types which show tachycardia)</li>
</ul>

<h3>Orthostatic (Postural) Vital Signs</h3>
<p>Measure BP and HR supine, then standing (or sitting if unable to stand). Positive orthostatic hypotension: SBP drop ≥ 20 mmHg OR DBP drop ≥ 10 mmHg OR HR increase ≥ 20 bpm within 3 minutes. Indicates volume depletion or autonomic dysfunction. Nursing action: ensure safety (fall precautions), report to provider, hold antihypertensives as appropriate.</p>

<div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
<p class="text-sm text-amber-800"><strong>Exam Tip:</strong> When an exam question presents multiple patients with abnormal vital signs, use the ABCs (Airway, Breathing, Circulation) to prioritize. A patient with respiratory distress (SpO₂ 82%, RR 32) takes priority over a patient with fever (38.8°C) or mild tachycardia (HR 105).</p>
</div>`,
      },
      {
        id: "focused-assessments",
        title: "Focused Assessments for Common Conditions",
        icon: Target,
        htmlContent: `<p>Focused assessments are targeted evaluations performed when you know (or suspect) a specific condition. Exam questions often present a clinical scenario and ask "Which assessment is the priority?" Knowing the focused assessment for each condition is essential.</p>

<h3>Cardiac Assessment Focus</h3>
<ul>
<li><strong>Heart failure:</strong> Daily weight (same time, same scale, same clothing), I&O, lung sounds (crackles), JVD, pedal edema, activity tolerance</li>
<li><strong>MI:</strong> Pain assessment (PQRST), vital signs, ECG monitoring, troponin levels, O₂ saturation</li>
<li><strong>Anticoagulation:</strong> Signs of bleeding (bruising, gum bleeding, dark stools, hematuria), PTT/INR levels</li>
</ul>

<h3>Respiratory Assessment Focus</h3>
<ul>
<li><strong>Asthma:</strong> Peak flow measurement, work of breathing, breath sounds (wheezing, silent chest = severe), SpO₂, ability to speak in full sentences</li>
<li><strong>Pneumonia:</strong> Breath sounds (crackles, bronchial), sputum (amount, color, consistency), temperature, SpO₂, WBC count</li>
<li><strong>Post-chest tube:</strong> Drainage amount/color, tidaling in water seal, subcutaneous emphysema, breath sounds bilateral, tube site integrity</li>
</ul>

<h3>Neurological Assessment Focus</h3>
<ul>
<li><strong>Stroke:</strong> FAST (Face drooping, Arm weakness, Speech difficulty, Time) + NIH Stroke Scale, time of symptom onset</li>
<li><strong>Increased ICP:</strong> GCS trending, pupil reactivity and equality, Cushing's triad, positioning (HOB 30°)</li>
<li><strong>Post-craniotomy:</strong> Neuro checks every 1-2 hours, drainage (CSF vs blood), wound site, seizure precautions</li>
</ul>

<h3>Endocrine Assessment Focus</h3>
<ul>
<li><strong>DKA:</strong> Blood glucose (>300), ketones, ABG (metabolic acidosis), Kussmaul breathing, fruity breath, dehydration status</li>
<li><strong>Hypoglycemia:</strong> Blood glucose (<70), diaphoresis, tremors, confusion, tachycardia, level of consciousness</li>
<li><strong>Thyroid storm:</strong> Temperature (hyperthermia), HR (severe tachycardia), agitation, delirium, diaphoresis</li>
</ul>

<h3>Post-Operative Assessment Focus</h3>
<ul>
<li><strong>General post-op:</strong> ABCs first, then vital signs, pain, surgical site (drainage, bleeding), I&O, bowel sounds, mobility</li>
<li><strong>Post-thyroidectomy:</strong> Respiratory status (airway swelling), voice quality, Chvostek's/Trousseau's signs (hypocalcemia), neck drainage</li>
<li><strong>Post-hip replacement:</strong> Neurovascular checks, abduction pillow/positioning, DVT prevention, pain management, mobility progression</li>
</ul>`,
      },
      {
        id: "documentation",
        title: "Assessment Documentation Standards",
        icon: FileText,
        htmlContent: `<p>Documentation is a legal record of nursing care and a competency tested on both the NCLEX and REx-PN. Proper documentation of assessment findings protects patients, supports continuity of care, and provides legal defense. Exam questions may ask you to identify correct documentation practices or recognize documentation errors.</p>

<h3>Documentation Principles</h3>
<ul>
<li><strong>Objective:</strong> Document what you see, hear, measure, and observe — not your interpretation or judgment. Write "patient states 'I feel dizzy'" rather than "patient is dizzy"</li>
<li><strong>Timely:</strong> Document as close to the time of assessment as possible. Late entries should be clearly identified</li>
<li><strong>Specific:</strong> Use measurable terms. "Wound 3 cm x 2 cm with serous drainage" is better than "wound looks good"</li>
<li><strong>Complete:</strong> Include relevant negatives. "No JVD, no peripheral edema" is clinically important information</li>
<li><strong>Legible and accurate:</strong> Use approved abbreviations only. If you make an error, draw a single line through it, write "error," initial, and date — never use white-out or scribble over</li>
</ul>

<h3>Common Documentation Frameworks</h3>
<ul>
<li><strong>SBAR:</strong> Situation, Background, Assessment, Recommendation — used for provider communication</li>
<li><strong>DAR:</strong> Data, Action, Response — focused charting format</li>
<li><strong>SOAP:</strong> Subjective, Objective, Assessment, Plan — problem-oriented charting</li>
<li><strong>Head-to-Toe:</strong> Systematic documentation by body system</li>
</ul>

<div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
<p class="text-sm text-amber-800"><strong>Exam Tip:</strong> On documentation questions, choose the most objective, specific, and measurable option. Avoid answers that include nursing opinions, subjective interpretations, or vague terms like "good," "normal," or "improved" without measurable criteria.</p>
</div>`,
      },
      {
        id: "clinical-decision-making",
        title: "Clinical Decision-Making Frameworks",
        icon: Brain,
        htmlContent: `<p>Assessment is only valuable if it leads to appropriate clinical decisions. Nursing exams test your ability to connect assessment findings to nursing actions using established prioritization frameworks.</p>

<h3>ABCs (Airway, Breathing, Circulation)</h3>
<p>The most fundamental prioritization framework. Always address airway problems first, then breathing, then circulation. On the NCLEX, if one patient has an airway issue and another has a circulation issue, the airway patient is always the priority.</p>

<h3>Maslow's Hierarchy of Needs</h3>
<p>After addressing ABCs, prioritize physiological needs (oxygenation, nutrition, elimination, pain) before safety, then psychosocial, then self-esteem, then self-actualization. Exam trap: a patient's physical need almost always takes priority over a psychosocial need.</p>

<h3>Nursing Process</h3>
<p>Assessment → Diagnosis → Planning → Implementation → Evaluation. On exam questions, if you have not assessed the situation yet, assessment is almost always the correct answer. "Assess first, then intervene" — unless there is an immediate life threat.</p>

<h3>Acute vs Chronic</h3>
<p>New-onset (acute) findings generally take priority over chronic/stable findings. A patient with new-onset confusion is a higher priority than a patient with known chronic pain, even if the chronic pain patient is uncomfortable.</p>

<h3>Expected vs Unexpected</h3>
<p>Unexpected findings require action; expected findings require monitoring. If a post-surgical patient reports mild incisional pain (expected), that is lower priority than a patient reporting sudden chest tightness (unexpected). Know what is expected for each condition so you can recognize the unexpected.</p>

<h3>Stable vs Unstable</h3>
<p>Unstable patients always take priority. Stable patients can wait, can often be delegated, and are appropriate for nursing assistants to monitor. Unstable patients require RN assessment and intervention.</p>`,
      },
    ],
    faqs: [
      { question: "What is the correct order for abdominal assessment?", answer: "Inspect, Auscultate, Percuss, Palpate. Unlike other body systems, the abdomen is auscultated BEFORE palpation or percussion because touching the abdomen can stimulate or alter bowel sounds, giving inaccurate findings. This is a commonly tested concept on nursing exams." },
      { question: "How do I prioritize assessment findings on the NCLEX?", answer: "Use ABCs first (Airway > Breathing > Circulation), then Maslow's Hierarchy (physiological > safety > psychosocial). New/acute findings take priority over chronic/expected findings. Unexpected findings take priority over expected findings. When in doubt, assess before intervening — unless there is an immediate life threat." },
      { question: "What is the Glasgow Coma Scale?", answer: "The GCS measures level of consciousness using three components: Eye opening (1-4), Verbal response (1-5), and Motor response (1-6). Total score ranges from 3 (deep coma) to 15 (fully alert). A GCS of 8 or below indicates severe brain injury and usually requires intubation. GCS trending (changes over time) is more important than a single measurement." },
      { question: "What are Trousseau's and Chvostek's signs?", answer: "Trousseau's sign is carpal spasm (hand cramping) that occurs when a blood pressure cuff is inflated above systolic pressure for 3 minutes. Chvostek's sign is facial muscle twitching when the facial nerve is tapped just anterior to the ear. Both signs indicate hypocalcemia or hypomagnesemia. Always assess for these post-thyroidectomy." },
      { question: "How often should I perform assessments?", answer: "This depends on patient acuity and institutional policy. For stable patients: full assessment every shift with vital signs every 4-8 hours. For acute patients: focused assessment every 1-2 hours with continuous monitoring. Post-procedure: typically every 15 minutes x4, then every 30 minutes x2, then every hour x4, then routine." },
      { question: "What is SBAR and when do I use it?", answer: "SBAR is a structured communication framework: Situation (what is happening now), Background (relevant history), Assessment (what you think is going on), Recommendation (what you think should be done). Use SBAR when calling a provider about a patient concern. On the NCLEX, SBAR-formatted answers demonstrate professional communication skills." },
    ],
    internalLinks: [
      { label: "Clinical Skills Hub", url: "/clinical-skills", description: "Comprehensive clinical skills resources" },
      { label: "Case Simulations", url: "/case-simulations", description: "Interactive clinical case simulations" },
      { label: "Nursing Clinical Scenarios", url: "/nursing-clinical-scenarios", description: "Practice clinical judgment" },
      { label: "NCLEX Practice Questions", url: "/nclex-rn-practice-questions", description: "NCLEX-style exam questions" },
      { label: "REx-PN Practice Questions", url: "/rex-pn-practice-questions", description: "REx-PN exam questions" },
      { label: "Lab Values Reference", url: "/lab-values", description: "Complete lab values guide" },
      { label: "Study Lessons", url: "/lessons", description: "Pathophysiology lessons" },
      { label: "Mock Exams", url: "/mock-exams", description: "Full-length practice exams" },
    ],
    ctaTitle: "Practice Assessment Skills",
    ctaDescription: "Apply your assessment knowledge with clinical simulations and exam-style practice questions.",
    ctaPrimaryLabel: "Start Case Simulations",
    ctaPrimaryUrl: "/case-simulations",
    breadcrumbs: [
      { name: "Home", url: "https://www.nursenest.ca" },
      { name: "Study Guides", url: "https://www.nursenest.ca/exam-prep" },
      { name: "Clinical Assessment Guide", url: "https://www.nursenest.ca/nursing-clinical-assessment-guide" },
    ],
  },
};

function SectionHeading({ id, title, icon: Icon, color }: { id: string; title: string; icon: typeof BookOpen; color: string }) {
  return (
    <h2 id={id} className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3 scroll-mt-24" data-testid={`heading-${id}`}>
      <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}15` }}>
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      {title}
    </h2>
  );
}

function GuideTOC({ sections, color }: { sections: ContentSection[]; color: string }) {
  return (
    <nav className="bg-white rounded-xl border border-gray-200 p-5 sticky top-24" data-testid="nav-guide-toc">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <BookOpen className="w-4 h-4" style={{ color }} /> Table of Contents
      </h3>
      <ul className="space-y-1.5">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors block py-0.5 border-l-2 border-transparent hover:border-gray-400 pl-3"
              data-testid={`toc-link-${s.id}`}
            >
              {s.title}
            </a>
          </li>
        ))}
        <li>
          <a href="#faq" className="text-sm text-gray-600 hover:text-gray-900 transition-colors block py-0.5 border-l-2 border-transparent hover:border-gray-400 pl-3" data-testid="toc-link-faq">
            FAQ
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default function AuthorityGuidePage({ slug }: { slug: string }) {
  const page = AUTHORITY_GUIDES[slug];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!page) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4" data-testid="text-guide-not-found">Guide Not Found</h1>
          <p className="text-gray-600 mb-6">The study guide you are looking for does not exist.</p>
          <LocaleLink href="/exam-prep">
            <Button data-testid="button-back-to-guides">Browse Study Guides</Button>
          </LocaleLink>
        </div>
        <Footer />
      </div>
    );
  }

  const faqStructuredData = buildFaqStructuredData(page.faqs);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": page.metaTitle,
    "description": page.metaDescription,
    "author": {
      "@type": "Organization",
      "name": "NurseNest",
      "url": "https://www.nursenest.ca",
    },
    "publisher": {
      "@type": "Organization",
      "name": "NurseNest",
      "url": "https://www.nursenest.ca",
    },
    "datePublished": "2025-06-01",
    "dateModified": new Date().toISOString().split("T")[0],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.nursenest.ca/${page.slug}`,
    },
    "wordCount": 3000,
    "articleSection": "Nursing Education",
  };

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": page.title,
    "description": page.metaDescription,
    "provider": {
      "@type": "Organization",
      "name": "NurseNest",
      "url": "https://www.nursenest.ca",
      "sameAs": PARENT_EDUCATIONAL_ORG.sameAs,
    },
    "educationalLevel": "Professional",
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student",
      "audienceType": "Nursing Students",
    },
    "inLanguage": "en",
    "isAccessibleForFree": true,
  };

  return (
    <div className="min-h-screen bg-gray-50" data-testid={`page-authority-guide-${page.slug}`}>
      <Navigation />
      <SEO
        title={page.metaTitle}
        description={page.metaDescription}
        keywords={page.keywords}
        canonicalPath={`/${page.slug}`}
        structuredData={articleSchema}
        additionalStructuredData={[faqStructuredData, courseSchema]}
        breadcrumbs={page.breadcrumbs}
      />

      <section className="relative py-14 sm:py-18 overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${page.colorAccent}60, white, ${page.colorAccent}30)` }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbNav items={page.breadcrumbs} />
          <div className="mt-6 max-w-3xl">
            <Badge className="mb-4 text-white" style={{ backgroundColor: page.color }} data-testid="badge-guide-type">
              <BookOpen className="w-3 h-3 mr-1" /> {page.badgeLabel}
            </Badge>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight" data-testid="text-guide-title">
              {page.heroHeading}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed" data-testid="text-guide-description">
              {page.heroDescription}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <LocaleLink href={page.ctaPrimaryUrl}>
                <Button className="text-white" style={{ backgroundColor: page.color }} data-testid="button-hero-guide-cta">
                  {page.ctaPrimaryLabel} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </LocaleLink>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block lg:w-64 shrink-0">
            <GuideTOC sections={page.sections} color={page.color} />
          </div>

          <div className="flex-1 min-w-0">
            {page.sections.map((section, idx) => (
              <section key={section.id} id={section.id} className="mb-12 scroll-mt-24" data-testid={`section-${section.id}`}>
                <SectionHeading id={`heading-${section.id}`} title={section.title} icon={section.icon} color={page.color} />
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div
                    className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h3:text-base prose-h3:mt-6 prose-h3:mb-3 prose-h4:text-sm prose-h4:mt-4 prose-h4:mb-2 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-li:leading-relaxed prose-ul:my-3 prose-ol:my-3 prose-strong:text-gray-900 [&_.exam-trap]:bg-amber-50 [&_.exam-trap]:border [&_.exam-trap]:border-amber-200 [&_.exam-trap]:rounded-lg [&_.exam-trap]:p-4 [&_.exam-trap]:my-4"
                    dangerouslySetInnerHTML={{ __html: section.htmlContent }}
                  />
                </div>

                {idx === 2 && (
                  <div className="my-8 rounded-xl p-6 text-center" style={{ backgroundColor: `${page.color}10`, borderLeft: `4px solid ${page.color}` }} data-testid="cta-mid-practice">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Test Your Knowledge</h3>
                    <p className="text-sm text-gray-600 mb-4">Practice with exam-style questions and detailed clinical rationales.</p>
                    <LocaleLink href="/practice-questions">
                      <Button className="text-white" style={{ backgroundColor: page.color }} data-testid="button-cta-mid-practice">
                        Start Practice Questions <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </LocaleLink>
                  </div>
                )}

                {idx === 4 && (
                  <div className="my-8 rounded-xl p-6 text-center" style={{ backgroundColor: `${page.color}10`, borderLeft: `4px solid ${page.color}` }} data-testid="cta-mid-flashcards">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Review with Flashcards</h3>
                    <p className="text-sm text-gray-600 mb-4">Reinforce key concepts with spaced-repetition flashcards.</p>
                    <LocaleLink href="/flashcards">
                      <Button className="text-white" style={{ backgroundColor: page.color }} data-testid="button-cta-mid-flashcards">
                        Explore Flashcards <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </LocaleLink>
                  </div>
                )}
              </section>
            ))}

            <section id="internal-links" className="mb-12 scroll-mt-24" data-testid="section-guide-links">
              <SectionHeading id="heading-guide-links" title="Related Resources" icon={Layers} color={page.color} />
              <div className="grid sm:grid-cols-2 gap-3">
                {page.internalLinks.map((link, i) => (
                  <LocaleLink key={i} href={link.url}>
                    <Card className="h-full hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group" data-testid={`link-guide-resource-${i}`}>
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${page.color}15` }}>
                          <BookOpen className="w-4 h-4" style={{ color: page.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 group-hover:text-blue-700 transition-colors">{link.label}</p>
                          <p className="text-xs text-gray-500 line-clamp-1">{link.description}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 shrink-0" />
                      </CardContent>
                    </Card>
                  </LocaleLink>
                ))}
              </div>
            </section>

            <section id="faq" className="mb-12 scroll-mt-24" data-testid="section-faq">
              <SectionHeading id="heading-faq" title="Frequently Asked Questions" icon={HelpCircle} color={page.color} />
              <div className="space-y-3">
                {page.faqs.map((faq, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden" data-testid={`faq-item-${i}`}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                      data-testid={`button-faq-${i}`}
                    >
                      <span className="text-sm font-semibold text-gray-900 pr-4">{faq.question}</span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                    </button>
                    {openFaq === i && (
                      <div className="px-4 pb-4 border-t border-gray-100">
                        <p className="text-sm text-gray-600 leading-relaxed mt-3">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 text-center mb-12" data-testid="section-bottom-cta">
              <h3 className="text-xl font-bold text-white mb-2">{page.ctaTitle}</h3>
              <p className="text-gray-300 mb-6 text-sm">{page.ctaDescription}</p>
              <LocaleLink href={page.ctaPrimaryUrl}>
                <Button className="text-white" style={{ backgroundColor: page.color }} data-testid="button-bottom-guide-cta">
                  {page.ctaPrimaryLabel} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </LocaleLink>
            </div>

            <EndOfContentLeadCapture leadMagnetType="study_guide" source="authority_guide" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export function AuthorityGuideBySlug({ slug }: { slug: string }) {
  return <AuthorityGuidePage slug={slug} />;
}
