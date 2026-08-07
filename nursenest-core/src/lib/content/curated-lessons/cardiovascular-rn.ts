import { cardiovascularRnBatch1 } from "./cardiovascular-rn-batch-1";
import { cardiovascularRnBatch2 } from "./cardiovascular-rn-batch-2";
import { cardiovascularRnBatch3 } from "./cardiovascular-rn-batch-3";
import { cardiovascularRnBatch4 } from "./cardiovascular-rn-batch-4";
import { cardiovascularRnBatch5 } from "./cardiovascular-rn-batch-5";
import { cardiovascularRnBatch6 } from "./cardiovascular-rn-batch-6";
import { cardiovascularRnBatch7 } from "./cardiovascular-rn-batch-7";

export const cardiovascularRnLessons = {
  ...cardiovascularRnBatch1,
  ...cardiovascularRnBatch2,
  ...cardiovascularRnBatch3,
  ...cardiovascularRnBatch4,
  ...cardiovascularRnBatch5,
  ...cardiovascularRnBatch6,
  ...cardiovascularRnBatch7,
};

export const cardiovascularRnExpectedTitles = Object.keys(cardiovascularRnLessons).sort();

/**
 * Expansion topics added after the initial 25-title remediation. They are kept
 * explicit so production reporting can distinguish "rewrite an existing row"
 * from "new curriculum row that may need creation".
 */
export const cardiovascularRnExpansionTitles = [
  "Chronic Coronary Disease and Stable Angina",
  "Myocarditis",
  "Pericardial Effusion",
  "Acute Aortic Dissection",
  "Acute Limb Ischemia",
  "Cardiogenic Shock",
  "Cardiac Arrest and Post-Cardiac Arrest Care",
  "Atrial Fibrillation and Flutter",
  "Supraventricular Tachycardia",
  "Ventricular Tachycardia and Ventricular Fibrillation",
  "Bradyarrhythmias and Heart Block",
  "Syncope and Orthostatic Hypotension",
] as const;

export const cardiovascularRnCurriculumSources = [
  {
    source: "2025 ACC/AHA/ACEP/NAEMSP/SCAI Guideline for Acute Coronary Syndromes",
    url: "https://professional.heart.org/en/science-news/2025-guideline-for-the-management-of-patients-with-acute-coronary-syndromes",
  },
  {
    source: "2023 AHA/ACC/ACCP/ASPC/NLA/PCNA Guideline for Chronic Coronary Disease",
    url: "https://professional.heart.org/en/science-news/2023-guideline-for-the-management-of-patients-with-chronic-coronary-disease",
  },
  {
    source: "2022 AHA/ACC/HFSA Guideline for the Management of Heart Failure",
    url: "https://professional.heart.org/en/science-news/2022-guideline-for-the-management-of-heart-failure",
  },
  {
    source: "2023 ACC/AHA/ACCP/HRS Guideline for Atrial Fibrillation",
    url: "https://professional.heart.org/en/science-news/2023-acc-aha-accp-hrs-guideline-for-the-diagnosis-and-management-of-atrial-fibrillation",
  },
  {
    source: "2015 ACC/AHA/HRS Guideline for Adult Supraventricular Tachycardia",
    url: "https://professional.heart.org/en/science-news/guideline-for-the-management-of-adult-patients-with-supraventricular-tachycardia",
  },
  {
    source: "2018 ACC/AHA/HRS Guideline for Bradycardia and Cardiac Conduction Delay",
    url: "https://professional.heart.org/en/science-news/2018-guideline-for-the-evaluation-and-management-of-patients-with-bradycardia-and-cardiac-conduction-delay",
  },
  {
    source: "2017 ACC/AHA/HRS Guideline for Syncope",
    url: "https://professional.heart.org/en/science-news/2017-acc-aha-hrs-guideline-for-the-evaluation-and-management-of-patients-with-syncope",
  },
  {
    source: "2020 AHA Scientific Statement on Fulminant Myocarditis",
    url: "https://professional.heart.org/en/science-news/recognition-and-initial-management-of-fulminant-myocarditis",
  },
  {
    source: "2024 ACC/AHA Guideline for Lower Extremity Peripheral Artery Disease",
    url: "https://professional.heart.org/en/science-news/2024-guideline-for-the-management-of-lower-extremity-peripheral-artery-disease",
  },
  {
    source: "2020 ACC/AHA Guideline for Valvular Heart Disease",
    url: "https://professional.heart.org/en/science-news/2020-acc-aha-guideline-for-the-management-of-patients-with-valvular-heart-disease",
  },
  {
    source: "2022 ACC/AHA Guideline for the Diagnosis and Management of Aortic Disease",
    url: "https://professional.heart.org/en/science-news/2022-guideline-for-the-diagnosis-and-management-of-aortic-disease",
  },
  {
    source: "2025 AHA Guidelines for CPR and Emergency Cardiovascular Care",
    url: "https://professional.heart.org/en/science-news/2025-aha-guidelines-for-cpr-and-ecc",
  },
  {
    source: "2025 AHA Post-Cardiac Arrest Care Guideline",
    url: "https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/post-cardiac-arrest-care",
  },
] as const;
