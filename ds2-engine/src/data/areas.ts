// Canonical area data — merged from JSX, V4, Python, Walkthrough
// Item format: [id, text, type, questRef?, tags[]]
// type: item | npc | boss | bonfire | key | warn

export const AREA_ORDER = [
  "things_betwixt", "majula", "forest_of_fallen_giants", "heides_tower",
  "no_mans_wharf", "lost_bastille", "huntsmans_copse", "harvest_valley",
  "earthen_peak", "iron_keep", "the_pit", "the_gutter", "black_gulch",
  "shaded_woods", "doors_of_pharros", "brightstone_cove", "sinners_rise",
  "drangleic_castle", "shrine_of_amana", "undead_crypt", "aldias_keep",
  "dragon_aerie", "memories", "dark_chasm", "throne_of_want",
  "dlc_sunken", "dlc_iron", "dlc_ivory",
] as const;

export type AreaId = (typeof AREA_ORDER)[number];

export interface AreaItemSubItem {
  id: string;
  text: string;
  items?: string[];
}

export interface AreaItem {
  id: string;
  text: string;
  type: "item" | "npc" | "boss" | "bonfire" | "key" | "warn";
  questRef?: string | null;
  tags?: string[];
  subItems?: AreaItemSubItem[];
}

export interface Area {
  id: AreaId;
  name: string;
  lvl: string;
  items: AreaItem[];
}

function item(
  id: string,
  text: string,
  type: AreaItem["type"],
  questRef?: string | null,
  tags?: string[],
  subItems?: AreaItemSubItem[]
): AreaItem {
  return { id, text, type, questRef: questRef ?? undefined, tags, subItems };
}

export const AREAS: Record<AreaId, Omit<Area, "id">> = {
  things_betwixt: {
    name: "Things Betwixt",
    lvl: "1",
    items: [
      item("tb1", "Rusted Coin (gap in wall, turn right)", "item"),
      item("tb2", "Talk to Milibeth & Old Firekeepers", "npc"),
      item("tb3", "Chest upstairs — Human Effigy", "item"),
      item("tb4", "Destroy cart outside — Soul of a Lost Undead + Torch", "item"),
      item("tb5", "Light bonfire", "bonfire"),
      item("tb6", "Hidden path below bridge — Small Smooth & Silky Stone", "item"),
      item("tb7", "Kill Ogre near bridge — Stone Ring", "item"),
      item("tb8", "Gold Pine Resin from corpse", "item"),
      item("tb9", "Tutorial: Dagger + Lifegem, drop Stone on bird nest", "item"),
      item("tb10", "Fog Gate 2: Amber Herbs (jump gap) + Cracked Red Eye Orb", "item"),
      item("tb11", "Push trees, kill 2 Ogres outside, sleep in Coffin (sex swap)", "item"),
      item("tb12", "Return to Milibeth — Handmaid's Ladle", "npc"),
      item("tb13", "Path to Majula: Morning Star, Cleric's Sacred Chime, Binoculars", "item", undefined, undefined, [
        { id: "tb13a", text: "Morning Star", items: ["Morning Star"] },
        { id: "tb13b", text: "Cleric's Sacred Chime", items: ["Cleric's Sacred Chime"] },
        { id: "tb13c", text: "Binoculars", items: ["Binoculars"] },
      ]),
    ],
  },
  majula: {
    name: "Majula",
    lvl: "1–10",
    items: [
      item("mj1", "Light bonfire, talk to Emerald Herald — get Estus Flask", "bonfire"),
      item("mj3", "Pick up Divine Blessing, Lifegems, Homeward Bones", "item", undefined, undefined, [
        { id: "mj3a", text: "Divine Blessing", items: ["Divine Blessing"] },
        { id: "mj3b", text: "Lifegems", items: ["Lifegems"] },
        { id: "mj3c", text: "Homeward Bones", items: ["Homeward Bones"] },
      ]),
      item("mj5", "Talk to Saulden → Welcome gesture, join Way of Blue", "npc", null, ["gesture:welcome", "covenant:way_of_blue"]),
      item("mj6", "Hit rock at well — Estus Flask Shard", "item", null, ["estus:1"]),
      item("mj4", "Building: kill Hollow, get Lloyd's Talismans", "item"),
      item("mj10", "Talk to Maughlin the Armorer, buy gear", "npc"),
      item("mj11", "Ladder by Maughlin — Titanite Shard (chest)", "item"),
      item("mj9", "Sweet Shalquoir shop — buy Silvercat Ring (13,400) & Ring of Whispers (5,800)", "npc"),
      item("mj2", "Talk to Benhart of Jugo (path to Shaded Woods) — exhaust dialogue", "npc", "benhart:1"),
      item("mj7", "Spiral stairs by pit — Crimson Parma (chest)", "item"),
      item("mj8", "Victor's Stone — Homeward Bones (Company of Champions here)", "item", null, ["covenant:company_of_champions"]),
      item("mj12", "Path to FoFG: Rusted Coin, pull switch, Human Effigy, Homeward Bone", "item", undefined, undefined, [
        { id: "mj12a", text: "Rusted Coin", items: ["Rusted Coin"] },
        { id: "mj12b", text: "Pull switch", items: [] },
        { id: "mj12c", text: "Human Effigy", items: ["Human Effigy"] },
        { id: "mj12d", text: "Homeward Bone", items: ["Homeward Bone"] },
      ]),
    ],
  },
  forest_of_fallen_giants: {
    name: "Forest of Fallen Giants",
    lvl: "10–20",
    items: [
      item("fg1", "Crestfallen's Retreat bonfire", "bonfire"),
      item("fg2", "River: Lifegem, Soul of a Lost Undead. Up ladders: jump gap → Shortsword", "item"),
      item("fg3", "Kill Heide Knight (sits by tree) — Heide Knight Sword", "item"),
      item("fg4", "Cardinal Tower bonfire", "bonfire"),
      item("fg5", "Talk to Merchant Hag Melentia — buy Lenigrast's Key (1000), Pharros Lockstone (4000)", "npc"),
      item("fg6", "Spend 10,000 with Melentia → Covetous Silver Serpent Ring +1. Exhaust dialogue (moves to Majula)", "npc"),
      item("fg7", "Upstairs: break door → Small Leather Shield, Repair Powder, Hand Axe, Lifegem", "item"),
      item("fg8", "Ambush room chest — Estus Flask Shard + Small White Sign Soapstone", "item", null, ["estus:2"], [
        { id: "fg8a", text: "Estus Flask Shard", items: ["Estus Flask Shard"] },
        { id: "fg8b", text: "Small White Sign Soapstone", items: ["Small White Sign Soapstone"] },
      ]),
      item("fg9", "Drop on branch: Divine Blessing. Scaffolding: Human Effigy", "item"),
      item("fg10", "Caves below: Hollow Soldier Helm, Soul of a Proud Knight", "item"),
      item("fg11", "Past Flame Salamander — Fire Longsword (chest) ★ great early weapon", "key"),
      item("fg12", "Return to Majula: upgrade Estus, open Lenigrast's shop, get Short Bow behind him", "key"),
      item("fg16", "Talk to Cale the Cartographer (cave) — get House Key for Majula mansion", "npc"),
      item("fg14", "Pursuer platform: bait firebomb hollow to break wall → Large Titanite Shard, Firebomb x3, Crystal Lizard", "item", null, ["breakable"]),
      item("fg20", "Illusory (press A/X): Cardinal Tower long stairway — right wall at bottom → Amber Herb, Sorcerer's Staff (shortcut)", "item", null, ["illusory"]),
      item("fg21", "Pharros: room under ballista trap (near Pate) → Titanite Slab, Chloranthy Ring", "item", null, ["pharros"]),
      item("fg15", "Early Pursuer fight (optional) — Ring of Blades, Soul of the Pursuer", "boss"),
      item("fg17", "BOSS: THE LAST GIANT — Summon: Pate (if trap done), Luet", "boss"),
      item("fg18", "Use Soldier Key: opens Pursuer door, Soldier's Rest, King's Gate", "key"),
      item("fg19", "BOSS: THE PURSUER (boss room) — bird nest after → Lost Bastille", "boss"),
      item("fg13", "Optional: Silvercat drop to salamander pit — Hawk Ring, Flame Quartz Ring +1, Rebel's Greatshield", "item"),
    ],
  },
  heides_tower: {
    name: "Heide's Tower of Flame",
    lvl: "30–40",
    items: [
      item("ht1", "Tower of Flame bonfire", "bonfire"),
      item("ht2", "Upper level: Human Effigy, Dark Torches, Soul of a Proud Knight, Old Knight Halberd", "item", undefined, undefined, [
        { id: "ht2a", text: "Human Effigy", items: ["Human Effigy"] },
        { id: "ht2b", text: "Dark Torches", items: ["Dark Torches"] },
        { id: "ht2c", text: "Soul of a Proud Knight", items: ["Soul of a Proud Knight"] },
        { id: "ht2d", text: "Old Knight Halberd", items: ["Old Knight Halberd"] },
      ]),
      item("ht3", "Chest (Syan Knight guard) — Sublime Bone Dust", "item", null, ["bone:1"]),
      item("ht4", "Bottom of spiral: Monastery Charm", "item"),
      item("ht5", "BOSS: DRAGONRIDER — pull both levers for full platform", "boss"),
      item("ht6", "Talk to Licia of Lindeldt (after Dragonrider) — exhaust dialogue → moves to Majula rotunda", "npc"),
      item("ht7", "BOSS: OLD DRAGONSLAYER (Cathedral of Blue) — Old Leo Ring", "boss"),
      item("ht8", "Blue Sentinel Targray — need Token of Fidelity → join Blue Sentinels → Duel Bow gesture", "npc", null, ["gesture:duel_bow", "covenant:blue_sentinels"]),
    ],
  },
  no_mans_wharf: {
    name: "No-Man's Wharf",
    lvl: "35–45",
    items: [
      item("nm1", "No-Man's Wharf bonfire", "bonfire"),
      item("nm4", "⚔ Talk to Lucatiel — IN A HOUSE LEFT OF FIRST STAIRS (SotFS moved!)", "npc", "lucatiel:1"),
      item("nm0", "Talk to Gavlan (in building) — exhaust dialogue → moves later", "npc", "gavlan:1"),
      item("nm2", "Pharros Lockstone: illuminates dark area", "item"),
      item("nm3", "Heavy Crossbow +3, Greatsword, Iron Arrows", "item"),
      item("nm5", "Pull bell lever on dock to call the ship", "key"),
      item("nm6", "BOSS: FLEXILE SENTRY — can summon Lucatiel (dock near ship)", "boss"),
      item("nm7", "Optional: Summon Lucatiel for Flexile Sentry (boss survival 1?)", "boss", "lucatiel_boss:flexile"),
      item("nm8", "Ship takes you to Lost Bastille", "key"),
    ],
  },
  lost_bastille: {
    name: "The Lost Bastille",
    lvl: "55–65",
    items: [
      item("lb1", "Tower Apart bonfire (from bird nest) / Exile Holding Cells (from ship)", "bonfire"),
      item("lb2", "Tower Apart: chests with Dull Ember ★ GIVE TO MCDUFF", "key"),
      item("lb4", "Use Fragrant Branch on Straid of Olaphis (cell near Exile Holding) — boss soul trades", "npc", null, ["branch"]),
      item("lb5", "Exhaust Straid dialogue → Mock gesture", "npc", null, ["gesture:mock"]),
      item("lb6", "Estus Flask Shard — near Straid's area", "item", null, ["estus:3"]),
      item("lb16", "Soul Vessel (hidden path)", "item"),
      item("lb8", "BOSS: RUIN SENTINELS (3) — fight first on platform", "boss"),
      item("lb9", "Bastille Key (after Ruin Sentinels) — opens McDuff gate + other doors", "key"),
      item("lb7", "Give Dull Ember to McDuff → infusion blacksmith. Spend 14,000 → Titanite Slab", "npc"),
      item("lb3", "⚔ Talk to Lucatiel — tower ahead from McDuff's Workshop bonfire", "npc", "lucatiel:2"),
      item("lb10", "Belfry Luna — Pharros wall → Bell Keeper covenant (talk to dwarf)", "key", null, ["covenant:bell_keepers", "pharros"]),
      item("lb11", "BOSS: BELFRY GARGOYLES (5) — Covetous Gold Serpent Ring +2 on roof after", "boss"),
      item("lb12", "Covetous Silver Serpent Ring (cell in area)", "item"),
      item("lb13", "Illusory (press A/X): Ruin Sentinels room — 6 walls", "item", null, ["illusory"], [
        { id: "lb13a", text: "Wall 1 — Archdrake Shield, Archdrake Robes", items: ["Archdrake Shield", "Archdrake Robes"] },
        { id: "lb13b", text: "Wall 2 — Golden Wing Shield, Soul of a Brave Warrior, Bracing Knuckle Ring", items: ["Golden Wing Shield", "Soul of a Brave Warrior", "Bracing Knuckle Ring"] },
        { id: "lb13c", text: "Wall 3 — Bleed Stone, Northern Ritual Band", items: ["Bleed Stone", "Northern Ritual Band"] },
        { id: "lb13d", text: "Wall 4 — Ricard's Rapier", items: ["Ricard's Rapier"] },
        { id: "lb13e", text: "Wall 5 — Old Knight Greatshield, Old Knight Pike, Smooth & Silky Stone, etc.", items: ["Old Knight Greatshield", "Old Knight Pike", "Smooth & Silky Stone"] },
        { id: "lb13f", text: "Wall 6 — souls, Radiant Lifegem, Torch (stray balcony)", items: ["Radiant Lifegem", "Torch", "Soul of a Lost Undead"] },
      ]),
      item("lb14", "Bracing Knuckle Ring +1 (explosive barrel area)", "item"),
      item("lb15", "Pharros/Servants' Quarters: hidden path → Great Lightning Spear, Olenford's Staff", "item", null, ["pharros", "illusory"]),
    ],
  },
  huntsmans_copse: {
    name: "Huntsman's Copse",
    lvl: "55–65",
    items: [
      item("hc1", "Pay Licia 2,000 souls at Majula rotunda to open path", "key"),
      item("hc2", "Undead Lockaway bonfire", "bonfire"),
      item("hc3", "Talk to Felkin the Outcast — hex merchant. 8 INT+8 FTH to shop; 20/20 BASE stats (no gear!) → Sunset Staff + Hexer's Set free", "npc"),
      item("hc6", "Soul Spear sorcery, Magic Mace, Titanite Shard (hut/cave to the right)", "item", null, ["spell:sorcery"]),
      item("hc5", "Token of Fidelity + Pharros Lockstone (across bridge gap)", "item"),
      item("hc7", "Estus Flask Shard — cave area", "item", null, ["estus:4"]),
      item("hc8", "BOSS: SKELETON LORDS — kill one at a time, clear adds", "boss"),
      item("hc4", "Free Creighton the Wanderer (find Undead Lockaway Key) → Fist Pump gesture", "npc", "pate_creighton:2", ["gesture:fist_pump"]),
      item("hc9", "Undead Purgatory → BOSS: EXECUTIONER'S CHARIOT — hit lever to stop chariot", "boss"),
      item("hc10", "Brotherhood of Blood covenant (Titchy Gren, after Chariot)", "npc", null, ["covenant:brotherhood_of_blood"]),
      item("hc11", "Illusory (press A/X): Bridge Approach cave — mushrooms to bottom, corner opposite chest → Royal Soldier's Ring, souls, Crystal Lizard", "item", null, ["illusory", "crystal_lizard"]),
    ],
  },
  harvest_valley: {
    name: "Harvest Valley",
    lvl: "60–70",
    items: [
      item("hv1", "Harvest Valley bonfire", "bonfire"),
      item("hv2", "Fragrant Branch of Yore (cave with poison)", "item", null, ["branch"]),
      item("hv3", "Sublime Bone Dust — chest past poison pools", "item", null, ["bone:2"]),
      item("hv4", "Talk to Gavlan (poison building) — 'Gavlan wheel, Gavlan deal'. Exhaust dialogue → moves later", "npc", "gavlan:2"),
      item("hv5", "Heirs of the Sun altar — across bridge, go left. Kneel → Praise the Sun gesture", "key", null, ["gesture:praise_the_sun", "covenant:heirs_of_the_sun"]),
      item("hv7", "Board walls (Dark Giant breaks): Radiant Lifegem, Crimson Water (tricky jump)", "item", null, ["secret"]),
      item("hv6", "BOSS: COVETOUS DEMON — shoot pots to distract", "boss"),
    ],
  },
  earthen_peak: {
    name: "Earthen Peak",
    lvl: "65–75",
    items: [
      item("ep1", "Lower Earthen Peak bonfire", "bonfire"),
      item("ep5", "★ BURN THE WINDMILL ★ Light torch → interact with windmill base. Drains ALL poison from boss arena", "warn"),
      item("ep2", "⚔ Lucatiel — SotFS: go DOWN to poison water, follow passage RIGHT", "npc", "lucatiel:3"),
      item("ep3", "Talk to Laddersmith Gilligan — pay 2,000 → Prostration gesture. Exhaust → moves to Majula", "npc", null, ["gesture:prostration"]),
      item("ep4", "Mirrah Shield (chest above moving platform)", "item"),
      item("ep6", "Talk to Mild-Mannered Pate (if met before) — questline progress", "npc", "pate_creighton:3"),
      item("ep7", "BOSS: MYTHA, THE BANEFUL QUEEN — BURN WINDMILL FIRST. Summon: Jester Thomas", "boss"),
      item("ep8", "Estus Flask Shard — in the area", "item", null, ["estus:5"]),
      item("ep9", "Illusory (press A/X): behind 3 poison jars → Spell Quartz Ring +1, Petrified Something", "item", null, ["illusory"]),
      item("ep10", "Illusory: above boss door left → Upper Earthen Peak Bonfire; right → Fire Arrow x20", "item", null, ["illusory"], [
        { id: "ep10a", text: "Upper Earthen Peak Bonfire (left)", items: [] },
        { id: "ep10b", text: "Fire Arrow x20 (right)", items: ["Fire Arrow x20"] },
      ]),
      item("ep11", "Pharros: bottom poison room → Poisonbite Ring; mushroom area → healing pool (after windmill)", "item", null, ["pharros"]),
    ],
  },
  iron_keep: {
    name: "Iron Keep / Belfry Sol",
    lvl: "80–90",
    items: [
      item("ik1", "Threshold Bridge bonfire → Iron Keep proper", "bonfire"),
      item("ik2", "Covetous Gold Serpent Ring +1 (chest)", "item"),
      item("ik6", "Talk to Magerold of Lanafir — sells Branch, Lockstones, Warmth pyro", "npc"),
      item("ik3", "Estus Flask Shard — platform jumps near lava", "item", null, ["estus:6"]),
      item("ik4", "Sublime Bone Dust — chest near lava", "item", null, ["bone:3"]),
      item("ik5", "Iron Key — opens doors in Forest of Fallen Giants", "key"),
      item("ik7", "Optional: Summon Lucatiel for SMELTER DEMON (sign outside fog gate)", "boss", "lucatiel_boss:smelter"),
      item("ik8", "BOSS: SMELTER DEMON (optional) — very tough, fire damage", "boss"),
      item("ik9", "BOSS: OLD IRON KING — watch the lava hole! Lord Soul #2", "boss"),
      item("ik10", "Light Primal Bonfire", "bonfire"),
      item("ik11", "Belfry Sol — Pharros wall in Iron Keep. Bell Keeper area", "key", null, ["pharros"]),
      item("ik12", "Life Ring +1 (illusory: room right of flaming bull, right wall)", "item", null, ["illusory"]),
      item("ik13", "Illusory: Belfry Sol return — walls on right before bonfire jump", "item", null, ["illusory"], [
        { id: "ik13a", text: "Grand Spirit Tree Shield", items: ["Grand Spirit Tree Shield"] },
        { id: "ik13b", text: "Protective Chime", items: ["Protective Chime"] },
        { id: "ik13c", text: "Black Knight Greatsword", items: ["Black Knight Greatsword"] },
      ]),
    ],
  },
  the_pit: {
    name: "The Pit / Grave of Saints",
    lvl: "45–55",
    items: [
      item("pt1", "Majula Pit — buy ladder from Gilligan (12,000) or use Silvercat Ring", "key"),
      item("pt2", "Grave of Saints bonfire", "bonfire"),
      item("pt3", "Pharros Lockstones: reveal walls/traps throughout", "item"),
      item("pt4", "BOSS: ROYAL RAT VANGUARD — kill the mohawk rat", "boss"),
      item("pt5", "Talk to Rat King → join Rat King covenant", "npc", null, ["covenant:rat_king"]),
    ],
  },
  the_gutter: {
    name: "The Gutter",
    lvl: "65–75",
    items: [
      item("gt1", "Upper Gutter bonfire", "bonfire"),
      item("gt2", "Light sconces as you go for navigation", "item"),
      item("gt3", "Fragrant Branch of Yore (on corpse)", "item", null, ["branch"]),
      item("gt4", "Dark Pyromancy Flame (hidden path)", "item"),
      item("gt5", "Navigate the wooden maze carefully → leads to Black Gulch", "key"),
    ],
  },
  black_gulch: {
    name: "Black Gulch",
    lvl: "65–75",
    items: [
      item("bg1", "Black Gulch Mouth bonfire. BREAK POISON STATUES as you go", "bonfire"),
      item("bg2", "Fragrant Branch on corpse BEFORE entering — SAVE for hidden bonfire statue", "item", null, ["branch"]),
      item("bg3", "Scraps of Life hex (cave with worm enemies)", "item", null, ["spell:hex"]),
      item("bg11", "Shotel (cave)", "item"),
      item("bg4", "⚔ Lucatiel — HIDDEN: from 1st bonfire go left, edge cliff, DROP DOWN near 3 poison statues", "npc", "lucatiel:4"),
      item("bg5", "Hidden bonfire path: from fog gate hug LEFT wall → narrow path → petrified statue (use Branch)", "key"),
      item("bg6", "Hidden Chamber bonfire + Lucatiel summon sign for The Rotten", "bonfire"),
      item("bg7", "Darkdiver Grandahl — cave on RIGHT ledge of Black Gulch", "npc", "grandahl:1"),
      item("bg8", "Optional: Summon Lucatiel for THE ROTTEN (easiest boss survival)", "boss", "lucatiel_boss:rotten"),
      item("bg9", "BOSS: THE ROTTEN — stay behind him, dodge AoE dark attack. Lord Soul", "boss"),
      item("bg10", "Light Primal Bonfire", "bonfire"),
    ],
  },
  shaded_woods: {
    name: "Shaded Woods",
    lvl: "80–90",
    items: [
      item("sw1", "Use Fragrant Branch on Rosabeth of Melfia (petrified statue blocking path)", "key", null, ["branch"]),
      item("sw2", "Give Rosabeth clothing, exhaust dialogue → Joy gesture. She moves to Majula", "npc", null, ["gesture:joy"]),
      item("sw4", "Ruined Fork Road bonfire", "bonfire"),
      item("sw3", "Talk to Benhart again here — exhaust dialogue", "npc", "benhart:2"),
      item("sw5", "Foggy area LEFT WALL → Head of Vengarl. Exhaust dialogue → Decapitate gesture", "npc", null, ["gesture:decapitate"]),
      item("sw6", "Equip Ring of Whispers → talk to Manscorpion Tark → Warmup gesture", "npc", null, ["gesture:warmup"]),
      item("sw7", "BOSS: SCORPIONESS NAJKA — Tark can be summoned", "boss"),
      item("sw8", "Return to Tark after Najka (Ring of Whispers on) → Second Dragon Ring + Branch", "npc"),
      item("sw9", "Estus Flask Shard — in the ruins area", "item", null, ["estus:7"]),
      item("sw10", "Use Branch on Lion Warrior for Fang Key access", "item", null, ["branch"]),
      item("sw11", "Three-path fork: Left=fog/Vengarl, Straight=Pharros/Tseldora, Right=Shrine of Winter", "key"),
    ],
  },
  doors_of_pharros: {
    name: "Doors of Pharros",
    lvl: "80–90",
    items: [
      item("dp1", "Doors of Pharros bonfire", "bonfire"),
      item("dp2", "Save Pharros Lockstones — most contraptions here are traps/minor", "item"),
      item("dp3", "Twisted Barricade hex (corpse)", "item", null, ["spell:hex"]),
      item("dp4", "Santier's Spear (chest), Gyrm Greatshield", "item", undefined, undefined, [
        { id: "dp4a", text: "Santier's Spear", items: ["Santier's Spear"] },
        { id: "dp4b", text: "Gyrm Greatshield", items: ["Gyrm Greatshield"] },
      ]),
      item("dp5", "Gavlan — final location (moved from Harvest Valley)", "npc", "gavlan:3"),
      item("dp6", "Darkdiver Grandahl — hidden cave in the area", "npc", "grandahl:2"),
      item("dp7", "BOSS: ROYAL RAT AUTHORITY — KILL SMALL RATS FIRST (toxic!)", "boss"),
      item("dp8", "After both rat bosses → Shalquoir sells Flying Feline Boots", "item"),
    ],
  },
  brightstone_cove: {
    name: "Brightstone Cove Tseldora",
    lvl: "90–100",
    items: [
      item("bc1", "Royal Army Campsite bonfire", "bonfire"),
      item("bc2", "Estus Flask Shard — before spider area", "item", null, ["estus:8"]),
      item("bc12", "Illusory (press A/X): Prowling Magus room — left of entrance → Estus Flask Shard", "item", null, ["illusory"]),
      item("bc13", "Pickaxe (chamber past crystal pit bridge — pig clears mushrooms)", "item"),
      item("bc14", "Great Fireball pyromancy", "item", null, ["spell:pyromancy"]),
      item("bc3", "Sublime Bone Dust (chest)", "item", null, ["bone:4"]),
      item("bc5", "Summon Benhart for PROWLING MAGUS — sign near campsite bonfire. MUST SURVIVE", "boss", "benhart_boss:magus"),
      item("bc6", "BOSS: PROWLING MAGUS AND CONGREGATION — easy, kill mages first", "boss"),
      item("bc4", "Cromwell the Pardoner — after Prowling Magus. Pardons sins for souls", "npc"),
      item("bc7", "Pate & Creighton confrontation: find them fighting → help one kill the other", "npc", "pate_creighton:4"),
      item("bc8", "BOSS: THE DUKE'S DEAR FREJA — 2 heads, damage heads only. Lord Soul", "boss"),
      item("bc9", "Light Primal Bonfire", "bonfire"),
      item("bc10", "Brightstone Key → Lord's Private Chamber: Great Lightning Spear, Fire Tempest", "key", null, ["spell:miracle", "spell:pyromancy"]),
      item("bc11", "Kill Vengarl's Body → return to Head in Shaded Woods → gear + War Cry gesture", "item", null, ["gesture:war_cry"]),
    ],
  },
  sinners_rise: {
    name: "Sinner's Rise",
    lvl: "95–105",
    items: [
      item("sr1", "Sinner's Rise bonfire", "bonfire"),
      item("sr2", "Sublime Bone Dust — in water area", "item", null, ["bone:5"]),
      item("sr7", "Illusory (press A/X): basement elevator — first alcove right, wall facing entrance → Estus Flask Shard", "item", null, ["illusory"]),
      item("sr3", "★ Light oil trails BOTH SIDES of fog gate with torch → enables lock-on in boss room", "warn"),
      item("sr4", "Summon Lucatiel (bottom of elevator) for Lost Sinner — good survival fight", "boss", "lucatiel_boss:sinner"),
      item("sr5", "BOSS: THE LOST SINNER — aggressive, parry effective. Lord Soul", "boss"),
      item("sr6", "Light Primal Bonfire", "bonfire"),
    ],
  },
  drangleic_castle: {
    name: "Drangleic Castle",
    lvl: "95–105",
    items: [
      item("dc1", "Shrine of Winter → need 4 Lord Souls (or high Soul Memory)", "key"),
      item("dc2", "Kill enemies near golem doors to power them open", "key"),
      item("dc3", "King's Gate bonfire", "bonfire"),
      item("dc4", "Chancellor Wellager — exhaust dialogue → This One's Me gesture", "npc", null, ["gesture:this_ones_me"]),
      item("dc7", "Estus Flask Shard — in the castle", "item", null, ["estus:9"]),
      item("dc12", "Illusory (press A/X): tower with kneeling knights — ladder down, right corner → Faraam Set, Forgotten Chamber bonfire", "item", null, ["illusory"]),
      item("dc5", "Darkdiver Grandahl — DROP THROUGH fragile floor in Ruin Sentinel room → hidden cave", "npc", "grandahl:3", ["covenant:pilgrims_of_dark"]),
      item("dc6", "Join Pilgrims of Dark covenant now — enter Dark Chasms at all 3 Grandahl locations", "key"),
      item("dc8", "BOSS: TWIN DRAGONRIDERS — kill archer first", "boss"),
      item("dc9", "Benhart of Jugo — after Twin Dragonriders. Exhaust dialogue", "npc", "benhart:3"),
      item("dc10", "BOSS: LOOKING GLASS KNIGHT — summons phantoms from mirror", "boss"),
      item("dc11", "Key to King's Passage", "key"),
    ],
  },
  shrine_of_amana: {
    name: "Shrine of Amana",
    lvl: "95–105",
    items: [
      item("sa1", "Crumbled Ruins bonfire. USE A BOW to snipe priestesses", "bonfire"),
      item("sa2", "Estus Flask Shard — in the water area", "item", null, ["estus:10"]),
      item("sa7", "Pharros: water near ramp (Crumbled Ruins) → hidden cave with Helix Halberd", "item", null, ["pharros"]),
      item("sa3", "Sunlight Blade miracle (chest past hidden path)", "item", null, ["spell:miracle"]),
      item("sa4", "Havel's Set (chest in cave)", "item"),
      item("sa5", "Talk to Milfanito (singing woman) — Smooth & Silky Stone", "npc"),
      item("sa6", "BOSS: DEMON OF SONG — attack when face exposed", "boss"),
    ],
  },
  undead_crypt: {
    name: "Undead Crypt",
    lvl: "100–110",
    items: [
      item("uc1", "Undead Ditch bonfire", "bonfire"),
      item("uc2", "★ DO NOT LIGHT TORCHES OR RING BELLS — spawns enemies, PERMANENTLY aggros Agdayne", "warn"),
      item("uc3", "Talk to Grave Warden Agdayne WITHOUT torch → Have Mercy! gesture + hex vendor", "npc", null, ["gesture:have_mercy"]),
      item("uc4", "Avelyn, Heavy Bolt x15 (illusory: stairs room, right wall)", "item", null, ["illusory"]),
      item("uc9", "Illusory: gray stripe hallway → Great Lightning Spear, Olenford's Staff. Pharros behind illusory wall", "item", null, ["illusory", "pharros"]),
      item("uc5", "BOSS: VELSTADT, THE ROYAL AEGIS — 2nd phase dark buff", "boss"),
      item("uc6", "Enter Vendrick's chamber — pick up King's Ring", "key"),
      item("uc7", "Vendrick walks around hollow — need Giant Souls to fight him later (each halves defense)", "npc"),
      item("uc8", "Return to Agdayne with King's Ring → Darkdrift katana + Agdayne's Set", "npc"),
    ],
  },
  aldias_keep: {
    name: "Aldia's Keep",
    lvl: "100–110",
    items: [
      item("ak1", "Use King's Ring on King's Gate in Shaded Woods to access", "key"),
      item("ak2", "Foregarden bonfire", "bonfire"),
      item("ak3", "Estus Flask Shard — in the area", "item", null, ["estus:11"]),
      item("ak4", "Soul Vessel (chest)", "item"),
      item("ak9", "Illusory: staircase to acid room — middle of wall → Malformed Shell", "item", null, ["illusory"]),
      item("ak10", "Ogre breaks chained door (cage hallway) → Fire Seed, Steel Set", "item", null, ["secret"]),
      item("ak11", "Pharros: long hall creates light", "item", null, ["pharros"]),
      item("ak5", "⚠ LUCATIEL — small hut on LEFT exterior. DO NOT TALK until 3+ boss survivals!", "npc", "lucatiel:5"),
      item("ak6", "Talk to Aldia at bonfire (affects ending)", "npc"),
      item("ak7", "Navlaan (behind barrier) — talk while HOLLOW for assassination quests. Do NOT pull lever while human", "npc"),
      item("ak8", "BOSS: GUARDIAN DRAGON — ranged helps. Leads to Dragon Aerie", "boss"),
    ],
  },
  dragon_aerie: {
    name: "Dragon Aerie / Dragon Shrine",
    lvl: "105–115",
    items: [
      item("da1", "Dragon Aerie bonfire. Crystal Lizards EVERYWHERE (11) — kill all for upgrade mats", "bonfire"),
      item("da2", "Petrified Dragon Bones, Twinkling Titanite throughout", "item"),
      item("da9", "Pharros: Dragon Shrine — under boxes behind first knight → Judgement Set, Judgement Staff", "item", null, ["pharros"]),
      item("da3", "Dragon Shrine: DON'T attack Dragon Knights — they're honorable in SotFS, won't attack", "warn"),
      item("da4", "Talk to Emerald Herald at entrance → Aged Feather (infinite Homeward Bone)", "npc"),
      item("da5", "Pick up Petrified Egg → give to Magerold (Iron Keep) → Dragon Remnants covenant", "key", null, ["covenant:dragon_remnants"]),
      item("da6", "Talk to Ancient Dragon → Ashen Mist Heart (DON'T fight him yet)", "npc"),
      item("da7", "Estus Flask Shard — chest", "item", null, ["estus:12"]),
      item("da8", "Optional: BOSS: ANCIENT DRAGON — huge HP, one-shot fire. Drops Soul of a Giant", "boss"),
    ],
  },
  memories: {
    name: "Memories (Orro/Vammar/Jeigh)",
    lvl: "110–120",
    items: [
      item("mm1", "Need Ashen Mist Heart to enter Giant Memories", "key"),
      item("mm2", "Memory of Vammar — Captain Drummond → Hurrah! gesture", "npc", null, ["gesture:hurrah"]),
      item("mm3", "Memory of Vammar: Soul of a Giant", "item"),
      item("mm4", "Memory of Orro: Soul of a Giant. Benhart summon available", "item"),
      item("mm8", "Memory of Orro: Illusory + Pharros → Steel Set, Fire Seed (skip trap contraption)", "item", null, ["illusory", "pharros"]),
      item("mm5", "Memory of Jeigh: BOSS: GIANT LORD — great for soul farming", "boss"),
      item("mm6", "Summon Benhart for Giant Lord — MUST SURVIVE. Do NOT summon Drummond too", "boss", "benhart_boss:giant_lord"),
      item("mm7", "Giant Lord drops: Giant Lord Soul + Soul of a Giant", "item"),
    ],
  },
  dark_chasm: {
    name: "Dark Chasm of Old",
    lvl: "95–105",
    items: [
      item("ch1", "Enter at each of Grandahl's 3 locations — costs 1 Human Effigy each", "key"),
      item("ch2", "Chasm 1: Black Gulch — light sconce at end, kill all enemies", "key"),
      item("ch3", "Chasm 2: Shaded Woods — light sconce at end (easiest chasm)", "key"),
      item("ch4", "Chasm 3: Drangleic Castle — light sconce at end", "key"),
      item("ch5", "Complete all 3 → BOSS: DARKLURKER appears in next entry. Weak to FIRE", "boss"),
      item("ch6", "Talk to Grandahl after → Rank 1: Resonant Soul, Rank 2: Great Resonant Soul, Rank 3: Climax + Xanthous Set", "npc", null, ["spell:hex", "spell:hex", "spell:hex"]),
    ],
  },
  throne_of_want: {
    name: "Throne of Want (Endgame)",
    lvl: "110–120",
    items: [
      item("tw1", "BOSS: THRONE WATCHER & DEFENDER — kill close together or they revive", "boss"),
      item("tw2", "Summon Benhart — sign right of fog gate. MUST SURVIVE (questline!)", "boss", "benhart_boss:throne"),
      item("tw3", "BOSS: NASHANDRA — final boss. Bring curse-curing items", "boss"),
      item("tw4", "BOSS: ALDIA (if all dialogue exhausted) — alternate ending available", "boss"),
      item("tw5", "Ending: Sit on Throne (Link Fire) OR Walk Away (SotFS ending with Aldia)", "key"),
    ],
  },
  dlc_sunken: {
    name: "DLC 1: Crown of the Sunken King",
    lvl: "DLC",
    items: [
      item("d11", "Access via Primal Bonfire in Black Gulch → Shulva", "key"),
      item("d12", "Sanctum Walk bonfire", "bonfire"),
      item("d13", "Eternal Sanctum Key, Dragon Stone", "key"),
      item("d14", "Focus Souls sorcery, Promised Walk of Peace hex", "item", null, ["spell:sorcery", "spell:hex"]),
      item("d19", "Illusory: Dragon's Sanctum — left wall after Black Drakeblood Knight drop → Sanctum Interior bonfire", "item", null, ["illusory"]),
      item("d15", "Lightning Clutch Ring", "item"),
      item("d16", "BOSS: ELANA, THE SQUALID QUEEN — summons Velstadt phantom", "boss"),
      item("d17", "BOSS: SINH, THE SLUMBERING DRAGON — destroys weapon durability, bring backups", "boss"),
      item("d18", "Optional BOSS: GRAVEROBBER, VARG & CERAH — 3-NPC gank, extremely hard", "boss"),
    ],
  },
  dlc_iron: {
    name: "DLC 2: Crown of the Old Iron King",
    lvl: "DLC",
    items: [
      item("d21", "Access via Primal Bonfire in Iron Keep → Brume Tower", "key"),
      item("d22", "Throne Floor bonfire", "bonfire"),
      item("d23", "Collect ALL Smelter Wedges (11) — destroy Ashen Idols", "key"),
      item("d28", "Illusory: after 2nd Ashen Idol — snowy ledge → Soul Vessel x2, herbs; Foyer elevator mash A/X → Hollow Skin", "item", null, ["illusory"]),
      item("d24", "Outcry pyromancy (from Nadalia Soul fragments), Dance of Fire pyro", "item", null, ["spell:pyromancy", "spell:pyromancy"]),
      item("d25", "BOSS: FUME KNIGHT — one of the hardest in all Souls. Destroy nearby Idols first", "boss"),
      item("d26", "Optional BOSS: SIR ALONNE — Memory of Old Iron King. Very fast samurai", "boss"),
      item("d27", "Optional BOSS: BLUE SMELTER DEMON — Iron Passage. Magic damage version", "boss"),
    ],
  },
  dlc_ivory: {
    name: "DLC 3: Crown of the Ivory King",
    lvl: "DLC",
    items: [
      item("d31", "Access via Shrine of Winter → Frozen Eleum Loyce", "key"),
      item("d32", "Outer Wall bonfire", "bonfire"),
      item("d33", "Get Eye of the Priestess — makes invisible enemies visible", "key"),
      item("d34", "★ Find ALL 4 Loyce Knights before Ivory King boss — they close portals in arena", "warn"),
      item("d35", "Loyce Knight 1: near first bonfire", "item"),
      item("d36", "Loyce Knight 2: main castle area", "item"),
      item("d37", "Loyce Knight 3: lower area past elevator", "item"),
      item("d38", "Loyce Knight 4: requires area progression", "item"),
      item("d314", "Pharros: bridge with ballistas → Durgo's Hat", "item", null, ["pharros"]),
      item("d39", "BOSS: AAVA, THE KING'S PET — get Eye of Priestess first or she's invisible", "boss"),
      item("d310", "BOSS: BURNT IVORY KING — Loyce Knights close portals, then King drops. Epic fight", "boss"),
      item("d311", "Optional: Lucatiel summon in Grand Cathedral (if Aldia's Keep dialogue done)", "boss", "lucatiel_boss:ivory_king"),
      item("d312", "Optional BOSS: LUD & ZALLEN — Frigid Outskirts. The run IS the boss", "boss"),
      item("d313", "Soul Flash sorcery, Blizzard sorcery", "item", null, ["spell:sorcery", "spell:sorcery"]),
    ],
  },
};

export function getArea(id: AreaId): Area {
  return { id, ...AREAS[id] };
}
