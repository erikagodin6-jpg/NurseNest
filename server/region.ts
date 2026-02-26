import type { Request, Response, NextFunction } from "express";

export type Region = "US" | "CA";
export type RegionScope = "US_ONLY" | "CA_ONLY" | "BOTH";

declare global {
  namespace Express {
    interface Request {
      region?: Region;
    }
  }
}

export function getEffectiveRegion(hostname: string): Region {
  const h = hostname.toLowerCase();
  if (h.endsWith(".ca") || h.includes(".ca:")) return "CA";
  if (h.endsWith(".us") || h.includes(".us:")) return "US";

  const envRegion = process.env.DEFAULT_REGION;
  if (envRegion === "CA") return "CA";
  return "US";
}

export function getAllowedRegionScopes(tier: string | null | undefined, region: Region): RegionScope[] {
  const t = (tier || "free").toLowerCase();
  switch (t) {
    case "np":
    case "prenursing":
      return ["BOTH", `${region}_ONLY` as RegionScope];
    case "rpn":
    case "rn":
    case "lvn":
      return ["BOTH", `${region}_ONLY` as RegionScope];
    case "admin":
    case "free":
    default:
      return ["BOTH", `${region}_ONLY` as RegionScope];
  }
}

export function regionMiddleware(req: Request, _res: Response, next: NextFunction) {
  const host = req.hostname || req.headers.host || "localhost";
  req.region = getEffectiveRegion(host);
  next();
}

export function buildRegionFilter(region: Region): string {
  return `region_scope IN ('BOTH', '${region}_ONLY')`;
}

export function isRegionAllowed(itemScope: RegionScope | string | null | undefined, region: Region): boolean {
  const scope = (itemScope || "BOTH") as RegionScope;
  if (scope === "BOTH") return true;
  if (scope === "CA_ONLY" && region === "CA") return true;
  if (scope === "US_ONLY" && region === "US") return true;
  return false;
}

export function getDefaultRegionScope(tier: string | null | undefined, region: Region): RegionScope {
  const t = (tier || "free").toLowerCase();
  if (t === "np" || t === "prenursing") return "BOTH";
  return `${region}_ONLY` as RegionScope;
}

export function canChangeRegionScope(tier: string | null | undefined, status: string | null | undefined): boolean {
  const t = (tier || "free").toLowerCase();
  if (t === "np" || t === "prenursing" || t === "free" || t === "admin") return true;
  if (status === "published") return false;
  return true;
}
