import type { BuildTemplate } from "./types";
import { BUILD_STEPS } from "../buildChecklist";
import { BUILD_ITEMS } from "../buildItems";
import {
  LEVELS,
  PHASE_INFO,
  PHASE_TARGETS,
  PHASE_PRIORITY,
  WEAPONS,
  SPELLS,
  KEY_RINGS,
} from "../build";

export const darkMeleeHexer: BuildTemplate = {
  id: "dark-melee-hexer",
  name: "Dark Melee Hexer",
  description: "Hybrid dark hex + melee build. 30/30 INT/FTH, Dark Uchigatana, Sunset Staff. Adaptive and versatile.",
  source: "Fextralife",
  startingClass: "sorcerer",
  baseStats: {
    VGR: 5,
    END: 6,
    VIT: 5,
    ATN: 12,
    STR: 3,
    DEX: 7,
    ADP: 8,
    INT: 14,
    FTH: 4,
  },
  levels: LEVELS,
  phaseInfo: PHASE_INFO,
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  weapons: WEAPONS,
  spells: SPELLS,
  keyRings: KEY_RINGS,
  buildSteps: BUILD_STEPS,
  buildItems: BUILD_ITEMS,
};
