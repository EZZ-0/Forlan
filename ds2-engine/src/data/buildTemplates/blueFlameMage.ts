/**
 * Mastering the Blue Flame — sword catalyst sorcerer
 * Source: DS2_ALL_BUILDS_A-Z #19
 */

import type { BuildTemplate } from "./types";
import { CLASS_BASE_STATS } from "./types";
import { generateLevelRoadmap } from "./levelGenerator";
import type { StatKey } from "../simulator/types";
import type { BuildStep } from "../buildChecklist";
import type { BuildItem } from "../buildItems";

const BASE = CLASS_BASE_STATS.sorcerer;

const PHASE_TARGETS: BuildTemplate["phaseTargets"] = {
  1: { VGR: 8, END: 10, VIT: 6, ATN: 16, STR: 5, DEX: 9, ADP: 12, INT: 22 },
  2: { VGR: 11, END: 14, VIT: 7, ATN: 20, STR: 7, DEX: 11, ADP: 15, INT: 29 },
  3: { VGR: 14, END: 17, VIT: 7, ATN: 22, STR: 9, DEX: 12, ADP: 18, INT: 34 },
  4: { VGR: 17, END: 21, VIT: 8, ATN: 26, STR: 11, DEX: 13, ADP: 21, INT: 41 },
  5: { VGR: 19, END: 24, VIT: 8, ATN: 29, STR: 12, DEX: 15, ADP: 24, INT: 47 },
  6: { VGR: 20, END: 25, VIT: 8, ATN: 30, STR: 13, DEX: 15, ADP: 25, INT: 50, FTH: 4 },
};

const PHASE_PRIORITY: Record<number, StatKey[]> = {
  1: ["INT", "ATN", "STR", "DEX", "VGR", "END", "ADP", "VIT", "FTH"],
  2: ["INT", "ATN", "STR", "DEX", "VGR", "END", "ADP", "VIT", "FTH"],
  3: ["INT", "ATN", "STR", "DEX", "VGR", "END", "ADP", "VIT", "FTH"],
  4: ["INT", "ATN", "STR", "DEX", "VGR", "END", "ADP", "VIT", "FTH"],
  5: ["INT", "ATN", "STR", "DEX", "VGR", "END", "ADP", "VIT", "FTH"],
  6: ["INT", "ATN", "STR", "DEX", "VGR", "END", "ADP", "VIT", "FTH"],
};

const LEVELS = generateLevelRoadmap({
  startingClass: "sorcerer",
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  milestoneNotes: {
    "22:INT": "★ Early sorceries (Carhillion)",
    "13:STR": "★ Blue Flame req (13 STR / 15 DEX)",
    "50:INT": "★ INT 50 — Staff of Wisdom / sorcery scaling",
    "30:ATN": "★ Spell slots for CMW + spears",
    "150:INT": "★★ BUILD COMPLETE — SL 150",
  },
});

const BUILD_STEPS: BuildStep[] = [
  { id: "bfm:0", progressId: "build:bfm:staff", name: "Sorcerer's Staff +10 (Sorcerer start)", areaId: "things_betwixt", phase: 1, type: "catalyst", source: "Starting gear → Lenigrast" },
  { id: "bfm:1", progressId: "fg11", name: "Fire Longsword", areaId: "forest_of_fallen_giants", phase: 1, type: "weapon", source: "FoFG chest — melee until Blue Flame" },
  { id: "bfm:2", progressId: "fg5", name: "Lenigrast's Key", areaId: "forest_of_fallen_giants", phase: 1, type: "key", source: "Melentia (1,000 souls)" },
  { id: "bfm:3", progressId: "fg12", name: "Open Lenigrast's shop", areaId: "majula", phase: 1, type: "key", source: "Return to Majula" },
  { id: "bfm:4", progressId: "fg15", name: "Ring of Blades", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "Pursuer drop" },
  { id: "bfm:5", progressId: "fg21", name: "Chloranthy Ring", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "FoFG Pharros ballista room" },
  { id: "bfm:6", progressId: "build:bfm:carhillion", name: "Carhillion of Jura (sorceries)", areaId: "no_mans_wharf", phase: 1, type: "key", source: "10 INT to browse shop" },
  { id: "bfm:7", progressId: "build:bfm:soul_spear", name: "Soul Spear", areaId: "no_mans_wharf", phase: 2, type: "spell", source: "Carhillion — cast from Blue Flame R2 later" },
  { id: "bfm:8", progressId: "build:bfm:soul_greatsword", name: "Soul Greatsword", areaId: "lost_bastille", phase: 2, type: "spell", source: "Straid or Carhillion" },
  { id: "bfm:9", progressId: "build:bfm:ghsa", name: "Great Heavy Soul Arrow", areaId: "no_mans_wharf", phase: 2, type: "spell", source: "Carhillion — trash clear" },
  { id: "bfm:10", progressId: "bc15", name: "Southern Ritual Band", areaId: "brightstone_cove", phase: 2, type: "ring", source: "Corpse in spider halls" },
  { id: "bfm:11", progressId: "uc11_ascetic", name: "Blue Flame (Brightstone red phantom)", areaId: "brightstone_cove", phase: 2, type: "weapon", source: "Bonfire Ascetic red phantom — early option", optional: true },
  { id: "bfm:12", progressId: "uc11", name: "Blue Flame +5", areaId: "undead_crypt", phase: 3, type: "weapon", source: "Leydia Pyromancer drop — farm with Company of Champions" },
  { id: "bfm:13", progressId: "build:staff_of_wisdom", name: "Staff of Wisdom +5", areaId: "dragon_aerie", phase: 3, type: "catalyst", source: "Crystal lizard or Ornifex — backup catalyst at 50 INT" },
  { id: "bfm:14", progressId: "build:bfm:crystal_magic_weapon", name: "Crystal Magic Weapon", areaId: "aldias_keep", phase: 4, type: "spell", source: "Aldia's Keep — buffs Blue Flame magic damage" },
  { id: "bfm:15", progressId: "uc11_magic", name: "Magic infuse Blue Flame", areaId: "lost_bastille", phase: 3, type: "infusion", source: "McDuff after Dull Ember — boosts sorcery scaling" },
  { id: "bfm:16", progressId: "lb2", name: "Dull Ember", areaId: "lost_bastille", phase: 2, type: "key", source: "Tower Apart chest" },
  { id: "bfm:17", progressId: "lb7", name: "Give Dull Ember to McDuff", areaId: "lost_bastille", phase: 2, type: "key", source: "Magic Stone infusion" },
  { id: "bfm:18", progressId: "hc8", name: "Skeleton Lords (Clear Bluestone path)", areaId: "huntsmans_copse", phase: 4, type: "key", source: "NG+ for +2 ring" },
  { id: "bfm:19", progressId: "hc12", name: "Clear Bluestone Ring +2", areaId: "huntsmans_copse", phase: 4, type: "ring", source: "Skeleton Lords NG+" },
  { id: "bfm:20", progressId: "da10", name: "Third Dragon Ring", areaId: "dragon_aerie", phase: 4, type: "ring", source: "Dragon Shrine chest" },
  { id: "bfm:21", progressId: "build:bfm:short_sword", name: "Short Sword +10 (early backup)", areaId: "forest_of_fallen_giants", phase: 1, type: "weapon", source: "Buy from Lenigrast — 8 STR / 10 DEX", optional: true },
  { id: "bfm:22", progressId: "build:bfm:cast_mechanic", name: "Blue Flame R2 = cast equipped sorcery", areaId: "undead_crypt", phase: 3, type: "key", source: "One weapon slot for melee + ranged" },
  { id: "bfm:23", progressId: "tw7", name: "Ring of Blades +2", areaId: "throne_of_want", phase: 4, type: "ring", source: "Throne Watcher & Defender NG+", optional: true },
];

const BUILD_ITEMS: BuildItem[] = [
  { name: "Blue Flame", type: "weapon", role: "Sword + catalyst in one slot", phase: 3, whereToFind: [{ type: "drop", location: "Undead Crypt", detail: "Leydia Pyromancer — CoC farm", unlock: "Undead Crypt" }, { type: "drop", location: "Brightstone Cove", detail: "Ascetic red phantom", unlock: "Brightstone Cove" }], farmOptions: [{ enemy: "Leydia Pyromancer", area: "Undead Crypt", method: "Infinite respawn with CoC", unlock: "Undead Crypt" }], notes: "13 STR / 15 DEX / 12 INT. R2 casts sorcery." },
  { name: "Fire Longsword", type: "weapon", role: "Early melee", phase: 1, whereToFind: [{ type: "chest", location: "FoFG", detail: "Near Cardinal Tower", unlock: "FoFG" }] },
  { name: "Staff of Wisdom", type: "catalyst", role: "Backup catalyst at 50 INT", phase: 3, whereToFind: [{ type: "drop", location: "Dragon Shrine", detail: "Crystal lizard", unlock: "Dragon Aerie" }] },
  { name: "Crystal Magic Weapon", type: "spell", role: "Self-buff Blue Flame", phase: 4, whereToFind: [{ type: "chest", location: "Aldia's Keep", detail: "Sorcery pickup", unlock: "Aldia's Keep" }] },
  { name: "Soul Spear", type: "spell", role: "Ranged (cast from Blue Flame)", phase: 2, whereToFind: [{ type: "vendor", location: "Carhillion", detail: "No-Man's Wharf" }] },
  { name: "Soul Greatsword", type: "spell", role: "Melee AoE", phase: 2, whereToFind: [{ type: "vendor", location: "Straid / Carhillion", detail: "INT req" }] },
  { name: "Great Heavy Soul Arrow", type: "spell", role: "Trash clear", phase: 2, whereToFind: [{ type: "vendor", location: "Carhillion", detail: "Early purchase" }] },
  { name: "Southern Ritual Band", type: "ring", role: "+3 spell slots", phase: 2, whereToFind: [{ type: "corpse", location: "Brightstone Cove", detail: "Spider halls" }] },
  { name: "Clear Bluestone Ring +2", type: "ring", role: "Cast speed", phase: 4, whereToFind: [{ type: "boss", location: "Skeleton Lords", detail: "NG+ Huntsman's Copse" }] },
  { name: "Third Dragon Ring", type: "ring", role: "HP/Stamina/Equip", phase: 4, whereToFind: [{ type: "chest", location: "Dragon Shrine", detail: "Before Ancient Dragon", unlock: "Dragon Aerie" }] },
  { name: "Ring of Blades", type: "ring", role: "Physical AR on sword swings", phase: 1, whereToFind: [{ type: "boss", location: "Pursuer", detail: "FoFG", unlock: "FoFG" }] },
];

export const blueFlameMage: BuildTemplate = {
  id: "blue-flame-mage",
  name: "Mastering the Blue Flame",
  description: "Blue Flame sword catalyst. Melee and sorceries from one weapon slot. Crystal Magic Weapon self-buff.",
  source: "DS2_ALL_BUILDS_A-Z",
  startingClass: "sorcerer",
  baseStats: { ...BASE },
  levels: LEVELS,
  phaseInfo: [
    { num: 1, name: "Staff + Sword", range: "SL 11→40", color: "#6b7c52", areas: "Betwixt → FoFG" },
    { num: 2, name: "INT Rush", range: "SL 41→75", color: "#c8a030", areas: "Heide's → Brightstone" },
    { num: 3, name: "Blue Flame", range: "SL 76→110", color: "#d4862a", areas: "Undead Crypt" },
    { num: 4, name: "Complete Build", range: "SL 111→150", color: "#a03030", areas: "Aldia's → DLC" },
  ],
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  weapons: [
    { name: "Blue Flame +5", role: "Sword + catalyst", phase: 3, infusion: "Magic", stats: "13 STR / 15 DEX / 12 INT" },
    { name: "Staff of Wisdom +5", role: "Backup catalyst", phase: 3, infusion: "Magic", stats: "50 INT (spiced)" },
    { name: "Fire Longsword +10", role: "Early melee", phase: 1, infusion: "None", stats: "10 STR / 9 DEX" },
  ],
  spells: [
    { name: "Crystal Magic Weapon", school: "Sorcery", purpose: "Self-buff (Blue Flame)" },
    { name: "Soul Spear", school: "Sorcery", purpose: "Ranged (Blue Flame R2)" },
    { name: "Soul Greatsword", school: "Sorcery", purpose: "Melee AoE" },
    { name: "Great Heavy Soul Arrow", school: "Sorcery", purpose: "Trash clear" },
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
      { label: "Survival / melee", ringNames: ["Third Dragon Ring", "Chloranthy Ring", "Ring of Blades"] },
    ],
    rings: [
      { name: "Southern Ritual Band", priority: "core", effect: "+3 slots — CMW + Soul Spear + utility.", whereToGet: "Brightstone Cove", howToGet: "Spider halls corpse.", phase: 2 },
      { name: "Clear Bluestone Ring +2", priority: "core", effect: "Faster casts from Blue Flame and staff.", whereToGet: "Huntsman's Copse", howToGet: "Skeleton Lords NG+.", phase: 4 },
      { name: "Third Dragon Ring", priority: "core", effect: "+12.5% HP, stamina, equip load.", whereToGet: "Dragon Shrine", howToGet: "Chest before Ancient Dragon.", phase: 4 },
      { name: "Chloranthy Ring", priority: "core", effect: "Stamina for sword combos and casting.", whereToGet: "FoFG", howToGet: "Pharros ballista room.", phase: 1 },
      { name: "Ring of Blades", priority: "optional", effect: "Physical AR on Blue Flame swings.", whereToGet: "FoFG", howToGet: "Pursuer drop.", phase: 1 },
    ],
  },
  buildSteps: BUILD_STEPS,
  buildItems: BUILD_ITEMS,
  buildMaterialFarms: [
    {
      item: "Twinkling Titanite",
      purpose: "Blue Flame +5",
      sources: [{ type: "vendor", location: "Chloanne", detail: "After King's Ring", unlock: "King's Ring" }],
      farmOptions: [{ enemy: "Crystal Lizard", area: "Dragon Aerie", method: "Kill all lizards", unlock: "Dragon Aerie" }],
    },
    {
      item: "Magic Stone",
      purpose: "Magic infuse Blue Flame",
      sources: [{ type: "vendor", location: "McDuff / Chloanne", detail: "After Dull Ember" }],
      farmOptions: [{ enemy: "Crystal Lizard", area: "Brightstone Cove", method: "Rare drop", unlock: "Brightstone Cove" }],
    },
    {
      item: "Titanite (Shards, Large, Chunks, Slab)",
      purpose: "Fire Longsword +10, Sorcerer's Staff +10",
      sources: [{ type: "vendor", location: "Lenigrast, McDuff, Chloanne", detail: "See Farming tab" }],
      farmOptions: [{ enemy: "Crystal Lizard", area: "Black Gulch", method: "Chunks", unlock: "Black Gulch" }],
    },
  ],
};
