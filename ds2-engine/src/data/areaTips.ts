import type { AreaId } from "./areas";

export interface AreaTip {
  area: AreaId;
  overview?: string;
  route?: string;
  bossTips?: Record<string, string>;
  keyItems?: string[];
}

export const AREA_TIPS: Partial<Record<AreaId, AreaTip>> = {
  things_betwixt: {
    area: "things_betwixt",
    overview: "Tutorial area. Exhaust Milibeth dialogue. Drop Small Smooth & Silky Stone in bird nest for trade. Coffin swaps gender.",
    route: "Main path → bridge → fog gates → Majula exit. Optional: Ogres for Stone Ring.",
    keyItems: ["Estus Flask (from Herald in Majula)", "Binoculars", "Handmaid's Ladle"],
  },
  majula: {
    area: "majula",
    overview: "Hub. Hit well for Estus Shard. Buy Silvercat Ring (13,400) and Ring of Whispers (5,800) from Shalquoir. Spend 10k at Melentia for Covetous Silver Serpent Ring +1.",
    bossTips: {},
    keyItems: ["Estus Shard (well)", "Company of Champions"],
  },
  forest_of_fallen_giants: {
    area: "forest_of_fallen_giants",
    overview: "Illusory: press A/X (not attack!). 1 illusory (Cardinal Tower stairway), 1 breakable (firebomb), 1 Pharros (ballista room). Fire Longsword in salamander chest — ★ early staple.",
    bossTips: {
      "Last Giant": "Summon Pate (if trap done) and Luet. Stay behind legs.",
      "Pursuer": "Fight on platform or use ballista. Parry optional.",
    },
    keyItems: ["Fire Longsword", "Dull Ember (later)", "Soldier Key"],
  },
  harvest_valley: {
    area: "harvest_valley",
    overview: "Board walls: Dark Giant breaks them. Radiant Lifegem, Crimson Water (tricky jump). Gavlan, Heirs of Sun.",
  },
  iron_keep: {
    area: "iron_keep",
    overview: "2 illusory: Life Ring +1 (flaming bull room); Belfry Sol return walls (Grand Spirit Tree Shield, Black Knight Greatsword). Pharros: water pools, Belfry Sol.",
  },
  drangleic_castle: {
    area: "drangleic_castle",
    overview: "Breakable floor in Ruin Sentinel room → Grandahl. Illusory in knight tower → Faraam Set, Forgotten Chamber bonfire.",
  },
  shrine_of_amana: {
    area: "shrine_of_amana",
    overview: "Pharros near ramp (Crumbled Ruins) → Helix Halberd cave. Use bow for priestesses.",
  },
  heides_tower: {
    area: "heides_tower",
    overview: "Pull BOTH levers for Dragonrider for full platform. Old Knights despawn. Licia moves to Majula rotunda after Dragonrider.",
    bossTips: {
      "Dragonrider": "Pull both levers first. Platform drops if you don't.",
      "Old Dragonslayer": "Ornstein callback. Old Leo Ring drop.",
    },
    keyItems: ["Sublime Bone Dust", "Token of Fidelity (for Blue Sentinels)"],
  },
  no_mans_wharf: {
    area: "no_mans_wharf",
    overview: "Lucatiel in house LEFT of first stairs (SotFS). 2 illusory walls (shortcut house), 1 breakable (poison cask house). Pharros lights area, scares Darkdwellers.",
    bossTips: {
      "Flexile Sentry": "Summon Lucatiel for boss survival. Fight in water.",
    },
    keyItems: ["Lucatiel talk", "Gavlan talk"],
  },
  earthen_peak: {
    area: "earthen_peak",
    overview: "BURN THE WINDMILL before Mytha! 3 illusory (poison jars, above boss door). Pharros: Poisonbite Ring room; mushroom pool (heals after burn).",
    bossTips: {
      "Mytha": "Burn windmill first! Summon Jester Thomas.",
    },
    keyItems: ["Lucatiel", "Estus Shard", "Prostration gesture"],
  },
  black_gulch: {
    area: "black_gulch",
    overview: "Break poison statues. Shotel in cave. Save Branch for hidden bonfire. Lucatiel: 1st bonfire → left, edge cliff, DROP DOWN near 3 poison statues.",
    bossTips: {
      "The Rotten": "Easiest Lucatiel boss survival. Stay behind, dodge dark AoE.",
    },
    keyItems: ["Lucatiel", "Grandahl", "Hidden bonfire path"],
  },
  undead_crypt: {
    area: "undead_crypt",
    overview: "DO NOT light torches or ring bells! 2 illusory walls (Avelyn; Great Lightning Spear). Pharros behind illusory. Enter with no torch.",
    bossTips: {
      "Velstadt": "Dark-resistant. Use Lightning Mace.",
    },
    keyItems: ["Have Mercy gesture", "Agdayne hex vendor"],
  },
  dragon_aerie: {
    area: "dragon_aerie",
    overview: "11 Crystal Lizards. Pharros in Dragon Shrine (Judgement Set). Dragon Knights honorable — don't attack. Only Drakekeepers near Ancient Dragon hostile.",
    bossTips: {},
    keyItems: ["Crystal Lizards", "Twinkling Titanite"],
  },
  dlc_ivory: {
    area: "dlc_ivory",
    overview: "Find ALL 4 Loyce Knights before Burnt Ivory King — they seal portals in arena. Get Eye of Priestess for Aava (invisible).",
    bossTips: {
      "Burnt Ivory King": "Loyce Knights close portals. Epic fight.",
      "Lud & Zallen": "Frigid Outskirts. The run IS the boss.",
    },
    keyItems: ["4 Loyce Knights", "Eye of Priestess"],
  },
  lost_bastille: {
    area: "lost_bastille",
    overview: "6+ illusory walls in Ruin Sentinels room alone. Dull Ember → McDuff. Pharros: Belfry Luna, Servants' Quarters (Great Lightning Spear). Breakable: keg wall to McDuff.",
    bossTips: {
      "Ruin Sentinels": "Fight first on platform. Drop down together.",
      "Belfry Gargoyles": "Covetous Gold Serpent Ring +2 on roof after.",
    },
    keyItems: ["Dull Ember", "McDuff", "Straid", "Estus Shard"],
  },
  huntsmans_copse: {
    area: "huntsmans_copse",
    overview: "1 illusory in Bridge Approach cave (mushrooms to bottom — open on way OUT). Pay Licia 2,000. Felkin: 8 INT+8 FTH to shop; 20/20 BASE stats (no gear) → free Sunset Staff.",
    bossTips: {
      "Skeleton Lords": "Kill one at a time, clear adds.",
      "Executioner's Chariot": "Hit lever to stop chariot.",
    },
    keyItems: ["Felkin", "Creighton", "Estus Shard", "Soul Spear"],
  },
  brightstone_cove: {
    area: "brightstone_cove",
    overview: "1 illusory in Prowling Magus room (left of entrance). Pickaxe: pig clears mushrooms. Pate & Creighton fight. Benhart: summon for Magus.",
    bossTips: {
      "Prowling Magus": "Easiest Benhart boss survival.",
      "Freja": "Stay to sides, avoid laser.",
    },
    keyItems: ["Pate/Creighton choice", "Southern Ritual Band"],
  },
  aldias_keep: {
    area: "aldias_keep",
    overview: "2 secrets: illusory on acid staircase (Malformed Shell); Ogre breaks chained door (Fire Seed, Steel Set). Lucatiel: ONLY after 3 boss survivals!",
    bossTips: {
      "Guardian Dragon": "Fire breath. Stay close or far.",
    },
    keyItems: ["Lucatiel reward", "Dragon Bone"],
  },
};
