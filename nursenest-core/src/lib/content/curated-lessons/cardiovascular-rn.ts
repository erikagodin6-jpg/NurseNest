import { cardiovascularRnBatch1 } from "./cardiovascular-rn-batch-1";
import { cardiovascularRnBatch2 } from "./cardiovascular-rn-batch-2";
import { cardiovascularRnBatch3 } from "./cardiovascular-rn-batch-3";
import { cardiovascularRnBatch4 } from "./cardiovascular-rn-batch-4";
import { cardiovascularRnBatch5 } from "./cardiovascular-rn-batch-5";

export const cardiovascularRnLessons = {
  ...cardiovascularRnBatch1,
  ...cardiovascularRnBatch2,
  ...cardiovascularRnBatch3,
  ...cardiovascularRnBatch4,
  ...cardiovascularRnBatch5,
};

export const cardiovascularRnExpectedTitles = Object.keys(cardiovascularRnLessons).sort();

export const cardiovascularRnCurriculumSources = [
  {
    source: "2025 ACC/AHA/ACEP/NAEMSP/SCAI Guideline for Acute Coronary Syndromes",
    url: "https://professional.heart.org/en/science-news/2025-guideline-for-the-management-of-patients-with-acute-coronary-syndromes",
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
] as const;
