/**
 * Hand-written build rollout tracker.
 * Update when a build is promoted from generated JSON → full TS override.
 * Plan: .cursor/plans/handwritten_builds_execution.plan.md
 */

export type HandwrittenBuildStatus = "complete" | "in_progress" | "generated";

/** A–Z build order (#1–21) */
export const BUILD_ROLLOUT_ORDER = [
  "dark-melee-hexer",
  "inferno-reaper",
  "the-destroyer",
  "dark-cleric",
  "lord-of-lightning",
  "moonlight-battlemage",
  "pure-int-mlgs",
  "lacerating-blood",
  "oro-blacksteel",
  "dark-chaos-assassin",
  "flame-prince",
  "quality-dark",
  "master-dex",
  "tank-executioner",
  "ninja-warrior",
  "polearm-paladin",
  "belmont-family",
  "chime-hammer-hexer",
  "blue-flame-mage",
  "pyro-warrior",
  "dark-red-mage",
] as const;

export type BuildRolloutId = (typeof BUILD_ROLLOUT_ORDER)[number];

export const HANDWRITTEN_BUILD_STATUS: Record<BuildRolloutId, HandwrittenBuildStatus> = {
  "dark-melee-hexer": "complete",
  "inferno-reaper": "complete",
  "the-destroyer": "complete",
  "dark-cleric": "complete",
  "lord-of-lightning": "complete",
  "moonlight-battlemage": "complete",
  "pure-int-mlgs": "complete",
  "lacerating-blood": "complete",
  "oro-blacksteel": "complete",
  "dark-chaos-assassin": "complete",
  "flame-prince": "complete",
  "quality-dark": "complete",
  "master-dex": "complete",
  "tank-executioner": "complete",
  "ninja-warrior": "complete",
  "polearm-paladin": "complete",
  "belmont-family": "complete",
  "chime-hammer-hexer": "complete",
  "blue-flame-mage": "complete",
  "pyro-warrior": "complete",
  "dark-red-mage": "complete",
};

export function isHandcraftedBuild(id: string): boolean {
  return HANDWRITTEN_BUILD_STATUS[id as BuildRolloutId] === "complete";
}

export function getNextGeneratedBuildId(): BuildRolloutId | undefined {
  return BUILD_ROLLOUT_ORDER.find((id) => HANDWRITTEN_BUILD_STATUS[id] === "generated");
}

export function countHandwrittenComplete(): number {
  return BUILD_ROLLOUT_ORDER.filter((id) => HANDWRITTEN_BUILD_STATUS[id] === "complete").length;
}
