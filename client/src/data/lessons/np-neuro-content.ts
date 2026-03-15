import type { LessonContent } from "./types";

export const npNeuroContent: Record<string, LessonContent> = {
  "stroke-advanced-np": {
    title: "Stroke: Advanced NP Management",
    cellular: {
      title: "Ischemic & Hemorrhagic Stroke Pathophysiology",
      content: "Ischemic stroke results from arterial occlusion (thrombotic or embolic), creating a core of irreversible infarction surrounded by a penumbra of salvageable tissue with impaired but viable neurons. Within minutes of occlusion, the ischemic cascade begins: ATP depletion → failure of Na+/K+-ATPase → cytotoxic edema → glutamate excitotoxicity → calcium influx → free radical generation → mitochondrial failure → apoptosis. The penumbra survives via collateral circulation but is time-dependent — 'time is brain' reflects the loss of ~1.9 million neurons per minute during large vessel occlusion. Hemorrhagic stroke involves rupture of cerebral vessels with direct parenchymal destruction, mass effect, and secondary injury from blood breakdown products (hemoglobin-induced oxidative stress, thrombin-mediated inflammation). Intracerebral hemorrhage (ICH) expands in 30-40% of cases within the first 3 hours. Cerebral autoregulation is disrupted in both types, making blood pressure management critical."
    },
    riskFactors: [
      "Atrial fibrillation (5-fold increased risk; responsible for ~25% of ischemic strokes)",
      "Hypertension — most important modifiable risk factor for both ischemic and hemorrhagic stroke",
      "Diabetes mellitus — accelerates atherosclerosis of cerebral and carotid vessels",
      "Carotid artery stenosis > 70% (symptomatic) — annual stroke risk 10-15%",
      "Prior TIA or stroke (highest risk of recurrence in first 90 days)",
      "Smoking — doubles stroke risk through endothelial dysfunction and hypercoagulability",
      "Hyperlipidemia and metabolic syndrome",
      "Patent foramen ovale (PFO) with atrial septal aneurysm — paradoxical embolism in younger patients"
    ],
    diagnostics: [
      "Non-contrast CT head: immediate to rule out hemorrhage (sensitivity ~95% for ICH; may be normal early in ischemic stroke)",
      "CT angiography (CTA) head and neck: identifies large vessel occlusion (LVO) for thrombectomy candidacy",
      "CT perfusion: core vs. penumbra mismatch — extended window patients (6-24 hours) per DAWN/DEFUSE 3 criteria",
      "MRI DWI/FLAIR mismatch: identifies acute ischemia (DWI+) without established infarction (FLAIR-) — useful for wake-up strokes",
      "NIHSS scoring: quantifies deficit severity; LVO suspected if NIHSS ≥ 6",
      "ECG and telemetry: identify atrial fibrillation or other cardioembolic sources",
      "Echocardiogram (TTE/TEE): evaluate for intracardiac thrombus, PFO, valvular disease",
      "Lipid panel, HbA1c, CBC, BMP, coagulation studies, troponin"
    ],
    management: [
      "IV alteplase 0.9 mg/kg (max 90 mg) within 4.5 hours of symptom onset: 10% bolus, remainder over 60 minutes",
      "Tenecteplase 0.25 mg/kg (max 25 mg) single IV bolus — non-inferior for LVO, easier administration (AcT trial)",
      "Mechanical thrombectomy for LVO within 24 hours if favorable perfusion imaging (DAWN/DEFUSE 3 criteria)",
      "Blood pressure management: permissive hypertension (< 220/120) if no thrombolysis; < 180/105 for 24 hours post-tPA",
      "ICH: aggressive BP lowering to SBP < 140 mmHg within 1 hour (INTERACT-2/ATACH-2); reverse anticoagulation (4-factor PCC for warfarin, idarucizumab for dabigatran, andexanet for factor Xa inhibitors)",
      "Antiplatelet therapy: aspirin 325 mg within 24-48 hours (24 hours after tPA); dual antiplatelet (aspirin + clopidogrel) for minor stroke/TIA × 21 days (CHANCE/POINT trials)",
      "Statin initiation: high-intensity (atorvastatin 40-80 mg or rosuvastatin 20-40 mg) for atherosclerotic stroke",
      "Anticoagulation for AF-related stroke: DOAC initiation timing per stroke severity (minor 1-3 days, moderate 6-8 days, severe 12-14 days — 1-3-6-12 rule)"
    ],
    nursingActions: [
      "Activate stroke code and document last known well time — critical for treatment eligibility decisions",
      "Perform serial NIHSS assessments: baseline, 2h, 24h post-treatment, and with any neurological change",
      "Monitor for hemorrhagic transformation post-tPA: neuro checks q15 min × 2h, q30 min × 6h, q1h × 16h; hold tPA and obtain STAT CT for any neurological deterioration",
      "Dysphagia screening before any oral intake (failed swallow screen → NPO, speech pathology consult)",
      "Position head of bed at 0-30° in acute phase to maximize cerebral perfusion (elevate to 30° if ICP concerns)",
      "DVT prophylaxis: intermittent pneumatic compression immediately; pharmacological prophylaxis after 24 hours (post-tPA) or when hemorrhage is stable",
      "Blood glucose management: target 140-180 mg/dL; avoid hypoglycemia and hyperglycemia (both worsen outcomes)",
      "Early mobilization within 24-48 hours if stable; coordinate PT/OT/SLP rehabilitation assessment"
    ],
    signs: {
      left: [
        "Minor stroke (NIHSS < 5): isolated facial droop, mild arm drift, mild dysarthria",
        "Lacunar syndromes: pure motor, pure sensory, ataxic hemiparesis",
        "Improving neurological exam with clearing of deficits within 24 hours (TIA resolved)",
        "Stable hemodynamics with controlled blood pressure"
      ],
      right: [
        "Large vessel occlusion: dense hemiplegia, forced eye deviation, hemispatial neglect, aphasia (NIHSS ≥ 15)",
        "Herniation signs: fixed dilated pupil, Cushing triad (HTN, bradycardia, irregular respirations)",
        "Hemorrhagic transformation post-tPA: sudden headache, vomiting, worsening NIHSS, declining consciousness",
        "Malignant MCA edema: progressive midline shift, declining LOC days 2-5 post-stroke"
      ]
    },
    medications: [
      {
        name: "Alteplase (tPA)",
        type: "Fibrinolytic",
        action: "Binds to fibrin in thrombus and converts entrapped plasminogen to plasmin, which degrades the fibrin matrix of the clot, restoring blood flow to the ischemic penumbra",
        sideEffects: "Intracranial hemorrhage (6-7% symptomatic), systemic bleeding, angioedema (5% — especially with concurrent ACEi)",
        contra: "Active internal bleeding, recent (< 3 months) head trauma or stroke, intracranial neoplasm, platelets < 100k, INR > 1.7, BP > 185/110 despite treatment",
        pearl: "Number needed to treat = 10 for good outcome within 3 hours. Door-to-needle target < 45 minutes. Hold all antithrombotics for 24 hours post-administration. Angioedema risk is higher with ACEi — have epinephrine and intubation equipment ready."
      },
      {
        name: "Nimodipine (for SAH vasospasm prevention)",
        type: "Dihydropyridine Calcium Channel Blocker",
        action: "Selectively dilates cerebral arterioles by blocking L-type calcium channels in vascular smooth muscle; reduces cerebral vasospasm and secondary ischemia after subarachnoid hemorrhage",
        sideEffects: "Hypotension, headache, nausea, hepatotoxicity",
        contra: "Severe hypotension, concomitant IV calcium channel blockers",
        pearl: "60 mg PO/NG q4h × 21 days — only medication proven to improve outcomes after SAH. Must be given orally/enterally — never IV (causes fatal hypotension). If patient is hypotensive, give 30 mg q2h instead."
      }
    ],
    pearls: [
      "The 'last known well' time, not the symptom discovery time, determines thrombolytic eligibility — witnesses, phone records, and security cameras can help establish this",
      "A 'normalizing' NIHSS after tPA does not mean treatment is complete — reocclusion occurs in ~15% of cases; continue monitoring per protocol for the full 24 hours",
      "Posterior circulation strokes (basilar artery) may present with isolated vertigo, diplopia, or ataxia — easily missed; maintain high suspicion and low threshold for CTA"
    ],
    quiz: [
      {
        question: "A 68-year-old patient with atrial fibrillation presents with sudden left-sided hemiplegia, left hemispatial neglect, and forced right eye deviation. NIHSS is 18. Last known well was 2 hours ago. Non-contrast CT shows no hemorrhage. What is the most appropriate next step?",
        options: [
          "Administer IV alteplase and obtain CTA to evaluate for thrombectomy candidacy",
          "Start heparin drip for cardioembolic stroke and admit to ICU",
          "Obtain MRI brain to confirm ischemic stroke before any treatment",
          "Administer aspirin 325 mg and clopidogrel 300 mg loading dose"
        ],
        correct: 0,
        rationale: "This patient has a large vessel occlusion (high NIHSS, cortical signs, forced eye deviation) within the tPA window. IV alteplase should be started immediately while CTA is obtained to assess for LVO amenable to thrombectomy. The 'drip and ship' approach (tPA + thrombectomy) has the best outcomes for LVO. MRI would delay treatment, heparin is not first-line for acute ischemic stroke, and antiplatelets alone are insufficient for LVO."
      }
    ]
  },
  "seizure-safety-np": {
    title: "Seizure Disorders: Safety & Management",
    cellular: {
      title: "Seizure Pathophysiology & Classification",
      content: "Seizures result from abnormal, excessive, synchronous neuronal discharge in the cerebral cortex. The balance between excitatory (glutamate, NMDA/AMPA receptors) and inhibitory (GABA, chloride channel) neurotransmission is disrupted. In focal seizures, a discrete cortical focus generates paroxysmal depolarization shifts (PDS) — sustained depolarization driven by calcium influx through NMDA receptors, followed by GABA-mediated hyperpolarization. When inhibitory surround fails, the seizure propagates. Generalized seizures involve bilateral hemispheric networks from onset, often through thalamocortical circuits. Status epilepticus (SE) occurs when seizure-terminating mechanisms fail: GABA-A receptor internalization begins within 5 minutes of continuous seizure activity, while NMDA receptor expression increases on the cell surface — this explains why benzodiazepines become less effective and why treatment urgency is paramount. After 30 minutes of SE, excitotoxic neuronal death begins, with hippocampal neurons being most vulnerable."
    },
    riskFactors: [
      "Prior brain injury: TBI, stroke, CNS infection (strongest acquired risk factors)",
      "Family history of epilepsy (genetic generalized epilepsy syndromes)",
      "Structural brain abnormalities: cortical dysplasia, mesial temporal sclerosis, tumors",
      "Metabolic derangements: hyponatremia (< 120 mEq/L), hypoglycemia, hypocalcemia, uremia, hepatic encephalopathy",
      "Medication non-adherence (most common cause of breakthrough seizures in known epileptics)",
      "Alcohol withdrawal (seizures typically 12-48 hours after last drink)",
      "Sleep deprivation and extreme physiological stress",
      "Drug toxicity: tramadol, bupropion, fluoroquinolones, theophylline, cyclosporine"
    ],
    diagnostics: [
      "EEG (routine and prolonged): identifies epileptiform discharges, seizure focus lateralization, and subclinical seizures; continuous EEG (cEEG) monitoring for status epilepticus",
      "MRI brain with epilepsy protocol: 3T with thin coronal cuts through temporal lobes to identify mesial temporal sclerosis, cortical dysplasia, tumors, vascular malformations",
      "Basic metabolic panel: sodium, glucose, calcium, magnesium, BUN — rule out metabolic seizure causes",
      "Antiepileptic drug levels: carbamazepine, phenytoin, valproic acid, lamotrigine (if on these medications)",
      "Urine drug screen and blood alcohol level in new-onset seizures",
      "LP if CNS infection suspected: cell count, protein, glucose, cultures, HSV PCR, autoimmune encephalitis panel",
      "CT head (emergent): rule out hemorrhage, mass effect, hydrocephalus in acute presentation",
      "Genetic testing: SCN1A, KCNQ2, CDKL5 in pediatric onset or refractory cases"
    ],
    management: [
      "Status epilepticus protocol: lorazepam 4 mg IV (repeat × 1) → levetiracetam 60 mg/kg IV (max 4500 mg) OR fosphenytoin 20 mg PE/kg IV OR valproic acid 40 mg/kg IV → refractory SE: midazolam or propofol infusion with continuous EEG",
      "First-line AEDs for focal epilepsy: lamotrigine, levetiracetam, oxcarbazepine (evidence-based monotherapy)",
      "First-line for generalized epilepsy: valproic acid (most effective but teratogenic), lamotrigine, levetiracetam",
      "Women of childbearing potential: avoid valproic acid; prefer lamotrigine or levetiracetam; prescribe folic acid 1-4 mg/day",
      "AED withdrawal consideration after 2+ seizure-free years: normal EEG, normal MRI, no risk factors — gradual taper over 2-6 months",
      "Surgical evaluation for drug-resistant epilepsy (failed 2 appropriate AEDs at adequate doses): temporal lobectomy achieves seizure freedom in 60-70% of mesial temporal lobe epilepsy",
      "Vagus nerve stimulation or responsive neurostimulation for non-surgical candidates",
      "Rescue therapy at home: intranasal midazolam 5 mg or diazepam rectal 0.2 mg/kg for prolonged seizures > 5 minutes"
    ],
    nursingActions: [
      "During active seizure: ensure safety (side rails padded, remove hazards), position on side to maintain airway, time seizure duration, do NOT place anything in mouth",
      "Continuous monitoring during and after seizure: SpO2, cardiac rhythm, level of consciousness, postictal period characteristics",
      "Administer rescue benzodiazepine for seizure lasting > 5 minutes per protocol — early treatment improves SE outcomes (RAMPART trial: IM midazolam equivalent to IV lorazepam)",
      "Post-seizure assessment: airway patency, tongue laceration, posterior shoulder dislocation, aspiration risk, Todd paralysis vs. new stroke",
      "Monitor therapeutic AED levels and assess for medication side effects (Stevens-Johnson syndrome with lamotrigine/carbamazepine/phenytoin, hepatotoxicity with valproic acid)",
      "Seizure precautions: bed in lowest position, padded side rails, suction and O2 at bedside, IV access maintained",
      "Patient education: driving restrictions (seizure-free period varies by province/state), medication adherence, trigger avoidance (sleep deprivation, alcohol, missed doses)",
      "Document seizure characteristics: aura, onset pattern, movements (focal vs. bilateral), duration, postictal state — this information guides classification and management"
    ],
    signs: {
      left: [
        "Focal seizure with awareness preserved: unilateral hand twitching, lip smacking, déjà vu (temporal lobe aura)",
        "Brief (< 2 minutes) self-terminating generalized tonic-clonic seizure with expected postictal state",
        "Normal interictal neurological exam, returning to baseline within 30 minutes",
        "Responsive to first-line AED with seizure freedom"
      ],
      right: [
        "Status epilepticus: continuous seizure > 5 minutes or recurrent seizures without return to baseline (medical emergency)",
        "Non-convulsive status epilepticus: persistent altered consciousness without motor manifestations (requires cEEG to diagnose)",
        "Postictal Todd paralysis lasting > 24 hours (consider stroke mimic)",
        "Refractory SE not responding to second-line AED (requires intubation and continuous IV anesthesia with cEEG monitoring)"
      ]
    },
    medications: [
      {
        name: "Levetiracetam (Keppra)",
        type: "Antiepileptic Drug (SV2A modulator)",
        action: "Binds synaptic vesicle protein 2A (SV2A), modulating neurotransmitter release; reduces excitatory neurotransmission without affecting GABA or sodium channels directly",
        sideEffects: "Behavioral changes (irritability, aggression — 'Keppra rage'), somnolence, dizziness, headache",
        contra: "Known hypersensitivity; use caution in severe renal impairment (dose adjustment required for CrCl < 80 mL/min)",
        pearl: "No hepatic metabolism, no drug interactions, no need for therapeutic drug monitoring, IV-to-PO bioequivalence — ideal first-line choice especially in polypharmacy patients. Behavioral side effects may be mitigated with pyridoxine (vitamin B6) supplementation. Loading dose 60 mg/kg IV (max 4500 mg) for status epilepticus."
      },
      {
        name: "Lorazepam (Ativan)",
        type: "Benzodiazepine (GABA-A agonist)",
        action: "Enhances GABA-A receptor activity by increasing chloride channel opening frequency, rapidly terminating seizure activity; longer duration of action than diazepam in the CNS due to lower lipophilicity",
        sideEffects: "Respiratory depression, sedation, hypotension, paradoxical agitation",
        contra: "Severe respiratory failure, acute narrow-angle glaucoma",
        pearl: "First-line for status epilepticus: 0.1 mg/kg IV (max 4 mg per dose), may repeat once after 5 minutes. Acts within 2-3 minutes IV. Must be refrigerated (loses potency at room temperature). GABA-A receptors internalize after ~5 minutes of continuous seizure — this is why early benzodiazepine administration is critical."
      }
    ],
    pearls: [
      "Status epilepticus is a time-dependent emergency: GABA-A receptor internalization begins at 5 minutes, making benzodiazepines progressively less effective — the RAMPART trial showed that IM midazolam given by paramedics was superior to IV lorazepam given in the ED due to faster administration",
      "First unprovoked seizure does not always require AED initiation — the 2-year recurrence risk is ~40% overall but > 60% if abnormal EEG or structural lesion exists; shared decision-making with the patient is key",
      "Women with epilepsy require pre-conception counseling: valproic acid has 10% major malformation rate; lamotrigine levels drop 50-70% during pregnancy requiring dose increases; folic acid 4 mg/day is recommended"
    ],
    quiz: [
      {
        question: "A patient with epilepsy is brought to the ED with continuous generalized tonic-clonic seizure activity lasting 8 minutes. Lorazepam 4 mg IV was given 3 minutes ago without effect. What is the most appropriate next step?",
        options: [
          "Repeat lorazepam 4 mg IV and wait for effect",
          "Administer levetiracetam 60 mg/kg IV or fosphenytoin 20 mg PE/kg IV",
          "Proceed directly to propofol infusion and intubation",
          "Obtain an emergent CT head before any further treatment"
        ],
        correct: 1,
        rationale: "After failure of initial benzodiazepine therapy in status epilepticus, second-line treatment should be initiated immediately. Levetiracetam, fosphenytoin, or valproic acid are recommended second-line agents per the ESETT trial (all equally effective). Repeating benzodiazepines after the first dose has failed delays definitive treatment. Propofol/continuous infusion is reserved for refractory SE. CT can wait until seizures are controlled."
      }
    ]
  },
  "tbi-management-np": {
    title: "Traumatic Brain Injury: NP Management",
    cellular: {
      title: "TBI Primary and Secondary Injury Mechanisms",
      content: "Traumatic brain injury involves primary injury (direct mechanical damage at impact: contusion, diffuse axonal injury [DAI], hemorrhage) and secondary injury (evolving cascade hours to days later). Primary injury causes immediate neuronal death, axonal shearing (DAI from rotational acceleration-deceleration), and vascular disruption. Secondary injury mechanisms include: cerebral edema (cytotoxic from cellular swelling and vasogenic from BBB disruption), excitotoxicity (glutamate release → NMDA receptor activation → calcium influx), mitochondrial dysfunction, free radical damage, neuroinflammation (microglial activation, cytokine release), and coagulopathy (tissue factor release from injured brain triggering DIC in ~30% of severe TBI). Elevated intracranial pressure (ICP) from edema and hemorrhage compromises cerebral perfusion pressure (CPP = MAP - ICP). When ICP exceeds 22 mmHg, cerebral blood flow decreases, leading to ischemia. Uncal herniation occurs when temporal lobe mass effect pushes the uncus through the tentorial notch, compressing CN III (ipsilateral fixed dilated pupil) and the cerebral peduncle (contralateral hemiparesis)."
    },
    riskFactors: [
      "Falls (leading cause in elderly > 65; leading cause overall)",
      "Motor vehicle accidents (leading cause in younger adults 15-44)",
      "Anticoagulant/antiplatelet use — increases risk of traumatic ICH and hematoma expansion",
      "Alcohol intoxication (present in 30-50% of TBI cases; impairs assessment)",
      "Prior TBI — increases susceptibility to subsequent injury (second impact syndrome in athletes)",
      "Age extremes: elderly (brain atrophy stretches bridging veins) and infants (open fontanelles, high head-to-body ratio)",
      "Contact sports participation without proper protective equipment",
      "Coagulopathy (liver disease, hemophilia, DIC)"
    ],
    diagnostics: [
      "Non-contrast CT head: first-line imaging — identifies epidural hematoma (lens-shaped, arterial, doesn't cross sutures), subdural hematoma (crescent-shaped, venous, crosses sutures), traumatic SAH, contusions, skull fractures",
      "Glasgow Coma Scale: mild 13-15, moderate 9-12, severe 3-8 — serial assessment guides management",
      "CT angiography: evaluate for traumatic vascular injury (dissection, pseudoaneurysm) if mechanism suggests",
      "MRI brain: superior for DAI (DWI/SWI sequences), non-hemorrhagic contusions, posterior fossa injuries; not urgent but important for prognosis",
      "ICP monitoring: indicated for GCS ≤ 8 with abnormal CT; EVD (gold standard — therapeutic and diagnostic) or intraparenchymal monitor",
      "Serum biomarkers: S100B or GFAP/UCH-L1 (FDA-approved) may help guide CT decision in mild TBI (negative predictive value)",
      "Coagulation studies: PT/INR, PTT, fibrinogen, platelet count — TBI-induced coagulopathy common",
      "C-spine imaging: CT cervical spine mandatory in moderate-severe TBI (10-15% concurrent cervical injury)"
    ],
    management: [
      "ICP management target: ICP < 22 mmHg and CPP 60-70 mmHg (BTF guidelines 4th edition)",
      "Tier 1: HOB 30°, midline head position, sedation (propofol or midazolam), analgesia, normothermia, normoventilation (PaCO2 35-40 mmHg), osmotherapy (mannitol 0.25-1 g/kg or hypertonic saline 23.4% 30 mL)",
      "Tier 2: CSF drainage via EVD (if in place), mild hyperventilation (PaCO2 30-35 mmHg — temporary only), neuromuscular blockade",
      "Tier 3: Decompressive craniectomy (RESCUE-ICP trial showed reduced mortality but increased disability), barbiturate coma (pentobarbital), therapeutic hypothermia (evidence limited)",
      "Surgical evacuation: epidural hematoma > 30 mL or thickness > 15 mm; acute SDH > 10 mm thickness or midline shift > 5 mm with declining neuro exam",
      "Seizure prophylaxis: levetiracetam or phenytoin × 7 days for severe TBI (prevents early post-traumatic seizures only; no benefit for late epilepsy prevention)",
      "DVT prophylaxis: LMWH starting 24-48 hours after stable repeat CT showing no hemorrhage progression",
      "Reverse anticoagulation urgently: warfarin → 4-factor PCC + vitamin K; DOACs → specific reversal agents; antiplatelet → consider platelet transfusion if surgical"
    ],
    nursingActions: [
      "Neurological assessment q1h or more frequently: GCS (eye, verbal, motor components separately), pupil size and reactivity, focal deficits, signs of herniation",
      "ICP monitoring: maintain transducer at level of tragus (foramen of Monro), trend ICP waveforms (P2 > P1 indicates poor compliance), alert for sustained ICP > 22",
      "Maintain CPP 60-70: titrate vasopressors (norepinephrine) and osmotherapy to maintain target; avoid excessive MAP that worsens cerebral edema",
      "Prevent secondary insults: avoid hypotension (SBP < 90 single episode doubles mortality), hypoxia (SpO2 < 90%), hyperthermia (fever increases ICP and metabolic demand), hyperglycemia (target 140-180 mg/dL)",
      "HOB at 30°, cervical collar management if C-spine not cleared, midline head position to promote venous drainage",
      "Osmotherapy administration: mannitol via filter needle (crystallizes), monitor serum osmolality (hold if > 320 mOsm/L); hypertonic saline via central line, monitor sodium (target < 160 mEq/L)",
      "EVD management: level to prescribed height, maintain closed sterile system, assess CSF color and volume, zero-reference at tragus",
      "Family support and prognostic communication: brain injury recovery is prolonged and variable; early prognostication in severe TBI should be cautious"
    ],
    signs: {
      left: [
        "Mild TBI (GCS 13-15): headache, brief LOC or amnesia, normal CT, oriented and following commands",
        "Improving GCS trend with symmetric reactive pupils",
        "Stable ICP < 22 mmHg with good waveform compliance (P1 > P2)",
        "Small epidural or subdural hematoma stable on repeat imaging, managed non-operatively"
      ],
      right: [
        "Unilateral fixed dilated pupil — uncal herniation until proven otherwise (emergent intervention needed)",
        "Cushing triad: hypertension, bradycardia, irregular respirations — late sign of critically elevated ICP",
        "Rapid GCS decline (≥ 2 points) indicating hematoma expansion or worsening edema",
        "Refractory ICP > 25 mmHg despite maximal medical therapy — consider decompressive craniectomy"
      ]
    },
    medications: [
      {
        name: "Hypertonic Saline (3% or 23.4%)",
        type: "Osmotic Agent",
        action: "Creates osmotic gradient drawing water from cerebral interstitium into the intravascular space, reducing cerebral edema and ICP; also augments MAP through plasma volume expansion, potentially improving CPP",
        sideEffects: "Hypernatremia, central pontine myelinolysis (if sodium corrected too rapidly in hyponatremic patients), volume overload, phlebitis (give concentrated solutions via central line)",
        contra: "Hypernatremia (Na+ > 160 mEq/L), decompensated heart failure",
        pearl: "23.4% bolus (30 mL over 10-20 minutes via central line) for acute herniation — acts within minutes. 3% continuous infusion (0.5-1 mL/kg/hr) for sustained ICP control. Unlike mannitol, does not cause diuresis/hypovolemia and has no osmolality ceiling. Monitor sodium q4-6h."
      },
      {
        name: "Mannitol",
        type: "Osmotic Diuretic",
        action: "Osmotic agent that draws water from brain tissue into intravascular space; also reduces blood viscosity, improving cerebral microcirculation and triggering autoregulatory vasoconstriction that reduces cerebral blood volume",
        sideEffects: "Hypovolemia, electrolyte disturbances (hyponatremia, hypokalemia), rebound ICP elevation, acute kidney injury (especially with osmolal gap > 55)",
        contra: "Serum osmolality > 320 mOsm/L, active intracranial bleeding (theoretical expansion from dehydration of normal tissue), severe dehydration",
        pearl: "0.25-1 g/kg IV bolus over 15-20 minutes; onset 15-30 minutes, peak effect 1-2 hours. Administer through filter needle (crystals form). Replace volume aggressively — mannitol's diuretic effect can cause hypovolemia and hypotension, worsening CPP. Check osmolality before each dose."
      }
    ],
    pearls: [
      "A single episode of hypotension (SBP < 90 mmHg) in severe TBI doubles mortality — aggressive BP management and fluid resuscitation are critical in the prehospital and ED settings",
      "The 'talk and deteriorate' pattern (lucid interval followed by decline) is classic for epidural hematoma from middle meningeal artery rupture — any TBI patient who was initially conscious then deteriorates needs emergent CT and likely surgical evacuation",
      "Early decompressive craniectomy reduces mortality in severe TBI but increases rates of severe disability — shared decision-making with family is essential; the RESCUE-ICP trial informs these discussions"
    ],
    quiz: [
      {
        question: "A 45-year-old patient with severe TBI (GCS 6) has an EVD in place. ICP has been trending upward and is now 28 mmHg despite the HOB at 30°, sedation, and a mannitol bolus 1 hour ago. Serum osmolality is 310 mOsm/L. What is the most appropriate next intervention?",
        options: [
          "Repeat mannitol bolus at 1 g/kg",
          "Administer 23.4% hypertonic saline 30 mL via central line and drain CSF from EVD",
          "Initiate therapeutic hypothermia to 33°C",
          "Immediately hyperventilate to PaCO2 of 25 mmHg"
        ],
        correct: 1,
        rationale: "With ICP refractory to mannitol and osmolality approaching but not yet at the 320 ceiling, hypertonic saline 23.4% is appropriate as it works through a different osmotic mechanism and doesn't have the same osmolality ceiling. Additionally, CSF drainage via the EVD is a rapid, effective method to reduce ICP. Aggressive hyperventilation to PaCO2 25 causes cerebral vasoconstriction and ischemia. Hypothermia has not shown consistent benefit in adult TBI. A second mannitol dose could be considered but HTS + CSF drainage is the better tiered approach."
      }
    ]
  },
  "sah-management-np": {
    title: "Subarachnoid Hemorrhage: NP Management",
    cellular: {
      title: "SAH Pathophysiology & Vasospasm",
      content: "Aneurysmal subarachnoid hemorrhage (aSAH) occurs when a cerebral aneurysm (most commonly at the anterior communicating artery, posterior communicating artery, or MCA bifurcation) ruptures, flooding the subarachnoid space with arterial blood. The initial hemorrhage causes a transient spike in ICP approaching MAP, producing transient global cerebral ischemia (causing the 'thunderclap headache' and frequent LOC). Blood in the subarachnoid space triggers inflammatory cascades: oxyhemoglobin breakdown products cause endothelial dysfunction and free radical damage. Cerebral vasospasm peaks at days 4-14 (delayed cerebral ischemia [DCI]) through multiple mechanisms: nitric oxide scavenging by free hemoglobin, endothelin-1 upregulation, inflammation-mediated vessel narrowing, and cortical spreading depolarizations. DCI is the leading cause of morbidity in SAH survivors and occurs in ~30% of patients. Additional complications include acute hydrocephalus (blood obstructing CSF drainage), rebleeding (4-12% in first 24 hours without treatment), cardiac stunning (neurogenic stunned myocardium), and neurogenic pulmonary edema from catecholamine surge."
    },
    riskFactors: [
      "Unruptured intracranial aneurysm (prevalence 2-3% of population; rupture risk increases with size > 7 mm)",
      "Hypertension — most important modifiable risk factor for aneurysm formation and rupture",
      "Smoking — 3-fold increased risk; synergistic with hypertension",
      "Family history of SAH or aneurysm (first-degree relative doubles risk; screen if ≥ 2 affected family members)",
      "Female sex and age > 50 (hormonal factors — estrogen decline)",
      "Excessive alcohol use (> 150 g/week) and cocaine/amphetamine use (acute hypertensive crisis)",
      "Autosomal dominant polycystic kidney disease (10-15% have intracranial aneurysms)",
      "Connective tissue disorders: Ehlers-Danlos type IV, Marfan syndrome, fibromuscular dysplasia"
    ],
    diagnostics: [
      "Non-contrast CT head: sensitivity 98% within 6 hours (decreases with time — 93% at 24h, ~50% at 1 week); look for blood in basal cisterns, sylvian fissure, interhemispheric fissure",
      "LP if CT negative but clinical suspicion high: xanthochromia (bilirubin spectrophotometry — present > 12 hours after bleed), elevated RBCs that do NOT clear in sequential tubes",
      "CT angiography: identifies aneurysm location, size, morphology (sensitivity > 95% for aneurysms ≥ 3 mm)",
      "Digital subtraction angiography (DSA): gold standard for aneurysm characterization and treatment planning",
      "Hunt-Hess grade (I-V) and modified Fisher scale (0-4): prognostic and guide management intensity",
      "Transcranial Doppler (TCD): daily monitoring for vasospasm — MCA velocity > 120 cm/s suggests vasospasm, > 200 cm/s indicates severe vasospasm",
      "Continuous EEG: monitor for seizures (prevalence 10-20%) and cortical spreading depolarizations",
      "ECG and troponin: neurogenic cardiac injury (ST changes, T-wave inversions — 'cerebral T waves', troponin elevation in up to 30%)"
    ],
    management: [
      "Aneurysm securing within 24 hours: endovascular coiling (preferred for most; ISAT trial) or surgical clipping (favored for MCA aneurysms, wide-neck aneurysms, or mass effect)",
      "Nimodipine 60 mg PO/NG q4h × 21 days — only proven medication to improve outcomes (reduces DCI risk by 34%)",
      "Vasospasm/DCI prevention and treatment: euvolemia (avoid hypovolemia), induced hypertension (target SBP 180-220 if DCI confirmed), consider intra-arterial vasodilator therapy or balloon angioplasty for refractory vasospasm",
      "BP management pre-securing: SBP < 160 mmHg (balance rebleeding prevention with perfusion maintenance); post-securing: more permissive",
      "EVD placement for acute hydrocephalus (GCS decline, CT showing ventriculomegaly); drain CSF to target ICP < 20",
      "Seizure management: treat clinical seizures; routine prophylaxis controversial (phenytoin associated with worse outcomes — avoid; levetiracetam preferred if indicated)",
      "Euvolemia with isotonic fluids (NS or LR at 80-100 mL/hr); AVOID hypotonic fluids (worsen cerebral edema) and dehydration (increases DCI risk)",
      "Venous thromboembolism prophylaxis: pneumatic compression devices immediately; pharmacological prophylaxis (LMWH) 24 hours after aneurysm securing"
    ],
    nursingActions: [
      "Neurological assessments q1h: GCS, pupil exam, focal deficits, headache severity — any decline may indicate rebleeding, vasospasm/DCI, or hydrocephalus",
      "Transcranial Doppler (TCD) monitoring daily days 3-14: trend MCA velocities; report velocities > 120 cm/s and Lindegaard ratio > 3",
      "Monitor for signs of DCI: new focal deficit, confusion, declining consciousness occurring day 4-14 — this is an emergency requiring urgent evaluation and treatment",
      "Strict intake and output: maintain euvolemia (CVP 5-8 mmHg), avoid dehydration (increases DCI risk); IV normal saline at 80-100 mL/hr minimum",
      "Administer nimodipine precisely q4h — hold for SBP < 90 but consider 30 mg q2h for moderate hypotension (do NOT skip doses; give via NG if unable to swallow)",
      "EVD management: maintain at prescribed level, strict aseptic technique, monitor CSF for color changes (bloody → xanthochromic) and signs of infection (fever, cloudy CSF, pleocytosis)",
      "Minimize stimulation in acute phase: dim lighting, limit visitors, stool softeners to prevent Valsalva, control pain and anxiety",
      "Cardiac monitoring: SAH patients develop cardiac arrhythmias and neurogenic stunned myocardium — do not mistake neurogenic ECG changes for primary cardiac events"
    ],
    signs: {
      left: [
        "Hunt-Hess Grade I-II: alert, mild headache, minimal nuchal rigidity, no focal deficits",
        "Modified Fisher 1-2: thin SAH without intraventricular hemorrhage (lower vasospasm risk)",
        "Stable neurological exam with improving headache on nimodipine therapy",
        "TCD velocities < 120 cm/s during vasospasm window"
      ],
      right: [
        "Sudden severe headache with declining consciousness — rebleeding (4-12% in first 24 hours if aneurysm unsecured)",
        "New focal deficit during days 4-14 — delayed cerebral ischemia from vasospasm until proven otherwise",
        "Hunt-Hess Grade IV-V: coma, posturing, severe neurological devastation",
        "Acute hydrocephalus: sudden decline in consciousness with upward gaze palsy (Parinaud syndrome)"
      ]
    },
    medications: [
      {
        name: "Nimodipine",
        type: "Cerebral-selective Calcium Channel Blocker",
        action: "Selectively blocks L-type calcium channels in cerebral vascular smooth muscle; reduces cerebral vasospasm, improves collateral blood flow, and has direct neuroprotective effects (reduces calcium-mediated excitotoxicity)",
        sideEffects: "Hypotension (most significant — may require dose adjustment), headache, nausea, diarrhea, peripheral edema",
        contra: "Severe hypotension, cardiogenic shock, concomitant IV CCBs",
        pearl: "60 mg PO/NG q4h × 21 days — MUST be given orally/enterally, NEVER IV (severe fatal hypotension has occurred with IV administration of oral capsule contents). If hypotension occurs, give 30 mg q2h rather than skipping doses. Start within 96 hours of SAH onset. Angiographic vasospasm may still occur — nimodipine's benefit is primarily through neuroprotection rather than vasodilation."
      },
      {
        name: "Fludrocortisone",
        type: "Mineralocorticoid",
        action: "Promotes sodium and water retention by activating mineralocorticoid receptors in renal collecting duct; combats cerebral salt wasting (CSW) which is common after SAH and leads to hyponatremia with hypovolemia",
        sideEffects: "Hypertension, hypokalemia, edema, hypernatremia",
        contra: "Severe hypertension, heart failure",
        pearl: "0.1-0.2 mg PO/NG BID for cerebral salt wasting. CSW vs. SIADH distinction is critical: both cause hyponatremia but CSW is hypovolemic (treat with volume + fludrocortisone) while SIADH is euvolemic/hypervolemic (treat with fluid restriction). Volume status assessment, urine output, and clinical context guide differentiation."
      }
    ],
    pearls: [
      "The 'worst headache of my life' with sudden onset (thunderclap) is SAH until proven otherwise — 5% of SAH patients have a normal CT; LP is mandatory if clinical suspicion persists and CT is negative",
      "Cerebral salt wasting (CSW) is far more common than SIADH in SAH patients — both cause hyponatremia but CSW requires volume replacement while SIADH requires restriction; treating CSW with fluid restriction is dangerous and worsens DCI risk",
      "Vasospasm window is days 4-14 post-bleed — any neurological deterioration during this period should be treated as DCI until proven otherwise; do not attribute changes to sedation or 'expected course'"
    ],
    quiz: [
      {
        question: "A patient is on day 7 post-SAH (Hunt-Hess Grade III, coiled on day 1). The nurse reports new left arm weakness and confusion developing over 2 hours. TCD shows right MCA velocity of 210 cm/s (was 90 cm/s yesterday). What is the most likely diagnosis and initial management?",
        options: [
          "Rebleeding — obtain emergent CT and lower blood pressure to SBP < 120",
          "Hydrocephalus — place emergent EVD and drain CSF",
          "Delayed cerebral ischemia from vasospasm — IV fluid bolus, raise BP target, consider intra-arterial therapy",
          "Seizure with postictal deficit — administer lorazepam and obtain EEG"
        ],
        correct: 2,
        rationale: "Day 7 falls squarely in the vasospasm window (days 4-14). New focal deficit + dramatically elevated TCD velocity (> 200 cm/s = severe vasospasm) is classic for delayed cerebral ischemia. Management includes ensuring euvolemia/mild hypervolemia, induced hypertension (augmenting CPP), and consideration of endovascular intervention (intra-arterial verapamil/milrinone or balloon angioplasty) if symptoms persist. Rebleeding typically presents with sudden severe headache and rapid decline. Seizure is possible but TCD findings confirm vasospasm."
      }
    ]
  },
  "sci-management-np": {
    title: "Spinal Cord Injury: NP Management",
    cellular: {
      title: "Spinal Cord Injury Pathophysiology",
      content: "Spinal cord injury involves primary mechanical damage (compression, laceration, distraction, or transection) followed by secondary injury cascades that extend damage over hours to weeks. Primary injury disrupts axons, blood vessels, and cell membranes. Secondary injury begins within minutes: hemorrhage in the central gray matter (hemorrhagic necrosis), ischemia from vasospasm and thrombosis of spinal cord microvasculature, excitotoxicity (glutamate release), calcium influx causing protease activation and mitochondrial failure, free radical lipid peroxidation, and inflammatory cell infiltration. Wallerian degeneration of disrupted axons proceeds over days to weeks. Neurogenic shock (distinct from spinal shock) occurs with injuries above T6: loss of sympathetic outflow causes vasodilation, hypotension, and bradycardia with preserved or warm extremities. Spinal shock is the transient loss of all neurological function below the injury level — return of the bulbocavernosus reflex signals its resolution and allows accurate prognosis of injury completeness (ASIA classification)."
    },
    riskFactors: [
      "Motor vehicle accidents (most common cause, ~38%)",
      "Falls (especially in elderly > 65 — often incomplete cervical injuries from minor falls with pre-existing cervical stenosis)",
      "Violence (gunshot wounds, stabbings — ~14%)",
      "Sports injuries (diving into shallow water, contact sports — often complete cervical injuries)",
      "Pre-existing cervical spondylosis or spinal stenosis (central cord syndrome from hyperextension without fracture)",
      "Osteoporosis (vertebral compression fractures from minimal trauma)",
      "Ankylosing spondylitis (rigid spine vulnerable to unstable fractures with minimal mechanism)",
      "Male sex (80% of SCIs), age 16-30 years (peak incidence)"
    ],
    diagnostics: [
      "ASIA (American Spinal Injury Association) Impairment Scale: sensory and motor exam of key dermatomes/myotomes to classify as complete (A) or incomplete (B-D)",
      "CT spine: first-line imaging for bony injury — identifies fractures, dislocations, fragments in canal",
      "MRI spine: assess spinal cord compression, edema, hemorrhage, disc herniation, ligamentous injury — critical for surgical planning",
      "CTA if vascular injury suspected (vertebral artery injury with cervical fractures — up to 20% with facet fractures)",
      "Neurogenic shock assessment: hypotension (MAP < 85) with bradycardia and warm extremities (contrasts with hypovolemic shock: tachycardia, cool extremities)",
      "Respiratory function: FVC (serial q4-6h for cervical injuries — declining FVC indicates ascending edema or diaphragm fatigue), negative inspiratory force (NIF)",
      "Autonomic dysreflexia screening (injuries above T6): baseline BP and triggers",
      "Bladder assessment: post-void residual, urodynamics once stable"
    ],
    management: [
      "Maintain MAP ≥ 85-90 mmHg for 5-7 days post-injury (AANS/CNS guidelines — vasopressors if needed; norepinephrine first-line for neurogenic shock)",
      "Emergent surgical decompression within 24 hours for SCI with ongoing cord compression (STASCIS study — improved motor recovery with early surgery)",
      "Spinal immobilization: cervical collar, log-roll precautions until stability determined by imaging and clinical exam",
      "Respiratory management: cervical injuries above C5 may lose diaphragm function (C3-5); monitor FVC q4-6h (intubate if FVC < 15 mL/kg or declining trend); aggressive pulmonary toilet, incentive spirometry",
      "DVT prophylaxis: LMWH within 72 hours (SCI has highest DVT risk of any diagnosis — up to 80% without prophylaxis); IPC devices concurrently",
      "Bladder management: intermittent catheterization (preferred over indwelling) q4-6h once stable; urodynamics to guide long-term plan",
      "Bowel program: scheduled evacuation, stool softeners, digital stimulation for upper motor neuron bowel; manual evacuation for lower motor neuron bowel",
      "Methylprednisolone is NO LONGER recommended for acute SCI (NASCIS III evidence was weak; complication risk exceeds benefit)"
    ],
    nursingActions: [
      "Serial neurological assessment: motor (key muscles C5-T1, L2-S1) and sensory (key dermatomes) using ASIA exam; document any change — ascending deficits require urgent intervention",
      "Respiratory monitoring for cervical SCI: serial FVC, SpO2, work of breathing assessment — respiratory failure may develop gradually over 24-72 hours as cord edema ascends",
      "Skin integrity: pressure injury prevention is critical — turn q2h with spinal precautions, specialty mattress, skin assessment at every turn (SCI patients have highest pressure injury risk)",
      "Temperature management: poikilothermia (inability to thermoregulate) occurs below injury level — active warming/cooling measures, monitor core temperature",
      "Autonomic dysreflexia (AD) management for injuries ≥ T6: if SBP rises > 20-40 mmHg above baseline with headache/flushing, sit patient up, identify and remove stimulus (most common: bladder distension → straight cath, fecal impaction → disimpact), treat with nifedipine or nitro paste if BP not resolving",
      "DVT assessment: calf measurements daily, Doppler US if asymmetry or edema develops",
      "Psychosocial support: SCI adjustment is profound — screen for depression, facilitate peer support, involve rehabilitation psychology early",
      "Early rehabilitation consultation: PT, OT, SLP (for cervical injuries affecting swallowing), vocational rehabilitation"
    ],
    signs: {
      left: [
        "Incomplete SCI (ASIA B-D): preserved sensation or motor function below injury level",
        "Central cord syndrome: upper extremity weakness > lower (hand weakness most prominent), bladder dysfunction",
        "Stable hemodynamics with MAP > 85 maintained with minimal vasopressor support",
        "Improving motor exam scores on serial ASIA assessment"
      ],
      right: [
        "Complete SCI (ASIA A): no motor or sensory function below injury level including sacral segments (after spinal shock resolution)",
        "Ascending neurological deficit: declining FVC, rising sensory level — suggests expanding cord edema or hematoma (emergent MRI needed)",
        "Autonomic dysreflexia: severe hypertension (SBP > 200), pounding headache, flushing above injury, bradycardia — medical emergency if unresponsive to stimulus removal",
        "Neurogenic shock refractory to vasopressors with worsening bradycardia requiring temporary pacing"
      ]
    },
    medications: [
      {
        name: "Norepinephrine (for neurogenic shock)",
        type: "Alpha-1 and Beta-1 Adrenergic Agonist",
        action: "Potent vasoconstriction (alpha-1) restores SVR lost from sympathetic denervation; mild inotropic effect (beta-1) supports cardiac output; preferred vasopressor for neurogenic shock because it addresses the primary deficit (vasodilation)",
        sideEffects: "Tissue necrosis with extravasation, reflex bradycardia (less common — already bradycardic in neurogenic shock), mesenteric ischemia at high doses",
        contra: "Extravasation risk requires central line; mesenteric ischemia with prolonged high doses",
        pearl: "First-line vasopressor for neurogenic shock in SCI. Target MAP ≥ 85-90 mmHg × 5-7 days (spinal cord perfusion is MAP-dependent like cerebral perfusion). Phenylephrine (pure alpha) is an alternative but may worsen bradycardia. For persistent bradycardia, consider atropine or temporary pacing."
      },
      {
        name: "Enoxaparin (DVT prophylaxis in SCI)",
        type: "Low Molecular Weight Heparin",
        action: "Antithrombin III-mediated inhibition of factor Xa; SCI has the highest DVT risk of any medical condition (up to 80% without prophylaxis in acute phase)",
        sideEffects: "Bleeding, HIT, injection site bruising",
        contra: "Active hemorrhage, HIT, severe thrombocytopenia",
        pearl: "Start within 72 hours of SCI (balance bleeding risk in surgical patients). Continue for at least 3 months or until patient is actively mobilizing. Combine with IPC devices. SCI patients may require higher prophylactic dosing (30 mg BID rather than 40 mg daily) due to extremely high thrombotic risk. Monitor anti-Xa levels in extremes of weight."
      }
    ],
    pearls: [
      "Do NOT confuse neurogenic shock (sympathetic denervation: hypotension + bradycardia + warm extremities) with hypovolemic shock (blood loss: hypotension + tachycardia + cool extremities) — polytrauma patients can have BOTH simultaneously; assume hypovolemia first until ruled out",
      "Autonomic dysreflexia is a life-threatening emergency — the most common triggers are bladder distension (80%) and bowel impaction (15%); the first intervention is always sitting the patient up (reduces BP via orthostatic effect) and identifying/removing the noxious stimulus",
      "Spinal shock (areflexia/loss of all function below injury) can last days to weeks — the bulbocavernosus reflex is the first to return, and its presence allows accurate ASIA classification; do not prognosticate completeness of injury during spinal shock"
    ],
    quiz: [
      {
        question: "A patient with a C6 SCI (ASIA A, 3 weeks post-injury) suddenly develops a pounding headache, profuse sweating above the nipple line, and BP 220/110 (baseline 110/70). HR is 52 bpm. What is the priority nursing action?",
        options: [
          "Administer labetalol 20 mg IV push to lower BP and call rapid response",
          "Sit the patient up, check for bladder distension, and straight catheterize if distended",
          "Administer morphine 4 mg IV for headache and reassess in 15 minutes",
          "Lower the HOB flat and infuse a 500 mL NS bolus for suspected neurogenic shock recurrence"
        ],
        correct: 1,
        rationale: "This is classic autonomic dysreflexia: severe hypertension, headache, diaphoresis above injury level, and bradycardia in a patient with SCI above T6. The immediate priority is to sit the patient upright (orthostatic BP reduction) and identify/remove the triggering stimulus. Bladder distension is the most common trigger (80%) — straight catheterization is the first intervention. If BP does not resolve after removing the stimulus, then pharmacological treatment (nifedipine or nitro paste) is indicated. IV antihypertensives are second-line after addressing the trigger."
      }
    ]
  },
  "multiple-sclerosis-np": {
    title: "Multiple Sclerosis: NP Management",
    cellular: {
      title: "MS Immunopathology & Demyelination",
      content: "Multiple sclerosis is a chronic autoimmune inflammatory demyelinating disease of the CNS. Autoreactive CD4+ T cells (Th1 and Th17 subsets) cross the blood-brain barrier, recognize myelin antigens (myelin basic protein, MOG, PLP), and initiate an inflammatory cascade. Activated microglia and macrophages attack the myelin sheath, while B cells produce pathogenic antibodies and serve as antigen-presenting cells. Complement-mediated demyelination strips the insulating myelin from axons, causing conduction block (saltatory conduction fails without myelin). Acute demyelination causes reversible conduction failure (explains relapse-remission pattern), while chronic inflammation leads to progressive axonal degeneration and gliotic scarring (sclerosis) causing irreversible disability. Oligodendrocyte precursor cells attempt remyelination but become progressively less effective. The Uhthoff phenomenon (heat-induced symptom worsening) occurs because demyelinated axons have reduced safety factor for conduction — even minor temperature increases (0.5°C) can block transmission in partially demyelinated fibers."
    },
    riskFactors: [
      "Geographic latitude — increased prevalence with distance from equator (vitamin D hypothesis: 15-20x more common in northern latitudes)",
      "Female sex (3:1 ratio for RRMS; more equal in progressive forms)",
      "Low vitamin D levels (serum 25-OH-D < 40 nmol/L associated with increased risk and relapse rate)",
      "EBV infection — virtually 100% of MS patients are EBV seropositive; recent large cohort studies show 32-fold increased risk after EBV infection",
      "Family history: first-degree relative with MS (10-20x increased risk); HLA-DRB1*15:01 genotype",
      "Smoking — 1.5-fold increased risk, dose-dependent; accelerates progression and reduces treatment response",
      "Obesity in adolescence (BMI > 30 age 15-20 doubles risk)",
      "Age of onset typically 20-40 years"
    ],
    diagnostics: [
      "MRI brain and spinal cord with gadolinium: T2/FLAIR hyperintense lesions in characteristic locations (periventricular, juxtacortical, infratentorial, spinal cord); gadolinium enhancement indicates active inflammation (< 6 weeks old)",
      "McDonald criteria (2017): dissemination in space (≥ 2 of 4 CNS regions) AND dissemination in time (simultaneous enhancing + non-enhancing lesions, or new T2/enhancing lesion on follow-up MRI)",
      "CSF analysis: oligoclonal bands (present in > 95% of MS; absent in serum = intrathecal synthesis), elevated IgG index — supports diagnosis when MRI is equivocal",
      "Evoked potentials (VEP, SSEP, BAEP): delayed conduction from subclinical demyelination — VEP most useful (prolonged P100 latency)",
      "OCT (optical coherence tomography): retinal nerve fiber layer thinning — biomarker of axonal loss",
      "Serum NfL (neurofilament light chain): marker of axonal damage; useful for monitoring disease activity and treatment response",
      "AQP4-IgG and MOG-IgG antibodies: rule out neuromyelitis optica spectrum disorder (NMOSD) and MOG-AD — treatment differs significantly",
      "Differential exclusion: B12, TSH, ANA, ACE level, HIV, syphilis — to rule out MS mimics"
    ],
    management: [
      "Disease-modifying therapies (DMTs) — start early, treat aggressively (RRMS): options range from platform therapies to highly effective therapies (HETs)",
      "High-efficacy first-line: natalizumab (anti-α4-integrin), ocrelizumab (anti-CD20), ofatumumab (anti-CD20 SC), or alemtuzumab (anti-CD52) — increasingly favored for early aggressive treatment",
      "Platform therapies: dimethyl fumarate, teriflunomide, glatiramer acetate, interferons — lower efficacy but established safety profile",
      "Acute relapse: IV methylprednisolone 1g daily × 3-5 days (accelerates recovery but doesn't change long-term outcome); plasma exchange (PLEX) for steroid-refractory relapses",
      "Progressive MS: ocrelizumab (PPMS — only FDA-approved DMT), siponimod (SPMS with active disease)",
      "Symptom management: fatigue (amantadine, modafinil), spasticity (baclofen, tizanidine), neuropathic pain (gabapentin, duloxetine), bladder dysfunction (oxybutynin, intermittent cath), depression (SSRIs)",
      "Vitamin D supplementation: target serum 25-OH-D 40-60 ng/mL (evidence for reduced relapse rate with supplementation)",
      "Pregnancy counseling: many DMTs are teratogenic (teriflunomide — requires washout; fingolimod — rebound risk); natalizumab can be continued through 30 weeks if high disease activity"
    ],
    nursingActions: [
      "Perform comprehensive neurological assessment: visual acuity, eye movements, strength, coordination, sensation, gait, bladder function — document EDSS (Expanded Disability Status Scale) at each visit",
      "Monitor MRI surveillance: baseline, 6 months after DMT initiation, then annually — new T2 or enhancing lesions indicate breakthrough disease activity",
      "DMT monitoring per medication: natalizumab (JCV antibody index q6 months — PML risk), ocrelizumab (infusion reactions, infection screening, hepatitis B reactivation), fingolimod (first-dose cardiac monitoring, macular edema screening)",
      "Teach relapse recognition vs. pseudo-relapse: true relapse = new or worsening neurological symptom lasting > 24 hours in absence of fever/infection; pseudo-relapse = temporary symptom worsening from heat, infection, stress (Uhthoff phenomenon)",
      "Bladder management: assess post-void residual (PVR > 100 mL suggests retention); teach intermittent self-catheterization if indicated; UTI prevention strategies (frequent UTIs can trigger relapses)",
      "Fall prevention: assess gait, balance, spasticity; recommend assistive devices early; home safety evaluation",
      "Fatigue management: energy conservation techniques, scheduled rest periods, exercise within tolerance (aerobic exercise improves fatigue — moderate intensity 30 min × 3/week)",
      "Vaccination counseling: avoid live vaccines on immunosuppressive DMTs; inactivated vaccines should be given ≥ 6 weeks before starting DMT if possible"
    ],
    signs: {
      left: [
        "Optic neuritis: unilateral painful vision loss with afferent pupillary defect (common first presentation)",
        "Sensory symptoms: numbness, tingling, Lhermitte sign (electric shock down spine with neck flexion)",
        "Uhthoff phenomenon: temporary symptom worsening with heat/exercise that resolves with cooling",
        "Stable EDSS on established DMT with no new MRI lesions (NEDA — No Evidence of Disease Activity)"
      ],
      right: [
        "Brainstem syndrome: internuclear ophthalmoplegia (MLF lesion), trigeminal neuralgia, intractable vertigo",
        "Rapidly progressing disability: EDSS increase ≥ 1 point sustained over 6 months despite DMT (treatment failure — escalate therapy)",
        "PML symptoms on natalizumab: progressive cognitive decline, personality changes, focal deficits without enhancement on MRI (JCV reactivation)",
        "Severe relapse unresponsive to IV steroids (consider PLEX or escalation of DMT)"
      ]
    },
    medications: [
      {
        name: "Ocrelizumab (Ocrevus)",
        type: "Anti-CD20 Monoclonal Antibody",
        action: "Depletes CD20-positive B cells through antibody-dependent cellular cytotoxicity and complement-mediated lysis; B cells contribute to MS through antigen presentation, cytokine production, and pathogenic antibody secretion",
        sideEffects: "Infusion reactions (34% — premedicate with methylprednisolone, diphenhydramine, acetaminophen), increased infection risk (URI, herpes reactivation), hepatitis B reactivation, potential increased malignancy risk (long-term data accumulating)",
        contra: "Active hepatitis B, severe active infections, known hypersensitivity",
        pearl: "Only DMT with FDA approval for PPMS (ORATORIO trial). Dosing: 300 mg IV × 2 doses 14 days apart (loading), then 600 mg IV q6 months. Screen for hepatitis B (HBsAg, anti-HBc) before starting. IgG levels should be monitored annually — progressive hypogammaglobulinemia increases infection risk. Vaccinations should be completed ≥ 6 weeks before initiation."
      },
      {
        name: "Natalizumab (Tysabri)",
        type: "Anti-α4-integrin Monoclonal Antibody",
        action: "Blocks α4β1-integrin on lymphocytes, preventing their adhesion to VCAM-1 on brain endothelium and migration across the BBB; reduces CNS inflammatory infiltration by ~90%",
        sideEffects: "PML (progressive multifocal leukoencephalopathy from JCV reactivation — risk increases with JCV antibody index > 1.5, prior immunosuppression, and treatment duration > 2 years), infusion reactions, hepatotoxicity",
        contra: "PML history, concurrent immunosuppressive therapy, JCV antibody index > 1.5 after 2 years of treatment (relative — risk-benefit discussion)",
        pearl: "Highly effective (68% relapse reduction vs. placebo). JCV antibody testing q6 months — if index > 1.5 after 2+ years, PML risk approaches 1/100; consider switching to anti-CD20 therapy. Extended interval dosing (q6 weeks) may reduce PML risk while maintaining efficacy. Rebound disease activity occurs upon discontinuation — bridge to another HET within 4-6 weeks."
      }
    ],
    pearls: [
      "EBV infection is now considered virtually essential for MS development — the landmark 2022 Science paper (Bjornevik et al.) showed 32-fold increased MS risk after EBV infection, with no cases in EBV-seronegative individuals; this has transformed understanding of MS etiology",
      "The 'treat early, treat effectively' paradigm has shifted to high-efficacy therapies first-line for many patients — waiting for platform therapy failure before escalating loses the window of greatest treatment benefit (brain reserve hypothesis)",
      "Lhermitte sign (electric shock sensation down the spine/limbs with neck flexion) is highly suggestive of posterior column demyelination in the cervical cord — while not specific to MS, in a young adult with other suggestive features it should prompt urgent MRI"
    ],
    quiz: [
      {
        question: "A 32-year-old woman with RRMS on natalizumab for 3 years has a JCV antibody index that has risen to 2.1 (previously 0.7). She has had no relapses on therapy. What is the most appropriate management?",
        options: [
          "Continue natalizumab as she is clinically stable and the risk is acceptable",
          "Discontinue natalizumab and transition to ocrelizumab or another high-efficacy DMT within 4-6 weeks",
          "Add oral prednisone to reduce PML risk while continuing natalizumab",
          "Switch to glatiramer acetate as it has no PML risk"
        ],
        correct: 1,
        rationale: "JCV antibody index > 1.5 with > 2 years of natalizumab treatment places her at significant PML risk (~1/100). The standard of care is to transition to another high-efficacy therapy (ocrelizumab is the most common switch). The transition must be done within 4-6 weeks to minimize rebound disease activity. Continuing natalizumab carries unacceptable PML risk. Switching to a platform therapy (glatiramer) risks rebound relapses. Steroids do not mitigate PML risk."
      }
    ]
  },
  "als-management-np": {
    title: "ALS: NP Management",
    cellular: {
      title: "ALS Motor Neuron Degeneration",
      content: "Amyotrophic lateral sclerosis (ALS) is a progressive neurodegenerative disease affecting both upper motor neurons (UMN) in the motor cortex and lower motor neurons (LMN) in the brainstem and spinal cord. The pathology involves TDP-43 protein misfolding and aggregation in motor neurons (present in >97% of ALS cases), causing proteasome dysfunction, RNA processing abnormalities, and ultimately neuronal death. SOD1 mutations (20% of familial ALS, 2% of sporadic) cause toxic gain-of-function with superoxide dismutase misfolding. C9orf72 hexanucleotide repeat expansion is the most common genetic cause (40% of familial, 8% of sporadic), producing toxic dipeptide repeat proteins and RNA foci. Motor neuron death leads to progressive denervation of skeletal muscle with fasciculations (spontaneous motor unit firing from denervated fibers), atrophy, and weakness. The disease typically spreads contiguously through spinal cord segments (prion-like propagation of TDP-43 pathology). Death usually results from respiratory failure due to diaphragm and intercostal muscle denervation, with median survival 2-5 years from symptom onset."
    },
    riskFactors: [
      "Age 55-75 years (peak incidence; rare before age 40)",
      "Male sex (1.5:1 male predominance in sporadic ALS)",
      "Family history (10% familial — autosomal dominant; C9orf72 most common, SOD1, FUS, TARDBP mutations)",
      "Military service (1.5-2x increased risk — mechanism unclear; environmental exposures hypothesized)",
      "Smoking (moderate risk factor; dose-dependent)",
      "Intense physical activity (controversial — possible risk factor in genetically susceptible individuals)",
      "Head trauma history (possible risk factor; epidemiological data mixed)",
      "Environmental toxins: lead, pesticides, heavy metals (associative data)"
    ],
    diagnostics: [
      "El Escorial/Awaji criteria: combination of UMN signs (hyperreflexia, spasticity, Babinski, jaw jerk) + LMN signs (weakness, atrophy, fasciculations) in multiple body regions without sensory involvement",
      "EMG/NCS: widespread denervation (fibrillation potentials, positive sharp waves) with reinnervation (large MUPs) in multiple myotomes; normal sensory nerve conduction confirms anterior horn cell disease",
      "MRI brain and spine: exclude structural mimics (cervical myelopathy, syrinx, tumors); UMN tract hyperintensity on T2 (corticospinal tract degeneration) may be seen",
      "Pulmonary function testing: FVC (baseline and serial q3 months); FVC < 50% predicted indicates significant respiratory muscle weakness — critical for NIV timing",
      "Serum CK: mildly elevated (2-10x normal) from denervation; markedly elevated CK should prompt consideration of myopathy",
      "Genetic testing: C9orf72 repeat expansion, SOD1, FUS, TARDBP — important for familial counseling and emerging targeted therapies (tofersen for SOD1)",
      "Exclude mimics: anti-GM1 antibodies (multifocal motor neuropathy — treatable with IVIG), CSF protein (rule out inflammatory conditions), thyroid function, B12, copper",
      "ALSFRS-R (ALS Functional Rating Scale-Revised): 48-point scale tracking function over time — decline rate predicts survival"
    ],
    management: [
      "Riluzole 50 mg PO BID — only proven survival-extending medication (~3 months); blocks presynaptic glutamate release reducing excitotoxicity; monitor LFTs q3 months × 1 year",
      "Edaravone (Radicava): IV or oral formulation; free radical scavenger that may slow functional decline in early ALS (small benefit, significant cost)",
      "Tofersen (Qalsody): antisense oligonucleotide for SOD1 mutation carriers — intrathecal injection q4 weeks; reduces neurofilament light chain levels and slows progression",
      "Non-invasive ventilation (NIV): initiate when FVC < 50%, orthopnea, nocturnal hypoventilation (morning headaches, daytime somnolence); extends survival by 7-12 months and improves quality of life",
      "Percutaneous gastrostomy (PEG/RIG): place when dysphagia compromises nutrition/hydration or weight loss > 10%; safer to place while FVC > 50%",
      "Multidisciplinary ALS clinic: neurology, pulmonology, speech therapy, nutrition, PT/OT, social work, palliative care — proven to improve survival and quality of life",
      "Symptomatic management: sialorrhea (glycopyrrolate, scopolamine patch, botulinum toxin to salivary glands), pseudobulbar affect (dextromethorphan/quinidine), spasticity (baclofen, tizanidine), cramps (mexiletine)",
      "Advance care planning: early discussion of goals of care, code status, tracheostomy ventilation preferences — essential before respiratory crisis"
    ],
    nursingActions: [
      "Serial assessment of function using ALSFRS-R at each visit: bulbar (speech, swallowing, salivation), fine motor, gross motor, respiratory — track rate of decline",
      "Respiratory monitoring: FVC q3 months, sniff nasal inspiratory pressure (SNIP), nocturnal oximetry — educate patient on NIV benefits and initiate early",
      "Nutritional assessment: weight trend, caloric intake, swallowing safety (SLP evaluation); recommend modified diet textures as needed; discuss PEG timing proactively",
      "Communication support: as dysarthria progresses, introduce augmentative communication devices (speech-generating devices, eye-tracking technology) early while patient can learn to use them",
      "Fall prevention and mobility: progressive weakness requires ongoing reassessment of assistive devices (cane → walker → wheelchair); home modifications",
      "Psychosocial support: depression screening (PHQ-9), caregiver burden assessment, ALS support groups, ALS Association resources",
      "Advance directive facilitation: ensure goals of care are documented; discuss tracheostomy/long-term ventilation (< 10% of ALS patients choose this); POLST/DNR if appropriate",
      "Medication administration adaptation: as swallowing declines, switch to liquid formulations or crushing medications; riluzole available as oral suspension"
    ],
    signs: {
      left: [
        "Early ALS: asymmetric hand weakness (split hand sign — thenar > hypothenar atrophy), fasciculations, brisk reflexes in weak limb",
        "FVC > 70% predicted with preserved swallowing and speech",
        "Slow rate of ALSFRS-R decline (< 0.5 points/month — better prognosis)",
        "Responsive to NIV with improved sleep and daytime function"
      ],
      right: [
        "Bulbar onset with rapid dysphagia, dysarthria, and weight loss (worse prognosis than limb onset)",
        "FVC < 30% with orthopnea, accessory muscle use, paradoxical breathing (diaphragm failure)",
        "Respiratory crisis: acute CO2 retention, morning headaches, confusion — need for emergent NIV or difficult airway discussion",
        "ALSFRS-R declining > 1 point/month — rapid progressor with median survival < 2 years"
      ]
    },
    medications: [
      {
        name: "Riluzole",
        type: "Glutamate Antagonist / Neuroprotective",
        action: "Blocks voltage-gated sodium channels on presynaptic glutamatergic neurons, reducing glutamate release and excitotoxicity; also has mild NMDA receptor antagonism; the only oral medication proven to extend survival in ALS (~3 months)",
        sideEffects: "Hepatotoxicity (ALT elevation in 10% — monitor LFTs), nausea, asthenia, dizziness, GI disturbance",
        contra: "Severe hepatic impairment (ALT > 5x ULN), known hypersensitivity",
        pearl: "50 mg PO BID on an empty stomach (food reduces bioavailability by 20%). Monitor LFTs monthly × 3 months, then q3 months × 1 year. Benefits are modest (~3-month survival extension) but it is standard of care for all ALS patients unless contraindicated. Available as oral suspension for patients with dysphagia."
      },
      {
        name: "Dextromethorphan/Quinidine (Nuedexta)",
        type: "Pseudobulbar Affect Treatment",
        action: "Dextromethorphan acts as NMDA antagonist and sigma-1 receptor agonist affecting emotional expression circuits; quinidine inhibits CYP2D6, preventing dextromethorphan metabolism and maintaining therapeutic levels",
        sideEffects: "Dizziness, nausea, diarrhea, QT prolongation (from quinidine component), falls",
        contra: "Concurrent MAOIs, complete heart block, prolonged QT, concurrent quinidine sensitivity, thioridazine use",
        pearl: "Treats pseudobulbar affect (involuntary crying/laughing disproportionate to emotional state) — affects up to 50% of ALS patients. Dose: 20/10 mg PO BID. Start with one capsule daily × 7 days then increase. Get ECG at baseline. Dramatically improves quality of life for patients and caregivers."
      }
    ],
    pearls: [
      "The 'split hand sign' (thenar atrophy > hypothenar in the same hand) is relatively specific for ALS and distinguishes it from most other causes of hand weakness — in carpal tunnel syndrome, thenar atrophy occurs but without fasciculations or UMN signs",
      "PEG tube placement should be discussed and performed while FVC > 50% — the procedure risk increases significantly with lower FVC due to sedation and position requirements; proactive placement preserves nutrition and medication delivery",
      "NIV compliance is the single most impactful intervention for quality of life AND survival in ALS (7-12 months survival benefit) — titrate settings for comfort, involve respiratory therapist closely, and address mask interface issues promptly to maintain adherence"
    ],
    quiz: [
      {
        question: "A patient with ALS has progressive dysphagia, 8% weight loss over 3 months, and FVC of 62% predicted. He can still speak in sentences but coughs with thin liquids. What is the most appropriate intervention?",
        options: [
          "Start parenteral nutrition via PICC line and refer to hospice",
          "Recommend PEG tube placement while FVC is still > 50% and modify diet to thickened liquids",
          "Increase caloric density of regular diet and reassess in 3 months",
          "Initiate riluzole to slow the progression of dysphagia"
        ],
        correct: 1,
        rationale: "With 8% weight loss, progressive dysphagia with aspiration risk (coughing on thin liquids), and FVC still at 62% (above the safer threshold of 50% for PEG placement), this is the optimal window for gastrostomy placement. Waiting until FVC drops further increases procedural risk significantly. Diet modification (thickened liquids) provides immediate aspiration reduction while PEG is arranged. Riluzole is neuroprotective but does not specifically address dysphagia. TPN via PICC is not appropriate when enteral access is feasible."
      }
    ]
  },
  "parkinsons-advanced-np": {
    title: "Parkinson Disease: Advanced Management",
    cellular: {
      title: "Dopaminergic Degeneration in PD",
      content: "Parkinson disease involves progressive degeneration of dopaminergic neurons in the substantia nigra pars compacta (SNpc), with hallmark alpha-synuclein aggregation forming Lewy bodies and Lewy neurites. Dopamine loss disrupts the basal ganglia circuit: normally, dopamine from the SNpc facilitates the direct pathway (D1 receptors → movement initiation) and inhibits the indirect pathway (D2 receptors → movement suppression). In PD, dopamine deficiency causes relative overactivity of the indirect pathway, leading to excessive thalamic inhibition and hypokinesia. Motor symptoms appear after ~60-80% of dopaminergic neurons are lost. The pathology spreads in a caudal-to-rostral pattern (Braak staging): stage 1-2 involves olfactory bulb and brainstem (explaining prodromal anosmia, REM sleep behavior disorder, constipation), stage 3-4 involves the substantia nigra (motor symptoms), and stage 5-6 involves the cortex (cognitive decline, dementia). Non-motor symptoms (depression, autonomic dysfunction, pain) result from alpha-synuclein pathology in non-dopaminergic systems (serotonergic, noradrenergic, cholinergic)."
    },
    riskFactors: [
      "Age (most significant risk factor — incidence increases dramatically after age 60)",
      "Male sex (1.5:1 male predominance)",
      "Pesticide exposure (paraquat, rotenone — mitochondrial complex I inhibition)",
      "Family history: LRRK2 mutation (most common genetic cause), GBA mutations (strongest genetic risk factor for sporadic PD), SNCA, PINK1, Parkin",
      "Rural living and well water consumption (pesticide exposure hypothesis)",
      "Prior head trauma (mild increased risk)",
      "Protective factors: caffeine consumption, smoking (paradoxical — nicotinic receptor stimulation; NOT a recommendation), vigorous exercise",
      "REM sleep behavior disorder (80% progress to synucleinopathy within 10-15 years — key prodromal marker)"
    ],
    diagnostics: [
      "Clinical diagnosis: bradykinesia (cardinal feature, must be present) + rest tremor (4-6 Hz, pill-rolling) and/or rigidity (lead-pipe or cogwheel)",
      "MDS-UPDRS (Movement Disorder Society-Unified PD Rating Scale): comprehensive assessment of motor and non-motor function, ADLs, motor complications",
      "DaTscan (ioflupane SPECT): visualizes dopamine transporter density in the striatum — reduced uptake confirms nigrostriatal degeneration; differentiates PD from essential tremor and drug-induced parkinsonism",
      "MRI brain: primarily to exclude structural causes (normal pressure hydrocephalus, vascular parkinsonism, Wilson disease); may show mild midbrain atrophy",
      "Olfactory testing (UPSIT): anosmia/hyposmia present in > 90% of PD — absent in essential tremor, PSP, corticobasal degeneration (useful differentiator)",
      "Autonomic testing: orthostatic vitals (neurogenic orthostatic hypotension common), cardiac MIBG scan (reduced uptake in PD vs. MSA)",
      "Cognitive screening: MoCA (more sensitive than MMSE for PD cognitive impairment — visuospatial and executive deficits earliest)",
      "Genetic testing: consider in early-onset PD (< 50), strong family history; GBA, LRRK2, SNCA"
    ],
    management: [
      "Levodopa/carbidopa: most effective motor symptom treatment; start when symptoms impact function; no evidence for delaying (LEAP trial — early initiation is appropriate)",
      "Dopamine agonists (pramipexole, ropinirole, rotigotine patch): alternative initial therapy in younger patients (< 60) to delay levodopa motor complications; avoid in elderly (hallucinations, impulse control disorders)",
      "MAO-B inhibitors (rasagiline, selegiline, safinamide): mild monotherapy benefit in early PD; adjunct to levodopa to reduce OFF time",
      "COMT inhibitors (entacapone, opicapone): extend levodopa duration by blocking peripheral levodopa metabolism; reduce OFF time",
      "Motor fluctuation management: wearing OFF → increase levodopa frequency or add COMT/MAO-B inhibitor; dyskinesia → reduce individual levodopa doses, add amantadine (only drug for levodopa-induced dyskinesia)",
      "Deep brain stimulation (DBS): bilateral subthalamic nucleus (STN) or globus pallidus interna (GPi) for motor fluctuations/dyskinesia despite optimal medication; reduces OFF time by 60% and levodopa dose by 50%",
      "Exercise prescription: moderate-to-vigorous aerobic exercise 150 min/week + resistance training — neuroprotective evidence growing; improves gait, balance, mood",
      "Non-motor symptom management: orthostatic hypotension (fludrocortisone, droxidopa, midodrine), constipation (polyethylene glycol), depression (SSRIs or SNRIs), psychosis (pimavanserin — selective 5-HT2A inverse agonist, or quetiapine)"
    ],
    nursingActions: [
      "Medication timing is critical: administer levodopa at precise intervals (typically q4-6h) — even 30-minute delays can cause OFF states with freezing and fall risk",
      "Assess for motor fluctuations: document ON time (good mobility), OFF time (return of symptoms), and dyskinesia (involuntary movements) — these guide medication adjustments",
      "Fall prevention: PD patients have 2x fall risk; assess gait freezing triggers (doorways, turns, crowds), teach cueing strategies (rhythmic auditory cues, visual targets, laser canes)",
      "Swallowing assessment: dysphagia affects 80% of PD patients; silent aspiration is common — SLP evaluation, modified diet as needed, chin-tuck maneuver",
      "Screen for impulse control disorders (dopamine agonist side effect): pathological gambling, hypersexuality, compulsive shopping, binge eating — affects 15-20% on agonists",
      "Monitor for PD psychosis: visual hallucinations (formed, often non-threatening initially — 'passage hallucinations'); if distressing, reduce anticholinergics first, then consider pimavanserin",
      "Orthostatic hypotension management: measure standing BP at each visit; teach slow positional changes, compression stockings, hydration, raise HOB at night",
      "DO NOT administer typical antipsychotics (haloperidol, chlorpromazine) or metoclopramide — D2 blockade severely worsens parkinsonism; use quetiapine or ondansetron for nausea"
    ],
    signs: {
      left: [
        "Early PD: unilateral rest tremor, mild bradykinesia, full independence in ADLs (Hoehn & Yahr Stage 1-2)",
        "Good levodopa response with > 4 hours ON time per dose without dyskinesia",
        "Preserved cognition (MoCA ≥ 26) and absence of hallucinations",
        "Engaged in regular exercise program with stable functional status"
      ],
      right: [
        "Severe motor fluctuations: unpredictable OFF periods with freezing, frequent falls (DBS evaluation indicated)",
        "PD dementia: progressive cognitive decline, visual hallucinations, fluctuating attention (Lewy body spectrum)",
        "Neuroleptic malignant-like syndrome from abrupt levodopa discontinuation (rigidity, hyperthermia, CK elevation — life-threatening)",
        "Aspiration pneumonia from severe dysphagia (leading cause of death in PD)"
      ]
    },
    medications: [
      {
        name: "Levodopa/Carbidopa (Sinemet)",
        type: "Dopamine Precursor / Peripheral Decarboxylase Inhibitor",
        action: "Levodopa crosses the BBB and is converted to dopamine by aromatic amino acid decarboxylase in surviving nigrostriatal neurons; carbidopa blocks peripheral conversion of levodopa to dopamine, reducing nausea and increasing CNS bioavailability",
        sideEffects: "Nausea (take with food but avoid high-protein meals — amino acids compete for transport), orthostatic hypotension, dyskinesia (with long-term use), impulse control disorders, somnolence, vivid dreams",
        contra: "Concurrent non-selective MAOI use (hypertensive crisis), narrow-angle glaucoma, active melanoma (relative — theoretical concern)",
        pearl: "Most effective medication for PD motor symptoms. Start at 100/25 mg TID and titrate. After 5 years, ~50% develop motor fluctuations (wearing off) and dyskinesia. Protein in meals reduces absorption — take 30 min before or 1 hour after meals for consistent response. NEVER abruptly discontinue — risk of neuroleptic malignant-like syndrome."
      },
      {
        name: "Pimavanserin (Nuplazid)",
        type: "Selective 5-HT2A Inverse Agonist",
        action: "Selectively blocks and inverse-agonizes serotonin 5-HT2A receptors, reducing psychotic symptoms without blocking dopamine D2 receptors — the only antipsychotic that does not worsen parkinsonism",
        sideEffects: "QT prolongation, peripheral edema, nausea, confusion, hallucination worsening (paradoxical — rare)",
        contra: "QT prolongation, concurrent QT-prolonging drugs, severe hepatic impairment",
        pearl: "Only FDA-approved treatment for PD psychosis (34 mg PO daily). Takes 2-4 weeks for full effect. Get baseline ECG (QTc). Does NOT block D2 receptors so does not worsen motor symptoms — major advantage over quetiapine/clozapine. If hallucinations are mild and non-distressing, reassurance and observation may be sufficient before pharmacological intervention."
      }
    ],
    pearls: [
      "NEVER abruptly stop levodopa — this can precipitate neuroleptic malignant-like syndrome (severe rigidity, hyperthermia, rhabdomyolysis, AKI) that mimics and is managed similarly to NMS; if patient is NPO, levodopa must be given via NG tube or the equivalent dopaminergic coverage maintained",
      "REM sleep behavior disorder (acting out dreams, violent movements during sleep) is the strongest prodromal predictor of PD and other synucleinopathies — it precedes motor symptoms by years to decades and should prompt neurology referral for monitoring",
      "High-protein meals reduce levodopa absorption by competing for amino acid transporters at the gut and BBB — counsel patients to take levodopa 30 minutes before meals or redistribute protein to the evening meal to maximize daytime ON time"
    ],
    quiz: [
      {
        question: "A patient with PD is admitted for cholecystectomy. He takes levodopa/carbidopa 250/25 mg QID. The surgical team orders NPO after midnight. On the morning of surgery, he is rigid, unable to move, and distressed. What is the most important intervention?",
        options: [
          "Cancel surgery and restart oral levodopa immediately",
          "Administer levodopa/carbidopa via NG tube or use rotigotine transdermal patch; ensure perioperative dopaminergic coverage is maintained",
          "Administer IV haloperidol for agitation and proceed with surgery",
          "Give IV benzodiazepines for rigidity and proceed with surgery"
        ],
        correct: 1,
        rationale: "PD medications must NEVER be abruptly stopped — the patient's symptoms are due to dopaminergic withdrawal. Levodopa must be administered via NG tube or a rotigotine patch applied to maintain dopaminergic coverage perioperatively. This is one of the most common and dangerous medication errors in hospitalized PD patients. Haloperidol (D2 blocker) would catastrophically worsen parkinsonism and could trigger NMS. Surgery can proceed once adequate dopaminergic coverage is restored."
      }
    ]
  },
  "dementia-management-np": {
    title: "Dementia Syndromes: NP Management",
    cellular: {
      title: "Neurodegenerative Dementia Pathology",
      content: "Dementia encompasses a spectrum of neurodegenerative and vascular disorders causing progressive cognitive decline. Alzheimer disease (60-80% of cases) involves extracellular amyloid-beta plaques (Aβ42 oligomers are most neurotoxic, disrupting synaptic function) and intracellular neurofibrillary tangles (hyperphosphorylated tau protein destabilizing microtubules and spreading prion-like through neural networks). The cholinergic hypothesis — degeneration of basal forebrain cholinergic neurons (nucleus basalis of Meynert) reduces acetylcholine, impairing memory formation in the hippocampus and cortex. Vascular dementia results from cumulative cerebrovascular injury (strategic infarcts, white matter disease, microhemorrhages). Lewy body dementia features cortical alpha-synuclein Lewy bodies causing fluctuating cognition, visual hallucinations, and parkinsonism. Frontotemporal dementia involves tau or TDP-43 proteinopathy predominantly affecting frontal and temporal lobes, causing behavioral changes and/or language dysfunction. Each subtype has distinct temporal patterns, biomarker profiles, and therapeutic implications."
    },
    riskFactors: [
      "Age (strongest risk factor — prevalence doubles every 5 years after age 65)",
      "APOE ε4 allele: heterozygous (3x AD risk), homozygous (12x risk); APOE ε2 is protective",
      "Cardiovascular risk factors: hypertension, diabetes, hyperlipidemia, obesity (midlife risk factors for late-life dementia)",
      "Low educational attainment and cognitive inactivity (reduced cognitive reserve)",
      "Traumatic brain injury (especially repetitive — CTE in contact sports)",
      "Depression (both risk factor and prodromal symptom)",
      "Hearing loss (strongest modifiable risk factor per 2020 Lancet Commission — contributes 8% of attributable risk)",
      "Social isolation and physical inactivity"
    ],
    diagnostics: [
      "Cognitive screening: MoCA (sensitivity 90% at cutoff ≤ 25/30) preferred over MMSE; assess memory, visuospatial, executive function, language, attention, orientation",
      "Neuropsychological testing: comprehensive battery to characterize cognitive profile and severity; distinguishes AD (amnestic) from FTD (executive/behavioral) from DLB (visuospatial/attention)",
      "MRI brain: hippocampal atrophy (AD), global cortical atrophy, white matter hyperintensities (vascular), frontotemporal atrophy (FTD); rule out NPH, subdural hematoma, tumors",
      "PET imaging: FDG-PET (temporal-parietal hypometabolism in AD, frontal in FTD), amyloid PET (Aβ deposition — FDA-approved), tau PET (research/clinical correlation)",
      "CSF biomarkers: low Aβ42, elevated phospho-tau, elevated total tau (AD biomarker profile); high sensitivity/specificity for AD pathology",
      "Blood-based biomarkers (emerging): plasma p-tau217, p-tau181 — increasingly available and accurate for AD diagnosis",
      "Reversible cause workup: TSH, B12, folate, RPR/VDRL, CBC, CMP, HIV — essential to exclude treatable conditions",
      "Genetic testing: APOE genotyping (risk assessment), APP/PSEN1/PSEN2 (autosomal dominant early-onset AD)"
    ],
    management: [
      "Cholinesterase inhibitors for AD (donepezil, rivastigmine, galantamine): modest benefit in mild-moderate AD; donepezil 5 mg daily × 4-6 weeks then 10 mg daily",
      "Memantine: NMDA receptor antagonist for moderate-severe AD; can be combined with cholinesterase inhibitor; 5 mg daily titrated to 10 mg BID",
      "Lecanemab (Leqembi): anti-amyloid monoclonal antibody for early AD; 10 mg/kg IV q2 weeks; reduces amyloid burden and slows cognitive decline by 27% (CLARITY-AD trial); requires amyloid confirmation and ARIA monitoring",
      "Non-pharmacological interventions: structured daily routine, cognitive stimulation therapy, physical exercise, music therapy, occupational therapy for ADL maintenance",
      "Behavioral symptom management: first-line is non-pharmacological (redirect, environment modification, address unmet needs); if pharmacological needed: low-dose SSRI (citalopram ≤ 30 mg — avoid QT prolongation), avoid typical antipsychotics (FDA black box warning: increased mortality in dementia)",
      "Vascular dementia: aggressive cardiovascular risk factor management (BP, lipids, glucose, antiplatelet therapy)",
      "DLB-specific: rivastigmine preferred cholinesterase inhibitor; avoid antipsychotics (severe sensitivity — neuroleptic malignant syndrome risk); carbidopa/levodopa cautiously for parkinsonism",
      "Advance care planning early in disease course while patient retains capacity; designate healthcare proxy, discuss goals of care for progressive stages"
    ],
    nursingActions: [
      "Serial cognitive assessment: MoCA or similar at baseline and q6-12 months to track progression and treatment response",
      "Safety assessment: driving evaluation (occupational therapy driving assessment), home safety evaluation (stove safety, fall hazards, elopement risk), firearm access",
      "Caregiver support: assess caregiver burden (Zarit Burden Interview), respite care resources, caregiver education on disease progression and communication strategies",
      "Medication management: simplify regimen, use pill organizers, supervise medication administration as disease progresses; assess for anticholinergic medication burden (Beer's criteria)",
      "Behavioral symptom assessment: identify triggers (pain, UTI, constipation, environmental overstimulation) before attributing behavior to dementia progression",
      "Nutrition: monitor weight and nutritional status; assess swallowing safety as disease progresses; modified diet textures when indicated",
      "Legal and financial planning: encourage early completion of advance directives, power of attorney, living will while patient retains capacity",
      "End-of-life care: hospice referral appropriate when patient reaches FAST Stage 7 (unable to walk, dress, bathe independently; < 6 words intelligible speech); focus on comfort and dignity"
    ],
    signs: {
      left: [
        "Mild cognitive impairment (MCI): subjective memory concerns with objective cognitive deficit but preserved independence in ADLs",
        "Early dementia: repetitive questions, misplacing items, word-finding difficulty, but retained orientation and social function",
        "Stable or slowly progressive symptoms with supportive interventions in place",
        "Caregiver coping well with adequate support and resources"
      ],
      right: [
        "Rapid cognitive decline (> 3 MoCA points/year) — consider prion disease (CJD), autoimmune encephalitis, or delirium superimposed on dementia",
        "Severe behavioral and psychological symptoms: aggression, psychosis, wandering with elopement risk",
        "Lewy body dementia with neuroleptic sensitivity — severe parkinsonism, rigidity, or NMS after antipsychotic exposure",
        "Caregiver burnout with neglect or elder abuse risk"
      ]
    },
    medications: [
      {
        name: "Donepezil (Aricept)",
        type: "Cholinesterase Inhibitor",
        action: "Reversibly inhibits acetylcholinesterase, increasing acetylcholine concentration at cholinergic synapses in the hippocampus and cortex; compensates for cholinergic neuron loss from nucleus basalis degeneration in AD",
        sideEffects: "Nausea, diarrhea, insomnia, vivid dreams, bradycardia (vagotonic effect — caution with sick sinus syndrome, heart block), muscle cramps",
        contra: "Known hypersensitivity, severe bradycardia, heart block without pacemaker",
        pearl: "Start 5 mg PO QHS × 4-6 weeks then increase to 10 mg (23 mg available for moderate-severe). Take at bedtime to minimize GI side effects. Benefits are modest (~2-3 point MMSE improvement or slowed decline). Also used in DLB (often better response than AD). Continue until severe dementia unless side effects are intolerable — discontinuation may cause irreversible decline."
      },
      {
        name: "Memantine (Namenda)",
        type: "NMDA Receptor Antagonist",
        action: "Low-affinity voltage-dependent NMDA receptor antagonist that blocks pathological tonic glutamate stimulation (excitotoxicity) while preserving normal synaptic transmission; reduces calcium-mediated neuronal damage",
        sideEffects: "Dizziness, headache, constipation, confusion (paradoxical — rare), hypertension",
        contra: "Severe renal impairment (CrCl < 5 mL/min), known hypersensitivity",
        pearl: "Approved for moderate-severe AD (can be added to cholinesterase inhibitor). Start 5 mg daily, titrate by 5 mg weekly to 10 mg BID. XR formulation (28 mg daily) available for simpler dosing. Benefits include modest improvement in cognition, behavior, and function. Adjust dose for renal impairment (CrCl 5-29: max 5 mg BID)."
      }
    ],
    pearls: [
      "Delirium superimposed on dementia is extremely common (up to 50% of hospitalized dementia patients) — any acute change in cognition or behavior should be evaluated for delirium triggers (infection, constipation, urinary retention, medication changes, pain) before attributing to disease progression",
      "Anticholinergic medication burden is a leading cause of worsened cognition in elderly dementia patients — systematically review medication lists for anticholinergic load (diphenhydramine, oxybutynin, tricyclics, first-generation antihistamines) using the Anticholinergic Cognitive Burden (ACB) scale",
      "Lewy body dementia patients have severe neuroleptic sensitivity — even one dose of haloperidol can cause catastrophic rigidity, catatonia, or death; if antipsychotic is absolutely needed, use quetiapine at lowest effective dose"
    ],
    quiz: [
      {
        question: "A patient with Lewy body dementia is admitted with visual hallucinations and agitation. The admitting physician orders haloperidol 2 mg IM. What is the most important action by the NP?",
        options: [
          "Administer the haloperidol as ordered and monitor for response",
          "Contact the physician to hold haloperidol — DLB patients have severe neuroleptic sensitivity; suggest non-pharmacological interventions or low-dose quetiapine",
          "Substitute olanzapine 5 mg IM as a safer alternative",
          "Administer diphenhydramine 50 mg IV for sedation instead"
        ],
        correct: 1,
        rationale: "Lewy body dementia patients have profound sensitivity to D2-blocking antipsychotics — haloperidol can cause severe parkinsonism, rigidity, NMS, and death. This is an absolute contraindication. The NP must intervene immediately. First-line management is non-pharmacological (dim lighting, reorientation, reassurance, address underlying triggers). If pharmacological treatment is needed, quetiapine (lowest D2 affinity) or pimavanserin are safest. Olanzapine also has significant D2 blockade. Diphenhydramine's anticholinergic properties would worsen confusion."
      }
    ]
  },
  "headache-management-np": {
    title: "Headache Disorders: NP Management",
    cellular: {
      title: "Migraine & Headache Pathophysiology",
      content: "Migraine pathophysiology involves the trigeminovascular system: cortical spreading depolarization (CSD — a wave of neuronal and glial depolarization spreading across the cortex at 3-5 mm/min) activates trigeminal afferents in the meninges, releasing calcitonin gene-related peptide (CGRP), substance P, and neurokinin A. CGRP causes meningeal vasodilation, neurogenic inflammation (plasma protein extravasation, mast cell degranulation), and peripheral sensitization. Central sensitization occurs when repeated nociceptive input from the trigeminal nucleus caudalis sensitizes thalamic neurons, explaining allodynia (pain from normal touch). The aura corresponds to the CSD wave traversing cortical regions. Serotonin (5-HT) plays a crucial role: migraine attacks correlate with falling serotonin levels, and triptans work by activating 5-HT1B/1D receptors on meningeal vessels (vasoconstriction) and trigeminal nerve terminals (inhibiting CGRP release). CGRP has emerged as the central mediator — monoclonal antibodies targeting CGRP or its receptor represent a paradigm shift in migraine prevention."
    },
    riskFactors: [
      "Female sex (3:1 female predominance for migraine, influenced by estrogen fluctuations)",
      "Family history (70% of migraineurs have first-degree relative with migraine — polygenic inheritance)",
      "Hormonal changes: menstrual migraine (estrogen withdrawal), OCP use, menopause transition",
      "Medication overuse (analgesic rebound): using acute treatments > 10-15 days/month transforms episodic to chronic migraine",
      "Obesity (1.5-fold increased risk of chronic migraine)",
      "Sleep disturbances: insomnia, sleep apnea, shift work",
      "Stress and psychological comorbidities (anxiety, depression — bidirectional relationship)",
      "Caffeine overuse or abrupt withdrawal"
    ],
    diagnostics: [
      "Clinical diagnosis based on ICHD-3 criteria: Migraine without aura — ≥ 5 attacks lasting 4-72h with ≥ 2 of (unilateral, pulsating, moderate-severe, aggravated by activity) + ≥ 1 of (nausea/vomiting, photo/phonophobia)",
      "Headache diary: frequency, severity, duration, triggers, medication use, menstrual correlation — essential for diagnosis and monitoring",
      "Neuroimaging (MRI with/without contrast): NOT routine for primary headache; indicated for: thunderclap headache, neurological signs, new headache in patient > 50, progressively worsening headache, headache with fever/systemic symptoms",
      "Red flags (SNOOP mnemonic): Systemic symptoms, Neurological signs, Onset sudden, Older age (> 50), Pattern change — any of these warrants urgent investigation",
      "LP: indicated if opening pressure measurement needed (idiopathic intracranial hypertension), meningitis/encephalitis suspected, or thunderclap headache with negative CT",
      "ESR/CRP in patients > 50 with new headache: rule out giant cell arteritis (temporal arteritis)",
      "Medication overuse assessment: count days/month of acute medication use; > 10 days (triptans/opioids) or > 15 days (simple analgesics) constitutes overuse",
      "Screening for comorbidities: PHQ-9 (depression), GAD-7 (anxiety), Epworth Sleepiness Scale (sleep disorders)"
    ],
    management: [
      "Acute migraine: triptans (sumatriptan 50-100 mg PO, 6 mg SC for rapid onset); NSAIDs (ibuprofen 400-800 mg, naproxen 500-750 mg); combination analgesics for moderate-severe attacks",
      "CGRP receptor antagonists (gepants): ubrogepant 50-100 mg, rimegepant 75 mg — acute treatment without vasoconstrictive risk (safe in cardiovascular disease); rimegepant also approved for prevention (75 mg every other day)",
      "Antiemetics: metoclopramide 10 mg IV (also has analgesic properties for migraine), ondansetron 4-8 mg, prochlorperazine 10 mg IV (potent abortive in ED setting)",
      "Preventive therapy (indicated when ≥ 4 migraine days/month or significant disability): first-line oral options — propranolol 40-160 mg/day, topiramate 50-100 mg/day, amitriptyline 10-75 mg QHS, valproic acid 500-1500 mg/day",
      "CGRP monoclonal antibodies for prevention: erenumab 70-140 mg SC monthly, fremanezumab 225 mg SC monthly, galcanezumab 120 mg SC monthly — highly effective, well-tolerated, once-monthly dosing",
      "Botulinum toxin A (onabotulinumtoxinA): 155 units in 31 injection sites q12 weeks — FDA-approved for chronic migraine (≥ 15 headache days/month with ≥ 8 migrainous)",
      "Medication overuse headache: withdraw offending medication (taper opioids, abrupt stop for triptans/NSAIDs), bridge with naproxen or short steroid course, initiate preventive therapy",
      "Cluster headache: acute — high-flow O2 100% via non-rebreather 12-15 L/min × 15-20 min, sumatriptan 6 mg SC; prevention — verapamil 240-960 mg/day (ECG monitoring), short-course prednisone for transitional prophylaxis"
    ],
    nursingActions: [
      "Thorough headache history: PQRST framework, frequency, duration, associated symptoms, triggers, medication use pattern, family history, red flag screening",
      "Teach headache diary use: track attacks, triggers, medication use, menstrual cycle — minimum 3 months of data before changing prevention strategy",
      "Identify and counsel on trigger management: regular sleep schedule, hydration, regular meals, stress management, exercise; avoid known triggers (specific foods less important than previously thought — focus on patterns)",
      "Assess for medication overuse headache: count days/month of acute medication use; educate that overuse transforms episodic to chronic migraine",
      "Administer and monitor acute treatments: triptans within 1 hour of onset for best efficacy; assess response at 2 hours; monitor for chest tightness (triptan sensation — usually benign, but first occurrence requires cardiac evaluation)",
      "CGRP mAb injection teaching: proper SC injection technique, injection site rotation, expected side effects (injection site reactions, constipation)",
      "Monitor preventive medication side effects: topiramate (paresthesias, cognitive slowing, kidney stones, metabolic acidosis, teratogenic), propranolol (bradycardia, fatigue, depression, bronchospasm), amitriptyline (sedation, dry mouth, weight gain, QT prolongation)",
      "Non-pharmacological adjuncts: biofeedback, cognitive behavioral therapy, acupuncture, neuromodulation devices (Cefaly, gammaCore) — evidence-based complementary approaches"
    ],
    signs: {
      left: [
        "Episodic migraine (< 15 days/month) responsive to acute therapy with quick return to function",
        "Identified triggers being successfully managed with lifestyle modifications",
        "Preventive therapy achieving ≥ 50% reduction in monthly migraine days",
        "No medication overuse (acute treatment < 10 days/month)"
      ],
      right: [
        "Thunderclap headache (maximal intensity within seconds): SAH, RCVS, CVT, dissection — emergency imaging required",
        "New headache in patient > 50 with elevated ESR: giant cell arteritis — immediate high-dose prednisone to prevent blindness",
        "Chronic daily headache with medication overuse and failed multiple preventives — requires structured withdrawal program",
        "Migraine with brainstem aura or hemiplegic migraine: avoid triptans (theoretical vasoconstriction risk); use gepants or NSAIDs"
      ]
    },
    medications: [
      {
        name: "Sumatriptan",
        type: "5-HT1B/1D Receptor Agonist (Triptan)",
        action: "Activates 5-HT1B receptors on meningeal blood vessels (vasoconstriction reverses migraine-associated vasodilation) and 5-HT1D receptors on trigeminal nerve terminals (inhibits CGRP and substance P release, blocking neurogenic inflammation and pain transmission)",
        sideEffects: "Chest/throat tightness ('triptan sensation' — usually benign, not cardiac), tingling, flushing, dizziness, fatigue, medication overuse headache (if used > 10 days/month)",
        contra: "Uncontrolled hypertension, CAD/prior MI, cerebrovascular disease, peripheral vascular disease, hemiplegic/basilar migraine, MAOIs (sumatriptan only), use within 24 hours of ergotamine",
        pearl: "Take at first sign of headache for best efficacy (2-hour pain-free rate ~30% PO, ~60% SC). SC 6 mg is fastest onset (10 minutes). Can repeat once after 2 hours. Contraindicated in cardiovascular disease — use gepants instead. Nasal spray (20 mg) is alternative for patients with nausea who cannot take PO."
      },
      {
        name: "Erenumab (Aimovig)",
        type: "CGRP Receptor Monoclonal Antibody",
        action: "Fully human monoclonal antibody that blocks the CGRP receptor, preventing CGRP-mediated trigeminovascular activation, meningeal vasodilation, and neurogenic inflammation — the central pathway of migraine pathophysiology",
        sideEffects: "Injection site reactions, constipation (5-10%), hypertension (monitor BP), antibody formation (rare)",
        contra: "Known hypersensitivity; caution in severe constipation, uncontrolled hypertension",
        pearl: "70 mg or 140 mg SC monthly — first CGRP-targeting preventive approved. Effective in episodic and chronic migraine (50% responder rate ~50%). No hepatic, renal, or cognitive side effects. Can be combined with other preventives. Response typically seen within 1-3 months. No drug interactions — advantage in polypharmacy patients. Unique among CGRP mAbs in targeting the receptor rather than the ligand."
      }
    ],
    pearls: [
      "Medication overuse headache is the most common cause of chronic daily headache in headache clinics — the treatment is withdrawal of the offending medication, which temporarily worsens headaches before improvement occurs; patients need education and support through this transition",
      "Giant cell arteritis (GCA) must be considered in ANY patient > 50 with new headache, jaw claudication, scalp tenderness, visual symptoms, or elevated ESR/CRP — treatment with high-dose prednisone (60-80 mg/day) must begin IMMEDIATELY, before biopsy results, to prevent irreversible blindness",
      "CGRP-targeting therapies (gepants for acute, mAbs for prevention) have transformed migraine treatment — they are the first mechanism-specific therapies and are safe in cardiovascular disease, filling a critical gap left by triptan contraindications"
    ],
    quiz: [
      {
        question: "A 52-year-old woman reports new-onset severe unilateral headache for 2 weeks, jaw pain when eating, and blurred vision in the right eye. ESR is 78 mm/hr (normal < 30). What is the most urgent action?",
        options: [
          "Start sumatriptan for presumed new-onset migraine and refer to neurology",
          "Order MRI brain and refer for outpatient temporal artery biopsy",
          "Start prednisone 60-80 mg daily immediately and arrange urgent temporal artery biopsy",
          "Prescribe naproxen 500 mg BID and schedule follow-up in 2 weeks"
        ],
        correct: 2,
        rationale: "This presentation (new headache in > 50-year-old, jaw claudication, visual symptoms, markedly elevated ESR) is classic for giant cell arteritis (GCA). Immediate high-dose corticosteroids must be started BEFORE biopsy to prevent irreversible vision loss — temporal artery biopsy remains positive for 1-2 weeks after starting steroids. Vision loss from GCA (anterior ischemic optic neuropathy) is permanent. This is a true medical emergency where delayed treatment causes permanent disability."
      }
    ]
  },
  "myasthenia-gravis-crisis-np": {
    title: "Myasthenic Crisis: NP Management",
    cellular: {
      title: "Myasthenic Crisis Pathophysiology",
      content: "Myasthenic crisis is a life-threatening exacerbation of myasthenia gravis (MG) causing respiratory failure from diaphragmatic and intercostal muscle weakness. In MG, autoantibodies (anti-AChR in 85%, anti-MuSK in 5-8%, anti-LRP4 in 2-3%) attack the postsynaptic neuromuscular junction (NMJ). Anti-AChR antibodies cause NMJ damage through three mechanisms: complement-mediated destruction of the postsynaptic membrane, accelerated AChR internalization (antigenic modulation), and direct blockade of the ACh binding site. This reduces the number of functional AChRs, decreasing the safety factor for neuromuscular transmission. During crisis, the safety factor drops below the threshold for muscle fiber activation in respiratory muscles. Precipitants include infection (most common — 40% of crises), medication changes (antibiotics, beta-blockers, magnesium), surgical stress, pregnancy, and tapering immunotherapy too quickly. Cholinergic crisis (excess acetylcholinesterase inhibitor) can mimic myasthenic crisis — distinguished by muscarinic symptoms (SLUDGE: salivation, lacrimation, urination, defecation, GI cramping, emesis) and miosis."
    },
    riskFactors: [
      "Infection (most common precipitant — respiratory and urinary infections account for ~40% of crises)",
      "Recent medication changes: initiation of antibiotics (aminoglycosides, fluoroquinolones, macrolides), beta-blockers, magnesium, phenytoin, lithium",
      "Rapid taper or discontinuation of immunosuppressive therapy",
      "Surgical stress (especially thymectomy — post-operative crisis in 10-15%)",
      "Anti-MuSK antibody subtype (more likely to have bulbar involvement and respiratory crisis)",
      "Thymoma (present in 10-15% of MG patients — associated with more severe disease)",
      "Emotional stress, extreme temperatures, sleep deprivation",
      "Pregnancy (unpredictable course — may worsen in first trimester, improve in third trimester)"
    ],
    diagnostics: [
      "Serial FVC and NIF: FVC < 20 mL/kg or NIF weaker than -30 cmH2O (20-30-40 rule for intubation: FVC < 20, NIF < -30, predicted to decline within 40 hours)",
      "ABG: respiratory acidosis (rising PaCO2) indicates respiratory muscle failure — do NOT rely on SpO2 alone (hypoxia is a late finding)",
      "Bedside swallow assessment: bulbar weakness with dysphagia/nasal regurgitation increases aspiration risk",
      "Anti-AChR antibody titers: elevated in crisis (though levels don't always correlate with clinical severity)",
      "CT chest: assess for thymoma, pneumonia (trigger), or atelectasis",
      "Ice pack test: 2-minute ice application to ptotic eyelid improves ptosis (cooling improves NMJ transmission by slowing AChE activity) — useful bedside test when diagnosis uncertain",
      "Edrophonium (Tensilon) test: rarely performed now due to cardiac risks; used to differentiate myasthenic vs. cholinergic crisis (improvement = myasthenic; worsening = cholinergic)",
      "Repetitive nerve stimulation (RNS): decrement > 10% on slow (3 Hz) repetitive stimulation confirms NMJ transmission failure"
    ],
    management: [
      "Secure airway early: intubate electively when FVC < 20 mL/kg or NIF < -30 cmH2O or rapid decline trend — avoid crash intubation",
      "AVOID succinylcholine in MG (resistance due to reduced AChR → requires higher doses → prolonged paralysis); use rocuronium at 50% normal dose with sugammadex available",
      "Plasma exchange (PLEX) 5 exchanges over 10-14 days: removes pathogenic antibodies; onset of improvement within 2-3 days; preferred when rapid improvement needed",
      "IVIG 2 g/kg divided over 5 days: modulates immune response; onset 4-5 days; equal efficacy to PLEX (MGTX subanalysis)",
      "Hold or reduce pyridostigmine during crisis (excessive secretions complicate airway management; risk of cholinergic crisis)",
      "High-dose corticosteroids: methylprednisolone 1 g IV daily × 3-5 days or prednisone 1 mg/kg — caution: initial worsening possible in first 1-2 weeks of steroid initiation",
      "Identify and treat precipitant: antibiotics for infection (choose MG-safe options), discontinue offending medications, correct electrolytes",
      "MG-safe antibiotics: penicillins, cephalosporins, carbapenems, trimethoprim-sulfamethoxazole; AVOID: aminoglycosides, fluoroquinolones, macrolides, telithromycin"
    ],
    nursingActions: [
      "Serial FVC and NIF monitoring q4h (q2h if declining): trend the values and alert provider for FVC < 25 mL/kg or any declining trend — respiratory failure can be rapid and difficult to predict from bedside observation alone",
      "Assess bulbar function: voice quality (nasal?), swallow (can the patient handle secretions?), cough strength — bulbar weakness precedes respiratory failure",
      "Monitor for cholinergic vs. myasthenic crisis: cholinergic crisis shows SLUDGE symptoms (excessive secretions, small pupils, diarrhea, bradycardia) from pyridostigmine excess",
      "Medication safety: review ALL orders for MG-contraindicated drugs; if uncertain, verify with pharmacy or neurology before administering",
      "PLEX nursing care: monitor for hypotension, hypocalcemia (citrate anticoagulation), line-related complications; check pre/post coagulation studies",
      "IVIG infusion monitoring: start slowly (0.5 mL/kg/hr), titrate as tolerated; monitor for headache (aseptic meningitis), renal function (pre-hydrate), anaphylaxis in IgA-deficient patients",
      "Ventilator management for MG patients: daily spontaneous breathing trials when appropriate; avoid prolonged neuromuscular blockade (already compromised NMJ)",
      "Coordinate multidisciplinary care: neurology, pulmonology, SLP (swallow evaluation), PT (mobilization), pharmacy (medication safety review)"
    ],
    signs: {
      left: [
        "Mild MG exacerbation: increased ptosis, diplopia, mild dysphagia but FVC > 30 mL/kg and NIF > -40 cmH2O",
        "Responding to IVIG or PLEX with improving FVC trend and reduced bulbar symptoms",
        "Able to manage secretions and maintain adequate oral intake",
        "Crisis precipitant identified and being treated (e.g., UTI responding to antibiotics)"
      ],
      right: [
        "Rapidly declining FVC approaching 20 mL/kg — prepare for intubation (do not wait for respiratory arrest)",
        "Inability to handle secretions, active aspiration risk, stridor or use of accessory muscles",
        "Cholinergic crisis: SLUDGE symptoms with pyridostigmine toxicity — hold pyridostigmine, atropine for bradycardia",
        "Post-thymectomy myasthenic crisis with ventilator dependence"
      ]
    },
    medications: [
      {
        name: "Pyridostigmine (Mestinon)",
        type: "Acetylcholinesterase Inhibitor",
        action: "Reversibly inhibits acetylcholinesterase at the NMJ, increasing acetylcholine availability to compete with fewer functional AChRs; provides symptomatic relief but does not address underlying autoimmune process",
        sideEffects: "Muscarinic effects: abdominal cramping, diarrhea, excessive salivation, bradycardia, miosis, increased bronchial secretions; nicotinic effects at high doses: fasciculations, muscle cramping",
        contra: "Mechanical bowel or urinary obstruction, cholinergic crisis; caution in asthma, bradycardia, peptic ulcer disease",
        pearl: "30-60 mg PO q4-6h (max 120 mg per dose). Onset 30-60 minutes, peak 1-2 hours, duration 3-4 hours. Time doses 30 minutes before meals for dysphagia benefit. During crisis, HOLD or REDUCE dose — excess secretions complicate airway management and cholinergic crisis worsens weakness. Do not confuse worsening from under-treatment (myasthenic crisis) with over-treatment (cholinergic crisis)."
      },
      {
        name: "IVIG (Intravenous Immunoglobulin)",
        type: "Immune Modulator",
        action: "Multi-mechanism immunomodulation: Fc receptor saturation reduces antibody-mediated tissue destruction, anti-idiotypic antibodies neutralize pathogenic autoantibodies, modulation of complement activation, cytokine regulation, and B cell function",
        sideEffects: "Headache (15% — aseptic meningitis), renal failure (osmotic nephropathy — avoid sucrose-containing formulations), thrombotic events (DVT, PE, stroke — especially in elderly), infusion reactions, hemolytic anemia",
        contra: "IgA deficiency with anti-IgA antibodies (anaphylaxis risk — use IgA-depleted product), severe renal insufficiency (relative), recent thrombotic event",
        pearl: "2 g/kg total dose divided over 5 days. Pre-hydrate to reduce renal toxicity. Onset of benefit 4-5 days. Equal efficacy to PLEX for myasthenic crisis. Preferred over PLEX when vascular access is challenging or patient is hemodynamically unstable. Check IgA level before first infusion. Effects last 4-6 weeks."
      }
    ],
    pearls: [
      "The '20-30-40 rule' guides intubation timing in myasthenic crisis: FVC < 20 mL/kg, NIF weaker than -30 cmH2O, or predicted to reach these thresholds within 40 hours — do not wait for actual respiratory arrest as these patients deteriorate rapidly",
      "Succinylcholine has paradoxical effects in MG: patients are resistant to its depolarizing effect (need higher doses due to fewer AChRs), but then have prolonged paralysis — always use rocuronium at reduced dose (50%) with sugammadex reversal available",
      "A comprehensive medication safety review is essential: aminoglycosides, fluoroquinolones, macrolides, magnesium, beta-blockers, and calcium channel blockers can all worsen NMJ transmission and precipitate crisis"
    ],
    quiz: [
      {
        question: "A patient with known MG is admitted with worsening weakness after being prescribed levofloxacin for a UTI. FVC is 18 mL/kg and declining. She is having difficulty managing her oral secretions. What is the priority management?",
        options: [
          "Increase pyridostigmine dose to improve NMJ transmission and continue levofloxacin",
          "Elective intubation, stop levofloxacin (switch to MG-safe antibiotic), initiate PLEX or IVIG, hold pyridostigmine",
          "Start BiPAP and administer neostigmine IV to rapidly improve respiratory strength",
          "Observe FVC trend overnight and intubate if it drops below 15 mL/kg"
        ],
        correct: 1,
        rationale: "FVC of 18 mL/kg with declining trend and inability to manage secretions meets criteria for elective intubation (FVC < 20). The precipitant is levofloxacin (fluoroquinolone — worsens NMJ transmission) — it must be stopped and switched to a MG-safe antibiotic. PLEX or IVIG should be initiated for rapid immunomodulation. Pyridostigmine should be held during crisis to reduce secretions. Increasing pyridostigmine risks cholinergic crisis. Waiting overnight risks crash intubation."
      }
    ]
  },
  "huntington-disease-np": {
    title: "Huntington Disease: NP Management",
    cellular: {
      title: "Huntington Disease Genetics & Neuropathology",
      content: "Huntington disease (HD) is an autosomal dominant neurodegenerative disorder caused by CAG trinucleotide repeat expansion in the huntingtin gene (HTT) on chromosome 4. Normal HTT contains < 26 CAG repeats; 27-35 is intermediate (may expand in offspring); 36-39 shows reduced penetrance; ≥ 40 repeats causes full penetrance. The mutant huntingtin protein contains an expanded polyglutamine tract that misfolds and aggregates, forming intranuclear inclusions. Pathologically, there is selective vulnerability of medium spiny neurons (MSNs) in the caudate nucleus and putamen (striatum). These GABAergic projection neurons degenerate through multiple mechanisms: mitochondrial dysfunction (complex II/III impairment), excitotoxicity (NMDA receptor overactivation), transcriptional dysregulation, impaired BDNF transport, and proteasome dysfunction. Striatal degeneration disrupts the indirect pathway of the basal ganglia, causing chorea (excessive involuntary movements). As disease progresses and the direct pathway also degenerates, chorea decreases while rigidity and bradykinesia increase. Anticipation occurs with paternal transmission (CAG repeats tend to expand during spermatogenesis)."
    },
    riskFactors: [
      "Autosomal dominant inheritance — 50% risk for offspring of affected parent",
      "CAG repeat length: longer repeats correlate with earlier onset and faster progression (inverse correlation)",
      "Paternal inheritance: anticipation (earlier onset in successive generations due to repeat expansion during spermatogenesis)",
      "Juvenile onset (Westphal variant) with > 60 CAG repeats: rigidity and bradykinesia predominate over chorea",
      "No modifiable risk factors for disease onset — genetic counseling is critical",
      "Psychiatric comorbidities (depression, suicidality) are disease features, not just reactive",
      "Environmental factors may modify age of onset modestly",
      "Homozygosity (both alleles affected) may show slightly earlier onset"
    ],
    diagnostics: [
      "Genetic testing: CAG repeat length on HTT gene — confirmatory (≥ 40 repeats = diagnostic); performed with pre- and post-test genetic counseling",
      "Clinical diagnosis: motor (chorea, dystonia, incoordination), cognitive (executive dysfunction, processing speed), psychiatric (depression, irritability, apathy, psychosis) triad in context of family history",
      "MRI brain: caudate atrophy with 'box-shaped' lateral ventricles (caudate head normally creates convexity in lateral ventricle wall — loss of this convexity is characteristic)",
      "UHDRS (Unified Huntington's Disease Rating Scale): standardized assessment of motor, cognitive, behavioral, and functional capacity",
      "Cognitive testing: executive function impairment earliest (Stroop test, Trail Making B, verbal fluency — 'subcortical' pattern different from AD)",
      "Psychiatric screening: depression (PHQ-9), suicidality assessment (suicide risk 4-6x general population), irritability, OCD symptoms, psychosis",
      "Predictive testing for at-risk individuals: available for presymptomatic adults > 18; requires extensive genetic counseling protocol; individual's right not to know must be respected",
      "Presymptomatic biomarkers (research): plasma NfL, volumetric MRI, functional MRI — used in clinical trials to track prodromal disease"
    ],
    management: [
      "Chorea: tetrabenazine (VMAT2 inhibitor, 12.5 mg daily titrated to max 100 mg/day — FDA-approved for HD chorea) or deutetrabenazine (longer half-life, better tolerated, BID dosing) or valbenazine",
      "Depression: SSRIs first-line (citalopram, sertraline); avoid TCAs in later disease (anticholinergic effects worsen cognition); mirtazapine for depression with insomnia/weight loss",
      "Irritability/aggression: SSRIs, atypical antipsychotics (olanzapine, risperidone — also help chorea), mood stabilizers (valproic acid if aggressive behavior resistant to other treatments)",
      "Psychosis: atypical antipsychotics (olanzapine, risperidone, quetiapine) — these also have anti-chorea benefit",
      "Cognitive decline: no proven pharmacological treatment; cognitive rehabilitation and structured environment may help",
      "Dysphagia management: SLP evaluation, modified diet textures, postural techniques; PEG tube in advanced disease",
      "Physical therapy: gait training, fall prevention, adaptive equipment; exercise programs (aerobic and strengthening) may slow functional decline",
      "Palliative care integration early in disease course; advance care planning while patient retains capacity"
    ],
    nursingActions: [
      "Comprehensive assessment using UHDRS: motor (chorea severity in each body region, dystonia, gait), cognitive (verbal fluency, Stroop, symbol digit), behavioral (depression, irritability, obsessive-compulsive behavior), functional (work capacity, finances, domestic chores, ADLs)",
      "Suicide risk assessment at every visit: HD has 4-6x the suicide rate of the general population; highest risk during early symptomatic phase when awareness of decline is highest",
      "Fall prevention: chorea and impaired balance create high fall risk; home safety assessment, remove throw rugs, install grab bars, consider wheelchair when gait becomes unsafe",
      "Nutritional monitoring: hypermetabolic state (chorea burns significant calories) + dysphagia = high risk of malnutrition and weight loss; caloric supplementation, dietitian referral",
      "Medication monitoring: tetrabenazine side effects (depression, akathisia, parkinsonism, sedation) — dose reduction or discontinuation if depression worsens; CYP2D6 poor metabolizers require lower doses",
      "Caregiver support: HD caregiving is particularly burdensome due to behavioral symptoms, long disease course (15-20 years), and genetic implications for family; connect with HDSA resources",
      "Genetic counseling coordination: facilitate access to genetic counselors for at-risk family members who wish to pursue predictive testing; respect individual's right not to know their genetic status",
      "End-of-life planning: discuss goals of care, code status, feeding tube decisions in mid-stage while patient can participate in decision-making"
    ],
    signs: {
      left: [
        "Early HD: subtle chorea (fidgeting), mild personality changes, reduced work performance, preserved ambulation and self-care",
        "Chorea responsive to low-dose tetrabenazine without significant depression or sedation",
        "Maintaining weight with dietary support and adequate caloric intake",
        "Stable mood with appropriate psychiatric treatment"
      ],
      right: [
        "Severe chorea causing falls, injury, and inability to perform ADLs",
        "Suicidal ideation — immediate psychiatric intervention required (especially early symptomatic phase)",
        "Advanced disease with rigidity replacing chorea, severe dysphagia with aspiration risk, mutism",
        "Tetrabenazine-induced depression: medication must be reduced or discontinued; monitor closely for suicidality"
      ]
    },
    medications: [
      {
        name: "Tetrabenazine (Xenazine)",
        type: "VMAT2 Inhibitor",
        action: "Inhibits vesicular monoamine transporter 2 (VMAT2), depleting presynaptic dopamine stores in the striatum; reduces dopaminergic transmission in the indirect pathway, thereby reducing chorea",
        sideEffects: "Depression (FDA black box warning — can cause suicidality), sedation/somnolence, akathisia, parkinsonism (dose-dependent), nausea, insomnia, anxiety",
        contra: "Active suicidality or untreated depression, hepatic impairment, concurrent MAOIs, concurrent reserpine",
        pearl: "Start 12.5 mg daily, titrate slowly to max 37.5 mg TID (100 mg/day). CYP2D6 poor metabolizers require lower maximum doses (50 mg/day) — CYP2D6 genotyping required for doses > 50 mg/day. Must assess for depression at each visit. Deutetrabenazine (Austedo) has longer half-life, less peak-dose side effects, and BID dosing — often better tolerated."
      },
      {
        name: "Sertraline (Zoloft)",
        type: "SSRI Antidepressant",
        action: "Selectively inhibits serotonin reuptake, increasing synaptic serotonin; treats depression and anxiety which are common HD manifestations (not just reactive — part of disease neuropathology affecting serotonergic raphe nuclei)",
        sideEffects: "Nausea, diarrhea, insomnia, sexual dysfunction, serotonin syndrome risk with MAOIs",
        contra: "Concurrent MAOIs, pimozide, concurrent thioridazine",
        pearl: "25-200 mg daily. First-line for HD depression. May also improve irritability and OCD symptoms. Preferred over TCAs which have anticholinergic effects worsening cognition and swallowing. Monitor for hyponatremia (SIADH) especially in elderly. If depression does not respond, consider mirtazapine (helps with weight gain and insomnia) or venlafaxine."
      }
    ],
    pearls: [
      "Suicide risk is 4-6x the general population in HD and peaks during the early symptomatic phase when patients have insight into their progressive decline — screen at every visit, particularly when starting or adjusting tetrabenazine (which independently causes depression)",
      "Tetrabenazine depletes dopamine — while this treats chorea, it can worsen or cause depression, parkinsonism, and akathisia; CYP2D6 genotyping is required for doses > 50 mg/day because poor metabolizers have higher drug levels and more side effects",
      "Caloric needs in HD are significantly increased due to continuous involuntary movements (chorea burns 500-1000 extra kcal/day) — patients need proactive nutritional support with high-calorie supplementation; unintentional weight loss accelerates functional decline"
    ],
    quiz: [
      {
        question: "A 42-year-old patient with known HD (CAG repeat 45) is being treated with tetrabenazine 25 mg TID for moderate chorea. At follow-up, her chorea is improved but she reports persistent low mood, sleep disturbance, and passive thoughts of death. What is the most appropriate action?",
        options: [
          "Increase tetrabenazine to maximum dose to better control chorea and add a sleep aid",
          "Reduce tetrabenazine dose, start an SSRI, and perform a comprehensive suicide risk assessment",
          "Discontinue tetrabenazine immediately and substitute haloperidol for chorea",
          "Refer to psychiatry for evaluation at next available appointment (2 weeks)"
        ],
        correct: 1,
        rationale: "Tetrabenazine has an FDA black box warning for depression and suicidality. This patient's depressive symptoms with passive death ideation require immediate action: reduce tetrabenazine dose (it may be contributing to or worsening depression), start an SSRI (sertraline first-line), and perform thorough suicide risk assessment. HD patients already have elevated suicide risk — tetrabenazine-induced depression compounds this. A 2-week wait for psychiatry is inappropriate given active suicidal ideation. Increasing tetrabenazine would worsen depression. Haloperidol substitution is unnecessarily abrupt and has its own risk profile."
      }
    ]
  },
  "normal-pressure-hydrocephalus-np": {
    title: "Normal Pressure Hydrocephalus: NP Management",
    cellular: {
      title: "NPH Pathophysiology",
      content: "Normal pressure hydrocephalus (NPH) involves ventricular dilation with normal or intermittently elevated intracranial pressure, causing the classic triad of gait disturbance, cognitive impairment, and urinary incontinence ('wet, wacky, and wobbly'). The pathophysiology is incompletely understood but involves impaired CSF absorption at the arachnoid granulations, possibly from fibrosis after prior meningitis, SAH, or head trauma (secondary NPH), or age-related changes (idiopathic NPH — iNPH). CSF dynamics create periventricular transependymal flow with white matter damage, particularly affecting frontal lobe connections and corona radiata fibers serving the legs (explaining the magnetic, wide-based gait pattern). The gait disturbance typically appears first and is most likely to improve with shunting, followed by urinary incontinence; cognitive impairment responds least reliably. NPH is one of the few potentially reversible causes of dementia, making accurate diagnosis critical — it is estimated to account for 5-6% of dementia cases."
    },
    riskFactors: [
      "Age > 60 years (peak incidence 70-80 years)",
      "Prior meningitis, subarachnoid hemorrhage, or head trauma (secondary NPH)",
      "Prior neurosurgery or intracranial radiation",
      "Cerebrovascular disease (vascular risk factors may contribute to iNPH development)",
      "Hypertension and diabetes (possible vascular contribution to impaired CSF dynamics)",
      "Aqueductal stenosis (obstructive component in some cases)",
      "Familial cases reported (rare)"
    ],
    diagnostics: [
      "MRI brain: ventriculomegaly (Evans index > 0.3 = frontal horn width / maximum biparietal diameter) disproportionate to sulcal atrophy; periventricular T2 hyperintensity (transependymal flow); DESH pattern (disproportionately enlarged subarachnoid space hydrocephalus — tight high-convexity sulci with enlarged sylvian fissures)",
      "Gait assessment: magnetic, wide-based, short-step, shuffling gait (feet appear stuck to floor); difficulty turning; gait apraxia (distinct from parkinsonian gait — freezing at initiation, no improvement with dopaminergic therapy)",
      "Cognitive testing: subcortical pattern — psychomotor slowing, executive dysfunction, impaired attention; memory relatively preserved early (distinguishes from AD)",
      "Large-volume LP (CSF tap test): remove 30-50 mL CSF; assess gait pre- and post-tap (Timed Up and Go test, 10-meter walk); improvement within 24-72 hours predicts shunt response (sensitivity 50-60%, specificity > 90%)",
      "Extended lumbar drainage (ELD): 10 mL/hr CSF drainage × 72 hours via lumbar drain; higher sensitivity (~80%) than single tap test for predicting shunt response",
      "CSF opening pressure: typically normal (< 24 cmH2O) — 'normal pressure' hydrocephalus; may show B-waves on continuous monitoring",
      "CT head: alternative if MRI contraindicated; shows ventriculomegaly, may show periventricular lucency",
      "Cine MRI (phase-contrast): CSF flow study showing aqueductal flow velocity; increased stroke volume may predict shunt response"
    ],
    management: [
      "Ventriculoperitoneal (VP) shunt: definitive treatment; programmable valve allows pressure adjustment without repeat surgery; ~60-80% of well-selected patients improve",
      "Endoscopic third ventriculostomy (ETV): alternative to shunt for select patients, especially those with aqueductal stenosis; creates opening in floor of third ventricle for CSF bypass",
      "Lumboperitoneal shunt: alternative to VP shunt; lower infection risk but higher revision rate",
      "Optimal patient selection predicts outcome: short symptom duration (< 2 years), gait as predominant symptom, positive tap test, known cause (secondary NPH), and minimal vascular white matter disease = best shunt responders",
      "Post-shunt management: regular clinical assessment (gait, cognition, continence), valve pressure adjustment based on symptoms (over-drainage → subdural hematoma/hygroma; under-drainage → persistent symptoms)",
      "Concurrent AD pathology does not preclude shunting — mixed pathology is common but gait may still improve",
      "Physical therapy pre- and post-shunt: gait training, balance exercises, fall prevention — maximize functional recovery",
      "Manage comorbidities: treat vascular risk factors, screen for concurrent neurodegenerative disease"
    ],
    nursingActions: [
      "Pre-tap assessment: document baseline gait (Timed Up and Go, 10-meter walk speed, step count), cognitive status (MoCA), and urinary symptoms before diagnostic CSF tap",
      "Post-tap assessment: repeat gait testing at 1-4 hours, 24 hours, and 72 hours post-LP; document any improvement (even subtle changes in stride length or speed are significant)",
      "Post-shunt monitoring: assess for headache (positional — worse upright suggests over-drainage), fever (shunt infection), abdominal pain (peritoneal catheter complication), and wound healing",
      "Monitor for shunt complications: over-drainage (subdural hematoma — new headache, declining cognition, focal deficits), under-drainage (persistent or returning symptoms), shunt infection (fever, meningismus, wound erythema within 6 months of surgery), obstruction",
      "Fall prevention: NPH gait disorder creates high fall risk; assess and implement fall precautions, mobility aids, home safety modifications",
      "Urinary assessment: bladder diary, post-void residual measurement; urinary urgency may respond to shunting (incontinence is later manifestation)",
      "Cognitive monitoring: serial MoCA testing pre- and post-intervention; cognitive improvement may lag behind gait improvement by weeks to months",
      "Patient/family education: NPH is a treatable cause of dementia — set realistic expectations (gait most likely to improve, cognition less predictably; improvement may take weeks to months post-shunt)"
    ],
    signs: {
      left: [
        "Classic triad with gait predominant (wet, wacky, wobbly) and short symptom duration (< 2 years)",
        "Positive CSF tap test: measurable improvement in gait speed or step count within 72 hours after removing 30-50 mL CSF",
        "Post-shunt improvement: improved gait, reduced urinary urgency, better cognitive performance on testing",
        "MRI showing DESH pattern (tight convexity, enlarged sylvian fissures) with minimal periventricular white matter disease"
      ],
      right: [
        "Shunt malfunction: return of symptoms or new headache, declining cognitive status — obtain CT head and shunt series",
        "Over-drainage with subdural hematoma: new headache (worse upright), neurological decline, imaging showing subdural collection",
        "Shunt infection: fever, wound erythema, meningismus, positive CSF culture — neurosurgical emergency",
        "Concurrent progressive dementia (AD or vascular) with minimal response to shunting despite adequate CSF diversion"
      ]
    },
    medications: [
      {
        name: "Acetazolamide (temporary/diagnostic)",
        type: "Carbonic Anhydrase Inhibitor",
        action: "Reduces CSF production by inhibiting carbonic anhydrase in the choroid plexus; used temporarily for symptom management if surgery is delayed or patient is not a surgical candidate",
        sideEffects: "Metabolic acidosis, paresthesias, fatigue, kidney stones, hypokalemia, altered taste",
        contra: "Sulfonamide allergy (cross-reactivity), severe hepatic/renal insufficiency, electrolyte imbalance",
        pearl: "250-500 mg PO BID. NOT a substitute for surgical management — temporary measure only. May be used as a 'medical trial' in borderline surgical candidates. Monitor electrolytes and bicarbonate. Limited evidence for long-term efficacy in NPH."
      },
      {
        name: "Programmable VP Shunt Valve",
        type: "CSF Diversion Device",
        action: "Diverts excess CSF from lateral ventricle to peritoneal cavity through a one-way valve; programmable valves allow non-invasive pressure adjustment using an external magnetic programmer to optimize drainage",
        sideEffects: "Infection (5-10% — highest risk first 6 months), over-drainage (subdural hematoma/hygroma — 5-10%), catheter obstruction, peritoneal complications (pseudocyst, catheter migration)",
        contra: "Active CSF infection, peritoneal pathology precluding distal catheter placement (use VA shunt alternative)",
        pearl: "Programmable valves (Codman Hakim, Medtronic Strata) are standard — allow pressure adjustment in clinic. Patients must be warned that MRI can change valve setting (check and reprogram after every MRI). Anti-siphon devices prevent postural over-drainage. Shunt malfunction presents with symptom recurrence — CT head and shunt series (plain X-rays) are initial evaluation."
      }
    ],
    pearls: [
      "NPH is one of the few 'reversible dementias' — failure to diagnose means missing a treatable condition; the classic triad appears in < 50% of patients, so maintain high suspicion for any elderly patient with unexplained gait disorder, even without the full triad",
      "Gait disturbance is the earliest and most reliably shunt-responsive symptom — if gait improves on the tap test, shunting is likely to help even if cognition and continence do not clearly improve on the tap test",
      "After MRI, always check and reprogram the shunt valve setting — strong magnetic fields can change the programmable valve pressure setting, potentially causing over- or under-drainage"
    ],
    quiz: [
      {
        question: "A 74-year-old patient presents with progressive wide-based gait difficulty for 8 months, recent urinary urgency, and mild cognitive slowing. MRI shows ventriculomegaly with Evans index 0.38 and tight high-convexity sulci. What is the most appropriate next diagnostic step?",
        options: [
          "Start donepezil for presumed Alzheimer disease based on ventriculomegaly",
          "Perform a large-volume lumbar puncture (30-50 mL) with pre- and post-tap gait assessment",
          "Order CT head to confirm findings and refer to neurosurgery for immediate VP shunt",
          "Prescribe acetazolamide 500 mg BID and reassess in 6 months"
        ],
        correct: 1,
        rationale: "This presentation (gait predominant triad, MRI with ventriculomegaly + DESH pattern) is classic for normal pressure hydrocephalus. The appropriate diagnostic step is a large-volume CSF tap test (remove 30-50 mL) with objective pre- and post-tap gait assessment. Improvement predicts positive shunt response. A positive tap test would then support neurosurgical referral for VP shunt placement. Immediate shunt without diagnostic workup is premature. Donepezil treats AD, not NPH. Acetazolamide alone delays definitive treatment."
      }
    ]
  },
  "central-pontine-myelinolysis-np": {
    title: "Central Pontine Myelinolysis: NP Management",
    cellular: {
      title: "Osmotic Demyelination Syndrome Pathophysiology",
      content: "Central pontine myelinolysis (CPM), now more accurately termed osmotic demyelination syndrome (ODS), results from overly rapid correction of chronic hyponatremia. In chronic hyponatremia (> 48 hours), brain cells adapt by extruding organic osmolytes (glutamate, taurine, myo-inositol, glycerophosphocholine) to prevent cerebral edema. When serum sodium is corrected too rapidly, the extracellular osmolality rises faster than brain cells can re-accumulate osmolytes, creating an osmotic gradient that draws water out of brain cells. Oligodendrocytes are particularly vulnerable to this osmotic stress, causing apoptosis and demyelination. The pons is most commonly affected (dense fiber tracts, watershed vascular zone), but extrapontine sites (basal ganglia, thalamus, cerebral white matter) occur in up to 50% of cases — hence the term ODS. Symptoms typically appear 2-6 days after sodium correction: initial improvement from hyponatremia correction is followed by new neurological deterioration (biphasic clinical course)."
    },
    riskFactors: [
      "Chronic hyponatremia (> 48 hours) corrected at rate > 8 mEq/L in 24 hours (most important risk factor)",
      "Severe hyponatremia (Na+ < 120 mEq/L) — greater adaptation means greater vulnerability to rapid correction",
      "Alcoholism and malnutrition (osmolyte depletion makes brain cells more vulnerable)",
      "Liver disease and liver transplantation (rapid sodium shifts during transplant procedure)",
      "Hypokalemia correction without monitoring sodium (potassium replacement can indirectly raise sodium)",
      "Severe burns (massive fluid shifts and sodium fluctuations)",
      "Chronic diuretic use (especially thiazides causing chronic hyponatremia)",
      "Psychogenic polydipsia (chronic severe hyponatremia)"
    ],
    diagnostics: [
      "MRI brain (GOLD STANDARD): T2/FLAIR hyperintensity in central pons ('trident' or 'piglet face' pattern sparing the periphery and ventrolateral pons); DWI positive early; extrapontine lesions in basal ganglia, thalami",
      "MRI timing critical: may be NORMAL in first 2-4 days of symptoms; repeat MRI at 10-14 days if clinical suspicion remains high despite initial negative scan",
      "Serial sodium monitoring: document rate of correction — Na+ rise should be < 8 mEq/L/24h (some guidelines say < 10; stricter limit < 6 in high-risk patients)",
      "Clinical presentation: biphasic course — initial improvement from hyponatremia treatment, then new symptoms 2-6 days later: dysarthria, dysphagia, spastic quadriparesis, pseudobulbar palsy, 'locked-in syndrome' in severe cases",
      "CT head: usually normal or may show subtle pontine hypodensity (much less sensitive than MRI)",
      "EEG: may show encephalopathic pattern but non-specific",
      "CSF: typically normal or mildly elevated protein; helps exclude infectious or inflammatory etiologies",
      "Serum osmolality trending: confirms osmolarity changes that preceded symptoms"
    ],
    management: [
      "PREVENTION is paramount: correct chronic hyponatremia at rate ≤ 8 mEq/L per 24 hours (≤ 6 mEq/L in high-risk patients: alcoholism, malnutrition, liver disease, severe hyponatremia < 105)",
      "If overcorrection occurs: re-lower sodium using D5W infusion (3-6 mL/kg/hr IV) ± desmopressin 2-4 mcg IV q6-8h to 'rescue' back below target correction rate",
      "Desmopressin proactive strategy: give DDAVP 1-2 mcg IV q8h during correction to prevent endogenous water excretion, then use 3% saline at controlled rate to achieve precise correction",
      "Supportive care once ODS develops: no proven treatment to reverse damage; supportive ICU care, nutritional support, aggressive rehabilitation",
      "Airway management: intubation and mechanical ventilation for severe bulbar dysfunction or locked-in state",
      "Experimental/case report therapies: IV immunoglobulin, plasmapheresis, high-dose dexamethasone — anecdotal reports of benefit but no controlled data",
      "Rehabilitation: early and intensive PT, OT, SLP — significant recovery is possible over months to years; do not prognosticate too early",
      "Thiamine supplementation: always administer thiamine (100-500 mg IV) in malnourished/alcoholic patients before dextrose (Wernicke prevention)"
    ],
    nursingActions: [
      "Sodium monitoring: q2-4h serum sodium levels during active correction of severe hyponatremia — calculate rate of rise and alert provider if approaching correction limit",
      "Strict I&O monitoring: account for all IV fluids, oral intake, and urine output; unexpected urine dilution cessation (aquaresis) can accelerate sodium rise",
      "Neurological assessment during hyponatremia correction: watch for seizures (too slow/insufficient correction), then later watch for new dysarthria, dysphagia, quadriparesis (overcorrection/ODS)",
      "If overcorrection suspected: immediately contact provider for D5W and DDAVP orders; hang D5W at prescribed rate; monitor sodium q1-2h during rescue",
      "Document rate of sodium correction clearly: create a sodium correction timeline in nursing notes for real-time tracking",
      "Identify high-risk patients early: alcoholism, liver disease, severe chronic hyponatremia, malnutrition — alert provider that stricter correction limits apply (< 6 mEq/L/24h)",
      "For established ODS: meticulous ICU nursing care — skin integrity, nutrition (NG/PEG if bulbar dysfunction), DVT prophylaxis, respiratory toilet, communication support if locked-in",
      "Family education: ODS recovery can be slow but significant — outcomes are better than initial presentation often suggests; rehabilitation may continue for months"
    ],
    signs: {
      left: [
        "Appropriate sodium correction rate (< 8 mEq/L/24h) with resolving hyponatremia symptoms",
        "Mild ODS with isolated dysarthria and ataxia — better prognosis for recovery",
        "Improving neurological function weeks to months after ODS onset",
        "MRI showing small central pontine lesion without extrapontine involvement"
      ],
      right: [
        "Locked-in syndrome: quadriplegia with preserved consciousness and vertical eye movements only (bilateral ventral pontine destruction)",
        "Severe pseudobulbar palsy with inability to protect airway, requiring tracheostomy and PEG",
        "Overcorrection recognized late (sodium rise > 12 mEq/L in 24 hours in high-risk patient) — urgently re-lower sodium",
        "Extensive extrapontine myelinolysis with movement disorder (parkinsonism, dystonia) and cognitive impairment"
      ]
    },
    medications: [
      {
        name: "Desmopressin (DDAVP)",
        type: "Synthetic ADH Analog (V2 receptor agonist)",
        action: "Activates V2 vasopressin receptors in renal collecting duct, inserting aquaporin-2 channels and promoting water reabsorption; prevents unwanted aquaresis (free water excretion) that would accelerate sodium correction beyond safe limits",
        sideEffects: "Hyponatremia (therapeutic in this context), water intoxication if given without sodium monitoring, headache",
        contra: "Known hypersensitivity; must not be given without sodium monitoring (can worsen hyponatremia if not in the context of controlled correction)",
        pearl: "Proactive DDAVP strategy: give 1-2 mcg IV q8h prophylactically during hyponatremia correction to clamp urine osmolality high (prevent aquaresis), then use 3% NaCl at calculated rate for precise sodium control. If overcorrection already occurred, use DDAVP 2-4 mcg IV + D5W infusion to re-lower sodium. This strategy provides the tightest control of correction rate."
      },
      {
        name: "3% Hypertonic Saline (for controlled correction)",
        type: "Concentrated Sodium Solution",
        action: "Raises serum sodium in a controlled, calculable manner; used with DDAVP proactive strategy to precisely target < 8 mEq/L/24h correction rate while addressing symptomatic severe hyponatremia",
        sideEffects: "Phlebitis (give via central line if available; can use peripheral for short term in emergency), volume overload, overly rapid correction if not carefully dosed",
        contra: "Unmonitored administration, hypernatremia",
        pearl: "For acute symptomatic hyponatremia (seizures, altered mental status): 100 mL bolus of 3% NaCl over 10 minutes, repeat up to 3 times if symptoms persist — goal is to raise sodium by 4-6 mEq/L initially to stop symptoms, then slow correction. Adler-Sterns formula: infusion rate (mL/hr) = desired rate of rise × weight (kg) × 10/Na+ of infusate (513 for 3%). Monitor sodium q2h."
      }
    ],
    pearls: [
      "The 'rule of 8' is the cornerstone of ODS prevention: never correct chronic hyponatremia by more than 8 mEq/L in any 24-hour period; in high-risk patients (alcoholism, liver disease, Na+ < 105), aim for ≤ 6 mEq/L/24h",
      "Overcorrection can be REVERSED: if sodium rises too quickly, immediate administration of DDAVP + D5W can re-lower sodium to a safe trajectory — this 'rescue' strategy has been shown to prevent ODS development even after inadvertent overcorrection",
      "ODS prognosis is better than historically believed: with aggressive rehabilitation, many patients show significant improvement over weeks to months — early prognostication of 'locked-in' patients should be cautious; some achieve meaningful functional recovery"
    ],
    quiz: [
      {
        question: "A 55-year-old alcoholic patient with chronic hyponatremia (Na+ 108 mEq/L) is being treated with 3% saline. At 12 hours, sodium has risen to 118 mEq/L (10 mEq/L rise). What is the most appropriate immediate action?",
        options: [
          "Continue current rate of 3% saline — the rise is appropriate for severe hyponatremia",
          "Stop hypertonic saline, start D5W infusion, and administer desmopressin 2-4 mcg IV to re-lower sodium",
          "Switch to normal saline and recheck sodium in 6 hours",
          "Administer furosemide 40 mg IV to promote free water excretion and prevent fluid overload"
        ],
        correct: 1,
        rationale: "This alcoholic patient is high-risk for ODS, with a recommended maximum correction rate of ≤ 6-8 mEq/L/24h. A 10 mEq/L rise in 12 hours has already exceeded the safe limit. Immediate intervention is needed to re-lower sodium: stop hypertonic saline, start D5W infusion, and give DDAVP to prevent further free water excretion. This 'rescue' strategy can prevent ODS even after overcorrection. Continuing correction or giving furosemide would be dangerous."
      }
    ]
  },
  "pres-np": {
    title: "PRES: NP Management",
    cellular: {
      title: "Posterior Reversible Encephalopathy Syndrome",
      content: "Posterior reversible encephalopathy syndrome (PRES) results from failure of cerebral autoregulation, primarily affecting the posterior circulation. Two leading theories explain the pathophysiology: (1) Hypertensive breakthrough: severe hypertension exceeds the upper limit of cerebral autoregulation (~150-160 mmHg MAP), causing forced arteriolar dilation, hyperperfusion, blood-brain barrier (BBB) disruption, and vasogenic edema. The posterior circulation is preferentially affected because the vertebrobasilar system has less sympathetic innervation (fewer alpha-adrenergic nerves) than the anterior circulation, making it more vulnerable to autoregulatory failure. (2) Endothelial dysfunction: cytotoxic medications (calcineurin inhibitors, chemotherapy), eclampsia, and autoimmune conditions directly damage endothelial cells, causing BBB disruption even at normal blood pressures (explains ~20% of PRES cases without severe hypertension). Vasogenic edema (extracellular water accumulation from BBB breakdown) is the hallmark and is typically reversible with prompt treatment, distinguishing PRES from cytotoxic edema (cellular death)."
    },
    riskFactors: [
      "Severe hypertension (most common association — present in 70-80% of cases)",
      "Eclampsia and preeclampsia (PRES is the proposed mechanism of eclamptic seizures)",
      "Calcineurin inhibitors: cyclosporine, tacrolimus (direct endothelial toxicity — common in transplant patients)",
      "Cytotoxic chemotherapy: cisplatin, bevacizumab (anti-VEGF), gemcitabine, cyclophosphamide",
      "Autoimmune conditions: SLE (lupus cerebritis may overlap with PRES), scleroderma renal crisis, TTP/HUS",
      "Renal failure (impaired autoregulation and fluid overload)",
      "Organ transplant recipients (combination of immunosuppressants and hypertension)",
      "Sepsis and systemic inflammatory response (endothelial activation)"
    ],
    diagnostics: [
      "MRI brain (GOLD STANDARD): bilateral symmetric vasogenic edema (T2/FLAIR hyperintensity) in parietal-occipital regions; DWI shows facilitated diffusion (ADC map bright — vasogenic, not cytotoxic); may involve frontal lobes, cerebellum, brainstem",
      "CT head: may show posterior hypodensity but much less sensitive than MRI; useful to exclude hemorrhage emergently",
      "DWI/ADC distinction is critical: vasogenic edema (PRES) shows high ADC (reversible); cytotoxic edema shows low ADC (irreversible infarction) — mixed pattern indicates worse prognosis",
      "Blood pressure documentation: typically severe (> 180/120) but ~20% of PRES occurs at lower pressures (especially drug-induced)",
      "Serum creatinine, electrolytes: renal function assessment (renal failure is both cause and consequence)",
      "Drug levels: cyclosporine, tacrolimus trough levels (may be therapeutic — toxicity can occur at normal levels)",
      "CBC with peripheral smear: if TTP/HUS suspected (schistocytes, thrombocytopenia, elevated LDH, low haptoglobin)",
      "Pregnancy-related labs if applicable: liver enzymes, platelets, urine protein (HELLP syndrome workup)"
    ],
    management: [
      "Blood pressure reduction: target 20-25% reduction in MAP over first 1-2 hours; avoid precipitous drops (risk of watershed infarction); IV labetalol, nicardipine infusion, or hydralazine",
      "In eclampsia/preeclampsia: IV magnesium sulfate 4-6 g loading dose then 1-2 g/hr infusion (seizure prophylaxis/treatment); definitive treatment is delivery",
      "Remove offending agent: reduce or hold calcineurin inhibitor (reduce dose 25-50% or switch agents), discontinue causative chemotherapy",
      "Seizure management: IV lorazepam for active seizures; short-term AED prophylaxis (levetiracetam); long-term AEDs usually not needed once PRES resolves",
      "Treat underlying cause: dialysis for uremia, delivery for eclampsia, immunosuppression adjustment for transplant PRES",
      "ICU monitoring: continuous BP monitoring (arterial line preferred), serial neurological exams, seizure precautions",
      "Fluid management: correct volume overload if present; avoid hypovolemia (worsens cerebral perfusion)",
      "Follow-up MRI: repeat in 1-2 weeks to confirm resolution of vasogenic edema (confirms diagnosis and guides medication management)"
    ],
    nursingActions: [
      "Continuous blood pressure monitoring: arterial line preferred; document MAP and response to antihypertensive therapy; avoid reducing MAP > 25% in first hour",
      "Neurological assessment q1h: level of consciousness, visual symptoms (cortical blindness — patient may not be aware they cannot see), seizure activity, headache severity",
      "Seizure precautions: padded rails, suction at bedside, IV access, rescue benzodiazepine available; eclamptic patients require magnesium sulfate monitoring (reflexes, RR, urine output)",
      "Visual assessment: PRES commonly causes visual disturbance ranging from blurred vision to cortical blindness (bilateral occipital involvement) — ask patient to identify objects, assess visual fields",
      "Medication management: hold calcineurin inhibitor and notify physician; when restarted, use at lower dose with closer drug level monitoring",
      "Magnesium sulfate monitoring (if eclamptic): assess deep tendon reflexes q1h (loss = toxicity), respiratory rate ≥ 12, urine output ≥ 30 mL/hr; calcium gluconate 1 g IV at bedside for magnesium toxicity",
      "Monitor for complications: intracranial hemorrhage (5-15% of PRES), status epilepticus, progression to cytotoxic edema (irreversible damage)",
      "Patient/family education: PRES is typically reversible with prompt treatment — symptoms usually resolve within days to weeks; visual deficits improve as edema resolves"
    ],
    signs: {
      left: [
        "Headache with mild visual blurring, controllable blood pressure, no seizures",
        "MRI showing vasogenic edema only (high ADC — no restricted diffusion)",
        "Symptoms improving within 48-72 hours of blood pressure control and trigger removal",
        "Follow-up MRI showing resolution of edema"
      ],
      right: [
        "Status epilepticus requiring aggressive AED management and intubation",
        "Cortical blindness — bilateral occipital lobe involvement (may be unaware of visual loss — Anton syndrome)",
        "Hemorrhagic PRES: intracranial hemorrhage complicating vasogenic edema (5-15% of cases — worse prognosis)",
        "Restricted diffusion on DWI/ADC (cytotoxic edema) — indicates irreversible infarction within PRES territory"
      ]
    },
    medications: [
      {
        name: "Nicardipine IV Infusion",
        type: "Dihydropyridine Calcium Channel Blocker",
        action: "Selective arteriolar vasodilation through L-type calcium channel blockade; does not cross the BBB significantly; provides smooth, titratable blood pressure reduction; preferred in PRES because cerebral vasodilation properties may improve perfusion",
        sideEffects: "Reflex tachycardia, headache, nausea, peripheral edema, injection site phlebitis",
        contra: "Severe aortic stenosis (afterload-dependent), advanced heart failure",
        pearl: "Start at 5 mg/hr IV, titrate by 2.5 mg/hr q5-15 min (max 15 mg/hr). Target 20-25% MAP reduction over first 1-2 hours. Onset 5-10 minutes. Advantage over nitroprusside: no cerebral vasodilation that could worsen ICP, no cyanide toxicity risk. Can transition to oral amlodipine or nifedipine for ongoing management."
      },
      {
        name: "Magnesium Sulfate (for eclamptic PRES)",
        type: "NMDA Receptor Antagonist / Vasodilator",
        action: "Blocks NMDA receptors reducing seizure activity; causes cerebral vasodilation improving perfusion; stabilizes endothelial cell membranes; reduces calcium-mediated vasoconstriction; mechanism in eclampsia is multifactorial",
        sideEffects: "Respiratory depression, loss of deep tendon reflexes (first sign of toxicity), hypotension, flushing, cardiac arrest at very high levels",
        contra: "Myasthenia gravis, severe renal failure (accumulation — reduce dose and monitor levels)",
        pearl: "Loading dose 4-6 g IV over 15-20 min, then 1-2 g/hr maintenance. Therapeutic range 4-7 mEq/L. Monitor DTRs hourly (loss at 7-10 mEq/L), respiratory rate (depression at 10-13 mEq/L), cardiac arrest (> 15 mEq/L). Antidote: calcium gluconate 1 g IV over 3 minutes. Continue for 24-48 hours postpartum (seizure risk persists)."
      }
    ],
    pearls: [
      "PRES can occur at 'normal' blood pressures — 20% of cases develop without severe hypertension, particularly with calcineurin inhibitor toxicity, chemotherapy, or autoimmune conditions; do not exclude PRES based on blood pressure alone",
      "Cortical blindness in PRES may present with Anton syndrome (patient denies visual loss and confabulates visual descriptions) — actively test vision by asking patients to identify objects or count fingers rather than accepting verbal reassurance",
      "The DWI/ADC map is the most important prognostic imaging feature: high ADC (vasogenic edema) = reversible; low ADC (cytotoxic edema/restricted diffusion) = irreversible damage; mixed patterns occur in 15-25% and carry worse prognosis"
    ],
    quiz: [
      {
        question: "A 35-year-old kidney transplant recipient on tacrolimus presents with severe headache, visual loss, and a witnessed seizure. BP is 195/120. MRI shows bilateral parietal-occipital T2/FLAIR hyperintensity with high ADC values. What is the diagnosis and key management priorities?",
        options: [
          "Bilateral posterior cerebral artery stroke — start IV tPA within the 4.5-hour window",
          "PRES — control blood pressure gradually, hold/reduce tacrolimus, treat seizures with benzodiazepines",
          "Tacrolimus-induced posterior fossa tumor — urgent neurosurgical consultation",
          "Cerebral vasculitis from transplant rejection — increase immunosuppression"
        ],
        correct: 1,
        rationale: "This is classic PRES: transplant patient on calcineurin inhibitor (tacrolimus), severe hypertension, headache, visual loss, seizure, and bilateral posterior vasogenic edema (T2/FLAIR hyperintense with HIGH ADC — confirming vasogenic, not cytotoxic). Management priorities: (1) gradual BP reduction (20-25% over first 1-2 hours), (2) hold or reduce tacrolimus (direct endothelial toxicity), (3) treat seizures. PRES is typically reversible with prompt treatment. The high ADC values distinguish this from stroke (which would show restricted diffusion/low ADC)."
      }
    ]
  },
  "cavernous-sinus-thrombosis-np": {
    title: "Cavernous Sinus Thrombosis: NP Mgmt",
    cellular: {
      title: "Cavernous Sinus Thrombosis Pathophysiology",
      content: "Cavernous sinus thrombosis (CST) is a rare, life-threatening condition in which infection or thrombosis affects the paired cavernous sinuses flanking the sella turcica. The cavernous sinus contains critical neurovascular structures: the internal carotid artery, CN III (oculomotor), CN IV (trochlear), CN V1 (ophthalmic division of trigeminal), CN V2 (maxillary division), and CN VI (abducens — most vulnerable due to its free-floating position within the sinus). Septic CST most commonly results from contiguous spread of infection from the 'dangerous triangle of the face' (mid-face infections → anterior facial vein → ophthalmic veins → cavernous sinus; the facial veins lack valves, allowing bidirectional flow), paranasal sinuses (especially sphenoid and ethmoid), or dental infections. Staphylococcus aureus is the most common causative organism (70%). Thrombosis within the sinus compresses traversing cranial nerves, causing ophthalmoplegia. Bilateral involvement occurs in 50-70% due to intercavernous venous connections."
    },
    riskFactors: [
      "Sinusitis — especially sphenoid and ethmoid sinus infection (most common source of septic CST)",
      "Facial infections within the 'danger triangle' (nasolabial fold to bridge of nose)",
      "Dental infections (upper molars and premolars — drain near pterygoid plexus)",
      "Orbital cellulitis and periorbital infections",
      "Otitis media and mastoiditis",
      "Staphylococcus aureus bacteremia",
      "Immunocompromised states: diabetes, HIV, malignancy",
      "Recent facial surgery, trauma, or manipulation of facial infections"
    ],
    diagnostics: [
      "CT venography or MR venography: filling defects in cavernous sinus confirming thrombosis; CT with contrast may show expansion of cavernous sinus",
      "MRI brain with contrast: cavernous sinus enlargement, convexity of lateral wall (normally concave), heterogeneous signal within sinus; diffusion restriction suggests abscess",
      "CT sinuses: identify source of infection (sphenoid/ethmoid sinusitis is most common)",
      "Blood cultures: positive in 70% of septic CST (Staphylococcus aureus most common, followed by Streptococcus species, gram-negatives, Mucor in immunocompromised)",
      "CBC with differential: leukocytosis, bandemia (left shift)",
      "Proptosis assessment and measurement: bilateral proptosis with chemosis is characteristic",
      "Cranial nerve examination: CN III (ptosis, mydriasis), CN IV (head tilt, vertical diplopia), CN VI (lateral gaze palsy — often earliest finding), CN V1/V2 (facial numbness)",
      "Fundoscopy: papilledema from impaired venous drainage, retinal venous engorgement"
    ],
    management: [
      "High-dose IV antibiotics targeting S. aureus: vancomycin 15-20 mg/kg IV q8-12h (or linezolid/daptomycin if vancomycin intolerant) + broad-spectrum coverage (ceftriaxone or meropenem for gram-negatives and anaerobes)",
      "Duration: 3-4 weeks IV antibiotics minimum; longer if complicated (abscess, osteomyelitis)",
      "Anticoagulation: IV heparin is controversial but generally recommended to prevent clot propagation and facilitate drainage — risk of hemorrhagic infarction exists but most evidence favors heparin reducing mortality and morbidity",
      "Source control: surgical drainage of source infection (sinus surgery for sinusitis, dental extraction for dental source, orbital decompression for orbital abscess)",
      "Corticosteroids: dexamethasone may reduce inflammation and cranial nerve edema; evidence limited but commonly used as adjunct",
      "Mucormycosis consideration: in diabetic ketoacidosis or immunocompromised patients with CST, amphotericin B and surgical debridement are essential — rhinocerebral mucormycosis has high mortality",
      "ICP management if elevated: HOB elevation, acetazolamide, CSF drainage if needed",
      "Ophthalmology consultation: monitor visual acuity, intraocular pressure (elevated from impaired venous drainage), fundus changes"
    ],
    nursingActions: [
      "Frequent neurological assessment: cranial nerve function q2-4h (pupil reactivity, extraocular movements, facial sensation, visual acuity) — progression indicates clot expansion or contralateral spread",
      "Monitor for bilateral involvement: CST spreads to contralateral sinus via intercavernous connections in 50-70% of cases — new contralateral proptosis, eye pain, or cranial nerve deficit is an emergency",
      "Proptosis and periorbital assessment: measure proptosis with Hertel exophthalmometer if available; document chemosis, eyelid edema, conjunctival injection",
      "Antibiotic administration: ensure timely doses, monitor for nephrotoxicity (vancomycin trough levels 15-20 mcg/mL), adjust for renal function",
      "Anticoagulation monitoring: aPTT for heparin drip (target 1.5-2.5x control), monitor for hemorrhagic complications",
      "Fever monitoring: temperature trend (persistent fever despite antibiotics suggests undrained collection or need for broader coverage)",
      "Eye care: lubricating drops/ointment for proptotic eyes at risk of exposure keratopathy; protect cornea if unable to close eyelids",
      "VTE prophylaxis: patient may already be anticoagulated; if not (because of contraindication), ensure mechanical prophylaxis"
    ],
    signs: {
      left: [
        "Unilateral periorbital swelling with mild proptosis and intact visual acuity",
        "Single cranial nerve involvement (isolated CN VI palsy — earliest finding)",
        "Responding to IV antibiotics with improving fever, WBC trend, and reduced swelling",
        "Unilateral disease without signs of contralateral progression"
      ],
      right: [
        "Bilateral proptosis and ophthalmoplegia — indicates bilateral CST (medical emergency with high mortality)",
        "Visual loss from optic nerve compression or central retinal vein occlusion",
        "Meningitis signs: neck stiffness, photophobia, Kernig/Brudzinski positive (CST can spread to meninges)",
        "Mucormycosis in DKA patient: black eschar on palate or nasal turbinates, rapid progression — emergent surgical debridement needed"
      ]
    },
    medications: [
      {
        name: "Vancomycin IV",
        type: "Glycopeptide Antibiotic",
        action: "Inhibits cell wall synthesis by binding D-Ala-D-Ala terminus of peptidoglycan precursors; bactericidal against gram-positive organisms including MRSA — first-line empiric coverage for septic CST given S. aureus predominance",
        sideEffects: "Red man syndrome (histamine release with rapid infusion — slow rate), nephrotoxicity, ototoxicity, thrombocytopenia, DRESS syndrome",
        contra: "Known hypersensitivity (consider linezolid or daptomycin alternative)",
        pearl: "15-20 mg/kg IV q8-12h; target trough 15-20 mcg/mL (or AUC/MIC 400-600 per newer guidelines). Infuse over ≥ 1 hour (2 hours for doses > 1 g) to prevent red man syndrome. CNS penetration is moderate — adequate for meningeal involvement. Combination with ceftriaxone or meropenem provides broad-spectrum coverage for polymicrobial infections."
      },
      {
        name: "Unfractionated Heparin (anticoagulation for CST)",
        type: "Anticoagulant",
        action: "Potentiates antithrombin III-mediated inhibition of thrombin and factor Xa; prevents propagation of cavernous sinus thrombosis, facilitates recanalization, and may improve cranial nerve outcomes",
        sideEffects: "Hemorrhage (including hemorrhagic transformation of venous infarcts), HIT, osteoporosis with prolonged use",
        contra: "Active intracranial hemorrhage (relative — risk-benefit analysis needed), severe thrombocytopenia, HIT",
        pearl: "Anticoagulation for septic CST is debated but most experts and retrospective data support its use — it reduces mortality and cranial nerve sequelae. Start UFH without bolus (risk of hemorrhagic transformation); target aPTT 1.5-2.5x control. Transition to warfarin or DOAC for 3-6 months. Monitor closely for hemorrhagic complications with daily neuro checks."
      }
    ],
    pearls: [
      "The 'danger triangle of the face' (from corners of the mouth to the bridge of the nose) drains via valveless facial veins into the cavernous sinus — never squeeze or incise mid-face infections (particularly nasolabial furuncles) as this can force bacteria into the venous system",
      "CN VI (abducens) is typically the first cranial nerve affected in CST because it runs freely through the cavernous sinus (not embedded in the lateral wall like CN III, IV, V) — an isolated lateral gaze palsy with periorbital swelling and fever should raise immediate suspicion for CST",
      "In an immunocompromised or DKA patient with CST features, always consider mucormycosis (Mucor/Rhizopus) — look for black eschar on palate or nasal turbinates; this requires emergent amphotericin B and surgical debridement with high mortality even with treatment"
    ],
    quiz: [
      {
        question: "A diabetic patient with recent sphenoid sinusitis presents with fever, bilateral proptosis, complete ophthalmoplegia of the left eye, and new right CN VI palsy. Nasal exam reveals a black eschar on the middle turbinate. What is the most critical management priority?",
        options: [
          "Start IV vancomycin and ceftriaxone for bacterial CST and begin heparin anticoagulation",
          "Start IV amphotericin B immediately and arrange emergent surgical debridement for suspected rhinocerebral mucormycosis",
          "Obtain MRI brain and wait for culture results before starting empiric therapy",
          "Start IV fluconazole and dexamethasone and consult ENT for elective sinus surgery"
        ],
        correct: 1,
        rationale: "The combination of diabetic patient, sinusitis progressing to bilateral CST, and black eschar on nasal turbinate is classic for rhinocerebral mucormycosis (Mucor/Rhizopus species) — a rapidly fatal invasive fungal infection. Treatment requires BOTH IV amphotericin B (liposomal preferred) AND emergent wide surgical debridement. Every hour of delay increases mortality. Fluconazole has no activity against Mucor. Standard antibacterial therapy alone would be insufficient. Waiting for culture results in this clinical scenario is inappropriate."
      }
    ]
  },
  "cerebral-venous-sinus-thrombosis-np": {
    title: "Cerebral Venous Sinus Thrombosis: NP Mgmt",
    cellular: {
      title: "CVST Pathophysiology",
      content: "Cerebral venous sinus thrombosis (CVST) involves thrombus formation in the dural venous sinuses (superior sagittal, transverse, sigmoid sinuses most commonly) or cortical veins. Unlike arterial stroke, CVST causes venous congestion with increased venous pressure → decreased CSF absorption at arachnoid granulations → elevated ICP. Additionally, venous congestion in the brain parenchyma causes vasogenic edema, and progressive venous hypertension leads to diapedesis of red blood cells (venous hemorrhagic infarction) and cytotoxic edema. The unique feature of CVST-related infarcts is that they do not conform to arterial territories, often cross the midline, and frequently have hemorrhagic components. The prothrombotic state leading to CVST involves Virchow's triad: stasis (dehydration, immobility), endothelial injury (infection, surgery, trauma), and hypercoagulability (OCP use, pregnancy, genetic thrombophilia, malignancy). Oral contraceptive use is the most common risk factor in young women, increasing CVST risk 5-6-fold."
    },
    riskFactors: [
      "Oral contraceptive use (most common risk factor in young women — 5-6x increased risk; synergistic with genetic thrombophilia)",
      "Pregnancy and puerperium (especially third trimester and first 6 weeks postpartum)",
      "Genetic thrombophilia: Factor V Leiden, prothrombin G20210A mutation, protein C/S deficiency, antithrombin III deficiency",
      "Antiphospholipid syndrome (lupus anticoagulant, anticardiolipin antibodies)",
      "Malignancy (especially hematologic — polycythemia vera, essential thrombocythemia)",
      "CNS infection: meningitis, mastoiditis, sinusitis (septic CVST)",
      "Dehydration, especially in neonates and children",
      "Inflammatory conditions: IBD, Behçet disease, sarcoidosis"
    ],
    diagnostics: [
      "CT venography (CTV) or MR venography (MRV): demonstrates filling defects in dural sinuses (gold standard for diagnosis); MRV preferred (no radiation)",
      "Non-contrast CT: 'empty delta sign' (hypodense thrombus surrounded by enhanced dura on post-contrast CT — seen in <30% but pathognomonic when present); cord sign (hyperdense cortical vein)",
      "MRI brain: parenchymal changes — edema, hemorrhagic infarction NOT conforming to arterial territories (key distinguishing feature from arterial stroke); may cross midline",
      "CT head: hemorrhagic infarction (30-40% of CVST), parasagittal hemorrhage (superior sagittal sinus thrombosis), or temporal hemorrhage (transverse/sigmoid sinus thrombosis)",
      "Thrombophilia workup: factor V Leiden, prothrombin mutation, protein C/S levels, antithrombin III, antiphospholipid antibodies, JAK2 mutation if polycythemia suspected",
      "D-dimer: elevated (> 500 ng/mL) in most CVST cases; negative D-dimer has high negative predictive value for CVST (but not 100% — can be normal in chronic thrombosis)",
      "LP (if safe — no mass effect): elevated opening pressure (> 25 cmH2O in most cases), may show elevated protein, mild pleocytosis",
      "CBC, ESR/CRP: assess for infection, polycythemia, thrombocytosis"
    ],
    management: [
      "Anticoagulation with IV unfractionated heparin (bolus + drip) or LMWH (enoxaparin 1 mg/kg SC BID) — EVEN in the presence of hemorrhagic infarction (counterintuitive but evidence-based: ISCVT study confirmed safety and benefit)",
      "Transition to warfarin (INR 2-3) or DOAC for long-term anticoagulation: minimum 3-6 months for provoked CVST, 6-12 months for unprovoked, indefinite for recurrent or permanent thrombophilia",
      "ICP management: acetazolamide 250-500 mg BID for elevated ICP with headache/papilledema; LP with large-volume CSF removal for severe papilledema threatening vision; VP shunt for refractory cases",
      "Seizure management: treat acute seizures with AEDs; prophylactic AEDs reasonable for 3-6 months in patients with parenchymal lesions (higher seizure risk than arterial stroke)",
      "Endovascular thrombectomy: consider for severe/deteriorating CVST despite anticoagulation (direct catheter thrombolysis, mechanical thrombectomy — limited evidence but used in life-threatening cases)",
      "Decompressive craniectomy: for malignant cerebral edema causing herniation (life-saving in selected cases — good outcomes reported)",
      "Address underlying cause: discontinue OCPs, treat infection, manage malignancy, initiate immunosuppression for autoimmune etiology",
      "Pregnancy-related CVST: LMWH (not warfarin — teratogenic) throughout pregnancy and 6 weeks postpartum minimum"
    ],
    nursingActions: [
      "Neurological assessment q1-2h: level of consciousness, pupil reactivity, focal deficits, headache severity, visual acuity (papilledema threatens vision), seizure activity",
      "Anticoagulation monitoring: aPTT q6h for heparin (target 1.5-2.5x control); anti-Xa levels for LMWH; INR for warfarin transition; monitor for bleeding complications",
      "ICP monitoring and management: HOB elevation 30°, headache assessment, visual acuity checks (papilledema progression indicates worsening ICP)",
      "Seizure precautions: IV access, padded rails, rescue benzodiazepine available; CVST has higher seizure risk than arterial stroke (30-40% vs. 5-10%)",
      "Pain management: headache from elevated ICP can be severe — IV acetaminophen, opioids cautiously (avoid sedation masking neuro changes); avoid NSAIDs if anticoagulated",
      "Monitor for hemorrhagic worsening: while anticoagulation is indicated even with hemorrhagic infarction, close monitoring is essential; report any sudden neuro decline for emergent CT",
      "Contraceptive counseling: OCPs must be discontinued permanently; provide counseling on alternative contraception methods (non-estrogen containing options)",
      "Patient education: importance of anticoagulation adherence, signs of recurrence (headache, visual changes, new neurological symptoms), thrombophilia implications for future pregnancies"
    ],
    signs: {
      left: [
        "Isolated headache with mild papilledema, no parenchymal lesion on imaging",
        "Small non-hemorrhagic venous infarction with mild focal deficit",
        "Responding to anticoagulation with improving headache and stable/improving neurological exam",
        "Declining D-dimer and resolving thrombus on follow-up MRV"
      ],
      right: [
        "Hemorrhagic venous infarction with declining consciousness — emergent CT, continue anticoagulation but monitor closely",
        "Signs of herniation: fixed dilated pupil, posturing, Cushing response — consider emergent decompressive craniectomy",
        "Refractory elevated ICP with progressive visual loss from papilledema (optic nerve damage) — emergent CSF diversion needed",
        "Status epilepticus complicating CVST (30-40% seizure incidence)"
      ]
    },
    medications: [
      {
        name: "Enoxaparin (LMWH for CVST)",
        type: "Low Molecular Weight Heparin",
        action: "Antithrombin III-mediated factor Xa inhibition; prevents thrombus propagation and promotes recanalization of thrombosed dural sinuses; preferred initial therapy for hemodynamically stable CVST",
        sideEffects: "Bleeding (including worsening of hemorrhagic infarction — but benefit still outweighs risk per evidence), HIT, injection site bruising",
        contra: "Active significant hemorrhage (note: hemorrhagic venous infarction is NOT a contraindication in CVST), severe thrombocytopenia, HIT",
        pearl: "1 mg/kg SC BID therapeutic dosing. The ISCVT trial and meta-analyses confirm that anticoagulation is safe and beneficial in CVST even with hemorrhagic infarction — the hemorrhage in CVST is caused by venous congestion, and anticoagulation addresses the underlying cause. This is a paradigm shift from arterial stroke management. Transition to warfarin (INR 2-3) or DOAC for long-term therapy."
      },
      {
        name: "Acetazolamide (for ICP management in CVST)",
        type: "Carbonic Anhydrase Inhibitor",
        action: "Reduces CSF production by inhibiting carbonic anhydrase in choroid plexus epithelium; lowers ICP in CVST where CSF absorption is impaired due to elevated venous sinus pressure",
        sideEffects: "Metabolic acidosis, paresthesias (hands, feet, perioral), altered taste, kidney stones, hypokalemia, fatigue",
        contra: "Sulfonamide allergy (cross-reactivity), severe hepatic failure, adrenal failure, electrolyte imbalance",
        pearl: "250-500 mg PO BID, can increase to 1 g BID for refractory ICP. Primarily used for headache and papilledema management in CVST. Monitor electrolytes and bicarbonate. If papilledema threatens vision despite acetazolamide, therapeutic LP with large-volume CSF removal or optic nerve sheath fenestration may be needed. Not a substitute for anticoagulation."
      }
    ],
    pearls: [
      "Anticoagulation is indicated in CVST EVEN with hemorrhagic infarction — this is counterintuitive but evidence-based (ISCVT study); the hemorrhage results from venous congestion, and treating the underlying thrombosis reduces further hemorrhage risk; do not withhold heparin because of hemorrhage on imaging",
      "CVST should be suspected in any young woman with headache and papilledema, especially if on oral contraceptives — the presentation can mimic idiopathic intracranial hypertension (IIH), but CVST is life-threatening and requires anticoagulation; always obtain MRV before diagnosing IIH",
      "Venous infarctions in CVST do NOT follow arterial territories — they may cross the midline (parasagittal with superior sagittal sinus thrombosis), be bilateral, and commonly have hemorrhagic components; this pattern should raise immediate suspicion for venous rather than arterial etiology"
    ],
    quiz: [
      {
        question: "A 28-year-old woman on OCPs presents with 5 days of worsening headache, papilledema, and a seizure. CT shows a right temporoparietal hemorrhagic infarction not conforming to any arterial territory. MRV confirms right transverse and sigmoid sinus thrombosis. What is the initial treatment?",
        options: [
          "Withhold anticoagulation due to hemorrhagic infarction and manage conservatively with AEDs and ICP monitoring",
          "Start therapeutic anticoagulation with enoxaparin, discontinue OCPs, treat seizures with levetiracetam",
          "Administer IV tPA for acute stroke treatment",
          "Perform urgent craniotomy for hemorrhage evacuation"
        ],
        correct: 1,
        rationale: "Despite the presence of hemorrhagic infarction, therapeutic anticoagulation is the standard of care for CVST — the hemorrhage is caused by venous congestion, not arterial bleeding, and anticoagulation treats the underlying cause (sinus thrombosis). OCPs must be discontinued (major risk factor). Seizures should be treated with AEDs. IV tPA is not appropriate for venous thrombosis (and dangerous with hemorrhage). Surgery is reserved for herniation from malignant edema."
      }
    ]
  },
  "brown-sequard-syndrome-np": {
    title: "Brown-Séquard Syndrome: NP Management",
    cellular: {
      title: "Brown-Séquard Syndrome: Hemisection Neuroanatomy",
      content: "Brown-Séquard syndrome results from lateral hemisection (or near-hemisection) of the spinal cord, producing a characteristic pattern of neurological deficits based on the anatomy of ascending and descending spinal cord tracts. Ipsilateral to the lesion: (1) Corticospinal tract (lateral) damage causes ipsilateral motor paralysis below the lesion (UMN pattern: spasticity, hyperreflexia, Babinski after spinal shock resolves); (2) Dorsal column (posterior funiculus) damage causes ipsilateral loss of fine touch, vibration, and proprioception below the lesion. Contralateral to the lesion: (3) Spinothalamic tract damage causes contralateral loss of pain and temperature sensation 1-2 levels below the lesion (because spinothalamic fibers cross in the anterior white commissure 1-2 segments after entering the cord). At the level of the lesion: ipsilateral LMN signs (flaccidity, areflexia, atrophy) in the affected myotome, and ipsilateral segmental anesthesia (all modalities). The most common causes are penetrating trauma (knife wounds), but also MS demyelinating plaques, spinal cord tumors, epidural hematoma, and disc herniation."
    },
    riskFactors: [
      "Penetrating spinal trauma (stab wounds — most classic cause of true hemisection)",
      "Multiple sclerosis (demyelinating plaques causing partial hemisection pattern)",
      "Spinal cord tumors (meningioma, schwannoma, ependymoma — lateral compression)",
      "Cervical disc herniation with lateral cord compression",
      "Epidural hematoma or abscess causing lateral cord compression",
      "Spinal cord ischemia (anterior spinal artery branches supplying lateral cord)",
      "Radiation myelopathy",
      "Decompression sickness (nitrogen gas embolism to spinal cord)"
    ],
    diagnostics: [
      "Neurological examination: classic triad — (1) ipsilateral motor paralysis (UMN below, LMN at level), (2) ipsilateral loss of dorsal column function (proprioception, vibration, fine touch), (3) contralateral loss of spinothalamic function (pain, temperature) 1-2 levels below",
      "MRI spine with contrast: identifies cord compression, tumor, MS plaque, epidural collection, disc herniation; T2 hyperintensity in lateral hemicord",
      "CT spine: for fracture evaluation if traumatic etiology",
      "ASIA examination: typically ASIA D (incomplete SCI with useful motor function preserved on one side)",
      "CSF analysis: if MS suspected (oligoclonal bands, elevated IgG index)",
      "Spinal angiography: if vascular malformation or ischemic etiology suspected",
      "Evoked potentials: somatosensory (dorsal column assessment) and motor (corticospinal tract assessment) can confirm lateralized dysfunction",
      "Inflammatory markers, cultures: if epidural abscess is in differential"
    ],
    management: [
      "Emergency surgical decompression for traumatic cord compression, epidural hematoma, or epidural abscess",
      "Spinal immobilization for traumatic injury until surgical evaluation",
      "High-dose IV corticosteroids for MS-related Brown-Séquard: methylprednisolone 1 g IV daily × 3-5 days",
      "Tumor management: surgical resection for benign tumors (meningioma, schwannoma); radiation ± chemotherapy for malignant tumors",
      "Neuropathic pain management: gabapentin, pregabalin, duloxetine, or tricyclic antidepressants for dysesthetic pain (common in affected dermatomes)",
      "DVT prophylaxis: LMWH within 24-72 hours of injury/surgery (SCI patients at high VTE risk)",
      "Bladder management: assess for neurogenic bladder; intermittent catheterization if retention",
      "Intensive rehabilitation: PT, OT — Brown-Séquard has the BEST prognosis of all incomplete SCI syndromes; > 90% regain ambulatory function"
    ],
    nursingActions: [
      "Detailed neurological assessment documenting lateralized deficits: motor strength (MRC grading) bilaterally in key myotomes, sensory modality testing (light touch vs. pinprick) bilaterally",
      "Monitor for evolving deficit: if initially partial hemisection, expansion (hemorrhage, edema) can convert to complete cord syndrome — serial ASIA exams",
      "Pain assessment: neuropathic pain is common and often severe at and below lesion level; use validated pain tools (numeric rating scale + neuropathic pain questionnaire)",
      "Proprioceptive loss management: fall prevention is critical — patients lose proprioception ipsilaterally and may be unaware of limb position; provide visual compensation strategies",
      "Skin integrity: impaired sensation increases pressure injury risk; turn q2h, inspect insensate skin areas at each turn",
      "Temperature sensation counseling: contralateral loss of pain/temperature sensation means patient cannot detect thermal injury on that side — educate about bath water testing, heating pad risks",
      "Rehabilitation coordination: Brown-Séquard has excellent prognosis — encourage patient and family; early aggressive rehabilitation optimizes recovery",
      "Bowel and bladder monitoring: assess for retention, establish bowel program if needed"
    ],
    signs: {
      left: [
        "Incomplete hemisection with preserved contralateral motor function (ASIA C-D)",
        "Ipsilateral weakness with preserved contralateral pain/temperature sensation",
        "Improving motor function within first few weeks (favorable prognostic sign)",
        "Manageable neuropathic pain with gabapentinoid therapy"
      ],
      right: [
        "Complete hemisection progressing to bilateral deficits — suggests expanding lesion (hematoma, edema)",
        "Autonomic dysreflexia (if cervical/high thoracic level and complete hemisection)",
        "Severe intractable neuropathic pain resistant to multiple medication trials",
        "Epidural abscess with systemic sepsis — emergent surgical drainage needed"
      ]
    },
    medications: [
      {
        name: "Gabapentin",
        type: "Voltage-gated Calcium Channel Modulator (α2δ subunit)",
        action: "Binds α2δ subunit of voltage-gated calcium channels, reducing calcium influx at presynaptic terminals and decreasing release of excitatory neurotransmitters (glutamate, substance P); effective for neuropathic pain from spinal cord injury",
        sideEffects: "Sedation, dizziness, ataxia, peripheral edema, weight gain, respiratory depression (especially with opioids)",
        contra: "Known hypersensitivity; use caution in renal impairment (renally cleared — dose adjust for CrCl < 60)",
        pearl: "Start 100-300 mg TID and titrate to 300-1200 mg TID for SCI neuropathic pain. Most effective for lancinating, burning, or electric shock-type pain. Takes 1-2 weeks for full effect. Taper gradually to discontinue (withdrawal seizures possible). Pregabalin (75-300 mg BID) is an alternative with more predictable pharmacokinetics and may be preferred."
      },
      {
        name: "Methylprednisolone (for MS-related Brown-Séquard)",
        type: "Systemic Corticosteroid",
        action: "Potent anti-inflammatory: reduces BBB permeability, inhibits T-cell activation and migration, reduces cytokine release, and decreases edema around demyelinating lesions; accelerates recovery from MS relapses",
        sideEffects: "Insomnia, mood changes (agitation, psychosis), hyperglycemia, GI upset, immunosuppression, avascular necrosis (with repeated courses)",
        contra: "Active untreated systemic infection, live vaccinations",
        pearl: "1 g IV daily × 3-5 days for acute MS relapse causing Brown-Séquard pattern. Accelerates recovery but does not change long-term outcome. Give in morning to reduce insomnia. PPI for GI protection during course. Monitor blood glucose (can cause dramatic hyperglycemia). If insufficient response, consider plasma exchange (PLEX) for steroid-refractory relapse."
      }
    ],
    pearls: [
      "Brown-Séquard syndrome has the BEST prognosis of all SCI syndromes — over 90% of patients regain functional ambulatory capacity; this is important prognostic information for patients and families in the acute phase when deficits seem devastating",
      "The sensory dissociation pattern is key to diagnosis: ipsilateral loss of vibration/proprioception (dorsal columns) + contralateral loss of pain/temperature (spinothalamic tract) 1-2 levels below — testing these modalities separately on each side confirms the hemisection pattern",
      "Contralateral loss of pain and temperature begins 1-2 segments BELOW the lesion (not at the lesion level) because spinothalamic fibers ascend 1-2 segments ipsilaterally before crossing in the anterior white commissure — this anatomical detail is clinically useful for lesion localization"
    ],
    quiz: [
      {
        question: "A patient with a stab wound to the left side of the neck at C7 level presents with left arm and leg weakness, loss of vibration sense in the left leg, and inability to feel pinprick in the right leg. Which spinal cord syndrome does this represent and what is the expected prognosis?",
        options: [
          "Central cord syndrome — fair prognosis with upper extremity recovery worse than lower",
          "Brown-Séquard syndrome — excellent prognosis with > 90% regaining ambulation",
          "Anterior cord syndrome — poor prognosis for motor recovery",
          "Complete spinal cord transection — no motor recovery expected below the level"
        ],
        correct: 1,
        rationale: "The pattern of ipsilateral motor weakness and vibration loss (left — corticospinal tract and dorsal column) with contralateral pain/temperature loss (right — spinothalamic tract) is the classic Brown-Séquard hemisection pattern. It has the best prognosis of all SCI syndromes, with > 90% of patients regaining ambulatory function. This is because the intact contralateral corticospinal tract and ipsilateral spinothalamic tract preserve some motor and sensory function, and neuroplasticity allows significant functional recovery."
      }
    ]
  },
  "locked-in-syndrome-np": {
    title: "Locked-in Syndrome: NP Management",
    cellular: {
      title: "Locked-in Syndrome Neuroanatomy",
      content: "Locked-in syndrome (LIS) results from bilateral destruction of the ventral pons, interrupting all motor output pathways (corticospinal, corticobulbar, corticopontine tracts) while preserving the reticular activating system (dorsal pons/midbrain tegmentum), consciousness, and cognition. The patient is fully aware but can only communicate through vertical eye movements and blinking (controlled by the midbrain — CN III nucleus is supratentorial to the pontine lesion). The most common cause is basilar artery occlusion causing bilateral ventral pontine infarction (50-60% of cases). Other causes include pontine hemorrhage, central pontine myelinolysis, brainstem tumors, and trauma. Classic LIS preserves vertical eye movements and blinking; incomplete LIS has remnants of other voluntary movements; total LIS has no motor output at all (including eye movements — can only be detected by EEG or functional MRI showing preserved cortical activity). The condition is frequently misdiagnosed as coma or vegetative state, leading to devastating consequences for conscious, aware patients."
    },
    riskFactors: [
      "Basilar artery thrombosis or embolism (most common cause — bilateral ventral pontine infarction)",
      "Atherosclerotic disease of the posterior circulation",
      "Vertebral artery dissection with basilar artery extension",
      "Cardiac embolism to posterior circulation",
      "Pontine hemorrhage (hypertensive)",
      "Central pontine myelinolysis from rapid sodium correction",
      "Brainstem neoplasm (glioma, metastasis)",
      "Traumatic brainstem injury, basilar skull fracture"
    ],
    diagnostics: [
      "Clinical examination: CRITICAL — patient appears unresponsive but has PRESERVED vertical eye movements and blinking; must specifically test: 'Look up,' 'Look down,' 'Blink once for yes, twice for no'",
      "EEG: normal or near-normal alpha rhythm (preserved consciousness) — distinguishes from coma (diffuse slowing) and vegetative state (delta predominance)",
      "MRI brain: bilateral ventral pontine infarction or lesion; DWI positive acutely; preserved dorsal pons/tegmentum",
      "CT angiography/MR angiography: basilar artery occlusion in ischemic cases",
      "Functional MRI: demonstrates preserved cortical activity and can be used for communication (in total LIS where eye movements are absent)",
      "Brainstem auditory evoked potentials (BAEP): may be abnormal but cortical responses preserved on SSEP",
      "EMG: confirms absence of voluntary motor unit activity in limbs despite preserved consciousness",
      "Bispectral index (BIS) monitoring: elevated (> 70) in LIS vs. low in coma — can aid differentiation at bedside"
    ],
    management: [
      "If acute basilar artery occlusion: EMERGENT endovascular thrombectomy (no time window for posterior circulation LVO — treated urgently regardless of time from onset if viable tissue exists); IV thrombolysis if within 4.5 hours",
      "Establish communication immediately: vertical eye movement/blink code (yes/no); alphabet board using eye movements; referral for eye-tracking communication device",
      "Respiratory support: most LIS patients require mechanical ventilation acutely; tracheostomy for long-term ventilation if no respiratory recovery",
      "Prevention of complications: DVT prophylaxis (LMWH + IPC), pressure injury prevention (turn q2h, specialty mattress), corneal protection (lubricating drops, taping if incomplete eye closure)",
      "Nutritional support: PEG tube for long-term enteral nutrition (oral feeding not possible due to bulbar paralysis)",
      "Spasticity management: baclofen (intrathecal pump may be considered), tizanidine, botulinum toxin injections for focal spasticity",
      "Pain management: LIS patients FEEL PAIN but cannot express it — assess for pain using physiological indicators (HR, BP changes with procedures), treat presumptively",
      "Rehabilitation: even small motor recovery can be functionally significant; intensive PT/OT; eye-tracking technology for communication and environmental control"
    ],
    nursingActions: [
      "CRITICAL FIRST STEP: Recognize that the patient is CONSCIOUS — locked-in syndrome is frequently misdiagnosed as coma or vegetative state; always test vertical eye movements and blink responses in any patient with apparent unresponsiveness but open eyes",
      "Establish and maintain communication: develop reliable yes/no system (blink code), use alphabet board, advocate for assistive technology (eye-tracking devices) — the patient's ability to communicate is the most important factor for their quality of life",
      "Treat with full dignity and informed consent: explain all procedures, provide choices when possible, include patient in care discussions using their communication system",
      "Pain assessment: patient experiences all sensory input including pain — use eye blink pain scale, monitor physiological signs; ensure analgesia for procedures",
      "Psychological support: depression is extremely common (anxiety and depression in > 50%); the patient is fully aware of their situation; facilitate psychiatric consultation, adaptive communication-based therapy",
      "Meticulous routine care: skin integrity q2h turning, oral care q4h, eye care (artificial tears q2h, eyelid taping if needed), range of motion exercises BID",
      "Ventilator care: tracheostomy management, pulmonary toilet, weaning trials if any respiratory muscle recovery observed",
      "Family education and support: explain that the patient is fully conscious and cognitively intact despite appearance; teach communication techniques; connect with LIS support organizations"
    ],
    signs: {
      left: [
        "Classic LIS with preserved vertical eye movements and blink — communication possible through eye movement code",
        "Incomplete LIS with some residual voluntary movements (finger, toe) — better rehabilitation potential",
        "Appropriate emotional responses via eye movements (tears, blink patterns) confirming preserved cognition",
        "Stable respiratory status on ventilator or progressing toward tracheostomy collar trials"
      ],
      right: [
        "Total locked-in syndrome: no eye movements, no motor output — appears completely comatose but EEG shows preserved consciousness (most devastating variant)",
        "Basilar artery occlusion with progressive brainstem ischemia — emergent thrombectomy needed",
        "Aspiration pneumonia from impaired airway protection",
        "Unrecognized pain causing distress without ability to communicate (tachycardia, hypertension, diaphoresis during procedures)"
      ]
    },
    medications: [
      {
        name: "Baclofen (oral or intrathecal)",
        type: "GABA-B Receptor Agonist",
        action: "Activates GABA-B receptors in the spinal cord dorsal horn, inhibiting excitatory neurotransmitter release and reducing spasticity from corticospinal tract damage; intrathecal delivery allows higher CNS concentrations with fewer systemic side effects",
        sideEffects: "Sedation, dizziness, weakness, nausea; intrathecal pump: catheter complications, withdrawal syndrome (seizures, hyperthermia, rhabdomyolysis — medical emergency), overdose (coma, respiratory depression)",
        contra: "Known hypersensitivity; intrathecal pump requires surgical placement and maintenance",
        pearl: "Oral dosing: start 5 mg TID, titrate to max 80-120 mg/day. Intrathecal baclofen pump is considered for severe spasticity when oral medications are insufficient or cause excessive sedation. NEVER abruptly discontinue baclofen — withdrawal mimics malignant hyperthermia/NMS with potentially fatal hyperthermia, seizures, and rhabdomyolysis. In LIS, spasticity management improves comfort and facilitates care."
      },
      {
        name: "Zolpidem (experimental use in LIS)",
        type: "Non-benzodiazepine GABA-A Agonist",
        action: "Selectively binds GABA-A α1 subunit receptors; paradoxically, some case reports describe transient improvement in motor function in select LIS and minimally conscious patients — mechanism unclear but may involve GABAergic disinhibition of suppressed motor circuits",
        sideEffects: "Sedation, confusion, falls (if any motor function returns), respiratory depression, complex sleep behaviors",
        contra: "Severe respiratory insufficiency (without ventilatory support), severe hepatic impairment",
        pearl: "10 mg PO/NG as trial — some case reports and small studies show paradoxical improvement in consciousness or motor function in select brain-injured patients. NOT standard therapy and responses are unpredictable and temporary (1-4 hours). If any response observed, can be repeated. The mechanism is thought to involve GABA-mediated disinhibition of dormant but intact motor pathways. Should only be trialed under close medical supervision."
      }
    ],
    pearls: [
      "The most important 'treatment' in locked-in syndrome is RECOGNITION — these patients are frequently misdiagnosed as comatose or vegetative, sometimes for weeks to months; always test vertical eye movements and blinking in any patient with apparent unresponsiveness, especially with basilar artery territory findings",
      "Patients with locked-in syndrome report surprisingly positive quality of life in surveys — a majority express a desire to continue living and report meaningful life satisfaction through eye-tracking communication, adapted entertainment, and relationships; early prognostic nihilism is inappropriate",
      "Pain management in LIS requires presumptive treatment — the patient has intact sensation but cannot verbally report pain; all procedures should include appropriate analgesia, and physiological pain indicators (HR, BP, diaphoresis) should be actively monitored"
    ],
    quiz: [
      {
        question: "A 58-year-old patient is found unresponsive with eyes open. He does not respond to voice or painful stimuli in the limbs. CT shows bilateral ventral pontine infarction. The ICU team plans to discuss withdrawal of care with the family for 'devastating brain injury.' What should the NP assess first?",
        options: [
          "Proceed with the family discussion — bilateral pontine infarction has no meaningful recovery",
          "Test for vertical eye movements and blinking in response to commands — assess for locked-in syndrome",
          "Order an EEG to confirm brain death",
          "Obtain neurosurgery consultation for posterior fossa decompression"
        ],
        correct: 1,
        rationale: "Bilateral VENTRAL pontine infarction causes locked-in syndrome, NOT coma — the patient may be fully conscious but unable to move or speak. The critical first step is to test vertical eye movements and blinking ('Look up,' 'Blink twice if you can hear me'). Proceeding with withdrawal of care without this assessment would be catastrophic for a conscious patient. LIS patients have preserved cognition and consciousness, and many report meaningful quality of life with appropriate support. EEG would show preserved alpha rhythm (not brain death pattern)."
      }
    ]
  },
  "alzheimer-disease-np": {
    title: "Alzheimer Disease: NP Management",
    cellular: {
      title: "Alzheimer Disease Molecular Pathology",
      content: "Alzheimer disease (AD) is characterized by two hallmark pathological features: extracellular amyloid-beta (Aβ) plaques and intracellular neurofibrillary tangles (NFTs) of hyperphosphorylated tau protein. The amyloid cascade hypothesis proposes that abnormal processing of amyloid precursor protein (APP) by beta-secretase (BACE1) and gamma-secretase produces Aβ42 peptides that aggregate into oligomers and fibrils. Aβ42 oligomers are the most neurotoxic species, disrupting synaptic function, activating microglia, and triggering tau hyperphosphorylation. Tau, normally a microtubule-stabilizing protein, becomes hyperphosphorylated and detaches from microtubules, forming paired helical filaments that aggregate into NFTs. Tau pathology spreads in a stereotypical pattern (Braak staging): entorhinal cortex → hippocampus → association cortices → primary cortices, correlating with progressive memory loss then broader cognitive decline. Cholinergic neuron loss in the nucleus basalis of Meynert reduces acetylcholine availability, impairing memory consolidation. Neuroinflammation (microglial activation, astrogliosis), synaptic loss, and mitochondrial dysfunction accelerate neurodegeneration. Synaptic density loss is the strongest pathological correlate of cognitive decline."
    },
    riskFactors: [
      "Age > 65 (strongest risk factor — prevalence doubles every 5 years)",
      "APOE ε4 allele: one copy = 3x risk, two copies = 12x risk; ε2 allele is protective",
      "Family history of AD (first-degree relative with AD increases risk 2-3x)",
      "Down syndrome (trisomy 21 — extra copy of APP gene on chromosome 21; nearly all develop AD pathology by age 40)",
      "Cardiovascular risk factors in midlife: hypertension, diabetes, obesity, hypercholesterolemia",
      "Low educational attainment and cognitive inactivity (reduced cognitive reserve)",
      "Hearing loss (strongest single modifiable risk factor per 2020 Lancet Commission)",
      "Head trauma, depression, social isolation, air pollution, excessive alcohol use"
    ],
    diagnostics: [
      "Clinical assessment: insidious onset of progressive episodic memory loss (unable to encode new memories — hippocampal involvement), followed by word-finding difficulty, visuospatial impairment, executive dysfunction",
      "MoCA or similar validated cognitive screening: MoCA preferred over MMSE (better sensitivity for MCI); visuospatial and delayed recall domains affected early",
      "Neuropsychological testing: amnestic profile (encoding deficit — poor learning with no benefit from cueing), distinguishes from vascular (executive/processing speed) and FTD (behavioral/language)",
      "CSF biomarkers: low Aβ42 (sequestered in plaques), elevated p-tau181 or p-tau217, elevated total tau — AT(N) framework for biological diagnosis",
      "Amyloid PET (florbetapir, florbetaben, flutemetamol): positive confirms brain amyloid deposition; used when clinical diagnosis is uncertain",
      "Plasma biomarkers (emerging): p-tau217 has ~95% accuracy for AD pathology — approaching CSF biomarker performance; increasingly available clinically",
      "MRI brain: medial temporal lobe / hippocampal atrophy (Scheltens visual rating scale); global cortical atrophy; rule out other etiologies (vascular disease, tumors, NPH)",
      "FDG-PET: temporoparietal hypometabolism pattern characteristic of AD; helps differentiate from FTD (frontal hypometabolism)"
    ],
    management: [
      "Cholinesterase inhibitors (mild-moderate AD): donepezil 5-10 mg (23 mg for moderate-severe), rivastigmine patch 4.6-13.3 mg/24h, galantamine 8-24 mg/day",
      "Memantine (moderate-severe AD): 5 mg titrated to 10 mg BID or 28 mg XR daily — can be combined with cholinesterase inhibitor",
      "Anti-amyloid immunotherapy (early AD): lecanemab 10 mg/kg IV q2 weeks (CLARITY-AD: 27% slowing of cognitive decline over 18 months); requires amyloid PET or CSF biomarker confirmation and ARIA monitoring with serial MRI",
      "Donanemab: anti-amyloid antibody targeting N-terminal pyroglutamate Aβ (TRAILBLAZER-ALZ 2: 35% slowing; treatment can be stopped when amyloid cleared)",
      "Non-pharmacological: structured daily routine, cognitive stimulation therapy, physical exercise (150 min/week moderate aerobic), music therapy, art therapy, environmental modifications",
      "Behavioral symptoms (BPSD): non-pharmacological first (redirect, modify environment, address unmet needs — pain, constipation, infection); pharmacological: low-dose SSRI, short-term atypical antipsychotic only for severe agitation/psychosis (FDA black box: increased mortality in dementia)",
      "Risk factor modification: treat hypertension, diabetes, hearing loss; promote physical activity, social engagement, cognitive stimulation",
      "Advance care planning EARLY: while patient retains capacity — healthcare proxy, living will, code status, preferences for future care including PEG tube, hospitalization"
    ],
    nursingActions: [
      "Cognitive assessment: MoCA at baseline and q6-12 months; track FAST staging (Functional Assessment Staging Tool) for disease stage determination",
      "Anti-amyloid therapy monitoring (if applicable): MRI at baseline, before doses 5, 7, 14 (per protocol) to detect ARIA-E (edema) and ARIA-H (hemorrhage); hold infusion and notify provider if symptomatic ARIA",
      "Medication management: assess swallowing before each dose; switch to liquid/ODT/patch formulations as disease progresses; review and eliminate anticholinergic medications (increase confusion)",
      "Safety assessment at each visit: driving (refer for occupational therapy driving evaluation — AD patients have 2-8x crash risk), kitchen safety, wandering risk, firearm access, financial exploitation vulnerability",
      "Behavioral symptom management: identify and address underlying triggers (pain — use PAINAD scale for non-verbal patients, constipation, UTI, hunger, boredom, environmental overstimulation) before medication",
      "Caregiver support: assess caregiver burden with Zarit Burden Interview, connect with Alzheimer Society resources, respite care, support groups; caregiver depression and burnout are common and impair patient care",
      "Nutrition and weight monitoring: weight loss is common in moderate-severe AD from forgetting to eat, apraxia of eating, and increased caloric expenditure from wandering; supervised meals, nutritional supplements",
      "End-of-life care: hospice referral appropriate at FAST Stage 7C (loss of ability to walk, sit, smile, hold head up); focus shifts to comfort, dignity, and symptom management"
    ],
    signs: {
      left: [
        "MCI or early AD: isolated memory complaints with positive biomarkers but preserved daily function",
        "Mild AD on cholinesterase inhibitor: stable MoCA scores, managing with family support, driving safely with evaluation",
        "Responding to anti-amyloid therapy: amyloid levels declining on PET, cognitive decline stabilized",
        "Well-supported caregiver with adequate respite and coping resources"
      ],
      right: [
        "Rapid cognitive decline (> 3 MoCA points/year) — evaluate for delirium (infection, medication), comorbid condition, or atypical cause (prion disease, autoimmune encephalitis)",
        "ARIA from anti-amyloid therapy: headache, confusion, visual changes, seizure — hold infusion, obtain MRI, neurology assessment",
        "Severe agitation/aggression with risk of self-harm or harm to others — structured assessment for triggers, short-term pharmacological management if non-pharmacological measures fail",
        "Caregiver burnout or elder abuse/neglect — immediate social work intervention, safety planning"
      ]
    },
    medications: [
      {
        name: "Lecanemab (Leqembi)",
        type: "Anti-Amyloid Monoclonal Antibody",
        action: "Humanized IgG1 antibody targeting Aβ protofibrils (soluble aggregated forms of Aβ that are most neurotoxic); promotes clearance of amyloid from the brain through microglial phagocytosis; reduces amyloid plaque burden and soluble Aβ species",
        sideEffects: "ARIA-E (amyloid-related imaging abnormalities — edema: 12.6%), ARIA-H (microhemorrhage: 17%), infusion-related reactions (26%), headache; APOE ε4 homozygotes have highest ARIA risk (35%)",
        contra: "Active symptomatic ARIA, severe ARIA-H (> 5 microhemorrhages or > 1 cm superficial siderosis), anticoagulant use increases ARIA risk significantly (relative contraindication)",
        pearl: "10 mg/kg IV q2 weeks. Requires confirmed amyloid pathology (PET or CSF). CLARITY-AD trial: 27% slowing of cognitive decline over 18 months (CDR-SB primary endpoint). ARIA monitoring with serial MRI is mandatory. APOE genotyping recommended before starting (ε4 homozygotes have highest ARIA risk — informed consent discussion). SC formulation in development for improved convenience."
      },
      {
        name: "Rivastigmine Patch (Exelon)",
        type: "Dual Cholinesterase Inhibitor (AChE + BuChE)",
        action: "Inhibits both acetylcholinesterase and butyrylcholinesterase, increasing acetylcholine at cholinergic synapses; transdermal delivery provides steady-state drug levels with fewer GI side effects than oral formulations",
        sideEffects: "Application site reactions, nausea (less than oral), vomiting, diarrhea, anorexia, weight loss; contact dermatitis at patch site",
        contra: "Known hypersensitivity to carbamate derivatives, severe hepatic impairment",
        pearl: "Start 4.6 mg/24h patch × 4 weeks, then increase to 9.5 mg/24h, then 13.3 mg/24h (max dose for moderate-severe AD). Rotate application site daily (upper back or chest preferred). Only cholinesterase inhibitor with FDA indication for both AD and Parkinson disease dementia. Patch formulation is particularly useful in patients who have difficulty swallowing pills or are resistant to taking oral medication. If transitioning from oral, apply first patch the day after last oral dose."
      }
    ],
    pearls: [
      "Anti-amyloid immunotherapies (lecanemab, donanemab) represent a paradigm shift from symptomatic to disease-modifying AD treatment — however, they carry ARIA risk, require amyloid confirmation, serial MRI monitoring, and careful patient selection; they are most effective in early AD (MCI or mild dementia stage)",
      "Anticholinergic medication burden is one of the most impactful modifiable factors in AD care — systematic medication review using the Anticholinergic Cognitive Burden (ACB) scale should be performed at every visit; eliminating anticholinergics (diphenhydramine, oxybutynin, amitriptyline, paroxetine) can meaningfully improve cognition",
      "The PAINAD (Pain Assessment in Advanced Dementia) scale should be used for non-verbal AD patients — behavioral changes attributed to 'dementia progression' may actually represent untreated pain; breathing patterns, negative vocalization, facial expression, body language, and consolability are assessed"
    ],
    quiz: [
      {
        question: "A 71-year-old patient with early Alzheimer disease (MoCA 22, positive amyloid PET) has been started on lecanemab. After the 5th infusion, she develops a new headache and mild confusion. MRI shows bilateral parietal FLAIR hyperintensity consistent with ARIA-E without hemorrhage. What is the appropriate management?",
        options: [
          "Continue lecanemab infusions as ARIA-E is an expected finding and usually self-resolves",
          "Hold lecanemab infusions until ARIA-E resolves on follow-up MRI; symptomatic management of headache; close clinical monitoring",
          "Permanently discontinue lecanemab and switch to donepezil monotherapy",
          "Start high-dose corticosteroids and administer the next scheduled lecanemab infusion"
        ],
        correct: 1,
        rationale: "Symptomatic ARIA-E requires holding lecanemab infusions until resolution on follow-up MRI. Most ARIA-E resolves within 8-16 weeks. Headache and mild confusion should be managed symptomatically. Lecanemab can often be resumed after ARIA-E resolves, depending on severity. Continuing infusions during active ARIA risks worsening. Permanent discontinuation is premature for uncomplicated ARIA-E. Steroids are not standard treatment for mild ARIA-E."
      }
    ]
  },
  "guillain-barre-np": {
    title: "Guillain-Barré Syndrome: NP Management",
    cellular: {
      title: "GBS Immunopathology",
      content: "Guillain-Barré syndrome (GBS) is an acute immune-mediated polyradiculoneuropathy triggered by molecular mimicry: antibodies generated against microbial antigens cross-react with gangliosides and glycolipids on peripheral nerve myelin or axons. In acute inflammatory demyelinating polyneuropathy (AIDP — most common subtype, 90% in Western countries), T cells and macrophages attack Schwann cell myelin, causing segmental demyelination and conduction block. In acute motor axonal neuropathy (AMAN), anti-GM1 and anti-GD1a antibodies directly attack axonal membranes at nodes of Ranvier, causing primary axonal degeneration (more common in Asia, associated with Campylobacter jejuni). The ascending weakness pattern reflects immune attack starting at nerve roots (proximal) and motor nerve terminals (distal), progressing centrally. Respiratory failure occurs in 20-30% when the immune attack involves phrenic nerves (C3-5) and intercostal motor nerves. Autonomic involvement (dysautonomia) affects 60-70% and is a major cause of mortality through cardiac arrhythmias, labile blood pressure, and urinary retention."
    },
    riskFactors: [
      "Preceding infection 1-4 weeks before symptom onset (70% of cases): Campylobacter jejuni (most common — 30%; associated with axonal variants and anti-GM1 antibodies), CMV, EBV, Mycoplasma pneumoniae, influenza, Zika virus",
      "Recent vaccination (rare association — 1-2 per million doses; influenza vaccine most studied; COVID-19 vaccine association extremely rare)",
      "Surgery within 1-4 weeks before onset",
      "Pregnancy (especially postpartum period)",
      "Hodgkin lymphoma and other malignancies (paraneoplastic association)",
      "HIV infection (particularly during seroconversion)",
      "Age (bimodal distribution — young adults and elderly; all ages affected)",
      "Male sex (1.5:1 predominance)"
    ],
    diagnostics: [
      "Clinical diagnosis: acute onset symmetric ascending weakness + areflexia/hyporeflexia; progressive over days to 4 weeks (nadir by 4 weeks by definition)",
      "CSF: albumino-cytological dissociation — elevated protein (> 0.45 g/L) with normal cell count (< 10 cells/μL); may be normal in first week; if cells elevated > 50, consider HIV, CMV, lymphomatous meningitis",
      "Nerve conduction studies / EMG: demyelinating pattern in AIDP (prolonged distal motor latency, conduction block, F-wave prolongation, reduced conduction velocity); axonal pattern in AMAN (reduced CMAP amplitude with preserved conduction velocity); may be normal in first 1-2 weeks",
      "Serial FVC and NIF monitoring: q4-6h (q2h if declining) — SINGLE MOST IMPORTANT monitoring parameter; intubate at FVC < 20 mL/kg or NIF < -30 cmH2O or rapid decline (Erasmus GBS Respiratory Insufficiency Score [EGRIS] predicts ventilation need)",
      "Anti-ganglioside antibodies: anti-GM1 (AMAN), anti-GQ1b (Miller Fisher variant — ophthalmoplegia, ataxia, areflexia), anti-GD1a",
      "MRI spine with contrast: enhancement of cauda equina nerve roots on T1+Gd (present in ~95% of GBS; helps distinguish from transverse myelitis or compressive myelopathy)",
      "Stool culture for Campylobacter jejuni; serologies for CMV, EBV, Mycoplasma",
      "ECG and continuous cardiac monitoring: detect autonomic instability (bradycardia, heart block, tachyarrhythmias)"
    ],
    management: [
      "IVIG 0.4 g/kg/day × 5 days (total 2 g/kg): first-line treatment; onset of improvement within 1-2 weeks",
      "Plasma exchange (PLEX): 5 exchanges over 10-14 days; equally effective to IVIG; preferred if IVIG fails or is contraindicated",
      "Do NOT combine IVIG and PLEX (no additional benefit per evidence); do NOT give corticosteroids (ineffective in GBS — unlike CIDP)",
      "Respiratory monitoring: serial FVC q4-6h; elective intubation at FVC < 20 mL/kg, NIF < -30 cmH2O, or rapid FVC decline > 30% over 24 hours; 20-30% of GBS patients require mechanical ventilation",
      "Autonomic monitoring: continuous telemetry for arrhythmias, q1h BP monitoring (labile HTN → short-acting agents; avoid long-acting antihypertensives that could worsen hypotension); temporary pacing for severe bradycardia",
      "DVT prophylaxis: LMWH + IPC devices (immobilized patients at high risk)",
      "Pain management: neuropathic pain is common and severe (up to 80%) — gabapentin, pregabalin, carbamazepine; opioids may be needed for acute pain",
      "Early rehabilitation: PT and OT as soon as clinically stable; recovery may take months to years; 80% make good recovery but 10-20% have significant residual disability and 3-5% die"
    ],
    nursingActions: [
      "Serial FVC and NIF monitoring q4-6h (q2h if declining trend) — this is the most critical nursing intervention; document trend clearly; alert provider immediately for FVC < 25 mL/kg or any declining pattern",
      "Neurological assessment: motor strength grading in all four extremities q4h, cranial nerve function (facial weakness in 50%), swallowing assessment (bulbar involvement)",
      "Autonomic monitoring: continuous telemetry, Q1h BP and HR; watch for labile blood pressure (sudden hypertensive episodes alternating with hypotension), bradycardia, cardiac arrest — always have atropine and temporary pacing available",
      "Pain assessment: GBS pain is often the most distressing symptom and frequently underestimated — deep aching back and leg pain, paresthesias, allodynia; treat aggressively with gabapentinoids and adjunct analgesics",
      "Positioning and DVT prevention: passive range of motion BID, repositioning q2h, IPC devices, LMWH as ordered; foot drop prevention (ankle positioning devices)",
      "Psychological support: GBS is terrifying — patients are typically previously healthy and now rapidly paralyzed; anxiety and depression are common; provide reassurance about expected recovery timeline (80% achieve full or near-full recovery)",
      "IVIG infusion monitoring: slow initial rate, escalate as tolerated; monitor for headache (aseptic meningitis), renal function (creatinine before and after course), fluid overload; check IgA level before first infusion",
      "Bowel and bladder management: constipation from immobility; urinary retention from autonomic involvement — monitor I&O, bladder scans for PVR, bowel program"
    ],
    signs: {
      left: [
        "Mild GBS: symmetric distal weakness, preserved walking ability (Hughes scale 1-2), stable FVC > 30 mL/kg",
        "Progressing normally through nadir (peak weakness by week 2-4) with stable respiratory function",
        "Beginning to improve after IVIG: proximal strength returning, FVC stable or improving",
        "Miller Fisher variant: ophthalmoplegia, ataxia, areflexia WITHOUT significant limb weakness (generally good prognosis)"
      ],
      right: [
        "Rapidly declining FVC approaching 20 mL/kg — prepare for intubation (EGRIS score helps predict ventilation need)",
        "Severe autonomic instability: cardiac arrest from bradycardia, labile BP (systolic swings > 80 mmHg), ileus",
        "Bulbar weakness with inability to protect airway (aspiration risk independent of FVC)",
        "Treatment-related fluctuation (TRF): initial improvement after IVIG/PLEX followed by secondary worsening — may need repeat treatment (distinguishes from CIDP if > 3 fluctuations)"
      ]
    },
    medications: [
      {
        name: "IVIG (for GBS)",
        type: "Immune Modulator",
        action: "Multimechanistic immunomodulation: neutralizes pathogenic anti-ganglioside antibodies via anti-idiotypic effect, modulates Fc receptor function on macrophages, inhibits complement-mediated nerve damage, regulates inflammatory cytokines; promotes remyelination by reducing immune-mediated attack on Schwann cells",
        sideEffects: "Headache (15-20% — aseptic meningitis), renal insufficiency (osmotic nephropathy with sucrose-containing formulations), thrombotic events, hemolytic anemia, anaphylaxis in IgA deficiency, fluid overload",
        contra: "IgA deficiency with anti-IgA antibodies, severe renal failure, recent thrombotic event (within 3 months — relative)",
        pearl: "0.4 g/kg/day × 5 days = 2 g/kg total. Start within 2 weeks of symptom onset for maximum benefit (still effective up to 4 weeks). Pre-hydrate with NS to reduce renal toxicity. Check IgA level and creatinine before starting. Equally effective to PLEX but easier to administer. If secondary worsening occurs, a second course of IVIG may be given (TRF — treatment-related fluctuation). Do NOT combine with PLEX (washes out IVIG)."
      },
      {
        name: "Gabapentin (for GBS neuropathic pain)",
        type: "Voltage-gated Calcium Channel Modulator",
        action: "Binds α2δ subunit of presynaptic voltage-gated calcium channels, reducing excitatory neurotransmitter release (glutamate, substance P); effective for the severe neuropathic and radicular pain that affects up to 80% of GBS patients",
        sideEffects: "Sedation, dizziness, peripheral edema; respiratory depression risk especially in ventilated patients; dose adjustment needed for renal impairment",
        contra: "Known hypersensitivity; significant renal impairment requires dose reduction",
        pearl: "Start 100-300 mg TID, titrate to effect (usual range 900-3600 mg/day). GBS pain is often the most distressing symptom and can be severe — back pain and deep leg aching are characteristic of the acute phase. Gabapentin is first-line for GBS-associated neuropathic pain. In ventilated patients, may be given via NG tube. Carbamazepine (200-400 mg BID) is an alternative. Do NOT rely solely on opioids — they do not adequately address neuropathic pain mechanisms."
      }
    ],
    pearls: [
      "FVC monitoring is the MOST important clinical assessment in GBS — respiratory failure occurs in 20-30% and can be rapid; do NOT rely on SpO2 (oxygen saturation is preserved until very late in hypoventilation); serial FVC trending predicts ventilation need better than any single measurement",
      "Corticosteroids are INEFFECTIVE in GBS — this is a common mistake; unlike CIDP (chronic inflammatory demyelinating polyneuropathy), which responds well to steroids, GBS has no benefit from corticosteroid therapy; steroids may actually delay recovery",
      "Autonomic dysautonomia causes significant mortality in GBS — cardiac monitoring is essential; sudden cardiac arrest from bradycardia or asystole can occur; have atropine and temporary pacing equipment readily available; avoid tracheal suctioning without atropine pretreatment in patients with autonomic instability (vagal response)"
    ],
    quiz: [
      {
        question: "A 35-year-old patient developed symmetric ascending weakness 10 days after a Campylobacter jejuni diarrheal illness. CSF shows protein 0.85 g/L with 2 WBCs/μL. FVC is 22 mL/kg and was 28 mL/kg 6 hours ago. What is the most appropriate management?",
        options: [
          "Start IV methylprednisolone 1 g daily for 5 days and monitor FVC",
          "Initiate IVIG 0.4 g/kg/day for 5 days and prepare for elective intubation given declining FVC",
          "Begin plasma exchange and IV methylprednisolone concurrently for maximum immunomodulation",
          "Observe and recheck FVC in 12 hours — the current value is still above the intubation threshold"
        ],
        correct: 1,
        rationale: "This is classic GBS (post-Campylobacter, ascending weakness, albuminocytological dissociation in CSF). IVIG is first-line treatment. The FVC decline from 28 to 22 mL/kg in 6 hours (>20% decline) is alarming and approaching the intubation threshold — preparation for elective intubation is prudent. Corticosteroids are NOT effective in GBS. Combining PLEX and steroids has no benefit. Waiting 12 hours with this decline rate is dangerous — respiratory arrest could occur."
      }
    ]
  },
  "myasthenia-gravis-np": {
    title: "Myasthenia Gravis: Chronic NP Management",
    cellular: {
      title: "Myasthenia Gravis Autoimmune NMJ Pathology",
      content: "Myasthenia gravis (MG) is an autoimmune disorder targeting the postsynaptic neuromuscular junction (NMJ). In 85% of cases, IgG1 and IgG3 autoantibodies target nicotinic acetylcholine receptors (AChR) through three mechanisms: (1) complement activation causing membrane attack complex (MAC) destruction of the postsynaptic membrane, simplifying the normal complex folds and reducing AChR density; (2) crosslinking and accelerated endocytosis of AChR (antigenic modulation), reducing surface receptor numbers; (3) direct blockade of ACh binding sites. Anti-MuSK antibodies (5-8%) target muscle-specific kinase, which organizes AChR clustering at the NMJ via the agrin-LRP4-MuSK-rapsyn signaling pathway — disruption causes diffuse receptor dispersal. MuSK-MG is typically more severe with prominent bulbar and respiratory involvement. The thymus plays a central role: thymic hyperplasia (70% of AChR-MG) generates autoimmune responses through ectopic germinal centers; thymoma (10-15%) represents a neoplastic immune dysregulation. Fluctuating weakness with fatigability (worsening with repetitive use, improving with rest) is the clinical hallmark, reflecting progressive failure of NMJ transmission as ACh vesicles are depleted during repetitive stimulation against a background of reduced receptor density."
    },
    riskFactors: [
      "Bimodal age distribution: early-onset MG (< 40 years, female predominance, thymic hyperplasia) and late-onset MG (> 60 years, male predominance, thymic atrophy)",
      "Thymoma (present in 10-15%; can present at any age; thymomatous MG may be more severe and less responsive to thymectomy)",
      "Other autoimmune diseases: thyroid disease (15-20% comorbidity), rheumatoid arthritis, SLE, type 1 diabetes (autoimmune clustering)",
      "Family history of autoimmune disease",
      "HLA-B8, HLA-DR3 (early-onset), HLA-DR2 (late-onset) genetic associations",
      "Medications that unmask or worsen subclinical MG: D-penicillamine, checkpoint inhibitors (anti-PD-1/PD-L1), interferon-alpha",
      "Female sex in early-onset; male sex in late-onset",
      "Immune checkpoint inhibitor therapy: pembrolizumab, nivolumab can trigger de novo MG or unmask subclinical disease (2-3% incidence)"
    ],
    diagnostics: [
      "Anti-AChR antibodies: positive in 85% of generalized MG, 50% of ocular MG — highly specific; titer does NOT correlate with severity between patients but changes within an individual may track disease activity",
      "Anti-MuSK antibodies: test if AChR-negative with generalized symptoms — present in 40-50% of 'seronegative' patients; predominantly bulbar, neck, and respiratory involvement",
      "Anti-LRP4 antibodies: newest recognized antibody — present in 2-3% of double-seronegative MG",
      "Repetitive nerve stimulation (RNS): > 10% decrement at 3 Hz stimulation in at least one nerve confirms NMJ transmission failure",
      "Single-fiber EMG (SFEMG): most sensitive test (95-99%); increased jitter and blocking at individual motor end plates; useful for seronegative cases",
      "CT chest: evaluate for thymoma (all MG patients need chest imaging at diagnosis)",
      "Ice pack test: apply ice to ptotic eyelid for 2 minutes — improvement ≥ 2 mm supports MG (cooling improves AChE kinetics at NMJ)",
      "Bedside tests: sustained upward gaze (ptosis worsens within 1-2 minutes — fatigable weakness), Cogan lid twitch sign (brief eyelid overshoot after downgaze then upgaze), curtain sign (contralateral ptosis worsens when manually elevating ptotic lid)"
    ],
    management: [
      "Pyridostigmine: first-line symptomatic therapy; 30-60 mg PO q4-6h; provides temporary improvement by increasing ACh availability at NMJ",
      "Immunosuppressive therapy (disease-modifying): prednisone (start low, increase slowly — rapid initiation can worsen weakness), then steroid-sparing agents: azathioprine, mycophenolate, methotrexate, tacrolimus",
      "Thymectomy: indicated for all thymoma (regardless of MG status) and recommended for non-thymomatous generalized AChR-MG age 18-65 (MGTX trial: improved clinical outcomes and reduced prednisone requirements at 3 years)",
      "Rituximab (anti-CD20): highly effective for anti-MuSK MG (may be first-line for MuSK subtype); increasingly used as steroid-sparing agent for refractory AChR-MG",
      "Complement inhibitors: eculizumab (anti-C5), ravulizumab (long-acting anti-C5), zilucoplan (subcutaneous anti-C5) — FDA-approved for generalized AChR-positive MG refractory to conventional therapy",
      "FcRn inhibitors: efgartigimod (Vyvgart, IV/SC), rozanolixizumab — reduce pathogenic IgG levels by blocking neonatal Fc receptor-mediated IgG recycling; rapidly effective, well-tolerated",
      "Crisis prevention: avoid MG-unsafe medications, treat infections early, minimize surgical stress, ensure medication adherence",
      "Pregnancy management: pyridostigmine is safe; azathioprine acceptable; mycophenolate and methotrexate are teratogenic (discontinue before conception); monitor neonate for transient neonatal MG (15-20%)"
    ],
    nursingActions: [
      "Assess MG severity using MGFA classification (I-V) and QMG (Quantitative Myasthenia Gravis) score at each visit: ptosis, diplopia, bulbar function, limb strength, respiratory function",
      "Medication timing: pyridostigmine should be taken 30-60 minutes before meals for dysphagia benefit; teach patients to time doses for periods of greatest need (morning activities, meals)",
      "Monitor for medication side effects: pyridostigmine (GI cramping — reduce dose if muscarinic effects are excessive), prednisone (glucose, BP, bone density, cataracts, mood), azathioprine (CBC weekly × 8 weeks then monthly, TPMT genotyping before starting)",
      "Identify MG-unsafe medications and advocate for alternatives: aminoglycosides → penicillins/cephalosporins; fluoroquinolones → trimethoprim-sulfamethoxazole; metoclopramide → ondansetron; beta-blockers → consult cardiology for alternatives",
      "Infection prevention: immunosuppressed patients need pneumococcal, influenza, COVID-19 vaccination (inactivated only); avoid live vaccines; educate on infection recognition and early treatment",
      "Respiratory monitoring: ask about orthopnea, dyspnea, and sleep quality at each visit; perform FVC if respiratory symptoms develop; FVC < 60% predicted warrants increased vigilance",
      "Patient education: medic alert bracelet/card listing MG diagnosis and unsafe medications; driving safety (diplopia assessment); activity planning (rest periods, avoid extreme heat)",
      "Pre-surgical coordination: notify anesthesiology of MG diagnosis (succinylcholine resistance, reduced non-depolarizing agent requirements, post-operative crisis risk 10-15%); hold pyridostigmine morning of surgery per anesthesia preference"
    ],
    signs: {
      left: [
        "Ocular MG (Class I): isolated ptosis and/or diplopia, no generalized weakness — 50% progress to generalized within 2 years",
        "Stable generalized MG on maintenance therapy with QMG score < 10 and no recent exacerbations",
        "Good response to FcRn inhibitor or complement inhibitor in previously refractory disease",
        "Post-thymectomy with improving symptoms and decreasing immunosuppressive medication requirements"
      ],
      right: [
        "Myasthenic crisis: respiratory failure (FVC < 20 mL/kg), inability to handle secretions — see myasthenic crisis lesson",
        "MG flare precipitated by medication error (aminoglycoside, fluoroquinolone, magnesium administered)",
        "Thymoma with invasive features on imaging requiring urgent surgical resection",
        "Checkpoint inhibitor-induced MG: rapid onset, severe, often with concurrent myocarditis (CK elevation) — high mortality if not recognized early"
      ]
    },
    medications: [
      {
        name: "Efgartigimod (Vyvgart)",
        type: "FcRn Inhibitor (Neonatal Fc Receptor Blocker)",
        action: "Blocks the neonatal Fc receptor (FcRn) which normally recycles IgG antibodies from lysosomal degradation; inhibiting FcRn causes rapid reduction of all IgG subclasses (including pathogenic anti-AChR antibodies) by 60-80% within 1-2 weeks",
        sideEffects: "URI, UTI, headache, reduced total IgG levels (monitor for infection risk), injection site reactions (SC formulation)",
        contra: "Known hypersensitivity; caution if baseline IgG is low",
        pearl: "10 mg/kg IV weekly × 4 weeks per cycle, repeated based on clinical need (when symptoms return); SC formulation (Vyvgart Hytrulo) available for self-administration. Rapid onset of action (1-2 weeks). Does not cause generalized immunosuppression like traditional IS agents. IgG levels nadir at ~4 weeks and recover over 4-8 weeks. Can be used as both maintenance and rescue therapy. Monitor total IgG levels."
      },
      {
        name: "Azathioprine (Imuran)",
        type: "Purine Synthesis Inhibitor / Immunosuppressant",
        action: "Metabolized to 6-mercaptopurine which inhibits purine synthesis in rapidly dividing lymphocytes, reducing T and B cell proliferation; steroid-sparing agent allowing prednisone dose reduction in MG",
        sideEffects: "Bone marrow suppression (leukopenia, thrombocytopenia), hepatotoxicity, pancreatitis, increased infection and malignancy risk (long-term), GI intolerance, flu-like reaction in first weeks",
        contra: "TPMT deficiency (homozygous — severe myelosuppression; check genotype/phenotype before starting), concurrent allopurinol (inhibits azathioprine metabolism — if must co-prescribe, reduce dose by 75%), pregnancy (teratogenic but often continued as benefits may outweigh risks — shared decision-making)",
        pearl: "Start 50 mg daily × 1 week, then increase to 2-3 mg/kg/day. Check TPMT genotype before starting — homozygous deficient patients have fatal myelosuppression risk. Onset of action is SLOW (3-6 months for full effect) — maintain prednisone until azathioprine is effective. Monitor CBC weekly × 8 weeks, then monthly. Most common steroid-sparing agent for MG worldwide."
      }
    ],
    pearls: [
      "Thymectomy benefits extend beyond thymoma removal — the MGTX trial proved that thymectomy in non-thymomatous generalized AChR-MG (age 18-65) improves clinical outcomes AND reduces the need for prednisone and other immunosuppressants over 3 years; this is a Level 1 recommendation",
      "MuSK-MG behaves differently from AChR-MG: pyridostigmine often worsens MuSK-MG (paradoxical worsening from excess ACh), thymectomy is less beneficial, but rituximab is highly effective — antibody subtype should guide treatment strategy",
      "The medication safety issue cannot be overstated: fluoroquinolones, aminoglycosides, beta-blockers, magnesium, and many common medications can precipitate life-threatening weakness in MG patients — EVERY medication order should be reviewed against MG-unsafe drug lists, and patients should carry a medication alert card"
    ],
    quiz: [
      {
        question: "A 30-year-old woman with generalized AChR-positive MG (MGFA Class IIIa) is on prednisone 40 mg daily and pyridostigmine. She has had 2 exacerbations in 6 months requiring hospitalization. CT chest shows no thymoma. What is the most appropriate next step to improve long-term outcomes?",
        options: [
          "Increase pyridostigmine to maximum dose and add IVIG monthly",
          "Refer for thymectomy and add a steroid-sparing immunosuppressant (azathioprine or mycophenolate)",
          "Switch to a complement inhibitor (eculizumab) as first-line therapy",
          "Discontinue prednisone and start rituximab monotherapy"
        ],
        correct: 1,
        rationale: "This patient meets criteria for thymectomy (generalized AChR-positive MG, age 18-65, non-thymomatous) — the MGTX trial demonstrated improved outcomes and reduced steroid requirements. A steroid-sparing immunosuppressant (azathioprine or mycophenolate) should be added to allow prednisone tapering while thymectomy is arranged. Complement inhibitors are reserved for refractory disease. Rituximab is more commonly used for MuSK-MG. Simply increasing pyridostigmine does not address the underlying autoimmune process."
      }
    ]
  }
};
