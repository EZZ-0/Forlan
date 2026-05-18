import { AREA_ORDER, getArea, type AreaId, type AreaItem } from "../data/areas";
import { QUESTS } from "../data/quests";
import { GESTURES } from "../data/gestures";
import { COVENANTS } from "../data/covenants";
import type { ProgressState } from "../types";

function getCheckableIds(areaId: AreaId): string[] {
  const area = getArea(areaId);
  return getCheckableIdsFromItems(area.items);
}

function getCheckableIdsFromItems(items: AreaItem[]): string[] {
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

export function areaCompletion(
  areaId: AreaId,
  checked: Record<string, boolean>
) {
  const ids = getCheckableIds(areaId);
  const done = ids.filter((id) => checked[id]).length;
  const total = ids.length;
  return {
    done,
    total,
    pct: total > 0 ? Math.round((done / total) * 100) : 0,
  };
}

export function areaCompletionFromItems(
  items: AreaItem[],
  checked: Record<string, boolean>
) {
  const ids = getCheckableIdsFromItems(items);
  const done = ids.filter((id) => checked[id]).length;
  const total = ids.length;
  return {
    done,
    total,
    pct: total > 0 ? Math.round((done / total) * 100) : 0,
  };
}

export function questStats(checked: Record<string, boolean>) {
  const result: Record<
    string,
    { stepsDone: number; stepsTotal: number; bossesDone: number; bossesNeeded: number }
  > = {};
  for (const [qk, q] of Object.entries(QUESTS)) {
    const stepsDone = q.steps.filter((s) =>
      checked[s.ref ?? s.id]
    ).length;
    const bossesDone = q.bosses.filter((b) => checked[b.ref]).length;
    result[qk] = {
      stepsDone,
      stepsTotal: q.steps.length,
      bossesDone,
      bossesNeeded: q.bossSurvivalNeeded,
    };
  }
  return result;
}

export function computeStats(state: ProgressState) {
  const { checked } = state;
  const allItems = AREA_ORDER.flatMap((ak) => getCheckableIds(ak));
  const checkedCount = allItems.filter((id) => checked[id]).length;
  const total = allItems.length;

  const qStats = questStats(checked);

  const defaultGestures = 4;
  const gesturesDone =
    defaultGestures +
    GESTURES.filter((g) => g.ref && checked[g.ref]).length;

  const covenantsDone = COVENANTS.filter((c) => checked[c.ref]).length;

  const estusIds = ["mj6", "fg8a", "lb6", "hc7", "ep8", "ik3", "sw9", "bc2", "dc7", "sa2", "ak3", "da7"];
  const estus = estusIds.filter((id) => checked[id]).length;

  const boneIds = ["ht3", "hv3", "ik4", "bc3", "sr2"];
  const boneDust = boneIds.filter((id) => checked[id]).length;

  return {
    total,
    checkedCount,
    pct: total > 0 ? Math.round((checkedCount / total) * 100) : 0,
    questStats: qStats,
    gesturesDone,
    covenantsDone,
    estus,
    boneDust,
  };
}
