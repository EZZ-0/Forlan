import { ENEMY_WEAKNESSES, type EnemyEntry } from "../enemies";
import type { BuildDetailsProfile, BuildDamageType, MatchupTier, BuildMatchupBuckets } from "./types";
import { getBuildDetailsProfile } from "./buildDetailsProfiles";

const PHYSICAL_SUBTYPES: BuildDamageType[] = ["Strike", "Slash", "Thrust"];

const DAMAGE_ALIASES: Record<string, BuildDamageType> = {
  fire: "Fire",
  lightning: "Lightning",
  magic: "Magic",
  dark: "Dark",
  poison: "Poison",
  bleed: "Bleed",
  strike: "Strike",
  slash: "Slash",
  thrust: "Thrust",
  physical: "Physical",
};

/** Parse free-text enemy tags into normalized damage types */
export function parseEnemyDamageTags(tags: string[]): BuildDamageType[] {
  const out = new Set<BuildDamageType>();
  for (const tag of tags) {
    const lower = tag.toLowerCase();
    for (const [key, type] of Object.entries(DAMAGE_ALIASES)) {
      if (lower.includes(key)) out.add(type);
    }
  }
  return [...out];
}

function damageMatches(buildType: BuildDamageType, enemyType: BuildDamageType): boolean {
  if (buildType === enemyType) return true;
  if (buildType === "Physical" && PHYSICAL_SUBTYPES.includes(enemyType)) return true;
  if (enemyType === "Physical" && PHYSICAL_SUBTYPES.includes(buildType)) return true;
  return false;
}

function countOverlap(buildTypes: BuildDamageType[], enemyTags: string[]): number {
  const enemyTypes = parseEnemyDamageTags(enemyTags);
  let n = 0;
  for (const pro of buildTypes) {
    if (enemyTypes.some((e) => damageMatches(pro, e))) n++;
  }
  return n;
}

export function scoreEnemyMatchup(
  profile: BuildDetailsProfile,
  enemy: EnemyEntry
): MatchupTier {
  const weakHits = countOverlap(profile.proDamage, enemy.weaknesses);
  const resistHits = countOverlap(profile.proDamage, enemy.resistances);
  const conResist = countOverlap(profile.conDamage, enemy.resistances);
  const conWeak = countOverlap(profile.conDamage, enemy.weaknesses);

  let score = weakHits * 2 - resistHits * 3 - conResist + conWeak * 0.5;

  if (profile.proDamage.length === 0) return "neutral";

  if (score >= 4) return "strong";
  if (score >= 2) return "good";
  if (score <= -4) return "bad";
  if (score <= -2) return "poor";
  return "neutral";
}

export function getEnemyMatchupTier(
  buildId: string,
  enemy: EnemyEntry
): MatchupTier | null {
  const profile = getBuildDetailsProfile(buildId);
  if (!profile) return null;
  return scoreEnemyMatchup(profile, enemy);
}

export function getBuildMatchupBuckets(buildId: string): BuildMatchupBuckets {
  const profile = getBuildDetailsProfile(buildId);
  const buckets: BuildMatchupBuckets = {
    strong: [],
    good: [],
    neutral: [],
    poor: [],
    bad: [],
  };
  if (!profile) return buckets;

  for (const enemy of ENEMY_WEAKNESSES) {
    const tier = scoreEnemyMatchup(profile, enemy);
    buckets[tier].push(enemy);
  }

  const sortByName = (a: EnemyEntry, b: EnemyEntry) => a.name.localeCompare(b.name);
  buckets.strong.sort(sortByName);
  buckets.good.sort(sortByName);
  buckets.neutral.sort(sortByName);
  buckets.poor.sort(sortByName);
  buckets.bad.sort(sortByName);

  return buckets;
}

export function formatAffinityLabel(type: BuildDamageType): string {
  if (type === "Physical") return "Physical damage";
  return `${type} damage`;
}

export const MATCHUP_TIER_META: Record<
  MatchupTier,
  { label: string; color: string; bg: string }
> = {
  strong: {
    label: "Strong against",
    color: "#6b9e3a",
    bg: "rgba(107,158,58,0.15)",
  },
  good: {
    label: "Good against",
    color: "#8ab85a",
    bg: "rgba(107,158,58,0.08)",
  },
  neutral: {
    label: "Neutral",
    color: "#8a7e6d",
    bg: "rgba(58,52,42,0.3)",
  },
  poor: {
    label: "Poor against",
    color: "#d4652a",
    bg: "rgba(212,101,42,0.12)",
  },
  bad: {
    label: "Bad against",
    color: "#c44040",
    bg: "rgba(196,64,64,0.12)",
  },
};
