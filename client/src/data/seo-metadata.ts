export interface LocalizedSEOEntry {
  title: string;
  description: string;
  keywords: string;
}

export type SEOLocale = "fr" | "es" | "zh" | "ar" | "hi" | "ko" | "pa" | "vi" | "ht" | "ur" | "ja" | "fa" | "de" | "pt";

const frenchMetadata: Record<string, LocalizedSEOEntry> = {
  "/": {
    title: "NurseNest – Préparation Examen Infirmier | Questions NCLEX & Banque de Questions",
    description: "Préparez vos examens infirmiers avec NurseNest. Accédez à des milliers de questions pratique NCLEX, des simulations cliniques, des cartes mémoire infirmière et des leçons de pathophysiologie. Pour étudiants RPN, RN et NP au Canada et aux États-Unis.",
    keywords: "questions pratique NCLEX, préparation examen infirmier, banque de questions infirmières, cartes mémoire infirmière, révision NCLEX, simulations cliniques, pathophysiologie soins infirmiers, examen infirmier Canada",
  },
  "/pricing": {
    title: "Tarifs & Forfaits | NurseNest – Préparation Examen Infirmier",
    description: "Comparez les forfaits NurseNest pour la préparation aux examens infirmiers. Accès gratuit inclus. Forfaits mensuels abordables avec banque de questions NCLEX, simulations cliniques et cartes mémoire.",
    keywords: "tarifs NurseNest, forfaits préparation NCLEX, prix examen infirmier, abonnement révision NCLEX, préparation examen infirmier prix",
  },
  "/lessons": {
    title: "Leçons Cliniques – Pathophysiologie & Soins Infirmiers | NurseNest",
    description: "Explorez nos leçons cliniques approfondies couvrant la pathophysiologie, la pharmacologie et le raisonnement clinique. Contenu structuré par système corporel pour RPN, RN et NP.",
    keywords: "leçons soins infirmiers, pathophysiologie infirmière, cours cliniques, raisonnement clinique, pharmacologie infirmière, révision NCLEX leçons",
  },
  "/flashcards": {
    title: "Cartes Mémoire Infirmière – Pharmacologie & Révision | NurseNest",
    description: "Étudiez avec des cartes mémoire infirmière vérifiées cliniquement. Pharmacologie, valeurs de laboratoire et pathophysiologie avec modes Apprendre et Test. Créez vos propres paquets.",
    keywords: "cartes mémoire infirmière, flashcards pharmacologie, révision NCLEX cartes, cartes mémoire soins infirmiers, étude infirmière",
  },
  "/mock-exams": {
    title: "Examens Simulés NCLEX – Simulation Chronométrée | NurseNest",
    description: "Simulez les conditions réelles d'examen avec nos examens simulés NCLEX chronométrés. Sélection adaptative de questions, suivi de performance et justifications détaillées.",
    keywords: "examens simulés NCLEX, simulation examen infirmier, examen pratique chronométré, préparation examen infirmier, test blanc NCLEX",
  },
  "/test-bank": {
    title: "Banque de Questions Infirmières – Questions Pratique NCLEX | NurseNest",
    description: "Accédez à notre banque de questions infirmières complète. Filtrez par système corporel, niveau et sujet. Chaque question inclut des justifications détaillées pour la révision NCLEX.",
    keywords: "banque de questions infirmières, questions pratique NCLEX, QCM infirmier, banque de tests soins infirmiers, questions examen infirmier",
  },
  "/question-bank": {
    title: "Banque de Questions Infirmières – Questions Pratique NCLEX | NurseNest",
    description: "Accédez à notre banque de questions infirmières complète. Filtrez par système corporel, niveau et sujet. Chaque question inclut des justifications détaillées pour la révision NCLEX.",
    keywords: "banque de questions infirmières, questions pratique NCLEX, QCM infirmier, banque de tests soins infirmiers, questions examen infirmier",
  },
  "/simulators": {
    title: "Simulateurs Cliniques – Scénarios Interactifs | NurseNest",
    description: "Pratiquez le jugement clinique avec des simulateurs interactifs. Scénarios de patients ramifiés incluant sepsis, infarctus du myocarde, ACD et détérioration du patient.",
    keywords: "simulateurs cliniques infirmiers, simulations patient, jugement clinique, scénarios infirmiers, simulation soins infirmiers",
  },
  "/free-practice": {
    title: "Questions Pratique Gratuites – Révision NCLEX | NurseNest",
    description: "Commencez votre préparation NCLEX avec des questions pratique gratuites. Justifications détaillées, raisonnement clinique et contenu aligné sur l'examen. Aucune carte de crédit requise.",
    keywords: "questions pratique NCLEX gratuites, révision NCLEX gratuite, questions infirmières gratuites, préparation examen infirmier gratuit",
  },
  "/anatomy": {
    title: "Anatomie & Physiologie – Révision Gratuite | NurseNest",
    description: "Maîtrisez l'anatomie et la physiologie avec notre révision gratuite et interactive. Tous les systèmes corporels couverts avec exercices d'étiquetage et contenu éducatif détaillé.",
    keywords: "anatomie physiologie infirmière, révision anatomie gratuite, systèmes corporels, anatomie soins infirmiers, A&P révision",
  },
  "/pre-nursing": {
    title: "Pré-Soins Infirmiers – Fondations & Modules Gratuits | NurseNest",
    description: "Explorez nos modules pré-soins infirmiers gratuits et interactifs. Biologie cellulaire, physiologie, terminologie médicale et bases de pharmacologie pour construire votre fondation clinique.",
    keywords: "pré-soins infirmiers, fondations soins infirmiers, biologie cellulaire infirmière, terminologie médicale, bases pharmacologie",
  },
  "/clinical-clarity": {
    title: "Clarté Clinique – Réponses Basées sur les Preuves | NurseNest",
    description: "Obtenez des réponses claires et basées sur les preuves aux questions cliniques fréquemment échouées aux examens. Contenu fondé sur des données probantes pour étudiants infirmiers.",
    keywords: "clarté clinique infirmière, réponses cliniques, raisonnement clinique, questions fréquentes examen infirmier",
  },
  "/study-plan": {
    title: "Plan d'Étude Personnalisé – Préparation NCLEX | NurseNest",
    description: "Créez votre plan d'étude personnalisé pour la préparation NCLEX. Parcours structuré adapté à votre niveau et vos objectifs d'examen.",
    keywords: "plan d'étude NCLEX, planification révision infirmière, parcours d'étude, programme révision NCLEX",
  },
  "/faq": {
    title: "Questions Fréquentes (FAQ) | NurseNest",
    description: "Trouvez des réponses à vos questions sur NurseNest. Informations sur les abonnements, le contenu éducatif, la préparation aux examens et les fonctionnalités de la plateforme.",
    keywords: "FAQ NurseNest, questions fréquentes, aide NurseNest, support plateforme infirmière",
  },
  "/contact": {
    title: "Contactez-Nous | NurseNest – Support & Questions",
    description: "Contactez l'équipe NurseNest pour toute question, commentaire ou demande de support. Nous sommes là pour vous aider dans votre parcours de préparation aux examens infirmiers.",
    keywords: "contact NurseNest, support NurseNest, aide préparation examen infirmier",
  },
  "/blog": {
    title: "Blog Éducation Clinique – Articles Infirmiers | NurseNest",
    description: "Articles d'éducation clinique fondés sur des preuves. Raisonnement clinique, pathophysiologie, pharmacologie et stratégies de préparation aux examens. Citations APA 7.",
    keywords: "blog infirmier, articles cliniques, éducation infirmière, raisonnement clinique blog, pharmacologie articles",
  },
  "/med-math": {
    title: "Calculs de Médicaments – Pratique Math Infirmière | NurseNest",
    description: "Pratiquez les calculs de dosage et mathématiques médicamenteuses avec des exercices interactifs. Solutions pas à pas et formules essentielles pour les examens infirmiers.",
    keywords: "calculs médicaments infirmier, mathématiques médicales, dosage médicaments, calcul perfusion, math infirmière",
  },
  "/lab-values": {
    title: "Valeurs de Laboratoire – Interprétation Infirmière | NurseNest",
    description: "Maîtrisez l'interprétation des valeurs de laboratoire. Plages normales, signification clinique des résultats anormaux et actions infirmières correspondantes.",
    keywords: "valeurs laboratoire infirmier, interprétation résultats labo, valeurs normales, analyse sanguine infirmière",
  },
  "/question-of-the-day": {
    title: "Question du Jour – Raisonnement Clinique Quotidien | NurseNest",
    description: "Recevez une question de raisonnement clinique quotidienne avec justification détaillée. Maintenez votre routine d'étude pour la préparation NCLEX.",
    keywords: "question du jour NCLEX, question clinique quotidienne, révision quotidienne infirmière, pratique journalière NCLEX",
  },
  "/compare": {
    title: "Comparer les Forfaits – NurseNest vs Alternatives | NurseNest",
    description: "Comparez les forfaits NurseNest et découvrez pourquoi NurseNest offre plus de fonctionnalités à un prix plus abordable que UWorld et Archer pour la préparation NCLEX.",
    keywords: "comparer NurseNest, NurseNest vs UWorld, préparation NCLEX comparaison, meilleure préparation NCLEX prix",
  },
  "/glossary": {
    title: "Glossaire Infirmier – Terminologie Médicale | NurseNest",
    description: "Consultez notre glossaire complet de termes infirmiers et médicaux. Définitions claires pour la terminologie utilisée en soins infirmiers et aux examens.",
    keywords: "glossaire infirmier, terminologie médicale, définitions soins infirmiers, vocabulaire infirmier",
  },
  "/practice-questions": {
    title: "Questions Pratique Gratuites – Révision Infirmière | NurseNest",
    description: "Accédez à des questions pratique gratuites pour la révision infirmière. Contenu aligné sur les examens avec justifications détaillées pour chaque réponse.",
    keywords: "questions pratique gratuites infirmier, révision NCLEX gratuite, questions examen infirmier gratuites",
  },
  "/nclex-rn-practice-questions": {
    title: "Questions Pratique NCLEX-RN – Préparation Examen | NurseNest",
    description: "Préparez le NCLEX-RN avec des questions pratique ciblées. Raisonnement clinique, justifications détaillées et contenu aligné sur les domaines de l'examen.",
    keywords: "questions pratique NCLEX-RN, préparation NCLEX-RN, révision NCLEX-RN, examen RN questions",
  },
  "/nclex-pn-practice-questions": {
    title: "Questions Pratique NCLEX-PN – Préparation Examen | NurseNest",
    description: "Préparez le NCLEX-PN avec des questions pratique adaptées. Contenu RPN/LVN avec justifications cliniques et suivi de performance.",
    keywords: "questions pratique NCLEX-PN, préparation NCLEX-PN, révision RPN, examen PN questions",
  },
  "/rex-pn-practice-questions": {
    title: "Questions Pratique REx-PN – Préparation Examen Canada | NurseNest",
    description: "Préparez le REx-PN avec des questions pratique conçues pour les infirmiers praticiens au Canada. Contenu adapté aux normes canadiennes.",
    keywords: "questions pratique REx-PN, préparation REx-PN Canada, examen RPN Canada, révision REx-PN",
  },
  "/np-exam-practice-questions": {
    title: "Questions Pratique Examen NP – Certification Infirmier Praticien | NurseNest",
    description: "Préparez votre examen de certification NP avec des questions pratique avancées. Contenu AANP et ANCC avec justifications cliniques approfondies.",
    keywords: "questions pratique NP, préparation examen NP, certification infirmier praticien, révision AANP ANCC",
  },
  "/diagnostic-assessment": {
    title: "Évaluation Diagnostique – Testez Votre Niveau | NurseNest",
    description: "Évaluez votre niveau actuel avec notre évaluation diagnostique. Identifiez vos forces et faiblesses pour optimiser votre plan de révision NCLEX.",
    keywords: "évaluation diagnostique infirmier, test de niveau NCLEX, diagnostic préparation examen, évaluation connaissances infirmières",
  },
  "/medication-mastery": {
    title: "Maîtrise des Médicaments – Pharmacologie Infirmière | NurseNest",
    description: "Maîtrisez la pharmacologie infirmière avec nos outils de révision. Classes de médicaments, effets secondaires, contre-indications et calculs de dosage.",
    keywords: "pharmacologie infirmière, maîtrise médicaments, révision pharmacologie NCLEX, classes médicaments infirmier",
  },
  "/lectures": {
    title: "Cours Vidéo – Leçons Cliniques en Vidéo | NurseNest",
    description: "Regardez des cours vidéo sur la pathophysiologie, la pharmacologie et les soins infirmiers. Contenu pédagogique structuré par système corporel et niveau.",
    keywords: "cours vidéo infirmier, leçons vidéo soins infirmiers, pathophysiologie vidéo, cours cliniques en ligne",
  },
  "/nclex-rn-guide": {
    title: "Guide NCLEX-RN – Tout Savoir pour Réussir | NurseNest",
    description: "Guide complet pour réussir le NCLEX-RN. Format d'examen, domaines de contenu, stratégies de préparation et ressources d'étude recommandées.",
    keywords: "guide NCLEX-RN, réussir NCLEX-RN, préparation NCLEX-RN guide, stratégies examen RN",
  },
  "/rex-pn-guide": {
    title: "Guide REx-PN – Préparation Examen Canada | NurseNest",
    description: "Guide complet pour le REx-PN au Canada. Format d'examen, compétences évaluées et stratégies de préparation pour les infirmiers praticiens canadiens.",
    keywords: "guide REx-PN, préparation REx-PN Canada, examen RPN guide, réussir REx-PN",
  },
  "/np-exam-guide": {
    title: "Guide Examen NP – Certification Infirmier Praticien | NurseNest",
    description: "Guide complet pour les examens de certification NP. Couvre les examens AANP, ANCC et les spécialités FNP, AGPCNP, PMHNP et plus.",
    keywords: "guide examen NP, certification infirmier praticien guide, préparation AANP ANCC, réussir examen NP",
  },
  "/pathways": {
    title: "Parcours d'Apprentissage – Progression Structurée | NurseNest",
    description: "Suivez des parcours d'apprentissage structurés pour progresser du niveau fondamental au niveau avancé. Progression guidée pour chaque spécialité infirmière.",
    keywords: "parcours apprentissage infirmier, progression structurée, parcours étude NCLEX, programme révision infirmier",
  },
  "/shop": {
    title: "Boutique – Ressources d'Étude & Packs d'Examen | NurseNest",
    description: "Découvrez nos packs d'examen imprimables, guides d'étude et ressources de révision pour la préparation aux examens infirmiers.",
    keywords: "boutique NurseNest, packs examen infirmier, ressources étude, guides révision NCLEX",
  },
};

const spanishMetadata: Record<string, LocalizedSEOEntry> = {
  "/": {
    title: "NurseNest – Preparación Examen Enfermería | Preguntas NCLEX & Banco de Preguntas",
    description: "Prepárate para tus exámenes de enfermería con NurseNest. Accede a miles de preguntas NCLEX, simulaciones clínicas, tarjetas enfermería y lecciones de fisiopatología. Para estudiantes RPN, RN y NP en Canadá y Estados Unidos.",
    keywords: "preguntas NCLEX, preparación examen enfermería, banco de preguntas enfermería, tarjetas enfermería, repaso NCLEX, simulaciones clínicas, fisiopatología enfermería, examen enfermería",
  },
  "/pricing": {
    title: "Precios & Planes | NurseNest – Preparación Examen Enfermería",
    description: "Compara los planes de NurseNest para la preparación de exámenes de enfermería. Acceso gratuito incluido. Planes mensuales asequibles con banco de preguntas NCLEX, simulaciones clínicas y tarjetas de estudio.",
    keywords: "precios NurseNest, planes preparación NCLEX, costo examen enfermería, suscripción repaso NCLEX, preparación examen enfermería precio",
  },
  "/lessons": {
    title: "Lecciones Clínicas – Fisiopatología & Enfermería | NurseNest",
    description: "Explora nuestras lecciones clínicas detalladas sobre fisiopatología, farmacología y razonamiento clínico. Contenido estructurado por sistema corporal para RPN, RN y NP.",
    keywords: "lecciones enfermería, fisiopatología enfermería, clases clínicas, razonamiento clínico, farmacología enfermería, repaso NCLEX lecciones",
  },
  "/flashcards": {
    title: "Tarjetas de Estudio Enfermería – Farmacología & Repaso | NurseNest",
    description: "Estudia con tarjetas de enfermería verificadas clínicamente. Farmacología, valores de laboratorio y fisiopatología con modos Aprender y Examen. Crea tus propios mazos.",
    keywords: "tarjetas enfermería, flashcards farmacología, repaso NCLEX tarjetas, tarjetas estudio enfermería, estudio enfermería",
  },
  "/mock-exams": {
    title: "Exámenes Simulados NCLEX – Simulación Cronometrada | NurseNest",
    description: "Simula las condiciones reales del examen con nuestros exámenes simulados NCLEX cronometrados. Selección adaptativa de preguntas, seguimiento de rendimiento y justificaciones detalladas.",
    keywords: "exámenes simulados NCLEX, simulación examen enfermería, examen práctico cronometrado, preparación examen enfermería, simulacro NCLEX",
  },
  "/test-bank": {
    title: "Banco de Preguntas Enfermería – Preguntas Práctica NCLEX | NurseNest",
    description: "Accede a nuestro banco de preguntas de enfermería completo. Filtra por sistema corporal, nivel y tema. Cada pregunta incluye justificaciones detalladas para el repaso NCLEX.",
    keywords: "banco de preguntas enfermería, preguntas práctica NCLEX, preguntas examen enfermería, banco de tests enfermería",
  },
  "/question-bank": {
    title: "Banco de Preguntas Enfermería – Preguntas Práctica NCLEX | NurseNest",
    description: "Accede a nuestro banco de preguntas de enfermería completo. Filtra por sistema corporal, nivel y tema. Cada pregunta incluye justificaciones detalladas para el repaso NCLEX.",
    keywords: "banco de preguntas enfermería, preguntas práctica NCLEX, preguntas examen enfermería, banco de tests enfermería",
  },
  "/simulators": {
    title: "Simuladores Clínicos – Escenarios Interactivos | NurseNest",
    description: "Practica el juicio clínico con simuladores interactivos. Escenarios de pacientes ramificados incluyendo sepsis, infarto de miocardio, CAD y deterioro del paciente.",
    keywords: "simuladores clínicos enfermería, simulaciones paciente, juicio clínico, escenarios enfermería, simulación enfermería",
  },
  "/free-practice": {
    title: "Preguntas Práctica Gratuitas – Repaso NCLEX | NurseNest",
    description: "Comienza tu preparación NCLEX con preguntas práctica gratuitas. Justificaciones detalladas, razonamiento clínico y contenido alineado con el examen. Sin tarjeta de crédito.",
    keywords: "preguntas práctica NCLEX gratuitas, repaso NCLEX gratis, preguntas enfermería gratis, preparación examen enfermería gratis",
  },
  "/anatomy": {
    title: "Anatomía & Fisiología – Repaso Gratuito | NurseNest",
    description: "Domina la anatomía y fisiología con nuestro repaso gratuito e interactivo. Todos los sistemas corporales cubiertos con ejercicios de etiquetado y contenido educativo detallado.",
    keywords: "anatomía fisiología enfermería, repaso anatomía gratis, sistemas corporales, anatomía enfermería, A&P repaso",
  },
  "/pre-nursing": {
    title: "Pre-Enfermería – Fundamentos & Módulos Gratuitos | NurseNest",
    description: "Explora nuestros módulos de pre-enfermería gratuitos e interactivos. Biología celular, fisiología, terminología médica y bases de farmacología para construir tu fundación clínica.",
    keywords: "pre-enfermería, fundamentos enfermería, biología celular enfermería, terminología médica, bases farmacología",
  },
  "/clinical-clarity": {
    title: "Claridad Clínica – Respuestas Basadas en Evidencia | NurseNest",
    description: "Obtén respuestas claras y basadas en evidencia a preguntas clínicas frecuentemente falladas en exámenes. Contenido basado en evidencia para estudiantes de enfermería.",
    keywords: "claridad clínica enfermería, respuestas clínicas, razonamiento clínico, preguntas frecuentes examen enfermería",
  },
  "/study-plan": {
    title: "Plan de Estudio Personalizado – Preparación NCLEX | NurseNest",
    description: "Crea tu plan de estudio personalizado para la preparación NCLEX. Ruta estructurada adaptada a tu nivel y objetivos de examen.",
    keywords: "plan de estudio NCLEX, planificación repaso enfermería, ruta de estudio, programa repaso NCLEX",
  },
  "/faq": {
    title: "Preguntas Frecuentes (FAQ) | NurseNest",
    description: "Encuentra respuestas a tus preguntas sobre NurseNest. Información sobre suscripciones, contenido educativo, preparación de exámenes y funciones de la plataforma.",
    keywords: "FAQ NurseNest, preguntas frecuentes, ayuda NurseNest, soporte plataforma enfermería",
  },
  "/contact": {
    title: "Contáctanos | NurseNest – Soporte & Preguntas",
    description: "Contacta al equipo NurseNest para cualquier pregunta, comentario o solicitud de soporte. Estamos aquí para ayudarte en tu preparación para exámenes de enfermería.",
    keywords: "contacto NurseNest, soporte NurseNest, ayuda preparación examen enfermería",
  },
  "/blog": {
    title: "Blog Educación Clínica – Artículos Enfermería | NurseNest",
    description: "Artículos de educación clínica basados en evidencia. Razonamiento clínico, fisiopatología, farmacología y estrategias de preparación para exámenes. Citas APA 7.",
    keywords: "blog enfermería, artículos clínicos, educación enfermería, razonamiento clínico blog, farmacología artículos",
  },
  "/med-math": {
    title: "Cálculos de Medicamentos – Práctica Matemáticas Enfermería | NurseNest",
    description: "Practica cálculos de dosificación y matemáticas de medicamentos con ejercicios interactivos. Soluciones paso a paso y fórmulas esenciales para exámenes de enfermería.",
    keywords: "cálculos medicamentos enfermería, matemáticas médicas, dosificación medicamentos, cálculo infusión, matemáticas enfermería",
  },
  "/lab-values": {
    title: "Valores de Laboratorio – Interpretación Enfermería | NurseNest",
    description: "Domina la interpretación de valores de laboratorio. Rangos normales, significado clínico de resultados anormales y acciones de enfermería correspondientes.",
    keywords: "valores laboratorio enfermería, interpretación resultados lab, valores normales, análisis sanguíneo enfermería",
  },
  "/question-of-the-day": {
    title: "Pregunta del Día – Razonamiento Clínico Diario | NurseNest",
    description: "Recibe una pregunta de razonamiento clínico diaria con justificación detallada. Mantén tu rutina de estudio para la preparación NCLEX.",
    keywords: "pregunta del día NCLEX, pregunta clínica diaria, repaso diario enfermería, práctica diaria NCLEX",
  },
  "/compare": {
    title: "Comparar Planes – NurseNest vs Alternativas | NurseNest",
    description: "Compara los planes de NurseNest y descubre por qué NurseNest ofrece más funciones a un precio más asequible que UWorld y Archer para la preparación NCLEX.",
    keywords: "comparar NurseNest, NurseNest vs UWorld, preparación NCLEX comparación, mejor preparación NCLEX precio",
  },
  "/glossary": {
    title: "Glosario de Enfermería – Terminología Médica | NurseNest",
    description: "Consulta nuestro glosario completo de términos de enfermería y medicina. Definiciones claras para la terminología utilizada en enfermería y exámenes.",
    keywords: "glosario enfermería, terminología médica, definiciones enfermería, vocabulario enfermería",
  },
  "/practice-questions": {
    title: "Preguntas Práctica Gratuitas – Repaso Enfermería | NurseNest",
    description: "Accede a preguntas práctica gratuitas para el repaso de enfermería. Contenido alineado con exámenes con justificaciones detalladas para cada respuesta.",
    keywords: "preguntas práctica gratuitas enfermería, repaso NCLEX gratis, preguntas examen enfermería gratis",
  },
  "/nclex-rn-practice-questions": {
    title: "Preguntas Práctica NCLEX-RN – Preparación Examen | NurseNest",
    description: "Prepárate para el NCLEX-RN con preguntas práctica dirigidas. Razonamiento clínico, justificaciones detalladas y contenido alineado con los dominios del examen.",
    keywords: "preguntas práctica NCLEX-RN, preparación NCLEX-RN, repaso NCLEX-RN, examen RN preguntas",
  },
  "/nclex-pn-practice-questions": {
    title: "Preguntas Práctica NCLEX-PN – Preparación Examen | NurseNest",
    description: "Prepárate para el NCLEX-PN con preguntas práctica adaptadas. Contenido RPN/LVN con justificaciones clínicas y seguimiento de rendimiento.",
    keywords: "preguntas práctica NCLEX-PN, preparación NCLEX-PN, repaso RPN, examen PN preguntas",
  },
  "/rex-pn-practice-questions": {
    title: "Preguntas Práctica REx-PN – Preparación Examen Canadá | NurseNest",
    description: "Prepárate para el REx-PN con preguntas práctica diseñadas para enfermeros en Canadá. Contenido adaptado a las normas canadienses.",
    keywords: "preguntas práctica REx-PN, preparación REx-PN Canadá, examen RPN Canadá, repaso REx-PN",
  },
  "/np-exam-practice-questions": {
    title: "Preguntas Práctica Examen NP – Certificación Enfermero Practicante | NurseNest",
    description: "Prepárate para tu examen de certificación NP con preguntas práctica avanzadas. Contenido AANP y ANCC con justificaciones clínicas detalladas.",
    keywords: "preguntas práctica NP, preparación examen NP, certificación enfermero practicante, repaso AANP ANCC",
  },
  "/diagnostic-assessment": {
    title: "Evaluación Diagnóstica – Evalúa Tu Nivel | NurseNest",
    description: "Evalúa tu nivel actual con nuestra evaluación diagnóstica. Identifica tus fortalezas y debilidades para optimizar tu plan de repaso NCLEX.",
    keywords: "evaluación diagnóstica enfermería, test de nivel NCLEX, diagnóstico preparación examen, evaluación conocimientos enfermería",
  },
  "/medication-mastery": {
    title: "Dominio de Medicamentos – Farmacología Enfermería | NurseNest",
    description: "Domina la farmacología de enfermería con nuestras herramientas de repaso. Clases de medicamentos, efectos secundarios, contraindicaciones y cálculos de dosificación.",
    keywords: "farmacología enfermería, dominio medicamentos, repaso farmacología NCLEX, clases medicamentos enfermería",
  },
  "/lectures": {
    title: "Clases en Video – Lecciones Clínicas en Video | NurseNest",
    description: "Mira clases en video sobre fisiopatología, farmacología y enfermería. Contenido pedagógico estructurado por sistema corporal y nivel.",
    keywords: "clases video enfermería, lecciones video enfermería, fisiopatología video, clases clínicas en línea",
  },
  "/nclex-rn-guide": {
    title: "Guía NCLEX-RN – Todo para Aprobar | NurseNest",
    description: "Guía completa para aprobar el NCLEX-RN. Formato del examen, dominios de contenido, estrategias de preparación y recursos de estudio recomendados.",
    keywords: "guía NCLEX-RN, aprobar NCLEX-RN, preparación NCLEX-RN guía, estrategias examen RN",
  },
  "/rex-pn-guide": {
    title: "Guía REx-PN – Preparación Examen Canadá | NurseNest",
    description: "Guía completa para el REx-PN en Canadá. Formato del examen, competencias evaluadas y estrategias de preparación para enfermeros canadienses.",
    keywords: "guía REx-PN, preparación REx-PN Canadá, examen RPN guía, aprobar REx-PN",
  },
  "/np-exam-guide": {
    title: "Guía Examen NP – Certificación Enfermero Practicante | NurseNest",
    description: "Guía completa para los exámenes de certificación NP. Cubre los exámenes AANP, ANCC y las especialidades FNP, AGPCNP, PMHNP y más.",
    keywords: "guía examen NP, certificación enfermero practicante guía, preparación AANP ANCC, aprobar examen NP",
  },
  "/pathways": {
    title: "Rutas de Aprendizaje – Progresión Estructurada | NurseNest",
    description: "Sigue rutas de aprendizaje estructuradas para progresar del nivel fundamental al avanzado. Progresión guiada para cada especialidad de enfermería.",
    keywords: "rutas aprendizaje enfermería, progresión estructurada, ruta estudio NCLEX, programa repaso enfermería",
  },
  "/shop": {
    title: "Tienda – Recursos de Estudio & Packs de Examen | NurseNest",
    description: "Descubre nuestros packs de examen imprimibles, guías de estudio y recursos de repaso para la preparación de exámenes de enfermería.",
    keywords: "tienda NurseNest, packs examen enfermería, recursos estudio, guías repaso NCLEX",
  },
};

const portugueseMetadata: Record<string, LocalizedSEOEntry> = {
  "/": {
    title: "NurseNest – Preparação para Exame de Enfermagem | Questões NCLEX e Banco de Questões",
    description: "Prepare-se para seus exames de enfermagem com o NurseNest. Acesse milhares de questões práticas NCLEX, simulações clínicas, flashcards de enfermagem e lições de fisiopatologia. Para estudantes RPN, RN e NP no Canadá e Estados Unidos.",
    keywords: "questões práticas NCLEX, preparação exame enfermagem, banco de questões enfermagem, flashcards enfermagem, revisão NCLEX, simulações clínicas, fisiopatologia enfermagem, exame enfermagem",
  },
  "/pricing": {
    title: "Preços e Planos | NurseNest – Preparação para Exame de Enfermagem",
    description: "Compare os planos do NurseNest para preparação de exames de enfermagem. Acesso gratuito incluído. Planos mensais acessíveis com banco de questões NCLEX, simulações clínicas e flashcards.",
    keywords: "preços NurseNest, planos preparação NCLEX, custo exame enfermagem, assinatura revisão NCLEX, preparação exame enfermagem preço",
  },
  "/lessons": {
    title: "Lições Clínicas – Fisiopatologia e Enfermagem | NurseNest",
    description: "Explore nossas lições clínicas detalhadas cobrindo fisiopatologia, farmacologia e raciocínio clínico. Conteúdo estruturado por sistema corporal para RPN, RN e NP.",
    keywords: "lições enfermagem, fisiopatologia enfermagem, aulas clínicas, raciocínio clínico, farmacologia enfermagem, revisão NCLEX lições",
  },
  "/flashcards": {
    title: "Flashcards de Enfermagem – Farmacologia e Revisão | NurseNest",
    description: "Estude com flashcards de enfermagem verificados clinicamente. Farmacologia, valores laboratoriais e fisiopatologia com modos Aprender e Testar. Crie seus próprios baralhos.",
    keywords: "flashcards enfermagem, flashcards farmacologia, revisão NCLEX cartões, flashcards estudo enfermagem, estudo enfermagem",
  },
  "/mock-exams": {
    title: "Simulados NCLEX – Simulação Cronometrada | NurseNest",
    description: "Simule condições reais de exame com nossos simulados NCLEX cronometrados. Seleção adaptativa de questões, acompanhamento de desempenho e justificativas detalhadas.",
    keywords: "simulados NCLEX, simulação exame enfermagem, exame prático cronometrado, preparação exame enfermagem, simulado NCLEX",
  },
  "/test-bank": {
    title: "Banco de Questões de Enfermagem – Questões Práticas NCLEX | NurseNest",
    description: "Acesse nosso banco de questões de enfermagem completo. Filtre por sistema corporal, nível e tópico. Cada questão inclui justificativas detalhadas para revisão NCLEX.",
    keywords: "banco de questões enfermagem, questões práticas NCLEX, questões exame enfermagem, banco de testes enfermagem",
  },
  "/question-bank": {
    title: "Banco de Questões de Enfermagem – Questões Práticas NCLEX | NurseNest",
    description: "Acesse nosso banco de questões de enfermagem completo. Filtre por sistema corporal, nível e tópico. Cada questão inclui justificativas detalhadas para revisão NCLEX.",
    keywords: "banco de questões enfermagem, questões práticas NCLEX, questões exame enfermagem, banco de testes enfermagem",
  },
  "/simulators": {
    title: "Simuladores Clínicos – Cenários Interativos | NurseNest",
    description: "Pratique julgamento clínico com simuladores interativos. Cenários de pacientes ramificados incluindo sepse, infarto do miocárdio, CAD e deterioração do paciente.",
    keywords: "simuladores clínicos enfermagem, simulações de paciente, julgamento clínico, cenários enfermagem, simulação enfermagem",
  },
  "/free-practice": {
    title: "Questões Práticas Gratuitas – Revisão NCLEX | NurseNest",
    description: "Comece sua preparação NCLEX com questões práticas gratuitas. Justificativas detalhadas, raciocínio clínico e conteúdo alinhado ao exame. Sem necessidade de cartão de crédito.",
    keywords: "questões práticas NCLEX gratuitas, revisão NCLEX grátis, questões enfermagem grátis, preparação exame enfermagem grátis",
  },
  "/anatomy": {
    title: "Anatomia e Fisiologia – Revisão Gratuita | NurseNest",
    description: "Domine anatomia e fisiologia com nossa revisão gratuita e interativa. Todos os sistemas corporais cobertos com exercícios de rotulagem e conteúdo educacional detalhado.",
    keywords: "anatomia fisiologia enfermagem, revisão anatomia grátis, sistemas corporais, anatomia enfermagem, A&P revisão",
  },
  "/pre-nursing": {
    title: "Pré-Enfermagem – Fundamentos e Módulos Gratuitos | NurseNest",
    description: "Explore nossos módulos de pré-enfermagem gratuitos e interativos. Biologia celular, fisiologia, terminologia médica e bases de farmacologia para construir sua base clínica.",
    keywords: "pré-enfermagem, fundamentos enfermagem, biologia celular enfermagem, terminologia médica, bases farmacologia",
  },
  "/clinical-clarity": {
    title: "Clareza Clínica – Respostas Baseadas em Evidências | NurseNest",
    description: "Obtenha respostas claras e baseadas em evidências para questões clínicas frequentemente erradas em exames. Conteúdo baseado em evidências para estudantes de enfermagem.",
    keywords: "clareza clínica enfermagem, respostas clínicas, raciocínio clínico, questões frequentes exame enfermagem",
  },
  "/study-plan": {
    title: "Plano de Estudo Personalizado – Preparação NCLEX | NurseNest",
    description: "Crie seu plano de estudo personalizado para preparação NCLEX. Percurso estruturado adaptado ao seu nível e objetivos de exame.",
    keywords: "plano de estudo NCLEX, planejamento revisão enfermagem, percurso de estudo, programa revisão NCLEX",
  },
  "/faq": {
    title: "Perguntas Frequentes (FAQ) | NurseNest",
    description: "Encontre respostas para suas perguntas sobre o NurseNest. Informações sobre assinaturas, conteúdo educacional, preparação para exames e funcionalidades da plataforma.",
    keywords: "FAQ NurseNest, perguntas frequentes, ajuda NurseNest, suporte plataforma enfermagem",
  },
  "/contact": {
    title: "Contate-nos | NurseNest – Suporte e Perguntas",
    description: "Entre em contato com a equipe NurseNest para qualquer pergunta, comentário ou solicitação de suporte. Estamos aqui para ajudá-lo em sua preparação para exames de enfermagem.",
    keywords: "contato NurseNest, suporte NurseNest, ajuda preparação exame enfermagem",
  },
  "/blog": {
    title: "Blog Educação Clínica – Artigos de Enfermagem | NurseNest",
    description: "Artigos de educação clínica baseados em evidências. Raciocínio clínico, fisiopatologia, farmacologia e estratégias de preparação para exames. Citações APA 7.",
    keywords: "blog enfermagem, artigos clínicos, educação enfermagem, raciocínio clínico blog, farmacologia artigos",
  },
  "/med-math": {
    title: "Cálculos de Medicamentos – Prática Matemática de Enfermagem | NurseNest",
    description: "Pratique cálculos de dosagem e matemática de medicamentos com exercícios interativos. Soluções passo a passo e fórmulas essenciais para exames de enfermagem.",
    keywords: "cálculos medicamentos enfermagem, matemática médica, dosagem medicamentos, cálculo infusão, matemática enfermagem",
  },
  "/lab-values": {
    title: "Valores Laboratoriais – Interpretação de Enfermagem | NurseNest",
    description: "Domine a interpretação de valores laboratoriais. Faixas normais, significado clínico de resultados anormais e ações de enfermagem correspondentes.",
    keywords: "valores laboratoriais enfermagem, interpretação resultados lab, valores normais, análise sanguínea enfermagem",
  },
  "/question-of-the-day": {
    title: "Questão do Dia – Raciocínio Clínico Diário | NurseNest",
    description: "Receba uma questão de raciocínio clínico diária com justificativa detalhada. Mantenha sua rotina de estudo para preparação NCLEX.",
    keywords: "questão do dia NCLEX, questão clínica diária, revisão diária enfermagem, prática diária NCLEX",
  },
  "/compare": {
    title: "Comparar Planos – NurseNest vs Alternativas | NurseNest",
    description: "Compare os planos do NurseNest e descubra por que o NurseNest oferece mais recursos a um preço mais acessível que UWorld e Archer para preparação NCLEX.",
    keywords: "comparar NurseNest, NurseNest vs UWorld, preparação NCLEX comparação, melhor preparação NCLEX preço",
  },
  "/glossary": {
    title: "Glossário de Enfermagem – Terminologia Médica | NurseNest",
    description: "Consulte nosso glossário completo de termos de enfermagem e medicina. Definições claras para a terminologia usada em enfermagem e exames.",
    keywords: "glossário enfermagem, terminologia médica, definições enfermagem, vocabulário enfermagem",
  },
  "/practice-questions": {
    title: "Questões Práticas Gratuitas – Revisão de Enfermagem | NurseNest",
    description: "Acesse questões práticas gratuitas para revisão de enfermagem. Conteúdo alinhado a exames com justificativas detalhadas para cada resposta.",
    keywords: "questões práticas gratuitas enfermagem, revisão NCLEX grátis, questões exame enfermagem grátis",
  },
  "/nclex-rn-practice-questions": {
    title: "Questões Práticas NCLEX-RN – Preparação para Exame | NurseNest",
    description: "Prepare-se para o NCLEX-RN com questões práticas direcionadas. Raciocínio clínico, justificativas detalhadas e conteúdo alinhado aos domínios do exame.",
    keywords: "questões práticas NCLEX-RN, preparação NCLEX-RN, revisão NCLEX-RN, exame RN questões",
  },
  "/nclex-pn-practice-questions": {
    title: "Questões Práticas NCLEX-PN – Preparação para Exame | NurseNest",
    description: "Prepare-se para o NCLEX-PN com questões práticas adaptadas. Conteúdo RPN/LVN com justificativas clínicas e acompanhamento de desempenho.",
    keywords: "questões práticas NCLEX-PN, preparação NCLEX-PN, revisão RPN, exame PN questões",
  },
  "/rex-pn-practice-questions": {
    title: "Questões Práticas REx-PN – Preparação para Exame Canadá | NurseNest",
    description: "Prepare-se para o REx-PN com questões práticas projetadas para enfermeiros no Canadá. Conteúdo adaptado às normas canadenses.",
    keywords: "questões práticas REx-PN, preparação REx-PN Canadá, exame RPN Canadá, revisão REx-PN",
  },
  "/np-exam-practice-questions": {
    title: "Questões Práticas Exame NP – Certificação Enfermeiro Praticante | NurseNest",
    description: "Prepare-se para seu exame de certificação NP com questões práticas avançadas. Conteúdo AANP e ANCC com justificativas clínicas detalhadas.",
    keywords: "questões práticas NP, preparação exame NP, certificação enfermeiro praticante, revisão AANP ANCC",
  },
  "/diagnostic-assessment": {
    title: "Avaliação Diagnóstica – Teste Seu Nível | NurseNest",
    description: "Avalie seu nível atual com nossa avaliação diagnóstica. Identifique seus pontos fortes e fracos para otimizar seu plano de revisão NCLEX.",
    keywords: "avaliação diagnóstica enfermagem, teste de nível NCLEX, diagnóstico preparação exame, avaliação conhecimentos enfermagem",
  },
  "/medication-mastery": {
    title: "Domínio de Medicamentos – Farmacologia de Enfermagem | NurseNest",
    description: "Domine a farmacologia de enfermagem com nossas ferramentas de revisão. Classes de medicamentos, efeitos colaterais, contraindicações e cálculos de dosagem.",
    keywords: "farmacologia enfermagem, domínio medicamentos, revisão farmacologia NCLEX, classes medicamentos enfermagem",
  },
  "/lectures": {
    title: "Videoaulas – Lições Clínicas em Vídeo | NurseNest",
    description: "Assista videoaulas sobre fisiopatologia, farmacologia e enfermagem. Conteúdo pedagógico estruturado por sistema corporal e nível.",
    keywords: "videoaulas enfermagem, lições vídeo enfermagem, fisiopatologia vídeo, aulas clínicas online",
  },
  "/nclex-rn-guide": {
    title: "Guia NCLEX-RN – Tudo para Passar | NurseNest",
    description: "Guia completo para passar no NCLEX-RN. Formato do exame, domínios de conteúdo, estratégias de preparação e recursos de estudo recomendados.",
    keywords: "guia NCLEX-RN, passar NCLEX-RN, preparação NCLEX-RN guia, estratégias exame RN",
  },
  "/rex-pn-guide": {
    title: "Guia REx-PN – Preparação para Exame Canadá | NurseNest",
    description: "Guia completo para o REx-PN no Canadá. Formato do exame, competências avaliadas e estratégias de preparação para enfermeiros canadenses.",
    keywords: "guia REx-PN, preparação REx-PN Canadá, exame RPN guia, passar REx-PN",
  },
  "/np-exam-guide": {
    title: "Guia Exame NP – Certificação Enfermeiro Praticante | NurseNest",
    description: "Guia completo para exames de certificação NP. Cobre exames AANP, ANCC e especialidades FNP, AGPCNP, PMHNP e mais.",
    keywords: "guia exame NP, certificação enfermeiro praticante guia, preparação AANP ANCC, passar exame NP",
  },
  "/pathways": {
    title: "Percursos de Aprendizagem – Progressão Estruturada | NurseNest",
    description: "Siga percursos de aprendizagem estruturados para progredir do nível fundamental ao avançado. Progressão guiada para cada especialidade de enfermagem.",
    keywords: "percursos aprendizagem enfermagem, progressão estruturada, percurso estudo NCLEX, programa revisão enfermagem",
  },
  "/shop": {
    title: "Loja – Recursos de Estudo e Pacotes de Exame | NurseNest",
    description: "Descubra nossos pacotes de exame imprimíveis, guias de estudo e recursos de revisão para preparação de exames de enfermagem.",
    keywords: "loja NurseNest, pacotes exame enfermagem, recursos estudo, guias revisão NCLEX",
  },
};

export const localizedSEOMetadata: Partial<Record<SEOLocale, Record<string, LocalizedSEOEntry>>> = {
  fr: frenchMetadata,
  es: spanishMetadata,
  pt: portugueseMetadata,
};

export function getLocalizedSEO(locale: string, path: string): LocalizedSEOEntry | null {
  if (!(locale in localizedSEOMetadata)) return null;
  return localizedSEOMetadata[locale as SEOLocale][path] || null;
}
