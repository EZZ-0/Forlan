/**
 * Ninja Warrior — dual katanas, Shadow Set
 * Source: DS2_ALL_BUILDS_A-Z #15
 */

import type { BuildTemplate } from "./types";
import { CLASS_BASE_STATS } from "./types";
import { generateLevelRoadmap } from "./levelGenerator";
import type { StatKey } from "../simulator/types";
import type { BuildStep } from "../buildChecklist";
import type { BuildItem } from "../buildItems";

const BASE = CLASS_BASE_STATS.swordsman;

const PHASE_TARGETS: BuildTemplate["phaseTargets"] = {
  1: { VGR: 9, END: 12, VIT: 6, STR: 10, DEX: 23, ADP: 12 },
  2: { VGR: 13, END: 18, VIT: 9, STR: 12, DEX: 30, ADP: 20 },
  3: { VGR: 16, END: 24, VIT: 12, STR: 14, DEX: 38, ADP: 28 },
  4: { VGR: 20, END: 28, VIT: 14, STR: 15, DEX: 43, ADP: 33 },
  5: { VGR: 23, END: 29, VIT: 15, STR: 15, DEX: 45, ADP: 35 },
  6: { VGR: 25, END: 30, VIT: 15, ATN: 6, STR: 15, DEX: 45, ADP: 35, INT: 5, FTH: 6 },
};

const PHASE_PRIORITY: Record<number, StatKey[]> = {
  1: ["DEX", "ADP", "END", "VGR", "STR", "VIT", "ATN", "INT", "FTH"],
  2: ["DEX", "ADP", "END", "VGR", "STR", "VIT", "ATN", "INT", "FTH"],
  3: ["DEX", "ADP", "END", "VGR", "STR", "VIT", "ATN", "INT", "FTH"],
  4: ["DEX", "ADP", "END", "VGR", "STR", "VIT", "ATN", "INT", "FTH"],
  5: ["DEX", "ADP", "END", "VGR", "STR", "VIT", "ATN", "INT", "FTH"],
  6: ["DEX", "ADP", "END", "VGR", "STR", "VIT", "ATN", "INT", "FTH"],
};

const LEVELS = generateLevelRoadmap({
  startingClass: "swordsman",
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  milestoneNotes: {
    "10:STR": "★ Uchigatana (McDuff)",
    "15:STR": "★ Power stance katanas (1.5× reqs)",
    "45:DEX": "★★ BUILD COMPLETE — SL 150",
  },
});

const BUILD_STEPS: BuildStep[] = [
  { id: "nw:0", progressId: "build:nw:scimitar", name: "Scimitar +10 (Swordsman start)", areaId: "things_betwixt", phase: 1, type: "weapon", source: "Until first katana" },
  { id: "nw:1", progressId: "fg5", name: "Lenigrast's Key", areaId: "forest_of_fallen_giants", phase: 1, type: "key", source: "Melentia (1,000 souls)" },
  { id: "nw:2", progressId: "fg12", name: "Open Lenigrast's shop", areaId: "majula", phase: 1, type: "key", source: "Return to Majula" },
  { id: "nw:3", progressId: "fg15", name: "Ring of Blades", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "Pursuer drop" },
  { id: "nw:4", progressId: "fg21", name: "Chloranthy Ring", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "FoFG Pharros ballista room" },
  { id: "nw:5", progressId: "nm6", name: "Flexile Sentry (Shadow Set)", areaId: "no_mans_wharf", phase: 2, type: "key", source: "Boss — full Shadow armor + Shadow Dagger" },
  { id: "nw:6", progressId: "build:lb:shadow_gauntlets", name: "Shadow Gauntlets (set piece)", areaId: "no_mans_wharf", phase: 2, type: "key", source: "Flexile Sentry armor drop" },
  { id: "nw:7", progressId: "build:lb:shadow_dagger", name: "Shadow Dagger +10", areaId: "no_mans_wharf", phase: 2, type: "weapon", source: "Flexile drop or buy from Straid — riposte tool" },
  { id: "nw:8", progressId: "lb2", name: "Dull Ember", areaId: "lost_bastille", phase: 2, type: "key", source: "Tower Apart" },
  { id: "nw:9", progressId: "lb7", name: "Give Dull Ember to McDuff", areaId: "lost_bastille", phase: 2, type: "key", source: "Uchigatana shop + infusion" },
  { id: "nw:10", progressId: "build:uchigatana", name: "Uchigatana +10 (right hand)", areaId: "lost_bastille", phase: 2, type: "weapon", source: "McDuff (5,000 souls)" },
  { id: "nw:11", progressId: "build:nw:uchi_2", name: "Second Uchigatana (left hand)", areaId: "lost_bastille", phase: 3, type: "weapon", source: "Buy second from McDuff or farm Alonne Captain" },
  { id: "nw:12", progressId: "build:nw:power_stance", name: "Power stance katanas", areaId: "lost_bastille", phase: 3, type: "key", source: "15 STR / 15 DEX for dual katana (1.5× per weapon req)" },
  { id: "nw:13", progressId: "build:blacksteel", name: "Blacksteel Katana (power stance alt)", areaId: "iron_keep", phase: 3, type: "weapon", source: "Alonne drop — 14 STR / 25 DEX each", optional: true },
  { id: "nw:14", progressId: "build:nw:blacksteel_2", name: "Second Blacksteel (dual quickdraw)", areaId: "iron_keep", phase: 3, type: "weapon", source: "Farm Alonne Captain with CoC", optional: true },
  { id: "nw:15", progressId: "fg16", name: "Cale — House Key", areaId: "forest_of_fallen_giants", phase: 3, type: "key", source: "FoFG cave cartographer" },
  { id: "nw:16", progressId: "build:hunters_blackbow", name: "Hunter's Blackbow +10", areaId: "majula", phase: 3, type: "weapon", source: "Majula mansion chest", optional: true },
  { id: "nw:17", progressId: "sw10", name: "Fragrant Branch", areaId: "shaded_woods", phase: 3, type: "key", source: "Progression branch" },
  { id: "nw:18", progressId: "da10", name: "Third Dragon Ring", areaId: "dragon_aerie", phase: 4, type: "ring", source: "Dragon Shrine chest" },
  { id: "nw:19", progressId: "bc18", name: "Flynn's Ring", areaId: "dragon_aerie", phase: 4, type: "ring", source: "Dragon Shrine — low VIT AR (VIT 15 for Shadow Set)" },
  { id: "nw:20", progressId: "tw7", name: "Ring of Blades +2", areaId: "throne_of_want", phase: 4, type: "ring", source: "Throne Watcher & Defender NG+" },
  { id: "nw:21", progressId: "d316", name: "Chloranthy Ring +2", areaId: "dlc_ivory", phase: 4, type: "ring", source: "DLC Ivory King" },
  { id: "nw:22", progressId: "build:nw:bleed_infuse", name: "Bleed infuse katanas (optional)", areaId: "lost_bastille", phase: 3, type: "infusion", source: "McDuff Bleedstone", optional: true },
  { id: "nw:23", progressId: "build:nw:shadow_set", name: "Equip full Shadow Set", areaId: "no_mans_wharf", phase: 2, type: "key", source: "Ninja aesthetic — light armor" },
  { id: "nw:24", progressId: "ik9", name: "Old Iron King", areaId: "iron_keep", phase: 3, type: "key", source: "Second katana farm area" },
];

const BUILD_ITEMS: BuildItem[] = [
  { name: "Uchigatana", type: "weapon", role: "Power stance primary (×2)", phase: 2, whereToFind: [{ type: "buy", location: "McDuff", detail: "5,000 souls each", unlock: "Lost Bastille" }], notes: "15 STR / 15 DEX for power stance." },
  { name: "Blacksteel Katana", type: "weapon", role: "Power stance alt", phase: 3, whereToFind: [{ type: "drop", location: "Iron Keep", detail: "Alonne Knight / Captain", unlock: "Iron Keep" }], optional: true },
  { name: "Shadow Dagger", type: "weapon", role: "Riposte / backstab", phase: 2, whereToFind: [{ type: "drop", location: "Flexile Sentry", detail: "Shadow Set boss", unlock: "No-Man's Wharf" }] },
  { name: "Shadow Set", type: "weapon", role: "Light ninja armor", phase: 2, whereToFind: [{ type: "drop", location: "Flexile Sentry", detail: "Full armor set", unlock: "No-Man's Wharf" }] },
  { name: "Hunter's Blackbow", type: "weapon", role: "Ranged", phase: 3, whereToFind: [{ type: "chest", location: "Majula mansion", detail: "Cale's House Key", unlock: "FoFG" }], optional: true },
  { name: "Ring of Blades +2", type: "ring", role: "Physical AR", phase: 4, whereToFind: [{ type: "boss", location: "Throne Watcher & Defender", detail: "NG+", unlock: "Throne of Want" }] },
  { name: "Third Dragon Ring", type: "ring", role: "HP/Stamina/Equip", phase: 4, whereToFind: [{ type: "chest", location: "Dragon Shrine", detail: "Before Ancient Dragon", unlock: "Dragon Aerie" }] },
  { name: "Flynn's Ring", type: "ring", role: "AR at moderate VIT", phase: 4, whereToFind: [{ type: "drop", location: "Dragon Shrine", detail: "Kill Creighton", unlock: "Dragon Aerie" }] },
  { name: "Chloranthy Ring +2", type: "ring", role: "Power stance stamina", phase: 4, whereToFind: [{ type: "chest", location: "DLC Ivory King", detail: "Frozen Eleum Loyce", unlock: "DLC" }] },
  { name: "Chloranthy Ring", type: "ring", role: "Early stamina", phase: 1, whereToFind: [{ type: "corpse", location: "FoFG", detail: "Pharros ballista room", unlock: "FoFG" }] },
];

export const ninjaWarrior: BuildTemplate = {
  id: "ninja-warrior",
  name: "Ninja Warrior",
  description: "Dual katana power stance. Shadow Set, high DEX/ADP, Flynn's Ring.",
  source: "DS2_ALL_BUILDS_A-Z",
  startingClass: "swordsman",
  baseStats: { ...BASE },
  levels: LEVELS,
  phaseInfo: [
    { num: 1, name: "Early Setup", range: "SL 10→35", color: "#6b7c52", areas: "Betwixt → FoFG" },
    { num: 2, name: "Shadow Set", range: "SL 36→55", color: "#c8a030", areas: "No-Man's Wharf" },
    { num: 3, name: "Dual Katanas", range: "SL 56→90", color: "#d4862a", areas: "Bastille → Iron Keep" },
    { num: 4, name: "Complete Build", range: "SL 91→150", color: "#a03030", areas: "Dragon Shrine → DLC" },
  ],
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  weapons: [
    { name: "Uchigatana +10 (×2)", role: "Power stance", phase: 3, infusion: "None or Bleed", stats: "15 STR / 15 DEX" },
    { name: "Blacksteel Katana +10 (×2)", role: "Power stance alt", phase: 3, infusion: "None", stats: "14 STR / 25 DEX" },
    { name: "Shadow Dagger +10", role: "Riposte", phase: 2, infusion: "None", stats: "6 STR / 12 DEX" },
    { name: "Hunter's Blackbow +10", role: "Ranged", phase: 3, infusion: "None", stats: "9 STR / 20 DEX" },
  ],
  spells: [],
  keyRings: [
    { name: "Ring of Blades +2", effect: "Physical AR", source: "Throne NG+" },
    { name: "Third Dragon Ring", effect: "HP/Stamina/Equip", source: "Dragon Shrine" },
    { name: "Chloranthy Ring +2", effect: "Stamina regen", source: "DLC Ivory King" },
    { name: "Flynn's Ring", effect: "Low-mid VIT AR", source: "Dragon Shrine" },
  ],
  ringsDetail: {
    priorityOrder: ["Ring of Blades +2", "Chloranthy Ring +2", "Third Dragon Ring", "Flynn's Ring", "Chloranthy Ring"],
    groups: [
      { label: "Core", ringNames: ["Ring of Blades +2", "Chloranthy Ring +2", "Third Dragon Ring"] },
      { label: "Optional", ringNames: ["Flynn's Ring", "Chloranthy Ring"] },
    ],
    rings: [
      { name: "Ring of Blades +2", priority: "core", effect: "+35 physical AR — dual katana AR stacks.", whereToGet: "Throne of Want", howToGet: "Throne Watcher & Defender NG+.", phase: 4 },
      { name: "Chloranthy Ring +2", priority: "core", effect: "Essential stamina for power stance chains.", whereToGet: "DLC Ivory King", howToGet: "Frozen Eleum Loyce.", phase: 4 },
      { name: "Third Dragon Ring", priority: "core", effect: "+12.5% HP, stamina, equip load.", whereToGet: "Dragon Shrine", howToGet: "Chest before Ancient Dragon fog.", phase: 4 },
      { name: "Flynn's Ring", priority: "optional", effect: "AR bonus — VIT 15 for Shadow Set still works.", whereToGet: "Dragon Shrine", howToGet: "Kill Creighton NPC.", phase: 4 },
      { name: "Chloranthy Ring", priority: "optional", effect: "Early stamina until +2.", whereToGet: "FoFG", howToGet: "Pharros ballista room.", phase: 1 },
    ],
  },
  buildSteps: BUILD_STEPS,
  buildItems: BUILD_ITEMS,
  buildMaterialFarms: [
    {
      item: "Titanite (Shards, Large, Chunks, Slab)",
      purpose: "Dual Uchigatana +10, Shadow Dagger +10",
      sources: [{ type: "vendor", location: "Lenigrast, McDuff, Chloanne", detail: "See Farming tab" }],
      farmOptions: [
        { enemy: "Alonne Knight Captain", area: "Iron Keep", method: "Second Uchi drop + chunks. CoC.", unlock: "Iron Keep" },
        { enemy: "Crystal Lizard", area: "Dragon Aerie", method: "Chunks", unlock: "Dragon Aerie" },
      ],
    },
    {
      item: "Bleedstone",
      purpose: "Bleed infuse katanas (optional)",
      sources: [{ type: "vendor", location: "Chloanne", detail: "After King's Ring", unlock: "King's Ring" }],
      farmOptions: [{ enemy: "Varies", area: "Lost Bastille Pharros", method: "Fixed Bleed Stone chest", unlock: "Lost Bastille" }],
    },
  ],
};
