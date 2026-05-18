/**
 * DS2 Build Simulator — Spell damage formulas.
 * Spell AR = base (from spell) + catalyst scaling (INT/FTH).
 * Exact formula TBD; varies by spell and catalyst.
 */

import type { SimulatorCatalyst, SimulatorSpell } from "../types";

/** Scaling letter to approximate multiplier */
const SCALING_MULT: Record<string, number> = {
  E: 0.1,
  D: 0.2,
  C: 0.3,
  B: 0.4,
  A: 0.5,
  S: 0.6,
  "—": 0,
};

/**
 * Compute spell damage from catalyst and stats.
 * Simplified: base damage from spell + catalyst scaling bonus.
 */
export function computeSpellDamage(
  catalyst: SimulatorCatalyst,
  _spell: SimulatorSpell,
  stats: { int: number; fth: number }
): number {
  const intMult = SCALING_MULT[catalyst.scaling.int ?? "—"] ?? 0;
  const fthMult = SCALING_MULT[catalyst.scaling.fth ?? "—"] ?? 0;

  const intBonus = intMult * stats.int * 2;
  const fthBonus = fthMult * stats.fth * 2;

  const baseDamage = 100;
  return Math.floor(baseDamage + intBonus + fthBonus);
}
