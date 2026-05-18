import { useMemo } from "react";
import { getBuildTemplate, DEFAULT_BUILD_TEMPLATE_ID } from "../data/buildTemplates";
import { STARTING_SL } from "../data/buildTemplates/levelGenerator";
import type { ProgressState } from "../types";
import { getBuildLevels } from "../utils/buildProgress";

export function useBuildSuggest(
  state: Pick<ProgressState, "buildProgress" | "buildLevels" | "buildTemplateId">
) {
  const buildTemplateId = state.buildTemplateId ?? DEFAULT_BUILD_TEMPLATE_ID;
  const buildLevels = getBuildLevels(state, buildTemplateId);
  const template = getBuildTemplate(buildTemplateId);
  const baseStats: Record<string, number> = template?.baseStats ?? {};
  const levels = template?.levels ?? [];
  const phaseTargets = template?.phaseTargets ?? {};
  const phasePriority = template?.phasePriority ?? {};

  const currentStats = useMemo((): Record<string, number> => {
    const stats: Record<string, number> = { ...baseStats };
    const sorted = [...levels].sort((a, b) => a.sl - b.sl);
    for (const l of sorted) {
      if (buildLevels[l.sl]) {
        stats[l.stat] = l.value;
      }
    }
    return stats;
  }, [buildLevels, buildTemplateId]);

  const levelsCompleted = useMemo(
    () => levels.filter((l) => buildLevels[l.sl]).length,
    [buildLevels, levels]
  );

  const startSl = template ? STARTING_SL[template.startingClass] : 11;

  const currentSL = useMemo(() => {
    return startSl + levelsCompleted;
  }, [levelsCompleted, startSl]);

  const currentPhase = useMemo(() => {
    const lastCompleted = levels
      .filter((l) => buildLevels[l.sl])
      .sort((a, b) => b.sl - a.sl)[0];
    return lastCompleted?.phase ?? 1;
  }, [buildLevels, buildTemplateId]);

  const { nextSuggestion, allOptions } = useMemo(() => {
    const targets = phaseTargets[currentPhase];
    const priority = phasePriority[currentPhase];
    if (!targets || !priority) return { nextSuggestion: null, allOptions: [] };

    const statsBelowTarget: { stat: string; gap: number; priorityIdx: number; target: number; current: number }[] = [];
    for (const stat of priority) {
      const target = targets[stat];
      if (target == null) continue;
      const current = currentStats[stat] ?? baseStats[stat] ?? 0;
      if (current < target) {
        statsBelowTarget.push({
          stat,
          gap: target - current,
          priorityIdx: priority.indexOf(stat),
          target,
          current,
        });
      }
    }
    if (statsBelowTarget.length === 0) return { nextSuggestion: null, allOptions: [] };

    statsBelowTarget.sort((a, b) => b.gap - a.gap || a.priorityIdx - b.priorityIdx);
    const chosenStat = statsBelowTarget[0].stat;

    const nextLevel = levels.find(
      (l) => l.phase === currentPhase && l.stat === chosenStat && !buildLevels[l.sl]
    );
    const nextSuggestion =
      nextLevel ??
      { stat: chosenStat, target: targets[chosenStat], current: currentStats[chosenStat] ?? baseStats[chosenStat] };

    return {
      nextSuggestion,
      allOptions: statsBelowTarget.map((s) => ({
        stat: s.stat,
        current: s.current,
        target: s.target,
        gap: s.gap,
      })),
    };
  }, [currentPhase, currentStats, buildLevels, buildTemplateId]);

  const phaseComplete = useMemo(() => {
    const targets = phaseTargets[currentPhase];
    if (!targets) return false;
    return Object.entries(targets).every(([stat, target]) => (currentStats[stat] ?? 0) >= target);
  }, [currentPhase, currentStats, phaseTargets]);

  return {
    currentStats,
    currentSL,
    currentPhase,
    levelsCompleted,
    nextSuggestion,
    allOptions,
    phaseComplete,
  };
}
