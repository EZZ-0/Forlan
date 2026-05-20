import { useCallback, useEffect, useState } from "react";
import {
  AREA_FILTER_STORAGE_KEY,
  DEFAULT_AREA_FILTERS,
  type AreaFilterState,
  type AreaViewMode,
  type ChecklistCategory,
  type NgFilter,
} from "../data/checklistMetadata";

function loadFilters(profileId: string | null): AreaFilterState {
  const key = profileId ? `${AREA_FILTER_STORAGE_KEY}:${profileId}` : AREA_FILTER_STORAGE_KEY;
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<AreaFilterState>;
      return { ...DEFAULT_AREA_FILTERS, ...parsed };
    }
  } catch {
    /* ignore */
  }
  return { ...DEFAULT_AREA_FILTERS };
}

function saveFilters(profileId: string | null, state: AreaFilterState) {
  const key = profileId ? `${AREA_FILTER_STORAGE_KEY}:${profileId}` : AREA_FILTER_STORAGE_KEY;
  localStorage.setItem(key, JSON.stringify(state));
}

export function useAreaFilters(profileId: string | null) {
  const [filters, setFilters] = useState<AreaFilterState>(() => loadFilters(profileId));

  useEffect(() => {
    setFilters(loadFilters(profileId));
  }, [profileId]);

  useEffect(() => {
    saveFilters(profileId, filters);
  }, [profileId, filters]);

  const setViewMode = useCallback((viewMode: AreaViewMode) => {
    setFilters((f) => ({ ...f, viewMode }));
  }, []);

  const setHideCompleted = useCallback((hideCompleted: boolean) => {
    setFilters((f) => ({ ...f, hideCompleted }));
  }, []);

  const toggleHideCompleted = useCallback(() => {
    setFilters((f) => ({ ...f, hideCompleted: !f.hideCompleted }));
  }, []);

  const setNgFilter = useCallback((ngFilter: NgFilter) => {
    setFilters((f) => ({ ...f, ngFilter }));
  }, []);

  const toggleCategory = useCallback((cat: ChecklistCategory) => {
    setFilters((f) => {
      const has = f.categories.includes(cat);
      const categories = has ? f.categories.filter((c) => c !== cat) : [...f.categories, cat];
      return { ...f, viewMode: "custom" as const, categories };
    });
  }, []);

  const clearCategories = useCallback(() => {
    setFilters((f) => ({ ...f, categories: [] }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({ ...DEFAULT_AREA_FILTERS });
  }, []);

  return {
    filters,
    setViewMode,
    setHideCompleted,
    toggleHideCompleted,
    setNgFilter,
    toggleCategory,
    clearCategories,
    resetFilters,
  };
}
