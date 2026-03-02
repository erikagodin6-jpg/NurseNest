import { useState, useMemo } from "react";
import { useParams, Link } from "wouter";
import { CAREER_CONFIGS, type CareerConfig } from "@shared/careers";
import { Brain, ChevronRight, RotateCcw, ChevronLeft, ChevronRight as ChevronRightIcon, ThumbsUp, ThumbsDown, Eye } from "lucide-react";

const ALLIED_CAREER_MAP: Record<string, CareerConfig> = {
  rrt: CAREER_CONFIGS.rrt, paramedic: CAREER_CONFIGS.paramedic,
  "pharmacy-tech": CAREER_CONFIGS.pharmacyTech, mlt: CAREER_CONFIGS.mlt, imaging: CAREER_CONFIGS.imaging,
};

function generateFlashcards(career: CareerConfig) {
  const cards: { id: number; front: string; back: string; domain: string; difficulty: number }[] = [];
  const templates: Record<string, { fronts: string[]; backs: string[] }> = {
    rrt: {
      fronts: ["What is the normal PaO2 range?", "What ventilator mode provides full respiratory support?", "Primary cause of respiratory alkalosis?", "Henderson-Hasselbalch equation component for pH?", "What does FiO2 stand for?", "Normal tidal volume range?", "What is auto-PEEP?", "Indication for CPAP?", "What causes right shift in oxyhemoglobin curve?", "Normal SpO2 range?"],
      backs: ["80-100 mmHg", "Assist-Control (AC) mode", "Hyperventilation / excessive CO2 elimination", "pH = pKa + log([HCO3-]/[H2CO3])", "Fraction of Inspired Oxygen", "6-8 mL/kg ideal body weight", "Air trapping causing positive pressure at end-expiration", "Obstructive sleep apnea, mild COPD, cardiogenic pulmonary edema", "Increased temperature, acidosis, increased 2,3-DPG, hypercapnia", "95-100%"],
    },
    paramedic: {
      fronts: ["Normal adult heart rate range?", "Glasgow Coma Scale range?", "SAMPLE history stands for?", "First-line drug for anaphylaxis?", "Normal capillary refill time?", "Signs of tension pneumothorax?", "APGAR score components?", "Rule of Nines for adult trunk?", "Cushing's triad indicates?", "Dose of epinephrine in cardiac arrest?"],
      backs: ["60-100 bpm", "3-15", "Signs/Symptoms, Allergies, Medications, Past history, Last meal, Events", "Epinephrine (IM 0.3-0.5mg 1:1000)", "Less than 2 seconds", "Tracheal deviation, absent breath sounds, JVD, hypotension, tachycardia", "Appearance, Pulse, Grimace, Activity, Respiration", "36% (18% front, 18% back)", "Increased ICP (hypertension, bradycardia, irregular respirations)", "1mg (1:10,000) IV/IO every 3-5 minutes"],
    },
    "pharmacy-tech": {
      fronts: ["1 grain equals how many mg?", "What is a laminar flow hood used for?", "NDC number structure?", "Sig code 'bid' means?", "What is compounding?", "Schedule II drug examples?", "What does DAW mean?", "Normal saline concentration?", "Dilution formula?", "What are auxiliary labels?"],
      backs: ["64.8 mg (approximately 65 mg)", "Sterile compounding - provides HEPA-filtered air", "5-4-2 digit format (Labeler-Product-Package)", "Twice daily (bis in die)", "Preparing a customized medication for a patient", "Oxycodone, morphine, fentanyl, methylphenidate", "Dispense As Written", "0.9% NaCl", "C1V1 = C2V2", "Additional warning/instruction labels placed on prescriptions"],
    },
    mlt: {
      fronts: ["Normal WBC count range?", "What does ESR measure?", "Blood type with no antigens?", "Normal platelet count?", "What is a critical value?", "Westgard rule 1-2s means?", "Normal hemoglobin for adult male?", "What is a differential count?", "Direct vs indirect Coombs test?", "Normal glucose range (fasting)?"],
      backs: ["4,500-11,000/mcL", "Rate of red blood cell sedimentation - inflammation marker", "Type O (has anti-A and anti-B antibodies)", "150,000-400,000/mcL", "A lab result requiring immediate physician notification", "One control exceeds 2 standard deviations - warning rule", "14-18 g/dL", "Percentage of each WBC type in peripheral blood", "Direct: detects antibodies on RBCs. Indirect: detects antibodies in serum", "70-100 mg/dL"],
    },
    imaging: {
      fronts: ["What does ALARA stand for?", "kVp controls what in an x-ray?", "What is the bucky?", "Normal adult effective dose for chest x-ray?", "What causes motion blur?", "MRI contraindication?", "What is SID?", "Contrast media reaction types?", "What projection is PA chest?", "Lead apron minimum thickness?"],
      backs: ["As Low As Reasonably Achievable", "Penetrating power of x-ray beam (contrast)", "Grid device that reduces scatter radiation", "Approximately 0.02 mSv", "Patient movement during exposure", "Ferromagnetic implants, pacemakers (some), metallic foreign bodies", "Source-to-Image Distance", "Mild (hives, nausea), Moderate (bronchospasm), Severe (anaphylaxis)", "Posteroanterior - x-ray enters back, exits chest to film", "0.5 mm lead equivalent"],
    },
  };

  const t = templates[career.slug] || templates.rrt;
  t.fronts.forEach((front, i) => {
    cards.push({ id: i, front, back: t.backs[i] || "Study this concept further.", domain: career.domains[i % career.domains.length], difficulty: (i % 3) + 1 });
  });
  return cards;
}

export default function AlliedFlashcardsPage() {
  const params = useParams<{ careerSlug: string }>();
  const career = ALLIED_CAREER_MAP[params.careerSlug || ""];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<number>>(new Set());
  const [unknown, setUnknown] = useState<Set<number>>(new Set());

  const cards = useMemo(() => career ? generateFlashcards(career) : [], [career?.id]);

  if (!career) {
    return <div className="max-w-2xl mx-auto px-4 py-20 text-center"><h1 className="text-2xl font-bold">Career Not Found</h1></div>;
  }

  const current = cards[currentIdx];

  const markKnown = () => {
    setKnown(s => new Set(s).add(currentIdx));
    setUnknown(s => { const n = new Set(s); n.delete(currentIdx); return n; });
    next();
  };

  const markUnknown = () => {
    setUnknown(s => new Set(s).add(currentIdx));
    setKnown(s => { const n = new Set(s); n.delete(currentIdx); return n; });
    next();
  };

  const next = () => {
    setFlipped(false);
    if (currentIdx < cards.length - 1) setCurrentIdx(i => i + 1);
  };

  const prev = () => {
    setFlipped(false);
    if (currentIdx > 0) setCurrentIdx(i => i - 1);
  };

  const reset = () => {
    setCurrentIdx(0);
    setFlipped(false);
    setKnown(new Set());
    setUnknown(new Set());
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8" data-testid="allied-flashcards-page">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href={`/${career.slug}`} className="hover:text-teal-600">{career.shortName}</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-teal-700 font-medium">Flashcards</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" data-testid="text-flashcards-title">{career.shortName} Flashcards</h1>
          <p className="text-gray-500 text-sm mt-1">{cards.length} cards - Spaced repetition learning</p>
        </div>
        <button onClick={reset} className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-600 hover:bg-gray-200" data-testid="button-reset">
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
        <span>Card {currentIdx + 1} of {cards.length}</span>
        <span className="text-green-600">Known: {known.size}</span>
        <span className="text-red-600">Review: {unknown.size}</span>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-6">
        <div className="bg-teal-500 h-1.5 rounded-full transition-all" style={{ width: `${((currentIdx + 1) / cards.length) * 100}%` }} />
      </div>

      {current && (
        <div className="mb-6">
          <div
            onClick={() => setFlipped(!flipped)}
            className="bg-white rounded-2xl border border-gray-100 p-8 sm:p-12 min-h-[280px] flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-all select-none"
            data-testid="flashcard"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs">{current.domain}</span>
              <span className="px-2 py-0.5 bg-teal-50 text-teal-600 rounded text-xs">{flipped ? "Answer" : "Question"}</span>
            </div>
            <p className="text-lg sm:text-xl text-gray-900 font-medium text-center leading-relaxed" data-testid="text-card-content">
              {flipped ? current.back : current.front}
            </p>
            <div className="flex items-center gap-1 text-gray-400 text-xs mt-6">
              <Eye className="w-3.5 h-3.5" /> Click to {flipped ? "see question" : "reveal answer"}
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <button onClick={prev} disabled={currentIdx === 0} className="flex items-center gap-1 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 disabled:opacity-30" data-testid="button-prev-card">
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>
        <div className="flex gap-3">
          <button onClick={markUnknown} className="flex items-center gap-1 px-5 py-2.5 bg-red-50 text-red-700 rounded-xl text-sm font-medium hover:bg-red-100" data-testid="button-dont-know">
            <ThumbsDown className="w-4 h-4" /> Review Again
          </button>
          <button onClick={markKnown} className="flex items-center gap-1 px-5 py-2.5 bg-green-50 text-green-700 rounded-xl text-sm font-medium hover:bg-green-100" data-testid="button-know">
            <ThumbsUp className="w-4 h-4" /> Got It
          </button>
        </div>
        <button onClick={next} disabled={currentIdx === cards.length - 1} className="flex items-center gap-1 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 disabled:opacity-30" data-testid="button-next-card">
          Next <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
