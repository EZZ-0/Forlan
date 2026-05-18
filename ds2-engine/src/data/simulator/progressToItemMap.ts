/**
 * DS2 Build Simulator — Progress-to-item mapping.
 * Maps checklist progressId to simulator itemIds for linked mode.
 */

/** progressId -> simulator itemId(s). One progress can unlock multiple items (e.g. Hexer set). */
const PROGRESS_TO_ITEMS: Record<string, string[]> = {
  // Weapons
  fg11: ["fire_longsword"],
  "build:fire_ls_10": ["fire_longsword"],
  "build:lightning_mace": ["mace"],
  "build:lightning_mace_10": ["mace"],
  "build:lightning_mace_infused": ["mace"],
  "build:uchigatana": ["uchigatana"],
  "build:uchigatana_10": ["uchigatana"],
  "build:dark_uchigatana": ["uchigatana"],
  // Catalysts
  "build:sunset_staff": ["sunset_staff", "hexer_hood", "hexer_robe", "hexer_gloves", "hexer_boots"],
  "build:sunset_staff_infused": ["sunset_staff"],
  "build:pyromancy_flame": ["pyromancy_flame"],
  "build:staff_of_wisdom": ["staff_of_wisdom"],
  "build:staff_wisdom_5": ["staff_of_wisdom"],
  // Rings
  fg15: ["ring_of_blades"],
  fg21: ["chloranthy_ring"],
  "build:southern_ritual": ["southern_ritual_band"],
  "build:third_dragon": ["third_dragon_ring"],
  "build:dark_clutch": ["dark_clutch_ring"],
  // Spells
  hc3: ["dark_orb"],
  "build:dark_weapon": ["dark_weapon"],
  sa3: ["sunlight_blade"],
  ch6: ["resonant_soul"],
  "build:great_resonant_soul": ["great_resonant_soul"],
  // Dark Chaos Assassin
  "dca:chaos_blade": ["chaos_blade"],
  "dca:sunset_staff": ["sunset_staff"],
  "dca:uchigatana_optional": ["uchigatana"],
  "dca:dragon_chime": ["dragon_chime"],
};

/**
 * Get simulator item IDs that are obtained based on checklist progress.
 */
export function getObtainedItemIds(checked: Record<string, boolean>): Set<string> {
  const ids = new Set<string>();
  for (const [progressId, itemIds] of Object.entries(PROGRESS_TO_ITEMS)) {
    if (checked[progressId]) {
      for (const id of itemIds) ids.add(id);
    }
  }
  return ids;
}
