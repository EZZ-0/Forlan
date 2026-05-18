/**
 * Weapon acquisition data — chests, boss drops, trades, corpses.
 * Supplements shopUnlocks and enemyDrops for weapons not sold by vendors or dropped by common enemies.
 * Source: Fextralife DS2 Wiki individual weapon pages.
 */

export interface WeaponLocationEntry {
  sourceType: "chest" | "buy" | "drop" | "trade" | "corpse" | "vendor" | "boss" | "gift";
  where: string;
  howToGetThere?: string;
  howToObtain?: string;
  vendor?: string;
  cost?: { souls?: number; special?: string };
  farming?: { enemy: string; area: string; dropRate: string };
}

export const WEAPON_LOCATIONS: Record<string, WeaponLocationEntry> = {
  fire_longsword: {
    sourceType: "chest",
    where: "Forest of Fallen Giants — chest past Flame Salamander pit",
    howToGetThere:
      "1) From Cardinal Tower bonfire, go down to the area with the salamander pit.\n2) Run past or kill the salamanders.\n3) The chest is in the room beyond — already Fire-infused.",
    howToObtain: "Open the chest.",
    cost: { souls: 0 },
  },
  drangleic_sword: {
    sourceType: "chest",
    where: "Forest of Fallen Giants — after defeating the Pursuer",
    howToGetThere:
      "1) Defeat the Pursuer (platform in FoFG or Smelter Demon path).\n2) Walk past the arena and find a hole in the ground.\n3) Drop into the hole — corpse has Drangleic Set and Drangleic Sword.",
    howToObtain: "Loot corpse in pit after Pursuer.",
  },
  santiers_spear: {
    sourceType: "chest",
    where: "Doors of Pharros — behind Pharros contraption",
    howToGetThere:
      "1) From Gyrm's Respite bonfire, enter main area.\n2) The doorway is in the middle of the right-hand wall.\n3) Use 1 Pharros Lockstone on the slot under the water (directly in front of door) — can roll through.\n4) Beware Primal Knight behind the door.",
    howToObtain: "Open door with Pharros Lockstone, loot chest.",
  },
  dragonrider_bow: {
    sourceType: "boss",
    where: "Dragonrider (Heide's Tower of Flame) — guaranteed drop",
    howToGetThere: "1) Reach Heide's Tower of Flame.\n2) Dragonrider boss is in the circular arena.",
    howToObtain: "Defeat Dragonrider.",
  },
  pursuer_ultra_greatsword: {
    sourceType: "trade",
    where: "Ornifex — trade Soul of the Pursuer",
    howToGetThere: "Defeat the Pursuer. Trade soul at Ornifex (Brightstone Cove).",
    howToObtain: "Trade Soul of the Pursuer at Ornifex.",
    cost: { special: "Soul of the Pursuer" },
  },
  crypt_blacksword: {
    sourceType: "trade",
    where: "Ornifex — trade Vendrick's Soul",
    howToGetThere: "Defeat Vendrick in Undead Crypt. Trade Vendrick's Soul at Ornifex.",
    howToObtain: "Trade Vendrick's Soul.",
    cost: { special: "Vendrick's Soul" },
  },
  sacred_chime_hammer: {
    sourceType: "boss",
    where: "Velstadt (Undead Crypt) — guaranteed drop",
    howToGetThere: "1) Reach Undead Crypt.\n2) Velstadt guards the path to Vendrick.",
    howToObtain: "Defeat Velstadt.",
  },
  old_iron_king_hammer: {
    sourceType: "boss",
    where: "Old Iron King (Iron Keep) — guaranteed drop",
    howToGetThere: "1) Reach Iron Keep via Earthen Peak.\n2) Old Iron King boss at the end of the lava path.",
    howToObtain: "Defeat Old Iron King.",
  },
  key_to_the_embedded: {
    sourceType: "chest",
    where: "Shrine of Amana — chest in area",
    howToGetThere: "1) Reach Shrine of Amana.\n2) Explore to find the chest with Key to the Embedded.",
    howToObtain: "Open the chest. Cannot be upgraded; lost if used on the embedded.",
  },
  bluemoon_greatsword: {
    sourceType: "trade",
    where: "Benhart of Jugo — complete his quest",
    howToGetThere: "Summon Benhart for 3 boss fights and have him survive. Talk to him in Memory of Orro.",
    howToObtain: "Complete Benhart's quest.",
  },
  thorned_greatsword: {
    sourceType: "trade",
    where: "Ornifex — trade Soul of the Looking Glass Knight",
    howToGetThere: "Defeat Looking Glass Knight in Drangleic Castle. Trade at Ornifex.",
    howToObtain: "Trade Soul of the Looking Glass Knight.",
    cost: { special: "Soul of the Looking Glass Knight" },
  },
  watcher_greatsword: {
    sourceType: "boss",
    where: "Throne Watcher (Throne of Want) — ~5% drop",
    howToGetThere: "Defeat Throne Watcher and Throne Defender. Farm with ascetic if needed.",
    howToObtain: "Defeat Throne Watcher (rare drop).",
    farming: { enemy: "Throne Watcher", area: "Throne of Want", dropRate: "~5%" },
  },
  defender_greatsword: {
    sourceType: "boss",
    where: "Throne Defender (Throne of Want) — ~5% drop",
    howToGetThere: "Defeat Throne Watcher and Throne Defender.",
    howToObtain: "Defeat Throne Defender (rare drop).",
    farming: { enemy: "Throne Defender", area: "Throne of Want", dropRate: "~5%" },
  },
  scythe_of_want: {
    sourceType: "trade",
    where: "Ornifex — trade Soul of Nashandra",
    howToGetThere: "Defeat Nashandra. Trade soul at Ornifex.",
    howToObtain: "Trade Soul of Nashandra.",
    cost: { special: "Soul of Nashandra" },
  },
  bow_of_want: {
    sourceType: "trade",
    where: "Ornifex — trade Soul of the King",
    howToGetThere: "Obtain Soul of the King (from Nashandra fight). Trade at Ornifex.",
    howToObtain: "Trade Soul of the King.",
    cost: { special: "Soul of the King" },
  },
  moonlight_greatsword: {
    sourceType: "trade",
    where: "Ornifex — trade Paledrake Soul (NG+ Freja)",
    howToGetThere: "Defeat Duke's Dear Freja in NG+ or use Bonfire Ascetic. Trade Paledrake Soul at Ornifex.",
    howToObtain: "Trade Paledrake Soul.",
    cost: { special: "Paledrake Soul" },
  },
  curved_dragon_greatsword: {
    sourceType: "trade",
    where: "Ornifex — trade Soul of the Guardian Dragon",
    howToGetThere: "Defeat Guardian Dragon in Dragon Shrine. Trade at Ornifex.",
    howToObtain: "Trade Soul of the Guardian Dragon.",
    cost: { special: "Soul of the Guardian Dragon" },
  },
  dragonslayer_spear: {
    sourceType: "trade",
    where: "Ornifex — trade Soul of the Dragonrider",
    howToGetThere: "Defeat Dragonrider. Trade soul at Ornifex.",
    howToObtain: "Trade Soul of the Dragonrider.",
    cost: { special: "Soul of the Dragonrider" },
  },
  sun_sword: {
    sourceType: "gift",
    where: "Sunlight Covenant — rank 2 (20 sunlight medals)",
    howToGetThere: "1) Join Heirs of the Sun covenant.\n2) Earn 20 Sunlight Medals (co-op or farm).",
    howToObtain: "Reach rank 2 in Sunlight Covenant.",
  },
  puzzling_stone_sword: {
    sourceType: "chest",
    where: "Shulva, Sanctum City (DLC) — chest",
    howToGetThere: "1) Reach Shulva via the well in Black Gulch.\n2) Find the chest with Puzzling Stone Sword.",
    howToObtain: "Open the chest.",
  },
  helix_halberd: {
    sourceType: "chest",
    where: "Shulva, Sanctum City (DLC) — Pharros contraption",
    howToGetThere: "1) In Shulva, find the Pharros contraption near the water.\n2) Use Pharros Lockstone to reveal cave with Helix Halberd.",
    howToObtain: "Use Pharros Lockstone, loot from cave.",
  },
  fume_ultra_greatsword: {
    sourceType: "trade",
    where: "Ornifex — trade Soul of the Fume Knight",
    howToGetThere: "Defeat Fume Knight in Brume Tower (DLC). Trade at Ornifex.",
    howToObtain: "Trade Soul of the Fume Knight.",
    cost: { special: "Soul of the Fume Knight" },
  },
  bewitched_allonne_sword: {
    sourceType: "trade",
    where: "Ornifex — trade Soul of Sir Alonne",
    howToGetThere: "Defeat Sir Alonne in Memory (Brume Tower DLC). Trade at Ornifex.",
    howToObtain: "Trade Soul of Sir Alonne.",
    cost: { special: "Soul of Sir Alonne" },
  },
  ivory_king_ultra_greatsword: {
    sourceType: "trade",
    where: "Ornifex — trade Soul of the Ivory King",
    howToGetThere: "Defeat Ivory King in Eleum Loyce (DLC). Trade at Ornifex.",
    howToObtain: "Trade Soul of the Ivory King.",
    cost: { special: "Soul of the Ivory King" },
  },
  loyce_greatsword: {
    sourceType: "drop",
    where: "Loyce Knights (Eleum Loyce) — rare drop",
    howToGetThere: "1) Reach Eleum Loyce (DLC).\n2) Loyce Knights in the chaos battle area.",
    howToObtain: "Farm Loyce Knights.",
    farming: { enemy: "Loyce Knight", area: "Eleum Loyce", dropRate: "~2%" },
  },
  charred_loyce_greatsword: {
    sourceType: "drop",
    where: "Charred Loyce Knight (Eleum Loyce) — rare drop",
    howToGetThere: "1) Reach Eleum Loyce.\n2) Charred Loyce Knights in the Old Chaos.",
    howToObtain: "Farm Charred Loyce Knights.",
    farming: { enemy: "Charred Loyce Knight", area: "Eleum Loyce", dropRate: "~2%" },
  },
  rampart_golem_lance: {
    sourceType: "drop",
    where: "Rampart Golem (Aldia's Keep) — drop",
    howToGetThere: "1) Reach Aldia's Keep.\n2) Rampart Golems guard the area.",
    howToObtain: "Defeat Rampart Golems.",
    farming: { enemy: "Rampart Golem", area: "Aldia's Keep", dropRate: "Rare" },
  },
  greatsword: {
    sourceType: "chest",
    where: "No-Man's Wharf — chest in building",
    howToGetThere: "1) Reach No-Man's Wharf via Heide's Tower.\n2) In the main building, find the chest with the Greatsword.",
    howToObtain: "Open the chest.",
  },
  claymore: {
    sourceType: "buy",
    where: "Vengarl (Shaded Woods) — 4,000 souls",
    howToGetThere: "1) Reach Shaded Woods.\n2) Find Vengarl's head (foggy area) and body. Exhaust dialogue.",
    howToObtain: "Buy from Vengarl for 4,000 souls.",
    vendor: "Vengarl",
    cost: { souls: 4000 },
  },
  mastodon_halberd: {
    sourceType: "drop",
    where: "Mastodon (multiple areas) — drop",
    howToGetThere: "Mastodons appear in Doors of Pharros, Eleum Loyce, and other areas.",
    howToObtain: "Farm Mastodons.",
    farming: { enemy: "Mastodon", area: "Doors of Pharros / Eleum Loyce", dropRate: "~2%" },
  },
};
