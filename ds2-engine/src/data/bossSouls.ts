/**
 * Boss Souls database — DS2 Scholar of the First Sin
 * Sources: Fextralife Wiki, IGN Wiki. Trade with Straid (Lost Bastille) or Ornifex (Brightstone Cove).
 */

export interface BossSoulTrade {
  name: string;
  type: "weapon" | "shield" | "spell" | "sorcery" | "miracle" | "pyromancy" | "hex";
  vendor: "straid" | "ornifex";
}

export interface BossSoul {
  id: string;
  soulName: string;
  bossName: string;
  area: string;
  consumeSouls: number;
  trades: BossSoulTrade[];
  disclaimer?: string;
  note?: string;
}

export const BOSS_SOULS: BossSoul[] = [
  {
    id: "pursuer",
    soulName: "Soul of the Pursuer",
    bossName: "The Pursuer",
    area: "Forest of Fallen Giants",
    consumeSouls: 17000,
    trades: [
      { name: "Pursuer's Ultra Greatsword", type: "weapon", vendor: "straid" },
      { name: "Pursuer's Greatshield", type: "shield", vendor: "straid" },
    ],
    note: "Can fight early on platform or in boss room.",
  },
  {
    id: "last_giant",
    soulName: "Soul of the Last Giant",
    bossName: "The Last Giant",
    area: "Forest of Fallen Giants",
    consumeSouls: 10000,
    trades: [{ name: "Giant Stone Axe", type: "weapon", vendor: "straid" }],
  },
  {
    id: "dragonrider",
    soulName: "Dragonrider Soul",
    bossName: "Dragonrider",
    area: "Heide's Tower of Flame",
    consumeSouls: 15000,
    trades: [
      { name: "Dragonrider's Halberd", type: "weapon", vendor: "straid" },
      { name: "Dragonrider's Twinblade", type: "weapon", vendor: "straid" },
      { name: "Dragonrider Bow", type: "weapon", vendor: "straid" },
      { name: "Dragonrider Greatshield", type: "shield", vendor: "straid" },
    ],
  },
  {
    id: "old_dragonslayer",
    soulName: "Old Dragonslayer Soul",
    bossName: "Old Dragonslayer",
    area: "Heide's Tower of Flame",
    consumeSouls: 15000,
    trades: [{ name: "Dragonslayer Spear", type: "weapon", vendor: "ornifex" }],
  },
  {
    id: "flexile_sentry",
    soulName: "Flexile Sentry Soul",
    bossName: "Flexile Sentry",
    area: "No-Man's Wharf",
    consumeSouls: 12000,
    trades: [
      { name: "Warped Sword", type: "weapon", vendor: "straid" },
      { name: "Arced Sword", type: "weapon", vendor: "straid" },
      { name: "Barbed Club", type: "weapon", vendor: "straid" },
    ],
  },
  {
    id: "ruin_sentinels",
    soulName: "Ruin Sentinel Soul",
    bossName: "Ruin Sentinels",
    area: "Lost Bastille",
    consumeSouls: 15000,
    trades: [{ name: "Heavy Homing Soul Arrow", type: "sorcery", vendor: "straid" }],
  },
  {
    id: "belfry_gargoyles",
    soulName: "Belfry Gargoyle Soul",
    bossName: "Belfry Gargoyles",
    area: "Lost Bastille (Belfry Luna)",
    consumeSouls: 15000,
    trades: [{ name: "Gargoyle Bident", type: "weapon", vendor: "straid" }],
  },
  {
    id: "lost_sinner",
    soulName: "Soul of the Lost Sinner",
    bossName: "Lost Sinner",
    area: "Sinner's Rise",
    consumeSouls: 50000,
    trades: [{ name: "Lost Sinner's Sword", type: "weapon", vendor: "ornifex" }],
    note: "Lord Soul. NG+ drops Old Witch Soul (Chaos Blade).",
  },
  {
    id: "skeleton_lords",
    soulName: "Skeleton Lord's Soul",
    bossName: "Skeleton Lords",
    area: "Huntsman's Copse",
    consumeSouls: 14000,
    trades: [{ name: "Roaring Halberd", type: "weapon", vendor: "straid" }],
  },
  {
    id: "executioner_chariot",
    soulName: "Executioner's Chariot Soul",
    bossName: "Executioner's Chariot",
    area: "Huntsman's Copse",
    consumeSouls: 22000,
    trades: [
      { name: "Chariot Lance", type: "weapon", vendor: "straid" },
      { name: "Shield Crossbow", type: "weapon", vendor: "straid" },
    ],
  },
  {
    id: "covetous_demon",
    soulName: "Covetous Demon Soul",
    bossName: "Covetous Demon",
    area: "Harvest Valley",
    consumeSouls: 12000,
    trades: [
      { name: "Bone Scythe", type: "weapon", vendor: "straid" },
      { name: "Toxic Mist", type: "pyromancy", vendor: "straid" },
    ],
  },
  {
    id: "mytha",
    soulName: "Mytha, the Baneful Queen Soul",
    bossName: "Mytha, the Baneful Queen",
    area: "Earthen Peak",
    consumeSouls: 25000,
    trades: [{ name: "Mytha's Bent Blade", type: "weapon", vendor: "straid" }],
    disclaimer: "Burn the windmill before this fight or the arena is full of poison.",
  },
  {
    id: "smelter_demon",
    soulName: "Smelter Demon Soul",
    bossName: "Smelter Demon",
    area: "Iron Keep",
    consumeSouls: 32000,
    trades: [
      { name: "Smelter Sword", type: "weapon", vendor: "straid" },
      { name: "Shield Crossbow", type: "weapon", vendor: "straid" },
    ],
  },
  {
    id: "old_iron_king",
    soulName: "Old Iron King Soul",
    bossName: "Old Iron King",
    area: "Iron Keep",
    consumeSouls: 75000,
    trades: [{ name: "Iron King Hammer", type: "weapon", vendor: "ornifex" }],
    note: "Lord Soul.",
  },
  {
    id: "royal_rat_vanguard",
    soulName: "Royal Rat Vanguard Soul",
    bossName: "Royal Rat Vanguard",
    area: "Grave of Saints",
    consumeSouls: 8000,
    trades: [{ name: "Soul Shower", type: "sorcery", vendor: "straid" }],
  },
  {
    id: "rotten",
    soulName: "Soul of the Rotten",
    bossName: "The Rotten",
    area: "Black Gulch",
    consumeSouls: 45000,
    trades: [
      { name: "Butcher's Knife", type: "weapon", vendor: "ornifex" },
      { name: "Acid Surge", type: "pyromancy", vendor: "straid" },
    ],
    note: "Lord Soul. NG+ drops Old Dead One Soul (Crypt Blacksword, hex weapon).",
  },
  {
    id: "scorpioness_najka",
    soulName: "Scorpioness Najka Soul",
    bossName: "Scorpioness Najka",
    area: "Shaded Woods",
    consumeSouls: 18000,
    trades: [{ name: "Sacred Oath", type: "miracle", vendor: "straid" }],
  },
  {
    id: "royal_rat_authority",
    soulName: "Royal Rat Authority Soul",
    bossName: "Royal Rat Authority",
    area: "Doors of Pharros",
    consumeSouls: 25000,
    trades: [],
    note: "No trade. Safe to consume for souls.",
  },
  {
    id: "dukes_dear_freja",
    soulName: "Soul of the Duke's Dear Freja",
    bossName: "Duke's Dear Freja",
    area: "Brightstone Cove Tseldora",
    consumeSouls: 25000,
    trades: [
      { name: "Spider's Silk", type: "weapon", vendor: "ornifex" },
      { name: "Spider Fang", type: "weapon", vendor: "ornifex" },
    ],
    note: "In NG+, a second soul (Old Paledrake Soul) appears — trade for Moonlight Greatsword (Benhart achievement).",
  },
  {
    id: "looking_glass_knight",
    soulName: "Looking Glass Knight Soul",
    bossName: "Looking Glass Knight",
    area: "Drangleic Castle",
    consumeSouls: 42000,
    trades: [
      { name: "King's Mirror", type: "shield", vendor: "ornifex" },
      { name: "Thorned Greatsword", type: "weapon", vendor: "ornifex" },
    ],
  },
  {
    id: "demon_of_song",
    soulName: "Demon of Song Soul",
    bossName: "Demon of Song",
    area: "Shrine of Amana",
    consumeSouls: 25000,
    trades: [{ name: "Spotted Whip", type: "weapon", vendor: "straid" }],
  },
  {
    id: "velstadt",
    soulName: "Soul of Velstadt",
    bossName: "Velstadt, the Royal Aegis",
    area: "Undead Crypt",
    consumeSouls: 38000,
    trades: [
      { name: "Sacred Chime Hammer", type: "weapon", vendor: "ornifex" },
      { name: "Lifedrain Patch", type: "hex", vendor: "straid" },
    ],
  },
  {
    id: "guardian_dragon",
    soulName: "Guardian Dragon Soul",
    bossName: "Guardian Dragon",
    area: "Aldia's Keep",
    consumeSouls: 60000,
    trades: [
      { name: "Drakewing Ultra Greatsword", type: "weapon", vendor: "ornifex" },
      { name: "Spitfire Spear", type: "weapon", vendor: "ornifex" },
    ],
  },
  {
    id: "ancient_dragon",
    soulName: "Old King Soul",
    bossName: "Ancient Dragon",
    area: "Dragon Shrine",
    consumeSouls: 75000,
    trades: [{ name: "Dragonslayer Greatbow", type: "weapon", vendor: "ornifex" }],
    note: "Giant's Kinship required for Throne of Want. Don't attack the Ancient Dragon unless you want the fight.",
  },
  {
    id: "giant_lord",
    soulName: "Giant Lord Soul",
    bossName: "Giant Lord",
    area: "Memory of Jeigh",
    consumeSouls: 75000,
    trades: [],
    note: "No trade. Farmable via Ascetic — best soul farming in game. Consume or save for Vendrick (see Giant Soul).",
  },
  {
    id: "nashandra",
    soulName: "Soul of Nashandra",
    bossName: "Nashandra",
    area: "Throne of Want",
    consumeSouls: 90000,
    trades: [
      { name: "Bow of Want", type: "weapon", vendor: "ornifex" },
      { name: "Chime of Want", type: "weapon", vendor: "ornifex" },
      { name: "Scythe of Want", type: "weapon", vendor: "ornifex" },
    ],
  },
  {
    id: "throne_watcher",
    soulName: "Throne Watcher Soul",
    bossName: "Throne Watcher",
    area: "Throne of Want",
    consumeSouls: 45000,
    trades: [
      { name: "Watcher's Shield", type: "shield", vendor: "ornifex" },
      { name: "Watcher Greatsword", type: "weapon", vendor: "ornifex" },
    ],
  },
  {
    id: "throne_defender",
    soulName: "Throne Defender Soul",
    bossName: "Throne Defender",
    area: "Throne of Want",
    consumeSouls: 50000,
    trades: [
      { name: "Defender's Shield", type: "shield", vendor: "ornifex" },
      { name: "Defender Greatsword", type: "weapon", vendor: "ornifex" },
    ],
  },
  {
    id: "darklurker",
    soulName: "Darklurker Soul",
    bossName: "Darklurker",
    area: "Dark Chasm of Old",
    consumeSouls: 50000,
    trades: [{ name: "Repel", type: "hex", vendor: "straid" }],
    note: "Requires completing all 3 Dark Chasms. Weak to fire.",
  },
  {
    id: "vendrick",
    soulName: "Soul of the King",
    bossName: "Vendrick",
    area: "Undead Crypt",
    consumeSouls: 60000,
    trades: [
      { name: "King's Shield", type: "shield", vendor: "ornifex" },
      { name: "King's Ultra Greatsword", type: "weapon", vendor: "ornifex" },
      { name: "Ruler's Sword", type: "weapon", vendor: "ornifex" },
    ],
    note: "Optional. Need 4–5 Giant Souls to reduce his defense. Kill him after Giant Lord.",
  },
  // DLC
  {
    id: "elana",
    soulName: "Soul of Elana, Squalid Queen",
    bossName: "Elana, the Squalid Queen",
    area: "DLC 1: Shulva",
    consumeSouls: 25000,
    trades: [{ name: "Wrathful Axe", type: "weapon", vendor: "ornifex" }],
  },
  {
    id: "sinh",
    soulName: "Soul of Sinh, the Slumbering Dragon",
    bossName: "Sinh, the Slumbering Dragon",
    area: "DLC 1: Shulva",
    consumeSouls: 75000,
    trades: [{ name: "Yorgh's Spear", type: "weapon", vendor: "ornifex" }],
    disclaimer: "Destroys weapon durability. Bring repair powder or backup weapons.",
  },
  {
    id: "fume_knight",
    soulName: "Soul of the Fume Knight",
    bossName: "Fume Knight",
    area: "DLC 2: Brume Tower",
    consumeSouls: 75000,
    trades: [
      { name: "Fume Ultra Greatsword", type: "weapon", vendor: "ornifex" },
      { name: "Fume Sword", type: "weapon", vendor: "ornifex" },
    ],
  },
  {
    id: "blue_smelter",
    soulName: "Aged Smelter Demon Soul",
    bossName: "Blue Smelter Demon",
    area: "DLC 2: Iron Passage",
    consumeSouls: 32000,
    trades: [{ name: "Aged Smelter Sword", type: "weapon", vendor: "straid" }],
    note: "Optional. Magic damage variant. Iron Passage run is difficult.",
  },
  {
    id: "nadalia",
    soulName: "Soul of Nadalia, Bride of Ash",
    bossName: "Nadalia (fragments)",
    area: "DLC 2: Brume Tower",
    consumeSouls: 0,
    trades: [{ name: "Chime of Screams", type: "weapon", vendor: "straid" }],
    note: "Collect 12 Nadalia Soul fragments. Combine at Straid for Chime of Screams. Do not consume fragments.",
  },
  {
    id: "sir_alonne",
    soulName: "Soul of Sir Alonne",
    bossName: "Sir Alonne",
    area: "DLC 2: Brume Tower (Memory)",
    consumeSouls: 64000,
    trades: [{ name: "Bewitched Alonne Sword", type: "weapon", vendor: "ornifex" }],
  },
  {
    id: "aava",
    soulName: "Soul of Aava, the King's Pet",
    bossName: "Aava, the King's Pet",
    area: "DLC 3: Eleum Loyce",
    consumeSouls: 25000,
    trades: [{ name: "Ivory Straight Sword", type: "weapon", vendor: "ornifex" }],
    disclaimer: "Invisible until you get Eye of the Priestess.",
  },
  {
    id: "burnt_ivory_king",
    soulName: "Soul of the Ivory King",
    bossName: "Burnt Ivory King",
    area: "DLC 3: Eleum Loyce",
    consumeSouls: 75000,
    trades: [{ name: "Ivory King Ultra Greatsword", type: "weapon", vendor: "ornifex" }],
    note: "Find all 4 Loyce Knights before the fight.",
  },
  {
    id: "lud_zallen",
    soulName: "Soul of Lud, the King's Pet / Soul of Zallen, the King's Pet",
    bossName: "Lud & Zallen",
    area: "DLC 3: Frigid Outskirts",
    consumeSouls: 25000,
    trades: [
      { name: "Loyce Greatsword", type: "weapon", vendor: "ornifex" },
      { name: "Loyce Shield", type: "shield", vendor: "ornifex" },
    ],
    disclaimer: "Frigid Outskirts run is extremely difficult. Optional boss.",
  },
  {
    id: "alsanna",
    soulName: "Soul of Alsanna",
    bossName: "Alsanna, Silent Oracle",
    area: "DLC 3: Eleum Loyce",
    consumeSouls: 8000,
    trades: [{ name: "Eleum Loyce", type: "weapon", vendor: "ornifex" }],
    note: "Given after Burnt Ivory King. She is the final NPC, not a boss.",
  },
];

/** Soul of a Giant — reduces Vendrick's defense. DO NOT consume. */
export const GIANT_SOUL_DISCLAIMER =
  "Soul of a Giant: Found in memories (Giant Lord, Ancient Dragon memory, etc.). Each one reduces Vendrick's defense. With 5, he has 1× defense. With 0, he has 32×. DO NOT consume — keep for Vendrick fight.";
