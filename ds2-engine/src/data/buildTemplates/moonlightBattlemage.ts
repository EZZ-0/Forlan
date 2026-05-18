/**
 * Moonlight Battlemage — INT/FTH hybrid
 * Source: DS2_ALL_BUILDS_A-Z #6
 */

import type { BuildTemplate } from "./types";
import { CLASS_BASE_STATS } from "./types";
import { generateLevelRoadmap } from "./levelGenerator";
import type { StatKey } from "../simulator/types";
import type { BuildStep } from "../buildChecklist";
import type { BuildItem } from "../buildItems";

const BASE = CLASS_BASE_STATS.sorcerer;

const PHASE_TARGETS: BuildTemplate["phaseTargets"] = {
  1: { VGR: 8, END: 9, VIT: 6, ATN: 16, STR: 6, DEX: 10, ADP: 11, INT: 20, FTH: 9 },
  2: { VGR: 11, END: 12, VIT: 7, ATN: 20, STR: 9, DEX: 12, ADP: 13, INT: 25, FTH: 14 },
  3: { VGR: 14, END: 14, VIT: 7, ATN: 22, STR: 12, DEX: 14, ADP: 15, INT: 29, FTH: 18 },
  4: { VGR: 17, END: 17, VIT: 8, ATN: 26, STR: 15, DEX: 16, ADP: 17, INT: 34, FTH: 22 },
  5: { VGR: 19, END: 19, VIT: 8, ATN: 29, STR: 17, DEX: 17, ADP: 19, INT: 38, FTH: 26 },
  6: { VGR: 20, END: 20, VIT: 8, ATN: 30, STR: 18, DEX: 18, ADP: 20, INT: 40, FTH: 28 },
};

const PHASE_PRIORITY: Record<number, StatKey[]> = {
  1: ["STR", "DEX", "INT", "FTH", "ATN", "VGR", "END", "ADP", "VIT"],
  2: ["STR", "DEX", "INT", "FTH", "ATN", "VGR", "END", "ADP", "VIT"],
  3: ["STR", "DEX", "INT", "FTH", "ATN", "VGR", "END", "ADP", "VIT"],
  4: ["STR", "DEX", "INT", "FTH", "ATN", "VGR", "END", "ADP", "VIT"],
  5: ["STR", "DEX", "INT", "FTH", "ATN", "VGR", "END", "ADP", "VIT"],
  6: ["STR", "DEX", "INT", "FTH", "ATN", "VGR", "END", "ADP", "VIT"],
};

const LEVELS = generateLevelRoadmap({
  startingClass: "sorcerer",
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  milestoneNotes: {
    "20:INT": "★ INT 20 — early sorceries online",
    "18:STR": "★ MLGS req (18 STR / 18 DEX)",
    "40:INT": "★ MLGS beams + sorcery scaling",
    "28:FTH": "★ Dark Orb backup (Felkin 8/8 min)",
    "150:INT": "★★ BUILD COMPLETE — SL 150",
  },
});

const BUILD_STEPS: BuildStep[] = [
  { id: "mbm:0", progressId: "build:mbm:staff", name: "Sorcerer's Staff +10 (Sorcerer start)", areaId: "things_betwixt", phase: 1, type: "catalyst", source: "Starting gear → Lenigrast" },
  { id: "mbm:1", progressId: "fg11", name: "Fire Longsword", areaId: "forest_of_fallen_giants", phase: 1, type: "weapon", source: "Salamander chest" },
  { id: "mbm:2", progressId: "fg5", name: "Lenigrast's Key", areaId: "forest_of_fallen_giants", phase: 1, type: "key", source: "Melentia (1,000 souls)" },
  { id: "mbm:3", progressId: "fg12", name: "Open Lenigrast's shop", areaId: "majula", phase: 1, type: "key", source: "Return to Majula" },
  { id: "mbm:4", progressId: "fg15", name: "Ring of Blades", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "Pursuer drop" },
  { id: "mbm:5", progressId: "fg21", name: "Chloranthy Ring", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "FoFG Pharros" },
  { id: "mbm:6", progressId: "build:mbm:carhillion", name: "Carhillion of Jura (sorceries)", areaId: "no_mans_wharf", phase: 1, type: "key", source: "10 INT to browse shop" },
  { id: "mbm:7", progressId: "lb4", name: "Unpetrify Straid of Olaphis", areaId: "lost_bastille", phase: 2, type: "key", source: "Fragrant Branch of Yore" },
  { id: "mbm:8", progressId: "build:staff_of_wisdom", name: "Staff of Wisdom +5", areaId: "dragon_aerie", phase: 2, type: "catalyst", source: "Crystal lizard Dragon Shrine or Ornifex NG+" },
  { id: "mbm:9", progressId: "bc15", name: "Southern Ritual Band", areaId: "brightstone_cove", phase: 2, type: "ring", source: "Corpse in spider halls" },
  { id: "mbm:10", progressId: "bc8", name: "Duke's Dear Freja (1st Old Paledrake Soul → MLGS)", areaId: "brightstone_cove", phase: 2, type: "key", source: "Lord Soul — Ornifex in Majula (mj19)" },
  { id: "mbm:11", progressId: "mj19", name: "Moonlight Greatsword +5", areaId: "majula", phase: 3, type: "weapon", source: "Ornifex (1st Old Paledrake Soul from Freja)" },
  { id: "mbm:12", progressId: "lb18", name: "Crystal Soul Spear", areaId: "lost_bastille", phase: 4, type: "spell", source: "Straid/Ornifex — needs 2nd Freja soul (see bc19: NG+ Freja or Bonfire Ascetic)" },
  { id: "mbm:13", progressId: "hc3", name: "Meet Felkin (hex shop)", areaId: "huntsmans_copse", phase: 3, type: "key", source: "8 INT + 8 FTH base to browse" },
  { id: "mbm:14", progressId: "hc14", name: "Dark Orb", areaId: "huntsmans_copse", phase: 3, type: "spell", source: "Felkin (600 souls) — backup element" },
  { id: "mbm:15", progressId: "build:mbm:soul_greatsword", name: "Soul Greatsword", areaId: "lost_bastille", phase: 2, type: "spell", source: "Straid or Carhillion" },
  { id: "mbm:16", progressId: "build:mbm:hcsm", name: "Homing Crystal Soulmass", areaId: "lost_bastille", phase: 3, type: "spell", source: "Straid (requires high INT)" },
  { id: "mbm:17", progressId: "build:mbm:ghsa", name: "Great Heavy Soul Arrow", areaId: "no_mans_wharf", phase: 2, type: "spell", source: "Carhillion" },
  { id: "mbm:18", progressId: "da10", name: "Third Dragon Ring", areaId: "dragon_aerie", phase: 4, type: "ring", source: "Dragon Shrine chest (da10)" },
  { id: "mbm:19", progressId: "hc8", name: "Skeleton Lords (Clear Bluestone path)", areaId: "huntsmans_copse", phase: 4, type: "key", source: "NG+ or Bonfire Ascetic for +2 ring" },
  { id: "mbm:20", progressId: "hc12", name: "Clear Bluestone Ring +2", areaId: "huntsmans_copse", phase: 4, type: "ring", source: "Skeleton Lords NG+" },
  { id: "mbm:21", progressId: "build:mbm:blue_flame", name: "Blue Flame +5 (optional sword catalyst)", areaId: "aldias_keep", phase: 4, type: "weapon", source: "Hidden room in Aldia's Keep", optional: true },
  { id: "mbm:22", progressId: "tw7", name: "Ring of Blades +2", areaId: "throne_of_want", phase: 4, type: "ring", source: "Throne Watcher & Defender NG+", optional: true },
];

const BUILD_ITEMS: BuildItem[] = [
  { name: "Sorcerer's Staff", type: "catalyst", role: "Early casting", phase: 1, whereToFind: [{ type: "vendor", location: "Sorcerer start", detail: "Upgrade to +10 at Lenigrast" }] },
  { name: "Fire Longsword", type: "weapon", role: "Physical backup until MLGS", phase: 1, whereToFind: [{ type: "chest", location: "Forest of Fallen Giants", detail: "Salamander pit", unlock: "FoFG" }] },
  { name: "Staff of Wisdom", type: "catalyst", role: "Primary sorcery catalyst", phase: 2, whereToFind: [{ type: "drop", location: "Dragon Shrine", detail: "Crystal lizard", unlock: "Dragon Aerie" }, { type: "trade", location: "Ornifex", detail: "Old Paledrake Soul NG+", unlock: "Dragon Shrine" }], notes: "50 INT req — spice to 40 or level INT." },
  { name: "Moonlight Greatsword", type: "weapon", role: "Primary magic melee — beams scale INT", phase: 3, whereToFind: [{ type: "trade", location: "Ornifex", detail: "Old Paledrake Soul (Freja)", unlock: "Brightstone Cove" }], notes: "Magic damage only. 18 STR / 18 DEX. 2H strong = beam." },
  { name: "Blue Flame", type: "weapon", role: "Optional sword catalyst", phase: 4, whereToFind: [{ type: "chest", location: "Aldia's Keep", detail: "Hidden room", unlock: "Aldia's Keep" }], optional: true },
  { name: "Crystal Soul Spear", type: "spell", role: "Ranged nuke", phase: 4, whereToFind: [{ type: "trade", location: "Straid or Ornifex", detail: "Freja soul (second copy via NG+/Ascetic)", unlock: "Brightstone Cove" }] },
  { name: "Soul Greatsword", type: "spell", role: "Melee AoE", phase: 2, whereToFind: [{ type: "vendor", location: "Straid / Carhillion", detail: "INT req" }] },
  { name: "Great Heavy Soul Arrow", type: "spell", role: "Ranged trash clear", phase: 2, whereToFind: [{ type: "vendor", location: "Carhillion", detail: "No-Man's Wharf" }] },
  { name: "Homing Crystal Soulmass", type: "spell", role: "Combo pressure", phase: 3, whereToFind: [{ type: "vendor", location: "Straid", detail: "High INT req" }] },
  { name: "Dark Orb", type: "spell", role: "Backup element vs resistant foes", phase: 3, whereToFind: [{ type: "vendor", location: "Felkin", detail: "8 INT + 8 FTH base — 600 souls", unlock: "Huntsman's Copse" }] },
  { name: "Ring of Blades", type: "ring", role: "Physical AR for Fire Longsword", phase: 1, whereToFind: [{ type: "boss", location: "Pursuer", detail: "Guaranteed", unlock: "FoFG" }] },
  { name: "Chloranthy Ring", type: "ring", role: "Stamina regen", phase: 1, whereToFind: [{ type: "corpse", location: "FoFG", detail: "Pharros ballista room", unlock: "FoFG" }] },
  { name: "Southern Ritual Band", type: "ring", role: "+3 spell slots", phase: 2, whereToFind: [{ type: "corpse", location: "Brightstone Cove", detail: "Spider halls", unlock: "Brightstone Cove" }] },
  { name: "Clear Bluestone Ring +2", type: "ring", role: "Cast speed", phase: 4, whereToFind: [{ type: "boss", location: "Skeleton Lords", detail: "NG+ Huntsman's Copse", unlock: "Huntsman's Copse" }] },
  { name: "Third Dragon Ring", type: "ring", role: "HP/Stamina/Equip Load", phase: 4, whereToFind: [{ type: "chest", location: "Dragon Shrine", detail: "Before Ancient Dragon fog", unlock: "Dragon Aerie" }] },
];

export const moonlightBattlemage: BuildTemplate = {
  id: "moonlight-battlemage",
  name: "Moonlight Battlemage",
  description: "INT/FTH hybrid. Moonlight Greatsword magic melee, sorceries for ranged, Dark Orb backup.",
  source: "DS2_ALL_BUILDS_A-Z",
  startingClass: "sorcerer",
  baseStats: { ...BASE },
  levels: LEVELS,
  phaseInfo: [
    { num: 1, name: "Staff + Survive", range: "SL 11→40", color: "#6b7c52", areas: "Betwixt → FoFG" },
    { num: 2, name: "INT Rush", range: "SL 41→75", color: "#c8a030", areas: "Heide's → Brightstone" },
    { num: 3, name: "Moonlight Greatsword", range: "SL 76→110", color: "#d4862a", areas: "Dragon Shrine" },
    { num: 4, name: "Complete Build", range: "SL 111→150", color: "#a03030", areas: "Post-Dragon → DLC" },
  ],
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  weapons: [
    { name: "Moonlight Greatsword +5", role: "Primary magic melee", phase: 3, infusion: "Built-in Magic", stats: "18 STR / 18 DEX" },
    { name: "Staff of Wisdom +5", role: "Sorceries", phase: 2, infusion: "Magic", stats: "50 INT (spiced)" },
    { name: "Blue Flame +5", role: "Sword catalyst backup", phase: 4, infusion: "Magic", stats: "13 STR / 15 DEX / 12 INT" },
  ],
  spells: [
    { name: "Crystal Soul Spear", school: "Sorcery", purpose: "Ranged nuke" },
    { name: "Soul Greatsword", school: "Sorcery", purpose: "Melee AoE" },
    { name: "Great Heavy Soul Arrow", school: "Sorcery", purpose: "Ranged" },
    { name: "Homing Crystal Soulmass", school: "Sorcery", purpose: "Combo" },
    { name: "Dark Orb", school: "Hex", purpose: "Backup element" },
  ],
  keyRings: [
    { name: "Southern Ritual Band", effect: "+3 slots", source: "Brightstone Cove" },
    { name: "Clear Bluestone Ring +2", effect: "Cast speed", source: "Skeleton Lords NG+" },
    { name: "Ring of Blades", effect: "Physical AR", source: "Pursuer" },
    { name: "Third Dragon Ring", effect: "HP/Stamina/Equip", source: "Dragon Shrine" },
    { name: "Chloranthy Ring", effect: "Stamina regen", source: "FoFG" },
  ],
  ringsDetail: {
    priorityOrder: ["Southern Ritual Band", "Clear Bluestone Ring +2", "Third Dragon Ring", "Chloranthy Ring", "Ring of Blades"],
    groups: [
      { label: "Caster core", ringNames: ["Southern Ritual Band", "Clear Bluestone Ring +2"] },
      { label: "Survival / utility", ringNames: ["Third Dragon Ring", "Chloranthy Ring", "Ring of Blades"] },
    ],
    rings: [
      { name: "Southern Ritual Band", priority: "core", effect: "+3 spell slots — frees ATN for INT/FTH.", whereToGet: "Brightstone Cove", howToGet: "Corpse in spider section.", phase: 2 },
      { name: "Clear Bluestone Ring +2", priority: "core", effect: "Faster cast speed for sorceries.", whereToGet: "Huntsman's Copse", howToGet: "Skeleton Lords in NG+.", phase: 4 },
      { name: "Third Dragon Ring", priority: "core", effect: "+12.5% HP, stamina, equip load.", whereToGet: "Dragon Shrine", howToGet: "Chest before Ancient Dragon fog.", phase: 4 },
      { name: "Chloranthy Ring", priority: "core", effect: "Stamina for MLGS swings and rolls.", whereToGet: "FoFG", howToGet: "Pharros ballista room.", phase: 1 },
      { name: "Ring of Blades", priority: "optional", effect: "Flat AR for Fire Longsword backup.", whereToGet: "FoFG", howToGet: "Pursuer drop.", phase: 1 },
    ],
  },
  buildSteps: BUILD_STEPS,
  buildItems: BUILD_ITEMS,
  buildMaterialFarms: [
    {
      item: "Titanite (Shards, Large, Chunks)",
      purpose: "Sorcerer's Staff +10, Fire Longsword +10",
      sources: [{ type: "vendor", location: "Lenigrast, McDuff, Chloanne", detail: "See Farming tab" }],
      farmOptions: [
        { enemy: "Crystal Lizard", area: "Black Gulch, Dragon Aerie", method: "Chunks", unlock: "Area access" },
        { enemy: "Alonne Knight", area: "Iron Keep", method: "Chunks. CoC.", unlock: "Iron Keep" },
      ],
    },
    {
      item: "Twinkling Titanite",
      purpose: "Moonlight Greatsword +5, Staff of Wisdom +5",
      sources: [
        { type: "vendor", location: "Chloanne", detail: "After King's Ring", unlock: "King's Ring" },
        { type: "chest", location: "Dragon Aerie", detail: "Crystal lizards", unlock: "Dragon Aerie" },
      ],
      farmOptions: [{ enemy: "Crystal Lizard", area: "Dragon Aerie", method: "Kill all 11", unlock: "Dragon Aerie" }],
    },
    {
      item: "Petrified Dragon Bone",
      purpose: "Boss weapons +5 (MLGS, Staff of Wisdom)",
      sources: [{ type: "drop", location: "Crystal Lizards", detail: "Dragon Aerie has many" }],
      farmOptions: [{ enemy: "Crystal Lizard", area: "Dragon Aerie", method: "Rare drop", unlock: "Dragon Aerie" }],
    },
  ],
};
