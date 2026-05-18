/**
 * DS2 Items Database — Unified schema.
 * Merges simulator stats, location, guidance, and build relevance.
 */

import type { AreaId } from "../areas";

export type ItemCategory =
  | "weapon"
  | "armor"
  | "ring"
  | "shield"
  | "catalyst"
  | "spell"
  | "consumable"
  | "key"
  | "material";

export interface ItemDatabaseEntry {
  id: string;
  name: string;
  aliases?: string[];
  variantOf?: string;
  category: ItemCategory;
  subcategory?: Record<string, string>;

  weight?: number;
  durability?: number;
  description?: string;
  sotfs?: boolean;
  tags?: string[];

  location?: ItemLocation;
  guidance?: ItemGuidance;

  cost?: ItemCost;

  stats?: ItemStats;
  effects?: Record<string, string | number>;

  farming?: ItemFarming;

  /** Single build (legacy) or keyed by buildTemplateId */
  buildRelevance?: ItemBuildRelevance | Record<string, ItemBuildRelevance>;
  rarity?: "unique" | "limited" | "renewable";
  dlc?: "base" | "sotfs" | "dlc_sunken" | "dlc_iron" | "dlc_ivory";

  source?: "fextralife" | "wikidot" | "manual";
  sourceUrl?: string;
  lastVerified?: string;
}

export interface ItemLocation {
  areaId?: AreaId;
  sourceType: "chest" | "buy" | "drop" | "trade" | "corpse" | "vendor" | "boss" | "gift";
  vendor?: string;
  unlockRequirement?: string;
}

export interface ItemCost {
  souls?: number;
  materials?: string;
  special?: string;
}

export interface ItemFarming {
  farmable: boolean;
  enemy?: string;
  area?: string;
  dropRate?: string;
  method?: string;
}

export interface ItemBuildRelevance {
  phase: number;
  role: string;
  ref?: string;
  progressId?: string;
}

export interface ItemStats {
  requirements?: Partial<Record<"str" | "dex" | "int" | "fth", number>>;
  damage?: Partial<Record<"physical" | "magic" | "fire" | "lightning" | "dark", number>>;
  scaling?: Record<string, string>;
  resistances?: Partial<Record<"physical" | "magic" | "fire" | "lightning" | "dark", number>>;
  poise?: number;
  stability?: number;
}

export interface ItemGuidance {
  where: string;
  howToGetThere: string;
  howToObtain?: string;
  sources?: GuidanceSource[];
  warning?: string;
  buildRef?: string;
}

export interface GuidanceSource {
  type: "chest" | "buy" | "drop" | "trade" | "corpse" | "vendor" | "boss" | "gift";
  location: string;
  detail: string;
  unlock?: string;
}
