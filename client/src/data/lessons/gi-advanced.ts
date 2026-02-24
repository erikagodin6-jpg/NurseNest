import type { LessonContent } from "./types";

export const giAdvancedLessons: Record<string, LessonContent> = {
  "bariatric-surgery": {
    title: "Bariatric Surgery",
    cellular: {
      title: "Bariatric Surgery - Types, Nutritional Management & Dumping Syndrome",
      content:
        "Bariatric surgery encompasses several procedures designed to promote significant weight loss in clients with morbid obesity (BMI ≥ 40, or ≥ 35 with comorbidities). The three primary surgical approaches are Roux-en-Y gastric bypass (RYGB), sleeve gastrectomy, and adjustable gastric banding. RYGB creates a small gastric pouch (approximately 30 mL) and bypasses a portion of the jejunum, resulting in both restrictive and malabsorptive mechanisms. Sleeve gastrectomy removes approximately 80% of the stomach along the greater curvature, creating a tubular 'sleeve' that restricts volume without bypassing intestinal segments. Adjustable gastric banding places an inflatable silicone band around the upper stomach to create a small proximal pouch with an adjustable stoma.\n\nAt the cellular level, these procedures alter gut hormone signaling. RYGB and sleeve gastrectomy increase glucagon-like peptide-1 (GLP-1) and peptide YY (PYY), which enhance insulin secretion and promote satiety. Ghrelin, a hunger hormone produced primarily in the gastric fundus, decreases substantially after sleeve gastrectomy because the fundus is removed. These hormonal changes contribute to improved glycemic control, often resolving type 2 diabetes even before significant weight loss occurs. The rearranged anatomy in RYGB also increases bile acid circulation, which activates farnesoid X receptors in the ileum and further modulates glucose metabolism.\n\nDumping syndrome is a major complication following RYGB, occurring when hyperosmolar chyme rapidly enters the jejunum. Early dumping (within 15-30 minutes of eating) results from fluid shifts into the intestinal lumen, causing abdominal cramping, nausea, diarrhea, diaphoresis, and tachycardia. Late dumping (1-3 hours postprandially) results from reactive hypoglycemia as excessive insulin is released in response to rapid glucose absorption. Nutritional deficiencies are common after malabsorptive procedures; iron, calcium, vitamin B12, folate, and fat-soluble vitamins (A, D, E, K) require lifelong supplementation. Clients must adhere to small, frequent, high-protein meals and avoid simple carbohydrates and liquids with meals."
    },
    riskFactors: [
      "BMI ≥ 40 or BMI ≥ 35 with obesity-related comorbidities",
      "Failed conservative weight loss measures (diet, exercise, pharmacotherapy)",
      "Type 2 diabetes, obstructive sleep apnea, or hypertension related to obesity",
      "History of binge eating disorder or uncontrolled psychiatric illness",
      "Smoking (increases anastomotic leak risk)",
      "Age extremes (adolescents and older adults carry higher surgical risk)",
      "Prior abdominal surgeries increasing adhesion risk"
    ],
    diagnostics: [
      "Preoperative: comprehensive metabolic panel, HbA1c, lipid panel, thyroid function",
      "Upper GI endoscopy to evaluate esophageal and gastric pathology",
      "Psychological evaluation for readiness and eating disorder screening",
      "Polysomnography for obstructive sleep apnea assessment",
      "Nutritional labs: iron, ferritin, B12, folate, vitamin D, calcium, albumin"
    ],
    management: [
      "Preoperative: weight loss of 5-10% to reduce liver size and surgical risk",
      "Postoperative diet progression: clear liquids → full liquids → pureed → soft → regular over 6-8 weeks",
      "Lifelong vitamin and mineral supplementation (multivitamin, calcium citrate, B12, iron, vitamin D)",
      "High-protein diet (60-80 g/day minimum) with small, frequent meals",
      "Avoid simple sugars, carbonated beverages, and drinking fluids with meals to prevent dumping syndrome",
      "Regular follow-up with bariatric team at 1, 3, 6, and 12 months, then annually"
    ],
    nursingActions: [
      "Monitor for signs of anastomotic leak: tachycardia, fever, abdominal pain, left shoulder pain",
      "Administer antiemetics as ordered for postoperative nausea",
      "Educate client on dumping syndrome prevention: eat slowly, avoid concentrated sweets, lie down after meals",
      "Report signs of dehydration: decreased urine output, dry mucous membranes, tachycardia",
      "Monitor and report nutritional deficiency symptoms: paresthesias, fatigue, hair loss, bone pain",
      "Encourage early ambulation to prevent DVT and promote GI motility"
    ],
    signs: {
      left: [
        "Early dumping: nausea, cramping, diarrhea within 15-30 min of eating",
        "Late dumping: diaphoresis, tremors, confusion 1-3 hours after eating",
        "Anastomotic leak: tachycardia > 120, fever, severe abdominal pain",
        "Nutritional deficiency: paresthesias, weakness, glossitis"
      ],
      right: [
        "Dehydration: oliguria, orthostatic hypotension, poor skin turgor",
        "Stricture: progressive dysphagia, vomiting, food intolerance",
        "Marginal ulcer: epigastric pain, GI bleeding, melena",
        "Internal hernia: intermittent severe crampy abdominal pain"
      ]
    },
    medications: [
      {
        name: "Ondansetron (Zofran)",
        type: "Antiemetic (5-HT3 antagonist)",
        action: "Blocks serotonin receptors in the chemoreceptor trigger zone and vagal nerve terminals to reduce nausea and vomiting",
        sideEffects: "Headache, constipation, QT prolongation",
        contra: "Congenital long QT syndrome, concurrent use of QT-prolonging drugs",
        pearl: "Administer as ordered for postoperative nausea; monitor ECG in clients with cardiac history"
      },
      {
        name: "Cyanocobalamin (Vitamin B12)",
        type: "Vitamin supplement",
        action: "Essential cofactor for DNA synthesis and neurological function; absorption impaired after RYGB due to bypassed intrinsic factor production",
        sideEffects: "Injection site pain (IM route), rare anaphylaxis",
        contra: "Cobalt hypersensitivity",
        pearl: "Sublingual or IM administration preferred post-RYGB because oral absorption is significantly reduced"
      }
    ],
    pearls: [
      "Tachycardia is the earliest sign of anastomotic leak; report heart rate > 120 immediately",
      "Dumping syndrome is managed through diet modification, not medication; teach clients to avoid concentrated sweets",
      "Clients must separate liquids from solids by at least 30 minutes to prevent dumping",
      "Weight regain is common 2-5 years postoperatively; ongoing behavioral support is essential",
      "RYGB alters drug absorption; report to provider when new medications are ordered"
    ],
    quiz: [
      {
        question: "A client 2 days post Roux-en-Y gastric bypass develops tachycardia (HR 128), low-grade fever, and complains of left shoulder pain. What should the nurse suspect?",
        options: [
          "Dumping syndrome",
          "Anastomotic leak",
          "Pulmonary embolism",
          "Reactive hypoglycemia"
        ],
        correct: 1,
        rationale: "Tachycardia, fever, and left shoulder pain (referred from diaphragmatic irritation) are classic signs of anastomotic leak after RYGB. This is a surgical emergency requiring immediate reporting to the provider."
      }
    ]
  },

  "cholecystitis": {
    title: "Cholecystitis",
    cellular: {
      title: "Cholecystitis - Gallstone Pathophysiology, Murphy's Sign & Management",
      content:
        "Cholecystitis is inflammation of the gallbladder, most commonly caused by obstruction of the cystic duct by gallstones (cholelithiasis). Gallstones form when bile becomes supersaturated with cholesterol or bilirubin, leading to crystal nucleation and stone growth. Cholesterol stones account for approximately 80% of cases and are associated with the 'Five Fs': Female, Forty, Fat, Fertile, and Fair. Pigment stones (calcium bilirubinate) are associated with chronic hemolysis and cirrhosis. When a stone lodges in the cystic duct, bile stasis occurs, causing increased intraluminal pressure, mucosal ischemia, and inflammatory cascade activation.\n\nAt the cellular level, the obstructed gallbladder releases phospholipase A, which converts lecithin in bile to lysolecithin; a potent cytotoxic agent that damages the mucosal epithelium. Prostaglandin release triggers further inflammation, edema, and impaired venous and lymphatic drainage. If left untreated, the gallbladder wall becomes ischemic, leading to gangrenous cholecystitis and potential perforation. Secondary bacterial infection (Escherichia coli, Klebsiella, Enterococcus) can occur in approximately 50% of acute cases. Acalculous cholecystitis (without stones) occurs in critically ill or immunocompromised clients due to bile stasis, ischemia, or opportunistic infection.\n\nMurphy's sign is a key physical examination finding: the examiner palpates the right upper quadrant while the client inspires deeply; a positive sign occurs when the inflamed gallbladder descends and contacts the examining hand, causing the client to abruptly halt inspiration due to pain. Complications include choledocholithiasis (stone in the common bile duct), cholangitis (infection of the bile duct system presenting with Charcot's triad: fever, jaundice, RUQ pain), and gallstone pancreatitis. Surgical management (laparoscopic cholecystectomy) is the gold standard treatment, while medical management with ursodeoxycholic acid may be used for non-surgical candidates."
    },
    riskFactors: [
      "Female sex (estrogen increases cholesterol secretion into bile)",
      "Age over 40 years",
      "Obesity and rapid weight loss (increases bile cholesterol saturation)",
      "Multiparity (pregnancy increases gallbladder stasis)",
      "Oral contraceptive or hormone replacement therapy use",
      "Native American or Hispanic ethnicity",
      "Diabetes mellitus, hyperlipidemia, and metabolic syndrome",
      "Total parenteral nutrition (bile stasis)"
    ],
    diagnostics: [
      "Right upper quadrant ultrasound: gallstones, gallbladder wall thickening (> 3 mm), pericholecystic fluid",
      "HIDA scan (hepatobiliary iminodiacetic acid): non-visualization of gallbladder confirms cystic duct obstruction",
      "CBC: leukocytosis with left shift indicating infection",
      "Liver function tests: elevated ALP, GGT; elevated bilirubin if CBD obstruction",
      "Serum lipase/amylase to rule out concurrent pancreatitis"
    ],
    management: [
      "NPO status to rest the gallbladder and reduce stimulation",
      "IV fluid resuscitation and electrolyte correction",
      "Laparoscopic cholecystectomy within 24-72 hours of presentation (gold standard)",
      "IV antibiotics for complicated cholecystitis (piperacillin-tazobactam or ceftriaxone + metronidazole)",
      "Percutaneous cholecystostomy tube for critically ill or non-surgical candidates",
      "Low-fat diet education for post-cholecystectomy discharge"
    ],
    nursingActions: [
      "Monitor and report signs of biliary obstruction: clay-colored stools, dark amber urine, jaundice",
      "Administer analgesics as ordered (ketorolac or meperidine preferred; avoid morphine; may cause sphincter of Oddi spasm)",
      "Monitor T-tube drainage if placed: record amount, color, consistency; report drainage > 500 mL/day",
      "Position client in semi-Fowler's or right side-lying to facilitate bile drainage",
      "Report signs of peritonitis: rigid abdomen, rebound tenderness, guarding, fever"
    ],
    signs: {
      left: [
        "Positive Murphy's sign (inspiratory arrest on RUQ palpation)",
        "Right upper quadrant pain radiating to right scapula",
        "Nausea and vomiting, especially after fatty meals",
        "Low-grade fever and tachycardia"
      ],
      right: [
        "Jaundice (suggests common bile duct involvement)",
        "Clay-colored (acholic) stools and dark urine",
        "Charcot's triad: fever, jaundice, RUQ pain (cholangitis)",
        "Reynolds' pentad: Charcot's triad + hypotension + altered mental status"
      ]
    },
    medications: [
      {
        name: "Ursodiol (Actigall)",
        type: "Bile acid dissolution agent",
        action: "Reduces cholesterol secretion and promotes gradual dissolution of cholesterol gallstones",
        sideEffects: "Diarrhea, nausea, abdominal pain, headache",
        contra: "Calcified stones, bile duct obstruction, chronic liver disease",
        pearl: "Used only for small cholesterol stones in non-surgical candidates; takes 6-24 months for dissolution"
      },
      {
        name: "Ketorolac (Toradol)",
        type: "NSAID analgesic",
        action: "Inhibits cyclooxygenase (COX-1 and COX-2) to reduce prostaglandin synthesis and inflammation-mediated pain",
        sideEffects: "GI bleeding, renal impairment, platelet dysfunction",
        contra: "Renal insufficiency, active GI bleeding, concurrent anticoagulation, use > 5 days",
        pearl: "Preferred over morphine for biliary colic because it does not cause sphincter of Oddi spasm"
      }
    ],
    pearls: [
      "Avoid morphine in cholecystitis; it may cause sphincter of Oddi spasm and worsen pain",
      "Murphy's sign differentiates cholecystitis from other RUQ pathology",
      "Post-cholecystectomy clients may experience transient diarrhea due to continuous bile flow into the duodenum",
      "Charcot's triad (fever, jaundice, RUQ pain) indicates ascending cholangitis; a medical emergency"
    ],
    quiz: [
      {
        question: "Which analgesic should the nurse question if ordered for a client with acute cholecystitis?",
        options: [
          "Ketorolac (Toradol)",
          "Morphine sulfate",
          "Acetaminophen (Tylenol)",
          "Hydromorphone (Dilaudid)"
        ],
        correct: 1,
        rationale: "Morphine can cause sphincter of Oddi spasm, potentially worsening biliary pain. Ketorolac or meperidine are preferred alternatives. The nurse should question the morphine order and report to the provider."
      }
    ]
  },

  "cirrhosis": {
    title: "Cirrhosis",
    cellular: {
      title: "Cirrhosis - Hepatocyte Destruction, Fibrosis & Portal Hypertension",
      content:
        "Cirrhosis represents the end stage of chronic liver disease, characterized by irreversible replacement of normal hepatic parenchyma with fibrotic scar tissue and regenerative nodules. The most common causes include chronic alcohol use disorder, chronic hepatitis B and C infection, and non-alcoholic steatohepatitis (NASH). At the cellular level, persistent hepatocyte injury activates hepatic stellate cells, which transform from quiescent vitamin A-storing cells into myofibroblast-like cells that deposit excessive extracellular matrix proteins, primarily type I and III collagen, within the space of Disse.\n\nThis progressive fibrosis disrupts the hepatic sinusoidal architecture, increasing intrahepatic vascular resistance and leading to portal hypertension. As functional hepatocyte mass declines, the liver loses its ability to synthesize albumin, clotting factors (II, VII, IX, X), and bile; conjugate and excrete bilirubin; metabolize ammonia to urea via the urea cycle; and detoxify drugs and hormones. Hypoalbuminemia reduces plasma oncotic pressure, contributing to ascites and peripheral edema. Impaired clotting factor synthesis leads to coagulopathy, and failure to metabolize estrogen results in gynecomastia, spider angiomata, and palmar erythema in male clients.\n\nThe Child-Pugh classification system assesses cirrhosis severity using five parameters: serum albumin, serum bilirubin, INR/prothrombin time, ascites severity, and hepatic encephalopathy grade. Class A (5-6 points) indicates well-compensated disease, Class B (7-9 points) indicates significant functional compromise, and Class C (10-15 points) indicates decompensated cirrhosis with poor prognosis. The Model for End-Stage Liver Disease (MELD) score uses serum creatinine, bilirubin, and INR to predict 90-day mortality and prioritize liver transplant allocation."
    },
    riskFactors: [
      "Chronic alcohol use disorder (most common cause in Western countries)",
      "Chronic hepatitis B or C infection",
      "Non-alcoholic fatty liver disease (NAFLD)/NASH",
      "Autoimmune hepatitis",
      "Primary biliary cholangitis or primary sclerosing cholangitis",
      "Hemochromatosis (iron overload) or Wilson's disease (copper overload)",
      "Prolonged exposure to hepatotoxic drugs (methotrexate, isoniazid, amiodarone)",
      "Alpha-1 antitrypsin deficiency"
    ],
    diagnostics: [
      "Liver function tests: elevated AST/ALT (AST > ALT in alcoholic cirrhosis), elevated ALP, GGT",
      "Serum albumin (decreased), bilirubin (elevated), INR/PT (prolonged)",
      "CBC: thrombocytopenia (splenic sequestration), anemia (chronic disease or GI bleeding)",
      "Abdominal ultrasound with Doppler: nodular liver surface, splenomegaly, portal vein flow assessment",
      "Liver biopsy: definitive diagnosis showing fibrosis, regenerative nodules, and hepatocyte necrosis",
      "Upper endoscopy to screen for esophageal varices"
    ],
    management: [
      "Treat underlying cause: alcohol cessation, antiviral therapy for hepatitis B/C",
      "Sodium restriction (< 2 g/day) and fluid restriction for ascites management",
      "Diuretic therapy: spironolactone (primary) with furosemide (adjunct) in 100:40 mg ratio",
      "Lactulose and rifaximin for hepatic encephalopathy prevention and treatment",
      "Beta-blocker therapy (propranolol or nadolol) for variceal bleeding prophylaxis",
      "Liver transplant evaluation for decompensated cirrhosis (Child-Pugh C)"
    ],
    nursingActions: [
      "Monitor and report signs of hepatic encephalopathy: confusion, asterixis, fetor hepaticus",
      "Measure abdominal girth daily at the same level to track ascites progression",
      "Monitor for bleeding: check stool for occult blood, assess gums, monitor platelet count and INR",
      "Administer lactulose as ordered; titrate to 2-3 soft stools per day",
      "Weigh client daily and monitor strict intake and output",
      "Implement fall precautions for clients with encephalopathy or coagulopathy"
    ],
    signs: {
      left: [
        "Jaundice and scleral icterus (impaired bilirubin conjugation)",
        "Ascites and peripheral edema (hypoalbuminemia, portal hypertension)",
        "Spider angiomata on upper trunk and face",
        "Palmar erythema and gynecomastia (impaired estrogen metabolism)"
      ],
      right: [
        "Asterixis (flapping tremor); indicates hepatic encephalopathy",
        "Caput medusae (dilated periumbilical veins)",
        "Fetor hepaticus (musty, sweet breath odor)",
        "Splenomegaly with thrombocytopenia"
      ]
    },
    medications: [
      {
        name: "Spironolactone (Aldactone)",
        type: "Potassium-sparing diuretic (aldosterone antagonist)",
        action: "Blocks aldosterone receptors in the distal tubule, promoting sodium and water excretion while retaining potassium; counteracts secondary hyperaldosteronism in cirrhosis",
        sideEffects: "Hyperkalemia, gynecomastia, menstrual irregularities",
        contra: "Hyperkalemia, severe renal impairment, concurrent potassium supplementation",
        pearl: "First-line diuretic for cirrhotic ascites; often combined with furosemide in a 100:40 ratio to maintain potassium balance"
      },
      {
        name: "Lactulose",
        type: "Osmotic laxative / ammonia-reducing agent",
        action: "Metabolized by colonic bacteria to lactic acid, which lowers colonic pH, converting ammonia (NH3) to ammonium (NH4+) which cannot be reabsorbed; also acts as osmotic laxative to increase fecal ammonia excretion",
        sideEffects: "Diarrhea, abdominal bloating, flatulence, electrolyte imbalances",
        contra: "Galactosemia, bowel obstruction",
        pearl: "Titrate dose to achieve 2-3 soft stools per day; excessive diarrhea can cause dehydration and worsen encephalopathy"
      }
    ],
    pearls: [
      "AST:ALT ratio > 2:1 suggests alcoholic liver disease",
      "Spironolactone and furosemide are given in a 100:40 mg ratio for ascites management",
      "Asterixis (liver flap) is a hallmark finding of hepatic encephalopathy",
      "Restrict dietary protein only during acute encephalopathy episodes; chronic restriction leads to muscle wasting",
      "Thrombocytopenia in cirrhosis results from splenic sequestration, not bone marrow failure"
    ],
    quiz: [
      {
        question: "A client with cirrhosis is prescribed spironolactone 100 mg and furosemide 40 mg daily. Which lab value should the nurse monitor most closely?",
        options: [
          "Serum sodium",
          "Serum potassium",
          "Serum calcium",
          "Serum magnesium"
        ],
        correct: 1,
        rationale: "Spironolactone is potassium-sparing while furosemide is potassium-wasting. The combination is designed to maintain potassium balance, but serum potassium must be monitored closely to prevent dangerous hyperkalemia or hypokalemia."
      }
    ]
  },

  "portal-hypertension": {
    title: "Portal Hypertension",
    cellular: {
      title: "Portal Hypertension - Increased Portal Venous Pressure, Varices & Ascites",
      content:
        "Portal hypertension is defined as a hepatic venous pressure gradient (HVPG) exceeding 5 mmHg, with clinically significant portal hypertension occurring at ≥ 10 mmHg. The portal venous system drains blood from the GI tract, spleen, pancreas, and gallbladder to the liver via the portal vein. In cirrhosis, progressive fibrosis and regenerative nodules compress hepatic sinusoids and increase intrahepatic vascular resistance. Simultaneously, splanchnic vasodilation mediated by excessive nitric oxide (NO) production increases portal venous inflow, creating a hyperdynamic circulatory state.\n\nAt the cellular level, activated hepatic stellate cells contract around sinusoids (functioning as hepatic pericytes), further increasing resistance. The imbalance between vasoconstrictors (endothelin-1, thromboxane A2) and vasodilators (nitric oxide) within the liver contributes to the pathology. The increased portal pressure opens portosystemic collateral pathways; these collaterals decompress the portal system but are fragile, thin-walled vessels that can rupture. Major collateral sites include esophageal varices, gastric varices, rectal hemorrhoids, and caput medusae (periumbilical veins).\n\nThe hyperdynamic circulation triggers activation of the renin-angiotensin-aldosterone system (RAAS) and sympathetic nervous system, leading to sodium and water retention that exacerbates ascites and edema. Splenomegaly results from venous congestion, causing hypersplenism with sequestration and destruction of platelets, white blood cells, and red blood cells. When HVPG exceeds 12 mmHg, the risk of variceal hemorrhage increases dramatically; this is a life-threatening emergency with mortality rates of 15-20% per bleeding episode."
    },
    riskFactors: [
      "Cirrhosis (most common cause in developed countries)",
      "Chronic hepatitis B or C infection",
      "Alcoholic liver disease",
      "Schistosomiasis (most common cause worldwide)",
      "Portal vein thrombosis or Budd-Chiari syndrome",
      "Non-cirrhotic portal fibrosis",
      "Right-sided heart failure causing hepatic congestion"
    ],
    diagnostics: [
      "Abdominal ultrasound with Doppler: portal vein diameter > 13 mm, reversed portal flow, splenomegaly",
      "Upper GI endoscopy: esophageal and gastric varices grading",
      "Hepatic venous pressure gradient (HVPG) measurement via transjugular catheterization",
      "CT or MRI angiography for portosystemic collateral mapping",
      "CBC: thrombocytopenia (< 150,000), leukopenia from hypersplenism",
      "Platelet count-to-spleen diameter ratio for non-invasive assessment"
    ],
    management: [
      "Non-selective beta-blockers (propranolol or nadolol) for primary prophylaxis of variceal bleeding",
      "Endoscopic variceal ligation (banding) for medium-to-large varices",
      "TIPS (transjugular intrahepatic portosystemic shunt) for refractory ascites or recurrent variceal bleeding",
      "Sodium restriction and diuretics (spironolactone + furosemide) for ascites",
      "Antibiotic prophylaxis (norfloxacin or ceftriaxone) during acute variceal bleeding",
      "Liver transplant evaluation for decompensated disease"
    ],
    nursingActions: [
      "Monitor for signs of variceal bleeding: hematemesis, melena, tachycardia, hypotension",
      "Maintain large-bore IV access and ensure blood type and crossmatch are current",
      "Monitor and report changes in abdominal girth, weight, and edema",
      "Administer octreotide as ordered for acute variceal bleeding (reduces splanchnic blood flow)",
      "Educate client on avoiding NSAIDs, aspirin, and alcohol",
      "Report signs of spontaneous bacterial peritonitis: fever, abdominal pain, worsening ascites"
    ],
    signs: {
      left: [
        "Splenomegaly with palpable spleen below left costal margin",
        "Ascites: shifting dullness, fluid wave, increased abdominal girth",
        "Caput medusae (visible periumbilical collateral veins)",
        "Hemorrhoidal bleeding from rectal varices"
      ],
      right: [
        "Esophageal variceal bleeding: massive hematemesis, melena",
        "Hypersplenism: thrombocytopenia, leukopenia, anemia",
        "Hepatorenal syndrome: oliguria, rising creatinine, hyponatremia",
        "Spider angiomata and palmar erythema"
      ]
    },
    medications: [
      {
        name: "Propranolol (Inderal)",
        type: "Non-selective beta-blocker",
        action: "Blocks β1 and β2 adrenergic receptors, reducing cardiac output (β1) and causing splanchnic vasoconstriction (β2 blockade), thereby decreasing portal venous inflow and pressure",
        sideEffects: "Bradycardia, hypotension, fatigue, bronchospasm, masked hypoglycemia",
        contra: "Severe bradycardia, heart block, decompensated heart failure, asthma/severe COPD",
        pearl: "Titrate to resting heart rate of 55-60 bpm; do not use in acute variceal bleeding; start after hemorrhage is controlled"
      },
      {
        name: "Octreotide (Sandostatin)",
        type: "Somatostatin analog",
        action: "Inhibits release of vasodilatory hormones (glucagon), causing splanchnic vasoconstriction and reducing portal blood flow and pressure",
        sideEffects: "Hyperglycemia, bradycardia, abdominal pain, gallstone formation with long-term use",
        contra: "Hypersensitivity to octreotide",
        pearl: "First-line pharmacologic agent for acute variceal bleeding; administer as IV bolus followed by continuous infusion for 3-5 days"
      }
    ],
    pearls: [
      "HVPG ≥ 10 mmHg defines clinically significant portal hypertension; ≥ 12 mmHg increases variceal bleeding risk",
      "Non-selective beta-blockers reduce portal pressure by 20-25% and are first-line for variceal prophylaxis",
      "TIPS is reserved for refractory cases; it can worsen hepatic encephalopathy by shunting portal blood past the liver",
      "All clients with cirrhosis should undergo screening endoscopy for varices at diagnosis"
    ],
    quiz: [
      {
        question: "A client with known portal hypertension presents with sudden hematemesis and a heart rate of 130 bpm. Which medication should the nurse anticipate administering first?",
        options: [
          "Propranolol IV push",
          "Octreotide IV bolus followed by infusion",
          "Furosemide IV push",
          "Lactulose via nasogastric tube"
        ],
        correct: 1,
        rationale: "Octreotide is the first-line pharmacologic agent for acute variceal bleeding. It reduces splanchnic blood flow and portal pressure. Propranolol is used for prophylaxis, not acute bleeding management."
      }
    ]
  },

  "ascites": {
    title: "Ascites",
    cellular: {
      title: "Ascites - Fluid Accumulation, Paracentesis & Albumin/Diuretic Management",
      content:
        "Ascites is the pathological accumulation of serous fluid within the peritoneal cavity, most commonly resulting from portal hypertension secondary to cirrhosis (accounting for approximately 85% of cases). The pathophysiology involves a complex interplay of hemodynamic and neurohumoral mechanisms. Portal hypertension increases hydrostatic pressure in the splanchnic capillary bed, driving fluid transudation into the peritoneal space. Simultaneously, hepatic dysfunction leads to decreased albumin synthesis, reducing plasma oncotic pressure and further favoring fluid extravasation.\n\nAt the cellular level, splanchnic vasodilation (mediated by excessive nitric oxide and other vasodilators) causes effective arterial underfilling, activating the RAAS, sympathetic nervous system, and non-osmotic release of antidiuretic hormone (ADH/vasopressin). These compensatory mechanisms promote avid renal sodium and water retention, perpetuating the cycle of fluid accumulation. The serum-ascites albumin gradient (SAAG) is the key diagnostic tool: SAAG ≥ 1.1 g/dL indicates portal hypertension as the cause (transudate), while SAAG < 1.1 g/dL suggests other etiologies such as peritoneal carcinomatosis, tuberculosis, or nephrotic syndrome (exudate).\n\nLarge-volume paracentesis (LVP) is performed for tense ascites causing respiratory compromise or significant discomfort. When more than 5 liters are removed, IV albumin (6-8 g per liter removed) must be administered to prevent post-paracentesis circulatory dysfunction (PPCD); a syndrome characterized by rapid reaccumulation of ascites, renal impairment, and hyponatremia. Spontaneous bacterial peritonitis (SBP) is a life-threatening complication occurring in 10-30% of hospitalized clients with ascites, diagnosed by ascitic fluid absolute neutrophil count ≥ 250 cells/mm³."
    },
    riskFactors: [
      "Cirrhosis with portal hypertension (most common cause)",
      "Alcoholic liver disease",
      "Chronic hepatitis B or C",
      "Heart failure (right-sided or biventricular)",
      "Nephrotic syndrome or peritoneal dialysis",
      "Peritoneal carcinomatosis (ovarian, gastric, colon cancer)",
      "Budd-Chiari syndrome (hepatic vein thrombosis)",
      "Pancreatitis or pancreatic duct disruption"
    ],
    diagnostics: [
      "Diagnostic paracentesis: cell count, albumin, total protein, culture, Gram stain",
      "SAAG calculation (serum albumin − ascitic albumin): ≥ 1.1 = portal hypertension",
      "Ascitic fluid neutrophil count ≥ 250 cells/mm³ = spontaneous bacterial peritonitis",
      "Abdominal ultrasound: detects as little as 100 mL of fluid; guides paracentesis",
      "Serum albumin, BUN, creatinine, electrolytes to assess hepatorenal function"
    ],
    management: [
      "Sodium restriction: < 2 g/day (88 mmol/day)",
      "Diuretic therapy: spironolactone 100 mg + furosemide 40 mg daily (100:40 ratio), titrate every 3-5 days",
      "Large-volume paracentesis with IV albumin replacement (6-8 g/L removed if > 5 L drained)",
      "TIPS placement for diuretic-refractory ascites",
      "Antibiotic prophylaxis for SBP prevention (norfloxacin or trimethoprim-sulfamethoxazole)",
      "Fluid restriction (1-1.5 L/day) only if serum sodium < 125 mEq/L"
    ],
    nursingActions: [
      "Measure abdominal girth daily at the level of the umbilicus, at the same time each day",
      "Monitor daily weight: goal weight loss 0.5 kg/day (without peripheral edema) or 1 kg/day (with edema)",
      "Monitor strict intake and output; report urine output < 0.5 mL/kg/hr",
      "During paracentesis: position client upright or slightly lateral; monitor vital signs every 15 minutes",
      "Administer IV albumin as ordered during large-volume paracentesis to prevent circulatory collapse",
      "Report signs of SBP: fever, abdominal pain, worsening encephalopathy, rebound tenderness"
    ],
    signs: {
      left: [
        "Abdominal distension with shifting dullness on percussion",
        "Fluid wave test positive",
        "Weight gain and increased abdominal girth",
        "Dyspnea from diaphragmatic elevation"
      ],
      right: [
        "Peripheral edema (pedal, pretibial, sacral)",
        "Umbilical hernia from increased intra-abdominal pressure",
        "SBP signs: fever, diffuse abdominal pain, cloudy ascitic fluid",
        "Hepatorenal syndrome: progressive oliguria, rising creatinine"
      ]
    },
    medications: [
      {
        name: "Spironolactone (Aldactone)",
        type: "Potassium-sparing diuretic",
        action: "Antagonizes aldosterone at the collecting duct, promoting sodium and water excretion while retaining potassium; addresses the secondary hyperaldosteronism driving ascites",
        sideEffects: "Hyperkalemia, gynecomastia, breast tenderness, menstrual irregularities",
        contra: "Hyperkalemia (> 5.5 mEq/L), anuria, Addison's disease",
        pearl: "First-line diuretic for ascites; monitor potassium closely, especially when combined with ACE inhibitors or ARBs"
      },
      {
        name: "Albumin (human) 25%",
        type: "Plasma volume expander",
        action: "Increases plasma oncotic pressure, drawing fluid from the interstitial and peritoneal spaces back into the intravascular compartment; prevents post-paracentesis circulatory dysfunction",
        sideEffects: "Fluid overload, pulmonary edema, allergic reactions, hypertension",
        contra: "Severe anemia, heart failure (use with caution)",
        pearl: "Administer 6-8 g per liter of ascites removed during large-volume paracentesis exceeding 5 L"
      }
    ],
    pearls: [
      "SAAG ≥ 1.1 g/dL = portal hypertension-related ascites (95% accuracy)",
      "Always perform diagnostic paracentesis on new-onset ascites and in any hospitalized client with ascites to rule out SBP",
      "Weight loss goal: 0.5 kg/day without edema, 1 kg/day with edema; faster diuresis risks hepatorenal syndrome",
      "Post-paracentesis albumin (6-8 g/L) is only required when > 5 L is removed"
    ],
    quiz: [
      {
        question: "During a large-volume paracentesis, 7 liters of ascitic fluid are removed. What should the nurse administer as ordered to prevent post-paracentesis circulatory dysfunction?",
        options: [
          "Normal saline 500 mL IV bolus",
          "IV albumin 6-8 g per liter removed",
          "Furosemide 80 mg IV push",
          "Packed red blood cells 1 unit"
        ],
        correct: 1,
        rationale: "When more than 5 liters of ascitic fluid are removed, IV albumin (6-8 g per liter drained) must be administered to maintain intravascular volume and prevent post-paracentesis circulatory dysfunction, which can lead to renal failure and rapid ascites reaccumulation."
      }
    ]
  },

  "esophageal-varices": {
    title: "Esophageal Varices",
    cellular: {
      title: "Esophageal Varices - Variceal Bleeding, Balloon Tamponade & Banding",
      content:
        "Esophageal varices are dilated, tortuous submucosal veins in the lower esophagus that develop as portosystemic collaterals when portal pressure exceeds 10 mmHg. As portal hypertension increases, blood is diverted from the high-pressure portal system through the left gastric (coronary) vein into the esophageal venous plexus, which drains into the azygos system and systemic circulation. These collateral vessels are thin-walled, lack the structural support of normal veins, and progressively dilate under increasing pressure.\n\nAt the cellular level, the variceal wall consists of a single layer of endothelium with minimal smooth muscle and connective tissue support. As wall tension increases (according to Laplace's law: tension = pressure × radius / wall thickness), the risk of rupture escalates. Varices are most likely to bleed when they are large (> 5 mm), when portal pressure exceeds 12 mmHg, and when red wale marks (longitudinal red streaks indicating areas of extreme wall thinning) are present on endoscopy. Variceal hemorrhage is a medical emergency with 15-20% mortality per bleeding episode.\n\nAcute management involves hemodynamic resuscitation, pharmacologic therapy with vasoconstrictors (octreotide or terlipressin), and emergent upper endoscopy with variceal ligation (banding). Balloon tamponade (Sengstaken-Blakemore or Minnesota tube) is a temporizing bridge to definitive therapy when endoscopy is not immediately available or fails to control bleeding. The esophageal balloon is inflated to apply direct pressure against the bleeding varices, while the gastric balloon anchors the device. Balloon tamponade carries significant risks including esophageal rupture, aspiration, and pressure necrosis, and should not remain inflated for more than 24 hours."
    },
    riskFactors: [
      "Cirrhosis with portal hypertension (HVPG ≥ 10 mmHg)",
      "Large variceal size (> 5 mm) with red wale marks on endoscopy",
      "Child-Pugh class B or C (decompensated cirrhosis)",
      "Active alcohol use in clients with alcoholic cirrhosis",
      "Thrombocytopenia (< 100,000/mm³) as marker of severe portal hypertension",
      "History of prior variceal bleeding (60-70% rebleeding risk within 1 year)"
    ],
    diagnostics: [
      "Upper GI endoscopy (EGD): gold standard for diagnosis, grading, and treatment",
      "Variceal grading: small (< 5 mm), medium, large (> 5 mm) with/without red wale marks",
      "CBC: hemoglobin/hematocrit (degree of blood loss), thrombocytopenia",
      "Coagulation studies: PT/INR (prolonged due to liver dysfunction)",
      "Type and crossmatch: prepare at least 2-4 units PRBCs",
      "BUN/creatinine ratio elevated from upper GI blood digestion"
    ],
    management: [
      "Hemodynamic resuscitation: crystalloid fluids and PRBCs (target Hgb 7-8 g/dL; avoid over-transfusion)",
      "Octreotide IV bolus (50 mcg) followed by continuous infusion (50 mcg/hr) for 3-5 days",
      "Emergent EGD with endoscopic variceal ligation (banding) within 12 hours",
      "Balloon tamponade (Sengstaken-Blakemore tube) as bridge if endoscopy unavailable",
      "Antibiotic prophylaxis (ceftriaxone 1 g IV daily × 7 days) to prevent SBP",
      "TIPS for recurrent or refractory variceal bleeding"
    ],
    nursingActions: [
      "Maintain patent airway; keep intubation equipment at bedside; elevate HOB 30-45 degrees",
      "Monitor hemodynamic status: vital signs every 15 minutes during active bleeding",
      "Maintain large-bore IV access (two 16-18 gauge lines); administer blood products as ordered",
      "If balloon tamponade in place: keep scissors at bedside to cut tube if respiratory distress occurs",
      "Monitor for rebleeding: ongoing hematemesis, melena, tachycardia, decreasing hemoglobin",
      "Report any change in level of consciousness (may indicate hepatic encephalopathy from blood in GI tract)"
    ],
    signs: {
      left: [
        "Massive hematemesis (bright red or coffee-ground emesis)",
        "Melena (black, tarry stools) or hematochezia",
        "Tachycardia, hypotension, and signs of hypovolemic shock",
        "Pallor, diaphoresis, and altered mental status"
      ],
      right: [
        "Hepatic encephalopathy (blood protein load increases ammonia)",
        "Aspiration pneumonia (risk from vomiting blood)",
        "Hepatorenal syndrome triggered by hemorrhagic hypovolemia",
        "Abdominal distension from blood accumulation in GI tract"
      ]
    },
    medications: [
      {
        name: "Octreotide (Sandostatin)",
        type: "Somatostatin analog",
        action: "Causes splanchnic vasoconstriction, reducing portal blood flow and portal pressure; inhibits release of vasodilatory peptides",
        sideEffects: "Hyperglycemia, bradycardia, nausea, abdominal cramping",
        contra: "Hypersensitivity to octreotide",
        pearl: "Administer 50 mcg IV bolus, then 50 mcg/hr infusion for 3-5 days; always used in conjunction with endoscopic therapy"
      },
      {
        name: "Ceftriaxone",
        type: "Third-generation cephalosporin antibiotic",
        action: "Inhibits bacterial cell wall synthesis; used as prophylaxis against spontaneous bacterial peritonitis during variceal bleeding episodes",
        sideEffects: "Diarrhea, rash, biliary sludge, Clostridioides difficile infection",
        contra: "Cephalosporin allergy; do not co-administer with calcium-containing IV solutions in neonates",
        pearl: "Prophylactic antibiotics during variceal bleeding reduce mortality by 20%; administer 1 g IV daily for 7 days as ordered"
      }
    ],
    pearls: [
      "Keep scissors at the bedside with balloon tamponade; if the tube migrates, cut and remove immediately to prevent airway obstruction",
      "Target hemoglobin 7-8 g/dL during resuscitation; over-transfusion increases portal pressure and rebleeding risk",
      "Blood in the GI tract is a protein load that increases ammonia production; monitor for hepatic encephalopathy",
      "All clients surviving variceal bleeding should be started on secondary prophylaxis (beta-blocker + banding)"
    ],
    quiz: [
      {
        question: "A client with a Sengstaken-Blakemore tube in place suddenly develops severe respiratory distress. What is the nurse's priority action?",
        options: [
          "Deflate the esophageal balloon",
          "Cut the tube and remove it immediately",
          "Increase the oxygen flow rate",
          "Notify the provider stat"
        ],
        correct: 1,
        rationale: "If a balloon tamponade tube migrates proximally, the inflated gastric balloon can occlude the airway. The nurse must cut the tube and remove it immediately. This is why scissors are kept at the bedside at all times."
      }
    ]
  },

  "hepatitis": {
    title: "Hepatitis",
    cellular: {
      title: "Hepatitis - Types A-E, Transmission, Serology & Disease Progression",
      content:
        "Hepatitis refers to inflammation of the liver, most commonly caused by hepatotropic viruses (A, B, C, D, E). Each virus has distinct transmission routes, clinical courses, and chronicity potential. Hepatitis A (HAV) and Hepatitis E (HEV) are transmitted via the fecal-oral route through contaminated food or water. Hepatitis B (HBV), C (HCV), and D (HDV) are transmitted through blood and body fluids, including sexual contact, percutaneous exposure, and vertical (mother-to-child) transmission. HDV is a defective RNA virus that requires HBV co-infection to replicate.\n\nAt the cellular level, hepatitis viruses do not directly destroy hepatocytes; rather, liver damage results from the host immune response. Cytotoxic T lymphocytes (CD8+) recognize viral antigens presented on hepatocyte surfaces via MHC class I molecules and initiate apoptosis. In HBV, a robust immune response clears the virus but causes significant hepatocyte destruction (acute hepatitis), while a weak immune response allows viral persistence (chronic hepatitis). HCV evades immune clearance through high mutation rates in its hypervariable region, leading to chronic infection in 75-85% of cases. Chronic HBV and HCV cause ongoing necroinflammation, progressive fibrosis, cirrhosis, and hepatocellular carcinoma.\n\nKey serologic markers include: HBsAg (active HBV infection), anti-HBs (immunity from vaccination or resolved infection), HBeAg (high viral replication and infectivity), anti-HBc IgM (acute infection), and anti-HBc IgG (past or chronic infection). For HCV, anti-HCV antibody indicates exposure (past or present), while HCV RNA PCR confirms active viremia. The prodromal phase of acute hepatitis is characterized by malaise, anorexia, nausea, and RUQ discomfort, followed by the icteric phase (jaundice, dark urine, clay-colored stools) and recovery phase."
    },
    riskFactors: [
      "HAV/HEV: travel to endemic areas, contaminated food/water, poor sanitation",
      "HBV: unprotected sexual contact, IV drug use, perinatal exposure, healthcare workers",
      "HCV: IV drug use (most common in US), blood transfusion before 1992, needle-stick injury",
      "HDV: only occurs with concurrent HBV infection",
      "Immunosuppression (increased risk of chronicity)",
      "Occupational exposure (healthcare workers, first responders)",
      "Men who have sex with men (HAV, HBV)",
      "Hemodialysis clients"
    ],
    diagnostics: [
      "Hepatitis A: anti-HAV IgM (acute), anti-HAV IgG (past infection/immunity)",
      "Hepatitis B panel: HBsAg, anti-HBs, anti-HBc IgM/IgG, HBeAg, HBV DNA",
      "Hepatitis C: anti-HCV antibody (screening), HCV RNA PCR (confirms active infection)",
      "Liver function tests: ALT/AST markedly elevated (often > 1000 in acute viral hepatitis)",
      "Bilirubin (elevated), PT/INR (prolonged in severe cases), albumin (decreased if chronic)"
    ],
    management: [
      "HAV: supportive care (rest, hydration, avoid hepatotoxic substances); self-limiting",
      "HBV acute: supportive; chronic: antiviral therapy (tenofovir or entecavir)",
      "HCV: direct-acting antiviral (DAA) therapy (sofosbuvir-based regimens); 95%+ cure rate",
      "Avoid alcohol and hepatotoxic medications (acetaminophen at reduced doses)",
      "Vaccination: HAV (2-dose series), HBV (3-dose series at 0, 1, 6 months)",
      "Post-exposure prophylaxis: HBIG + HBV vaccine for needle-stick or perinatal exposure"
    ],
    nursingActions: [
      "Implement standard precautions; add contact precautions for HAV (fecal-oral transmission)",
      "Monitor liver function tests and coagulation studies as ordered",
      "Administer antiemetics as ordered for nausea; encourage small, frequent, high-calorie meals",
      "Educate client on transmission prevention: safe sex, avoid sharing personal items, hand hygiene",
      "Report signs of fulminant hepatitis: rapid decline in mental status, severe coagulopathy, shrinking liver",
      "Ensure vaccination status of household contacts and sexual partners"
    ],
    signs: {
      left: [
        "Prodromal phase: malaise, anorexia, nausea, low-grade fever, RUQ discomfort",
        "Icteric phase: jaundice, scleral icterus, dark amber urine",
        "Hepatomegaly with RUQ tenderness on palpation",
        "Clay-colored (acholic) stools"
      ],
      right: [
        "Pruritus from bile salt deposition in skin",
        "Arthralgia and urticaria (immune complex deposition, especially HBV)",
        "Fatigue and weakness persisting for weeks to months",
        "Fulminant hepatitis: coagulopathy, encephalopathy, hepatic failure"
      ]
    },
    medications: [
      {
        name: "Tenofovir disoproxil (Viread)",
        type: "Nucleotide reverse transcriptase inhibitor (antiviral)",
        action: "Inhibits HBV DNA polymerase by competing with deoxyadenosine triphosphate for incorporation into viral DNA, causing chain termination",
        sideEffects: "Nephrotoxicity, Fanconi syndrome, decreased bone mineral density, lactic acidosis",
        contra: "Severe renal impairment (dose adjustment required), concurrent nephrotoxic agents",
        pearl: "First-line for chronic HBV; monitor renal function and phosphorus levels; do not discontinue abruptly; may cause severe hepatitis flare"
      },
      {
        name: "Sofosbuvir/Ledipasvir (Harvoni)",
        type: "Direct-acting antiviral (DAA) combination",
        action: "Sofosbuvir inhibits HCV NS5B RNA-dependent RNA polymerase; ledipasvir inhibits NS5A protein essential for viral replication and assembly",
        sideEffects: "Fatigue, headache, nausea, insomnia",
        contra: "Concurrent use with amiodarone (risk of symptomatic bradycardia); not for HBV co-infection without HBV treatment",
        pearl: "Achieves > 95% sustained virologic response (SVR/cure) in 8-12 weeks; screen for HBV before starting; DAA therapy can cause HBV reactivation"
      }
    ],
    pearls: [
      "HBsAg positive = current HBV infection; anti-HBs positive = immunity (vaccine or resolved infection)",
      "HCV is the most common blood-borne infection in the US; screen all adults born 1945-1965",
      "HAV and HEV do not cause chronic hepatitis; HBV, HCV, and HDV can become chronic",
      "DAA therapy for HCV can cause HBV reactivation; always screen for HBV before starting treatment",
      "Fulminant hepatic failure is more common with HBV (especially HBV-HDV co-infection) than HCV"
    ],
    quiz: [
      {
        question: "A client's hepatitis B serology shows HBsAg negative, anti-HBs positive, anti-HBc negative. What does this indicate?",
        options: [
          "Acute hepatitis B infection",
          "Chronic hepatitis B infection",
          "Immunity from hepatitis B vaccination",
          "Resolved hepatitis B infection with natural immunity"
        ],
        correct: 2,
        rationale: "HBsAg negative (no active infection), anti-HBs positive (immunity present), anti-HBc negative (no prior exposure to virus) indicates immunity from vaccination. Natural immunity would show anti-HBc positive (prior exposure)."
      }
    ]
  },

  "pancreatitis": {
    title: "Pancreatitis",
    cellular: {
      title: "Pancreatitis - Acute vs. Chronic, Autodigestion & Ranson Criteria",
      content:
        "Pancreatitis is inflammation of the pancreas resulting from premature activation of pancreatic enzymes within the gland, leading to autodigestion of pancreatic tissue. The two most common causes are gallstones (40%) and chronic alcohol use (40%). In gallstone pancreatitis, a stone lodges at the ampulla of Vater, obstructing the pancreatic duct and causing back-pressure that triggers premature trypsinogen-to-trypsin conversion. In alcoholic pancreatitis, alcohol and its metabolites (acetaldehyde) directly damage acinar cells, increase ductal protein secretion, and form protein plugs that obstruct small pancreatic ducts.\n\nAt the cellular level, the key event is inappropriate intracellular activation of trypsinogen to trypsin within acinar cells. Normally, pancreatic enzymes are synthesized as inactive zymogens and stored in zymogen granules separated from lysosomal enzymes. Injury disrupts this compartmentalization, allowing lysosomal hydrolases (cathepsin B) to activate trypsinogen. Active trypsin then activates other zymogens; phospholipase A2, elastase, and lipase; creating a cascade of tissue destruction. Phospholipase A2 damages cell membranes, elastase destroys blood vessel walls causing hemorrhage, and lipase digests peripancreatic fat (fat necrosis). Inflammatory mediators (TNF-α, IL-1, IL-6) are released, potentially leading to systemic inflammatory response syndrome (SIRS), organ failure, and death.\n\nRanson criteria predict severity at admission (age > 55, WBC > 16,000, glucose > 200, AST > 250, LDH > 350) and at 48 hours (hematocrit drop > 10%, BUN rise > 5, calcium < 8, PaO2 < 60, base deficit > 4, fluid sequestration > 6 L). A score ≥ 3 indicates severe pancreatitis with 15% mortality; ≥ 6 indicates 40% mortality. Grey Turner sign (flank ecchymosis) and Cullen sign (periumbilical ecchymosis) indicate retroperitoneal hemorrhage and severe necrotizing pancreatitis."
    },
    riskFactors: [
      "Gallstones (most common cause overall)",
      "Chronic alcohol use (most common cause of chronic pancreatitis)",
      "Hypertriglyceridemia (> 1000 mg/dL)",
      "ERCP (endoscopic retrograde cholangiopancreatography)",
      "Medications: azathioprine, valproic acid, thiazides, estrogens",
      "Smoking",
      "Pancreatic duct obstruction (tumors, pancreas divisum)",
      "Hypercalcemia and hyperparathyroidism"
    ],
    diagnostics: [
      "Serum lipase: most sensitive and specific marker; elevated ≥ 3× upper limit of normal",
      "Serum amylase: elevated early but less specific (also elevated in salivary disease, bowel obstruction)",
      "CT abdomen with contrast: identifies necrosis, fluid collections, pseudocysts (best at 72 hours)",
      "CBC: leukocytosis; CMP: hypocalcemia (calcium sequestered in fat necrosis), hyperglycemia",
      "Ranson criteria at admission and 48 hours for severity prediction",
      "Abdominal ultrasound to evaluate for gallstones as etiology"
    ],
    management: [
      "Aggressive IV fluid resuscitation: lactated Ringer's at 250-500 mL/hr initially",
      "Pain management: IV hydromorphone or fentanyl (avoid morphine; sphincter of Oddi spasm controversy)",
      "NPO initially; early enteral nutrition via nasojejunal tube within 24-48 hours (superior to TPN)",
      "ERCP with sphincterotomy for gallstone pancreatitis with biliary obstruction",
      "Cholecystectomy during same admission for gallstone pancreatitis (once inflammation resolves)",
      "Antibiotics only for infected pancreatic necrosis; not routine prophylaxis"
    ],
    nursingActions: [
      "Position client on left side with knees flexed to reduce pain",
      "Monitor and report Cullen sign (periumbilical ecchymosis) or Grey Turner sign (flank ecchymosis); indicates hemorrhagic pancreatitis",
      "Maintain strict NPO; provide oral hygiene every 2 hours",
      "Monitor serum calcium levels: hypocalcemia can cause tetany, seizures (positive Chvostek/Trousseau signs)",
      "Administer analgesics as ordered and assess pain using validated scale",
      "Monitor blood glucose levels: pancreatic beta-cell damage can cause hyperglycemia"
    ],
    signs: {
      left: [
        "Severe epigastric pain radiating to the back, worsened by eating and lying supine",
        "Nausea, vomiting, and abdominal distension",
        "Grey Turner sign: bluish-grey discoloration of the flanks",
        "Cullen sign: bluish discoloration around the umbilicus"
      ],
      right: [
        "Hypocalcemia: Chvostek sign, Trousseau sign, tetany",
        "Tachycardia, hypotension (third-spacing, hemorrhage)",
        "Hyperglycemia from beta-cell damage",
        "Jaundice (if common bile duct is compressed by edematous pancreatic head)"
      ]
    },
    medications: [
      {
        name: "Hydromorphone (Dilaudid)",
        type: "Opioid analgesic",
        action: "Binds to mu-opioid receptors in the CNS, inhibiting ascending pain pathways and altering pain perception",
        sideEffects: "Respiratory depression, sedation, constipation, nausea, hypotension",
        contra: "Severe respiratory depression, paralytic ileus, concurrent MAOIs",
        pearl: "Often preferred over morphine in pancreatitis due to lower theoretical risk of sphincter of Oddi spasm; administer as ordered with continuous pain assessment"
      },
      {
        name: "Pancrelipase (Creon)",
        type: "Pancreatic enzyme replacement",
        action: "Provides exogenous lipase, amylase, and protease to compensate for pancreatic exocrine insufficiency, improving fat and nutrient digestion",
        sideEffects: "Nausea, cramping, diarrhea, hyperuricosuria at high doses",
        contra: "Acute pancreatitis (not used during acute phase), pork allergy",
        pearl: "Used in chronic pancreatitis with steatorrhea; administer with meals and snacks; not on an empty stomach"
      }
    ],
    pearls: [
      "Lipase is more specific than amylase for pancreatitis; amylase can be elevated in many non-pancreatic conditions",
      "Grey Turner sign and Cullen sign indicate hemorrhagic pancreatitis; a severe, life-threatening presentation",
      "Hypocalcemia occurs because calcium binds to fatty acids in areas of fat necrosis (saponification)",
      "Early enteral nutrition is preferred over TPN; maintains gut barrier integrity and reduces infectious complications",
      "Ranson score ≥ 3 at 48 hours = severe pancreatitis with significantly increased mortality"
    ],
    quiz: [
      {
        question: "A client with acute pancreatitis develops facial twitching when the nurse taps over the facial nerve. What should the nurse report and monitor for?",
        options: [
          "Hyperkalemia and cardiac arrhythmias",
          "Hypocalcemia and potential seizure activity",
          "Hypernatremia and neurological changes",
          "Hypomagnesemia and muscle weakness"
        ],
        correct: 1,
        rationale: "Facial twitching when tapping the facial nerve is a positive Chvostek sign, indicating hypocalcemia. In pancreatitis, calcium is sequestered in areas of fat necrosis. The nurse should report this finding and monitor for seizures, tetany, and cardiac arrhythmias."
      }
    ]
  },

  "ibs": {
    title: "Irritable Bowel Syndrome (IBS)",
    cellular: {
      title: "IBS - Visceral Hypersensitivity, Gut-Brain Axis & FODMAP Diet",
      content:
        "Irritable bowel syndrome (IBS) is a chronic functional gastrointestinal disorder characterized by recurrent abdominal pain associated with changes in bowel habits, in the absence of structural or biochemical abnormalities. IBS affects approximately 10-15% of the global population and is classified into four subtypes: IBS with constipation (IBS-C), IBS with diarrhea (IBS-D), mixed IBS (IBS-M), and unsubtyped IBS (IBS-U). Diagnosis is based on the Rome IV criteria: recurrent abdominal pain at least 1 day per week in the last 3 months, associated with ≥ 2 of the following: related to defecation, associated with a change in stool frequency, or associated with a change in stool form.\n\nAt the cellular and neurophysiological level, IBS involves visceral hypersensitivity; an exaggerated sensory response to normal physiological stimuli such as intestinal distension. This results from peripheral sensitization of visceral afferent neurons (upregulation of ion channels like TRPV1) and central sensitization in the spinal cord and brain. The gut-brain axis, involving bidirectional communication between the enteric nervous system and the central nervous system via vagal and spinal pathways, is dysregulated. Serotonin (5-HT) plays a crucial role: 95% of the body's serotonin is produced in enterochromaffin cells of the GI tract, and alterations in serotonin signaling affect motility, secretion, and visceral sensation.\n\nThe low-FODMAP diet (Fermentable Oligosaccharides, Disaccharides, Monosaccharides, and Polyols) has strong evidence for symptom reduction in 50-80% of IBS clients. FODMAPs are short-chain carbohydrates that are poorly absorbed in the small intestine, leading to increased water content in the bowel (osmotic effect) and rapid fermentation by colonic bacteria producing hydrogen, methane, and carbon dioxide gas. This distension triggers pain in the hypersensitive viscera. Stress, anxiety, and depression frequently coexist with IBS and amplify symptoms through the gut-brain axis; psychological interventions including cognitive behavioral therapy (CBT) have demonstrated significant benefit."
    },
    riskFactors: [
      "Female sex (2:1 female-to-male ratio)",
      "Age < 50 years (onset typically in young adulthood)",
      "History of anxiety, depression, or psychological trauma",
      "Post-infectious IBS following acute gastroenteritis",
      "Visceral hypersensitivity and altered gut motility",
      "Dietary triggers: high-FODMAP foods, caffeine, alcohol",
      "Family history of IBS",
      "History of physical or sexual abuse (central sensitization)"
    ],
    diagnostics: [
      "Rome IV criteria: clinical diagnosis based on symptom pattern and duration",
      "CBC, CRP, ESR: to exclude inflammatory bowel disease (should be normal in IBS)",
      "Tissue transglutaminase (tTG-IgA) antibody: to rule out celiac disease",
      "Stool studies: calprotectin (normal in IBS, elevated in IBD), ova and parasites",
      "Colonoscopy only if alarm features present: age > 50, rectal bleeding, weight loss, anemia, family history of colon cancer"
    ],
    management: [
      "Low-FODMAP diet: elimination phase (2-6 weeks) followed by systematic reintroduction",
      "IBS-C: fiber supplementation (psyllium), osmotic laxatives (PEG 3350), linaclotide or lubiprostone",
      "IBS-D: loperamide for symptom control, rifaximin (antibiotic), alosetron (severe cases only)",
      "Antispasmodics (dicyclomine or hyoscyamine) for cramping pain",
      "Psychological interventions: CBT, gut-directed hypnotherapy, stress management",
      "Regular exercise and adequate sleep for symptom modulation"
    ],
    nursingActions: [
      "Encourage client to keep a food and symptom diary to identify triggers",
      "Educate on the low-FODMAP diet: avoid wheat, onions, garlic, dairy (lactose), apples, honey",
      "Administer antispasmodics as ordered 30 minutes before meals",
      "Assess and report psychological symptoms: anxiety, depression, impact on quality of life",
      "Monitor stool pattern using the Bristol Stool Form Scale",
      "Reinforce that IBS does not increase colorectal cancer risk; provide reassurance"
    ],
    signs: {
      left: [
        "Recurrent abdominal pain relieved or worsened by defecation",
        "Bloating and visible abdominal distension",
        "Altered stool frequency (> 3/day or < 3/week)",
        "Mucus in stools (without blood)"
      ],
      right: [
        "Urgency and incomplete evacuation sensation",
        "Symptoms worsen with stress, anxiety, or specific foods",
        "No nocturnal symptoms (IBS symptoms typically do not wake client from sleep)",
        "No weight loss, rectal bleeding, or fever (alarm features absent)"
      ]
    },
    medications: [
      {
        name: "Dicyclomine (Bentyl)",
        type: "Anticholinergic/antispasmodic",
        action: "Blocks muscarinic acetylcholine receptors on intestinal smooth muscle, reducing spasm and pain",
        sideEffects: "Dry mouth, constipation, urinary retention, blurred vision, drowsiness",
        contra: "Myasthenia gravis, glaucoma, GI obstruction, urinary retention",
        pearl: "Administer 30 minutes before meals for best effect; monitor for anticholinergic toxicity especially in older adults"
      },
      {
        name: "Linaclotide (Linzess)",
        type: "Guanylate cyclase-C agonist",
        action: "Activates guanylate cyclase-C receptors on intestinal epithelium, increasing intracellular cGMP, which stimulates chloride and bicarbonate secretion and accelerates intestinal transit; also reduces visceral pain signaling",
        sideEffects: "Diarrhea (most common), abdominal pain, flatulence",
        contra: "Pediatric clients < 6 years (contraindicated), known mechanical GI obstruction",
        pearl: "Used for IBS-C; take on empty stomach 30 minutes before first meal of the day; discontinue if severe diarrhea develops"
      }
    ],
    pearls: [
      "IBS is a diagnosis of exclusion; alarm features (weight loss, rectal bleeding, nocturnal symptoms, anemia) warrant further workup",
      "Low-FODMAP diet should be guided by a dietitian and is not meant to be a permanent restriction",
      "Nocturnal symptoms suggest organic disease (IBD, cancer), not IBS",
      "Fecal calprotectin is a useful non-invasive marker to differentiate IBS from inflammatory bowel disease"
    ],
    quiz: [
      {
        question: "Which finding in a client with suspected IBS warrants further diagnostic workup?",
        options: [
          "Bloating that worsens after meals",
          "Abdominal pain relieved by defecation",
          "Unintentional weight loss of 10 lbs in 2 months",
          "Mucus in stools without blood"
        ],
        correct: 2,
        rationale: "Unintentional weight loss is an alarm feature that is not consistent with IBS and requires further investigation (colonoscopy, imaging) to rule out organic pathology such as inflammatory bowel disease or malignancy."
      }
    ]
  },

  "ulcerative-colitis": {
    title: "Ulcerative Colitis",
    cellular: {
      title: "Ulcerative Colitis - Mucosal Inflammation, Toxic Megacolon & Cancer Risk",
      content:
        "Ulcerative colitis (UC) is a chronic inflammatory bowel disease (IBD) characterized by diffuse, continuous mucosal and submucosal inflammation that begins in the rectum and extends proximally in a contiguous pattern through the colon. Unlike Crohn's disease, UC does not involve the small intestine (except for 'backwash ileitis' in pancolitis) and does not produce transmural inflammation, skip lesions, or granulomas. The disease follows a relapsing-remitting course with periods of active inflammation (flares) and clinical remission.\n\nAt the cellular level, the inflammatory process involves a dysregulated mucosal immune response, likely triggered by environmental factors in genetically susceptible individuals. T-helper 2 (Th2) cells predominate in UC, producing cytokines (IL-5, IL-13) that activate natural killer T cells and promote an atypical inflammatory response. Neutrophils infiltrate the colonic crypts, forming crypt abscesses; a hallmark histological finding. The mucosa develops friability, contact bleeding, erythema, and pseudopolyps (islands of regenerating mucosa amid areas of ulceration). The epithelial barrier becomes disrupted, increasing permeability and allowing bacterial translocation.\n\nToxic megacolon is the most dangerous acute complication, defined as colonic dilatation > 6 cm with signs of systemic toxicity (fever, tachycardia, leukocytosis, anemia). It can progress to perforation, peritonitis, and septic shock. Clients with UC have an increased risk of colorectal cancer proportional to disease duration and extent; risk increases significantly after 8-10 years of disease, especially in pancolitis. Surveillance colonoscopy with random biopsies every 1-2 years is recommended beginning 8 years after diagnosis."
    },
    riskFactors: [
      "Family history of inflammatory bowel disease",
      "Ashkenazi Jewish descent",
      "Age 15-30 years (peak onset) or 50-70 years (second peak)",
      "Non-smoking status (paradoxically, smoking appears protective in UC)",
      "NSAID use (may trigger flares)",
      "History of appendectomy (may be protective)",
      "Western/industrialized diet",
      "Psychological stress (may trigger flares, not a cause)"
    ],
    diagnostics: [
      "Colonoscopy with biopsy: continuous mucosal inflammation from rectum proximally, crypt abscesses, pseudopolyps",
      "Stool studies: fecal calprotectin and lactoferrin (elevated; markers of intestinal inflammation)",
      "CBC: anemia (iron deficiency from chronic blood loss), leukocytosis, thrombocytosis",
      "ESR and CRP: elevated during active disease",
      "pANCA (perinuclear anti-neutrophil cytoplasmic antibodies): positive in 60-70% of UC (not Crohn's)",
      "Abdominal X-ray: rule out toxic megacolon (colonic dilatation > 6 cm)"
    ],
    management: [
      "5-aminosalicylates (mesalamine): first-line for mild-moderate disease (oral and rectal formulations)",
      "Corticosteroids (prednisone, budesonide): for acute flares; not maintenance therapy",
      "Immunomodulators (azathioprine, 6-mercaptopurine): steroid-sparing maintenance agents",
      "Biologic therapy (infliximab, adalimumab, vedolizumab): moderate-severe disease refractory to conventional therapy",
      "Total proctocolectomy with ileal pouch-anal anastomosis (IPAA): curative surgery for refractory disease or dysplasia",
      "Surveillance colonoscopy every 1-2 years beginning 8 years after diagnosis"
    ],
    nursingActions: [
      "Monitor stool frequency, character, and presence of blood; report > 6 bloody stools/day",
      "Administer medications as ordered; monitor for corticosteroid side effects during flares",
      "Monitor for toxic megacolon: abdominal distension, high fever, tachycardia, absent bowel sounds",
      "Provide perianal skin care: barrier cream, gentle cleansing after each stool",
      "Monitor nutritional status: albumin, prealbumin, iron, and electrolytes",
      "Provide emotional support and referral to IBD support groups"
    ],
    signs: {
      left: [
        "Bloody diarrhea with mucus (hallmark symptom)",
        "Urgency, tenesmus, and fecal incontinence",
        "Left lower quadrant crampy abdominal pain",
        "Fever and malaise during acute flares"
      ],
      right: [
        "Extraintestinal manifestations: erythema nodosum, pyoderma gangrenosum",
        "Arthritis (peripheral joints), uveitis/iritis",
        "Anemia (iron deficiency from chronic blood loss)",
        "Toxic megacolon: massive abdominal distension, absent bowel sounds, systemic toxicity"
      ]
    },
    medications: [
      {
        name: "Mesalamine (Asacol, Lialda)",
        type: "5-aminosalicylate (5-ASA) anti-inflammatory",
        action: "Topically inhibits prostaglandin and leukotriene synthesis in the colonic mucosa by blocking cyclooxygenase and lipoxygenase pathways, reducing mucosal inflammation",
        sideEffects: "Headache, nausea, abdominal pain, diarrhea, rarely nephrotoxicity or pancreatitis",
        contra: "Salicylate or aspirin hypersensitivity, severe renal or hepatic impairment",
        pearl: "First-line for mild-moderate UC; available as oral and rectal (enema/suppository) formulations; rectal preparations are particularly effective for distal disease"
      },
      {
        name: "Infliximab (Remicade)",
        type: "Monoclonal antibody (anti-TNF-α biologic)",
        action: "Binds and neutralizes tumor necrosis factor-alpha (TNF-α), a key pro-inflammatory cytokine driving intestinal inflammation in IBD",
        sideEffects: "Infusion reactions, increased infection risk (tuberculosis reactivation), hepatotoxicity, lymphoma risk",
        contra: "Active severe infection, untreated latent TB, moderate-severe heart failure (NYHA III-IV)",
        pearl: "Screen for latent TB (PPD or QuantiFERON-Gold) before initiation; monitor for infusion reactions during administration"
      }
    ],
    pearls: [
      "UC involves continuous inflammation starting at the rectum; skip lesions suggest Crohn's disease",
      "Toxic megacolon is a surgical emergency: stop anticholinergics and opioids, which can precipitate dilation",
      "Colorectal cancer risk increases after 8-10 years of disease; surveillance colonoscopy is essential",
      "pANCA is associated with UC; ASCA is associated with Crohn's disease"
    ],
    quiz: [
      {
        question: "A client with ulcerative colitis develops fever (39.2°C), tachycardia, abdominal distension, and absent bowel sounds. What condition should the nurse suspect?",
        options: [
          "Small bowel obstruction",
          "Toxic megacolon",
          "Appendicitis",
          "Peritonitis from perforation"
        ],
        correct: 1,
        rationale: "Fever, tachycardia, abdominal distension, and absent bowel sounds in a client with UC are classic signs of toxic megacolon; a life-threatening complication requiring immediate medical attention. Report findings to the provider stat."
      }
    ]
  },

  "crohns-disease": {
    title: "Crohn's Disease",
    cellular: {
      title: "Crohn's Disease - Transmural Inflammation, Skip Lesions & Fistulae",
      content:
        "Crohn's disease is a chronic inflammatory bowel disease characterized by transmural (full-thickness) inflammation that can affect any segment of the GI tract from mouth to anus, though the terminal ileum and proximal colon are most commonly involved. Unlike ulcerative colitis, Crohn's disease produces discontinuous 'skip lesions' with segments of normal bowel interspersed between inflamed areas. The transmural nature of inflammation leads to complications unique to Crohn's: strictures, fistulae (abnormal connections between bowel loops, bladder, vagina, or skin), and abscesses.\n\nAt the cellular level, Crohn's disease is driven primarily by a Th1/Th17 immune response. Dendritic cells and macrophages in the intestinal mucosa produce excessive IL-12 and IL-23, which activate Th1 cells (producing IFN-γ and TNF-α) and Th17 cells (producing IL-17). Non-caseating granulomas; clusters of activated macrophages (epithelioid cells) surrounded by lymphocytes; are a hallmark histological finding present in approximately 30% of biopsy specimens. The mucosal surface develops a characteristic 'cobblestone' appearance due to deep longitudinal and transverse ulcers separated by areas of edematous mucosa.\n\nTerminal ileum involvement causes malabsorption of bile salts (leading to fat malabsorption, steatorrhea, and fat-soluble vitamin deficiencies) and vitamin B12 (leading to megaloblastic anemia). Transmural inflammation and fibrosis can narrow the bowel lumen, creating strictures that cause obstructive symptoms. Fistulae develop when transmural inflammation creates sinus tracts; enterocutaneous (bowel to skin), enterovesical (bowel to bladder), enterovaginal, and enteroenteric fistulae each present with characteristic symptoms. Perianal disease (fissures, fistulae, abscesses) is present in up to 50% of clients."
    },
    riskFactors: [
      "Family history of IBD (first-degree relatives have 5-20× increased risk)",
      "Ashkenazi Jewish descent",
      "Smoking (doubles the risk of Crohn's and worsens disease course; opposite of UC)",
      "Age 15-30 years at peak onset",
      "NOD2/CARD15 gene mutations",
      "Western diet high in processed foods and refined sugars",
      "NSAID use (may trigger flares)",
      "History of appendectomy (may increase risk; opposite of UC)"
    ],
    diagnostics: [
      "Colonoscopy with ileoscopy and biopsy: skip lesions, cobblestoning, aphthous ulcers, non-caseating granulomas",
      "CT enterography or MR enterography: bowel wall thickening, strictures, fistulae, abscesses",
      "ASCA (anti-Saccharomyces cerevisiae antibodies): positive in 60-70% of Crohn's (not UC)",
      "Fecal calprotectin: elevated (correlates with degree of intestinal inflammation)",
      "CBC: anemia (B12 deficiency or chronic disease), leukocytosis",
      "CRP and ESR: elevated during active disease; albumin decreased"
    ],
    management: [
      "Induction of remission: corticosteroids (budesonide for ileal/right colonic disease) or biologics",
      "Maintenance: immunomodulators (azathioprine, methotrexate) or biologics (anti-TNF, vedolizumab, ustekinumab)",
      "Nutritional support: correct B12, iron, folate, and fat-soluble vitamin deficiencies",
      "Surgical intervention for strictures, abscesses, or fistulae refractory to medical therapy",
      "Smoking cessation (most important modifiable risk factor)",
      "Perianal disease management: seton drainage, fistula plug, anti-TNF therapy"
    ],
    nursingActions: [
      "Monitor for signs of bowel obstruction: colicky pain, vomiting, abdominal distension, absent bowel sounds",
      "Assess perianal area for fistulae, fissures, and abscesses; provide wound care as ordered",
      "Monitor nutritional status and weight; administer supplements (B12, iron, folate) as ordered",
      "Educate client on smoking cessation resources; smoking worsens Crohn's disease",
      "Administer immunosuppressants as ordered; monitor for infection signs",
      "Report signs of fistula formation: passage of stool from vagina, pneumaturia (air in urine), drainage from skin"
    ],
    signs: {
      left: [
        "Right lower quadrant pain (terminal ileum involvement mimics appendicitis)",
        "Non-bloody diarrhea (unlike UC, gross blood less common)",
        "Weight loss and malnutrition from malabsorption",
        "Perianal disease: fissures, fistulae, skin tags, abscesses"
      ],
      right: [
        "Cobblestone appearance of mucosa on endoscopy",
        "Steatorrhea (fatty, foul-smelling stools from bile salt malabsorption)",
        "Stricture symptoms: post-prandial bloating, cramping, obstipation",
        "Extraintestinal: oral aphthous ulcers, erythema nodosum, arthritis, kidney stones (oxalate)"
      ]
    },
    medications: [
      {
        name: "Budesonide (Entocort EC)",
        type: "Locally-acting corticosteroid",
        action: "High topical anti-inflammatory potency with extensive first-pass hepatic metabolism, minimizing systemic steroid side effects; reduces mucosal inflammation in terminal ileum and ascending colon",
        sideEffects: "Headache, nausea, adrenal suppression at high doses, moon face (less than prednisone)",
        contra: "Systemic fungal infections, hepatic cirrhosis (reduced first-pass metabolism increases systemic effects)",
        pearl: "Preferred over prednisone for mild-moderate ileal/right-sided Crohn's due to fewer systemic side effects"
      },
      {
        name: "Adalimumab (Humira)",
        type: "Monoclonal antibody (anti-TNF-α biologic)",
        action: "Binds and neutralizes TNF-α, reducing transmural inflammation, promoting mucosal healing, and reducing fistula drainage",
        sideEffects: "Injection site reactions, increased infection risk, TB reactivation, demyelinating disease, malignancy risk",
        contra: "Active infections, untreated latent TB, moderate-severe heart failure",
        pearl: "Self-administered subcutaneous injection; screen for TB before starting; educate client to report fever, persistent cough, or signs of infection"
      }
    ],
    pearls: [
      "Smoking worsens Crohn's but paradoxically appears protective in UC; always counsel Crohn's clients on cessation",
      "Terminal ileum involvement causes B12 and bile salt malabsorption; assess for megaloblastic anemia and steatorrhea",
      "Non-caseating granulomas on biopsy are characteristic of Crohn's but not required for diagnosis",
      "Crohn's is NOT cured by surgery; post-surgical recurrence at anastomotic sites is common",
      "ASCA positive + pANCA negative favors Crohn's; pANCA positive + ASCA negative favors UC"
    ],
    quiz: [
      {
        question: "A client with Crohn's disease reports passing air and stool through the vagina. What should the nurse suspect?",
        options: [
          "Rectovaginal fistula",
          "Vaginal infection",
          "Rectal prolapse",
          "Diverticulitis"
        ],
        correct: 0,
        rationale: "Passage of air (pneumovagina) and stool through the vagina indicates a rectovaginal or enterovaginal fistula, a complication of transmural inflammation in Crohn's disease. This requires reporting to the provider for surgical evaluation."
      }
    ]
  },

  "diverticulitis": {
    title: "Diverticulitis",
    cellular: {
      title: "Diverticulitis - Diverticular Perforation, Abscess & Hinchey Classification",
      content:
        "Diverticulitis occurs when one or more diverticula (outpouchings of the colonic mucosa and submucosa through the muscular wall) become inflamed or infected. Diverticula form at points of weakness in the colonic wall where the vasa recta (nutrient arteries) penetrate the circular muscle layer. Low dietary fiber leads to decreased stool bulk, increased intraluminal pressure during colonic segmentation, and progressive herniation of mucosa through these weak points. The sigmoid colon is most commonly affected due to its narrower diameter and highest intraluminal pressures (according to Laplace's law).\n\nAt the cellular level, diverticulitis begins when a fecalith (hardened stool) obstructs the neck of a diverticulum, leading to mucosal erosion, bacterial overgrowth, and micro- or macro-perforation. Localized infection triggers an inflammatory cascade with neutrophil infiltration, cytokine release, and pericolic abscess formation. In uncomplicated diverticulitis, the inflammation is contained by adjacent mesentery, omentum, and pericolonic fat, forming a localized phlegmon. In complicated diverticulitis, the inflammation extends to cause abscess formation, free perforation with purulent or fecal peritonitis, fistula formation (colovesical or colovaginal), or stricture with obstruction.\n\nThe Hinchey classification system grades the severity of complicated diverticulitis: Stage I = confined pericolic abscess, Stage II = distant abscess (pelvic, retroperitoneal), Stage III = purulent peritonitis from ruptured abscess, Stage IV = fecal peritonitis from free perforation. Hinchey I and II may be managed with antibiotics and percutaneous drainage, while III and IV typically require emergent surgery (Hartmann procedure: sigmoid resection with end colostomy)."
    },
    riskFactors: [
      "Low-fiber, high-refined-carbohydrate diet",
      "Age > 50 years (diverticula prevalence increases with age)",
      "Obesity (BMI > 30)",
      "Sedentary lifestyle",
      "Chronic NSAID or corticosteroid use",
      "Smoking",
      "Immunosuppression (increases risk of complicated diverticulitis)"
    ],
    diagnostics: [
      "CT abdomen/pelvis with IV contrast: gold standard; shows colonic wall thickening, pericolic fat stranding, abscess, free air",
      "CBC: leukocytosis with left shift",
      "CRP: elevated (correlates with severity)",
      "Urinalysis: pyuria or pneumaturia may suggest colovesical fistula",
      "Colonoscopy: performed 6-8 weeks AFTER acute episode resolves (never during acute diverticulitis; risk of perforation)"
    ],
    management: [
      "Uncomplicated: clear liquid diet progressing to low-residue diet; oral antibiotics (ciprofloxacin + metronidazole or amoxicillin-clavulanate)",
      "Complicated (abscess > 3 cm): CT-guided percutaneous drainage + IV antibiotics",
      "Hinchey III/IV: emergent surgery; Hartmann procedure (sigmoid resection with end colostomy)",
      "High-fiber diet (25-35 g/day) after acute episode resolves to prevent recurrence",
      "Elective sigmoid colectomy after 2 or more uncomplicated episodes or 1 complicated episode"
    ],
    nursingActions: [
      "Maintain NPO or clear liquid diet during acute phase as ordered",
      "Administer IV antibiotics as ordered; monitor for C. difficile (antibiotic-associated diarrhea)",
      "Monitor for signs of perforation: rigid abdomen, rebound tenderness, absent bowel sounds, fever > 39°C",
      "Educate on high-fiber diet for prevention after acute episode resolves",
      "Report signs of fistula: pneumaturia (air in urine), fecaluria, recurrent UTIs (colovesical fistula)",
      "Post-surgical: provide colostomy care education if Hartmann procedure performed"
    ],
    signs: {
      left: [
        "Left lower quadrant pain (sigmoid colon involvement); 'left-sided appendicitis'",
        "Low-grade fever and localized peritoneal signs",
        "Change in bowel habits: constipation or diarrhea",
        "Nausea, vomiting, and anorexia"
      ],
      right: [
        "Palpable tender mass in LLQ (phlegmon or abscess)",
        "Peritonitis signs: rigid abdomen, rebound tenderness, guarding (perforation)",
        "Pneumaturia or fecaluria (colovesical fistula)",
        "Rectal bleeding (more common in diverticular bleeding than diverticulitis)"
      ]
    },
    medications: [
      {
        name: "Metronidazole (Flagyl)",
        type: "Nitroimidazole antibiotic/antiprotozoal",
        action: "Disrupts bacterial DNA synthesis by forming toxic free radical intermediates in anaerobic organisms; provides anaerobic coverage essential for intra-abdominal infections",
        sideEffects: "Metallic taste, nausea, peripheral neuropathy, disulfiram-like reaction with alcohol",
        contra: "First trimester pregnancy, concurrent alcohol use, concurrent disulfiram",
        pearl: "Educate client to avoid ALL alcohol during treatment and for 48 hours after; causes severe nausea, vomiting, flushing (disulfiram reaction)"
      },
      {
        name: "Ciprofloxacin (Cipro)",
        type: "Fluoroquinolone antibiotic",
        action: "Inhibits bacterial DNA gyrase and topoisomerase IV, preventing DNA replication; provides gram-negative coverage for enteric organisms",
        sideEffects: "Tendon rupture (especially Achilles), QT prolongation, photosensitivity, C. difficile risk, peripheral neuropathy",
        contra: "Myasthenia gravis, concurrent tizanidine use, children/adolescents (tendon damage), history of fluoroquinolone-associated tendinopathy",
        pearl: "Black box warning for tendon rupture; report tendon pain immediately and discontinue; avoid concurrent dairy/antacids (chelation reduces absorption)"
      }
    ],
    pearls: [
      "Never perform colonoscopy during acute diverticulitis; wait 6-8 weeks to rule out colorectal cancer",
      "Left lower quadrant pain is classic; right-sided diverticulitis occurs more in Asian populations",
      "Metronidazole + ciprofloxacin covers both aerobic and anaerobic organisms in diverticulitis",
      "Nuts, seeds, and popcorn do NOT cause diverticulitis; this is a debunked myth"
    ],
    quiz: [
      {
        question: "A client with acute diverticulitis develops a rigid abdomen, fever of 39.5°C, and absent bowel sounds. What Hinchey classification does this most likely represent?",
        options: [
          "Hinchey Stage I (pericolic abscess)",
          "Hinchey Stage II (distant abscess)",
          "Hinchey Stage III (purulent peritonitis)",
          "Hinchey Stage IV (fecal peritonitis)"
        ],
        correct: 2,
        rationale: "Rigid abdomen, high fever, and absent bowel sounds indicate peritonitis. Hinchey Stage III is purulent peritonitis from rupture of a pericolic abscess. This requires emergent surgical intervention."
      }
    ]
  },

  "hemorrhoids": {
    title: "Hemorrhoids",
    cellular: {
      title: "Hemorrhoids - Internal vs. External, Rubber Band Ligation",
      content:
        "Hemorrhoids are dilated, engorged vascular cushions in the anal canal. The anal canal contains three primary hemorrhoidal cushions located at the left lateral, right anterior, and right posterior positions. These cushions are composed of arteriovenous communications, smooth muscle fibers (Treitz muscle), and connective tissue. They serve a normal physiological function, contributing to anal continence by providing a mucosal seal. Hemorrhoidal disease occurs when these cushions become pathologically enlarged, displaced, or symptomatic due to increased venous pressure, straining, or weakened supporting connective tissue.\n\nInternal hemorrhoids arise above the dentate (pectinate) line from the superior hemorrhoidal venous plexus and are covered by columnar epithelium. Because the area above the dentate line is innervated by visceral afferents, internal hemorrhoids are typically painless and present with bright red rectal bleeding (hematochezia) during or after defecation. They are graded: Grade I (bleeding without prolapse), Grade II (prolapse with spontaneous reduction), Grade III (prolapse requiring manual reduction), Grade IV (irreducible prolapse). External hemorrhoids arise below the dentate line from the inferior hemorrhoidal plexus and are covered by squamous epithelium with somatic innervation; they are therefore painful, especially when thrombosed.\n\nThrombosed external hemorrhoids present as acute, severe perianal pain with a visible bluish-purple, firm, tender mass. If presenting within 48-72 hours of onset, excisional thrombectomy provides rapid relief. Conservative management includes sitz baths, topical analgesics, fiber supplementation, and stool softeners. Rubber band ligation is the most effective office-based procedure for Grade I-III internal hemorrhoids: a small band is placed around the base of the hemorrhoid above the dentate line (where there is no somatic sensation), causing ischemic necrosis and sloughing within 5-7 days."
    },
    riskFactors: [
      "Chronic constipation and prolonged straining during defecation",
      "Low-fiber diet with inadequate fluid intake",
      "Pregnancy (increased pelvic venous pressure, hormonal changes)",
      "Obesity",
      "Prolonged sitting (especially on the toilet)",
      "Chronic diarrhea",
      "Portal hypertension (causes rectal varices, not true hemorrhoids, but often coexists)",
      "Heavy lifting or vigorous exercise"
    ],
    diagnostics: [
      "Digital rectal exam: may palpate external hemorrhoids or prolapsed internal hemorrhoids",
      "Anoscopy: direct visualization of internal hemorrhoids and grading",
      "Colonoscopy or flexible sigmoidoscopy: rule out other causes of rectal bleeding (polyps, cancer) in clients > 45 or with alarm features",
      "CBC: to assess for anemia from chronic blood loss"
    ],
    management: [
      "Conservative: high-fiber diet (25-35 g/day), adequate hydration (8-10 glasses/day), stool softeners",
      "Sitz baths: warm water 3-4 times daily for 15-20 minutes to reduce edema and spasm",
      "Rubber band ligation for Grade I-III internal hemorrhoids (office procedure)",
      "Thrombosed external hemorrhoid: excisional thrombectomy if within 48-72 hours of onset",
      "Hemorrhoidectomy (surgical excision) for Grade III-IV refractory to conservative/banding therapy",
      "Avoid prolonged sitting on toilet, straining, and heavy lifting"
    ],
    nursingActions: [
      "Educate on high-fiber diet and adequate fluid intake to prevent constipation",
      "Instruct on proper sitz bath technique: warm (not hot) water, 15-20 minutes, 3-4 times daily",
      "Administer stool softeners and topical preparations as ordered",
      "Post-hemorrhoidectomy: monitor for urinary retention (common complication due to pain and reflex spasm)",
      "Encourage client to avoid straining; respond promptly to the urge to defecate",
      "Monitor for post-banding complications: excessive pain, fever, urinary retention, bleeding"
    ],
    signs: {
      left: [
        "Painless bright red rectal bleeding during defecation (internal hemorrhoids)",
        "Perianal pruritus, irritation, and mucoid discharge",
        "Prolapsed tissue visible during straining (Grade II-IV)",
        "Severe acute perianal pain (thrombosed external hemorrhoid)"
      ],
      right: [
        "Visible bluish-purple perianal mass (thrombosed external hemorrhoid)",
        "Difficulty with perianal hygiene",
        "Anemia from chronic occult blood loss (rare)",
        "Sensation of incomplete evacuation"
      ]
    },
    medications: [
      {
        name: "Docusate sodium (Colace)",
        type: "Stool softener (surfactant laxative)",
        action: "Acts as a detergent in the intestinal lumen, lowering surface tension and allowing water and fat penetration into the stool mass, producing softer stools",
        sideEffects: "Mild cramping, diarrhea, throat irritation (liquid forms)",
        contra: "Intestinal obstruction, concurrent mineral oil use (increases mineral oil absorption)",
        pearl: "Encourage adequate fluid intake (8-10 glasses/day) for best effect; ineffective without adequate hydration"
      },
      {
        name: "Hydrocortisone/Pramoxine rectal cream",
        type: "Topical corticosteroid/local anesthetic combination",
        action: "Hydrocortisone reduces local inflammation; pramoxine provides temporary anesthetic relief of perianal pain and pruritus",
        sideEffects: "Skin atrophy, burning, irritation with prolonged use",
        contra: "Fungal/viral perianal infection, prolonged use > 7 days (skin atrophy risk)",
        pearl: "Limit use to 7 days to prevent perianal skin atrophy; apply externally only unless specific rectal formulation is prescribed"
      }
    ],
    pearls: [
      "Internal hemorrhoids are painless because they are above the dentate line (visceral innervation); external hemorrhoids are painful (somatic innervation)",
      "Rubber band ligation must be placed ABOVE the dentate line to avoid pain; placement below causes severe pain",
      "Urinary retention is the most common complication after hemorrhoidectomy; monitor voiding",
      "All rectal bleeding warrants investigation for colorectal cancer, especially in clients > 45 years"
    ],
    quiz: [
      {
        question: "A client presents with severe perianal pain and a firm, bluish-purple mass at the anal verge. Symptoms began 24 hours ago. What is the recommended treatment?",
        options: [
          "Rubber band ligation",
          "Excisional thrombectomy",
          "Emergency hemorrhoidectomy",
          "Sitz baths and stool softeners only"
        ],
        correct: 1,
        rationale: "A thrombosed external hemorrhoid presenting within 48-72 hours of symptom onset is best treated with excisional thrombectomy for rapid pain relief. Beyond 72 hours, conservative management (sitz baths, analgesics, stool softeners) is appropriate as the clot begins to resolve."
      }
    ]
  },

  "antacids": {
    title: "Antacids",
    cellular: {
      title: "Antacids - Aluminum/Magnesium Hydroxide & Calcium Carbonate",
      content:
        "Antacids are basic compounds that directly neutralize hydrochloric acid (HCl) in the gastric lumen, raising intragastric pH and providing rapid symptomatic relief of heartburn and dyspepsia. They do not reduce acid production; they neutralize acid that has already been secreted. The three main categories are aluminum-based (aluminum hydroxide), magnesium-based (magnesium hydroxide), and calcium-based (calcium carbonate) antacids. Each has a characteristic neutralization capacity and unique side effect profile that nurses must understand to manage client care effectively.\n\nAt the chemical level, antacids undergo neutralization reactions: Al(OH)₃ + 3HCl → AlCl₃ + 3H₂O; Mg(OH)₂ + 2HCl → MgCl₂ + 2H₂O; CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂. The released CO₂ from calcium carbonate can cause belching and gastric distension. Aluminum hydroxide has a slower onset but longer duration and causes constipation by forming insoluble aluminum salts that decrease intestinal motility. Magnesium hydroxide has a rapid onset and causes diarrhea through osmotic water retention in the intestinal lumen. Many commercial preparations combine aluminum and magnesium to counterbalance their opposing GI effects.\n\nAntacids significantly affect the absorption of many oral medications by altering gastric pH, binding drugs, or forming insoluble complexes. They reduce absorption of fluoroquinolones, tetracyclines, iron preparations, digoxin, and ketoconazole (requires acidic pH for absorption). Therefore, other oral medications should be administered at least 1-2 hours before or after antacids. Calcium carbonate carries the additional risk of acid rebound; where the calcium ion stimulates gastrin release and secondary acid hypersecretion; and milk-alkali syndrome (hypercalcemia, metabolic alkalosis, renal insufficiency) with chronic excessive use."
    },
    riskFactors: [
      "Overuse or chronic self-medication without provider guidance",
      "Concurrent use of medications with pH-dependent absorption",
      "Renal insufficiency (magnesium and aluminum accumulation risk)",
      "Hypercalcemia or history of kidney stones (calcium carbonate)",
      "Elderly clients (increased risk of constipation with aluminum-based antacids)",
      "Fluid and electrolyte imbalances"
    ],
    diagnostics: [
      "Monitor serum electrolytes: calcium, magnesium, phosphorus, aluminum levels",
      "Renal function (BUN, creatinine) in clients with chronic antacid use",
      "Monitor for signs of metabolic alkalosis: pH > 7.45, HCO₃⁻ > 28 mEq/L",
      "Assessment of concurrent medication list for drug interactions"
    ],
    management: [
      "Administer 1-3 hours after meals and at bedtime for optimal acid neutralization",
      "Separate from other oral medications by at least 1-2 hours",
      "Use combination aluminum/magnesium products to balance constipation and diarrhea effects",
      "Monitor renal function in clients on long-term therapy",
      "Educate that antacids provide symptomatic relief only; not a substitute for definitive acid suppression therapy"
    ],
    nursingActions: [
      "Administer antacids as ordered and separate from other medications by 1-2 hours",
      "Monitor bowel patterns: constipation (aluminum) or diarrhea (magnesium)",
      "Report signs of electrolyte imbalances: muscle weakness, confusion, cardiac arrhythmias",
      "Educate client that antacids are for short-term symptomatic relief; report persistent symptoms",
      "Monitor phosphorus levels with chronic aluminum hydroxide use (binds phosphorus in GI tract)"
    ],
    signs: {
      left: [
        "Constipation (aluminum-based antacids)",
        "Diarrhea (magnesium-based antacids)",
        "Belching and gastric distension (calcium carbonate; CO₂ release)",
        "Acid rebound (calcium carbonate; gastrin stimulation)"
      ],
      right: [
        "Hypophosphatemia (aluminum binds dietary phosphorus)",
        "Hypermagnesemia in renal impairment: hypotension, bradycardia, respiratory depression",
        "Hypercalcemia with excessive calcium carbonate: nausea, confusion, polyuria",
        "Milk-alkali syndrome: hypercalcemia + metabolic alkalosis + renal insufficiency"
      ]
    },
    medications: [
      {
        name: "Aluminum hydroxide (Amphojel)",
        type: "Antacid (aluminum-based)",
        action: "Neutralizes gastric HCl by reacting with acid in the stomach lumen; also binds dietary phosphate in the GI tract, reducing phosphorus absorption",
        sideEffects: "Constipation, hypophosphatemia, aluminum toxicity in renal failure (osteomalacia, encephalopathy)",
        contra: "Severe renal impairment (aluminum accumulation), hypophosphatemia",
        pearl: "Used therapeutically in hyperphosphatemia of chronic kidney disease to bind dietary phosphorus; causes constipation; remember 'AlumiNUM = NUMbs the bowel'"
      },
      {
        name: "Calcium carbonate (Tums)",
        type: "Antacid (calcium-based)",
        action: "Directly neutralizes gastric acid by reacting with HCl; also provides supplemental calcium",
        sideEffects: "Constipation, hypercalcemia, acid rebound, gas/belching (CO₂ production)",
        contra: "Hypercalcemia, renal calculi, hyperparathyroidism, digoxin therapy (hypercalcemia potentiates digoxin toxicity)",
        pearl: "Can cause acid rebound with chronic use due to gastrin release; separate from iron and thyroid medications by at least 2 hours"
      }
    ],
    pearls: [
      "Aluminum = constipation; Magnesium = diarrhea; combine them to balance GI effects",
      "Separate antacids from all other oral medications by at least 1-2 hours to prevent drug interactions",
      "Aluminum hydroxide binds phosphorus; used therapeutically in CKD hyperphosphatemia",
      "Calcium carbonate causes acid rebound; not recommended for long-term use in GERD"
    ],
    quiz: [
      {
        question: "A client is prescribed aluminum hydroxide and also takes ciprofloxacin for a urinary tract infection. How should the nurse advise medication administration?",
        options: [
          "Take both medications at the same time",
          "Take aluminum hydroxide 2 hours before or after ciprofloxacin",
          "Discontinue aluminum hydroxide while on ciprofloxacin",
          "Take ciprofloxacin with milk to enhance absorption"
        ],
        correct: 1,
        rationale: "Antacids bind fluoroquinolones (ciprofloxacin) in the GI tract, forming insoluble complexes that dramatically reduce antibiotic absorption. Medications should be separated by at least 1-2 hours to prevent this interaction."
      }
    ]
  },

  "h2-receptor-antagonists": {
    title: "H2-Receptor Antagonists",
    cellular: {
      title: "H2-Receptor Antagonists - Ranitidine, Famotidine & MOA on Parietal Cells",
      content:
        "H2-receptor antagonists (H2RAs) are competitive, reversible blockers of histamine type 2 (H2) receptors on the basolateral membrane of gastric parietal cells. Parietal cells in the gastric body and fundus secrete hydrochloric acid through the H⁺/K⁺-ATPase (proton pump) on their apical membrane. Acid secretion is stimulated by three main mediators: histamine (from enterochromaffin-like [ECL] cells), acetylcholine (from vagal nerve endings), and gastrin (from G cells). Histamine binding to H2 receptors activates adenylyl cyclase, increasing intracellular cyclic AMP (cAMP), which activates protein kinase A and ultimately stimulates the proton pump.\n\nH2RAs block the histamine-mediated pathway of acid secretion, reducing both basal and meal-stimulated acid output by approximately 60-70%. Because they block only the histamine pathway (not acetylcholine or gastrin pathways), they are less potent suppressors of acid secretion than proton pump inhibitors (PPIs), which directly inhibit the final common pathway (the proton pump itself). The major H2RAs include famotidine (Pepcid), ranitidine (Zantac; note: withdrawn in many markets due to NDMA contamination concerns), cimetidine (Tagamet), and nizatidine (Axid).\n\nCimetidine, the first H2RA developed, has the most significant drug interaction profile: it inhibits cytochrome P450 enzymes (CYP1A2, CYP2C19, CYP2D6, CYP3A4) and has anti-androgenic effects (gynecomastia, impotence). Famotidine is the most potent H2RA (20-40× more potent than cimetidine on a molar basis) with minimal drug interactions and is currently preferred. All H2RAs can cause tolerance (tachyphylaxis) with chronic use; receptor upregulation diminishes their acid-suppressive effect over time, which is a significant limitation compared to PPIs."
    },
    riskFactors: [
      "Chronic use leading to tolerance/tachyphylaxis",
      "Cimetidine use with concurrent medications metabolized by CYP450 (warfarin, phenytoin, theophylline)",
      "Renal impairment requiring dose adjustment (all H2RAs are renally cleared)",
      "Elderly clients (increased risk of CNS effects: confusion, dizziness)",
      "Concurrent use of anti-androgenic medications (cimetidine)",
      "Thrombocytopenia risk with chronic use"
    ],
    diagnostics: [
      "Monitor symptom relief: heartburn frequency and severity",
      "Renal function (BUN, creatinine) for dose adjustment",
      "CBC: rare thrombocytopenia with chronic use",
      "Hepatic function tests if concurrent hepatotoxic medications"
    ],
    management: [
      "Administer 30-60 minutes before meals for meal-stimulated acid suppression",
      "Bedtime dosing most effective for nocturnal acid suppression",
      "Dose reduction in renal impairment for all H2RAs",
      "Consider switching to PPI if tolerance develops or symptoms are inadequately controlled",
      "Avoid cimetidine in clients taking warfarin, phenytoin, or theophylline; use famotidine instead"
    ],
    nursingActions: [
      "Administer as ordered; timing depends on indication (before meals or at bedtime)",
      "Monitor for drug interactions, especially with cimetidine (CYP450 inhibitor)",
      "Report signs of GI bleeding: melena, hematemesis, decreased hemoglobin",
      "Educate client that tolerance may develop with chronic use; report diminishing symptom relief",
      "Monitor mental status in elderly clients; H2RAs can cause confusion and delirium"
    ],
    signs: {
      left: [
        "Headache (most common side effect across all H2RAs)",
        "Dizziness and drowsiness",
        "Diarrhea or constipation",
        "Tolerance/tachyphylaxis with chronic use"
      ],
      right: [
        "Cimetidine: gynecomastia, impotence (anti-androgenic effects)",
        "CNS effects in elderly: confusion, agitation, hallucinations",
        "Thrombocytopenia (rare, reversible)",
        "Drug interactions (cimetidine inhibits CYP450)"
      ]
    },
    medications: [
      {
        name: "Famotidine (Pepcid)",
        type: "H2-receptor antagonist",
        action: "Competitively and reversibly blocks histamine H2 receptors on gastric parietal cells, reducing cAMP-mediated acid secretion; the most potent H2RA with minimal CYP450 interactions",
        sideEffects: "Headache, dizziness, constipation, diarrhea",
        contra: "Hypersensitivity to H2RAs, severe renal impairment (dose adjustment needed)",
        pearl: "Preferred H2RA due to highest potency and fewest drug interactions; effective for nocturnal acid suppression when given at bedtime"
      },
      {
        name: "Cimetidine (Tagamet)",
        type: "H2-receptor antagonist",
        action: "Blocks H2 receptors on parietal cells, reducing histamine-stimulated acid secretion; also inhibits multiple CYP450 enzymes",
        sideEffects: "Gynecomastia, impotence (anti-androgenic), drug interactions (CYP450 inhibition), confusion in elderly",
        contra: "Concurrent warfarin, phenytoin, theophylline, or benzodiazepines without dose adjustment; renal impairment",
        pearl: "Due to extensive drug interactions and anti-androgenic effects, cimetidine is largely replaced by famotidine in clinical practice"
      }
    ],
    pearls: [
      "Famotidine is preferred over cimetidine due to fewer drug interactions and no anti-androgenic effects",
      "H2RAs are less potent than PPIs because they block only one of three acid-stimulating pathways",
      "Tolerance develops with chronic H2RA use; this does not occur with PPIs",
      "Ranitidine (Zantac) was withdrawn from many markets due to NDMA carcinogen contamination concerns"
    ],
    quiz: [
      {
        question: "A male client taking cimetidine reports breast enlargement and tenderness. What is the most likely explanation?",
        options: [
          "Allergic reaction to cimetidine",
          "Anti-androgenic effects of cimetidine",
          "Hepatic failure from cimetidine toxicity",
          "Interaction with another medication"
        ],
        correct: 1,
        rationale: "Cimetidine has anti-androgenic properties; it inhibits dihydrotestosterone binding and increases serum estradiol. This can cause gynecomastia and impotence. The nurse should report this finding and anticipate switching to famotidine."
      }
    ]
  },

  "proton-pump-inhibitors": {
    title: "Proton Pump Inhibitors (PPIs)",
    cellular: {
      title: "PPIs - Omeprazole, Pantoprazole & Irreversible H⁺/K⁺-ATPase Inhibition",
      content:
        "Proton pump inhibitors (PPIs) are the most potent class of acid-suppressive medications, irreversibly inhibiting the hydrogen-potassium ATPase enzyme system (H⁺/K⁺-ATPase, or 'proton pump') on the apical membrane of gastric parietal cells. The proton pump is the final common pathway for all acid secretion, regardless of the stimulating mediator (histamine, acetylcholine, or gastrin). By covalently binding to cysteine residues on the alpha subunit of the proton pump, PPIs provide sustained acid suppression until new pump molecules are synthesized (half-life of pump turnover is approximately 18 hours).\n\nPPIs are prodrugs that require activation in an acidic environment. After oral absorption, they are distributed to parietal cells and accumulate in the acidic secretory canaliculi (pH ~ 1), where they are protonated and converted to their active sulfenamide form. This activated molecule then forms a disulfide bond with the proton pump, irreversibly inactivating it. Because only actively secreting pumps are inhibited, PPIs are most effective when taken 30-60 minutes before the first meal of the day, when fasting parietal cells are transitioning to active acid secretion. Maximum acid suppression requires 3-5 days of therapy as successive generations of pumps are inactivated.\n\nLong-term PPI use (> 1 year) is associated with several concerning adverse effects: increased risk of Clostridioides difficile infection (reduced gastric acid barrier), hypomagnesemia, vitamin B12 deficiency (acid-dependent absorption), calcium malabsorption leading to osteoporotic fractures (especially hip, wrist, spine), chronic kidney disease, and rebound acid hypersecretion upon discontinuation. Common PPIs include omeprazole (Prilosec), esomeprazole (Nexium), pantoprazole (Protonix), and lansoprazole (Prevacid)."
    },
    riskFactors: [
      "Long-term use > 1 year (increased complication risk)",
      "Elderly clients (higher osteoporotic fracture risk)",
      "Concurrent clopidogrel use; omeprazole inhibits CYP2C19-mediated activation of clopidogrel",
      "Renal impairment (increased risk of interstitial nephritis)",
      "Hypomagnesemia risk with concurrent diuretics",
      "Immunocompromised clients (C. difficile risk increased)"
    ],
    diagnostics: [
      "Monitor symptom relief (heartburn, regurgitation) after 4-8 weeks of therapy",
      "Serum magnesium levels with long-term use (especially if concurrent diuretics)",
      "Vitamin B12 levels annually with chronic use (> 2 years)",
      "Bone density screening (DEXA) for high-risk clients on long-term therapy",
      "Renal function monitoring for interstitial nephritis"
    ],
    management: [
      "Take 30-60 minutes before the first meal of the day on an empty stomach",
      "Standard course: 4-8 weeks for peptic ulcer disease; 8 weeks for GERD",
      "Evaluate need for continued therapy regularly; use lowest effective dose for shortest duration",
      "Taper gradually if discontinuing long-term therapy to prevent rebound acid hypersecretion",
      "Triple therapy for H. pylori: PPI + clarithromycin + amoxicillin (or metronidazole) × 14 days"
    ],
    nursingActions: [
      "Administer as ordered 30-60 minutes before breakfast; do not crush enteric-coated formulations",
      "Monitor for signs of hypomagnesemia: muscle cramps, tremors, cardiac arrhythmias",
      "Educate client on long-term risks: bone fractures, B12 deficiency, C. difficile infection",
      "Report new-onset diarrhea (especially watery, foul-smelling); may indicate C. difficile",
      "Monitor for drug interactions: PPIs reduce absorption of ketoconazole, iron, and calcium",
      "Do not abruptly discontinue long-term PPI therapy; taper as ordered"
    ],
    signs: {
      left: [
        "Headache, nausea, diarrhea, abdominal pain (common, usually mild)",
        "Flatulence and abdominal distension",
        "Hypomagnesemia: muscle cramps, tremor, seizures",
        "Vitamin B12 deficiency: paresthesias, fatigue, glossitis"
      ],
      right: [
        "C. difficile colitis: watery diarrhea, fever, abdominal pain",
        "Osteoporotic fractures (hip, wrist, spine) with long-term use",
        "Acute interstitial nephritis: fever, rash, elevated creatinine",
        "Rebound acid hypersecretion upon abrupt discontinuation"
      ]
    },
    medications: [
      {
        name: "Omeprazole (Prilosec)",
        type: "Proton pump inhibitor",
        action: "Irreversibly inhibits H⁺/K⁺-ATPase on parietal cell apical membrane, blocking the final step of acid secretion regardless of stimulus; most effective acid suppression available",
        sideEffects: "Headache, diarrhea, nausea, hypomagnesemia, B12 deficiency, increased fracture risk",
        contra: "Concurrent rilpivirine, CYP2C19-dependent medications (clopidogrel interaction)",
        pearl: "Inhibits CYP2C19; can reduce clopidogrel activation; pantoprazole or lansoprazole preferred in clients taking clopidogrel"
      },
      {
        name: "Pantoprazole (Protonix)",
        type: "Proton pump inhibitor",
        action: "Irreversibly inhibits the gastric proton pump (H⁺/K⁺-ATPase); available in IV formulation for clients unable to take oral medications",
        sideEffects: "Headache, diarrhea, injection site reactions (IV), hypomagnesemia",
        contra: "Hypersensitivity to benzimidazole class",
        pearl: "Preferred PPI when IV administration is needed (e.g., active GI bleeding); has less CYP2C19 interaction than omeprazole; safer with clopidogrel"
      }
    ],
    pearls: [
      "PPIs must be taken 30-60 minutes before meals; the pump must be actively secreting acid for the drug to work",
      "Omeprazole reduces clopidogrel effectiveness; use pantoprazole instead in cardiac clients",
      "Taper PPIs gradually after long-term use to prevent rebound acid hypersecretion",
      "PPIs are more potent than H2RAs because they block the final common pathway of all acid secretion"
    ],
    quiz: [
      {
        question: "A client on long-term omeprazole therapy develops muscle cramps and cardiac arrhythmias. Which electrolyte should the nurse check first?",
        options: [
          "Serum sodium",
          "Serum potassium",
          "Serum magnesium",
          "Serum calcium"
        ],
        correct: 2,
        rationale: "Long-term PPI use can cause hypomagnesemia, presenting with muscle cramps, tremors, seizures, and cardiac arrhythmias. The nurse should check serum magnesium and report the finding to the provider."
      }
    ]
  },

  "antiemetics": {
    title: "Antiemetics",
    cellular: {
      title: "Antiemetics - Ondansetron, Metoclopramide, Promethazine & Receptor Targets",
      content:
        "Antiemetic medications target specific receptors involved in the emetic reflex arc to prevent or treat nausea and vomiting. The vomiting center in the medulla oblongata receives input from four main areas: the chemoreceptor trigger zone (CTZ) in the area postrema (outside the blood-brain barrier, sensitive to toxins and drugs), the vestibular system (motion-related inputs via histamine H1 and muscarinic receptors), the GI tract (vagal afferents with serotonin 5-HT3 receptors), and higher cortical centers (anticipatory nausea via memory and anxiety pathways). Effective antiemetic therapy requires matching the drug's receptor target to the emetic stimulus.\n\nOndansetron (Zofran) is a selective 5-HT3 receptor antagonist that blocks serotonin binding on vagal afferents in the GI tract and in the CTZ. It is the first-line antiemetic for chemotherapy-induced and postoperative nausea and vomiting (PONV). Serotonin is released from enterochromaffin cells in the GI mucosa when damaged by chemotherapy, surgery, or radiation; ondansetron blocks this signal before it reaches the vomiting center. Metoclopramide (Reglan) is a dopamine D2 antagonist and weak 5-HT3 antagonist that also has prokinetic effects, accelerating gastric emptying by increasing gastric motility. Its dopamine-blocking action carries a risk of extrapyramidal symptoms (EPS) and tardive dyskinesia with chronic use.\n\nPromethazine (Phenergan) is a first-generation antihistamine (H1 blocker) with anticholinergic properties that is effective for motion sickness and postoperative nausea. However, it carries significant risks including severe tissue injury from IV extravasation (can cause gangrene), excessive sedation, and respiratory depression; the FDA has a boxed warning against IV use in children under 2. Other antiemetic classes include anticholinergics (scopolamine; transdermal for motion sickness), NK1 receptor antagonists (aprepitant; for highly emetogenic chemotherapy), and cannabinoids (dronabinol; appetite stimulation and chemotherapy-related nausea)."
    },
    riskFactors: [
      "QT prolongation risk with ondansetron (especially at high IV doses)",
      "Extrapyramidal symptoms with metoclopramide (especially in young women and elderly)",
      "Tissue necrosis with promethazine IV extravasation",
      "Excessive sedation with promethazine and first-generation antihistamines",
      "Concurrent use of CNS depressants enhances sedation risk",
      "Pheochromocytoma (metoclopramide can cause hypertensive crisis)"
    ],
    diagnostics: [
      "ECG monitoring for QT interval with ondansetron use (especially IV)",
      "Monitor for extrapyramidal symptoms with metoclopramide: dystonia, akathisia, parkinsonism",
      "Assess IV site patency before promethazine administration",
      "Neurological assessment for tardive dyskinesia with chronic metoclopramide use"
    ],
    management: [
      "Match antiemetic to emetic stimulus: 5-HT3 antagonists for chemotherapy/postop; anticholinergics for motion sickness",
      "Ondansetron: 4-8 mg IV or PO every 8 hours; premedicate before chemotherapy",
      "Metoclopramide: limit use to < 12 weeks to reduce tardive dyskinesia risk",
      "Promethazine: prefer deep IM injection over IV; never administer intra-arterially",
      "Combination therapy for highly emetogenic chemotherapy: ondansetron + dexamethasone + aprepitant"
    ],
    nursingActions: [
      "Administer ondansetron as ordered; monitor ECG for QT prolongation in high-risk clients",
      "Assess IV site patency before administering promethazine IV; dilute and administer slowly",
      "Monitor for EPS with metoclopramide: report dystonia, restlessness, involuntary movements",
      "Implement fall precautions with sedating antiemetics (promethazine, meclizine)",
      "Administer diphenhydramine as ordered for acute EPS reactions (metoclopramide)",
      "Educate client to avoid driving or operating machinery with sedating antiemetics"
    ],
    signs: {
      left: [
        "Ondansetron: headache, constipation, fatigue",
        "Metoclopramide: drowsiness, restlessness, diarrhea",
        "Promethazine: sedation, dry mouth, blurred vision",
        "Scopolamine: dry mouth, urinary retention, blurred vision"
      ],
      right: [
        "QT prolongation with ondansetron (risk of torsades de pointes)",
        "Extrapyramidal symptoms with metoclopramide: acute dystonia, tardive dyskinesia",
        "Tissue necrosis/gangrene from promethazine IV extravasation",
        "Serotonin syndrome if ondansetron combined with SSRIs/MAOIs"
      ]
    },
    medications: [
      {
        name: "Ondansetron (Zofran)",
        type: "Selective 5-HT3 receptor antagonist",
        action: "Blocks serotonin receptors in the CTZ and on peripheral vagal nerve terminals in the GI tract, interrupting the emetic reflex arc",
        sideEffects: "Headache, constipation, QT prolongation, fatigue",
        contra: "Congenital long QT syndrome, concurrent QT-prolonging drugs, apomorphine use",
        pearl: "First-line for chemotherapy-induced and postoperative nausea; maximum single IV dose of 16 mg to reduce QT prolongation risk"
      },
      {
        name: "Metoclopramide (Reglan)",
        type: "Dopamine D2 antagonist / prokinetic agent",
        action: "Blocks dopamine D2 receptors in the CTZ (antiemetic effect) and enhances acetylcholine release in the GI tract (prokinetic effect), accelerating gastric emptying",
        sideEffects: "Drowsiness, EPS (dystonia, akathisia), tardive dyskinesia, galactorrhea (hyperprolactinemia)",
        contra: "GI obstruction or perforation, pheochromocytoma, seizure disorder, concurrent drugs causing EPS",
        pearl: "Black box warning for tardive dyskinesia with use > 12 weeks; administer diphenhydramine for acute dystonic reactions"
      }
    ],
    pearls: [
      "Ondansetron does not cause sedation or EPS; it is the safest first-line antiemetic for most indications",
      "Promethazine IV extravasation can cause tissue necrosis; always verify IV patency; IM route preferred",
      "Metoclopramide is both an antiemetic AND a prokinetic; useful in gastroparesis but limit to < 12 weeks",
      "Treat acute EPS from metoclopramide or promethazine with IV diphenhydramine (Benadryl)"
    ],
    quiz: [
      {
        question: "A client receiving metoclopramide develops sudden neck stiffness, involuntary upward eye deviation, and jaw clenching. What should the nurse administer as ordered?",
        options: [
          "Naloxone (Narcan)",
          "Diphenhydramine (Benadryl)",
          "Ondansetron (Zofran)",
          "Lorazepam (Ativan)"
        ],
        correct: 1,
        rationale: "The symptoms describe an acute dystonic reaction (extrapyramidal symptom) from dopamine D2 blockade by metoclopramide. Diphenhydramine (anticholinergic) is administered to restore dopamine-acetylcholine balance and rapidly resolves the dystonia."
      }
    ]
  },

  "laxatives": {
    title: "Laxatives",
    cellular: {
      title: "Laxatives - Osmotic, Stimulant, Bulk-Forming & Stool Softeners",
      content:
        "Laxatives are medications that promote bowel movements through various mechanisms, classified into four main categories based on their mode of action. Bulk-forming laxatives (psyllium, methylcellulose) are the most physiologically similar to dietary fiber; they absorb water in the intestinal lumen, increasing fecal bulk and stimulating peristalsis through mechanoreceptor activation. They are the safest laxative category and are recommended as first-line therapy for chronic constipation, but require adequate fluid intake (8-10 glasses/day) to prevent intestinal obstruction.\n\nOsmotic laxatives (polyethylene glycol [PEG 3350/MiraLAX], magnesium hydroxide [Milk of Magnesia], lactulose) draw water into the intestinal lumen through osmotic gradients, softening stool and increasing intraluminal volume. PEG 3350 is an inert, non-absorbable polymer that is the preferred osmotic agent for chronic constipation due to predictable dose-response and minimal electrolyte disturbance. Lactulose is an osmotic laxative also used to reduce ammonia levels in hepatic encephalopathy; colonic bacteria ferment it to organic acids that lower pH and trap ammonia as ammonium ions. Magnesium-containing laxatives must be used cautiously in renal impairment due to magnesium accumulation risk.\n\nStimulant laxatives (bisacodyl, senna/sennosides) directly stimulate myenteric plexus neurons in the colonic wall, increasing peristaltic contractions and inhibiting water and electrolyte reabsorption. They are potent and rapid-acting but should not be used long-term due to risk of melanosis coli (benign pigmentation of colonic mucosa), electrolyte imbalances (hypokalemia), and cathartic colon (dependence with diminished colonic motility). Stool softeners (docusate sodium) are surfactants that lower surface tension of stool, allowing water and fat penetration; they are preventive agents, not effective for established constipation."
    },
    riskFactors: [
      "Chronic stimulant laxative use leading to cathartic colon and dependence",
      "Inadequate fluid intake with bulk-forming laxatives (impaction/obstruction risk)",
      "Electrolyte imbalances: hypokalemia (stimulant laxatives), hypermagnesemia (Mg-containing osmotic laxatives)",
      "Renal impairment (magnesium-containing laxative contraindicated)",
      "Bowel obstruction or undiagnosed abdominal pain (all laxatives contraindicated)",
      "Elderly clients at higher risk of dehydration and electrolyte disturbances"
    ],
    diagnostics: [
      "Serum electrolytes: potassium, magnesium, sodium, phosphorus",
      "Renal function (BUN, creatinine) before magnesium-containing laxatives",
      "Abdominal X-ray if obstruction suspected (before initiating laxatives)",
      "Bristol Stool Form Scale to guide therapy adjustments"
    ],
    management: [
      "First-line: lifestyle modifications; high-fiber diet (25-35 g/day), adequate fluids (8-10 glasses/day), regular exercise",
      "Bulk-forming laxatives (psyllium) as first pharmacologic therapy for chronic constipation",
      "Osmotic laxatives (PEG 3350) for chronic constipation unresponsive to fiber",
      "Stimulant laxatives (bisacodyl, senna) for short-term use or acute constipation; not daily",
      "Stool softeners (docusate) for prevention in post-surgical clients or those on opioids",
      "Address underlying cause: medications (opioids), metabolic (hypothyroidism), structural (obstruction)"
    ],
    nursingActions: [
      "Administer bulk-forming laxatives with a full glass of water (240 mL minimum) to prevent obstruction",
      "Educate client that stool softeners prevent hard stools but do not treat established constipation",
      "Monitor for electrolyte imbalances with stimulant and osmotic laxatives: hypokalemia, dehydration",
      "Report absence of bowel movement for > 3 days despite laxative therapy",
      "Educate client to avoid chronic stimulant laxative use; risk of bowel dependence",
      "Monitor strict intake and output in clients receiving bowel preparation regimens"
    ],
    signs: {
      left: [
        "Bulk-forming: bloating, flatulence, obstruction if taken with insufficient fluid",
        "Osmotic: bloating, cramping, flatulence, watery diarrhea with overuse",
        "Stimulant: abdominal cramping, diarrhea, melanosis coli",
        "Stool softener: mild cramping, throat irritation (liquid forms)"
      ],
      right: [
        "Hypokalemia (stimulant laxatives): muscle weakness, cardiac arrhythmias",
        "Hypermagnesemia (Mg-based osmotics in renal failure): hypotension, respiratory depression",
        "Cathartic colon (chronic stimulant use): loss of normal colonic motility",
        "Dehydration and metabolic alkalosis with chronic laxative abuse"
      ]
    },
    medications: [
      {
        name: "Polyethylene glycol 3350 (MiraLAX)",
        type: "Osmotic laxative",
        action: "Retains water in the intestinal lumen through osmotic effect, increasing stool water content and volume; does not ferment (less gas than lactulose) and does not cause electrolyte shifts",
        sideEffects: "Bloating, cramping, nausea, diarrhea with excessive dosing",
        contra: "Known or suspected bowel obstruction, GI perforation",
        pearl: "Preferred osmotic laxative for chronic constipation; dissolve in 8 oz liquid; onset 1-3 days; safe for long-term use"
      },
      {
        name: "Bisacodyl (Dulcolax)",
        type: "Stimulant laxative",
        action: "Directly stimulates sensory nerve endings in the colonic mucosa and myenteric plexus, increasing peristaltic contractions; also inhibits water and electrolyte reabsorption in the colon",
        sideEffects: "Abdominal cramping, diarrhea, electrolyte depletion (hypokalemia), melanosis coli",
        contra: "Acute abdomen, bowel obstruction, dehydration, active inflammatory bowel disease",
        pearl: "Do not crush enteric-coated tablets; do not take within 1 hour of antacids or milk (premature coating dissolution causes gastric irritation)"
      }
    ],
    pearls: [
      "Bulk-forming laxatives MUST be taken with adequate fluid; can cause esophageal or intestinal obstruction if taken dry",
      "Stool softeners are preventive agents; they are not effective for treating existing constipation",
      "Stimulant laxatives should not be used long-term; can lead to cathartic colon and laxative dependence",
      "Never give laxatives to clients with undiagnosed abdominal pain; may mask surgical abdomen"
    ],
    quiz: [
      {
        question: "A client takes psyllium (Metamucil) with only a sip of water. What complication should the nurse be most concerned about?",
        options: [
          "Diarrhea",
          "Esophageal or intestinal obstruction",
          "Hyperkalemia",
          "Rebound constipation"
        ],
        correct: 1,
        rationale: "Bulk-forming laxatives absorb water and expand in the GI tract. Without adequate fluid (at least a full glass of water, 240 mL), psyllium can form a gelatinous mass that causes esophageal or intestinal obstruction. Always administer with a full glass of water."
      }
    ]
  },

  "antidiarrheals": {
    title: "Antidiarrheals",
    cellular: {
      title: "Antidiarrheals - Loperamide, Bismuth Subsalicylate & MOA",
      content:
        "Antidiarrheal medications reduce stool frequency and volume through different mechanisms depending on the drug class. Loperamide (Imodium) is a synthetic opioid that acts on mu-opioid receptors in the myenteric plexus of the intestinal wall. Unlike other opioids, loperamide does not cross the blood-brain barrier at therapeutic doses (it is a substrate for P-glycoprotein efflux pumps that actively transport it out of the CNS), so it provides peripheral antidiarrheal effects without central analgesic or euphoric properties. It decreases intestinal motility, increases transit time, and enhances water and electrolyte absorption from the intestinal lumen.\n\nBismuth subsalicylate (Pepto-Bismol) has multiple mechanisms of action: it reduces intestinal secretion through antiprostaglandin effects, has mild antimicrobial activity against pathogenic bacteria (including Helicobacter pylori), and provides a protective coating on the intestinal mucosa. In the acidic gastric environment, bismuth subsalicylate is hydrolyzed to bismuth (which has topical antimicrobial and anti-inflammatory effects) and salicylate (which is absorbed systemically). This salicylate component is clinically significant; it can cause salicylism in overdose and has the same contraindications as aspirin.\n\nImportant clinical considerations include: loperamide should NOT be used in infectious diarrhea with bloody stools or high fever (C. difficile, Shigella, E. coli O157:H7) because slowing motility traps toxins in the colon and increases the risk of toxic megacolon. Bismuth subsalicylate causes harmless black discoloration of the tongue and stool; educate clients to prevent unnecessary alarm. Neither agent should be used for more than 48 hours without medical evaluation, as persistent diarrhea may indicate an underlying condition requiring specific treatment."
    },
    riskFactors: [
      "Loperamide misuse/overdose (may cause QT prolongation, cardiac arrhythmias, and death at supratherapeutic doses)",
      "Use in infectious diarrhea with fever/bloody stools (risk of toxic megacolon)",
      "Salicylate sensitivity or aspirin allergy (bismuth subsalicylate)",
      "Concurrent anticoagulant therapy (bismuth subsalicylate has salicylate effects)",
      "Children under 2 years (loperamide) or children/teens with viral illness (bismuth; Reye syndrome risk)",
      "Renal impairment (salicylate accumulation with bismuth subsalicylate)"
    ],
    diagnostics: [
      "Stool studies before initiating antidiarrheals: culture, ova and parasites, C. difficile toxin",
      "Electrolytes: monitor for dehydration, hypokalemia, metabolic acidosis",
      "CBC: assess for leukocytosis (infectious etiology)",
      "Assess stool character: bloody or mucoid stools contraindicate loperamide"
    ],
    management: [
      "Address underlying cause: rehydration (oral rehydration solution or IV fluids) is the priority",
      "Loperamide: 4 mg initially, then 2 mg after each loose stool (max 16 mg/day)",
      "Bismuth subsalicylate: 524 mg every 30-60 minutes as needed (max 8 doses/24 hours)",
      "Do not use antidiarrheals for more than 48 hours without medical evaluation",
      "For infectious diarrhea: treat the infection, not the symptom (avoid loperamide)"
    ],
    nursingActions: [
      "Assess stool frequency, consistency, and presence of blood or mucus before administering antidiarrheals",
      "Do NOT administer loperamide if client has bloody diarrhea, high fever, or suspected C. difficile; report to provider",
      "Monitor for dehydration: skin turgor, mucous membranes, urine output, vital signs",
      "Educate client that bismuth subsalicylate causes harmless black tongue and black stools",
      "Monitor for loperamide toxicity at high doses: abdominal distension, constipation, ileus",
      "Report diarrhea persisting > 48 hours despite treatment"
    ],
    signs: {
      left: [
        "Loperamide: constipation, abdominal cramps, drowsiness, dry mouth",
        "Bismuth subsalicylate: black tongue and stools (harmless), nausea",
        "Dehydration from ongoing fluid losses: thirst, dry mucous membranes",
        "Electrolyte imbalances: weakness, muscle cramps"
      ],
      right: [
        "Loperamide overdose: paralytic ileus, QT prolongation, ventricular arrhythmias",
        "Salicylism from bismuth: tinnitus, nausea, vomiting, confusion",
        "Toxic megacolon if loperamide used in invasive infectious diarrhea",
        "Reye syndrome risk with bismuth in children with viral illness"
      ]
    },
    medications: [
      {
        name: "Loperamide (Imodium)",
        type: "Peripheral opioid receptor agonist (antidiarrheal)",
        action: "Activates mu-opioid receptors in the intestinal myenteric plexus, slowing peristalsis, increasing intestinal transit time, and enhancing water and electrolyte reabsorption; does not cross blood-brain barrier at therapeutic doses",
        sideEffects: "Constipation, abdominal cramps, dizziness, nausea; overdose: QT prolongation, cardiac arrest",
        contra: "Bloody diarrhea, bacterial enterocolitis (C. difficile, Shigella), abdominal distension, children < 2 years",
        pearl: "Do NOT use for infectious diarrhea with blood or fever; trapping toxin-producing bacteria increases risk of toxic megacolon and systemic toxicity"
      },
      {
        name: "Bismuth subsalicylate (Pepto-Bismol)",
        type: "Antisecretory/antimicrobial antidiarrheal",
        action: "Reduces intestinal secretion (antiprostaglandin effect), provides antimicrobial activity against enteric pathogens, and coats intestinal mucosa; hydrolyzed to bismuth and salicylate in the GI tract",
        sideEffects: "Black tongue and stools, nausea, constipation, tinnitus (salicylism at high doses)",
        contra: "Aspirin/salicylate allergy, children with viral infections (Reye syndrome risk), concurrent anticoagulant therapy",
        pearl: "Contains salicylate; has same contraindications as aspirin; warn clients about harmless black discoloration of tongue and stool"
      }
    ],
    pearls: [
      "Never give loperamide for bloody diarrhea or suspected C. difficile; slowing motility traps toxins and worsens disease",
      "Bismuth subsalicylate = salicylate; avoid in aspirin allergy, children with viral illness, and concurrent anticoagulation",
      "Rehydration is always the priority in diarrheal illness; antidiarrheals address symptoms, not the cause",
      "Loperamide overdose is a growing concern; high doses cause fatal cardiac arrhythmias (QT prolongation)"
    ],
    quiz: [
      {
        question: "A client with C. difficile infection and bloody diarrhea asks for loperamide. What is the nurse's best response?",
        options: [
          "Administer loperamide as requested for comfort",
          "Explain that loperamide is contraindicated because it can worsen C. difficile infection",
          "Give half the normal loperamide dose",
          "Substitute bismuth subsalicylate instead"
        ],
        correct: 1,
        rationale: "Loperamide is contraindicated in C. difficile infection because slowing intestinal motility traps the toxin in the colon, increasing the risk of toxic megacolon and systemic toxicity. The nurse should explain this and report the request to the provider."
      }
    ]
  },

  "hepatic-encephalopathy-meds": {
    title: "Hepatic Encephalopathy Medications",
    cellular: {
      title: "Hepatic Encephalopathy Meds - Lactulose, Rifaximin & Ammonia Reduction",
      content:
        "Hepatic encephalopathy (HE) is a neuropsychiatric syndrome resulting from the accumulation of neurotoxins, primarily ammonia (NH₃), in the systemic circulation due to impaired hepatic clearance. In a healthy liver, ammonia generated from protein metabolism, bacterial urease activity in the colon, and glutamine deamination in enterocytes is converted to urea via the urea cycle and excreted by the kidneys. In cirrhosis, two mechanisms cause hyperammonemia: decreased hepatocyte urea cycle function, and portosystemic shunting that diverts portal blood (containing ammonia from the GI tract) directly into the systemic circulation, bypassing hepatic detoxification.\n\nAt the cellular level, ammonia crosses the blood-brain barrier and is metabolized by astrocytes using glutamine synthetase to convert glutamate + ammonia → glutamine. Accumulation of glutamine within astrocytes creates an osmotic gradient, causing astrocyte swelling (Alzheimer type II astrocytosis) and cerebral edema. This leads to increased intracranial pressure, impaired neurotransmission, altered cerebral blood flow, and the clinical manifestations of HE; ranging from subtle cognitive impairment (minimal HE) through confusion, asterixis, and somnolence to coma (West Haven Grade IV). Precipitating factors include GI bleeding (protein load), infection, constipation, hypokalemia, alkalosis (favors NH₃ over NH₄⁺, increasing CNS penetration), sedative use, and dehydration.\n\nLactulose and rifaximin are the mainstays of HE treatment and prevention. Lactulose is a non-absorbable synthetic disaccharide that is fermented by colonic bacteria to lactic, acetic, and formic acids, lowering colonic pH. The acidic environment converts ammonia (NH₃, which is absorbable) to ammonium (NH₄⁺, which is not absorbable), trapping it in the colonic lumen for fecal excretion. Additionally, the osmotic laxative effect increases fecal ammonia elimination. Rifaximin is a non-absorbable antibiotic (rifamycin derivative) that reduces ammonia-producing gut bacteria without significant systemic absorption or resistance development."
    },
    riskFactors: [
      "Cirrhosis with portosystemic shunting (most common setting)",
      "GI bleeding (blood protein digestion increases ammonia production)",
      "Infection/sepsis (increased catabolism and ammonia production)",
      "Constipation (increased ammonia absorption from prolonged colonic contact)",
      "Hypokalemia and metabolic alkalosis (favor NH₃ form that crosses blood-brain barrier)",
      "High dietary protein intake (excessive amino acid deamination)",
      "Sedatives, opioids, and benzodiazepines (decrease CNS function, worsen HE)",
      "TIPS procedure (increases portosystemic shunting)"
    ],
    diagnostics: [
      "Clinical assessment using West Haven criteria: Grade 0 (minimal HE) through Grade IV (coma)",
      "Serum ammonia level: elevated, though levels correlate poorly with clinical severity",
      "Asterixis (flapping tremor) assessment: hallmark finding of Grade II-III HE",
      "Number connection test or Stroop test for minimal HE detection",
      "Evaluate precipitating factors: CBC, CMP (potassium, BUN), blood cultures, stool guaiac",
      "CT head to rule out structural causes (subdural hematoma, stroke) if presentation is atypical"
    ],
    management: [
      "Lactulose: titrate to 2-3 soft bowel movements per day (usual dose 15-30 mL PO 2-3 times daily)",
      "Rifaximin 550 mg PO twice daily as adjunctive therapy to lactulose for HE prevention",
      "Identify and treat precipitating factors: infection, GI bleeding, electrolyte imbalances, constipation",
      "Protein restriction only in acute, severe episodes (1.2-1.5 g/kg/day otherwise to prevent sarcopenia)",
      "Lactulose enemas (300 mL in 700 mL water) for clients unable to take oral medications",
      "Zinc supplementation (zinc is a cofactor in urea cycle enzymes)"
    ],
    nursingActions: [
      "Administer lactulose as ordered; titrate to achieve 2-3 soft stools per day",
      "Monitor level of consciousness using standardized scales (West Haven, Glasgow Coma Scale)",
      "Assess for asterixis: have client extend arms with wrists dorsiflexed and fingers spread",
      "Implement safety precautions: fall risk, aspiration precautions, bed alarm if confused",
      "Monitor serum ammonia levels, electrolytes (especially potassium), and renal function",
      "Report excessive diarrhea from lactulose; dehydration can paradoxically worsen HE"
    ],
    signs: {
      left: [
        "Grade I: sleep disturbance, shortened attention span, mild confusion",
        "Grade II: lethargy, disorientation, asterixis (flapping tremor)",
        "Grade III: somnolence, marked confusion, incomprehensible speech",
        "Grade IV: coma, unresponsive to painful stimuli"
      ],
      right: [
        "Asterixis (liver flap): involuntary flapping movements with dorsiflexed wrists",
        "Fetor hepaticus: sweet, musty breath odor from dimethyl sulfide",
        "Hyperreflexia progressing to areflexia in advanced stages",
        "Constructional apraxia: inability to draw simple figures (five-pointed star)"
      ]
    },
    medications: [
      {
        name: "Lactulose",
        type: "Osmotic laxative / ammonia-reducing agent",
        action: "Colonic bacteria ferment lactulose to organic acids, lowering colonic pH from ~7 to ~5, converting absorbable ammonia (NH₃) to non-absorbable ammonium (NH₄⁺); osmotic effect increases fecal bulk and accelerates ammonia excretion",
        sideEffects: "Diarrhea, flatulence, abdominal cramping, nausea, electrolyte imbalances (hypokalemia, hyponatremia)",
        contra: "Galactosemia, bowel obstruction",
        pearl: "Titrate to 2-3 soft stools/day; too few = inadequate ammonia clearance, too many = dehydration which WORSENS encephalopathy"
      },
      {
        name: "Rifaximin (Xifaxan)",
        type: "Non-absorbable rifamycin antibiotic",
        action: "Inhibits bacterial RNA synthesis by binding DNA-dependent RNA polymerase; reduces ammonia-producing enteric bacteria in the colon with < 0.4% systemic absorption",
        sideEffects: "Nausea, flatulence, abdominal pain, headache, peripheral edema",
        contra: "Hypersensitivity to rifaximin or rifamycin class; avoid in severe hepatic impairment if not indicated",
        pearl: "Added to lactulose for secondary prevention of HE recurrence; reduces HE episodes by 50%; does not cause significant antibiotic resistance due to minimal absorption"
      }
    ],
    pearls: [
      "Lactulose titration goal: 2-3 soft stools/day; excessive diarrhea causes dehydration and hypokalemia, which worsen HE",
      "Alkalosis promotes HE because NH₃ (crosses blood-brain barrier) predominates over NH₄⁺ in alkaline pH",
      "GI bleeding is a major HE precipitant; blood in the GI tract is a massive protein/ammonia load",
      "Serum ammonia levels correlate poorly with clinical severity; always treat based on clinical assessment",
      "Do NOT chronically restrict dietary protein; this causes sarcopenia and worsens outcomes in cirrhosis"
    ],
    quiz: [
      {
        question: "A client with hepatic encephalopathy is taking lactulose and has had 6 watery stools today. What should the nurse do?",
        options: [
          "Continue the current lactulose dose as prescribed",
          "Administer an additional lactulose dose to further reduce ammonia",
          "Hold lactulose and report to the provider; excessive diarrhea can worsen HE",
          "Increase fluid intake and continue lactulose at the same dose"
        ],
        correct: 2,
        rationale: "The goal is 2-3 soft stools/day. Excessive diarrhea from lactulose causes dehydration, hypokalemia, and metabolic alkalosis; all of which worsen hepatic encephalopathy. The nurse should hold the dose and report to the provider for dose adjustment."
      }
    ]
  },
  "viral-hepatitis": {
    title: "Viral Hepatitis Overview",
    cellular: { title: "Hepatotropic Virus Pathology", content: "Viral hepatitis involves inflammation and necrosis of hepatocytes caused by hepatotropic viruses (A, B, C, D, E). Each virus targets hepatocytes through specific receptors and replicates within the cell. The immune response (cytotoxic T lymphocytes) directed against viral antigens on the hepatocyte surface causes the majority of liver damage, not the virus itself. Hepatocyte necrosis leads to elevated transaminases (ALT > AST), impaired bilirubin conjugation (jaundice), and reduced synthetic function (coagulopathy, hypoalbuminemia). Hepatitis A and E are transmitted fecal-oral and typically cause acute self-limited disease. Hepatitis B and C are bloodborne and can progress to chronic hepatitis, cirrhosis, and hepatocellular carcinoma." },
    riskFactors: ["IV drug use (shared needles - Hep B, C)", "Unprotected sexual contact (Hep B)", "Travel to endemic areas (Hep A, E)", "Contaminated food/water (Hep A, E)", "Healthcare workers (needlestick - Hep B, C)", "Blood transfusion before 1992 (Hep C)", "Perinatal transmission (Hep B)", "Tattoos/body piercings with non-sterile equipment", "Dialysis patients", "Immunocompromised individuals"],
    diagnostics: ["Expect hepatitis panel with serologic markers", "Monitor liver function tests (ALT, AST, bilirubin, albumin)", "Expect coagulation studies (PT/INR)", "Monitor for signs of hepatic failure", "Expect abdominal ultrasound", "Monitor for hepatic encephalopathy signs"],
    management: ["Enforce strict hand hygiene and standard precautions", "Administer hepatitis A and B vaccines as indicated", "Maintain adequate nutrition with small frequent meals", "Avoid hepatotoxic substances (alcohol, acetaminophen)", "Implement contact precautions for Hep A/E (fecal-oral)", "Refer for antiviral treatment (Hep B, C) as ordered"],
    nursingActions: ["Monitor liver function tests trends", "Assess for jaundice (scleral icterus is earliest sign)", "Monitor for coagulopathy (bleeding, bruising)", "Educate on transmission prevention", "Assess nutritional intake and appetite", "Report signs of hepatic encephalopathy (confusion, asterixis)", "Administer prescribed antiemetics for nausea", "Educate about avoiding alcohol and hepatotoxic medications"],
    signs: {
      left: ["Fatigue and Malaise", "Anorexia and Nausea", "Right Upper Quadrant Tenderness", "Low-Grade Fever (Prodromal Phase)"],
      right: ["Jaundice and Scleral Icterus", "Dark Urine (Cola-Colored) and Clay-Colored Stools", "Hepatomegaly with Tenderness", "Coagulopathy (Elevated PT/INR)"]
    },
    medications: [
      { name: "Hepatitis B Vaccine", type: "Immunization", action: "Stimulates anti-HBs antibody production for lifelong immunity", sideEffects: "Injection site soreness, mild fever", contra: "Severe allergic reaction to prior dose or yeast", pearl: "3-dose series (0, 1, 6 months); check anti-HBs titer in healthcare workers to confirm immunity >10 mIU/mL" },
      { name: "Immune Globulin", type: "Passive Immunization", action: "Provides immediate but temporary passive immunity", sideEffects: "Injection site pain, allergic reaction", contra: "IgA deficiency (risk of anaphylaxis)", pearl: "Give within 24 hours of Hep A exposure or within 12 hours of birth for infants of HBsAg+ mothers (with vaccine)" }
    ],
    pearls: [
      "Hep A: fecal-oral, acute only, VACCINE available; Hep B: bloodborne, can become chronic, VACCINE available; Hep C: bloodborne, most common chronic form, NO vaccine, NOW CURABLE with DAAs",
      "ALT is the most specific liver enzyme - 'L for Liver'; ALT > AST suggests viral hepatitis; AST > ALT (2:1 ratio) suggests alcoholic hepatitis",
      "Infants born to HBsAg-positive mothers must receive BOTH hepatitis B vaccine AND hepatitis B immune globulin (HBIG) within 12 hours of birth"
    ],
    quiz: [{
      question: "A patient has positive HBsAg, positive HBeAg, and positive anti-HBc IgM. What does this serologic pattern indicate?",
      options: ["Chronic hepatitis B infection", "Acute hepatitis B infection with high infectivity", "Immunity from vaccination", "Resolved past hepatitis B infection"],
      correct: 1,
      rationale: "HBsAg positive = active infection. Anti-HBc IgM = acute (recent) infection (IgG would indicate chronic or past). HBeAg positive = high viral replication and high infectivity. This combination indicates an acute, highly infectious hepatitis B infection."
    }]
  },
  "hepatitis-c": {
    title: "Hepatitis C",
    cellular: { title: "Chronic Bloodborne Hepatitis", content: "Hepatitis C virus (HCV) is an RNA flavivirus that infects hepatocytes via the CD81 receptor and claudin-1. Unlike hepatitis B, HCV has high mutation rates and lacks a proofreading mechanism, creating viral quasispecies that evade immune detection - this is why no vaccine exists and why chronic infection develops in 75-85% of cases. Chronic HCV triggers persistent low-grade inflammation, stellate cell activation, and progressive fibrosis (F0-F4 staging). Over 20-30 years, 15-30% of chronically infected patients progress to cirrhosis, and 1-5% per year of cirrhotics develop hepatocellular carcinoma (HCC). HCV is now CURABLE with direct-acting antivirals (DAAs)." },
    riskFactors: ["IV drug use (most common route in North America)", "Blood transfusion/organ transplant before 1992", "Needlestick injuries (healthcare workers)", "Birth to HCV-infected mother (5% vertical transmission)", "Intranasal drug use (shared straws)", "Tattoos/piercings with non-sterile equipment", "Incarceration history", "HIV co-infection", "Born between 1945-1965 (baby boomer screening recommendation)", "Hemodialysis"],
    diagnostics: ["Expect anti-HCV antibody test (screening)", "Expect HCV RNA viral load (confirms active infection)", "Expect HCV genotype testing (guides treatment selection)", "Monitor liver function tests", "Expect FibroScan or liver biopsy for fibrosis staging", "Expect hepatic function panel (albumin, bilirubin, INR)", "Screen for HCC with alpha-fetoprotein and ultrasound every 6 months in cirrhotics"],
    management: ["Initiate direct-acting antiviral (DAA) therapy as prescribed", "Treatment duration typically 8-12 weeks", "Avoid alcohol completely", "Avoid hepatotoxic medications (especially acetaminophen >2g/day)", "Screen and vaccinate for hepatitis A and B", "Monitor for drug interactions with DAAs", "Post-treatment: confirm sustained virologic response (SVR) at 12 weeks"],
    nursingActions: ["Educate on medication adherence (missed doses reduce cure rates)", "Teach blood and body fluid precautions", "Assess for medication side effects and drug interactions", "Educate on avoiding alcohol", "Ensure hepatitis A and B vaccination is complete", "Support mental health (depression common with diagnosis)", "Educate on transmission prevention (do not share razors, toothbrushes)", "Monitor for signs of decompensated liver disease"],
    signs: {
      left: ["Often Asymptomatic for Decades", "Fatigue (Most Common Symptom)", "Mild RUQ Discomfort", "Arthralgia and Myalgia"],
      right: ["Jaundice (Advanced Disease)", "Spider Angiomata and Palmar Erythema", "Cryoglobulinemia (Purpura, Arthritis, Neuropathy)", "Hepatocellular Carcinoma (Late Complication)"]
    },
    medications: [
      { name: "Sofosbuvir/Velpatasvir (Epclusa)", type: "Direct-Acting Antiviral (DAA)", action: "Pan-genotypic: Sofosbuvir inhibits NS5B RNA polymerase; Velpatasvir inhibits NS5A protein - blocks viral replication", sideEffects: "Headache, fatigue, nausea", contra: "Co-administration with amiodarone (risk of fatal bradycardia), strong P-gp inducers", pearl: "Pan-genotypic (works for ALL genotypes 1-6); 12-week course; >95% cure rate (SVR12); check for drug interactions especially with PPIs, statins, and HIV medications" },
      { name: "Glecaprevir/Pibrentasvir (Mavyret)", type: "Direct-Acting Antiviral (DAA)", action: "NS3/4A protease inhibitor + NS5A inhibitor; dual-target viral replication blockade", sideEffects: "Headache, fatigue, diarrhea", contra: "Moderate-to-severe hepatic impairment (Child-Pugh B or C), co-administration with atazanavir or rifampin", pearl: "8-week treatment for treatment-naive patients without cirrhosis; pan-genotypic; >97% cure rate" }
    ],
    pearls: [
      "Hepatitis C is now CURABLE - DAAs achieve >95% sustained virologic response (SVR); cure is defined as undetectable HCV RNA 12 weeks after treatment completion",
      "Anti-HCV antibody positive does NOT distinguish active from resolved infection - must confirm with HCV RNA viral load; antibody remains positive for life even after cure",
      "There is NO vaccine for hepatitis C due to the virus's rapid mutation rate - prevention relies entirely on avoiding blood-to-blood contact"
    ],
    quiz: [{
      question: "A patient treated for hepatitis C has undetectable HCV RNA 12 weeks after completing DAA therapy. What does this result indicate?",
      options: ["The patient needs additional treatment cycles", "Sustained virologic response - the patient is cured", "The patient is now immune and cannot be reinfected", "The virus is in remission but may return"],
      correct: 1,
      rationale: "Sustained virologic response at 12 weeks (SVR12) is defined as undetectable HCV RNA 12 weeks after completing treatment. This is considered a virologic cure with >99% durability. However, unlike hepatitis B recovery, HCV cure does NOT confer immunity - patients can be reinfected with new exposure. The anti-HCV antibody remains positive for life (it's a marker of past exposure, not immunity)."
    }]
  },
  "chronic-hepatitis": {
    title: "Chronic Hepatitis",
    cellular: { title: "Persistent Hepatic Inflammation", content: "Chronic hepatitis is defined as persistent hepatic inflammation lasting >6 months, most commonly caused by hepatitis B or C viruses, autoimmune hepatitis, or drug-induced liver injury. Persistent inflammation activates hepatic stellate cells (Ito cells), which transform into myofibroblasts and deposit excessive extracellular matrix (collagen types I and III). This progressive fibrosis distorts hepatic architecture, impairs sinusoidal blood flow, and ultimately leads to cirrhosis. The METAVIR scoring system grades inflammation (A0-A3) and stages fibrosis (F0-F4, where F4 = cirrhosis). Unlike acute hepatitis, chronic hepatitis often presents insidiously with nonspecific symptoms until decompensation occurs." },
    riskFactors: ["Chronic hepatitis B infection (5-10% of adults, 90% of infected neonates)", "Chronic hepatitis C infection (75-85% of acute infections)", "Autoimmune hepatitis (female predominance, associated with other autoimmune diseases)", "Chronic alcohol use", "Non-alcoholic steatohepatitis (NASH/MAFLD)", "Drug-induced hepatotoxicity (methotrexate, isoniazid, statins)", "Wilson disease", "Alpha-1 antitrypsin deficiency", "Hemochromatosis"],
    diagnostics: ["Monitor serial liver function tests (ALT, AST trends over time)", "Expect viral hepatitis serologies and viral loads", "Expect autoimmune markers (ANA, anti-smooth muscle antibody, IgG levels)", "Expect non-invasive fibrosis assessment (FibroScan/elastography)", "Expect liver biopsy for definitive diagnosis and staging", "Monitor alpha-fetoprotein every 6 months (HCC screening)", "Expect metabolic workup (ferritin, ceruloplasmin, A1AT level)"],
    management: ["Treat underlying etiology (antivirals for HBV/HCV, immunosuppression for autoimmune)", "Avoid hepatotoxic substances (alcohol, unnecessary medications)", "Vaccinate against hepatitis A and B if not immune", "Screen for hepatocellular carcinoma every 6 months", "Manage complications of portal hypertension", "Refer for liver transplant evaluation when appropriate", "Encourage Mediterranean-type diet and exercise for NAFLD"],
    nursingActions: ["Monitor liver function trends over time", "Educate on medication adherence for antiviral or immunosuppressive therapy", "Assess for signs of disease progression (jaundice, ascites, encephalopathy)", "Teach about alcohol avoidance", "Ensure vaccination status is current", "Monitor for medication side effects", "Screen for depression (common with chronic liver disease diagnosis)", "Educate on signs requiring immediate medical attention"],
    signs: {
      left: ["Fatigue (Most Common Symptom)", "Mild RUQ Discomfort", "Anorexia and Weight Loss", "Hepatomegaly"],
      right: ["Progressive Jaundice", "Spider Angiomata (Estrogen Metabolism Impairment)", "Palmar Erythema", "Signs of Cirrhosis (Ascites, Varices, Encephalopathy)"]
    },
    medications: [
      { name: "Entecavir/Tenofovir", type: "Antiviral (HBV)", action: "Nucleos(t)ide analogues that suppress HBV DNA replication", sideEffects: "Headache, fatigue; tenofovir: renal toxicity, bone density loss", contra: "Renal impairment (tenofovir); lactic acidosis risk", pearl: "First-line HBV antivirals; do NOT stop abruptly - risk of severe hepatic flare from immune reconstitution" },
      { name: "Prednisone + Azathioprine", type: "Immunosuppressive (Autoimmune Hepatitis)", action: "Suppress the autoimmune attack on hepatocytes", sideEffects: "Infection risk, bone loss, diabetes, myelosuppression", contra: "Active infection, TPMT deficiency (azathioprine)", pearl: "Check TPMT enzyme activity before starting azathioprine; 80% of autoimmune hepatitis patients respond to immunosuppression" }
    ],
    pearls: [
      "Chronic hepatitis is often silent for years - 'the liver suffers in silence'; many patients are diagnosed incidentally through abnormal liver enzymes",
      "NEVER abruptly stop HBV antivirals - withdrawal can trigger a severe hepatitis flare due to immune reconstitution that can lead to liver failure",
      "All patients with chronic hepatitis B or C AND cirrhosis need HCC screening with ultrasound and alpha-fetoprotein every 6 months for life"
    ],
    quiz: [{
      question: "A patient with chronic hepatitis B on entecavir tells the nurse they stopped taking their medication 2 weeks ago because they 'felt fine.' What is the nurse's priority concern?",
      options: ["The patient will develop drug resistance", "The patient is at risk for a severe hepatitis flare from abrupt discontinuation", "The viral load will slowly increase but without immediate danger", "The medication has a long half-life so 2 weeks is not concerning"],
      correct: 1,
      rationale: "Abrupt discontinuation of HBV nucleos(t)ide analogues can trigger a severe hepatitis B flare due to immune reconstitution and rapid viral rebound. The immune system, no longer suppressed by viral suppression, mounts an aggressive response against the rebounding virus, causing massive hepatocyte necrosis. This can lead to acute liver failure and death. The nurse should urgently contact the provider and educate the patient to never stop these medications without medical supervision."
    }]
  }
};
