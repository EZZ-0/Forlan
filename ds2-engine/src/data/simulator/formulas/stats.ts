/**
 * DS2 Build Simulator — Core stat formulas (HP, stamina, equip load).
 * Source: Fextralife Stats, community research. Formulas are approximate.
 */

/** Base HP at VGR 0 (class-dependent; Sorcerer ~100) */
const BASE_HP = 100;

/** VGR 1-20: +30 HP per point. VGR 21-50: +20 HP per point. Soft cap at 50. */
export function computeHP(vgr: number): number {
  if (vgr <= 20) {
    return BASE_HP + vgr * 30;
  }
  return BASE_HP + 20 * 30 + (vgr - 20) * 20;
}

/** Base stamina at END 0 */
const BASE_STAMINA = 80;

/** END: ~2 stamina per point. Soft cap around 20. */
export function computeStamina(end: number): number {
  return BASE_STAMINA + end * 2;
}

/** Base equip load at VIT 0 (class-dependent; ~50) */
const BASE_EQUIP_LOAD = 50;

/** VIT: ~2 equip load per point */
export function computeEquipLoad(vit: number): number {
  return BASE_EQUIP_LOAD + vit * 2;
}

/**
 * Get roll type from equip load percentage.
 * <25% fast, 25-70% mid, >70% fat
 */
export function getRollType(equipLoadPct: number): "fast" | "mid" | "fat" {
  if (equipLoadPct < 25) return "fast";
  if (equipLoadPct <= 70) return "mid";
  return "fat";
}
