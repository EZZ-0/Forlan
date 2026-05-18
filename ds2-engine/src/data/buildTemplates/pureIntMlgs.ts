/**
 * Pure INT / Moonlight Greatsword
 * Source: DS2_ALL_BUILDS_A-Z #7
 */

import type { BuildTemplate } from "./types";
import { CLASS_BASE_STATS } from "./types";
import { generateLevelRoadmap } from "./levelGenerator";
import type { StatKey } from "../simulator/types";
import type { BuildStep } from "../buildChecklist";
import type { BuildItem } from "../buildItems";

const BASE = CLASS_BASE_STATS.sorcerer;

const PHASE_TARGETS: BuildTemplate["phaseTargets"] = {
  1: { VGR: 7, END: 9, VIT: 6, ATN: 20, STR: 6, DEX: 10, ADP: 11, INT: 24 },
  2: { VGR: 9, END: 12, VIT: 6, ATN: 28, STR: 9, DEX: 12, ADP: 13, INT: 33 },
  3: { VGR: 11, END: 14, VIT: 6, ATN: 33, STR: 12, DEX: 14, ADP: 15, INT: 40 },
  4: { VGR: 13, END: 17, VIT: 6, ATN: 41, STR: 15, DEX: 16, ADP: 17, INT: 49 },
  5: { VGR: 14, END: 19, VIT: 6, ATN: 47, STR: 17, DEX: 17, ADP: 19, INT: 56 },
  6: { VGR: 15, END: 20, VIT: 6, ATN: 50, STR: 18, DEX: 18, ADP: 20, INT: 60, FTH: 4 },
};

const PHASE_PRIORITY: Record<number, StatKey[]> = {
  1: ["STR", "DEX", "INT", "ATN", "END", "ADP", "VGR", "VIT", "FTH"],
  2: ["STR", "DEX", "INT", "ATN", "END", "ADP", "VGR", "VIT", "FTH"],
  3: ["STR", "DEX", "INT", "ATN", "END", "ADP", "VGR", "VIT", "FTH"],
  4: ["STR", "DEX", "INT", "ATN", "END", "ADP", "VGR", "VIT", "FTH"],
  5: ["STR", "DEX", "INT", "ATN", "END", "ADP", "VGR", "VIT", "FTH"],
  6: ["STR", "DEX", "INT", "ATN", "END", "ADP", "VGR", "VIT", "FTH"],
};

const LEVELS = generateLevelRoadmap({
  startingClass: "sorcerer",
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  milestoneNotes: {
    "24:INT": "★ INT rush — Staff of Wisdom path",
    "40:INT": "★ MLGS beam scaling soft cap region",
    "18:STR": "★ MLGS req (18 STR / 18 DEX)",
    "60:INT": "★★ BUILD COMPLETE — SL 150",
  },
});

const BUILD_STEPS: BuildStep[] = [
  { id: "pim:0", progressId: "build:pim:staff", name: "Sorcerer's Staff +10 (Sorcerer start)", areaId: "things_betwixt", phase: 1, type: "catalyst", source: "Starting gear → Lenigrast" },
  { id: "pim:1", progressId: "fg11", name: "Fire Longsword", areaId: "forest_of_fallen_giants", phase: 1, type: "weapon", source: "Salamander chest" },
  { id: "pim:2", progressId: "fg5", name: "Lenigrast's Key", areaId: "forest_of_fallen_giants", phase: 1, type: "key", source: "Melentia (1,000 souls)" },
  { id: "pim:3", progressId: "fg12", name: "Open Lenigrast's shop", areaId: "majula", phase: 1, type: "key", source: "Return to Majula" },
  { id: "pim:4", progressId: "fg15", name: "Ring of Blades", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "Pursuer drop" },
  { id: "pim:5", progressId: "fg21", name: "Chloranthy Ring", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "FoFG Pharros" },
  { id: "pim:6", progressId: "build:pim:carhillion", name: "Carhillion of Jura (sorceries)", areaId: "no_mans_wharf", phase: 1, type: "key", source: "10 INT to browse" },
  { id: "pim:7", progressId: "lb4", name: "Unpetrify Straid of Olaphis", areaId: "lost_bastille", phase: 2, type: "key", source: "Fragrant Branch of Yore" },
  { id: "pim:8", progressId: "build:pim:soul_spear", name: "Soul Spear", areaId: "lost_bastille", phase: 2, type: "spell", source: "Straid (high INT req)" },
  { id: "pim:9", progressId: "build:staff_of_wisdom", name: "Staff of Wisdom +5", areaId: "dragon_aerie", phase: 2, type: "catalyst", source: "Crystal lizard Dragon Shrine or Ornifex NG+" },
  { id: "pim:10", progressId: "bc8", name: "Duke's Dear Freja (1st Old Paledrake Soul → MLGS)", areaId: "brightstone_cove", phase: 2, type: "key", source: "Lord Soul — Ornifex in Majula (mj19)" },
  { id: "pim:11", progressId: "bc15", name: "Southern Ritual Band", areaId: "brightstone_cove", phase: 2, type: "ring", source: "Corpse in spider halls" },
  { id: "pim:12", progressId: "build:pim:lion_mage", name: "Lion Mage Set (cast speed armor)", areaId: "shaded_woods", phase: 3, type: "key", source: "Corpse in Shaded Woods — boosts cast speed" },
  { id: "pim:13", progressId: "build:pim:witchtree", name: "Witchtree Branch +10", areaId: "shaded_woods", phase: 3, type: "catalyst", source: "Corpse in Shaded Woods (fast cast backup)" },
  { id: "pim:14", progressId: "mj19", name: "Moonlight Greatsword +5", areaId: "majula", phase: 3, type: "weapon", source: "Ornifex (1st Old Paledrake Soul from Freja)" },
  { id: "pim:15", progressId: "da10", name: "Third Dragon Ring", areaId: "dragon_aerie", phase: 3, type: "ring", source: "Dragon Shrine chest" },
  { id: "pim:16", progressId: "lb18", name: "Crystal Soul Spear", areaId: "lost_bastille", phase: 4, type: "spell", source: "Straid/Ornifex — needs 2nd Freja soul (bc19: NG+ Freja or Bonfire Ascetic)" },
  { id: "pim:17", progressId: "build:pim:soul_greatsword", name: "Soul Greatsword", areaId: "lost_bastille", phase: 3, type: "spell", source: "Straid" },
  { id: "pim:18", progressId: "build:pim:hcsm", name: "Homing Crystal Soulmass", areaId: "lost_bastille", phase: 3, type: "spell", source: "Straid" },
  { id: "pim:19", progressId: "build:pim:ghsa", name: "Great Heavy Soul Arrow", areaId: "no_mans_wharf", phase: 2, type: "spell", source: "Carhillion" },
  { id: "pim:20", progressId: "hc8", name: "Skeleton Lords (Clear Bluestone path)", areaId: "huntsmans_copse", phase: 4, type: "key", source: "NG+ or Bonfire Ascetic" },
  { id: "pim:21", progressId: "hc12", name: "Clear Bluestone Ring +2", areaId: "huntsmans_copse", phase: 4, type: "ring", source: "Skeleton Lords NG+" },
  { id: "pim:22", progressId: "build:pim:southern_ritual_2", name: "Southern Ritual Band +2", areaId: "brightstone_cove", phase: 4, type: "ring", source: "Scorpioness Najka NG+ or Bonfire Ascetic" },
  { id: "pim:23", progressId: "tw7", name: "Ring of Blades +2", areaId: "throne_of_want", phase: 4, type: "ring", source: "Throne Watcher & Defender NG+", optional: true },
];

const BUILD_ITEMS: BuildItem[] = [
  { name: "Sorcerer's Staff", type: "catalyst", role: "Early casting", phase: 1, whereToFind: [{ type: "vendor", location: "Sorcerer start", detail: "Upgrade to +10 at Lenigrast" }] },
  { name: "Fire Longsword", type: "weapon", role: "Physical backup until MLGS", phase: 1, whereToFind: [{ type: "chest", location: "Forest of Fallen Giants", detail: "Salamander pit", unlock: "FoFG" }] },
  { name: "Staff of Wisdom", type: "catalyst", role: "Primary sorcery catalyst", phase: 2, whereToFind: [{ type: "drop", location: "Dragon Shrine", detail: "Crystal lizard", unlock: "Dragon Aerie" }, { type: "trade", location: "Ornifex", detail: "Old Paledrake Soul NG+", unlock: "Dragon Shrine" }], notes: "50 INT req — spice to 40 or level INT." },
  { name: "Witchtree Branch", type: "catalyst", role: "Fast cast speed backup (no stat scaling)", phase: 3, whereToFind: [{ type: "corpse", location: "Shaded Woods", detail: "Near Lion Mage Set", unlock: "Shaded Woods" }] },
  { name: "Moonlight Greatsword", type: "weapon", role: "Primary magic melee", phase: 3, whereToFind: [{ type: "trade", location: "Ornifex", detail: "Old Paledrake Soul (Freja)", unlock: "Brightstone Cove" }], notes: "Magic damage only. Scales with INT. 18 STR / 18 DEX." },
  { name: "Crystal Soul Spear", type: "spell", role: "Primary nuke", phase: 4, whereToFind: [{ type: "trade", location: "Straid or Ornifex", detail: "Freja soul (second copy via NG+/Ascetic)", unlock: "Brightstone Cove" }] },
  { name: "Soul Spear", type: "spell", role: "Ranged", phase: 2, whereToFind: [{ type: "vendor", location: "Straid", detail: "High INT req" }] },
  { name: "Homing Crystal Soulmass", type: "spell", role: "Combo", phase: 3, whereToFind: [{ type: "vendor", location: "Straid", detail: "High INT req" }] },
  { name: "Soul Greatsword", type: "spell", role: "Melee AoE", phase: 3, whereToFind: [{ type: "vendor", location: "Straid", detail: "INT req" }] },
  { name: "Great Heavy Soul Arrow", type: "spell", role: "Trash clear", phase: 2, whereToFind: [{ type: "vendor", location: "Carhillion", detail: "No-Man's Wharf" }] },
  { name: "Lion Mage Set", type: "ring", role: "Cast speed armor (equip for faster casts)", phase: 3, whereToFind: [{ type: "corpse", location: "Shaded Woods", detail: "Hidden path", unlock: "Shaded Woods" }] },
  { name: "Southern Ritual Band", type: "ring", role: "+3 spell slots", phase: 2, whereToFind: [{ type: "corpse", location: "Brightstone Cove", detail: "Spider halls", unlock: "Brightstone Cove" }] },
  { name: "Southern Ritual Band +2", type: "ring", role: "+3 slots upgrade", phase: 4, whereToFind: [{ type: "boss", location: "Scorpioness Najka", detail: "NG+ or Bonfire Ascetic", unlock: "Brightstone Cove" }] },
  { name: "Clear Bluestone Ring +2", type: "ring", role: "Cast speed", phase: 4, whereToFind: [{ type: "boss", location: "Skeleton Lords", detail: "NG+ Huntsman's Copse", unlock: "Huntsman's Copse" }] },
  { name: "Third Dragon Ring", type: "ring", role: "HP/Stamina/Equip Load", phase: 3, whereToFind: [{ type: "chest", location: "Dragon Shrine", detail: "Before Ancient Dragon fog", unlock: "Dragon Aerie" }] },
  { name: "Chloranthy Ring", type: "ring", role: "Stamina regen", phase: 1, whereToFind: [{ type: "corpse", location: "FoFG", detail: "Pharros ballista room", unlock: "FoFG" }] },
];

export const pureIntMlgs: BuildTemplate = {
  id: "pure-int-mlgs",
  name: "Pure INT / Moonlight Greatsword",
  description: "Pure INT glass cannon. MLGS for melee, Crystal Soul Spear for nukes. No FTH — sorcery only.",
  source: "DS2_ALL_BUILDS_A-Z",
  startingClass: "sorcerer",
  baseStats: { ...BASE },
  levels: LEVELS,
  phaseInfo: [
    { num: 1, name: "Staff + Soul Arrow", range: "SL 11→40", color: "#6b7c52", areas: "Betwixt → FoFG" },
    { num: 2, name: "INT 50 Rush", range: "SL 41→75", color: "#c8a030", areas: "Heide's → Brightstone" },
    { num: 3, name: "MLGS + Crystal", range: "SL 76→110", color: "#d4862a", areas: "Dragon Shrine" },
    { num: 4, name: "Complete Build", range: "SL 111→150", color: "#a03030", areas: "Post-game" },
  ],
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  weapons: [
    { name: "Moonlight Greatsword +5", role: "Primary melee", phase: 3, infusion: "Built-in Magic", stats: "18 STR / 18 DEX" },
    { name: "Staff of Wisdom +5", role: "Sorceries", phase: 2, infusion: "Magic", stats: "50 INT (spiced to 40)" },
    { name: "Witchtree Branch +10", role: "Cast speed backup", phase: 3, infusion: "None", stats: "18 INT" },
  ],
  spells: [
    { name: "Crystal Soul Spear", school: "Sorcery", purpose: "Primary nuke" },
    { name: "Soul Spear", school: "Sorcery", purpose: "Ranged" },
    { name: "Homing Crystal Soulmass", school: "Sorcery", purpose: "Combo" },
    { name: "Soul Greatsword", school: "Sorcery", purpose: "Melee AoE" },
    { name: "Great Heavy Soul Arrow", school: "Sorcery", purpose: "Trash clear" },
  ],
  keyRings: [
    { name: "Southern Ritual Band +2", effect: "+3 slots", source: "Scorpioness Najka NG+" },
    { name: "Clear Bluestone Ring +2", effect: "Cast speed", source: "Skeleton Lords NG+" },
    { name: "Third Dragon Ring", effect: "HP/Stamina/Equip", source: "Dragon Shrine" },
    { name: "Chloranthy Ring", effect: "Stamina regen", source: "FoFG" },
  ],
  ringsDetail: {
    priorityOrder: ["Southern Ritual Band +2", "Clear Bluestone Ring +2", "Third Dragon Ring", "Chloranthy Ring", "Southern Ritual Band"],
    groups: [
      { label: "Caster core", ringNames: ["Southern Ritual Band +2", "Clear Bluestone Ring +2"] },
      { label: "Survival", ringNames: ["Third Dragon Ring", "Chloranthy Ring"] },
    ],
    rings: [
      { name: "Southern Ritual Band +2", priority: "core", effect: "+3 spell slots — max ATN efficiency at 50.", whereToGet: "Brightstone Cove", howToGet: "Scorpioness Najka NG+ or Bonfire Ascetic.", phase: 4 },
      { name: "Clear Bluestone Ring +2", priority: "core", effect: "Maximum cast speed for CSS spam.", whereToGet: "Huntsman's Copse", howToGet: "Skeleton Lords in NG+.", phase: 4 },
      { name: "Third Dragon Ring", priority: "core", effect: "+12.5% HP, stamina, equip load.", whereToGet: "Dragon Shrine", howToGet: "Chest before Ancient Dragon fog.", phase: 3 },
      { name: "Chloranthy Ring", priority: "core", effect: "Stamina for MLGS and dodging.", whereToGet: "FoFG", howToGet: "Pharros ballista room.", phase: 1 },
      { name: "Southern Ritual Band", priority: "optional", effect: "Early +3 slots until +2 upgrade.", whereToGet: "Brightstone Cove", howToGet: "Corpse in spider section.", phase: 2 },
    ],
  },
  buildSteps: BUILD_STEPS,
  buildItems: BUILD_ITEMS,
  buildMaterialFarms: [
    {
      item: "Titanite (Shards, Large, Chunks)",
      purpose: "Sorcerer's Staff +10, Witchtree Branch +10, Fire Longsword +10",
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
      sources: [{ type: "drop", location: "Crystal Lizards", detail: "Dragon Aerie" }],
      farmOptions: [{ enemy: "Crystal Lizard", area: "Dragon Aerie", method: "Rare drop", unlock: "Dragon Aerie" }],
    },
  ],
};
