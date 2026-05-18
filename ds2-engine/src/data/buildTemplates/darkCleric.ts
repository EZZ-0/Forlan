/**
 * Dark Cleric — Faith / hex hybrid
 * Source: DS2_ALL_BUILDS_A-Z #4
 */

import type { BuildTemplate } from "./types";
import { CLASS_BASE_STATS } from "./types";
import { generateLevelRoadmap } from "./levelGenerator";
import type { StatKey } from "../simulator/types";
import type { BuildStep } from "../buildChecklist";
import type { BuildItem } from "../buildItems";

const BASE = CLASS_BASE_STATS.cleric;

const PHASE_TARGETS: BuildTemplate["phaseTargets"] = {
  1: { INT: 14, FTH: 16, ATN: 10, VGR: 12, END: 7, ADP: 8 },
  2: { INT: 16, FTH: 22, ATN: 15, VGR: 14, END: 10, ADP: 11 },
  3: { INT: 17, FTH: 27, ATN: 19, VGR: 16, END: 13, ADP: 13 },
  4: { INT: 18, FTH: 33, ATN: 24, VGR: 18, END: 16, ADP: 16 },
  5: { INT: 20, FTH: 37, ATN: 28, VGR: 19, END: 19, ADP: 19 },
  6: { INT: 20, FTH: 40, ATN: 30, VGR: 20, END: 20, ADP: 20, VIT: 10, STR: 12, DEX: 5 },
};

const PHASE_PRIORITY: Record<number, StatKey[]> = {
  1: ["INT", "FTH", "ATN", "VGR", "END", "ADP"],
  2: ["INT", "FTH", "ATN", "VGR", "END", "ADP"],
  3: ["FTH", "INT", "ATN", "VGR", "END", "ADP"],
  4: ["FTH", "INT", "ATN", "VGR", "END", "ADP"],
  5: ["FTH", "ATN", "INT", "VGR", "END", "ADP"],
  6: ["FTH", "ATN", "INT", "VGR", "END", "ADP"],
};

const LEVELS = generateLevelRoadmap({
  startingClass: "cleric",
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  milestoneNotes: {
    "15:INT": "★ Felkin shop (8/8 base)",
    "30:FTH": "★ 20/20 — Dark Weapon, Sunset Staff",
    "45:FTH": "★ Chime of Want path opens",
    "150:FTH": "★★ BUILD COMPLETE — SL 150",
  },
});

const BUILD_STEPS: BuildStep[] = [
  { id: "dc:0", progressId: "build:dc:mace", name: "Mace +10 (Cleric start)", areaId: "things_betwixt", phase: 1, type: "weapon", source: "Starting gear → Lenigrast" },
  { id: "dc:1", progressId: "fg5", name: "Lenigrast's Key", areaId: "forest_of_fallen_giants", phase: 1, type: "key", source: "Melentia (1,000 souls)" },
  { id: "dc:2", progressId: "fg15", name: "Ring of Blades", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "Pursuer" },
  { id: "dc:3", progressId: "fg21", name: "Chloranthy Ring", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "FoFG Pharros" },
  { id: "dc:4", progressId: "hc3", name: "Meet Felkin (hex shop)", areaId: "huntsmans_copse", phase: 2, type: "key", source: "8 INT + 8 FTH base to browse" },
  { id: "dc:5", progressId: "hc14", name: "Dark Orb", areaId: "huntsmans_copse", phase: 2, type: "spell", source: "Felkin (600 souls)" },
  { id: "dc:6", progressId: "build:dc:archdrake_chime", name: "Archdrake Chime +10", areaId: "huntsmans_copse", phase: 2, type: "catalyst", source: "Blue Sentinels or Shrine of Winter trade" },
  { id: "dc:7", progressId: "build:sunset_staff", name: "Sunset Staff", areaId: "huntsmans_copse", phase: 2, type: "catalyst", source: "Felkin FREE at 20/20 base INT/FTH" },
  { id: "dc:8", progressId: "build:dark_weapon", name: "Dark Weapon", areaId: "huntsmans_copse", phase: 2, type: "spell", source: "Felkin (2,700 souls)" },
  { id: "dc:9", progressId: "lb2", name: "Dull Ember", areaId: "lost_bastille", phase: 2, type: "key", source: "Tower Apart" },
  { id: "dc:10", progressId: "lb7", name: "Give Dull Ember to McDuff", areaId: "lost_bastille", phase: 2, type: "key", source: "Dark infusions" },
  { id: "dc:11", progressId: "sw1", name: "Unpetrify Rosabeth", areaId: "shaded_woods", phase: 3, type: "key", source: "Fragrant Branch" },
  { id: "dc:12", progressId: "build:pyromancy_flame", name: "Pyromancy Flame +10", areaId: "shaded_woods", phase: 3, type: "catalyst", source: "Rosabeth after unpetrify" },
  { id: "dc:13", progressId: "bc15", name: "Southern Ritual Band", areaId: "brightstone_cove", phase: 3, type: "ring", source: "Corpse in spider halls" },
  { id: "dc:14", progressId: "hc8", name: "Skeleton Lords (Clear Bluestone path)", areaId: "huntsmans_copse", phase: 3, type: "key", source: "NG+ or Ascetic for +2 ring" },
  { id: "dc:15", progressId: "hc12", name: "Clear Bluestone Ring +2", areaId: "huntsmans_copse", phase: 4, type: "ring", source: "Skeleton Lords NG+" },
  { id: "dc:16", progressId: "sa3", name: "Sunlight Blade / lightning spells", areaId: "shrine_of_amana", phase: 4, type: "spell", source: "Chest hidden path (miracle backup)" },
  { id: "dc:17", progressId: "da10", name: "Third Dragon Ring", areaId: "dragon_aerie", phase: 4, type: "ring", source: "Dragon Shrine chest" },
  { id: "dc:18", progressId: "tw3", name: "Nashandra (Chime of Want soul)", areaId: "throne_of_want", phase: 4, type: "key", source: "Final boss" },
  { id: "dc:19", progressId: "mj20", name: "Chime of Want +5", areaId: "majula", phase: 4, type: "catalyst", source: "Ornifex (Nashandra soul)" },
  { id: "dc:20", progressId: "ch6", name: "Resonant Soul / Dead Again", areaId: "dark_chasm", phase: 4, type: "spell", source: "Grandahl Pilgrims ranks", optional: true },
  { id: "dc:21", progressId: "d111", name: "Dark Clutch Ring", areaId: "dlc_sunken", phase: 5, type: "ring", source: "Crown of the Sunken King DLC" },
];

const BUILD_ITEMS: BuildItem[] = [
  { name: "Mace", type: "weapon", role: "Melee backup", phase: 1, whereToFind: [{ type: "vendor", location: "Cleric start", detail: "Lightning or Dark infuse at McDuff" }] },
  { name: "Archdrake Chime", type: "catalyst", role: "Early casting", phase: 2, whereToFind: [{ type: "trade", location: "Blue Sentinels / Shrine of Winter", detail: "16 FTH req" }] },
  { name: "Sunset Staff", type: "catalyst", role: "Dark Weapon catalyst", phase: 2, whereToFind: [{ type: "vendor", location: "Felkin", detail: "FREE at 20/20 base stats" }] },
  { name: "Chime of Want", type: "catalyst", role: "Best dark chime", phase: 4, whereToFind: [{ type: "trade", location: "Ornifex", detail: "Nashandra soul", unlock: "Throne of Want" }] },
  { name: "Pyromancy Flame", type: "catalyst", role: "Pyro backup", phase: 3, whereToFind: [{ type: "vendor", location: "Rosabeth", detail: "After unpetrify" }] },
  { name: "Dark Orb", type: "spell", role: "Primary ranged hex", phase: 2, whereToFind: [{ type: "vendor", location: "Felkin", detail: "600 souls" }] },
  { name: "Dark Weapon", type: "spell", role: "Weapon buff", phase: 2, whereToFind: [{ type: "vendor", location: "Felkin", detail: "20/20 base" }] },
  { name: "Great Heal", type: "spell", role: "Heal", phase: 2, whereToFind: [{ type: "vendor", location: "Licia / Felkin", detail: "Miracle vendors" }] },
  { name: "Heavenly Thunder", type: "spell", role: "AoE lightning", phase: 3, whereToFind: [{ type: "vendor", location: "Licia", detail: "Faith investment" }] },
  { name: "Southern Ritual Band", type: "ring", role: "+3 spell slots", phase: 3, whereToFind: [{ type: "corpse", location: "Brightstone Cove", detail: "Spider area" }] },
  { name: "Clear Bluestone Ring +2", type: "ring", role: "Cast speed", phase: 4, whereToFind: [{ type: "boss", location: "Skeleton Lords", detail: "NG+ Huntsman's Copse" }] },
  { name: "Dark Clutch Ring", type: "ring", role: "Dark damage boost", phase: 5, whereToFind: [{ type: "chest", location: "Shulva DLC", detail: "Crown of the Sunken King" }] },
];

export const darkCleric: BuildTemplate = {
  id: "dark-cleric",
  name: "Dark Cleric",
  description: "Faith-focused dark miracles and melee. Mace + Chime of Want, hex support.",
  source: "DS2_ALL_BUILDS_A-Z",
  startingClass: "cleric",
  baseStats: { ...BASE },
  levels: LEVELS,
  phaseInfo: [
    { num: 1, name: "Mace + Chime", range: "SL 15→35", color: "#6b7c52", areas: "Betwixt → FoFG" },
    { num: 2, name: "20/20 Hex", range: "SL 36→70", color: "#c8a030", areas: "Huntsman's → Bastille" },
    { num: 3, name: "Chime of Want", range: "SL 71→110", color: "#d4862a", areas: "Shaded Woods → Brightstone" },
    { num: 4, name: "Complete Build", range: "SL 111→150", color: "#a03030", areas: "Throne → DLC" },
  ],
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  weapons: [
    { name: "Mace +10", role: "Primary melee", phase: 1, infusion: "Lightning or Dark", stats: "12 STR" },
    { name: "Chime of Want +5", role: "Dark chime", phase: 4, infusion: "Dark", stats: "20 INT / 30 FTH" },
    { name: "Archdrake Chime +10", role: "Early chime", phase: 2, infusion: "None", stats: "16 FTH" },
    { name: "Pyromancy Flame +10", role: "Pyro backup", phase: 3, infusion: "N/A", stats: "—" },
  ],
  spells: [
    { name: "Dark Orb", school: "Hex", purpose: "Primary ranged" },
    { name: "Dark Weapon", school: "Hex", purpose: "Weapon buff" },
    { name: "Great Heal", school: "Miracle", purpose: "Heal" },
    { name: "Heavenly Thunder", school: "Miracle", purpose: "AoE lightning" },
    { name: "Dead Again", school: "Hex", purpose: "Corpse explode (niche)" },
  ],
  keyRings: [
    { name: "Southern Ritual Band", effect: "+3 spell slots", source: "Brightstone Cove" },
    { name: "Clear Bluestone Ring +2", effect: "Cast speed", source: "Skeleton Lords NG+" },
    { name: "Ring of Blades", effect: "Physical AR", source: "Pursuer" },
    { name: "Third Dragon Ring", effect: "HP/Stamina/Equip", source: "Dragon Shrine" },
    { name: "Dark Clutch Ring", effect: "Dark damage", source: "DLC" },
  ],
  ringsDetail: {
    priorityOrder: ["Southern Ritual Band", "Clear Bluestone Ring +2", "Ring of Blades", "Third Dragon Ring", "Dark Clutch Ring"],
    groups: [
      { label: "Caster core", ringNames: ["Southern Ritual Band", "Clear Bluestone Ring +2", "Dark Clutch Ring"] },
      { label: "Survival", ringNames: ["Ring of Blades", "Third Dragon Ring", "Chloranthy Ring"] },
    ],
    rings: [
      { name: "Southern Ritual Band", priority: "core", effect: "+3 spell slots — frees ATN.", whereToGet: "Brightstone Cove", howToGet: "Corpse in spider section.", phase: 3 },
      { name: "Clear Bluestone Ring +2", priority: "core", effect: "Faster cast speed.", whereToGet: "Huntsman's Copse", howToGet: "Skeleton Lords in NG+.", phase: 4 },
      { name: "Dark Clutch Ring", priority: "core", effect: "+20% dark damage, -50% physical absorption.", whereToGet: "Shulva DLC", howToGet: "Crown of the Sunken King.", phase: 5 },
      { name: "Ring of Blades", priority: "optional", effect: "Flat AR for mace.", whereToGet: "FoFG", howToGet: "Pursuer drop.", phase: 1 },
      { name: "Third Dragon Ring", priority: "optional", effect: "HP/stamina/load.", whereToGet: "Dragon Shrine", howToGet: "Chest before Ancient Dragon.", phase: 4 },
    ],
  },
  buildSteps: BUILD_STEPS,
  buildItems: BUILD_ITEMS,
  buildMaterialFarms: [
    {
      item: "Darknight Stone",
      purpose: "Dark infuse mace, Sunset Staff, Chime of Want",
      sources: [{ type: "vendor", location: "Chloanne", detail: "After King's Ring" }],
      farmOptions: [{ enemy: "Leydia Pyromancer", area: "Undead Crypt", method: "Infinite respawn", unlock: "Undead Crypt" }],
    },
    {
      item: "Fire Seeds",
      purpose: "Pyromancy Flame +10",
      sources: [{ type: "vendor", location: "Straid, Chloanne", detail: "Limited" }],
      farmOptions: [{ enemy: "Desert Sorceress", area: "Earthen Peak", method: "CoC farm", unlock: "Earthen Peak" }],
    },
  ],
};
