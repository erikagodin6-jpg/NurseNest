import { useState, useEffect, useCallback } from "react";
import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { AdminEditButton } from "@/components/admin-edit-button";
import { Footer } from "@/components/footer";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  AnatomyLabeling,
  MatchingExercise,
  SelfCheckQuiz,
  StepSequencing,
  ProgressiveReveal,
  SpotAbnormality,
  MicroLesson,
  CognitiveCard,
  HoverReveal,
} from "@/components/interactive-learning";
import {
  CellSVG,
  cellLabels,
  HeartSVG,
  heartLabels,
  LungsSVG,
  lungLabels,
  KidneySVG,
  kidneyLabels,
} from "@/components/anatomy-diagrams";
import {
  Dna,
  Activity,
  BookOpen,
  Pill,
  Stethoscope,
  ChevronRight,
  ArrowLeft,
  Heart,
  Brain,
  Droplets,
  Wind,
  Sparkles,
  GraduationCap,
  Lightbulb,
  Beaker,
  FlaskConical,
  Target,
  Layers,
  Pencil,
  Save,
  Wand2,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import { useLocation } from "wouter";
import { ScienceFoundationsModule } from "@/data/pre-nursing-science";
import { ResearchStatisticsModule } from "@/data/pre-nursing-research";
import { AnatomyPhysiologyModule } from "@/data/pre-nursing-anatomy";
import { MedicalTerminologyModule } from "@/data/pre-nursing-terminology";
import { ChemistryModule } from "@/data/pre-nursing-chemistry";
import { MicrobiologyModule } from "@/data/pre-nursing-microbiology";
import { InfectionControlModule } from "@/data/pre-nursing-infection-control";
import { FluidsElectrolytesModule } from "@/data/pre-nursing-fluids-electrolytes";
import { CommunicationModule } from "@/data/pre-nursing-communication";
import { EthicsLegalModule } from "@/data/pre-nursing-ethics-legal";
import { StudyStrategiesModule } from "@/data/pre-nursing-study-strategies";

import illustrationCellStructure from "@assets/CC5529CB-1C54-4D82-9872-BF7B2A519E53_1771868083264.png";
import illustrationHomeostasis from "@assets/E9E33423-6365-4686-98CB-3197D14546E5_1771868083264.png";
import illustrationCranialNerves from "@assets/119BE6D3-7233-475C-883A-BA86F5BAE1E9_1771867815027.png";
import illustrationElectrolytes from "@assets/AB6C69A2-A616-4DBF-8567-6990D4260BDE_1771867744630.png";
import illustrationInflammatoryResponse from "@assets/046AF766-D3A2-4713-BF5D-BC2AFF8EEA89_1771876993790.png";

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

type ModuleId = "cell-biology" | "physiology" | "terminology" | "pharmacology" | "pathophysiology" | "science-foundations" | "anatomy-physiology" | "research-statistics" | "medical-terminology" | "chemistry" | "microbiology" | "infection-control" | "fluids-electrolytes" | "communication" | "ethics-legal" | "study-strategies";

const modules: {
  id: ModuleId;
  titleKey: string;
  subtitleKey: string;
  icon: any;
  color: string;
  bg: string;
  lessons: number;
  image: string;
}[] = [
  {
    id: "cell-biology",
    titleKey: "preNursing.mod.cellBiology",
    subtitleKey: "preNursing.mod.cellBiologyDesc",
    icon: Dna,
    color: "text-blue-600",
    bg: "bg-blue-50",
    lessons: 4,
    image: illustrationCellStructure,
  },
  {
    id: "physiology",
    titleKey: "preNursing.mod.physiology",
    subtitleKey: "preNursing.mod.physiologyDesc",
    icon: Activity,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    lessons: 4,
    image: illustrationHomeostasis,
  },
  {
    id: "terminology",
    titleKey: "preNursing.mod.terminology",
    subtitleKey: "preNursing.mod.terminologyDesc",
    icon: BookOpen,
    color: "text-purple-600",
    bg: "bg-purple-50",
    lessons: 3,
    image: illustrationCranialNerves,
  },
  {
    id: "pharmacology",
    titleKey: "preNursing.mod.pharmacology",
    subtitleKey: "preNursing.mod.pharmacologyDesc",
    icon: Pill,
    color: "text-amber-600",
    bg: "bg-amber-50",
    lessons: 3,
    image: illustrationElectrolytes,
  },
  {
    id: "pathophysiology",
    titleKey: "preNursing.mod.pathophysiology",
    subtitleKey: "preNursing.mod.pathophysiologyDesc",
    icon: Stethoscope,
    color: "text-rose-600",
    bg: "bg-rose-50",
    lessons: 3,
    image: illustrationInflammatoryResponse,
  },
  {
    id: "science-foundations",
    titleKey: "preNursing.mod.scienceFoundations",
    subtitleKey: "preNursing.mod.scienceFoundationsDesc",
    icon: FlaskConical,
    color: "text-teal-600",
    bg: "bg-teal-50",
    lessons: 6,
    image: illustrationCellStructure,
  },
  {
    id: "anatomy-physiology",
    titleKey: "preNursing.mod.anatomyPhysiology",
    subtitleKey: "preNursing.mod.anatomyPhysiologyDesc",
    icon: Heart,
    color: "text-red-600",
    bg: "bg-red-50",
    lessons: 7,
    image: illustrationHomeostasis,
  },
  {
    id: "research-statistics",
    titleKey: "preNursing.mod.researchStatistics",
    subtitleKey: "preNursing.mod.researchStatisticsDesc",
    icon: GraduationCap,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    lessons: 5,
    image: illustrationCranialNerves,
  },
  {
    id: "medical-terminology",
    titleKey: "preNursing.mod.medicalTerminology",
    subtitleKey: "preNursing.mod.medicalTerminologyDesc",
    icon: BookOpen,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    lessons: 4,
    image: illustrationCranialNerves,
  },
  {
    id: "chemistry",
    titleKey: "preNursing.mod.chemistry",
    subtitleKey: "preNursing.mod.chemistryDesc",
    icon: Beaker,
    color: "text-orange-600",
    bg: "bg-orange-50",
    lessons: 4,
    image: illustrationElectrolytes,
  },
  {
    id: "microbiology",
    titleKey: "preNursing.mod.microbiology",
    subtitleKey: "preNursing.mod.microbiologyDesc",
    icon: Sparkles,
    color: "text-lime-600",
    bg: "bg-lime-50",
    lessons: 4,
    image: illustrationCellStructure,
  },
  {
    id: "infection-control",
    titleKey: "preNursing.mod.infectionControl",
    subtitleKey: "preNursing.mod.infectionControlDesc",
    icon: Target,
    color: "text-rose-600",
    bg: "bg-rose-50",
    lessons: 4,
    image: illustrationInflammatoryResponse,
  },
  {
    id: "fluids-electrolytes",
    titleKey: "preNursing.mod.fluidsElectrolytes",
    subtitleKey: "preNursing.mod.fluidsElectrolytesDesc",
    icon: Droplets,
    color: "text-sky-600",
    bg: "bg-sky-50",
    lessons: 4,
    image: illustrationElectrolytes,
  },
  {
    id: "communication",
    titleKey: "preNursing.mod.communication",
    subtitleKey: "preNursing.mod.communicationDesc",
    icon: Layers,
    color: "text-violet-600",
    bg: "bg-violet-50",
    lessons: 4,
    image: illustrationHomeostasis,
  },
  {
    id: "ethics-legal",
    titleKey: "preNursing.mod.ethicsLegal",
    subtitleKey: "preNursing.mod.ethicsLegalDesc",
    icon: Lightbulb,
    color: "text-amber-600",
    bg: "bg-amber-50",
    lessons: 4,
    image: illustrationCranialNerves,
  },
  {
    id: "study-strategies",
    titleKey: "preNursing.mod.studyStrategies",
    subtitleKey: "preNursing.mod.studyStrategiesDesc",
    icon: Brain,
    color: "text-pink-600",
    bg: "bg-pink-50",
    lessons: 4,
    image: illustrationHomeostasis,
  },
];

const cellBiologyQuiz: import("@/components/interactive-learning").QuizQuestion[] = [
  {
    id: "cb1",
    question: "Which organelle is primarily responsible for ATP production?",
    options: ["Golgi apparatus", "Mitochondria", "Lysosome", "Ribosome"],
    correctIndex: 1,
    rationale: "Mitochondria are the 'powerhouse of the cell': they produce ATP through oxidative phosphorylation and the electron transport chain.",
    hint: "Think about which organelle has its own DNA and a double membrane.",
  },
  {
    id: "cb2",
    question: "A red blood cell placed in a hypotonic solution will:",
    options: ["Shrink (crenation)", "Swell and possibly lyse", "Stay the same size", "Lose its nucleus"],
    correctIndex: 1,
    rationale: "In a hypotonic solution, water moves INTO the cell by osmosis because solute concentration is lower outside. The RBC swells and may burst (hemolysis).",
    hint: "Water follows solute: 'water chases salt.'",
  },
  {
    id: "cb3",
    question: "Which type of transport requires ATP?",
    options: ["Osmosis", "Facilitated diffusion", "Sodium-potassium pump", "Simple diffusion"],
    correctIndex: 2,
    rationale: "The Na+/K+ ATPase is an active transport pump that moves 3 Na+ out and 2 K+ in against their concentration gradients, requiring ATP.",
  },
  {
    id: "cb4",
    question: "The cell membrane is best described as:",
    options: ["Rigid protein wall", "Phospholipid bilayer with embedded proteins", "Single layer of lipids", "Carbohydrate mesh"],
    correctIndex: 1,
    rationale: "The fluid mosaic model describes the cell membrane as a phospholipid bilayer with embedded and peripheral proteins, cholesterol, and glycoproteins.",
  },
];

const physiologySequence: import("@/components/interactive-learning").SequenceStep[] = [
  { id: "s1", text: "Body temperature rises above set point", order: 1 },
  { id: "s2", text: "Thermoreceptors detect the change", order: 2 },
  { id: "s3", text: "Hypothalamus (control center) receives signal", order: 3 },
  { id: "s4", text: "Effectors activated: vasodilation + sweating", order: 4 },
  { id: "s5", text: "Body temperature decreases toward set point", order: 5 },
  { id: "s6", text: "Negative feedback stops the response", order: 6 },
];

const terminologyPairs: import("@/components/interactive-learning").MatchPair[] = [
  { id: "t1", term: "Tachy-", definition: "Fast / rapid" },
  { id: "t2", term: "Brady-", definition: "Slow" },
  { id: "t3", term: "-emia", definition: "Blood condition" },
  { id: "t4", term: "Hyper-", definition: "Above normal / excessive" },
  { id: "t5", term: "-itis", definition: "Inflammation" },
  { id: "t6", term: "Dys-", definition: "Difficult / abnormal" },
  { id: "t7", term: "-ectomy", definition: "Surgical removal" },
  { id: "t8", term: "Hemo-", definition: "Blood" },
];

const pharmQuiz: import("@/components/interactive-learning").QuizQuestion[] = [
  {
    id: "p1",
    question: "An AGONIST drug at a receptor will:",
    options: ["Block the receptor", "Bind and activate the receptor", "Destroy the receptor", "Have no effect"],
    correctIndex: 1,
    rationale: "An agonist binds to and activates a receptor, mimicking the effect of the natural ligand. Example: morphine is an agonist at opioid receptors.",
  },
  {
    id: "p2",
    question: "A drug with a half-life of 6 hours is given at 0800. Approximately what percentage remains at 2000?",
    options: ["75%", "50%", "25%", "12.5%"],
    correctIndex: 2,
    rationale: "From 0800 to 2000 is 12 hours = 2 half-lives. After 1 half-life (6h): 50% remains. After 2 half-lives (12h): 25% remains.",
    hint: "Each half-life reduces the drug by 50%. Count the half-lives.",
  },
  {
    id: "p3",
    question: "Which factor INCREASES the risk of drug toxicity?",
    options: ["High protein binding", "Fast renal clearance", "Decreased liver function", "Large volume of distribution"],
    correctIndex: 2,
    rationale: "The liver metabolizes most drugs. When liver function decreases, drug metabolism slows, causing accumulation and potential toxicity.",
  },
];

const pathoFindings = [
  { id: "f1", text: "Heart rate 110 bpm", isAbnormal: true, explanation: "Tachycardia: a compensatory response to maintain cardiac output when stroke volume falls." },
  { id: "f2", text: "Blood pressure 120/80 mmHg", isAbnormal: false, explanation: "" },
  { id: "f3", text: "Respiratory rate 28/min", isAbnormal: true, explanation: "Tachypnea: the body is attempting to increase oxygen delivery or compensate for metabolic acidosis." },
  { id: "f4", text: "Temperature 37.0°C", isAbnormal: false, explanation: "" },
  { id: "f5", text: "Oxygen saturation 88%", isAbnormal: true, explanation: "Hypoxemia: indicates inadequate oxygenation. Normal SpO2 is 94-100%." },
  { id: "f6", text: "Urine output 15 mL/hr", isAbnormal: true, explanation: "Oliguria: suggests decreased renal perfusion. Normal is >30 mL/hr." },
  { id: "f7", text: "Capillary refill 2 seconds", isAbnormal: false, explanation: "" },
  { id: "f8", text: "Mental status: confused", isAbnormal: true, explanation: "Altered LOC: indicates decreased cerebral perfusion, a late sign of decompensation." },
];

type ModuleOverride = {
  title?: string;
  description?: string;
  supplementalContent?: string[];
};

function PreNursingModuleEditor({
  moduleId,
  moduleName,
  overrides,
  onSave,
}: {
  moduleId: string;
  moduleName: string;
  overrides: ModuleOverride;
  onSave: (data: ModuleOverride) => Promise<void>;
}) {
  const [editTitle, setEditTitle] = useState(overrides.title || "");
  const [editDesc, setEditDesc] = useState(overrides.description || "");
  const [editContent, setEditContent] = useState<string[]>(overrides.supplementalContent || []);
  const [saving, setSaving] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setSaving(true);
    try {
      const data: ModuleOverride = {};
      if (editTitle.trim()) data.title = editTitle;
      if (editDesc.trim()) data.description = editDesc;
      if (editContent.length > 0 && editContent.some((c) => c.trim())) data.supplementalContent = editContent.filter((c) => c.trim());
      await onSave(data);
      toast({ title: "Saved", description: `${moduleName} content updated` });
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const generateWithAI = async () => {
    if (!aiPrompt.trim()) {
      toast({ title: "Enter a prompt", description: "Describe what to generate", variant: "destructive" });
      return;
    }
    const creds = JSON.parse(localStorage.getItem("nursenest-credentials") || "{}");
    if (!creds.username) return;
    setAiLoading(true);
    try {
      const res = await fetch("/api/ai/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: creds.username,
          password: creds.password,
          prompt: `For the pre-nursing module "${moduleName}", ${aiPrompt}. Return as JSON: {"paragraphs":["paragraph 1","paragraph 2","paragraph 3"]}. Each paragraph should be educational, detailed, and appropriate for pre-nursing students.`,
          mode: "generate",
        }),
      });
      if (!res.ok) throw new Error("AI generation failed");
      const data = await res.json();
      const blocks = data.blocks || [];
      let found = false;
      const jsonBlock = blocks.find((b: any) => b.content && b.content.includes('"paragraphs"'));
      if (jsonBlock) {
        try {
          const jsonMatch = jsonBlock.content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            if (parsed.paragraphs) {
              setEditContent(parsed.paragraphs);
              found = true;
            }
          }
        } catch {}
      }
      if (!found && blocks.length > 0) {
        const paragraphs = blocks.filter((b: any) => b.type === "paragraph" && b.content).map((b: any) => b.content);
        if (paragraphs.length > 0) {
          setEditContent(paragraphs);
          found = true;
        }
      }
      if (found) {
        toast({ title: "AI Generated", description: "Content generated. Review and save." });
      } else {
        toast({ title: "No content", description: "AI did not return usable content. Try a different prompt.", variant: "destructive" });
      }
      setAiPrompt("");
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-4 border-2 border-purple-200 rounded-xl p-4 bg-purple-50/30 mb-6" data-testid={`editor-prenursing-${moduleId}`}>
      <div className="flex items-center gap-2 text-sm font-semibold text-purple-700">
        <Pencil className="w-4 h-4" />
        Admin Inline Editor: {moduleName}
      </div>
      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-gray-600">Override Title (leave empty to keep default)</label>
          <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder={moduleName} className="mt-1" data-testid={`input-prenursing-title-${moduleId}`} />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600">Override Description</label>
          <Input value={editDesc} onChange={(e) => setEditDesc(e.target.value)} placeholder="Custom module description..." className="mt-1" data-testid={`input-prenursing-desc-${moduleId}`} />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-gray-600">Supplemental Content Paragraphs ({editContent.length})</label>
            <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => setEditContent([...editContent, ""])} data-testid={`button-add-content-${moduleId}`}>
              <Plus className="w-3 h-3" /> Add Paragraph
            </Button>
          </div>
          {editContent.map((p, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <textarea
                value={p}
                onChange={(e) => {
                  const updated = [...editContent];
                  updated[idx] = e.target.value;
                  setEditContent(updated);
                }}
                className="flex-1 text-sm p-3 border rounded-lg min-h-[80px] resize-y focus:ring-2 focus:ring-purple-300 focus:border-purple-400"
                placeholder="Educational content paragraph..."
                data-testid={`textarea-prenursing-content-${moduleId}-${idx}`}
              />
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-400 hover:text-red-600 shrink-0 mt-1" onClick={() => setEditContent(editContent.filter((_, i) => i !== idx))} data-testid={`button-remove-content-${moduleId}-${idx}`}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
        <div className="border border-purple-200 rounded-lg p-3 bg-white space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-600">
            <Wand2 className="w-3.5 h-3.5" />
            AI Content Generation
          </div>
          <div className="flex gap-2">
            <Input
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="e.g. Generate comprehensive content about cell biology for pre-nursing..."
              className="text-sm"
              onKeyDown={(e) => { if (e.key === "Enter") generateWithAI(); }}
              data-testid={`input-ai-prompt-prenursing-${moduleId}`}
            />
            <Button size="sm" className="gap-1 bg-purple-600 hover:bg-purple-700 shrink-0" onClick={generateWithAI} disabled={aiLoading} data-testid={`button-ai-generate-prenursing-${moduleId}`}>
              {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
              Generate
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button size="sm" onClick={handleSave} disabled={saving} className="gap-1" data-testid={`button-save-prenursing-${moduleId}`}>
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </Button>
      </div>
    </div>
  );
}

function SupplementalContent({ moduleId }: { moduleId: string }) {
  const [content, setContent] = useState<string[]>([]);

  useEffect(() => {
    fetch(`/api/lesson-overrides/prenursing-${moduleId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.supplementalContent?.length) setContent(data.supplementalContent);
      })
      .catch(() => {});
  }, [moduleId]);

  if (content.length === 0) return null;

  return (
    <div className="space-y-3 mt-6 pt-4 border-t border-gray-200" data-testid={`supplemental-${moduleId}`}>
      {content.map((p, idx) => (
        <p key={idx} className="text-sm text-gray-700 leading-relaxed">{p}</p>
      ))}
    </div>
  );
}

export default function PreNursingPage() {
  const [, setLocation] = useLocation();
  const [activeModule, setActiveModule] = useState<ModuleId | null>(null);
  const [isContentEditing, setIsContentEditing] = useState(false);
  const [moduleOverrides, setModuleOverrides] = useState<Record<string, ModuleOverride>>({});
  const { t } = useI18n();
  const { user } = useAuth();
  const { toast } = useToast();
  const isAdmin = user?.tier === "admin";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mod = params.get("module");
    if (mod && modules.some((m) => m.id === mod)) {
      setActiveModule(mod as ModuleId);
    }
  }, []);

  useEffect(() => {
    if (activeModule) {
      fetch(`/api/lesson-overrides/prenursing-${activeModule}`)
        .then((r) => r.json())
        .then((data) => {
          if (data && Object.keys(data).length > 0) {
            setModuleOverrides((prev) => ({ ...prev, [activeModule]: data }));
          }
        })
        .catch(() => {});
    }
  }, [activeModule]);

  const saveModuleOverride = useCallback(async (moduleId: string, data: ModuleOverride) => {
    const creds = JSON.parse(localStorage.getItem("nursenest-credentials") || "{}");
    const res = await fetch(`/api/lesson-overrides/prenursing-${moduleId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-user-tier": user?.tier || "" },
      body: JSON.stringify({ ...data, username: creds.username, password: creds.password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Save failed");
    }
    setModuleOverrides((prev) => ({ ...prev, [moduleId]: { ...prev[moduleId], ...data } }));
  }, [user]);

  const moduleComponents: Record<string, { component: React.ReactNode; name: string }> = {
    "cell-biology": { component: <CellBiologyModule />, name: "Cell Biology" },
    "physiology": { component: <PhysiologyModule />, name: "Physiology Principles" },
    "terminology": { component: <TerminologyModule />, name: "Medical Terminology" },
    "pharmacology": { component: <PharmacologyModule />, name: "Intro Pharmacology" },
    "pathophysiology": { component: <PathophysiologyModule />, name: "Intro Pathophysiology" },
    "science-foundations": { component: <ScienceFoundationsModule />, name: "Science Foundations" },
    "anatomy-physiology": { component: <AnatomyPhysiologyModule />, name: "Anatomy & Physiology" },
    "research-statistics": { component: <ResearchStatisticsModule />, name: "Research & Statistics" },
    "medical-terminology": { component: <MedicalTerminologyModule />, name: "Medical Terminology Extended" },
    "chemistry": { component: <ChemistryModule />, name: "Chemistry" },
    "microbiology": { component: <MicrobiologyModule />, name: "Microbiology" },
    "infection-control": { component: <InfectionControlModule />, name: "Infection Control" },
    "fluids-electrolytes": { component: <FluidsElectrolytesModule />, name: "Fluids & Electrolytes" },
    "communication": { component: <CommunicationModule />, name: "Communication" },
    "ethics-legal": { component: <EthicsLegalModule />, name: "Ethics & Legal" },
    "study-strategies": { component: <StudyStrategiesModule />, name: "Study Strategies" },
  };

  if (activeModule) {
    const activeModuleData = modules.find((m) => m.id === activeModule);
    const mc = moduleComponents[activeModule];
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
        <SEO title={`Pre-Nursing: ${activeModuleData ? t(activeModuleData.titleKey) : ''} | NurseNest`} description="Free pre-nursing foundations modules" />
        <Navigation />
        <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 py-8 w-full">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setActiveModule(null)}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
              data-testid="button-back-modules"
            >
              <ArrowLeft className="w-4 h-4" /> {t("preNursing.backToModules")}
            </button>
            {isAdmin && (
              <button
                onClick={() => setIsContentEditing(!isContentEditing)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isContentEditing
                    ? "bg-purple-100 text-purple-800 border border-purple-300"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                data-testid="button-toggle-prenursing-edit"
              >
                <Pencil className="w-3.5 h-3.5" />
                {isContentEditing ? "Exit Editing" : "Edit Content"}
              </button>
            )}
          </div>

          {isContentEditing && isAdmin && mc && (
            <PreNursingModuleEditor
              moduleId={activeModule}
              moduleName={mc.name}
              overrides={moduleOverrides[activeModule] || {}}
              onSave={(data) => saveModuleOverride(activeModule, data)}
            />
          )}

          {mc?.component}
          <SupplementalContent moduleId={activeModule} />
        </main>
        <AdminEditButton pageName="pre-nursing" defaultTier="prenursing" defaultCategory="pre-nursing" />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
      <SEO
        title="Pre-Nursing Foundations: Free Interactive Learning | NurseNest"
        description="Master essential nursing foundations before school: cell biology, physiology, medical terminology, pharmacology basics, and pathophysiology logic. Free interactive modules."
        keywords="pre-nursing, nursing foundations, cell biology nursing, medical terminology, pharmacology basics, pathophysiology intro, free nursing study"
      />
      <Navigation />
      <main className="flex-grow">
        <section className="py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-secondary/20 blur-3xl" />
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary/20 shadow-sm mb-6">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-gray-600">{t("preNursing.badge")}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight" data-testid="text-pre-nursing-heading">
              {t("preNursing.pageTitle")}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2 leading-relaxed">
              {t("preNursing.pageSubtitle")}
            </p>
            <p className="text-sm text-primary font-medium">
              {t("preNursing.byNurses")}
            </p>
          </div>
        </section>

        <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map((mod) => (
              <Card
                key={mod.id}
                className="border border-primary/10 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden bg-white group"
                onClick={() => setActiveModule(mod.id)}
                data-testid={`module-card-${mod.id}`}
              >
                <div className="h-40 overflow-hidden bg-gray-50">
                  <img
                    src={mod.image}
                    alt={t(mod.titleKey)}
                    className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                    draggable={false}
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", mod.bg, mod.color)}>
                      <mod.icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{t(mod.titleKey)}</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{t(mod.subtitleKey)}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{mod.lessons} {t("preNursing.interactiveLessons")}</span>
                    <ChevronRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/5 rounded-2xl border border-primary/10">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-sm text-gray-700">
                {t("preNursing.readyForDeeper")}{" "}
                <button onClick={() => setLocation("/pricing")} className="text-primary font-semibold hover:underline" data-testid="link-upgrade-pre-nursing">
                  {t("preNursing.explorePlans")}
                </button>
              </span>
            </div>
          </div>
        </section>
      </main>
      <AdminEditButton pageName="pre-nursing" defaultTier="prenursing" defaultCategory="pre-nursing" />
      <Footer />
    </div>
  );
}

function CellBiologyModule() {
  return (
    <div className="space-y-8" data-testid="module-cell-biology">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Cell Biology</h2>
        <p className="text-gray-600">Explore the building blocks of the human body through interactive diagrams and concept checks.</p>
      </div>

      <MicroLesson title="The Human Cell" subtitle="Identify key organelles and their functions" icon={<Dna className="w-5 h-5" />}>
        <p className="text-sm text-gray-600 leading-relaxed">
          Every cell contains specialized structures called{" "}
          <HoverReveal term="organelles" definition="Membrane-bound structures within cells that perform specific functions, like tiny organs inside each cell." />{" "}
          that work together to maintain life. Understanding cell structure is the foundation for understanding how diseases affect the body at the cellular level.
        </p>
        <CognitiveCard
          type="concept"
          title="Why This Matters for Nursing"
          content="When you learn pathophysiology, you'll trace disease mechanisms back to cellular dysfunction. For example, MI (heart attack) starts with ischemia → cellular hypoxia → mitochondrial failure → cell death."
        />
      </MicroLesson>

      <AnatomyLabeling
        title="Cell Structure: Click to Identify"
        description="Click each point to reveal the organelle name. Can you identify all 9?"
        svgContent={<CellSVG />}
        labels={cellLabels}
      />

      <MatchingExercise
        title="Organelle Function Matching"
        description="Match each organelle to its primary function"
        pairs={[
          { id: "m1", term: "Mitochondria", definition: "ATP production (cellular energy)" },
          { id: "m2", term: "Nucleus", definition: "Contains DNA, controls cell activity" },
          { id: "m3", term: "Ribosome", definition: "Protein synthesis from mRNA" },
          { id: "m4", term: "Golgi Apparatus", definition: "Packages and ships proteins" },
          { id: "m5", term: "Lysosome", definition: "Digests cellular waste" },
          { id: "m6", term: "Cell Membrane", definition: "Selectively permeable barrier" },
        ]}
      />

      <MicroLesson title="Membrane Transport" subtitle="How substances move in and out of cells" icon={<Layers className="w-5 h-5" />}>
        <CognitiveCard
          type="remember"
          title="Key Principle"
          content="'Water chases salt': water moves toward areas of higher solute concentration through osmosis. This explains why IV normal saline stays in the vasculature while free water distributes across compartments."
        />
        <div className="grid sm:grid-cols-2 gap-3 mt-3">
          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100">
            <p className="text-xs font-semibold text-blue-700 mb-1">Passive Transport</p>
            <p className="text-xs text-blue-600">No energy needed. Moves DOWN concentration gradient. Examples: diffusion, osmosis, facilitated diffusion.</p>
          </div>
          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-100">
            <p className="text-xs font-semibold text-amber-700 mb-1">Active Transport</p>
            <p className="text-xs text-amber-600">Requires ATP energy. Moves AGAINST concentration gradient. Example: Na+/K+ pump (3 Na+ out, 2 K+ in).</p>
          </div>
        </div>
      </MicroLesson>

      <SelfCheckQuiz title="Cell Biology Check" questions={cellBiologyQuiz} />
    </div>
  );
}

function PhysiologyModule() {
  return (
    <div className="space-y-8" data-testid="module-physiology">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Physiology Principles</h2>
        <p className="text-gray-600">Understand how the body maintains balance through feedback loops, fluid management, and acid-base regulation.</p>
      </div>

      <MicroLesson title="Negative Feedback Loops" subtitle="The body's primary regulatory mechanism" icon={<Activity className="w-5 h-5" />}>
        <p className="text-sm text-gray-600 leading-relaxed">
          Most physiological regulation uses{" "}
          <HoverReveal term="negative feedback" definition="A regulatory mechanism where the output of a system reduces or inhibits the original stimulus, maintaining stability (homeostasis)." />.
          The body detects a change, activates a response, and reverses the change to restore balance.
        </p>
        <CognitiveCard
          type="concept"
          title="Clinical Connection"
          content="When you see a compensatory vital sign change in a patient (e.g., tachycardia in response to bleeding), you're witnessing negative feedback trying to maintain cardiac output."
        />
      </MicroLesson>

      <StepSequencing
        title="Thermoregulation Sequence"
        description="Arrange the steps of the negative feedback loop for body temperature regulation"
        steps={physiologySequence}
      />

      <MicroLesson title="Fluid Compartments" subtitle="Where body water is distributed" icon={<Droplets className="w-5 h-5" />}>
        <div className="space-y-3">
          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-blue-700">Intracellular Fluid (ICF)</p>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">~67%</span>
            </div>
            <p className="text-xs text-blue-600">Inside cells. Contains K+, Mg2+, PO4³⁻. The largest fluid compartment.</p>
          </div>
          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-emerald-700">Extracellular Fluid (ECF)</p>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">~33%</span>
            </div>
            <p className="text-xs text-emerald-600">Outside cells. Includes intravascular (plasma) and interstitial (between cells). Contains Na+, Cl⁻, HCO3⁻.</p>
          </div>
        </div>
        <CognitiveCard
          type="remember"
          title="Memory Aid"
          content="'K+ stays IN the cell, Na+ stays OUT.' This is maintained by the Na+/K+ ATPase pump. When cells are damaged (trauma, burns), K+ leaks out → hyperkalemia risk."
        />
      </MicroLesson>

      <AnatomyLabeling
        title="Heart Anatomy: Click to Identify"
        description="Identify the major structures of the heart"
        svgContent={<HeartSVG />}
        labels={heartLabels}
      />

      <SelfCheckQuiz
        title="Physiology Check"
        questions={[
          {
            id: "ph1",
            question: "Which electrolyte is the MOST abundant intracellular cation?",
            options: ["Sodium (Na+)", "Potassium (K+)", "Calcium (Ca2+)", "Chloride (Cl⁻)"],
            correctIndex: 1,
            rationale: "Potassium is the primary intracellular cation (150 mEq/L inside vs 3.5-5.0 mEq/L outside). This gradient is critical for nerve impulse conduction and muscle contraction.",
          },
          {
            id: "ph2",
            question: "A patient's pH is 7.30 with a low HCO3⁻. This suggests:",
            options: ["Respiratory acidosis", "Metabolic acidosis", "Respiratory alkalosis", "Metabolic alkalosis"],
            correctIndex: 1,
            rationale: "pH < 7.35 = acidosis. Low HCO3⁻ (metabolic component) is the primary disturbance. The kidneys are either losing too much bicarbonate or the body is producing excess acid.",
            hint: "Low pH = acidosis. Then determine if the cause is respiratory (CO2) or metabolic (HCO3⁻).",
          },
        ]}
      />
    </div>
  );
}

function TerminologyModule() {
  return (
    <div className="space-y-8" data-testid="module-terminology">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Medical Terminology</h2>
        <p className="text-gray-600">Decode clinical language by mastering the building blocks: prefixes, suffixes, and root words.</p>
      </div>

      <MicroLesson title="How Medical Terms Work" subtitle="Breaking down clinical vocabulary" icon={<BookOpen className="w-5 h-5" />}>
        <p className="text-sm text-gray-600 leading-relaxed">
          Most medical terms are combinations of <HoverReveal term="prefixes" definition="Word parts added to the beginning that modify meaning (e.g., hyper- = above, hypo- = below)." />,{" "}
          <HoverReveal term="root words" definition="The core part of the term that identifies the body part or system (e.g., cardi = heart, hepat = liver)." />, and{" "}
          <HoverReveal term="suffixes" definition="Word endings that indicate a condition, procedure, or state (e.g., -itis = inflammation, -ectomy = surgical removal)." />.
        </p>
        <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 mt-3">
          <p className="text-sm font-semibold text-gray-800 mb-2">Example Breakdown</p>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">Tachy</span>
            <span className="text-gray-400">+</span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">card</span>
            <span className="text-gray-400">+</span>
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">-ia</span>
            <span className="text-gray-400">=</span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full font-semibold">Tachycardia</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Fast + heart + condition = rapid heart rate</p>
        </div>
      </MicroLesson>

      <MatchingExercise
        title="Prefix & Suffix Matching"
        description="Match each medical prefix or suffix to its meaning"
        pairs={terminologyPairs}
      />

      <ProgressiveReveal
        title="Common Root Words"
        cards={[
          { id: "r1", title: "Cardi/o", summary: "Heart", detail: "Used in terms like cardiology, tachycardia, cardiomyopathy. The root 'cardi' always refers to the heart.", icon: <Heart className="w-4 h-4" /> },
          { id: "r2", title: "Hepat/o", summary: "Liver", detail: "Used in terms like hepatitis (liver inflammation), hepatomegaly (enlarged liver), hepatotoxic (toxic to the liver)." },
          { id: "r3", title: "Nephr/o", summary: "Kidney", detail: "Used in terms like nephritis (kidney inflammation), nephrectomy (kidney removal), nephropathy (kidney disease).", icon: <Droplets className="w-4 h-4" /> },
          { id: "r4", title: "Pneum/o", summary: "Lung / Air", detail: "Used in terms like pneumonia (lung infection), pneumothorax (air in pleural space), pneumonectomy (lung removal).", icon: <Wind className="w-4 h-4" /> },
          { id: "r5", title: "Neur/o", summary: "Nerve", detail: "Used in terms like neurology, neuropathy (nerve damage), neurogenic (originating from nerves).", icon: <Brain className="w-4 h-4" /> },
        ]}
      />

      <SelfCheckQuiz
        title="Terminology Check"
        questions={[
          {
            id: "tm1",
            question: "What does 'hepatomegaly' mean?",
            options: ["Liver inflammation", "Enlarged liver", "Liver removal", "Liver pain"],
            correctIndex: 1,
            rationale: "Hepat/o = liver, -megaly = enlargement. Hepatomegaly = enlarged liver. This is different from hepatitis (-itis = inflammation).",
          },
          {
            id: "tm2",
            question: "The term 'dyspnea' means:",
            options: ["Fast breathing", "No breathing", "Difficult breathing", "Slow breathing"],
            correctIndex: 2,
            rationale: "Dys- = difficult/abnormal, -pnea = breathing. Dyspnea = difficulty breathing. Compare: tachypnea (fast), apnea (absent), bradypnea (slow).",
          },
          {
            id: "tm3",
            question: "Which suffix means 'surgical removal'?",
            options: ["-otomy", "-ectomy", "-ostomy", "-ology"],
            correctIndex: 1,
            rationale: "-ectomy = surgical removal (appendectomy). -otomy = cutting into (tracheotomy). -ostomy = creating an opening (colostomy). -ology = study of.",
          },
        ]}
      />
    </div>
  );
}

function PharmacologyModule() {
  return (
    <div className="space-y-8" data-testid="module-pharmacology">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Intro Pharmacology</h2>
        <p className="text-gray-600">Understand how drugs interact with the body at the receptor level: the foundation for medication safety.</p>
      </div>

      <MicroLesson title="Drug-Receptor Basics" subtitle="How medications produce their effects" icon={<Pill className="w-5 h-5" />}>
        <p className="text-sm text-gray-600 leading-relaxed">
          Most drugs work by binding to <HoverReveal term="receptors" definition="Specialized protein molecules on or inside cells that drugs bind to in order to produce an effect. Think of them as locks that drugs (keys) activate or block." /> on cells.
          The drug-receptor interaction determines whether the drug activates or blocks a cellular response.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mt-3">
          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
            <p className="text-sm font-semibold text-emerald-700 mb-1">Agonist</p>
            <p className="text-xs text-emerald-600">Binds to receptor and ACTIVATES it. Mimics the natural ligand.</p>
            <p className="text-xs text-emerald-500 mt-1 italic">Example: Morphine (opioid agonist)</p>
          </div>
          <div className="p-4 bg-red-50/60 rounded-xl border border-red-100">
            <p className="text-sm font-semibold text-red-700 mb-1">Antagonist</p>
            <p className="text-xs text-red-600">Binds to receptor and BLOCKS it. Prevents the natural ligand from activating.</p>
            <p className="text-xs text-red-500 mt-1 italic">Example: Naloxone (opioid antagonist)</p>
          </div>
        </div>
        <CognitiveCard
          type="tip"
          title="Clinical Connection"
          content="Naloxone reverses opioid overdose by competing for the same receptors. It's an antagonist that displaces the agonist (morphine/fentanyl) from opioid receptors."
        />
      </MicroLesson>

      <MicroLesson title="Pharmacokinetics Overview" subtitle="What the body does to the drug" icon={<FlaskConical className="w-5 h-5" />}>
        <ProgressiveReveal
          title=""
          cards={[
            { id: "pk1", title: "Absorption", summary: "Drug enters the bloodstream", detail: "Route of administration affects speed: IV = immediate, IM = moderate, PO = slowest. Bioavailability measures how much drug reaches systemic circulation." },
            { id: "pk2", title: "Distribution", summary: "Drug travels to target tissues", detail: "Protein binding (albumin) affects free drug levels. Only unbound drug is pharmacologically active. Highly protein-bound drugs have drug interaction risks." },
            { id: "pk3", title: "Metabolism", summary: "Drug is broken down (primarily liver)", detail: "Cytochrome P450 enzymes in the liver metabolize most drugs. Liver disease, age, and drug interactions can alter metabolism speed." },
            { id: "pk4", title: "Excretion", summary: "Drug is eliminated (primarily kidneys)", detail: "Renal clearance is the main excretion route. Monitor creatinine/GFR. Dose adjustments needed for renal impairment to prevent toxicity." },
          ]}
        />
      </MicroLesson>

      <SelfCheckQuiz title="Pharmacology Check" questions={pharmQuiz} />
    </div>
  );
}

function PathophysiologyModule() {
  return (
    <div className="space-y-8" data-testid="module-pathophysiology">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Intro Pathophysiology</h2>
        <p className="text-gray-600">Learn to think like a clinician: trace disease mechanisms, recognize compensation, and differentiate early from late signs.</p>
      </div>

      <MicroLesson title="Disease = Disrupted Homeostasis" subtitle="Understanding why symptoms happen" icon={<Stethoscope className="w-5 h-5" />}>
        <p className="text-sm text-gray-600 leading-relaxed">
          Every disease is a story of{" "}
          <HoverReveal term="homeostasis" definition="The body's ability to maintain stable internal conditions (temperature, pH, blood glucose, etc.) despite changes in the external environment." />{" "}
          being disrupted. The body compensates to maintain function, but eventually those mechanisms fail. Understanding this progression is the key to clinical reasoning.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-3">
          <div className="flex-1 p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 text-center">
            <p className="text-xs font-bold text-emerald-700 mb-1">Early Signs</p>
            <p className="text-xs text-emerald-600">Compensatory responses</p>
            <p className="text-[10px] text-emerald-500 mt-1">Tachycardia, mild anxiety, slight BP changes</p>
          </div>
          <div className="flex items-center justify-center text-gray-300">→</div>
          <div className="flex-1 p-4 bg-amber-50/60 rounded-xl border border-amber-100 text-center">
            <p className="text-xs font-bold text-amber-700 mb-1">Progressive</p>
            <p className="text-xs text-amber-600">Compensation straining</p>
            <p className="text-[10px] text-amber-500 mt-1">Widening pulse pressure, confusion, oliguria</p>
          </div>
          <div className="flex items-center justify-center text-gray-300">→</div>
          <div className="flex-1 p-4 bg-red-50/60 rounded-xl border border-red-100 text-center">
            <p className="text-xs font-bold text-red-700 mb-1">Late / Decompensation</p>
            <p className="text-xs text-red-600">Mechanisms failing</p>
            <p className="text-[10px] text-red-500 mt-1">Hypotension, unresponsive, organ failure</p>
          </div>
        </div>
        <CognitiveCard
          type="warning"
          title="Exam Trap"
          content="Exams test whether you can recognize EARLY signs (when intervention matters most), not late signs (when it may be too late). Tachycardia is often the first sign of deterioration."
        />
      </MicroLesson>

      <SpotAbnormality
        title="Spot the Abnormal Findings"
        scenario="A 68-year-old patient was admitted 2 hours ago with complaints of increasing shortness of breath and chest tightness. The nurse obtains the following assessment findings:"
        findings={pathoFindings}
      />

      <AnatomyLabeling
        title="Respiratory Anatomy: Click to Identify"
        description="Identify the major respiratory structures"
        svgContent={<LungsSVG />}
        labels={lungLabels}
      />

      <MicroLesson title="Compensation Mechanisms" subtitle="How the body buys time" icon={<Lightbulb className="w-5 h-5" />}>
        <ProgressiveReveal
          title=""
          cards={[
            { id: "c1", title: "Cardiovascular Compensation", summary: "Heart rate and vessel tone adjust", detail: "When cardiac output drops, the sympathetic nervous system increases heart rate (tachycardia) and causes vasoconstriction to maintain blood pressure. This is why tachycardia is an early warning sign." },
            { id: "c2", title: "Respiratory Compensation", summary: "Breathing rate and depth adjust", detail: "In metabolic acidosis, the lungs blow off CO2 faster (Kussmaul breathing) to raise pH. In respiratory failure, increased rate is an early compensatory sign." },
            { id: "c3", title: "Renal Compensation", summary: "Kidneys adjust fluid and acid-base balance", detail: "The kidneys can retain or excrete HCO3⁻ and H+ to correct pH, and adjust sodium/water retention to maintain blood volume. This process takes 24-48 hours." },
          ]}
        />
      </MicroLesson>

      <SelfCheckQuiz
        title="Pathophysiology Check"
        questions={[
          {
            id: "pp1",
            question: "Which is typically an EARLY sign of patient deterioration?",
            options: ["Hypotension", "Tachycardia", "Unresponsiveness", "Cardiac arrest"],
            correctIndex: 1,
            rationale: "Tachycardia is usually the FIRST compensatory sign. The heart speeds up to maintain cardiac output before blood pressure drops. By the time hypotension occurs, compensation is already failing.",
            hint: "Think about what happens first when the body tries to maintain perfusion.",
          },
          {
            id: "pp2",
            question: "A patient is breathing rapidly (RR 28) with a pH of 7.48. The body is likely:",
            options: ["Compensating for metabolic acidosis", "In respiratory alkalosis", "Compensating for metabolic alkalosis", "In respiratory acidosis"],
            correctIndex: 1,
            rationale: "pH > 7.45 = alkalosis. Rapid breathing blows off CO2 → less carbonic acid → higher pH. This is primary respiratory alkalosis (e.g., from hyperventilation, anxiety, or pain).",
          },
        ]}
      />
    </div>
  );
}
