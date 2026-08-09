import { paramedicV2Questions } from "./paramedic-v2-questions";
import { paramedicV2TraumaBatch02Questions } from "./paramedic-v2-trauma-batch02-questions";
import { paramedicV2AclsBurnBatch03Questions } from "./paramedic-v2-acls-burn-batch03-questions";
import { paramedicV2AclsBatch04Questions } from "./paramedic-v2-acls-batch04-questions";
import { paramedicV2PharmacologyBatch05Questions } from "./paramedic-v2-pharmacology-batch05-questions";
import { paramedicV2MedicalBatch06Questions } from "./paramedic-v2-medical-batch06-questions";
import { paramedicV2ObBatch07Questions } from "./paramedic-v2-ob-batch07-questions";
import { paramedicV2AirwayBatch08Questions } from "./paramedic-v2-airway-batch08-questions";
import { paramedicV2PediatricBatch09Questions } from "./paramedic-v2-pediatric-batch09-questions";
import { paramedicV2EnvironmentOperationsBatch10Questions } from "./paramedic-v2-environment-operations-batch10-questions";
import { paramedicV2OperationsBatch11Questions } from "./paramedic-v2-operations-batch11-questions";

export const PARAMEDIC_V2_QUESTIONS:any[]=[
  ...paramedicV2Questions,
  ...paramedicV2TraumaBatch02Questions,
  ...paramedicV2AclsBurnBatch03Questions,
  ...paramedicV2AclsBatch04Questions,
  ...paramedicV2PharmacologyBatch05Questions,
  ...paramedicV2MedicalBatch06Questions,
  ...paramedicV2ObBatch07Questions,
  ...paramedicV2AirwayBatch08Questions,
  ...paramedicV2PediatricBatch09Questions,
  ...paramedicV2EnvironmentOperationsBatch10Questions,
  ...paramedicV2OperationsBatch11Questions,
];
