/**
 * DS2 Build Simulator — Shields database.
 * Phase 2: Build-relevant shields. Source: Fextralife.
 */

import type { SimulatorShield } from "../types";
import { fextralife } from "../sources";
import { DATA_SOURCES } from "../sources";

export const SIMULATOR_SHIELDS: SimulatorShield[] = [
  {
    id: "target_shield",
    name: "Target Shield",
    type: "shield",
    weight: 2,
    stability: 55,
    damageReduction: { physical: 90, magic: 30, fire: 25, lightning: 25, dark: 25 },
    requirements: { str: 6 },
    sources: [fextralife("stability", 55, DATA_SOURCES.fextralife.shields)],
  },
  {
    id: "watchdragon_parma",
    name: "Watchdragon Parma",
    type: "shield",
    weight: 3.5,
    stability: 58,
    damageReduction: { physical: 100, magic: 45, fire: 35, lightning: 35, dark: 35 },
    requirements: { str: 15 },
    sources: [fextralife("stability", 58, DATA_SOURCES.fextralife.shields)],
  },
];

/** Lookup shields by id */
export function getShield(id: string): SimulatorShield | undefined {
  return SIMULATOR_SHIELDS.find((s) => s.id === id);
}
