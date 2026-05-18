/**
 * DS2 Build Simulator — Weapon AR and scaling formulas.
 * Supports upgrade level and infusion. Extensible for full per-level data.
 */

import type { SimulatorWeapon, WeaponAR, InfusionType } from "../types";

/** Scaling letter to approximate multiplier (at 40 stat). E=0.1, D=0.2, C=0.3, B=0.4, A=0.5, S=0.6 */
const SCALING_MULT: Record<string, number> = {
  E: 0.1,
  D: 0.2,
  C: 0.3,
  B: 0.4,
  A: 0.5,
  S: 0.6,
  "—": 0,
};

/** Upgrade multiplier: ~+6% per level. Extensible with per-level tables. */
function getUpgradeMultiplier(upgradeLevel: number, maxUpgrade: number): number {
  if (maxUpgrade <= 0) return 1;
  return 1 + (upgradeLevel / maxUpgrade) * 0.6;
}

/**
 * Get scaling bonus for a stat value and letter.
 */
function getScalingBonus(
  baseDamage: number,
  letter: string,
  statValue: number
): number {
  const mult = SCALING_MULT[letter] ?? 0;
  if (mult === 0) return 0;
  const effectiveStat = Math.min(statValue, 99);
  return Math.floor(baseDamage * mult * (effectiveStat / 40));
}

/**
 * Compute weapon AR with optional upgrade level and infusion.
 * Extensible: add per-level damage tables, infusion-specific scaling.
 */
export function computeWeaponAR(
  weapon: SimulatorWeapon,
  stats: { str: number; dex: number; int: number; fth: number },
  upgradeLevel?: number,
  infusion?: InfusionType | null
): WeaponAR {
  const result: WeaponAR = { physical: 0 };
  const upg = upgradeLevel ?? weapon.maxUpgrade;
  const mult = getUpgradeMultiplier(upg, weapon.maxUpgrade);

  let damage: Partial<Record<"physical" | "magic" | "fire" | "lightning" | "dark", number>> = { ...weapon.damage };
  let scaling = { ...weapon.scaling };

  if (infusion && weapon.infusions) {
    const variant = weapon.infusions.find((i) => i.infusion === infusion);
    if (variant) {
      if (variant.damage) damage = { ...damage, ...variant.damage };
      if (variant.scaling) scaling = { ...scaling, ...variant.scaling };
    }
  }

  const damageTypes = ["physical", "magic", "fire", "lightning", "dark"] as const;

  for (const dtype of damageTypes) {
    const base = (damage[dtype] ?? 0) * mult;
    if (base === 0) continue;

    let bonus = 0;
    if (dtype === "physical") {
      bonus += getScalingBonus(base, scaling.str ?? "—", stats.str);
      bonus += getScalingBonus(base, scaling.dex ?? "—", stats.dex);
    } else {
      bonus += getScalingBonus(base, scaling.int ?? "—", stats.int);
      bonus += getScalingBonus(base, scaling.fth ?? "—", stats.fth);
    }

    const total = Math.floor(base + bonus);
    switch (dtype) {
      case "physical":
        result.physical = total;
        break;
      case "magic":
        result.magic = total;
        break;
      case "fire":
        result.fire = total;
        break;
      case "lightning":
        result.lightning = total;
        break;
      case "dark":
        result.dark = total;
        break;
    }
  }

  return result;
}
