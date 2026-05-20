/**
 * DS2 Build Simulator — Weapons database.
 * Phase 2: Build-relevant weapons. Source: Fextralife, bossSoulTradeDetails.
 * Values at max reinforcement (+10 Titanite, +5 Twinkling/PDB).
 */

import type { SimulatorWeapon } from "../types";
import { fextralife } from "../sources";
import { DATA_SOURCES } from "../sources";
import { getWeaponFromDatabase, mergeSimulatorWeapons } from "./weaponsFromDatabase";

export const SIMULATOR_WEAPONS: SimulatorWeapon[] = [
  {
    id: "fire_longsword",
    name: "Fire Longsword",
    type: "weapon",
    weaponClass: "Straight Sword",
    damageType: "Slash/Thrust",
    damage: { physical: 110, fire: 110 },
    scaling: { str: "E", dex: "D" },
    requirements: { str: 10, dex: 9 },
    weight: 3,
    durability: 70,
    counterStrength: 110,
    upgradeMaterial: "Titanite",
    maxUpgrade: 10,
    infusions: [
      { infusion: "Fire", damage: { physical: 88, fire: 110 }, scaling: { str: "E", dex: "D" } },
    ],
    specialEffect: "Already Fire-infused from chest",
    sources: [
      fextralife("damage", { physical: 110, fire: 110 }, DATA_SOURCES.fextralife.weaponsSortable),
    ],
  },
  {
    id: "mace",
    name: "Mace",
    type: "weapon",
    weaponClass: "Hammer",
    damageType: "Strike",
    damage: { physical: 120 },
    scaling: { str: "A" },
    requirements: { str: 12 },
    weight: 4,
    durability: 70,
    counterStrength: 120,
    upgradeMaterial: "Titanite",
    maxUpgrade: 10,
    infusions: [
      { infusion: "Lightning", damage: { physical: 96, lightning: 96 }, scaling: { str: "C", fth: "C" } },
    ],
    sources: [fextralife("damage.physical", 120, DATA_SOURCES.fextralife.weaponsSortable)],
  },
  {
    id: "uchigatana",
    name: "Uchigatana",
    type: "weapon",
    weaponClass: "Katana",
    damageType: "Slash",
    damage: { physical: 115 },
    scaling: { str: "E", dex: "B" },
    requirements: { str: 8, dex: 20 },
    weight: 5,
    durability: 40,
    counterStrength: 150,
    upgradeMaterial: "Titanite",
    maxUpgrade: 10,
    infusions: [
      {
        infusion: "Dark",
        damage: { physical: 92, dark: 138 },
        scaling: { str: "—", dex: "—", int: "B", fth: "B" },
      },
    ],
    sources: [fextralife("damage.physical", 115, DATA_SOURCES.fextralife.weaponsSortable)],
  },
  {
    id: "longsword",
    name: "Longsword",
    type: "weapon",
    weaponClass: "Straight Sword",
    damageType: "Slash/Thrust",
    damage: { physical: 110 },
    scaling: { str: "C", dex: "C" },
    requirements: { str: 10, dex: 9 },
    weight: 3,
    durability: 70,
    counterStrength: 110,
    upgradeMaterial: "Titanite",
    maxUpgrade: 10,
    infusions: [
      { infusion: "Fire", damage: { physical: 88, fire: 88 }, scaling: { str: "E", dex: "D" } },
    ],
    sources: [fextralife("damage.physical", 110, DATA_SOURCES.fextralife.weaponsSortable)],
  },
  {
    id: "pursuer_ultra_greatsword",
    name: "Pursuer's Ultra Greatsword",
    type: "weapon",
    weaponClass: "Ultra Greatsword",
    damageType: "Slash/Thrust",
    damage: { physical: 390 },
    scaling: { str: "B", dex: "C" },
    requirements: { str: 20, dex: 20 },
    weight: 13,
    durability: 50,
    counterStrength: 130,
    upgradeMaterial: "Petrified Dragon Bone",
    maxUpgrade: 5,
    sources: [fextralife("damage.physical", 390, DATA_SOURCES.fextralife.weaponsSortable)],
  },
  {
    id: "crypt_blacksword",
    name: "Crypt Blacksword",
    type: "weapon",
    weaponClass: "Ultra Greatsword",
    damageType: "Slash/Thrust",
    damage: { physical: 370, dark: 130 },
    scaling: { str: "C", dex: "D", int: "A", fth: "A" },
    requirements: { str: 40, dex: 10, int: 12, fth: 12 },
    weight: 24,
    durability: 70,
    counterStrength: 130,
    upgradeMaterial: "Petrified Dragon Bone",
    maxUpgrade: 5,
    specialEffect: "Hex weapon. Dark infusion recommended.",
    sources: [fextralife("damage", { physical: 370, dark: 130 }, DATA_SOURCES.fextralife.weaponsSortable)],
  },
];

export const ALL_SIMULATOR_WEAPONS: SimulatorWeapon[] = mergeSimulatorWeapons(SIMULATOR_WEAPONS);

/** Lookup weapons by id (curated overrides + weaponsFull merge) */
export function getWeapon(id: string): SimulatorWeapon | undefined {
  return getWeaponFromDatabase(id, SIMULATOR_WEAPONS);
}
