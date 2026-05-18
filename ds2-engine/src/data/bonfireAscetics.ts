/**
 * Bonfire Ascetic valuable uses — which bonfires respawn bosses with NG+ exclusive rewards.
 * Source: Fextralife, DS2_SOTFS_RESEARCH_EVIDENCE.md
 */

import type { AreaId } from "./areas";

export interface BonfireAsceticUse {
  areaId: AreaId;
  bonfireName: string;
  /** Links to checklist bonfire item if applicable */
  itemId?: string;
  reward: string;
  bossTrigger?: string;
}

/** Bonfires with valuable ascetic uses — rings, spells, soul farm */
export const BONFIRE_ASCETIC_VALUES: BonfireAsceticUse[] = [
  { areaId: "majula", bonfireName: "Majula", itemId: "mj1", reward: "Moonlight Butterfly Set from Maughlin (2–3 ascetics, spend 15k)", bossTrigger: "None — area reset" },
  { areaId: "forest_of_fallen_giants", bonfireName: "Cardinal Tower", itemId: "fg4", reward: "Respawns Last Giant, Pursuer — Ring of Blades from Pursuer", bossTrigger: "Last Giant, Pursuer" },
  { areaId: "forest_of_fallen_giants", bonfireName: "The Place Unbeknownst", itemId: "mm5", reward: "Giant Lord farm (~300k souls/run, ascetic inside memory = infinite)", bossTrigger: "Giant Lord" },
  { areaId: "heides_tower", bonfireName: "Heide's Ruin", reward: "Respawns Dragonrider", bossTrigger: "Dragonrider" },
  { areaId: "heides_tower", bonfireName: "The Blue Cathedral", reward: "Respawns Old Dragonslayer — Old Leo Ring", bossTrigger: "Old Dragonslayer" },
  { areaId: "no_mans_wharf", bonfireName: "Unseen Path to Heide", itemId: "nm1", reward: "Respawns Flexile Sentry", bossTrigger: "Flexile Sentry" },
  { areaId: "lost_bastille", bonfireName: "McDuff's Workshop", reward: "Respawns Ruin Sentinels", bossTrigger: "Ruin Sentinels" },
  { areaId: "lost_bastille", bonfireName: "Upper Ramparts", reward: "Covetous Gold Serpent Ring +2 (Belfry Gargoyles)", bossTrigger: "Belfry Gargoyles" },
  { areaId: "sinners_rise", bonfireName: "The Saltfort", itemId: "sr1", reward: "Respawns Lost Sinner — Lord Soul", bossTrigger: "Lost Sinner" },
  { areaId: "huntsmans_copse", bonfireName: "Undead Lockaway", itemId: "hc2", reward: "Clear Bluestone Ring +2 (Skeleton Lords)", bossTrigger: "Skeleton Lords" },
  { areaId: "huntsmans_copse", bonfireName: "Undead Purgatory", itemId: "hc9", reward: "Chloranthy Ring +2 (Executioner's Chariot)", bossTrigger: "Executioner's Chariot" },
  { areaId: "harvest_valley", bonfireName: "The Mines", itemId: "hv1", reward: "Respawns Covetous Demon", bossTrigger: "Covetous Demon" },
  { areaId: "earthen_peak", bonfireName: "Upper Earthen Peak", itemId: "ep10", reward: "Covetous Silver Serpent Ring +2 (Mytha)", bossTrigger: "Mytha" },
  { areaId: "iron_keep", bonfireName: "Threshold Bridge", itemId: "ik1", reward: "Respawns Smelter Demon; Magerold sells Dragonrider Set at Intensity 2", bossTrigger: "Smelter Demon" },
  { areaId: "iron_keep", bonfireName: "Eygil's Idol", reward: "Respawns Old Iron King — Lord Soul", bossTrigger: "Old Iron King" },
  { areaId: "shaded_woods", bonfireName: "Shaded Ruins", itemId: "sw4", reward: "Southern Ritual Band +2 (Scorpioness Najka); Gower's Ring (Shaded Ruins 2nd bonfire)", bossTrigger: "Scorpioness Najka" },
  { areaId: "the_pit", bonfireName: "Grave Entrance", itemId: "pt2", reward: "Respawns Royal Rat Vanguard", bossTrigger: "Royal Rat Vanguard" },
  { areaId: "doors_of_pharros", bonfireName: "Ordeal's End", itemId: "dp1", reward: "Respawns Royal Rat Authority", bossTrigger: "Royal Rat Authority" },
  { areaId: "brightstone_cove", bonfireName: "Royal Army Campsite", itemId: "bc1", reward: "Respawns Prowling Magus", bossTrigger: "Prowling Magus" },
  { areaId: "brightstone_cove", bonfireName: "Lower Brightstone Cove", reward: "Crystal Soul Spear (Duke's Dear Freja NG+)", bossTrigger: "Duke's Dear Freja" },
  { areaId: "black_gulch", bonfireName: "Hidden Chamber", itemId: "bg6", reward: "Respawns The Rotten — Lord Soul", bossTrigger: "The Rotten" },
  { areaId: "drangleic_castle", bonfireName: "King's Gate", itemId: "dc3", reward: "Ring of Blades +2 (Dual Pursuers post-Nashandra); Ring of Steel Protection +2 (Looking Glass Knight)", bossTrigger: "Throne Defender & Watcher, Nashandra" },
  { areaId: "drangleic_castle", bonfireName: "Central Castle Drangleic", reward: "Ring of Steel Protection +2 (Looking Glass Knight)", bossTrigger: "Looking Glass Knight" },
  { areaId: "drangleic_castle", bonfireName: "Forgotten Chamber", reward: "Respawns Twin Dragonriders", bossTrigger: "Twin Dragonriders" },
  { areaId: "shrine_of_amana", bonfireName: "Rhoy's Resting Place", itemId: "sa1", reward: "Respawns Demon of Song", bossTrigger: "Demon of Song" },
  { areaId: "undead_crypt", bonfireName: "Undead Ditch", itemId: "uc1", reward: "Royal Soldier's Ring +2 (Velstadt)", bossTrigger: "Velstadt" },
  { areaId: "aldias_keep", bonfireName: "Foregarden", itemId: "ak2", reward: "Ascetic farm: unpetrify hollow by Basilisk → drops 2 ascetics, respawns with ascetic", bossTrigger: "Guardian Dragon" },
  { areaId: "aldias_keep", bonfireName: "Ritual Site", reward: "Respawns Guardian Dragon", bossTrigger: "Guardian Dragon" },
  { areaId: "dragon_aerie", bonfireName: "Shrine Entrance", itemId: "da1", reward: "Respawns Ancient Dragon", bossTrigger: "Ancient Dragon" },
  { areaId: "dlc_sunken", bonfireName: "Sanctum Interior", itemId: "d12", reward: "Respawns Elana — material farm (Tower of Prayer ascetic)", bossTrigger: "Elana" },
  { areaId: "dlc_iron", bonfireName: "Lowermost Floor", reward: "Respawns Fume Knight", bossTrigger: "Fume Knight" },
  { areaId: "dlc_iron", bonfireName: "Smelter Throne", reward: "Respawns Sir Alonne", bossTrigger: "Sir Alonne" },
  { areaId: "dlc_iron", bonfireName: "Iron Hallway Entrance", reward: "Respawns Blue Smelter Demon", bossTrigger: "Blue Smelter Demon" },
  { areaId: "dlc_ivory", bonfireName: "Outer Wall", itemId: "d32", reward: "Respawns Aava (need Eye of Priestess first)", bossTrigger: "Aava" },
  { areaId: "dlc_ivory", bonfireName: "Grand Cathedral", reward: "Respawns Burnt Ivory King", bossTrigger: "Burnt Ivory King" },
];

/** Get ascetic uses for a given area */
export function getAsceticUsesForArea(areaId: AreaId): BonfireAsceticUse[] {
  return BONFIRE_ASCETIC_VALUES.filter((a) => a.areaId === areaId);
}

/** Get ascetic use for a bonfire by name (fuzzy match) */
export function getAsceticUseForBonfire(areaId: AreaId, bonfireText: string): BonfireAsceticUse | undefined {
  const lower = bonfireText.toLowerCase();
  return BONFIRE_ASCETIC_VALUES.find(
    (a) => a.areaId === areaId && lower.includes(a.bonfireName.toLowerCase())
  );
}
