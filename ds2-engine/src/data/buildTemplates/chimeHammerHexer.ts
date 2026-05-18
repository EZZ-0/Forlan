/**
 * Chime Hammer Hexer — Mace of the Insolent + hexes
 * Source: DS2_ALL_BUILDS_A-Z #18
 */

import type { BuildTemplate } from "./types";
import { CLASS_BASE_STATS } from "./types";
import { generateLevelRoadmap } from "./levelGenerator";
import type { StatKey } from "../simulator/types";
import type { BuildStep } from "../buildChecklist";
import type { BuildItem } from "../buildItems";

const BASE = CLASS_BASE_STATS.cleric;

const PHASE_TARGETS: BuildTemplate["phaseTargets"] = {
  1: { VGR: 13, END: 8, VIT: 9, ATN: 11, STR: 13, ADP: 9, INT: 16, FTH: 14 },
  2: { VGR: 16, END: 12, VIT: 10, ATN: 17, STR: 15, ADP: 13, INT: 20, FTH: 18 },
  3: { VGR: 19, END: 16, VIT: 11, ATN: 22, STR: 16, ADP: 16, INT: 22, FTH: 21 },
  4: { VGR: 22, END: 20, VIT: 11, ATN: 28, STR: 18, ADP: 20, INT: 26, FTH: 25 },
  5: { VGR: 24, END: 23, VIT: 12, ATN: 32, STR: 20, ADP: 23, INT: 29, FTH: 28 },
  6: { VGR: 25, END: 25, VIT: 12, ATN: 35, STR: 20, DEX: 5, ADP: 25, INT: 30, FTH: 30 },
};

const PHASE_PRIORITY: Record<number, StatKey[]> = {
  1: ["STR", "INT", "FTH", "ATN", "VGR", "END", "ADP", "VIT", "DEX"],
  2: ["INT", "FTH", "STR", "ATN", "VGR", "END", "ADP", "VIT", "DEX"],
  3: ["INT", "FTH", "ATN", "STR", "VGR", "END", "ADP", "VIT", "DEX"],
  4: ["INT", "FTH", "ATN", "STR", "VGR", "END", "ADP", "VIT", "DEX"],
  5: ["INT", "FTH", "ATN", "STR", "VGR", "END", "ADP", "VIT", "DEX"],
  6: ["INT", "FTH", "ATN", "STR", "VGR", "END", "ADP", "VIT", "DEX"],
};

const LEVELS = generateLevelRoadmap({
  startingClass: "cleric",
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  milestoneNotes: {
    "20:INT": "★ 20/20 — Dark Weapon, Sunset Staff (Felkin)",
    "30:INT": "★ 30/30 dark soft cap",
    "15:STR": "★ Mace of the Insolent req",
    "35:ATN": "★ Spell slots for hex suite",
    "150:INT": "★★ BUILD COMPLETE — SL 150",
  },
});

const BUILD_STEPS: BuildStep[] = [
  { id: "chh:0", progressId: "build:chh:mace", name: "Mace +10 (Cleric start)", areaId: "things_betwixt", phase: 1, type: "weapon", source: "Starting gear → Lenigrast — strike until Insolent" },
  { id: "chh:1", progressId: "fg5", name: "Lenigrast's Key", areaId: "forest_of_fallen_giants", phase: 1, type: "key", source: "Melentia (1,000 souls)" },
  { id: "chh:2", progressId: "fg15", name: "Ring of Blades", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "Pursuer drop" },
  { id: "chh:3", progressId: "fg21", name: "Chloranthy Ring", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "FoFG Pharros ballista room" },
  { id: "chh:4", progressId: "hc3", name: "Meet Felkin (hex shop)", areaId: "huntsmans_copse", phase: 2, type: "key", source: "8 INT + 8 FTH base to browse" },
  { id: "chh:5", progressId: "hc14", name: "Dark Orb", areaId: "huntsmans_copse", phase: 2, type: "spell", source: "Felkin (600 souls)" },
  { id: "chh:6", progressId: "build:sunset_staff", name: "Sunset Staff", areaId: "huntsmans_copse", phase: 2, type: "catalyst", source: "Felkin FREE at 20/20 base INT/FTH" },
  { id: "chh:7", progressId: "build:dark_weapon", name: "Dark Weapon", areaId: "huntsmans_copse", phase: 2, type: "spell", source: "Felkin (2,700 souls)" },
  { id: "chh:8", progressId: "build:chh:archdrake_chime", name: "Archdrake Chime +10", areaId: "huntsmans_copse", phase: 2, type: "catalyst", source: "Blue Sentinels or Shrine of Winter trade — pure chime hexes" },
  { id: "chh:9", progressId: "lb2", name: "Dull Ember", areaId: "lost_bastille", phase: 2, type: "key", source: "Tower Apart chest" },
  { id: "chh:10", progressId: "lb7", name: "Give Dull Ember to McDuff", areaId: "lost_bastille", phase: 2, type: "key", source: "Dark Stone infusion" },
  { id: "chh:11", progressId: "build:chh:mace_lightning", name: "Lightning Mace +10 (early strike)", areaId: "lost_bastille", phase: 2, type: "infusion", source: "McDuff Boltstone — until Insolent", optional: true },
  { id: "chh:12", progressId: "lb10", name: "Belfry Luna (Bell Keepers covenant)", areaId: "lost_bastille", phase: 3, type: "key", source: "Pharros wall in Lost Bastille — join covenant" },
  { id: "chh:13", progressId: "build:chh:mace_insolent", name: "Mace of the Insolent +5", areaId: "lost_bastille", phase: 3, type: "weapon", source: "Bell Keeper phantom drop or covenant rank — chime hammer" },
  { id: "chh:14", progressId: "build:chh:mace_dark", name: "Dark infuse Mace of the Insolent", areaId: "lost_bastille", phase: 3, type: "infusion", source: "McDuff — strong attack casts from chime face" },
  { id: "chh:15", progressId: "bc15", name: "Southern Ritual Band", areaId: "brightstone_cove", phase: 3, type: "ring", source: "Corpse in spider halls" },
  { id: "chh:16", progressId: "hc8", name: "Skeleton Lords (Clear Bluestone path)", areaId: "huntsmans_copse", phase: 4, type: "key", source: "NG+ for +2 ring" },
  { id: "chh:17", progressId: "hc12", name: "Clear Bluestone Ring +2", areaId: "huntsmans_copse", phase: 4, type: "ring", source: "Skeleton Lords NG+" },
  { id: "chh:18", progressId: "ch6", name: "Great Resonant Soul (Grandahl Rank 2)", areaId: "dark_chasm", phase: 4, type: "spell", source: "Pilgrims of Dark — soul-cost nuke", optional: true },
  { id: "chh:19", progressId: "build:chh:heavenly_thunder", name: "Heavenly Thunder", areaId: "shrine_of_amana", phase: 4, type: "spell", source: "Licia — cast from Mace chime (miracle)", optional: true },
  { id: "chh:20", progressId: "da10", name: "Third Dragon Ring", areaId: "dragon_aerie", phase: 4, type: "ring", source: "Dragon Shrine chest" },
  { id: "chh:21", progressId: "d111", name: "Dark Clutch Ring", areaId: "dlc_sunken", phase: 4, type: "ring", source: "Crown of the Sunken King DLC" },
  { id: "chh:22", progressId: "lb8", name: "Ruin Sentinels", areaId: "lost_bastille", phase: 2, type: "key", source: "Opens McDuff smith" },
  { id: "chh:23", progressId: "build:chh:dark_orb_ranged", name: "Dark Orb as ranged (staff or chime)", areaId: "huntsmans_copse", phase: 3, type: "spell", source: "Archdrake Chime or Sunset Staff" },
];

const BUILD_ITEMS: BuildItem[] = [
  { name: "Mace", type: "weapon", role: "Early strike", phase: 1, whereToFind: [{ type: "vendor", location: "Cleric start", detail: "Lightning or Dark at McDuff" }] },
  { name: "Mace of the Insolent", type: "weapon", role: "Chime hammer — strike + cast", phase: 3, whereToFind: [{ type: "drop", location: "Belfry Luna", detail: "Bell Keeper invader or rank reward", unlock: "Lost Bastille Pharros" }], notes: "15 STR / 12 DEX / 12 INT / 12 FTH. Strong attack = cast." },
  { name: "Archdrake Chime", type: "catalyst", role: "Pure chime hexes", phase: 2, whereToFind: [{ type: "trade", location: "Blue Sentinels / Shrine of Winter", detail: "16 FTH req" }] },
  { name: "Sunset Staff", type: "catalyst", role: "Dark Weapon + staff hexes", phase: 2, whereToFind: [{ type: "vendor", location: "Felkin", detail: "FREE at 20/20 base stats" }] },
  { name: "Dark Orb", type: "spell", role: "Primary ranged hex", phase: 2, whereToFind: [{ type: "vendor", location: "Felkin", detail: "600 souls" }] },
  { name: "Dark Weapon", type: "spell", role: "Weapon buff on mace", phase: 2, whereToFind: [{ type: "vendor", location: "Felkin", detail: "20/20 base" }] },
  { name: "Great Resonant Soul", type: "spell", role: "Nuke (costs souls)", phase: 4, whereToFind: [{ type: "vendor", location: "Grandahl", detail: "Pilgrims Rank 2", unlock: "Dark Chasm" }], optional: true },
  { name: "Heavenly Thunder", type: "spell", role: "AoE miracle from chime", phase: 4, whereToFind: [{ type: "vendor", location: "Licia", detail: "Faith investment" }], optional: true },
  { name: "Southern Ritual Band", type: "ring", role: "+3 spell slots", phase: 3, whereToFind: [{ type: "corpse", location: "Brightstone Cove", detail: "Spider halls" }] },
  { name: "Clear Bluestone Ring +2", type: "ring", role: "Cast speed", phase: 4, whereToFind: [{ type: "boss", location: "Skeleton Lords", detail: "NG+ Huntsman's Copse" }] },
  { name: "Dark Clutch Ring", type: "ring", role: "Dark damage boost", phase: 4, whereToFind: [{ type: "chest", location: "Shulva DLC", detail: "Crown of the Sunken King" }] },
];

export const chimeHammerHexer: BuildTemplate = {
  id: "chime-hammer-hexer",
  name: "Chime Hammer Hexer",
  description: "Mace of the Insolent chime hammer. Hexes and strike — bonk and cast in one weapon.",
  source: "DS2_ALL_BUILDS_A-Z",
  startingClass: "cleric",
  baseStats: { ...BASE },
  levels: LEVELS,
  phaseInfo: [
    { num: 1, name: "Mace + Chime", range: "SL 15→40", color: "#6b7c52", areas: "Betwixt → FoFG" },
    { num: 2, name: "20/20 Hex", range: "SL 41→70", color: "#c8a030", areas: "Huntsman's → Bastille" },
    { num: 3, name: "Mace of the Insolent", range: "SL 71→100", color: "#d4862a", areas: "Belfry Luna" },
    { num: 4, name: "Complete Build", range: "SL 101→150", color: "#a03030", areas: "Brightstone → DLC" },
  ],
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  weapons: [
    { name: "Mace of the Insolent +5", role: "Chime hammer primary", phase: 3, infusion: "Dark", stats: "15 STR / 12 DEX / 12 INT / 12 FTH" },
    { name: "Archdrake Chime +10", role: "Pure chime hexes", phase: 2, infusion: "Dark", stats: "16 FTH" },
    { name: "Sunset Staff +5", role: "Staff hexes / Dark Weapon", phase: 2, infusion: "Dark", stats: "22 INT / 22 FTH" },
    { name: "Mace +10", role: "Early strike", phase: 1, infusion: "Lightning", stats: "12 STR" },
  ],
  spells: [
    { name: "Dark Orb", school: "Hex", purpose: "Ranged" },
    { name: "Dark Weapon", school: "Hex", purpose: "Buff" },
    { name: "Great Resonant Soul", school: "Hex", purpose: "Nuke (souls)" },
    { name: "Heavenly Thunder", school: "Miracle", purpose: "AoE (Mace chime)" },
  ],
  keyRings: [
    { name: "Southern Ritual Band", effect: "+3 slots", source: "Brightstone Cove" },
    { name: "Clear Bluestone Ring +2", effect: "Cast speed", source: "Skeleton Lords NG+" },
    { name: "Ring of Blades", effect: "Physical AR", source: "Pursuer" },
    { name: "Third Dragon Ring", effect: "HP/Stamina/Equip", source: "Dragon Shrine" },
    { name: "Dark Clutch Ring", effect: "Dark damage", source: "DLC" },
  ],
  ringsDetail: {
    priorityOrder: ["Southern Ritual Band", "Clear Bluestone Ring +2", "Dark Clutch Ring", "Ring of Blades", "Third Dragon Ring"],
    groups: [
      { label: "Caster core", ringNames: ["Southern Ritual Band", "Clear Bluestone Ring +2", "Dark Clutch Ring"] },
      { label: "Melee / survival", ringNames: ["Ring of Blades", "Third Dragon Ring", "Chloranthy Ring"] },
    ],
    rings: [
      { name: "Southern Ritual Band", priority: "core", effect: "+3 spell slots for hex + miracle suite.", whereToGet: "Brightstone Cove", howToGet: "Spider halls corpse.", phase: 3 },
      { name: "Clear Bluestone Ring +2", priority: "core", effect: "Faster casts from chime and staff.", whereToGet: "Huntsman's Copse", howToGet: "Skeleton Lords NG+.", phase: 4 },
      { name: "Dark Clutch Ring", priority: "core", effect: "+20% dark damage on Insolent mace and hexes.", whereToGet: "Shulva DLC", howToGet: "Crown of the Sunken King.", phase: 4 },
      { name: "Ring of Blades", priority: "optional", effect: "Flat AR on strike attacks.", whereToGet: "FoFG", howToGet: "Pursuer drop.", phase: 1 },
      { name: "Third Dragon Ring", priority: "optional", effect: "HP/stamina/load for medium armor.", whereToGet: "Dragon Shrine", howToGet: "Chest before Ancient Dragon.", phase: 4 },
    ],
  },
  buildSteps: BUILD_STEPS,
  buildItems: BUILD_ITEMS,
  buildMaterialFarms: [
    {
      item: "Darknight Stone",
      purpose: "Dark infuse Mace of the Insolent, Sunset Staff, Archdrake Chime",
      sources: [{ type: "vendor", location: "Chloanne", detail: "After King's Ring", unlock: "King's Ring" }],
      farmOptions: [{ enemy: "Leydia Pyromancer", area: "Undead Crypt", method: "Infinite respawn", unlock: "Undead Crypt" }],
    },
    {
      item: "Twinkling Titanite",
      purpose: "Mace of the Insolent +5",
      sources: [{ type: "vendor", location: "Chloanne", detail: "After King's Ring" }],
      farmOptions: [{ enemy: "Crystal Lizard", area: "Dragon Aerie", method: "Rare drop", unlock: "Dragon Aerie" }],
    },
    {
      item: "Titanite (Shards, Large, Chunks, Slab)",
      purpose: "Mace +10, Archdrake Chime +10",
      sources: [{ type: "vendor", location: "Lenigrast, McDuff, Chloanne", detail: "See Farming tab" }],
      farmOptions: [{ enemy: "Alonne Knight", area: "Iron Keep", method: "Chunks. CoC.", unlock: "Iron Keep" }],
    },
  ],
};
