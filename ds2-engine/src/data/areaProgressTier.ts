/**
 * Progress tier inference and enrichment for area checklist items.
 */

import type { AreaItem, ProgressTier } from "./areas";
import { SEMI_FAST_SKIP_IDS, ROUTE_EXPLICIT_IDS } from "./semiFastConstants";

const COLLECTIBLE_TAG_PREFIXES = ["estus:", "bone:", "gesture:"];

export function inferProgressTier(item: AreaItem): ProgressTier {
  if (item.type === "warn") return "optional";
  if (item.progressTier) return item.progressTier;

  const text = item.text.toLowerCase();
  const tags = item.tags ?? [];

  if (SEMI_FAST_SKIP_IDS.has(item.id)) return "optional";
  if (/optional/i.test(item.text)) return "optional";
  if (item.questRef?.startsWith("lucatiel_boss")) return "optional";
  if (tags.includes("covenant")) return "optional";

  if (ROUTE_EXPLICIT_IDS.has(item.id)) return "route";

  if (item.type === "boss") {
    if (/optional/i.test(item.text)) return "optional";
    return "route";
  }
  if (item.type === "bonfire" || item.type === "key" || item.type === "npc") {
    return "route";
  }

  if (item.type === "item") {
    if (tags.some((t) => COLLECTIBLE_TAG_PREFIXES.some((p) => t.startsWith(p)))) {
      return "collectible";
    }
    if (tags.includes("illusory") || tags.includes("pharros")) {
      return "optional";
    }
    if (/★|critical|must|before boss|required/i.test(item.text)) {
      return "route";
    }
    if (/shard|ring|coin|herb|lifegem|soul of|titanite|smooth|silky|bleed stone|bolt stone/i.test(text)) {
      return "collectible";
    }
    return "collectible";
  }

  return "collectible";
}

export function enrichAreaItems(items: AreaItem[]): AreaItem[] {
  return items.map((item) => {
    const parentTier = item.progressTier ?? inferProgressTier(item);
    if (item.subItems?.length) {
      return {
        ...item,
        progressTier: parentTier,
        subItems: item.subItems.map((s) => ({ ...s })),
      };
    }
    return { ...item, progressTier: parentTier };
  });
}

export function getEffectiveTier(item: AreaItem): ProgressTier {
  return item.progressTier ?? inferProgressTier(item);
}
