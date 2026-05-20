import type { AreaId } from "../data/areas";

export type AppView =
  | "dashboard"
  | "area"
  | "quests"
  | "trackers"
  | "build"
  | "farm"
  | "items"
  | "enemies"
  | "simulator"
  | "getop"
  | "worldmap";

export function scrollToProgressId(progressId: string): void {
  const el = document.getElementById(`progress-${progressId}`);
  el?.scrollIntoView({ behavior: "smooth", block: "center" });
}

export function areaChecklistElementId(progressId: string): string {
  return `progress-${progressId}`;
}

export function enemyElementId(enemyId: string): string {
  return `enemy-${enemyId}`;
}

export interface NavigateHandlers {
  setView: (v: AppView) => void;
  setSelectedArea: (a: AreaId | null) => void;
  setSelectedEnemy?: (id: string | null) => void;
  setBuildOpenSub?: (sub: string | null) => void;
}

export function navigateToAreaRow(h: NavigateHandlers, areaId: AreaId, progressId: string) {
  h.setSelectedArea(areaId);
  h.setView("area");
  requestAnimationFrame(() => scrollToProgressId(progressId));
}

export function navigateToEnemy(h: NavigateHandlers, enemyId: string) {
  h.setSelectedEnemy?.(enemyId);
  h.setView("enemies");
  requestAnimationFrame(() => {
    document.getElementById(enemyElementId(enemyId))?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}
