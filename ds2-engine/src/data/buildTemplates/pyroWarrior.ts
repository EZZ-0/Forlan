/**
 * Pyro Warrior — STR + pyromancy
 * Source: DS2_ALL_BUILDS_A-Z #20
 */

import type { BuildTemplate } from "./types";
import { CLASS_BASE_STATS } from "./types";
import { generateLevelRoadmap } from "./levelGenerator";
import type { StatKey } from "../simulator/types";
import type { BuildStep } from "../buildChecklist";
import type { BuildItem } from "../buildItems";

const BASE = CLASS_BASE_STATS.warrior;

const PHASE_TARGETS: BuildTemplate["phaseTargets"] = {
  1: { VGR: 12, END: 10, VIT: 10, ATN: 8, STR: 20, DEX: 12, ADP: 9, INT: 6, FTH: 6 },
  2: { VGR: 17, END: 14, VIT: 14, ATN: 11, STR: 25, DEX: 12, ADP: 13, INT: 7, FTH: 7 },
  3: { VGR: 20, END: 17, VIT: 17, ATN: 14, STR: 29, DEX: 12, ADP: 16, INT: 8, FTH: 8 },
  4: { VGR: 25, END: 21, VIT: 21, ATN: 17, STR: 34, DEX: 12, ADP: 20, INT: 9, FTH: 9 },
  5: { VGR: 28, END: 24, VIT: 24, ATN: 19, STR: 38, DEX: 12, ADP: 23, INT: 10, FTH: 10 },
  6: { VGR: 30, END: 25, VIT: 25, ATN: 20, STR: 40, DEX: 12, ADP: 25, INT: 10, FTH: 10 },
};

const PHASE_PRIORITY: Record<number, StatKey[]> = {
  1: ["STR", "VGR", "END", "VIT", "ATN", "ADP", "INT", "FTH", "DEX"],
  2: ["STR", "ATN", "INT", "FTH", "VGR", "END", "VIT", "ADP", "DEX"],
  3: ["STR", "ATN", "INT", "FTH", "VGR", "END", "VIT", "ADP", "DEX"],
  4: ["STR", "VGR", "END", "VIT", "ATN", "INT", "FTH", "ADP", "DEX"],
  5: ["STR", "VGR", "END", "VIT", "ATN", "INT", "FTH", "ADP", "DEX"],
  6: ["STR", "VGR", "END", "VIT", "ATN", "INT", "FTH", "ADP", "DEX"],
};

const LEVELS = generateLevelRoadmap({
  startingClass: "warrior",
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  milestoneNotes: {
    "20:STR": "★ STR 20 — Fire Bastard Sword path",
    "28:STR": "★ Great Club req (14 STR 2H)",
    "10:INT": "★ 10/10 INT/FTH — pyro unlocked",
    "40:STR": "★ STR 40 — primary scaling",
    "150:STR": "★★ BUILD COMPLETE — SL 150",
  },
});

const BUILD_STEPS: BuildStep[] = [
  { id: "pw:0", progressId: "build:pw:mace", name: "Mace +10 (Warrior start)", areaId: "things_betwixt", phase: 1, type: "weapon", source: "Starting gear → Lenigrast" },
  { id: "pw:1", progressId: "fg5", name: "Lenigrast's Key", areaId: "forest_of_fallen_giants", phase: 1, type: "key", source: "Melentia (1,000 souls)" },
  { id: "pw:2", progressId: "fg12", name: "Open Lenigrast's shop", areaId: "majula", phase: 1, type: "key", source: "Return to Majula" },
  { id: "pw:3", progressId: "fg15", name: "Ring of Blades", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "Pursuer drop" },
  { id: "pw:4", progressId: "fg21", name: "Chloranthy Ring", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "FoFG Pharros ballista room" },
  { id: "pw:5", progressId: "sw1", name: "Unpetrify Rosabeth", areaId: "shaded_woods", phase: 2, type: "key", source: "Fragrant Branch on statue" },
  { id: "pw:6", progressId: "build:pyromancy_flame", name: "Pyromancy Flame +10", areaId: "shaded_woods", phase: 2, type: "catalyst", source: "Rosabeth after unpetrify" },
  { id: "pw:7", progressId: "build:pw:flame_swathe", name: "Flame Swathe", areaId: "shaded_woods", phase: 2, type: "spell", source: "Rosabeth — boss nuke" },
  { id: "pw:8", progressId: "build:pw:great_fireball", name: "Great Fireball", areaId: "shaded_woods", phase: 2, type: "spell", source: "Rosabeth" },
  { id: "pw:9", progressId: "lb2", name: "Dull Ember", areaId: "lost_bastille", phase: 2, type: "key", source: "Tower Apart chest" },
  { id: "pw:10", progressId: "lb7", name: "Give Dull Ember to McDuff", areaId: "lost_bastille", phase: 2, type: "key", source: "Fire Stone infusion" },
  { id: "pw:11", progressId: "gt6", name: "Great Club +10", areaId: "the_gutter", phase: 3, type: "weapon", source: "Gutter chest — 28 STR (14 STR 2H)" },
  { id: "pw:12", progressId: "build:pw:fire_great_club", name: "Fire infuse Great Club +10", areaId: "lost_bastille", phase: 3, type: "infusion", source: "McDuff Fire Stone + 2,000 souls" },
  { id: "pw:13", progressId: "ik14", name: "Flame Weapon", areaId: "iron_keep", phase: 3, type: "spell", source: "Iron Keep chest near Smelter Demon" },
  { id: "pw:14", progressId: "build:pw:bastard_sword", name: "Fire Bastard Sword +10 (backup)", areaId: "lost_bastille", phase: 2, type: "weapon", source: "McDuff buy — 20 STR / 12 DEX", optional: true },
  { id: "pw:15", progressId: "uc10", name: "Penal Handcuffs", areaId: "undead_crypt", phase: 4, type: "ring", source: "Corpse in boss corridor (+7.5% pyro)" },
  { id: "pw:16", progressId: "bc15", name: "Southern Ritual Band", areaId: "brightstone_cove", phase: 3, type: "ring", source: "Corpse in spider halls" },
  { id: "pw:17", progressId: "build:pw:warmth", name: "Warmth", areaId: "brightstone_cove", phase: 4, type: "spell", source: "Rat King covenant or Titchy Gren (Undead Purgatory)" },
  { id: "pw:18", progressId: "pt5", name: "Rat King covenant (Warmth alt)", areaId: "the_pit", phase: 4, type: "key", source: "Grave of Saints — Royal Rat Vanguard area", optional: true },
  { id: "pw:19", progressId: "da10", name: "Third Dragon Ring", areaId: "dragon_aerie", phase: 4, type: "ring", source: "Dragon Shrine chest" },
  { id: "pw:20", progressId: "tw7", name: "Ring of Blades +2", areaId: "throne_of_want", phase: 4, type: "ring", source: "Throne Watcher & Defender NG+" },
  { id: "pw:21", progressId: "build:pw:fire_seeds", name: "Farm Fire Seeds for Pyro Flame +10", areaId: "iron_keep", phase: 2, type: "key", source: "Alonne Knights, Desert Sorceresses" },
  { id: "pw:22", progressId: "ik9", name: "Old Iron King", areaId: "iron_keep", phase: 3, type: "key", source: "Progression — Flame Weapon area" },
  { id: "pw:23", progressId: "build:pw:pyro_10_10", name: "10/10 INT and FTH for pyro", areaId: "shaded_woods", phase: 2, type: "key", source: "Minimum caster stats — scales off INT+FTH sum" },
];

const BUILD_ITEMS: BuildItem[] = [
  { name: "Fire Great Club", type: "weapon", role: "Primary STR + fire", phase: 3, whereToFind: [{ type: "chest", location: "The Gutter", detail: "Then fire infuse at McDuff", unlock: "The Gutter" }], notes: "28 STR (14 STR 2H)." },
  { name: "Fire Bastard Sword", type: "weapon", role: "Faster backup", phase: 2, whereToFind: [{ type: "buy", location: "McDuff", detail: "Fire infuse after Dull Ember", unlock: "Lost Bastille" }], optional: true, notes: "20 STR / 12 DEX." },
  { name: "Pyromancy Flame", type: "catalyst", role: "Pyromancy", phase: 2, whereToFind: [{ type: "vendor", location: "Rosabeth", detail: "After unpetrify", unlock: "Shaded Woods" }] },
  { name: "Flame Weapon", type: "spell", role: "Weapon buff", phase: 3, whereToFind: [{ type: "chest", location: "Iron Keep", detail: "Near Smelter Demon", unlock: "Iron Keep" }] },
  { name: "Warmth", type: "spell", role: "Heal over time", phase: 4, whereToFind: [{ type: "vendor", location: "Rat King / Titchy Gren", detail: "Covenant or Undead Purgatory", unlock: "Grave of Saints / Purgatory" }] },
  { name: "Flame Swathe", type: "spell", role: "Boss nuke", phase: 2, whereToFind: [{ type: "vendor", location: "Rosabeth", detail: "After unpetrify" }] },
  { name: "Great Fireball", type: "spell", role: "Ranged pyro", phase: 2, whereToFind: [{ type: "vendor", location: "Rosabeth", detail: "After unpetrify" }] },
  { name: "Southern Ritual Band", type: "ring", role: "+3 spell slots", phase: 3, whereToFind: [{ type: "corpse", location: "Brightstone Cove", detail: "Spider halls" }] },
  { name: "Penal Handcuffs", type: "ring", role: "+7.5% pyromancy damage", phase: 4, whereToFind: [{ type: "corpse", location: "Undead Crypt", detail: "Boss corridor", unlock: "Undead Crypt" }] },
  { name: "Third Dragon Ring", type: "ring", role: "HP/Stamina/Equip", phase: 4, whereToFind: [{ type: "chest", location: "Dragon Shrine", detail: "Before Ancient Dragon", unlock: "Dragon Aerie" }] },
  { name: "Ring of Blades +2", type: "ring", role: "Physical AR on club", phase: 4, whereToFind: [{ type: "boss", location: "Throne Watcher & Defender", detail: "NG+", unlock: "Throne of Want" }] },
];

export const pyroWarrior: BuildTemplate = {
  id: "pyro-warrior",
  name: "Pyro Warrior",
  description: "STR melee with pyromancy support. Fire Great Club, Flame Weapon, Warmth heal. 10/10 INT/FTH for pyro.",
  source: "DS2_ALL_BUILDS_A-Z",
  startingClass: "warrior",
  baseStats: { ...BASE },
  levels: LEVELS,
  phaseInfo: [
    { num: 1, name: "STR + Mace", range: "SL 8→35", color: "#6b7c52", areas: "Betwixt → FoFG" },
    { num: 2, name: "Pyromancy Flame", range: "SL 36→55", color: "#c8a030", areas: "Shaded Woods" },
    { num: 3, name: "Great Club + Flame Weapon", range: "SL 56→95", color: "#d4862a", areas: "Gutter → Iron Keep" },
    { num: 4, name: "Complete Build", range: "SL 96→150", color: "#a03030", areas: "Crypt → DLC" },
  ],
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  weapons: [
    { name: "Fire Great Club +10", role: "Primary", phase: 3, infusion: "Fire", stats: "28 STR (2H 14)" },
    { name: "Fire Bastard Sword +10", role: "Backup", phase: 2, infusion: "Fire", stats: "20 STR / 12 DEX" },
    { name: "Pyromancy Flame +10", role: "Pyromancy", phase: 2, infusion: "N/A", stats: "10 INT / 10 FTH" },
  ],
  spells: [
    { name: "Flame Weapon", school: "Pyromancy", purpose: "Weapon buff" },
    { name: "Warmth", school: "Pyromancy", purpose: "Heal over time" },
    { name: "Flame Swathe", school: "Pyromancy", purpose: "Boss nuke" },
    { name: "Great Fireball", school: "Pyromancy", purpose: "Ranged" },
  ],
  keyRings: [
    { name: "Third Dragon Ring", effect: "HP/Stamina/Equip", source: "Dragon Shrine" },
    { name: "Ring of Blades +2", effect: "Physical AR", source: "Throne NG+" },
    { name: "Chloranthy Ring", effect: "Stamina regen", source: "FoFG" },
    { name: "Penal Handcuffs", effect: "+7.5% pyro", source: "Undead Crypt" },
    { name: "Southern Ritual Band", effect: "Spell slots", source: "Brightstone Cove" },
  ],
  ringsDetail: {
    priorityOrder: ["Penal Handcuffs", "Third Dragon Ring", "Ring of Blades +2", "Chloranthy Ring", "Southern Ritual Band"],
    groups: [
      { label: "Pyro / damage", ringNames: ["Penal Handcuffs", "Ring of Blades +2"] },
      { label: "Survival", ringNames: ["Third Dragon Ring", "Chloranthy Ring", "Southern Ritual Band"] },
    ],
    rings: [
      { name: "Penal Handcuffs", priority: "core", effect: "+7.5% pyromancy damage.", whereToGet: "Undead Crypt", howToGet: "Corpse in boss corridor.", phase: 4 },
      { name: "Third Dragon Ring", priority: "core", effect: "+12.5% HP, stamina, equip load — heavy armor.", whereToGet: "Dragon Shrine", howToGet: "Chest before Ancient Dragon.", phase: 4 },
      { name: "Ring of Blades +2", priority: "core", effect: "Flat physical AR on Great Club.", whereToGet: "Throne of Want", howToGet: "Throne Watcher & Defender NG+.", phase: 4 },
      { name: "Chloranthy Ring", priority: "core", effect: "Stamina for 2H club swings.", whereToGet: "FoFG", howToGet: "Pharros ballista room.", phase: 1 },
      { name: "Southern Ritual Band", priority: "optional", effect: "+3 slots for pyro suite.", whereToGet: "Brightstone Cove", howToGet: "Spider halls corpse.", phase: 3 },
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
        { type: "chest", location: "FoFG, Iron Keep", detail: "Fixed drops" },
      ],
      farmOptions: [
        { enemy: "Alonne Knight", area: "Iron Keep", method: "Decent rate. CoC.", unlock: "Iron Keep" },
        { enemy: "Desert Sorceress", area: "Earthen Peak", method: "Good rate. CoC.", unlock: "Earthen Peak" },
      ],
    },
    {
      item: "Fire Stone",
      purpose: "Fire infuse Great Club, Bastard Sword",
      sources: [{ type: "vendor", location: "Chloanne", detail: "After King's Ring", unlock: "King's Ring" }],
      farmOptions: [{ enemy: "Salamander", area: "Earthen Peak", method: "Decent drop", unlock: "Earthen Peak" }],
    },
    {
      item: "Titanite (Shards, Large, Chunks, Slab)",
      purpose: "Great Club +10, Mace +10",
      sources: [{ type: "vendor", location: "Lenigrast, McDuff, Chloanne", detail: "See Farming tab" }],
      farmOptions: [{ enemy: "Alonne Knight", area: "Iron Keep", method: "Chunks. CoC.", unlock: "Iron Keep" }],
    },
  ],
};
