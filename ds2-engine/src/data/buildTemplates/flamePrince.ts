/**
 * Flame Prince of the Deserts — pyromancy / fire weapons
 * Source: DS2_ALL_BUILDS_A-Z #11
 */

import type { BuildTemplate } from "./types";
import { CLASS_BASE_STATS } from "./types";
import { generateLevelRoadmap } from "./levelGenerator";
import type { StatKey } from "../simulator/types";
import type { BuildStep } from "../buildChecklist";
import type { BuildItem } from "../buildItems";

const BASE = CLASS_BASE_STATS.explorer;

const PHASE_TARGETS: BuildTemplate["phaseTargets"] = {
  1: { VGR: 9, END: 10, VIT: 8, ATN: 14, STR: 12, DEX: 12, ADP: 14, INT: 7, FTH: 7 },
  2: { VGR: 12, END: 14, VIT: 9, ATN: 21, STR: 14, DEX: 14, ADP: 16, INT: 8, FTH: 8 },
  3: { VGR: 14, END: 17, VIT: 9, ATN: 27, STR: 16, DEX: 16, ADP: 17, INT: 9, FTH: 9 },
  4: { VGR: 17, END: 21, VIT: 10, ATN: 34, STR: 18, DEX: 18, ADP: 18, INT: 9, FTH: 9 },
  5: { VGR: 19, END: 24, VIT: 10, ATN: 40, STR: 19, DEX: 19, ADP: 20, INT: 10, FTH: 10 },
  6: { VGR: 20, END: 25, VIT: 10, ATN: 43, STR: 20, DEX: 20, ADP: 20, INT: 10, FTH: 10 },
};

const PHASE_PRIORITY: Record<number, StatKey[]> = {
  1: ["STR", "DEX", "ATN", "VGR", "END", "ADP", "VIT", "INT", "FTH"],
  2: ["ATN", "STR", "DEX", "INT", "FTH", "VGR", "END", "ADP", "VIT"],
  3: ["ATN", "STR", "DEX", "INT", "FTH", "VGR", "END", "ADP", "VIT"],
  4: ["ATN", "STR", "DEX", "VGR", "END", "ADP", "VIT", "INT", "FTH"],
  5: ["ATN", "VGR", "END", "STR", "DEX", "ADP", "VIT", "INT", "FTH"],
  6: ["ATN", "VGR", "END", "STR", "DEX", "ADP", "VIT", "INT", "FTH"],
};

const LEVELS = generateLevelRoadmap({
  startingClass: "explorer",
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  milestoneNotes: {
    "12:STR": "★ Fire Longsword (FoFG)",
    "21:ATN": "★ Pyromancy Flame + Flame Swathe",
    "27:ATN": "★ Flame Weapon + Great Chaos Fireball",
    "43:ATN": "★ 2× Forbidden Sun casts",
    "150:ATN": "★★ BUILD COMPLETE — SL 150",
  },
});

const BUILD_STEPS: BuildStep[] = [
  { id: "fp:0", progressId: "fg11", name: "Fire Longsword", areaId: "forest_of_fallen_giants", phase: 1, type: "weapon", source: "FoFG chest near Cardinal Tower" },
  { id: "fp:1", progressId: "fg5", name: "Lenigrast's Key", areaId: "forest_of_fallen_giants", phase: 1, type: "key", source: "Melentia (1,000 souls)" },
  { id: "fp:2", progressId: "fg12", name: "Open Lenigrast's shop", areaId: "majula", phase: 1, type: "key", source: "Return to Majula" },
  { id: "fp:3", progressId: "fg15", name: "Ring of Blades", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "Pursuer drop" },
  { id: "fp:4", progressId: "fg21", name: "Chloranthy Ring", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "FoFG Pharros ballista room" },
  { id: "fp:5", progressId: "build:fp:fire_ls_plus", name: "Fire Longsword +10", areaId: "forest_of_fallen_giants", phase: 1, type: "weapon", source: "Lenigrast upgrades — innate fire damage" },
  { id: "fp:6", progressId: "sw1", name: "Unpetrify Rosabeth", areaId: "shaded_woods", phase: 2, type: "key", source: "Fragrant Branch on statue" },
  { id: "fp:7", progressId: "build:pyromancy_flame", name: "Pyromancy Flame +10", areaId: "shaded_woods", phase: 2, type: "catalyst", source: "Rosabeth after unpetrify" },
  { id: "fp:8", progressId: "build:fp:flame_swathe", name: "Flame Swathe", areaId: "shaded_woods", phase: 2, type: "spell", source: "Rosabeth (buy after unpetrify)" },
  { id: "fp:9", progressId: "lb2", name: "Dull Ember", areaId: "lost_bastille", phase: 2, type: "key", source: "Tower Apart chest" },
  { id: "fp:10", progressId: "lb7", name: "Give Dull Ember to McDuff", areaId: "lost_bastille", phase: 2, type: "key", source: "Fire Stone infusion" },
  { id: "fp:11", progressId: "ik14", name: "Flame Weapon", areaId: "iron_keep", phase: 3, type: "spell", source: "Chest near Smelter Demon (Iron Keep)" },
  { id: "fp:12", progressId: "build:fp:great_chaos_fireball", name: "Great Chaos Fireball", areaId: "iron_keep", phase: 3, type: "spell", source: "Iron Keep chest" },
  { id: "fp:13", progressId: "build:fp:bk_halberd", name: "Fire Black Knight Halberd +5 (optional)", areaId: "iron_keep", phase: 3, type: "weapon", source: "Black Knight drop — fire infuse at McDuff", optional: true },
  { id: "fp:14", progressId: "ak7", name: "Navlaan (Aldia's Keep)", areaId: "aldias_keep", phase: 3, type: "key", source: "Talk hollow; pull lever to spawn vendor side" },
  { id: "fp:15", progressId: "ak12", name: "Forbidden Sun", areaId: "aldias_keep", phase: 3, type: "spell", source: "Navlaan (after lever) — primary nuke" },
  { id: "fp:16", progressId: "uc10", name: "Penal Handcuffs", areaId: "undead_crypt", phase: 4, type: "ring", source: "Corpse in boss corridor (+7.5% pyro)" },
  { id: "fp:17", progressId: "bc15", name: "Southern Ritual Band", areaId: "brightstone_cove", phase: 3, type: "ring", source: "Corpse in spider halls" },
  { id: "fp:18", progressId: "build:fp:southern_ritual_2", name: "Southern Ritual Band +2", areaId: "brightstone_cove", phase: 4, type: "ring", source: "Scorpioness Najka NG+" },
  { id: "fp:19", progressId: "build:fp:chaos_storm", name: "Chaos Storm", areaId: "brightstone_cove", phase: 4, type: "spell", source: "Upper building chest", optional: true },
  { id: "fp:20", progressId: "da10", name: "Third Dragon Ring", areaId: "dragon_aerie", phase: 4, type: "ring", source: "Dragon Shrine chest before Ancient Dragon" },
  { id: "fp:21", progressId: "build:fp:fire_infuse", name: "Fire infuse weapons at McDuff", areaId: "lost_bastille", phase: 3, type: "infusion", source: "Fire Stone + 2,000 souls each" },
  { id: "fp:22", progressId: "ik13c", name: "Black Knight Greatsword (late fire melee)", areaId: "iron_keep", phase: 3, type: "weapon", source: "Black Knight rare drop — Belfry Sol illusory room", optional: true },
  { id: "fp:23", progressId: "build:fp:atn_43", name: "ATN 43 — double Forbidden Sun", areaId: "aldias_keep", phase: 4, type: "key", source: "Level ATN for 2 casts of Forbidden Sun" },
  { id: "fp:24", progressId: "build:fp:fire_seeds", name: "Farm Fire Seeds for Pyro Flame +10", areaId: "iron_keep", phase: 2, type: "key", source: "Alonne Knights, Desert Sorceresses, chests" },
];

const BUILD_ITEMS: BuildItem[] = [
  { name: "Fire Longsword", type: "weapon", role: "Early fire melee", phase: 1, whereToFind: [{ type: "chest", location: "FoFG", detail: "Near Cardinal Tower", unlock: "FoFG" }], notes: "10 STR / 9 DEX. Innate fire — no infusion needed early." },
  { name: "Fire Black Knight Halberd", type: "weapon", role: "Late fire polearm", phase: 3, whereToFind: [{ type: "drop", location: "Black Knight", detail: "Iron Keep — fire infuse", unlock: "Iron Keep" }], optional: true, notes: "22 STR / 18 DEX." },
  { name: "Pyromancy Flame", type: "catalyst", role: "Primary pyromancy", phase: 2, whereToFind: [{ type: "vendor", location: "Rosabeth", detail: "After unpetrify in Shaded Woods", unlock: "Fragrant Branch" }] },
  { name: "Forbidden Sun", type: "spell", role: "Primary nuke — 2 casts at ATN 43", phase: 3, whereToFind: [{ type: "vendor", location: "Navlaan", detail: "Pull lever at Aldia's Keep", unlock: "Aldia's Keep" }] },
  { name: "Flame Swathe", type: "spell", role: "Boss nuke", phase: 2, whereToFind: [{ type: "vendor", location: "Rosabeth", detail: "After unpetrify" }] },
  { name: "Great Chaos Fireball", type: "spell", role: "AoE lava pit", phase: 3, whereToFind: [{ type: "chest", location: "Iron Keep", detail: "Near Smelter area", unlock: "Iron Keep" }] },
  { name: "Flame Weapon", type: "spell", role: "Weapon buff", phase: 3, whereToFind: [{ type: "chest", location: "Iron Keep", detail: "Near Smelter Demon", unlock: "Iron Keep" }] },
  { name: "Chaos Storm", type: "spell", role: "AoE fire pillars", phase: 4, whereToFind: [{ type: "chest", location: "Brightstone Cove", detail: "Upper building" }], optional: true },
  { name: "Southern Ritual Band", type: "ring", role: "+3 spell slots", phase: 3, whereToFind: [{ type: "corpse", location: "Brightstone Cove", detail: "Spider halls", unlock: "Brightstone Cove" }] },
  { name: "Southern Ritual Band +2", type: "ring", role: "+3 slots upgrade", phase: 4, whereToFind: [{ type: "boss", location: "Scorpioness Najka", detail: "NG+", unlock: "Brightstone Cove" }] },
  { name: "Penal Handcuffs", type: "ring", role: "+7.5% pyromancy damage", phase: 4, whereToFind: [{ type: "corpse", location: "Undead Crypt", detail: "Boss corridor", unlock: "Undead Crypt" }] },
  { name: "Third Dragon Ring", type: "ring", role: "HP/Stamina/Equip Load", phase: 4, whereToFind: [{ type: "chest", location: "Dragon Shrine", detail: "Before Ancient Dragon fog", unlock: "Dragon Aerie" }] },
  { name: "Ring of Blades", type: "ring", role: "Physical AR on melee", phase: 1, whereToFind: [{ type: "boss", location: "Pursuer", detail: "Guaranteed", unlock: "FoFG" }] },
  { name: "Chloranthy Ring", type: "ring", role: "Stamina regen", phase: 1, whereToFind: [{ type: "corpse", location: "FoFG", detail: "Pharros ballista room", unlock: "FoFG" }] },
];

export const flamePrince: BuildTemplate = {
  id: "flame-prince",
  name: "Flame Prince of the Deserts",
  description: "Pyromancy primary. Fire Longsword, Forbidden Sun nuke, Penal Handcuffs. Explorer ADP start.",
  source: "DS2_ALL_BUILDS_A-Z",
  startingClass: "explorer",
  baseStats: { ...BASE },
  levels: LEVELS,
  phaseInfo: [
    { num: 1, name: "Fire Longsword", range: "SL 10→40", color: "#6b7c52", areas: "Betwixt → FoFG" },
    { num: 2, name: "Pyromancy Flame", range: "SL 41→65", color: "#c8a030", areas: "Shaded Woods" },
    { num: 3, name: "Forbidden Sun", range: "SL 66→100", color: "#d4862a", areas: "Iron Keep → Aldia's" },
    { num: 4, name: "Complete Build", range: "SL 101→150", color: "#a03030", areas: "Crypt → DLC" },
  ],
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  weapons: [
    { name: "Fire Longsword +10", role: "Early melee", phase: 1, infusion: "Fire (innate)", stats: "10 STR / 9 DEX" },
    { name: "Fire Black Knight Halberd +5", role: "Late fire melee", phase: 3, infusion: "Fire", stats: "22 STR / 18 DEX" },
    { name: "Pyromancy Flame +10", role: "Pyromancy", phase: 2, infusion: "N/A", stats: "None" },
  ],
  spells: [
    { name: "Forbidden Sun", school: "Pyromancy", purpose: "Primary nuke (×2 at ATN 43)" },
    { name: "Flame Swathe", school: "Pyromancy", purpose: "Boss nuke" },
    { name: "Great Chaos Fireball", school: "Pyromancy", purpose: "AoE" },
    { name: "Flame Weapon", school: "Pyromancy", purpose: "Weapon buff" },
    { name: "Chaos Storm", school: "Pyromancy", purpose: "AoE pillars" },
  ],
  keyRings: [
    { name: "Southern Ritual Band +2", effect: "+3 spell slots", source: "Najka NG+" },
    { name: "Penal Handcuffs", effect: "+7.5% pyro damage", source: "Undead Crypt" },
    { name: "Third Dragon Ring", effect: "HP/Stamina/Equip", source: "Dragon Shrine" },
    { name: "Chloranthy Ring", effect: "Stamina regen", source: "FoFG" },
    { name: "Ring of Blades", effect: "Physical AR", source: "Pursuer" },
  ],
  ringsDetail: {
    priorityOrder: ["Penal Handcuffs", "Southern Ritual Band +2", "Third Dragon Ring", "Chloranthy Ring", "Ring of Blades", "Southern Ritual Band"],
    groups: [
      { label: "Pyro core", ringNames: ["Penal Handcuffs", "Southern Ritual Band +2", "Southern Ritual Band"] },
      { label: "Survival / melee", ringNames: ["Third Dragon Ring", "Chloranthy Ring", "Ring of Blades"] },
    ],
    rings: [
      { name: "Penal Handcuffs", priority: "core", effect: "+7.5% pyromancy damage.", whereToGet: "Undead Crypt", howToGet: "Corpse in boss corridor.", phase: 4 },
      { name: "Southern Ritual Band +2", priority: "core", effect: "+3 spell slots — Forbidden Sun + buffs.", whereToGet: "Brightstone Cove", howToGet: "Scorpioness Najka in NG+.", phase: 4 },
      { name: "Third Dragon Ring", priority: "core", effect: "+12.5% HP, stamina, equip load.", whereToGet: "Dragon Shrine", howToGet: "Chest before Ancient Dragon fog.", phase: 4 },
      { name: "Chloranthy Ring", priority: "core", effect: "Stamina for casting and melee.", whereToGet: "FoFG", howToGet: "Pharros ballista room.", phase: 1 },
      { name: "Ring of Blades", priority: "optional", effect: "Flat physical AR on Fire Longsword.", whereToGet: "FoFG", howToGet: "Pursuer drop.", phase: 1 },
      { name: "Southern Ritual Band", priority: "optional", effect: "+3 slots until +2.", whereToGet: "Brightstone Cove", howToGet: "Spider halls corpse.", phase: 3 },
    ],
  },
  buildSteps: BUILD_STEPS,
  buildItems: BUILD_ITEMS,
  buildMaterialFarms: [
    {
      item: "Fire Seeds",
      purpose: "Pyromancy Flame +10",
      sources: [
        { type: "vendor", location: "Straid, Chloanne", detail: "Limited stock" },
        { type: "chest", location: "FoFG, Iron Keep, Memories", detail: "Various fixed drops" },
      ],
      farmOptions: [
        { enemy: "Fire Salamander", area: "FoFG (salamander pit)", method: "Rare. CoC.", unlock: "FoFG" },
        { enemy: "Alonne Knight", area: "Iron Keep", method: "Decent rate. CoC.", unlock: "Iron Keep" },
        { enemy: "Desert Sorceress", area: "Earthen Peak", method: "Good rate. CoC.", unlock: "Earthen Peak" },
      ],
    },
    {
      item: "Fire Stone",
      purpose: "Fire infusion (BK weapons, backup gear)",
      sources: [
        { type: "vendor", location: "Chloanne", detail: "After King's Ring", unlock: "King's Ring" },
        { type: "chest", location: "Iron Keep, Earthen Peak", detail: "Fixed locations" },
      ],
      farmOptions: [
        { enemy: "Salamander", area: "Earthen Peak", method: "Decent drop rate", unlock: "Earthen Peak" },
      ],
    },
    {
      item: "Titanite (Shards, Large, Chunks, Slab)",
      purpose: "Fire Longsword +10",
      sources: [{ type: "vendor", location: "Lenigrast, McDuff, Chloanne", detail: "See Farming tab" }],
      farmOptions: [
        { enemy: "Crystal Lizard", area: "Black Gulch, Dragon Aerie", method: "Chunks", unlock: "Area access" },
      ],
    },
  ],
};
