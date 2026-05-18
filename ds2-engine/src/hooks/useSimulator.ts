import { useState, useEffect, useCallback, useMemo } from "react";
import { getBuildTemplate, DEFAULT_BUILD_TEMPLATE_ID } from "../data/buildTemplates";
import { STARTING_SL } from "../data/buildTemplates/levelGenerator";
import { getSimulatorKey } from "../types";
import type { SimulatorState, SimulatorItem, SlotId, StatKey, InfusionType } from "../data/simulator/types";
import { getObtainedItemIds } from "../data/simulator/progressToItemMap";
import { ALL_EQUIPABLE_ITEMS, getItemById } from "../data/simulator/items";
import { canEquipInSlot } from "../data/simulator/slots";
import { computeSimulatorStats } from "../utils/simulatorStats";

const LEGACY_SIMULATOR_KEY = "ds2-simulator";

function getDefaultState(baseStats: Record<string, number>): SimulatorState {
  const stats = { ...baseStats } as Record<StatKey, number>;
  return {
    sl: 11,
    stats,
    equipped: {},
    weaponUpgrade: {},
    weaponInfusion: {},
    spellSlots: [],
    sandboxMode: false,
    levelMode: "build",
  };
}

function loadFromStorage(storageKey: string, baseStats: Record<string, number>): SimulatorState | null {
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<SimulatorState>;
      const stats = parsed.stats ?? { ...baseStats };
      return {
        sl: parsed.sl ?? 11,
        stats: stats as Record<StatKey, number>,
        equipped: parsed.equipped ?? {},
        weaponUpgrade: parsed.weaponUpgrade ?? {},
        weaponInfusion: parsed.weaponInfusion ?? {},
        spellSlots: parsed.spellSlots ?? [],
        sandboxMode: parsed.sandboxMode ?? false,
        levelMode: parsed.levelMode ?? "build",
      };
    }
  } catch {
    // ignore
  }
  return null;
}

function saveToStorage(storageKey: string, state: SimulatorState) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function useSimulator(
  profileId: string | null,
  checked: Record<string, boolean>,
  buildLevels: Record<number, boolean>,
  buildTemplateId: string = DEFAULT_BUILD_TEMPLATE_ID
) {
  const template = getBuildTemplate(buildTemplateId);
  const baseStats: Record<string, number> = template?.baseStats ?? {};
  const levels = template?.levels ?? [];
  const startSl = template ? STARTING_SL[template.startingClass] : 11;
  const storageKey = profileId ? getSimulatorKey(profileId) : LEGACY_SIMULATOR_KEY;

  const [state, setState] = useState<SimulatorState>(() => {
    const stored = loadFromStorage(storageKey, baseStats);
    return stored ?? getDefaultState(baseStats);
  });

  useEffect(() => {
    const stored = loadFromStorage(storageKey, baseStats);
    setState(stored ?? getDefaultState(baseStats));
  }, [storageKey]);

  useEffect(() => {
    saveToStorage(storageKey, state);
  }, [state, storageKey]);

  const effectiveState = useMemo(() => {
    if (state.levelMode === "build") {
      const stats = { ...baseStats } as Record<StatKey, number>;
      for (const l of levels) {
        if (buildLevels[l.sl]) stats[l.stat as StatKey] = l.value;
      }
      const sl = startSl + levels.filter((l) => buildLevels[l.sl]).length;
      return { ...state, stats, sl };
    }
    const stats = state.stats;
    const levelsUsed = (Object.keys(baseStats) as StatKey[]).reduce(
      (sum, k) => sum + Math.max(0, (stats[k] ?? baseStats[k] ?? 0) - (baseStats[k] ?? 0)),
      0
    );
    return { ...state, sl: startSl + levelsUsed };
  }, [state, buildLevels, baseStats, levels, startSl]);

  const computed = useMemo(() => computeSimulatorStats(effectiveState), [effectiveState]);

  const obtainedIds = useMemo(() => getObtainedItemIds(checked), [checked]);

  const setEquipped = useCallback((slotId: SlotId, itemId: string | null) => {
    setState((s) => {
      const nextEquipped = itemId
        ? { ...s.equipped, [slotId]: itemId }
        : (() => {
            const next = { ...s.equipped };
            delete next[slotId];
            return next;
          })();
      const nextUpgrade = { ...s.weaponUpgrade };
      const nextInfusion = { ...s.weaponInfusion };
      if (!itemId) {
        delete nextUpgrade[slotId];
        delete nextInfusion[slotId];
      }
      return { ...s, equipped: nextEquipped, weaponUpgrade: nextUpgrade, weaponInfusion: nextInfusion };
    });
  }, []);

  const setStats = useCallback(
    (updates: Partial<Record<StatKey, number>> | ((prev: Record<StatKey, number>) => Partial<Record<StatKey, number>>)) => {
      setState((s) => {
        const next = typeof updates === "function" ? updates(s.stats) : updates;
        return { ...s, stats: { ...s.stats, ...next } };
      });
    },
    []
  );

  const setSandboxMode = useCallback((v: boolean) => {
    setState((s) => ({ ...s, sandboxMode: v }));
  }, []);

  const setWeaponUpgrade = useCallback((slotId: SlotId, level: number) => {
    setState((s) => ({ ...s, weaponUpgrade: { ...s.weaponUpgrade, [slotId]: level } }));
  }, []);

  const setWeaponInfusion = useCallback((slotId: SlotId, infusion: InfusionType | null) => {
    setState((s) => ({ ...s, weaponInfusion: { ...s.weaponInfusion, [slotId]: infusion } }));
  }, []);

  const setLevelMode = useCallback((mode: "build" | "free") => {
    setState((s) => ({ ...s, levelMode: mode }));
  }, []);

  const getAvailableItems = useCallback(
    (slotId: SlotId): SimulatorItem[] => {
      let items = ALL_EQUIPABLE_ITEMS.filter((item) =>
        canEquipInSlot(item, slotId)
      );
      if (!state.sandboxMode) {
        items = items.filter((item) => obtainedIds.has(item.id));
      }
      return items;
    },
    [state.sandboxMode, obtainedIds]
  );

  const loadFromBuild = useCallback(() => {
    const stats = { ...baseStats } as Record<StatKey, number>;
    for (const l of levels) {
      if (buildLevels[l.sl]) {
        stats[l.stat as StatKey] = l.value;
      }
    }
    setState((s) => ({
      ...s,
      stats,
    }));
  }, [buildLevels, baseStats, levels]);

  return {
    state,
    effectiveState,
    computed,
    setEquipped,
    setStats,
    setSandboxMode,
    setWeaponUpgrade,
    setWeaponInfusion,
    setLevelMode,
    getAvailableItems,
    loadFromBuild,
    getItemById,
  };
}
