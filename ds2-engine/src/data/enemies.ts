/**
 * DS2 SotFS Enemy Weaknesses, Counters & Buffs
 * Source: Fextralife Wiki, community cheat sheets.
 * Focus on bosses; expanded coverage for notable enemies.
 */

export type EnemyType = "boss" | "miniboss" | "elite" | "common";

export interface EnemyEntry {
  id: string;
  name: string;
  area: string;
  type: EnemyType;
  weaknesses: string[];
  resistances: string[];
  counters: string[];
  buffs?: string[];
  note?: string;
  optional?: boolean;
}

// --- BUFFS & RESINS (damage type → consumables) ---
export const ELEMENTAL_BUFFS: Record<string, string[]> = {
  Fire: ["Charcoal Pine Resin", "Flame Weapon (pyro)", "Fire Weapon (pyro)"],
  Lightning: ["Gold Pine Resin", "Sunlight Blade (miracle)", "Lightning Weapon (miracle)"],
  Magic: ["Magic Weapon (sorcery)", "Crystal Magic Weapon (sorcery)", "Great Magic Weapon (sorcery)"],
  Dark: ["Dark Weapon (hex)", "Resonant Weapon (hex)"],
  Poison: ["Poison Mist (pyro)", "Toxic Mist (pyro)", "Dark Fog (hex)", "Poison Throwing Knives"],
  Bleed: ["Bleed-infused weapons", "Manslayer", "Ashen Warrior Sword", "Notched Whip"],
};

// --- BOSSES ---
export const ENEMY_WEAKNESSES: EnemyEntry[] = [
  // Base game bosses
  { id: "last_giant", name: "The Last Giant", area: "Forest of Fallen Giants", type: "boss", weaknesses: ["Fire", "Lightning"], resistances: [], counters: ["Attack detached arm when low HP"], buffs: ["Gold Pine Resin", "Charcoal Pine Resin"], optional: false },
  { id: "pursuer", name: "The Pursuer", area: "Forest of Fallen Giants / Drangleic Castle", type: "boss", weaknesses: ["Lightning", "Strike", "Poison"], resistances: ["Dark"], counters: ["Ballista (platform fight)", "Strafe left", "Parry"], buffs: ["Gold Pine Resin", "Poison Mist"], optional: true },
  { id: "dragonrider", name: "Dragonrider", area: "Heide's Tower of Flame", type: "boss", weaknesses: ["Fire", "Lightning", "Strike"], resistances: [], counters: ["Strafing", "Easy to parry", "Arrow cheese from bridge"], buffs: ["Gold Pine Resin", "Charcoal Pine Resin"], optional: false },
  { id: "old_dragonslayer", name: "Old Dragonslayer", area: "Heide's Tower of Flame", type: "boss", weaknesses: ["Fire", "Magic"], resistances: ["Dark"], counters: ["Strafe left for thrusts"], buffs: ["Charcoal Pine Resin", "Magic Weapon"], optional: true },
  { id: "flexile_sentry", name: "Flexile Sentry", area: "No-Man's Wharf", type: "boss", weaknesses: ["Fire", "Lightning", "Poison"], resistances: [], counters: ["Attack one side at a time", "Lucatiel summon"], buffs: ["Gold Pine Resin", "Poison Mist"], optional: true },
  { id: "ruin_sentinels", name: "Ruin Sentinels", area: "Lost Bastille", type: "boss", weaknesses: ["Lightning", "Poison", "Strike", "Magic"], resistances: [], counters: ["Focus one first", "Strike weapons (mace, club)"], buffs: ["Gold Pine Resin", "Heavy Homing Soul Arrow"], optional: true },
  { id: "belfry_gargoyles", name: "Belfry Gargoyles", area: "Belfry Luna", type: "boss", weaknesses: ["Lightning", "Magic", "Strike"], resistances: ["Poison"], counters: ["AOE/sweeping weapons", "Gold Pine Resin melts them"], buffs: ["Gold Pine Resin", "Sunlight Blade"], optional: true },
  { id: "lost_sinner", name: "Lost Sinner", area: "Sinner's Rise", type: "boss", weaknesses: ["Magic", "Lightning"], resistances: ["Bleed", "Fire", "Poison"], counters: ["Light oil basins for lock-on", "Stay close, strafe"], buffs: ["Gold Pine Resin", "Sunlight Blade"], optional: false },
  { id: "skeleton_lords", name: "Skeleton Lords", area: "Huntsman's Copse", type: "boss", weaknesses: ["Fire", "Strike", "Alluring Skulls", "Yearn"], resistances: ["Magic", "Thrust"], counters: ["Kill one lord at a time", "Blunt for skeletons", "Kill pyromancy lord last"], buffs: ["Charcoal Pine Resin", "Gold Pine Resin"], optional: false },
  { id: "executioner_chariot", name: "Executioner's Chariot", area: "Huntsman's Copse", type: "boss", weaknesses: ["Lightning", "Poison", "Bleed", "Fire"], resistances: ["Dark", "Strike"], counters: ["Alluring Skulls for skeletons", "Kill necromancers", "Pull lever"], buffs: ["Gold Pine Resin", "Poison Mist"], optional: true },
  { id: "covetous_demon", name: "Covetous Demon", area: "Harvest Valley", type: "boss", weaknesses: ["Bleed", "Fire", "Magic", "Thrust"], resistances: ["Lightning", "Poison", "Strike"], counters: ["Break pots above — corpses distract him", "Store gear to avoid unequip"], buffs: ["Charcoal Pine Resin", "Bleed weapon"], optional: false },
  { id: "mytha", name: "Mytha, the Baneful Queen", area: "Earthen Peak", type: "boss", weaknesses: ["Fire", "Thrust"], resistances: ["Lightning", "Magic", "Slash"], counters: ["BURN WINDMILL before fight", "Jester Thomas summon", "Stay center, avoid poison pools"], buffs: ["Charcoal Pine Resin"], optional: false },
  { id: "smelter_demon", name: "Smelter Demon", area: "Iron Keep", type: "boss", weaknesses: ["Lightning", "Poison", "Strike"], resistances: ["Fire"], counters: ["Flash Sweat", "Gyrm Greatshield 100% fire", "Alonne Knight set", "End fight quickly"], buffs: ["Gold Pine Resin"], optional: true },
  { id: "old_iron_king", name: "Old Iron King", area: "Iron Keep", type: "boss", weaknesses: ["Lightning", "Magic (Soul Geyser)"], resistances: ["Fire", "Poison"], counters: ["Avoid lava hole on right", "Don't lock-on", "Attack hands when down"], buffs: ["Gold Pine Resin", "Soul Geyser"], optional: false },
  { id: "royal_rat_vanguard", name: "Royal Rat Vanguard", area: "Grave of Saints", type: "boss", weaknesses: ["Fire"], resistances: ["Poison"], counters: ["Find mohawk rat", "Flame Swathe / Lingering Flame", "Crossbow from distance"], buffs: ["Charcoal Pine Resin", "Pyromancy"], optional: true },
  { id: "royal_rat_authority", name: "Royal Rat Authority", area: "Doors of Pharros", type: "boss", weaknesses: ["Fire"], resistances: ["Poison"], counters: ["Kill small rats first", "Stay under legs", "Avoid vomit (breaks gear)"], buffs: ["Charcoal Pine Resin", "Lingering Flame"], optional: true },
  { id: "scorpioness_najka", name: "Scorpioness Najka", area: "Shaded Woods", type: "boss", weaknesses: ["Thrust", "Fire"], resistances: ["Magic"], counters: ["Hide behind trees for spells", "Stand on stone when she burrows", "Cut tails"], buffs: ["Charcoal Pine Resin"], optional: false },
  { id: "dukes_dear_freja", name: "Duke's Dear Freja", area: "Brightstone Cove Tseldora", type: "boss", weaknesses: ["Bleed", "Fire", "Strike"], resistances: ["Dark", "Lightning", "Magic"], counters: ["Alternate heads", "Trigger laser then hit other head", "Kill spiders first"], buffs: ["Charcoal Pine Resin", "Bleed"], optional: false },
  { id: "rotten", name: "The Rotten", area: "Black Gulch", type: "boss", weaknesses: ["Thrust", "Lightning", "Bleed"], resistances: ["Dark", "Poison", "Strike"], counters: ["Kite at range", "Avoid fire pits", "Cut arms for Lockstone"], buffs: ["Gold Pine Resin", "Thrust weapon"], optional: false },
  { id: "looking_glass_knight", name: "Looking Glass Knight", area: "Drangleic Castle", type: "boss", weaknesses: ["Dark", "Fire", "Magic", "Strike", "Poison"], resistances: ["Lightning"], counters: ["Don't attack shield", "Focus summon when he blocks"], buffs: ["Dark Weapon", "Charcoal Pine Resin"], optional: false },
  { id: "twin_dragonriders", name: "Twin Dragonriders", area: "Drangleic Castle", type: "boss", weaknesses: ["Fire", "Lightning", "Strike"], resistances: [], counters: ["Bait melee to knock archer off perch", "Flame Swathe melts them"], buffs: ["Charcoal Pine Resin", "Gold Pine Resin"], optional: false },
  { id: "prowling_magus", name: "Prowling Magus and Congregation", area: "Brightstone Cove Tseldora", type: "boss", weaknesses: ["Bleed", "Fire", "Slash", "Thrust", "Lightning"], resistances: [], counters: ["Kill Magus and clerics first", "Dark Fog", "Wide-swing weapons"], buffs: ["Gold Pine Resin"], optional: false },
  { id: "demon_of_song", name: "Demon of Song", area: "Shrine of Amana", type: "boss", weaknesses: ["Bleed", "Dark", "Magic", "Lightning"], resistances: ["Poison"], counters: ["Attack only when face open", "Wet = weak to lightning"], buffs: ["Gold Pine Resin", "Magic Weapon"], optional: false },
  { id: "velstadt", name: "Velstadt, the Royal Aegis", area: "Undead Crypt", type: "boss", weaknesses: ["Lightning", "Strike"], resistances: ["Bleed", "Dark", "Poison"], counters: ["Dark resist gear", "Get behind for bell attack"], buffs: ["Gold Pine Resin"], optional: false },
  { id: "vendrick", name: "Vendrick", area: "Undead Crypt", type: "boss", weaknesses: ["Bleed", "Giant Souls"], resistances: ["Dark"], counters: ["Need 4–5 Giant Souls for normal defense", "Fast weapon", "Strafe non-weapon side"], buffs: ["Bleed weapon"], optional: true },
  { id: "guardian_dragon", name: "Guardian Dragon", area: "Aldia's Keep", type: "boss", weaknesses: ["Dark", "Magic", "Lightning"], resistances: ["Fire"], counters: ["Stay at legs", "Bait stamp", "Lightning destroys"], buffs: ["Gold Pine Resin"], optional: false },
  { id: "giant_lord", name: "Giant Lord", area: "Memory of Jeigh", type: "boss", weaknesses: ["Dark", "Fire", "Magic", "Lightning"], resistances: ["Physical"], counters: ["Soul Geyser", "Great Lightning Spear", "Farm spot"], buffs: ["Soul Geyser", "Great Lightning Spear"], optional: false },
  { id: "ancient_dragon", name: "Ancient Dragon", area: "Dragon Shrine", type: "boss", weaknesses: ["Dark", "Lightning", "Magic"], resistances: ["Fire", "Physical", "Poison"], counters: ["Run from wing flap", "Tickles feet during flame"], buffs: ["Gold Pine Resin"], optional: true },
  { id: "throne_watcher_defender", name: "Throne Watcher & Throne Defender", area: "Throne of Want", type: "boss", weaknesses: ["Lightning"], resistances: ["Bleed", "Poison"], counters: ["Kill Watcher first", "Keep HP close", "Summons help"], buffs: ["Gold Pine Resin", "Sunlight Blade"], optional: false },
  { id: "nashandra", name: "Nashandra", area: "Throne of Want", type: "boss", weaknesses: ["Lightning", "Strike", "Fire", "Magic"], resistances: ["Dark", "Poison"], counters: ["Cursebite Ring", "Destroy Lifedrain Patches"], buffs: ["Gold Pine Resin"], optional: false },
  { id: "aldia", name: "Aldia, Scholar of the First Sin", area: "Throne of Want", type: "boss", weaknesses: ["Lightning", "Magic", "Slash"], resistances: ["Dark", "Fire", "Poison"], counters: ["Gyrm Greatshield for fire aura"], buffs: ["Gold Pine Resin"], optional: true },
  { id: "darklurker", name: "Darklurker", area: "Dark Chasm of Old", type: "boss", weaknesses: ["Lightning", "Fire"], resistances: [], counters: ["Pyromancy", "Lightning buffs", "Memorize attacks for split phase"], buffs: ["Pyromancy", "Gold Pine Resin"], optional: true },
  // DLC bosses
  { id: "elana", name: "Elana, the Squalid Queen", area: "DLC: Shulva", type: "boss", weaknesses: ["Magic", "Strike", "Fire"], resistances: ["Dark"], counters: ["Transgressor's Leather Shield (100% dark)", "Focus her before summons"], buffs: ["Magic Weapon", "Charcoal Pine Resin"], optional: false },
  { id: "sinh", name: "Sinh, the Slumbering Dragon", area: "DLC: Shulva", type: "boss", weaknesses: ["Lightning", "Dark", "Magic"], resistances: ["Fire"], counters: ["Repair Powder", "Rebel's/Gyrm Greatshield", "Fire causes toxic"], buffs: ["Gold Pine Resin"], note: "Destroys weapon durability", optional: false },
  { id: "graverobber_varg_cerah", name: "Graverobber, Varg & Cerah", area: "DLC: Cave of the Dead", type: "boss", weaknesses: ["Poison", "Toxic", "Parry", "Backstab"], resistances: [], counters: ["Poison/toxic mist", "Parry loop", "Kite to lower platform"], buffs: ["Toxic Mist", "Poison Mist"], optional: true },
  { id: "blue_smelter", name: "Blue Smelter Demon", area: "DLC: Iron Passage", type: "boss", weaknesses: ["Poison", "Toxic", "Fire", "Strike"], resistances: ["Magic"], counters: ["Run through area", "Phase 3 = magic damage"], buffs: ["Charcoal Pine Resin", "Toxic Mist"], optional: true },
  { id: "fume_knight", name: "Fume Knight", area: "DLC: Brume Tower", type: "boss", weaknesses: ["Strike", "Slash (physical)"], resistances: ["Lightning", "Fire", "Dark", "Magic", "Slash", "Thrust"], counters: ["Don't wear Velstadt helm", "Pure physical melee best"], buffs: ["Raw infusion", "Physical buffs"], note: "Use physical damage; elemental weak", optional: false },
  { id: "sir_alonne", name: "Sir Alonne", area: "DLC: Memory of Old Iron King", type: "boss", weaknesses: ["Strike"], resistances: ["Bleed", "Fire", "Poison", "Slash", "Thrust", "Magic", "Dark"], counters: ["Mace/club", "Learn delays"], buffs: ["Strike weapon"], optional: true },
  { id: "burnt_ivory_king", name: "Burnt Ivory King", area: "DLC: Old Chaos", type: "boss", weaknesses: ["Lightning", "Dark"], resistances: ["Poison", "Toxic", "Fire"], counters: ["4 Loyce Knights seal portals", "Phantoms distract"], buffs: ["Gold Pine Resin", "Dark Weapon"], optional: false },
  { id: "aava", name: "Aava, the King's Pet", area: "DLC: Eleum Loyce", type: "boss", weaknesses: ["Fire", "Thrust"], resistances: ["Magic", "Poison"], counters: ["Eye of the Priestess to see"], buffs: ["Charcoal Pine Resin"], optional: false },
  { id: "lud_zallen", name: "Lud & Zallen, the King's Pets", area: "DLC: Frigid Outskirts", type: "boss", weaknesses: ["Fire", "Thrust"], resistances: ["Poison"], counters: ["Kill Lud before Zallen joins", "Zallen buffs at 20%"], buffs: ["Charcoal Pine Resin"], optional: true },
  // Notable non-boss enemies
  { id: "old_knights", name: "Old Knights", area: "Heide's Tower of Flame", type: "elite", weaknesses: ["Strike", "Lightning"], resistances: ["Slash"], counters: ["Mace/club", "Backstab"], buffs: ["Gold Pine Resin"], note: "Hollowing weakens them" },
  { id: "syans", name: "Syan Knights", area: "Drangleic Castle, etc.", type: "elite", weaknesses: ["Strike", "Lightning"], resistances: [], counters: ["Strike weapons", "Parry"], buffs: ["Gold Pine Resin"] },
  { id: "alonne_knights", name: "Alonne Knights", area: "Iron Keep, Brume Tower", type: "elite", weaknesses: ["Strike", "Lightning"], resistances: ["Fire"], counters: ["Strike", "1v1"], buffs: ["Gold Pine Resin"] },
  { id: "drakeblood_knights", name: "Drakeblood Knights", area: "Dragon Shrine, Shulva", type: "elite", weaknesses: ["Strike", "Lightning"], resistances: [], counters: ["Strike", "Parry"], buffs: ["Gold Pine Resin"] },
  { id: "mimics", name: "Mimics", area: "Various", type: "elite", weaknesses: ["Poison", "Lloyd's Talisman"], resistances: [], counters: ["Lloyd's Talisman (sleep)", "Avoid grab"], buffs: [], note: "Lloyd's puts to sleep for free loot" },
  { id: "basilisks", name: "Basilisks", area: "Various", type: "common", weaknesses: ["All damage"], resistances: [], counters: ["Avoid petrify breath"], buffs: [], note: "Petrify = death; stay behind" },
  { id: "ogres", name: "Ogres", area: "Things Betwixt, etc.", type: "elite", weaknesses: ["Strike", "Fire"], resistances: [], counters: ["Hit and run", "Breakable doors"], buffs: ["Charcoal Pine Resin"] },
  { id: "hollow_soldiers", name: "Hollow Soldiers / Hollows", area: "Forest, Bastille, etc.", type: "common", weaknesses: ["Strike", "Fire"], resistances: [], counters: ["Strike", "Group carefully"], buffs: ["Charcoal Pine Resin"] },
  { id: "skeleton", name: "Skeletons", area: "Huntsman's Copse, etc.", type: "common", weaknesses: ["Strike", "Blunt"], resistances: ["Slash", "Thrust"], counters: ["Mace/club", "Divine prevents respawn (Necromancer areas)"], buffs: [] },
  { id: "spiders", name: "Spiders", area: "Brightstone Cove", type: "common", weaknesses: ["Fire"], resistances: [], counters: ["Torch scares", "Torch in left hand"], buffs: ["Charcoal Pine Resin"] },
  { id: "maneaters", name: "Maneater (bug creatures)", area: "Shaded Woods / Shrine of Amana", type: "common", weaknesses: ["Fire", "Poison"], resistances: [], counters: ["Fire", "Avoid poison spit"], buffs: ["Charcoal Pine Resin"] },
];
