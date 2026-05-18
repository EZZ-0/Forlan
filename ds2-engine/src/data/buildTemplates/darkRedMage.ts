/**
 * Dark Red Mage — hexes, pyro, dark melee
 * Source: DS2_ALL_BUILDS_A-Z #21
 */

import type { BuildTemplate } from "./types";
import { CLASS_BASE_STATS } from "./types";
import { generateLevelRoadmap } from "./levelGenerator";
import type { StatKey } from "../simulator/types";
import type { BuildStep } from "../buildChecklist";
import type { BuildItem } from "../buildItems";

const BASE = CLASS_BASE_STATS.sorcerer;

const PHASE_TARGETS: BuildTemplate["phaseTargets"] = {
  1: { VGR: 9, END: 10, VIT: 6, ATN: 19, STR: 6, DEX: 10, ADP: 11, INT: 18, FTH: 10 },
  2: { VGR: 13, END: 13, VIT: 7, ATN: 25, STR: 8, DEX: 13, ADP: 13, INT: 21, FTH: 15 },
  3: { VGR: 16, END: 15, VIT: 8, ATN: 30, STR: 10, DEX: 15, ADP: 15, INT: 23, FTH: 19 },
  4: { VGR: 20, END: 18, VIT: 9, ATN: 36, STR: 12, DEX: 17, ADP: 17, INT: 26, FTH: 24 },
  5: { VGR: 23, END: 21, VIT: 10, ATN: 40, STR: 13, DEX: 19, ADP: 19, INT: 29, FTH: 28 },
  6: { VGR: 25, END: 22, VIT: 10, ATN: 43, STR: 14, DEX: 20, ADP: 20, INT: 30, FTH: 30 },
};

const PHASE_PRIORITY: Record<number, StatKey[]> = {
  1: ["INT", "FTH", "ATN", "DEX", "STR", "VGR", "END", "ADP", "VIT"],
  2: ["INT", "FTH", "ATN", "DEX", "STR", "VGR", "END", "ADP", "VIT"],
  3: ["INT", "FTH", "ATN", "DEX", "STR", "VGR", "END", "ADP", "VIT"],
  4: ["INT", "FTH", "ATN", "DEX", "STR", "VGR", "END", "ADP", "VIT"],
  5: ["INT", "FTH", "ATN", "DEX", "STR", "VGR", "END", "ADP", "VIT"],
  6: ["INT", "FTH", "ATN", "DEX", "STR", "VGR", "END", "ADP", "VIT"],
};

const LEVELS = generateLevelRoadmap({
  startingClass: "sorcerer",
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  milestoneNotes: {
    "20:INT": "★ Felkin shop (20/20 base for Sunset Staff)",
    "30:INT": "★ 30/30 INT/FTH — dark + pyro soft cap",
    "14:STR": "★ Dark Uchigatana req",
    "43:ATN": "★ ATN 43 — 7 spell slots",
    "150:INT": "★★ BUILD COMPLETE — SL 150",
  },
});

const BUILD_STEPS: BuildStep[] = [
  { id: "drm:0", progressId: "build:drm:staff", name: "Sorcerer's Staff +10 (Sorcerer start)", areaId: "things_betwixt", phase: 1, type: "catalyst", source: "Starting gear → Lenigrast" },
  { id: "drm:1", progressId: "fg11", name: "Fire Longsword", areaId: "forest_of_fallen_giants", phase: 1, type: "weapon", source: "FoFG chest — early melee" },
  { id: "drm:2", progressId: "fg5", name: "Lenigrast's Key", areaId: "forest_of_fallen_giants", phase: 1, type: "key", source: "Melentia (1,000 souls)" },
  { id: "drm:3", progressId: "fg12", name: "Open Lenigrast's shop", areaId: "majula", phase: 1, type: "key", source: "Return to Majula" },
  { id: "drm:4", progressId: "fg15", name: "Ring of Blades", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "Pursuer drop" },
  { id: "drm:5", progressId: "fg21", name: "Chloranthy Ring", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "FoFG Pharros ballista room" },
  { id: "drm:6", progressId: "hc3", name: "Meet Felkin (hex shop)", areaId: "huntsmans_copse", phase: 2, type: "key", source: "8 INT + 8 FTH base to browse" },
  { id: "drm:7", progressId: "hc14", name: "Dark Orb", areaId: "huntsmans_copse", phase: 2, type: "spell", source: "Felkin (600 souls) — primary ranged" },
  { id: "drm:8", progressId: "build:sunset_staff", name: "Sunset Staff", areaId: "huntsmans_copse", phase: 2, type: "catalyst", source: "Felkin FREE at 20/20 base INT/FTH" },
  { id: "drm:9", progressId: "build:dark_weapon", name: "Dark Weapon", areaId: "huntsmans_copse", phase: 2, type: "spell", source: "Felkin (2,700 souls)" },
  { id: "drm:10", progressId: "lb2", name: "Dull Ember", areaId: "lost_bastille", phase: 2, type: "key", source: "Tower Apart chest" },
  { id: "drm:11", progressId: "lb7", name: "Give Dull Ember to McDuff", areaId: "lost_bastille", phase: 2, type: "key", source: "Dark Stone infusion" },
  { id: "drm:12", progressId: "build:uchigatana", name: "Uchigatana +10", areaId: "lost_bastille", phase: 3, type: "weapon", source: "McDuff (5,000 souls)" },
  { id: "drm:13", progressId: "build:drm:dark_uchi", name: "Dark Uchigatana +10", areaId: "lost_bastille", phase: 3, type: "infusion", source: "Dark infuse at McDuff — 14 STR / 20 DEX" },
  { id: "drm:14", progressId: "sw1", name: "Unpetrify Rosabeth", areaId: "shaded_woods", phase: 3, type: "key", source: "Fragrant Branch" },
  { id: "drm:15", progressId: "build:pyromancy_flame", name: "Pyromancy Flame +10", areaId: "shaded_woods", phase: 3, type: "catalyst", source: "Rosabeth after unpetrify" },
  { id: "drm:16", progressId: "build:fp:flame_swathe", name: "Flame Swathe", areaId: "shaded_woods", phase: 3, type: "spell", source: "Rosabeth — boss nuke" },
  { id: "drm:17", progressId: "ik14", name: "Flame Weapon", areaId: "iron_keep", phase: 3, type: "spell", source: "Iron Keep chest near Smelter" },
  { id: "drm:18", progressId: "build:drm:great_chaos_fireball", name: "Great Chaos Fireball", areaId: "iron_keep", phase: 3, type: "spell", source: "Iron Keep chest" },
  { id: "drm:19", progressId: "bc15", name: "Southern Ritual Band", areaId: "brightstone_cove", phase: 4, type: "ring", source: "Corpse in spider halls" },
  { id: "drm:20", progressId: "ak12", name: "Forbidden Sun", areaId: "aldias_keep", phase: 4, type: "spell", source: "Navlaan (pull lever) — pyro nuke" },
  { id: "drm:21", progressId: "ch6", name: "Great Resonant Soul (Grandahl Rank 2)", areaId: "dark_chasm", phase: 4, type: "spell", source: "Pilgrims of Dark" },
  { id: "drm:22", progressId: "build:drm:abyss_seal", name: "Abyss Seal", areaId: "dark_chasm", phase: 4, type: "ring", source: "Grandahl Pilgrims Rank 2 (+20% hex, HP drain)" },
  { id: "drm:23", progressId: "build:drm:caitha_chime", name: "Caitha's Chime +10", areaId: "the_gutter", phase: 4, type: "catalyst", source: "Corpse in Gutter — chime hex backup", optional: true },
  { id: "drm:24", progressId: "hc8", name: "Skeleton Lords (Clear Bluestone path)", areaId: "huntsmans_copse", phase: 4, type: "key", source: "NG+ for +2 ring" },
  { id: "drm:25", progressId: "hc12", name: "Clear Bluestone Ring +2", areaId: "huntsmans_copse", phase: 4, type: "ring", source: "Skeleton Lords NG+" },
  { id: "drm:26", progressId: "da10", name: "Third Dragon Ring", areaId: "dragon_aerie", phase: 4, type: "ring", source: "Dragon Shrine chest" },
  { id: "drm:27", progressId: "d111", name: "Dark Clutch Ring", areaId: "dlc_sunken", phase: 4, type: "ring", source: "Crown of the Sunken King DLC" },
  { id: "drm:28", progressId: "build:drm:heavenly_thunder", name: "Heavenly Thunder", areaId: "shrine_of_amana", phase: 4, type: "spell", source: "Licia — miracle AoE lightning", optional: true },
  { id: "drm:29", progressId: "build:drm:30_30", name: "30/30 INT/FTH reached", areaId: "brightstone_cove", phase: 4, type: "key", source: "Dark + pyro scaling soft cap" },
];

const BUILD_ITEMS: BuildItem[] = [
  { name: "Dark Uchigatana", type: "weapon", role: "Primary dark melee", phase: 3, whereToFind: [{ type: "vendor", location: "McDuff", detail: "Uchigatana → dark infuse", unlock: "Lost Bastille" }], notes: "14 STR / 20 DEX." },
  { name: "Fire Longsword", type: "weapon", role: "Early melee", phase: 1, whereToFind: [{ type: "chest", location: "FoFG", detail: "Near Cardinal Tower", unlock: "FoFG" }] },
  { name: "Sunset Staff", type: "catalyst", role: "Hexes + Dark Weapon", phase: 2, whereToFind: [{ type: "vendor", location: "Felkin", detail: "FREE at 20/20 base stats" }] },
  { name: "Pyromancy Flame", type: "catalyst", role: "Pyromancy", phase: 3, whereToFind: [{ type: "vendor", location: "Rosabeth", detail: "After unpetrify", unlock: "Shaded Woods" }] },
  { name: "Caitha's Chime", type: "catalyst", role: "Chime hexes", phase: 4, whereToFind: [{ type: "corpse", location: "The Gutter", detail: "Hidden path", unlock: "The Gutter" }], optional: true },
  { name: "Dark Orb", type: "spell", role: "Primary ranged hex", phase: 2, whereToFind: [{ type: "vendor", location: "Felkin", detail: "600 souls" }] },
  { name: "Dark Weapon", type: "spell", role: "Weapon buff", phase: 2, whereToFind: [{ type: "vendor", location: "Felkin", detail: "20/20 base" }] },
  { name: "Flame Swathe", type: "spell", role: "Boss nuke", phase: 3, whereToFind: [{ type: "vendor", location: "Rosabeth", detail: "After unpetrify" }] },
  { name: "Great Chaos Fireball", type: "spell", role: "AoE pyro", phase: 3, whereToFind: [{ type: "chest", location: "Iron Keep", detail: "Near Smelter area", unlock: "Iron Keep" }] },
  { name: "Forbidden Sun", type: "spell", role: "Pyro nuke", phase: 4, whereToFind: [{ type: "vendor", location: "Navlaan", detail: "Aldia's Keep lever", unlock: "Aldia's Keep" }] },
  { name: "Great Resonant Soul", type: "spell", role: "Hex nuke (souls)", phase: 4, whereToFind: [{ type: "vendor", location: "Grandahl", detail: "Pilgrims Rank 2", unlock: "Dark Chasm" }] },
  { name: "Heavenly Thunder", type: "spell", role: "Miracle AoE", phase: 4, whereToFind: [{ type: "vendor", location: "Licia", detail: "Faith investment" }], optional: true },
  { name: "Abyss Seal", type: "ring", role: "+20% hex damage, HP drain", phase: 4, whereToFind: [{ type: "vendor", location: "Grandahl", detail: "Pilgrims Rank 2", unlock: "Dark Chasm" }] },
  { name: "Southern Ritual Band", type: "ring", role: "+3 spell slots", phase: 4, whereToFind: [{ type: "corpse", location: "Brightstone Cove", detail: "Spider halls" }] },
  { name: "Clear Bluestone Ring +2", type: "ring", role: "Cast speed", phase: 4, whereToFind: [{ type: "boss", location: "Skeleton Lords", detail: "NG+ Huntsman's Copse" }] },
  { name: "Dark Clutch Ring", type: "ring", role: "Dark damage boost", phase: 4, whereToFind: [{ type: "chest", location: "Shulva DLC", detail: "Crown of the Sunken King" }] },
  { name: "Third Dragon Ring", type: "ring", role: "HP/Stamina/Equip", phase: 4, whereToFind: [{ type: "chest", location: "Dragon Shrine", detail: "Before Ancient Dragon", unlock: "Dragon Aerie" }] },
];

export const darkRedMage: BuildTemplate = {
  id: "dark-red-mage",
  name: "Dark Red Mage",
  description: "Hexes, pyromancy, and dark-infused melee. 30/30 INT/FTH, versatile element coverage.",
  source: "DS2_ALL_BUILDS_A-Z",
  startingClass: "sorcerer",
  baseStats: { ...BASE },
  levels: LEVELS,
  phaseInfo: [
    { num: 1, name: "Fire LS + Staff", range: "SL 11→40", color: "#6b7c52", areas: "Betwixt → FoFG" },
    { num: 2, name: "20/20 Felkin", range: "SL 41→70", color: "#c8a030", areas: "Heide's → Huntsman's" },
    { num: 3, name: "Dark Melee + Pyro", range: "SL 71→100", color: "#d4862a", areas: "Bastille → Iron Keep" },
    { num: 4, name: "Complete Build", range: "SL 101→150", color: "#a03030", areas: "Brightstone → DLC" },
  ],
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  weapons: [
    { name: "Dark Uchigatana +10", role: "Primary melee", phase: 3, infusion: "Dark", stats: "14 STR / 20 DEX" },
    { name: "Sunset Staff +5", role: "Hexes", phase: 2, infusion: "Dark", stats: "22 INT / 22 FTH" },
    { name: "Pyromancy Flame +10", role: "Pyromancy", phase: 3, infusion: "N/A", stats: "30 INT / 30 FTH" },
    { name: "Caitha's Chime +10", role: "Chime hexes", phase: 4, infusion: "Dark", stats: "22 INT / 22 FTH" },
  ],
  spells: [
    { name: "Dark Orb", school: "Hex", purpose: "Primary ranged" },
    { name: "Dark Weapon", school: "Hex", purpose: "Weapon buff" },
    { name: "Flame Swathe", school: "Pyromancy", purpose: "Boss nuke" },
    { name: "Great Chaos Fireball", school: "Pyromancy", purpose: "AoE" },
    { name: "Great Resonant Soul", school: "Hex", purpose: "Nuke (souls)" },
    { name: "Forbidden Sun", school: "Pyromancy", purpose: "Nuke" },
    { name: "Heavenly Thunder", school: "Miracle", purpose: "AoE lightning" },
  ],
  keyRings: [
    { name: "Southern Ritual Band", effect: "+3 slots", source: "Brightstone Cove" },
    { name: "Clear Bluestone Ring +2", effect: "Cast speed", source: "Skeleton Lords NG+" },
    { name: "Third Dragon Ring", effect: "HP/Stamina/Equip", source: "Dragon Shrine" },
    { name: "Dark Clutch Ring", effect: "Dark damage", source: "DLC" },
    { name: "Abyss Seal", effect: "Hex +20%", source: "Grandahl Rank 2" },
  ],
  ringsDetail: {
    priorityOrder: ["Southern Ritual Band", "Abyss Seal", "Clear Bluestone Ring +2", "Dark Clutch Ring", "Third Dragon Ring", "Chloranthy Ring"],
    groups: [
      { label: "Caster core", ringNames: ["Southern Ritual Band", "Abyss Seal", "Clear Bluestone Ring +2", "Dark Clutch Ring"] },
      { label: "Survival", ringNames: ["Third Dragon Ring", "Chloranthy Ring", "Ring of Blades"] },
    ],
    rings: [
      { name: "Southern Ritual Band", priority: "core", effect: "+3 slots — seven-school loadout at ATN 43.", whereToGet: "Brightstone Cove", howToGet: "Spider halls corpse.", phase: 4 },
      { name: "Abyss Seal", priority: "core", effect: "+20% hex damage, drains HP per cast.", whereToGet: "Dark Chasm", howToGet: "Grandahl Pilgrims of Dark Rank 2.", phase: 4 },
      { name: "Clear Bluestone Ring +2", priority: "core", effect: "Cast speed for hex/pyro/miracle swaps.", whereToGet: "Huntsman's Copse", howToGet: "Skeleton Lords NG+.", phase: 4 },
      { name: "Dark Clutch Ring", priority: "core", effect: "+20% dark on Uchigatana and hexes.", whereToGet: "Shulva DLC", howToGet: "Crown of the Sunken King.", phase: 4 },
      { name: "Third Dragon Ring", priority: "optional", effect: "HP/stamina for light armor caster.", whereToGet: "Dragon Shrine", howToGet: "Chest before Ancient Dragon.", phase: 4 },
      { name: "Chloranthy Ring", priority: "optional", effect: "Stamina for katana + casting.", whereToGet: "FoFG", howToGet: "Pharros ballista room.", phase: 1 },
    ],
  },
  buildSteps: BUILD_STEPS,
  buildItems: BUILD_ITEMS,
  buildMaterialFarms: [
    {
      item: "Darknight Stone",
      purpose: "Dark Uchigatana, Sunset Staff, Caitha's Chime",
      sources: [{ type: "vendor", location: "Chloanne", detail: "After King's Ring", unlock: "King's Ring" }],
      farmOptions: [{ enemy: "Leydia Pyromancer", area: "Undead Crypt", method: "Infinite respawn", unlock: "Undead Crypt" }],
    },
    {
      item: "Fire Seeds",
      purpose: "Pyromancy Flame +10",
      sources: [{ type: "vendor", location: "Straid, Chloanne", detail: "Limited" }],
      farmOptions: [{ enemy: "Desert Sorceress", area: "Earthen Peak", method: "CoC farm", unlock: "Earthen Peak" }],
    },
    {
      item: "Titanite (Shards, Large, Chunks, Slab)",
      purpose: "Uchigatana +10, Fire Longsword +10",
      sources: [{ type: "vendor", location: "Lenigrast, McDuff, Chloanne", detail: "See Farming tab" }],
      farmOptions: [{ enemy: "Alonne Knight", area: "Iron Keep", method: "Chunks. CoC.", unlock: "Iron Keep" }],
    },
    {
      item: "Twinkling Titanite",
      purpose: "Sunset Staff +5",
      sources: [{ type: "vendor", location: "Chloanne", detail: "After King's Ring" }],
      farmOptions: [{ enemy: "Crystal Lizard", area: "Dragon Aerie", method: "Rare drop", unlock: "Dragon Aerie" }],
    },
  ],
};
