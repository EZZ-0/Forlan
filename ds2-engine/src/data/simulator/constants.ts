/**
 * DS2 Simulator — Constants for leveling, infusion, upgrades.
 * Extensible: add more infusion types, upgrade tiers, etc.
 */

import type { InfusionType } from "./types";

/** All infusion types. Ready to expand. */
export const INFUSION_TYPES: InfusionType[] = [
  "Fire",
  "Magic",
  "Lightning",
  "Dark",
  "Raw",
  "Poison",
  "Bleed",
  "Enchanted",
];

/** Build roadmap max SL (SL 11 + 140 levels) */
export const BUILD_MAX_SL = 151;

/** DS2 max SL (no cap / free leveling) */
export const FREE_MAX_SL = 838;

/** Max stat value (VGR, END, etc.) */
export const MAX_STAT = 99;
