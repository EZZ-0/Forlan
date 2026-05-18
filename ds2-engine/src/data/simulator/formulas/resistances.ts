/**
 * DS2 Build Simulator — Resistance formulas.
 * Base resistances from stats + equipment. Exact formula TBD.
 */

export interface ResistanceValues {
  physical: number;
  magic: number;
  fire: number;
  lightning: number;
  dark: number;
}

/** Base resistances at 0 stats (approximate) */
const BASE_RESISTANCES: ResistanceValues = {
  physical: 0,
  magic: 0,
  fire: 0,
  lightning: 0,
  dark: 0,
};

/**
 * Compute total resistances from base + armor.
 * Armor values are summed. Ring effects (e.g. Dark Clutch -50 phys) applied separately.
 */
export function computeResistances(
  armorResistances: Partial<ResistanceValues>[]
): ResistanceValues {
  const result = { ...BASE_RESISTANCES };

  for (const arm of armorResistances) {
    for (const key of Object.keys(result) as (keyof ResistanceValues)[]) {
      result[key] += arm[key] ?? 0;
    }
  }

  return result;
}
