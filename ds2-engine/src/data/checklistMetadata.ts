/**
 * Checklist row metadata — NG cycle, categories, flags, filter presets.
 */

import type { AreaItem, ChecklistCategory, NgCycle, RowFlags } from "./areas";
import { getEffectiveTier } from "./areaProgressTier";
import { getAchievementLinkedIds } from "./achievements";

export type {
  NgCycle,
  ChecklistCategory,
  RowFlags,
  AreaItemExtra,
} from "./areas";

export type AreaViewMode = "full" | "platinum" | "mainPath" | "custom";

export type NgFilter = "all" | NgCycle;

export interface AreaFilterState {
  viewMode: AreaViewMode;
  hideCompleted: boolean;
  categories: ChecklistCategory[];
  ngFilter: NgFilter;
}

export const DEFAULT_AREA_FILTERS: AreaFilterState = {
  viewMode: "full",
  hideCompleted: false,
  categories: [],
  ngFilter: "all",
};

const CATEGORY_LABELS: Record<ChecklistCategory, string> = {
  boss: "Boss",
  npc: "NPC",
  bonfire: "Bonfire",
  key: "Key",
  loot: "Loot",
  quest: "Quest",
  covenant: "Covenant",
  gesture: "Gesture",
  secret: "Secret",
  warn: "Warning",
  other: "Other",
};

export const ALL_CHECKLIST_CATEGORIES = Object.keys(CATEGORY_LABELS) as ChecklistCategory[];

export function getCategoryLabel(c: ChecklistCategory): string {
  return CATEGORY_LABELS[c];
}

/** Infer category from row type and tags when not set explicitly. */
export function inferChecklistCategory(item: AreaItem): ChecklistCategory {
  if (item.category) return item.category;
  if (item.type === "warn") return "warn";
  if (item.type === "boss") return "boss";
  if (item.type === "npc") return "npc";
  if (item.type === "bonfire") return "bonfire";
  if (item.type === "key") return "key";
  const tags = item.tags ?? [];
  if (tags.includes("covenant")) return "covenant";
  if (tags.some((t) => t.startsWith("gesture:"))) return "gesture";
  if (tags.includes("illusory") || tags.includes("pharros") || tags.includes("breakable")) {
    return "secret";
  }
  if (item.questRef) return "quest";
  if (item.type === "item") return "loot";
  return "other";
}

export function getRowFlags(item: AreaItem): RowFlags {
  return item.flags ?? {};
}

const ACHIEVEMENT_IDS = getAchievementLinkedIds();

export function itemVisibleInViewMode(item: AreaItem, viewMode: AreaViewMode): boolean {
  if (item.type === "warn") return viewMode === "full";

  const tier = getEffectiveTier(item);
  const flags = getRowFlags(item);

  switch (viewMode) {
    case "full":
      return true;
    case "mainPath":
      return tier === "route";
    case "platinum": {
      if (tier === "route") return true;
      if (flags.missable || flags.achievement) return true;
      if (ACHIEVEMENT_IDS.has(item.id)) return true;
      if (item.subItems?.some((s) => ACHIEVEMENT_IDS.has(s.id))) return true;
      return false;
    }
    case "custom":
      return true;
    default:
      return true;
  }
}

export function itemMatchesNgFilter(item: AreaItem, ngFilter: NgFilter): boolean {
  if (ngFilter === "all") return true;
  const cycle = item.ngCycle ?? "any";
  return cycle === "any" || cycle === ngFilter;
}

export function itemMatchesCategoryFilter(
  item: AreaItem,
  categories: ChecklistCategory[]
): boolean {
  if (categories.length === 0) return true;
  return categories.includes(inferChecklistCategory(item));
}

export function isItemCompleted(item: AreaItem, checked: Record<string, boolean>): boolean {
  if (item.subItems?.length) {
    return item.subItems.every((s) => checked[s.id]);
  }
  return !!checked[item.id];
}

export function filterAreaItems(
  items: AreaItem[],
  checked: Record<string, boolean>,
  filters: AreaFilterState
): AreaItem[] {
  return items
    .map((item) => {
      if (item.subItems?.length) {
        const subItems = item.subItems.filter((sub) => {
          const pseudo: AreaItem = {
            id: sub.id,
            text: sub.text,
            type: item.type,
            progressTier: item.progressTier,
            ngCycle: item.ngCycle,
            category: item.category,
            flags: item.flags,
          };
          return rowPassesFilters(pseudo, checked, filters);
        });
        if (subItems.length === 0) return null;
        return { ...item, subItems };
      }
      return rowPassesFilters(item, checked, filters) ? item : null;
    })
    .filter((i): i is AreaItem => i !== null);
}

function rowPassesFilters(
  item: AreaItem,
  checked: Record<string, boolean>,
  filters: AreaFilterState
): boolean {
  if (!itemVisibleInViewMode(item, filters.viewMode)) return false;
  if (!itemMatchesNgFilter(item, filters.ngFilter)) return false;
  if (filters.viewMode === "custom" && !itemMatchesCategoryFilter(item, filters.categories)) {
    return false;
  }
  if (filters.hideCompleted && isItemCompleted(item, checked)) return false;
  return true;
}

export const AREA_FILTER_STORAGE_KEY = "ds2-area-filters-v1";
