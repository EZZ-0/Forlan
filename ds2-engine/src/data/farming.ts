// Farming data — real soul farm runs (repeatable), titanite, gear
// Boss souls are ONE-TIME, not farming. Only repeatable routes listed.

export interface SoulFarmRun {
  name: string;
  bonfire: string;
  areaId: string;
  soulsPerRun: number;
  /** Souls with full gear (1.9×: CSSR+2 + Tseldora + Symbol of Avarice) */
  soulsWithFullGear?: number;
  /** Estimated seconds per run */
  timeEstimateSeconds?: number;
  /** Souls per minute with full gear */
  spmOptimal?: number;
  route: string;
  unlock: string;
  tags: ("coc" | "ascetic" | "infinite")[];
  best?: boolean;
  detail?: string;
  /** Directions from bonfire (or closest landmark) to the farm spot */
  howToGetThere?: string;
}

/** Soul multipliers by gear tier. Additive: Souls = base × (1 + Σ bonus) */
export const SOUL_MULTIPLIERS = {
  early: 1.2,   // CSSR+1 only
  mid: 1.4,     // CSSR+2 + Tseldora
  full: 1.9,    // CSSR+2 + Tseldora + Symbol of Avarice
  max: 1.925,   // + Warlock Mask
} as const;

/** Giant Lord base souls by bonfire intensity (NG = 1, NG+7 = 8) */
export const GIANT_LORD_SOULS_BY_INTENSITY: Record<number, number> = {
  1: 75000,
  2: 150000,
  3: 187500,
  4: 206250,
  5: 225000,
  6: 243750,
  7: 262500,
  8: 300000,
};

/** Real repeatable soul farm runs — souls per run, efficient route, clear unlock */
export const SOUL_FARM_RUNS: SoulFarmRun[] = [
  {
    name: "Cardinal Tower hollows",
    bonfire: "Cardinal Tower",
    areaId: "forest_of_fallen_giants",
    soulsPerRun: 2000,
    soulsWithFullGear: 3800,
    timeEstimateSeconds: 45,
    spmOptimal: 5067,
    route: "Clear hollow soldiers in room + outside, rest. ~5–6 enemies.",
    unlock: "FoFG complete",
    tags: ["coc"],
    detail: "Despawns after 12. Use CoC for infinite.",
    howToGetThere: "From Cardinal Tower bonfire, exit into the room with hollow soldiers; clear them and the ones outside the doorway.",
  },
  {
    name: "Heide's Old Knights",
    bonfire: "Tower of Flame",
    areaId: "heides_tower",
    soulsPerRun: 4500,
    soulsWithFullGear: 8550,
    timeEstimateSeconds: 60,
    spmOptimal: 8550,
    route: "Kill 3 Old Knights (1.5k each). Quick loop.",
    unlock: "Heide's Tower",
    tags: ["coc"],
  },
  {
    name: "Exile Holding cells (bombers)",
    bonfire: "Exile Holding Cells",
    areaId: "lost_bastille",
    soulsPerRun: 3500,
    soulsWithFullGear: 6650,
    timeEstimateSeconds: 50,
    spmOptimal: 7980,
    route: "Kill ~5 explosive hollows in cells. ~3–4k souls, fast run.",
    unlock: "Lost Bastille (ship from No-Man's Wharf)",
    tags: ["coc"],
    detail: "Firebomb hollows. CoC for infinite.",
    howToGetThere: "From Exile Holding Cells bonfire (Servants' Quarters), descend to cells — explosive hollows in the cages.",
  },
  {
    name: "Huntsman's Bridge Approach",
    bonfire: "Undead Lockaway",
    areaId: "huntsmans_copse",
    soulsPerRun: 4000,
    soulsWithFullGear: 7600,
    timeEstimateSeconds: 60,
    spmOptimal: 7600,
    route: "Bridge hollows + necromancers. ~5 bombers/hollows, 3–4k/run.",
    unlock: "Huntsman's Copse (Licia 2k)",
    tags: ["coc"],
    howToGetThere: "From Undead Lockaway bonfire, cross bridge — hollows and necromancers on bridge approach.",
  },
  {
    name: "Iron Keep Alonne Knights",
    bonfire: "Threshold Bridge",
    areaId: "iron_keep",
    soulsPerRun: 6000,
    soulsWithFullGear: 11400,
    timeEstimateSeconds: 90,
    spmOptimal: 7600,
    route: "First bridge knights. ~5–6k/run, best mid-game farm.",
    unlock: "Iron Keep",
    tags: ["coc"],
    best: true,
    howToGetThere: "From Threshold Bridge bonfire, cross first bridge — 5–6 Alonne Knights at the far end.",
  },
  {
    name: "Black Gulch giants",
    bonfire: "Black Gulch Mouth",
    areaId: "black_gulch",
    soulsPerRun: 10000,
    soulsWithFullGear: 19000,
    timeEstimateSeconds: 60,
    spmOptimal: 19000,
    route: "2 Dark Giants before Rotten fog. ~5k each. Very fast.",
    unlock: "Black Gulch",
    tags: ["coc"],
    best: true,
    detail: "Break poison statues. Giants respawn. Quick run.",
    howToGetThere: "From Black Gulch Mouth, take left path; break poison statues along route. 2 Dark Giants before Rotten fog gate.",
  },
  {
    name: "Brightstone spider hollows",
    bonfire: "Royal Army Campsite",
    areaId: "brightstone_cove",
    soulsPerRun: 5000,
    soulsWithFullGear: 9500,
    timeEstimateSeconds: 75,
    spmOptimal: 7600,
    route: "Spider hollows in first area. Pack of 5–6.",
    unlock: "Brightstone Cove",
    tags: ["coc"],
    howToGetThere: "From Royal Army Campsite bonfire, spider hollows in the first open area — pack of 5–6.",
  },
  {
    name: "Giant Lord (ascetic loop)",
    bonfire: "Place Unbeknownst",
    areaId: "memories",
    soulsPerRun: 75000,
    soulsWithFullGear: 142500,
    timeEstimateSeconds: 180,
    spmOptimal: 47500,
    route: "Ascetic bonfire → run to memory → kill Giant Lord. Ascetic inside memory.",
    unlock: "Ashen Mist Heart (Dragon Shrine)",
    tags: ["ascetic", "infinite"],
    best: true,
    detail: "Self-sustaining. Intensity 1 base 75k; Int 2 = 150k, Int 8 = 300k. With 1.9× gear: 142.5k–570k/run.",
    howToGetThere: "From Place Unbeknownst bonfire (FoFG), enter the giant tree memory. Ascetic on ledge left after fog. Run to throne, kill Giant Lord.",
  },
];

/** Titanite sources — where to get upgrade materials */
export interface TitaniteSource {
  name: string;
  material: string;
  loc: string;
  method: string;
  unlock: string;
  areaId?: string;
  /** For farm methods: gear for max item discovery */
  discoveryRecommendation?: string;
  /** Directions from bonfire or landmark to the spot */
  howToGetThere?: string;
}

export const TITANITE_SOURCES: TitaniteSource[] = [
  { name: "Lenigrast", material: "Shards (unlimited)", loc: "Majula", method: "Buy", unlock: "FoFG + Lenigrast key", areaId: "majula", howToGetThere: "From Majula bonfire, house left of the path to Heide's — Lenigrast inside (need key from FoFG)." },
  { name: "McDuff", material: "Large Shards (unlimited)", loc: "Lost Bastille", method: "Buy", unlock: "Lost Bastille", areaId: "lost_bastille", howToGetThere: "From Servants' Quarters or Tower Apart: blow explosive wall near Ruin Sentinels. McDuff in room past wall." },
  { name: "Chloanne", material: "Shards, Large, Chunks", loc: "Harvest Valley → Majula", method: "Buy", unlock: "Harvest Valley (stock grows with bosses)", areaId: "harvest_valley", howToGetThere: "Harvest Valley: cave after Covetous. Moves to Majula near monument after Earthen Peak." },
  { name: "Chloanne", material: "Chunks (unlimited)", loc: "Majula", method: "After Nashandra", unlock: "Nashandra defeated", areaId: "majula", howToGetThere: "From Majula bonfire, near the monument toward the sea." },
  { name: "McDuff", material: "Titanite Slab", loc: "Lost Bastille", method: "Spend 14k souls", unlock: "Dull Ember given", areaId: "lost_bastille", howToGetThere: "Same as McDuff Large Shards. Spend 14k souls total at his shop for Slab." },
  { name: "Crystal Lizards", material: "Chunks, Twinkling, PDB", loc: "Black Gulch, Dragon Aerie", method: "Kill before escape", unlock: "Area access", areaId: "black_gulch", howToGetThere: "Black Gulch: 2 lizards in cave before Rotten. Dragon Aerie: 11 lizards near each drake — bow/sorcery to one-shot before escape." },
  { name: "Heide Knights", material: "Twinkling", loc: "Heide's Tower", method: "Farm (CoC)", unlock: "Heide's Tower", areaId: "heides_tower", discoveryRecommendation: "Max stack: CGSR+2, Watchdragon Parma, Jester's Cap, Prisoner's Tatters, Rusted Coin", howToGetThere: "From Tower of Flame, Heide Knights scattered along path (some sitting). CoC for infinite spawn. Multiple Knight types in SotFS." },
];

export interface SoulGear {
  name: string;
  bonus: string;
  loc: string;
  unlock: string;
}

export const SOUL_GEAR: SoulGear[] = [
  { name: "Covetous Silver Serpent Ring +1", bonus: "+20% souls", loc: "Spend 10k at Melentia", unlock: "FoFG" },
  { name: "Covetous Silver Serpent Ring +2", bonus: "+30% souls", loc: "Mytha (Earthen Peak) NG+ or Ascetic", unlock: "Earthen Peak" },
  { name: "Tseldora Set", bonus: "+2.5% each (4 pieces = 10%)", loc: "Brightstone Cove", unlock: "Brightstone Cove" },
  { name: "Symbol of Avarice", bonus: "+50% souls", loc: "Mimic drop", unlock: "Any mimic" },
  { name: "Warlock Mask", bonus: "+2.5% souls", loc: "Straid trade / drop", unlock: "Straid unpetrified" },
];

export interface ItemDiscGear {
  name: string;
  bonus: string;
  loc: string;
  unlock: string;
}

export const ITEM_DISC_GEAR: ItemDiscGear[] = [
  { name: "Covetous Gold Serpent Ring +1", bonus: "+75 discovery", loc: "Iron Keep chest", unlock: "Iron Keep" },
  { name: "Covetous Gold Serpent Ring +2", bonus: "+100 discovery", loc: "Belfry Gargoyles roof", unlock: "Belfry Luna" },
  { name: "Watchdragon Parma", bonus: "+50 discovery", loc: "Heide's Tower", unlock: "Heide's Tower" },
  { name: "Jester's Cap", bonus: "+50 discovery", loc: "Magerold (Iron Keep)", unlock: "Iron Keep" },
  { name: "Prisoner's Tatters", bonus: "+50 discovery", loc: "Huntsman's Copse", unlock: "Huntsman's Copse" },
];

export const FARM_MECHANICS = {
  despawn: "Enemies vanish after 12 kills (DS2 unique). Use Company of Champions or Bonfire Ascetic to farm infinitely.",
  coc: "Company of Champions (Victor's Stone, Majula): Prevents despawn. Enemies ~20% tougher. Leave covenant when done.",
  ascetic: "Bonfire Ascetic: Resets area to NG+ intensity. Re-adds 12 kills. Giant Lord memory has ascetic inside = self-sustaining loop.",
  soulStack: "Soul bonuses stack. CSSR+2 + Tseldora + Symbol of Avarice ≈ 2× souls.",
  itemDisc: "Discovery caps at 999. Gold Serpent +2 + Watchdragon + Jester's + Tatters = +275.",
};

