/**
 * Master Dex Build — rapiers, katanas, bow
 * Source: DS2_ALL_BUILDS_A-Z #13
 */

import type { BuildTemplate } from "./types";
import { CLASS_BASE_STATS } from "./types";
import { generateLevelRoadmap } from "./levelGenerator";
import type { StatKey } from "../simulator/types";
import type { BuildStep } from "../buildChecklist";
import type { BuildItem } from "../buildItems";

const BASE = CLASS_BASE_STATS.swordsman;

const PHASE_TARGETS: BuildTemplate["phaseTargets"] = {
  1: { VGR: 9, END: 12, VIT: 5, STR: 10, DEX: 23, ADP: 12 },
  2: { VGR: 13, END: 18, VIT: 6, STR: 11, DEX: 30, ADP: 17 },
  3: { VGR: 16, END: 22, VIT: 7, STR: 12, DEX: 38, ADP: 22 },
  4: { VGR: 20, END: 26, VIT: 8, STR: 12, DEX: 45, ADP: 27 },
  5: { VGR: 23, END: 29, VIT: 9, STR: 12, DEX: 48, ADP: 29 },
  6: { VGR: 25, END: 30, VIT: 9, ATN: 6, STR: 12, DEX: 50, ADP: 30, INT: 5, FTH: 6 },
};

const PHASE_PRIORITY: Record<number, StatKey[]> = {
  1: ["DEX", "END", "VGR", "ADP", "STR", "VIT", "ATN", "INT", "FTH"],
  2: ["DEX", "END", "VGR", "ADP", "STR", "VIT", "ATN", "INT", "FTH"],
  3: ["DEX", "END", "VGR", "ADP", "STR", "VIT", "ATN", "INT", "FTH"],
  4: ["DEX", "END", "VGR", "ADP", "STR", "VIT", "ATN", "INT", "FTH"],
  5: ["DEX", "END", "VGR", "ADP", "STR", "VIT", "ATN", "INT", "FTH"],
  6: ["DEX", "END", "VGR", "ADP", "STR", "VIT", "ATN", "INT", "FTH"],
};

const LEVELS = generateLevelRoadmap({
  startingClass: "swordsman",
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  milestoneNotes: {
    "12:DEX": "★ Rapier online (12 DEX)",
    "20:DEX": "★ Ricard's Rapier (20 DEX)",
    "25:DEX": "★ Blacksteel Katana (25 DEX)",
    "50:DEX": "★★ BUILD COMPLETE — SL 150",
  },
});

const BUILD_STEPS: BuildStep[] = [
  { id: "md:0", progressId: "build:md:scimitar", name: "Scimitar +10 (Swordsman start)", areaId: "things_betwixt", phase: 1, type: "weapon", source: "Until Rapier from Lenigrast" },
  { id: "md:1", progressId: "fg5", name: "Lenigrast's Key", areaId: "forest_of_fallen_giants", phase: 1, type: "key", source: "Melentia (1,000 souls)" },
  { id: "md:2", progressId: "fg12", name: "Open Lenigrast's shop", areaId: "majula", phase: 1, type: "key", source: "Return to Majula" },
  { id: "md:3", progressId: "build:rapier", name: "Rapier +10", areaId: "forest_of_fallen_giants", phase: 1, type: "weapon", source: "Lenigrast (buy) — primary thrust" },
  { id: "md:4", progressId: "fg15", name: "Ring of Blades", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "Pursuer drop" },
  { id: "md:5", progressId: "fg21", name: "Chloranthy Ring", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "FoFG Pharros ballista room" },
  { id: "md:6", progressId: "ht7", name: "Old Leo Ring", areaId: "heides_tower", phase: 2, type: "ring", source: "Old Dragonslayer — thrust counter essential" },
  { id: "md:7", progressId: "ht3", name: "Dragonrider (Heide's access)", areaId: "heides_tower", phase: 2, type: "key", source: "Opens Cathedral of Blue" },
  { id: "md:8", progressId: "lb13d", name: "Ricard's Rapier", areaId: "lost_bastille", phase: 2, type: "weapon", source: "No-Man's Wharf building — jump puzzle to chest" },
  { id: "md:9", progressId: "build:md:ricards_plus", name: "Ricard's Rapier +10", areaId: "lost_bastille", phase: 2, type: "weapon", source: "R2 multi-hit spam weapon" },
  { id: "md:10", progressId: "fg16", name: "Cale — House Key (Hunter's Blackbow)", areaId: "forest_of_fallen_giants", phase: 2, type: "key", source: "FoFG cave cartographer → Majula mansion" },
  { id: "md:11", progressId: "build:hunters_blackbow", name: "Hunter's Blackbow +10", areaId: "majula", phase: 3, type: "weapon", source: "Cale's mansion chest in Majula" },
  { id: "md:12", progressId: "lb2", name: "Dull Ember", areaId: "lost_bastille", phase: 2, type: "key", source: "Tower Apart" },
  { id: "md:13", progressId: "lb7", name: "Give Dull Ember to McDuff", areaId: "lost_bastille", phase: 2, type: "key", source: "Bleed/Poison infusion optional on Ricard's" },
  { id: "md:14", progressId: "build:uchigatana", name: "Uchigatana +10", areaId: "lost_bastille", phase: 2, type: "weapon", source: "McDuff (5,000 souls) — slash backup" },
  { id: "md:15", progressId: "build:blacksteel", name: "Blacksteel Katana +10", areaId: "iron_keep", phase: 3, type: "weapon", source: "Alonne Knight / Captain drop" },
  { id: "md:16", progressId: "da10", name: "Third Dragon Ring", areaId: "dragon_aerie", phase: 4, type: "ring", source: "Dragon Shrine chest" },
  { id: "md:17", progressId: "bc18", name: "Flynn's Ring", areaId: "dragon_aerie", phase: 4, type: "ring", source: "Dragon Shrine — keep VIT ~9" },
  { id: "md:18", progressId: "tw7", name: "Ring of Blades +2", areaId: "throne_of_want", phase: 4, type: "ring", source: "Throne Watcher & Defender NG+" },
  { id: "md:19", progressId: "d316", name: "Chloranthy Ring +2", areaId: "dlc_ivory", phase: 4, type: "ring", source: "DLC Ivory King" },
  { id: "md:20", progressId: "build:md:gold_pine", name: "Gold Pine Resin (Ricard's R2 burst)", areaId: "forest_of_fallen_giants", phase: 3, type: "key", source: "Buy from Laddersmith Gilligan / drops", optional: true },
  { id: "md:21", progressId: "build:md:counter_rapier", name: "Rapier counter practice", areaId: "heides_tower", phase: 2, type: "key", source: "Old Leo + rapier 2H thrust counter" },
  { id: "md:22", progressId: "nm3", name: "No-Man's Wharf (Ricard's route)", areaId: "no_mans_wharf", phase: 2, type: "key", source: "Access building with Ricard's Rapier chest" },
  { id: "md:23", progressId: "ik9", name: "Old Iron King", areaId: "iron_keep", phase: 3, type: "key", source: "Blacksteel farm area" },
];

const BUILD_ITEMS: BuildItem[] = [
  { name: "Rapier", type: "weapon", role: "Primary thrust / counter", phase: 1, whereToFind: [{ type: "buy", location: "Lenigrast", detail: "5 STR / 12 DEX" }] },
  { name: "Ricard's Rapier", type: "weapon", role: "R2 multi-hit spam", phase: 2, whereToFind: [{ type: "chest", location: "No-Man's Wharf", detail: "Building jump puzzle", unlock: "No-Man's Wharf" }], notes: "8 STR / 20 DEX. Poison/Bleed infusion optional." },
  { name: "Blacksteel Katana", type: "weapon", role: "Slash / quickdraw", phase: 3, whereToFind: [{ type: "drop", location: "Iron Keep", detail: "Alonne Knight or Captain", unlock: "Iron Keep" }], farmOptions: [{ enemy: "Alonne Knight Captain", area: "Iron Keep", method: "CoC farm", unlock: "Iron Keep" }] },
  { name: "Hunter's Blackbow", type: "weapon", role: "Ranged — fast draw", phase: 3, whereToFind: [{ type: "chest", location: "Majula mansion", detail: "Cale's House Key from FoFG", unlock: "Cale in FoFG" }], notes: "9 STR / 20 DEX." },
  { name: "Uchigatana", type: "weapon", role: "Backup katana", phase: 2, whereToFind: [{ type: "buy", location: "McDuff", detail: "5,000 souls", unlock: "Lost Bastille" }] },
  { name: "Old Leo Ring", type: "ring", role: "Thrust counter damage", phase: 2, whereToFind: [{ type: "boss", location: "Old Dragonslayer", detail: "Heide's Tower", unlock: "Heide's" }] },
  { name: "Flynn's Ring", type: "ring", role: "Low VIT AR — keep VIT 9", phase: 4, whereToFind: [{ type: "drop", location: "Dragon Shrine", detail: "Kill Creighton", unlock: "Dragon Aerie" }] },
  { name: "Ring of Blades +2", type: "ring", role: "Physical AR", phase: 4, whereToFind: [{ type: "boss", location: "Throne Watcher & Defender", detail: "NG+", unlock: "Throne of Want" }] },
  { name: "Third Dragon Ring", type: "ring", role: "HP/Stamina/Equip", phase: 4, whereToFind: [{ type: "chest", location: "Dragon Shrine", detail: "Before Ancient Dragon", unlock: "Dragon Aerie" }] },
  { name: "Chloranthy Ring +2", type: "ring", role: "Stamina regen", phase: 4, whereToFind: [{ type: "chest", location: "DLC Ivory King", detail: "Frozen Eleum Loyce", unlock: "DLC" }] },
];

export const masterDex: BuildTemplate = {
  id: "master-dex",
  name: "Master Dex Build",
  description: "Pure DEX. Rapier counters, Ricard's R2, Blacksteel, Hunter's Blackbow. Old Leo essential.",
  source: "DS2_ALL_BUILDS_A-Z",
  startingClass: "swordsman",
  baseStats: { ...BASE },
  levels: LEVELS,
  phaseInfo: [
    { num: 1, name: "Rapier Early", range: "SL 10→40", color: "#6b7c52", areas: "Betwixt → FoFG" },
    { num: 2, name: "Old Leo + Ricard's", range: "SL 41→65", color: "#c8a030", areas: "Heide's → Wharf" },
    { num: 3, name: "Blackbow + Katana", range: "SL 66→100", color: "#d4862a", areas: "Bastille → Iron Keep" },
    { num: 4, name: "Complete Build", range: "SL 101→150", color: "#a03030", areas: "Dragon Shrine → DLC" },
  ],
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  weapons: [
    { name: "Rapier +10", role: "Primary thrust", phase: 1, infusion: "None", stats: "5 STR / 12 DEX" },
    { name: "Ricard's Rapier +10", role: "R2 spam", phase: 2, infusion: "Poison/Bleed optional", stats: "8 STR / 20 DEX" },
    { name: "Blacksteel Katana +10", role: "Slash", phase: 3, infusion: "None", stats: "14 STR / 25 DEX" },
    { name: "Hunter's Blackbow +10", role: "Ranged", phase: 3, infusion: "None", stats: "9 STR / 20 DEX" },
    { name: "Uchigatana +10", role: "Backup", phase: 2, infusion: "None", stats: "10 STR / 14 DEX" },
  ],
  spells: [],
  keyRings: [
    { name: "Ring of Blades +2", effect: "Physical AR", source: "Throne NG+" },
    { name: "Old Leo Ring", effect: "Counter damage", source: "Old Dragonslayer" },
    { name: "Flynn's Ring", effect: "Low VIT AR", source: "Dragon Shrine" },
    { name: "Third Dragon Ring", effect: "HP/Stamina/Equip", source: "Dragon Shrine" },
    { name: "Chloranthy Ring +2", effect: "Stamina regen", source: "DLC Ivory King" },
  ],
  ringsDetail: {
    priorityOrder: ["Old Leo Ring", "Ring of Blades +2", "Flynn's Ring", "Third Dragon Ring", "Chloranthy Ring +2"],
    groups: [
      { label: "DEX core", ringNames: ["Old Leo Ring", "Ring of Blades +2", "Flynn's Ring"] },
      { label: "Survival", ringNames: ["Third Dragon Ring", "Chloranthy Ring +2"] },
    ],
    rings: [
      { name: "Old Leo Ring", priority: "core", effect: "Massive thrust counter damage with Rapier.", whereToGet: "Heide's Tower", howToGet: "Old Dragonslayer drop.", phase: 2 },
      { name: "Ring of Blades +2", priority: "core", effect: "+35 physical AR.", whereToGet: "Throne of Want", howToGet: "Throne Watcher & Defender NG+.", phase: 4 },
      { name: "Flynn's Ring", priority: "core", effect: "AR bonus at VIT 9 — do not level VIT past ~10.", whereToGet: "Dragon Shrine", howToGet: "Kill Creighton NPC.", phase: 4 },
      { name: "Third Dragon Ring", priority: "core", effect: "+12.5% HP, stamina, equip load.", whereToGet: "Dragon Shrine", howToGet: "Chest before Ancient Dragon fog.", phase: 4 },
      { name: "Chloranthy Ring +2", priority: "core", effect: "Stamina for Ricard's R2 chains.", whereToGet: "DLC Ivory King", howToGet: "Frozen Eleum Loyce.", phase: 4 },
    ],
  },
  buildSteps: BUILD_STEPS,
  buildItems: BUILD_ITEMS,
  buildMaterialFarms: [
    {
      item: "Titanite (Shards, Large, Chunks, Slab)",
      purpose: "Rapier, Ricard's, Blacksteel, Blackbow +10",
      sources: [{ type: "vendor", location: "Lenigrast, McDuff, Chloanne", detail: "See Farming tab" }],
      farmOptions: [
        { enemy: "Alonne Knight", area: "Iron Keep", method: "Chunks. CoC.", unlock: "Iron Keep" },
        { enemy: "Crystal Lizard", area: "Dragon Aerie", method: "Chunks", unlock: "Dragon Aerie" },
      ],
    },
    {
      item: "Blacksteel Katana (farm)",
      purpose: "Slash weapon option",
      sources: [{ type: "drop", location: "Iron Keep", detail: "Alonne Knight or Captain", unlock: "Iron Keep" }],
      farmOptions: [{ enemy: "Alonne Knight Captain", area: "Iron Keep", method: "Best rate. CoC.", unlock: "Iron Keep" }],
    },
  ],
};
