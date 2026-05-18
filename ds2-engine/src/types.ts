export interface BuildProgressSlice {
  levels: Record<number, boolean>;
}

/** Per-build level roadmap progress (key = build template id) */
export type BuildProgressMap = Record<string, BuildProgressSlice>;

export interface ProgressState {
  checked: Record<string, boolean>;
  /** @deprecated Migrated to buildProgress — do not write new data here */
  buildLevels?: Record<number, boolean>;
  buildProgress?: BuildProgressMap;
  buildTemplateId?: string;
  buildStats?: Record<string, number>;
  lastExport?: string;
}

export const STORAGE_KEY = "ds2-progress";

export interface ProfileMeta {
  id: string;
  name: string;
  createdAt: string;
  lastPlayed?: string;
}

export const PROFILES_INDEX_KEY = "ds2-profiles-index";
export const ACTIVE_PROFILE_KEY = "ds2-active-profile";

export function getProgressKey(profileId: string): string {
  return `ds2-progress-${profileId}`;
}

export function getSimulatorKey(profileId: string): string {
  return `ds2-simulator-${profileId}`;
}
