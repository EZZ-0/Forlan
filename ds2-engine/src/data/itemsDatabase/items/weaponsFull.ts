/**
 * DS2 SotFS — Full weapons stats from Fextralife Weapons Sortable.
 * Source: https://darksouls2.wiki.fextralife.com/Weapons+Sortable
 * Merges with fullList; weapons.ts overrides for location/guidance.
 * Catalysts (staves, chimes, flames) are in catalysts.ts — excluded here.
 */

import type { ItemDatabaseEntry } from "../types";

function toId(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9_]/g, "");
}

/** Fextralife name -> fullList id for items with spelling differences */
const ID_ALIASES: Record<string, string> = {
  "Craftsman's Hammer": "craftmans_hammer", // fullList: Craftman's
  "Twin-headed Greatbow": "twinheaded_greatbow", // fullList: Twin-Headed
};

function getId(name: string): string {
  return ID_ALIASES[name] ?? toId(name);
}

function mk(
  name: string,
  weaponClass: string,
  damage: Partial<Record<"physical" | "magic" | "fire" | "lightning" | "dark", number>>,
  scaling: Partial<Record<"str" | "dex" | "int" | "fth", string>>,
  requirements: Partial<Record<"str" | "dex" | "int" | "fth", number>>,
  weight: number,
  durability: number,
  specialEffect?: string
): ItemDatabaseEntry {
  const id = getId(name);
  const stats: ItemDatabaseEntry["stats"] = {};
  if (Object.keys(requirements).length) stats.requirements = requirements;
  if (Object.keys(damage).length) stats.damage = damage;
  if (Object.keys(scaling).length) stats.scaling = scaling as Record<string, string>;

  return {
    id,
    name,
    category: "weapon",
    subcategory: { weaponClass },
    weight,
    stats,
    durability,
    ...(specialEffect && { description: specialEffect }),
    source: "fextralife",
    sourceUrl: "https://darksouls2.wiki.fextralife.com/Weapons+Sortable",
  };
}

export const DB_WEAPONS_FULL: ItemDatabaseEntry[] = [
  // Daggers
  mk("Dagger", "Dagger", { physical: 115 }, { str: "E", dex: "A" }, { str: 2, dex: 6 }, 0.5, 60),
  mk("Royal Dirk", "Dagger", { physical: 150 }, { str: "D", dex: "B" }, { str: 11, dex: 15 }, 2, 90),
  mk("Bandit's Knife", "Dagger", { physical: 130, magic: 100 }, { str: "C" }, { str: 3, dex: 11 }, 1, 60),
  mk("Shadow Dagger", "Dagger", { physical: 120 }, { str: "B", dex: "D" }, { str: 4, dex: 16 }, 1.5, 60),
  mk("Thief Dagger", "Dagger", { physical: 158 }, { str: "E" }, { str: 2, dex: 7 }, 0.5, 30),
  mk("Parrying Dagger", "Dagger", { physical: 80 }, { str: "E", dex: "A" }, { str: 4, dex: 9 }, 0.5, 60),
  mk("Black Flamestone Dagger", "Dagger", { physical: 140 }, { str: "C", dex: "D" }, { str: 10, dex: 12 }, 4, 50),
  mk("Manikin Knife", "Dagger", { physical: 105, magic: 80 }, { str: "D", dex: "C" }, { str: 6, dex: 14 }, 1, 80),
  mk("Blue Dagger", "Dagger", { physical: 100 }, { str: "E", dex: "C" }, { str: 6, dex: 14 }, 0.5, 60, "+5% spell damage"),
  mk("Mytha's Bent Blade", "Dagger", { physical: 100, magic: 100 }, { str: "B" }, { str: 5, dex: 20 }, 0.5, 40),
  mk("Umbral Dagger", "Dagger", { physical: 70 }, { str: "S" }, { str: 12, dex: 20 }, 2, 30, "Bonus backstab damage"),
  mk("Retainer's Short Sword", "Dagger", { physical: 70, magic: 90 }, { str: "E", dex: "E", int: "C" }, { str: 5, dex: 15, int: 19 }, 1, 30),
  // Straight Swords
  mk("Shortsword", "Straight Sword", { physical: 200 }, { str: "C", dex: "C" }, { str: 7, dex: 10 }, 2, 60),
  mk("Longsword", "Straight Sword", { physical: 225 }, { str: "C", dex: "C" }, { str: 10, dex: 9 }, 3, 60),
  mk("Broadsword", "Straight Sword", { physical: 240 }, { str: "B", dex: "D" }, { str: 11, dex: 6 }, 3, 60),
  mk("Foot Soldier Sword", "Straight Sword", { physical: 230 }, { str: "C", dex: "E" }, { str: 7, dex: 6 }, 2, 20),
  mk("Varangian Sword", "Straight Sword", { physical: 250 }, { str: "C", dex: "C" }, { str: 14, dex: 6 }, 5, 40),
  mk("Heide Knight Sword", "Straight Sword", { physical: 150, magic: 90 }, { str: "C", dex: "C", int: "C" }, { str: 11, dex: 10 }, 4, 70),
  mk("Drakekeeper's Sword", "Straight Sword", { physical: 245 }, { str: "C", dex: "C" }, { str: 16, dex: 8 }, 6, 90),
  mk("Sun Sword", "Straight Sword", { physical: 175 }, { str: "A", dex: "A" }, { str: 15, dex: 13 }, 3, 60),
  mk("Red Rust Sword", "Straight Sword", { physical: 205 }, { str: "S", dex: "E" }, { str: 23, dex: 13 }, 8, 80),
  mk("Broken Straight Sword", "Straight Sword", { physical: 160 }, { str: "C" }, { str: 2, dex: 3 }, 2, 40),
  mk("Puzzling Stone Sword", "Straight Sword", { physical: 145 }, { str: "E", dex: "S" }, { str: 7, dex: 6 }, 2, 60),
  mk("Ashen Warrior Sword", "Straight Sword", { physical: 180, magic: 100 }, { str: "C", dex: "B" }, { str: 10, dex: 18 }, 3, 30),
  mk("Fume Sword", "Straight Sword", { physical: 140, magic: 70 }, { str: "S", dex: "C" }, { str: 15, dex: 22 }, 3, 40),
  mk("Possessed Armor Sword", "Straight Sword", { physical: 170, magic: 100 }, { str: "E", dex: "E", int: "C" }, { str: 20, dex: 13 }, 5, 50),
  mk("Ivory Straight Sword", "Straight Sword", { physical: 225 }, {}, { str: 6 }, 0.5, 250),
  mk("Blue Flame", "Straight Sword", { physical: 130, magic: 180 }, { str: "E", dex: "D", int: "C" }, { str: 13, dex: 15 }, 3, 60, "R2 casts sorceries"),
  // Greatswords
  mk("Bastard Sword", "Greatsword", { physical: 280 }, { str: "C", dex: "C" }, { str: 20, dex: 11 }, 6, 60),
  mk("Claymore", "Greatsword", { physical: 290 }, { str: "C", dex: "C" }, { str: 20, dex: 13 }, 8, 60),
  mk("Drangleic Sword", "Greatsword", { physical: 270 }, { str: "C", dex: "A" }, { str: 25, dex: 20 }, 9, 70),
  mk("Bluemoon Greatsword", "Greatsword", { physical: 375, magic: 28 }, {}, { str: 28, dex: 10 }, 15, 30),
  mk("Flamberge", "Greatsword", { physical: 250, magic: 100 }, { str: "D", dex: "S" }, { str: 16, dex: 15 }, 7, 60),
  mk("Royal Greatsword", "Greatsword", { physical: 270, magic: 100 }, { str: "B", dex: "D" }, { str: 20, dex: 15 }, 6, 70),
  mk("Old Knight Greatsword", "Greatsword", { physical: 280 }, { str: "A", dex: "E" }, { str: 17, dex: 12 }, 13, 30),
  mk("Mastodon Greatsword", "Greatsword", { physical: 300 }, { str: "A", dex: "E" }, { str: 30, dex: 12 }, 16, 70),
  mk("Black Dragon Greatsword", "Greatsword", { physical: 300, magic: 20 }, {}, { str: 25, dex: 16 }, 9, 60),
  mk("Defender Greatsword", "Greatsword", { physical: 200, magic: 80 }, { str: "C", dex: "D", int: "C" }, { str: 20, dex: 12 }, 15, 50),
  mk("Watcher Greatsword", "Greatsword", { physical: 185, magic: 150 }, { str: "E", dex: "D", int: "B" }, { str: 18, dex: 16 }, 15, 50),
  mk("Thorned Greatsword", "Greatsword", { physical: 210, magic: 80 }, { str: "C", dex: "C", int: "C" }, { str: 20, dex: 15 }, 14, 85),
  mk("Drakeblood Greatsword", "Greatsword", { physical: 232, magic: 50, fire: 50 }, { str: "E", dex: "S" }, { str: 20, dex: 18 }, 6, 60),
  mk("Ruler's Sword", "Greatsword", { physical: 280 }, { str: "C", dex: "C" }, { str: 20, dex: 20 }, 16, 60, "Scales with souls held"),
  mk("Charred Loyce Greatsword", "Greatsword", { physical: 180, magic: 90 }, { str: "C", dex: "B", int: "C" }, { str: 25, dex: 28 }, 9, 40),
  mk("Loyce Greatsword", "Greatsword", { physical: 230 }, { str: "E", dex: "S" }, { str: 25, dex: 28 }, 8, 60),
  mk("Greatsword of the Forlorn", "Greatsword", { physical: 220, magic: 80, dark: 140 }, { str: "C", dex: "D", int: "C" }, { str: 20, dex: 15 }, 10, 65),
  mk("Majestic Greatsword", "Greatsword", { physical: 290 }, { str: "B", dex: "D" }, { str: 25, dex: 25 }, 20, 60),
  // Ultra Greatswords
  mk("Greatsword", "Ultra Greatsword", { physical: 400 }, { str: "S", dex: "D" }, { str: 28, dex: 10 }, 22, 70),
  mk("Zweihander", "Ultra Greatsword", { physical: 360 }, { str: "B", dex: "C" }, { str: 24, dex: 12 }, 12, 60),
  mk("Pursuer's Ultra Greatsword", "Ultra Greatsword", { physical: 390 }, { str: "A", dex: "C" }, { str: 30, dex: 18 }, 18, 60),
  mk("Crypt Blacksword", "Ultra Greatsword", { physical: 370, dark: 130 }, { str: "C", dex: "D", int: "A", fth: "A" }, { str: 40, dex: 10 }, 12, 70),
  mk("Lost Sinner's Sword", "Ultra Greatsword", { physical: 460 }, { str: "B", dex: "D" }, { str: 24, dex: 18 }, 12, 50),
  mk("Smelter Sword", "Ultra Greatsword", { physical: 350, fire: 170 }, { str: "C", dex: "D", int: "C" }, { str: 40, dex: 10 }, 22, 70),
  mk("Fume Ultra Greatsword", "Ultra Greatsword", { physical: 430 }, { str: "S", dex: "D" }, { str: 40, dex: 30 }, 28, 70),
  mk("Drakewing Ultra Greatsword", "Ultra Greatsword", { physical: 355 }, { str: "D", dex: "B" }, { str: 20, dex: 18 }, 12, 70),
  mk("Drakekeeper's Ultra Greatsword", "Ultra Greatsword", { physical: 330 }, { str: "S", dex: "D" }, { str: 38, dex: 13 }, 20, 110),
  mk("Ivory King Ultra Greatsword", "Ultra Greatsword", { physical: 300, magic: 80, dark: 140 }, { str: "B", dex: "B", int: "E" }, { str: 30, dex: 30 }, 8, 200),
  // Curved Swords
  mk("Scimitar", "Curved Sword", { physical: 220 }, { str: "E", dex: "A" }, { str: 7, dex: 16 }, 1.5, 40),
  mk("Falchion", "Curved Sword", { physical: 240, magic: 80 }, { str: "E", dex: "A" }, { str: 9, dex: 13 }, 2.5, 45),
  mk("Red Rust Scimitar", "Curved Sword", { physical: 270 }, { str: "C", dex: "E" }, { str: 18, dex: 15 }, 6, 60),
  mk("Warped Sword", "Curved Sword", { physical: 250 }, { str: "E", dex: "A" }, { str: 15, dex: 25 }, 3.5, 50),
  mk("Manikin Sabre", "Curved Sword", { physical: 245, magic: 100 }, { str: "D", dex: "B" }, { str: 6, dex: 19 }, 2.5, 45),
  mk("Spider Fang", "Curved Sword", { physical: 210 }, { str: "E", dex: "A" }, { str: 10, dex: 25 }, 2, 40),
  mk("Melu Scimitar", "Curved Sword", { physical: 250 }, { str: "D", dex: "C" }, { str: 12, dex: 9 }, 4, 75),
  mk("Monastery Scimitar", "Curved Sword", { physical: 190 }, { str: "E", dex: "S" }, { str: 9, dex: 22 }, 1.5, 40),
  mk("Eleum Loyce", "Curved Sword", { physical: 165, magic: 60 }, { str: "E", dex: "S" }, { str: 18, dex: 27 }, 11, 90),
  // Katanas
  mk("Uchigatana", "Katana", { physical: 230 }, { str: "E", dex: "A" }, { str: 10, dex: 16 }, 5, 40),
  mk("Washing Pole", "Katana", { physical: 240 }, { str: "E", dex: "A" }, { str: 18, dex: 20 }, 10, 20),
  mk("Blacksteel Katana", "Katana", { physical: 190 }, { str: "S" }, { str: 14, dex: 25 }, 8, 40),
  mk("Chaos Blade", "Katana", { physical: 250 }, { str: "S" }, { str: 12, dex: 25 }, 6, 50),
  mk("Manslayer", "Katana", { physical: 230, magic: 100 }, { str: "E", dex: "A" }, { str: 11, dex: 18 }, 6, 40),
  mk("Darkdrift", "Katana", { physical: 260 }, { str: "A" }, { str: 12, dex: 28 }, 3, 20),
  mk("Berserker Blade", "Katana", { physical: 240 }, { str: "D", dex: "B" }, { str: 18, dex: 18 }, 6, 40),
  mk("Bewitched Alonne Sword", "Katana", { physical: 180, magic: 80 }, { str: "S" }, { str: 22, dex: 30 }, 9, 30),
  // Piercing Swords
  mk("Rapier", "Piercing Sword", { physical: 230 }, { str: "D", dex: "B" }, { str: 5, dex: 12 }, 1.5, 45),
  mk("Estoc", "Piercing Sword", { physical: 210 }, { str: "B", dex: "D" }, { str: 12, dex: 12 }, 3, 45),
  mk("Ricard's Rapier", "Piercing Sword", { physical: 160 }, { str: "S" }, { str: 8, dex: 25 }, 2, 45),
  mk("Espada Ropera", "Piercing Sword", { physical: 235 }, { str: "E", dex: "A" }, { str: 11, dex: 18 }, 2, 80),
  mk("Spider's Silk", "Piercing Sword", { physical: 195 }, { str: "S" }, { str: 5, dex: 20 }, 0.5, 30),
  mk("Black Scorpion Stinger", "Piercing Sword", { physical: 300, magic: 100 }, {}, { str: 10, dex: 18 }, 2, 30),
  mk("Ice Rapier", "Piercing Sword", { physical: 220, magic: 60 }, { str: "D", dex: "B" }, { str: 13, dex: 15 }, 1.5, 50),
  mk("Chaos Rapier", "Piercing Sword", { physical: 110, magic: 110 }, { str: "A", dex: "B" }, { str: 7, dex: 14 }, 13, 45),
  mk("Mail Breaker", "Piercing Sword", { physical: 150 }, { str: "C", dex: "C" }, { str: 5, dex: 12 }, 0.5, 45),
  // Axes
  mk("Hand Axe", "Axe", { physical: 270 }, { str: "B" }, { str: 9, dex: 3 }, 2, 50),
  mk("Battle Axe", "Axe", { physical: 280 }, { str: "B", dex: "D" }, { str: 15, dex: 5 }, 4, 60),
  mk("Bandit Axe", "Axe", { physical: 310 }, { str: "B" }, { str: 18, dex: 5 }, 5, 50),
  mk("Butcher's Knife", "Axe", { physical: 280 }, { str: "A" }, { str: 25, dex: 8 }, 16, 40),
  mk("Infantry Axe", "Axe", { physical: 200 }, { str: "B", dex: "D" }, { str: 9, dex: 1 }, 3.5, 30),
  mk("Gyrm Axe", "Axe", { physical: 380 }, { str: "A", dex: "E" }, { str: 28, dex: 6 }, 18, 120),
  mk("Dragonslayer's Crescent Axe", "Axe", { physical: 200, lightning: 60 }, { str: "C", dex: "E", int: "C" }, { str: 18, dex: 12 }, 7, 60),
  mk("Bound Hand Axe", "Axe", { physical: 180, magic: 100 }, { str: "A" }, { str: 15, dex: 7 }, 3.5, 60),
  mk("Crescent Axe", "Great Axe", { physical: 210, lightning: 80 }, { str: "B", dex: "C", int: "E" }, { str: 25, dex: 14 }, 12, 60),
  // Hammers
  mk("Club", "Hammer", { physical: 210 }, { str: "S" }, { str: 12, dex: 3 }, 3, 50),
  mk("Mace", "Hammer", { physical: 240 }, { str: "A", dex: "E" }, { str: 12, dex: 5 }, 4, 60),
  mk("Morning Star", "Hammer", { physical: 220, magic: 120 }, { str: "A" }, { str: 15, dex: 7 }, 4, 60),
  mk("Reinforced Club", "Hammer", { physical: 280 }, { str: "A" }, { str: 16, dex: 3 }, 4, 20),
  mk("Blacksmith's Hammer", "Hammer", { physical: 290 }, { str: "B" }, { str: 15, dex: 7 }, 5, 60),
  mk("Homunculus Mace", "Hammer", { physical: 290 }, { str: "B", dex: "E" }, { str: 14, dex: 9 }, 6, 60),
  mk("Craftsman's Hammer", "Hammer", { physical: 250 }, { str: "B" }, { str: 20, dex: 10 }, 3, 80),
  mk("Barbed Club", "Hammer", { physical: 270, magic: 100 }, { str: "C", dex: "C" }, { str: 20, dex: 18 }, 5, 60),
  mk("Aldia Hammer", "Hammer", { physical: 240 }, { str: "C", dex: "C" }, { str: 18, dex: 16 }, 3.5, 60),
  mk("Pickaxe", "Hammer", { physical: 300 }, { str: "A" }, { str: 22, dex: 8 }, 8, 60),
  // Great Hammers
  mk("Large Club", "Great Hammer", { physical: 360 }, { str: "S" }, { str: 26, dex: 4 }, 12, 70),
  mk("Great Club", "Great Hammer", { physical: 420 }, { str: "A" }, { str: 28, dex: 4 }, 15, 70),
  mk("Dragon Tooth", "Great Hammer", { physical: 470 }, { str: "A" }, { str: 50, dex: 10 }, 20, 70),
  mk("Sacred Chime Hammer", "Great Hammer", { physical: 380, dark: 150 }, { str: "B", int: "B", fth: "B" }, { str: 40, dex: 12 }, 12, 70),
  mk("Old Iron King Hammer", "Great Hammer", { physical: 280, fire: 180 }, { str: "A", dex: "D", int: "C" }, { str: 50, dex: 8 }, 24, 80),
  mk("Sanctum Mace", "Great Hammer", { physical: 400, dark: 88 }, { str: "A" }, { str: 35, dex: 6 }, 17, 30),
  mk("Archdrake Mace", "Great Hammer", { physical: 250 }, { str: "A", dex: "D" }, { str: 20, dex: 16 }, 6, 60),
  // Spears
  mk("Spear", "Spear", { physical: 210 }, { str: "C", dex: "A" }, { str: 9, dex: 12 }, 3.5, 50),
  mk("Winged Spear", "Spear", { physical: 240 }, { str: "E", dex: "A" }, { str: 11, dex: 18 }, 4.5, 50),
  mk("Partizan", "Spear", { physical: 230 }, { str: "E", dex: "S" }, { str: 12, dex: 20 }, 4.5, 60),
  mk("Pike", "Spear", { physical: 190 }, { str: "C", dex: "A" }, { str: 12, dex: 16 }, 8, 50),
  mk("Heide Spear", "Spear", { physical: 210, lightning: 100 }, { str: "D", dex: "C", int: "C" }, { str: 12, dex: 25 }, 8, 60),
  mk("Pate's Spear", "Spear", { physical: 270 }, { str: "E", dex: "B" }, { str: 11, dex: 27 }, 6, 50),
  mk("Stone Soldier Spear", "Spear", { physical: 190 }, { str: "C", dex: "A" }, { str: 16, dex: 20 }, 7, 50),
  mk("Silverblack Spear", "Spear", { physical: 150, dark: 110 }, { str: "C", dex: "C", int: "C" }, { str: 9, dex: 16 }, 8, 50),
  mk("Gargoyle Bident", "Spear", { physical: 260 }, { str: "A" }, { str: 22, dex: 15 }, 12, 60),
  mk("Dragonslayer Spear", "Spear", { physical: 180, lightning: 105 }, { str: "E", dex: "A", int: "C" }, { str: 16, dex: 25 }, 14, 60),
  mk("Spitfire Spear", "Spear", { physical: 160, fire: 120 }, { str: "E", dex: "E", int: "C" }, { str: 10, dex: 18 }, 10, 65),
  mk("Channeler's Trident", "Spear", { physical: 240 }, { str: "E", dex: "A" }, { str: 11, dex: 15 }, 4, 40),
  mk("Yorgh's Spear", "Spear", { physical: 300 }, { str: "B", dex: "B" }, { str: 30, dex: 25 }, 19, 90),
  mk("Santier's Spear", "Halberd", { physical: 350 }, {}, { str: 20, dex: 22 }, 16, 500, "Infinite durability when broken"),
  // Halberds
  mk("Halberd", "Halberd", { physical: 350 }, { str: "B", dex: "C" }, { str: 20, dex: 14 }, 6, 70),
  mk("Lucerne", "Halberd", { physical: 325 }, { str: "B", dex: "E" }, { str: 18, dex: 14 }, 6.5, 60),
  mk("Scythe", "Halberd", { physical: 330 }, { str: "B", dex: "D" }, { str: 20, dex: 11 }, 5, 60),
  mk("Mastodon Halberd", "Halberd", { physical: 410 }, { str: "A" }, { str: 26, dex: 15 }, 19, 70),
  mk("Dragonrider's Halberd", "Halberd", { physical: 250, magic: 120 }, { str: "B", dex: "C", int: "C" }, { str: 18, dex: 17 }, 12, 70),
  mk("Helix Halberd", "Halberd", { physical: 280 }, { str: "A" }, { str: 16, dex: 20 }, 9, 70),
  mk("Old Knight Halberd", "Halberd", { physical: 360 }, { str: "C", dex: "A" }, { str: 16, dex: 20 }, 15, 20),
  mk("Red Iron Twinblade", "Twinblade", { physical: 340 }, { str: "A" }, { str: 26, dex: 20 }, 14, 175),
  // Reapers
  mk("Great Scythe", "Reaper", { physical: 280 }, { str: "E", dex: "A" }, { str: 12, dex: 14 }, 5, 60),
  mk("Bone Scythe", "Reaper", { physical: 325 }, { str: "A" }, { str: 28, dex: 20 }, 10, 40),
  mk("Silverblack Sickle", "Reaper", { physical: 160, dark: 105 }, { str: "C", dex: "C", int: "C" }, { str: 15, dex: 10 }, 8, 60),
  mk("Full Moon Sickle", "Reaper", { physical: 280, magic: 160 }, { str: "D", dex: "B" }, { str: 20, dex: 18 }, 8, 90),
  mk("Scythe of Want", "Reaper", { physical: 260, dark: 200 }, { str: "D", dex: "B", int: "C" }, { str: 14, dex: 20 }, 18, 60),
  mk("Scythe of Nahr Alma", "Reaper", { physical: 173, magic: 100 }, { str: "D", dex: "B", int: "C" }, { str: 14, dex: 12 }, 12, 50),
  mk("Crescent Sickle", "Reaper", { physical: 200, dark: 150 }, { str: "E", dex: "C", int: "C" }, { str: 12, dex: 19 }, 8, 50),
  mk("Great Machete", "Reaper", { physical: 270 }, { str: "B", dex: "D" }, { str: 18, dex: 16 }, 6, 30),
  // Whips
  mk("Whip", "Whip", { physical: 210 }, { str: "A" }, { str: 6, dex: 17 }, 1.5, 50),
  mk("Notched Whip", "Whip", { physical: 205, magic: 200 }, { str: "A" }, { str: 12, dex: 20 }, 2, 50),
  mk("Bloodied Whip", "Whip", { physical: 260 }, { str: "D", dex: "C" }, { str: 10, dex: 15 }, 3, 60),
  mk("Spotted Whip", "Whip", { physical: 195, magic: 200 }, { str: "B" }, { str: 9, dex: 25 }, 2, 60),
  mk("Old Whip", "Whip", { physical: 350 }, { str: "E", dex: "B" }, { str: 7, dex: 20 }, 2.5, 40),
  // Bows
  mk("Short Bow", "Bow", { physical: 130 }, { str: "D", dex: "A" }, { str: 7, dex: 12 }, 1, 60),
  mk("Long Bow", "Bow", { physical: 150 }, { str: "D", dex: "A" }, { str: 10, dex: 16 }, 2, 60),
  mk("Composite Bow", "Bow", { physical: 165 }, { str: "C", dex: "C" }, { str: 14, dex: 18 }, 2, 60),
  mk("Dragonrider Bow", "Bow", { physical: 180, magic: 100 }, { str: "B", dex: "D", int: "C" }, { str: 20, dex: 18 }, 3, 40),
  mk("Hunter's Blackbow", "Bow", { physical: 155 }, { str: "E", dex: "S" }, { str: 9, dex: 25 }, 2, 70),
  mk("Alonne Greatbow", "Greatbow", { physical: 260 }, { str: "C", dex: "C" }, { str: 20, dex: 25 }, 8, 70),
  mk("Dragonslayer Greatbow", "Greatbow", { physical: 290 }, { str: "B", dex: "C" }, { str: 30, dex: 20 }, 10, 70),
  // Crossbows
  mk("Light Crossbow", "Crossbow", { physical: 250 }, {}, { str: 13, dex: 4 }, 3, 60),
  mk("Heavy Crossbow", "Crossbow", { physical: 290, magic: 20 }, {}, { str: 20, dex: 6 }, 4, 70),
  mk("Avelyn", "Crossbow", { physical: 170, magic: 25 }, {}, { str: 15, dex: 6 }, 10, 40),
  // Fist & Claws
  mk("Caestus", "Fist & Claws", { physical: 90 }, { str: "A", dex: "A" }, { str: 10, dex: 7 }, 0.5, 60),
  mk("Claws", "Fist & Claws", { physical: 155, magic: 132 }, { str: "E", dex: "A" }, { str: 9, dex: 10 }, 1, 30),
  mk("Manikin Claws", "Fist & Claws", { physical: 150, magic: 100 }, { str: "C", dex: "C" }, { str: 9, dex: 18 }, 1.5, 50),
  mk("Malformed Claws", "Fist & Claws", { physical: 130 }, { str: "B", dex: "D" }, { str: 16, dex: 14 }, 1.5, 50),
  mk("Bone Fist", "Fist & Claws", { physical: 20 }, { str: "S", dex: "A" }, { str: 15, dex: 30 }, 1, 80),
  mk("Work Hook", "Fist & Claws", { physical: 40, magic: 100 }, { str: "C" }, { str: 6, dex: 10 }, 1, 40),
  // Twinblades
  mk("Twinblade", "Twinblade", { physical: 150 }, { str: "C", dex: "C" }, { str: 14, dex: 26 }, 8, 210),
  mk("Stone Twinblade", "Twinblade", { physical: 180 }, { str: "A", dex: "D" }, { str: 18, dex: 22 }, 10, 120),
  mk("Dragonrider Twinblade", "Twinblade", { physical: 185, magic: 110 }, { str: "D", dex: "C", int: "C" }, { str: 20, dex: 22 }, 18, 120),
  mk("Red Iron Twinblade", "Twinblade", { physical: 340 }, { str: "A" }, { str: 26, dex: 20 }, 14, 175),
  mk("Curved Twinblade", "Twinblade", { physical: 170, magic: 40 }, { str: "E", dex: "B" }, { str: 16, dex: 20 }, 10, 125),
  // Lances
  mk("Heide Lance", "Lance", { physical: 230, lightning: 100 }, { str: "C", dex: "E", int: "C" }, { str: 18, dex: 12 }, 8, 60),
  mk("Heide Greatlance", "Lance", { physical: 270, lightning: 80 }, { str: "B", dex: "E", int: "C" }, { str: 20, dex: 16 }, 10, 50),
  mk("Grand Lance", "Lance", { physical: 340 }, { str: "C", dex: "C" }, { str: 22, dex: 18 }, 12, 105),
  mk("Chariot Lance", "Lance", { physical: 310, lightning: 100 }, { str: "A", dex: "E" }, { str: 30, dex: 18 }, 16, 70),
  mk("Rampart Golem Lance", "Lance", { physical: 200, magic: 100 }, { str: "A", dex: "C" }, { str: 35, dex: 20 }, 16, 40),
  // Key to the Embedded (weapon)
  mk("Key to the Embedded", "Greatsword", { physical: 220 }, { str: "D", dex: "A" }, { str: 15, dex: 20 }, 4, 60),
];
