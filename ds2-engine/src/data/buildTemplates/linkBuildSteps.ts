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
  "dark orb": "hc14",
  "chime of want": "mj20",
  "archdrake chime": "build:dc:archdrake_chime",
  "sunset staff": "build:sunset_staff",
  "uchigatana": "build:uchigatana",
  "pyromancy flame": "build:pyromancy_flame",
  "southern ritual band": "bc15",
  "third dragon ring": "da10",
  "large club": "lb17",
  "great club": "gt6",
  "craftsman's hammer": "build:td:craftsman_hammer",
  "moonlight greatsword": "mj19",
  "staff of wisdom": "build:staff_of_wisdom",
  "blacksteel katana": "build:blacksteel",
  "rapier": "build:rapier",
  "ricard's rapier": "lb13d",
  "hunter's blackbow": "build:hunters_blackbow",
  "flynn's ring": "bc18",
  "flynn's": "bc18",
  "heide lance": "build:pp:heide_lance",
  "old knight halberd": "ht2d",
  "flame weapon": "ik14",
  "forbidden sun": "ak12",
  "penal handcuffs": "uc10",
  "dark clutch ring": "d111",
  "chloranthy ring +2": "d316",
  "ring of blades +2": "tw7",
  "greatsword": "nm3",
  "flexile sentry": "nm6",
  "shadow set": "nm6",
  "ring of giants": "build:te:ring_of_giants",
  "heide knight sword": "fg3",
  "old leo ring": "ht7",
  "defender greatsword": "tw8",
  "dragon chime": "build:lol:dragon_chime",
  "lightning spear": "build:lol:lightning_spear",
  "lindelt priest chime": "build:lol:lindelt_chime",
  "sun ring": "build:lol:sun_ring",
  "sun seal": "build:lol:sun_ring",
  "crystal soul spear": "lb18",
  "carhillion": "build:pim:carhillion",
  "notched whip": "hc13",
  "crest of blood": "build:lb:crest_of_blood",
  "bandit's knife": "build:lb:bandits_knife",
  "shadow gauntlets": "build:lb:shadow_gauntlets",
  "shadow dagger": "build:lb:shadow_dagger",
  "witchtree branch": "build:pim:witchtree",
  "lion mage": "build:pim:lion_mage",
  "clear bluestone": "hc12",
  "crested bone dust": "mj3",
  "old whip": "build:bf:old_whip",
  "mace of the insolent": "build:chh:mace_insolent",
  "blue flame": "uc11",
  "crystal magic weapon": "build:bfm:crystal_magic_weapon",
  "warmth": "build:pw:warmth",
  "abyss seal": "build:drm:abyss_seal",
  "caitha": "build:drm:caitha_chime",
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
