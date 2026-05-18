/**
 * Weapon progression guide — where to get, upgrade path, infusion for Dark Melee Hexer build.
 */

export interface WeaponGuide {
  name: string;
  endName: string; // e.g. "Dark Uchigatana +10"
  role: string;
  phase: number;
  whereBase: string;
  upgradePath: {
    smith: string;
    materials: string;
    notes?: string;
  };
  infusion?: {
    when: string; // Phase or SL
    where: string;
    prereq?: string; // e.g. "Dull Ember to McDuff"
    notes?: string;
  };
  stats: string;
}

export const WEAPON_GUIDES: WeaponGuide[] = [
  {
    name: "Fire Longsword",
    endName: "Fire Longsword +10",
    role: "Early + fire backup",
    phase: 1,
    whereBase: "Forest of Fallen Giants — chest past salamander pit (already Fire-infused)",
    upgradePath: {
      smith: "Lenigrast (Majula) — need House Key from FoFG",
      materials: "Titanite Shard ×6 → Large ×4 → Chunk ×4 → Slab ×1",
      notes: "Get ASAP. Primary weapon until DEX 20 / Dark Uchi.",
    },
    infusion: undefined, // already fire
    stats: "10 STR / 9 DEX (2H at 7 STR)",
  },
  {
    name: "Lightning Mace",
    endName: "Lightning Mace +10",
    role: "Dark-resistant swap",
    phase: 1,
    whereBase: "Majula — buy Mace from Lenigrast (after FoFG)",
    upgradePath: {
      smith: "Lenigrast",
      materials: "Titanite Shard ×6 → Large ×4 → Chunk ×4 → Slab ×1",
      notes: "Upgrade first, infuse after Dull Ember.",
    },
    infusion: {
      when: "Phase 1–2 (after Lost Bastille)",
      where: "McDuff (Lost Bastille)",
      prereq: "Dull Ember — from chest near Pursuer encounter (Belfry Luna side or Soldiers’ Rest)",
      notes: "Lightning for dark-resistant bosses.",
    },
    stats: "12 STR",
  },
  {
    name: "Sunset Staff",
    endName: "Sunset Staff +5",
    role: "Primary dark catalyst",
    phase: 3,
    whereBase: "Huntsman's Copse — Felkin (20 INT / 20 FTH BASE stats; gear doesn't count) — FREE",
    upgradePath: {
      smith: "McDuff or Lenigrast",
      materials: "Twinkling Titanite ×15 (+5 max)",
      notes: "20/20 BASE stats only — equipment/rings don't count. Infuse Dark for hex damage.",
    },
    infusion: {
      when: "Phase 3 (once 20/20)",
      where: "McDuff",
      prereq: "Dull Ember",
      notes: "Dark infusion = best for hex spells.",
    },
    stats: "22 INT / 22 FTH",
  },
  {
    name: "Dark Uchigatana",
    endName: "Dark Uchigatana +10",
    role: "Primary melee",
    phase: 4,
    whereBase: "Huntsman's Copse — buy from McDuff, or drop from Alonne Captain",
    upgradePath: {
      smith: "McDuff (Large Shards) or Lenigrast",
      materials: "Shard ×6 → Large ×4 → Chunk ×4 → Slab ×1",
      notes: "Get at DEX 20 (SL ~79). Upgrade to +10, then infuse Dark.",
    },
    infusion: {
      when: "Phase 4 — SL 79+ (DEX 20)",
      where: "McDuff (Lost Bastille)",
      prereq: "Dull Ember",
      notes: "Dark infusion + Dark Weapon buff = core damage.",
    },
    stats: "14 STR / 20 DEX",
  },
  {
    name: "Staff of Wisdom",
    endName: "Staff of Wisdom +5",
    role: "Pure sorcery catalyst",
    phase: 6,
    whereBase: "Dragon Shrine — trade Paledrake Soul (Freja NG+) to Ornifex, or crystal lizard",
    upgradePath: {
      smith: "McDuff or Ornifex",
      materials: "Twinkling Titanite ×15 (+5 max)",
      notes: "Late-game. 50 INT req (can spice to ~40).",
    },
    infusion: {
      when: "Phase 6",
      where: "McDuff",
      notes: "Magic infusion for sorcery. Optional; hex focus until NG+.",
    },
    stats: "50 INT (spiced)",
  },
  {
    name: "Pyromancy Flame",
    endName: "Pyromancy Flame +10",
    role: "Fire spells",
    phase: 3,
    whereBase: "Shaded Woods — Rosabeth (after unpetrify with Fragrant Branch)",
    upgradePath: {
      smith: "Rosabeth (Shaded Woods) or any pyromancy trainer",
      materials: "Fire Seeds — from enemies, chests, Straid/Chloanne",
      notes: "No infusion. Scales with combined INT+FTH.",
    },
    infusion: undefined,
    stats: "None",
  },
];

/** Infusion unlock — Dull Ember to McDuff */
export const INFUSION_UNLOCK = {
  item: "Dull Ember",
  location: "Lost Bastille — chest near Pursuer encounter (Soldiers’ Rest / Belfry Luna side)",
  giveTo: "McDuff (sitting in room past explosive wall)",
  unlocks: "All infusions (Dark, Lightning, Magic, Fire, etc.)",
};

/** Upgrade tiers — Titanite progression */
export const UPGRADE_TIERS = [
  { tier: "+1 to +3", material: "Titanite Shard", smith: "Lenigrast, McDuff" },
  { tier: "+4 to +6", material: "Large Titanite Shard", smith: "McDuff (unlimited), Chloanne" },
  { tier: "+7 to +9", material: "Titanite Chunk", smith: "Chloanne (limited, unlocks with bosses)" },
  { tier: "+10", material: "Titanite Slab", smith: "McDuff (14k souls spent), rare drops, chests" },
];
