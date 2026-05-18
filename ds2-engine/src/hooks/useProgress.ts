import { useState, useEffect, useCallback, useMemo } from "react";
import { STORAGE_KEY, getProgressKey, type ProgressState } from "../types";
import { DEFAULT_BUILD_TEMPLATE_ID } from "../data/buildTemplates";
import {
  emptyBuildProgressSlice,
  getBuildLevels,
  migrateProgressState,
} from "../utils/buildProgress";

const DEFAULT_STATE: ProgressState = {
  checked: {},
  buildProgress: {},
  buildTemplateId: DEFAULT_BUILD_TEMPLATE_ID,
};

const SPLIT_ITEM_MIGRATION: Record<string, string[]> = {
  lb13: ["lb13a", "lb13b", "lb13c", "lb13d", "lb13e", "lb13f"],
  tb13: ["tb13a", "tb13b", "tb13c"],
  ht2: ["ht2a", "ht2b", "ht2c", "ht2d"],
  mj3: ["mj3a", "mj3b", "mj3c"],
  mj12: ["mj12a", "mj12b", "mj12c", "mj12d"],
  fg7: ["fg7a", "fg7b", "fg7c", "fg7d"],
  fg8: ["fg8a", "fg8b"],
  nm3: ["nm3a", "nm3b", "nm3c"],
  dp4: ["dp4a", "dp4b"],
  ep10: ["ep10a", "ep10b"],
  ik13: ["ik13a", "ik13b", "ik13c"],
};

function migrateSplitItems(checked: Record<string, boolean>): Record<string, boolean> {
  const next = { ...checked };
  for (const [oldId, newIds] of Object.entries(SPLIT_ITEM_MIGRATION)) {
    if (checked[oldId] === true) {
      for (const id of newIds) next[id] = true;
      delete next[oldId];
    }
  }
  return next;
}

function migrateLegacy(parsed: unknown): ProgressState {
  if (parsed && typeof parsed === "object" && "checked" in parsed) {
    const p = parsed as Partial<ProgressState>;
    const checked = migrateSplitItems(p.checked ?? {});
    const { buildProgress, buildTemplateId } = migrateProgressState(p);
    return {
      checked,
      buildProgress,
      buildTemplateId,
      buildStats: p.buildStats,
      lastExport: p.lastExport,
    };
  }
  if (parsed && typeof parsed === "object" && !("checked" in parsed)) {
    const p = parsed as Record<string, boolean>;
    const checked: Record<string, boolean> = {};
    for (const [k, v] of Object.entries(p)) {
      if (typeof v === "boolean") checked[k] = v;
    }
    return {
      checked: migrateSplitItems(checked),
      buildProgress: {},
      buildTemplateId: DEFAULT_BUILD_TEMPLATE_ID,
    };
  }
  return DEFAULT_STATE;
}

function hasAnyProgress(state: ProgressState): boolean {
  if (Object.keys(state.checked).length > 0) return true;
  if (state.buildProgress) {
    return Object.values(state.buildProgress).some((b) => Object.keys(b.levels).length > 0);
  }
  return Object.keys(state.buildLevels ?? {}).length > 0;
}

function loadFromStorage(storageKey: string): ProgressState {
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      const parsed = JSON.parse(raw) as unknown;
      return migrateLegacy(parsed);
    }
  } catch {
    // ignore
  }
  return DEFAULT_STATE;
}

export function useProgress(profileId: string | null) {
  const storageKey = profileId ? getProgressKey(profileId) : STORAGE_KEY;
  const [state, setState] = useState<ProgressState>(DEFAULT_STATE);
  const [loaded, setLoaded] = useState(false);

  const buildTemplateId = state.buildTemplateId ?? DEFAULT_BUILD_TEMPLATE_ID;

  const activeBuildLevels = useMemo(
    () => getBuildLevels(state, buildTemplateId),
    [state, buildTemplateId]
  );

  useEffect(() => {
    const fromStorage = loadFromStorage(storageKey);
    if (hasAnyProgress(fromStorage)) {
      setState(fromStorage);
      setLoaded(true);
      return;
    }
    fetch("/ds2_progress.json")
      .then((r) => r.json())
      .then((parsed) => {
        setState(migrateLegacy(parsed));
      })
      .catch(() => setState(fromStorage))
      .finally(() => setLoaded(true));
  }, [storageKey]);

  useEffect(() => {
    if (!loaded) return;
    try {
      const toSave = { ...state };
      delete toSave.buildLevels;
      localStorage.setItem(storageKey, JSON.stringify(toSave));
    } catch {
      // ignore
    }
  }, [state, loaded, storageKey]);

  const toggle = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      checked: { ...s.checked, [id]: !s.checked[id] },
    }));
  }, []);

  const toggleBuildLevel = useCallback(
    (sl: number, templateId?: string) => {
      const tid = templateId ?? buildTemplateId;
      setState((s) => {
        const progress = { ...(s.buildProgress ?? {}) };
        const slice = progress[tid] ?? emptyBuildProgressSlice();
        const levels = { ...slice.levels, [sl]: !slice.levels[sl] };
        if (!levels[sl]) delete levels[sl];
        progress[tid] = { levels };
        return { ...s, buildProgress: progress, buildTemplateId: s.buildTemplateId ?? tid };
      });
    },
    [buildTemplateId]
  );

  const setBuildLevelsForTemplate = useCallback((levels: Record<number, boolean>, templateId?: string) => {
    const tid = templateId ?? buildTemplateId;
    setState((s) => {
      const progress = { ...(s.buildProgress ?? {}) };
      progress[tid] = { levels: { ...levels } };
      return { ...s, buildProgress: progress };
    });
  }, [buildTemplateId]);

  const exportProgress = useCallback(() => {
    const toExport = { ...state };
    delete toExport.buildLevels;
    const data = JSON.stringify(toExport, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ds2-progress-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setState((s) => ({ ...s, lastExport: new Date().toISOString() }));
  }, [state]);

  const importProgress = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string) as unknown;
        setState(migrateLegacy(parsed));
      } catch {
        // ignore invalid
      }
    };
    reader.readAsText(file);
  }, []);

  const resetAll = useCallback(() => {
    setState(DEFAULT_STATE);
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
  }, [storageKey]);

  const setBuildTemplateId = useCallback((id: string) => {
    setState((s) => {
      const progress = { ...(s.buildProgress ?? {}) };
      if (!progress[id]) progress[id] = emptyBuildProgressSlice();
      return { ...s, buildTemplateId: id, buildProgress: progress };
    });
  }, []);

  return {
    state,
    loaded,
    buildTemplateId,
    activeBuildLevels,
    toggle,
    toggleBuildLevel,
    setBuildLevels: setBuildLevelsForTemplate,
    setBuildTemplateId,
    exportProgress,
    importProgress,
    resetAll,
  };
}
