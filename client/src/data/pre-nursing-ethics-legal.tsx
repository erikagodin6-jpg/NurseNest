import {
  MicroLesson,
  CognitiveCard,
  HoverReveal,
  MatchingExercise,
  SelfCheckQuiz,
  ProgressiveReveal,
} from "@/components/interactive-learning";
import { Scale, Shield, BookOpen, Heart } from "lucide-react";

export function EthicsLegalModule() {
  return (
    <div className="space-y-10" data-testid="module-ethics-legal">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ethical & Legal Foundations</h2>
        <p className="text-gray-600">
          Understand the bioethics principles, legal concepts, patient rights, and professional standards that govern healthcare practice — foundational knowledge for safe, ethical nursing.
        </p>
      </div>

      <MicroLesson title="Bioethics Principles" subtitle="The four pillars of healthcare ethics" icon={<Heart className="w-5 h-5" />}>
        <p className="text-sm text-gray-600 leading-relaxed">
          Healthcare ethics is built on four core{" "}
          <HoverReveal term="bioethics principles" definition="Autonomy (patient self-determination), Beneficence (doing good), Nonmaleficence (do no harm), and Justice (fairness in resource allocation). These principles guide decision-making when clinical situations present ethical conflicts." />{" "}
          established by Beauchamp and Childress. When these principles conflict — and they frequently do — ethical reasoning requires balancing them thoughtfully.
        </p>
        <ProgressiveReveal
          title="The Four Principles"
          cards={[
            {
              id: "ep1",
              title: "Autonomy",
              summary: "Patient self-determination and informed choice",
              detail: "Patients have the right to make their own healthcare decisions, even if those decisions conflict with medical advice. This principle underlies informed consent, advance directives, and the right to refuse treatment. Respecting autonomy requires providing adequate information in understandable language and ensuring decisions are made voluntarily, without coercion.",
            },
            {
              id: "ep2",
              title: "Beneficence",
              summary: "Acting in the patient's best interest",
              detail: "The obligation to do good — to act in ways that benefit the patient. This goes beyond simply avoiding harm; it requires actively promoting the patient's well-being. It includes providing competent care, advocating for patients, and balancing benefits against risks of interventions.",
            },
            {
              id: "ep3",
              title: "Nonmaleficence",
              summary: "First, do no harm",
              detail: "The obligation to avoid causing harm. Every intervention carries potential risks — nonmaleficence requires that the expected benefit outweighs the potential harm. This principle drives medication safety checks, fall prevention protocols, and the careful assessment of intervention risks.",
            },
            {
              id: "ep4",
              title: "Justice",
              summary: "Fair distribution of resources and care",
              detail: "The obligation to treat patients fairly and equitably. This includes equitable access to care, fair allocation of scarce resources (triage), and avoiding discrimination. Justice requires that healthcare decisions are not influenced by social status, ability to pay, ethnicity, or personal biases.",
            },
          ]}
        />
        <CognitiveCard
          type="concept"
          title="When Principles Conflict"
          content="A competent adult patient refuses a blood transfusion based on religious beliefs, but without it they may die. Autonomy says respect their decision. Beneficence says intervene to save their life. This is an ethical dilemma — and in most legal frameworks, autonomy prevails for competent adults. Recognizing these tensions and reasoning through them is the foundation of ethical practice."
        />
      </MicroLesson>

      <MicroLesson title="Informed Consent" subtitle="More than a signature" icon={<BookOpen className="w-5 h-5" />}>
        <p className="text-sm text-gray-600 leading-relaxed">
          Informed consent is a{" "}
          <HoverReveal term="process, not a form" definition="The signed form is documentation that the process occurred. The actual consent process involves a conversation where the provider explains the procedure, its risks, benefits, alternatives, and the right to refuse — and the patient demonstrates understanding before agreeing." />.
          It is the practical application of the autonomy principle.
        </p>
        <div className="space-y-3 mt-3">
          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100">
            <p className="text-xs font-semibold text-blue-700 mb-1">Required Elements</p>
            <p className="text-xs text-blue-600"><strong>1. Disclosure:</strong> Nature of the procedure, risks, benefits, alternatives, and consequences of refusal. <strong>2. Comprehension:</strong> Information is presented in language the patient understands. <strong>3. Voluntariness:</strong> Decision is free from coercion. <strong>4. Competence:</strong> Patient has decision-making capacity. <strong>5. Consent:</strong> Patient agrees to the procedure.</p>
          </div>
          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-100">
            <p className="text-xs font-semibold text-amber-700 mb-1">Who Obtains Consent?</p>
            <p className="text-xs text-amber-600">The person performing the procedure (physician, surgeon, NP) is responsible for explaining the procedure and obtaining informed consent. The nurse's role is to witness the signature, ensure the patient understood the information, and advocate for the patient if they appear confused, coerced, or uninformed.</p>
          </div>
          <div className="p-4 bg-red-50/60 rounded-xl border border-red-100">
            <p className="text-xs font-semibold text-red-700 mb-1">Exceptions to Informed Consent</p>
            <p className="text-xs text-red-600"><strong>Emergency:</strong> When delay would cause death or serious harm and consent cannot be obtained. <strong>Therapeutic privilege:</strong> Rare — when disclosure would cause serious psychological harm. <strong>Patient waiver:</strong> Patient explicitly states they don't want to know details. <strong>Implied consent:</strong> Patient presents for routine care (e.g., extending arm for blood draw).</p>
          </div>
        </div>
      </MicroLesson>

      <MicroLesson title="Patient Rights & Confidentiality" subtitle="HIPAA, privacy, and patient advocacy" icon={<Shield className="w-5 h-5" />}>
        <p className="text-sm text-gray-600 leading-relaxed">
          Patient rights are legally protected. Understanding these rights and the{" "}
          <HoverReveal term="duty of confidentiality" definition="Healthcare providers have a legal and ethical obligation to protect patient health information (PHI). This is codified in privacy legislation (e.g., HIPAA in the US, PIPEDA in Canada). Violations can result in fines, license sanctions, and criminal charges." />{" "}
          is non-negotiable for all healthcare providers.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mt-3">
          <div className="p-4 bg-green-50/60 rounded-xl border border-green-100">
            <p className="text-xs font-semibold text-green-700 mb-1">Core Patient Rights</p>
            <p className="text-xs text-green-600">Right to informed consent. Right to refuse treatment. Right to privacy and confidentiality. Right to access their own medical records. Right to be treated with dignity. Right to a second opinion. Right to know the names and roles of their care providers.</p>
          </div>
          <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-100">
            <p className="text-xs font-semibold text-purple-700 mb-1">Confidentiality Rules</p>
            <p className="text-xs text-purple-600"><strong>Minimum necessary:</strong> Only access/share the minimum information needed for your role. <strong>Need to know:</strong> Don't discuss patients with colleagues who are not involved in their care. <strong>Social media:</strong> Never post identifiable patient information, even without names — details can be identifying. <strong>Elevator rule:</strong> Don't discuss patients in public spaces.</p>
          </div>
        </div>
        <CognitiveCard
          type="warning"
          title="Mandatory Reporting Exceptions"
          content="Confidentiality is not absolute. Healthcare providers are legally required to report: suspected child abuse or neglect, suspected elder abuse, certain communicable diseases (to public health), gunshot wounds and stab wounds, threats of harm to self or others (duty to warn/protect). These reporting obligations override patient confidentiality."
        />
      </MicroLesson>

      <MicroLesson title="Scope of Practice & Professional Standards" subtitle="Practicing within legal boundaries" icon={<Scale className="w-5 h-5" />}>
        <p className="text-sm text-gray-600 leading-relaxed">
          Every regulated healthcare professional has a defined{" "}
          <HoverReveal term="scope of practice" definition="The range of activities, procedures, and processes that a regulated healthcare professional is legally authorized to perform based on their education, competency, and registration/licensure. Practicing outside scope of practice is illegal and creates liability." />{" "}
          established by law and regulated by professional licensing bodies.
        </p>
        <div className="space-y-3 mt-3">
          <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-100">
            <p className="text-xs font-semibold text-teal-700 mb-1">Key Legal Concepts</p>
            <p className="text-xs text-teal-600"><strong>Negligence:</strong> Failure to provide care that a reasonable nurse would provide under similar circumstances. Requires four elements: duty, breach of duty, causation, and damages. <strong>Malpractice:</strong> Professional negligence — negligence committed by a professional in the course of their professional duties. <strong>Abandonment:</strong> Terminating the provider-patient relationship without ensuring continuity of care.</p>
          </div>
          <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-100">
            <p className="text-xs font-semibold text-indigo-700 mb-1">Delegation Principles</p>
            <p className="text-xs text-indigo-600">The Five Rights of Delegation: Right <strong>task</strong> (appropriate to delegate), Right <strong>circumstance</strong> (stable patient, predictable outcome), Right <strong>person</strong> (competent for the task), Right <strong>direction/communication</strong> (clear instructions), Right <strong>supervision/evaluation</strong> (follow up on outcomes). The delegating nurse retains accountability.</p>
          </div>
        </div>
      </MicroLesson>

      <MatchingExercise
        title="Match the Ethics & Legal Concept"
        pairs={[
          { term: "Autonomy", definition: "Patient's right to self-determination" },
          { term: "Beneficence", definition: "Obligation to act in patient's best interest" },
          { term: "Nonmaleficence", definition: "Obligation to do no harm" },
          { term: "Justice", definition: "Fair distribution of resources" },
          { term: "Informed consent", definition: "Process ensuring patient understands treatment" },
          { term: "Negligence", definition: "Failure to meet standard of care" },
        ]}
      />

      <SelfCheckQuiz
        title="Ethics & Legal Foundations Quiz"
        questions={[
          {
            id: "el1",
            question: "A competent adult patient refuses life-saving treatment. Which ethical principle supports their right to refuse?",
            options: ["Beneficence", "Justice", "Autonomy", "Nonmaleficence"],
            correctIndex: 2,
            rationale: "Autonomy — the right to self-determination — gives competent adults the legal and ethical right to refuse any treatment, even if refusal leads to death. Competence and voluntary decision-making are the key requirements.",
          },
          {
            id: "el2",
            question: "Who is responsible for explaining a surgical procedure and its risks to the patient?",
            options: ["The nurse caring for the patient", "The surgeon performing the procedure", "The unit clerk", "Any available physician"],
            correctIndex: 1,
            rationale: "The person performing the procedure (surgeon/physician) is responsible for the informed consent discussion. The nurse may witness the signature and advocate for the patient if they appear uninformed, but the nurse does not obtain surgical consent.",
          },
          {
            id: "el3",
            question: "A nurse notices a colleague accessing the medical record of a celebrity patient who is not in their care. This is a violation of:",
            options: ["Beneficence", "Scope of practice", "Minimum necessary standard / Confidentiality", "Delegation principles"],
            correctIndex: 2,
            rationale: "Accessing a patient's record when you are not involved in their care violates the minimum necessary standard — only access the information needed for your role. This is a confidentiality violation regardless of intent.",
          },
          {
            id: "el4",
            question: "The four elements required to prove negligence are:",
            options: ["Intent, action, harm, reporting", "Duty, breach, causation, damages", "Consent, disclosure, competence, voluntariness", "Assessment, planning, implementation, evaluation"],
            correctIndex: 1,
            rationale: "To prove negligence: (1) the provider owed a duty of care, (2) that duty was breached, (3) the breach caused harm, and (4) actual damages (injury) resulted.",
          },
          {
            id: "el5",
            question: "Which situation REQUIRES breaking patient confidentiality?",
            options: ["A family member asks about the patient's diagnosis", "A coworker is curious about the patient's condition", "The nurse suspects child abuse", "The patient's employer calls for health information"],
            correctIndex: 2,
            rationale: "Suspected child abuse is a mandatory reporting situation that overrides confidentiality. The nurse is legally required to report to the appropriate authorities. The other situations do not justify breaking confidentiality.",
          },
          {
            id: "el6",
            question: "Emergency consent applies when:",
            options: ["The patient is anxious about signing forms", "The family requests the procedure", "Delay would cause death or serious harm and consent cannot be obtained", "The patient speaks a different language"],
            correctIndex: 2,
            rationale: "Emergency consent (implied consent) applies when there is an immediate threat to life or health AND the patient is unable to give consent AND no surrogate is immediately available. It does not apply to language barriers or patient anxiety.",
          },
          {
            id: "el7",
            question: "When delegating a task, the nurse retains:",
            options: ["No responsibility once delegated", "Accountability for the outcome", "Only responsibility for documentation", "Authority over the delegate's license"],
            correctIndex: 1,
            rationale: "The delegating nurse retains accountability for the delegation decision and the patient outcome. Delegation transfers the performance of the task but not the accountability for ensuring it was appropriate and properly completed.",
          },
        ]}
      />
    </div>
  );
}
