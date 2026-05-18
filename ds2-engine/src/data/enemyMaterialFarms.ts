/**
 * Enemy material farms — which enemies drop upgrade materials (Fextralife Wiki).
 * Complements TITANITE_SOURCES (vendors), CRYSTAL_LIZARDS, and BUILD_MATERIAL_FARMS.
 */

import type { AreaId } from "./areas";

export interface EnemyMaterialFarm {
  material: string;
  enemy: string;
  areaId: AreaId;
  areaName: string;
  dropRate: string; // "Common" | "Rare" | "~3%" | "5–10%" | "Guaranteed (3)" | etc.
  method: string;
  cocRequired?: boolean;
  best?: boolean;
  howToGetThere?: string;
  notes?: string;
}

/** Enemy drops for Titanite Shards, Large Shards, Chunks, Twinkling, PDB, infusion stones, Fire Seeds */
export const ENEMY_MATERIAL_FARMS: EnemyMaterialFarm[] = [
  // —— TITANITE SHARD ——
  { material: "Titanite Shard", enemy: "Undead Blacksmith", areaId: "harvest_valley", areaName: "Harvest Valley / Earthen Peak", dropRate: "Common", method: "Farm near 2nd bonfire", cocRequired: true, howToGetThere: "From Earthen Peak 2nd bonfire or Harvest Valley — Undead Blacksmiths near mines.", best: true },
  { material: "Titanite Shard", enemy: "Skeleton", areaId: "harvest_valley", areaName: "Harvest Valley", dropRate: "Common", method: "Farm at area start", cocRequired: true, howToGetThere: "From first bonfire, skeletons at the beginning." },
  { material: "Titanite Shard", enemy: "Villager", areaId: "brightstone_cove", areaName: "Brightstone Cove Tseldora", dropRate: "Lower than Blacksmiths", method: "Many villagers; more spawns", cocRequired: true, notes: "More enemies but lower rate than Undead Blacksmiths." },
  { material: "Titanite Shard", enemy: "Ogre", areaId: "forest_of_fallen_giants", areaName: "Forest of Fallen Giants", dropRate: "Common", method: "Farm Ogres", cocRequired: true, howToGetThere: "Several Ogres in FoFG — e.g. Cardinal Tower area, Soldiers' Rest." },

  // —— LARGE TITANITE SHARD ——
  { material: "Large Titanite Shard", enemy: "Spider Hollow (Humanoid Spider)", areaId: "brightstone_cove", areaName: "Brightstone Cove Tseldora", dropRate: "Good", method: "Farm spider room — smash bookshelf", cocRequired: true, best: true, howToGetThere: "Chapel Threshold bonfire → downstairs, first zip-line → smash bookshelf for secret spider room." },
  { material: "Large Titanite Shard", enemy: "Undead Mage", areaId: "brightstone_cove", areaName: "Brightstone Cove Tseldora", dropRate: "Good", method: "Farm mages", cocRequired: true },
  { material: "Large Titanite Shard", enemy: "Gyrm Warrior", areaId: "doors_of_pharros", areaName: "Doors of Pharros", dropRate: "Common", method: "Smaller Gyrm drop Large Shards", cocRequired: true, howToGetThere: "From first bonfire, Gyrm throughout — smaller ones drop Large Shards." },
  { material: "Large Titanite Shard", enemy: "Ironclad Soldier", areaId: "iron_keep", areaName: "Iron Keep", dropRate: "Common", method: "Farm turtle knights", cocRequired: true, howToGetThere: "Threshold Bridge — Ironclad Knights (turtle armor) on path." },
  { material: "Large Titanite Shard", enemy: "Darksucker (Coal Tar)", areaId: "black_gulch", areaName: "Black Gulch", dropRate: "~10% Large, ~5% Chunk", method: "Firebomb tar pits from range", cocRequired: false, best: true, howToGetThere: "Break poison statues. Darksuckers spawn from black oil pools. Firebomb ignites pools; phantoms can help. 15 spawns per pool.", notes: "Drops both Large Shards and Chunks. Best pre-Aldia chunk farm." },
  { material: "Large Titanite Shard", enemy: "Great Basilisk", areaId: "huntsmans_copse", areaName: "Huntsman's Copse", dropRate: "Guaranteed 3", method: "Always drops 3; CoC for infinite", cocRequired: true, best: true, howToGetThere: "From Undead Lockaway, cave after first bonfire — Great Basilisk at bottom. CoC respawns." },

  // —— TITANITE CHUNK ——
  { material: "Titanite Chunk", enemy: "Darksucker (Coal Tar)", areaId: "black_gulch", areaName: "Black Gulch", dropRate: "~5%", method: "Firebomb tar pits; also drops Large", cocRequired: false, best: true, howToGetThere: "Same as Large Shard — Black Gulch oil pools." },
  { material: "Titanite Chunk", enemy: "Coal Tar", areaId: "aldias_keep", areaName: "Aldia's Keep", dropRate: "Best efficiency", method: "~4.6 chunks/min; fire arrows break pots", cocRequired: true, best: true, howToGetThere: "From Foyer or Foregarden — pots block Coal Tars. Fire arrows to break. Farm Coals." },
  { material: "Titanite Chunk", enemy: "Possessed Armor", areaId: "dlc_iron", areaName: "Brume Tower (DLC)", dropRate: "Good", method: "Farm armor in tower", cocRequired: true },
  { material: "Titanite Chunk", enemy: "Large Gyrm", areaId: "doors_of_pharros", areaName: "Doors of Pharros", dropRate: "~3%", method: "Max discovery — CGSR+2, Jester's, Tatters", cocRequired: true, notes: "Low rate; Darksuckers/Coal Tar usually better." },
  { material: "Titanite Chunk", enemy: "Undead Peasant", areaId: "brightstone_cove", areaName: "Brightstone Cove Tseldora", dropRate: "~3% or less", method: "Not recommended", cocRequired: true, notes: "3 in front of Prowling Magus upper gate have slightly higher rate. Generally poor." },

  // —— TWINKLING TITANITE ——
  { material: "Twinkling Titanite", enemy: "Heide Knight", areaId: "heides_tower", areaName: "Heide's Tower of Flame", dropRate: "~5–10% est.", method: "Max discovery, CoC", cocRequired: true, best: true, howToGetThere: "From Tower of Flame — Heide Knights scattered. SotFS: multiple Knight types." },
  { material: "Twinkling Titanite", enemy: "Archdrake Pilgrim", areaId: "shrine_of_amana", areaName: "Shrine of Amana", dropRate: "Good", method: "CoC for infinite", cocRequired: true, best: true, howToGetThere: "From Crumbled Ruins — Archdrake Pilgrims along water paths. Best non-ascetic Twinkling farm." },
  { material: "Twinkling Titanite", enemy: "Amana Priestess", areaId: "shrine_of_amana", areaName: "Shrine of Amana", dropRate: "Good", method: "CoC for infinite", cocRequired: true, best: true, howToGetThere: "Same area as Archdrakes — priestesses with chimes." },
  { material: "Twinkling Titanite", enemy: "Pursuer", areaId: "lost_bastille", areaName: "Lost Bastille (SotFS)", dropRate: "1 per encounter", method: "4 Pursuer encounters — each drops 1", cocRequired: false, notes: "SotFS: Exile Holding, Straid's Cell, Servants' Quarters, Tower Apart. One-time per playthrough." },
  { material: "Twinkling Titanite", enemy: "Rampart Golem", areaId: "dlc_ivory", areaName: "Frozen Eleum Loyce (DLC)", dropRate: "Drops", method: "Farm golems", cocRequired: true },
  { material: "Twinkling Titanite", enemy: "Poison Statue Cluster", areaId: "dlc_sunken", areaName: "Shulva Sanctum City (DLC)", dropRate: "Rare", method: "Farm clusters", cocRequired: true },

  // —— PETRIFIED DRAGON BONE ——
  { material: "Petrified Dragon Bone", enemy: "Dragon Acolyte", areaId: "aldias_keep", areaName: "Aldia's Keep", dropRate: "Random", method: "CoC for infinite", cocRequired: true, best: true, howToGetThere: "Foregarden — Acolytes in acid pool area. Farm while getting Dragon Scale + Soul Geyser." },
  { material: "Petrified Dragon Bone", enemy: "The Imperfect", areaId: "dlc_sunken", areaName: "Lair of the Imperfect (DLC)", dropRate: "Relatively high", method: "Max discovery; near 3rd bonfire", cocRequired: true, best: true, notes: "Also drops Twinkling, Slabs, Dragon Scales." },
  { material: "Petrified Dragon Bone", enemy: "Wyvern", areaId: "dragon_aerie", areaName: "Dragon Aerie", dropRate: "Random", method: "Kill drakes", cocRequired: false, howToGetThere: "11 lizards + drakes. Lizards guaranteed if killed; drakes can drop PDB." },
  { material: "Petrified Dragon Bone", enemy: "Great Basilisk", areaId: "aldias_keep", areaName: "Aldia's Keep", dropRate: "Random", method: "Farm basilisk", cocRequired: true },
  { material: "Petrified Dragon Bone", enemy: "Frozen Reindeer", areaId: "dlc_ivory", areaName: "Frigid Outskirts (DLC)", dropRate: "Random", method: "Farm reindeer", cocRequired: false, notes: "Optional; difficult area — blizzard run." },

  // —— FIRE SEED ——
  { material: "Fire Seed", enemy: "Desert Sorceress", areaId: "earthen_peak", areaName: "Earthen Peak", dropRate: "Good", method: "CoC for infinite", cocRequired: true, best: true, howToGetThere: "Lower Earthen Peak → poison area → 2–3 sorceresses." },
  { material: "Fire Seed", enemy: "Alonne Knight", areaId: "iron_keep", areaName: "Iron Keep", dropRate: "Decent", method: "CoC for infinite", cocRequired: true, howToGetThere: "Threshold Bridge — first bridge knights." },
  { material: "Fire Seed", enemy: "Fire Salamander", areaId: "forest_of_fallen_giants", areaName: "Forest of Fallen Giants", dropRate: "Rare", method: "Salamander pit", cocRequired: true, howToGetThere: "Cardinal Tower — past ballista, salamander pit." },

  // —— DARKNIGHT STONE (Dark Infusion) ——
  { material: "Darknight Stone", enemy: "Leydia Pyromancer", areaId: "undead_crypt", areaName: "Undead Crypt", dropRate: "Rare", method: "Keep tombstones, ring bell — infinite spawn", cocRequired: true, best: true, howToGetThere: "Second bonfire — keep tombstones up, ring bell. Leydia spawn infinitely. Max discovery." },

  // —— BOLTSTONE (Lightning Infusion) ——
  { material: "Boltstone", enemy: "Basilisk", areaId: "brightstone_cove", areaName: "Brightstone Cove / Shaded Woods", dropRate: "Very rare", method: "Farm basilisks", cocRequired: true, notes: "Chloanne/Targray usually easier." },

  // —— FAINTSTONE (Magic Infusion) ——
  { material: "Faintstone", enemy: "Crystal Lizard", areaId: "doors_of_pharros", areaName: "Doors of Pharros", dropRate: "Lizard drop", method: "Lizard past axe Gyrm", cocRequired: false, notes: "Lizard guaranteed if killed; not enemy farm." },
];
