/** Soul Memory co-op tier bands (approximate community values). */

export interface SoulMemoryBand {
  min: number;
  max: number;
  label: string;
}

export const SOUL_MEMORY_BANDS: SoulMemoryBand[] = [
  { min: 0, max: 149_999, label: "Tier 0" },
  { min: 150_000, max: 399_999, label: "Tier 1" },
  { min: 400_000, max: 999_999, label: "Tier 2" },
  { min: 1_000_000, max: 1_999_999, label: "Tier 3" },
  { min: 2_000_000, max: 2_999_999, label: "Tier 4" },
  { min: 3_000_000, max: 4_999_999, label: "Tier 5" },
  { min: 5_000_000, max: 6_999_999, label: "Tier 6" },
  { min: 7_000_000, max: 9_999_999, label: "Tier 7" },
  { min: 10_000_000, max: 14_999_999, label: "Tier 8" },
  { min: 15_000_000, max: Infinity, label: "Tier 9" },
];

export function getSoulMemoryBand(soulMemory: number): SoulMemoryBand {
  return (
    SOUL_MEMORY_BANDS.find((b) => soulMemory >= b.min && soulMemory <= b.max) ??
    SOUL_MEMORY_BANDS[SOUL_MEMORY_BANDS.length - 1]
  );
}

/** Rough SM estimate from SL (for preview only). */
export function estimateSoulMemoryFromSl(sl: number): number {
  return Math.max(0, (sl - 1) * 12_000);
}
