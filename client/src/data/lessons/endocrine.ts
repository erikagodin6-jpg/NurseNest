import type { LessonContent } from "./types";

export const endocrineLessons: Record<string, LessonContent> = {
  "siadh-di": {
    title: "SIADH vs Diabetes Insipidus",
    cellular: { title: "ADH Imbalance", content: "SIADH (Too much ADH) leads to water retention and dilutional hyponatremia. DI (Too little ADH) leads to massive water loss and hypernatremia." },
    riskFactors: ["SIADH: CNS disorders, lung cancer (SCLC), medications (SSRIs, carbamazepine), post-surgical state", "DI: Head trauma, pituitary surgery, brain tumors, lithium therapy", "Meningitis/encephalitis", "Genetic predisposition (nephrogenic DI)"],
    diagnostics: ["Monitor serum sodium levels every 4-6 hours", "Monitor urine specific gravity (high in SIADH, low in DI)", "Expect serum and urine osmolality to be ordered", "Monitor daily weights", "Expect metabolic panel to be drawn regularly", "Monitor intake and output strictly"],
    management: ["SIADH: Enforce fluid restriction as ordered", "DI: Ensure adequate fluid replacement as ordered", "Monitor sodium correction rate (avoid rapid correction)", "Administer prescribed medications (DDAVP for DI, Tolvaptan for SIADH)", "Maintain IV access as ordered", "Implement seizure precautions for hyponatremia (SIADH)"],
    nursingActions: ["Monitor and document intake and output meticulously", "Weigh patient daily at same time on same scale", "Report serum sodium changes or trends immediately", "Assess neurological status frequently (confusion, seizures in SIADH)", "Monitor for signs of dehydration in DI (thirst, dry mucous membranes, poor turgor)", "Report urine output changes (excessive in DI, decreased in SIADH)", "Educate on fluid restriction (SIADH) or fluid replacement (DI)"],
    signs: {
      left: ["SIADH: Low Urine Output", "High Urine Specific Gravity", "Weight Gain", "Hyponatremia"],
      right: ["DI: Massive Polyuria", "Low Urine Specific Gravity", "Extreme Thirst", "Dehydration"]
    },
    medications: [
      { name: "Desmopressin (DDAVP)", type: "Synthetic ADH", action: "Replaces missing ADH in DI", sideEffects: "Water intoxication", contra: "Renal failure", pearl: "Goal is decreased urine output." },
      { name: "Tolvaptan", type: "Vasopressin Antagonist", action: "Blocks ADH in SIADH", sideEffects: "Thirst/Dry mouth", contra: "Liver disease", pearl: "Increases serum sodium." }
    ],
    pearls: ["SIADH: Fluid restriction is the priority", "DI: Fluid replacement is the priority", "Monitor sodium levels every 4-6 hours"],
    quiz: [{ question: "Specific gravity of 1.002 is expected in which condition?", options: ["SIADH", "Diabetes Insipidus", "Dehydration", "Heart Failure"], correct: 1, rationale: "DI results in massive amounts of very dilute urine with a low specific gravity (<1.005)." }]
  },
  // NP / Advanced Practice Content
  "hypothyroidism-basics": {
    title: "Hypothyroidism",
    cellular: { title: "Insufficient Thyroid Hormone", content: "Thyroid gland produces insufficient T3/T4. Decreased metabolic rate affecting every organ system. Most common cause: Hashimoto's thyroiditis (autoimmune)." },
    riskFactors: ["Female sex", "Age > 60 years", "Family history of thyroid disease", "Autoimmune conditions (Hashimoto thyroiditis)", "Previous thyroid surgery or radiation", "Iodine deficiency", "Lithium or amiodarone use"],
    diagnostics: ["Expect TSH level to be ordered (elevated in primary hypothyroidism)", "Monitor free T4 levels (decreased)", "Expect lipid panel (hyperlipidemia is common)", "Monitor weight trends", "Expect metabolic panel for baseline", "Monitor heart rate and rhythm"],
    management: ["Administer levothyroxine as prescribed on empty stomach", "Maintain consistent medication timing daily", "Increase fiber and fluids for constipation", "Maintain warm environment for cold intolerance", "Monitor for signs of myxedema coma in severe cases", "Follow up with provider for dose adjustments based on TSH"],
    nursingActions: ["Administer levothyroxine on empty stomach 30-60 minutes before breakfast", "Monitor vital signs especially heart rate (assess for bradycardia)", "Educate patient that treatment is lifelong", "Report signs of overreplacement (tachycardia, tremor, weight loss, heat intolerance)", "Monitor for constipation and encourage dietary fiber", "Teach patient to separate levothyroxine from calcium and iron supplements by 4 hours"],
    signs: {
      left: ["Fatigue", "Weight gain", "Cold intolerance", "Constipation"],
      right: ["Dry skin", "Bradycardia", "Goiter", "Mental sluggishness"]
    },
    medications: [
      { name: "Levothyroxine", type: "Thyroid Hormone Replacement", action: "Replaces deficient T4", sideEffects: "Signs of hyperthyroidism if overdosed (tachycardia, tremor, weight loss)", contra: "Untreated adrenal insufficiency", pearl: "Take on empty stomach, 30-60 minutes before breakfast. Consistent timing daily." }
    ],
    pearls: ["Monitor TSH levels regularly", "Takes 4-6 weeks for dose adjustments to show full effect", "Lifelong treatment required", "Teach signs of hyperthyroidism (overreplacement): tachycardia, tremor, weight loss, heat intolerance"],
    quiz: [{ question: "When should a patient take Levothyroxine?", options: ["With breakfast", "At bedtime with a snack", "On empty stomach, 30-60 min before breakfast", "Immediately after eating"], correct: 2, rationale: "Levothyroxine should be taken on an empty stomach, 30-60 minutes before breakfast, because food (especially calcium and iron) interferes with absorption." }]
  },
  "adrenal-insufficiency": {
    title: "Adrenal Insufficiency (Addison's Disease)",
    cellular: { title: "Adrenal Gland Failure", content: "Primary adrenal insufficiency (Addison's disease) results from destruction of the adrenal cortex (autoimmune most common cause). Produces inadequate cortisol and aldosterone. Cortisol deficiency causes hypoglycemia, fatigue, and inability to mount a stress response. Aldosterone deficiency causes sodium wasting, hyperkalemia, hypovolemia, and hypotension. ACTH is elevated due to loss of negative feedback." },
    riskFactors: ["Autoimmune adrenal destruction (Addison's)","Abrupt corticosteroid withdrawal","Pituitary tumor or surgery","Tuberculosis (historically common cause)","HIV/AIDS","Bilateral adrenal hemorrhage","Long-term exogenous steroid use"],
    diagnostics: ["Blood pressure monitoring (watch for orthostatic hypotension)","Blood glucose monitoring","Skin assessment for hyperpigmentation","Monitor weight trends","Assess for signs of electrolyte imbalance"],
    management: ["Administer hydrocortisone as prescribed (stress dosing during illness)","Monitor for Addisonian crisis (severe hypotension, N/V, shock)","Ensure patient wears medical alert identification","NEVER stop corticosteroids abruptly","Report signs of adrenal crisis immediately"],
    nursingActions: ["Monitor blood pressure including orthostatic measurements","Assess blood glucose levels regularly","Educate patient on stress dosing (double dose during illness)","Ensure medical alert bracelet is worn at all times","Report signs of crisis (severe hypotension, weakness, abdominal pain)","Educate on lifelong need for medication replacement"],
    signs: {
      left: ["Hyperpigmentation (ACTH stimulates melanocytes)", "Fatigue & Weakness", "Weight Loss", "Hypotension (especially orthostatic)"],
      right: ["Salt Craving", "Hypoglycemia", "Hyperkalemia & Hyponatremia", "Nausea, Vomiting, Abdominal Pain"]
    },
    medications: [
      { name: "Hydrocortisone", type: "Glucocorticoid Replacement", action: "Replaces deficient cortisol for metabolic and stress response", sideEffects: "Cushing's if over-replaced, hyperglycemia", contra: "Systemic fungal infections", pearl: "Stress dosing: DOUBLE or TRIPLE dose during illness, injury, or surgery. Addisonian crisis = IV hydrocortisone 100mg STAT + NS bolus." },
      { name: "Fludrocortisone", type: "Mineralocorticoid Replacement", action: "Replaces deficient aldosterone for sodium/water retention", sideEffects: "Hypertension, edema, hypokalemia", contra: "Heart failure", pearl: "Addresses sodium wasting and hyperkalemia. Monitor BP and electrolytes regularly." }
    ],
    pearls: ["Addisonian crisis is LIFE-THREATENING: N/V, severe hypotension, shock - treat with IV hydrocortisone STAT and aggressive NS bolus", "Patient should wear medical alert bracelet at all times", "DOUBLE dose of hydrocortisone during minor illness, TRIPLE for major stress/surgery", "NEVER stop corticosteroids abruptly - must taper to prevent crisis"],
    quiz: [{ question: "What typically triggers an Addisonian (adrenal) crisis?", options: ["Eating too much sodium", "Physiologic stress (infection, surgery, trauma) in a patient with inadequate cortisol replacement", "Taking too much hydrocortisone", "Excessive exercise"], correct: 1, rationale: "Addisonian crisis is triggered when the body faces physiologic stress (infection, surgery, trauma, illness) but cannot produce adequate cortisol to mount a stress response. Patients must increase (stress dose) their hydrocortisone during illness to prevent crisis." }]
  },
  "thyroidectomy": {
    title: "Thyroidectomy Post-Op Care",
    cellular: { title: "Thyroid Gland Removal", content: "Surgical removal of thyroid gland for thyroid cancer, Graves' disease (refractory to medical therapy), or large goiter causing compressive symptoms. Key surgical risks: damage to recurrent laryngeal nerve (hoarseness/voice changes), inadvertent removal/damage of parathyroid glands (hypocalcemia), and hemorrhage/hematoma causing airway compromise." },
    riskFactors: ["Thyroid cancer","Graves' disease (refractory to medical management)","Large goiter with compressive symptoms","Multinodular goiter","Suspicious thyroid nodules"],
    diagnostics: ["Voice quality assessment (hoarseness indicates recurrent laryngeal nerve injury)","Check for Trousseau sign (carpopedal spasm with BP cuff inflation)","Check for Chvostek sign (facial twitching when tapping cheek)","Neck assessment for swelling or hematoma","Monitor respiratory status"],
    management: ["Keep calcium gluconate at bedside","Keep tracheostomy set at bedside","Position in semi-Fowler's position","Support neck when repositioning (avoid hyperextension)","Check posterior neck dressing for blood pooling"],
    nursingActions: ["Monitor airway patency and respiratory status continuously","Assess voice quality every 1-2 hours post-op","Check for signs of hypocalcemia (tingling, numbness, muscle cramps)","Monitor neck for swelling or hematoma","Report stridor or respiratory distress immediately","Check posterior dressing for blood (pools behind neck)"],
    signs: {
      left: ["Hoarseness/Voice Changes (recurrent laryngeal nerve injury)", "Trousseau Sign (carpopedal spasm with BP cuff)", "Chvostek Sign (facial twitching when tapping)", "Dysphagia"],
      right: ["Neck Swelling/Hematoma (AIRWAY EMERGENCY)", "Stridor or Respiratory Distress", "Tingling/Numbness (perioral, fingers - hypocalcemia)", "Laryngospasm"]
    },
    medications: [
      { name: "Levothyroxine", type: "Thyroid Hormone Replacement", action: "Lifelong replacement of T4 after total thyroidectomy", sideEffects: "Tachycardia, weight loss (if over-replaced)", contra: "Untreated adrenal insufficiency", pearl: "Take on empty stomach, 30-60 min before breakfast. Monitor TSH levels regularly to adjust dosing." },
      { name: "Calcium Gluconate IV", type: "Emergency Calcium Replacement", action: "Treats symptomatic hypocalcemia from parathyroid damage", sideEffects: "Bradycardia if given too fast", contra: "Digoxin use (use with extreme caution)", pearl: "Keep at bedside post-thyroidectomy. Oral Calcium + Vitamin D prescribed if parathyroids damaged. Tracheostomy set also kept at bedside." }
    ],
    pearls: ["Support neck when repositioning (avoid hyperextension of surgical site)", "Semi-Fowler's position to reduce edema and promote drainage", "Check POSTERIOR dressing - blood pools behind the neck", "Calcium gluconate AND tracheostomy set at bedside", "Assess voice quality every 1-2 hours (hoarseness may indicate nerve damage)", "Report ANY breathing difficulty, stridor, or neck swelling IMMEDIATELY"],
    quiz: [{ question: "What is the priority assessment in the first 24 hours after thyroidectomy?", options: ["Thyroid hormone levels", "Airway patency and signs of hemorrhage/hematoma", "Wound cosmetic appearance", "Bowel sounds"], correct: 1, rationale: "The priority is monitoring airway patency because a neck hematoma can rapidly compress the trachea causing airway obstruction. Assess for neck swelling, stridor, and respiratory distress. Also monitor for hypocalcemia (parathyroid damage) with Trousseau and Chvostek signs." }]
  },
};
