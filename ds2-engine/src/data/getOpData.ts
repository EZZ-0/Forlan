/**
 * Get OP — DS2 SotFS curated data for becoming overpowered early.
 * Progression paths, early OP builds, soul duplication (with caveats), leveling strategies, video guides.
 */

export interface GetOpProgressionStep {
  order: number;
  area: string;
  areaId: string;
  goal: string;
  soulsEstimate?: number;
  keyItems?: string[];
}

export interface GetOpEarlyBuild {
  id: string;
  name: string;
  description: string;
  buildTemplateId?: string;
  keyWeapons: string[];
  keySpells?: string[];
  stats: string;
  soulMemoryTarget?: number;
}

export interface GetOpDupingMethod {
  id: string;
  name: string;
  description: string;
  status: "patched" | "works" | "soft_ban_risk" | "offline_only";
  platform?: "pc" | "console" | "all";
  source?: string;
}

export interface GetOpLevelingTip {
  id: string;
  stat: string;
  priority: string;
  target: string;
  reason: string;
}

export interface GetOpVideoGuide {
  id: string;
  title: string;
  channel: string;
  url: string;
  videoId: string;
  description?: string;
  category: "build" | "duping" | "progression" | "general";
  duration?: string;
}

/** Optimal early-game progression route to unlock key gear and souls */
export const GET_OP_PROGRESSION: GetOpProgressionStep[] = [
  { order: 1, area: "Things Betwixt", areaId: "things_betwixt", goal: "Grab Human Effigy, Silky Stone, Bonfire Ascetic (gift). Kill Ogre for Stone Ring.", soulsEstimate: 0, keyItems: ["Stone Ring", "Bonfire Ascetic"] },
  { order: 2, area: "Majula", areaId: "majula", goal: "Estus Flask, Tseldora set (soul boost), Silvercat Ring, titanite shard.", soulsEstimate: 0, keyItems: ["Tseldora Set", "Silvercat Ring"] },
  { order: 3, area: "Heide's Tower of Flame", areaId: "heides_tower", goal: "Dragonrider cheese (7-step fall). ~15k souls. Licia for Huntsman's Copse.", soulsEstimate: 15000, keyItems: ["Lockstone"] },
  { order: 4, area: "Forest of Fallen Giants", areaId: "forest_of_fallen_giants", goal: "Rapier, Firebombs, shortcut. Pursuer ballista cheese. Dull Ember.", soulsEstimate: 25000, keyItems: ["Rapier", "Dull Ember", "Ring of Blades"] },
  { order: 5, area: "No-Man's Wharf", areaId: "no_mans_wharf", goal: "Large titanite, titanite shards. Fragrant Branch. Great Club / main weapon.", soulsEstimate: 15000, keyItems: ["Large Titanite Shard", "Fragrant Branch of Yore"] },
  { order: 6, area: "Lost Bastille", areaId: "lost_bastille", goal: "McDuff: infuse Rapier Dark. Ruin Sentinels. Flexile Sentry.", soulsEstimate: 40000, keyItems: ["Dark Rapier", "Twinkling Titanite"] },
  { order: 7, area: "Huntsman's Copse", areaId: "huntsmans_copse", goal: "Felkin: Dark Weapon, Sunset Staff. Chloranthy Ring +1.", soulsEstimate: 20000, keyItems: ["Dark Weapon", "Sunset Staff"] },
  { order: 8, area: "Shaded Woods", areaId: "shaded_woods", goal: "Titanite chunks, Scorpioness Najka. Doors of Pharros.", soulsEstimate: 30000, keyItems: ["Titanite Chunk"] },
  { order: 9, area: "Brightstone Cove Tseldora", areaId: "brightstone_cove", goal: "Duke's Dear Freya. Farm for ~1M soul memory. Twinkling Titanite.", soulsEstimate: 500000, keyItems: ["Twinkling Titanite", "Titanite Slab"] },
  { order: 10, area: "Iron Keep", areaId: "iron_keep", goal: "Best mid-game soul farm (Alonne Knights). Smelter Demon optional.", soulsEstimate: 6000, keyItems: [] },
];

/** Early OP builds — fast path to power */
export const GET_OP_EARLY_BUILDS: GetOpEarlyBuild[] = [
  {
    id: "hex-rapier",
    name: "30/30 Hex Rapier",
    description: "DEX hex hybrid. Rapier + Dark Weapon + Sunset Staff. One of the easiest early OP starts.",
    buildTemplateId: "dark-melee-hexer",
    keyWeapons: ["Rapier (Dark infused)", "Sunset Staff"],
    keySpells: ["Dark Weapon", "Great Soul Arrow"],
    stats: "30 INT / 30 FTH, 14 DEX, ADP 24",
    soulMemoryTarget: 1000000,
  },
  {
    id: "bonk-strength",
    name: "Bonk Strength Build",
    description: "Heavy weapons, power stance. Great Club, Dragonrider cheese, early chunks from Gutter.",
    keyWeapons: ["Great Club", "Large Club", "Mace"],
    keySpells: ["Whisper of Despair (optional)"],
    stats: "42 STR, 20 END, VGR 20+",
    soulMemoryTarget: 500000,
  },
  {
    id: "sorcery-rush",
    name: "Early Sorcery Rush",
    description: "Sorcerer start, Soul Arrow spam. Rush INT, get Great Soul Arrow from FoFG.",
    buildTemplateId: "pure-int-mlgs",
    keyWeapons: ["Sorcerer's Staff", "Rapier (backup)"],
    keySpells: ["Soul Arrow", "Great Soul Arrow"],
    stats: "40+ INT, 24 ADP, ATN 16+",
    soulMemoryTarget: 300000,
  },
];

/** Soul duplication methods — with explicit caveats */
export const GET_OP_DUPING_METHODS: GetOpDupingMethod[] = [
  {
    id: "lifegem-darksign-2024",
    name: "Lifegem + Darksign (2024)",
    description: "Use soul item, quickly swap to Lifegem and spam use during animation. Swap to Darksign, use twice. Souls multiply by soul item value (e.g. 200× for Soul of a Lost Undead).",
    status: "works",
    platform: "all",
    source: "MistrGrimyLikesCofey3961, Dec 2024",
  },
  {
    id: "menu-trigger-2014",
    name: "Menu Trigger (L1/R1 back out)",
    description: "Duplicate normal soul items and consumables with slow animation. Use soul, open inventory before confirmation. Back out with L1/R1 (not Circle/B). Boss souls not duplicable.",
    status: "patched",
    platform: "all",
    source: "H1JaX, 2014 — likely patched in SotFS",
  },
  {
    id: "save-backup-friend",
    name: "Save Backup + Friend Drop",
    description: "Backup save to folder. Summon friend, drop souls. Save & quit, restore backup. Friend holds souls in item box. Repeat. Both use souls to match soul memory for co-op. Risk: save corruption if done wrong.",
    status: "soft_ban_risk",
    platform: "pc",
    source: "Ren Creates, 2021 — offline/solo safer; online may risk soft-ban",
  },
];

/** Leveling strategies — where to invest early */
export const GET_OP_LEVELING_TIPS: GetOpLevelingTip[] = [
  { id: "adp", stat: "ADP", priority: "High", target: "24–26", reason: "96–100 Agility for reliable i-frames. Essential for dodging." },
  { id: "vgr", stat: "VGR", priority: "High", target: "20–40", reason: "Survivability. 20 early, 40 for endgame." },
  { id: "int-fth", stat: "INT / FTH", priority: "Build-dependent", target: "30/30 for hex", reason: "Dark Weapon and hex scaling. Soft cap 30/30." },
  { id: "end", stat: "END", priority: "Medium", target: "20+", reason: "Stamina for combos and rolls." },
  { id: "soul-memory", stat: "Soul Memory", priority: "Awareness", target: "~1M for OP", reason: "Aim for ~1M SM with upgraded gear and key spells before mid-game." },
];

/** Curated video guides — metadata from YouTube */
export const GET_OP_VIDEO_GUIDES: GetOpVideoGuide[] = [
  {
    id: "ren-creates-op",
    title: "How to Become USTOPPABLY OVERPOWERED in Dark Souls 2 SOTFS",
    channel: "Ren Creates",
    url: "https://www.youtube.com/watch?v=WZQgY5j_ISQ",
    videoId: "WZQgY5j_ISQ",
    description: "30 INT/30 FTH hex build. Rapier + Dark Weapon, Sunset Staff. ~1M soul memory target. Detailed progression.",
    category: "build",
    duration: "34:16",
  },
  {
    id: "girlvsgame-break",
    title: "How To Break Dark Souls 2 Early Game",
    channel: "GIRLvsGAME",
    url: "https://www.youtube.com/watch?v=Z8wUiZ_0ZS8",
    videoId: "Z8wUiZ_0ZS8",
    description: "Bonk build, power stance, strength. Explorer + Bonfire Ascetic start. Dragonrider cheese, Gutter chunks.",
    category: "build",
    duration: "14:40",
  },
  {
    id: "mistrgrimy-dupe-2024",
    title: "NEW Soul DUPLICATION GLITCH in Dark Souls 2! (2024)",
    channel: "MistrGrimyLikesCofey3961",
    url: "https://www.youtube.com/watch?v=GfjCYqyyL2U",
    videoId: "GfjCYqyyL2U",
    description: "Lifegem + Darksign method. Souls multiply by soul item value.",
    category: "duping",
    duration: "01:57",
  },
  {
    id: "ren-creates-dupe",
    title: "Dark Souls 2 SOTFS Infinite souls glitch 2025! Friend Save Dupe Method!",
    channel: "Ren Creates",
    url: "https://www.youtube.com/watch?v=n3qngxQ26UE",
    videoId: "n3qngxQ26UE",
    description: "Save backup + friend drop method. Soul memory matching for co-op. Back up saves to avoid corruption.",
    category: "duping",
    duration: "03:23",
  },
  {
    id: "h1jax-dupe-2014",
    title: "Dark Souls II - Soul Duping Glitch",
    channel: "H1JaX",
    url: "https://www.youtube.com/watch?v=Rv38_TwyHGY",
    videoId: "Rv38_TwyHGY",
    description: "Original menu trigger method. Normal soul items + slow consumables. Use L1/R1 to back out, not Circle/B.",
    category: "duping",
    duration: "00:28",
  },
];
