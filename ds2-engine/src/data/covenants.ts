// [name, NPC/location, reward/rank info, linked_item_id]

export interface Covenant {
  name: string;
  location: string;
  note: string;
  ref: string;
}

export const COVENANTS: Covenant[] = [
  { name: "Way of Blue", location: "Saulden, Majula", note: "Kill 10 invaders = max rank", ref: "mj5" },
  { name: "Blue Sentinels", location: "Targray, Cathedral of Blue", note: "Token of Fidelity to join. PvP rank → spells", ref: "ht8" },
  { name: "Brotherhood of Blood", location: "Titchy Gren, Undead Purgatory", note: "PvP covenant. Rank → spells", ref: "hc10" },
  { name: "Heirs of the Sun", location: "Altar, Harvest Valley", note: "30 Sunlight Medals = max rank", ref: "hv5" },
  { name: "Bell Keepers", location: "Dwarf, Belfry Luna", note: "Kill 30 invaders → Hidden Weapon sorcery", ref: "lb10" },
  { name: "Rat King", location: "Rat King, Grave of Saints", note: "Pull players into your world", ref: "pt5" },
  { name: "Company of Champions", location: "Victor's Stone, Majula", note: "Harder difficulty. 50 Awestones → Vanquisher's Seal", ref: "mj8" },
  { name: "Pilgrims of Dark", location: "Grandahl (3 locations)", note: "Dark Chasm access → Darklurker → hex spells", ref: "dc5" },
  { name: "Dragon Remnants", location: "Magerold, Iron Keep (give Petrified Egg)", note: "Dragon duels → Dragon stones", ref: "da5" },
];
