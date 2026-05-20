/**
 * Trophy / achievement registry — links checklist progressIds for platinum view.
 */

export interface AchievementEntry {
  id: string;
  name: string;
  /** Checklist or quest progressIds that count toward this trophy when checked. */
  linkedProgressIds: string[];
}

/** Core SotFS trophies with representative checklist hooks (expand in Wave 4). */
export const ACHIEVEMENTS: AchievementEntry[] = [
  {
    id: "learn_gestures",
    name: "Learn all Gestures",
    linkedProgressIds: [],
  },
  {
    id: "collect_all_spells",
    name: "Collect all Sorceries, Hexes, Pyromancies, and Miracles",
    linkedProgressIds: [],
  },
  {
    id: "master_of_miracles",
    name: "Master of Miracles",
    linkedProgressIds: [],
  },
  {
    id: "master_of_sorceries",
    name: "Master of Sorceries",
    linkedProgressIds: [],
  },
  {
    id: "master_of_pyromancy",
    name: "Master of Pyromancy",
    linkedProgressIds: [],
  },
  {
    id: "master_of_hexes",
    name: "Master of Hexes",
    linkedProgressIds: [],
  },
  {
    id: "master_of_pyromancy_sorceries",
    name: "Master of Pyromancy (alt)",
    linkedProgressIds: [],
  },
  {
    id: "glory_to_the_king",
    name: "Glory to the King",
    linkedProgressIds: ["fg17", "fg19"],
  },
  {
    id: "selfless_giver",
    name: "Selfless Giver",
    linkedProgressIds: [],
  },
  {
    id: "sotfs_complete",
    name: "Scholar of the First Sin — base + DLC clear",
    linkedProgressIds: ["fg17", "fg19", "tw1"],
  },
];

/** progressIds tied to any trophy (for platinum filter badges). */
export function getAchievementLinkedIds(): Set<string> {
  const ids = new Set<string>();
  for (const a of ACHIEVEMENTS) {
    for (const id of a.linkedProgressIds) ids.add(id);
  }
  return ids;
}

export function getAchievementsForProgressId(progressId: string): AchievementEntry[] {
  return ACHIEVEMENTS.filter((a) => a.linkedProgressIds.includes(progressId));
}
