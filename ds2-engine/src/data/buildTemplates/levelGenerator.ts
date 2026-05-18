import type { LevelEntry } from "../build";
import type { StatKey } from "../simulator/types";
import { CLASS_BASE_STATS, type StartingClass } from "./types";

const STAT_KEYS: StatKey[] = ["VGR", "END", "VIT", "ATN", "STR", "DEX", "ADP", "INT", "FTH"];

/** Starting soul level per class (SotFS) */
export const STARTING_SL: Record<StartingClass, number> = {
  warrior: 7,
  knight: 12,
  swordsman: 9,
  bandit: 11,
  cleric: 14,
  sorcerer: 11,
  explorer: 10,
  deprived: 1,
};

export interface LevelGenConfig {
  startingClass: StartingClass;
  phaseTargets: Record<number, Partial<Record<StatKey, number>>>;
  phasePriority: Record<number, StatKey[]>;
  maxSl?: number;
  milestoneNotes?: Record<string, string>;
  /** Override base stats; defaults to CLASS_BASE_STATS */
  baseStats?: Record<StatKey, number>;
}

function phaseForStats(
  stats: Record<StatKey, number>,
  phaseTargets: Record<number, Partial<Record<StatKey, number>>>
): number {
  const phases = Object.keys(phaseTargets)
    .map(Number)
    .sort((a, b) => a - b);
  for (const p of phases) {
    const targets = phaseTargets[p];
    if (!targets) continue;
    for (const stat of STAT_KEYS) {
      const t = targets[stat];
      if (t !== undefined && stats[stat] < t) return p;
    }
  }
  return phases[phases.length - 1] ?? 6;
}

function pickNextStat(
  stats: Record<StatKey, number>,
  phase: number,
  phaseTargets: Record<number, Partial<Record<StatKey, number>>>,
  phasePriority: Record<number, StatKey[]>
): StatKey | null {
  const targets = phaseTargets[phase] ?? {};
  const order = phasePriority[phase] ?? STAT_KEYS;
  for (const stat of order) {
    const t = targets[stat];
    if (t !== undefined && stats[stat] < t) return stat;
  }
  return null;
}

function overflowStat(stats: Record<StatKey, number>, overflowPriority: StatKey[]): StatKey {
  for (const stat of overflowPriority) {
    if (stats[stat] < 99) return stat;
  }
  return "VGR";
}

/**
 * Generate SL-by-SL roadmap from phase targets (same shape as Dark Melee Hexer LEVELS).
 */
export function generateLevelRoadmap(config: LevelGenConfig): LevelEntry[] {
  const {
    startingClass,
    phaseTargets,
    phasePriority,
    maxSl = 150,
    milestoneNotes = {},
    baseStats = CLASS_BASE_STATS[startingClass],
  } = config;

  const stats = { ...baseStats } as Record<StatKey, number>;
  const startSl = STARTING_SL[startingClass];
  const entries: LevelEntry[] = [];
  let sl = startSl + 1;

  const allPhases = Object.keys(phaseTargets)
    .map(Number)
    .sort((a, b) => a - b);
  const lastPhase = allPhases[allPhases.length - 1] ?? 6;
  const overflowPriority: StatKey[] =
    phasePriority[lastPhase] ?? ["VGR", "END", "ATN", "STR", "DEX", "INT", "FTH", "ADP", "VIT"];

  while (sl <= maxSl) {
    let phase = phaseForStats(stats, phaseTargets);
    let stat = pickNextStat(stats, phase, phaseTargets, phasePriority);

    if (!stat) {
      const allMet = allPhases.every((p) => !pickNextStat(stats, p, phaseTargets, phasePriority));
      if (allMet) {
        phase = lastPhase;
        stat = overflowStat(stats, overflowPriority);
      } else {
        phase = phaseForStats(stats, phaseTargets);
        stat = pickNextStat(stats, phase, phaseTargets, phasePriority) ?? overflowStat(stats, overflowPriority);
      }
    }

    stats[stat] += 1;
    const noteKey = `${sl}:${stat}:${stats[stat]}`;
    const note = milestoneNotes[noteKey] ?? milestoneNotes[`${sl}:${stat}`] ?? milestoneNotes[String(sl)] ?? "";
    entries.push({ sl, stat, value: stats[stat], phase, note });
    sl += 1;
  }

  return entries;
}

export function defaultPhaseInfo(
  phases: { num: number; name: string; range: string; color: string; areas: string }[]
) {
  return phases;
}
