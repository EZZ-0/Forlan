import { QUESTS } from "../data/quests";
import type { AreaId } from "../data/areas";

export interface QuestStepInArea {
  questKey: string;
  questName: string;
  questColor: string;
  questIcon: string;
  stepId: string;
  stepLabel: string;
  ref: string;
  isBoss: boolean;
}

export function getQuestStepsInArea(areaId: AreaId): QuestStepInArea[] {
  const result: QuestStepInArea[] = [];
  for (const [qk, q] of Object.entries(QUESTS)) {
    for (const step of q.steps) {
      if (step.area === areaId) {
        result.push({
          questKey: qk,
          questName: q.name,
          questColor: q.color,
          questIcon: q.icon,
          stepId: step.id,
          stepLabel: step.label,
          ref: step.ref ?? step.id,
          isBoss: false,
        });
      }
    }
    for (const b of q.bosses) {
      if (b.area === areaId) {
        result.push({
          questKey: qk,
          questName: q.name,
          questColor: q.color,
          questIcon: q.icon,
          stepId: b.id,
          stepLabel: b.label,
          ref: b.ref,
          isBoss: true,
        });
      }
    }
  }
  return result;
}

export function getQuestStepsByArea(questKey: string): { area: AreaId; steps: string[] }[] {
  const q = QUESTS[questKey];
  if (!q) return [];
  const byArea: Partial<Record<AreaId, string[]>> = {};
  for (const step of q.steps) {
    const arr = byArea[step.area] ?? [];
    arr.push(step.ref ?? step.id);
    byArea[step.area] = arr;
  }
  for (const b of q.bosses) {
    const arr = byArea[b.area] ?? [];
    arr.push(b.ref);
    byArea[b.area] = arr;
  }
  return Object.entries(byArea).map(([area, steps]) => ({
    area: area as AreaId,
    steps,
  }));
}
