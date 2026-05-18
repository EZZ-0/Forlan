/**
 * DS2 Build Simulator — Rings database.
 * Phase 2: Build-relevant rings. Source: Fextralife.
 */

import type { SimulatorRing } from "../types";
import { fextralife } from "../sources";
import { DATA_SOURCES } from "../sources";

export const SIMULATOR_RINGS: SimulatorRing[] = [
  {
    id: "southern_ritual_band",
    name: "Southern Ritual Band",
    type: "ring",
    weight: 0.3,
    effects: { spellSlots: 3 },
    sources: [fextralife("effects.spellSlots", 3, DATA_SOURCES.fextralife.rings)],
  },
  {
    id: "southern_ritual_band_2",
    name: "Southern Ritual Band +2",
    type: "ring",
    weight: 0.3,
    effects: { spellSlots: 3 },
    sources: [fextralife("effects.spellSlots", 3, DATA_SOURCES.fextralife.rings)],
  },
  {
    id: "clear_bluestone_ring_2",
    name: "Clear Bluestone Ring +2",
    type: "ring",
    weight: 0.3,
    effects: { castSpeed: "55" },
    sources: [fextralife("effects.castSpeed", "55", DATA_SOURCES.fextralife.rings)],
  },
  {
    id: "ring_of_blades",
    name: "Ring of Blades",
    type: "ring",
    weight: 0.4,
    effects: { physicalAR: 50 },
    sources: [fextralife("effects.physicalAR", 50, DATA_SOURCES.fextralife.rings)],
  },
  {
    id: "third_dragon_ring",
    name: "Third Dragon Ring",
    type: "ring",
    weight: 0.5,
    effects: { hp: "7.5%", stamina: "12.5%", equipLoad: "12.5%" },
    sources: [fextralife("effects", {}, DATA_SOURCES.fextralife.rings)],
  },
  {
    id: "chloranthy_ring",
    name: "Chloranthy Ring",
    type: "ring",
    weight: 0.3,
    effects: { staminaRegen: "25" },
    sources: [fextralife("effects.staminaRegen", "25", DATA_SOURCES.fextralife.rings)],
  },
  {
    id: "dark_clutch_ring",
    name: "Dark Clutch Ring",
    type: "ring",
    weight: 0.4,
    effects: { darkDamage: "20%", physicalDefense: "-50" },
    sources: [fextralife("effects.darkDamage", "20%", DATA_SOURCES.fextralife.rings)],
  },
  {
    id: "abyss_seal",
    name: "Abyss Seal",
    type: "ring",
    weight: 0.3,
    effects: { hexDamage: "20%", hpDrain: "per cast" },
    sources: [fextralife("effects.hexDamage", "20%", DATA_SOURCES.fextralife.rings)],
  },
];

/** Lookup rings by id */
export function getRing(id: string): SimulatorRing | undefined {
  return SIMULATOR_RINGS.find((r) => r.id === id);
}
