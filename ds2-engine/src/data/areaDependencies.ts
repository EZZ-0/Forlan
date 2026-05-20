/**
 * Area unlock dependencies for Semi-Fast Run progress.
 * Parsed from areaAccess.ts — structured conditions for skip/skim routing.
 */

import type { AreaId, Area, AreaItem } from "./areas";
import { AREA_ORDER } from "./areas";
import { SEMI_FAST_SKIP_IDS } from "./semiFastConstants";

export type AreaUnlockConditionType = "area" | "item" | "boss" | "souls" | "key" | "or";

export interface UnlockCondition {
  type: AreaUnlockConditionType;
  id?: string;
  souls?: number;
  /** For type "or": satisfy ANY of these */
  or?: UnlockCondition[];
}

export const AREA_UNLOCK_DEPS: Record<AreaId, UnlockCondition[]> = {
  things_betwixt: [],
  majula: [{ type: "area", id: "things_betwixt" }],
  forest_of_fallen_giants: [{ type: "area", id: "majula" }],
  heides_tower: [{ type: "area", id: "majula" }],
  no_mans_wharf: [
    {
      type: "or",
      or: [
        { type: "boss", id: "old_dragonslayer" },
        { type: "boss", id: "dragonrider" },
      ],
    },
    { type: "area", id: "heides_tower" },
  ],
  lost_bastille: [
    {
      type: "or",
      or: [
        { type: "boss", id: "pursuer" },
        { type: "area", id: "no_mans_wharf" },
      ],
    },
  ],
  huntsmans_copse: [
    { type: "boss", id: "dragonrider" },
    { type: "area", id: "majula" },
  ],
  harvest_valley: [
    { type: "boss", id: "executioner_chariot" },
    { type: "area", id: "huntsmans_copse" },
  ],
  earthen_peak: [
    { type: "boss", id: "covetous_demon" },
    { type: "area", id: "harvest_valley" },
  ],
  iron_keep: [
    { type: "boss", id: "mytha" },
    { type: "area", id: "earthen_peak" },
  ],
  the_pit: [{ type: "area", id: "majula" }],
  the_gutter: [
    { type: "boss", id: "royal_rat_vanguard" },
    { type: "area", id: "the_pit" },
  ],
  black_gulch: [
    { type: "area", id: "the_gutter" },
  ],
  shaded_woods: [
    { type: "area", id: "majula" },
    { type: "item", id: "sw1" },
  ],
  doors_of_pharros: [
    { type: "area", id: "shaded_woods" },
  ],
  brightstone_cove: [
    { type: "area", id: "shaded_woods" },
  ],
  sinners_rise: [
    { type: "area", id: "lost_bastille" },
  ],
  drangleic_castle: [
    {
      type: "or",
      or: [
        { type: "souls", souls: 1_000_000 },
        { type: "item", id: "lord_souls_4" },
      ],
    },
    { type: "area", id: "shaded_woods" },
  ],
  shrine_of_amana: [
    { type: "boss", id: "looking_glass_knight" },
    { type: "area", id: "drangleic_castle" },
  ],
  undead_crypt: [
    { type: "boss", id: "demon_of_song" },
    { type: "area", id: "shrine_of_amana" },
  ],
  aldias_keep: [
    { type: "item", id: "uc6" },
    { type: "area", id: "shaded_woods" },
  ],
  dragon_aerie: [
    { type: "boss", id: "guardian_dragon" },
    { type: "area", id: "aldias_keep" },
  ],
  memories: [
    { type: "item", id: "da6" },
    { type: "area", id: "dragon_aerie" },
  ],
  dark_chasm: [
    { type: "area", id: "black_gulch" },
    { type: "area", id: "shaded_woods" },
    { type: "area", id: "drangleic_castle" },
  ],
  throne_of_want: [
    { type: "item", id: "uc6" },
    { type: "area", id: "shrine_of_amana" },
  ],
  dlc_sunken: [
    { type: "boss", id: "the_rotten" },
    { type: "area", id: "black_gulch" },
  ],
  dlc_iron: [
    { type: "boss", id: "old_iron_king" },
    { type: "area", id: "iron_keep" },
  ],
  dlc_ivory: [
    { type: "item", id: "frozen_flower" },
    { type: "area", id: "drangleic_castle" },
  ],
};

/** Item IDs that gate area access — required for progression. */
export const REQUIRED_FOR_PROGRESSION = new Set<string>([
  "fg18",
  "fg19",
  "lb2",
  "lb7",
  "uc6",
  "sw1",
  "da6",
  "mj9",
  "ht6",
  "fg5",
]);

/** Semi-fast run milestones — key checkpoints for skip/skim routing. */
export interface SemiFastMilestone {
  id: string;
  label: string;
  areaId: AreaId;
  requiredItemIds: string[];
  optionalItemIds?: string[];
}

export const SEMI_FAST_MILESTONES: SemiFastMilestone[] = [
  { id: "ms:lenigrast", label: "Lenigrast's Key", areaId: "forest_of_fallen_giants", requiredItemIds: ["fg5"] },
  { id: "ms:fire_ls", label: "Fire Longsword", areaId: "forest_of_fallen_giants", requiredItemIds: ["fg11"] },
  { id: "ms:soldier_key", label: "Soldier Key", areaId: "forest_of_fallen_giants", requiredItemIds: ["fg17"] },
  { id: "ms:lost_bastille", label: "Reach Lost Bastille", areaId: "lost_bastille", requiredItemIds: ["lb1"] },
  { id: "ms:dull_ember", label: "Dull Ember", areaId: "lost_bastille", requiredItemIds: ["lb2"] },
  { id: "ms:mcduff", label: "McDuff (Infusion)", areaId: "lost_bastille", requiredItemIds: ["lb7"] },
  { id: "ms:licia", label: "Licia Path", areaId: "huntsmans_copse", requiredItemIds: ["hc1"] },
  { id: "ms:shaded_woods", label: "Shaded Woods", areaId: "shaded_woods", requiredItemIds: ["sw1"] },
  { id: "ms:4_lord_souls", label: "4 Lord Souls", areaId: "drangleic_castle", requiredItemIds: ["fg17", "sr5", "ik9", "bc8"] },
  { id: "ms:shrine_winter", label: "Shrine of Winter", areaId: "drangleic_castle", requiredItemIds: ["dc1"] },
  { id: "ms:kings_ring", label: "King's Ring", areaId: "undead_crypt", requiredItemIds: ["uc6"] },
  { id: "ms:aldia", label: "Aldia's Keep", areaId: "aldias_keep", requiredItemIds: ["ak1"] },
  { id: "ms:ashen_mist", label: "Ashen Mist Heart", areaId: "dragon_aerie", requiredItemIds: ["da6"] },
  { id: "ms:throne", label: "Throne of Want", areaId: "throne_of_want", requiredItemIds: ["tw1"] },
];

export { SEMI_FAST_SKIP_IDS } from "./semiFastConstants";

/** Areas shown in semi-fast sidebar — excludes optional areas (Doors of Pharros, Dark Chasm). */
export const SEMI_FAST_AREA_ORDER = AREA_ORDER.filter(
  (a) => a !== "doors_of_pharros" && a !== "dark_chasm"
) as readonly AreaId[];

function shouldSkipSemiFastItem(item: AreaItem): boolean {
  if (SEMI_FAST_SKIP_IDS.has(item.id)) return true;
  if (/optional/i.test(item.text)) return true;
  if (item.questRef?.startsWith("lucatiel_boss")) return true;
  const tags = item.tags ?? [];
  if (tags.includes("illusory") || tags.includes("pharros") || tags.includes("covenant")) return true;
  return false;
}

/** Returns only main-path items for semi-fast run — skips optional, drops, sub-areas. */
export function getSemiFastItems(area: Area): AreaItem[] {
  return area.items.filter((i) => !shouldSkipSemiFastItem(i));
}

export function getSkimmedKey(areaId: AreaId): string {
  return `skimmed:${areaId}`;
}

function isConditionMet(
  cond: UnlockCondition,
  checked: Record<string, boolean>,
  getAreaSkimmed: (a: AreaId) => boolean
): boolean {
  if (cond.type === "or" && cond.or) {
    return cond.or.some((c) => isConditionMet(c, checked, getAreaSkimmed));
  }
  if (cond.type === "area" && cond.id) {
    return getAreaSkimmed(cond.id as AreaId);
  }
  if (cond.type === "item" && cond.id) {
    if (cond.id === "lord_souls_4") {
      return (
        !!checked["fg17"] &&
        !!checked["sr5"] &&
        !!checked["ik9"] &&
        !!checked["bc8"]
      );
    }
    return !!checked[cond.id];
  }
  if (cond.type === "souls") {
    return true;
  }
  if (cond.type === "boss" && cond.id) {
    const bossToItem: Record<string, string> = {
      pursuer: "fg19",
      dragonrider: "ht5",
      old_dragonslayer: "ht7",
      executioner_chariot: "hc9",
      covetous_demon: "hv6",
      mytha: "ep7",
      royal_rat_vanguard: "pt4",
      the_rotten: "bg9",
      old_iron_king: "ik9",
      looking_glass_knight: "dc10",
      demon_of_song: "sa6",
      guardian_dragon: "ak8",
    };
    const itemId = bossToItem[cond.id];
    return itemId ? !!checked[itemId] : false;
  }
  return true;
}

export function isAreaUnlocked(
  areaId: AreaId,
  checked: Record<string, boolean>,
  getAreaSkimmed: (a: AreaId) => boolean
): boolean {
  const deps = AREA_UNLOCK_DEPS[areaId];
  if (!deps || deps.length === 0) return true;
  return deps.every((d) => isConditionMet(d, checked, getAreaSkimmed));
}

export function getNextUnlockHint(
  currentAreaId: AreaId,
  checked: Record<string, boolean>,
  getAreaSkimmed: (a: AreaId) => boolean
): string | null {
  const idx = AREA_ORDER.indexOf(currentAreaId);
  if (idx >= AREA_ORDER.length - 1) return null;

  const nextArea = AREA_ORDER[idx + 1];
  const deps = AREA_UNLOCK_DEPS[nextArea];
  if (!deps || deps.length === 0) return null;

  const unmet = deps.filter((d) => !isConditionMet(d, checked, getAreaSkimmed));
  if (unmet.length === 0) return null;

  const first = unmet[0];
  if (first.type === "item" && first.id) return `Need: ${first.id}`;
  if (first.type === "area" && first.id) return `Visit: ${first.id}`;
  if (first.type === "boss" && first.id) return `Boss: ${first.id}`;
  return null;
}
