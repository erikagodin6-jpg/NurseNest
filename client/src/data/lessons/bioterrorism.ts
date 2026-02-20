import type { LessonContent } from "./types";

const smallpox: LessonContent = {
  title: "Smallpox (Variola Virus)",
  cellular: {
    title: "Virology & Pathophysiology",
    content: "Smallpox is caused by the variola virus, a DNA virus of the orthopoxvirus family with a human-only reservoir. Although naturally occurring smallpox has been eradicated, it remains heavily tested because it represents a high-consequence infectious disease, a model for outbreak recognition, a public health emergency scenario, and a bioterrorism-relevant pathogen. Transmission occurs primarily via respiratory droplets during prolonged face-to-face exposure and through contaminated materials. Patients become most contagious with rash onset. After entry, viral replication occurs in respiratory mucosa, followed by systemic dissemination via bloodstream producing widespread endothelial and dermal involvement with characteristic rash formation. The disease begins with a prodromal phase of sudden onset high fever, severe malaise, prostration, headache, and body aches before rash development. The rash follows a highly characteristic centrifugal distribution pattern — beginning on the face and extremities, then spreading centrally. Lesions evolve synchronously: macules → papules → vesicles → pustules → scabs, with ALL lesions at the SAME stage. This synchronous evolution is the crucial differentiator from chickenpox (varicella), where lesions appear in successive crops at DIFFERENT stages simultaneously."
  },
  signs: {
    left: [
      "Prodrome: sudden high fever, severe malaise, prostration, headache",
      "Rash: centrifugal distribution (face/extremities → central)",
      "Lesions evolve synchronously — ALL at same stage",
      "Macules → Papules → Vesicles → Pustules → Scabs",
      "Deep-seated, firm lesions (vs superficial chickenpox)"
    ],
    right: [
      "Encephalitis and secondary bacterial infections",
      "Corneal scarring leading to blindness",
      "Severe scarring and disfigurement",
      "Historically high mortality rates",
      "Public health emergency requiring national/international response"
    ]
  },
  medications: [
    { name: "Smallpox Vaccine (Vaccinia)", type: "Live virus vaccine", action: "Uses related vaccinia virus (NOT variola) to produce immunity; can be used post-exposure", sideEffects: "Local reaction, fever, rare progressive vaccinia in immunocompromised", contra: "Immunocompromised patients, eczema, pregnancy", pearl: "Post-exposure vaccination shortly after exposure may modify or prevent disease — a unique high-yield fact" }
  ],
  pearls: [
    "Smallpox vs Chickenpox: smallpox lesions are synchronous (same stage), chickenpox lesions are in different stages (crops)",
    "Smallpox: centrifugal distribution (face/extremities first); chickenpox: centripetal (trunk first)",
    "Smallpox lesions are deep-seated and firm; chickenpox lesions are superficial",
    "Any suspicion requires immediate isolation and public health notification",
    "Post-exposure vaccination can modify or prevent disease — unique to smallpox",
    "Transmission requires significant exposure, not casual brief contact",
    "Modern cases would trigger national/international emergency response"
  ],
  quiz: [
    { question: "What is the key differentiating feature between smallpox and chickenpox rash?", options: ["Color of lesions", "Smallpox lesions are ALL at the same stage (synchronous); chickenpox has lesions in different stages", "Size of lesions", "Location on the body only"], correct: 1, rationale: "Synchronous lesion evolution is the hallmark of smallpox. All lesions progress through stages together. Chickenpox produces successive crops at different stages simultaneously." },
    { question: "A patient presents with a centrifugal rash distribution (face and extremities predominantly). What type of rash pattern is this consistent with?", options: ["Chickenpox", "Measles", "Smallpox", "Drug reaction"], correct: 2, rationale: "Centrifugal distribution (starting on face/extremities and spreading centrally) is characteristic of smallpox. Chickenpox has centripetal distribution (trunk first)." },
    { question: "What is the priority nursing action if smallpox is suspected?", options: ["Administer antibiotics", "Immediate isolation and public health notification", "Apply calamine lotion", "Discharge with follow-up"], correct: 1, rationale: "Suspected smallpox is a public health emergency requiring immediate strict isolation, infection control measures, and mandatory public health reporting." }
  ]
};

const anthrax: LessonContent = {
  title: "Anthrax (Bacillus anthracis)",
  cellular: {
    title: "Microbiology & Toxin-Mediated Pathology",
    content: "Anthrax is caused by Bacillus anthracis, a gram-positive, spore-forming bacterium. Spores are extremely durable in the environment, found naturally in soil, associated with zoonotic origins (animal products like hides and wool), and produce powerful exotoxins. Anthrax is NOT spread person-to-person — transmission occurs via spore entry through skin (most common), inhalation (most dangerous), or gastrointestinal route (rare). Disease severity is largely toxin-mediated, not simply bacterial invasion. Bacillus anthracis produces edema toxin (causing tissue swelling) and lethal toxin (causing cell death and systemic injury), which disrupt immune response, vascular integrity, and cellular survival. Cutaneous anthrax presents as a painless papule progressing to a vesicle and then ulcer with a classic black necrotic center (eschar) — the painlessness differentiates it from many other infections. Inhalational anthrax is the most dangerous form: early symptoms resemble viral illness (fever, malaise, non-productive cough), then rapidly progresses to severe respiratory distress, hypoxia, shock, and widened mediastinum on imaging (from hemorrhagic mediastinal lymphadenitis). Gastrointestinal anthrax follows ingestion of contaminated material with GI hemorrhage and necrosis."
  },
  signs: {
    left: [
      "Cutaneous: painless papule → vesicle → ulcer with BLACK eschar",
      "Inhalational early: fever, malaise, non-productive cough (flu-like)",
      "Inhalational late: severe respiratory distress, shock, widened mediastinum",
      "GI form: abdominal pain, bloody diarrhea, ascites",
      "NOT spread person-to-person"
    ],
    right: [
      "Inhalational anthrax: rapid catastrophic decline after initial mild phase",
      "Meningitis (hemorrhagic) in severe systemic disease",
      "Multi-organ failure from toxin-mediated damage",
      "Septic shock and cardiovascular collapse",
      "High mortality in inhalational and GI forms without early treatment"
    ]
  },
  medications: [
    { name: "Ciprofloxacin", type: "Fluoroquinolone antibiotic", action: "First-line treatment and post-exposure prophylaxis for anthrax", sideEffects: "Tendon rupture, QT prolongation, CNS effects, photosensitivity", contra: "Pregnancy (relative), children (relative — benefit outweighs risk in anthrax)", pearl: "Treatment must begin BEFORE toxin accumulation — delayed treatment dramatically worsens outcomes" },
    { name: "Anthrax Vaccine", type: "Inactivated vaccine", action: "Pre-exposure immunization for high-risk populations (military, lab workers)", sideEffects: "Local reaction, myalgia, fatigue", contra: "Severe allergic reaction to components", pearl: "Post-exposure prophylaxis combines antibiotics + vaccination for optimal protection" }
  ],
  pearls: [
    "Anthrax is NOT spread person-to-person — spore entry causes disease",
    "Cutaneous hallmark: painless black eschar — painlessness is the differentiator",
    "Inhalational anthrax: mild viral-like onset → catastrophic rapid decline",
    "Widened mediastinum on imaging is a classic exam clue for inhalational anthrax",
    "Disease severity is toxin-mediated — early antibiotic treatment is critical",
    "Suspicious powder exposure scenarios are exam favorites",
    "Public health reporting is mandatory — bioterrorism-relevant pathogen"
  ],
  quiz: [
    { question: "A patient presents with a painless skin lesion with a black necrotic center after handling animal hides. What is the most likely diagnosis?", options: ["Spider bite", "Cutaneous anthrax", "Cellulitis", "Herpes simplex"], correct: 1, rationale: "Painless black eschar after animal product exposure is the classic presentation of cutaneous anthrax. The painlessness differentiates it from most other infections." },
    { question: "A patient with suspected inhalational anthrax initially presents with mild flu-like symptoms. Why is this dangerous?", options: ["It means the disease is mild", "Inhalational anthrax has a biphasic course — mild initial phase rapidly progresses to catastrophic respiratory failure and shock", "Flu-like symptoms always resolve spontaneously", "It indicates immunity"], correct: 1, rationale: "Inhalational anthrax has a deceptive biphasic course. The initial mild phase is followed by rapid catastrophic decline. Treatment must begin before toxin accumulation." },
    { question: "What imaging finding is a classic exam clue for inhalational anthrax?", options: ["Pneumothorax", "Widened mediastinum", "Pleural effusion", "Cardiomegaly"], correct: 1, rationale: "Widened mediastinum results from hemorrhagic mediastinal lymphadenitis — a hallmark radiographic finding in inhalational anthrax." }
  ]
};

export const bioterrorismLessons: Record<string, LessonContent> = {
  "smallpox": smallpox,
  "anthrax": anthrax,
};
