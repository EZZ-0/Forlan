import type { BuildProgressMap, BuildProgressSlice, ProgressState } from "../types";
import { DEFAULT_BUILD_TEMPLATE_ID } from "../data/buildTemplates";

export function emptyBuildProgressSlice(): BuildProgressSlice {
  return { levels: {} };
}

/** Active build's level checkmarks for UI hooks */
export function getBuildLevels(
  state: Pick<ProgressState, "buildProgress" | "buildLevels" | "buildTemplateId">,
  templateId?: string
): Record<number, boolean> {
  const id = templateId ?? state.buildTemplateId ?? DEFAULT_BUILD_TEMPLATE_ID;
  if (state.buildProgress?.[id]?.levels) {
    return state.buildProgress[id].levels;
  }
  // Legacy flat buildLevels only applies to active template during migration window
  if (!state.buildProgress && state.buildLevels && id === (state.buildTemplateId ?? DEFAULT_BUILD_TEMPLATE_ID)) {
    return state.buildLevels;
  }
  return {};
}

export function migrateProgressState(parsed: Partial<ProgressState> & { buildLevels?: Record<number, boolean> }): {
  buildProgress: BuildProgressMap;
  buildTemplateId: string;
} {
  const buildTemplateId = parsed.buildTemplateId ?? DEFAULT_BUILD_TEMPLATE_ID;
  const buildProgress: BuildProgressMap = { ...(parsed.buildProgress ?? {}) };

  const legacy = parsed.buildLevels ?? {};
  if (Object.keys(legacy).length > 0) {
    const existing = buildProgress[buildTemplateId]?.levels ?? {};
    buildProgress[buildTemplateId] = {
      levels: { ...existing, ...legacy },
    };
  }

  for (const id of Object.keys(buildProgress)) {
    if (!buildProgress[id].levels) {
      buildProgress[id] = { levels: {} };
    }
  }

  return { buildProgress, buildTemplateId };
}

export function countCompletedLevels(
  levels: Record<number, boolean>,
  templateLevelSls: number[]
): { done: number; total: number } {
  const total = templateLevelSls.length;
  const done = templateLevelSls.filter((sl) => levels[sl]).length;
  return { done, total };
}
