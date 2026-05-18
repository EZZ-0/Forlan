/**
 * DS2 SotFS Full Enemy Drop Database
 * Per-enemy drops ordered by rarity (most common first).
 * Source: Fextralife Wiki, ENEMY_MATERIAL_FARMS, DS2 SotFS Loot Sheet community data.
 * RarityOrder: 1=Guaranteed, 2=Common, 3=Uncommon, 4=Rare, 5=Very rare
 */

import type { AreaId } from "./areas";

export type EnemyDropType = "boss" | "miniboss" | "elite" | "common";

export interface EnemyDropItem {
  item: string;
  rate: string;
  /** 1=most common (guaranteed), 5=rarest. Used for sorting. */
  rarityOrder: number;
}

export interface EnemyDropEntry {
  id: string;
  name: string;
  type: EnemyDropType;
  area: string;
  areaId?: AreaId;
  drops: EnemyDropItem[];
}

/** Rarity order: 1 Guaranteed, 2 Common, 3 Uncommon, 4 Rare, 5 Very rare */
const R = {
  guaranteed: 1,
  common: 2,
  uncommon: 3,
  rare: 4,
  veryRare: 5,
};

export const ENEMY_DROPS: EnemyDropEntry[] = [
  // —— BOSSES (guaranteed soul + optional drops) ——
  {
    id: "last_giant",
    name: "The Last Giant",
    type: "boss",
    area: "Forest of Fallen Giants",
    areaId: "forest_of_fallen_giants",
    drops: [
      { item: "Soul of the Last Giant", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Soldier Key", rate: "Guaranteed", rarityOrder: R.guaranteed },
    ],
  },
  {
    id: "pursuer",
    name: "The Pursuer",
    type: "boss",
    area: "Forest of Fallen Giants / Drangleic Castle",
    areaId: "forest_of_fallen_giants",
    drops: [
      { item: "Soul of the Pursuer", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Ring of Blades", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Twinkling Titanite", rate: "1 per encounter (4 total SotFS)", rarityOrder: R.guaranteed },
    ],
  },
  {
    id: "dragonrider",
    name: "Dragonrider",
    type: "boss",
    area: "Heide's Tower of Flame",
    areaId: "heides_tower",
    drops: [
      { item: "Soul of the Dragonrider", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Dragonrider Bow", rate: "Guaranteed", rarityOrder: R.guaranteed },
    ],
  },
  {
    id: "old_dragonslayer",
    name: "Old Dragonslayer",
    type: "boss",
    area: "Heide's Tower of Flame",
    areaId: "heides_tower",
    drops: [
      { item: "Soul of the Old Dragonslayer", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Old Leo Ring", rate: "Guaranteed", rarityOrder: R.guaranteed },
    ],
  },
  {
    id: "flexile_sentry",
    name: "Flexile Sentry",
    type: "boss",
    area: "No-Man's Wharf",
    areaId: "no_mans_wharf",
    drops: [
      { item: "Soul of the Flexile Sentry", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Flexile Sentry Set", rate: "~5% each piece", rarityOrder: R.uncommon },
    ],
  },
  {
    id: "ruin_sentinels",
    name: "Ruin Sentinels",
    type: "boss",
    area: "Lost Bastille",
    areaId: "lost_bastille",
    drops: [
      { item: "Soul of the Ruin Sentinels", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Ruin Sentinel Set", rate: "~5% each piece", rarityOrder: R.uncommon },
    ],
  },
  {
    id: "belfry_gargoyles",
    name: "Belfry Gargoyles",
    type: "boss",
    area: "Belfry Luna",
    areaId: "lost_bastille",
    drops: [
      { item: "Soul of the Gargoyle", rate: "Guaranteed (×5)", rarityOrder: R.guaranteed },
      { item: "Covetous Gold Serpent Ring +2", rate: "Guaranteed", rarityOrder: R.guaranteed },
    ],
  },
  {
    id: "lost_sinner",
    name: "Lost Sinner",
    type: "boss",
    area: "Sinner's Rise",
    areaId: "sinners_rise",
    drops: [
      { item: "Soul of the Lost Sinner", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Old Witch Soul", rate: "NG+ (or Ascetic)", rarityOrder: R.guaranteed },
    ],
  },
  {
    id: "skeleton_lords",
    name: "Skeleton Lords",
    type: "boss",
    area: "Huntsman's Copse",
    areaId: "huntsmans_copse",
    drops: [
      { item: "Soul of the Skeleton Lords", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Clear Bluestone Ring +2", rate: "NG+ or Ascetic", rarityOrder: R.guaranteed },
    ],
  },
  {
    id: "executioner_chariot",
    name: "Executioner's Chariot",
    type: "boss",
    area: "Huntsman's Copse",
    areaId: "huntsmans_copse",
    drops: [
      { item: "Soul of the Executioner", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Chloranthy Ring +1", rate: "NG+ or Ascetic", rarityOrder: R.guaranteed },
    ],
  },
  {
    id: "covetous_demon",
    name: "Covetous Demon",
    type: "boss",
    area: "Harvest Valley",
    areaId: "harvest_valley",
    drops: [
      { item: "Soul of the Covetous Demon", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Covetous Gold Serpent Ring", rate: "Guaranteed", rarityOrder: R.guaranteed },
    ],
  },
  {
    id: "mytha",
    name: "Mytha, the Baneful Queen",
    type: "boss",
    area: "Earthen Peak",
    areaId: "earthen_peak",
    drops: [
      { item: "Soul of Mytha", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Covetous Silver Serpent Ring +2", rate: "NG+ or Ascetic", rarityOrder: R.guaranteed },
    ],
  },
  {
    id: "smelter_demon",
    name: "Smelter Demon",
    type: "boss",
    area: "Iron Keep",
    areaId: "iron_keep",
    drops: [
      { item: "Soul of the Smelter Demon", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Smelter Demon Set", rate: "~5% each piece", rarityOrder: R.uncommon },
    ],
  },
  {
    id: "old_iron_king",
    name: "Old Iron King",
    type: "boss",
    area: "Iron Keep",
    areaId: "iron_keep",
    drops: [
      { item: "Soul of the Old Iron King", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Old Iron King Hammer", rate: "Guaranteed", rarityOrder: R.guaranteed },
    ],
  },
  {
    id: "royal_rat_vanguard",
    name: "Royal Rat Vanguard",
    type: "boss",
    area: "Grave of Saints",
    areaId: "the_pit",
    drops: [
      { item: "Soul of the Royal Rat Vanguard", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Rat Tail", rate: "Guaranteed", rarityOrder: R.guaranteed },
    ],
  },
  {
    id: "royal_rat_authority",
    name: "Royal Rat Authority",
    type: "boss",
    area: "Doors of Pharros",
    areaId: "doors_of_pharros",
    drops: [
      { item: "Soul of the Royal Rat Authority", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Rat Tail", rate: "Guaranteed", rarityOrder: R.guaranteed },
    ],
  },
  {
    id: "scorpioness_najka",
    name: "Scorpioness Najka",
    type: "boss",
    area: "Shaded Woods",
    areaId: "shaded_woods",
    drops: [
      { item: "Soul of Scorpioness Najka", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Southern Ritual Band +2", rate: "NG+ or Ascetic", rarityOrder: R.guaranteed },
    ],
  },
  {
    id: "dukes_dear_freja",
    name: "Duke's Dear Freja",
    type: "boss",
    area: "Brightstone Cove Tseldora",
    areaId: "brightstone_cove",
    drops: [
      { item: "Soul of the Duke's Dear Freja", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Paledrake Soul", rate: "NG+ or Ascetic", rarityOrder: R.guaranteed },
    ],
  },
  {
    id: "rotten",
    name: "The Rotten",
    type: "boss",
    area: "Black Gulch",
    areaId: "black_gulch",
    drops: [
      { item: "Soul of the Rotten", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Old Dead One Soul", rate: "NG+ or Ascetic", rarityOrder: R.guaranteed },
    ],
  },
  {
    id: "looking_glass_knight",
    name: "Looking Glass Knight",
    type: "boss",
    area: "Drangleic Castle",
    areaId: "drangleic_castle",
    drops: [
      { item: "Soul of the Looking Glass Knight", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Looking Glass Set", rate: "~5% each piece", rarityOrder: R.uncommon },
    ],
  },
  {
    id: "twin_dragonriders",
    name: "Twin Dragonriders",
    type: "boss",
    area: "Drangleic Castle",
    areaId: "drangleic_castle",
    drops: [
      { item: "Soul of the Dragonrider", rate: "Guaranteed (×2)", rarityOrder: R.guaranteed },
    ],
  },
  {
    id: "prowling_magus",
    name: "Prowling Magus and Congregation",
    type: "boss",
    area: "Brightstone Cove Tseldora",
    areaId: "brightstone_cove",
    drops: [
      { item: "Soul of the Duke's Dear Freja", rate: "Guaranteed", rarityOrder: R.guaranteed },
    ],
  },
  {
    id: "demon_of_song",
    name: "Demon of Song",
    type: "boss",
    area: "Shrine of Amana",
    areaId: "shrine_of_amana",
    drops: [
      { item: "Soul of the Demon of Song", rate: "Guaranteed", rarityOrder: R.guaranteed },
    ],
  },
  {
    id: "velstadt",
    name: "Velstadt, the Royal Aegis",
    type: "boss",
    area: "Undead Crypt",
    areaId: "undead_crypt",
    drops: [
      { item: "Soul of Velstadt", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Sacred Chime Hammer", rate: "Guaranteed", rarityOrder: R.guaranteed },
    ],
  },
  {
    id: "guardian_dragon",
    name: "Guardian Dragon",
    type: "boss",
    area: "Aldia's Keep",
    areaId: "aldias_keep",
    drops: [
      { item: "Soul of the Guardian Dragon", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Petrified Dragon Bone", rate: "Rare", rarityOrder: R.rare },
    ],
  },
  {
    id: "giant_lord",
    name: "Giant Lord",
    type: "boss",
    area: "Memory of Jeigh",
    areaId: "memories",
    drops: [
      { item: "Soul of the Giant Lord", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Giant Lord Soul", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Bonfire Ascetic", rate: "Guaranteed (in memory)", rarityOrder: R.guaranteed },
    ],
  },
  {
    id: "ancient_dragon",
    name: "Ancient Dragon",
    type: "boss",
    area: "Dragon Shrine",
    areaId: "dragon_aerie",
    drops: [
      { item: "Soul of the Ancient Dragon", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Ancient Dragon Soul", rate: "Guaranteed", rarityOrder: R.guaranteed },
    ],
  },
  {
    id: "throne_watcher_defender",
    name: "Throne Watcher & Throne Defender",
    type: "boss",
    area: "Throne of Want",
    areaId: "throne_of_want",
    drops: [
      { item: "Soul of the Watcher", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Soul of the Defender", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Watcher Defender Set", rate: "~5% each piece", rarityOrder: R.uncommon },
    ],
  },
  {
    id: "nashandra",
    name: "Nashandra",
    type: "boss",
    area: "Throne of Want",
    areaId: "throne_of_want",
    drops: [
      { item: "Soul of Nashandra", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Soul of the King", rate: "Guaranteed", rarityOrder: R.guaranteed },
    ],
  },
  {
    id: "darklurker",
    name: "Darklurker",
    type: "boss",
    area: "Dark Chasm of Old",
    areaId: "dark_chasm",
    drops: [
      { item: "Soul of the Darklurker", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Lifedrain Patch", rate: "Guaranteed", rarityOrder: R.guaranteed },
    ],
  },

  // —— ELITES & COMMON (with drops) ——
  {
    id: "alonne_knight",
    name: "Alonne Knight",
    type: "elite",
    area: "Iron Keep",
    areaId: "iron_keep",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Destructive Greatarrow", rate: "Common", rarityOrder: R.common },
      { item: "Iron Greatarrow", rate: "Common", rarityOrder: R.common },
      { item: "Fire Seed", rate: "Decent", rarityOrder: R.uncommon },
      { item: "Alonne Greatbow", rate: "Rare", rarityOrder: R.rare },
      { item: "Blacksteel Katana", rate: "Rare (~2%)", rarityOrder: R.rare },
      { item: "Alonne Knight Set", rate: "~5% each piece", rarityOrder: R.uncommon },
    ],
  },
  {
    id: "alonne_knight_captain",
    name: "Alonne Knight Captain",
    type: "elite",
    area: "Iron Keep",
    areaId: "iron_keep",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Uchigatana", rate: "Rare (~2%)", rarityOrder: R.rare },
      { item: "Alonne Knight Set", rate: "~5% each piece", rarityOrder: R.uncommon },
    ],
  },
  {
    id: "heide_knight",
    name: "Heide Knight",
    type: "elite",
    area: "Heide's Tower of Flame",
    areaId: "heides_tower",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Twinkling Titanite", rate: "~5–10%", rarityOrder: R.uncommon },
      { item: "Heide Knight Sword", rate: "Rare (FoFG)", rarityOrder: R.rare },
      { item: "Heide Spear", rate: "Rare (Lost Bastille)", rarityOrder: R.rare },
      { item: "Heide Lance", rate: "Rare (Shrine of Winter)", rarityOrder: R.rare },
      { item: "Heide Knight Set", rate: "~5% each piece", rarityOrder: R.uncommon },
    ],
  },
  {
    id: "old_knights",
    name: "Old Knights",
    type: "elite",
    area: "Heide's Tower of Flame",
    areaId: "heides_tower",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Twinkling Titanite", rate: "Rare", rarityOrder: R.rare },
    ],
  },
  {
    id: "ogre",
    name: "Ogre",
    type: "elite",
    area: "Forest of Fallen Giants",
    areaId: "forest_of_fallen_giants",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Titanite Shard", rate: "Common", rarityOrder: R.common },
      { item: "Ring of Giants", rate: "Rare", rarityOrder: R.rare },
    ],
  },
  {
    id: "undead_blacksmith",
    name: "Undead Blacksmith",
    type: "common",
    area: "Harvest Valley / Earthen Peak",
    areaId: "harvest_valley",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Titanite Shard", rate: "Common", rarityOrder: R.common },
    ],
  },
  {
    id: "skeleton",
    name: "Skeleton",
    type: "common",
    area: "Harvest Valley",
    areaId: "harvest_valley",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Titanite Shard", rate: "Common", rarityOrder: R.common },
    ],
  },
  {
    id: "villager",
    name: "Villager (Tseldoran Settler)",
    type: "common",
    area: "Brightstone Cove Tseldora",
    areaId: "brightstone_cove",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Titanite Shard", rate: "Lower than Blacksmiths", rarityOrder: R.uncommon },
      { item: "Tseldora Set", rate: "~1% (rare)", rarityOrder: R.veryRare },
    ],
  },
  {
    id: "spider_hollow",
    name: "Spider Hollow (Humanoid Spider)",
    type: "common",
    area: "Brightstone Cove Tseldora",
    areaId: "brightstone_cove",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Large Titanite Shard", rate: "Good", rarityOrder: R.common },
    ],
  },
  {
    id: "undead_mage",
    name: "Undead Mage",
    type: "common",
    area: "Brightstone Cove Tseldora",
    areaId: "brightstone_cove",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Large Titanite Shard", rate: "Good", rarityOrder: R.common },
    ],
  },
  {
    id: "gyrm_warrior",
    name: "Gyrm Warrior",
    type: "common",
    area: "Doors of Pharros",
    areaId: "doors_of_pharros",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Large Titanite Shard", rate: "Common", rarityOrder: R.common },
      { item: "Gyrm Set", rate: "~5% each piece", rarityOrder: R.uncommon },
    ],
  },
  {
    id: "large_gyrm",
    name: "Large Gyrm",
    type: "common",
    area: "Doors of Pharros",
    areaId: "doors_of_pharros",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Titanite Chunk", rate: "~3%", rarityOrder: R.rare },
    ],
  },
  {
    id: "ironclad_soldier",
    name: "Ironclad Soldier",
    type: "elite",
    area: "Iron Keep",
    areaId: "iron_keep",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Large Titanite Shard", rate: "Common", rarityOrder: R.common },
      { item: "Gyrm Greatshield", rate: "Rare", rarityOrder: R.rare },
    ],
  },
  {
    id: "darksucker",
    name: "Darksucker (Coal Tar)",
    type: "common",
    area: "Black Gulch",
    areaId: "black_gulch",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Large Titanite Shard", rate: "~10%", rarityOrder: R.common },
      { item: "Titanite Chunk", rate: "~5%", rarityOrder: R.uncommon },
    ],
  },
  {
    id: "great_basilisk",
    name: "Great Basilisk",
    type: "elite",
    area: "Huntsman's Copse",
    areaId: "huntsmans_copse",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Large Titanite Shard", rate: "Guaranteed (×3)", rarityOrder: R.guaranteed },
      { item: "Petrified Dragon Bone", rate: "Random", rarityOrder: R.rare },
    ],
  },
  {
    id: "coal_tar",
    name: "Coal Tar",
    type: "common",
    area: "Aldia's Keep",
    areaId: "aldias_keep",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Titanite Chunk", rate: "Best efficiency (~4.6/min)", rarityOrder: R.common },
    ],
  },
  {
    id: "possessed_armor",
    name: "Possessed Armor",
    type: "elite",
    area: "Brume Tower (DLC)",
    areaId: "dlc_iron",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Titanite Chunk", rate: "Good", rarityOrder: R.common },
    ],
  },
  {
    id: "undead_peasant",
    name: "Undead Peasant",
    type: "common",
    area: "Brightstone Cove Tseldora",
    areaId: "brightstone_cove",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Titanite Chunk", rate: "~3% or less", rarityOrder: R.veryRare },
    ],
  },
  {
    id: "archdrake_pilgrim",
    name: "Archdrake Pilgrim",
    type: "elite",
    area: "Shrine of Amana",
    areaId: "shrine_of_amana",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Twinkling Titanite", rate: "Good", rarityOrder: R.common },
    ],
  },
  {
    id: "amana_priestess",
    name: "Amana Priestess",
    type: "common",
    area: "Shrine of Amana",
    areaId: "shrine_of_amana",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Twinkling Titanite", rate: "Good", rarityOrder: R.common },
    ],
  },
  {
    id: "rampart_golem",
    name: "Rampart Golem",
    type: "elite",
    area: "Aldia's Keep",
    areaId: "aldias_keep",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Twinkling Titanite", rate: "Drops", rarityOrder: R.common },
      { item: "Rampart Golem Lance", rate: "Rare (~2%)", rarityOrder: R.rare },
    ],
  },
  {
    id: "poison_statue_cluster",
    name: "Poison Statue Cluster",
    type: "common",
    area: "Shulva Sanctum City (DLC)",
    areaId: "dlc_sunken",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Twinkling Titanite", rate: "Rare", rarityOrder: R.rare },
    ],
  },
  {
    id: "dragon_acolyte",
    name: "Dragon Acolyte",
    type: "elite",
    area: "Aldia's Keep",
    areaId: "aldias_keep",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Petrified Dragon Bone", rate: "Random", rarityOrder: R.rare },
      { item: "Dragon Scale", rate: "Rare", rarityOrder: R.rare },
    ],
  },
  {
    id: "the_imperfect",
    name: "The Imperfect",
    type: "elite",
    area: "Lair of the Imperfect (DLC)",
    areaId: "dlc_sunken",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Petrified Dragon Bone", rate: "Relatively high", rarityOrder: R.uncommon },
      { item: "Twinkling Titanite", rate: "Drops", rarityOrder: R.common },
      { item: "Titanite Slab", rate: "Rare", rarityOrder: R.rare },
    ],
  },
  {
    id: "wyvern",
    name: "Wyvern",
    type: "elite",
    area: "Dragon Aerie",
    areaId: "dragon_aerie",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Petrified Dragon Bone", rate: "Random", rarityOrder: R.rare },
    ],
  },
  {
    id: "frozen_reindeer",
    name: "Frozen Reindeer",
    type: "elite",
    area: "Frigid Outskirts (DLC)",
    areaId: "dlc_ivory",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Petrified Dragon Bone", rate: "Random", rarityOrder: R.rare },
    ],
  },
  {
    id: "desert_sorceress",
    name: "Desert Sorceress",
    type: "common",
    area: "Earthen Peak",
    areaId: "earthen_peak",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Fire Seed", rate: "Good", rarityOrder: R.common },
      { item: "Desert Sorceress Set", rate: "~5% each piece", rarityOrder: R.uncommon },
    ],
  },
  {
    id: "fire_salamander",
    name: "Fire Salamander",
    type: "elite",
    area: "Forest of Fallen Giants",
    areaId: "forest_of_fallen_giants",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Fire Seed", rate: "Rare", rarityOrder: R.rare },
      { item: "Firedrake Stone", rate: "Rare", rarityOrder: R.rare },
    ],
  },
  {
    id: "leydia_pyromancer",
    name: "Leydia Pyromancer",
    type: "common",
    area: "Undead Crypt",
    areaId: "undead_crypt",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Darknight Stone", rate: "Rare", rarityOrder: R.rare },
      { item: "Faintstone", rate: "Rare", rarityOrder: R.rare },
    ],
  },
  {
    id: "basilisk",
    name: "Basilisk",
    type: "common",
    area: "Various",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Boltstone", rate: "Very rare", rarityOrder: R.veryRare },
      { item: "Darknight Stone", rate: "Rare", rarityOrder: R.rare },
      { item: "Faintstone", rate: "Rare", rarityOrder: R.rare },
    ],
  },
  {
    id: "mimics",
    name: "Mimic",
    type: "elite",
    area: "Various",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Symbol of Avarice", rate: "Rare", rarityOrder: R.rare },
      { item: "Varies by chest", rate: "Guaranteed", rarityOrder: R.guaranteed },
    ],
  },
  {
    id: "syan_knights",
    name: "Syan Knight",
    type: "elite",
    area: "Drangleic Castle",
    areaId: "drangleic_castle",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Syan's Halberd", rate: "Rare", rarityOrder: R.rare },
      { item: "Syan's Set", rate: "~5% each piece", rarityOrder: R.uncommon },
    ],
  },
  {
    id: "drakeblood_knights",
    name: "Drakeblood Knight",
    type: "elite",
    area: "Dragon Shrine",
    areaId: "dragon_aerie",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Drakeblood Set", rate: "~5% each piece", rarityOrder: R.uncommon },
    ],
  },
  {
    id: "varangian",
    name: "Varangian",
    type: "common",
    area: "No-Man's Wharf",
    areaId: "no_mans_wharf",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Varangian Sword", rate: "Rare (~2%)", rarityOrder: R.rare },
      { item: "Varangian Shield", rate: "Rare", rarityOrder: R.rare },
    ],
  },
  {
    id: "manikin",
    name: "Manikin",
    type: "elite",
    area: "Earthen Peak, Lost Bastille",
    areaId: "earthen_peak",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Manikin Sabre", rate: "Rare (~2%)", rarityOrder: R.rare },
      { item: "Manikin Claws", rate: "Rare (~2%)", rarityOrder: R.rare },
      { item: "Manikin Knife", rate: "Rare (~2%)", rarityOrder: R.rare },
      { item: "Manikin Set", rate: "~5% each piece", rarityOrder: R.uncommon },
    ],
  },
  {
    id: "stone_soldier",
    name: "Stone Soldier",
    type: "elite",
    area: "Drangleic Castle",
    areaId: "drangleic_castle",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Stone Soldier Spear", rate: "Rare (~2%)", rarityOrder: R.rare },
    ],
  },
  {
    id: "loyce_knight",
    name: "Loyce Knight",
    type: "elite",
    area: "Eleum Loyce (DLC)",
    areaId: "dlc_ivory",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Loyce Greatsword", rate: "Rare (~2%)", rarityOrder: R.rare },
      { item: "Loyce Shield", rate: "Rare", rarityOrder: R.rare },
    ],
  },
  {
    id: "charred_loyce_knight",
    name: "Charred Loyce Knight",
    type: "elite",
    area: "Eleum Loyce (DLC) — Old Chaos",
    areaId: "dlc_ivory",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Charred Loyce Greatsword", rate: "Rare (~2%)", rarityOrder: R.rare },
    ],
  },
  {
    id: "hollow_soldiers",
    name: "Hollow Soldier",
    type: "common",
    area: "Forest of Fallen Giants, Bastille",
    areaId: "forest_of_fallen_giants",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Various", rate: "Rare", rarityOrder: R.rare },
    ],
  },
  {
    id: "spiders",
    name: "Spider Hollow / Spider Drone",
    type: "common",
    area: "Brightstone Cove",
    areaId: "brightstone_cove",
    drops: [
      { item: "Souls", rate: "Guaranteed", rarityOrder: R.guaranteed },
      { item: "Large Titanite Shard", rate: "Good (humanoid spiders)", rarityOrder: R.common },
    ],
  },
];

/** Get drops for an enemy, sorted by rarity (most common first) */
export function getEnemyDrops(enemyId: string): EnemyDropEntry | undefined {
  return ENEMY_DROPS.find((e) => e.id === enemyId);
}

/** Get all enemies with drops, optionally filtered by type or area */
export function getEnemyDropsFiltered(filter?: {
  type?: EnemyDropType;
  areaId?: AreaId;
  search?: string;
}): EnemyDropEntry[] {
  let result = [...ENEMY_DROPS];
  if (filter?.type) {
    result = result.filter((e) => e.type === filter.type);
  }
  if (filter?.areaId) {
    result = result.filter((e) => e.areaId === filter.areaId);
  }
  if (filter?.search) {
    const q = filter.search.toLowerCase();
    result = result.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.area.toLowerCase().includes(q) ||
        e.drops.some((d) => d.item.toLowerCase().includes(q))
    );
  }
  return result;
}
