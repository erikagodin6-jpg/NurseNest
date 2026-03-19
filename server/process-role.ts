export type ProcessRole = "web" | "worker";

export function getProcessRole(): ProcessRole {
  return (process.env.PROCESS_ROLE as ProcessRole) || "web";
}

export function isWebProcess(): boolean {
  return getProcessRole() === "web";
}

export function isWorkerProcess(): boolean {
  return getProcessRole() === "worker";
}
