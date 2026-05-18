/**
 * DS2 Build Simulator — Source attribution and data source references.
 * Use for fact-checking and cross-referencing when multiple sources exist.
 */

import type { SourceAttribution } from "./types";

/** Primary and secondary data source URLs */
export const DATA_SOURCES = {
  fextralife: {
    base: "https://darksouls2.wiki.fextralife.com/",
    weaponsSortable: "https://darksouls2.wiki.fextralife.com/Weapons+Sortable",
    agility: "https://darksouls2.wiki.fextralife.com/Agility",
    weaponARCalculator: "https://darksouls2.wiki.fextralife.com/Weapon+AR+and+Scaling+Calculator",
    armor: "https://darksouls2.wiki.fextralife.com/Armor",
    shields: "https://darksouls2.wiki.fextralife.com/Shields",
    rings: "https://darksouls2.wiki.fextralife.com/Rings",
  },
  fandom: "https://dark-souls.fandom.com/wiki/Dark_Souls_II",
  googleSheets: {
    weapons: "https://docs.google.com/spreadsheets/d/1lkSXrm7KHMPkz6mskFAz_dsrbdwjdyx4_tW6Dlk9SCs/edit",
    weaponAR: "https://docs.google.com/spreadsheets/d/18ZicqVD0x92DVjjB4ZzpmjhQ0F5suNnzF4zws2q9nOY/edit",
  },
} as const;

/**
 * Create a source attribution entry.
 */
export function createSource(
  field: string,
  value: unknown,
  from: string,
  options?: { url?: string; checked?: string; resolved?: SourceAttribution["resolved"] }
): SourceAttribution {
  return {
    field,
    value,
    from,
    url: options?.url,
    checked: options?.checked,
    resolved: options?.resolved,
  };
}

/**
 * Fextralife source helper.
 */
export function fextralife(
  field: string,
  value: unknown,
  url?: string,
  checked = "2024"
): SourceAttribution {
  return createSource(field, value, "Fextralife", {
    url: url ?? DATA_SOURCES.fextralife.base,
    checked,
    resolved: "fextralife",
  });
}
