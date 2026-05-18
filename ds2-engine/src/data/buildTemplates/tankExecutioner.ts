/**
 * Tank Executioner — UGS tank, heavy armor
 * Source: DS2_ALL_BUILDS_A-Z #14
 */

import type { BuildTemplate } from "./types";
import { CLASS_BASE_STATS } from "./types";
import { generateLevelRoadmap } from "./levelGenerator";
import type { StatKey } from "../simulator/types";
import type { BuildStep } from "../buildChecklist";
import type { BuildItem } from "../buildItems";

const BASE = CLASS_BASE_STATS.knight;

const PHASE_TARGETS: BuildTemplate["phaseTargets"] = {
  1: { VGR: 18, END: 11, VIT: 14, STR: 15, DEX: 9, ADP: 7 },
  2: { VGR: 24, END: 16, VIT: 21, STR: 18, DEX: 9, ADP: 10 },
  3: { VGR: 28, END: 20, VIT: 26, STR: 21, DEX: 10, ADP: 13 },
  4: { VGR: 33, END: 24, VIT: 32, STR: 24, DEX: 10, ADP: 16 },
  5: { VGR: 38, END: 28, VIT: 37, STR: 27, DEX: 10, ADP: 19 },
  6: { VGR: 40, END: 30, VIT: 40, ATN: 9, STR: 28, DEX: 10, ADP: 20, INT: 6, FTH: 4 },
};

const PHASE_PRIORITY: Record<number, StatKey[]> = {
  1: ["STR", "VGR", "VIT", "END", "ADP", "DEX", "ATN", "INT", "FTH"],
  2: ["STR", "VGR", "VIT", "END", "ADP", "DEX", "ATN", "INT", "FTH"],
  3: ["VGR", "VIT", "STR", "END", "ADP", "DEX", "ATN", "INT", "FTH"],
  4: ["VGR", "VIT", "STR", "END", "ADP", "DEX", "ATN", "INT", "FTH"],
  5: ["VGR", "VIT", "STR", "END", "ADP", "DEX", "ATN", "INT", "FTH"],
  6: ["VGR", "VIT", "STR", "END", "ADP", "DEX", "ATN", "INT", "FTH"],
};

const LEVELS = generateLevelRoadmap({
  startingClass: "knight",
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  milestoneNotes: {
    "14:STR": "★ Greatsword 2H (28 STR = 14 effective)",
    "28:STR": "★ Greatsword 1H/2H full AR",
    "40:VGR": "★ Tank HP online",
    "150:VGR": "★★ BUILD COMPLETE — SL 150",
  },
});

const BUILD_STEPS: BuildStep[] = [
  { id: "te:0", progressId: "build:te:mace", name: "Mace +10 (Knight start)", areaId: "things_betwixt", phase: 1, type: "weapon", source: "Until Greatsword" },
  { id: "te:1", progressId: "fg5", name: "Lenigrast's Key", areaId: "forest_of_fallen_giants", phase: 1, type: "key", source: "Melentia (1,000 souls)" },
  { id: "te:2", progressId: "fg12", name: "Open Lenigrast's shop", areaId: "majula", phase: 1, type: "key", source: "Return to Majula" },
  { id: "te:3", progressId: "fg15", name: "Ring of Blades", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "Pursuer drop" },
  { id: "te:4", progressId: "nm3", name: "Greatsword (No-Man's Wharf chest)", areaId: "no_mans_wharf", phase: 1, type: "weapon", source: "Building chest — or FoFG optional area" },
  { id: "te:5", progressId: "build:te:greatsword_plus", name: "Greatsword +10", areaId: "no_mans_wharf", phase: 1, type: "weapon", source: "Primary UGS — 28 STR / 10 DEX (14 STR 2H)" },
  { id: "te:6", progressId: "lb2", name: "Dull Ember", areaId: "lost_bastille", phase: 2, type: "key", source: "Tower Apart" },
  { id: "te:7", progressId: "lb7", name: "Give Dull Ember to McDuff", areaId: "lost_bastille", phase: 2, type: "key", source: "Raw infusion optional" },
  { id: "te:8", progressId: "build:te:craftsman_hammer", name: "Craftsman's Hammer +10", areaId: "lost_bastille", phase: 2, type: "weapon", source: "McDuff — strike backup (20 STR)", optional: true },
  { id: "te:9", progressId: "build:te:tower_shield", name: "Tower Shield +10", areaId: "lost_bastille", phase: 3, type: "weapon", source: "McDuff — 30 STR block tool", optional: true },
  { id: "te:10", progressId: "build:te:heavy_armor", name: "Heavy armor (<70% load)", areaId: "iron_keep", phase: 2, type: "key", source: "Alonne Knight / Old Iron King set pieces" },
  { id: "te:11", progressId: "hc9", name: "Executioner's Chariot", areaId: "huntsmans_copse", phase: 2, type: "key", source: "Undead Purgatory — stop chariot for Ring of Giants" },
  { id: "te:12", progressId: "build:te:ring_of_giants", name: "Ring of Giants", areaId: "huntsmans_copse", phase: 2, type: "ring", source: "Chariot soul trade or rare drop — poise" },
  { id: "te:13", progressId: "da10", name: "Third Dragon Ring", areaId: "dragon_aerie", phase: 3, type: "ring", source: "Dragon Shrine chest" },
  { id: "te:14", progressId: "tw7", name: "Ring of Blades +2", areaId: "throne_of_want", phase: 4, type: "ring", source: "Throne Watcher & Defender NG+" },
  { id: "te:15", progressId: "uc12", name: "Royal Soldier Ring +2", areaId: "undead_crypt", phase: 4, type: "ring", source: "Vendrick NG+ (collect Giant Souls in memories)" },
  { id: "te:16", progressId: "d316", name: "Chloranthy Ring +2", areaId: "dlc_ivory", phase: 4, type: "ring", source: "DLC Ivory King" },
  { id: "te:17", progressId: "mm3", name: "Giant Souls (Vendrick prep)", areaId: "memories", phase: 4, type: "key", source: "Memories of Vammar, Orro, Jeigh — weaken Vendrick" },
  { id: "te:18", progressId: "build:te:vendrick", name: "Vendrick (Royal Soldier Ring +2)", areaId: "undead_crypt", phase: 4, type: "ring", source: "NG+ Vendrick with Giant Souls" },
  { id: "te:19", progressId: "lb8", name: "Ruin Sentinels", areaId: "lost_bastille", phase: 2, type: "key", source: "McDuff access" },
  { id: "te:20", progressId: "ik9", name: "Old Iron King", areaId: "iron_keep", phase: 2, type: "key", source: "Heavy armor drops" },
  { id: "te:21", progressId: "build:te:raw_infuse", name: "Raw infuse Greatsword (optional)", areaId: "lost_bastille", phase: 3, type: "infusion", source: "McDuff — flat AR for pure STR", optional: true },
  { id: "te:22", progressId: "build:te:poise_tank", name: "Face-tank with poise", areaId: "iron_keep", phase: 3, type: "key", source: "Ring of Giants + heavy armor — trade hits" },
  { id: "te:23", progressId: "fg21", name: "Chloranthy Ring", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "FoFG Pharros — until +2", optional: true },
];

const BUILD_ITEMS: BuildItem[] = [
  { name: "Greatsword", type: "weapon", role: "Primary UGS", phase: 1, whereToFind: [{ type: "chest", location: "No-Man's Wharf", detail: "Building chest", unlock: "No-Man's Wharf" }, { type: "chest", location: "FoFG", detail: "Optional area past Pursuer", unlock: "FoFG" }], notes: "28 STR / 10 DEX. 2H = 14 STR effective." },
  { name: "Tower Shield", type: "weapon", role: "Block tool", phase: 3, whereToFind: [{ type: "buy", location: "McDuff", detail: "30 STR req", unlock: "Lost Bastille" }], optional: true },
  { name: "Craftsman's Hammer", type: "weapon", role: "Fast strike backup", phase: 2, whereToFind: [{ type: "buy", location: "McDuff", detail: "20 STR", unlock: "Lost Bastille" }], optional: true },
  { name: "Ring of Giants", type: "ring", role: "Poise — face-tank", phase: 2, whereToFind: [{ type: "trade", location: "Straid or Ornifex", detail: "Chariot soul", unlock: "Undead Purgatory" }] },
  { name: "Third Dragon Ring", type: "ring", role: "HP/Stamina/Equip Load", phase: 3, whereToFind: [{ type: "chest", location: "Dragon Shrine", detail: "Before Ancient Dragon", unlock: "Dragon Aerie" }] },
  { name: "Ring of Blades +2", type: "ring", role: "Physical AR", phase: 4, whereToFind: [{ type: "boss", location: "Throne Watcher & Defender", detail: "NG+", unlock: "Throne of Want" }] },
  { name: "Royal Soldier Ring +2", type: "ring", role: "Equip load for heavy armor", phase: 4, whereToFind: [{ type: "boss", location: "Vendrick", detail: "NG+ with Giant Souls", unlock: "Undead Crypt" }] },
  { name: "Chloranthy Ring +2", type: "ring", role: "Stamina regen for UGS swings", phase: 4, whereToFind: [{ type: "chest", location: "DLC Ivory King", detail: "Frozen Eleum Loyce", unlock: "DLC" }] },
];

export const tankExecutioner: BuildTemplate = {
  id: "tank-executioner",
  name: "Tank Executioner",
  description: "Ultra Greatsword tank. High VGR/END/VIT, heavy armor, poise through hits.",
  source: "DS2_ALL_BUILDS_A-Z",
  startingClass: "knight",
  baseStats: { ...BASE },
  levels: LEVELS,
  phaseInfo: [
    { num: 1, name: "Greatsword + Mace", range: "SL 12→40", color: "#6b7c52", areas: "Betwixt → Wharf" },
    { num: 2, name: "STR + Armor", range: "SL 41→70", color: "#c8a030", areas: "Heide's → Drangleic" },
    { num: 3, name: "VGR/END/VIT", range: "SL 71→110", color: "#d4862a", areas: "Iron Keep → Dragon Shrine" },
    { num: 4, name: "Complete Build", range: "SL 111→150", color: "#a03030", areas: "Crypt → DLC" },
  ],
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  weapons: [
    { name: "Greatsword +10", role: "Primary UGS", phase: 1, infusion: "None or Raw", stats: "28 STR / 10 DEX" },
    { name: "Tower Shield +10", role: "Block", phase: 3, infusion: "None", stats: "30 STR" },
    { name: "Craftsman's Hammer +10", role: "Strike backup", phase: 2, infusion: "None", stats: "20 STR" },
  ],
  spells: [],
  keyRings: [
    { name: "Third Dragon Ring", effect: "HP/Stamina/Equip", source: "Dragon Shrine" },
    { name: "Ring of Blades +2", effect: "Physical AR", source: "Throne NG+" },
    { name: "Royal Soldier Ring +2", effect: "Equip load", source: "Vendrick NG+" },
    { name: "Chloranthy Ring +2", effect: "Stamina regen", source: "DLC Ivory King" },
    { name: "Ring of Giants", effect: "Poise", source: "Chariot" },
  ],
  ringsDetail: {
    priorityOrder: ["Royal Soldier Ring +2", "Third Dragon Ring", "Ring of Giants", "Chloranthy Ring +2", "Ring of Blades +2"],
    groups: [
      { label: "Tank core", ringNames: ["Royal Soldier Ring +2", "Third Dragon Ring", "Ring of Giants"] },
      { label: "Damage / stamina", ringNames: ["Ring of Blades +2", "Chloranthy Ring +2"] },
    ],
    rings: [
      { name: "Royal Soldier Ring +2", priority: "core", effect: "+20% equip load — essential for heavy armor.", whereToGet: "Undead Crypt", howToGet: "Vendrick NG+ after Giant Souls in memories.", phase: 4 },
      { name: "Third Dragon Ring", priority: "core", effect: "+12.5% HP, stamina, equip load.", whereToGet: "Dragon Shrine", howToGet: "Chest before Ancient Dragon fog.", phase: 3 },
      { name: "Ring of Giants", priority: "core", effect: "Increases poise — trade hits.", whereToGet: "Undead Purgatory", howToGet: "Executioner's Chariot soul trade.", phase: 2 },
      { name: "Chloranthy Ring +2", priority: "core", effect: "Stamina for slow UGS swings.", whereToGet: "DLC Ivory King", howToGet: "Frozen Eleum Loyce.", phase: 4 },
      { name: "Ring of Blades +2", priority: "core", effect: "+35 physical AR.", whereToGet: "Throne of Want", howToGet: "Throne Watcher & Defender NG+.", phase: 4 },
    ],
  },
  buildSteps: BUILD_STEPS,
  buildItems: BUILD_ITEMS,
  buildMaterialFarms: [
    {
      item: "Titanite (Shards, Large, Chunks, Slab)",
      purpose: "Greatsword +10, Tower Shield +10",
      sources: [{ type: "vendor", location: "Lenigrast, McDuff, Chloanne", detail: "See Farming tab" }],
      farmOptions: [
        { enemy: "Alonne Knight", area: "Iron Keep", method: "Chunks. CoC.", unlock: "Iron Keep" },
        { enemy: "Crystal Lizard", area: "Dragon Aerie", method: "Chunks", unlock: "Dragon Aerie" },
      ],
    },
    {
      item: "Titanite Slab",
      purpose: "Greatsword +10 final upgrade",
      sources: [
        { type: "vendor", location: "Chloanne", detail: "Limited stock", unlock: "King's Ring" },
        { type: "drop", location: "Crystal Lizards", detail: "Rare", unlock: "Mid-game" },
      ],
      farmOptions: [{ enemy: "Crystal Lizard", area: "Dragon Aerie", method: "11 lizards in area", unlock: "Dragon Aerie" }],
    },
  ],
};
