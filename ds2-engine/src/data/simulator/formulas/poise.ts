/**
 * DS2 Build Simulator — Poise calculation.
 * Poise = sum of armor poise values. Determines stagger resistance.
 */

/**
 * Compute total poise from armor pieces.
 */
export function computePoise(armorPoiseValues: (number | undefined)[]): number {
  return armorPoiseValues.reduce((sum: number, p) => sum + (p ?? 0), 0);
}
