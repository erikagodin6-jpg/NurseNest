import {
  MicroLesson,
  CognitiveCard,
  HoverReveal,
  MatchingExercise,
  SelfCheckQuiz,
  ProgressiveReveal,
} from "@/components/interactive-learning";
import { EditableModuleText, useEditableText } from "@/components/module-edit-context";
import { MessageSquare, Users, FileText, Shield } from "lucide-react";

export function CommunicationModule() {
  const therapeuticWarning = useEditableText("comm-therapeutic-warning", "Giving false reassurance ('Everything will be fine'), being judgmental ('You shouldn't feel that way'), giving advice ('If I were you...'), changing the subject when the patient is expressing concerns, using medical jargon the patient doesn't understand, and asking 'why' questions ('Why didn't you take your medication?') which sound accusatory.");
  const sbarConcept = useEditableText("comm-sbar-concept", "Without a structure, handoffs often bury the critical information in a sea of background data. SBAR forces the communicator to lead with the most important information (Situation), provide only relevant context (Background), share their clinical reasoning (Assessment), and state a clear ask (Recommendation). This saves time and prevents the receiver from having to extract the key message.");
  const justCultureConcept = useEditableText("comm-just-culture-concept", "A just culture distinguishes between human error (unintentional — support the person), at-risk behavior (taking shortcuts — coach the person), and reckless behavior (conscious disregard for safety — hold accountable). This distinction encourages reporting of errors and near-misses without fear of punishment, which is essential for learning and prevention.");

  return (
    <div className="space-y-10" data-testid="module-communication">
      <div>
        <EditableModuleText sectionKey="comm-title" defaultText="Healthcare Communication Fundamentals" as="h2" className="text-2xl font-bold text-gray-900 mb-2" />
        <EditableModuleText sectionKey="comm-desc" defaultText="Master professional communication, therapeutic techniques, structured handoff methods, documentation principles, and interprofessional collaboration — foundational skills for safe, effective healthcare." as="p" className="text-gray-600" multiline />
      </div>

      <MicroLesson title="Therapeutic Communication" subtitle="Purposeful communication that promotes healing" icon={<MessageSquare className="w-5 h-5" />}>
        <EditableModuleText sectionKey="comm-therapeutic-content" defaultText={'Therapeutic communication is <span data-hover-term="goal-directed">goal-directed</span> interaction that prioritizes the patient\'s needs. It requires active listening, empathy, and intentional use of verbal and nonverbal techniques.'} as="p" className="text-sm text-gray-600 leading-relaxed" multiline />
        <ProgressiveReveal
          title="Therapeutic Techniques"
          cards={[
            {
              id: "tc1",
              title: "Active Listening",
              summary: "Full attention with verbal and nonverbal engagement",
              detail: "Maintain eye contact (culturally appropriate), lean slightly forward, nod to indicate understanding, avoid interrupting. Verbal cues: 'I hear you,' 'Tell me more,' 'Go on.' Active listening communicates respect and encourages patients to share important information they might otherwise withhold.",
            },
            {
              id: "tc2",
              title: "Open-Ended Questions",
              summary: "Questions that invite elaboration",
              detail: "Ask 'How are you feeling about your care today?' instead of 'Are you feeling okay?' Open-ended questions begin with how, what, tell me, describe — they yield richer assessment data and make patients feel heard. Closed-ended questions (yes/no) are useful for specific data collection but limit patient expression.",
            },
            {
              id: "tc3",
              title: "Reflection & Paraphrasing",
              summary: "Mirroring content and feelings back",
              detail: "Reflection: 'It sounds like you're feeling anxious about the procedure.' Paraphrasing: 'So what you're saying is...' These techniques confirm understanding, validate the patient's experience, and encourage deeper exploration. They also catch miscommunication before it causes harm.",
            },
            {
              id: "tc4",
              title: "Silence",
              summary: "Purposeful pauses that allow processing",
              detail: "Silence gives patients time to organize thoughts, process emotions, and decide what to share. It communicates that you're not rushed and that their words matter. Many healthcare providers fill silence prematurely — learn to tolerate it as a therapeutic tool.",
            },
          ]}
        />
        <CognitiveCard
          type="warning"
          title="Non-Therapeutic Responses to Avoid"
          content={therapeuticWarning}
        />
      </MicroLesson>

      <MicroLesson title="SBAR Communication" subtitle="Structured handoff for patient safety" icon={<Users className="w-5 h-5" />}>
        <EditableModuleText sectionKey="comm-sbar-content" defaultText={'SBAR is a <span data-hover-term="standardized communication framework">standardized communication framework</span> designed to prevent critical information loss during handoffs, phone calls to providers, and escalation of concerns.'} as="p" className="text-sm text-gray-600 leading-relaxed" multiline />
        <div className="space-y-3 mt-3">
          <div className="p-4 bg-red-50/60 rounded-xl border border-red-100">
            <p className="text-xs font-semibold text-red-700 mb-1">S — Situation</p>
            <p className="text-xs text-red-600">What is happening right now? State the patient's name, location, the immediate concern. Be concise and specific. Example: 'I'm calling about Mr. Smith in Room 412. His blood pressure has dropped to 82/50 and he is diaphoretic.'</p>
          </div>
          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100">
            <p className="text-xs font-semibold text-blue-700 mb-1">B — Background</p>
            <p className="text-xs text-blue-600">What is the relevant clinical context? Admitting diagnosis, pertinent medical history, current treatment, recent changes. Only include information relevant to the current situation. Example: 'He was admitted yesterday for pneumonia. He has a history of heart failure.'</p>
          </div>
          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-100">
            <p className="text-xs font-semibold text-amber-700 mb-1">A — Assessment</p>
            <p className="text-xs text-amber-600">What do you think is going on? Share your clinical judgment. Example: 'I'm concerned he may be developing sepsis. His lactate was 3.2 an hour ago and he has a new fever of 38.8°C.'</p>
          </div>
          <div className="p-4 bg-green-50/60 rounded-xl border border-green-100">
            <p className="text-xs font-semibold text-green-700 mb-1">R — Recommendation</p>
            <p className="text-xs text-green-600">What do you need? Be specific. Example: 'I'd like you to come evaluate him. Would you like me to start a fluid bolus and draw blood cultures in the meantime?'</p>
          </div>
        </div>
        <CognitiveCard
          type="concept"
          title="Why SBAR Works"
          content={sbarConcept}
        />
      </MicroLesson>

      <MicroLesson title="Documentation Principles" subtitle="If it wasn't documented, it wasn't done" icon={<FileText className="w-5 h-5" />}>
        <EditableModuleText sectionKey="comm-documentation-content" defaultText={'Healthcare documentation is a <span data-hover-term="legal record">legal record</span> that serves multiple critical functions: continuity of care, legal protection, communication between providers, quality improvement, and reimbursement.'} as="p" className="text-sm text-gray-600 leading-relaxed" multiline />
        <div className="grid sm:grid-cols-2 gap-3 mt-3">
          <div className="p-4 bg-green-50/60 rounded-xl border border-green-100">
            <p className="text-xs font-semibold text-green-700 mb-1">Documentation Best Practices</p>
            <p className="text-xs text-green-600"><strong>Be objective:</strong> Document what you observe, not your opinions. 'Patient stated: I feel dizzy' not 'Patient seems dizzy.' <strong>Be timely:</strong> Document as close to the event as possible. <strong>Be accurate:</strong> Use exact measurements, times, and quotes. <strong>Be complete:</strong> Include assessment findings, interventions, and patient response.</p>
          </div>
          <div className="p-4 bg-red-50/60 rounded-xl border border-red-100">
            <p className="text-xs font-semibold text-red-700 mb-1">Documentation Errors to Avoid</p>
            <p className="text-xs text-red-600"><strong>Never:</strong> Use correction fluid or erase entries. Backdate or add entries out of sequence. Document in advance ('pre-charting'). Include subjective judgments ('Patient is non-compliant'). Use unapproved abbreviations. Leave blank spaces in paper records. Document care that was not provided.</p>
          </div>
        </div>
      </MicroLesson>

      <MicroLesson title="Error Prevention & Situational Awareness" subtitle="Communication strategies that prevent harm" icon={<Shield className="w-5 h-5" />}>
        <EditableModuleText sectionKey="comm-error-prevention-content" defaultText={'Most healthcare errors involve <span data-hover-term="communication failures">communication failures</span>. A culture of safety requires specific communication strategies.'} as="p" className="text-sm text-gray-600 leading-relaxed" multiline />
        <div className="space-y-3 mt-3">
          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100">
            <p className="text-xs font-semibold text-blue-700 mb-1">Read-Back / Repeat-Back</p>
            <p className="text-xs text-blue-600">When receiving verbal orders or critical test results, repeat the information back to the sender for verification. 'I'm reading back: Give Metoprolol 25 mg by mouth now. Is that correct?' This catches mishearing or miscommunication before it reaches the patient.</p>
          </div>
          <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-100">
            <p className="text-xs font-semibold text-purple-700 mb-1">CUS Framework — Escalating Concerns</p>
            <p className="text-xs text-purple-600"><strong>C</strong> — 'I am <em>Concerned</em>' (first level). <strong>U</strong> — 'I am <em>Uncomfortable</em>' (second level). <strong>S</strong> — 'This is a <em>Safety issue</em>' (highest level — stops the action). This graduated framework gives team members language to escalate concerns assertively.</p>
          </div>
          <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-100">
            <p className="text-xs font-semibold text-teal-700 mb-1">Two-Challenge Rule</p>
            <p className="text-xs text-teal-600">If your concern is dismissed the first time, voice it again with different framing. If dismissed twice, escalate to the next level (charge nurse, supervisor, chain of command). Patient safety always takes priority over hierarchy.</p>
          </div>
        </div>
        <CognitiveCard
          type="concept"
          title="Just Culture"
          content={justCultureConcept}
        />
      </MicroLesson>

      <MatchingExercise
        title="Match the Communication Concept"
        pairs={[
          { term: "Open-ended question", definition: "Invites elaboration — 'How are you feeling?'" },
          { term: "SBAR", definition: "Situation, Background, Assessment, Recommendation" },
          { term: "Active listening", definition: "Full attention with verbal and nonverbal engagement" },
          { term: "Read-back", definition: "Repeating orders back for verification" },
          { term: "CUS framework", definition: "Concerned → Uncomfortable → Safety issue" },
          { term: "Therapeutic silence", definition: "Purposeful pause allowing patient processing" },
        ]}
      />

      <SelfCheckQuiz
        title="Communication Foundations Quiz"
        questions={[
          {
            id: "cm1",
            question: "Which response is an example of therapeutic communication?",
            options: ["'Everything will be fine, don't worry.'", "'Tell me more about what concerns you.'", "'Why didn't you take your medication?'", "'If I were you, I would try exercising more.'"],
            correctIndex: 1,
            rationale: "'Tell me more about what concerns you' is an open-ended, non-judgmental prompt that encourages the patient to elaborate. The others are non-therapeutic: false reassurance, accusatory 'why' question, and giving unsolicited advice.",
          },
          {
            id: "cm2",
            question: "In SBAR, the 'A' stands for:",
            options: ["Action", "Assessment", "Alert", "Acknowledgment"],
            correctIndex: 1,
            rationale: "A = Assessment — your clinical judgment about what is happening. This is where you share your analysis, not just data. It helps the receiver understand your reasoning.",
          },
          {
            id: "cm3",
            question: "A nurse receives a verbal order for 'Metformin 500 mg PO BID.' The correct response is:",
            options: ["Write the order and administer the medication", "Ask the physician to enter it electronically", "Read back: 'Metformin 500 mg by mouth twice daily, is that correct?'", "Ask the charge nurse to confirm"],
            correctIndex: 2,
            rationale: "Read-back is the safety standard for verbal orders: repeat the order including drug name, dose, route, and frequency, and ask for confirmation. This catches errors before they reach the patient.",
          },
          {
            id: "cm4",
            question: "Which documentation practice is correct?",
            options: ["Documenting care before it is provided to save time", "Using correction fluid for minor errors", "Recording exact patient quotes using quotation marks", "Leaving blank spaces to fill in later"],
            correctIndex: 2,
            rationale: "Documenting exact patient quotes preserves the patient's own words as objective data. Pre-charting, correction fluid, and blank spaces are all documentation errors that compromise the legal record.",
          },
          {
            id: "cm5",
            question: "The CUS framework is used to:",
            options: ["Document patient care", "Escalate safety concerns through graduated language", "Communicate with patients", "Write nursing diagnoses"],
            correctIndex: 1,
            rationale: "CUS provides a structured way to escalate concerns: Concerned → Uncomfortable → Safety issue. Each level carries more urgency and signals to the team that the concern requires attention.",
          },
          {
            id: "cm6",
            question: "Most sentinel events in healthcare involve failures in:",
            options: ["Medication calculations", "Communication", "Equipment", "Staffing levels"],
            correctIndex: 1,
            rationale: "Studies consistently show that 60-70% of sentinel events involve communication breakdowns — during handoffs, between disciplines, or when team members fail to speak up about concerns.",
          },
        ]}
      />
    </div>
  );
}
