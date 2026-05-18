/**
 * Build items — where to find + farming options for Dark Melee Hexer.
 * Every item has explicit sources; farmable items list farm routes.
 */

export interface BuildItemSource {
  type: "chest" | "buy" | "drop" | "trade" | "corpse" | "vendor" | "boss";
  location: string;
  detail: string;
  unlock?: string;
}

export interface BuildItemFarm {
  enemy: string;
  area: string;
  method?: string;
  unlock?: string;
}

export interface BuildItem {
  name: string;
  type: "weapon" | "ring" | "spell" | "catalyst";
  role: string;
  phase: number;
  whereToFind: BuildItemSource[];
  farmOptions?: BuildItemFarm[];
  notes?: string;
  optional?: boolean;
  progressId?: string; // when optional, show full data only when checked[progressId]
}

export const BUILD_ITEMS: BuildItem[] = [
  // ———— WEAPONS ————
  {
    name: "Fire Longsword",
    type: "weapon",
    role: "Early + fire backup",
    phase: 1,
    whereToFind: [
      { type: "chest", location: "Forest of Fallen Giants", detail: "Chest past salamander pit (already Fire-infused)", unlock: "FoFG" },
    ],
    farmOptions: [],
    notes: "Primary until DEX 20 / Dark Uchi. Upgrade at Lenigrast.",
  },
  {
    name: "Lightning Mace",
    type: "weapon",
    role: "Dark-resistant swap",
    phase: 1,
    whereToFind: [
      { type: "buy", location: "Lenigrast (Majula)", detail: "800 souls", unlock: "FoFG + Lenigrast key" },
    ],
    farmOptions: [],
    notes: "Infuse Lightning at McDuff after Dull Ember.",
  },
  {
    name: "Uchigatana",
    type: "weapon",
    role: "Primary melee (infuse Dark)",
    phase: 4,
    whereToFind: [
      { type: "buy", location: "McDuff (Lost Bastille)", detail: "5,000 souls", unlock: "Lost Bastille" },
    ],
    farmOptions: [
      { enemy: "Alonne Captain", area: "Iron Keep", method: "Drop rate ~2%. CoC for infinite spawn.", unlock: "Iron Keep" },
      { enemy: "Dual Sword Shadow", area: "Shaded Woods (Foggy)", method: "Rare drop. CoC if needed.", unlock: "Shaded Woods" },
    ],
    notes: "McDuff cheaper if you reach Lost Bastille first. Farm if poor.",
  },
  {
    name: "Sunset Staff",
    type: "catalyst",
    role: "Primary dark catalyst",
    phase: 3,
    whereToFind: [
      { type: "vendor", location: "Felkin (Huntsman's Copse)", detail: "FREE — 20 INT / 20 FTH (BASE stats only; rings/gear don't count!)", unlock: "Huntsman's Copse" },
    ],
    farmOptions: [],
    notes: "20/20 BASE stats only — equipment (Ring of Knowledge, Ring of Faith, etc.) does NOT count. Infuse Dark at McDuff.",
  },
  {
    name: "Staff of Wisdom",
    type: "catalyst",
    role: "Pure sorcery catalyst",
    phase: 6,
    whereToFind: [
      { type: "trade", location: "Ornifex", detail: "Paledrake Soul (Freja NG+ or Ascetic)", unlock: "Dragon Shrine" },
      { type: "drop", location: "Crystal Lizard", detail: "Dragon Shrine — rare", unlock: "Dragon Shrine" },
    ],
    farmOptions: [
      { enemy: "Freja (NG+)", area: "Brightstone Cove", method: "Ascetic Duke's Dear Freja for Paledrake Soul", unlock: "Brightstone Cove" },
    ],
    notes: "50 INT (spiceable to ~40). Twinkling ×15 to +5.",
  },
  {
    name: "Pyromancy Flame",
    type: "catalyst",
    role: "Fire spells",
    phase: 3,
    whereToFind: [
      { type: "vendor", location: "Rosabeth (Shaded Woods)", detail: "FREE after unpetrify", unlock: "Fragrant Branch" },
    ],
    farmOptions: [],
    notes: "Upgrade with Fire Seeds. No infusion.",
  },
  // ———— RINGS ————
  {
    name: "Ring of Blades",
    type: "ring",
    role: "Flat physical AR",
    phase: 1,
    whereToFind: [
      { type: "boss", location: "Pursuer", detail: "Guaranteed drop", unlock: "FoFG (ballista or solo)" },
    ],
    farmOptions: [],
  },
  {
    name: "Chloranthy Ring",
    type: "ring",
    role: "Stamina regen",
    phase: 1,
    whereToFind: [
      { type: "corpse", location: "Forest of Fallen Giants", detail: "Pharros contraption (ballista room) — need 1 lockstone", unlock: "FoFG" },
    ],
    farmOptions: [],
  },
  {
    name: "Southern Ritual Band",
    type: "ring",
    role: "+3 spell slots",
    phase: 5,
    whereToFind: [
      { type: "chest", location: "Brightstone Cove Tseldora", detail: "In upper building, past spiders", unlock: "Brightstone Cove" },
    ],
    farmOptions: [],
  },
  {
    name: "Clear Bluestone Ring +2",
    type: "ring",
    role: "Cast speed",
    phase: 5,
    whereToFind: [
      { type: "boss", location: "Skeleton Lords", detail: "NG+ or Bonfire Ascetic", unlock: "Huntsman's Copse" },
    ],
    farmOptions: [
      { enemy: "Skeleton Lords", area: "Huntsman's Copse", method: "Ascetic Undead Lockaway → rekill bosses", unlock: "Huntsman's Copse" },
    ],
  },
  {
    name: "Third Dragon Ring",
    type: "ring",
    role: "HP/Stamina/Equip Load",
    phase: 6,
    whereToFind: [
      { type: "chest", location: "Dragon Shrine", detail: "Before Ancient Dragon fog", unlock: "Dragon Shrine" },
    ],
    farmOptions: [],
  },
  {
    name: "Dark Clutch Ring",
    type: "ring",
    role: "Dark damage boost",
    phase: 6,
    whereToFind: [
      { type: "corpse", location: "Sunken King DLC", detail: "Before Elana fog" },
      { type: "corpse", location: "Iron King DLC", detail: "Brume Tower" },
      { type: "corpse", location: "Ivory King DLC", detail: "Frozen Eleum Loyce" },
    ],
    farmOptions: [],
  },
  // ———— SPELLS ————
  {
    name: "Dark Orb",
    type: "spell",
    role: "Primary ranged hex",
    phase: 2,
    whereToFind: [
      { type: "vendor", location: "Felkin (Huntsman's Copse)", detail: "8 INT + 8 FTH to unlock shop (base stats; gear doesn't count) — 600 souls", unlock: "Huntsman's Copse" },
    ],
    farmOptions: [],
  },
  {
    name: "Dark Weapon",
    type: "spell",
    role: "Weapon buff",
    phase: 3,
    whereToFind: [
      { type: "vendor", location: "Felkin (Huntsman's Copse)", detail: "20 INT / 20 FTH BASE stats — 2,700 souls (gear doesn't count)", unlock: "20/20" },
    ],
    farmOptions: [],
  },
  {
    name: "Great Heavy Soul Arrow",
    type: "spell",
    role: "Backup ranged",
    phase: 2,
    whereToFind: [
      { type: "vendor", location: "Carhillion (No-Man's Wharf)", detail: "10 INT", unlock: "No-Man's Wharf" },
      { type: "vendor", location: "Straid (Lost Bastille)", detail: "After unpetrify", unlock: "Bastille Key" },
    ],
    farmOptions: [],
  },
  {
    name: "Flame Swathe",
    type: "spell",
    role: "Massive AoE nuke",
    phase: 3,
    whereToFind: [
      { type: "vendor", location: "Rosabeth (Shaded Woods)", detail: "After unpetrify", unlock: "Fragrant Branch" },
      { type: "chest", location: "Earthen Peak", detail: "Near Covetous fog", unlock: "Earthen Peak" },
    ],
    farmOptions: [],
  },
  {
    name: "Resonant Soul",
    type: "spell",
    role: "High damage hex (costs souls)",
    phase: 5,
    whereToFind: [
      { type: "vendor", location: "Grandahl (Dark Chasm)", detail: "Pilgrims of Dark Rank 1", unlock: "Three Dark Chasm entries" },
    ],
    farmOptions: [],
  },
  {
    name: "Great Fireball",
    type: "spell",
    role: "Fire AoE ranged",
    phase: 4,
    whereToFind: [
      { type: "vendor", location: "Rosabeth", detail: "After unpetrify" },
      { type: "chest", location: "Iron Keep", detail: "In chest near Smelter", unlock: "Iron Keep" },
    ],
    farmOptions: [],
  },
  {
    name: "Sunlight Blade",
    type: "spell",
    role: "Lightning weapon buff",
    phase: 5,
    whereToFind: [
      { type: "chest", location: "Shrine of Amana", detail: "Hidden path past second bonfire", unlock: "Shrine of Amana" },
    ],
    farmOptions: [],
  },
];

/** Materials that need farming for the build */
export const BUILD_MATERIAL_FARMS: { item: string; purpose: string; sources: BuildItemSource[]; farmOptions: BuildItemFarm[] }[] = [
  {
    item: "Fire Seeds",
    purpose: "Pyromancy Flame +10",
    sources: [
      { type: "vendor", location: "Straid, Chloanne", detail: "Limited" },
      { type: "chest", location: "Various", detail: "FoFG, Iron Keep, etc." },
    ],
    farmOptions: [
      { enemy: "Fire Salamander", area: "FoFG (salamander pit)", method: "Rare. CoC if farming.", unlock: "FoFG" },
      { enemy: "Alonne Knight", area: "Iron Keep", method: "Decent rate. CoC.", unlock: "Iron Keep" },
      { enemy: "Desert Sorceress", area: "Earthen Peak", method: "Good rate. CoC.", unlock: "Earthen Peak" },
    ],
  },
  {
    item: "Titanite (Shards, Large, Chunks, Slab)",
    purpose: "Weapon upgrades",
    sources: [
      { type: "vendor", location: "Lenigrast, McDuff, Chloanne", detail: "See Farming tab" },
    ],
    farmOptions: [
      { enemy: "Heide Knight", area: "Heide's Tower", method: "Twinkling Titanite. CoC.", unlock: "Heide's" },
      { enemy: "Crystal Lizard", area: "Black Gulch, Dragon Aerie", method: "Chunks, Twinkling. Kill before escape.", unlock: "Area access" },
    ],
  },
  {
    item: "Darknight Stone",
    purpose: "Dark infusion (Uchi, Sunset Staff)",
    sources: [
      { type: "vendor", location: "Chloanne", detail: "After King's Ring", unlock: "King's Ring" },
      { type: "chest", location: "Undead Crypt", detail: "Boss corridor" },
    ],
    farmOptions: [
      { enemy: "Leydia Pyromancer", area: "Undead Crypt", method: "Keep tombstones, ring bell — infinite", unlock: "Undead Crypt" },
      { enemy: "Basilisk", area: "Brightstone Cove, Shaded Woods", method: "Rare", unlock: "Area" },
    ],
  },
  {
    item: "Bolt Stone",
    purpose: "Lightning Mace",
    sources: [
      { type: "vendor", location: "Targray (Blue Sentinels), Chloanne", detail: "King's Ring for Chloanne" },
    ],
    farmOptions: [
      { enemy: "Basilisk", area: "Brightstone Cove, Shaded Woods", method: "Very rare", unlock: "Area" },
    ],
  },
];
