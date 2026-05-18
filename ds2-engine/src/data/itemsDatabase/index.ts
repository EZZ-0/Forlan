/**
 * DS2 Items Database — Resolver and search.
 * getItemById, getAllItems, search. Merges buildItems guidance, areaItemDetails,
 * shopUnlocks, enemyDrops.
 */

import type { ItemDatabaseEntry, GuidanceSource, ItemBuildRelevance } from "./types";
import { AREA_ITEM_ID_TO_DB_ID } from "./idMap";
import { FULL_DS2_ITEMS } from "./items/fullList";
import { DB_WEAPONS_FULL } from "./items/weaponsFull";
import { DB_WEAPONS } from "./items/weapons";
import { DB_RINGS } from "./items/rings";
import { DB_CATALYSTS } from "./items/catalysts";
import { DB_SPELLS } from "./items/spells";
import { DB_ARMOR } from "./items/armor";
import { BUILD_ITEMS } from "../buildItems";
import { AREA_ITEM_DETAILS } from "../areaItemDetails";
import { SHOP_UNLOCKS } from "../shopUnlocks";
import { ENEMY_DROPS } from "../enemyDrops";
import { WEAPON_LOCATIONS } from "../weaponLocations";

const DETAILED_ITEMS: ItemDatabaseEntry[] = [
  ...DB_WEAPONS_FULL,
  ...DB_WEAPONS,
  ...DB_RINGS,
  ...DB_CATALYSTS,
  ...DB_SPELLS,
  ...DB_ARMOR,
];

const MERGED_BY_ID = new Map<string, ItemDatabaseEntry>();
for (const item of FULL_DS2_ITEMS) {
  MERGED_BY_ID.set(item.id, item);
}
for (const item of DETAILED_ITEMS) {
  MERGED_BY_ID.set(item.id, item);
}

/** Merged: fullList + detailed. Detailed entries override fullList by id. */
const ALL_DB_ITEMS: ItemDatabaseEntry[] = Array.from(MERGED_BY_ID.values());

const ITEM_BY_ID = new Map<string, ItemDatabaseEntry>();
for (const item of ALL_DB_ITEMS) {
  ITEM_BY_ID.set(item.id, item);
  if (item.aliases) {
    for (const alias of item.aliases) {
      const normalized = alias.toLowerCase().replace(/\s+/g, "_");
      if (!ITEM_BY_ID.has(normalized)) ITEM_BY_ID.set(normalized, item);
    }
  }
}

/** Build item name → dbId for merge */
const BUILD_ITEM_BY_NAME = new Map<string, (typeof BUILD_ITEMS)[number]>();
for (const bi of BUILD_ITEMS) {
  BUILD_ITEM_BY_NAME.set(bi.name.toLowerCase(), bi);
}

/** Normalize name for matching: lowercase, collapse spaces, trim */
function normalizeName(s: string): string {
  return s
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/** Item name (normalized) → dbId for shop/drop matching */
const NAME_TO_DB_ID = new Map<string, string>();
for (const item of ALL_DB_ITEMS) {
  const n = normalizeName(item.name);
  if (!NAME_TO_DB_ID.has(n)) NAME_TO_DB_ID.set(n, item.id);
  if (item.aliases) {
    for (const a of item.aliases) {
      const na = normalizeName(a);
      if (!NAME_TO_DB_ID.has(na)) NAME_TO_DB_ID.set(na, item.id);
    }
  }
}

/** Extract item-like tokens from shop unlock item string (e.g. "Mace, Titanite Shards" or "Shop (Mace, upgrades)") */
function tokensFromShopItem(str: string): string[] {
  const raw = str
    .replace(/[()]/g, ",")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const skip = new Set(["shop", "upgrades", "unlimited", "limited", "etc", "each", "each piece", "menu", "trades", "boss soul"]);
  return raw.filter((t) => t.length > 1 && !skip.has(t.toLowerCase()));
}

/** Parse souls from detail string (e.g. "1,000 souls", "13,400 souls") */
function parseSoulsFromDetail(detail: string | undefined): number | undefined {
  if (!detail) return undefined;
  const m = detail.match(/(\d[\d,]*)\s*souls?/i);
  if (!m) return undefined;
  const n = parseInt(m[1]!.replace(/,/g, ""), 10);
  return isNaN(n) ? undefined : n;
}

/**
 * Get item by canonical id or alias.
 * Merges: buildItems.whereToFind → guidance.sources, areaItemDetails → guidance,
 * shopUnlocks → vendor sources, enemyDrops → farming.
 */
export function getItemDetail(id: string): ItemDatabaseEntry | undefined {
  const dbId = AREA_ITEM_ID_TO_DB_ID[id] ?? id;
  let entry = ITEM_BY_ID.get(dbId) ?? ITEM_BY_ID.get(id);
  if (!entry) return undefined;

  entry = { ...entry };

  const buildItem = BUILD_ITEM_BY_NAME.get(entry.name.toLowerCase());
  if (buildItem?.whereToFind?.length) {
    const sources = buildItem.whereToFind.map((s) => ({
      type: s.type,
      location: s.location,
      detail: s.detail,
      unlock: s.unlock,
    }));
    const existing = entry.guidance ?? { where: "", howToGetThere: "" };
    entry.guidance = {
      ...existing,
      where: existing.where || buildItem.whereToFind[0]!.location,
      howToGetThere: existing.howToGetThere || "",
      sources: [...(existing.sources ?? []), ...sources],
      buildRef: buildItem.notes ?? existing.buildRef,
    };
  }

  const areaDetail = AREA_ITEM_DETAILS[id] ?? (dbId !== id ? AREA_ITEM_DETAILS[dbId] : undefined);
  if (areaDetail) {
    const existing = entry.guidance ?? { where: "", howToGetThere: "" };
    entry.guidance = {
      ...existing,
      where: areaDetail.where,
      howToGetThere: areaDetail.howToGetThere,
      howToObtain: areaDetail.howToObtain ?? existing.howToObtain,
      warning: areaDetail.warning ?? existing.warning,
    };
  }

  // Merge shopUnlocks — match by item name (tokens from composite strings)
  const entryNameNorm = normalizeName(entry.name);
  const vendorSources: GuidanceSource[] = [];
  for (const su of SHOP_UNLOCKS) {
    const tokens = tokensFromShopItem(su.item);
    const matches =
      tokens.some((t) => normalizeName(t) === entryNameNorm) ||
      tokens.some((t) => entryNameNorm.includes(normalizeName(t))) ||
      normalizeName(su.item).includes(entryNameNorm);
    if (matches) {
      const detailStr = [su.condition, su.detail].filter(Boolean).join(" — ");
      vendorSources.push({
        type: "vendor",
        location: su.merchant,
        detail: detailStr,
        unlock: su.condition,
      });
      const souls = parseSoulsFromDetail(su.detail);
      if (souls !== undefined && (entry.cost?.souls == null || entry.cost.souls > souls)) {
        entry.cost = { ...entry.cost, souls };
      }
    }
  }
  if (vendorSources.length) {
    const existing = entry.guidance ?? { where: "", howToGetThere: "" };
    entry.guidance = {
      ...existing,
      sources: [...(existing.sources ?? []), ...vendorSources],
    };
  }

  // Merge enemyDrops — match by item name (exact or normalized)
  const dropSources: GuidanceSource[] = [];
  let firstDrop: { enemy: string; area: string; rate: string } | null = null;
  for (const e of ENEMY_DROPS) {
    for (const d of e.drops) {
      const dropNameNorm = normalizeName(d.item);
      if (dropNameNorm === entryNameNorm || entry.aliases?.some((a) => normalizeName(a) === dropNameNorm)) {
        dropSources.push({
          type: "drop",
          location: e.name,
          detail: d.rate,
        });
        if (!firstDrop) firstDrop = { enemy: e.name, area: e.area, rate: d.rate };
      }
    }
  }
  if (dropSources.length) {
    const existing = entry.guidance ?? { where: "", howToGetThere: "" };
    entry.guidance = {
      ...existing,
      sources: [...(existing.sources ?? []), ...dropSources],
    };
    entry.farming = {
      farmable: true,
      enemy: firstDrop!.enemy,
      area: firstDrop!.area,
      dropRate: firstDrop!.rate,
    };
  }

  // Merge WEAPON_LOCATIONS — when no guidance from shop/drops, add acquisition data
  const weaponLoc = WEAPON_LOCATIONS[entry.id] ?? WEAPON_LOCATIONS[dbId];
  if (weaponLoc && (!entry.guidance?.where || !entry.guidance?.sources?.length)) {
    const existing = entry.guidance ?? { where: "", howToGetThere: "" };
    entry.guidance = {
      ...existing,
      where: existing.where || weaponLoc.where,
      howToGetThere: existing.howToGetThere || weaponLoc.howToGetThere || "",
      howToObtain: existing.howToObtain ?? weaponLoc.howToObtain,
      sources: [
        ...(existing.sources ?? []),
        {
          type: weaponLoc.sourceType,
          location: weaponLoc.where,
          detail: weaponLoc.howToObtain ?? "",
          unlock: weaponLoc.howToGetThere,
        },
      ],
    };
    if (weaponLoc.cost?.souls != null && (entry.cost?.souls == null || entry.cost.souls > weaponLoc.cost.souls)) {
      entry.cost = { ...entry.cost, souls: weaponLoc.cost.souls };
    }
    if (weaponLoc.cost?.special) {
      entry.cost = { ...entry.cost, special: weaponLoc.cost.special };
    }
    if (weaponLoc.farming && !entry.farming) {
      entry.farming = {
        farmable: true,
        enemy: weaponLoc.farming.enemy,
        area: weaponLoc.farming.area,
        dropRate: weaponLoc.farming.dropRate,
      };
    }
  }

  return entry;
}

/**
 * Get all items. Optionally filter by category.
 */
export function getAllItems(category?: ItemDatabaseEntry["category"]): ItemDatabaseEntry[] {
  if (!category) return [...ALL_DB_ITEMS];
  return ALL_DB_ITEMS.filter((i) => i.category === category);
}

/**
 * Search items by name or alias (case-insensitive).
 */
export function searchItems(query: string, category?: ItemDatabaseEntry["category"]): ItemDatabaseEntry[] {
  const q = query.toLowerCase().trim();
  if (!q) return getAllItems(category);

  let items = category ? getAllItems(category) : [...ALL_DB_ITEMS];
  return items.filter((item) => {
    if (item.name.toLowerCase().includes(q)) return true;
    if (item.aliases?.some((a) => a.toLowerCase().includes(q))) return true;
    if (item.id.toLowerCase().includes(q)) return true;
    return false;
  });
}

/** Resolve buildRelevance for a build. Handles legacy (single) and multi-build format. */
export function getBuildRelevanceForBuild(
  entry: ItemDatabaseEntry,
  buildTemplateId: string = "dark-melee-hexer"
): ItemBuildRelevance | undefined {
  const br = entry.buildRelevance;
  if (!br) return undefined;
  const asRecord = br as Record<string, ItemBuildRelevance>;
  if (asRecord[buildTemplateId]) return asRecord[buildTemplateId];
  if ("phase" in br && typeof (br as ItemBuildRelevance).phase === "number") {
    return buildTemplateId === "dark-melee-hexer" ? (br as ItemBuildRelevance) : undefined;
  }
  return undefined;
}

export type { ItemDatabaseEntry, ItemCategory } from "./types";
