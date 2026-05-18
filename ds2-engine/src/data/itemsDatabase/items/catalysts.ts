/**
 * DS2 Items Database — Catalysts (staves, chimes, pyromancy).
 * Seed from simulator + buildItems.
 */

import type { ItemDatabaseEntry } from "../types";

export const DB_CATALYSTS: ItemDatabaseEntry[] = [
  {
    id: "sunset_staff",
    name: "Sunset Staff",
    category: "catalyst",
    subcategory: { catalystClass: "hex_chime" },
    weight: 3,
    stats: { scaling: { int: "B", fth: "B" } },
    effects: { spellDamage: "Dark" },
    location: { sourceType: "vendor", vendor: "Felkin", areaId: "huntsmans_copse" },
    guidance: {
      where: "Felkin (Huntsman's Copse) — FREE with 20 INT / 20 FTH BASE",
      howToGetThere: "Reach Huntsman's Copse. Felkin sits by the bridge. BASE stats only — rings/gear don't count!",
      howToObtain: "Talk to Felkin. Must have 20 INT and 20 FTH at base (no equipment).",
      warning: "20/20 BASE stats only — equipment does NOT count.",
      sources: [{ type: "vendor", location: "Felkin (Huntsman's Copse)", detail: "FREE — 20 INT / 20 FTH (BASE stats only)", unlock: "Huntsman's Copse" }],
      buildRef: "Infuse Dark at McDuff.",
    },
    buildRelevance: {
      "dark-melee-hexer": { phase: 3, role: "Primary dark catalyst", progressId: "build:sunset_staff" },
      "dark-chaos-assassin": { phase: 3, role: "Dark Weapon catalyst", progressId: "dca:sunset_staff" },
    },
    rarity: "unique",
    dlc: "base",
    source: "manual",
  },
  {
    id: "staff_of_wisdom",
    name: "Staff of Wisdom",
    category: "catalyst",
    subcategory: { catalystClass: "staff" },
    weight: 4,
    stats: { scaling: { int: "S" }, requirements: { int: 50 } },
    effects: { spellDamage: "Magic" },
    location: { sourceType: "trade", unlockRequirement: "Paledrake Soul" },
    guidance: {
      where: "Ornifex — trade Paledrake Soul (from Freja NG+ or Ascetic)",
      howToGetThere: "Defeat Duke's Dear Freja. Use Ascetic for Paledrake Soul. Trade at Ornifex (Dragon Shrine).",
      howToObtain: "Trade Paledrake Soul. Or rare drop from Crystal Lizard in Dragon Shrine.",
      sources: [
        { type: "trade", location: "Ornifex", detail: "Paledrake Soul (Freja NG+ or Ascetic)", unlock: "Dragon Shrine" },
        { type: "drop", location: "Crystal Lizard", detail: "Dragon Shrine — rare", unlock: "Dragon Shrine" },
      ],
      buildRef: "50 INT (spiceable to ~40). Twinkling ×15 to +5.",
    },
    buildRelevance: { phase: 6, role: "Pure sorcery catalyst", progressId: "build:staff_of_wisdom" },
    rarity: "limited",
    dlc: "base",
    source: "manual",
  },
  {
    id: "pyromancy_flame",
    name: "Pyromancy Flame",
    category: "catalyst",
    subcategory: { catalystClass: "pyromancy" },
    weight: 0,
    effects: { spellDamage: "Fire" },
    location: { sourceType: "vendor", vendor: "Rosabeth", unlockRequirement: "Fragrant Branch" },
    guidance: {
      where: "Rosabeth (Shaded Woods) — FREE after unpetrify",
      howToGetThere: "Use Fragrant Branch on Rosabeth in Shaded Woods.",
      howToObtain: "Exhaust dialogue after unpetrifying.",
      sources: [{ type: "vendor", location: "Rosabeth (Shaded Woods)", detail: "FREE after unpetrify", unlock: "Fragrant Branch" }],
      buildRef: "Upgrade with Fire Seeds. No infusion.",
    },
    buildRelevance: {
      "dark-melee-hexer": { phase: 3, role: "Fire spells", progressId: "build:pyromancy_flame" },
      "inferno-reaper": { phase: 1, role: "Primary pyromancy", progressId: "ir:pyromancy_flame" },
    },
    rarity: "unique",
    dlc: "base",
    source: "manual",
  },
  {
    id: "sorcerers_staff",
    name: "Sorcerer's Staff",
    category: "catalyst",
    subcategory: { catalystClass: "staff" },
    weight: 2,
    stats: { scaling: { int: "B" } },
    effects: { spellDamage: "Magic" },
    location: { sourceType: "buy", vendor: "Carhillion" },
    guidance: {
      where: "Carhillion (No-Man's Wharf) or starting gift",
      howToGetThere: "Reach No-Man's Wharf. Carhillion sells it.",
      howToObtain: "Buy or choose as starting gift.",
    },
    rarity: "renewable",
    dlc: "base",
    source: "manual",
  },
];
