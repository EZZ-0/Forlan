/**
 * Build connections — links Areas and Items (Boss Souls) to the Dark Melee Hexer build.
 * Used by Areas tab and Items tab to show relevant gear when data crosses paths.
 */

import type { AreaId } from "./areas";

export interface BuildGearInArea {
  type: "weapon" | "ring" | "spell" | "armor" | "catalyst" | "key";
  name: string;
  role: string;
  phase: number;
  source: string; // Brief: "Chest", "Felkin", "Pursuer drop", etc.
}

/** Build gear (weapons, rings, spells) found in each area */
export const BUILD_GEAR_BY_AREA: Partial<Record<AreaId, BuildGearInArea[]>> = {
  things_betwixt: [],
  majula: [
    { type: "weapon", name: "Lightning Mace", role: "Dark-resistant swap", phase: 1, source: "Lenigrast (after FoFG)" },
  ],
  forest_of_fallen_giants: [
    { type: "weapon", name: "Fire Longsword", role: "Early + fire backup", phase: 1, source: "Salamander chest" },
    { type: "ring", name: "Chloranthy Ring", role: "Stamina regen", phase: 1, source: "FoFG" },
    { type: "ring", name: "Ring of Blades", role: "Flat physical AR", phase: 1, source: "Pursuer drop" },
  ],
  heides_tower: [],
  no_mans_wharf: [],
  lost_bastille: [
    { type: "weapon", name: "Dark Uchigatana", role: "Primary melee (infuse here)", phase: 4, source: "McDuff infusion after Huntsman's" },
  ],
  huntsmans_copse: [
    { type: "weapon", name: "Uchigatana", role: "Primary melee", phase: 4, source: "Weapon drop / buy" },
    { type: "catalyst", name: "Sunset Staff", role: "Primary dark catalyst", phase: 3, source: "Felkin (20/20 base stats; free)" },
    { type: "spell", name: "Dark Orb", role: "Primary ranged hex", phase: 2, source: "Felkin" },
    { type: "spell", name: "Dark Weapon", role: "Weapon buff", phase: 3, source: "Felkin" },
    { type: "ring", name: "Clear Bluestone Ring +2", role: "Cast speed", phase: 5, source: "Skeleton Lords (NG+ or Ascetic)" },
  ],
  harvest_valley: [],
  earthen_peak: [],
  iron_keep: [],
  the_pit: [],
  the_gutter: [],
  black_gulch: [],
  shaded_woods: [
    { type: "catalyst", name: "Pyromancy Flame", role: "Fire spells", phase: 3, source: "Rosabeth (after unpetrify)" },
  ],
  doors_of_pharros: [],
  brightstone_cove: [
    { type: "ring", name: "Southern Ritual Band", role: "+3 spell slots", phase: 5, source: "Brightstone Cove" },
  ],
  sinners_rise: [],
  drangleic_castle: [],
  shrine_of_amana: [
    { type: "spell", name: "Sunlight Blade", role: "Lightning weapon buff", phase: 5, source: "Shrine of Amana" },
  ],
  undead_crypt: [],
  aldias_keep: [],
  dragon_aerie: [
    { type: "ring", name: "Third Dragon Ring", role: "HP/Stamina/Equip Load", phase: 6, source: "Dragon Shrine" },
    { type: "catalyst", name: "Staff of Wisdom", role: "Pure sorcery catalyst", phase: 6, source: "Dragon Shrine" },
  ],
  memories: [],
  dark_chasm: [
    { type: "spell", name: "Resonant Soul", role: "High damage hex", phase: 5, source: "Grandahl (Pilgrims of Dark Rank 1)" },
    { type: "spell", name: "Great Resonant Soul", role: "Hex", phase: 5, source: "Grandahl Rank 2" },
    { type: "spell", name: "Climax", role: "Hex", phase: 5, source: "Grandahl Rank 3" },
  ],
  throne_of_want: [],
  dlc_sunken: [
    { type: "ring", name: "Dark Clutch Ring", role: "Dark damage boost", phase: 6, source: "DLC" },
  ],
  dlc_iron: [
    { type: "ring", name: "Dark Clutch Ring", role: "Dark damage boost", phase: 6, source: "DLC" },
  ],
  dlc_ivory: [
    { type: "ring", name: "Dark Clutch Ring", role: "Dark damage boost", phase: 6, source: "DLC" },
  ],
};

/** Boss soul trade items relevant to Dark Melee Hexer build */
export const BUILD_RELEVANT_BOSS_SOUL_TRADES: Record<string, string> = {
  velstadt: "Lifedrain Patch (hex) — strong hex, fits build",
  rotten: "Old Dead One Soul (NG+) → Crypt Blacksword — top-tier hex weapon",
  dukes_dear_freja: "Old Paledrake Soul (NG+) → Moonlight Greatsword — Benhart achievement",
  nadalia: "Chime of Screams — hex chime, alternative to Chime of Want",
};

/** Inferno Reaper — Red Rust power stance + Black Knight GS + Pyromancy */
const INFERNO_REAPER_GEAR: Partial<Record<AreaId, BuildGearInArea[]>> = {
  forest_of_fallen_giants: [
    { type: "ring", name: "Ring of Blades", role: "Flat physical AR", phase: 1, source: "Pursuer drop" },
  ],
  shaded_woods: [
    { type: "catalyst", name: "Pyromancy Flame", role: "Primary pyromancy", phase: 1, source: "Rosabeth (after unpetrify)" },
  ],
  doors_of_pharros: [
    { type: "weapon", name: "Red Rust Scimitar", role: "Power stance (right)", phase: 1, source: "Vengarl (4,000 souls)" },
    { type: "weapon", name: "Red Rust Sword", role: "Power stance (left)", phase: 1, source: "Vengarl (4,000 souls)" },
  ],
  iron_keep: [
    { type: "spell", name: "Flame Weapon", role: "Weapon buff", phase: 2, source: "Chest near Smelter" },
    { type: "weapon", name: "Black Knight Greatsword", role: "Fire greatsword", phase: 2, source: "Black Knight drop" },
  ],
  aldias_keep: [
    { type: "spell", name: "Forbidden Sun", role: "High damage nuke", phase: 2, source: "Navlaan (pull lever)" },
  ],
  undead_crypt: [
    { type: "ring", name: "Penal Handcuffs", role: "+7.5% pyromancy damage", phase: 3, source: "Boss corridor corpse" },
  ],
  brightstone_cove: [
    { type: "ring", name: "Southern Ritual Band +2", role: "+3 spell slots", phase: 3, source: "NG+ Scorpioness Najka" },
  ],
  dragon_aerie: [
    { type: "ring", name: "Third Dragon Ring", role: "HP/Stamina/Equip Load", phase: 3, source: "Dragon Shrine (before Ancient Dragon)" },
  ],
  throne_of_want: [
    { type: "ring", name: "Ring of Blades +2", role: "Physical AR", phase: 4, source: "Throne Watcher/Defender NG+" },
  ],
  dlc_ivory: [
    { type: "ring", name: "Chloranthy Ring +2", role: "Stamina regen", phase: 3, source: "Ivory King NG+ or Ascetic" },
  ],
  memories: [
    { type: "weapon", name: "Alonne Greatbow", role: "Fire-infused ranged", phase: 2, source: "Memory of the Old Iron King chest" },
  ],
};

/** Dark Chaos Blade Assassin — Chaos Blade, Dark Weapon, 20/20 hex */
const DARK_CHAOS_ASSASSIN_GEAR: Partial<Record<AreaId, BuildGearInArea[]>> = {
  forest_of_fallen_giants: [
    { type: "weapon", name: "Fire Longsword", role: "Early weapon until Chaos Blade", phase: 1, source: "Salamander chest" },
    { type: "ring", name: "Ring of Blades", role: "Flat physical AR", phase: 1, source: "Pursuer drop" },
    { type: "ring", name: "Chloranthy Ring", role: "Stamina regen", phase: 1, source: "Pharros (ballista room)" },
  ],
  no_mans_wharf: [
    { type: "key", name: "Flexile Sentry soul", role: "Chaos Blade trade", phase: 2, source: "Flexile Sentry boss" },
  ],
  lost_bastille: [
    { type: "weapon", name: "Chaos Blade", role: "Primary (trade soul at Ornifex/Straid)", phase: 2, source: "Ornifex/Straid" },
    { type: "key", name: "Dull Ember", role: "McDuff infusion", phase: 2, source: "Tower Apart" },
  ],
  huntsmans_copse: [
    { type: "catalyst", name: "Sunset Staff", role: "Dark Weapon catalyst", phase: 3, source: "Felkin (20/20 base — free)" },
    { type: "spell", name: "Dark Weapon", role: "Essential weapon buff", phase: 3, source: "Felkin" },
  ],
  heides_tower: [
    { type: "ring", name: "Old Leo Ring", role: "Counter damage", phase: 2, source: "Old Dragonslayer" },
  ],
  dragon_aerie: [
    { type: "ring", name: "Third Dragon Ring", role: "HP/Stamina/Equip Load", phase: 3, source: "Dragon Shrine" },
  ],
  throne_of_want: [
    { type: "ring", name: "Ring of Blades +2", role: "Physical AR", phase: 4, source: "Throne Watcher/Defender NG+" },
  ],
  shrine_of_amana: [
    { type: "spell", name: "Sunlight Blade", role: "Late-game lightning buff", phase: 4, source: "Chest (hidden path)" },
  ],
  dark_chasm: [
    { type: "catalyst", name: "Dragon Chime", role: "Best chime for Sunlight Blade", phase: 4, source: "Grandahl (Pilgrims Rank 3 / after Darklurker)" },
  ],
};

/** Per-build gear by area. Default key "dark-melee-hexer" for current build. */
const BUILD_GEAR_BY_BUILD: Record<string, Partial<Record<AreaId, BuildGearInArea[]>>> = {
  "dark-melee-hexer": BUILD_GEAR_BY_AREA,
  "inferno-reaper": INFERNO_REAPER_GEAR,
  "dark-chaos-assassin": DARK_CHAOS_ASSASSIN_GEAR,
};

/** Inferno Reaper boss soul relevance */
const INFERNO_REAPER_BOSS_SOULS: Record<string, string> = {
  old_iron_king: "Memory of the Old Iron King — Alonne Greatbow (chest in memory)",
};

/** Dark Chaos Assassin boss soul relevance. Chaos Blade from Flexile Sentry (No-Man's Wharf) or Lost Sinner NG+ (Old Witch Soul). */
const DARK_CHAOS_ASSASSIN_BOSS_SOULS: Record<string, string> = {
  flexile_sentry: "Flexile Sentry soul → Chaos Blade (Ornifex or Straid)",
  lost_sinner: "Old Witch Soul (NG+) → Chaos Blade (Ornifex)",
};

/** Per-build boss soul trades. Default key "dark-melee-hexer". */
const BOSS_SOUL_TRADES_BY_BUILD: Record<string, Record<string, string>> = {
  "dark-melee-hexer": BUILD_RELEVANT_BOSS_SOUL_TRADES,
  "inferno-reaper": INFERNO_REAPER_BOSS_SOULS,
  "dark-chaos-assassin": DARK_CHAOS_ASSASSIN_BOSS_SOULS,
};

export function getBuildGearForArea(areaId: AreaId, buildTemplateId?: string): BuildGearInArea[] {
  const key = buildTemplateId ?? "dark-melee-hexer";
  const byArea = BUILD_GEAR_BY_BUILD[key] ?? BUILD_GEAR_BY_AREA;
  return byArea[areaId] ?? [];
}

export function isBossSoulRelevantForBuild(bossId: string, buildTemplateId?: string): string | null {
  const key = buildTemplateId ?? "dark-melee-hexer";
  const trades = BOSS_SOUL_TRADES_BY_BUILD[key] ?? BUILD_RELEVANT_BOSS_SOUL_TRADES;
  return trades[bossId] ?? null;
}
