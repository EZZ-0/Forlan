/**
 * Build checklist — progress-based steps for Dark Melee Hexer.
 * Each step has progressId: use area item ID when 1:1, else build:xxx.
 * Shared with Areas tab for full interconnectivity.
 */

import type { AreaId } from "./areas";

export interface BuildStep {
  id: string;
  progressId: string; // checked[progressId] — use area item ID when shared, else build:xxx
  name: string;
  areaId: AreaId;
  phase: number;
  type: "weapon" | "ring" | "spell" | "catalyst" | "key" | "upgrade" | "infusion";
  source: string; // Brief: "Chest", "Felkin", etc.
  detail?: string; // Extra hint
  optional?: boolean;
}

export const BUILD_STEPS: BuildStep[] = [
  // Phase 1 — FoFG, Majula, early progression
  { id: "build:1", progressId: "fg5", name: "Lenigrast's Key", areaId: "forest_of_fallen_giants", phase: 1, type: "key", source: "Melentia (1,000 souls)" },
  { id: "build:2", progressId: "fg11", name: "Fire Longsword", areaId: "forest_of_fallen_giants", phase: 1, type: "weapon", source: "Salamander chest" },
  { id: "build:3", progressId: "fg12", name: "Open Lenigrast", areaId: "forest_of_fallen_giants", phase: 1, type: "key", source: "Return to Majula with key" },
  { id: "build:4", progressId: "build:fire_ls_10", name: "Fire Longsword +10", areaId: "majula", phase: 1, type: "upgrade", source: "Lenigrast" },
  { id: "build:5", progressId: "build:lightning_mace", name: "Lightning Mace (buy base)", areaId: "majula", phase: 1, type: "weapon", source: "Lenigrast (after FoFG)" },
  { id: "build:6", progressId: "build:lightning_mace_10", name: "Lightning Mace +10", areaId: "majula", phase: 1, type: "upgrade", source: "Lenigrast" },
  { id: "build:7", progressId: "fg15", name: "Ring of Blades", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "Pursuer drop" },
  { id: "build:8", progressId: "fg21", name: "Chloranthy Ring", areaId: "forest_of_fallen_giants", phase: 1, type: "ring", source: "Pharros (ballista room)" },
  { id: "build:9", progressId: "lb2", name: "Dull Ember", areaId: "lost_bastille", phase: 1, type: "key", source: "Tower Apart chest" },
  { id: "build:10", progressId: "lb7", name: "Give Dull Ember to McDuff", areaId: "lost_bastille", phase: 1, type: "key", source: "Unlocks infusion" },
  { id: "build:11", progressId: "build:lightning_mace_infused", name: "Lightning Mace infused", areaId: "lost_bastille", phase: 1, type: "infusion", source: "McDuff" },
  // Phase 2 — Felkin hex
  { id: "build:12", progressId: "hc3", name: "Dark Orb", areaId: "huntsmans_copse", phase: 2, type: "spell", source: "Felkin (8 INT + 8 FTH base to shop; 600 souls)" },
  // Phase 3 — 20/20, Sunset Staff, Pyromancy
  { id: "build:13", progressId: "build:sunset_staff", name: "Sunset Staff", areaId: "huntsmans_copse", phase: 3, type: "catalyst", source: "Felkin (20/20 BASE stats only — gear doesn't count; free)" },
  { id: "build:14", progressId: "build:dark_weapon", name: "Dark Weapon", areaId: "huntsmans_copse", phase: 3, type: "spell", source: "Felkin (20/20 base; 2,700 souls)" },
  { id: "build:15", progressId: "build:sunset_staff_infused", name: "Sunset Staff Dark infused", areaId: "lost_bastille", phase: 3, type: "infusion", source: "McDuff" },
  { id: "build:16", progressId: "sw1", name: "Unpetrify Rosabeth", areaId: "shaded_woods", phase: 3, type: "key", source: "Fragrant Branch" },
  { id: "build:17", progressId: "build:pyromancy_flame", name: "Pyromancy Flame", areaId: "shaded_woods", phase: 3, type: "catalyst", source: "Rosabeth (after unpetrify)" },
  // Phase 4 — Uchigatana, Dark melee
  { id: "build:18", progressId: "build:uchigatana", name: "Uchigatana", areaId: "lost_bastille", phase: 4, type: "weapon", source: "McDuff or Alonne Captain drop" },
  { id: "build:19", progressId: "build:uchigatana_10", name: "Uchigatana +10", areaId: "lost_bastille", phase: 4, type: "upgrade", source: "McDuff / Lenigrast" },
  { id: "build:20", progressId: "build:dark_uchigatana", name: "Dark Uchigatana infused", areaId: "lost_bastille", phase: 4, type: "infusion", source: "McDuff" },
  // Phase 5 — Rings, spells
  { id: "build:21", progressId: "build:southern_ritual", name: "Southern Ritual Band", areaId: "brightstone_cove", phase: 5, type: "ring", source: "Brightstone Cove" },
  { id: "build:22", progressId: "sa3", name: "Sunlight Blade", areaId: "shrine_of_amana", phase: 5, type: "spell", source: "Chest (hidden path)" },
  { id: "build:23", progressId: "ch6", name: "Resonant Soul", areaId: "dark_chasm", phase: 5, type: "spell", source: "Grandahl (Pilgrims Rank 1)" },
  { id: "build:23b", progressId: "build:great_resonant_soul", name: "Great Resonant Soul", areaId: "dark_chasm", phase: 5, type: "spell", source: "Grandahl (Pilgrims Rank 2)", detail: "Higher damage than Resonant Soul" },
  // Phase 6 — End build
  { id: "build:24", progressId: "build:third_dragon", name: "Third Dragon Ring", areaId: "dragon_aerie", phase: 6, type: "ring", source: "Dragon Shrine" },
  { id: "build:25", progressId: "build:staff_of_wisdom", name: "Staff of Wisdom", areaId: "dragon_aerie", phase: 6, type: "catalyst", source: "Ornifex trade (Freja soul) / crystal lizard" },
  { id: "build:26", progressId: "build:staff_wisdom_5", name: "Staff of Wisdom +5", areaId: "dragon_aerie", phase: 6, type: "upgrade", source: "Twinkling Titanite" },
  { id: "build:27", progressId: "build:dark_clutch", name: "Dark Clutch Ring", areaId: "dlc_sunken", phase: 6, type: "ring", source: "DLC (any crown)" },
];

export function getBuildStepsForArea(areaId: AreaId, buildSteps?: BuildStep[]): BuildStep[] {
  const steps = buildSteps ?? BUILD_STEPS;
  return steps.filter((s) => s.areaId === areaId);
}

export function getBuildStepsByPhase(phase: number, buildSteps?: BuildStep[]): BuildStep[] {
  const steps = buildSteps ?? BUILD_STEPS;
  return steps.filter((s) => s.phase === phase);
}

export function buildChecklistStats(checked: Record<string, boolean>, buildSteps?: BuildStep[]) {
  const steps = buildSteps ?? BUILD_STEPS;
  const done = steps.filter((s) => checked[s.progressId]).length;
  return { done, total: steps.length, pct: steps.length > 0 ? Math.round((done / steps.length) * 100) : 0 };
}
