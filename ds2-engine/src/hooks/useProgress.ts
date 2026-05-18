import { useState, useEffect, useCallback } from "react";
import { STORAGE_KEY, getProgressKey, type ProgressState } from "../types";
import { DEFAULT_BUILD_TEMPLATE_ID } from "../data/buildTemplates";

const DEFAULT_STATE: ProgressState = {
  checked: {},
  buildLevels: {},
  buildTemplateId: DEFAULT_BUILD_TEMPLATE_ID,
};

/** Old item IDs that were split into subItems. When migrating, copy value to all new IDs. */
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
    return {
      checked,
      buildLevels: p.buildLevels ?? {},
      buildTemplateId: p.buildTemplateId ?? DEFAULT_BUILD_TEMPLATE_ID,
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
    return { checked: migrateSplitItems(checked), buildLevels: {}, buildTemplateId: DEFAULT_BUILD_TEMPLATE_ID };
  }
  return DEFAULT_STATE;
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

  useEffect(() => {
    const fromStorage = loadFromStorage(storageKey);
    const hasData = Object.keys(fromStorage.checked).length > 0 || Object.keys(fromStorage.buildLevels).length > 0;
    if (hasData) {
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
      localStorage.setItem(storageKey, JSON.stringify(state));
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

  const toggleBuildLevel = useCallback((sl: number) => {
    setState((s) => ({
      ...s,
      buildLevels: { ...s.buildLevels, [sl]: !s.buildLevels[sl] },
    }));
  }, []);

  const setBuildLevels = useCallback((levels: Record<number, boolean>) => {
    setState((s) => ({ ...s, buildLevels: levels }));
  }, []);

  const exportProgress = useCallback(() => {
    const data = JSON.stringify(state, null, 2);
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
    setState((s) => ({ ...s, buildTemplateId: id }));
  }, []);

  return {
    state,
    loaded,
    toggle,
    toggleBuildLevel,
    setBuildLevels,
    setBuildTemplateId,
    exportProgress,
    importProgress,
    resetAll,
  };
}
