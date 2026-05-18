/**
 * Polearm Paladin — Heide Lance, faith/lightning
 * Source: DS2_ALL_BUILDS_A-Z #16
 */

import type { BuildTemplate } from "./types";
import { CLASS_BASE_STATS } from "./types";
import { generateLevelRoadmap } from "./levelGenerator";
import type { StatKey } from "../simulator/types";
import type { BuildStep } from "../buildChecklist";
import type { BuildItem } from "../buildItems";

const BASE = CLASS_BASE_STATS.knight;

const PHASE_TARGETS: BuildTemplate["phaseTargets"] = {
  1: { VGR: 16, END: 10, VIT: 10, ATN: 12, STR: 14, DEX: 10, ADP: 8 },
  2: { VGR: 18, END: 14, VIT: 11, ATN: 16, STR: 16, DEX: 12, ADP: 11, FTH: 12 },
  3: { VGR: 20, END: 18, VIT: 13, ATN: 20, STR: 18, DEX: 14, ADP: 15, FTH: 26 },
  4: { VGR: 22, END: 22, VIT: 14, ATN: 23, STR: 19, DEX: 15, ADP: 18, FTH: 34 },
  5: { VGR: 24, END: 24, VIT: 15, ATN: 24, STR: 20, DEX: 15, ADP: 19, FTH: 38 },
  6: { VGR: 25, END: 25, VIT: 15, ATN: 25, STR: 20, DEX: 15, ADP: 20, INT: 6, FTH: 40 },
};

const PHASE_PRIORITY: Record<number, StatKey[]> = {
  1: ["STR", "DEX", "FTH", "VGR", "END", "ATN", "ADP", "VIT", "INT"],
  2: ["STR", "DEX", "FTH", "ATN", "VGR", "END", "ADP", "VIT", "INT"],
  3: ["FTH", "ATN", "STR", "DEX", "VGR", "END", "ADP", "VIT", "INT"],
  4: ["FTH", "ATN", "STR", "DEX", "VGR", "END", "ADP", "VIT", "INT"],
  5: ["FTH", "ATN", "STR", "DEX", "VGR", "END", "ADP", "VIT", "INT"],
  6: ["FTH", "ATN", "STR", "DEX", "VGR", "END", "ADP", "VIT", "INT"],
};

const LEVELS = generateLevelRoadmap({
  startingClass: "knight",
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  milestoneNotes: {
    "14:STR": "★ Heide Lance (12 STR / 14 DEX)",
    "18:FTH": "★ Lightning Spear (Licia)",
    "36:FTH": "★ Sunlight Blade path (spice from 36 req)",
    "40:FTH": "★★ BUILD COMPLETE — SL 150",
  },
});

const BUILD_STEPS: BuildStep[] = [
  { id: "pp:0", progressId: "build:pp:mace", name: "Mace +10 (Knight start)", areaId: "things_betwixt", phase: 1, type: "weapon", source: "Until halberd pickup" },
  { id: "pp:1", progressId: "fg5", name: "Lenigrast's Key", areaId: "forest_of_fallen_giants", phase: 1, type: "key", source: "Melentia (1,000 souls)" },
  { id: "pp:2", progressId: "fg12", name: "Open Lenigrast's shop", areaId: "majula", phase: 1, type: "key", source: "Return to Majula" },
  { id: "pp:3", progressId: "fg21", name: "Chloranthy Ring", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "FoFG Pharros ballista room" },
  { id: "pp:4", progressId: "ht2d", name: "Old Knight Halberd", areaId: "heides_tower", phase: 1, type: "weapon", source: "Heide's upper level corpse — early polearm" },
  { id: "pp:5", progressId: "build:pp:heide_lance", name: "Heide Lance +10", areaId: "heides_tower", phase: 1, type: "weapon", source: "Heide Knight drop — farm in SotFS" },
  { id: "pp:6", progressId: "ht7", name: "Old Leo Ring", areaId: "heides_tower", phase: 1, type: "ring", source: "Old Dragonslayer — thrust counter on lance" },
  { id: "pp:7", progressId: "ht3", name: "Dragonrider", areaId: "heides_tower", phase: 1, type: "key", source: "Heide's progression" },
  { id: "pp:8", progressId: "ht6", name: "Meet Licia of Lindeldt", areaId: "heides_tower", phase: 2, type: "key", source: "After Dragonrider — moves to Majula rotunda" },
  { id: "pp:9", progressId: "hc1", name: "Licia rotunda access", areaId: "huntsmans_copse", phase: 2, type: "key", source: "Pay Licia 2,000 souls at Majula" },
  { id: "pp:10", progressId: "build:lol:lightning_spear", name: "Lightning Spear", areaId: "huntsmans_copse", phase: 2, type: "spell", source: "Licia (Majula rotunda)" },
  { id: "pp:11", progressId: "build:lol:great_heal", name: "Great Heal", areaId: "huntsmans_copse", phase: 2, type: "spell", source: "Licia" },
  { id: "pp:12", progressId: "build:lol:lindelt_chime", name: "Lindelt Priest Chime +10", areaId: "huntsmans_copse", phase: 2, type: "catalyst", source: "Licia (22 FTH req)" },
  { id: "pp:13", progressId: "lb2", name: "Dull Ember", areaId: "lost_bastille", phase: 2, type: "key", source: "Tower Apart" },
  { id: "pp:14", progressId: "lb7", name: "Give Dull Ember to McDuff", areaId: "lost_bastille", phase: 2, type: "key", source: "Bolt Stones + lightning infusion" },
  { id: "pp:15", progressId: "build:pp:heide_lance_lightning", name: "Lightning infuse Heide Lance", areaId: "lost_bastille", phase: 2, type: "infusion", source: "McDuff (Boltstone + 2,000 souls)" },
  { id: "pp:16", progressId: "build:pp:halberd", name: "Halberd +10 (backup)", areaId: "lost_bastille", phase: 2, type: "weapon", source: "McDuff or drop — 16 STR / 12 DEX", optional: true },
  { id: "pp:17", progressId: "build:pp:halberd_lightning", name: "Lightning infuse Halberd", areaId: "lost_bastille", phase: 2, type: "infusion", source: "McDuff", optional: true },
  { id: "pp:18", progressId: "sa3", name: "Sunlight Blade", areaId: "shrine_of_amana", phase: 3, type: "spell", source: "Chest — hidden path past 2nd bonfire (36 FTH; spice to 20)" },
  { id: "pp:19", progressId: "bc15", name: "Southern Ritual Band", areaId: "brightstone_cove", phase: 3, type: "ring", source: "Corpse in spider halls" },
  { id: "pp:20", progressId: "build:lol:heavenly_thunder", name: "Heavenly Thunder", areaId: "shrine_of_amana", phase: 3, type: "spell", source: "Licia (mid FTH)", optional: true },
  { id: "pp:21", progressId: "mm5", name: "Giant Lord (Dragon Chime soul)", areaId: "memories", phase: 4, type: "key", source: "Memory of Jeigh — Ashen Mist Heart" },
  { id: "pp:22", progressId: "build:lol:dragon_chime", name: "Dragon Chime +5", areaId: "memories", phase: 4, type: "catalyst", source: "Ornifex (Giant Lord soul)" },
  { id: "pp:23", progressId: "da10", name: "Third Dragon Ring", areaId: "dragon_aerie", phase: 4, type: "ring", source: "Dragon Shrine chest" },
  { id: "pp:24", progressId: "tw7", name: "Ring of Blades +2", areaId: "throne_of_want", phase: 4, type: "ring", source: "Throne Watcher & Defender NG+" },
  { id: "pp:25", progressId: "fg15", name: "Ring of Blades", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "Pursuer — until +2" },
];

const BUILD_ITEMS: BuildItem[] = [
  { name: "Old Knight Halberd", type: "weapon", role: "Early polearm (high STR)", phase: 1, whereToFind: [{ type: "corpse", location: "Heide's Tower", detail: "Upper level", unlock: "Heide's" }], notes: "26 STR / 10 DEX — transition weapon." },
  { name: "Heide Lance", type: "weapon", role: "Primary — lightning lance", phase: 1, whereToFind: [{ type: "drop", location: "Heide's Tower", detail: "Heide Knight drop", unlock: "Heide's" }], notes: "12 STR / 14 DEX. Innate lightning.", farmOptions: [{ enemy: "Heide Knight", area: "Heide's Tower", method: "Farmable in SotFS", unlock: "Heide's" }] },
  { name: "Halberd", type: "weapon", role: "Backup polearm", phase: 2, whereToFind: [{ type: "buy", location: "McDuff", detail: "16 STR / 12 DEX", unlock: "Lost Bastille" }], optional: true },
  { name: "Lindelt Priest Chime", type: "catalyst", role: "Early miracles", phase: 2, whereToFind: [{ type: "vendor", location: "Licia", detail: "22 FTH req", unlock: "Majula rotunda" }] },
  { name: "Dragon Chime", type: "catalyst", role: "Best chime for Sunlight Blade", phase: 4, whereToFind: [{ type: "trade", location: "Ornifex", detail: "Giant Lord soul", unlock: "Memory of Jeigh" }] },
  { name: "Sunlight Blade", type: "spell", role: "Essential weapon buff", phase: 3, whereToFind: [{ type: "chest", location: "Shrine of Amana", detail: "Hidden path past second bonfire", unlock: "Shrine of Amana" }] },
  { name: "Lightning Spear", type: "spell", role: "Ranged miracle", phase: 2, whereToFind: [{ type: "vendor", location: "Licia", detail: "Early FTH", unlock: "Majula rotunda" }] },
  { name: "Great Heal", type: "spell", role: "Heal", phase: 2, whereToFind: [{ type: "vendor", location: "Licia", detail: "Miracle vendor" }] },
  { name: "Old Leo Ring", type: "ring", role: "Thrust counter — lance strong attacks", phase: 1, whereToFind: [{ type: "boss", location: "Old Dragonslayer", detail: "Heide's Tower", unlock: "Heide's" }] },
  { name: "Southern Ritual Band", type: "ring", role: "+3 spell slots", phase: 3, whereToFind: [{ type: "corpse", location: "Brightstone Cove", detail: "Spider halls", unlock: "Brightstone Cove" }] },
  { name: "Third Dragon Ring", type: "ring", role: "HP/Stamina/Equip", phase: 4, whereToFind: [{ type: "chest", location: "Dragon Shrine", detail: "Before Ancient Dragon", unlock: "Dragon Aerie" }] },
  { name: "Ring of Blades +2", type: "ring", role: "Physical AR", phase: 4, whereToFind: [{ type: "boss", location: "Throne Watcher & Defender", detail: "NG+", unlock: "Throne of Want" }] },
  { name: "Chloranthy Ring", type: "ring", role: "Stamina regen", phase: 1, whereToFind: [{ type: "corpse", location: "FoFG", detail: "Pharros ballista room", unlock: "FoFG" }] },
];

export const polearmPaladin: BuildTemplate = {
  id: "polearm-paladin",
  name: "Polearm Paladin",
  description: "Faith polearm. Heide Lance lightning, Sunlight Blade, Old Leo thrust counters.",
  source: "DS2_ALL_BUILDS_A-Z",
  startingClass: "knight",
  baseStats: { ...BASE },
  levels: LEVELS,
  phaseInfo: [
    { num: 1, name: "Halberd Early", range: "SL 12→45", color: "#6b7c52", areas: "Betwixt → Heide's" },
    { num: 2, name: "Heide Lance + Faith", range: "SL 46→75", color: "#c8a030", areas: "Huntsman's → Bastille" },
    { num: 3, name: "Lightning Miracles", range: "SL 76→110", color: "#d4862a", areas: "Amana → Brightstone" },
    { num: 4, name: "Complete Build", range: "SL 111→150", color: "#a03030", areas: "Dragon Shrine → Throne" },
  ],
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  weapons: [
    { name: "Heide Lance +10", role: "Primary", phase: 1, infusion: "Lightning", stats: "12 STR / 14 DEX" },
    { name: "Halberd +10", role: "Backup", phase: 2, infusion: "Lightning", stats: "16 STR / 12 DEX" },
    { name: "Old Knight Halberd +10", role: "Early", phase: 1, infusion: "None", stats: "26 STR / 10 DEX" },
    { name: "Dragon Chime +5", role: "Miracles", phase: 4, infusion: "Lightning", stats: "25 FTH" },
    { name: "Lindelt Priest Chime +10", role: "Early chime", phase: 2, infusion: "None", stats: "22 FTH" },
  ],
  spells: [
    { name: "Sunlight Blade", school: "Miracle", purpose: "Weapon buff" },
    { name: "Lightning Spear", school: "Miracle", purpose: "Ranged" },
    { name: "Great Heal", school: "Miracle", purpose: "Heal" },
    { name: "Heavenly Thunder", school: "Miracle", purpose: "AoE" },
  ],
  keyRings: [
    { name: "Old Leo Ring", effect: "Thrust counter", source: "Old Dragonslayer" },
    { name: "Ring of Blades +2", effect: "Physical AR", source: "Throne NG+" },
    { name: "Third Dragon Ring", effect: "HP/Stamina/Equip", source: "Dragon Shrine" },
    { name: "Chloranthy Ring", effect: "Stamina regen", source: "FoFG" },
    { name: "Southern Ritual Band", effect: "Spell slots", source: "Brightstone Cove" },
  ],
  ringsDetail: {
    priorityOrder: ["Old Leo Ring", "Ring of Blades +2", "Third Dragon Ring", "Southern Ritual Band", "Chloranthy Ring"],
    groups: [
      { label: "Lance / faith", ringNames: ["Old Leo Ring", "Southern Ritual Band"] },
      { label: "Core stats", ringNames: ["Ring of Blades +2", "Third Dragon Ring", "Chloranthy Ring"] },
    ],
    rings: [
      { name: "Old Leo Ring", priority: "core", effect: "Boosts thrust counter — lance running attacks.", whereToGet: "Heide's Tower", howToGet: "Old Dragonslayer drop.", phase: 1 },
      { name: "Ring of Blades +2", priority: "core", effect: "+35 physical AR on lance.", whereToGet: "Throne of Want", howToGet: "Throne Watcher & Defender NG+.", phase: 4 },
      { name: "Third Dragon Ring", priority: "core", effect: "+12.5% HP, stamina, equip load.", whereToGet: "Dragon Shrine", howToGet: "Chest before Ancient Dragon fog.", phase: 4 },
      { name: "Southern Ritual Band", priority: "core", effect: "+3 spell slots for Sunlight Blade + spears.", whereToGet: "Brightstone Cove", howToGet: "Spider halls corpse.", phase: 3 },
      { name: "Chloranthy Ring", priority: "core", effect: "Stamina for lance pokes and rolls.", whereToGet: "FoFG", howToGet: "Pharros ballista room.", phase: 1 },
    ],
  },
  buildSteps: BUILD_STEPS,
  buildItems: BUILD_ITEMS,
  buildMaterialFarms: [
    {
      item: "Titanite (Shards, Large, Chunks, Slab)",
      purpose: "Heide Lance +10, Halberd +10, Lindelt Priest Chime +10",
      sources: [{ type: "vendor", location: "Lenigrast, McDuff, Chloanne", detail: "See Farming tab" }],
      farmOptions: [
        { enemy: "Heide Knight", area: "Heide's Tower", method: "Lance farm + chunks", unlock: "Heide's" },
        { enemy: "Crystal Lizard", area: "Dragon Aerie", method: "Chunks", unlock: "Dragon Aerie" },
      ],
    },
    {
      item: "Boltstone",
      purpose: "Lightning infuse Heide Lance, Halberd, Dragon Chime. McDuff: 1 stone + 2,000 souls.",
      sources: [
        { type: "vendor", location: "Chloanne", detail: "After King's Ring", unlock: "King's Ring" },
        { type: "chest", location: "Lost Bastille Pharros", detail: "Servants' Quarters", unlock: "Lost Bastille" },
      ],
      farmOptions: [{ enemy: "Heide Knight", area: "Heide's Tower", method: "CoC farm", unlock: "Heide's" }],
    },
    {
      item: "Twinkling Titanite",
      purpose: "Dragon Chime +5",
      sources: [{ type: "vendor", location: "Chloanne", detail: "After King's Ring", unlock: "King's Ring" }],
      farmOptions: [{ enemy: "Crystal Lizard", area: "Dragon Aerie", method: "Kill all 11", unlock: "Dragon Aerie" }],
    },
  ],
};
