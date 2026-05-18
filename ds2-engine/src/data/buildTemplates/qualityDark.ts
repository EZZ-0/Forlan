/**
 * Quality Dark — 40/40 STR/DEX with dark infusion
 * Source: DS2_ALL_BUILDS_A-Z #12
 */

import type { BuildTemplate } from "./types";
import { CLASS_BASE_STATS } from "./types";
import { generateLevelRoadmap } from "./levelGenerator";
import type { StatKey } from "../simulator/types";
import type { BuildStep } from "../buildChecklist";
import type { BuildItem } from "../buildItems";

const BASE = CLASS_BASE_STATS.warrior;

const PHASE_TARGETS: BuildTemplate["phaseTargets"] = {
  1: { VGR: 12, END: 11, VIT: 8, ATN: 8, STR: 20, DEX: 17, ADP: 8, INT: 8, FTH: 8 },
  2: { VGR: 17, END: 16, VIT: 10, ATN: 10, STR: 25, DEX: 23, ADP: 11, INT: 11, FTH: 11 },
  3: { VGR: 20, END: 20, VIT: 11, ATN: 12, STR: 29, DEX: 27, ADP: 14, INT: 14, FTH: 14 },
  4: { VGR: 25, END: 24, VIT: 13, ATN: 14, STR: 34, DEX: 33, ADP: 17, INT: 17, FTH: 17 },
  5: { VGR: 28, END: 28, VIT: 15, ATN: 15, STR: 38, DEX: 38, ADP: 19, INT: 19, FTH: 19 },
  6: { VGR: 30, END: 30, VIT: 15, ATN: 16, STR: 40, DEX: 40, ADP: 20, INT: 20, FTH: 20 },
};

const PHASE_PRIORITY: Record<number, StatKey[]> = {
  1: ["STR", "DEX", "INT", "FTH", "ATN", "VGR", "END", "ADP", "VIT"],
  2: ["STR", "DEX", "INT", "FTH", "ATN", "VGR", "END", "ADP", "VIT"],
  3: ["STR", "DEX", "INT", "FTH", "VGR", "END", "ADP", "VIT", "ATN"],
  4: ["STR", "DEX", "INT", "FTH", "VGR", "END", "ADP", "VIT", "ATN"],
  5: ["STR", "DEX", "INT", "FTH", "VGR", "END", "ADP", "VIT", "ATN"],
  6: ["STR", "DEX", "INT", "FTH", "VGR", "END", "ADP", "VIT", "ATN"],
};

const LEVELS = generateLevelRoadmap({
  startingClass: "warrior",
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  milestoneNotes: {
    "20:STR": "★ Fire Longsword + quality path",
    "20:INT": "★ 20/20 — Dark Weapon, Sunset Staff",
    "40:STR": "★ 40/40 quality — Sun Sword or Longsword",
    "150:STR": "★★ BUILD COMPLETE — SL 150",
  },
});

const BUILD_STEPS: BuildStep[] = [
  { id: "qd:0", progressId: "build:qd:mace", name: "Mace +10 (Warrior start)", areaId: "things_betwixt", phase: 1, type: "weapon", source: "Starting gear → Lenigrast" },
  { id: "qd:1", progressId: "fg11", name: "Fire Longsword", areaId: "forest_of_fallen_giants", phase: 1, type: "weapon", source: "FoFG chest — early versatile sword" },
  { id: "qd:2", progressId: "fg5", name: "Lenigrast's Key", areaId: "forest_of_fallen_giants", phase: 1, type: "key", source: "Melentia (1,000 souls)" },
  { id: "qd:3", progressId: "fg12", name: "Open Lenigrast's shop", areaId: "majula", phase: 1, type: "key", source: "Return to Majula" },
  { id: "qd:4", progressId: "fg15", name: "Ring of Blades", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "Pursuer drop" },
  { id: "qd:5", progressId: "fg21", name: "Chloranthy Ring", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "FoFG Pharros ballista room" },
  { id: "qd:6", progressId: "hc3", name: "Meet Felkin (hex shop)", areaId: "huntsmans_copse", phase: 2, type: "key", source: "8 INT + 8 FTH base to browse" },
  { id: "qd:7", progressId: "build:sunset_staff", name: "Sunset Staff", areaId: "huntsmans_copse", phase: 2, type: "catalyst", source: "Felkin FREE at 20/20 base INT/FTH" },
  { id: "qd:8", progressId: "build:dark_weapon", name: "Dark Weapon", areaId: "huntsmans_copse", phase: 2, type: "spell", source: "Felkin (20/20 base; 2,700 souls)" },
  { id: "qd:9", progressId: "lb2", name: "Dull Ember", areaId: "lost_bastille", phase: 2, type: "key", source: "Tower Apart chest" },
  { id: "qd:10", progressId: "lb7", name: "Give Dull Ember to McDuff", areaId: "lost_bastille", phase: 2, type: "key", source: "Unlocks Dark Stone infusion" },
  { id: "qd:11", progressId: "build:qd:dark_longsword", name: "Dark Longsword +10", areaId: "lost_bastille", phase: 2, type: "infusion", source: "Dark infuse Longsword at McDuff" },
  { id: "qd:12", progressId: "build:qd:dark_mace", name: "Dark Mace +10 (strike swap)", areaId: "lost_bastille", phase: 2, type: "weapon", source: "Dark infuse Mace — breaks shields" },
  { id: "qd:13", progressId: "build:qd:sun_sword", name: "Sun Sword +10 (quality)", areaId: "heides_tower", phase: 3, type: "weapon", source: "Heirs of the Sun rank 2 — or Longsword dark swap", optional: true },
  { id: "qd:14", progressId: "build:qd:dark_sun_sword", name: "Dark Sun Sword (resist swap)", areaId: "lost_bastille", phase: 3, type: "infusion", source: "Dark infuse Sun Sword for dark-weak bosses", optional: true },
  { id: "qd:15", progressId: "da10", name: "Third Dragon Ring", areaId: "dragon_aerie", phase: 4, type: "ring", source: "Dragon Shrine chest" },
  { id: "qd:16", progressId: "tw7", name: "Ring of Blades +2", areaId: "throne_of_want", phase: 4, type: "ring", source: "Throne Watcher & Defender NG+" },
  { id: "qd:17", progressId: "d316", name: "Chloranthy Ring +2", areaId: "dlc_ivory", phase: 4, type: "ring", source: "DLC Ivory King" },
  { id: "qd:18", progressId: "d111", name: "Dark Clutch Ring", areaId: "dlc_sunken", phase: 4, type: "ring", source: "Crown of the Sunken King DLC" },
  { id: "qd:19", progressId: "ht8", name: "Join Heirs of the Sun (Sun Sword)", areaId: "heides_tower", phase: 3, type: "key", source: "Token of Fidelity → Targray — rank 2 for Sun Sword", optional: true },
  { id: "qd:20", progressId: "build:qd:quality_40", name: "40/40 STR/DEX reached", areaId: "iron_keep", phase: 3, type: "key", source: "Soft cap for quality scaling — uninfused for physical bosses" },
  { id: "qd:21", progressId: "lb8", name: "Ruin Sentinels", areaId: "lost_bastille", phase: 2, type: "key", source: "Opens McDuff smith" },
  { id: "qd:22", progressId: "build:qd:dark_orb", name: "Dark Orb (ranged backup)", areaId: "huntsmans_copse", phase: 2, type: "spell", source: "Felkin (600 souls)", optional: true },
  { id: "qd:23", progressId: "build:qd:uninfused_swap", name: "Uninfused weapons for physical bosses", areaId: "iron_keep", phase: 3, type: "key", source: "Dark removes STR/DEX scaling — swap infusion per boss" },
  { id: "qd:24", progressId: "ik9", name: "Old Iron King", areaId: "iron_keep", phase: 3, type: "key", source: "Progression toward Drangleic / endgame rings" },
];

const BUILD_ITEMS: BuildItem[] = [
  { name: "Fire Longsword", type: "weapon", role: "Early until dark setup", phase: 1, whereToFind: [{ type: "chest", location: "FoFG", detail: "Near Cardinal Tower", unlock: "FoFG" }] },
  { name: "Dark Longsword", type: "weapon", role: "Primary dark slash", phase: 2, whereToFind: [{ type: "vendor", location: "McDuff", detail: "Dark Stone infusion on Longsword", unlock: "Dull Ember" }], notes: "Dark removes scaling — use vs dark-weak enemies." },
  { name: "Dark Sun Sword", type: "weapon", role: "Quality dark slash", phase: 3, whereToFind: [{ type: "trade", location: "Heirs of the Sun", detail: "Rank 2 Sun Sword → dark infuse", unlock: "Heide's covenant" }], optional: true, notes: "12 STR / 12 DEX. Best quality scaling uninfused." },
  { name: "Dark Mace", type: "weapon", role: "Strike / shield break", phase: 2, whereToFind: [{ type: "vendor", location: "McDuff", detail: "Dark Stone infusion on Mace", unlock: "Dull Ember" }] },
  { name: "Sunset Staff", type: "catalyst", role: "Dark Weapon catalyst", phase: 2, whereToFind: [{ type: "vendor", location: "Felkin", detail: "FREE at 20/20 base INT/FTH" }] },
  { name: "Dark Weapon", type: "spell", role: "Weapon buff", phase: 2, whereToFind: [{ type: "vendor", location: "Felkin", detail: "20/20 base stats" }] },
  { name: "Dark Orb", type: "spell", role: "Ranged hex backup", phase: 2, whereToFind: [{ type: "vendor", location: "Felkin", detail: "600 souls" }], optional: true },
  { name: "Ring of Blades +2", type: "ring", role: "Physical AR (uninfused swap)", phase: 4, whereToFind: [{ type: "boss", location: "Throne Watcher & Defender", detail: "NG+", unlock: "Throne of Want" }] },
  { name: "Third Dragon Ring", type: "ring", role: "HP/Stamina/Equip", phase: 4, whereToFind: [{ type: "chest", location: "Dragon Shrine", detail: "Before Ancient Dragon", unlock: "Dragon Aerie" }] },
  { name: "Chloranthy Ring +2", type: "ring", role: "Stamina regen", phase: 4, whereToFind: [{ type: "chest", location: "DLC Ivory King", detail: "Frozen Eleum Loyce", unlock: "DLC" }] },
  { name: "Dark Clutch Ring", type: "ring", role: "Dark damage boost", phase: 4, whereToFind: [{ type: "chest", location: "Shulva DLC", detail: "Crown of the Sunken King", unlock: "DLC" }] },
];

export const qualityDark: BuildTemplate = {
  id: "quality-dark",
  name: "Quality Dark",
  description: "40/40 STR/DEX quality with dark infusion swap. Dark Weapon, Sun Sword or Longsword.",
  source: "DS2_ALL_BUILDS_A-Z",
  startingClass: "warrior",
  baseStats: { ...BASE },
  levels: LEVELS,
  phaseInfo: [
    { num: 1, name: "Longsword + Mace", range: "SL 12→40", color: "#6b7c52", areas: "Betwixt → FoFG" },
    { num: 2, name: "20/20 + Dark", range: "SL 41→70", color: "#c8a030", areas: "Huntsman's → Bastille" },
    { num: 3, name: "40/40 Rush", range: "SL 71→110", color: "#d4862a", areas: "Iron Keep → Drangleic" },
    { num: 4, name: "Complete Build", range: "SL 111→150", color: "#a03030", areas: "Dragon Shrine → DLC" },
  ],
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  weapons: [
    { name: "Dark Longsword +10", role: "Primary dark", phase: 2, infusion: "Dark", stats: "10 STR / 9 DEX" },
    { name: "Dark Sun Sword +10", role: "Quality dark", phase: 3, infusion: "Dark", stats: "12 STR / 12 DEX" },
    { name: "Dark Mace +10", role: "Strike swap", phase: 2, infusion: "Dark", stats: "12 STR" },
    { name: "Sunset Staff +5", role: "Dark Weapon", phase: 2, infusion: "Dark", stats: "22 INT / 22 FTH" },
  ],
  spells: [{ name: "Dark Weapon", school: "Hex", purpose: "Weapon buff" }],
  keyRings: [
    { name: "Ring of Blades +2", effect: "Physical AR", source: "Throne NG+" },
    { name: "Third Dragon Ring", effect: "HP/Stamina/Equip", source: "Dragon Shrine" },
    { name: "Chloranthy Ring +2", effect: "Stamina regen", source: "DLC Ivory King" },
    { name: "Dark Clutch Ring", effect: "Dark damage", source: "Sunken King DLC" },
  ],
  ringsDetail: {
    priorityOrder: ["Dark Clutch Ring", "Ring of Blades +2", "Third Dragon Ring", "Chloranthy Ring +2"],
    groups: [
      { label: "Dark / damage", ringNames: ["Dark Clutch Ring", "Ring of Blades +2"] },
      { label: "Survival", ringNames: ["Third Dragon Ring", "Chloranthy Ring +2"] },
    ],
    rings: [
      { name: "Dark Clutch Ring", priority: "core", effect: "Boosts dark damage — pairs with dark infusion.", whereToGet: "Shulva DLC", howToGet: "Crown of the Sunken King exploration.", phase: 4 },
      { name: "Ring of Blades +2", priority: "core", effect: "+35 physical AR when running uninfused quality.", whereToGet: "Throne of Want", howToGet: "Throne Watcher & Defender NG+.", phase: 4 },
      { name: "Third Dragon Ring", priority: "core", effect: "+12.5% HP, stamina, equip load.", whereToGet: "Dragon Shrine", howToGet: "Chest before Ancient Dragon fog.", phase: 4 },
      { name: "Chloranthy Ring +2", priority: "core", effect: "Stamina for quality combos + Dark Weapon upkeep.", whereToGet: "DLC Ivory King", howToGet: "Frozen Eleum Loyce.", phase: 4 },
    ],
  },
  buildSteps: BUILD_STEPS,
  buildItems: BUILD_ITEMS,
  buildMaterialFarms: [
    {
      item: "Dark Stone",
      purpose: "Dark infusion (Longsword, Sun Sword, Mace). McDuff: 1 stone + 2,000 souls.",
      sources: [
        { type: "vendor", location: "Chloanne", detail: "After King's Ring", unlock: "King's Ring" },
        { type: "chest", location: "Various", detail: "Limited fixed drops" },
      ],
      farmOptions: [{ enemy: "Dark Stalker", area: "Lost Bastille / Grave", method: "Rare drop", unlock: "Mid-game" }],
    },
    {
      item: "Titanite (Shards, Large, Chunks, Slab)",
      purpose: "Dark Longsword +10, Dark Mace +10, Sun Sword +10",
      sources: [{ type: "vendor", location: "Lenigrast, McDuff, Chloanne", detail: "See Farming tab" }],
      farmOptions: [
        { enemy: "Alonne Knight", area: "Iron Keep", method: "Chunks. CoC.", unlock: "Iron Keep" },
        { enemy: "Crystal Lizard", area: "Dragon Aerie", method: "Chunks + Twinkling", unlock: "Dragon Aerie" },
      ],
    },
    {
      item: "Twinkling Titanite",
      purpose: "Sunset Staff +5",
      sources: [{ type: "vendor", location: "Chloanne", detail: "After King's Ring", unlock: "King's Ring" }],
      farmOptions: [{ enemy: "Crystal Lizard", area: "Dragon Aerie", method: "Kill all 11 lizards", unlock: "Dragon Aerie" }],
    },
  ],
};
