import { useState, useEffect, useCallback, useRef } from "react";
import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { AdminEditButton } from "@/components/admin-edit-button";
import { Footer } from "@/components/footer";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { AdminImageOverlay, useSiteImages } from "@/components/admin-image-overlay";
import { RichTextEditor, RichTextDisplay } from "@/components/rich-text-editor";
import { ModuleEditContext, useModuleEdit, EditableModuleText, type SectionOverride, type ModuleEditContextType } from "@/components/module-edit-context";
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
import cellStructureImage from "@/assets/cell-structure-diagram.png";
import organelleMitochondria from "@/assets/organelle-mitochondria.png";
import organelleNucleus from "@/assets/organelle-nucleus.png";
import organelleGolgi from "@/assets/organelle-golgi.png";
import organelleRoughER from "@/assets/organelle-rough-er.png";
import organelleCellMembrane from "@/assets/organelle-cell-membrane.png";
import organelleLysosome from "@/assets/organelle-lysosome.png";
import transportPassive from "@/assets/transport-passive.png";
import transportActive from "@/assets/transport-active.png";
import heartAnatomyImage from "@/assets/heart-anatomy.png";
import lungsAnatomyImage from "@/assets/lungs-anatomy.png";
import feedbackLoopImage from "@/assets/feedback-loop.png";
import fluidCompartmentsImage from "@/assets/fluid-compartments.png";
import brainAnatomyImage from "@/assets/brain-anatomy.png";
import kidneyAnatomyImage from "@/assets/kidney-anatomy.png";
import {
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
  X,
  Upload,
  ImagePlus,
  Camera,
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

import imgCellBiology from "@/assets/prenursing-cell-biology.png";
import imgPhysiology from "@/assets/prenursing-physiology.png";
import imgTerminology from "@/assets/prenursing-terminology.png";
import imgPharmacology from "@/assets/prenursing-pharmacology.png";
import imgPathophysiology from "@/assets/prenursing-pathophysiology.png";
import imgScienceFoundations from "@/assets/prenursing-science-foundations.png";
import imgAnatomyPhysiology from "@/assets/prenursing-anatomy-physiology.png";
import imgResearchStatistics from "@/assets/prenursing-research-statistics.png";
import imgMedicalTerminology from "@/assets/prenursing-medical-terminology.png";
import imgChemistry from "@/assets/prenursing-chemistry.png";
import imgMicrobiology from "@/assets/prenursing-microbiology.png";
import imgInfectionControl from "@/assets/prenursing-infection-control.png";
import imgFluidsElectrolytes from "@/assets/prenursing-fluids-electrolytes.png";
import imgCommunication from "@/assets/prenursing-communication.png";
import imgEthicsLegal from "@/assets/prenursing-ethics-legal.png";
import imgStudyStrategies from "@/assets/prenursing-study-strategies.png";

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
    image: imgCellBiology,
  },
  {
    id: "physiology",
    titleKey: "preNursing.mod.physiology",
    subtitleKey: "preNursing.mod.physiologyDesc",
    icon: Activity,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    lessons: 4,
    image: imgPhysiology,
  },
  {
    id: "terminology",
    titleKey: "preNursing.mod.terminology",
    subtitleKey: "preNursing.mod.terminologyDesc",
    icon: BookOpen,
    color: "text-purple-600",
    bg: "bg-purple-50",
    lessons: 3,
    image: imgTerminology,
  },
  {
    id: "pharmacology",
    titleKey: "preNursing.mod.pharmacology",
    subtitleKey: "preNursing.mod.pharmacologyDesc",
    icon: Pill,
    color: "text-amber-600",
    bg: "bg-amber-50",
    lessons: 3,
    image: imgPharmacology,
  },
  {
    id: "pathophysiology",
    titleKey: "preNursing.mod.pathophysiology",
    subtitleKey: "preNursing.mod.pathophysiologyDesc",
    icon: Stethoscope,
    color: "text-rose-600",
    bg: "bg-rose-50/80",
    lessons: 3,
    image: imgPathophysiology,
  },
  {
    id: "science-foundations",
    titleKey: "preNursing.mod.scienceFoundations",
    subtitleKey: "preNursing.mod.scienceFoundationsDesc",
    icon: FlaskConical,
    color: "text-teal-600",
    bg: "bg-teal-50/80",
    lessons: 6,
    image: imgScienceFoundations,
  },
  {
    id: "anatomy-physiology",
    titleKey: "preNursing.mod.anatomyPhysiology",
    subtitleKey: "preNursing.mod.anatomyPhysiologyDesc",
    icon: Heart,
    color: "text-red-600",
    bg: "bg-red-50",
    lessons: 7,
    image: imgAnatomyPhysiology,
  },
  {
    id: "research-statistics",
    titleKey: "preNursing.mod.researchStatistics",
    subtitleKey: "preNursing.mod.researchStatisticsDesc",
    icon: GraduationCap,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    lessons: 5,
    image: imgResearchStatistics,
  },
  {
    id: "medical-terminology",
    titleKey: "preNursing.mod.medicalTerminology",
    subtitleKey: "preNursing.mod.medicalTerminologyDesc",
    icon: BookOpen,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    lessons: 4,
    image: imgMedicalTerminology,
  },
  {
    id: "chemistry",
    titleKey: "preNursing.mod.chemistry",
    subtitleKey: "preNursing.mod.chemistryDesc",
    icon: Beaker,
    color: "text-orange-600",
    bg: "bg-orange-50",
    lessons: 4,
    image: imgChemistry,
  },
  {
    id: "microbiology",
    titleKey: "preNursing.mod.microbiology",
    subtitleKey: "preNursing.mod.microbiologyDesc",
    icon: Sparkles,
    color: "text-lime-600",
    bg: "bg-lime-50",
    lessons: 4,
    image: imgMicrobiology,
  },
  {
    id: "infection-control",
    titleKey: "preNursing.mod.infectionControl",
    subtitleKey: "preNursing.mod.infectionControlDesc",
    icon: Target,
    color: "text-rose-600",
    bg: "bg-rose-50",
    lessons: 4,
    image: imgInfectionControl,
  },
  {
    id: "fluids-electrolytes",
    titleKey: "preNursing.mod.fluidsElectrolytes",
    subtitleKey: "preNursing.mod.fluidsElectrolytesDesc",
    icon: Droplets,
    color: "text-sky-600",
    bg: "bg-sky-50",
    lessons: 4,
    image: imgFluidsElectrolytes,
  },
  {
    id: "communication",
    titleKey: "preNursing.mod.communication",
    subtitleKey: "preNursing.mod.communicationDesc",
    icon: Layers,
    color: "text-violet-600",
    bg: "bg-violet-50",
    lessons: 4,
    image: imgCommunication,
  },
  {
    id: "ethics-legal",
    titleKey: "preNursing.mod.ethicsLegal",
    subtitleKey: "preNursing.mod.ethicsLegalDesc",
    icon: Lightbulb,
    color: "text-amber-600",
    bg: "bg-amber-50",
    lessons: 4,
    image: imgEthicsLegal,
  },
  {
    id: "study-strategies",
    titleKey: "preNursing.mod.studyStrategies",
    subtitleKey: "preNursing.mod.studyStrategiesDesc",
    icon: Brain,
    color: "text-pink-600",
    bg: "bg-pink-50",
    lessons: 4,
    image: imgStudyStrategies,
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
  sections?: Record<string, SectionOverride>;
};

function PreNursingModuleEditor({
  moduleId,
  moduleName,
  overrides,
  onSave,
  sectionOverrides,
}: {
  moduleId: string;
  moduleName: string;
  overrides: ModuleOverride;
  onSave: (data: ModuleOverride) => Promise<void>;
  sectionOverrides?: Record<string, SectionOverride>;
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
      if (sectionOverrides && Object.keys(sectionOverrides).length > 0) data.sections = sectionOverrides;
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
    <div className="space-y-6 mb-8" data-testid={`editor-prenursing-${moduleId}`}>
      <div className="sticky top-0 z-20 bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 text-amber-800 font-medium text-sm">
          <Pencil className="w-4 h-4" />
          Editing: {moduleName}
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleSave} disabled={saving} className="gap-1 bg-emerald-600 hover:bg-emerald-700 text-white" data-testid={`button-save-prenursing-${moduleId}`}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </Button>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center gap-3 text-xl font-bold text-gray-900">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <h2>Module Details</h2>
        </div>
        <Card className="border-none shadow-sm bg-blue-50/40">
          <CardContent className="p-6 space-y-4">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Title Override</p>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder={moduleName}
                className="bg-white"
                data-testid={`input-prenursing-title-${moduleId}`}
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Description Override</p>
              <Input
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                placeholder="Custom module description..."
                className="bg-white"
                data-testid={`input-prenursing-desc-${moduleId}`}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xl font-bold text-gray-900">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-emerald-600" />
            </div>
            <h2>Supplemental Content</h2>
          </div>
          <Button size="sm" variant="outline" className="h-8 text-xs gap-1" onClick={() => setEditContent([...editContent, ""])} data-testid={`button-add-content-${moduleId}`}>
            <Plus className="w-3 h-3" /> Add Paragraph
          </Button>
        </div>
        <p className="text-sm text-gray-500">Additional educational content paragraphs displayed below the module</p>
        <div className="space-y-4">
          {editContent.map((p, idx) => (
            <div key={idx} className="relative group">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <RichTextEditor
                  value={p}
                  onChange={(v) => {
                    const updated = [...editContent];
                    updated[idx] = v;
                    setEditContent(updated);
                  }}
                  minHeight="100px"
                  placeholder="Educational content paragraph..."
                />
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 h-7 w-7 p-0 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setEditContent(editContent.filter((_, i) => i !== idx))}
                data-testid={`button-remove-content-${moduleId}-${idx}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          ))}
          {editContent.length === 0 && (
            <div className="bg-white rounded-xl border border-dashed border-gray-200 p-8 text-center">
              <p className="text-sm text-gray-400">No supplemental content yet. Click "Add Paragraph" to create.</p>
            </div>
          )}
        </div>
      </section>

      <div className="bg-purple-50/60 border border-purple-100 rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-purple-700">
          <Sparkles className="w-4 h-4" />
          AI Content Generation
        </div>
        <div className="flex gap-2">
          <Input
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="e.g. Generate comprehensive content about cell biology for pre-nursing..."
            className="text-sm bg-white"
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
  const [customModules, setCustomModules] = useState<any[]>([]);
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [editingModule, setEditingModule] = useState<any>(null);
  const [activeCustomModule, setActiveCustomModule] = useState<any>(null);
  const { t } = useI18n();
  const { user } = useAuth();
  const { toast } = useToast();
  const { getImageUrl } = useSiteImages();
  const isAdmin = user?.tier === "admin";

  useEffect(() => {
    fetch("/api/custom-modules?page=pre-nursing")
      .then((r) => r.json())
      .then(setCustomModules)
      .catch(() => {});
  }, []);

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

  const deleteCustomModule = async (id: string) => {
    const creds = JSON.parse(localStorage.getItem("nursenest-credentials") || "{}");
    try {
      const res = await fetch(`/api/custom-modules/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: creds.username, password: creds.password }),
      });
      if (!res.ok) throw new Error("Delete failed");
      setCustomModules((prev) => prev.filter((m) => m.id !== id));
      toast({ title: "Module deleted" });
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const iconMap: Record<string, any> = {
    BookOpen, Heart, Brain, Dna, Activity, Pill, Stethoscope, Beaker, FlaskConical, Lightbulb,
    Droplets, Wind, Sparkles, GraduationCap, Target, Layers,
  };

  if (activeCustomModule) {
    const cMod = activeCustomModule;
    const cLessons = (cMod.lessons || []) as { id: string; name: string; status?: string }[];
    const cContent = (cMod.content || {}) as { paragraphs?: string[] };
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
        <SEO title={`Pre-Nursing: ${cMod.title} | NurseNest`} description={cMod.description || "Custom pre-nursing module"} />
        <Navigation />
        <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 py-8 w-full">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setActiveCustomModule(null)}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
              data-testid="button-back-custom-modules"
            >
              <ArrowLeft className="w-4 h-4" /> {t("preNursing.backToModules")}
            </button>
            {isAdmin && (
              <div className="flex gap-2">
                <button
                  onClick={() => { setEditingModule(cMod); setShowModuleModal(true); }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  data-testid="button-edit-custom-module"
                >
                  <Pencil className="w-3.5 h-3.5" /> Edit Module
                </button>
              </div>
            )}
          </div>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              {cMod.imageUrl && (
                <AdminImageOverlay imageKey={`custom-module-${cMod.id}`} src={cMod.imageUrl} isAdmin={isAdmin} className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0" imgClassName="w-full h-full object-contain p-1" />
              )}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800" data-testid="text-custom-module-title">{cMod.title}</h1>
                {cMod.description && <p className="text-slate-500 mt-1">{cMod.description}</p>}
              </div>
            </div>
          </div>
          {cContent.paragraphs && cContent.paragraphs.length > 0 && (
            <div className="mb-8 space-y-4">
              {cContent.paragraphs.map((p: string, i: number) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 text-gray-700 leading-relaxed shadow-sm">{p}</div>
              ))}
            </div>
          )}
          {cLessons.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Lessons</h2>
              {cLessons.map((lesson, idx) => (
                <button
                  key={lesson.id || idx}
                  onClick={() => lesson.id && setLocation(`/lessons/${lesson.id}`)}
                  className="w-full text-left p-4 bg-white rounded-xl border border-gray-200 hover:border-primary/30 hover:shadow-sm transition-all flex items-center justify-between group"
                  data-testid={`custom-lesson-${lesson.id || idx}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", cMod.bgColor || "bg-primary/10", cMod.color || "text-primary")}>
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-gray-900">{lesson.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
          )}
        </main>
        <Footer />
      </div>
    );
  }

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
              sectionOverrides={(moduleOverrides[activeModule] || {}).sections}
            />
          )}

          <ModuleEditContext.Provider
            value={{
              isEditing: isContentEditing && isAdmin,
              sections: (moduleOverrides[activeModule] || {}).sections || {},
              updateSection: (key, data) => {
                setModuleOverrides((prev) => {
                  const current = prev[activeModule] || {};
                  return {
                    ...prev,
                    [activeModule]: {
                      ...current,
                      sections: { ...(current.sections || {}), [key]: data },
                    },
                  };
                });
              },
            }}
          >
            {mc?.component}
          </ModuleEditContext.Provider>
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
            <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 mb-4 leading-tight" data-testid="text-pre-nursing-heading">
              {t("preNursing.pageTitle")}
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-2 leading-relaxed">
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
                <AdminImageOverlay
                  imageKey={`prenursing-module-${mod.id}`}
                  src={mod.image}
                  alt={t(mod.titleKey)}
                  isAdmin={isAdmin}
                  className="h-40 overflow-hidden bg-gray-50"
                  imgClassName="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                />
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", mod.bg, mod.color)}>
                      <mod.icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800">{t(mod.titleKey)}</h3>
                  </div>
                  <p className="text-sm text-slate-400 mb-3">{t(mod.subtitleKey)}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{mod.lessons} {t("preNursing.interactiveLessons")}</span>
                    <ChevronRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </CardContent>
              </Card>
            ))}

            {customModules.map((cMod) => {
              const IconComp = iconMap[cMod.icon] || BookOpen;
              const cLessons = (cMod.lessons || []) as any[];
              return (
                <Card
                  key={cMod.id}
                  className="border border-primary/10 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden bg-white group relative"
                  onClick={() => setActiveCustomModule(cMod)}
                  data-testid={`module-card-custom-${cMod.id}`}
                >
                  {cMod.imageUrl ? (
                    <AdminImageOverlay
                      imageKey={`custom-module-${cMod.id}`}
                      src={cMod.imageUrl}
                      alt={cMod.title}
                      isAdmin={isAdmin}
                      className="h-40 overflow-hidden bg-gray-50"
                      imgClassName="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className={cn("h-40 flex items-center justify-center", cMod.bgColor || "bg-primary/10")}>
                      <IconComp className={cn("w-16 h-16 opacity-30", cMod.color || "text-primary")} />
                    </div>
                  )}
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", cMod.bgColor || "bg-primary/10", cMod.color || "text-primary")}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{cMod.title}</h3>
                    </div>
                    {cMod.description && <p className="text-sm text-gray-500 mb-3">{cMod.description}</p>}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{cLessons.length} lessons</span>
                      <ChevronRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </CardContent>
                  {isAdmin && (
                    <div className="absolute top-2 left-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <button
                        onClick={(e) => { e.stopPropagation(); setEditingModule(cMod); setShowModuleModal(true); }}
                        className="w-7 h-7 rounded-full bg-white/90 shadow-md border border-gray-200 flex items-center justify-center hover:bg-blue-50"
                        data-testid={`button-edit-module-${cMod.id}`}
                      >
                        <Pencil className="w-3 h-3 text-blue-600" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); if (confirm("Delete this module?")) deleteCustomModule(cMod.id); }}
                        className="w-7 h-7 rounded-full bg-white/90 shadow-md border border-gray-200 flex items-center justify-center hover:bg-red-50"
                        data-testid={`button-delete-module-${cMod.id}`}
                      >
                        <Trash2 className="w-3 h-3 text-red-600" />
                      </button>
                    </div>
                  )}
                </Card>
              );
            })}

            {isAdmin && (
              <Card
                className="border-2 border-dashed border-primary/30 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden bg-white/50 group flex items-center justify-center min-h-[280px]"
                onClick={() => { setEditingModule(null); setShowModuleModal(true); }}
                data-testid="button-add-module"
              >
                <div className="text-center space-y-3 p-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                    <Plus className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Add Module</p>
                    <p className="text-xs text-gray-500 mt-1">Create a new learning module</p>
                  </div>
                </div>
              </Card>
            )}
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

      {showModuleModal && (
        <CustomModuleModal
          module={editingModule}
          page="pre-nursing"
          onClose={() => { setShowModuleModal(false); setEditingModule(null); }}
          onSaved={(mod) => {
            if (editingModule) {
              setCustomModules((prev) => prev.map((m) => m.id === mod.id ? mod : m));
              if (activeCustomModule?.id === mod.id) setActiveCustomModule(mod);
            } else {
              setCustomModules((prev) => [...prev, mod]);
            }
            setShowModuleModal(false);
            setEditingModule(null);
          }}
        />
      )}

      <AdminEditButton pageName="pre-nursing" defaultTier="prenursing" defaultCategory="pre-nursing" />
      <Footer />
    </div>
  );
}

const ICON_OPTIONS = [
  { name: "BookOpen", icon: BookOpen },
  { name: "Heart", icon: Heart },
  { name: "Brain", icon: Brain },
  { name: "Dna", icon: Dna },
  { name: "Activity", icon: Activity },
  { name: "Pill", icon: Pill },
  { name: "Stethoscope", icon: Stethoscope },
  { name: "Beaker", icon: Beaker },
  { name: "FlaskConical", icon: FlaskConical },
  { name: "Lightbulb", icon: Lightbulb },
  { name: "Droplets", icon: Droplets },
  { name: "Wind", icon: Wind },
  { name: "Sparkles", icon: Sparkles },
  { name: "GraduationCap", icon: GraduationCap },
  { name: "Target", icon: Target },
  { name: "Layers", icon: Layers },
];

const COLOR_OPTIONS = [
  { label: "Blue", color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Emerald", color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Purple", color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Rose", color: "text-rose-600", bg: "bg-rose-50" },
  { label: "Amber", color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Teal", color: "text-teal-600", bg: "bg-teal-50" },
  { label: "Indigo", color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "Pink", color: "text-pink-600", bg: "bg-pink-50" },
];

function CustomModuleModal({ module, page, onClose, onSaved }: {
  module: any;
  page: string;
  onClose: () => void;
  onSaved: (mod: any) => void;
}) {
  const [title, setTitle] = useState(module?.title || "");
  const [description, setDescription] = useState(module?.description || "");
  const [icon, setIcon] = useState(module?.icon || "BookOpen");
  const [colorIdx, setColorIdx] = useState(() => {
    const idx = COLOR_OPTIONS.findIndex((c) => c.color === module?.color);
    return idx >= 0 ? idx : 0;
  });
  const [imageUrl, setImageUrl] = useState(module?.imageUrl || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lessons, setLessons] = useState<{ id: string; name: string }[]>(
    module?.lessons ? (module.lessons as any[]) : []
  );
  const [paragraphs, setParagraphs] = useState<string[]>(
    module?.content?.paragraphs || []
  );
  const [newLessonName, setNewLessonName] = useState("");
  const [newLessonId, setNewLessonId] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const res = await fetch("/api/uploads/request-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: file.name, size: file.size, contentType: file.type || "image/png" }),
      });
      if (!res.ok) throw new Error("Failed to get upload URL");
      const { uploadURL, objectPath } = await res.json();
      const uploadRes = await fetch(uploadURL, { method: "PUT", body: file, headers: { "Content-Type": file.type || "image/png" } });
      if (!uploadRes.ok) throw new Error("Upload failed");
      setImageUrl(objectPath);
    } catch (e: any) {
      toast({ title: "Upload error", description: e.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) { toast({ title: "Title is required", variant: "destructive" }); return; }
    setSaving(true);
    const creds = JSON.parse(localStorage.getItem("nursenest-credentials") || "{}");
    const selectedColor = COLOR_OPTIONS[colorIdx];
    const body = {
      page,
      title: title.trim(),
      description: description.trim() || null,
      icon,
      color: selectedColor.color,
      bgColor: selectedColor.bg,
      imageUrl: imageUrl || null,
      lessons,
      content: { paragraphs: paragraphs.filter((p) => p.trim()) },
      username: creds.username,
      password: creds.password,
    };
    try {
      const url = module ? `/api/custom-modules/${module.id}` : "/api/custom-modules";
      const method = module ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error("Save failed");
      const saved = await res.json();
      toast({ title: module ? "Module updated" : "Module created" });
      onSaved(saved);
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-5 my-8 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()} data-testid="modal-custom-module">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{module ? "Edit Module" : "Add New Module"}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Title *</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Module title" data-testid="input-module-title" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description of the module" rows={2} data-testid="input-module-description" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Icon</label>
            <div className="flex flex-wrap gap-2">
              {ICON_OPTIONS.map((opt) => (
                <button
                  key={opt.name}
                  onClick={() => setIcon(opt.name)}
                  className={cn("w-9 h-9 rounded-lg flex items-center justify-center border-2 transition-all", icon === opt.name ? "border-primary bg-primary/10" : "border-gray-200 hover:border-gray-300")}
                  title={opt.name}
                >
                  <opt.icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Color Theme</label>
            <div className="flex flex-wrap gap-2">
              {COLOR_OPTIONS.map((opt, idx) => (
                <button
                  key={opt.label}
                  onClick={() => setColorIdx(idx)}
                  className={cn("px-3 py-1.5 rounded-lg text-sm font-medium border-2 transition-all", opt.bg, opt.color, colorIdx === idx ? "border-current ring-1 ring-current" : "border-transparent")}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Module Image</label>
            {imageUrl && (
              <div className="mb-2 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                <img src={imageUrl} alt="Module" className="w-full h-32 object-contain p-2" />
              </div>
            )}
            <div className="flex gap-2">
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); }} />
              <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()} disabled={uploading} className="gap-2" data-testid="button-upload-module-image">
                {uploading ? <><Loader2 className="w-3 h-3 animate-spin" /> Uploading...</> : <><Upload className="w-3 h-3" /> Upload</>}
              </Button>
              <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Or paste image URL" className="flex-1 text-sm h-9" data-testid="input-module-image-url" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Content Paragraphs</label>
            <div className="space-y-2">
              {paragraphs.map((p, idx) => (
                <div key={idx} className="flex gap-2">
                  <Textarea value={p} onChange={(e) => { const updated = [...paragraphs]; updated[idx] = e.target.value; setParagraphs(updated); }} rows={2} className="flex-1 text-sm" />
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-red-500" onClick={() => setParagraphs(paragraphs.filter((_, i) => i !== idx))}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => setParagraphs([...paragraphs, ""])} className="gap-1">
                <Plus className="w-3 h-3" /> Add Paragraph
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Lessons</label>
            <div className="space-y-2">
              {lessons.map((l, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                  <BookOpen className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-700 flex-1">{l.name}</span>
                  <span className="text-xs text-gray-400">{l.id}</span>
                  <button onClick={() => setLessons(lessons.filter((_, i) => i !== idx))} className="text-red-400 hover:text-red-600">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <Input value={newLessonName} onChange={(e) => setNewLessonName(e.target.value)} placeholder="Lesson name" className="flex-1 text-sm h-9" data-testid="input-lesson-name" />
                <Input value={newLessonId} onChange={(e) => setNewLessonId(e.target.value)} placeholder="lesson-slug" className="w-32 text-sm h-9" data-testid="input-lesson-id" />
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9"
                  disabled={!newLessonName.trim()}
                  onClick={() => {
                    if (newLessonName.trim()) {
                      const slug = newLessonId.trim() || newLessonName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
                      setLessons([...lessons, { id: slug, name: newLessonName.trim() }]);
                      setNewLessonName("");
                      setNewLessonId("");
                    }
                  }}
                  data-testid="button-add-lesson"
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button onClick={handleSave} disabled={saving || !title.trim()} className="flex-1 gap-2" data-testid="button-save-module">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {module ? "Save Changes" : "Create Module"}
          </Button>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}

function CellBiologyModule() {
  const { isEditing, sections, updateSection } = useModuleEdit();
  return (
    <div className="space-y-8" data-testid="module-cell-biology">
      <div>
        <EditableModuleText sectionKey="cell-bio-title" defaultText="Cell Biology" as="h2" className="text-2xl font-bold text-slate-800 mb-2" />
        <EditableModuleText sectionKey="cell-bio-desc" defaultText="Explore the building blocks of the human body through interactive diagrams and concept checks." as="p" className="text-slate-500" multiline />
      </div>

      <MicroLesson title={sections["cell-bio-human-cell-title"]?.content || "The Human Cell"} subtitle={sections["cell-bio-human-cell-subtitle"]?.content || "Identify key organelles and their functions"} icon={<Dna className="w-5 h-5" />}>
        {isEditing ? (
          <>
            <div className="flex gap-2 mb-2">
              <input value={sections["cell-bio-human-cell-title"]?.content || "The Human Cell"} onChange={(e) => updateSection("cell-bio-human-cell-title", { content: e.target.value })} className="flex-1 bg-white/80 border border-purple-200 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-purple-300 focus:outline-none" placeholder="Section title..." />
              <input value={sections["cell-bio-human-cell-subtitle"]?.content || "Identify key organelles and their functions"} onChange={(e) => updateSection("cell-bio-human-cell-subtitle", { content: e.target.value })} className="flex-1 bg-white/80 border border-purple-200 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-purple-300 focus:outline-none" placeholder="Subtitle..." />
            </div>
          </>
        ) : null}
        <EditableModuleText sectionKey="cell-bio-human-cell-content" defaultText="Every cell contains specialized structures called organelles that work together to maintain life. Understanding cell structure is the foundation for understanding how diseases affect the body at the cellular level." as="p" className="text-sm text-slate-600 leading-relaxed" multiline />
        <CognitiveCard
          type="concept"
          title="Why This Matters for Nursing"
          content={sections["cell-bio-nursing-concept"]?.content || "When you learn pathophysiology, you'll trace disease mechanisms back to cellular dysfunction. For example, MI (heart attack) starts with ischemia → cellular hypoxia → mitochondrial failure → cell death."}
        />
        {isEditing && (
          <RichTextEditor value={sections["cell-bio-nursing-concept"]?.content || "When you learn pathophysiology, you'll trace disease mechanisms back to cellular dysfunction. For example, MI (heart attack) starts with ischemia → cellular hypoxia → mitochondrial failure → cell death."} onChange={(v) => updateSection("cell-bio-nursing-concept", { content: v })} className="mt-2" minHeight="60px" placeholder="Cognitive card content..." />
        )}
      </MicroLesson>

      <AnatomyLabeling
        title="Cell Structure: Click to Identify"
        description="Click each point to reveal the organelle name. Can you identify all 12?"
        backgroundImage={cellStructureImage}
        labels={cellLabels}
        width={600}
        height={450}
      />

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm" data-testid="organelle-gallery">
        <h3 className="text-lg font-bold text-slate-800 mb-1">Organelle Deep Dive</h3>
        <p className="text-sm text-slate-500 mb-5">Explore each organelle's structure and clinical significance</p>
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            { img: organelleCellMembrane, name: "Cell Membrane", color: "teal", desc: "The phospholipid bilayer forms a selectively permeable barrier with embedded integral proteins, channel proteins, and cholesterol. It controls ion and molecule transport through passive diffusion, facilitated diffusion, and active transport (Na⁺/K⁺ ATPase). Glycoprotein receptors on the surface mediate cell signaling and immune recognition.", clinical: "Defects in membrane transport proteins cause cystic fibrosis (CFTR channel) and familial hypercholesterolemia (LDL receptor)." },
            { img: organelleNucleus, name: "Nucleus", color: "purple", desc: "The command center of the cell, enclosed by a double nuclear envelope with nuclear pores that regulate macromolecule transport. Contains chromatin (DNA wound around histone proteins) that condenses into chromosomes during division. The nucleolus inside assembles ribosomal subunits from rRNA.", clinical: "Cancer often involves mutations in nuclear DNA repair mechanisms (BRCA1/2, p53). The nucleolus enlarges in rapidly dividing cancer cells." },
            { img: organelleMitochondria, name: "Mitochondria", color: "green", desc: "The powerhouse of the cell with a double membrane — the inner membrane folds into cristae to maximize surface area for the electron transport chain. Produces ~36 ATP per glucose molecule through oxidative phosphorylation. Contains its own circular mtDNA inherited exclusively from the mother.", clinical: "Mitochondrial dysfunction contributes to heart failure, neurodegenerative diseases, and aging. Cyanide poisoning works by blocking Complex IV of the electron transport chain." },
            { img: organelleRoughER, name: "Rough Endoplasmic Reticulum", color: "blue", desc: "An extensive folded membrane network studded with ribosomes, continuous with the nuclear envelope. Responsible for co-translational protein folding, N-linked glycosylation, and quality control of newly synthesized proteins. Especially prominent in cells with high secretory output like plasma cells and pancreatic acinar cells.", clinical: "ER stress from misfolded proteins triggers the unfolded protein response (UPR), implicated in diabetes, Alzheimer's, and Parkinson's disease." },
            { img: organelleGolgi, name: "Golgi Apparatus", color: "amber", desc: "Stacked flattened membrane cisternae that receive proteins from the ER at the cis face and process them through post-translational modifications including glycosylation, phosphorylation, and sulfation. The trans face sorts and packages proteins into vesicles for secretion, lysosomal targeting, or membrane insertion.", clinical: "I-cell disease (mucolipidosis II) results from failure to add mannose-6-phosphate tags in the Golgi, causing enzymes to be secreted instead of delivered to lysosomes." },
            { img: organelleLysosome, name: "Lysosomes", color: "red", desc: "Membrane-bound vesicles maintaining an acidic interior (pH ~5) filled with over 50 types of acid hydrolase enzymes. They digest materials from autophagy (recycling old organelles), phagocytosis (destroying pathogens), and endocytosis. Essential for cellular housekeeping and programmed cell death.", clinical: "Lysosomal storage diseases (Tay-Sachs, Gaucher, Pompe) result from deficiency of specific hydrolases, causing toxic accumulation of undigested substrates." },
          ].map((organelle, idx) => {
            const colorMap: Record<string, { bg: string; border: string; title: string; badge: string }> = {
              teal: { bg: "bg-teal-50/60", border: "border-teal-200", title: "text-teal-800", badge: "bg-teal-100 text-teal-700" },
              purple: { bg: "bg-purple-50/60", border: "border-purple-200", title: "text-purple-800", badge: "bg-purple-100 text-purple-700" },
              green: { bg: "bg-green-50/60", border: "border-green-200", title: "text-green-800", badge: "bg-green-100 text-green-700" },
              blue: { bg: "bg-blue-50/60", border: "border-blue-200", title: "text-blue-800", badge: "bg-blue-100 text-blue-700" },
              amber: { bg: "bg-amber-50/60", border: "border-amber-200", title: "text-amber-800", badge: "bg-amber-100 text-amber-700" },
              red: { bg: "bg-red-50/60", border: "border-red-200", title: "text-red-800", badge: "bg-red-100 text-red-700" },
            };
            const c = colorMap[organelle.color];
            return (
              <div key={idx} className={`rounded-xl ${c.bg} ${c.border} border p-4`} data-testid={`organelle-card-${idx}`}>
                <div className="flex justify-center mb-3">
                  <img src={organelle.img} alt={organelle.name} className="w-40 h-40 object-contain rounded-lg" />
                </div>
                <h4 className={`font-semibold text-sm ${c.title} mb-1`}>{organelle.name}</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-2">{organelle.desc}</p>
                <div className={`text-xs ${c.badge} rounded-lg px-2.5 py-1.5 inline-block`}>
                  <span className="font-semibold">Clinical:</span> {organelle.clinical}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <MatchingExercise
        title="Organelle Function Matching"
        description="Match each organelle to its primary function"
        pairs={[
          { id: "m1", term: "Mitochondria", definition: "Oxidative phosphorylation — ATP production via electron transport chain" },
          { id: "m2", term: "Nucleus", definition: "Houses chromatin (DNA); controls transcription & mRNA processing" },
          { id: "m3", term: "Ribosomes", definition: "Translate mRNA into polypeptide chains (protein synthesis)" },
          { id: "m4", term: "Golgi Apparatus", definition: "Post-translational modification, protein sorting & vesicle packaging" },
          { id: "m5", term: "Lysosomes", definition: "Acid hydrolase vesicles — autophagy & intracellular digestion" },
          { id: "m6", term: "Cell Membrane", definition: "Phospholipid bilayer — selective permeability & signal transduction" },
          { id: "m7", term: "Rough ER", definition: "Ribosome-studded — co-translational protein folding & glycosylation" },
          { id: "m8", term: "Smooth ER", definition: "Lipid/steroid synthesis, Ca²⁺ storage, drug detoxification" },
          { id: "m9", term: "Peroxisomes", definition: "Fatty acid β-oxidation & H₂O₂ detoxification via catalase" },
          { id: "m10", term: "Centrioles", definition: "Organize mitotic spindle; form basal bodies of cilia" },
        ]}
      />

      <MicroLesson title={sections["cell-bio-transport-title"]?.content || "Membrane Transport"} subtitle={sections["cell-bio-transport-subtitle"]?.content || "How substances move in and out of cells"} icon={<Layers className="w-5 h-5" />}>
        {isEditing ? (
          <div className="flex gap-2 mb-2">
            <input value={sections["cell-bio-transport-title"]?.content || "Membrane Transport"} onChange={(e) => updateSection("cell-bio-transport-title", { content: e.target.value })} className="flex-1 bg-white/80 border border-purple-200 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-purple-300 focus:outline-none" placeholder="Section title..." />
            <input value={sections["cell-bio-transport-subtitle"]?.content || "How substances move in and out of cells"} onChange={(e) => updateSection("cell-bio-transport-subtitle", { content: e.target.value })} className="flex-1 bg-white/80 border border-purple-200 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-purple-300 focus:outline-none" placeholder="Subtitle..." />
          </div>
        ) : null}
        <CognitiveCard
          type="remember"
          title="Key Principle"
          content={sections["cell-bio-transport-principle"]?.content || "'Water chases salt': water moves toward areas of higher solute concentration through osmosis. This explains why IV normal saline stays in the vasculature while free water distributes across compartments."}
        />
        {isEditing && (
          <RichTextEditor value={sections["cell-bio-transport-principle"]?.content || "'Water chases salt': water moves toward areas of higher solute concentration through osmosis. This explains why IV normal saline stays in the vasculature while free water distributes across compartments."} onChange={(v) => updateSection("cell-bio-transport-principle", { content: v })} className="mt-2" minHeight="60px" placeholder="Key principle content..." />
        )}
        <div className="grid sm:grid-cols-2 gap-3 mt-3">
          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100">
            <div className="flex justify-center mb-3">
              <img src={transportPassive} alt="Passive transport across cell membrane" className="w-full max-w-xs h-auto rounded-lg" data-testid="img-passive-transport" />
            </div>
            <p className="text-xs font-semibold text-blue-700 mb-1">Passive Transport</p>
            <EditableModuleText sectionKey="cell-bio-passive-transport" defaultText="No energy needed. Moves DOWN concentration gradient. Examples: diffusion, osmosis, facilitated diffusion." as="p" className="text-xs text-blue-600" multiline />
          </div>
          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-100">
            <div className="flex justify-center mb-3">
              <img src={transportActive} alt="Active transport across cell membrane" className="w-full max-w-xs h-auto rounded-lg" data-testid="img-active-transport" />
            </div>
            <p className="text-xs font-semibold text-amber-700 mb-1">Active Transport</p>
            <EditableModuleText sectionKey="cell-bio-active-transport" defaultText="Requires ATP energy. Moves AGAINST concentration gradient. Example: Na+/K+ pump (3 Na+ out, 2 K+ in)." as="p" className="text-xs text-amber-600" multiline />
          </div>
        </div>
      </MicroLesson>

      <SelfCheckQuiz title="Cell Biology Check" questions={cellBiologyQuiz} />
    </div>
  );
}

function PhysiologyModule() {
  const { isEditing, sections, updateSection } = useModuleEdit();
  return (
    <div className="space-y-8" data-testid="module-physiology">
      <div>
        <EditableModuleText sectionKey="phys-title" defaultText="Physiology Principles" as="h2" className="text-2xl font-bold text-slate-800 mb-2" />
        <EditableModuleText sectionKey="phys-desc" defaultText="Understand how the body maintains balance through feedback loops, fluid management, and acid-base regulation." as="p" className="text-slate-500" multiline />
      </div>

      <MicroLesson title={sections["phys-feedback-title"]?.content || "Negative Feedback Loops"} subtitle={sections["phys-feedback-subtitle"]?.content || "The body's primary regulatory mechanism"} icon={<Activity className="w-5 h-5" />}>
        {isEditing && (
          <div className="flex gap-2 mb-2">
            <input value={sections["phys-feedback-title"]?.content || "Negative Feedback Loops"} onChange={(e) => updateSection("phys-feedback-title", { content: e.target.value })} className="flex-1 bg-white/80 border border-purple-200 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-purple-300 focus:outline-none" placeholder="Section title..." />
            <input value={sections["phys-feedback-subtitle"]?.content || "The body's primary regulatory mechanism"} onChange={(e) => updateSection("phys-feedback-subtitle", { content: e.target.value })} className="flex-1 bg-white/80 border border-purple-200 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-purple-300 focus:outline-none" placeholder="Subtitle..." />
          </div>
        )}
        <EditableModuleText sectionKey="phys-feedback-content" defaultText="Most physiological regulation uses negative feedback. The body detects a change, activates a response, and reverses the change to restore balance." as="p" className="text-sm text-slate-600 leading-relaxed" multiline />
        <div className="flex justify-center my-4">
          <img src={feedbackLoopImage} alt="Negative feedback loop for thermoregulation" className="w-full max-w-sm h-auto rounded-xl border border-slate-200 shadow-sm" data-testid="img-feedback-loop" />
        </div>
        <CognitiveCard
          type="concept"
          title="Clinical Connection"
          content={sections["phys-feedback-concept"]?.content || "When you see a compensatory vital sign change in a patient (e.g., tachycardia in response to bleeding), you're witnessing negative feedback trying to maintain cardiac output."}
        />
        {isEditing && (
          <RichTextEditor value={sections["phys-feedback-concept"]?.content || "When you see a compensatory vital sign change in a patient (e.g., tachycardia in response to bleeding), you're witnessing negative feedback trying to maintain cardiac output."} onChange={(v) => updateSection("phys-feedback-concept", { content: v })} className="mt-2" minHeight="60px" placeholder="Cognitive card content..." />
        )}
      </MicroLesson>

      <StepSequencing
        title="Thermoregulation Sequence"
        description="Arrange the steps of the negative feedback loop for body temperature regulation"
        steps={physiologySequence}
      />

      <MicroLesson title={sections["phys-fluid-title"]?.content || "Fluid Compartments"} subtitle={sections["phys-fluid-subtitle"]?.content || "Where body water is distributed"} icon={<Droplets className="w-5 h-5" />}>
        {isEditing && (
          <div className="flex gap-2 mb-2">
            <input value={sections["phys-fluid-title"]?.content || "Fluid Compartments"} onChange={(e) => updateSection("phys-fluid-title", { content: e.target.value })} className="flex-1 bg-white/80 border border-purple-200 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-purple-300 focus:outline-none" placeholder="Section title..." />
            <input value={sections["phys-fluid-subtitle"]?.content || "Where body water is distributed"} onChange={(e) => updateSection("phys-fluid-subtitle", { content: e.target.value })} className="flex-1 bg-white/80 border border-purple-200 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-purple-300 focus:outline-none" placeholder="Subtitle..." />
          </div>
        )}
        <div className="flex justify-center my-4">
          <img src={fluidCompartmentsImage} alt="Body fluid compartments showing intracellular, interstitial, and intravascular fluids" className="w-full max-w-sm h-auto rounded-xl border border-slate-200 shadow-sm" data-testid="img-fluid-compartments" />
        </div>
        <div className="space-y-3">
          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-blue-700">Intracellular Fluid (ICF)</p>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">~67%</span>
            </div>
            <EditableModuleText sectionKey="phys-icf" defaultText="Inside cells. Contains K+, Mg2+, PO4³⁻. The largest fluid compartment." as="p" className="text-xs text-blue-600" multiline />
          </div>
          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-emerald-700">Extracellular Fluid (ECF)</p>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">~33%</span>
            </div>
            <EditableModuleText sectionKey="phys-ecf" defaultText="Outside cells. Includes intravascular (plasma) and interstitial (between cells). Contains Na+, Cl⁻, HCO3⁻." as="p" className="text-xs text-emerald-600" multiline />
          </div>
        </div>
        <CognitiveCard
          type="remember"
          title="Memory Aid"
          content={sections["phys-fluid-memory"]?.content || "'K+ stays IN the cell, Na+ stays OUT.' This is maintained by the Na+/K+ ATPase pump. When cells are damaged (trauma, burns), K+ leaks out → hyperkalemia risk."}
        />
        {isEditing && (
          <RichTextEditor value={sections["phys-fluid-memory"]?.content || "'K+ stays IN the cell, Na+ stays OUT.' This is maintained by the Na+/K+ ATPase pump. When cells are damaged (trauma, burns), K+ leaks out → hyperkalemia risk."} onChange={(v) => updateSection("phys-fluid-memory", { content: v })} className="mt-2" minHeight="60px" placeholder="Memory aid content..." />
        )}
      </MicroLesson>

      <AnatomyLabeling
        title="Heart Anatomy: Click to Identify"
        description="Identify the major structures of the heart"
        backgroundImage={heartAnatomyImage}
        labels={heartLabels}
        width={600}
        height={450}
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
  const { isEditing, sections, updateSection } = useModuleEdit();
  return (
    <div className="space-y-8" data-testid="module-terminology">
      <div>
        <EditableModuleText sectionKey="term-title" defaultText="Medical Terminology" as="h2" className="text-2xl font-bold text-slate-800 mb-2" />
        <EditableModuleText sectionKey="term-desc" defaultText="Decode clinical language by mastering the building blocks: prefixes, suffixes, and root words." as="p" className="text-slate-500" multiline />
      </div>

      <MicroLesson title={sections["term-how-title"]?.content || "How Medical Terms Work"} subtitle={sections["term-how-subtitle"]?.content || "Breaking down clinical vocabulary"} icon={<BookOpen className="w-5 h-5" />}>
        {isEditing && (
          <div className="flex gap-2 mb-2">
            <input value={sections["term-how-title"]?.content || "How Medical Terms Work"} onChange={(e) => updateSection("term-how-title", { content: e.target.value })} className="flex-1 bg-white/80 border border-purple-200 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-purple-300 focus:outline-none" placeholder="Section title..." />
            <input value={sections["term-how-subtitle"]?.content || "Breaking down clinical vocabulary"} onChange={(e) => updateSection("term-how-subtitle", { content: e.target.value })} className="flex-1 bg-white/80 border border-purple-200 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-purple-300 focus:outline-none" placeholder="Subtitle..." />
          </div>
        )}
        <EditableModuleText sectionKey="term-how-content" defaultText="Most medical terms are combinations of prefixes (word parts added to the beginning), root words (the core identifying the body part), and suffixes (word endings indicating a condition or procedure)." as="p" className="text-sm text-slate-600 leading-relaxed" multiline />
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
  const { isEditing, sections, updateSection } = useModuleEdit();
  return (
    <div className="space-y-8" data-testid="module-pharmacology">
      <div>
        <EditableModuleText sectionKey="pharm-title" defaultText="Intro Pharmacology" as="h2" className="text-2xl font-bold text-slate-800 mb-2" />
        <EditableModuleText sectionKey="pharm-desc" defaultText="Understand how drugs interact with the body at the receptor level: the foundation for medication safety." as="p" className="text-slate-500" multiline />
      </div>

      <MicroLesson title={sections["pharm-receptor-title"]?.content || "Drug-Receptor Basics"} subtitle={sections["pharm-receptor-subtitle"]?.content || "How medications produce their effects"} icon={<Pill className="w-5 h-5" />}>
        {isEditing && (
          <div className="flex gap-2 mb-2">
            <input value={sections["pharm-receptor-title"]?.content || "Drug-Receptor Basics"} onChange={(e) => updateSection("pharm-receptor-title", { content: e.target.value })} className="flex-1 bg-white/80 border border-purple-200 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-purple-300 focus:outline-none" placeholder="Section title..." />
            <input value={sections["pharm-receptor-subtitle"]?.content || "How medications produce their effects"} onChange={(e) => updateSection("pharm-receptor-subtitle", { content: e.target.value })} className="flex-1 bg-white/80 border border-purple-200 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-purple-300 focus:outline-none" placeholder="Subtitle..." />
          </div>
        )}
        <EditableModuleText sectionKey="pharm-receptor-content" defaultText="Most drugs work by binding to receptors on cells. The drug-receptor interaction determines whether the drug activates or blocks a cellular response." as="p" className="text-sm text-slate-600 leading-relaxed" multiline />
        <div className="grid sm:grid-cols-2 gap-3 mt-3">
          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
            <p className="text-sm font-semibold text-emerald-700 mb-1">Agonist</p>
            <EditableModuleText sectionKey="pharm-agonist" defaultText="Binds to receptor and ACTIVATES it. Mimics the natural ligand. Example: Morphine (opioid agonist)" as="p" className="text-xs text-emerald-600" multiline />
          </div>
          <div className="p-4 bg-red-50/60 rounded-xl border border-red-100">
            <p className="text-sm font-semibold text-red-700 mb-1">Antagonist</p>
            <EditableModuleText sectionKey="pharm-antagonist" defaultText="Binds to receptor and BLOCKS it. Prevents the natural ligand from activating. Example: Naloxone (opioid antagonist)" as="p" className="text-xs text-red-600" multiline />
          </div>
        </div>
        <CognitiveCard
          type="tip"
          title="Clinical Connection"
          content={sections["pharm-receptor-clinical"]?.content || "Naloxone reverses opioid overdose by competing for the same receptors. It's an antagonist that displaces the agonist (morphine/fentanyl) from opioid receptors."}
        />
        {isEditing && (
          <RichTextEditor value={sections["pharm-receptor-clinical"]?.content || "Naloxone reverses opioid overdose by competing for the same receptors. It's an antagonist that displaces the agonist (morphine/fentanyl) from opioid receptors."} onChange={(v) => updateSection("pharm-receptor-clinical", { content: v })} className="mt-2" minHeight="60px" placeholder="Clinical connection..." />
        )}
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
  const { isEditing, sections, updateSection } = useModuleEdit();
  return (
    <div className="space-y-8" data-testid="module-pathophysiology">
      <div>
        <EditableModuleText sectionKey="patho-title" defaultText="Intro Pathophysiology" as="h2" className="text-2xl font-bold text-slate-800 mb-2" />
        <EditableModuleText sectionKey="patho-desc" defaultText="Learn to think like a clinician: trace disease mechanisms, recognize compensation, and differentiate early from late signs." as="p" className="text-slate-500" multiline />
      </div>

      <MicroLesson title={sections["patho-disease-title"]?.content || "Disease = Disrupted Homeostasis"} subtitle={sections["patho-disease-subtitle"]?.content || "Understanding why symptoms happen"} icon={<Stethoscope className="w-5 h-5" />}>
        {isEditing && (
          <div className="flex gap-2 mb-2">
            <input value={sections["patho-disease-title"]?.content || "Disease = Disrupted Homeostasis"} onChange={(e) => updateSection("patho-disease-title", { content: e.target.value })} className="flex-1 bg-white/80 border border-purple-200 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-purple-300 focus:outline-none" placeholder="Section title..." />
            <input value={sections["patho-disease-subtitle"]?.content || "Understanding why symptoms happen"} onChange={(e) => updateSection("patho-disease-subtitle", { content: e.target.value })} className="flex-1 bg-white/80 border border-purple-200 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-purple-300 focus:outline-none" placeholder="Subtitle..." />
          </div>
        )}
        <EditableModuleText sectionKey="patho-disease-content" defaultText="Every disease is a story of homeostasis being disrupted. The body compensates to maintain function, but eventually those mechanisms fail. Understanding this progression is the key to clinical reasoning." as="p" className="text-sm text-slate-600 leading-relaxed" multiline />
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
          content={sections["patho-exam-trap"]?.content || "Exams test whether you can recognize EARLY signs (when intervention matters most), not late signs (when it may be too late). Tachycardia is often the first sign of deterioration."}
        />
        {isEditing && (
          <RichTextEditor value={sections["patho-exam-trap"]?.content || "Exams test whether you can recognize EARLY signs (when intervention matters most), not late signs (when it may be too late). Tachycardia is often the first sign of deterioration."} onChange={(v) => updateSection("patho-exam-trap", { content: v })} className="mt-2" minHeight="60px" placeholder="Exam trap content..." />
        )}
      </MicroLesson>

      <SpotAbnormality
        title="Spot the Abnormal Findings"
        scenario="A 68-year-old patient was admitted 2 hours ago with complaints of increasing shortness of breath and chest tightness. The nurse obtains the following assessment findings:"
        findings={pathoFindings}
      />

      <AnatomyLabeling
        title="Respiratory Anatomy: Click to Identify"
        description="Identify the major respiratory structures"
        backgroundImage={lungsAnatomyImage}
        labels={lungLabels}
        width={600}
        height={450}
      />

      <MicroLesson title="Compensation Mechanisms" subtitle="How the body buys time" icon={<Lightbulb className="w-5 h-5" />}>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-purple-50/60 rounded-xl border border-purple-200 p-4">
            <div className="flex justify-center mb-3">
              <img src={brainAnatomyImage} alt="Brain sagittal cross-section" className="w-full max-w-[200px] h-auto rounded-lg" data-testid="img-brain-anatomy" />
            </div>
            <h4 className="font-semibold text-sm text-purple-800 mb-1">Brain (Medulla Oblongata)</h4>
            <p className="text-xs text-slate-600">The brainstem controls autonomic cardiovascular and respiratory responses. The medulla detects changes in blood pH and CO₂ levels, triggering compensatory breathing adjustments.</p>
          </div>
          <div className="bg-amber-50/60 rounded-xl border border-amber-200 p-4">
            <div className="flex justify-center mb-3">
              <img src={kidneyAnatomyImage} alt="Kidney cross-section" className="w-full max-w-[200px] h-auto rounded-lg" data-testid="img-kidney-anatomy" />
            </div>
            <h4 className="font-semibold text-sm text-amber-800 mb-1">Kidney</h4>
            <p className="text-xs text-slate-600">The kidneys regulate fluid balance, electrolytes, and acid-base status by adjusting reabsorption and secretion in the nephrons. Renal compensation takes 24-48 hours to take full effect.</p>
          </div>
        </div>
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
