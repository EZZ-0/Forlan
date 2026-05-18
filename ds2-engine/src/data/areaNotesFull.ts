/**
 * Structured area notes — bonfires, bosses, gestures, paths.
 * Complements AREA_TIPS with checklist-aligned guidance.
 */

import type { AreaId } from "./areas";

export interface BonfireNote {
  itemId: string;
  name: string;
  howToReach: string;
  farmingRef?: string;
  asceticValue?: string;
}

export interface BossNote {
  itemId: string;
  bossName: string;
  tactics: string;
}

export interface GestureNote {
  itemId: string;
  gesture: string;
  where: string;
}

export interface AreaNotesDetail {
  pathOrder?: string;
  bonfires?: BonfireNote[];
  bosses?: BossNote[];
  gestures?: GestureNote[];
  keyItems?: string[];
}

export const AREA_NOTES_DETAIL: Partial<Record<AreaId, AreaNotesDetail>> = {
  things_betwixt: {
    pathOrder: "Bonfire → Milibeth → bridge → fog gates → coffin → Majula exit.",
    bonfires: [{ itemId: "tb5", name: "Bonfire", howToReach: "Start of area, after first path." }],
    keyItems: ["Estus Flask (from Herald in Majula)", "Binoculars", "Handmaid's Ladle", "Stone Ring (Ogre)"],
  },
  majula: {
    pathOrder: "Hub — branch to FoFG, Heide's, pit, Shaded Woods.",
    bonfires: [
      {
        itemId: "mj1",
        name: "Majula bonfire",
        howToReach: "Center of hub. Emerald Herald here.",
        asceticValue: "2–3 ascetics: Maughlin sells Moonlight Butterfly Set (spend 15k).",
      },
    ],
    gestures: [{ itemId: "mj5", gesture: "Welcome", where: "Exhaust Saulden dialogue." }],
    keyItems: ["Estus Shard (well)", "Silvercat Ring", "Ring of Whispers", "Company of Champions"],
  },
  forest_of_fallen_giants: {
    pathOrder: "Crestfallen's Retreat → river → Cardinal Tower → Melentia → illusory/Pharros → Last Giant / Pursuer.",
    bonfires: [
      { itemId: "fg1", name: "Crestfallen's Retreat", howToReach: "From Majula path, first area entrance." },
      {
        itemId: "fg4",
        name: "Cardinal Tower",
        howToReach: "Cross river, up ladders, jump gap. Past Pate's gate.",
        farmingRef: "Cardinal Tower hollows (CoC) — ~2k/run.",
        asceticValue: "Respawns Last Giant, Pursuer.",
      },
    ],
    bosses: [
      { itemId: "fg15", bossName: "Pursuer (early)", tactics: "Fight on platform or use ballista. Parry optional." },
      { itemId: "fg17", bossName: "Last Giant", tactics: "Summon Pate (if trap done) and Luet. Stay behind legs." },
      { itemId: "fg19", bossName: "Pursuer", tactics: "Same as early. Bird nest after → Lost Bastille." },
    ],
    keyItems: ["Fire Longsword", "Dull Ember", "Soldier Key", "Chloranthy Ring (Pharros)"],
  },
  heides_tower: {
    pathOrder: "Tower of Flame → pull both levers → Dragonrider → Old Dragonslayer → Licia.",
    bonfires: [
      {
        itemId: "ht1",
        name: "Tower of Flame",
        howToReach: "From Majula, path past monument.",
        farmingRef: "Heide's Old Knights (CoC) — 3 knights, ~4.5k/run.",
      },
    ],
    bosses: [
      { itemId: "ht5", bossName: "Dragonrider", tactics: "Pull both levers first. Platform drops if you don't." },
      { itemId: "ht7", bossName: "Old Dragonslayer", tactics: "Ornstein callback. Old Leo Ring drop." },
    ],
    gestures: [{ itemId: "ht8", gesture: "Duel Bow", where: "Join Blue Sentinels (Token of Fidelity), exhaust Targray." }],
    keyItems: ["Sublime Bone Dust", "Token of Fidelity"],
  },
  no_mans_wharf: {
    pathOrder: "Bonfire → Lucatiel (house LEFT of stairs) → Gavlan → Pharros light → bell → Flexile Sentry → ship.",
    bonfires: [{ itemId: "nm1", name: "No-Man's Wharf", howToReach: "From Heide's, past Old Dragonslayer, elevator, ship path." }],
    bosses: [{ itemId: "nm6", bossName: "Flexile Sentry", tactics: "Summon Lucatiel for boss survival. Fight in water." }],
    keyItems: ["Lucatiel", "Gavlan", "Pharros light (scares Darkdwellers)"],
  },
  lost_bastille: {
    pathOrder: "Tower Apart or Exile Holding → Dull Ember → Straid → McDuff → Ruin Sentinels → Belfry Luna.",
    bonfires: [
      { itemId: "lb1", name: "Tower Apart / Exile Holding Cells", howToReach: "Bird nest (Pursuer) or ship (No-Man's Wharf).", farmingRef: "Exile Holding cells (CoC) — bombers ~3.5k/run." },
    ],
    bosses: [
      { itemId: "lb8", bossName: "Ruin Sentinels", tactics: "Fight first on platform. Drop down together." },
      { itemId: "lb11", bossName: "Belfry Gargoyles", tactics: "Covetous Gold Serpent Ring +2 on roof after." },
    ],
    gestures: [{ itemId: "lb5", gesture: "Mock", where: "Unpetrify Straid, exhaust dialogue." }],
    keyItems: ["Dull Ember", "McDuff", "Straid", "Estus Shard", "Great Lightning Spear (Pharros)"],
  },
  huntsmans_copse: {
    pathOrder: "Pay Licia 2k → Undead Lockaway → Felkin → illusory cave (open on way OUT) → Skeleton Lords → Chariot.",
    bonfires: [
      {
        itemId: "hc2",
        name: "Undead Lockaway",
        howToReach: "Pay Licia 2,000 at Majula rotunda to open path.",
        asceticValue: "Clear Bluestone Ring +2 (Skeleton Lords).",
      },
    ],
    bosses: [
      { itemId: "hc8", bossName: "Skeleton Lords", tactics: "Kill one at a time, clear adds." },
      { itemId: "hc9", bossName: "Executioner's Chariot", tactics: "Hit lever to stop chariot." },
    ],
    gestures: [{ itemId: "hc4", gesture: "Fist Pump", where: "Free Creighton from cell, exhaust dialogue." }],
    keyItems: ["Felkin", "Creighton", "Estus Shard", "Soul Spear", "Royal Soldier's Ring (illusory)"],
  },
  harvest_valley: {
    pathOrder: "Bonfire → Gavlan → Heirs of Sun (Praise the Sun) → board walls (Dark Giant) → Covetous Demon.",
    bonfires: [{ itemId: "hv1", name: "Harvest Valley", howToReach: "Through tunnel after Executioner's Chariot." }],
    bosses: [{ itemId: "hv6", bossName: "Covetous Demon", tactics: "Shoot pots to distract." }],
    gestures: [{ itemId: "hv5", gesture: "Praise the Sun", where: "Kneel at Heirs of Sun altar (across bridge, left)." }],
    keyItems: ["Fragrant Branch", "Sublime Bone Dust", "Gavlan", "Radiant Lifegem", "Crimson Water"],
  },
  earthen_peak: {
    pathOrder: "Lower bonfire → BURN WINDMILL → Lucatiel → Gilligan → illusory (poison jars, above boss) → Mytha.",
    bonfires: [
      { itemId: "ep1", name: "Lower Earthen Peak", howToReach: "From Harvest Valley, past Covetous Demon." },
      { itemId: "ep10", name: "Upper Earthen Peak", howToReach: "Illusory left above Mytha boss door.", asceticValue: "Covetous Silver Serpent Ring +2 (Mytha)." },
    ],
    bosses: [{ itemId: "ep7", bossName: "Mytha", tactics: "Burn windmill first! Summon Jester Thomas." }],
    gestures: [
      { itemId: "ep3", gesture: "Prostration", where: "Pay Gilligan 2,000 souls." },
      { itemId: "ep6", gesture: "Righty-ho!", where: "After Pate trap events." },
    ],
    keyItems: ["Lucatiel", "Estus Shard", "Poisonbite Ring (Pharros)", "Spell Quartz Ring +1"],
  },
  iron_keep: {
    pathOrder: "Threshold Bridge → illusory (Life Ring +1) → Smelter (optional) → Old Iron King → Primal → Belfry Sol.",
    bonfires: [
      {
        itemId: "ik1",
        name: "Threshold Bridge",
        howToReach: "From Earthen Peak, bridge after Mytha.",
        farmingRef: "Iron Keep Alonne Knights (CoC) — best mid-game ~6k/run.",
        asceticValue: "Respawns Smelter. Magerold sells Dragonrider Set at Intensity 2.",
      },
      { itemId: "ik10", name: "Primal Bonfire", howToReach: "After Old Iron King." },
    ],
    bosses: [
      { itemId: "ik8", bossName: "Smelter Demon", tactics: "Very tough, fire damage. Optional." },
      { itemId: "ik9", bossName: "Old Iron King", tactics: "Watch the lava hole! Lord Soul." },
    ],
    keyItems: ["Iron Key", "CGSR +1", "Estus Shard", "Sublime Bone Dust", "Life Ring +1", "Grand Spirit Tree Shield"],
  },
  the_pit: {
    pathOrder: "Majula Pit (Silvercat or Gilligan ladder) → Grave of Saints → Pharros → Royal Rat Vanguard.",
    bonfires: [{ itemId: "pt2", name: "Grave of Saints", howToReach: "Drop through Majula pit (Silvercat 13.4k or ladder 12k)." }],
    bosses: [{ itemId: "pt4", bossName: "Royal Rat Vanguard", tactics: "Kill the mohawk rat first." }],
    keyItems: ["Pharros contraptions", "Rat King covenant"],
  },
  the_gutter: {
    pathOrder: "Upper Gutter bonfire → light sconces → Branch → Dark Pyromancy Flame → Black Gulch.",
    bonfires: [{ itemId: "gt1", name: "Upper Gutter", howToReach: "From Grave of Saints, continue descending through pit." }],
    keyItems: ["Fragrant Branch", "Dark Pyromancy Flame"],
  },
  black_gulch: {
    pathOrder: "Black Gulch Mouth → break statues → Lucatiel (drop left) → hidden path (Branch) → Hidden Chamber → Rotten.",
    bonfires: [
      {
        itemId: "bg1",
        name: "Black Gulch Mouth",
        howToReach: "From Gutter exit.",
        farmingRef: "Black Gulch giants (CoC) — 2 Dark Giants ~10k/run.",
      },
      {
        itemId: "bg6",
        name: "Hidden Chamber",
        howToReach: "From fog gate hug LEFT wall → narrow path → Branch on statue.",
        asceticValue: "Respawns The Rotten.",
      },
    ],
    bosses: [{ itemId: "bg9", bossName: "The Rotten", tactics: "Stay behind, dodge dark AoE. Easiest Lucatiel survival." }],
    keyItems: ["Lucatiel", "Grandahl", "Shotel", "Scraps of Life", "Branch (save for hidden bonfire)"],
  },
  shaded_woods: {
    pathOrder: "Branch Rosabeth → Ruined Fork Road → fork: left (Vengarl, Najka) / straight (Pharros) / right (Shrine of Winter).",
    bonfires: [
      {
        itemId: "sw4",
        name: "Ruined Fork Road",
        howToReach: "Use Branch on Rosabeth, give clothes.",
        asceticValue: "Southern Ritual Band +2 (Najka). Gower's Ring (Shaded Ruins).",
      },
    ],
    bosses: [{ itemId: "sw7", bossName: "Scorpioness Najka", tactics: "Tark can be summoned." }],
    gestures: [
      { itemId: "sw2", gesture: "Joy", where: "Give Rosabeth clothing, exhaust dialogue." },
      { itemId: "sw5", gesture: "Decapitate", where: "Foggy area left wall — Head of Vengarl." },
      { itemId: "sw6", gesture: "Warmup", where: "Ring of Whispers, talk to Manscorpion Tark after Najka." },
    ],
    keyItems: ["Benhart", "Second Dragon Ring", "Estus Shard", "Fang Key (Lion Warrior)"],
  },
  doors_of_pharros: {
    pathOrder: "Bonfire → Santier's Spear (Pharros) → Gavlan → Grandahl → Royal Rat Authority.",
    bonfires: [{ itemId: "dp1", name: "Doors of Pharros", howToReach: "Shaded Woods middle path (past foggy area)." }],
    bosses: [{ itemId: "dp7", bossName: "Royal Rat Authority", tactics: "Kill small rats first — they're toxic!" }],
    keyItems: ["Santier's Spear", "Gavlan", "Grandahl", "Twisted Barricade"],
  },
  brightstone_cove: {
    pathOrder: "Royal Army Campsite → illusory (Magus room) → Prowling Magus → Pate/Creighton → Freja → Primal.",
    bonfires: [
      {
        itemId: "bc1",
        name: "Royal Army Campsite",
        howToReach: "Shaded Woods right path toward Tseldora.",
        farmingRef: "Brightstone spider hollows (CoC) — ~5k/run.",
      },
    ],
    bosses: [
      { itemId: "bc6", bossName: "Prowling Magus", tactics: "Easiest Benhart survival. Kill mages first." },
      { itemId: "bc8", bossName: "Duke's Dear Freja", tactics: "Two heads, damage heads only. Lord Soul." },
    ],
    keyItems: ["Southern Ritual Band", "Pate/Creighton", "Brightstone Key", "War Cry (Vengarl Body)"],
  },
  sinners_rise: {
    pathOrder: "Bonfire → light oil trails BOTH sides of fog → illusory (basement elevator) → Lost Sinner.",
    bonfires: [
      {
        itemId: "sr1",
        name: "Sinner's Rise",
        howToReach: "Lost Bastille elevator from Tower Apart.",
        asceticValue: "Respawns Lost Sinner.",
      },
    ],
    bosses: [{ itemId: "sr5", bossName: "Lost Sinner", tactics: "Aggressive, parry effective. Lucatiel summon at elevator bottom." }],
    keyItems: ["Sublime Bone Dust", "Estus Shard (illusory)", "Oil trails for lock-on"],
  },
  drangleic_castle: {
    pathOrder: "King's Gate → golem doors → Wellager → illusory (Faraam Set) → Grandahl → Twin Dragonriders → Looking Glass Knight.",
    bonfires: [
      {
        itemId: "dc3",
        name: "King's Gate",
        howToReach: "Shrine of Winter (4 Lord Souls or 1M Soul Memory).",
        asceticValue: "Ring of Blades +2 (Dual Pursuers post-Nashandra). Ring of Steel Protection +2 (Looking Glass Knight).",
      },
    ],
    bosses: [
      { itemId: "dc8", bossName: "Twin Dragonriders", tactics: "Kill archer first." },
      { itemId: "dc10", bossName: "Looking Glass Knight", tactics: "Summons phantoms from mirror." },
    ],
    gestures: [{ itemId: "dc4", gesture: "This One's Me", where: "Exhaust Chancellor Wellager on stairs." }],
    keyItems: ["Estus Shard", "Faraam Set", "Forgotten Chamber", "Grandahl", "King's Ring"],
  },
  shrine_of_amana: {
    pathOrder: "Crumbled Ruins → use bow on priestesses → Pharros (Helix Halberd) → Demon of Song.",
    bonfires: [{ itemId: "sa1", name: "Crumbled Ruins", howToReach: "Through King's Gate after Looking Glass Knight." }],
    bosses: [{ itemId: "sa6", bossName: "Demon of Song", tactics: "Attack when face exposed." }],
    keyItems: ["Sunlight Blade", "Havel's Set", "Estus Shard", "Helix Halberd (Pharros)"],
  },
  undead_crypt: {
    pathOrder: "Undead Ditch → NO torch/bells → Agdayne → illusory (Avelyn, Great Lightning Spear) → Velstadt → King's Ring.",
    bonfires: [
      {
        itemId: "uc1",
        name: "Undead Ditch",
        howToReach: "Through Demon of Song area.",
        asceticValue: "Royal Soldier's Ring +2 (Velstadt).",
      },
    ],
    bosses: [{ itemId: "uc5", bossName: "Velstadt", tactics: "Dark-resistant. Use Lightning Mace." }],
    gestures: [{ itemId: "uc3", gesture: "Have Mercy!", where: "Talk to Agdayne WITHOUT torch." }],
    keyItems: ["King's Ring", "Avelyn", "Great Lightning Spear", "Darkdrift (return to Agdayne)"],
  },
  aldias_keep: {
    pathOrder: "King's Ring on Shaded Woods gate → Foregarden → illusory (Malformed Shell) → Ogre door → Lucatiel (after 3 survivals) → Guardian Dragon.",
    bonfires: [
      {
        itemId: "ak2",
        name: "Foregarden",
        howToReach: "King's Ring on King's Gate (Shaded Woods right path).",
        asceticValue: "Unpetrify hollow by Basilisk → ascetic respawns him, drops 2 ascetics.",
      },
    ],
    bosses: [{ itemId: "ak8", bossName: "Guardian Dragon", tactics: "Fire breath. Ranged helps. Leads to Dragon Aerie." }],
    keyItems: ["Lucatiel (ONLY after 3 boss survivals)", "Malformed Shell", "Fire Seed", "Steel Set", "Navlaan"],
  },
  dragon_aerie: {
    pathOrder: "Dragon Aerie → 11 Crystal Lizards → Emerald Herald → Dragon Shrine → Pharros (Judgement) → Ancient Dragon.",
    bonfires: [
      {
        itemId: "da1",
        name: "Dragon Aerie",
        howToReach: "After Guardian Dragon in Aldia's Keep.",
      },
    ],
    bosses: [{ itemId: "da8", bossName: "Ancient Dragon", tactics: "Huge HP, one-shot fire. Optional. Drops Soul of a Giant." }],
    keyItems: ["Ashen Mist Heart", "Petrified Egg", "11 Crystal Lizards", "Judgement Set", "Estus Shard"],
  },
  memories: {
    pathOrder: "Place Unbeknownst (FoFG) → Memory of Vammar (Hurrah!) → Orro (Steel Set) → Jeigh (Giant Lord).",
    bonfires: [],
    bosses: [
      {
        itemId: "mm5",
        bossName: "Giant Lord",
        tactics: "Best soul farm. Ascetic inside memory = infinite. Dark weak.",
      },
    ],
    gestures: [{ itemId: "mm2", gesture: "Hurrah!", where: "Memory of Vammar — exhaust Captain Drummond." }],
    keyItems: ["Soul of a Giant x3", "Steel Set", "Fire Seed", "Bonfire Ascetic (Memory of Jeigh)"],
  },
  dark_chasm: {
    pathOrder: "Grandahl (Black Gulch, Shaded Woods, Drangleic Castle) → enter each chasm (1 Effigy) → light sconce → Darklurker.",
    bosses: [{ itemId: "ch5", bossName: "Darklurker", tactics: "Weak to fire. Splits in two — burst one fast." }],
    keyItems: ["Resonant Soul", "Great Resonant Soul", "Climax", "Xanthous Set"],
  },
  throne_of_want: {
    pathOrder: "Throne Watcher & Defender → Nashandra → Aldia (if dialogue exhausted).",
    bosses: [
      { itemId: "tw1", bossName: "Throne Watcher & Defender", tactics: "Kill close together or they revive." },
      { itemId: "tw3", bossName: "Nashandra", tactics: "Bring curse-curing items." },
      { itemId: "tw4", bossName: "Aldia", tactics: "Alternate ending if all dialogue exhausted." },
    ],
    keyItems: ["Benhart survival required for quest"],
  },
  dlc_sunken: {
    pathOrder: "Primal Bonfire (Black Gulch) → Shulva → Sanctum Walk → illusory (Sanctum Interior) → Elana → Sinh.",
    bonfires: [
      { itemId: "d12", name: "Sanctum Walk", howToReach: "Primal Bonfire in Black Gulch after Rotten." },
    ],
    bosses: [
      { itemId: "d16", bossName: "Elana", tactics: "Summons Velstadt phantom." },
      { itemId: "d17", bossName: "Sinh", tactics: "Destroys weapon durability. Bring backups." },
      { itemId: "d18", bossName: "Graverobber, Varg, Cerah", tactics: "3-NPC gank. Extremely hard." },
    ],
    keyItems: ["Eternal Sanctum Key", "Dragon Stone", "Focus Souls", "Promised Walk of Peace", "Lightning Clutch Ring"],
  },
  dlc_iron: {
    pathOrder: "Primal Bonfire (Iron Keep) → Brume Tower → collect 11 Smelter Wedges → Fume Knight → Sir Alonne → Blue Smelter.",
    bonfires: [{ itemId: "d22", name: "Throne Floor", howToReach: "Primal Bonfire in Iron Keep after Old Iron King." }],
    bosses: [
      { itemId: "d25", bossName: "Fume Knight", tactics: "One of hardest. Destroy nearby Ashen Idols first." },
      { itemId: "d26", bossName: "Sir Alonne", tactics: "Very fast samurai. Memory of Old Iron King." },
      { itemId: "d27", bossName: "Blue Smelter Demon", tactics: "Magic damage version. Iron Passage." },
    ],
    keyItems: ["Smelter Wedges", "Outcry", "Dance of Fire", "Soul Vessel x2", "Hollow Skin"],
  },
  dlc_ivory: {
    pathOrder: "Shrine of Winter (Frozen Flower) → Outer Wall → Eye of Priestess → 4 Loyce Knights → Aava → Burnt Ivory King.",
    bonfires: [
      {
        itemId: "d32",
        name: "Outer Wall",
        howToReach: "Shrine of Winter key from Frozen Flower (Drangleic Castle).",
        asceticValue: "Respawns Aava. Burnt Ivory King at Grand Cathedral.",
      },
    ],
    bosses: [
      { itemId: "d39", bossName: "Aava", tactics: "Get Eye of Priestess first or she's invisible." },
      { itemId: "d310", bossName: "Burnt Ivory King", tactics: "Loyce Knights close portals. Epic fight." },
      { itemId: "d312", bossName: "Lud & Zallen", tactics: "Frigid Outskirts. The run IS the boss." },
    ],
    keyItems: ["Eye of Priestess", "4 Loyce Knights", "Durgo's Hat (Pharros)", "Soul Flash", "Blizzard"],
  },
};

/** Get notes for an area */
export function getAreaNotes(areaId: AreaId): AreaNotesDetail | undefined {
  return AREA_NOTES_DETAIL[areaId];
}
