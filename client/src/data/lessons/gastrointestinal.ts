import type { LessonContent } from "./types";

export const gastrointestinalLessons: Record<string, LessonContent> = {
  "gi-bleed": {
    title: "GI Bleeding & Obstruction",
    cellular: { title: "Gastrointestinal Crisis", content: "Upper GI bleed (esophageal/gastric) vs Lower GI bleed. Bowel obstruction can be mechanical or functional (ileus), leading to fluid shifts and perforation." },
    riskFactors: ["NSAID use", "H. pylori infection", "Alcohol abuse", "Anticoagulant/antiplatelet therapy", "Liver cirrhosis (varices)", "History of peptic ulcer disease", "Stress (critical illness)", "Coagulopathy"],
    diagnostics: ["Monitor hemoglobin and hematocrit trends", "Expect type and crossmatch to be ordered", "Monitor stool for occult blood (guaiac test)", "Expect endoscopy/colonoscopy to be ordered", "Monitor vital signs for hemodynamic instability", "Expect coagulation studies and metabolic panel"],
    management: ["Maintain NPO status as ordered", "Maintain large-bore IV access as ordered", "Administer blood products and IV fluids as prescribed", "Insert and maintain NG tube as ordered for decompression", "Position to prevent aspiration if vomiting", "Administer PPI or prescribed GI medications as ordered"],
    nursingActions: ["Monitor vital signs every 15 minutes during active bleeding", "Assess and document stool color, consistency, and amount", "Report hematemesis or melena immediately", "Monitor for signs of hypovolemic shock (tachycardia, hypotension)", "Measure and document intake and output strictly", "Test all emesis and stool for occult blood", "Report rigid or distended abdomen immediately"],
    signs: {
      left: ["Melena (Dark, tarry stools)", "Hematemesis (Coffee-ground)", "Abdominal Distension", "Hyperactive Bowel Sounds (Early)"],
      right: ["Board-like, Rigid Abdomen", "Hypotension/Tachycardia", "Absent Bowel Sounds (Late)", "Rebound Tenderness"]
    },
    medications: [
      { name: "Pantoprazole", type: "PPI", action: "Inhibits gastric acid", sideEffects: "C. diff risk", contra: "Hypersensitivity", pearl: "Given IV bolus/drip in active bleeds." },
      { name: "Octreotide", type: "Somatostatin Analog", action: "Reduces splanchnic blood flow", sideEffects: "Nausea/Gallstones", contra: "Diabetes (affects insulin)", pearl: "Standard for esophageal varices." }
    ],
    pearls: ["NPO is mandatory for suspected obstruction", "NG tube for decompression", "Monitor for signs of peritonitis"],
    quiz: [{ question: "A client with an obstruction has a rigid, tender abdomen. What is the fear?", options: ["Normal recovery", "Perforation / Peritonitis", "Simple gas", "Hunger"], correct: 1, rationale: "A rigid, board-like abdomen is a classic sign of peritoneal irritation from perforation." }]
  },
  "acute-abdomen": {
    title: "Appendicitis & Cholecystitis",
    cellular: { title: "Obstruction & Inflammation", content: "Appendicitis: Obstruction of the appendix lumen (fecalith) leads to infection/perforation. Cholecystitis: Gallstone obstructs cystic duct, causing gallbladder inflammation." },
    riskFactors: ["Previous abdominal surgery (adhesions)", "Gallstone history", "Alcohol abuse (pancreatitis)", "NSAID use (perforation)", "Diverticular disease", "Immunosuppression (masked symptoms)", "Anticoagulation therapy", "Age > 65 years"],
    diagnostics: ["Expect CBC with differential to be ordered (elevated WBC)", "Expect abdominal ultrasound for cholecystitis (gallstones, wall thickening)", "Expect CT abdomen for appendicitis diagnosis", "Monitor vital signs for signs of sepsis (fever, tachycardia)", "Expect lipase and amylase if pancreatitis suspected", "Expect urinalysis to rule out UTI or renal calculi"],
    management: ["Maintain NPO status in preparation for surgery", "Administer IV fluids as prescribed", "Position in Semi-Fowler's for comfort and drainage", "Do NOT apply heat to abdomen with appendicitis (risk of rupture)", "Administer prescribed antibiotics and pain medication", "Prepare patient for surgical intervention as ordered"],
    nursingActions: ["Monitor vital signs for signs of perforation (sudden pain relief followed by rigidity)", "Assess abdomen for distension, bowel sounds, and tenderness", "Report sudden cessation of pain (may indicate rupture)", "Monitor for signs of peritonitis (board-like abdomen, rebound tenderness, fever)", "Maintain IV access and monitor intake and output", "Educate patient on post-operative wound care and activity restrictions"],
    signs: {
      left: ["Appy: RLQ Pain (McBurney's)", "Chole: RUQ Pain -> Shoulder", "Fever/Nausea", "Rebound Tenderness"],
      right: ["Sudden relief of pain (Perforation)", "Board-like Abdomen (Peritonitis)", "Tachycardia/Hypotension (Septic Shock)", "Murphy's Sign (Chole)"]
    },
    medications: [
      { name: "Ceftriaxone/Metronidazole", type: "Antibiotics", action: "Treats intra-abdominal infection", sideEffects: "GI upset", contra: "Allergy", pearl: "Pre-op prophylaxis." },
      { name: "Ketorolac", type: "NSAID", action: "Pain relief", sideEffects: "Bleeding risk", contra: "Renal failure", pearl: "Use with caution pre-op." }
    ],
    pearls: ["NPO immediately for surgery", "No heat pads for Appendicitis (risk of rupture)", "Semi-Fowler's position aids drainage if perforated"],
    quiz: [{ question: "A child with appendicitis suddenly reports the pain is gone. Priority?", options: ["Cancel surgery", "Notify provider immediately", "Give food", "Discharge home"], correct: 1, rationale: "Sudden relief of pain is a hallmark sign of rupture, which leads to peritonitis." }]
  },
  "ibs-basics": {
    title: "Irritable Bowel Syndrome",
    cellular: { title: "Functional GI Disorder", content: "Functional GI disorder with altered gut motility and visceral hypersensitivity. Brain-gut axis dysfunction. No structural abnormalities found on testing. Diagnosed by Rome IV criteria." },
    riskFactors: ["Female sex", "Age < 50 years", "Family history of IBS", "History of anxiety or depression", "History of physical or sexual abuse", "Food intolerances", "Recent GI infection"],
    diagnostics: ["Expect diagnosis based on Rome IV criteria (exclusion diagnosis)", "Monitor stool pattern and frequency with food diary", "Expect CBC and CRP to rule out inflammatory conditions", "Expect celiac serology to rule out celiac disease", "Monitor for red flag symptoms (weight loss, bleeding, anemia)", "Expect colonoscopy if red flag symptoms present"],
    management: ["Implement dietary modifications (FODMAP diet, avoid trigger foods)", "Manage stress with relaxation techniques and counseling", "Administer prescribed antispasmodics before meals", "Increase fiber gradually for IBS-C", "Use loperamide as needed for IBS-D", "Encourage regular physical activity"],
    nursingActions: ["Assess bowel pattern, stool characteristics, and associated symptoms", "Educate on keeping a food and symptom diary to identify triggers", "Report red flag symptoms (weight loss, rectal bleeding, fever)", "Provide emotional support and validate symptoms (IBS is real)", "Teach stress management techniques", "Educate that IBS does not increase cancer risk or cause permanent damage"],
    signs: {
      left: ["Abdominal pain related to defecation", "Change in stool frequency/form", "Bloating"],
      right: ["Symptoms for >6 months", "IBS-C (constipation predominant)", "IBS-D (diarrhea predominant)", "IBS-M (mixed)"]
    },
    medications: [
      { name: "Psyllium", type: "Fiber Supplement", action: "Bulking agent normalizes stool", sideEffects: "Bloating, gas initially", contra: "Bowel obstruction", pearl: "Take with plenty of water. Increase fiber gradually." },
      { name: "Dicyclomine", type: "Antispasmodic", action: "Reduces intestinal smooth muscle spasms", sideEffects: "Dry mouth, dizziness", contra: "GI obstruction, glaucoma", pearl: "Take 30 minutes before meals for best effect." },
      { name: "Loperamide", type: "Antidiarrheal", action: "Slows intestinal motility for IBS-D", sideEffects: "Constipation, abdominal cramps", contra: "Bloody diarrhea, C. diff", pearl: "Use as needed for diarrhea-predominant IBS only." }
    ],
    pearls: ["Food diary to identify triggers", "Stress management is key component", "FODMAP diet may help reduce symptoms", "IBS does NOT cause weight loss or bleeding - these are red flags for other diagnoses"],
    quiz: [{ question: "Which symptom would suggest a diagnosis OTHER than IBS?", options: ["Bloating after meals", "Abdominal pain relieved by defecation", "Unintentional weight loss and rectal bleeding", "Alternating constipation and diarrhea"], correct: 2, rationale: "Weight loss and rectal bleeding are red flag symptoms that suggest organic disease (IBD, cancer) rather than IBS. IBS is a functional disorder that does not cause these findings." }]
  },
  "peptic-ulcer": {
    title: "Peptic Ulcer Disease",
    cellular: { title: "Mucosal Breakdown", content: "Break in gastric or duodenal mucosa extending through the muscularis mucosae. Main causes: H. pylori infection (disrupts mucosal defense) and NSAIDs (inhibit protective prostaglandin production). Gastric ulcers cause pain WITH eating. Duodenal ulcers cause pain 2-3 hours AFTER eating, relieved by food." },
    riskFactors: ["H. pylori infection","Chronic NSAID use","Smoking","Excessive alcohol consumption","Physiological stress (critical illness)","Family history","Type O blood (duodenal ulcers)"],
    diagnostics: ["Monitor stool for occult blood (guaiac test)","Vital signs monitoring for signs of bleeding","Pain assessment (location, timing related to meals)","Monitor hemoglobin and hematocrit trends as reported"],
    management: ["Administer prescribed PPI or H2 blocker as ordered","Administer antibiotics for H. pylori as ordered","Avoid aspirin and NSAIDs","Encourage small, frequent meals","Report signs of GI bleeding immediately (melena, hematemesis)"],
    nursingActions: ["Assess pain characteristics and timing related to meals","Monitor for signs of GI bleeding (tarry stools, coffee-ground emesis)","Administer medications as ordered (PPI before meals)","Educate on avoiding irritants (NSAIDs, alcohol, caffeine, smoking)","Report signs of perforation (sudden severe pain, rigid abdomen)","Monitor vital signs for signs of hemorrhage"],
    signs: {
      left: ["Epigastric Pain (burning/gnawing)", "Nausea and Bloating", "Gastric: Pain Worsens WITH Eating", "Duodenal: Pain 2-3h After Eating, Relieved by Food"],
      right: ["Hemorrhage (melena, hematemesis)", "Perforation (sudden severe pain, rigid abdomen)", "Gastric Outlet Obstruction (vomiting)", "Coffee-Ground Emesis (upper GI bleed)"]
    },
    medications: [
      { name: "Omeprazole", type: "Proton Pump Inhibitor", action: "Suppresses gastric acid secretion by blocking H+/K+ ATPase", sideEffects: "C. diff risk, hypomagnesemia, bone fractures (long-term)", contra: "Known hypersensitivity", pearl: "First-line acid suppression. Take 30 minutes before meals for maximum effectiveness." },
      { name: "Triple Therapy", type: "H. pylori Eradication", action: "PPI + Amoxicillin + Clarithromycin for 14 days", sideEffects: "GI upset, metallic taste", contra: "Macrolide allergy", pearl: "Must complete full course. Sucralfate (mucosal protectant) can be added - give on empty stomach, separate from other meds by 2 hours." }
    ],
    pearls: ["EGD (endoscopy) for definitive diagnosis and biopsy", "Discontinue NSAIDs immediately", "H. pylori testing: urea breath test or stool antigen", "Coffee-ground emesis = upper GI bleeding (report immediately)", "NPO if perforation suspected - prepare for surgical consultation"],
    quiz: [{ question: "How does the pain pattern differ between gastric and duodenal ulcers?", options: ["No difference in pain patterns", "Gastric: pain with eating; Duodenal: pain 2-3h after eating, relieved by food", "Gastric: right-sided pain; Duodenal: left-sided pain", "Both cause pain only at night"], correct: 1, rationale: "Gastric ulcers cause pain WITH eating because food stimulates acid production that irritates the ulcer. Duodenal ulcers cause pain 2-3 hours after eating when acid enters the duodenum, and food RELIEVES pain by buffering the acid." }]
  },
  "ulcerative-colitis": {
    title: "Ulcerative Colitis",
    cellular: { title: "Chronic Colonic Inflammation", content: "Chronic inflammatory bowel disease affecting ONLY the colon and rectum. Inflammation is continuous (not skip lesions) starting at the rectum and extending proximally. Involves mucosa and submucosa only (unlike Crohn's which is transmural). Significant risk of toxic megacolon and colorectal cancer." },
    riskFactors: ["Family history of IBD","Age 15-30 years (peak onset)","Ashkenazi Jewish descent","Smoking cessation (paradoxically increases risk)","NSAID use","Stress"],
    diagnostics: ["Stool assessment (frequency, consistency, blood, mucus)","Abdominal assessment for distension and tenderness","Weight and nutritional status monitoring","Monitor for signs of dehydration"],
    management: ["Administer prescribed 5-ASA medications as ordered","Provide low-residue diet during flares","Maintain fluid and electrolyte balance","Report increasing stool frequency or bloody diarrhea","Provide emotional support for chronic illness"],
    nursingActions: ["Monitor stool frequency, consistency, and presence of blood/mucus","Assess for signs of dehydration (dry mucous membranes, poor skin turgor)","Administer medications as ordered","Monitor weight trends","Report signs of toxic megacolon (severe distension, fever, tachycardia)","Provide skin care for perianal irritation"],
    signs: {
      left: ["Bloody Diarrhea (10-20x/day)", "Urgency and Tenesmus", "LLQ Cramping", "Weight Loss"],
      right: ["Extraintestinal: Arthritis, Uveitis", "Erythema Nodosum", "Primary Sclerosing Cholangitis", "Toxic Megacolon (distension, fever, tachycardia)"]
    },
    medications: [
      { name: "Mesalamine (5-ASA)", type: "Aminosalicylate", action: "Topical anti-inflammatory for colonic mucosa", sideEffects: "Headache, nausea, nephrotoxicity (rare)", contra: "Salicylate allergy", pearl: "First-line for mild-moderate UC. Available as oral, enema, or suppository for targeted delivery." },
      { name: "Infliximab", type: "Anti-TNF Biologic", action: "Blocks TNF-alpha to reduce severe inflammation", sideEffects: "Infection risk, infusion reactions, reactivation TB", contra: "Active infection, heart failure", pearl: "Reserved for moderate-severe UC refractory to conventional therapy. Screen for latent TB before starting. Prednisone used for acute flares, Azathioprine for maintenance." }
    ],
    pearls: ["Low-fiber diet during active flares to reduce bowel stimulation", "Colonoscopy surveillance for cancer starting 8 years after diagnosis", "Total colectomy is CURATIVE (unlike Crohn's)", "Monitor for toxic megacolon: avoid opioids and anticholinergics (decrease motility)"],
    quiz: [{ question: "What is the key difference between Ulcerative Colitis and Crohn's disease?", options: ["UC affects the entire GI tract, Crohn's only affects the colon", "UC is continuous mucosal inflammation of colon only; Crohn's is transmural skip lesions anywhere in GI tract", "UC causes fistulas; Crohn's does not", "There is no clinical difference"], correct: 1, rationale: "UC affects only the colon/rectum with continuous mucosal/submucosal inflammation. Crohn's can affect ANY part of the GI tract (mouth to anus) with transmural (full-thickness) inflammation in skip lesions. UC is curable with colectomy; Crohn's is not." }]
  },
  "cholecystectomy": {
    title: "Cholecystectomy Care",
    cellular: { title: "Gallbladder Removal", content: "Surgical removal of the gallbladder, most commonly for symptomatic cholelithiasis (gallstones) or acute cholecystitis. Laparoscopic approach is standard (4 small incisions). Bile duct injury is the most feared surgical complication. Post-cholecystectomy, bile flows directly from liver to duodenum." },
    riskFactors: ["Female sex (4 F's: Fat, Forty, Fertile, Female)","Obesity","Rapid weight loss","Pregnancy","Oral contraceptive use","Native American or Hispanic descent","Family history of gallstones"],
    diagnostics: ["Vital signs monitoring post-operatively","Assess surgical incision sites for signs of infection","Monitor T-tube drainage if placed (color, amount)","Assess for referred shoulder pain from CO2 insufflation"],
    management: ["Maintain NPO status until bowel sounds return","Advance diet as tolerated (low-fat initially)","Administer analgesics as ordered","Monitor T-tube drainage and keep below gallbladder level","Report clay-colored stools or jaundice immediately"],
    nursingActions: ["Assess wound sites for redness, drainage, or dehiscence","Monitor for signs of bile leak (fever, pain, jaundice)","Teach low-fat diet initially after surgery","Report clay-colored stools immediately (bile duct obstruction)","Educate on T-tube care if placed","Monitor bowel sounds and passage of flatus"],
    signs: {
      left: ["Pre-op: RUQ Pain (especially after fatty meals)", "Positive Murphy's Sign", "Nausea/Vomiting", "Jaundice (if CBD obstruction)"],
      right: ["Post-op: Bile Leak (pain, fever, jaundice)", "Shoulder Pain (referred from CO2 insufflation)", "T-tube Drainage (if placed)", "Clay-Colored Stools (bile duct obstruction)"]
    },
    medications: [
      { name: "Ketorolac", type: "NSAID Analgesic", action: "Post-operative pain management", sideEffects: "GI bleeding, renal impairment", contra: "Renal insufficiency, active GI bleed", pearl: "Preferred over opioids for post-cholecystectomy pain. Limit use to 5 days maximum." },
      { name: "Ondansetron", type: "5-HT3 Antagonist", action: "Prevents post-operative nausea/vomiting", sideEffects: "Headache, constipation, QT prolongation", contra: "Severe hepatic impairment", pearl: "Common post-anesthesia. Ursodiol may be prescribed if residual CBD stones present." }
    ],
    pearls: ["Low-fat diet initially as body adjusts to continuous bile flow", "Report clay-colored stools immediately (indicates bile duct obstruction)", "T-tube care: keep below gallbladder level, measure and document drainage", "Clamp T-tube before meals as ordered to aid fat digestion"],
    quiz: [{ question: "What does a positive Murphy's sign indicate?", options: ["Appendicitis", "Acute cholecystitis (gallbladder inflammation)", "Pancreatitis", "Hepatitis"], correct: 1, rationale: "Murphy's sign is elicited by palpating the RUQ while the patient inhales deeply. Inspiratory arrest (patient stops breathing in due to pain) when the inflamed gallbladder descends and contacts the examiner's hand is a positive Murphy's sign, indicating acute cholecystitis." }]
  },
  "ercp-egd": {
    title: "ERCP & EGD Procedures",
    cellular: { title: "Endoscopic GI Procedures", content: "EGD (Esophagogastroduodenoscopy) visualizes the upper GI tract for diagnosis and treatment. ERCP (Endoscopic Retrograde Cholangiopancreatography) accesses biliary and pancreatic ducts for stone removal and stenting. Both require conscious sedation and careful post-procedure monitoring." },
    riskFactors: ["Choledocholithiasis (for ERCP)","History of GERD or dysphagia (for EGD)","Biliary obstruction","GI bleeding","Previous gastric surgery","Coagulopathy"],
    diagnostics: ["Vital signs monitoring during and after procedure","Level of consciousness assessment (sedation recovery)","Gag reflex check before allowing oral intake post-EGD","Monitor for abdominal pain post-ERCP"],
    management: ["Maintain NPO status pre-procedure (6-8 hours)","Position on side during recovery to prevent aspiration","Administer IV fluids as ordered","Report signs of perforation (severe pain, fever, subcutaneous emphysema)","Hold oral intake until gag reflex returns post-EGD"],
    nursingActions: ["Monitor for signs of post-ERCP pancreatitis (epigastric pain radiating to back)","Check gag reflex before offering fluids post-EGD","Monitor for signs of hemorrhage (hematemesis, melena, tachycardia)","Assess sedation recovery using standardized scale","Report fever or increasing abdominal pain immediately","Educate patient on expected throat soreness after EGD"],
    signs: {
      left: ["EGD Indications: Dysphagia, GERD, GI Bleeding, Biopsy", "ERCP Indications: CBD Stones, Strictures, Cholangitis", "Sedation Assessment (level of consciousness)", "Vital Sign Monitoring"],
      right: ["Perforation Signs (pain, fever, subcutaneous emphysema)", "Post-ERCP Pancreatitis (epigastric pain radiating to back)", "Hemorrhage (hematemesis, melena)", "Aspiration Risk"]
    },
    medications: [
      { name: "Midazolam + Fentanyl", type: "Conscious Sedation", action: "Anxiolysis and analgesia for procedure tolerance", sideEffects: "Respiratory depression, hypotension", contra: "Severe respiratory compromise", pearl: "Monitor respiratory status closely. Flumazenil reverses midazolam; Naloxone reverses fentanyl." },
      { name: "Glucagon", type: "Smooth Muscle Relaxant", action: "Relaxes GI smooth muscle during endoscopic procedures", sideEffects: "Nausea, hyperglycemia", contra: "Pheochromocytoma", pearl: "Simethicone may be used to reduce gas and improve visualization during the procedure." }
    ],
    pearls: ["NPO for 6-8 hours before procedure", "Check gag reflex BEFORE allowing oral intake post-EGD", "Monitor for pancreatitis after ERCP (check amylase/lipase)", "ERCP carries 5-10% risk of post-procedure pancreatitis"],
    quiz: [{ question: "What is the priority assessment after EGD before allowing the patient to eat or drink?", options: ["Check for abdominal distension", "Verify return of gag reflex", "Assess pain level", "Check blood glucose"], correct: 1, rationale: "The gag reflex must return before allowing oral intake after EGD. The throat is anesthetized during the procedure, and absent gag reflex increases aspiration risk. Typically returns within 1-2 hours." }]
  },
  "dumping-syndrome": {
    title: "Dumping Syndrome",
    cellular: { title: "Rapid Gastric Emptying", content: "Rapid gastric emptying after gastric surgery (gastrectomy, gastric bypass, Billroth procedures). Hyperosmolar chyme enters the small intestine causing fluid shifts from plasma into bowel lumen. Early dumping (15-30 min after eating): GI and vasomotor symptoms from fluid shifts. Late dumping (1-3 hours): reactive hypoglycemia from rapid glucose absorption triggering excess insulin." },
    riskFactors: ["Gastric bypass surgery","Gastrectomy (partial or total)","Vagotomy","Pyloroplasty","Nissen fundoplication","Rapid gastric emptying"],
    diagnostics: ["Blood glucose monitoring (hypoglycemia in late dumping)","Vital signs assessment (tachycardia, diaphoresis)","Weight monitoring","Dietary intake assessment"],
    management: ["Eat small, frequent meals (6 per day instead of 3)","Avoid high-sugar and simple carbohydrate foods","Lie down for 30 minutes after meals","Separate fluid intake from meals by 30-60 minutes","Increase protein and fat in diet"],
    nursingActions: ["Monitor for early dumping symptoms (within 15-30 minutes: cramping, diarrhea, dizziness)","Monitor for late dumping symptoms (1-3 hours: hypoglycemia, diaphoresis, tremors)","Educate on dietary modifications (low carb, high protein, small frequent meals)","Teach patient to drink fluids between meals, not with meals","Monitor blood glucose especially 1-3 hours after meals","Weigh patient regularly to track nutritional status"],
    signs: {
      left: ["Early (15-30 min): Nausea, Cramping, Diarrhea", "Diaphoresis & Tachycardia", "Dizziness & Flushing", "Abdominal Bloating"],
      right: ["Late (1-3 hrs): Hypoglycemia", "Shakiness & Confusion", "Weakness & Fatigue", "Hunger and Diaphoresis"]
    },
    medications: [
      { name: "Octreotide", type: "Somatostatin Analog", action: "Slows gastric emptying and reduces insulin release", sideEffects: "Gallstones, steatorrhea, injection site pain", contra: "Hypersensitivity", pearl: "Used for refractory dumping syndrome not controlled by dietary modifications. Given as subcutaneous injection." },
      { name: "Acarbose", type: "Alpha-Glucosidase Inhibitor", action: "Slows carbohydrate absorption to prevent late dumping hypoglycemia", sideEffects: "Flatulence, diarrhea, abdominal pain", contra: "Inflammatory bowel disease", pearl: "Specifically targets late dumping by preventing rapid glucose absorption and subsequent reactive hypoglycemia." }
    ],
    pearls: ["Small frequent meals (6 per day) instead of 3 large meals", "Avoid simple sugars and fluids WITH meals (increases osmotic load)", "Lie down for 30 minutes after eating to slow gastric transit", "High protein, high fat, LOW carbohydrate diet", "Separate liquids from solids by at least 30 minutes"],
    quiz: [{ question: "Why should patients with dumping syndrome avoid drinking fluids with meals?", options: ["Fluids dilute digestive enzymes", "Fluids increase the osmotic load entering the small intestine, worsening symptoms", "Fluids cause acid reflux", "Fluids reduce nutrient absorption"], correct: 1, rationale: "Drinking fluids with meals increases the volume and osmolality of contents entering the small intestine rapidly, worsening the fluid shift from plasma to bowel lumen that causes dumping syndrome symptoms. Separating liquids from solids by 30 minutes reduces this effect." }]
  },
};
