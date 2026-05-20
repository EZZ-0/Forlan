/**
 * SIM-01: Merge weaponsFull stats into simulator (hand-curated entries win on id clash).
 */
import { DB_WEAPONS_FULL } from "../../itemsDatabase/items/weaponsFull";
import type { ItemDatabaseEntry } from "../../itemsDatabase/types";
import type { DamageType, SimulatorWeapon, UpgradeMaterial } from "../types";

const PDB_CLASSES = new Set([
  "Ultra Greatsword",
  "Great Hammer",
  "Great Axe",
  "Greataxe",
  "Great Club",
  "Greatsword",
  "Curved Greatsword",
  "Twinblade",
]);

const BONE_CLASSES = new Set(["Bow", "Greatbow", "Crossbow"]);

function inferDamageType(weaponClass: string): DamageType {
  const c = weaponClass.toLowerCase();
  if (c.includes("hammer") || c.includes("mace") || c.includes("club")) return "Strike";
  if (c.includes("rapier") || c.includes("spear") || c.includes("pike")) return "Thrust";
  if (c.includes("katana") || (c.includes("curved") && !c.includes("great"))) return "Slash";
  if (c.includes("bow")) return "Slash";
  return "Slash/Thrust";
}

function upgradeForClass(weaponClass: string): { material: UpgradeMaterial; max: number } {
  if (BONE_CLASSES.has(weaponClass)) return { material: "Bone", max: 5 };
  if (PDB_CLASSES.has(weaponClass)) return { material: "Petrified Dragon Bone", max: 5 };
  return { material: "Titanite", max: 10 };
}

function entryToWeapon(entry: ItemDatabaseEntry): SimulatorWeapon {
  const weaponClass = entry.subcategory?.weaponClass ?? "Unknown";
  const { material, max } = upgradeForClass(weaponClass);
  const dmg = entry.stats?.damage ?? { physical: 100 };
  const scaling = (entry.stats?.scaling ?? {}) as SimulatorWeapon["scaling"];
  const requirements = (entry.stats?.requirements ?? {}) as SimulatorWeapon["requirements"];

  return {
    id: entry.id,
    name: entry.name,
    type: "weapon",
    weaponClass,
    damageType: inferDamageType(weaponClass),
    damage: dmg,
    scaling,
    requirements,
    weight: entry.weight ?? 1,
    durability: entry.durability ?? 60,
    upgradeMaterial: material,
    maxUpgrade: max,
    specialEffect: entry.description,
  };
}

let mergedCache: SimulatorWeapon[] | null = null;
let lookupCache: Map<string, SimulatorWeapon> | null = null;

export function mergeSimulatorWeapons(curated: SimulatorWeapon[]): SimulatorWeapon[] {
  const byId = new Map<string, SimulatorWeapon>();
  for (const w of DB_WEAPONS_FULL.map(entryToWeapon)) byId.set(w.id, w);
  for (const w of curated) byId.set(w.id, w);
  mergedCache = Array.from(byId.values());
  lookupCache = byId;
  return mergedCache;
}

export function getWeaponFromDatabase(id: string, curated: SimulatorWeapon[]): SimulatorWeapon | undefined {
  if (!lookupCache) mergeSimulatorWeapons(curated);
  return lookupCache!.get(id);
}

export function getAllSimulatorWeapons(curated: SimulatorWeapon[]): SimulatorWeapon[] {
  return mergedCache ?? mergeSimulatorWeapons(curated);
}
