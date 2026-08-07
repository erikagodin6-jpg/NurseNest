import type { UsNpCramLesson } from "./us-np-cram-types";

export const usNpCramBatch33 = [
  {
    slug: "delirium-older-adults",
    title: "Delirium: Prevention, Recognition & Evidence-Based Management",
    slugAliases: ["geriatrics-delirium-prevention-np"],
    bodySystem: "Gerontology",
    applicableExams: ["AANP-FNP", "ANCC-FNP", "AGPCNP-AANP", "AGPCNP-ANCC", "AGACNP", "PMHNP", "ENP"],
    recognize: "Delirium is an acute, fluctuating disturbance in attention and awareness with additional cognitive change. Hypoactive delirium—quiet, withdrawn and inattentive—is common and easily missed; dementia is a major risk factor but does not explain an abrupt fluctuation from baseline.",
    diagnostics: "Establish baseline from family/caregivers and use a validated tool such as CAM or 4AT while looking for precipitating infection, hypoxia, pain, urinary retention, constipation, dehydration, medication toxicity/withdrawal, metabolic disease, stroke or trauma. Do not order urine cultures or head CT reflexively without symptoms or neurologic/trauma indications.",
    priorities: "Treat the cause and use multicomponent nonpharmacologic care: orientation, sleep preservation, early mobility, hydration/nutrition, pain control, glasses/hearing aids and removal of unnecessary catheters/restraints. Reserve short-term antipsychotic use for severe distress or immediate danger after reversible causes and nonpharmacologic measures are addressed.",
    medicationSafety: "Benzodiazepines generally worsen delirium and are reserved for specific withdrawal syndromes or other clear indications. Antipsychotics do not treat the underlying delirium or improve mortality and can prolong QT or worsen Parkinson/Lewy-body disease; use the lowest effective dose only when necessary.",
    redFlags: "New focal deficit, meningismus, severe hypoxemia, shock, seizure, head trauma on anticoagulation, hyperactive withdrawal or inability to maintain safety requires urgent disease-specific evaluation.",
    examTraps: "Do not assume pyuria or bacteriuria is the cause of delirium without urinary/systemic infection evidence, and do not miss hypoactive delirium because the patient is not agitated. Restraints and sedatives can worsen the syndrome.",
    sourceKeys: ["AGS_DELIRIUM_CURRENT", "NICE_DELIRIUM_CURRENT"],
  },
  {
    slug: "first-worst-emergency-differential",
    title: "First & Worst Presentations: Emergency Differential Diagnosis Patterns",
    slugAliases: ["hy-exam-first-worst-presentations-np"],
    bodySystem: "Emergency",
    applicableExams: ["AANP-FNP", "ANCC-FNP", "AGPCNP-AANP", "AGPCNP-ANCC", "AGACNP", "PNP", "WHNP", "ENP"],
    recognize: "A first-ever, sudden, maximal, exertional or rapidly progressive symptom deserves a worst-case differential before a benign label: thunderclap headache, abrupt chest/back pain, first seizure, peritonitis, acute painless monocular vision loss, acute limb ischemia and exertional syncope are classic high-stakes patterns.",
    diagnostics: "Use a diagnosis-specific pathway rather than one universal 'rule-out everything' bundle. Thunderclap headache starts with urgent noncontrast head CT and further SAH evaluation based on timing, image quality and residual risk; acute retinal artery occlusion is a stroke emergency requiring rapid ED/stroke evaluation; first unprovoked seizure needs cause-directed labs/ECG plus outpatient or urgent EEG/MRI depending on recovery and risk.",
    priorities: "Stabilize ABCs, identify time-sensitive vascular, neurologic, surgical and obstetric emergencies, activate the appropriate specialty pathway early and document why dangerous alternatives were considered. Treat before confirmatory testing when delay threatens irreversible harm, such as suspected GCA with threatened vision or classic aortic dissection physiology.",
    medicationSafety: "Do not give thrombolysis or anticoagulation for presumed ACS/stroke before excluding aortic dissection when the presentation strongly suggests it. For CRAO, conservative ocular massage/paracentesis is not proven effective and can be harmful; systemic thrombolysis may be considered only in carefully selected eligible patients through an acute-stroke pathway.",
    redFlags: "Thunderclap headache, new focal deficit, tearing chest/back pain with malperfusion, rigid abdomen/peritonitis, sudden monocular blindness, pulseless painful limb, first seizure with persistent deficit or exertional syncope with structural-heart features requires emergency transfer/evaluation.",
    examTraps: "Do not teach 'worst headache = CT then mandatory LP for everyone' or 'CRAO = ocular massage within 90 minutes.' Modern pathways use timing and residual risk for SAH evaluation, and CRAO is managed as acute ischemic stroke with rapid ED triage and vascular secondary prevention.",
    sourceKeys: ["AHA_ASAH_2023", "AHA_CRAO_CURRENT", "ACEP_HEADACHE_CURRENT", "ACC_AHA_AORTIC_2022"],
  }
] as const satisfies readonly UsNpCramLesson[];
