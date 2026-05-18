/**
 * Belmont Family — whip and consumables
 * Source: DS2_ALL_BUILDS_A-Z #17
 */

import type { BuildTemplate } from "./types";
import { CLASS_BASE_STATS } from "./types";
import { generateLevelRoadmap } from "./levelGenerator";
import type { StatKey } from "../simulator/types";
import type { BuildStep } from "../buildChecklist";
import type { BuildItem } from "../buildItems";

const BASE = CLASS_BASE_STATS.explorer;

const PHASE_TARGETS: BuildTemplate["phaseTargets"] = {
  1: { VGR: 10, END: 10, VIT: 8, ATN: 7, STR: 10, DEX: 14, ADP: 16 },
  2: { VGR: 14, END: 14, VIT: 9, ATN: 8, STR: 11, DEX: 18, ADP: 20 },
  3: { VGR: 17, END: 17, VIT: 9, ATN: 9, STR: 12, DEX: 21, ADP: 22 },
  4: { VGR: 21, END: 21, VIT: 10, ATN: 9, STR: 13, DEX: 25, ADP: 26 },
  5: { VGR: 24, END: 24, VIT: 10, ATN: 10, STR: 14, DEX: 28, ADP: 29 },
  6: { VGR: 25, END: 25, VIT: 10, ATN: 10, STR: 14, DEX: 30, ADP: 30, INT: 6, FTH: 6 },
};

const PHASE_PRIORITY: Record<number, StatKey[]> = {
  1: ["DEX", "VGR", "END", "ADP", "VIT", "ATN", "STR", "INT", "FTH"],
  2: ["DEX", "VGR", "END", "ADP", "VIT", "ATN", "STR", "INT", "FTH"],
  3: ["DEX", "VGR", "END", "ADP", "VIT", "ATN", "STR", "INT", "FTH"],
  4: ["DEX", "VGR", "END", "ADP", "VIT", "ATN", "STR", "INT", "FTH"],
  5: ["DEX", "VGR", "END", "ADP", "VIT", "ATN", "STR", "INT", "FTH"],
  6: ["DEX", "VGR", "END", "ADP", "VIT", "ATN", "STR", "INT", "FTH"],
};

const LEVELS = generateLevelRoadmap({
  startingClass: "explorer",
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  milestoneNotes: {
    "12:DEX": "★ Whip from Lenigrast (6 STR / 12 DEX)",
    "14:DEX": "★ Notched Whip req",
    "20:DEX": "★ Old Whip req (7 STR / 20 DEX)",
    "30:DEX": "★ 30 DEX — whip scaling cap",
    "30:ADP": "★ ADP 30 — agility for rolls",
    "150:DEX": "★★ BUILD COMPLETE — SL 150",
  },
});

const BUILD_STEPS: BuildStep[] = [
  { id: "bf:0", progressId: "tb7", name: "Stone Ring", areaId: "things_betwixt", phase: 1, type: "ring", source: "Ogre by bridge — poise break for whip stagger" },
  { id: "bf:1", progressId: "fg5", name: "Lenigrast's Key", areaId: "forest_of_fallen_giants", phase: 1, type: "key", source: "Melentia (1,000 souls)" },
  { id: "bf:2", progressId: "fg12", name: "Open Lenigrast's shop", areaId: "majula", phase: 1, type: "key", source: "Return to Majula" },
  { id: "bf:3", progressId: "build:bf:whip", name: "Whip +10 (buy from Lenigrast)", areaId: "forest_of_fallen_giants", phase: 1, type: "weapon", source: "6 STR / 12 DEX — early reach" },
  { id: "bf:4", progressId: "fg15", name: "Ring of Blades", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "Pursuer drop" },
  { id: "bf:5", progressId: "fg21", name: "Chloranthy Ring", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "FoFG Pharros ballista room" },
  { id: "bf:6", progressId: "build:bf:consumables", name: "Stock throwing knives, firebombs, holy water", areaId: "majula", phase: 1, type: "key", source: "Melentia, Gavlan — Castlevania consumable kit" },
  { id: "bf:7", progressId: "hc13", name: "Notched Whip +10", areaId: "huntsmans_copse", phase: 2, type: "weapon", source: "Bridge Approach — corpse on ledge above bonfire" },
  { id: "bf:8", progressId: "build:bf:old_whip", name: "Old Whip +5", areaId: "the_pit", phase: 3, type: "weapon", source: "Grave of Saints rat drop — farm with Company of Champions (rare, fragile)" },
  { id: "bf:9", progressId: "pt4", name: "Royal Rat Vanguard (Grave of Saints access)", areaId: "the_pit", phase: 3, type: "key", source: "Majula pit ladder — Pharros Lockstones in area" },
  { id: "bf:10", progressId: "hc9", name: "Executioner's Chariot", areaId: "huntsmans_copse", phase: 3, type: "key", source: "Undead Purgatory — stop chariot with lever" },
  { id: "bf:11", progressId: "build:lb:crest_of_blood", name: "Crest of Blood (+50 bleed)", areaId: "majula", phase: 3, type: "ring", source: "Straid or Ornifex (Chariot soul) — pairs with Notched Whip", optional: true },
  { id: "bf:12", progressId: "build:bf:dex_30", name: "30 DEX reached", areaId: "iron_keep", phase: 3, type: "key", source: "Soft cap for whip AR" },
  { id: "bf:13", progressId: "build:bf:adp_30", name: "ADP 30 — high agility", areaId: "iron_keep", phase: 4, type: "key", source: "Explorer ADP investment for i-frames" },
  { id: "bf:14", progressId: "da10", name: "Third Dragon Ring", areaId: "dragon_aerie", phase: 4, type: "ring", source: "Dragon Shrine chest before Ancient Dragon" },
  { id: "bf:15", progressId: "tw7", name: "Ring of Blades +2", areaId: "throne_of_want", phase: 4, type: "ring", source: "Throne Watcher & Defender NG+" },
  { id: "bf:16", progressId: "d316", name: "Chloranthy Ring +2", areaId: "dlc_ivory", phase: 4, type: "ring", source: "Crown of the Ivory King DLC", optional: true },
  { id: "bf:17", progressId: "build:bf:spotted_whip", name: "Spotted Whip +10 (poison swap)", areaId: "shaded_woods", phase: 3, type: "weapon", source: "Corpse in Shaded Woods — status option", optional: true },
  { id: "bf:18", progressId: "ik9", name: "Old Iron King", areaId: "iron_keep", phase: 3, type: "key", source: "Progression toward endgame rings" },
  { id: "bf:19", progressId: "build:bf:restock", name: "Restock consumables before bosses", areaId: "majula", phase: 4, type: "key", source: "Melentia / Gavlan — knives, urns, firebombs" },
  { id: "bf:20", progressId: "build:bf:old_whip_backup", name: "Keep standard Whip as durability backup", areaId: "forest_of_fallen_giants", phase: 1, type: "weapon", source: "Old Whip breaks fast — Whip +10 for long routes", optional: true },
  { id: "bf:21", progressId: "lb8", name: "Ruin Sentinels (McDuff access)", areaId: "lost_bastille", phase: 2, type: "key", source: "Opens smith for +10 whips" },
  { id: "bf:22", progressId: "bc18", name: "Flynn's Ring (optional AR at low load)", areaId: "brightstone_cove", phase: 4, type: "ring", source: "Hidden chest — light armor build", optional: true },
];

const BUILD_ITEMS: BuildItem[] = [
  { name: "Whip", type: "weapon", role: "Early reach / durability backup", phase: 1, whereToFind: [{ type: "vendor", location: "Lenigrast", detail: "6 STR / 12 DEX", unlock: "Lenigrast's Key" }] },
  { name: "Notched Whip", type: "weapon", role: "Bleed whip (no infusion)", phase: 2, whereToFind: [{ type: "corpse", location: "Huntsman's Copse", detail: "Bridge Approach ledge", unlock: "Huntsman's Copse" }], notes: "7 STR / 14 DEX. Pair with Crest of Blood." },
  { name: "Old Whip", type: "weapon", role: "Highest AR whip (fragile)", phase: 3, whereToFind: [{ type: "drop", location: "Grave of Saints", detail: "Rat enemies — CoC farm", unlock: "The Pit" }], farmOptions: [{ enemy: "Royal Rat", area: "Grave of Saints", method: "Rare drop. CoC respawn.", unlock: "The Pit" }], notes: "7 STR / 20 DEX. Low durability." },
  { name: "Throwing Knives", type: "weapon", role: "Ranged consumable", phase: 1, whereToFind: [{ type: "vendor", location: "Melentia", detail: "Buy in bulk" }] },
  { name: "Firebombs", type: "weapon", role: "AoE consumable", phase: 1, whereToFind: [{ type: "vendor", location: "Melentia / Gavlan", detail: "Stock for bosses" }] },
  { name: "Holy Water Urn", type: "weapon", role: "Undead-hunter consumable", phase: 1, whereToFind: [{ type: "vendor", location: "Melentia", detail: "Vs hollow-heavy areas" }] },
  { name: "Crest of Blood", type: "ring", role: "+50 bleed buildup", phase: 3, whereToFind: [{ type: "trade", location: "Straid or Ornifex", detail: "Chariot soul", unlock: "Undead Purgatory" }], optional: true },
  { name: "Stone Ring", type: "ring", role: "Poise damage — stagger into whip combos", phase: 1, whereToFind: [{ type: "drop", location: "Things Betwixt", detail: "Ogre by bridge", unlock: "Start" }] },
  { name: "Ring of Blades +2", type: "ring", role: "Physical AR", phase: 4, whereToFind: [{ type: "boss", location: "Throne Watcher & Defender", detail: "NG+", unlock: "Throne of Want" }] },
  { name: "Third Dragon Ring", type: "ring", role: "HP/Stamina/Equip", phase: 4, whereToFind: [{ type: "chest", location: "Dragon Shrine", detail: "Before Ancient Dragon", unlock: "Dragon Aerie" }] },
  { name: "Chloranthy Ring", type: "ring", role: "Stamina for whip flurries", phase: 1, whereToFind: [{ type: "corpse", location: "FoFG", detail: "Pharros ballista room", unlock: "FoFG" }] },
];

export const belmontFamily: BuildTemplate = {
  id: "belmont-family",
  name: "Belmont Family",
  description: "Whip and throwing items. Castlevania-style reach, consumables, and bleed option.",
  source: "DS2_ALL_BUILDS_A-Z",
  startingClass: "explorer",
  baseStats: { ...BASE },
  levels: LEVELS,
  phaseInfo: [
    { num: 1, name: "Whip Early", range: "SL 10→35", color: "#6b7c52", areas: "Betwixt → FoFG" },
    { num: 2, name: "Notched Whip", range: "SL 36→55", color: "#c8a030", areas: "Huntsman's Copse" },
    { num: 3, name: "Old Whip", range: "SL 56→95", color: "#d4862a", areas: "Grave of Saints → Iron Keep" },
    { num: 4, name: "Complete Build", range: "SL 96→150", color: "#a03030", areas: "Dragon Shrine → DLC" },
  ],
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  weapons: [
    { name: "Old Whip +5", role: "Primary (highest AR)", phase: 3, infusion: "None", stats: "7 STR / 20 DEX" },
    { name: "Notched Whip +10", role: "Bleed option", phase: 2, infusion: "None", stats: "7 STR / 14 DEX" },
    { name: "Whip +10", role: "Durability backup", phase: 1, infusion: "None", stats: "6 STR / 12 DEX" },
    { name: "Throwing Knives / Firebombs / Holy Water", role: "Consumables", phase: 1, infusion: "—", stats: "—" },
  ],
  spells: [],
  keyRings: [
    { name: "Ring of Blades +2", effect: "Physical AR", source: "Throne NG+" },
    { name: "Third Dragon Ring", effect: "HP/Stamina/Equip", source: "Dragon Shrine" },
    { name: "Chloranthy Ring", effect: "Stamina regen", source: "FoFG" },
    { name: "Stone Ring", effect: "Poise break", source: "Things Betwixt" },
    { name: "Crest of Blood", effect: "Bleed (Notched Whip)", source: "Chariot soul" },
  ],
  ringsDetail: {
    priorityOrder: ["Ring of Blades +2", "Third Dragon Ring", "Chloranthy Ring", "Stone Ring", "Crest of Blood"],
    groups: [
      { label: "Damage", ringNames: ["Ring of Blades +2", "Crest of Blood"] },
      { label: "Utility / survival", ringNames: ["Third Dragon Ring", "Chloranthy Ring", "Stone Ring"] },
    ],
    rings: [
      { name: "Ring of Blades +2", priority: "core", effect: "Flat physical AR on whip attacks.", whereToGet: "Throne of Want", howToGet: "Throne Watcher & Defender NG+.", phase: 4 },
      { name: "Third Dragon Ring", priority: "core", effect: "+12.5% HP, stamina, equip load.", whereToGet: "Dragon Shrine", howToGet: "Chest before Ancient Dragon fog.", phase: 4 },
      { name: "Chloranthy Ring", priority: "core", effect: "Stamina for long whip chains and consumable tosses.", whereToGet: "FoFG", howToGet: "Pharros ballista room corpse.", phase: 1 },
      { name: "Stone Ring", priority: "core", effect: "Boosts poise damage — stagger into whip.", whereToGet: "Things Betwixt", howToGet: "Ogre by bridge drop.", phase: 1 },
      { name: "Crest of Blood", priority: "optional", effect: "+50 bleed — essential if running Notched Whip.", whereToGet: "Majula", howToGet: "Chariot soul trade at Straid/Ornifex.", phase: 3 },
    ],
  },
  buildSteps: BUILD_STEPS,
  buildItems: BUILD_ITEMS,
  buildMaterialFarms: [
    {
      item: "Titanite (Shards, Large, Chunks, Slab)",
      purpose: "Whip +10, Notched Whip +10",
      sources: [{ type: "vendor", location: "Lenigrast, McDuff, Chloanne", detail: "See Farming tab" }],
      farmOptions: [
        { enemy: "Crystal Lizard", area: "Black Gulch, Dragon Aerie", method: "Chunks", unlock: "Mid-game" },
        { enemy: "Alonne Knight", area: "Iron Keep", method: "Chunks. CoC.", unlock: "Iron Keep" },
      ],
    },
    {
      item: "Old Whip (farm)",
      purpose: "Rare primary whip — backup Whip +10 for durability",
      sources: [{ type: "drop", location: "Grave of Saints", detail: "Royal Rats" }],
      farmOptions: [{ enemy: "Royal Rat", area: "Grave of Saints (The Pit)", method: "Company of Champions respawn", unlock: "The Pit" }],
    },
  ],
};
