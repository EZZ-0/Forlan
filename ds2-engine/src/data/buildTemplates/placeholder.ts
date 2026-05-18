import type { BuildTemplate } from "./types";
import { CLASS_BASE_STATS } from "./types";

export function createPlaceholderBuild(
  id: string,
  name: string,
  description: string,
  startingClass: import("./types").StartingClass
): BuildTemplate {
  const baseStats = CLASS_BASE_STATS[startingClass];
  return {
    id,
    name,
    description,
    startingClass,
    baseStats: { ...baseStats },
    levels: [],
    phaseInfo: [],
    phaseTargets: {},
    phasePriority: {},
    weapons: [],
    spells: [],
    keyRings: [],
    buildSteps: [],
    buildItems: [],
  };
}
