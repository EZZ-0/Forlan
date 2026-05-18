/**
 * DS2 Build Simulator — Catalysts database (staves, chimes, pyromancy).
 * Phase 2: Build-relevant. Source: Fextralife.
 */

import type { SimulatorCatalyst } from "../types";
import { fextralife } from "../sources";
import { DATA_SOURCES } from "../sources";

export const SIMULATOR_CATALYSTS: SimulatorCatalyst[] = [
  {
    id: "sunset_staff",
    name: "Sunset Staff",
    type: "catalyst",
    catalystClass: "hex_chime",
    weight: 3,
    spellDamage: "Dark",
    scaling: { int: "B", fth: "B" },
    sources: [fextralife("scaling", { int: "B", fth: "B" }, DATA_SOURCES.fextralife.base)],
  },
  {
    id: "staff_of_wisdom",
    name: "Staff of Wisdom",
    type: "catalyst",
    catalystClass: "staff",
    weight: 4,
    spellDamage: "Magic",
    scaling: { int: "S" },
    sources: [fextralife("scaling.int", "S", DATA_SOURCES.fextralife.base)],
  },
  {
    id: "pyromancy_flame",
    name: "Pyromancy Flame",
    type: "catalyst",
    catalystClass: "pyromancy",
    weight: 0,
    spellDamage: "Fire",
    scaling: { int: "—", fth: "—" },
    sources: [fextralife("scaling", {}, DATA_SOURCES.fextralife.base)],
  },
  {
    id: "sorcerers_staff",
    name: "Sorcerer's Staff",
    type: "catalyst",
    catalystClass: "staff",
    weight: 2,
    spellDamage: "Magic",
    scaling: { int: "B" },
    sources: [fextralife("scaling.int", "B", DATA_SOURCES.fextralife.base)],
  },
];

/** Lookup catalysts by id */
export function getCatalyst(id: string): SimulatorCatalyst | undefined {
  return SIMULATOR_CATALYSTS.find((c) => c.id === id);
}
