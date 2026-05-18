/**
 * DS2 SotFS Canonical Database — Illusory walls, breakable walls, Pharros uses, crystal lizards.
 * Source: Fextralife Wiki, community cheat sheets. Use Press A/X for illusory walls (NOT attack).
 */

import type { AreaId } from "./areas";

export type SecretType =
  | "illusory"
  | "breakable"
  | "pharros"
  | "shiny"
  | "crystal_lizard"
  | "hidden_path"
  | "sotfs_hollow"
  | "sotfs_moth";

// --- ILLUSORY WALLS (Press A/X to open — NOT attack) ---

export interface IllusoryWall {
  id: string;
  areaId: AreaId;
  location: string;
  description: string;
  items: string[];
}

export const ILLUSORY_WALLS: IllusoryWall[] = [
  // Forest of Fallen Giants
  {
    id: "ill_fg_stairway",
    areaId: "forest_of_fallen_giants",
    location: "Cardinal Tower — long stairway building (Pate gate)",
    description: "From Cardinal Tower bonfire, go down the long stairway (past Pate's gate). At the bottom, face back up the stairs — the illusory wall is on the right-hand wall. Press A/X to open. Leads to shortcut with Amber Herb and Sorcerer's Staff.",
    items: ["Amber Herb", "Sorcerer's Staff"],
  },
  // No-Man's Wharf
  {
    id: "ill_nm_house1",
    areaId: "no_mans_wharf",
    location: "House with shortcut door — bottom floor, beneath staircase",
    description: "First illusory wall.",
    items: ["Target Shield"],
  },
  {
    id: "ill_nm_house2",
    areaId: "no_mans_wharf",
    location: "Same house — second illusory wall",
    description: "Behind first wall.",
    items: ["Hush", "Homeward Bone x3"],
  },
  // Lost Bastille — Ruin Sentinels room (6 walls)
  {
    id: "ill_lb_rs1",
    areaId: "lost_bastille",
    location: "Ruin Sentinels boss chamber — wall next to corner, second section",
    description: "Enter from the main entrance. Face the entrance, wall on your left in the second section (first platform area).",
    items: ["Archdrake Shield", "Archdrake Robes"],
  },
  {
    id: "ill_lb_rs2",
    areaId: "lost_bastille",
    location: "Ruin Sentinels chamber — wall next to third section",
    description: "Same room, third platform. Golden Wing Shield, Soul of a Brave Warrior, Bracing Knuckle Ring.",
    items: ["Golden Wing Shield", "Soul of a Brave Warrior", "Bracing Knuckle Ring"],
  },
  {
    id: "ill_lb_rs3",
    areaId: "lost_bastille",
    location: "Ruin Sentinels chamber — wall facing staircase, first floor",
    description: "Wall facing the staircase (first floor). Ladder behind leads up to more illusory walls.",
    items: ["Bleed Stone", "Northern Ritual Band"],
  },
  {
    id: "ill_lb_rs4",
    areaId: "lost_bastille",
    location: "Ruin Sentinels chamber — wall up stairs, second floor",
    description: "Take ladder up from first floor. Through doorway toward stairs down, wall straight ahead. Ricard's Rapier.",
    items: ["Ricard's Rapier"],
  },
  {
    id: "ill_lb_rs5",
    areaId: "lost_bastille",
    location: "Ruin Sentinels chamber — stray balcony, second floor",
    description: "On stray balcony (second floor). Wall facing the staircase. Best loot: Old Knight Greatshield, Old Knight Pike, Smooth & Silky Stone.",
    items: ["Smooth & Silky Stone", "Radiant Lifegem", "Torch", "Soul of a Lost Undead", "Old Knight Greatshield", "Old Knight Pike"],
  },
  {
    id: "ill_lb_antiquated",
    areaId: "lost_bastille",
    location: "Antiquated Key area — dark room with Pharros contraption",
    description: "Near back of room. Bypasses Ruin Sentinels.",
    items: ["Rouge Water"],
  },
  // Lost Bastille — Servants' Quarters
  {
    id: "ill_lb_servants",
    areaId: "lost_bastille",
    location: "Servants' Quarters — offshoot room with cage elevator, pots",
    description: "In the room with cage elevator and pots, find the back wall and press A/X for first illusory door. Go through diagonal passage. At the second illusory door on the left, press A/X again. Jump down to corpse, then move along the ledge to reach Great Lightning Spear and Olenford's Staff. (Pharros contraption also here — see Pharros tab.)",
    items: ["Great Lightning Spear", "Olenford's Staff"],
  },
  // Sinner's Rise
  {
    id: "ill_sr_basement",
    areaId: "sinners_rise",
    location: "Basement elevator — first alcove on right",
    description: "Wall facing alcove entrance.",
    items: ["Estus Flask Shard"],
  },
  // Huntsman's Copse
  {
    id: "ill_hc_cave",
    areaId: "huntsmans_copse",
    location: "Bridge Approach — cave (mushrooms to bottom)",
    description: "Enter the cave with mushrooms leading down. The illusory wall is in the corner opposite the chest — but you must open it on the way OUT (coming back from the bottom). If you try from the entrance side it won't work. Contains Royal Soldier's Ring, souls, Crystal Lizard.",
    items: ["Royal Soldier's Ring", "Large Soul of a Nameless Soldier", "Soul of a Nameless Soldier", "Fading Soul", "Crystal Lizard"],
  },
  // Earthen Peak
  {
    id: "ill_ep_poison",
    areaId: "earthen_peak",
    location: "Central Earthen Peak — behind 3 poison jars",
    description: "Narrow hallway to sorceress room, right wall.",
    items: ["Spell Quartz Ring +1", "Petrified Something"],
  },
  {
    id: "ill_ep_boss_left",
    areaId: "earthen_peak",
    location: "Above boss door — left as you exit",
    description: "",
    items: ["Upper Earthen Peak Bonfire"],
  },
  {
    id: "ill_ep_boss_right",
    areaId: "earthen_peak",
    location: "Above boss door — right as you exit",
    description: "",
    items: ["Fire Arrow x20"],
  },
  // Iron Keep
  {
    id: "ill_ik_bull",
    areaId: "iron_keep",
    location: "Threshold Bridge — room right of flaming bull head",
    description: "Right-hand wall at top of stairs.",
    items: ["Life Ring +1"],
  },
  {
    id: "ill_ik_belfry",
    areaId: "iron_keep",
    location: "Belfry Sol return — walls on right before jumping to bonfire",
    description: "",
    items: ["Grand Spirit Tree Shield", "Protective Chime", "Black Knight Greatsword"],
  },
  // Brightstone Cove Tseldora
  {
    id: "ill_bc_magus",
    areaId: "brightstone_cove",
    location: "Prowling Magus boss entrance room",
    description: "Left of entrance.",
    items: ["Estus Flask Shard"],
  },
  // Drangleic Castle
  {
    id: "ill_dc_tower",
    areaId: "drangleic_castle",
    location: "Tower with kneeling knight statues — ladder down",
    description: "In the tower room with kneeling knight statues, take the ladder down. At the bottom, look at the right corner (right as you face away from the ladder). Press A/X on the wall. Reveals passage to Faraam Set and Forgotten Chamber Bonfire.",
    items: ["Faraam Set", "Forgotten Chamber Bonfire"],
  },
  // Undead Crypt
  {
    id: "ill_uc_stairs",
    areaId: "undead_crypt",
    location: "Stairs near Leydia Witch ledge",
    description: "Wall on room's right side.",
    items: ["Heavy Bolt x15", "Avelyn"],
  },
  {
    id: "ill_uc_gray",
    areaId: "undead_crypt",
    location: "Hole past skeleton — hallway with gray stripe on floor",
    description: "After the hole past the double-shield Leydia guards, go through the hallway with the gray stripe painted on the floor. Face the graves — the illusory wall is on your left. Behind it: Pharros contraption, then chest with Great Lightning Spear and Olenford's Staff.",
    items: ["Great Lightning Spear", "Olenford's Staff"],
  },
  // Aldia's Keep
  {
    id: "ill_ak_acid",
    areaId: "aldias_keep",
    location: "Staircase to corrosive acid room",
    description: "Middle of wall, iron grating section.",
    items: ["Malformed Shell"],
  },
  // Memory of Orro (requires Ashen Mist Heart)
  {
    id: "ill_mem_orro",
    areaId: "memories",
    location: "Memory of Orro — back wall, second floor with guards",
    description: "Next to second Pharros contraption.",
    items: ["Steel Set", "Fire Seed"],
  },
  // DLC: Shulva
  {
    id: "ill_shulva_sanctum",
    areaId: "dlc_sunken",
    location: "Dragon's Sanctum — corridor before stairs (Black Drakeblood Knight)",
    description: "Left wall after drop from broken stairs.",
    items: ["Sanctum Interior Bonfire"],
  },
  // DLC: Brume Tower
  {
    id: "ill_brume_ledge",
    areaId: "dlc_iron",
    location: "After 2nd Ashen Idol — snowy outdoor ledge",
    description: "Corpse on ledge. Door outline visible.",
    items: ["Soul Vessel x2", "Wilted Dusk Herb x4", "Old Radiant Lifegem x4"],
  },
  {
    id: "ill_brume_elevator",
    areaId: "dlc_iron",
    location: "Foyer — elevator (mash interact while going up)",
    description: "Second elevator up. Wall opens during ride.",
    items: ["Hollow Skin"],
  },
];

// --- BREAKABLE WALLS (attack or explosions) ---

export interface BreakableWall {
  id: string;
  areaId: AreaId;
  location: string;
  howToBreak: string;
  items: string[];
}

export const BREAKABLE_WALLS: BreakableWall[] = [
  // Forest of Fallen Giants
  {
    id: "brk_fg_pursuer",
    areaId: "forest_of_fallen_giants",
    location: "Pursuer platform — ledge corner",
    howToBreak: "Bait firebomb hollow to detonate explosive kegs",
    items: ["Large Titanite Shard", "Firebomb x3", "Crystal Lizard"],
  },
  // No-Man's Wharf
  {
    id: "brk_nm_poison",
    areaId: "no_mans_wharf",
    location: "Poison cask house — corner near casks",
    howToBreak: "Attack the wall",
    items: ["Royal Soldier's Ring", "Large Soul of a Nameless Soldier", "Soul of a Nameless Soldier", "Fading Soul", "Crystal Lizard"],
  },
  // Lost Bastille
  {
    id: "brk_lb_kegs",
    areaId: "lost_bastille",
    location: "Royal Swordsmen room — explosive kegs",
    howToBreak: "Blow up kegs next to wall (or use Bastille Key for McDuff gate)",
    items: ["McDuff shortcut / Ruin Sentinels bypass"],
  },
  // Harvest Valley
  {
    id: "brk_hv_mines",
    areaId: "harvest_valley",
    location: "The Mines — board walls",
    howToBreak: "Dark Magic Giant breaks first wall. Lure him to break second.",
    items: ["Radiant Lifegem", "Crimson Water"],
  },
  // Drangleic Castle
  {
    id: "brk_dc_sentinels",
    areaId: "drangleic_castle",
    location: "Ruin Sentinels room — last door on left",
    howToBreak: "Floor is breakable — fall through to Grandahl's cave below",
    items: ["Darkdiver Grandahl (Pilgrims of Dark)"],
  },
  // Aldia's Keep
  {
    id: "brk_ak_ogre",
    areaId: "aldias_keep",
    location: "Long hallway with cages — chained door branch",
    howToBreak: "Lure Ogre to attack the chained door; he breaks through",
    items: ["Fire Seed", "Steel Set"],
  },
];

// --- PHARROS LOCKSTONE KEY USES (prioritize these; many contraptions are traps) ---

export interface PharrosUse {
  id: string;
  areaId: AreaId;
  location: string;
  effect: string;
  items?: string[];
  note?: string;
  isTrap?: boolean;
  /** Directions from bonfire or landmark */
  howToGetThere?: string;
}

export const PHARROS_KEY_USES: PharrosUse[] = [
  { id: "ph_fg_ballista", areaId: "forest_of_fallen_giants", location: "Cardinal Tower — room under ballista trap (near Pate)", effect: "Reveals fake wall", items: ["Titanite Slab", "Chloranthy Ring"], howToGetThere: "From Cardinal Tower, go to room under ballista (past Pate gate). Contraption on wall." },
  { id: "ph_nm_light", areaId: "no_mans_wharf", location: "Second level — in front of house", effect: "Creates bright light, scares Darkdwellers away", howToGetThere: "From first bonfire, ascend to second level — in front of house before shortcut." },
  { id: "ph_lb_twinblade", areaId: "lost_bastille", location: "Twinblade chest room", effect: "Reveals room with Soul Vessel" },
  { id: "ph_lb_belfry", areaId: "lost_bastille", location: "Servants' Quarters — down ladder", effect: "Opens passage to Belfry Luna", note: "Hit revealed wall after placement.", howToGetThere: "From Servants' Quarters bonfire, down ladder — contraption on wall. Hit illusory wall after." },
  { id: "ph_ep_poisonbite", areaId: "earthen_peak", location: "Bottom room off poison mist floor (before first boss)", effect: "Reveals room", items: ["Poisonbite Ring", "Soul of a Proud Knight"] },
  { id: "ph_ep_mushroom", areaId: "earthen_peak", location: "Area near 2nd boss (mushrooms, mimic)", effect: "Spills poison into pool; becomes healing water after windmill burn" },
  { id: "ph_ik", areaId: "iron_keep", location: "Various", effect: "Two add water to pool (survive lava); third opens Belfry Sol + bonfire" },
  { id: "ph_tp_bridges", areaId: "the_pit", location: "Grave of Saints — bridges", effect: "Lowers bridges to room with Poison Moss x2, Whisper of Despair, Torch", note: "Left contraption at start = turns off torches. Wall contraption = pours water.", items: ["Poison Moss x2", "Whisper of Despair", "Torch"] },
  { id: "ph_amana_helix", areaId: "shrine_of_amana", location: "Crumbled Ruins — water near ramp, left of first priestess", effect: "Reveals hidden cave in cliff", items: ["Helix Halberd"] },
  { id: "ph_uc_spells", areaId: "undead_crypt", location: "Behind illusory wall (hole after double-shield guards)", effect: "Opens wall with chest", items: ["Olenford's Staff", "Great Lightning Spear"] },
  { id: "ph_aldia_light", areaId: "aldias_keep", location: "Long hall", effect: "Creates light" },
  { id: "ph_aerie_judgement", areaId: "dragon_aerie", location: "Dragon Shrine — under boxes behind first knight", effect: "Reveals hidden wall", items: ["Judgement Set", "Judgement Staff"] },
  { id: "ph_mem_orro", areaId: "memories", location: "Memory of Orro — second floor", effect: "First: reveals illusory wall. Second: trap (skip). Use regular illusory wall next to it.", items: ["Steel Armour Set", "Fire Seed"] },
  { id: "ph_dlc_durgo", areaId: "dlc_ivory", location: "Bridge with ballistas", effect: "Leads to Durgo's Hat", items: ["Durgo's Hat"] },
];

// --- DOORS OF PHARROS — Detailed contraptions for choosing which to open ---

export interface DoorsOfPharrosContraption {
  id: string;
  floor: "1st" | "2nd";
  location: string;
  effect: string;
  items?: string[];
  isTrap: boolean;
  lockstones?: number;
}

export const DOORS_OF_PHARROS_CONTRAPTIONS: DoorsOfPharrosContraption[] = [
  // 1st Floor — worth opening
  { id: "dp_santiers", floor: "1st", location: "Big stone door — underwater contraption in front", effect: "Opens bottom of door (1 lockstone enough). Primal Knight inside cannot pass; loot chest.", items: ["Santier's Spear"], isTrap: false, lockstones: 1 },
  { id: "dp_faint_twinkling", floor: "1st", location: "1st lock after ladder (between two Gyrm Warriors)", effect: "Opens door on first floor below — path near two Mongrel Rats.", items: ["Faintstone", "Twinkling Titanite"], isTrap: false },
  { id: "dp_brave_warrior", floor: "2nd", location: "Big stone door — middle lock on 2nd floor", effect: "Opens bottom of door.", items: ["Soul of a Brave Warrior"], isTrap: false },
  { id: "dp_magic_arrows", floor: "2nd", location: "After last lock, on floor", effect: "Opens path with Gyrm Warrior + trapped chest.", items: ["Magic Arrow x15"], isTrap: false },
  { id: "dp_shortcut", floor: "2nd", location: "1st room, wall right before 3rd bridge", effect: "Opens path through wall — shortcut to avoid 3rd bridge.", isTrap: false },
  // 1st Floor — traps / enemies only (skip)
  { id: "dp_1r_door1", floor: "1st", location: "1st room left — 1st door", effect: "Gyrm Warrior inside.", isTrap: false },
  { id: "dp_1r_door2", floor: "1st", location: "1st room left — 2nd door", effect: "Gyrm Warrior inside.", isTrap: false },
  { id: "dp_1r_door3", floor: "1st", location: "1st room left — 3rd door", effect: "Mongrel Rat inside.", isTrap: false },
  { id: "dp_2r_alcove", floor: "1st", location: "2nd room (after ladder) — alcove next to chest Gyrm", effect: "Both open empty doors; right has Stone Gyrm trap.", isTrap: true },
  { id: "dp_2r_ladder", floor: "1st", location: "2nd room (with ladder) — both doors", effect: "Gyrm Warriors inside.", isTrap: false },
  // 2nd Floor — traps (skip)
  { id: "dp_2f_after4", floor: "2nd", location: "After 4th bridge, wall before bonfire", effect: "Moves wall — blocks your path (trap).", isTrap: true },
  { id: "dp_2f_before4", floor: "2nd", location: "Right before 4th bridge", effect: "Stone Gyrm trap.", isTrap: true },
  { id: "dp_2f_floor", floor: "2nd", location: "On floor in front of big door locks", effect: "Stone Gyrm trap.", isTrap: true },
  { id: "dp_2f_after3", floor: "2nd", location: "After 3rd bridge, on wall", effect: "Blade trap on bridge.", isTrap: true },
  { id: "dp_2f_1r_floor", floor: "2nd", location: "1st room, floor before 3rd bridge", effect: "Activates iron Gyrm statue trap.", isTrap: true },
  { id: "dp_2f_after2", floor: "2nd", location: "Right after 2nd bridge", effect: "Stone Gyrm trap on bridge.", isTrap: true },
  { id: "dp_2f_last_lock", floor: "2nd", location: "Right next to last lock", effect: "Stone Gyrm trap.", isTrap: true },
  { id: "dp_2f_after1", floor: "2nd", location: "Right after first bridge", effect: "Blade trap on bridge.", isTrap: true },
];

// --- PHARROS LOCKSTONE LOCATIONS ---

export interface PharrosLocation {
  areaId: AreaId;
  location: string;
  note?: string;
  /** Directions from bonfire or landmark */
  howToGetThere?: string;
}

export const PHARROS_LOCATIONS: PharrosLocation[] = [
  { areaId: "forest_of_fallen_giants", location: "Melentia (sells 1)", howToGetThere: "Cardinal Tower — Melentia sits near bonfire. Buy for 4000 souls." },
  { areaId: "majula", location: "Mansion library corpse (behind bookcases)", howToGetThere: "From Majula bonfire, mansion on hill — library behind movable bookcases." },
  { areaId: "majula", location: "Pit (Silvercat Ring needed)" },
  { areaId: "huntsmans_copse", location: "Drop from bridge to pillar, or jump from tower above Bridge Approach" },
  { areaId: "earthen_peak", location: "Crossbow-trapped chest (middle)" },
  { areaId: "earthen_peak", location: "Gilligan ladder area (pay 2000 souls)" },
  { areaId: "sinners_rise", location: "Last gate before boss — room on left" },
  { areaId: "drangleic_castle", location: "Room to right of first bonfire — second left sentinel closet" },
  { areaId: "shaded_woods", location: "Hill near beginning" },
  { areaId: "shaded_woods", location: "Shaded Ruins — second story of ruined building behind Great Basilisk" },
  { areaId: "aldias_keep", location: "Room with green glass containers — behind wooden shelf" },
  { areaId: "dragon_aerie", location: "Between 2nd and 3rd guardian dragon — corpse on ledge" },
  { areaId: "black_gulch", location: "Hidden Chamber bonfire — corpse in pot" },
  { areaId: "doors_of_pharros", location: "Farmable: Royal Rat Authority small rats", note: "Kill rats, die/Homeward; respawns." },
  { areaId: "the_pit", location: "The Rotten — cut arm (both arms drop)", note: "Farmable." },
];

// --- CRYSTAL LIZARDS (drop upgrade materials; despawn if they escape) ---

export interface CrystalLizardEntry {
  areaId: AreaId;
  location: string;
  drops: string;
  /** Directions from bonfire or closest landmark */
  howToGetThere?: string;
}

export const CRYSTAL_LIZARDS: CrystalLizardEntry[] = [
  {
    areaId: "forest_of_fallen_giants",
    location: "Room near elevator to Last Giant",
    drops: "2 Titanite Shard",
    howToGetThere: "From Cardinal Tower, take elevator down toward Last Giant — lizard in room before boss fog.",
  },
  {
    areaId: "no_mans_wharf",
    location: "Behind breakable wall in poison jar room",
    drops: "2 Titanite Shard, 1 Large Titanite Shard",
    howToGetThere: "From first bonfire, poison jar house — break wall in corner (attack). Lizard inside.",
  },
  {
    areaId: "iron_keep",
    location: "Near magma bucket traps, small staircase",
    drops: "1 Large Titanite, 1 Titanite Chunk, 1 Firestone",
    howToGetThere: "From Threshold Bridge, past magma buckets — small staircase area before Smelter.",
  },
  {
    areaId: "doors_of_pharros",
    location: "After axe-hurling Gyrm past Gavlan's room",
    drops: "3 Large Titanite Shard, 1 Raw Stone",
    howToGetThere: "From first bonfire, past Gavlan's room — past axe-throwing Gyrm, lizard in corridor.",
  },
  {
    areaId: "huntsmans_copse",
    location: "Cliff-side path to Skeleton Lords — left branch up",
    drops: "1 Titanite Shard, 1 Large Titanite Shard, 1 Titanite Chunk",
    howToGetThere: "From Undead Lockaway, path toward Skeleton Lords — take left branch up cliff.",
  },
  {
    areaId: "huntsmans_copse",
    location: "Cave before Skeleton Lords (illusory wall)",
    drops: "Part of Royal Soldier's Ring area loot",
    howToGetThere: "Cave with mushrooms (Bridge Approach). Illusory wall on way out from bottom — press A/X.",
  },
  {
    areaId: "harvest_valley",
    location: "After 4 Artificial Undead — boarded path to poison mist pit",
    drops: "1 Titanite Shard, 1 Large Titanite Shard, 1 Palestone",
    howToGetThere: "From first bonfire, past 4 Artificial Undead — boarded path leading to poison mist pit.",
  },
  {
    areaId: "the_pit",
    location: "Grave of Saints — rope bridge to treasure chest",
    drops: "2 Titanite Shard, 1 Large Titanite Shard, 1 Darknight Stone",
    howToGetThere: "From Grave of Saints bonfire, cross rope bridge toward treasure chest.",
  },
  {
    areaId: "shaded_woods",
    location: "Ruins near Manscorpion Tark",
    drops: "2 Titanite Shard, 1 Titanite Chunk, 1 Boltstone",
    howToGetThere: "From ruins bonfire, near Manscorpion Tark's arena.",
  },
  {
    areaId: "brightstone_cove",
    location: "Balcony of Pate/Creighton fight building",
    drops: "Petrified Dragon Bone, Titanite Shard",
    howToGetThere: "From Royal Army Campsite, building where Pate/Creighton fight — lizard on balcony.",
  },
  {
    areaId: "brightstone_cove",
    location: "After Prowling Magus — pillar below chapel cliff",
    drops: "1 Large Titanite Shard, 1 Twinkling Titanite",
    howToGetThere: "After Prowling Magus boss, drop down — lizard on pillar below chapel cliff.",
  },
  {
    areaId: "drangleic_castle",
    location: "Before long staircase to castle entrance",
    drops: "3 Titanite Chunk, 1 Titanite Slab",
    howToGetThere: "From first bonfire, before the long staircase up to castle entrance.",
  },
  {
    areaId: "dragon_aerie",
    location: "11 lizards throughout — near each drake encounter",
    drops: "Various: Shards, Chunks, Slabs, Twinkling, Petrified Dragon Bone, infusion stones",
    howToGetThere: "Spread along the bridges — one near each guardian drake. Use bow/sorcery to one-shot before they escape.",
  },
];
