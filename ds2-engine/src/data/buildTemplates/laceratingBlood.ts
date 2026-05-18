/**
 * Lacerating Blood — Bleed-focused DEX build
 * Source: DS2_ALL_BUILDS_A-Z #8
 */

import type { BuildTemplate } from "./types";
import { CLASS_BASE_STATS } from "./types";
import { generateLevelRoadmap } from "./levelGenerator";
import type { StatKey } from "../simulator/types";
import type { BuildStep } from "../buildChecklist";
import type { BuildItem } from "../buildItems";

const BASE = CLASS_BASE_STATS.bandit;

const PHASE_TARGETS: BuildTemplate["phaseTargets"] = {
  1: { VGR: 13, END: 11, ATN: 5, STR: 10, DEX: 20, ADP: 7 },
  2: { VGR: 16, END: 15, ATN: 6, STR: 11, DEX: 25, ADP: 13 },
  3: { VGR: 18, END: 17, ATN: 7, STR: 12, DEX: 29, ADP: 17 },
  4: { VGR: 21, END: 21, ATN: 9, STR: 13, DEX: 34, ADP: 23 },
  5: { VGR: 24, END: 24, ATN: 10, STR: 14, DEX: 38, ADP: 28 },
  6: { VGR: 25, END: 25, VIT: 10, ATN: 10, STR: 14, DEX: 40, ADP: 30, INT: 8, FTH: 2 },
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
  startingClass: "bandit",
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  milestoneNotes: {
    "20:DEX": "★ Bandit's Knife online (12 DEX req)",
    "14:DEX": "★ Notched Whip req (14 DEX) — Bandit start has 14",
    "40:DEX": "★ Max bleed scaling",
    "30:ADP": "★ ADP 30 — high agility rolls",
    "150:DEX": "★★ BUILD COMPLETE — SL 150",
  },
});

const BUILD_STEPS: BuildStep[] = [
  { id: "lb:0", progressId: "build:lb:bandits_knife", name: "Bandit's Knife +10", areaId: "things_betwixt", phase: 1, type: "weapon", source: "Bandit start or buy from Lenigrast" },
  { id: "lb:1", progressId: "fg5", name: "Lenigrast's Key", areaId: "forest_of_fallen_giants", phase: 1, type: "key", source: "Melentia (1,000 souls)" },
  { id: "lb:2", progressId: "fg12", name: "Open Lenigrast's shop", areaId: "majula", phase: 1, type: "key", source: "Return to Majula" },
  { id: "lb:3", progressId: "fg15", name: "Ring of Blades", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "Pursuer drop" },
  { id: "lb:4", progressId: "fg21", name: "Chloranthy Ring", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "FoFG Pharros ballista room" },
  { id: "lb:5", progressId: "tb7", name: "Stone Ring", areaId: "things_betwixt", phase: 1, type: "ring", source: "Ogre by bridge", optional: true },
  { id: "lb:6", progressId: "hc13", name: "Notched Whip +10", areaId: "huntsmans_copse", phase: 2, type: "weapon", source: "Bridge Approach bonfire — corpse on ledge above" },
  { id: "lb:7", progressId: "nm6", name: "Flexile Sentry (Shadow Set drop)", areaId: "no_mans_wharf", phase: 2, type: "key", source: "Boss — Shadow Gauntlets from armor set" },
  { id: "lb:8", progressId: "build:lb:shadow_gauntlets", name: "Shadow Gauntlets (+15 bleed)", areaId: "no_mans_wharf", phase: 2, type: "key", source: "Flexile Sentry armor set drop" },
  { id: "lb:9", progressId: "hc9", name: "Executioner's Chariot", areaId: "huntsmans_copse", phase: 3, type: "key", source: "Undead Purgatory — hit lever to stop chariot" },
  { id: "lb:10", progressId: "build:lb:crest_of_blood", name: "Crest of Blood (+50 bleed)", areaId: "huntsmans_copse", phase: 3, type: "ring", source: "Straid or Ornifex (Chariot soul trade)" },
  { id: "lb:11", progressId: "lb2", name: "Dull Ember", areaId: "lost_bastille", phase: 3, type: "key", source: "Tower Apart chest" },
  { id: "lb:12", progressId: "lb7", name: "Give Dull Ember to McDuff", areaId: "lost_bastille", phase: 3, type: "key", source: "Unlocks Bleedstone infusion" },
  { id: "lb:13", progressId: "build:lb:bleed_infuse", name: "Bleed infuse Bandit's Knife + Shadow Dagger", areaId: "lost_bastille", phase: 3, type: "infusion", source: "McDuff (Bleedstone + 2,000 souls each)" },
  { id: "lb:14", progressId: "build:lb:shadow_dagger", name: "Shadow Dagger +10 (backstab/riposte)", areaId: "lost_bastille", phase: 3, type: "weapon", source: "Buy from Straid or McDuff (6 STR / 12 DEX)" },
  { id: "lb:15", progressId: "ht7", name: "Old Leo Ring (optional riposte boost)", areaId: "heides_tower", phase: 3, type: "ring", source: "Old Dragonslayer drop", optional: true },
  { id: "lb:16", progressId: "da10", name: "Third Dragon Ring", areaId: "dragon_aerie", phase: 4, type: "ring", source: "Dragon Shrine chest before Ancient Dragon" },
  { id: "lb:17", progressId: "tw7", name: "Ring of Blades +2", areaId: "throne_of_want", phase: 4, type: "ring", source: "Throne Watcher & Defender NG+" },
  { id: "lb:18", progressId: "build:lb:bleedstone_farm", name: "Farm Bleedstones", areaId: "lost_bastille", phase: 3, type: "key", source: "McDuff shop + Lost Bastille Pharros (Bleed Stone)" },
  { id: "lb:19", progressId: "build:lb:simpletons_ring", name: "Simpleton's Ring (+5 ADP)", areaId: "aldias_keep", phase: 4, type: "ring", source: "Covenant of Champions area chest", optional: true },
  { id: "lb:20", progressId: "build:lb:red_tearstone", name: "Red Tearstone Ring (proc burst)", areaId: "forest_of_fallen_giants", phase: 4, type: "ring", source: "FoFG cave chest near Cardinal Tower", optional: true },
];

const BUILD_ITEMS: BuildItem[] = [
  { name: "Bandit's Knife", type: "weapon", role: "Primary fast bleed", phase: 1, whereToFind: [{ type: "vendor", location: "Bandit start / Lenigrast", detail: "6 STR / 12 DEX — bleed infuse at McDuff" }] },
  { name: "Notched Whip", type: "weapon", role: "Reach bleed (cannot be infused)", phase: 2, whereToFind: [{ type: "corpse", location: "Huntsman's Copse", detail: "Bridge Approach bonfire — ledge above", unlock: "Huntsman's Copse" }], notes: "7 STR / 14 DEX. High innate bleed — no infusion slot." },
  { name: "Shadow Dagger", type: "weapon", role: "Backstab/riposte bleed proc", phase: 3, whereToFind: [{ type: "buy", location: "Straid / McDuff", detail: "6 STR / 12 DEX", unlock: "Lost Bastille" }] },
  { name: "Crest of Blood", type: "ring", role: "+50 bleed buildup — essential", phase: 3, whereToFind: [{ type: "trade", location: "Straid or Ornifex", detail: "Executioner's Chariot soul", unlock: "Undead Purgatory" }] },
  { name: "Shadow Gauntlets", type: "ring", role: "+15 bleed on hand attacks (armor piece)", phase: 2, whereToFind: [{ type: "drop", location: "Flexile Sentry", detail: "Shadow armor set (No-Man's Wharf boss)", unlock: "No-Man's Wharf" }] },
  { name: "Ring of Blades", type: "ring", role: "Flat physical AR", phase: 1, whereToFind: [{ type: "boss", location: "Pursuer", detail: "Guaranteed", unlock: "FoFG" }] },
  { name: "Chloranthy Ring", type: "ring", role: "Stamina for whip/knife combos", phase: 1, whereToFind: [{ type: "corpse", location: "FoFG", detail: "Pharros ballista room", unlock: "FoFG" }] },
  { name: "Stone Ring", type: "ring", role: "Poise damage for stagger into bleed", phase: 1, whereToFind: [{ type: "drop", location: "Things Betwixt", detail: "Ogre by bridge", unlock: "Start" }], optional: true },
  { name: "Third Dragon Ring", type: "ring", role: "HP/Stamina/Equip Load", phase: 4, whereToFind: [{ type: "chest", location: "Dragon Shrine", detail: "Before Ancient Dragon fog", unlock: "Dragon Aerie" }] },
  { name: "Ring of Blades +2", type: "ring", role: "Physical AR endgame", phase: 4, whereToFind: [{ type: "boss", location: "Throne Watcher & Defender", detail: "NG+", unlock: "Throne of Want" }] },
  { name: "Old Leo Ring", type: "ring", role: "Riposte damage boost", phase: 3, whereToFind: [{ type: "boss", location: "Old Dragonslayer", detail: "Heide's Tower", unlock: "Heide's" }], optional: true },
  { name: "Simpleton's Ring", type: "ring", role: "+5 ADP", phase: 4, whereToFind: [{ type: "chest", location: "Aldia's Keep", detail: "Covenant of Champions area", unlock: "Aldia's Keep" }], optional: true },
  { name: "Red Tearstone Ring", type: "ring", role: "+20% damage after bleed proc", phase: 4, whereToFind: [{ type: "chest", location: "FoFG", detail: "Cave near Cardinal Tower", unlock: "FoFG" }], optional: true },
];

export const laceratingBlood: BuildTemplate = {
  id: "lacerating-blood",
  name: "Lacerating Blood",
  description: "Bleed proc build. Bandit's Knife, Notched Whip, Crest of Blood, Shadow Gauntlets. Stack bleed, proc for burst.",
  source: "DS2_ALL_BUILDS_A-Z",
  startingClass: "bandit",
  baseStats: { ...BASE },
  levels: LEVELS,
  phaseInfo: [
    { num: 1, name: "Bandit's Knife", range: "SL 11→35", color: "#6b7c52", areas: "Betwixt → FoFG" },
    { num: 2, name: "Notched Whip", range: "SL 36→55", color: "#c8a030", areas: "Huntsman's → No-Man's Wharf" },
    { num: 3, name: "Crest + Shadow", range: "SL 56→90", color: "#d4862a", areas: "Purgatory → Bastille" },
    { num: 4, name: "Complete Build", range: "SL 91→150", color: "#a03030", areas: "Iron Keep → DLC" },
  ],
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  weapons: [
    { name: "Bandit's Knife +10", role: "Primary fast bleed", phase: 1, infusion: "Bleed", stats: "6 STR / 12 DEX" },
    { name: "Notched Whip +10", role: "Reach bleed", phase: 2, infusion: "None (no infusion)", stats: "7 STR / 14 DEX" },
    { name: "Shadow Dagger +10", role: "Backstab/riposte", phase: 3, infusion: "Bleed", stats: "6 STR / 12 DEX" },
  ],
  spells: [],
  keyRings: [
    { name: "Crest of Blood", effect: "+50 bleed", source: "Undead Purgatory (Chariot)" },
    { name: "Shadow Gauntlets", effect: "+15 bleed", source: "Flexile Sentry" },
    { name: "Ring of Blades +2", effect: "Physical AR", source: "Throne NG+" },
    { name: "Third Dragon Ring", effect: "HP/Stamina/Equip", source: "Dragon Shrine" },
    { name: "Chloranthy Ring", effect: "Stamina regen", source: "FoFG" },
  ],
  ringsDetail: {
    priorityOrder: ["Crest of Blood", "Ring of Blades +2", "Third Dragon Ring", "Chloranthy Ring", "Old Leo Ring", "Stone Ring"],
    groups: [
      { label: "Bleed core", ringNames: ["Crest of Blood"] },
      { label: "Damage / survival", ringNames: ["Ring of Blades +2", "Third Dragon Ring", "Chloranthy Ring", "Old Leo Ring", "Stone Ring"] },
    ],
    rings: [
      { name: "Crest of Blood", priority: "core", effect: "+50 bleed buildup. Essential for proc speed.", whereToGet: "Undead Purgatory", howToGet: "Trade Executioner's Chariot soul with Straid or Ornifex.", phase: 3 },
      { name: "Ring of Blades +2", priority: "core", effect: "+35 physical AR — boosts proc burst damage.", whereToGet: "Throne of Want", howToGet: "Throne Watcher & Defender in NG+.", phase: 4 },
      { name: "Third Dragon Ring", priority: "core", effect: "+12.5% HP, stamina, equip load.", whereToGet: "Dragon Shrine", howToGet: "Chest before Ancient Dragon fog.", phase: 4 },
      { name: "Chloranthy Ring", priority: "core", effect: "Stamina for knife/whip combo chains.", whereToGet: "FoFG", howToGet: "Pharros ballista room.", phase: 1 },
      { name: "Old Leo Ring", priority: "optional", effect: "Boosts riposte damage — pairs with Shadow Dagger.", whereToGet: "Heide's Tower", howToGet: "Old Dragonslayer drop.", phase: 3 },
      { name: "Stone Ring", priority: "optional", effect: "Increases poise damage to stagger into bleed.", whereToGet: "Things Betwixt", howToGet: "Ogre by bridge.", phase: 1 },
    ],
  },
  buildSteps: BUILD_STEPS,
  buildItems: BUILD_ITEMS,
  buildMaterialFarms: [
    {
      item: "Titanite (Shards, Large, Chunks, Slab)",
      purpose: "Bandit's Knife +10, Notched Whip +10, Shadow Dagger +10",
      sources: [{ type: "vendor", location: "Lenigrast, McDuff, Chloanne", detail: "See Farming tab" }],
      farmOptions: [
        { enemy: "Alonne Knight", area: "Iron Keep", method: "Chunks. CoC.", unlock: "Iron Keep" },
        { enemy: "Crystal Lizard", area: "Black Gulch, Dragon Aerie", method: "Chunks", unlock: "Area access" },
      ],
    },
    {
      item: "Bleedstone",
      purpose: "Bleed infuse Bandit's Knife, Shadow Dagger. McDuff: 1 stone + 2,000 souls. Notched Whip cannot be infused.",
      sources: [
        { type: "vendor", location: "Chloanne", detail: "After King's Ring", unlock: "King's Ring" },
        { type: "chest", location: "Lost Bastille Pharros", detail: "Servants' Quarters — Bleed Stone", unlock: "Lost Bastille" },
      ],
      farmOptions: [{ enemy: "Varies", area: "Lost Bastille", method: "Pharros room also has Northern Ritual Band", unlock: "Lost Bastille" }],
    },
  ],
};
