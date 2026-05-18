/**
 * Oro's Blacksteel Katana — pure DEX katana
 * Source: DS2_ALL_BUILDS_A-Z #9
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
  2: { VGR: 13, END: 15, VIT: 7, STR: 11, DEX: 30, ADP: 17 },
  3: { VGR: 16, END: 18, VIT: 8, STR: 12, DEX: 35, ADP: 20 },
  4: { VGR: 20, END: 21, VIT: 9, STR: 13, DEX: 42, ADP: 25 },
  5: { VGR: 23, END: 24, VIT: 10, STR: 14, DEX: 47, ADP: 28 },
  6: { VGR: 25, END: 25, VIT: 10, ATN: 6, STR: 14, DEX: 50, ADP: 30, INT: 5, FTH: 6 },
};

const PHASE_PRIORITY: Record<number, StatKey[]> = {
  1: ["DEX", "VGR", "END", "ADP", "STR", "VIT", "ATN", "INT", "FTH"],
  2: ["DEX", "VGR", "END", "ADP", "STR", "VIT", "ATN", "INT", "FTH"],
  3: ["DEX", "VGR", "END", "ADP", "STR", "VIT", "ATN", "INT", "FTH"],
  4: ["DEX", "VGR", "END", "ADP", "STR", "VIT", "ATN", "INT", "FTH"],
  5: ["DEX", "VGR", "END", "ADP", "STR", "VIT", "ATN", "INT", "FTH"],
  6: ["DEX", "VGR", "END", "ADP", "STR", "VIT", "ATN", "INT", "FTH"],
};

const LEVELS = generateLevelRoadmap({
  startingClass: "swordsman",
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  milestoneNotes: {
    "10:STR": "★ Uchigatana (McDuff 5,000 souls)",
    "14:STR": "★ Blacksteel 1H req (14 STR)",
    "25:DEX": "★ Blacksteel Katana online (25 DEX)",
    "50:DEX": "★★ BUILD COMPLETE — SL 150",
  },
});

const BUILD_STEPS: BuildStep[] = [
  { id: "ob:0", progressId: "build:ob:scimitar", name: "Scimitar +10 (Swordsman start)", areaId: "things_betwixt", phase: 1, type: "weapon", source: "Starting gear → Lenigrast" },
  { id: "ob:1", progressId: "fg5", name: "Lenigrast's Key", areaId: "forest_of_fallen_giants", phase: 1, type: "key", source: "Melentia (1,000 souls)" },
  { id: "ob:2", progressId: "fg12", name: "Open Lenigrast's shop", areaId: "majula", phase: 1, type: "key", source: "Return to Majula with key" },
  { id: "ob:3", progressId: "fg15", name: "Ring of Blades", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "Pursuer drop" },
  { id: "ob:4", progressId: "fg21", name: "Chloranthy Ring", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "FoFG Pharros ballista room" },
  { id: "ob:5", progressId: "lb2", name: "Dull Ember", areaId: "lost_bastille", phase: 1, type: "key", source: "Tower Apart chest" },
  { id: "ob:6", progressId: "lb7", name: "Give Dull Ember to McDuff", areaId: "lost_bastille", phase: 1, type: "key", source: "Unlocks infusion + slab shop" },
  { id: "ob:7", progressId: "build:uchigatana", name: "Uchigatana +10", areaId: "lost_bastille", phase: 1, type: "weapon", source: "McDuff (5,000 souls) — early katana" },
  { id: "ob:8", progressId: "ht7", name: "Old Leo Ring", areaId: "heides_tower", phase: 2, type: "ring", source: "Old Dragonslayer drop" },
  { id: "ob:9", progressId: "ik5", name: "Iron Key (FoFG shortcuts)", areaId: "iron_keep", phase: 2, type: "key", source: "Iron Keep — opens FoFG doors" },
  { id: "ob:10", progressId: "build:blacksteel", name: "Blacksteel Katana +10", areaId: "iron_keep", phase: 2, type: "weapon", source: "Alonne Knight / Captain drop — farm with CoC" },
  { id: "ob:11", progressId: "build:ob:blacksteel_2", name: "Second Blacksteel (power stance, optional)", areaId: "iron_keep", phase: 3, type: "weapon", source: "Farm Alonne Captain or NG+ McDuff Uchi", optional: true },
  { id: "ob:12", progressId: "build:ob:short_bow", name: "Short Bow +10", areaId: "forest_of_fallen_giants", phase: 3, type: "weapon", source: "Lenigrast / drop — 12 DEX", optional: true },
  { id: "ob:13", progressId: "sw10", name: "Fragrant Branch (Shaded Woods)", areaId: "shaded_woods", phase: 3, type: "key", source: "Buy from Merchant Hag or find in world" },
  { id: "ob:14", progressId: "da10", name: "Third Dragon Ring", areaId: "dragon_aerie", phase: 4, type: "ring", source: "Dragon Shrine chest before Ancient Dragon fog" },
  { id: "ob:15", progressId: "bc18", name: "Flynn's Ring", areaId: "dragon_aerie", phase: 4, type: "ring", source: "Dragon Shrine — kill Creighton (optional NPC)", optional: true },
  { id: "ob:16", progressId: "tw7", name: "Ring of Blades +2", areaId: "throne_of_want", phase: 4, type: "ring", source: "Throne Watcher & Defender NG+" },
  { id: "ob:17", progressId: "d316", name: "Chloranthy Ring +2", areaId: "dlc_ivory", phase: 4, type: "ring", source: "Crown of the Ivory King DLC" },
  { id: "ob:18", progressId: "build:ob:quickdraw", name: "Practice quickdraw cancel", areaId: "iron_keep", phase: 3, type: "key", source: "2H → Roll → R1 → R2 for faster Blacksteel strong" },
  { id: "ob:19", progressId: "lb8", name: "Ruin Sentinels (Bastille access)", areaId: "lost_bastille", phase: 1, type: "key", source: "Boss on platform — McDuff smith" },
  { id: "ob:20", progressId: "ht3", name: "Heide's Tower — Dragonrider", areaId: "heides_tower", phase: 2, type: "key", source: "Opens path to Old Dragonslayer" },
  { id: "ob:21", progressId: "ik9", name: "Old Iron King (Lord Soul)", areaId: "iron_keep", phase: 2, type: "key", source: "Iron Keep boss — progression to Drangleic" },
  { id: "ob:22", progressId: "da6", name: "Ashen Mist Heart", areaId: "dragon_aerie", phase: 4, type: "key", source: "Talk to Ancient Dragon (do not fight yet)" },
  { id: "ob:23", progressId: "build:ob:counter_practice", name: "Counter damage setup", areaId: "heides_tower", phase: 2, type: "key", source: "Old Leo + katana 2H strong counter windows" },
];

const BUILD_ITEMS: BuildItem[] = [
  { name: "Scimitar", type: "weapon", role: "Early until Uchigatana", phase: 1, whereToFind: [{ type: "vendor", location: "Swordsman start", detail: "Upgrade at Lenigrast to +10" }] },
  { name: "Uchigatana", type: "weapon", role: "Early katana / backup", phase: 1, whereToFind: [{ type: "buy", location: "McDuff", detail: "5,000 souls", unlock: "Lost Bastille" }], notes: "10 STR / 14 DEX." },
  { name: "Blacksteel Katana", type: "weapon", role: "Primary — quickdraw strong", phase: 2, whereToFind: [{ type: "drop", location: "Iron Keep", detail: "Alonne Knight or Captain", unlock: "Iron Keep" }], notes: "14 STR / 25 DEX. S DEX scaling.", farmOptions: [{ enemy: "Alonne Knight Captain", area: "Iron Keep", method: "Rare drop. CoC for respawn.", unlock: "Iron Keep" }] },
  { name: "Short Bow", type: "weapon", role: "Ranged pull tool", phase: 3, whereToFind: [{ type: "buy", location: "Lenigrast", detail: "12 DEX req" }], optional: true },
  { name: "Ring of Blades", type: "ring", role: "Flat physical AR", phase: 1, whereToFind: [{ type: "boss", location: "Pursuer", detail: "Guaranteed", unlock: "FoFG" }] },
  { name: "Old Leo Ring", type: "ring", role: "Counter damage boost", phase: 2, whereToFind: [{ type: "boss", location: "Old Dragonslayer", detail: "Heide's Tower", unlock: "Heide's" }] },
  { name: "Chloranthy Ring", type: "ring", role: "Stamina regen", phase: 1, whereToFind: [{ type: "corpse", location: "FoFG", detail: "Pharros ballista room", unlock: "FoFG" }] },
  { name: "Third Dragon Ring", type: "ring", role: "HP/Stamina/Equip Load", phase: 4, whereToFind: [{ type: "chest", location: "Dragon Shrine", detail: "Before Ancient Dragon fog", unlock: "Dragon Aerie" }] },
  { name: "Flynn's Ring", type: "ring", role: "Low VIT AR bonus — keep VIT ~10", phase: 4, whereToFind: [{ type: "drop", location: "Dragon Shrine", detail: "Kill Creighton NPC", unlock: "Dragon Aerie" }], optional: true },
  { name: "Ring of Blades +2", type: "ring", role: "Physical AR endgame", phase: 4, whereToFind: [{ type: "boss", location: "Throne Watcher & Defender", detail: "NG+", unlock: "Throne of Want" }] },
  { name: "Chloranthy Ring +2", type: "ring", role: "Stamina regen upgrade", phase: 4, whereToFind: [{ type: "chest", location: "DLC Ivory King", detail: "Frozen Eleum Loyce", unlock: "DLC" }] },
];

export const oroBlacksteel: BuildTemplate = {
  id: "oro-blacksteel",
  name: "Oro's Blacksteel Katana",
  description: "Pure DEX katana. Blacksteel quickdraw, Old Leo counters, high agility.",
  source: "DS2_ALL_BUILDS_A-Z",
  startingClass: "swordsman",
  baseStats: { ...BASE },
  levels: LEVELS,
  phaseInfo: [
    { num: 1, name: "Uchigatana Early", range: "SL 10→45", color: "#6b7c52", areas: "Betwixt → Lost Bastille" },
    { num: 2, name: "Blacksteel Farm", range: "SL 46→75", color: "#c8a030", areas: "Heide's → Iron Keep" },
    { num: 3, name: "DEX 50", range: "SL 76→110", color: "#d4862a", areas: "Shaded Woods → Drangleic" },
    { num: 4, name: "Complete Build", range: "SL 111→150", color: "#a03030", areas: "Dragon Shrine → DLC" },
  ],
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  weapons: [
    { name: "Blacksteel Katana +10", role: "Primary", phase: 2, infusion: "None or DEX", stats: "14 STR / 25 DEX" },
    { name: "Blacksteel Katana +10 (×2)", role: "Power stance (optional)", phase: 3, infusion: "None", stats: "14 STR / 25 DEX" },
    { name: "Uchigatana +10", role: "Backup katana", phase: 1, infusion: "None", stats: "10 STR / 14 DEX" },
    { name: "Short Bow +10", role: "Ranged", phase: 3, infusion: "None", stats: "12 DEX" },
  ],
  spells: [],
  keyRings: [
    { name: "Ring of Blades +2", effect: "Physical AR", source: "Throne NG+" },
    { name: "Old Leo Ring", effect: "Counter damage", source: "Old Dragonslayer" },
    { name: "Third Dragon Ring", effect: "HP/Stamina/Equip", source: "Dragon Shrine" },
    { name: "Chloranthy Ring +2", effect: "Stamina regen", source: "DLC Ivory King" },
    { name: "Flynn's Ring", effect: "Low VIT AR bonus", source: "Dragon Shrine" },
  ],
  ringsDetail: {
    priorityOrder: ["Ring of Blades +2", "Old Leo Ring", "Third Dragon Ring", "Chloranthy Ring +2", "Flynn's Ring", "Chloranthy Ring"],
    groups: [
      { label: "Core", ringNames: ["Ring of Blades +2", "Old Leo Ring", "Third Dragon Ring", "Chloranthy Ring +2"] },
      { label: "Optional", ringNames: ["Flynn's Ring", "Chloranthy Ring"] },
    ],
    rings: [
      { name: "Ring of Blades +2", priority: "core", effect: "+35 physical AR.", whereToGet: "Throne of Want", howToGet: "Throne Watcher & Defender in NG+.", phase: 4 },
      { name: "Old Leo Ring", priority: "core", effect: "Boosts counter attack damage — essential for katana play.", whereToGet: "Heide's Tower", howToGet: "Old Dragonslayer boss drop.", phase: 2 },
      { name: "Third Dragon Ring", priority: "core", effect: "+12.5% HP, stamina, equip load.", whereToGet: "Dragon Shrine", howToGet: "Chest before Ancient Dragon fog.", phase: 4 },
      { name: "Chloranthy Ring +2", priority: "core", effect: "Strong stamina regen for katana chains.", whereToGet: "DLC Ivory King", howToGet: "Frozen Eleum Loyce exploration.", phase: 4 },
      { name: "Flynn's Ring", priority: "optional", effect: "AR bonus at low VIT (~10).", whereToGet: "Dragon Shrine", howToGet: "Kill Creighton NPC.", phase: 4 },
      { name: "Chloranthy Ring", priority: "optional", effect: "Early stamina regen until +2.", whereToGet: "FoFG", howToGet: "Pharros ballista room.", phase: 1 },
    ],
  },
  buildSteps: BUILD_STEPS,
  buildItems: BUILD_ITEMS,
  buildMaterialFarms: [
    {
      item: "Titanite (Shards, Large, Chunks, Slab)",
      purpose: "Uchigatana +10, Blacksteel Katana +10",
      sources: [{ type: "vendor", location: "Lenigrast, McDuff, Chloanne", detail: "See Farming tab" }],
      farmOptions: [
        { enemy: "Alonne Knight", area: "Iron Keep", method: "Chunks. CoC.", unlock: "Iron Keep" },
        { enemy: "Crystal Lizard", area: "Black Gulch, Dragon Aerie", method: "Chunks", unlock: "Area access" },
      ],
    },
    {
      item: "Blacksteel Katana (farm)",
      purpose: "Primary weapon — rare Alonne drop",
      sources: [{ type: "drop", location: "Iron Keep", detail: "Alonne Knight or Captain", unlock: "Iron Keep" }],
      farmOptions: [
        { enemy: "Alonne Knight Captain", area: "Iron Keep", method: "Best drop rate. Join CoC.", unlock: "Iron Keep" },
        { enemy: "Alonne Knight", area: "Iron Keep", method: "Common spawn. CoC respawn.", unlock: "Iron Keep" },
      ],
    },
  ],
};
