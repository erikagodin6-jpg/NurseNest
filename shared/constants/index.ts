import { CA_EXAMS } from "./ca/exams";
import { US_EXAMS } from "./us/exams";
import caLabs from "./ca/labs.json";
import usLabs from "./us/labs.json";

export type Region = "US" | "CA";

export function getExamConstants(region: Region) {
  return region === "CA" ? CA_EXAMS : US_EXAMS;
}

export function getLabValues(region: Region) {
  return region === "CA" ? caLabs : usLabs;
}

export function getTierDesignation(tier: string, region: Region): string {
  const exams = getExamConstants(region);
  const t = tier.toLowerCase();
  return exams.tiers[t as keyof typeof exams.tiers] || tier;
}

export function getDesignations(region: Region): string[] {
  return getExamConstants(region).designations;
}

export function getCurrency(region: Region) {
  const exams = getExamConstants(region);
  return { code: exams.currency, symbol: exams.currencySymbol };
}

export { CA_EXAMS, US_EXAMS };
