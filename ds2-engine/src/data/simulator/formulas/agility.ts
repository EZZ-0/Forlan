/**
 * DS2 Build Simulator — Agility formulas.
 * Source: Fextralife Agility page. AGI = ADP*0.75 + ATN*0.25.
 */

/** Roll iframe breakpoints: AGL investment -> iframes */
export const ROLL_IFRAME_BREAKPOINTS: [number, number][] = [
  [1, 6],
  [2, 7],
  [5, 8],
  [8, 9],
  [12, 10],
  [16, 11],
  [19, 12],
  [25, 13],
  [33, 14],
  [53, 15],
  [72, 16],
  [99, 17],
];

/** Backstep iframe breakpoints: AGL investment -> iframes */
export const BACKSTEP_IFRAME_BREAKPOINTS: [number, number][] = [
  [1, 2],
  [4, 3],
  [7, 4],
  [11, 5],
  [16, 6],
  [20, 7],
  [28, 8],
  [45, 9],
  [68, 10],
  [99, 11],
];

/** Item use speed: AGL range -> multiplier (0.97 = 97%) */
export const ITEM_USE_SPEED: [number, number][] = [
  [85, 0.97],
  [91, 0.99],
  [92, 1.01],
  [93, 1.03],
  [94, 1.06],
  [95, 1.09],
  [96, 1.12],
  [97, 1.13],
  [98, 1.15],
  [99, 1.17],
  [100, 1.2],
];

/**
 * Compute AGI investment from ADP and ATN.
 * Formula: floor(ADP * 0.75 + ATN * 0.25)
 */
export function computeAgilityInvestment(adp: number, atn: number): number {
  return Math.floor(adp * 0.75 + atn * 0.25);
}

/**
 * Get display AGI value (85-120 range). Investment 1 = 85(a), etc.
 * Simplified: investment maps to breakpoint AGI.
 */
export function investmentToDisplayAGI(investment: number): number {
  if (investment <= 0) return 85;
  if (investment >= 99) return 120;
  const breakpoints = [1, 2, 5, 8, 12, 16, 19, 25, 33, 53, 72, 99];
  const aglValues = [85, 85, 85, 88, 92, 96, 99, 105, 110, 113, 116, 120];
  for (let i = breakpoints.length - 1; i >= 0; i--) {
    if (investment >= breakpoints[i]) return aglValues[i];
  }
  return 85;
}

/**
 * Get roll iframes from AGI investment.
 */
export function getRollIframes(investment: number): number {
  for (let i = ROLL_IFRAME_BREAKPOINTS.length - 1; i >= 0; i--) {
    if (investment >= ROLL_IFRAME_BREAKPOINTS[i][0]) {
      return ROLL_IFRAME_BREAKPOINTS[i][1];
    }
  }
  return 6;
}

/**
 * Get backstep iframes from AGI investment.
 */
export function getBackstepIframes(investment: number): number {
  for (let i = BACKSTEP_IFRAME_BREAKPOINTS.length - 1; i >= 0; i--) {
    if (investment >= BACKSTEP_IFRAME_BREAKPOINTS[i][0]) {
      return BACKSTEP_IFRAME_BREAKPOINTS[i][1];
    }
  }
  return 2;
}

/**
 * Get item use speed multiplier from AGI.
 */
export function getItemUseSpeedMultiplier(agi: number): number {
  for (let i = ITEM_USE_SPEED.length - 1; i >= 0; i--) {
    if (agi >= ITEM_USE_SPEED[i][0]) {
      return ITEM_USE_SPEED[i][1];
    }
  }
  return 0.97;
}
