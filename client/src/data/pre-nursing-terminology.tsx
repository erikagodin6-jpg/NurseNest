import {
  MicroLesson,
  CognitiveCard,
  HoverReveal,
  MatchingExercise,
  SelfCheckQuiz,
  ProgressiveReveal,
} from "@/components/interactive-learning";
import { BookOpen, Layers, Brain, FileText } from "lucide-react";

export function MedicalTerminologyModule() {
  return (
    <div className="space-y-10" data-testid="module-medical-terminology">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Medical Terminology Mastery</h2>
        <p className="text-gray-600">
          Decode medical language logically through word roots, prefixes, and suffixes rather than rote memorization. Build a framework for understanding any medical term you encounter.
        </p>
      </div>

      <MicroLesson title="How Medical Language Works" subtitle="A systematic approach to decoding medical terms" icon={<BookOpen className="w-5 h-5" />}>
        <p className="text-sm text-gray-600 leading-relaxed">
          Medical terminology follows a{" "}
          <HoverReveal term="logical construction system" definition="Medical terms are built from Greek and Latin word parts — roots, prefixes, and suffixes — that combine predictably. Once you learn the parts, you can decode thousands of terms without memorizing each one." />.
          Every medical term is assembled from building blocks: a <strong>root</strong> (the core meaning, usually an organ or structure), a <strong>prefix</strong> (modifies meaning — location, number, time), and a <strong>suffix</strong> (indicates procedure, condition, or function).
        </p>
        <div className="grid sm:grid-cols-3 gap-3 mt-3">
          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100">
            <p className="text-xs font-semibold text-blue-700 mb-1">Root / Combining Form</p>
            <p className="text-xs text-blue-600">The foundation of the term. <em>Cardi/o</em> = heart, <em>hepat/o</em> = liver, <em>nephr/o</em> = kidney. The combining vowel (usually "o") links roots to suffixes.</p>
          </div>
          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
            <p className="text-xs font-semibold text-emerald-700 mb-1">Prefix</p>
            <p className="text-xs text-emerald-600">Appears at the beginning. <em>Hyper-</em> = excessive, <em>hypo-</em> = below/deficient, <em>tachy-</em> = fast, <em>brady-</em> = slow, <em>peri-</em> = around.</p>
          </div>
          <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-100">
            <p className="text-xs font-semibold text-purple-700 mb-1">Suffix</p>
            <p className="text-xs text-purple-600"><em>-itis</em> = inflammation, <em>-ectomy</em> = surgical removal, <em>-ology</em> = study of, <em>-scopy</em> = visual examination, <em>-pathy</em> = disease.</p>
          </div>
        </div>
        <CognitiveCard
          type="concept"
          title="Decoding in Action"
          content="Electrocardiography: electr/o (electrical) + cardi/o (heart) + -graphy (process of recording) = the process of recording the electrical activity of the heart. You don't need to memorize this — you can construct the meaning from parts."
        />
      </MicroLesson>

      <MicroLesson title="Body System Roots" subtitle="Core word roots organized by organ system" icon={<Layers className="w-5 h-5" />}>
        <p className="text-sm text-gray-600 leading-relaxed">
          Each body system has characteristic{" "}
          <HoverReveal term="word roots" definition="The base element of a medical term that identifies the body part or system. Most medical roots derive from Greek (used for diagnosis/disease) or Latin (used for anatomy/structure)." />{" "}
          that appear repeatedly in clinical vocabulary. Learning these roots gives you a foundation for interpreting terms across all of healthcare.
        </p>
        <ProgressiveReveal
          title="System-by-System Root Words"
          cards={[
            {
              id: "mt1",
              title: "Cardiovascular",
              summary: "Heart and blood vessel roots",
              detail: "Cardi/o (heart), angi/o or vas/o (vessel), hem/o or hemat/o (blood), ven/o or phleb/o (vein), arteri/o (artery), thromb/o (clot), ather/o (fatty plaque). Example: Phlebotomy = phleb/o + -tomy (incision) = incision into a vein.",
            },
            {
              id: "mt2",
              title: "Respiratory",
              summary: "Lung and airway roots",
              detail: "Pulmon/o or pneum/o (lung), bronch/o (bronchus), trache/o (trachea), nas/o or rhin/o (nose), laryng/o (larynx), pharyng/o (pharynx), thorac/o (chest), ox/i (oxygen). Example: Bronchoscopy = bronch/o + -scopy (visual examination).",
            },
            {
              id: "mt3",
              title: "Gastrointestinal",
              summary: "Digestive system roots",
              detail: "Gastr/o (stomach), enter/o (intestine), hepat/o (liver), cholecyst/o (gallbladder), pancreat/o (pancreas), col/o or colon/o (colon), esophag/o (esophagus), or/o (mouth), proct/o (rectum/anus). Example: Hepatomegaly = hepat/o + -megaly (enlargement).",
            },
            {
              id: "mt4",
              title: "Neurological",
              summary: "Brain and nerve roots",
              detail: "Neur/o (nerve), cerebr/o or encephal/o (brain), mening/o (meninges), myel/o (spinal cord or bone marrow — context matters), psych/o (mind), cephal/o (head). Example: Encephalitis = encephal/o + -itis (inflammation).",
            },
            {
              id: "mt5",
              title: "Musculoskeletal",
              summary: "Bone, muscle, and joint roots",
              detail: "Oste/o (bone), arthr/o (joint), my/o or myos/o (muscle), chondr/o (cartilage), tend/o or tendin/o (tendon), cost/o (rib), crani/o (skull). Example: Osteoarthritis = oste/o + arthr/o + -itis.",
            },
            {
              id: "mt6",
              title: "Renal / Urinary",
              summary: "Kidney and urinary tract roots",
              detail: "Ren/o or nephr/o (kidney), cyst/o (bladder), ureter/o (ureter), urethr/o (urethra), pyel/o (renal pelvis), ur/o (urine). Example: Nephrolithiasis = nephr/o + lith/o (stone) + -iasis (condition).",
            },
          ]}
        />
      </MicroLesson>

      <MicroLesson title="Critical Prefixes & Suffixes" subtitle="The modifiers that change meaning" icon={<Brain className="w-5 h-5" />}>
        <p className="text-sm text-gray-600 leading-relaxed">
          Prefixes and suffixes modify the root to create specific clinical meanings. Learning the most common ones allows you to decode unfamiliar terms by breaking them into recognizable parts.
        </p>
        <div className="space-y-4 mt-3">
          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-100">
            <p className="text-xs font-semibold text-amber-700 mb-2">Location & Direction Prefixes</p>
            <div className="grid grid-cols-2 gap-1 text-xs text-amber-600">
              <span><strong>Epi-</strong> = upon, above (epidermis)</span>
              <span><strong>Sub-</strong> = below (subcutaneous)</span>
              <span><strong>Endo-</strong> = within (endoscopy)</span>
              <span><strong>Peri-</strong> = around (pericardium)</span>
              <span><strong>Inter-</strong> = between (intercostal)</span>
              <span><strong>Intra-</strong> = within (intravenous)</span>
              <span><strong>Retro-</strong> = behind (retroperitoneal)</span>
              <span><strong>Trans-</strong> = across (transdermal)</span>
            </div>
          </div>
          <div className="p-4 bg-rose-50/60 rounded-xl border border-rose-100">
            <p className="text-xs font-semibold text-rose-700 mb-2">Condition & Status Suffixes</p>
            <div className="grid grid-cols-2 gap-1 text-xs text-rose-600">
              <span><strong>-itis</strong> = inflammation</span>
              <span><strong>-osis</strong> = abnormal condition</span>
              <span><strong>-emia</strong> = blood condition</span>
              <span><strong>-penia</strong> = deficiency</span>
              <span><strong>-megaly</strong> = enlargement</span>
              <span><strong>-malacia</strong> = softening</span>
              <span><strong>-sclerosis</strong> = hardening</span>
              <span><strong>-algia / -dynia</strong> = pain</span>
            </div>
          </div>
          <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-100">
            <p className="text-xs font-semibold text-teal-700 mb-2">Procedure Suffixes</p>
            <div className="grid grid-cols-2 gap-1 text-xs text-teal-600">
              <span><strong>-ectomy</strong> = surgical removal</span>
              <span><strong>-otomy</strong> = incision into</span>
              <span><strong>-ostomy</strong> = creating an opening</span>
              <span><strong>-plasty</strong> = surgical repair</span>
              <span><strong>-scopy</strong> = visual examination</span>
              <span><strong>-graphy</strong> = process of recording</span>
              <span><strong>-centesis</strong> = puncture to withdraw fluid</span>
              <span><strong>-pexy</strong> = surgical fixation</span>
            </div>
          </div>
        </div>
        <CognitiveCard
          type="warning"
          title="Common Confusion: -otomy vs -ostomy vs -ectomy"
          content="These three sound similar but mean very different things. -Otomy = cutting into (the structure remains). -Ostomy = creating a permanent opening. -Ectomy = removing entirely. A tracheotomy cuts into the trachea; a tracheostomy creates a permanent opening; a tonsillectomy removes the tonsils."
        />
      </MicroLesson>

      <MicroLesson title="Abbreviations & Safety" subtitle="Common abbreviations and dangerous look-alikes" icon={<FileText className="w-5 h-5" />}>
        <p className="text-sm text-gray-600 leading-relaxed">
          Healthcare abbreviations save time but create risk. The{" "}
          <HoverReveal term="ISMP Do Not Use List" definition="The Institute for Safe Medication Practices publishes a list of abbreviations that are frequently misread and should be avoided in clinical documentation to prevent medication errors." />{" "}
          exists because abbreviation misinterpretation causes real patient harm. Understanding which abbreviations are safe and which are dangerous is a foundational competency.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mt-3">
          <div className="p-4 bg-green-50/60 rounded-xl border border-green-100">
            <p className="text-xs font-semibold text-green-700 mb-1">Safe & Common</p>
            <p className="text-xs text-green-600">BP (blood pressure), HR (heart rate), RR (respiratory rate), SpO2 (oxygen saturation), BID (twice daily), TID (three times daily), PO (by mouth), IV (intravenous), IM (intramuscular), SubQ (subcutaneous), NPO (nothing by mouth)</p>
          </div>
          <div className="p-4 bg-red-50/60 rounded-xl border border-red-100">
            <p className="text-xs font-semibold text-red-700 mb-1">Dangerous — Do Not Use</p>
            <p className="text-xs text-red-600">U (for units — mistaken for 0), QD/QOD (mistaken for each other), trailing zeros (1.0 mg read as 10 mg), MS (morphine sulfate or magnesium sulfate?), IU (mistaken for IV), μg (mistaken for mg)</p>
          </div>
        </div>
      </MicroLesson>

      <MatchingExercise
        title="Match the Root to Its Meaning"
        pairs={[
          { term: "Cardi/o", definition: "Heart" },
          { term: "Hepat/o", definition: "Liver" },
          { term: "Nephr/o", definition: "Kidney" },
          { term: "Pneum/o", definition: "Lung" },
          { term: "Neur/o", definition: "Nerve" },
          { term: "Oste/o", definition: "Bone" },
          { term: "Gastr/o", definition: "Stomach" },
          { term: "Derm/o", definition: "Skin" },
        ]}
      />

      <SelfCheckQuiz
        title="Medical Terminology Quiz"
        questions={[
          {
            id: "t1",
            question: "What does the term 'hepatomegaly' mean?",
            options: ["Liver inflammation", "Liver enlargement", "Liver removal", "Liver pain"],
            correctIndex: 1,
            rationale: "Hepat/o = liver, -megaly = enlargement. Hepatomegaly means enlargement of the liver.",
          },
          {
            id: "t2",
            question: "A 'cholecystectomy' involves:",
            options: ["Visual examination of the gallbladder", "Incision into the gallbladder", "Surgical removal of the gallbladder", "Creating an opening in the gallbladder"],
            correctIndex: 2,
            rationale: "Cholecyst/o = gallbladder, -ectomy = surgical removal.",
          },
          {
            id: "t3",
            question: "The prefix 'tachy-' means:",
            options: ["Slow", "Fast", "Painful", "Excessive"],
            correctIndex: 1,
            rationale: "Tachy- = fast or rapid (tachycardia = fast heart rate, tachypnea = fast breathing).",
          },
          {
            id: "t4",
            question: "Which suffix indicates inflammation?",
            options: ["-osis", "-emia", "-itis", "-pathy"],
            correctIndex: 2,
            rationale: "-Itis always indicates inflammation (appendicitis, arthritis, bronchitis, meningitis).",
          },
          {
            id: "t5",
            question: "The abbreviation 'U' for units is on the Do-Not-Use list because:",
            options: ["It is an outdated term", "It can be mistaken for the number 0 or 4", "It only applies to insulin", "It is not a recognized abbreviation"],
            correctIndex: 1,
            rationale: "Handwritten 'U' can be mistaken for 0, 4, or cc, leading to a 10-fold or greater dosing error. Always write out 'units.'",
          },
          {
            id: "t6",
            question: "What does 'bradypnea' mean?",
            options: ["Fast breathing", "Difficult breathing", "Slow breathing", "Absence of breathing"],
            correctIndex: 2,
            rationale: "Brady- = slow, -pnea = breathing. Bradypnea = abnormally slow rate of breathing.",
          },
          {
            id: "t7",
            question: "The term 'subcutaneous' refers to:",
            options: ["Above the skin", "Within the skin", "Below the skin", "Around the skin"],
            correctIndex: 2,
            rationale: "Sub- = below/under, cutane/o = skin, -ous = pertaining to. Below the skin.",
          },
          {
            id: "t8",
            question: "What is the difference between '-otomy' and '-ostomy'?",
            options: ["They mean the same thing", "-Otomy creates a permanent opening; -ostomy is a temporary cut", "-Otomy is a cut into; -ostomy is creating a permanent opening", "-Otomy removes tissue; -ostomy repairs tissue"],
            correctIndex: 2,
            rationale: "-Otomy = cutting into (temporary, the structure remains). -Ostomy = creating a new permanent or semi-permanent opening.",
          },
          {
            id: "t9",
            question: "Which root refers to the kidney?",
            options: ["Cyst/o", "Nephr/o", "Pyel/o", "Ureter/o"],
            correctIndex: 1,
            rationale: "Nephr/o = kidney. Cyst/o = bladder, Pyel/o = renal pelvis, Ureter/o = ureter.",
          },
          {
            id: "t10",
            question: "The term 'dysphagia' means:",
            options: ["Difficulty breathing", "Difficulty speaking", "Difficulty swallowing", "Difficulty walking"],
            correctIndex: 2,
            rationale: "Dys- = difficult/painful, -phagia = swallowing. Dysphagia = difficulty swallowing.",
          },
        ]}
      />
    </div>
  );
}
