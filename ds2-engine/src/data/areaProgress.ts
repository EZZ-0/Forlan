/**
 * Bulk mark/clear ID groups per area (route, quests, secrets, build).
 */

import type { AreaId, AreaItem, ProgressTier } from "./areas";
import { getArea } from "./areas";
import { enrichAreaItems, getEffectiveTier } from "./areaProgressTier";
import { ILLUSORY_WALLS, BREAKABLE_WALLS, PHARROS_KEY_USES } from "./ds2Database";
import { getQuestStepsInArea } from "../utils/questArea";
import type { BuildStep } from "./buildChecklist";

export type { ProgressTier } from "./areas";
export { inferProgressTier, enrichAreaItems, getEffectiveTier } from "./areaProgressTier";

export function getCheckableIdsFromItems(items: AreaItem[]): string[] {
  const ids: string[] = [];
  for (const i of items) {
    if (i.type === "warn") continue;
    if (i.subItems?.length) {
      for (const s of i.subItems) ids.push(s.id);
    } else {
      ids.push(i.id);
    }
  }
  return ids;
}

export function getItemsByTier(
  items: AreaItem[],
  tier: ProgressTier | "all"
): string[] {
  const enriched = enrichAreaItems(items);
  const ids: string[] = [];
  for (const item of enriched) {
    if (item.type === "warn") continue;
    const itemTier = getEffectiveTier(item);
    if (tier !== "all" && itemTier !== tier) continue;
    if (item.subItems?.length) {
      for (const s of item.subItems) ids.push(s.id);
    } else {
      ids.push(item.id);
    }
  }
  return ids;
}

export function getRouteIdsForArea(areaId: AreaId): string[] {
  return getItemsByTier(getArea(areaId).items, "route");
}

export function getAllChecklistIdsForArea(areaId: AreaId): string[] {
  return getCheckableIdsFromItems(getArea(areaId).items);
}

export function getQuestRefIdsForArea(areaId: AreaId): string[] {
  return getQuestStepsInArea(areaId).map((q) => q.ref);
}

export function getSecretIdsForArea(areaId: AreaId): string[] {
  return [
    ...ILLUSORY_WALLS.filter((w) => w.areaId === areaId).map((w) => w.id),
    ...PHARROS_KEY_USES.filter((p) => p.areaId === areaId).map((p) => p.id),
    ...BREAKABLE_WALLS.filter((b) => b.areaId === areaId).map((b) => b.id),
  ];
}

export function getRouteLinkedBuildProgressIds(
  areaId: AreaId,
  buildSteps?: BuildStep[]
): string[] {
  if (!buildSteps?.length) return [];
  const routeIds = new Set(getRouteIdsForArea(areaId));
  const seen = new Set<string>();
  const out: string[] = [];
  for (const step of buildSteps) {
    if (step.optional) continue;
    if (!routeIds.has(step.progressId)) continue;
    if (seen.has(step.progressId)) continue;
    seen.add(step.progressId);
    out.push(step.progressId);
  }
  return out;
}

export function getCoreBuildProgressIds(
  areaId: AreaId,
  buildSteps?: BuildStep[]
): string[] {
  if (!buildSteps?.length) return [];
  return buildSteps
    .filter((s) => s.areaId === areaId && !s.optional)
    .map((s) => s.progressId);
}

export interface AreaBulkMarkGroup {
  label: string;
  markLabel: string;
  clearLabel: string;
  ids: string[];
}

export function getAreaBulkMarkGroups(
  areaId: AreaId,
  buildSteps?: BuildStep[]
): AreaBulkMarkGroup[] {
  const routeChecklist = getRouteIdsForArea(areaId);
  const routeBuild = getRouteLinkedBuildProgressIds(areaId, buildSteps);
  const routeIds = [...new Set([...routeChecklist, ...routeBuild])];

  const questIds = getQuestRefIdsForArea(areaId);
  const secretIds = getSecretIdsForArea(areaId);
  const buildIds = getCoreBuildProgressIds(areaId, buildSteps);
  const allChecklist = getAllChecklistIdsForArea(areaId);

  const groups: AreaBulkMarkGroup[] = [
    {
      label: "Route",
      markLabel: "Mark route",
      clearLabel: "Clear route",
      ids: routeIds,
    },
    {
      label: "Checklist",
      markLabel: "Mark all",
      clearLabel: "Clear all",
      ids: allChecklist,
    },
  ];

  if (questIds.length > 0) {
    groups.push({
      label: "Quests",
      markLabel: "Mark quests",
      clearLabel: "Clear quests",
      ids: questIds,
    });
  }

  if (secretIds.length > 0) {
    groups.push({
      label: "Secrets",
      markLabel: "Mark secrets",
      clearLabel: "Clear secrets",
      ids: secretIds,
    });
  }

  if (buildIds.length > 0) {
    groups.push({
      label: "Build",
      markLabel: "Mark build",
      clearLabel: "Clear build",
      ids: buildIds,
    });
  }

  return groups.filter((g) => g.ids.length > 0);
}

export function routeCompletion(
  areaId: AreaId,
  checked: Record<string, boolean>
): { done: number; total: number; pct: number } {
  const ids = getRouteIdsForArea(areaId);
  const done = ids.filter((id) => checked[id]).length;
  const total = ids.length;
  return { done, total, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
}
