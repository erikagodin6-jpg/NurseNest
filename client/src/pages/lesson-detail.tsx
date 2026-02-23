import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { Link, useParams, useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { AdminEditButton } from "@/components/admin-edit-button";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  ArrowLeft, Microscope, AlertCircle, Stethoscope, Pill, Lightbulb, FileText,
  CheckCircle2, XCircle, Trophy, Activity, Heart, Droplets, Brain, Wind, Zap, Baby, Users, Eye, Beaker, Leaf, ShieldAlert,
  ClipboardList, HeartPulse, HandHelping, Search, Lock, StickyNote, Save, Crown, TrendingUp, BarChart3, BookOpen, Pencil, X, Plus, Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getDifficulty, difficultyConfig } from "@/lib/difficulty";
import { contentMap } from "@/data/lessons";
import { useAuth } from "@/lib/auth";
import { canAccessTier } from "@/lib/access";
import type { LessonContent, QuizQuestion } from "@/data/lessons/types";
import { generateLessonSeoDescription, generateLessonKeywords, buildLessonStructuredData, buildBreadcrumbStructuredData, getLessonBodySystem } from "@/lib/seo-utils";
import { trackMilestone } from "@/components/upgrade-prompt";
import { getLessonImage } from "@/lib/system-images";
import { ProtectedImage } from "@/components/protected-image";
import { getImageAltText, getImageTitle, getImageStructuredData } from "@/lib/image-seo";
import { LessonImageManager } from "@/components/lesson-image-manager";

function EditableText({ value, onChange, multiline = false, className = "" }: { value: string; onChange: (v: string) => void; multiline?: boolean; className?: string }) {
  if (multiline) {
    return <Textarea value={value} onChange={(e) => onChange(e.target.value)} className={`min-h-[120px] ${className}`} />;
  }
  return <Input value={value} onChange={(e) => onChange(e.target.value)} className={className} />;
}

function EditableList({ items, onChange, placeholder = "Enter item..." }: { items: string[]; onChange: (items: string[]) => void; placeholder?: string }) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <Input
            value={item}
            onChange={(e) => {
              const updated = [...items];
              updated[i] = e.target.value;
              onChange(updated);
            }}
            placeholder={placeholder}
            className="flex-1"
          />
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0 text-red-400 hover:text-red-600" onClick={() => onChange(items.filter((_, idx) => idx !== i))}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" className="gap-1" onClick={() => onChange([...items, ""])}>
        <Plus className="w-3 h-3" /> Add Item
      </Button>
    </div>
  );
}

function VitalSignsReferenceCharts() {
  const vitalSignsData = [
    { ageGroup: "Newborn (0–28 days)", hr: "120–160", rr: "30–60", sbp: "60–80", dbp: "35–55", temp: "36.5–37.5°C", spo2: "≥95%" },
    { ageGroup: "Infant (1–12 months)", hr: "100–150", rr: "25–50", sbp: "70–100", dbp: "40–65", temp: "36.5–37.5°C", spo2: "≥95%" },
    { ageGroup: "Toddler (1–3 years)", hr: "90–140", rr: "20–30", sbp: "80–110", dbp: "50–75", temp: "36.5–37.5°C", spo2: "≥95%" },
    { ageGroup: "Preschool (3–5 years)", hr: "80–120", rr: "20–28", sbp: "85–110", dbp: "50–75", temp: "36.5–37.5°C", spo2: "≥95%" },
    { ageGroup: "School Age (6–12 years)", hr: "70–110", rr: "18–25", sbp: "90–120", dbp: "55–80", temp: "36.5–37.5°C", spo2: "≥95%" },
    { ageGroup: "Adolescent (13–17 years)", hr: "60–100", rr: "12–20", sbp: "100–130", dbp: "60–85", temp: "36.5–37.5°C", spo2: "≥95%" },
    { ageGroup: "Adult (18–64 years)", hr: "60–100", rr: "12–20", sbp: "90–140", dbp: "60–90", temp: "36.1–37.2°C", spo2: "≥95%" },
    { ageGroup: "Older Adult (65+ years)", hr: "60–100", rr: "12–20", sbp: "90–150", dbp: "60–90", temp: "35.8–36.9°C", spo2: "≥93%" },
  ];

  const redFlagsByAge = [
    {
      group: "Newborn & Infant",
      flags: [
        "HR < 100 or > 180 bpm — consider sepsis, dehydration, or cardiac anomaly",
        "RR > 60 — assess for respiratory distress syndrome, TTN, or congenital anomaly",
        "Temperature < 36.0°C or > 38.0°C — infection risk highest in neonates",
        "Capillary refill > 3 seconds — perfusion concern",
        "SBP < 60 mmHg (newborn) or < 70 mmHg (infant) — shock"
      ]
    },
    {
      group: "Toddler & Preschool",
      flags: [
        "HR > 150 — rule out fever, pain, dehydration, or cardiac cause",
        "RR > 40 — respiratory distress; assess for retractions, nasal flaring, grunting",
        "SBP < 70 + (2 × age in years) — hypotension formula for ages 1–10",
        "Temperature > 39°C — assess for febrile seizure risk (6 months–5 years)",
        "SpO2 < 94% — supplemental O2 and escalation"
      ]
    },
    {
      group: "School Age & Adolescent",
      flags: [
        "HR < 50 or > 130 — evaluate for cardiac arrhythmia, substance use, or anxiety vs. true pathology",
        "RR > 28 — consider asthma exacerbation, DKA, or panic attack",
        "SBP > 130 or < 80 — assess for hypertensive emergency or hemorrhage",
        "New-onset orthostatic hypotension — dehydration, eating disorder, or cardiac",
        "Temperature > 40°C — aggressive cooling and investigation"
      ]
    },
    {
      group: "Adult",
      flags: [
        "HR < 40 or > 130 — immediate RRT activation",
        "RR < 8 or > 28 — most predictive sign of deterioration",
        "SBP < 90 or > 180 mmHg — hemodynamic emergency",
        "SpO2 < 90% (< 88% in COPD) — supplemental O2 and escalation",
        "Temperature > 38.5°C with tachycardia — sepsis screening (qSOFA)"
      ]
    },
    {
      group: "Older Adult (65+)",
      flags: [
        "Baseline may be lower — 'normal' BP of 150/80 may be their norm; acute drop is the red flag",
        "Blunted febrile response — infection without fever is common; assess WBC and mental status",
        "New confusion or agitation — may be the ONLY sign of UTI, pneumonia, or MI",
        "Orthostatic hypotension — fall risk; hold antihypertensives and reassess",
        "SpO2 < 93% — lower threshold for escalation due to reduced reserve"
      ]
    }
  ];

  return (
    <section id="vital-signs-charts" className="space-y-6" data-testid="vital-signs-reference-charts">
      <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
        <HeartPulse className="text-red-500 w-8 h-8" />
        <h2>Normal Vital Signs Reference Charts</h2>
      </div>
      <p className="text-sm text-gray-500 mt-1">Age-specific normal ranges for clinical assessment — from newborn through older adult</p>

      <Card className="border-none shadow-md bg-white overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-testid="table-vital-signs-ranges">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                  <th className="text-left px-4 py-3 font-bold text-gray-800 whitespace-nowrap">Age Group</th>
                  <th className="text-center px-3 py-3 font-bold text-gray-800">
                    <div className="flex flex-col items-center gap-0.5">
                      <Heart className="w-4 h-4 text-red-400" />
                      <span>HR (bpm)</span>
                    </div>
                  </th>
                  <th className="text-center px-3 py-3 font-bold text-gray-800">
                    <div className="flex flex-col items-center gap-0.5">
                      <Wind className="w-4 h-4 text-blue-400" />
                      <span>RR (/min)</span>
                    </div>
                  </th>
                  <th className="text-center px-3 py-3 font-bold text-gray-800">
                    <div className="flex flex-col items-center gap-0.5">
                      <Activity className="w-4 h-4 text-purple-400" />
                      <span>SBP (mmHg)</span>
                    </div>
                  </th>
                  <th className="text-center px-3 py-3 font-bold text-gray-800">
                    <div className="flex flex-col items-center gap-0.5">
                      <Activity className="w-4 h-4 text-indigo-400" />
                      <span>DBP (mmHg)</span>
                    </div>
                  </th>
                  <th className="text-center px-3 py-3 font-bold text-gray-800">
                    <div className="flex flex-col items-center gap-0.5">
                      <Zap className="w-4 h-4 text-orange-400" />
                      <span>Temp (°C)</span>
                    </div>
                  </th>
                  <th className="text-center px-3 py-3 font-bold text-gray-800">
                    <div className="flex flex-col items-center gap-0.5">
                      <Droplets className="w-4 h-4 text-cyan-400" />
                      <span>SpO2</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {vitalSignsData.map((row, i) => (
                  <tr key={row.ageGroup} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"} hover:bg-blue-50/50 transition-colors`}>
                    <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">{row.ageGroup}</td>
                    <td className="text-center px-3 py-3 text-gray-700 font-medium">{row.hr}</td>
                    <td className="text-center px-3 py-3 text-gray-700 font-medium">{row.rr}</td>
                    <td className="text-center px-3 py-3 text-gray-700 font-medium">{row.sbp}</td>
                    <td className="text-center px-3 py-3 text-gray-700 font-medium">{row.dbp}</td>
                    <td className="text-center px-3 py-3 text-gray-700 font-medium">{row.temp}</td>
                    <td className="text-center px-3 py-3 text-gray-700 font-medium">{row.spo2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 bg-amber-50 border-t border-amber-100">
            <p className="text-xs text-amber-700 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              Values are general ranges. Always compare to the individual patient's baseline. Ranges may vary slightly by source.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3 text-xl font-bold text-gray-900 mt-8">
        <ShieldAlert className="text-orange-500 w-7 h-7" />
        <h3>Age-Specific Red Flags & Escalation Triggers</h3>
      </div>
      <p className="text-sm text-gray-500 mt-1">When to escalate — critical thresholds by age group</p>

      <div className="grid md:grid-cols-2 gap-4">
        {redFlagsByAge.map((section) => (
          <Card key={section.group} className="border-none shadow-md bg-white" data-testid={`card-red-flags-${section.group.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                {section.group.includes("Newborn") && <Baby className="w-5 h-5 text-pink-500" />}
                {section.group.includes("Toddler") && <Baby className="w-5 h-5 text-purple-500" />}
                {section.group.includes("School") && <Users className="w-5 h-5 text-blue-500" />}
                {section.group === "Adult" && <HeartPulse className="w-5 h-5 text-red-500" />}
                {section.group.includes("Older") && <Users className="w-5 h-5 text-amber-600" />}
                <h4 className="font-bold text-gray-800">{section.group}</h4>
              </div>
              <ul className="space-y-2">
                {section.flags.map((flag, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <AlertCircle className="w-3.5 h-3.5 text-orange-400 mt-0.5 flex-shrink-0" />
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function IsolationTypesGuide() {
  const isolationTypes = [
    {
      type: "Standard Precautions",
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
      headerBg: "bg-green-100",
      applies: "ALL patients, ALL encounters, regardless of diagnosis",
      when: "Every patient interaction — the baseline for all care",
      ppe: ["Gloves (when touching blood/body fluids/mucous membranes)", "Gown (if splashing anticipated)", "Mask + eye protection (if splash/spray risk)", "Hand hygiene before and after every contact"],
      room: "No special room required",
      examples: ["Every patient in every setting", "Routine vital signs with intact skin — gloves optional, hand hygiene mandatory", "Blood draw, wound care, suctioning — gloves required"],
      keyPoints: ["Foundation of ALL infection prevention", "Treats every patient as potentially infectious", "Hand hygiene is the single most important measure"]
    },
    {
      type: "Contact Precautions",
      color: "bg-yellow-50 border-yellow-200",
      iconColor: "text-yellow-600",
      headerBg: "bg-yellow-100",
      applies: "Organisms spread by direct or indirect physical contact",
      when: "Known or suspected infection with contact-transmitted organisms",
      ppe: ["Gown — don before entering the room", "Gloves — don before entering the room", "Remove PPE before leaving the room", "Hand hygiene immediately after removal"],
      room: "Private room preferred; cohort patients with same organism if unavailable",
      examples: ["MRSA (Methicillin-Resistant Staphylococcus aureus)", "VRE (Vancomycin-Resistant Enterococcus)", "C. difficile (Clostridioides difficile) — use SOAP & WATER, not alcohol rub", "Scabies, lice (pediculosis)", "Draining wounds with heavy drainage not contained by dressing", "RSV (Respiratory Syncytial Virus) in infants", "Norovirus, Rotavirus"],
      keyPoints: ["Dedicated equipment (stethoscope, BP cuff) stays in the room", "C. difficile spores resist alcohol — ONLY soap and water works", "Patient transport: cover infected area, clean surfaces after contact"]
    },
    {
      type: "Droplet Precautions",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
      headerBg: "bg-blue-100",
      applies: "Organisms spread by large respiratory droplets (>5 microns) that travel 3–6 feet",
      when: "Known or suspected infection with droplet-transmitted organisms",
      ppe: ["Surgical mask — don before entering the room", "Eye protection if splash risk", "Gloves and gown per standard precautions as needed"],
      room: "Private room preferred; maintain ≥3 feet between patients if cohorting; door may remain open",
      examples: ["Influenza (seasonal flu)", "Pertussis (whooping cough)", "Bacterial meningitis (Neisseria meningitidis)", "Mumps", "Rubella (German measles)", "Group A Streptococcus (pharyngitis, scarlet fever)", "Respiratory infections caused by adenovirus, rhinovirus"],
      keyPoints: ["Surgical mask is sufficient — N95 is NOT required", "Patient wears surgical mask during transport", "Droplets fall to surfaces quickly — do not remain airborne", "Negative pressure room is NOT needed"]
    },
    {
      type: "Airborne Precautions",
      color: "bg-red-50 border-red-200",
      iconColor: "text-red-600",
      headerBg: "bg-red-100",
      applies: "Organisms spread by tiny airborne nuclei (<5 microns) that remain suspended in air and travel long distances",
      when: "Known or suspected infection with airborne-transmitted organisms",
      ppe: ["N95 respirator (must be fit-tested annually) — don BEFORE entering room", "PAPR (Powered Air-Purifying Respirator) as alternative to N95", "Gloves and gown per standard precautions"],
      room: "Airborne Infection Isolation Room (AIIR) — negative pressure, ≥6–12 air exchanges/hour, air exhausted outside or HEPA-filtered, DOOR MUST REMAIN CLOSED",
      examples: ["Tuberculosis (pulmonary or laryngeal TB)", "Measles (Rubeola)", "Varicella (Chickenpox)", "Disseminated Herpes Zoster (Shingles) in immunocompromised patients", "COVID-19 (during aerosol-generating procedures)", "Smallpox"],
      keyPoints: ["N95 required — surgical mask is NOT sufficient", "Room must be negative pressure with door CLOSED at all times", "Patient wears surgical mask during transport (NOT N95)", "Immune healthcare workers preferred for varicella/measles patients", "Verify negative pressure daily (smoke test or monitor)"]
    },
    {
      type: "Protective (Reverse) Isolation",
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600",
      headerBg: "bg-purple-100",
      applies: "Severely immunocompromised patients at high risk for opportunistic infections",
      when: "ANC (Absolute Neutrophil Count) < 500/mm³ or as ordered for high-risk patients",
      ppe: ["Mask, gown, gloves for anyone entering the room", "Strict hand hygiene enforcement for all visitors", "Visitors screened for signs of illness before entering"],
      room: "Private room with positive pressure (air flows OUT of the room); HEPA-filtered air; door closed",
      examples: ["Neutropenic patients (post-chemotherapy, ANC < 500)", "Bone marrow / stem cell transplant recipients", "Severe combined immunodeficiency (SCID)", "Organ transplant patients on heavy immunosuppression"],
      keyPoints: ["Protects the PATIENT from environmental organisms (opposite of other isolation types)", "No fresh flowers, fruits, or raw vegetables (harbor bacteria/fungi)", "Low-microbial diet (neutropenic diet) may be ordered", "Monitor for subtle infection signs — fever may be the ONLY indicator", "Positive pressure keeps contaminated air OUT of the room"]
    }
  ];

  return (
    <section id="isolation-types" className="space-y-6" data-testid="isolation-types-guide">
      <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
        <ShieldAlert className="text-blue-600 w-8 h-8" />
        <h2>Types of Isolation Precautions</h2>
      </div>
      <p className="text-sm text-gray-500 mt-1">When, why, and how to implement each type of isolation — from Standard to Protective</p>

      <div className="space-y-6">
        {isolationTypes.map((iso) => (
          <Card key={iso.type} className={`border shadow-md overflow-hidden ${iso.color}`} data-testid={`card-isolation-${iso.type.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
            <div className={`${iso.headerBg} px-6 py-4 border-b ${iso.color.split(" ")[1]}`}>
              <div className="flex items-center gap-3">
                <ShieldAlert className={`w-6 h-6 ${iso.iconColor}`} />
                <h3 className="text-xl font-bold text-gray-900">{iso.type}</h3>
              </div>
              <p className="text-sm text-gray-700 mt-1 font-medium">{iso.applies}</p>
            </div>
            <CardContent className="p-6 space-y-5">
              <div>
                <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  When to Use
                </h4>
                <p className="text-gray-700 text-sm">{iso.when}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-2">
                    <ShieldAlert className="w-4 h-4 text-blue-500" />
                    Required PPE
                  </h4>
                  <ul className="space-y-1.5">
                    {iso.ppe.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-2">
                    <Stethoscope className="w-4 h-4 text-indigo-500" />
                    Common Conditions
                  </h4>
                  <ul className="space-y-1.5">
                    {iso.examples.map((ex, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-purple-500" />
                  Room Requirements
                </h4>
                <p className="text-gray-700 text-sm bg-white/60 rounded-lg px-4 py-2 border border-gray-100">{iso.room}</p>
              </div>

              <div className="bg-white/70 rounded-lg p-4 border border-gray-100">
                <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  Key Points to Remember
                </h4>
                <ul className="space-y-1.5">
                  {iso.keyPoints.map((kp, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <Zap className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span>{kp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-md bg-white overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-testid="table-isolation-comparison">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                  <th className="text-left px-4 py-3 font-bold text-gray-800">Feature</th>
                  <th className="text-center px-3 py-3 font-bold text-yellow-700 bg-yellow-50/50">Contact</th>
                  <th className="text-center px-3 py-3 font-bold text-blue-700 bg-blue-50/50">Droplet</th>
                  <th className="text-center px-3 py-3 font-bold text-red-700 bg-red-50/50">Airborne</th>
                  <th className="text-center px-3 py-3 font-bold text-purple-700 bg-purple-50/50">Protective</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 font-semibold text-gray-800">Mask Type</td>
                  <td className="text-center px-3 py-3 text-gray-700">Not required*</td>
                  <td className="text-center px-3 py-3 text-gray-700">Surgical mask</td>
                  <td className="text-center px-3 py-3 text-gray-700 font-medium">N95 respirator</td>
                  <td className="text-center px-3 py-3 text-gray-700">Surgical mask</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <td className="px-4 py-3 font-semibold text-gray-800">Gown</td>
                  <td className="text-center px-3 py-3 text-green-600 font-medium">Yes</td>
                  <td className="text-center px-3 py-3 text-gray-700">Per standard</td>
                  <td className="text-center px-3 py-3 text-gray-700">Per standard</td>
                  <td className="text-center px-3 py-3 text-green-600 font-medium">Yes</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 font-semibold text-gray-800">Gloves</td>
                  <td className="text-center px-3 py-3 text-green-600 font-medium">Yes</td>
                  <td className="text-center px-3 py-3 text-gray-700">Per standard</td>
                  <td className="text-center px-3 py-3 text-gray-700">Per standard</td>
                  <td className="text-center px-3 py-3 text-green-600 font-medium">Yes</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <td className="px-4 py-3 font-semibold text-gray-800">Room Pressure</td>
                  <td className="text-center px-3 py-3 text-gray-700">Normal</td>
                  <td className="text-center px-3 py-3 text-gray-700">Normal</td>
                  <td className="text-center px-3 py-3 text-red-600 font-medium">Negative</td>
                  <td className="text-center px-3 py-3 text-purple-600 font-medium">Positive</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 font-semibold text-gray-800">Door</td>
                  <td className="text-center px-3 py-3 text-gray-700">May be open</td>
                  <td className="text-center px-3 py-3 text-gray-700">May be open</td>
                  <td className="text-center px-3 py-3 text-red-600 font-medium">CLOSED</td>
                  <td className="text-center px-3 py-3 text-purple-600 font-medium">CLOSED</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <td className="px-4 py-3 font-semibold text-gray-800">Dedicated Equipment</td>
                  <td className="text-center px-3 py-3 text-green-600 font-medium">Yes</td>
                  <td className="text-center px-3 py-3 text-gray-700">Preferred</td>
                  <td className="text-center px-3 py-3 text-gray-700">Preferred</td>
                  <td className="text-center px-3 py-3 text-green-600 font-medium">Yes</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-800">Purpose</td>
                  <td className="text-center px-3 py-3 text-gray-700 text-xs">Protect others from patient</td>
                  <td className="text-center px-3 py-3 text-gray-700 text-xs">Protect others from patient</td>
                  <td className="text-center px-3 py-3 text-gray-700 text-xs">Protect others from patient</td>
                  <td className="text-center px-3 py-3 text-purple-700 text-xs font-medium">Protect patient from others</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 bg-amber-50 border-t border-amber-100">
            <p className="text-xs text-amber-700 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              *Contact precautions: mask not routinely required unless splash risk. Always apply Standard Precautions in addition to Transmission-Based Precautions.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function getLessonTier(lessonId: string): string {
  if (lessonId.startsWith("np-") || lessonId.includes("-np") || lessonId.includes("advanced-")) return "np";
  if (lessonId.startsWith("rn-") || lessonId.includes("-rn") || lessonId.includes("nclex-")) return "rn";
  return "rpn";
}

const tierPricing: Record<string, { name: string; priceCAD: string; priceUSD: string }> = {
  rpn: { name: "RPN/LVN", priceCAD: "$29.99 CAD/mo", priceUSD: "$21.99 USD/mo" },
  rn: { name: "RN", priceCAD: "$39.99 CAD/mo", priceUSD: "$29.99 USD/mo" },
  np: { name: "NP Advanced", priceCAD: "$49.99 CAD/mo", priceUSD: "$36.99 USD/mo" },
};

function getTestQuestions(lesson: LessonContent, testType: "pretest" | "posttest"): QuizQuestion[] {
  if (testType === "pretest" && lesson.preTest && lesson.preTest.length >= 25) {
    return lesson.preTest;
  }
  if (testType === "posttest" && lesson.postTest && lesson.postTest.length >= 25) {
    return lesson.postTest;
  }
  const source = testType === "pretest" ? (lesson.preTest || lesson.quiz) : (lesson.postTest || lesson.quiz);
  return source;
}

type AnswerRecord = { questionIndex: number; selected: number; correct: number; isCorrect: boolean };

function ScoreRing({ percentage, size = 120 }: { percentage: number; size?: number }) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const color = percentage >= 75 ? "#10b981" : percentage >= 50 ? "#f59e0b" : "#ef4444";
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e5e7eb" strokeWidth="8" fill="none" />
        <circle cx={size / 2} cy={size / 2} r={radius} stroke={color} strokeWidth="8" fill="none" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-1000" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold" style={{ color }}>{percentage}%</span>
        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Score</span>
      </div>
    </div>
  );
}

function QuizReport({
  questions,
  answers,
  score,
  testType,
  lessonId,
  preTestScore,
  onRetake,
}: {
  questions: QuizQuestion[];
  answers: AnswerRecord[];
  score: number;
  testType: "pretest" | "posttest";
  lessonId: string;
  preTestScore: { percentage: number; score: number; total: number } | null;
  onRetake: () => void;
}) {
  const [showReview, setShowReview] = useState(false);
  const derivedScore = answers.filter((a) => a.isCorrect).length;
  const percentage = Math.round((derivedScore / questions.length) * 100);
  const passed = percentage >= 75;
  const missed = answers.filter((a) => !a.isCorrect);

  return (
    <div className="space-y-8" data-testid={`section-${testType}-report`}>
      <div className="text-center space-y-4">
        <ScoreRing percentage={percentage} size={140} />
        <h2 className="text-2xl sm:text-3xl font-bold" data-testid={`text-${testType}-result`}>
          {testType === "pretest" ? "Pre-Test Complete" : "Post-Test Complete"}
        </h2>
        <p className="text-lg text-gray-600" data-testid={`text-${testType}-score`}>
          {derivedScore} of {questions.length} correct
        </p>
        {passed ? (
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" /> Passed (75% threshold)
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 text-sm font-bold border border-amber-200">
            <AlertCircle className="w-4 h-4" /> Below 75% - Review recommended
          </span>
        )}
      </div>

      {testType === "posttest" && preTestScore && (
        <Card className="border-none shadow-lg bg-gradient-to-r from-blue-50 to-emerald-50" data-testid="section-score-comparison">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2 justify-center text-lg">
              <TrendingUp className="w-5 h-5 text-emerald-600" /> Learning Progress
            </h3>
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Pre-Test</p>
                <p className="text-3xl font-bold text-blue-600">{preTestScore.percentage}%</p>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-gray-300 text-2xl">→</span>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Post-Test</p>
                <p className="text-3xl font-bold text-emerald-600">{percentage}%</p>
              </div>
            </div>
            {percentage - preTestScore.percentage > 0 ? (
              <p className="text-center text-emerald-600 font-bold text-lg" data-testid="text-improvement">
                +{percentage - preTestScore.percentage}% improvement
              </p>
            ) : percentage === preTestScore.percentage ? (
              <p className="text-center text-gray-600 font-medium">Same score - consider reviewing the lesson material again</p>
            ) : (
              <p className="text-center text-orange-600 font-medium">Keep studying - revisit the areas you missed below</p>
            )}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-3 gap-4">
        <Card className="border-none shadow-sm bg-emerald-50">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-emerald-600">{answers.filter((a) => a.isCorrect).length}</p>
            <p className="text-xs text-emerald-600 font-medium mt-1">Correct</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-red-50">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-500">{missed.length}</p>
            <p className="text-xs text-red-500 font-medium mt-1">Missed</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-blue-50">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{questions.length}</p>
            <p className="text-xs text-blue-600 font-medium mt-1">Total</p>
          </CardContent>
        </Card>
      </div>

      {missed.length > 0 && (
        <Card className="border-none shadow-sm bg-amber-50/60">
          <CardContent className="p-6 space-y-3">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" /> Areas to Review
            </h3>
            <p className="text-sm text-gray-600">
              You missed {missed.length} question{missed.length > 1 ? "s" : ""}. Focus on understanding the rationale for each missed question below.
            </p>
            {testType === "pretest" && (
              <p className="text-sm text-primary font-medium">
                Proceed to the Clinical Content tab to study these topics before taking the Post-Test.
              </p>
            )}
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        <Button
          variant="outline"
          onClick={() => setShowReview(!showReview)}
          className="w-full gap-2 h-12"
          data-testid={`button-toggle-${testType}-review`}
        >
          <FileText className="w-4 h-4" />
          {showReview ? "Hide Question Review" : `Review All ${questions.length} Questions`}
        </Button>

        {showReview && (
          <div className="space-y-4 mt-4" data-testid={`section-${testType}-question-review`}>
            {questions.map((q, idx) => {
              const answer = answers.find((a) => a.questionIndex === idx);
              const wasCorrect = answer?.isCorrect ?? false;
              return (
                <Card key={idx} className={`border shadow-sm ${wasCorrect ? "border-l-4 border-l-emerald-400" : "border-l-4 border-l-red-400"}`}>
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${wasCorrect ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                        {idx + 1}
                      </div>
                      <p className="font-medium text-gray-900 text-sm leading-relaxed">{q.question}</p>
                    </div>
                    <div className="ml-10 space-y-1.5">
                      {q.options.map((opt, oi) => {
                        const isCorrectOpt = oi === q.correct;
                        const wasSelected = answer?.selected === oi;
                        let optClass = "text-gray-500 text-sm";
                        if (isCorrectOpt) optClass = "text-emerald-700 font-medium text-sm";
                        else if (wasSelected && !isCorrectOpt) optClass = "text-red-600 line-through text-sm";
                        return (
                          <div key={oi} className={`flex items-center gap-2 ${optClass}`}>
                            {isCorrectOpt ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> :
                             wasSelected ? <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0" /> :
                             <div className="w-3.5 h-3.5 rounded-full border border-gray-300 shrink-0" />}
                            <span>{opt}</span>
                          </div>
                        );
                      })}
                    </div>
                    {!wasCorrect && (
                      <div className="ml-10 mt-2 p-3 bg-amber-50 rounded-lg border border-amber-100">
                        <p className="text-xs font-bold text-amber-700 mb-1">Why this matters:</p>
                        <p className="text-xs text-amber-800 leading-relaxed">{q.rationale}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex gap-3 justify-center pt-4">
        <Button variant="outline" onClick={onRetake} className="gap-2" data-testid={`button-retake-${testType}`}>
          <Activity className="w-4 h-4" /> Retake {testType === "pretest" ? "Pre-Test" : "Post-Test"}
        </Button>
        {testType === "pretest" && (
          <p className="text-sm text-gray-500 self-center">or continue to Clinical Content →</p>
        )}
      </div>
    </div>
  );
}

function QuizSection({
  questions,
  lessonId,
  testType,
  onComplete,
}: {
  questions: QuizQuestion[];
  lessonId: string;
  testType: "pretest" | "posttest";
  onComplete: (score: number, total: number) => void;
}) {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [complete, setComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answerLog, setAnswerLog] = useState<AnswerRecord[]>([]);
  const { user } = useAuth();

  const preTestScore = useMemo(() => {
    const stored = localStorage.getItem(`nursenest-pretest-${lessonId}`);
    return stored ? JSON.parse(stored) : null;
  }, [lessonId, complete]);

  const resetQuiz = () => {
    setStarted(false);
    setCurrentQ(0);
    setScore(0);
    setComplete(false);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setAnswerLog([]);
  };

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowFeedback(true);
    const isCorrect = index === questions[currentQ].correct;
    if (isCorrect) setScore((s) => s + 1);
    setAnswerLog((prev) => [...prev, { questionIndex: currentQ, selected: index, correct: questions[currentQ].correct, isCorrect }]);

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      if (currentQ + 1 < questions.length) {
        setCurrentQ((q) => q + 1);
      } else {
        const finalScore = score + (isCorrect ? 1 : 0);
        setComplete(true);
        localStorage.setItem(
          `nursenest-${testType}-${lessonId}`,
          JSON.stringify({ score: finalScore, total: questions.length, percentage: Math.round((finalScore / questions.length) * 100) })
        );
        onComplete(finalScore, questions.length);

        if (user) {
          fetch("/api/test-results", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: user.id,
              lessonId,
              testType,
              score: finalScore,
              totalQuestions: questions.length,
            }),
          }).catch(() => {});
        }
      }
    }, 2000);
  };

  if (!started) {
    return (
      <div className="text-center space-y-6 py-12">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          {testType === "pretest" ? <BarChart3 className="w-10 h-10 text-primary" /> : <TrendingUp className="w-10 h-10 text-primary" />}
        </div>
        <h2 className="text-3xl font-bold" data-testid={`text-${testType}-title`}>
          {testType === "pretest" ? "Pre-Test: Baseline Assessment" : "Post-Test: Knowledge Check"}
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          {testType === "pretest"
            ? "Take this test before studying the lesson to assess your baseline knowledge. Your score will be compared with your post-test results."
            : "Now that you've studied the lesson, test your knowledge. Your score will be compared with your pre-test to measure improvement."}
        </p>
        <p className="text-sm text-gray-400">{questions.length} questions</p>
        <Button
          size="lg"
          onClick={() => setStarted(true)}
          className="rounded-full px-12 bg-primary hover:brightness-110 h-14 text-lg text-white"
          data-testid={`button-start-${testType}`}
        >
          {testType === "pretest" ? "Start Pre-Test" : "Start Post-Test"}
        </Button>
      </div>
    );
  }

  if (complete) {
    return (
      <QuizReport
        questions={questions}
        answers={answerLog}
        score={score}
        testType={testType}
        lessonId={lessonId}
        preTestScore={preTestScore}
        onRetake={resetQuiz}
      />
    );
  }

  const progressPercent = ((currentQ + 1) / questions.length) * 100;
  return (
    <div className="max-w-2xl mx-auto space-y-8 py-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-primary uppercase tracking-wider" data-testid={`text-${testType}-progress`}>
            Question {currentQ + 1} of {questions.length}
          </p>
          <span className="text-sm text-gray-400">{Math.round(progressPercent)}%</span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900" data-testid={`text-${testType}-question`}>
        {questions[currentQ].question}
      </h3>
      <div className="grid gap-4">
        {questions[currentQ].options.map((option, i) => {
          const isCorrect = i === questions[currentQ].correct;
          const isSelected = selectedAnswer === i;
          let cardStyle = "hover:bg-primary/5 hover:border-primary/40 hover:shadow-md cursor-pointer";
          if (selectedAnswer !== null) {
            if (isCorrect) cardStyle = "bg-emerald-50 border-emerald-400 text-emerald-900";
            else if (isSelected) cardStyle = "bg-red-50 border-red-400 text-red-900";
            else cardStyle = "opacity-60";
          }
          return (
            <Card
              key={i}
              className={`border shadow-sm transition-all ${cardStyle}`}
              onClick={() => selectedAnswer === null && handleAnswer(i)}
              data-testid={`card-${testType}-option-${i}`}
            >
              <CardContent className="p-4 flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${
                  selectedAnswer !== null && isCorrect ? "bg-emerald-500 text-white" :
                  isSelected && !isCorrect ? "bg-red-500 text-white" :
                  "bg-gray-100 text-gray-600"
                }`}>
                  {selectedAnswer !== null && isCorrect ? <CheckCircle2 className="w-5 h-5" /> :
                   isSelected && !isCorrect ? <XCircle className="w-5 h-5" /> :
                   String.fromCharCode(65 + i)}
                </div>
                <span className="pt-1">{option}</span>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {showFeedback && (
        <div className={`p-4 rounded-xl border ${
          selectedAnswer === questions[currentQ].correct
            ? "bg-emerald-50 border-emerald-200 text-emerald-800"
            : "bg-red-50 border-red-200 text-red-800"
        }`} data-testid={`text-${testType}-rationale`}>
          <p className="font-bold mb-1">{selectedAnswer === questions[currentQ].correct ? "Correct!" : "Incorrect"}</p>
          <p className="text-sm">{questions[currentQ].rationale}</p>
        </div>
      )}
    </div>
  );
}

export default function LessonDetail() {
  const { id } = useParams();
  const [, navigate] = useLocation();
  const [hidePreTest, setHidePreTest] = useState(() => localStorage.getItem("nursenest-hide-pretest") === "true");
  const [hidePostTest, setHidePostTest] = useState(() => localStorage.getItem("nursenest-hide-posttest") === "true");
  const [activeTab, setActiveTab] = useState(() => {
    const hidePre = localStorage.getItem("nursenest-hide-pretest") === "true";
    const hidePost = localStorage.getItem("nursenest-hide-posttest") === "true";
    if (hidePre && hidePost) return "content";
    if (hidePre) return "content";
    return "pretest";
  });
  const [preTestDone, setPreTestDone] = useState(false);
  const [postTestDone, setPostTestDone] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [noteSaving, setNoteSaving] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout>(undefined);
  const [region, setRegion] = useState<"US" | "CA">(() => {
    return (localStorage.getItem("nursenest-region") as "US" | "CA") || "CA";
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<LessonContent | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { user, hasAccess } = useAuth();

  useEffect(() => {
    const handleRegionChange = () => {
      setRegion((localStorage.getItem("nursenest-region") as "US" | "CA") || "CA");
    };
    window.addEventListener("regionChange", handleRegionChange);
    return () => window.removeEventListener("regionChange", handleRegionChange);
  }, []);

  const baseLesson = useMemo(() => {
    if (id && contentMap[id]) return contentMap[id];
    return null;
  }, [id]);

  const [overrides, setOverrides] = useState<Partial<LessonContent> | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/lesson-overrides/${id}`)
        .then((r) => r.json())
        .then((data) => {
          if (data && Object.keys(data).length > 0) {
            setOverrides(data);
          }
        })
        .catch(() => {});
    }
  }, [id]);

  const lessonContent = useMemo(() => {
    if (!baseLesson) return null;
    if (!overrides) return baseLesson;
    return { ...baseLesson, ...overrides } as LessonContent;
  }, [baseLesson, overrides]);

  if (!baseLesson || !lessonContent) {
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900">
        <Navigation />
        <main className="max-w-2xl mx-auto px-4 py-20 w-full text-center space-y-6">
          <Link href="/lessons">
            <Button variant="ghost" className="mb-4 group">
              <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Lessons
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Coming Soon</h1>
          <p className="text-gray-600">This lesson is currently being developed. Check back soon for the full content!</p>
        </main>
        <Footer />
      </div>
    );
  }

  const startEditing = () => {
    const data = JSON.parse(JSON.stringify(lessonContent));
    if (!data.riskFactors) data.riskFactors = [];
    if (!data.diagnostics) data.diagnostics = [];
    if (!data.management) data.management = [];
    if (!data.nursingActions) data.nursingActions = [];
    if (!data.lifespan) data.lifespan = { title: "Across the Lifespan", content: "" };
    setEditData(data);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setEditData(null);
    setIsEditing(false);
  };

  const saveEdits = async () => {
    if (!editData || !id) return;
    setSaving(true);
    try {
      const diff: Record<string, any> = {};
      const fields: (keyof LessonContent)[] = ["cellular", "riskFactors", "diagnostics", "management", "nursingActions", "lifespan", "signs", "medications", "pearls"];
      for (const field of fields) {
        const editVal = editData[field];
        const baseVal = baseLesson[field];
        if (JSON.stringify(editVal) !== JSON.stringify(baseVal)) {
          diff[field] = editVal;
        }
      }

      const creds = JSON.parse(localStorage.getItem("nursenest-credentials") || "{}");
      const res = await fetch(`/api/lesson-overrides/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-user-tier": user?.tier || "" },
        body: JSON.stringify({ ...diff, username: creds.username, password: creds.password }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Save failed");
      }
      setOverrides(Object.keys(diff).length > 0 ? diff : null);
      setIsEditing(false);
      setEditData(null);
      toast({ title: "Saved", description: "Lesson content updated successfully" });
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to save changes", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const ed = isEditing && editData ? editData : null;

  const lessonTier = getLessonTier(id || "");
  const userHasAccess = canAccessTier(user?.tier, lessonTier);

  useEffect(() => {
    trackMilestone("lesson_view");
    trackMilestone("session_start");
  }, [id]);

  useEffect(() => {
    if (user && id) {
      fetch(`/api/notes/${user.id}/${id}`)
        .then((r) => r.json())
        .then((data) => {
          if (data?.content) setNoteContent(data.content);
        })
        .catch(() => {});
    }
  }, [user, id]);

  const saveNote = useCallback(() => {
    if (!user || !id) return;
    setNoteSaving(true);
    fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, lessonId: id, content: noteContent }),
    })
      .then(() => setNoteSaving(false))
      .catch(() => setNoteSaving(false));
  }, [user, id, noteContent]);

  const handleNoteChange = (value: string) => {
    setNoteContent(value);
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      if (user && id) {
        fetch("/api/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, lessonId: id, content: value }),
        });
      }
    }, 2000);
  };

  const preTestQuestions = useMemo(() => {
    return getTestQuestions(lessonContent, "pretest");
  }, [lessonContent]);

  const postTestQuestions = useMemo(() => {
    return getTestQuestions(lessonContent, "posttest");
  }, [lessonContent]);

  async function handleSubscribe() {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, tier: lessonTier }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      toast({ title: "Error", description: "Could not start checkout", variant: "destructive" });
    }
  }

  const isPeds = id?.includes("peds") || id === "epiglottitis" || id === "cp-management" || id === "kawasaki-critical" || id === "all-leukemia";
  const isMeds = id?.includes("safety") || id?.includes("labs") || id?.includes("mi-management");

  if (!userHasAccess) {
    const tp = tierPricing[lessonTier];
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900">
        <SEO title={`${lessonContent?.title || "Lesson"} - NurseNest`} description="Subscribe to access this lesson" />
        <Navigation />
        <main className="max-w-2xl mx-auto px-4 py-20 w-full text-center space-y-8">
          <Link href="/lessons">
            <Button variant="ghost" className="mb-4 group">
              <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Lessons
            </Button>
          </Link>

          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-12 h-12 text-primary" />
          </div>

          <h1 className="text-4xl font-bold">{lessonContent.title}</h1>
          <p className="text-lg text-gray-600">
            This lesson requires a <strong>{tp.name}</strong> subscription to access.
          </p>

          <Card className="border-none shadow-xl max-w-sm mx-auto">
            <CardContent className="p-8 space-y-4">
              <div className="flex items-center gap-2 justify-center">
                <Crown className="w-6 h-6 text-amber-500" />
                <span className="text-xl font-bold">{tp.name} Tier</span>
              </div>
              <p className="text-3xl font-bold text-primary">{region === "CA" ? tp.priceCAD : tp.priceUSD}</p>
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Full access to all {tp.name} lessons</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Flashcards and question bank</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Progress tracking and reports</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Note-taking and study tools</li>
              </ul>
              <Button className="w-full rounded-full h-12 text-lg" onClick={handleSubscribe} data-testid="button-subscribe">
                {user ? "Subscribe Now" : "Sign In to Subscribe"}
              </Button>
            </CardContent>
          </Card>
        </main>
        <AdminEditButton />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900 ${user?.tier !== "admin" ? "select-none" : ""}`} onContextMenu={user?.tier !== "admin" ? (e) => e.preventDefault() : undefined}>
      <SEO
        title={`${lessonContent?.title || "Lesson"} - Clinical Nursing Lesson | NurseNest`}
        description={generateLessonSeoDescription(id || "", lessonContent)}
        keywords={generateLessonKeywords(id || "", lessonContent)}
        canonicalPath={`/lessons/${id}`}
        ogType="article"
        structuredData={buildLessonStructuredData(id || "", lessonContent)}
        additionalStructuredData={[
          buildBreadcrumbStructuredData([
            { name: "Home", url: "https://www.nursenest.ca/" },
            { name: "Lessons", url: "https://www.nursenest.ca/lessons" },
            { name: getLessonBodySystem(id || ""), url: "https://www.nursenest.ca/lessons" },
            { name: lessonContent.title, url: `https://www.nursenest.ca/lessons/${id}` },
          ]),
        ]}
      />
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-500" data-testid="nav-breadcrumb">
          <ol className="flex items-center gap-1 flex-wrap">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li><Link href="/lessons" className="hover:text-primary transition-colors">Lessons</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-400">{getLessonBodySystem(id || "")}</li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-900 font-medium">{lessonContent.title}</li>
          </ol>
        </nav>
        <div className="flex items-center justify-between mb-8">
          <Link href="/lessons">
            <Button variant="ghost" className="group">
              <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Overview
            </Button>
          </Link>
          <Button 
            variant={showNotes ? "default" : "outline"} 
            onClick={() => setShowNotes(!showNotes)}
            className="gap-2"
            data-testid="button-toggle-notes"
          >
            <StickyNote className="w-4 h-4" />
            {showNotes ? "Hide Notes" : "My Notes"}
          </Button>
        </div>

        {showNotes && (
          <div className="fixed bottom-4 right-4 z-40 w-80 sm:w-96 max-h-[70vh] shadow-2xl rounded-2xl border border-yellow-200 bg-yellow-50/95 backdrop-blur-lg overflow-hidden flex flex-col" data-testid="panel-sticky-notes">
            <div className="flex items-center justify-between p-4 pb-2 border-b border-yellow-200/60">
              <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                <StickyNote className="w-4 h-4 text-yellow-600" /> Study Notes
              </h3>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-medium ${noteSaving ? "text-amber-500" : "text-emerald-500"}`}>
                  {noteSaving ? "Saving..." : "Saved"}
                </span>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={saveNote} data-testid="button-save-note">
                  <Save className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setShowNotes(false)} data-testid="button-close-notes">
                  <X className="w-3.5 h-3.5 text-gray-400" />
                </Button>
              </div>
            </div>
            <div className="px-3 py-2 border-b border-yellow-100 bg-yellow-50/50">
              <p className="text-[10px] text-yellow-700 font-medium">{lessonContent.title}</p>
            </div>
            <div className="p-3 flex-1 overflow-y-auto">
              <Textarea
                value={noteContent}
                onChange={(e) => handleNoteChange(e.target.value)}
                placeholder={"Write your study notes here...\n\nTips:\n- Key findings to remember\n- Nursing priorities\n- Medications and side effects\n- Questions for further review"}
                className="min-h-[220px] bg-white border-yellow-200 focus:border-yellow-400 text-sm resize-y leading-relaxed"
                data-testid="textarea-notes"
              />
              <div className="flex items-center justify-between mt-2">
                <p className="text-[10px] text-gray-400">Auto-saves as you type</p>
                <p className="text-[10px] text-gray-400">{noteContent.length > 0 ? `${noteContent.length} chars` : ""}</p>
              </div>
            </div>
          </div>
        )}

        {(() => {
          const lessonImg = getLessonImage(id || "");
          const lessonId = id || "";
          return lessonImg ? (
            <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-6 shadow-md">
              <ProtectedImage
                src={lessonImg}
                alt={getImageAltText(lessonId, lessonContent.title)}
                title={getImageTitle(lessonId, lessonContent.title)}
                className="w-full h-full object-cover"
                loading="lazy"
                data-testid={`img-lesson-${lessonId}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/30 to-transparent pointer-events-none" style={{ zIndex: 3 }} />
              <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getImageStructuredData(lessonId, lessonImg, lessonContent.title)) }} />
            </div>
          ) : null;
        })()}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
               {isPeds && (
                 <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-500">
                    <Baby className="w-6 h-6" />
                 </div>
               )}
               {isMeds && (
                 <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-500">
                    <Beaker className="w-6 h-6" />
                 </div>
               )}
               <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">{lessonContent.title}</h1>
               {user?.tier === "admin" && !isEditing && (
                 <Button
                   variant="outline"
                   size="sm"
                   className="gap-2 text-xs"
                   onClick={startEditing}
                   data-testid="button-admin-edit-lesson"
                 >
                   <Pencil className="w-3 h-3" />
                   Edit Inline
                 </Button>
               )}
            </div>
            {(() => {
              const diff = getDifficulty(id || "");
              const config = difficultyConfig[diff];
              return (
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">
                    {lessonTier === "np" ? "NP Focus" : lessonTier === "rn" ? "RN Focus" : "RPN Focus"}
                  </span>
                  <span data-testid="lesson-difficulty-badge" className={`px-3 py-1 rounded-full text-sm font-bold ${config.bg} ${config.color}`}>
                    Difficulty: {config.label}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm font-bold">
                    {region === "CA" ? "Canadian Guidelines" : "US Guidelines"}
                  </span>
                </div>
              );
            })()}
          </div>

          <Card className="bg-primary/5 border-none">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-bold text-primary uppercase tracking-wider">Learning Progress</p>
                <p className="text-gray-600">Pre-Test → Study → Post-Test. Track your clinical reasoning improvement.</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{postTestDone ? "100%" : preTestDone ? "50%" : "0%"}</p>
                <Progress value={postTestDone ? 100 : preTestDone ? 50 : 0} className="w-32 h-2" />
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-end gap-4 mb-2 text-xs text-gray-500" data-testid="test-visibility-toggles">
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={!hidePreTest}
                onChange={(e) => {
                  const hide = !e.target.checked;
                  setHidePreTest(hide);
                  localStorage.setItem("nursenest-hide-pretest", String(hide));
                  if (hide && activeTab === "pretest") setActiveTab("content");
                }}
                className="rounded border-gray-300 text-primary focus:ring-primary w-3.5 h-3.5"
                data-testid="toggle-pretest"
              />
              Show Pre-Test
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={!hidePostTest}
                onChange={(e) => {
                  const hide = !e.target.checked;
                  setHidePostTest(hide);
                  localStorage.setItem("nursenest-hide-posttest", String(hide));
                  if (hide && activeTab === "posttest") setActiveTab("content");
                }}
                className="rounded border-gray-300 text-primary focus:ring-primary w-3.5 h-3.5"
                data-testid="toggle-posttest"
              />
              Show Post-Test
            </label>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" data-testid="tabs-lesson">
            <TabsList className={`grid w-full h-12 ${hidePreTest && hidePostTest ? "grid-cols-1" : hidePreTest || hidePostTest ? "grid-cols-2" : "grid-cols-3"}`}>
              {!hidePreTest && (
                <TabsTrigger value="pretest" className="gap-2 text-sm" data-testid="tab-pretest">
                  <BarChart3 className="w-4 h-4" />
                  Pre-Test
                </TabsTrigger>
              )}
              <TabsTrigger value="content" className="gap-2 text-sm" data-testid="tab-content">
                <BookOpen className="w-4 h-4" />
                Clinical Content
              </TabsTrigger>
              {!hidePostTest && (
                <TabsTrigger value="posttest" className="gap-2 text-sm" data-testid="tab-posttest">
                  <TrendingUp className="w-4 h-4" />
                  Post-Test
                </TabsTrigger>
              )}
            </TabsList>

            {!hidePreTest && (
              <TabsContent value="pretest" className="mt-6">
                <QuizSection
                  questions={preTestQuestions}
                  lessonId={id || ""}
                  testType="pretest"
                  onComplete={(score, total) => {
                    setPreTestDone(true);
                    trackMilestone("test_complete", { score: Math.round((score / total) * 100) });
                  }}
                />
              </TabsContent>
            )}

            <TabsContent value="content" className="mt-6">
              <nav className="hidden lg:block fixed left-4 top-1/3 z-30 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 p-3 space-y-1 max-w-[160px]" data-testid="nav-quick-sections">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Sections</p>
                {[
                  { id: "pathophysiology", label: "Pathophysiology" },
                  { id: "risk-factors", label: "Risk Factors" },
                  { id: "diagnostics", label: "Diagnostics" },
                  { id: "management", label: "Management" },
                  { id: "nursing-actions", label: "Nursing Actions" },
                  { id: "lifespan", label: "Lifespan" },
                  { id: "clinical-findings", label: "Clinical Findings" },
                  { id: "pharmacology", label: "Pharmacology" },
                  { id: "exam-readiness", label: "Exam Readiness" },
                ].map(item => (
                  <a key={item.id} href={`#${item.id}`} className="block text-xs text-gray-500 hover:text-primary py-1 px-2 rounded hover:bg-primary/5 transition-colors truncate">
                    {item.label}
                  </a>
                ))}
              </nav>
              {isEditing && (
                <div className="sticky top-0 z-50 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between shadow-lg mb-6" data-testid="bar-inline-editing">
                  <div className="flex items-center gap-2 text-amber-800 font-medium">
                    <Pencil className="w-4 h-4" />
                    Editing Mode - Changes save to database overrides
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={cancelEditing} className="gap-1" data-testid="button-cancel-edit">
                      <X className="w-3 h-3" /> Cancel
                    </Button>
                    <Button size="sm" onClick={saveEdits} disabled={saving} className="gap-1" data-testid="button-save-edit">
                      <Save className="w-3 h-3" /> {saving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              )}
              <div className="space-y-12">
                <section id="pathophysiology" className="space-y-6">
                  <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                    <Microscope className="text-primary w-8 h-8" />
                    {ed ? (
                      <EditableText value={ed.cellular.title} onChange={(v) => setEditData({ ...ed, cellular: { ...ed.cellular, title: v } })} className="text-2xl font-bold" />
                    ) : (
                      <h2>{lessonContent.cellular.title}</h2>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Pathophysiology at the cellular level</p>
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 leading-relaxed text-gray-700">
                    {ed ? (
                      <EditableText value={ed.cellular.content} onChange={(v) => setEditData({ ...ed, cellular: { ...ed.cellular, content: v } })} multiline className="min-h-[200px]" />
                    ) : (
                      <div className="whitespace-pre-wrap">{lessonContent.cellular.content}</div>
                    )}
                  </div>
                  {id && (
                    <LessonImageManager
                      lessonId={id}
                      section="pathophysiology"
                      isAdmin={user?.tier === "admin"}
                      isEditing={isEditing}
                    />
                  )}
                </section>

                {(ed || (lessonContent.riskFactors && lessonContent.riskFactors.length > 0)) ? (
                  <section id="risk-factors" data-testid="section-risk-factors" className="space-y-6">
                    <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                      <ShieldAlert className="text-rose-500 w-8 h-8" />
                      <h2>Risk Factors</h2>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Key predisposing and contributing factors</p>
                    <Card className="border-none shadow-sm bg-rose-50/60">
                      <CardContent className="p-8">
                        {ed ? (
                          <EditableList items={ed.riskFactors || []} onChange={(items) => setEditData({ ...ed, riskFactors: items })} placeholder="Risk factor..." />
                        ) : (
                          <div className="grid sm:grid-cols-2 gap-3">
                            {lessonContent.riskFactors!.map((rf, i) => (
                              <div key={i} className="flex items-start gap-2 text-gray-700">
                                <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 shrink-0" />
                                <span>{rf}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </section>
                ) : null}

                {(ed || (lessonContent.diagnostics && lessonContent.diagnostics.length > 0)) ? (
                  <section id="diagnostics" data-testid="section-diagnostics" className="space-y-6">
                    <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                      <Search className="text-cyan-600 w-8 h-8" />
                      <h2>Diagnostics</h2>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Confirmatory findings and expected results</p>
                    <Card className="border-none shadow-sm bg-cyan-50/60">
                      <CardContent className="p-8">
                        {ed ? (
                          <EditableList items={ed.diagnostics || []} onChange={(items) => setEditData({ ...ed, diagnostics: items })} placeholder="Diagnostic finding..." />
                        ) : (
                          <div className="grid sm:grid-cols-2 gap-3">
                            {lessonContent.diagnostics!.map((d, i) => (
                              <div key={i} className="flex items-start gap-2 text-gray-700">
                                <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 shrink-0" />
                                <span>{d}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </section>
                ) : null}

                {(ed || (lessonContent.management && lessonContent.management.length > 0)) ? (
                  <section id="management" data-testid="section-management" className="space-y-6">
                    <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                      <ClipboardList className="text-emerald-600 w-8 h-8" />
                      <h2>Management</h2>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Evidence-informed interventions and monitoring</p>
                    <Card className="border-none shadow-sm bg-emerald-50/60">
                      <CardContent className="p-8">
                        {ed ? (
                          <EditableList items={ed.management || []} onChange={(items) => setEditData({ ...ed, management: items })} placeholder="Management step..." />
                        ) : (
                          <ul className="space-y-3">
                            {lessonContent.management!.map((m, i) => (
                              <li key={i} className="flex items-start gap-3 text-gray-700">
                                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                                  <span className="text-emerald-700 text-xs font-bold">{i + 1}</span>
                                </div>
                                <span>{m}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </CardContent>
                    </Card>
                  </section>
                ) : null}

                {(ed || (lessonContent.nursingActions && lessonContent.nursingActions.length > 0)) ? (
                  <section id="nursing-actions" data-testid="section-nursing-actions" className="space-y-6">
                    <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                      <HeartPulse className="text-violet-600 w-8 h-8" />
                      <h2>Nursing Actions and Scope Considerations</h2>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Priority assessments, interventions, and escalation triggers</p>
                    <Card className="border-none shadow-sm bg-violet-50/60">
                      <CardContent className="p-8">
                        {ed ? (
                          <EditableList items={ed.nursingActions || []} onChange={(items) => setEditData({ ...ed, nursingActions: items })} placeholder="Nursing action..." />
                        ) : (
                          <ul className="space-y-3">
                            {lessonContent.nursingActions!.map((na, i) => (
                              <li key={i} className="flex items-start gap-3 text-gray-700">
                                <HeartPulse className="w-4 h-4 text-violet-500 mt-1 shrink-0" />
                                <span>{na}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </CardContent>
                    </Card>
                  </section>
                ) : null}

                {(ed || lessonContent.lifespan) && (
                  <section id="lifespan" className="space-y-6">
                    <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                      <Users className="text-indigo-500 w-8 h-8" />
                      <h2>Across the Lifespan</h2>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Age-specific clinical variations and safety adjustments</p>
                    <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100 leading-relaxed text-indigo-900">
                      {ed && ed.lifespan ? (
                        <EditableText value={ed.lifespan.content} onChange={(v) => setEditData({ ...ed, lifespan: { ...ed.lifespan!, content: v } })} multiline className="min-h-[120px]" />
                      ) : (
                        <span className="italic">{lessonContent.lifespan!.content}</span>
                      )}
                    </div>
                  </section>
                )}

                {id === "vital-signs-red-flags" && <VitalSignsReferenceCharts />}
                {id === "infection-prevention-ppe" && <IsolationTypesGuide />}

                <section id="clinical-findings" className="space-y-6">
                  <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                    <AlertCircle className="text-orange-500 w-8 h-8" />
                    <h2>Clinical Findings and Red Flags</h2>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Key clinical presentations and warning signs</p>
                  <div className="grid md:grid-cols-2 gap-8">
                    <Card className="border-none shadow-md bg-white">
                      <CardContent className="p-8 space-y-4">
                        <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
                          <AlertCircle className="text-blue-500 w-6 h-6" />
                          <h3>Clinical Findings</h3>
                        </div>
                        {ed ? (
                          <EditableList items={ed.signs.left} onChange={(items) => setEditData({ ...ed, signs: { ...ed.signs, left: items } })} placeholder="Clinical finding..." />
                        ) : (
                          <ul className="space-y-2">
                            {lessonContent.signs.left.map((s, i) => (
                              <li key={i} className="flex items-center gap-2 text-gray-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        )}
                      </CardContent>
                    </Card>
                    <Card className="border-none shadow-md bg-white border-l-4 border-l-orange-400">
                      <CardContent className="p-8 space-y-4">
                        <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
                          <AlertCircle className="text-orange-500 w-6 h-6" />
                          <h3>Red Flags: When to Escalate</h3>
                        </div>
                        {ed ? (
                          <EditableList items={ed.signs.right} onChange={(items) => setEditData({ ...ed, signs: { ...ed.signs, right: items } })} placeholder="Red flag..." />
                        ) : (
                          <ul className="space-y-2">
                            {lessonContent.signs.right.map((s, i) => (
                              <li key={i} className="flex items-center gap-2 text-gray-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                  {id && (
                    <LessonImageManager
                      lessonId={id}
                      section="clinical-findings"
                      isAdmin={user?.tier === "admin"}
                      isEditing={isEditing}
                    />
                  )}
                </section>

                <section id="pharmacology" className="space-y-6">
                  <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                    <Pill className="text-primary w-8 h-8" />
                    <h2>Pharmacology and Safety</h2>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Medications, mechanisms, and safety considerations</p>
                  <div className="space-y-4">
                    {(ed || lessonContent).medications.map((med, i) => (
                      <Card key={i} className="border-none shadow-sm bg-white overflow-hidden text-gray-900">
                        <div className="bg-primary/5 px-6 py-3 border-b border-primary/10 flex items-center justify-between">
                          {ed ? (
                            <div className="flex gap-2 flex-1">
                              <Input value={med.name} onChange={(e) => { const meds = [...ed.medications]; meds[i] = { ...meds[i], name: e.target.value }; setEditData({ ...ed, medications: meds }); }} placeholder="Drug name" className="font-bold w-40" />
                              <Input value={med.type} onChange={(e) => { const meds = [...ed.medications]; meds[i] = { ...meds[i], type: e.target.value }; setEditData({ ...ed, medications: meds }); }} placeholder="Type" className="w-32" />
                              <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-600" onClick={() => { const meds = ed.medications.filter((_, idx) => idx !== i); setEditData({ ...ed, medications: meds }); }}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ) : (
                            <div>
                              <span className="font-bold text-gray-900">{med.name}</span> <span className="text-gray-500 text-sm">({med.type})</span>
                            </div>
                          )}
                        </div>
                        <CardContent className="p-6 grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <p className="text-sm font-bold text-gray-400 uppercase">Action</p>
                            {ed ? (
                              <Textarea value={med.action} onChange={(e) => { const meds = [...ed.medications]; meds[i] = { ...meds[i], action: e.target.value }; setEditData({ ...ed, medications: meds }); }} className="min-h-[60px]" />
                            ) : (
                              <p className="text-gray-700">{med.action}</p>
                            )}
                            <p className="text-sm font-bold text-gray-400 uppercase pt-2">Side Effects</p>
                            {ed ? (
                              <Textarea value={med.sideEffects} onChange={(e) => { const meds = [...ed.medications]; meds[i] = { ...meds[i], sideEffects: e.target.value }; setEditData({ ...ed, medications: meds }); }} className="min-h-[60px]" />
                            ) : (
                              <p className="text-gray-700">{med.sideEffects}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-bold text-gray-400 uppercase">Contraindications</p>
                            {ed ? (
                              <Textarea value={med.contra} onChange={(e) => { const meds = [...ed.medications]; meds[i] = { ...meds[i], contra: e.target.value }; setEditData({ ...ed, medications: meds }); }} className="min-h-[60px]" />
                            ) : (
                              <p className="text-gray-700">{med.contra}</p>
                            )}
                            <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-100 flex gap-2">
                              <Lightbulb className="w-5 h-5 text-yellow-600 shrink-0" />
                              {ed ? (
                                <Input value={med.pearl} onChange={(e) => { const meds = [...ed.medications]; meds[i] = { ...meds[i], pearl: e.target.value }; setEditData({ ...ed, medications: meds }); }} className="text-sm" />
                              ) : (
                                <p className="text-sm text-yellow-800 font-medium">Pearl: {med.pearl}</p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {ed && (
                      <Button variant="outline" className="gap-2" onClick={() => setEditData({ ...ed, medications: [...ed.medications, { name: "", type: "", action: "", sideEffects: "", contra: "", pearl: "" }] })}>
                        <Plus className="w-4 h-4" /> Add Medication
                      </Button>
                    )}
                  </div>
                </section>

                <section id="exam-readiness" className="bg-gray-900 text-white p-10 rounded-3xl space-y-6 shadow-2xl">
                  <div className="flex items-center gap-3 text-2xl font-bold">
                    <FileText className="text-primary w-8 h-8" />
                    <h2>Exam Readiness</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-primary font-bold uppercase tracking-widest text-sm">Priority Logic</h4>
                      {ed ? (
                        <EditableList items={ed.pearls} onChange={(items) => setEditData({ ...ed, pearls: items })} placeholder="Exam pearl..." />
                      ) : (
                        <ul className="space-y-2 text-gray-300">
                          {lessonContent.pearls.map((p, i) => (
                            <li key={i} className="flex gap-2">
                              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                      <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Common Exam Traps</h4>
                      <p className="text-sm text-gray-400 leading-relaxed italic">
                        These are the high-yield reasoning patterns most commonly tested. Focus on what changed, what is the priority, and what should the nurse do first.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </TabsContent>

            {!hidePostTest && (
              <TabsContent value="posttest" className="mt-6">
                <QuizSection
                  questions={postTestQuestions}
                  lessonId={id || ""}
                  testType="posttest"
                  onComplete={(score, total) => {
                    setPostTestDone(true);
                    trackMilestone("test_complete", { score: Math.round((score / total) * 100) });
                    if (user) {
                      fetch("/api/progress", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          userId: user.id,
                          lessonId: id,
                          completed: "true",
                        }),
                      }).catch(() => {});
                    }
                  }}
                />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>

      <style>{`
        @media print {
          .select-none { user-select: text !important; -webkit-user-select: text !important; }
        }
      `}</style>
      <AdminEditButton />
      <Footer />
    </div>
  );
}
