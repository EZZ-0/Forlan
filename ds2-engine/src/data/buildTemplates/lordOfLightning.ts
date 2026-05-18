/**
 * Lord of Lightning and Sunlight
 * Source: DS2_ALL_BUILDS_A-Z #5
 */

import type { BuildTemplate } from "./types";
import { CLASS_BASE_STATS } from "./types";
import { generateLevelRoadmap } from "./levelGenerator";
import type { StatKey } from "../simulator/types";
import type { BuildStep } from "../buildChecklist";
import type { BuildItem } from "../buildItems";

const BASE = CLASS_BASE_STATS.cleric;

const PHASE_TARGETS: BuildTemplate["phaseTargets"] = {
  1: { VGR: 13, END: 8, VIT: 10, ATN: 9, STR: 14, DEX: 8, ADP: 8, FTH: 18 },
  2: { VGR: 16, END: 12, VIT: 11, ATN: 13, STR: 17, DEX: 10, ADP: 11, FTH: 26 },
  3: { VGR: 19, END: 16, VIT: 12, ATN: 16, STR: 19, DEX: 12, ADP: 13, FTH: 32 },
  4: { VGR: 22, END: 20, VIT: 14, ATN: 20, STR: 21, DEX: 14, ADP: 16, FTH: 40 },
  5: { VGR: 24, END: 23, VIT: 15, ATN: 23, STR: 23, DEX: 15, ADP: 19, FTH: 46 },
  6: { VGR: 25, END: 25, VIT: 15, ATN: 25, STR: 24, DEX: 16, ADP: 20, INT: 12, FTH: 50 },
};

const PHASE_PRIORITY: Record<number, StatKey[]> = {
  1: ["STR", "DEX", "FTH", "ATN", "VGR", "END", "ADP", "VIT", "INT"],
  2: ["STR", "DEX", "FTH", "ATN", "VGR", "END", "ADP", "VIT", "INT"],
  3: ["STR", "DEX", "FTH", "ATN", "VGR", "END", "ADP", "VIT", "INT"],
  4: ["STR", "DEX", "FTH", "ATN", "VGR", "END", "ADP", "VIT", "INT"],
  5: ["STR", "DEX", "FTH", "ATN", "VGR", "END", "ADP", "VIT", "INT"],
  6: ["STR", "DEX", "FTH", "ATN", "VGR", "END", "ADP", "VIT", "INT"],
};

const LEVELS = generateLevelRoadmap({
  startingClass: "cleric",
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  milestoneNotes: {
    "14:STR": "★ Heide Knight Sword (FoFG tree knight)",
    "18:FTH": "★ Lightning Spear (Licia)",
    "24:STR": "★ Defender Greatsword req (24 STR / 16 DEX)",
    "40:FTH": "★ Sunlight Blade path (spice from 36 req)",
    "50:FTH": "★★ BUILD COMPLETE — SL 150",
  },
});

const BUILD_STEPS: BuildStep[] = [
  { id: "lol:0", progressId: "build:lol:mace", name: "Mace +10 (Cleric start)", areaId: "things_betwixt", phase: 1, type: "weapon", source: "Starting gear → Lenigrast" },
  { id: "lol:1", progressId: "fg3", name: "Heide Knight Sword", areaId: "forest_of_fallen_giants", phase: 1, type: "weapon", source: "Kill Heide Knight by tree (SotFS)" },
  { id: "lol:2", progressId: "fg5", name: "Lenigrast's Key", areaId: "forest_of_fallen_giants", phase: 1, type: "key", source: "Melentia (1,000 souls)" },
  { id: "lol:3", progressId: "fg12", name: "Open Lenigrast's shop", areaId: "majula", phase: 1, type: "key", source: "Return to Majula with key" },
  { id: "lol:4", progressId: "fg15", name: "Ring of Blades", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "Pursuer drop" },
  { id: "lol:5", progressId: "fg21", name: "Chloranthy Ring", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "FoFG Pharros ballista room" },
  { id: "lol:6", progressId: "ht6", name: "Meet Licia of Lindeldt", areaId: "heides_tower", phase: 2, type: "key", source: "After Dragonrider — moves to Majula rotunda" },
  { id: "lol:7", progressId: "ht8", name: "Join Blue Sentinels (optional)", areaId: "heides_tower", phase: 2, type: "key", source: "Token of Fidelity → Targray", optional: true },
  { id: "lol:8", progressId: "hc1", name: "Licia rotunda access", areaId: "huntsmans_copse", phase: 2, type: "key", source: "Pay Licia 2,000 souls at Majula" },
  { id: "lol:9", progressId: "build:lol:lightning_spear", name: "Lightning Spear", areaId: "huntsmans_copse", phase: 2, type: "spell", source: "Licia (Majula rotunda)" },
  { id: "lol:10", progressId: "build:lol:great_heal", name: "Great Heal", areaId: "huntsmans_copse", phase: 2, type: "spell", source: "Licia" },
  { id: "lol:11", progressId: "build:lol:lindelt_chime", name: "Lindelt Priest Chime +10", areaId: "huntsmans_copse", phase: 2, type: "catalyst", source: "Licia (22 FTH req)" },
  { id: "lol:12", progressId: "lb2", name: "Dull Ember", areaId: "lost_bastille", phase: 2, type: "key", source: "Tower Apart chest" },
  { id: "lol:13", progressId: "lb7", name: "Give Dull Ember to McDuff", areaId: "lost_bastille", phase: 2, type: "key", source: "Unlocks Bolt Stones + infusion" },
  { id: "lol:14", progressId: "build:lol:hks_lightning", name: "Lightning infuse Heide Knight Sword", areaId: "lost_bastille", phase: 2, type: "infusion", source: "McDuff (Boltstone + 2,000 souls)" },
  { id: "lol:15", progressId: "build:lol:heavenly_thunder", name: "Heavenly Thunder", areaId: "shrine_of_amana", phase: 3, type: "spell", source: "Licia (mid-game FTH)" },
  { id: "lol:16", progressId: "bc15", name: "Southern Ritual Band", areaId: "brightstone_cove", phase: 3, type: "ring", source: "Corpse in spider halls" },
  { id: "lol:17", progressId: "sa3", name: "Sunlight Blade", areaId: "shrine_of_amana", phase: 4, type: "spell", source: "Chest — hidden path past 2nd bonfire (36 FTH; spice to 20)" },
  { id: "lol:18", progressId: "da10", name: "Third Dragon Ring", areaId: "dragon_aerie", phase: 4, type: "ring", source: "Dragon Shrine chest before Ancient Dragon" },
  { id: "lol:19", progressId: "tw1", name: "Throne Watcher & Defender", areaId: "throne_of_want", phase: 3, type: "key", source: "Kill together or they revive" },
  { id: "lol:20", progressId: "tw8", name: "Defender Greatsword +5", areaId: "throne_of_want", phase: 3, type: "weapon", source: "Ornifex (Throne Defender soul)" },
  { id: "lol:21", progressId: "build:lol:defender_lightning", name: "Lightning infuse Defender Greatsword", areaId: "lost_bastille", phase: 3, type: "infusion", source: "McDuff — 2H strong self-buffs with lightning" },
  { id: "lol:22", progressId: "mm5", name: "Giant Lord (Dragon Chime soul)", areaId: "memories", phase: 4, type: "key", source: "Memory of Jeigh — Ashen Mist Heart required" },
  { id: "lol:23", progressId: "build:lol:dragon_chime", name: "Dragon Chime +5", areaId: "memories", phase: 4, type: "catalyst", source: "Ornifex (Giant Lord soul)" },
  { id: "lol:24", progressId: "build:lol:sun_ring", name: "Sun Ring (Sun Seal)", areaId: "heides_tower", phase: 4, type: "ring", source: "Heirs of the Sun covenant rank", optional: true },
  { id: "lol:25", progressId: "build:lol:blinding_bolt", name: "Blinding Bolt", areaId: "shrine_of_amana", phase: 4, type: "spell", source: "Licia (high FTH)", optional: true },
  { id: "lol:26", progressId: "tw7", name: "Ring of Blades +2", areaId: "throne_of_want", phase: 4, type: "ring", source: "Throne Watcher & Defender NG+" },
  { id: "lol:27", progressId: "d316", name: "Chloranthy Ring +2", areaId: "dlc_ivory", phase: 4, type: "ring", source: "Crown of the Ivory King DLC" },
];

const BUILD_ITEMS: BuildItem[] = [
  { name: "Mace", type: "weapon", role: "Early melee until Heide Knight Sword", phase: 1, whereToFind: [{ type: "vendor", location: "Cleric start", detail: "Upgrade at Lenigrast to +10" }] },
  { name: "Heide Knight Sword", type: "weapon", role: "Early lightning sword", phase: 1, whereToFind: [{ type: "drop", location: "Forest of Fallen Giants", detail: "Heide Knight by tree", unlock: "FoFG" }], notes: "Lightning infuse at McDuff. 10 STR / 12 DEX." },
  { name: "Defender Greatsword", type: "weapon", role: "Primary — 2H strong self-buffs with lightning", phase: 3, whereToFind: [{ type: "trade", location: "Ornifex", detail: "Throne Defender soul", unlock: "Throne of Want" }], notes: "24 STR / 16 DEX. Lightning infusion recommended." },
  { name: "Lindelt Priest Chime", type: "catalyst", role: "Early miracles chime", phase: 2, whereToFind: [{ type: "vendor", location: "Licia", detail: "22 FTH req", unlock: "Heide's → Majula rotunda" }] },
  { name: "Dragon Chime", type: "catalyst", role: "Best chime for Sunlight Blade", phase: 4, whereToFind: [{ type: "trade", location: "Ornifex", detail: "Giant Lord soul", unlock: "Memory of Jeigh" }] },
  { name: "Lightning Spear", type: "spell", role: "Primary ranged miracle", phase: 2, whereToFind: [{ type: "vendor", location: "Licia", detail: "Early FTH investment", unlock: "Majula rotunda" }] },
  { name: "Great Heal", type: "spell", role: "Heal", phase: 2, whereToFind: [{ type: "vendor", location: "Licia", detail: "Miracle vendor" }] },
  { name: "Sunlight Blade", type: "spell", role: "Essential weapon buff", phase: 4, whereToFind: [{ type: "chest", location: "Shrine of Amana", detail: "Hidden path past second bonfire", unlock: "Shrine of Amana" }], notes: "36 FTH base — spice to 20 or level FTH. Use with Dragon Chime." },
  { name: "Heavenly Thunder", type: "spell", role: "AoE lightning", phase: 3, whereToFind: [{ type: "vendor", location: "Licia", detail: "Mid-game FTH" }] },
  { name: "Blinding Bolt", type: "spell", role: "Homing lightning", phase: 4, whereToFind: [{ type: "vendor", location: "Licia", detail: "High FTH" }], optional: true },
  { name: "Ring of Blades", type: "ring", role: "Flat physical AR", phase: 1, whereToFind: [{ type: "boss", location: "Pursuer", detail: "Guaranteed", unlock: "FoFG" }] },
  { name: "Chloranthy Ring", type: "ring", role: "Stamina regen", phase: 1, whereToFind: [{ type: "corpse", location: "FoFG", detail: "Pharros ballista room", unlock: "FoFG" }] },
  { name: "Southern Ritual Band", type: "ring", role: "+3 spell slots", phase: 3, whereToFind: [{ type: "corpse", location: "Brightstone Cove", detail: "Spider halls", unlock: "Brightstone Cove" }] },
  { name: "Third Dragon Ring", type: "ring", role: "HP/Stamina/Equip Load", phase: 4, whereToFind: [{ type: "chest", location: "Dragon Shrine", detail: "Before Ancient Dragon fog", unlock: "Dragon Aerie" }] },
  { name: "Sun Ring", type: "ring", role: "+5% lightning damage", phase: 4, whereToFind: [{ type: "vendor", location: "Heirs of the Sun", detail: "Rank up in covenant", unlock: "Heide's" }], optional: true },
  { name: "Ring of Blades +2", type: "ring", role: "Physical AR endgame", phase: 4, whereToFind: [{ type: "boss", location: "Throne Watcher & Defender", detail: "NG+", unlock: "Throne of Want" }] },
  { name: "Chloranthy Ring +2", type: "ring", role: "Stamina regen upgrade", phase: 4, whereToFind: [{ type: "chest", location: "DLC Ivory King", detail: "Frozen Eleum Loyce", unlock: "DLC" }] },
];

export const lordOfLightning: BuildTemplate = {
  id: "lord-of-lightning",
  name: "Lord of Lightning and Sunlight",
  description: "Faith knight. Defender Greatsword self-buff, Sunlight Blade, lightning miracles. Paladin fantasy.",
  source: "DS2_ALL_BUILDS_A-Z",
  startingClass: "cleric",
  baseStats: { ...BASE },
  levels: LEVELS,
  phaseInfo: [
    { num: 1, name: "Heide Sword + Mace", range: "SL 14→45", color: "#6b7c52", areas: "Betwixt → FoFG" },
    { num: 2, name: "Lightning Miracles", range: "SL 46→75", color: "#c8a030", areas: "Heide's → Huntsman's" },
    { num: 3, name: "Defender Greatsword", range: "SL 76→110", color: "#d4862a", areas: "Throne of Want" },
    { num: 4, name: "Complete Build", range: "SL 111→150", color: "#a03030", areas: "Post-Throne → DLC" },
  ],
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  weapons: [
    { name: "Defender Greatsword +5", role: "Primary (self-buff 2H strong)", phase: 3, infusion: "Lightning", stats: "24 STR / 16 DEX" },
    { name: "Heide Knight Sword +10", role: "Early lightning", phase: 1, infusion: "Lightning", stats: "10 STR / 12 DEX" },
    { name: "Dragon Chime +5", role: "Miracles", phase: 4, infusion: "Lightning", stats: "25 FTH" },
    { name: "Lindelt Priest Chime +10", role: "Early chime", phase: 2, infusion: "None", stats: "22 FTH" },
  ],
  spells: [
    { name: "Sunlight Blade", school: "Miracle", purpose: "Weapon buff" },
    { name: "Lightning Spear / GLS", school: "Miracle", purpose: "Ranged nuke" },
    { name: "Great Heal", school: "Miracle", purpose: "Heal" },
    { name: "Heavenly Thunder", school: "Miracle", purpose: "AoE" },
    { name: "Blinding Bolt", school: "Miracle", purpose: "Homing" },
  ],
  keyRings: [
    { name: "Sun Ring", effect: "Lightning +5%", source: "Heirs of the Sun" },
    { name: "Ring of Blades +2", effect: "Physical AR", source: "Throne NG+" },
    { name: "Third Dragon Ring", effect: "HP/Stamina/Equip", source: "Dragon Shrine" },
    { name: "Chloranthy Ring +2", effect: "Stamina regen", source: "DLC Ivory King" },
    { name: "Southern Ritual Band", effect: "Spell slots", source: "Brightstone Cove" },
  ],
  ringsDetail: {
    priorityOrder: ["Ring of Blades +2", "Third Dragon Ring", "Chloranthy Ring +2", "Southern Ritual Band", "Sun Ring", "Chloranthy Ring"],
    groups: [
      { label: "Core", ringNames: ["Ring of Blades +2", "Third Dragon Ring", "Chloranthy Ring +2", "Southern Ritual Band"] },
      { label: "Lightning / optional", ringNames: ["Sun Ring", "Chloranthy Ring"] },
    ],
    rings: [
      { name: "Ring of Blades +2", priority: "core", effect: "+35 physical AR.", whereToGet: "Throne of Want", howToGet: "Throne Watcher & Defender in NG+.", phase: 4 },
      { name: "Third Dragon Ring", priority: "core", effect: "+12.5% HP, stamina, equip load.", whereToGet: "Dragon Shrine", howToGet: "Chest before Ancient Dragon fog.", phase: 4 },
      { name: "Chloranthy Ring +2", priority: "core", effect: "Strong stamina regen for greatsword swings.", whereToGet: "DLC Ivory King", howToGet: "Frozen Eleum Loyce exploration.", phase: 4 },
      { name: "Southern Ritual Band", priority: "core", effect: "+3 spell slots — frees ATN for FTH.", whereToGet: "Brightstone Cove", howToGet: "Corpse in spider section.", phase: 3 },
      { name: "Sun Ring", priority: "optional", effect: "+5% lightning damage.", whereToGet: "Heirs of the Sun", howToGet: "Rank up in covenant (Heide's area).", phase: 4 },
      { name: "Chloranthy Ring", priority: "optional", effect: "Early stamina regen until +2.", whereToGet: "FoFG", howToGet: "Pharros ballista room.", phase: 1 },
    ],
  },
  buildSteps: BUILD_STEPS,
  buildItems: BUILD_ITEMS,
  buildMaterialFarms: [
    {
      item: "Titanite (Shards, Large, Chunks, Slab)",
      purpose: "Heide Knight Sword +10, Lindelt Priest Chime +10",
      sources: [{ type: "vendor", location: "Lenigrast, McDuff, Chloanne", detail: "See Farming tab" }],
      farmOptions: [
        { enemy: "Alonne Knight", area: "Iron Keep", method: "Chunks. CoC.", unlock: "Iron Keep" },
        { enemy: "Crystal Lizard", area: "Black Gulch, Dragon Aerie", method: "Chunks", unlock: "Area access" },
      ],
    },
    {
      item: "Twinkling Titanite",
      purpose: "Defender Greatsword +5, Dragon Chime +5",
      sources: [
        { type: "vendor", location: "Chloanne", detail: "After King's Ring", unlock: "King's Ring" },
        { type: "chest", location: "Dragon Aerie", detail: "11 crystal lizards", unlock: "Dragon Aerie" },
      ],
      farmOptions: [{ enemy: "Crystal Lizard", area: "Dragon Aerie", method: "Kill all 11", unlock: "Dragon Aerie" }],
    },
    {
      item: "Boltstone",
      purpose: "Lightning infuse Heide Knight Sword, Defender Greatsword, Dragon Chime. McDuff: 1 stone + 2,000 souls.",
      sources: [
        { type: "vendor", location: "Chloanne", detail: "After King's Ring", unlock: "King's Ring" },
        { type: "chest", location: "Lost Bastille Pharros", detail: "Servants' Quarters hidden path", unlock: "Lost Bastille" },
      ],
      farmOptions: [{ enemy: "Heide Knight", area: "Heide's Tower / FoFG", method: "CoC farm", unlock: "Heide's" }],
    },
  ],
};
