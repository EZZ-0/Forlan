/** Damage tags aligned with enemy weakness/resistance vocabulary in enemies.ts */
export type BuildDamageType =
  | "Fire"
  | "Lightning"
  | "Magic"
  | "Dark"
  | "Poison"
  | "Bleed"
  | "Strike"
  | "Slash"
  | "Thrust"
  | "Physical";

export interface BuildDetailsProfile {
  philosophy: string;
  playstyle: string;
  weaponsSummary: string;
  pros: string[];
  cons: string[];
  /** Damage types this build exploits (enemy weakness = favorable matchup) */
  proDamage: BuildDamageType[];
  /** Damage types enemies often resist that this build relies on */
  conDamage: BuildDamageType[];
  /** Optional build-specific notes (e.g. agility math) */
  notes?: string[];
}

export type MatchupTier = "strong" | "good" | "neutral" | "poor" | "bad";

import type { EnemyEntry } from "../enemies";

export interface BuildMatchupBuckets {
  strong: EnemyEntry[];
  good: EnemyEntry[];
  neutral: EnemyEntry[];
  poor: EnemyEntry[];
  bad: EnemyEntry[];
}
