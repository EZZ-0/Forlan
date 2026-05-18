import { useState, useEffect, useCallback } from "react";
import {
  PROFILES_INDEX_KEY,
  ACTIVE_PROFILE_KEY,
  getProgressKey,
  getSimulatorKey,
  STORAGE_KEY as LEGACY_PROGRESS_KEY,
  type ProfileMeta,
} from "../types";

const LEGACY_SIMULATOR_KEY = "ds2-simulator";
const DEFAULT_PROFILE_ID = "profile-default";

function migrateLegacyToProfiles(): ProfileMeta[] | null {
  try {
    const legacyProgress = localStorage.getItem(LEGACY_PROGRESS_KEY);
    const legacySim = localStorage.getItem(LEGACY_SIMULATOR_KEY);
    const indexRaw = localStorage.getItem(PROFILES_INDEX_KEY);

    // Nothing legacy to migrate at all
    if (!legacyProgress && !legacySim) {
      return null;
    }

    // Case 1: No profiles index yet — original one-time migration
    if (!indexRaw) {
      const now = new Date().toISOString();
      const meta: ProfileMeta = {
        id: DEFAULT_PROFILE_ID,
        name: "My Run",
        createdAt: now,
        lastPlayed: now,
      };

      if (legacyProgress) {
        localStorage.setItem(getProgressKey(DEFAULT_PROFILE_ID), legacyProgress);
      }
      if (legacySim) {
        localStorage.setItem(getSimulatorKey(DEFAULT_PROFILE_ID), legacySim);
      }

      localStorage.setItem(PROFILES_INDEX_KEY, JSON.stringify([meta]));
      localStorage.setItem(ACTIVE_PROFILE_KEY, DEFAULT_PROFILE_ID);

      localStorage.removeItem(LEGACY_PROGRESS_KEY);
      localStorage.removeItem(LEGACY_SIMULATOR_KEY);

      return [meta];
    }

    // Case 2: Profiles already exist, but we still found legacy keys.
    // This can happen if an older engine version (without profiles)
    // was run after the initial migration and wrote fresh data back
    // into the legacy keys. In that case, we recover that data into
    // a new profile instead of silently ignoring it.

    let index: ProfileMeta[] = [];
    try {
      const parsed = JSON.parse(indexRaw) as unknown;
      if (Array.isArray(parsed)) index = parsed as ProfileMeta[];
    } catch {
      index = [];
    }

    const now = new Date().toISOString();

    // Choose a non-conflicting name like "Recovered Run", "Recovered Run 2", etc.
    const existingNames = new Set(index.map((p) => p.name));
    const baseName = "Recovered Run";
    let name = baseName;
    let counter = 2;
    while (existingNames.has(name)) {
      name = `${baseName} ${counter++}`;
    }

    const id = generateProfileId();
    const meta: ProfileMeta = {
      id,
      name,
      createdAt: now,
      lastPlayed: now,
    };

    if (legacyProgress) {
      localStorage.setItem(getProgressKey(id), legacyProgress);
    }
    if (legacySim) {
      localStorage.setItem(getSimulatorKey(id), legacySim);
    }

    const nextIndex = [...index, meta];
    localStorage.setItem(PROFILES_INDEX_KEY, JSON.stringify(nextIndex));

    localStorage.removeItem(LEGACY_PROGRESS_KEY);
    localStorage.removeItem(LEGACY_SIMULATOR_KEY);

    // We do not change ACTIVE_PROFILE_KEY here; user can switch to the
    // recovered profile from the UI.

    return nextIndex;
  } catch {
    return null;
  }
}

function loadProfilesIndex(): ProfileMeta[] {
  try {
    const raw = localStorage.getItem(PROFILES_INDEX_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed)) return parsed as ProfileMeta[];
    }
  } catch {
    // ignore
  }
  return [];
}

function saveProfilesIndex(profiles: ProfileMeta[]) {
  try {
    localStorage.setItem(PROFILES_INDEX_KEY, JSON.stringify(profiles));
  } catch {
    // ignore
  }
}

function loadActiveProfileId(): string | null {
  try {
    return localStorage.getItem(ACTIVE_PROFILE_KEY);
  } catch {
    return null;
  }
}

function saveActiveProfileId(id: string | null) {
  try {
    if (id) localStorage.setItem(ACTIVE_PROFILE_KEY, id);
    else localStorage.removeItem(ACTIVE_PROFILE_KEY);
  } catch {
    // ignore
  }
}

function generateProfileId(): string {
  return `profile-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useProfiles() {
  const [profiles, setProfiles] = useState<ProfileMeta[]>([]);
  const [activeProfileId, setActiveProfileIdState] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const migrated = migrateLegacyToProfiles();
    let index = migrated ?? loadProfilesIndex();
    if (index.length === 0) {
      const id = generateProfileId();
      const now = new Date().toISOString();
      const meta: ProfileMeta = { id, name: "My Run", createdAt: now, lastPlayed: now };
      index = [meta];
      saveProfilesIndex(index);
      saveActiveProfileId(id);
    }
    const activeId = loadActiveProfileId();
    setProfiles(index);
    setActiveProfileIdState(activeId ?? (index[0]?.id ?? null));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    saveProfilesIndex(profiles);
  }, [profiles, loaded]);

  useEffect(() => {
    if (!loaded) return;
    saveActiveProfileId(activeProfileId);
  }, [activeProfileId, loaded]);

  const createProfile = useCallback(
    (name?: string) => {
      const id = generateProfileId();
      const now = new Date().toISOString();
      const meta: ProfileMeta = {
        id,
        name: name ?? `Run ${profiles.length + 1}`,
        createdAt: now,
        lastPlayed: now,
      };
      setProfiles((p) => [...p, meta]);
      setActiveProfileIdState(id);
      return id;
    },
    [profiles.length]
  );

  const switchProfile = useCallback((id: string) => {
    setActiveProfileIdState(id);
    setProfiles((p) =>
      p.map((m) => (m.id === id ? { ...m, lastPlayed: new Date().toISOString() } : m))
    );
  }, []);

  const deleteProfile = useCallback(
    (id: string) => {
      setProfiles((p) => p.filter((m) => m.id !== id));
      try {
        localStorage.removeItem(getProgressKey(id));
        localStorage.removeItem(getSimulatorKey(id));
      } catch {
        // ignore
      }
      if (activeProfileId === id) {
        const remaining = profiles.filter((m) => m.id !== id);
        setActiveProfileIdState(remaining[0]?.id ?? null);
      }
    },
    [activeProfileId, profiles]
  );

  const renameProfile = useCallback((id: string, name: string) => {
    setProfiles((p) => p.map((m) => (m.id === id ? { ...m, name } : m)));
  }, []);

  const duplicateProfile = useCallback(
    (id: string, name?: string) => {
      const now = new Date().toISOString();
      const newId = generateProfileId();
      try {
        const progressRaw = localStorage.getItem(getProgressKey(id));
        const simRaw = localStorage.getItem(getSimulatorKey(id));
        if (progressRaw) localStorage.setItem(getProgressKey(newId), progressRaw);
        if (simRaw) localStorage.setItem(getSimulatorKey(newId), simRaw);
      } catch {
        // ignore
      }
      const source = profiles.find((m) => m.id === id);
      const meta: ProfileMeta = {
        id: newId,
        name: name ?? `${source?.name ?? "Run"} (copy)`,
        createdAt: now,
        lastPlayed: now,
      };
      setProfiles((p) => [...p, meta]);
      setActiveProfileIdState(newId);
      return newId;
    },
    [profiles]
  );

  return {
    profiles,
    activeProfileId,
    loaded,
    createProfile,
    switchProfile,
    deleteProfile,
    renameProfile,
    duplicateProfile,
  };
}
