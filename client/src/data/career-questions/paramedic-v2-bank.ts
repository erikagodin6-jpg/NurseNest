import { paramedicV2Questions } from "./paramedic-v2-questions";
import { paramedicV2TraumaBatch02Questions } from "./paramedic-v2-trauma-batch02-questions";
import { paramedicV2AclsBurnBatch03Questions } from "./paramedic-v2-acls-burn-batch03-questions";
import { paramedicV2AclsBatch04Questions } from "./paramedic-v2-acls-batch04-questions";
import { paramedicV2PharmacologyBatch05Questions } from "./paramedic-v2-pharmacology-batch05-questions";

export const PARAMEDIC_V2_QUESTIONS:any[]=[
  ...paramedicV2Questions,
  ...paramedicV2TraumaBatch02Questions,
  ...paramedicV2AclsBurnBatch03Questions,
  ...paramedicV2AclsBatch04Questions,
  ...paramedicV2PharmacologyBatch05Questions,
];
