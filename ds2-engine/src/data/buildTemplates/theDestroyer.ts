/**
 * The Destroyer — Great Hammer strength build
 * Source: DS2_ALL_BUILDS_A-Z #3
 */

import type { BuildTemplate } from "./types";
import { CLASS_BASE_STATS } from "./types";
import type { StatKey } from "../simulator/types";
import { generateLevelRoadmap } from "./levelGenerator";
import type { BuildStep } from "../buildChecklist";
import type { BuildItem } from "../buildItems";

const BASE = CLASS_BASE_STATS.warrior;

const PHASE_TARGETS: BuildTemplate["phaseTargets"] = {
  1: { STR: 22, VGR: 11, END: 10, ADP: 8, VIT: 11 },
  2: { STR: 29, VGR: 15, END: 14, ADP: 11, VIT: 16 },
  3: { STR: 35, VGR: 17, END: 17, ADP: 14, VIT: 20 },
  4: { STR: 42, VGR: 21, END: 21, ADP: 17, VIT: 24 },
  5: { STR: 47, VGR: 24, END: 24, ADP: 19, VIT: 28 },
  6: { STR: 50, VGR: 25, END: 25, ADP: 20, VIT: 30, ATN: 6, DEX: 12, INT: 5, FTH: 5 },
};

const PHASE_PRIORITY: Record<number, StatKey[]> = {
  1: ["STR", "VGR", "END", "ADP", "VIT"],
  2: ["STR", "VGR", "END", "ADP", "VIT"],
  3: ["STR", "VGR", "END", "ADP", "VIT"],
  4: ["STR", "VGR", "END", "VIT", "ADP"],
  5: ["STR", "VGR", "END", "VIT", "ADP"],
  6: ["STR", "VGR", "END", "VIT", "ADP"],
};

const LEVELS = generateLevelRoadmap({
  startingClass: "warrior",
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  milestoneNotes: {
    "8:STR": "★ Mace + Survive — Lenigrast, Ring of Blades",
    "12:STR": "★ Craftsman's Hammer (20 STR)",
    "33:STR": "★ Large Club (26 STR, 2H = 13)",
    "38:STR": "★ Great Club req (28 STR, 2H = 14)",
    "56:STR": "★ Great Club from Gutter chest",
    "100:STR": "★ STR 40 — heavy armor online",
    "143:STR": "★ STR 50 — max strike",
    "150:STR": "★★ BUILD COMPLETE — SL 150",
  },
});

const BUILD_STEPS: BuildStep[] = [
  { id: "td:0", progressId: "tb7", name: "Stone Ring", areaId: "things_betwixt", phase: 1, type: "ring", source: "Kill Ogre near bridge (firebombs help)" },
  { id: "td:1", progressId: "fg5", name: "Lenigrast's Key", areaId: "forest_of_fallen_giants", phase: 1, type: "key", source: "Melentia (1,000 souls)" },
  { id: "td:2", progressId: "build:td:mace", name: "Mace +10 (Warrior start)", areaId: "forest_of_fallen_giants", phase: 1, type: "weapon", source: "Starting gear → Lenigrast upgrades" },
  { id: "td:3", progressId: "fg12", name: "Open Lenigrast's shop", areaId: "majula", phase: 1, type: "key", source: "Return to Majula with key" },
  { id: "td:4", progressId: "fg15", name: "Ring of Blades", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "Pursuer drop" },
  { id: "td:5", progressId: "fg21", name: "Chloranthy Ring", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "FoFG Pharros ballista room" },
  { id: "td:6", progressId: "build:td:craftsman_hammer", name: "Craftsman's Hammer +10", areaId: "lost_bastille", phase: 2, type: "weapon", source: "McDuff (after Dull Ember)" },
  { id: "td:7", progressId: "lb17", name: "Large Club +10", areaId: "lost_bastille", phase: 2, type: "weapon", source: "Corpse below Straith Exile bonfire (post-Ruin Sentinels)" },
  { id: "td:8", progressId: "lb2", name: "Dull Ember", areaId: "lost_bastille", phase: 2, type: "key", source: "Tower Apart chest" },
  { id: "td:9", progressId: "lb7", name: "Give Dull Ember to McDuff", areaId: "lost_bastille", phase: 2, type: "key", source: "Unlocks infusion + slab shop" },
  { id: "td:10", progressId: "gt6", name: "Great Club +10", areaId: "the_gutter", phase: 3, type: "weapon", source: "Chest before Black Gulch (ladder down in Gutter)" },
  { id: "td:11", progressId: "build:td:tower_shield", name: "Tower Shield +10 (optional)", areaId: "iron_keep", phase: 4, type: "weapon", source: "Buy from McDuff/Chloanne — 30 STR", optional: true },
  { id: "td:12", progressId: "build:td:heavy_armor", name: "Heavy armor set (<70% load)", areaId: "iron_keep", phase: 4, type: "key", source: "Alonne Knight / Old Iron King drops" },
  { id: "td:13", progressId: "da10", name: "Third Dragon Ring", areaId: "dragon_aerie", phase: 5, type: "ring", source: "Dragon Shrine chest before Ancient Dragon" },
  { id: "td:14", progressId: "tw7", name: "Ring of Blades +2", areaId: "throne_of_want", phase: 6, type: "ring", source: "Throne Watcher & Defender NG+" },
  { id: "td:15", progressId: "d316", name: "Chloranthy Ring +2", areaId: "dlc_ivory", phase: 6, type: "ring", source: "Crown of the Ivory King DLC" },
  { id: "td:16", progressId: "uc12", name: "Royal Soldier Ring +2", areaId: "undead_crypt", phase: 6, type: "ring", source: "Vendrick NG+ (Giant Souls help)" },
  { id: "td:17", progressId: "lb8", name: "Ruin Sentinels (Bastille Key)", areaId: "lost_bastille", phase: 2, type: "key", source: "Boss on platform — opens McDuff" },
];

const BUILD_ITEMS: BuildItem[] = [
  { name: "Mace", type: "weapon", role: "Phase 1 strike until Large Club", phase: 1, whereToFind: [{ type: "vendor", location: "Warrior start", detail: "Upgrade at Lenigrast to +10" }] },
  { name: "Large Club", type: "weapon", role: "Early great hammer (26 STR, 13 2H)", phase: 2, whereToFind: [{ type: "corpse", location: "Lost Bastille", detail: "Below Straith Exile bonfire after Ruin Sentinels", unlock: "Ruin Sentinels" }] },
  { name: "Great Club", type: "weapon", role: "Primary endgame strike (28 STR, 14 2H)", phase: 3, whereToFind: [{ type: "chest", location: "The Gutter", detail: "Ladder area before Black Gulch entrance", unlock: "The Gutter" }], notes: "Raw infusion optional for pure STR scaling." },
  { name: "Craftsman's Hammer", type: "weapon", role: "Fast strike option", phase: 2, whereToFind: [{ type: "buy", location: "McDuff", detail: "After Dull Ember", unlock: "Lost Bastille" }] },
  { name: "Tower Shield", type: "weapon", role: "Block tool (30 STR)", phase: 4, whereToFind: [{ type: "buy", location: "McDuff / Chloanne", detail: "Heavy greatshield", unlock: "Iron Keep era" }], optional: true },
  { name: "Stone Ring", type: "ring", role: "Boost poise damage", phase: 1, whereToFind: [{ type: "drop", location: "Things Betwixt", detail: "Ogre by bridge", unlock: "Start" }] },
  { name: "Ring of Blades", type: "ring", role: "Flat physical AR", phase: 1, whereToFind: [{ type: "boss", location: "Pursuer", detail: "Guaranteed drop", unlock: "FoFG" }] },
  { name: "Chloranthy Ring", type: "ring", role: "Stamina regen for heavy swings", phase: 1, whereToFind: [{ type: "corpse", location: "FoFG", detail: "Pharros ballista room", unlock: "FoFG" }] },
  { name: "Third Dragon Ring", type: "ring", role: "HP / stamina / equip load", phase: 5, whereToFind: [{ type: "chest", location: "Dragon Shrine", detail: "Corridor before Ancient Dragon", unlock: "Dragon Aerie" }] },
  { name: "Ring of Blades +2", type: "ring", role: "Physical AR endgame", phase: 6, whereToFind: [{ type: "boss", location: "Throne Watcher & Defender", detail: "NG+ or Bonfire Ascetic", unlock: "Throne of Want" }] },
  { name: "Chloranthy Ring +2", type: "ring", role: "Stamina regen upgrade", phase: 6, whereToFind: [{ type: "chest", location: "DLC Ivory King", detail: "Frozen Eleum Loyce", unlock: "DLC" }] },
  { name: "Royal Soldier Ring +2", type: "ring", role: "Equip load", phase: 6, whereToFind: [{ type: "boss", location: "Vendrick", detail: "NG+ with Giant Souls recommended", unlock: "Undead Crypt" }] },
];

export const theDestroyer: BuildTemplate = {
  id: "the-destroyer",
  name: "The Destroyer",
  description: "Great Hammer strength build. Heavy armor, massive strike damage, poise breaks.",
  source: "DS2_ALL_BUILDS_A-Z",
  startingClass: "warrior",
  baseStats: { ...BASE },
  levels: LEVELS,
  phaseInfo: [
    { num: 1, name: "Mace + Survive", range: "SL 8→32", color: "#6b7c52", areas: "Betwixt → FoFG" },
    { num: 2, name: "Large Club", range: "SL 33→55", color: "#c8a030", areas: "Heide's → Lost Bastille" },
    { num: 3, name: "Great Club", range: "SL 56→75", color: "#d4862a", areas: "Gutter → Black Gulch" },
    { num: 4, name: "STR + Armor", range: "SL 76→110", color: "#c45a30", areas: "Iron Keep → Drangleic" },
    { num: 5, name: "Dragon Ring", range: "SL 111→130", color: "#a03030", areas: "Dragon Shrine" },
    { num: 6, name: "Complete Build", range: "SL 131→150", color: "#8b5cf6", areas: "Throne → DLC → NG+" },
  ],
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  weapons: [
    { name: "Great Club +10", role: "Primary strike", phase: 3, infusion: "Raw or None", stats: "28 STR (14 2H)" },
    { name: "Large Club +10", role: "Early / backup", phase: 2, infusion: "Raw", stats: "26 STR (13 2H)" },
    { name: "Craftsman's Hammer +10", role: "Fast strike", phase: 2, infusion: "None", stats: "20 STR" },
    { name: "Tower Shield +10", role: "Block", phase: 4, infusion: "None", stats: "30 STR" },
  ],
  spells: [],
  keyRings: [
    { name: "Third Dragon Ring", effect: "HP/Stamina/Equip Load", source: "Dragon Shrine" },
    { name: "Ring of Blades +2", effect: "Physical AR", source: "Throne NG+" },
    { name: "Chloranthy Ring +2", effect: "Stamina regen", source: "DLC Ivory King" },
    { name: "Stone Ring", effect: "Poise break", source: "Things Betwixt Ogre" },
    { name: "Royal Soldier Ring +2", effect: "Equip load", source: "Vendrick NG+" },
  ],
  ringsDetail: {
    priorityOrder: ["Ring of Blades +2", "Third Dragon Ring", "Chloranthy Ring +2", "Stone Ring", "Royal Soldier Ring +2"],
    groups: [
      { label: "Core", ringNames: ["Ring of Blades +2", "Third Dragon Ring", "Chloranthy Ring +2", "Stone Ring"] },
      { label: "Equip load / NG+", ringNames: ["Royal Soldier Ring +2", "Chloranthy Ring"] },
    ],
    rings: [
      { name: "Stone Ring", priority: "core", effect: "Increases poise damage — great for breaking enemy stance.", whereToGet: "Things Betwixt", howToGet: "Kill the Ogre on the bridge (firebombs from gift).", phase: 1 },
      { name: "Ring of Blades", priority: "core", effect: "+15 physical AR.", whereToGet: "Forest of Fallen Giants", howToGet: "Defeat Pursuer.", phase: 1 },
      { name: "Chloranthy Ring", priority: "core", effect: "Faster stamina recovery between heavy swings.", whereToGet: "Forest of Fallen Giants", howToGet: "Pharros room under ballista trap.", phase: 1 },
      { name: "Third Dragon Ring", priority: "core", effect: "+12.5% HP, stamina, equip load.", whereToGet: "Dragon Shrine", howToGet: "Chest before Ancient Dragon fog.", phase: 5 },
      { name: "Ring of Blades +2", priority: "core", effect: "+35 physical AR.", whereToGet: "Throne of Want", howToGet: "Throne Watcher & Defender in NG+.", phase: 6 },
      { name: "Chloranthy Ring +2", priority: "core", effect: "Stronger stamina regen.", whereToGet: "DLC Ivory King", howToGet: "Frozen Eleum Loyce — explore before Burnt Ivory King.", phase: 6 },
      { name: "Royal Soldier Ring +2", priority: "optional", effect: "+20% equip load.", whereToGet: "Undead Crypt", howToGet: "Defeat Vendrick in NG+ (collect Giant Souls first).", phase: 6 },
    ],
  },
  buildSteps: BUILD_STEPS,
  buildItems: BUILD_ITEMS,
  buildMaterialFarms: [
    {
      item: "Titanite (Shards, Large, Chunks, Slab)",
      purpose: "Mace / Large Club / Great Club +10",
      sources: [{ type: "vendor", location: "Lenigrast, McDuff, Chloanne", detail: "See Farming tab" }],
      farmOptions: [
        { enemy: "Alonne Knight", area: "Iron Keep", method: "Chunks. CoC.", unlock: "Iron Keep" },
        { enemy: "Crystal Lizard", area: "Black Gulch, Dragon Aerie", method: "Chunks / Twinkling", unlock: "Area access" },
      ],
    },
    {
      item: "Petrified Dragon Bone",
      purpose: "Boss weapons +5 (if using any)",
      sources: [{ type: "drop", location: "Crystal Lizards", detail: "Dragon Aerie has many" }],
      farmOptions: [{ enemy: "Crystal Lizard", area: "Dragon Aerie", method: "Kill all 11", unlock: "Dragon Aerie" }],
    },
  ],
};
