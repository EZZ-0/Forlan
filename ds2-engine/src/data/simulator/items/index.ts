/**
 * DS2 Build Simulator — Items index.
 */

import type { SimulatorItem } from "../types";
import { ALL_SIMULATOR_WEAPONS, getWeapon } from "./weapons";
import { SIMULATOR_ARMOR, getArmor } from "./armor";
import { SIMULATOR_RINGS, getRing } from "./rings";
import { SIMULATOR_SHIELDS, getShield } from "./shields";
import { SIMULATOR_CATALYSTS, getCatalyst } from "./catalysts";
import { getSpell } from "./spells";

export * from "./weapons";
export * from "./armor";
export * from "./rings";
export * from "./shields";
export * from "./catalysts";
export * from "./spells";

/** Lookup any item by id */
export function getItemById(id: string): SimulatorItem | undefined {
  return (
    getWeapon(id) ??
    getArmor(id) ??
    getRing(id) ??
    getShield(id) ??
    getCatalyst(id) ??
    getSpell(id)
  );
}

/** All equipable items (excluding spells) */
export const ALL_EQUIPABLE_ITEMS: SimulatorItem[] = [
  ...ALL_SIMULATOR_WEAPONS,
  ...SIMULATOR_ARMOR,
  ...SIMULATOR_RINGS,
  ...SIMULATOR_SHIELDS,
  ...SIMULATOR_CATALYSTS,
];
