/**
 * Material-centric farm lookup — aggregates TITANITE_SOURCES, BUILD_MATERIAL_FARMS, CRYSTAL_LIZARDS.
 * Does NOT replace or remove any existing data; adds a unified query layer.
 */

import { TITANITE_SOURCES } from "./farming";
import { BUILD_MATERIAL_FARMS } from "./buildItems";
import { CRYSTAL_LIZARDS } from "./ds2Database";
import { ENEMY_MATERIAL_FARMS } from "./enemyMaterialFarms";
import { getArea } from "./areas";
import type { AreaId } from "./areas";

export interface MaterialFarmSpot {
  id: string;
  material: string;
  sourceType: "vendor" | "enemy" | "crystal_lizard" | "chest";
  name: string;
  areaId?: AreaId;
  areaName?: string;
  method: string;
  unlock: string;
  best?: boolean;
  purpose?: string;
  /** Directions from bonfire or landmark */
  howToGetThere?: string;
}

/** Parse material names from crystal lizard drops string */
function parseCrystalLizardMaterials(drops: string): string[] {
  if (drops.toLowerCase().includes("various") || drops.toLowerCase().includes("part of")) {
    return [];
  }
  const parts = drops.split(/[,;]/).map((s) => s.trim());
  const materials: string[] = [];
  for (const p of parts) {
    const m = p.replace(/^\d+\s*x?\s*/i, "").trim();
    if (m) materials.push(m);
  }
  return materials;
}

/** Build unified material farm spots from all sources */
function buildMaterialFarmSpots(): MaterialFarmSpot[] {
  const spots: MaterialFarmSpot[] = [];
  let id = 0;

  // From TITANITE_SOURCES
  for (const t of TITANITE_SOURCES) {
    spots.push({
      id: `ts-${id++}`,
      material: t.material,
      sourceType: t.method.toLowerCase().includes("buy") ? "vendor" : "enemy",
      name: t.name,
      areaId: t.areaId as AreaId | undefined,
      areaName: t.areaId ? getArea(t.areaId as AreaId).name : t.loc,
      method: t.method,
      unlock: t.unlock,
      howToGetThere: t.howToGetThere,
    });
  }

  // From BUILD_MATERIAL_FARMS (farmOptions)
  for (const m of BUILD_MATERIAL_FARMS) {
    for (const f of m.farmOptions) {
      spots.push({
        id: `bmf-${id++}`,
        material: m.item,
        purpose: m.purpose,
        sourceType: "enemy",
        name: f.enemy,
        areaName: f.area,
        method: f.method ?? "Farm",
        unlock: f.unlock ?? "Area",
      });
    }
  }

  // From ENEMY_MATERIAL_FARMS (enemy drops for shards, chunks, twinkling, etc.)
  for (const e of ENEMY_MATERIAL_FARMS) {
    spots.push({
      id: `emf-${id++}`,
      material: e.material,
      sourceType: "enemy",
      name: e.enemy,
      areaId: e.areaId,
      areaName: e.areaName,
      method: `${e.dropRate} · ${e.method}${e.cocRequired ? " · CoC" : ""}`,
      unlock: "Area access",
      best: e.best,
      howToGetThere: e.howToGetThere,
    });
  }

  // From CRYSTAL_LIZARDS
  CRYSTAL_LIZARDS.forEach((c, idx) => {
    const materials = parseCrystalLizardMaterials(c.drops);
    materials.forEach((mat) => {
      spots.push({
        id: `cl-${idx}-${id++}`,
        material: mat,
        sourceType: "crystal_lizard",
        name: "Crystal Lizard",
        areaId: c.areaId,
        areaName: getArea(c.areaId).name,
        method: `Kill before escape — ${c.location}`,
        unlock: "Area access",
        howToGetThere: c.howToGetThere,
      });
    });
  });

  return spots;
}

export const MATERIAL_FARM_SPOTS: MaterialFarmSpot[] = buildMaterialFarmSpots();

/** Query farm spots by material name (case-insensitive partial match) */
export function getMaterialFarmSpots(filter?: {
  material?: string;
  materialContains?: string;
}): MaterialFarmSpot[] {
  if (!filter) return [...MATERIAL_FARM_SPOTS];
  let result = MATERIAL_FARM_SPOTS;
  if (filter.material) {
    const q = filter.material.toLowerCase();
    result = result.filter((s) => s.material.toLowerCase().includes(q));
  }
  if (filter.materialContains) {
    const q = filter.materialContains.toLowerCase();
    result = result.filter((s) => s.material.toLowerCase().includes(q));
  }
  return result;
}

/** Unique material names for filter dropdown */
export function getMaterialNames(): string[] {
  const seen = new Set<string>();
  const names: string[] = [];
  for (const s of MATERIAL_FARM_SPOTS) {
    const base = s.material.split(/[(\[]/)[0].trim();
    if (!seen.has(base)) {
      seen.add(base);
      names.push(base);
    }
  }
  return names.sort((a, b) => a.localeCompare(b));
}
