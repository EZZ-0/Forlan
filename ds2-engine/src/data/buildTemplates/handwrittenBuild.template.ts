/**
 * COPY this file → {yourBuild}.ts and fill in.
 * Reference: darkChaosAssassin.ts
 * Plan: .cursor/plans/handwritten_builds_execution.plan.md
 *
 * After completion:
 * 1. Export as `export const yourBuild: BuildTemplate`
 * 2. Add to OVERRIDES in fromGenerated.ts
 * 3. Set status "complete" in handwrittenBuildStatus.ts
 */

import type { BuildTemplate } from "./types";
import { CLASS_BASE_STATS } from "./types";
import type { BuildStep } from "../buildChecklist";
import type { BuildItem } from "../buildItems";

// TODO: pick starting class
const BASE = CLASS_BASE_STATS.warrior;

const LEVELS: BuildTemplate["levels"] = [
  // { sl: 8, stat: "STR", value: 16, phase: 1, note: "★ breakpoint" },
];

const PHASE_INFO: BuildTemplate["phaseInfo"] = [
  { num: 1, name: "Early", range: "SL ?→?", color: "#6b7c52", areas: "Betwixt → FoFG" },
];

const PHASE_TARGETS: BuildTemplate["phaseTargets"] = {
  1: { STR: 16 },
};

const PHASE_PRIORITY: BuildTemplate["phasePriority"] = {
  1: ["STR", "VGR", "END"],
};

/** progressId: area id from areas.ts OR unique build:your-build-id:slug */
const BUILD_STEPS: BuildStep[] = [
  // {
  //   id: "xxx:0",
  //   progressId: "fg11",
  //   name: "Fire Longsword",
  //   areaId: "forest_of_fallen_giants",
  //   phase: 1,
  //   type: "weapon",
  //   source: "Salamander chest",
  // },
];

const BUILD_ITEMS: BuildItem[] = [
  // { name: "...", type: "weapon", role: "...", phase: 1, whereToFind: [{ type: "chest", location: "...", detail: "..." }] },
];

export const templateBuild: BuildTemplate = {
  id: "your-build-id",
  name: "Your Build Name",
  description: "One-line summary from A–Z guide.",
  source: "DS2_ALL_BUILDS_A-Z",
  startingClass: "warrior",
  baseStats: { ...BASE },
  levels: LEVELS,
  phaseInfo: PHASE_INFO,
  phaseTargets: PHASE_TARGETS,
  phasePriority: PHASE_PRIORITY,
  weapons: [],
  spells: [],
  keyRings: [],
  ringsDetail: {
    priorityOrder: [],
    groups: [{ label: "Core", ringNames: [] }],
    rings: [],
  },
  buildSteps: BUILD_STEPS,
  buildItems: BUILD_ITEMS,
  buildMaterialFarms: [],
};
