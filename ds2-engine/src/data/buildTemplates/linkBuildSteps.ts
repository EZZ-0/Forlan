import { AREAS, type AreaId } from "../areas";
import type { BuildStep } from "../buildChecklist";

interface AreaIndexEntry {
  id: string;
  areaId: AreaId;
  text: string;
  norm: string;
}

/** Manual overrides for A–Z checklist shorthand → area item id */
const MANUAL_LINKS: Record<string, string> = {
  "lenigrast's key": "fg5",
  "lenigrast key": "fg5",
  "lenigrast's shop": "fg12",
  "open lenigrast": "fg12",
  "fire longsword": "fg11",
  "ring of blades": "fg15",
  "chloranthy ring": "fg21",
  "stone ring": "tb7",
  "dull ember": "lb2",
  "dark orb": "hc3",
  "sunset staff": "build:sunset_staff",
  "uchigatana": "build:uchigatana",
  "pyromancy flame": "build:pyromancy_flame",
  "southern ritual band": "build:southern_ritual",
  "third dragon ring": "build:third_dragon",
  "great club": "gt1",
  "large club": "lb8",
  "moonlight greatsword": "build:mlgs",
  "staff of wisdom": "build:staff_of_wisdom",
  "blacksteel katana": "build:blacksteel",
  "heide knight sword": "ht4",
  "old leo ring": "ht6",
  "crested bone dust": "mj3",
};

let areaIndexCache: AreaIndexEntry[] | null = null;

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/\*\*/g, "")
    .replace(/\([^)]*\)/g, " ")
    .replace(/\+\d+/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildAreaIndex(): AreaIndexEntry[] {
  if (areaIndexCache) return areaIndexCache;
  const index: AreaIndexEntry[] = [];
  for (const areaId of Object.keys(AREAS) as AreaId[]) {
    const area = AREAS[areaId];
    for (const it of area.items) {
      index.push({
        id: it.id,
        areaId,
        text: it.text,
        norm: normalize(it.text),
      });
      if (it.subItems) {
        for (const sub of it.subItems) {
          index.push({
            id: sub.id,
            areaId,
            text: sub.text,
            norm: normalize(sub.text),
          });
        }
      }
    }
  }
  areaIndexCache = index;
  return index;
}

function scoreMatch(stepNorm: string, entry: AreaIndexEntry, preferArea: AreaId | undefined): number {
  let score = 0;
  if (preferArea && entry.areaId === preferArea) score += 3;
  if (entry.norm === stepNorm) score += 20;
  if (entry.norm.includes(stepNorm) || stepNorm.includes(entry.norm)) score += 12;

  const stepTokens = stepNorm.split(" ").filter((t) => t.length > 2);
  for (const t of stepTokens) {
    if (entry.norm.includes(t)) score += 2;
  }

  // Weapon/ring name at start of area text
  const head = entry.norm.slice(0, Math.min(entry.norm.length, stepNorm.length + 10));
  if (head.startsWith(stepNorm.slice(0, 8)) && stepNorm.length >= 4) score += 5;

  return score;
}

export function findAreaProgressId(stepName: string, areaId: AreaId): string | null {
  const stepNorm = normalize(stepName);
  if (!stepNorm) return null;

  for (const [key, id] of Object.entries(MANUAL_LINKS)) {
    if (stepNorm.includes(key) || key.includes(stepNorm)) return id;
  }

  const index = buildAreaIndex();
  let best: AreaIndexEntry | null = null;
  let bestScore = 0;

  for (const entry of index) {
    const s = scoreMatch(stepNorm, entry, areaId);
    if (s > bestScore) {
      bestScore = s;
      best = entry;
    }
  }

  if (bestScore < 6) {
    best = null;
    bestScore = 0;
    for (const entry of index) {
      const s = scoreMatch(stepNorm, entry, undefined);
      if (s > bestScore) {
        bestScore = s;
        best = entry;
      }
    }
  }

  return bestScore >= 6 && best ? best.id : null;
}

export function inferBuildStepType(name: string): BuildStep["type"] {
  const n = name.toLowerCase();
  if (n.includes("ring")) return "ring";
  if (n.includes("spell") || n.includes("orb") || n.includes("soul arrow") || n.includes("spear"))
    return "spell";
  if (n.includes("staff") || n.includes("chime") || n.includes("flame") && n.includes("pyro"))
    return "catalyst";
  if (n.includes("infus")) return "infusion";
  if (n.includes("ember") || n.includes("key")) return "key";
  if (n.includes("+10") || n.includes("+5") || n.includes("upgrade")) return "upgrade";
  if (
    n.includes("sword") ||
    n.includes("katana") ||
    n.includes("club") ||
    n.includes("mace") ||
    n.includes("bow") ||
    n.includes("whip") ||
    n.includes("lance") ||
    n.includes("greatsword")
  )
    return "weapon";
  return "key";
}

/** Link generated steps to area checklist ids where possible */
export function linkBuildSteps(steps: BuildStep[]): BuildStep[] {
  return steps.map((step) => {
    const linked = findAreaProgressId(step.name, step.areaId);
    const progressId = linked ?? step.progressId;
    return {
      ...step,
      progressId,
      type: inferBuildStepType(step.name),
    };
  });
}
