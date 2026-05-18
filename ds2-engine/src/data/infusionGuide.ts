/**
 * Infusion guide — stones, unlock, farming, per-weapon options for Dark Melee Hexer.
 * Detailed: all applicable stones, every purchase/farm option.
 */

export interface InfusionStoneSource {
  type: "purchase" | "chest" | "corpse" | "trade" | "drop";
  location: string;
  detail: string;
  unlock?: string; // e.g. "King's Ring", "Undead Crypt"
  price?: number;
  /** Bonfire name for in-world sources — e.g. "Undead Ditch" */
  bonfire?: string;
  /** Detailed path from bonfire — e.g. "Straight through door to boss corridor, chest on right" */
  path?: string;
}

export interface InfusionStone {
  name: string;
  infusion: string; // Dark, Lightning, Magic, Fire, etc.
  scaling: string; // e.g. "INT+FTH", "FTH"
  sources: InfusionStoneSource[];
  farmEnemies: { enemy: string; area: string; method?: string }[];
}

export const INFUSION_STONES: InfusionStone[] = [
  {
    name: "Darknight Stone",
    infusion: "Dark",
    scaling: "INT + FTH",
    sources: [
      { type: "purchase", location: "Chloanne", detail: "3 stones", unlock: "King's Ring", price: 7500 },
      { type: "chest", location: "Undead Crypt", detail: "Straight through door to boss corridor", bonfire: "Undead Ditch", path: "Straight through main door, down corridor toward Velstadt — chest on right before boss fog" },
      { type: "corpse", location: "Dragon Aerie", detail: "Near one of the drakes", bonfire: "Dragon Aerie", path: "Cross first bridge, corpse near first drake on right side" },
      { type: "corpse", location: "Shulva (DLC)", detail: "2 on body in moving platforms", bonfire: "Sanctum Walk", path: "Moving platforms area — 2 on corpse in alcove" },
      { type: "trade", location: "Dyna & Tillo", detail: "Smooth & Silky Stone (random)" },
      { type: "drop", location: "Crystal Lizard", detail: "Grave of Saints bridge, before Gutter", bonfire: "Grave of Saints", path: "Rope bridge to treasure chest — lizard near bridge, before Gutter entrance" },
    ],
    farmEnemies: [
      { enemy: "Leydia Pyromancer", area: "Undead Crypt", method: "Keep tombstones, ring bell — infinite respawn" },
      { enemy: "Basilisk", area: "Brightstone Cove, Shaded Woods, Things Betwixt, Aldia's Keep" },
    ],
  },
  {
    name: "Bolt Stone",
    infusion: "Lightning",
    scaling: "FTH",
    sources: [
      { type: "purchase", location: "Targray (Blue Sentinels)", detail: "Unlimited", price: 7000 },
      { type: "purchase", location: "Chloanne", detail: "After King's Ring", unlock: "King's Ring" },
      { type: "chest", location: "Dragon Sanctum (DLC)", detail: "3 with 3 Bleedstones", bonfire: "Sanctum Interior", path: "Past Drakeblood Knights — chest in cave with 3 Bolt + 3 Bleed" },
      { type: "chest", location: "Frozen Eleum Loyce (DLC)", detail: "3 in Witch Trees area", bonfire: "Outer Wall", path: "Witch Trees area — 3 in chest" },
      { type: "corpse", location: "Dragon Aerie", detail: "Near first dragon — ascetic farmable", bonfire: "Dragon Aerie", path: "First drake encounter — corpse on ledge, ascetic farmable" },
      { type: "trade", location: "Dyna & Tillo", detail: "Smooth & Silky (random)" },
      { type: "drop", location: "Crystal Lizard", detail: "Shaded Ruins near Manscorpion Tark", bonfire: "Ruined Fork Road", path: "Shaded Ruins (straight path) — lizard near Manscorpion Tark" },
    ],
    farmEnemies: [
      { enemy: "Basilisk", area: "Brightstone Cove, Shaded Woods", method: "Very rare" },
    ],
  },
  {
    name: "Firedrake Stone",
    infusion: "Fire",
    scaling: "INT + FTH (pyro)",
    sources: [
      { type: "purchase", location: "McDuff", detail: "Limited" },
      { type: "purchase", location: "Chloanne", detail: "3 stones", unlock: "Undead Crypt complete", price: 7500 },
      { type: "chest", location: "FoFG salamander pit", detail: "Silvercat Ring or Fall Control to drop", bonfire: "Cardinal Tower", path: "Silvercat drop into pit — chest in salamander cave" },
      { type: "chest", location: "FoFG", detail: "Iron Key door near Last Giant", bonfire: "Cardinal Tower", path: "Iron Key from Iron Keep — door near Last Giant elevator, inside Soldier's Rest" },
      { type: "corpse", location: "Dragon Aerie", detail: "Third dragon area", bonfire: "Dragon Aerie", path: "Third drake encounter — corpse on ledge" },
      { type: "trade", location: "Dyna & Tillo", detail: "Smooth & Silky (random)" },
    ],
    farmEnemies: [
      { enemy: "Salamander", area: "FoFG", method: "Rare" },
      { enemy: "Fire Drake", area: "Dragon Aerie" },
      { enemy: "Alonne Knight", area: "Iron Keep", method: "Good drop rate, use CoC" },
      { enemy: "Turtle Knight", area: "Iron Keep" },
      { enemy: "Sand Basilisk", area: "Brightstone Cove" },
      { enemy: "Iron Warrior", area: "Brume Tower (DLC)" },
      { enemy: "Basilisk", area: "Things Betwixt" },
    ],
  },
  {
    name: "Faintstone",
    infusion: "Magic",
    scaling: "INT",
    sources: [
      { type: "purchase", location: "Chloanne", detail: "3 stones", unlock: "King's Ring", price: 7500 },
      { type: "chest", location: "Doors of Pharros", detail: "First Pharros contraption, path below ladder", bonfire: "Doors of Pharros", path: "1st floor — first Pharros lock between two Gyrm, opens door below, loot in path with Mongrel Rats" },
      { type: "corpse", location: "Dragon Shrine", detail: "Near lightning orb priest", bonfire: "Dragon Shrine", path: "Before Ancient Dragon fog — corpse near lightning orb priest" },
      { type: "trade", location: "Dyna & Tillo", detail: "Smooth & Silky (random)" },
    ],
    farmEnemies: [
      { enemy: "Leydia Pyromancer", area: "Undead Crypt", method: "Ring bell before boss fog — infinite" },
      { enemy: "Leydia Witch", area: "Undead Crypt" },
      { enemy: "Dragon Knight", area: "Dragon Shrine" },
      { enemy: "Basilisk", area: "Shaded Woods", method: "After unpetrify Rosabeth — bonfire same room" },
    ],
  },
  {
    name: "Magic Stone",
    infusion: "Enchanted",
    scaling: "INT (replaces all other scaling)",
    sources: [
      { type: "purchase", location: "Chloanne", detail: "3 stones", unlock: "King's Ring" },
      { type: "chest", location: "Undead Crypt", detail: "Left after shortcut", bonfire: "Undead Ditch", path: "Left path after shortcut door (Leydia Pyro room) — chest in alcove" },
      { type: "corpse", location: "Brume Tower (DLC)", detail: "2 past Foyer bonfire", bonfire: "Foyer", path: "2 past Foyer bonfire — corpse in corridor" },
      { type: "corpse", location: "Frozen Eleum Loyce (DLC)", detail: "2 near Lower Garrison", bonfire: "Lower Garrison", path: "2 on corpse near Lower Garrison bonfire" },
      { type: "trade", location: "Dyna & Tillo", detail: "Smooth & Silky (random)" },
    ],
    farmEnemies: [
      { enemy: "Leydia Witch", area: "Undead Crypt entrance" },
      { enemy: "Desert Sorceress", area: "Earthen Peak", method: "CoC for infinite" },
      { enemy: "Gyrm Warrior", area: "Doors of Pharros" },
    ],
  },
  {
    name: "Poison Stone",
    infusion: "Poison",
    scaling: "—",
    sources: [
      { type: "purchase", location: "Chloanne", detail: "After King's Ring" },
      { type: "trade", location: "Dyna & Tillo", detail: "Smooth & Silky (random)" },
    ],
    farmEnemies: [
      { enemy: "Poison Hollow", area: "Harvest Valley" },
      { enemy: "Manscorpion", area: "Shaded Woods" },
    ],
  },
  {
    name: "Bleed Stone",
    infusion: "Bleed",
    scaling: "—",
    sources: [
      { type: "chest", location: "Dragon Sanctum (DLC)", detail: "3 with Boltstones", bonfire: "Sanctum Interior", path: "Same chest as Boltstones — 3 Bleed + 3 Bolt" },
      { type: "trade", location: "Dyna & Tillo", detail: "Smooth & Silky (random)" },
    ],
    farmEnemies: [
      { enemy: "Hollow", area: "Various" },
    ],
  },
  {
    name: "Raw Stone",
    infusion: "Raw",
    scaling: "— (flat AR boost)",
    sources: [
      { type: "purchase", location: "McDuff, Chloanne", detail: "Limited" },
      { type: "trade", location: "Dyna & Tillo", detail: "Smooth & Silky (random)" },
    ],
    farmEnemies: [],
  },
  {
    name: "Palestone",
    infusion: "—",
    scaling: "—",
    sources: [
      { type: "purchase", location: "McDuff", detail: "Removes infusion, returns to normal" },
    ],
    farmEnemies: [],
  },
];

export interface InfusionStep {
  step: number;
  action: string;
  location: string;
  detail?: string;
}

export const INFUSION_UNLOCK_STEPS: InfusionStep[] = [
  { step: 1, action: "Get Dull Ember", location: "Lost Bastille — Tower Apart chests (from Pursuer bird nest)", detail: "Or Soldiers' Rest if coming from ship side" },
  { step: 2, action: "Break wall to McDuff", location: "Explosive barrels near McDuff's Workshop", detail: "Barrel chain opens path" },
  { step: 3, action: "Give Dull Ember to McDuff", location: "McDuff sits in workshop room", detail: "He unlocks infusion menu" },
  { step: 4, action: "Spend 14,000 souls at McDuff", location: "Lost Bastille", detail: "Unlocks Titanite Slab purchase" },
];

/** Build weapons + recommended infusion */
export const BUILD_INFUSIONS = [
  { weapon: "Lightning Mace", stone: "Bolt Stone", phase: 1, smith: "McDuff", note: "Swap vs dark-resistant bosses", alt: "Raw if no Bolt early" },
  { weapon: "Fire Longsword", stone: "—", phase: 1, smith: "—", note: "Already Fire from chest", alt: null },
  { weapon: "Sunset Staff", stone: "Darknight Stone", phase: 3, smith: "McDuff", note: "Primary hex catalyst", alt: null },
  { weapon: "Dark Uchigatana", stone: "Darknight Stone", phase: 4, smith: "McDuff", note: "Core melee + Dark Weapon buff", alt: null },
  { weapon: "Staff of Wisdom", stone: "Faintstone", phase: 6, smith: "McDuff", note: "Magic for sorcery", alt: "Magic Stone (Enchanted) if high INT" },
  { weapon: "Pyromancy Flame", stone: "—", phase: 3, smith: "—", note: "No infusion", alt: null },
];

/** Dyna & Tillo — trade Smooth & Silky for random stones */
export const DYNA_TILLO_TRADE = {
  location: "Things Betwixt — drop stones in nest",
  stones: "Bolt, Darknight, Firedrake, Faintstone, Magic, Poison, Bleed, Raw",
  tip: "Petrified Something can give rare items. Small/Large/Smooth all work.",
};

/** Remove infusion */
export const PALESTONE_NOTE = "Palestone at McDuff removes infusion, returns weapon to normal path.";
