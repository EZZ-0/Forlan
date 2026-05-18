/**
 * DS2 Items Database — ID mappings.
 * areaItemId → dbId, progressId → dbId, name → dbId for resolver and search.
 */

/** areaItemId (e.g. fg11) → canonical item dbId */
export const AREA_ITEM_ID_TO_DB_ID: Record<string, string> = {
  fg11: "fire_longsword",
  fg15: "ring_of_blades",
  fg21: "chloranthy_ring",
};

/** progressId (e.g. build:uchigatana) → canonical item dbId */
export const PROGRESS_ID_TO_DB_ID: Record<string, string> = {
  fg11: "fire_longsword",
  "build:fire_ls_10": "fire_longsword",
  "build:lightning_mace": "mace",
  "build:lightning_mace_10": "mace",
  "build:lightning_mace_infused": "mace",
  "build:uchigatana": "uchigatana",
  "build:uchigatana_10": "uchigatana",
  "build:dark_uchigatana": "uchigatana",
  "build:sunset_staff": "sunset_staff",
  "build:sunset_staff_infused": "sunset_staff",
  "build:pyromancy_flame": "pyromancy_flame",
  "build:staff_of_wisdom": "staff_of_wisdom",
  "build:staff_wisdom_5": "staff_of_wisdom",
  "bc15": "southern_ritual_band",
  "da10": "third_dragon_ring",
  "d111": "dark_clutch_ring",
  hc3: "felkin_hex_shop",
  hc14: "dark_orb",
  "build:dark_weapon": "dark_weapon",
  sa3: "sunlight_blade",
  ch6: "resonant_soul",
  "build:great_resonant_soul": "great_resonant_soul",
  "dca:chaos_blade": "chaos_blade",
  "dca:sunset_staff": "sunset_staff",
  "tw7": "ring_of_blades_2",
  gt6: "great_club",
  lb17: "large_club",
  mj19: "moonlight_greatsword",
  mj20: "chime_of_want",
  hc12: "clear_bluestone_ring_2",
  hc13: "notched_whip",
  uc10: "penal_handcuffs",
  uc11: "blue_flame",
  uc12: "royal_soldier_ring_2",
  tw8: "defender_greatsword",
  ak12: "forbidden_sun",
  ik14: "flame_weapon",
  lb18: "crystal_soul_spear",
  bc18: "flynns_ring",
  d316: "chloranthy_ring_2",
  "dca:old_leo": "old_leo_ring",
  "dca:uchigatana_optional": "uchigatana",
  "dca:dragon_chime": "dragon_chime",
};
