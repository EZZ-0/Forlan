/**
 * DS2 Build Simulator — Spells database (sorceries, miracles, pyromancies, hexes).
 * Phase 2: Build-relevant spells. Source: Fextralife.
 */

import type { SimulatorSpell } from "../types";
import { fextralife } from "../sources";
import { DATA_SOURCES } from "../sources";

export const SIMULATOR_SPELLS: SimulatorSpell[] = [
  {
    id: "dark_orb",
    name: "Dark Orb",
    type: "spell",
    school: "hex",
    weight: 0,
    slots: 1,
    uses: 24,
    intReq: 12,
    fthReq: 12,
    effect: "Primary ranged hex",
    sources: [fextralife("uses", 24, DATA_SOURCES.fextralife.base)],
  },
  {
    id: "dark_weapon",
    name: "Dark Weapon",
    type: "spell",
    school: "hex",
    weight: 0,
    slots: 1,
    uses: 4,
    intReq: 16,
    fthReq: 14,
    effect: "Weapon buff, +50 dark damage",
    sources: [fextralife("uses", 4, DATA_SOURCES.fextralife.base)],
  },
  {
    id: "great_heavy_soul_arrow",
    name: "Great Heavy Soul Arrow",
    type: "spell",
    school: "sorcery",
    weight: 0,
    slots: 1,
    uses: 12,
    intReq: 18,
    effect: "Backup ranged sorcery",
    sources: [fextralife("uses", 12, DATA_SOURCES.fextralife.base)],
  },
  {
    id: "flame_swathe",
    name: "Flame Swathe",
    type: "spell",
    school: "pyromancy",
    weight: 0,
    slots: 1,
    uses: 2,
    effect: "Massive AoE nuke",
    sources: [fextralife("uses", 2, DATA_SOURCES.fextralife.base)],
  },
  {
    id: "resonant_soul",
    name: "Resonant Soul",
    type: "spell",
    school: "hex",
    weight: 0,
    slots: 1,
    uses: 2,
    intReq: 20,
    fthReq: 20,
    effect: "High damage hex, costs souls",
    sources: [fextralife("uses", 2, DATA_SOURCES.fextralife.base)],
  },
  {
    id: "great_resonant_soul",
    name: "Great Resonant Soul",
    type: "spell",
    school: "hex",
    weight: 0,
    slots: 1,
    uses: 2,
    intReq: 20,
    fthReq: 20,
    effect: "Higher damage than Resonant Soul",
    sources: [fextralife("uses", 2, DATA_SOURCES.fextralife.base)],
  },
  {
    id: "sunlight_blade",
    name: "Sunlight Blade",
    type: "spell",
    school: "miracle",
    weight: 0,
    slots: 1,
    uses: 1,
    fthReq: 54,
    effect: "Lightning weapon buff",
    sources: [fextralife("uses", 1, DATA_SOURCES.fextralife.base)],
  },
];

/** Lookup spells by id */
export function getSpell(id: string): SimulatorSpell | undefined {
  return SIMULATOR_SPELLS.find((s) => s.id === id);
}
