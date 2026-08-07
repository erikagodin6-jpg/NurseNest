export const adrenergicAgonistsRnLesson = {
  title: "Adrenergic Agonists",
  summary:
    "High-yield adrenergic agonist pharmacology for RN learners: receptor effects, drug selection, assessment, infusion safety, adverse effects, extravasation, patient teaching, and clinical judgment.",
  versionKey: "rn-adrenergic-agonists-curated-2026-08-07",
  evidenceReviewedAt: "2026-08-07",
  evidence: [
    {
      source: "Public Health Agency of Canada — Canadian Immunization Guide: anaphylaxis management",
      url: "https://www.canada.ca/en/public-health/services/publications/healthy-living/canadian-immunization-guide-part-2-vaccine-safety/page-4-early-vaccine-reactions-including-anaphylaxis.html",
    },
    {
      source: "Society of Critical Care Medicine — Surviving Sepsis Campaign 2026",
      url: "https://sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-management-of-sepsis-and-septic-shock-2026",
    },
    {
      source: "DailyMed — Epinephrine injection",
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?audience=professional&setid=1e8ebac1-5b32-47f9-a930-86a98a24dccc",
    },
    {
      source: "DailyMed — Norepinephrine bitartrate injection",
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=39cda6c6-3857-4028-80cf-aef135f8c7e6",
    },
    {
      source: "DailyMed — Dobutamine hydrochloride in dextrose",
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7f56a751-5769-4622-9008-e7fef8e54362",
    },
    {
      source: "DailyMed — Phenylephrine hydrochloride injection",
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b3ff0d1d-6f3f-4e3c-9407-6f3bf3a61e7d",
    },
    {
      source: "DailyMed — Albuterol sulfate inhalation aerosol",
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2e449282-ee58-4e36-b983-85c4e6f0864d",
    },
    {
      source: "DailyMed — Dopamine hydrochloride injection",
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0e499952-46c7-4172-8c70-186312e240a3",
    },
    {
      source: "DailyMed — Clonidine hydrochloride extended release",
      url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=99485427-a120-4fc7-bb61-25857d1900ec",
    },
  ],
  sections: [
    {
      sectionTitle: "Bottom line",
      content: `Adrenergic agonists stimulate adrenergic receptors and reproduce selected effects of the sympathetic nervous system. The safest way to learn them is not as one long medication list. Start with the receptor, predict the physiologic effect, connect that effect to the reason the patient is receiving the medication, and then anticipate what excessive stimulation would look like.

A fast receptor memory aid is: **alpha-1 squeezes, beta-1 beats, beta-2 breathes.** Alpha-2 is the important exception: central alpha-2 agonists such as clonidine reduce sympathetic outflow, so an adrenergic agonist does not always increase heart rate or blood pressure.

For RN questions, keep asking four things: **What receptor is being stimulated? What response should improve? What finding means the drug is causing harm? What needs to happen next?**`,
    },
    {
      sectionTitle: "Adrenergic Receptor Map",
      content: `| Receptor | Major effect when stimulated | Common clinical connection | High-risk finding |
|---|---|---|---|
| **Alpha-1** | Vasoconstriction increases systemic vascular resistance and blood pressure | Norepinephrine, phenylephrine, epinephrine | Severe hypertension, cool or mottled extremities, worsening ischemia, extravasation injury |
| **Alpha-2** | Central reduction in sympathetic outflow | Clonidine | Bradycardia, hypotension, sedation; rebound hypertension if stopped abruptly |
| **Beta-1** | Increases heart rate, contractility, AV conduction, and renin release | Dobutamine, epinephrine, dopamine | Tachydysrhythmia, ectopy, angina or myocardial ischemia |
| **Beta-2** | Bronchodilation; also shifts potassium into cells and can produce skeletal-muscle tremor | Albuterol, epinephrine | Tachycardia, tremor, hypokalemia, paradoxical bronchospasm |

**Clinical translation:** receptor selectivity is a tendency, not a promise that only one organ system will respond. Dose, route, disease state, concurrent medications, and endogenous catecholamine tone all affect what you see at the bedside.`,
    },
    {
      sectionTitle: "Mechanism and Bedside Consequence",
      content: `Adrenergic receptors are G-protein-coupled receptors. You do not need to memorize every intracellular pathway to answer most nursing questions, but you should understand the direction of the response.

- **Alpha-1 stimulation** contracts vascular smooth muscle. Blood pressure can rise quickly, but excessive vasoconstriction can reduce perfusion to skin, gut, kidneys, or other vascular beds.
- **Beta-1 stimulation** makes the heart pump harder and often faster. Cardiac output may improve when contractility is the problem, but myocardial oxygen demand and dysrhythmia risk also rise.
- **Beta-2 stimulation** relaxes bronchial smooth muscle. Wheezing and work of breathing should improve with an effective bronchodilator response. Beta-2 stimulation can also move potassium into cells, so frequent or high-dose therapy can lower serum potassium.
- **Central alpha-2 stimulation** decreases sympathetic outflow. Clonidine therefore lowers blood pressure and heart rate despite being an adrenergic receptor agonist.

This receptor-to-consequence link is the core of the lesson: **the same mechanism that creates the therapeutic effect also predicts the adverse effect when stimulation becomes excessive.**`,
    },
    {
      sectionTitle: "Major Adrenergic Agonists: Know the Difference",
      content: `| Medication | Dominant receptor activity | Why it is used | What improvement should look like | What makes you worry |
|---|---|---|---|---|
| **Epinephrine** | Alpha and beta agonist | Anaphylaxis; selected shock states | Improved airway swelling, wheeze, blood pressure and perfusion | Ventricular dysrhythmia, severe hypertension, chest pain, ischemia, extravasation |
| **Norepinephrine** | Alpha-1 dominant with beta-1 activity | Vasopressor support, especially septic/distributive shock | MAP rises with improving mentation, urine output, skin perfusion and other end-organ signs | Digital or visceral ischemia, dysrhythmia, worsening perfusion despite a higher pressure, extravasation |
| **Dobutamine** | Primarily cardiac beta stimulation | Short-term inotropic support when contractility and cardiac output are inadequate | Better cardiac output and end-organ perfusion without excessive tachycardia | New ectopy, tachyarrhythmia, angina, excessive BP rise or hypotension |
| **Dopamine** | Dose-dependent dopaminergic, beta and alpha effects | Selected hemodynamic situations when specifically ordered | Improved perfusion and hemodynamic goal | New dysrhythmia, tachycardia, ischemia, decreased urine output, extravasation |
| **Phenylephrine** | Alpha-1 selective | Vasodilatory hypotension in selected settings | Blood pressure rises | Reflex or severe bradycardia, reduced cardiac output, angina, peripheral or visceral ischemia, extravasation |
| **Albuterol** | Beta-2 selective | Reversible bronchospasm | Easier air movement, less wheeze, lower work of breathing | Paradoxical bronchospasm, escalating rescue use, marked tachycardia, clinically important hypokalemia |
| **Clonidine** | Central alpha-2 agonist | Hypertension and other selected indications; included here as a receptor-pattern comparator | Lower sympathetic tone, heart rate and blood pressure | Bradycardia, hypotension, sedation; rebound hypertension after abrupt withdrawal |

**Exam trap:** phenylephrine can raise blood pressure while the heart rate falls because the pressure increase can trigger reflex vagal bradycardia. Do not automatically interpret a lower heart rate after phenylephrine as evidence that the drug failed.`,
    },
    {
      sectionTitle: "Epinephrine: The Anaphylaxis Priority",
      content: `When anaphylaxis is suspected, epinephrine is the medication priority. In Canadian guidance, intramuscular epinephrine is given into the **mid-anterolateral thigh**. The Canadian Immunization Guide uses **0.01 mg/kg of the 1 mg/mL solution, maximum 0.5 mg**, and advises repeating the dose every **5 minutes** if symptoms persist.

Do not let antihistamines, IV access, teaching, or documentation delay epinephrine in a patient with anaphylaxis. Epinephrine addresses the physiology that can kill the patient: alpha effects counter vasodilation and vascular leak, beta-1 effects support cardiac output, and beta-2 effects produce bronchodilation.

**Before administering from an ampule or vial, verify the indication, concentration, dose, and route.** Epinephrine concentration and route errors are high-risk medication errors. For anaphylaxis, the exam-ready route is IM in the anterolateral thigh.

Reassess immediately after administration: airway swelling, voice change or stridor, respiratory effort, wheeze, oxygenation, blood pressure, heart rate and rhythm, mental status, skin findings, and overall trajectory. Improvement in one symptom does not end the assessment if airway or circulatory compromise persists.`,
    },
    {
      sectionTitle: "Norepinephrine, Dobutamine, and Shock Physiology",
      content: `A vasopressor and an inotrope solve different hemodynamic problems.

**Norepinephrine primarily raises vascular tone.** Current Surviving Sepsis Campaign guidance recommends norepinephrine as the first-line vasopressor for adults with septic shock. The goal is not simply to make the blood-pressure number look better; the goal is adequate organ perfusion. A rising MAP with worsening mottling, altered mentation, oliguria, chest pain, or cool ischemic extremities is not a reassuring response.

**Dobutamine primarily improves contractility.** It is a short-acting inotrope used when depressed cardiac function is contributing to inadequate output. It can improve stroke volume and cardiac output, but it can also increase heart rate, accelerate AV conduction, and produce ventricular ectopy. Continuous ECG and blood-pressure monitoring are expected during infusion.

In septic shock with cardiac dysfunction and persistent hypoperfusion despite adequate volume status and arterial pressure, current sepsis guidance supports adding an inotrope such as dobutamine to vasopressor therapy in selected patients. That distinction matters: **a vasopressor treats vascular tone; an inotrope treats inadequate pump performance.**`,
    },
    {
      sectionTitle: "Assessment Before Administration",
      content: `Before giving an adrenergic agonist, identify the physiologic problem the order is intended to correct. Then establish a baseline that lets you judge both efficacy and toxicity.

**For vasoactive infusions:**
- Verify current blood pressure and MAP, heart rate, rhythm, mental status, peripheral perfusion, capillary refill, skin temperature and colour, and urine output.
- Review volume status. Vasoconstricting an inadequately filled circulation may raise the pressure while tissue perfusion remains poor.
- Review the vascular access site and trace the infusion from the medication bag to the patient before starting or changing the rate.
- Confirm the medication concentration, pump programming, ordered target, titration parameters, and maximum/minimum limits used by the local protocol.
- Review potassium and other clinically relevant electrolytes when dysrhythmia risk is present.

**For beta-2 bronchodilator therapy:**
- Assess respiratory rate, work of breathing, air entry, wheeze, oxygenation, and ability to speak.
- Ask how often the patient has required rescue doses. Increasing need for albuterol can signal worsening disease rather than simply a need for more medication.
- If frequent/high-dose therapy is being used, consider heart rate/rhythm and potassium monitoring according to the clinical situation and orders.

**For epinephrine in suspected anaphylaxis:** do not postpone treatment to obtain a perfect baseline. Rapid ABC assessment and prompt IM epinephrine take priority.`,
    },
    {
      sectionTitle: "Monitoring: Blood Pressure Is Only One Cue",
      content: `Adrenergic medications can change vital signs within minutes. Monitoring must connect the number on the monitor to tissue perfusion and the indication for treatment.

**Trend these cues:**
- Blood pressure and MAP
- Heart rate and rhythm; continuous ECG for titrated vasoactive/inotropic infusions
- Mental status and level of responsiveness
- Peripheral colour, temperature, pulses, capillary refill and mottling
- Urine output and renal perfusion trend
- Chest pain or new ischemic symptoms
- Oxygenation and work of breathing when beta-2 activity is relevant
- IV site for pain, blanching, swelling, coolness, leaking, slowed infusion or other signs of infiltration/extravasation
- Lactate and other shock markers when ordered and clinically appropriate

**Reassess after every meaningful intervention or titration.** If the MAP rises but the patient becomes more confused, urine output falls, or extremities become cold and mottled, do not chart the medication as simply effective. The pressure target and the perfusion response must be interpreted together.`,
    },
    {
      sectionTitle: "IV Vasopressor and Extravasation Safety",
      content: `Vasopressors are high-alert medications because a small delivery error can rapidly cause severe hypertension, dysrhythmia, ischemia, or tissue injury.

**Safe infusion habits:**
- Use an infusion pump and verify the programmed concentration against the prepared solution and order.
- Trace the line before initiation, titration, handoff, or transfer.
- Use a dedicated lumen when required by policy and verify compatibility before sharing a line.
- Assess the IV site frequently. Pain, blanching, coolness, swelling, sluggish flow, leaking, or loss of blood return can signal infiltration or extravasation.
- Do not ignore a normal-looking monitor if the limb around the IV is changing.

Current sepsis guidance supports starting a needed vasopressor through peripheral access rather than delaying treatment solely until a central line is placed. That does **not** make peripheral administration casual; it makes site selection, secure access, frequent assessment, and rapid escalation essential.

**If extravasation is suspected:** stop the infusion through the affected site and follow the institution's extravasation protocol immediately. Do not simply remove the catheter and walk away; some protocols use the existing catheter for aspiration or antidote administration. Norepinephrine labeling specifically warns that extravasation can cause tissue necrosis and identifies phentolamine as a treatment for the ischemic area.`,
    },
    {
      sectionTitle: "Expected Effects, Side Effects, and Dangerous Toxicity",
      content: `The exam often hinges on whether a finding is an expected pharmacologic effect, a tolerable adverse effect, or evidence of dangerous overstimulation.

| Finding | How to interpret it |
|---|---|
| Mild tremor after inhaled albuterol with improved airflow | Common beta-2-related effect; continue to assess response and severity |
| Modest heart-rate increase after beta stimulation | May occur, but interpret with rhythm, symptoms and the clinical goal |
| New chest pressure, ischemic ECG change or severe tachydysrhythmia | Dangerous adrenergic toxicity or myocardial stress; escalate promptly |
| Rising BP with cool, mottled extremities or worsening urine output on a vasoconstrictor | Pressure may be improving while tissue perfusion worsens; reassess and escalate |
| New marked bradycardia after phenylephrine | Can occur from reflex vagal response; assess cardiac output and hemodynamic stability |
| New wheeze immediately after albuterol | Consider paradoxical bronchospasm; this is not an expected therapeutic response |
| Sudden severe hypertension after stopping clonidine | Think rebound hypertension from abrupt withdrawal |

A useful rule is: **expected effects should move the patient toward the treatment goal without creating new evidence of organ threat.**`,
    },
    {
      sectionTitle: "Medication Reconciliation and Interaction Traps",
      content: `Medication reconciliation matters because other drugs can amplify or blunt adrenergic effects.

Ask specifically about:
- **MAO inhibitors and tricyclic antidepressants:** these can potentiate pressor or cardiovascular responses with some sympathomimetic/catecholamine drugs. Dopamine labeling specifically warns about severe hypertension with MAO inhibitors and hypertension with tricyclic antidepressants.
- **Beta blockers:** beta blockade can blunt the response to beta-agonist therapy. Dobutamine labeling notes reduced effectiveness after beta-blocking therapy, and nonselective beta blockade can complicate bronchodilator response.
- **Other stimulants or sympathomimetics:** prescription stimulants, decongestants, and other adrenergic products can contribute to tachycardia or hypertension.
- **Drugs that increase dysrhythmia risk:** review the rhythm, electrolytes, and concurrent medication list before assuming new ectopy is unrelated to the infusion.

Do not memorize an interaction list without context. The nursing question is usually: **Does this home medication make the ordered adrenergic drug more dangerous, less effective, or harder to interpret?**`,
    },
    {
      sectionTitle: "Drug-Specific Red Flags",
      content: `**Epinephrine**
- New ventricular dysrhythmia
- Severe hypertension
- Chest pain or evidence of myocardial ischemia
- IV extravasation with pain, blanching, or tissue compromise

**Norepinephrine**
- Cool, pale or mottled extremities; weak peripheral pulses
- New ischemic pain or decreasing end-organ perfusion
- Dysrhythmia
- Extravasation or skin changes around the infusion site
- Marked hypotension if the infusion is stopped abruptly

**Dobutamine**
- New ventricular ectopy or tachyarrhythmia
- Rapid ventricular response in a susceptible patient with atrial fibrillation
- Angina or ischemic symptoms
- Excessive BP increase or clinically important hypotension

**Dopamine**
- New dysrhythmia or increasing tachycardia
- Worsening peripheral ischemia
- Decreasing urine output despite hemodynamic treatment
- Extravasation

**Phenylephrine**
- Severe bradycardia or falling cardiac output
- Angina or worsening heart failure
- Peripheral or visceral ischemia
- Extravasation and tissue injury

**Albuterol**
- Paradoxical bronchospasm
- Marked or symptomatic tachycardia
- Clinically important hypokalemia
- Increasing rescue-dose requirement with worsening symptoms

**Clonidine**
- Symptomatic bradycardia or hypotension
- Excessive sedation
- Abrupt discontinuation followed by rapid BP rise, tachycardia, headache or agitation`,
    },
    {
      sectionTitle: "Patient Teaching",
      content: `Teaching depends on the agent and setting.

**Albuterol**
- Demonstrate correct inhaler technique and spacer use when prescribed.
- Explain that needing the rescue inhaler more often than usual can mean the underlying respiratory condition is worsening and should be reassessed.
- Tell the patient to seek help for worsening breathing or wheeze immediately after a dose rather than repeatedly self-dosing through possible paradoxical bronchospasm.

**Epinephrine auto-injector**
- Teach the patient/caregiver to use the device promptly for suspected anaphylaxis according to their emergency plan, inject into the outer thigh as directed, and obtain emergency medical care after use.
- Review device expiry and storage instructions and ensure the patient knows where the device is kept.

**Clonidine**
- Do not stop abruptly. Sudden withdrawal can cause rebound hypertension and sympathetic symptoms.
- Review dizziness, sedation and fall precautions when clinically relevant.

For titrated IV vasopressors and inotropes, bedside teaching should be brief and appropriate to the patient's condition. Explain the purpose of the infusion and monitoring, but do not delay stabilization to deliver a long medication lecture.`,
    },
    {
      sectionTitle: "Common Exam Traps",
      content: `1. **Treating every adrenergic agonist as if it does the same thing.** Receptor profile matters.
2. **Assuming every agonist raises heart rate.** Phenylephrine can cause reflex bradycardia; clonidine can lower heart rate and blood pressure through central alpha-2 activity.
3. **Calling a better BP a successful outcome without checking perfusion.** Vasoconstriction can raise MAP while end-organ perfusion remains poor or worsens.
4. **Delaying epinephrine in anaphylaxis for antihistamines, IV access, documentation, or teaching.** IM epinephrine is the priority.
5. **Ignoring the IV site because the infusion is still running.** Vasopressor extravasation can cause tissue necrosis.
6. **Assuming albuterol is harmless because it is inhaled.** Beta-agonist therapy can cause cardiovascular effects and hypokalemia; paradoxical bronchospasm is an emergency red flag.
7. **Using dopamine as the default first-line vasopressor for adult septic shock.** Current sepsis guidance recommends norepinephrine first line.
8. **Stopping vasoactive therapy abruptly without a plan.** Some catecholamine infusions can produce marked hypotension when suddenly discontinued; titration/weaning should follow orders and protocol.
9. **Teaching an unstable patient before addressing ABCs and perfusion.** Stabilize first, then teach.
10. **Titrating outside the ordered protocol.** The RN can act quickly while still staying within the prescribed target and institutional titration parameters.`,
    },
    {
      sectionTitle: "Clinical Judgment: Read the Pattern, Not One Number",
      content: `**Scenario:** An adult with septic shock is receiving norepinephrine. The MAP rises to the ordered target, but the patient becomes more confused, urine output falls, and the toes are cool and mottled.

**Recognize cues:** the pressure target has improved, but end-organ and peripheral perfusion cues are worsening.

**Analyze cues:** a vasopressor can raise vascular tone without guaranteeing adequate tissue perfusion. Worsening mental status, oliguria and mottling are not explained away by the improved MAP.

**Prioritize hypothesis:** persistent or worsening shock physiology and/or excessive vasoconstriction requires reassessment. The patient is not simply 'stable because the MAP is 65.'

**Take action:** reassess the patient and infusion, verify the current dose and line, assess volume/hemodynamic context and other ordered data, and escalate the worsening perfusion pattern promptly. Continue ordered titration and supportive care within protocol while preparing for changes in the hemodynamic plan.

**Evaluate outcome:** improvement means more than a number. Look for improving mentation, urine output, skin perfusion, hemodynamics, and other ordered perfusion markers without new dysrhythmia or ischemia.`,
    },
    {
      sectionTitle: "Priority Action Sequence",
      content: `When an adrenergic-agonist question feels crowded, use this sequence:

1. **Identify the indication.** Anaphylaxis, bronchospasm, vasodilatory shock, low cardiac output, or another specific problem?
2. **Name the dominant receptor effect.** Alpha-1 squeeze, beta-1 beat, beta-2 breathe, or central alpha-2 sympatholysis?
3. **Check the baseline that matters.** BP/MAP, rhythm, perfusion, respiratory status, IV site, electrolytes, and relevant medication history.
4. **Administer safely.** Correct route, concentration, infusion pump, vascular access, and ordered titration target.
5. **Look for the expected response.** Did the clinical problem improve?
6. **Screen for mechanism-based harm.** Dysrhythmia, ischemia, severe hypertension, bradycardia, hypokalemia, paradoxical bronchospasm, or extravasation.
7. **Escalate and reassess.** Close the safety loop rather than documenting and moving on.`,
    },
    {
      sectionTitle: "Final Rapid Review",
      content: `**Alpha-1 = squeeze.** Vasoconstriction raises vascular resistance and pressure. Watch for ischemia and extravasation.

**Beta-1 = beat.** Contractility and often heart rate increase. Watch for tachydysrhythmia and myocardial ischemia.

**Beta-2 = breathe.** Bronchodilation improves airflow. Watch for tremor, tachycardia, hypokalemia, and paradoxical bronchospasm.

**Alpha-2 = central brake.** Clonidine reduces sympathetic outflow. Do not stop it abruptly because rebound hypertension can occur.

**Epinephrine is the anaphylaxis priority.** In Canadian guidance, IM epinephrine goes into the mid-anterolateral thigh; do not delay it for lower-priority interventions.

**Norepinephrine is the current first-line vasopressor for adult septic shock.** Treat the patient, not just the MAP.

**Dobutamine is an inotrope.** It is about pump performance and cardiac output, not simply squeezing the vessels.

**Phenylephrine may slow the heart.** Reflex bradycardia after alpha-1 vasoconstriction is a classic trap.

**The IV site is part of the assessment.** A vasopressor that leaves the vein can become a limb-threatening problem.

**Best exam habit:** connect receptor → physiologic effect → indication → expected response → toxicity → next nursing action.`,
    },
  ],
} as const;

export type AdrenergicAgonistsRnLesson = typeof adrenergicAgonistsRnLesson;
