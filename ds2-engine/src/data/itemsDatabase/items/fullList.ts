/**
 * DS2 SotFS — Full items list (minimal entries).
 * Fextralife/wiki naming. Detailed entries in weapons.ts, rings.ts, etc. override by id.
 */

import type { ItemDatabaseEntry } from "../types";

function toId(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9_]/g, "");
}

function mk(
  name: string,
  category: ItemDatabaseEntry["category"],
  subcategory?: Record<string, string>
): ItemDatabaseEntry {
  return {
    id: toId(name),
    name,
    category,
    subcategory,
  };
}

/** Full A–Z DS2 SotFS items — minimal entries. Detailed entries override by id. */
export const FULL_DS2_ITEMS: ItemDatabaseEntry[] = [
  // ─── WEAPONS ─────────────────────────────────────────────────────────────
  // Daggers
  ...["Dagger", "Royal Dirk", "Black Flamestone Dagger", "Parrying Dagger", "Bandit's Knife", "Mytha's Bent Blade", "Shadow Dagger", "Thief Dagger", "Broken Thief Sword", "Manikin Knife", "Umbral Dagger", "Blue Dagger", "Retainer's Short Sword"].map((n) => mk(n, "weapon", { weaponClass: "Dagger" })),
  // Straight Swords
  ...["Shortsword", "Longsword", "Fire Longsword", "Yellow Quartz Longsword", "Black Dragon Sword", "Broken Straight Sword", "Broadsword", "Foot Soldier Sword", "Varangian Sword", "Heide Knight Sword", "Blue Flame", "Red Rust Sword", "Sun Sword", "Drakekeeper's Sword", "Puzzling Stone Sword", "Ashen Warrior Sword", "Fume Sword", "Possessed Armor Sword", "Ivory Straight Sword"].map((n) => mk(n, "weapon", { weaponClass: "Straight Sword" })),
  // Greatswords
  ...["Bastard Sword", "Bluemoon Greatsword", "Claymore", "Flamberge", "Drangleic Sword", "Thorned Greatsword", "Moonlight Greatsword", "Mastodon Greatsword", "Ruler's Sword", "Mirrah Greatsword", "Old Mirrah Greatsword", "Black Dragon Greatsword", "Black Knight Greatsword", "Royal Greatsword", "Old Knight Greatsword", "Defender Greatsword", "Watcher Greatsword", "Key to the Embedded", "Drakeblood Greatsword", "Majestic Greatsword", "Charred Loyce Greatsword", "Loyce Greatsword", "Greatsword of the Forlorn"].map((n) => mk(n, "weapon", { weaponClass: "Greatsword" })),
  // Ultra Greatswords
  ...["Pursuer's Ultra Greatsword", "Zweihander", "Drakewing Ultra Greatsword", "King's Ultra Greatsword", "Drakekeeper's Ultra Greatsword", "Old Knight Ultra Greatsword", "Black Knight Ultra Greatsword", "Greatsword", "Smelter Sword", "Crypt Blacksword", "Lost Sinner's Sword", "Fume Ultra Greatsword", "Aged Smelter Sword", "Ivory King Ultra Greatsword"].map((n) => mk(n, "weapon", { weaponClass: "Ultra Greatsword" })),
  // Curved Swords
  ...["Scimitar", "Red Rust Scimitar", "Spider Fang", "Melu Scimitar", "Monastery Scimitar", "Falchion", "Shotel", "Warped Sword", "Manikin Sabre", "Eleum Loyce"].map((n) => mk(n, "weapon", { weaponClass: "Curved Sword" })),
  // Curved Greatswords
  ...["Murakumo", "Arced Sword", "Curved Dragon Greatsword", "Curved Nil Greatsword"].map((n) => mk(n, "weapon", { weaponClass: "Curved Greatsword" })),
  // Katanas
  ...["Uchigatana", "Washing Pole", "Chaos Blade", "Blacksteel Katana", "Manslayer", "Berserker Blade", "Darkdrift", "Bewitched Alonne Sword"].map((n) => mk(n, "weapon", { weaponClass: "Katana" })),
  // Piercing Swords
  ...["Estoc", "Mail Breaker", "Rapier", "Ricard's Rapier", "Chaos Rapier", "Black Scorpion Stinger", "Spider's Silk", "Espada Ropera", "Ice Rapier"].map((n) => mk(n, "weapon", { weaponClass: "Piercing Sword" })),
  // Axes
  ...["Dragonslayer's Crescent Axe", "Bound Hand Axe", "Hand Axe", "Battle Axe", "Bandit Axe", "Infantry Axe", "Gyrm Axe", "Butcher's Knife"].map((n) => mk(n, "weapon", { weaponClass: "Axe" })),
  // Great Axes
  ...["Greataxe", "Bandit Greataxe", "Lion Greataxe", "Giant Stone Axe", "Gyrm Greataxe", "Black Dragon Greataxe", "Black Knight Greataxe", "Drakekeeper's Greataxe", "Crescent Axe"].map((n) => mk(n, "weapon", { weaponClass: "Great Axe" })),
  // Hammers
  ...["Homunculus Mace", "Craftman's Hammer", "Mace", "Club", "Morning Star", "Reinforced Club", "Mace of the Insolent", "Handmaid's Ladle", "Blacksmith's Hammer", "Black Dragon Warpick", "Aldia Hammer", "Barbed Club"].map((n) => mk(n, "weapon", { weaponClass: "Hammer" })),
  // Great Hammers
  ...["Large Club", "Great Club", "Gyrm Great Hammer", "Iron King Hammer", "Malformed Shell", "Malformed Skull", "Dragon Tooth", "Giant Warrior Club", "Demon's Great Hammer", "Archdrake Mace", "Old Knight Hammer", "Drakekeeper's Great Hammer", "Sacred Chime Hammer", "Drakekeeper's Warpick", "Pickaxe", "Sanctum Mace", "Smelter Hammer"].map((n) => mk(n, "weapon", { weaponClass: "Great Hammer" })),
  // Fist & Claws
  ...["Caestus", "Claws", "Malformed Claws", "Manikin Claws", "Work Hook", "Bone Fist"].map((n) => mk(n, "weapon", { weaponClass: "Fist & Claws" })),
  // Spears
  ...["Winged Spear", "Partizan", "Spear", "Pike", "Stone Soldier Spear", "Silverblack Spear", "Heide Spear", "Pate's Spear", "Channeler's Trident", "Spitfire Spear", "Dragonslayer Spear", "Gargoyle Bident", "Pilgrim's Spontoon", "Yorgh's Spear"].map((n) => mk(n, "weapon", { weaponClass: "Spear" })),
  // Halberds
  ...["Dragonrider's Halberd", "Halberd", "Lucerne", "Scythe", "Mastodon Halberd", "Santier's Spear", "Blue Knight's Halberd", "Old Knight Halberd", "Old Knight Pike", "Syan's Halberd", "Black Knight Halberd", "Roaring Halberd", "Helix Halberd", "Wrathful Axe"].map((n) => mk(n, "weapon", { weaponClass: "Halberd" })),
  // Lances
  ...["Heide Lance", "Heide Greatlance", "Grand Lance", "Chariot Lance", "Rampart Golem Lance"].map((n) => mk(n, "weapon", { weaponClass: "Lance" })),
  // Reapers
  ...["Crescent Sickle", "Great Scythe", "Silverblack Sickle", "Great Machete", "Full Moon Sickle", "Scythe of Nahr Alma", "Bone Scythe", "Scythe of Want", "Scythe of the Forlorn"].map((n) => mk(n, "weapon", { weaponClass: "Reaper" })),
  // Twinblades
  ...["Twinblade", "Stone Twinblade", "Dragonrider Twinblade", "Red Iron Twinblade", "Curved Twinblade", "Sorcerer's Twinblade"].map((n) => mk(n, "weapon", { weaponClass: "Twinblade" })),
  // Whips
  ...["Whip", "Notched Whip", "Bloodied Whip", "Spotted Whip", "Old Whip"].map((n) => mk(n, "weapon", { weaponClass: "Whip" })),
  // Bows
  ...["Short Bow", "Long Bow", "Composite Bow", "Sea Bow", "Dragonrider Bow", "Bell Keeper Bow", "Bow of Want", "Hunter's Blackbow"].map((n) => mk(n, "weapon", { weaponClass: "Bow" })),
  // Greatbows
  ...["Alonne Greatbow", "Dragonslayer Greatbow", "Possessed Armor Greatbow", "Twin-Headed Greatbow"].map((n) => mk(n, "weapon", { weaponClass: "Greatbow" })),
  // Crossbows
  ...["Light Crossbow", "Heavy Crossbow", "Shield Crossbow", "Avelyn", "Sanctum Repeating Crossbow", "Sanctum Crossbow"].map((n) => mk(n, "weapon", { weaponClass: "Crossbow" })),

  // ─── RINGS ──────────────────────────────────────────────────────────────
  ...["Agape Ring", "Life Ring", "Life Ring +1", "Life Ring +2", "Life Ring +3", "Chloranthy Ring", "Chloranthy Ring +1", "Chloranthy Ring +2", "Royal Soldier's Ring", "Royal Soldier's Ring +1", "Royal Soldier's Ring +2", "First Dragon Ring", "Second Dragon Ring", "Third Dragon Ring", "Ring of Steel Protection", "Ring of Steel Protection +1", "Ring of Steel Protection +2", "Spell Quartz Ring", "Spell Quartz Ring +1", "Spell Quartz Ring +2", "Spell Quartz Ring +3", "Flame Quartz Ring", "Flame Quartz Ring +1", "Flame Quartz Ring +2", "Flame Quartz Ring +3", "Thunder Quartz Ring", "Thunder Quartz Ring +1", "Thunder Quartz Ring +2", "Thunder Quartz Ring +3", "Dark Quartz Ring", "Dark Quartz Ring +1", "Dark Quartz Ring +2", "Dark Quartz Ring +3", "Poisonbite Ring", "Poisonbite Ring +1", "Bloodbite Ring", "Bloodbite Ring +1", "Cursebite Ring", "Bracing Knuckle Ring", "Bracing Knuckle Ring +1", "Bracing Knuckle Ring +2", "Ash Knuckle Ring", "Ash Knuckle Ring +1", "Dispelling Ring", "Dispelling Ring +1", "Ring of Resistance", "Ring of Resistance +1", "Ring of Blades", "Ring of Blades +1", "Ring of Blades +2", "Ring of Knowledge", "Ring of Prayer", "Stone Ring", "Red Tearstone Ring", "Blue Tearstone Ring", "Ring of Giants", "Ring of Giants +1", "Ring of Giants +2", "Old Leo Ring", "Ring of Soul Protection", "Ring of Life Protection", "Lingering Dragoncrest Ring", "Lingering Dragoncrest Ring +1", "Lingering Dragoncrest Ring +2", "Clear Bluestone Ring", "Clear Bluestone Ring +1", "Clear Bluestone Ring +2", "Northern Ritual Band", "Northern Ritual Band +1", "Northern Ritual Band +2", "Southern Ritual Band", "Southern Ritual Band +1", "Southern Ritual Band +2", "Covetous Gold Serpent Ring", "Covetous Gold Serpent Ring +1", "Covetous Gold Serpent Ring +2", "Covetous Silver Serpent Ring", "Covetous Silver Serpent Ring +1", "Covetous Silver Serpent Ring +2", "Ring of the Evil Eye", "Ring of the Evil Eye +1", "Ring of the Evil Eye +2", "Ring of Restoration", "Ring of Binding", "Silvercat Ring", "Redeye Ring", "Gower's Ring of Protection", "Name-engraved Ring", "Slumbering Dragoncrest Ring", "Hawk Ring", "Old Sun Ring", "Illusory Ring of a Conqueror", "Illusory Ring of the Exalted", "Ring of the Dead", "Ring of Thorns", "Ring of Thorns +1", "Ring of Thorns +2", "Delicate String", "White Ring", "Ring of Whispers", "King's Ring", "Blue Seal", "Guardian's Seal", "Crest of Blood", "Crest of the Rat", "Bell Keeper's Seal", "Sun Seal", "Vanquisher's Seal", "Ancient Dragon Seal", "Abyss Seal", "Illusory Ring of the Vengeful", "Illusory Ring of the Guilty", "Lightning Clutch Ring", "Sorcery Clutch Ring", "Dark Clutch Ring", "Fire Clutch Ring", "Flynn's Ring", "Ring of the Embedded", "Yorgh's Ring", "Strength Ring", "Simpleton's Ring", "Ring of the Living", "Ivory Warrior Ring", "Dexterity Ring", "Baneful Bird Ring"].map((n) => mk(n, "ring")),

  // ─── SHIELDS ────────────────────────────────────────────────────────────
  ...["Archdrake Shield", "Bell Keeper Shield", "Benhart's Parma", "Black Dragon Shield", "Black Flamestone Parma", "Blossom Kite Shield", "Blue Wooden Shield", "Bone Shield", "Bound Wooden Shield", "Buckler", "Chaos Shield", "Charred Loyce Shield", "Cleric's Parma", "Cleric's Small Shield", "Crimson Parma", "Cursed Bone Shield", "Defender's Shield", "Dragonrider Greatshield", "Drakekeeper's Greatshield", "Drakekeeper's Shield", "Drangleic Shield", "Foot Soldier Shield", "Golden Falcon Shield", "Golden Wing Shield", "Grand Spirit Tree Shield", "Greatshield of Glory", "Gyrm Greatshield", "Havel's Greatshield", "Hollow Soldier Shield", "Homunculus Wooden Shield", "Iron Parma", "King's Mirror", "King's Shield", "Large Leather Shield", "Lion Clan Shield", "Llewellyn Shield", "Loyce Shield", "Magic Shield", "Manikin Shield", "Mastodon Greatshield", "Mirrah Shield", "Moon Butterfly Shield", "Old Knight Greatshield", "Old Knight's Shield", "Orma's Greatshield", "Pate's Shield", "Phoenix Parma", "Porcine Shield", "Pursuer's Greatshield", "Rampart Golem Shield", "Rebel's Greatshield", "Red Rust Shield", "Reeve's Greatshield", "Royal Kite Shield", "Sanctum Shield", "Shield of the Insolent", "Silver Eagle Kite Shield", "Silverblack Shield", "Slumbering Dragon Shield", "Small Leather Shield", "Spirit Tree Shield", "Stone Parma", "Sunlight Parma", "Target Shield", "Tower Shield", "Transgressor's Leather Shield", "Twin Dragon Greatshield", "Varangian Shield", "Vessel Shield", "Watchdragon Parma", "Watcher's Shield", "Wicked Eye Greatshield", "Wooden Shield", "Yellow Quartz Shield"].map((n) => mk(n, "shield")),

  // ─── CATALYSTS (Staves, Chimes, Flames) ───────────────────────────────────
  ...["Witchtree Branch", "Lizard Staff", "Transgressor's Staff", "Sorcerer's Staff", "Staff of Amana", "Olenford's Staff", "Archdrake Staff", "Bat Staff", "Bone Staff", "Staff of Wisdom", "Sunset Staff", "Black Witch's Staff", "Azal's Staff", "Retainer Staff"].map((n) => mk(n, "catalyst", { catalystClass: "Staff" })),
  ...["Pyromancy Flame", "Dark Pyromancy Flame"].map((n) => mk(n, "catalyst", { catalystClass: "Flame" })),
  ...["Cleric's Sacred Chime", "Witchtree Bellvine", "Priest's Chime", "Dragon Chime", "Chime of Want", "Archdrake Chime", "Idol's Chime", "Caitha's Chime", "Protective Chime", "Disc Chime", "Chime of Screams"].map((n) => mk(n, "catalyst", { catalystClass: "Chime" })),

  // ─── SPELLS ──────────────────────────────────────────────────────────────
  // Sorceries
  ...["Soul Arrow", "Great Soul Arrow", "Heavy Soul Arrow", "Great Heavy Soul Arrow", "Homing Soul Arrow", "Heavy Homing Soul Arrow", "Homing Soul Mass", "Homing Crystal Soul Mass", "Soul Spear", "Crystal Soul Spear", "Shockwave", "Soul Spear Barrage", "Soul Shower", "Soul Greatsword", "Soul Vortex", "Soul Bolt", "Soul Geyser", "Magic Weapon", "Great Magic Weapon", "Crystal Magic Weapon", "Strong Magic Shield", "Yearn", "Hush", "Fall Control", "Hidden Weapon", "Repair", "Cast Light", "Chameleon", "Unleash Magic", "Focus Souls", "Soul Flash"].map((n) => mk(n, "spell", { school: "sorcery" })),
  // Miracles (common)
  ...["Heal", "Great Heal", "Great Heal Excerpt", "Soothing Sunlight", "Replenishment", "Resplendent Life", "Bountiful Sunlight", "Caressing Prayer", "Force", "Emit Force", "Wrath of the Gods", "Lightning Spear", "Great Lightning Spear", "Sunlight Spear", "Heavenly Thunder", "Blinding Bolt", "Sunlight Blade", "Dark Blade", "Sacred Oath", "Great Magic Barrier", "Magic Barrier", "Perseverance", "Homeward", "Guidance", "Reveal", "Unveil", "Soul Appease", "Vow of Silence", "Denial", "Sacred Flame"].map((n) => mk(n, "spell", { school: "miracle" })),
  // Pyromancies
  ...["Fireball", "Great Fireball", "Fire Orb", "Great Chaos Fireball", "Combustion", "Great Combustion", "Fire Whip", "Flame Swathe", "Fire Tempest", "Chaos Storm", "Flame Weapon", "Flash Sweat", "Iron Flesh", "Warmth", "Toxic Mist", "Acid Surge", "Immolation", "Dance of Fire", "Firestorm", "Outcry", "Forbidden Sun", "Flame Swathe", "Lingering Flame"].map((n) => mk(n, "spell", { school: "pyromancy" })),
  // Hexes
  ...["Dark Orb", "Dark Hail", "Dark Fog", "Affinity", "Dark Greatsword", "Dark Weapon", "Resonant Soul", "Great Resonant Soul", "Resonant Weapon", "Resonant Flesh", "Scraps of Life", "Dead Again", "Profound Still", "Numbness", "Repel", "Twisted Barricade", "Darkstorm", "Climax", "Lifedrain Patch", "Whisper of Despair", "Promised Walk of Peace", "Deep Sanctum", "Dark Dance", "Recollection", "Darklurker Hex", "Soul Flash"].map((n) => mk(n, "spell", { school: "hex" })),

  // ─── ARMOR (4 pieces per set: helm, chest, gloves, legs) ──────────────────
  ...["Agdayne", "Alonne Captain", "Alonne Knight", "Alva", "Archdrake", "Astrologist", "Aurous", "Bandit", "Bell Keeper", "Benhart", "Black Dragon", "Black Hollow Mage", "Black Leather", "Black", "Black Witch", "Bone King", "Brigand", "Cale", "Catarina", "Chaos", "Creighton", "Dark", "Desert Sorceress", "Dingy", "Dragon Acolyte", "Dragonrider", "Drakekeeper", "Drangleic", "Elite Knight", "Executioner", "Falconer", "Faraam", "Forlorn", "Grave Warden", "Gyrm", "Hard Leather", "Havel", "Heide Knight", "Hexer", "Hollow Infantry", "Hollow Soldier", "Hunter", "Imperious", "Imported", "Infantry", "Insolent", "Ironclad", "Invisible Aurous", "Jester", "Judgment", "King", "Knight", "Leydia Black", "Leydia White", "Lion Mage", "Lion Warrior", "Llewellyn", "Looking Glass", "Lucatiel", "Mad Warrior", "Manikin", "Mastodon", "Monastery", "Moon Butterfly", "Nahr Alma", "Old Ironclad", "Old Knight", "Pate", "Peasant", "Penal", "Priestess", "Prisoner", "Pyromancer", "Rogue", "Royal Soldier", "Royal Swordsman", "Ruin", "Rusted Mastodon", "Saint", "Shadow", "Smelter Demon", "Steel", "Syan", "Targray", "Throne Defender", "Throne Watcher", "Traveling Merchant", "Tseldora", "Varangian", "Velstadt", "Vengarl", "Wanderer", "White Hollow Mage", "White Priest", "Xanthous"].flatMap((set) =>
    [
      { n: `${set} Helm`, s: "helm" },
      { n: `${set} Armor`, s: "chest" },
      { n: `${set} Gauntlets`, s: "gloves" },
      { n: `${set} Leggings`, s: "legs" },
    ].map(({ n, s }) => mk(n, "armor", { slot: s }))
  ),

  // ─── CONSUMABLES ────────────────────────────────────────────────────────
  ...["Estus Flask", "Human Effigy", "Bonfire Ascetic", "Divine Blessing", "Lifegem", "Radiant Lifegem", "Old Radiant Lifegem", "Elizabeth Mushroom", "Green Blossom", "Poison Moss", "Monastery Charm", "Dragon Charm", "Amber Herb", "Twilight Herb", "Wilted Dusk Herb", "Rouge Water", "Crimson Water", "Small Blue Burr", "Small Yellow Burr", "Small Orange Burr", "Common Fruit", "Dark Troches", "Red Leech Troches", "Triclops Snake Troches", "Aromatic Ooze", "Dark Pine Resin", "Gold Pine Resin", "Charcoal Pine Resin", "Rotten Pine Resin", "Witching Urn", "Firebomb", "Black Firebomb", "Holy Water Urn", "Throwing Knife", "Poison Throwing Knife", "Corrosive Urn", "Alluring Skull", "Dung Pie", "Rope", "Prism Stone", "Lloyd's Talisman", "Black Separation Crystal", "Dragon Eye", "Red Sign Soapstone", "White Sign Soapstone", "Small White Sign Soapstone", "Cracked Red Eye Orb", "Cracked Blue Eye Orb", "Cracked Eye Orb", "Seed of a Tree of Giants", "Rusty Coin", "Smooth & Silky Stone", "Petrified Something", "Token of Fidelity", "Token of Spite", "Old Growth Balm", "Rotten Flesh", "Ruin Fragment"].map((n) => mk(n, "consumable")),

  // ─── KEYS ────────────────────────────────────────────────────────────────
  ...["House Key", "Lenigrast's Key", "Bastille Key", "Soldier Key", "Forgotten Key", "Brightstone Key", "Fang Key", "Skeleton Key", "Ancient Key", "Antiquated Key", "Dull Ember", "Fragrant Branch of Yore", "Ashen Mist Heart", "Key to the Embedded", "Dragon Talon", "Heavy Iron Key", "Iron Key", "Lockstone", "Pharros Lockstone", "Petrified Egg", "Aldia Key", "Eternal Sanctum Key", "Tower Key", "Dragon Stone", "Ladder Miniature", "Crushed Eye Orb"].map((n) => mk(n, "key")),

  // ─── MATERIALS ───────────────────────────────────────────────────────────
  ...["Titanite Shard", "Large Titanite Shard", "Titanite Chunk", "Titanite Slab", "Twinkling Titanite", "Petrified Dragon Bone", "Pale Pine Resin", "Faintstone", "Firedrake Stone", "Magic Stone", "Boltsone", "Raw Stone", "Darknight Stone", "Poison Stone", "Bleed Stone", "Old Paledrake Soul", "Old King Soul", "Old Witch Soul", "Old Dead One Soul", "Soul of a Giant", "Soul of the Pursuer", "Soul of the Last Giant", "Soul of the Lost Sinner", "Soul of the Rotten", "Soul of the Old Iron King", "Soul of Freja", "Soul of the Duke's Dear Freja", "Soul of Nashandra", "Soul of the King", "Vendrick's Soul", "Soul of Velstadt", "Soul of the Throne Watcher", "Soul of the Throne Defender", "Soul of the Demon of Song", "Soul of the Looking Glass Knight", "Soul of the Guardian Dragon", "Ancient Dragon Soul", "Soul of the Smelter Demon", "Soul of the Old Iron King", "Soul of Nadalia", "Soul of the Fume Knight", "Soul of Sir Alonne", "Soul of Elana", "Soul of Sinh", "Soul of the Ivory King", "Soul of Alsanna", "Soul of Aava", "Soul of Lud and Zallen", "Estus Shard", "Sublime Bone Dust"].map((n) => mk(n, "material")),
];
