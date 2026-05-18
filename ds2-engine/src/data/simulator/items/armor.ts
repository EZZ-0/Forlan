/**
 * DS2 Build Simulator — Armor database.
 * Phase 2: Build-relevant (Hexer set). Source: Fextralife.
 */

import type { SimulatorArmor } from "../types";
import { fextralife } from "../sources";
import { DATA_SOURCES } from "../sources";

export const SIMULATOR_ARMOR: SimulatorArmor[] = [
  {
    id: "hexer_hood",
    name: "Hexer's Hood",
    type: "armor",
    slot: "helm",
    weight: 1.4,
    resistances: { physical: 17, magic: 23, fire: 18, lightning: 18, dark: 25 },
    poise: 2,
    sources: [fextralife("resistances", {}, DATA_SOURCES.fextralife.armor)],
  },
  {
    id: "hexer_robe",
    name: "Hexer's Robe",
    type: "armor",
    slot: "chest",
    weight: 3.2,
    resistances: { physical: 45, magic: 52, fire: 38, lightning: 38, dark: 58 },
    poise: 8,
    sources: [fextralife("resistances", {}, DATA_SOURCES.fextralife.armor)],
  },
  {
    id: "hexer_gloves",
    name: "Hexer's Gloves",
    type: "armor",
    slot: "gloves",
    weight: 0.8,
    resistances: { physical: 12, magic: 15, fire: 12, lightning: 12, dark: 18 },
    poise: 1,
    sources: [fextralife("resistances", {}, DATA_SOURCES.fextralife.armor)],
  },
  {
    id: "hexer_boots",
    name: "Hexer's Boots",
    type: "armor",
    slot: "legs",
    weight: 1.6,
    resistances: { physical: 22, magic: 26, fire: 20, lightning: 20, dark: 30 },
    poise: 3,
    sources: [fextralife("resistances", {}, DATA_SOURCES.fextralife.armor)],
  },
];

/** Lookup armor by id */
export function getArmor(id: string): SimulatorArmor | undefined {
  return SIMULATOR_ARMOR.find((a) => a.id === id);
}
