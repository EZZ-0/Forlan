/**
 * Semi-fast / route constants with no dependency on areas.ts (avoids circular imports).
 */

/** Item IDs skipped on semi-fast route (optional bosses, summons, etc.). */
export const SEMI_FAST_SKIP_IDS = new Set<string>([
  "fg15", "fg13", "nm7", "ik7", "ik8", "bg8", "da8", "sr4", "d311", "d18", "d26", "d27", "d312",
  "lb10", "lb11", "ik11", "ik12", "ik13", "ik13a", "ik13b", "ik13c",
  "hc10", "pt5", "ht8", "mj8", "dp1", "dp2", "dp3", "dp4", "dp4a", "dp4b", "dp5", "dp6", "dp7", "dp8",
]);

/** Progression-critical item IDs for route-tier inference. */
export const ROUTE_EXPLICIT_IDS = new Set<string>([
  "fg5",
  "fg11",
  "fg17",
  "lb1",
  "lb2",
  "lb7",
  "hc1",
  "sw1",
  "sr5",
  "ik9",
  "bc8",
  "dc1",
  "uc6",
  "ak1",
  "da6",
  "tw1",
]);
