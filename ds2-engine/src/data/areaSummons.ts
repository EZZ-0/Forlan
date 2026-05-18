import type { AreaId } from "./areas";

/**
 * NPC summon data for each area. You MUST be human (use Human Effigy) to see summon signs.
 * Leave Company of Champions covenant — it blocks all NPC summons.
 */
export interface BossSummon {
  boss: string;
  npcs: Array<{
    name: string;
    location: string;
    quest?: "lucatiel" | "benhart"; // Quest-critical: must survive for achievement
  }>;
}

export const AREA_SUMMONS: Partial<Record<AreaId, BossSummon[]>> = {
  forest_of_fallen_giants: [
    {
      boss: "Last Giant",
      npcs: [
        { name: "Mild-Mannered Pate", location: "Outside fog gate (must exhaust dialogue + survive his trap first)" },
        { name: "Sellsword Luet", location: "Outside fog gate (SotFS only)" },
      ],
    },
    // Pursuer: no NPC summon
  ],
  heides_tower: [
    {
      boss: "Dragonrider",
      npcs: [
        { name: "Masterless Glencour", location: "Broken ledge to the right of fog gate" },
      ],
    },
    // Old Dragonslayer: no NPC summon
  ],
  no_mans_wharf: [
    {
      boss: "Flexile Sentry",
      npcs: [
        { name: "Lucatiel of Mirrah", location: "Dock leading to ship, near stairwell. Must talk to her in house LEFT of first stairs first.", quest: "lucatiel" },
      ],
    },
  ],
  lost_bastille: [
    {
      boss: "Ruin Sentinels",
      npcs: [
        { name: "Pilgrim Bellclaire", location: "Cells in alleyway from Tower Apart bonfire, before boss" },
      ],
    },
    // Belfry Gargoyles: no NPC summon
  ],
  earthen_peak: [
    {
      boss: "Mytha, the Baneful Queen",
      npcs: [
        { name: "Jester Thomas", location: "Poison pool area (after burning the windmill!). Tank + Pyromancy" },
      ],
    },
  ],
  iron_keep: [
    {
      boss: "Smelter Demon",
      npcs: [
        { name: "Lucatiel of Mirrah", location: "Outside fog gate. Must have talked at all 4 prior locations.", quest: "lucatiel" },
      ],
    },
    // Old Iron King: no NPC summon
  ],
  black_gulch: [
    {
      boss: "The Rotten",
      npcs: [
        { name: "Lucatiel of Mirrah", location: "Hidden Chamber bonfire room (past petrified statue). Best boss for her survival.", quest: "lucatiel" },
        { name: "Lone Hunter Schmidt", location: "Outside boss fog gate" },
      ],
    },
  ],
  shaded_woods: [
    {
      boss: "Scorpioness Najka",
      npcs: [
        { name: "Manscorpion Tark", location: "Outside fog gate. Equip Ring of Whispers to see sign." },
      ],
    },
  ],
  brightstone_cove: [
    {
      boss: "Prowling Magus and Congregation",
      npcs: [
        { name: "Benhart of Jugo", location: "Near Royal Army Campsite bonfire / tents. Easiest boss for his survival.", quest: "benhart" },
      ],
    },
    {
      boss: "Duke's Dear Freja",
      npcs: [
        { name: "Ashen Knight Boyd", location: "On pillar opposite boss room entrance" },
      ],
    },
  ],
  sinners_rise: [
    {
      boss: "Lost Sinner",
      npcs: [
        { name: "Lucatiel of Mirrah", location: "Bottom of elevator, before fog gate. Must have talked at all 4 prior locations.", quest: "lucatiel" },
      ],
    },
  ],
  drangleic_castle: [
    {
      boss: "Looking Glass Knight",
      npcs: [
        { name: "Benhart of Jugo", location: "Outside King's Passage fog gate", quest: "benhart" },
        { name: "Ashen Knight Boyd", location: "Outside fog gate" },
        { name: "Sellsword Luet", location: "Outside fog gate" },
      ],
    },
    // Twin Dragonriders: no NPC summon
  ],
  undead_crypt: [
    {
      boss: "Velstadt, the Royal Aegis",
      npcs: [
        { name: "Grave Warden Agdayne", location: "Left of fog gate. Do NOT light torches or ring bells before talking to him." },
      ],
    },
  ],
  dragon_aerie: [
    {
      boss: "Ancient Dragon",
      npcs: [
        { name: "Head of Vengarl", location: "Outside boss room (Dragon Shrine). Don't attack Dragon Knights — walk through." },
      ],
    },
  ],
  memories: [
    {
      boss: "Giant Lord",
      npcs: [
        { name: "Benhart of Jugo", location: "Down stairs from Captain Drummond's sign. Must survive for quest.", quest: "benhart" },
      ],
    },
  ],
  throne_of_want: [
    {
      boss: "Throne Watcher & Defender",
      npcs: [
        { name: "Benhart of Jugo", location: "Right of fog gate. Must survive for quest.", quest: "benhart" },
      ],
    },
    {
      boss: "Nashandra",
      npcs: [
        { name: "Benhart of Jugo", location: "Right of fog gate" },
        { name: "Head of Vengarl", location: "Near fog gate" },
      ],
    },
  ],
  dlc_sunken: [
    {
      boss: "Elana, the Squalid Queen",
      npcs: [
        { name: "Steelheart Ellie", location: "Near fog gate" },
        { name: "Benhart of Jugo", location: "Near fog gate" },
      ],
    },
    // Sinh: no NPC summon
  ],
  dlc_iron: [
    {
      boss: "Fume Knight",
      npcs: [
        { name: "Steelheart Ellie", location: "Near fog gate" },
        { name: "Carhillion of the Fold", location: "Near fog gate (requires 20+ INT)" },
      ],
    },
    // Sir Alonne, Blue Smelter: no NPC summon or different
  ],
  dlc_ivory: [
    {
      boss: "Aava, the King's Pet",
      npcs: [
        { name: "Steelheart Ellie", location: "Near fog gate. Get Eye of the Priestess first or Aava is invisible." },
        { name: "Masterless Glencour", location: "Near fog gate (SotFS)" },
      ],
    },
    {
      boss: "Burnt Ivory King",
      npcs: [
        { name: "Lucatiel of Mirrah", location: "Grand Cathedral. Only if Aldia's Keep dialogue done (after 3 boss survivals).", quest: "lucatiel" },
      ],
    },
    // Lud & Zallen (Frigid Outskirts): no NPC summon
  ],
};
