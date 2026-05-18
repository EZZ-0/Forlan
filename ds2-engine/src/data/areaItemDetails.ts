/**
 * Per-item 100% guidance — where, how to get there, how to obtain.
 * Covers Iron Keep onwards for detailed checklist support.
 */

export interface ChecklistItemDetail {
  itemId: string;
  where: string;
  howToGetThere: string;
  howToObtain?: string;
  items?: string[];
  warning?: string;
}

/** Areas with 100% guidance data (all areas) */
export const AREAS_WITH_100_GUIDANCE = [
  "things_betwixt",
  "majula",
  "forest_of_fallen_giants",
  "heides_tower",
  "no_mans_wharf",
  "lost_bastille",
  "huntsmans_copse",
  "harvest_valley",
  "earthen_peak",
  "iron_keep",
  "the_pit",
  "the_gutter",
  "black_gulch",
  "shaded_woods",
  "doors_of_pharros",
  "brightstone_cove",
  "sinners_rise",
  "drangleic_castle",
  "shrine_of_amana",
  "undead_crypt",
  "aldias_keep",
  "dragon_aerie",
  "memories",
  "dark_chasm",
  "throne_of_want",
  "dlc_sunken",
  "dlc_iron",
  "dlc_ivory",
] as const;

export type AreaWith100Guidance = (typeof AREAS_WITH_100_GUIDANCE)[number];

/** Per-item details: itemId → detail. Only items with extra guidance are listed. */
export const AREA_ITEM_DETAILS: Record<string, ChecklistItemDetail> = {
  // ─── THINGS BETWIXT ───
  tb1: {
    itemId: "tb1",
    where: "Gap in wall beside fallen tree — turn right",
    howToGetThere: "1) From the house, go outside. 2) Look for a fallen tree with a gap in the wall. 3) Turn right into the gap.",
    howToObtain: "Pick up from ground.",
    items: ["Rusted Coin"],
  },
  tb5: {
    itemId: "tb5",
    where: "Inside the house",
    howToGetThere: "1) Create character, exit to main area. 2) The bonfire is in the house.",
    howToObtain: "Light the bonfire.",
  },
  tb9: {
    itemId: "tb9",
    where: "Tutorial area — bird nest (Dyna & Tillo)",
    howToGetThere: "1) Fog Gate 1: Get Dagger and Lifegem. 2) At the bird nest, drop the Small Smooth & Silky Stone for a random item. 3) Kick down the ladder.",
    howToObtain: "Drop Small Smooth & Silky Stone at nest. Kick ladder.",
  },
  tb13: {
    itemId: "tb13",
    where: "Path to Majula — between boulders on the right",
    howToGetThere: "1) After the coffin, continue toward Majula. 2) Between the boulders on the right, you'll find three items.",
    howToObtain: "Pick up from ground.",
    items: ["Morning Star", "Cleric's Sacred Chime", "Binoculars"],
  },

  // ─── MAJULA ───
  mj1: {
    itemId: "mj1",
    where: "Bonfire — talk to Emerald Herald",
    howToGetThere: "1) Exit Things Betwixt through the tunnel. 2) Majula is the hub. 3) The bonfire is central. 4) Emerald Herald (Shanalotte) stands nearby.",
    howToObtain: "Light bonfire. Talk to Emerald Herald for Estus Flask.",
  },
  mj6: {
    itemId: "mj6",
    where: "Well near mansion",
    howToGetThere: "1) From bonfire, go toward the large mansion. 2) There's a well nearby. 3) Hit the rock in the well.",
    howToObtain: "Hit the rock.",
    items: ["Estus Flask Shard"],
  },
  mj9: {
    itemId: "mj9",
    where: "Sweet Shalquoir shop — cat in house",
    howToGetThere: "1) The cat (Sweet Shalquoir) is in a house. 2) Talk to her to open shop.",
    howToObtain: "Buy Silvercat Ring (13,400) and Ring of Whispers (5,800).",
    items: ["Silvercat Ring", "Ring of Whispers"],
  },
  mj12: {
    itemId: "mj12",
    where: "Path to Forest of Fallen Giants",
    howToGetThere: "1) From Majula, take the path toward Forest of Fallen Giants. 2) Chest in building with Rusted Coin. 3) Pull switch. 4) Drop down for Human Effigy, jump across for Homeward Bone.",
    howToObtain: "Open chest, pull switch, pick up items.",
    items: ["Rusted Coin", "Human Effigy", "Homeward Bone"],
  },

  // ─── FOREST OF FALLEN GIANTS ───
  fg1: {
    itemId: "fg1",
    where: "Crestfallen's Retreat — by the river",
    howToGetThere: "1) From Majula, take path to Forest of Fallen Giants. 2) First bonfire is Crestfallen's Retreat.",
    howToObtain: "Light the bonfire.",
  },
  fg4: {
    itemId: "fg4",
    where: "Cardinal Tower",
    howToGetThere: "1) From Crestfallen's Retreat, cross the river and go up ladders. 2) Cardinal Tower bonfire is in the main building.",
    howToObtain: "Light the bonfire.",
  },
  fg5: {
    itemId: "fg5",
    where: "Merchant Hag Melentia — near Cardinal Tower",
    howToGetThere: "1) From Cardinal Tower bonfire, go through fog gate and up. 2) Melentia sits near the bonfire.",
    howToObtain: "Buy Lenigrast's Key (1,000 souls), Pharros Lockstone (4,000). Exhaust dialogue.",
  },
  fg11: {
    itemId: "fg11",
    where: "Past Flame Salamander — chest in cave",
    howToGetThere: "1) From Cardinal Tower, go down to caves below. 2) Past the Flame Salamander (run or fight). 3) Chest in the cave.",
    howToObtain: "Open the chest.",
    items: ["Fire Longsword"],
  },
  fg17: {
    itemId: "fg17",
    where: "Boss arena — The Last Giant",
    howToGetThere: "1) Use Soldier Key to open doors. 2) Summon Pate (if trap done) or Luet. 3) Boss fog gate.",
    howToObtain: "Defeat The Last Giant. Drops Soul of the Last Giant, Soldier Key.",
  },
  fg19: {
    itemId: "fg19",
    where: "Boss arena — The Pursuer",
    howToGetThere: "1) Use Soldier Key to open Pursuer door. 2) Or use early platform encounter. 3) After killing him, examine bird nest behind arena.",
    howToObtain: "Defeat The Pursuer. Drops Ring of Blades, Soul of the Pursuer. Bird nest → Lost Bastille.",
  },

  // ─── HEIDE'S TOWER ───
  ht1: {
    itemId: "ht1",
    where: "Tower of Flame bonfire",
    howToGetThere: "1) From Majula, take path down the stairs past the monument. 2) First bonfire in Heide's Tower.",
    howToObtain: "Light the bonfire.",
  },
  ht2: {
    itemId: "ht2",
    where: "Upper level — along the path",
    howToGetThere: "1) From Tower of Flame bonfire, explore the upper level. 2) Items are scattered along the path.",
    howToObtain: "Pick up from ground/corpses.",
    items: ["Human Effigy", "Dark Torches", "Soul of a Proud Knight", "Old Knight Halberd"],
  },
  ht5: {
    itemId: "ht5",
    where: "Boss arena — Dragonrider",
    howToGetThere: "1) Pull both levers for full platform. 2) Enter fog gate.",
    howToObtain: "Defeat Dragonrider. Drops Dragonrider Soul.",
  },
  ht7: {
    itemId: "ht7",
    where: "Cathedral of Blue — across the bridge",
    howToGetThere: "1) After Dragonrider, go across the long bridge. 2) Past Heide Knights. 3) Boss fog gate.",
    howToObtain: "Defeat Old Dragonslayer. Drops Old Leo Ring.",
  },

  // ─── NO-MAN'S WHARF ───
  nm1: {
    itemId: "nm1",
    where: "No-Man's Wharf bonfire",
    howToGetThere: "1) From Heide's Tower, take path to the right after Old Dragonslayer. 2) Pull lever to call the ship. 3) Take ship to No-Man's Wharf.",
    howToObtain: "Light the bonfire.",
  },
  nm4: {
    itemId: "nm4",
    where: "House LEFT of first stairs (SotFS)",
    howToGetThere: "1) From bonfire, go toward the dock. 2) Lucatiel is in a house LEFT of the first stairs.",
    howToObtain: "Talk to Lucatiel. Exhaust dialogue.",
  },
  nm6: {
    itemId: "nm6",
    where: "Dock — near the ship",
    howToGetThere: "1) Pull bell lever on dock to call the ship. 2) Boss fog gate near the ship.",
    howToObtain: "Defeat Flexile Sentry. Can summon Lucatiel.",
  },

  // ─── LOST BASTILLE ───
  lb1: {
    itemId: "lb1",
    where: "Tower Apart (bird nest) / Exile Holding Cells (ship)",
    howToGetThere: "1) Route A: Bird nest after Pursuer in FoFG. 2) Route B: Ship from No-Man's Wharf.",
    howToObtain: "Light the bonfire.",
  },
  lb2: {
    itemId: "lb2",
    where: "Tower Apart — chests",
    howToGetThere: "1) From Tower Apart bonfire, explore the area. 2) Chests contain the Dull Ember.",
    howToObtain: "Open chests. GIVE DULL EMBER TO MCDUFF.",
    items: ["Dull Ember"],
  },
  lb7: {
    itemId: "lb7",
    where: "McDuff's Workshop",
    howToGetThere: "1) Use Bastille Key to open McDuff's gate. 2) Give him the Dull Ember.",
    howToObtain: "Give Dull Ember to McDuff. Spend 14,000 for Titanite Slab.",
  },
  lb8: {
    itemId: "lb8",
    where: "Boss arena — Ruin Sentinels",
    howToGetThere: "1) From McDuff's area, progress to boss. 2) Fight first on platform.",
    howToObtain: "Defeat all 3 Ruin Sentinels. Drops Bastille Key.",
  },

  // ─── HUNTSMAN'S COPSE ───
  hc1: {
    itemId: "hc1",
    where: "Majula rotunda — Licia",
    howToGetThere: "1) After Dragonrider, Licia moves to Majula rotunda. 2) Pay her 2,000 souls to rotate the path.",
    howToObtain: "Pay 2,000 souls.",
  },
  hc3: {
    itemId: "hc3",
    where: "Felkin the Outcast — hex merchant",
    howToGetThere: "1) From Undead Lockaway bonfire, find Felkin. 2) Need 8 INT + 8 FTH to shop. 3) 20/20 BASE stats (no gear) for Sunset Staff + Hexer's Set free.",
    howToObtain: "Talk to him. Exhaust dialogue.",
  },
  hc9: {
    itemId: "hc9",
    where: "Undead Purgatory — Executioner's Chariot",
    howToGetThere: "1) From Huntsman's Copse, through the tunnel. 2) Hit lever to stop chariot.",
    howToObtain: "Defeat Executioner's Chariot.",
  },

  // ─── HARVEST VALLEY ───
  hv1: {
    itemId: "hv1",
    where: "Harvest Valley bonfire",
    howToGetThere: "1) From Huntsman's Copse, through tunnel after Executioner's Chariot.",
    howToObtain: "Light the bonfire.",
  },
  hv6: {
    itemId: "hv6",
    where: "Boss arena — Covetous Demon",
    howToGetThere: "1) Cross the bridge, go left. 2) Shoot pots to distract.",
    howToObtain: "Defeat Covetous Demon.",
  },

  // ─── EARTHEN PEAK ───
  ep1: {
    itemId: "ep1",
    where: "Lower Earthen Peak bonfire",
    howToGetThere: "1) From Harvest Valley, up the path past Covetous Demon.",
    howToObtain: "Light the bonfire.",
  },
  ep5: {
    itemId: "ep5",
    where: "Windmill base",
    howToGetThere: "1) Light a torch. 2) Find the windmill base. 3) Interact with it.",
    howToObtain: "BURN THE WINDMILL. Drains ALL poison from boss arena.",
    warning: "MUST do this before Mytha or boss arena is full of poison!",
  },
  ep7: {
    itemId: "ep7",
    where: "Boss arena — Mytha",
    howToGetThere: "1) BURN WINDMILL FIRST. 2) Summon Jester Thomas.",
    howToObtain: "Defeat Mytha the Baneful Queen.",
  },

  // ─── IRON KEEP ───
  ik1: {
    itemId: "ik1",
    where: "Threshold Bridge — start of Iron Keep proper",
    howToGetThere: "1) In Earthen Peak, defeat Mytha the Baneful Queen.\n2) After the boss, exit through the door — you'll see a long bridge over lava.\n3) Cross the bridge. At the far end is the Threshold Bridge bonfire.\n4) Rest at it. You're now in Iron Keep.",
    howToObtain: "Light the bonfire.",
  },
  ik2: {
    itemId: "ik2",
    where: "Chest in first main room — past the bridge, before lava section",
    howToGetThere: "1) Rest at Threshold Bridge bonfire.\n2) Cross the short bridge in front of you into the keep.\n3) You'll enter a large room with Alonne Knights (armored samurai).\n4) As you enter, look to your LEFT — there's a chest against the wall.\n5) The chest has Covetous Gold Serpent Ring +1.",
    howToObtain: "Open the chest.",
    items: ["Covetous Gold Serpent Ring +1"],
  },
  ik3: {
    itemId: "ik3",
    where: "Lava platform area — series of moving platforms over lava",
    howToGetThere: "1) From Threshold Bridge, go through the first room (past the CGSR chest).\n2) Continue forward — you'll reach a section with lava and moving platforms.\n3) The platforms move in and out. Wait for one to come to you, then jump onto it.\n4) Jump from platform to platform toward the far side.\n5) The Estus Shard is on a corpse on one of the platforms — usually the 2nd or 3rd platform.\n6) Time your jumps carefully; falling in lava = death.",
    howToObtain: "Pick up from corpse on platform.",
    items: ["Estus Flask Shard"],
  },
  ik4: {
    itemId: "ik4",
    where: "Chest near lava — past platform jumps",
    howToGetThere: "1) After getting the Estus Shard (ik3), continue jumping across the lava platforms.\n2) Reach the far side of the lava section.\n3) Proceed forward — you'll see a chest before the path splits to Smelter Demon.\n4) The chest is against a wall, near more lava. Sublime Bone Dust inside.",
    howToObtain: "Open the chest.",
    items: ["Sublime Bone Dust"],
  },
  ik5: {
    itemId: "ik5",
    where: "Chest in room before Old Iron King",
    howToGetThere: "1) From the lava area, you can go LEFT (Smelter Demon, optional) or continue the main path.\n2) Take the main path forward — skip the Smelter Demon side route for now.\n3) You'll pass through rooms with more Alonne Knights.\n4) Just before the Old Iron King boss fog gate, there's a room on the right with a chest.\n5) Open it — Iron Key inside. (Opens doors in Forest of Fallen Giants.)",
    howToObtain: "Open the chest.",
    items: ["Iron Key"],
  },
  ik6: {
    itemId: "ik6",
    where: "Sitting on a crate near the bridge — main path",
    howToGetThere: "1) From Threshold Bridge bonfire, cross the bridge into the keep.\n2) Before you reach the first big room with Alonne Knights, look along the main path.\n3) Magerold of Lanafir sits on a wooden crate to the side — he's hard to miss.\n4) Talk to him. He sells Fragrant Branch, Pharros Lockstones, Warmth pyromancy.\n5) Exhaust his dialogue. Later: give him Petrified Egg (from Dragon Shrine) for Dragon Remnants covenant.",
    howToObtain: "Talk to him. Exhaust dialogue. Sells Fragrant Branch, Pharros Lockstones, Warmth pyromancy.",
  },
  ik7: {
    itemId: "ik7",
    where: "Outside Smelter Demon fog gate — right side",
    howToGetThere: "1) From Threshold Bridge, go through the first room and lava platforms.\n2) When the path splits, take the LEFT path (leads to Smelter Demon).\n3) Fight or run past the knights. You'll reach a fog gate.\n4) Lucatiel's summon sign is on the ground to the RIGHT of the fog gate, just before you enter.\n5) Be HUMAN (use Human Effigy) to see it. Summon her — she must survive for quest.",
    howToObtain: "Be human. Summon Lucatiel. She must survive the fight for quest progress.",
    warning: "Smelter Demon is very tough. Lucatiel often dies. Consider summoning another NPC too.",
  },
  ik8: {
    itemId: "ik8",
    where: "Optional boss arena — branch off main path",
    howToGetThere: "1) From the lava platforms, when the path splits, go LEFT (not straight to Old Iron King).\n2) Fight through the knights. You'll reach a fog gate.\n3) Enter the fog — Smelter Demon boss arena.\n4) He's optional but drops Smelter Demon Soul. Very tough, fire damage.\n5) Use fire resistance gear/rings if you fight him.",
    howToObtain: "Defeat Smelter Demon. Fire damage — use fire resistance.",
    items: ["Smelter Demon Soul"],
  },
  ik9: {
    itemId: "ik9",
    where: "Main boss arena — lava pit room",
    howToGetThere: "1) From Threshold Bridge, go through the keep (skip or beat Smelter).\n2) Take the main path forward — past the Iron Key chest room.\n3) You'll reach a fog gate. Enter — Old Iron King arena.\n4) Big room with lava. The boss emerges from the lava.\n5) WATCH THE HOLE in the floor — he can punch you into it. Stay away from the edges.",
    howToObtain: "Defeat Old Iron King. WATCH THE HOLE in the arena floor — he can knock you in.",
    items: ["Old Iron King Soul"],
    warning: "Do NOT sell Lord Souls — needed for boss weapon/spell trades.",
  },
  ik10: {
    itemId: "ik10",
    where: "After Old Iron King — Primal Bonfire",
    howToGetThere: "1) Defeat Old Iron King.\n2) Exit through the door that opens behind where he emerged.\n3) Walk forward — the Primal Bonfire is in the next room.\n4) Light it. This is your access point for DLC 2 (Brume Tower) later.",
    howToObtain: "Light the bonfire. Access point for DLC 2 (Brume Tower).",
  },
  ik11: {
    itemId: "ik11",
    where: "Pharros contraption — wall in Iron Keep, opens Belfry Sol",
    howToGetThere: "1) From Threshold Bridge, progress through the keep.\n2) There are several Pharros contraptions: two add water to lava pools (help you survive), one opens Belfry Sol.\n3) The Belfry Sol contraption is on a wall in a side area — look for the face-shaped lockstone slot.\n4) Use a Pharros Lockstone on it. A passage opens.\n5) Go through — Belfry Sol (Bell Keeper PvP area). Has its own bonfire and loot.",
    howToObtain: "Use Pharros Lockstone on the wall contraption that leads to Belfry Sol.",
  },
  ik12: {
    itemId: "ik12",
    where: "Room right of flaming bull head — right-hand wall at top of stairs",
    howToGetThere: "1) From Threshold Bridge, cross into the keep.\n2) In the first section, look for a room with a FLAMING BULL HEAD decoration on the wall (it's a distinctive landmark).\n3) Go to the room to the RIGHT of that bull head room.\n4) In that room, go UP the stairs.\n5) At the TOP of the stairs, turn to face the RIGHT wall.\n6) Walk up to the wall and press A/X (interact) — NOT attack. The wall opens. Life Ring +1 inside.",
    howToObtain: "Press A/X (interact) on the wall — NOT attack. DS2 illusory walls use interact.",
    items: ["Life Ring +1"],
  },
  ik13: {
    itemId: "ik13",
    where: "Belfry Sol return path — walls on right before jumping to bonfire",
    howToGetThere: "1) Enter Belfry Sol via the Pharros wall (ik11).\n2) Explore Belfry Sol — kill enemies, get loot.\n3) When returning to Iron Keep, you'll walk along a path that leads to a jump back to the bonfire.\n4) BEFORE you make that jump, look at the walls on your RIGHT.\n5) There are 3 illusory walls in a row. Press A/X on each.\n6) First wall: Grand Spirit Tree Shield. Second: Protective Chime. Third: Black Knight Greatsword.",
    howToObtain: "Press A/X on each wall. Three walls with loot.",
    items: ["Grand Spirit Tree Shield", "Protective Chime", "Black Knight Greatsword"],
  },

  // ─── THE PIT / GRAVE OF SAINTS ───
  pt1: {
    itemId: "pt1",
    where: "Majula — the big pit in the center",
    howToGetThere: "1) Warp or walk to Majula (hub area).\n2) From the bonfire, look toward the center of town — there's a huge PIT.\n3) To descend: either buy the longest ladder from Gilligan (12,000 souls — he moves here from Earthen Peak after you pay him 2k) OR equip Silvercat Ring (buy from Shalquoir for 13,400 souls) and drop down.\n4) With Silvercat: drop in stages. With ladder: place it and climb down.",
    howToObtain: "Buy ladder from Gilligan (12,000 souls) if he's moved from Earthen Peak, OR use Silvercat Ring (13,400 from Shalquoir) to survive the drop.",
  },
  pt2: {
    itemId: "pt2",
    where: "Grave of Saints — first area after dropping through pit",
    howToGetThere: "1) Drop through the Majula pit (using ladder or Silvercat Ring).\n2) You'll land in Grave of Saints — a cave-like area with rats and bridges.\n3) The bonfire is visible soon after you land — it's in the first open area.\n4) Rest at it. This is your base for the Pit route.",
    howToObtain: "Light the bonfire.",
  },
  pt3: {
    itemId: "pt3",
    where: "Throughout Grave of Saints — various contraptions",
    howToGetThere: "1) From Grave of Saints bonfire, explore the area.\n2) Look for face-shaped Pharros contraptions on walls — they have a circular slot.\n3) Use Pharros Lockstones on them. Some lower rope bridges to new areas.\n4) The left contraption at the start turns off torches. Wall contraptions pour water or open paths.\n5) One bridge leads to a room with Poison Moss x2, Whisper of Despair, Torch. Most others are minor.",
    howToObtain: "Use Pharros Lockstones. Some lower bridges to loot (Poison Moss, Whisper of Despair, Torch).",
  },
  pt4: {
    itemId: "pt4",
    where: "Boss arena — Royal Rat Vanguard",
    howToGetThere: "1) From Grave of Saints bonfire, progress through the area.\n2) Cross the bridges, fight or run past rats.\n3) You'll reach a fog gate. Enter — boss arena.\n4) Many small rats spawn. One has a MOHAWK (different hairstyle) — that's the key one.\n5) Kill the mohawk rat FIRST. The others spawn from it. Once it's dead, the rest are easier.",
    howToObtain: "Kill the rat with the MOHAWK first — it's the one that looks different. Others spawn from it.",
    items: ["Royal Rat Vanguard Soul", "Rat Tail"],
  },
  pt5: {
    itemId: "pt5",
    where: "After boss — Rat King in chamber",
    howToGetThere: "1) Defeat Royal Rat Vanguard.\n2) Exit the boss arena through the door that opens.\n3) Continue forward — you'll reach a chamber.\n4) The Rat King is there — a large rat figure. Talk to him.\n5) He'll offer to let you join the Rat King covenant. Accept if you want.",
    howToObtain: "Talk to Rat King to join Rat King covenant.",
  },

  // ─── THE GUTTER ───
  gt1: {
    itemId: "gt1",
    where: "Upper Gutter — first bonfire after Grave of Saints",
    howToGetThere: "1) From Grave of Saints bonfire, find the path that leads DOWN deeper into the pit.\n2) You'll pass through more cave areas, then reach wooden platforms — that's The Gutter.\n3) The first bonfire (Upper Gutter) is at the TOP of the wooden structure, right when you enter.\n4) Light it. Use a torch — it's dark. Light sconces as you go to mark your path.",
    howToObtain: "Light the bonfire.",
  },
  gt2: {
    itemId: "gt2",
    where: "Throughout The Gutter — sconces on walls",
    howToGetThere: "1) As you navigate The Gutter, hold a torch (equip from inventory or get from a corpse).\n2) Look for sconces (torch holders) on the walls.\n3) Walk up and interact — they light up.\n4) This helps you see and remember your route. No specific order — light them as you pass.",
    howToObtain: "Use torch to light. Helps navigation.",
  },
  gt3: {
    itemId: "gt3",
    where: "Corpse in The Gutter — mid-area",
    howToGetThere: "1) From Upper Gutter bonfire, descend through the wooden platforms.\n2) Drop down carefully — watch for ledges. Stick to the main descent path.\n3) About halfway down, you'll find a corpse with a Fragrant Branch of Yore.\n4) Pick it up. DO NOT use it here — SAVE it for the petrified statue in Black Gulch (blocks hidden bonfire + Lucatiel summon).",
    howToObtain: "Pick up from corpse. SAVE for Black Gulch hidden bonfire statue.",
    items: ["Fragrant Branch of Yore"],
  },
  gt4: {
    itemId: "gt4",
    where: "Hidden path — off main route",
    howToGetThere: "1) From Upper Gutter, as you descend, look for side platforms and ledges.\n2) There's a hidden path that branches off — easy to miss. It may require a drop or a turn onto a less obvious platform.\n3) Follow it — you'll find a corpse with Dark Pyromancy Flame.\n4) If you're lost: explore every ledge, drop down to lower platforms, check behind pillars.",
    howToObtain: "Find the hidden ledge/path. Pick up from corpse.",
    items: ["Dark Pyromancy Flame"],
  },
  gt5: {
    itemId: "gt5",
    where: "Bottom of The Gutter — exit to Black Gulch",
    howToGetThere: "1) From Upper Gutter, keep descending. Follow the wooden platforms down.\n2) The bottom opens into a tunnel/cave.\n3) Walk through — you'll see poison statues and darkness ahead. That's Black Gulch.\n4) The transition is clear: wooden Gutter ends, rocky Black Gulch begins.",
    howToObtain: "Progress through. Leads to Black Gulch.",
  },

  // ─── BLACK GULCH ───
  bg1: {
    itemId: "bg1",
    where: "Black Gulch Mouth — first bonfire",
    howToGetThere: "1) Exit The Gutter at the bottom — you'll emerge into Black Gulch.\n2) The first bonfire (Black Gulch Mouth) is right there, at the entrance.\n3) Light it. IMPORTANT: Break every poison statue you see as you go — they shoot poison and respawn when you rest. Break them with your weapon.",
    howToObtain: "Light the bonfire. BREAK poison statues as you go — they respawn at bonfire.",
  },
  bg2: {
    itemId: "bg2",
    where: "Corpse just BEFORE entering Black Gulch proper",
    howToGetThere: "1) From Black Gulch Mouth bonfire, look around the immediate area.\n2) There's a corpse with a Fragrant Branch BEFORE you hit the main poison statue gauntlet.\n3) It's in the transition zone — pick it up.\n4) SAVE THIS BRANCH. Use it later on the petrified statue that blocks the hidden bonfire path (near The Rotten fog gate).",
    howToObtain: "Pick up. SAVE for the petrified statue blocking the hidden bonfire path.",
    items: ["Fragrant Branch of Yore"],
  },
  bg3: {
    itemId: "bg3",
    where: "Cave with worm enemies",
    howToGetThere: "1) From Black Gulch Mouth bonfire, explore the caves along the ledges.\n2) One cave has worm-like enemies (Giant worms).\n3) Enter that cave — the Scraps of Life hex is on a corpse inside.\n4) Fight or run past the worms. Pick up the hex.",
    howToObtain: "Pick up from corpse in cave.",
    items: ["Scraps of Life"],
  },
  bg11: {
    itemId: "bg11",
    where: "Cave in Black Gulch",
    howToGetThere: "1) From Black Gulch Mouth, explore the caves along the left or right ledges.\n2) One of the caves has a Shotel (curved sword) on a corpse or in a chest.\n3) Check each cave — the Shotel is in one of them. Break poison statues near the entrance first.",
    howToObtain: "Pick up Shotel from corpse/chest.",
    items: ["Shotel"],
  },
  bg4: {
    itemId: "bg4",
    where: "HIDDEN: From 1st bonfire go LEFT, edge cliff, DROP DOWN near 3 poison statues",
    howToGetThere: "1) From Black Gulch Mouth bonfire, go LEFT out the door (not straight ahead).\n2) Equip a lit torch. Edge along the cliff to your left — stay close to the wall.\n3) Look down. You'll see a lower platform. Near it are THREE poison statues clustered together.\n4) Drop down onto that platform. There's a cave/tunnel.\n5) Lucatiel is inside. Talk to her. Exhaust ALL dialogue. This is her 4th and final location — completes her dialogue chain.",
    howToObtain: "Drop down. Find Lucatiel in the cave tunnel. Exhaust ALL dialogue. Final location for her dialogue chain.",
  },
  bg5: {
    itemId: "bg5",
    where: "From fog gate — hug LEFT wall to narrow path, petrified statue",
    howToGetThere: "1) From Black Gulch Mouth, progress toward The Rotten boss fog gate.\n2) When you reach the fog gate, DON'T enter yet.\n3) Hug the LEFT wall. Follow it along the cliff edge.\n4) The wall curves left — there's a narrow path. Follow it.\n5) A petrified statue blocks the path. Use your Fragrant Branch (from bg2 or Gutter) on it.\n6) The path opens. Leads to Hidden Chamber bonfire.",
    howToObtain: "Use Fragrant Branch on the statue. Path leads to Hidden Chamber bonfire.",
  },
  bg6: {
    itemId: "bg6",
    where: "Hidden Chamber — past petrified statue",
    howToGetThere: "1) Use Fragrant Branch on the petrified statue (bg5).\n2) Walk past the statue. The path continues.\n3) You'll reach the Hidden Chamber — a small cave with a bonfire.\n4) Light the bonfire. Lucatiel's summon sign for The Rotten is here — use it before entering the boss fog.",
    howToObtain: "Light bonfire. Lucatiel's summon sign for The Rotten is here.",
  },
  bg7: {
    itemId: "bg7",
    where: "Cave on RIGHT ledge of Black Gulch",
    howToGetThere: "1) From Black Gulch Mouth bonfire, explore the RIGHT side.\n2) There are ledges and caves. One cave on the right has Darkdiver Grandahl.\n3) He's an NPC in a wheelchair. Talk to him.\n4) This is his 1st of 3 locations. Talk at all 3 to join Pilgrims of Dark covenant.",
    howToObtain: "Talk to him. First of 3 locations for Pilgrims of Dark covenant.",
  },
  bg8: {
    itemId: "bg8",
    where: "Hidden Chamber bonfire — Lucatiel sign",
    howToGetThere: "1) Reach the Hidden Chamber bonfire (bg6) — use Branch on statue, follow path.\n2) At the bonfire, look for Lucatiel's summon sign on the ground nearby.\n3) Be HUMAN (use Human Effigy). Summon her.\n4) Then go to The Rotten fog gate and enter. She'll help. Easiest boss to keep her alive for the quest.",
    howToObtain: "Be human. Summon Lucatiel for The Rotten. Easiest boss to keep her alive.",
  },
  bg9: {
    itemId: "bg9",
    where: "Boss arena — The Rotten",
    howToGetThere: "1) From Hidden Chamber or main path, reach the fog gate (the one you didn't hug left from).\n2) Enter the fog. The Rotten is in a pit below.\n3) Drop down or take the path. He's a large blob-like boss.\n4) Stay behind him. Dodge his dark AoE attack. Summon Lucatiel from Hidden Chamber for help.",
    howToObtain: "Defeat The Rotten. Stay behind him. Dodge his dark AoE.",
    items: ["Old Dead One Soul"],
  },
  bg10: {
    itemId: "bg10",
    where: "After The Rotten",
    howToGetThere: "1) Defeat The Rotten.\n2) A door opens. Exit through it.\n3) The Primal Bonfire is in the next room.\n4) Light it. This unlocks DLC 1 (Crown of the Sunken King) — interact with the bonfire to warp to Shulva.",
    howToObtain: "Light the bonfire. Access for DLC 1 (Shulva).",
  },

  // ─── SHADED WOODS ───
  sw1: {
    itemId: "sw1",
    where: "Path from Majula — petrified statue blocking path",
    howToGetThere: "1) From Majula, take the path that leads toward the monument (past where Benhart sits early game).\n2) You'll reach a narrow path. A petrified statue blocks it — Rosabeth of Melfia.\n3) Use a Fragrant Branch of Yore on her. She'll wake up and the path opens.\n4) You need a Branch — get from Gutter, Harvest Valley, or other areas.",
    howToObtain: "Use Fragrant Branch on her.",
  },
  sw2: {
    itemId: "sw2",
    where: "Right after unpetrifying Rosabeth",
    howToGetThere: "1) After using Branch on Rosabeth (sw1), she wakes up.\n2) She'll ask you for clothing (she's naked). Give her ANY piece of armor or clothing.\n3) Exhaust her dialogue — talk until she repeats.\n4) She gives you the Joy gesture. She then moves to Majula.",
    howToObtain: "Give her any piece of clothing. Exhaust dialogue → Joy gesture. She moves to Majula.",
  },
  sw4: {
    itemId: "sw4",
    where: "Ruined Fork Road — after passing Rosabeth",
    howToGetThere: "1) Past Rosabeth (after unpetrifying), follow the path forward.\n2) You'll reach a fork in the road with ruins. The bonfire is here.\n3) Light it — Ruined Fork Road. This is the hub for 3 paths: Left (fog), Straight (Pharros/Brightstone), Right (Shrine of Winter).",
    howToObtain: "Light the bonfire.",
  },
  sw3: {
    itemId: "sw3",
    where: "Near the fork — Benhart sits here",
    howToGetThere: "1) After unpetrifying Rosabeth, Benhart of Jugo appears in Shaded Woods.\n2) He's near the fork area — look for him sitting or standing.\n3) Talk to him. Exhaust all dialogue.\n4) This progresses his questline. You'll need him for later boss survivals.",
    howToObtain: "Talk to him. Exhaust dialogue for quest progress.",
  },
  sw5: {
    itemId: "sw5",
    where: "Foggy area — stick to LEFT wall",
    howToGetThere: "1) From Ruined Fork Road, take the LEFT path.\n2) You'll enter a foggy area — enemies are INVISIBLE until they attack. Stay calm.\n3) Hug the LEFT wall. Follow it. Don't wander into the middle.\n4) The left wall leads to Vengarl's Head — a talking head on the ground.\n5) Exhaust his dialogue. He gives the Decapitate gesture. He tells you about his body (in Brightstone Cove).",
    howToObtain: "Find Vengarl's Head. Exhaust dialogue → Decapitate gesture.",
  },
  sw6: {
    itemId: "sw6",
    where: "Before Scorpioness Najka — Manscorpion Tark",
    howToGetThere: "1) From Ruined Fork Road, take the path toward Scorpioness Najka (through ruins, past lion warriors).\n2) Before the boss fog, you'll see Manscorpion Tark — a large scorpion-man NPC.\n3) EQUIP Ring of Whispers (buy from Shalquoir for 5,800) or you won't understand him.\n4) Talk to him. Exhaust dialogue → Warmup gesture.\n5) His summon sign is near the Najka fog gate — use him for the boss.",
    howToObtain: "Equip Ring of Whispers (buy from Shalquoir). Talk to Tark. Exhaust dialogue → Warmup gesture. He can be summoned for Najka.",
  },
  sw7: {
    itemId: "sw7",
    where: "Boss arena — Scorpioness Najka",
    howToGetThere: "1) From Ruined Fork Road, take the path through the ruins (not left into fog, not right to Shrine).\n2) Fight or run past Lion Warriors. You may need Fang Key (use Branch on one lion) for some areas.\n3) Reach the boss fog. Tark's sign is nearby — summon him.\n4) Enter. Scorpioness Najka — kill her. Tark helps.",
    howToObtain: "Defeat Scorpioness Najka. Tark can be summoned.",
    items: ["Scorpioness Najka Soul"],
  },
  sw8: {
    itemId: "sw8",
    where: "Return to Manscorpion Tark after Najka",
    howToGetThere: "1) After killing Scorpioness Najka, go BACK the way you came.\n2) Return to Manscorpion Tark (before the boss fog area).\n3) EQUIP Ring of Whispers — you must have it on to understand him.\n4) Talk to him. He'll give you Second Dragon Ring + a Fragrant Branch of Yore.",
    howToObtain: "Ring of Whispers equipped. Talk to Tark → Second Dragon Ring + Fragrant Branch.",
  },
  sw9: {
    itemId: "sw9",
    where: "Shaded Ruins — in the ruins area",
    howToGetThere: "1) From Ruined Fork Road, go through the ruins (path toward Najka, but explore).\n2) The Shaded Ruins have broken buildings, lion warriors, basilisks.\n3) The Estus Shard is in the ruins — check corpses and chests in the buildings.\n4) It's in one of the ruin structures. Light a torch to see better.",
    howToObtain: "Pick up from corpse/chest.",
    items: ["Estus Flask Shard"],
  },
  sw10: {
    itemId: "sw10",
    where: "Lion Warrior — petrified, needs Branch",
    howToGetThere: "1) In Shaded Ruins, one of the Lion Warriors is petrified (statue).\n2) Use a Fragrant Branch on him. He'll wake up and you can get past.\n3) This gives access to the Fang Key area — needed for some loot.\n4) Save a Branch for this if you're doing 100%.",
    howToObtain: "Use Fragrant Branch on Lion Warrior.",
  },
  sw11: {
    itemId: "sw11",
    where: "Ruined Fork Road — three paths",
    howToGetThere: "1) At Ruined Fork Road bonfire, you'll see 3 paths.\n2) LEFT: Leads into fog → Vengarl's Head, items.\n3) STRAIGHT: Leads to Doors of Pharros and Brightstone Cove Tseldora.\n4) RIGHT: Leads to Shrine of Winter → Drangleic Castle. Gate opens with 4 Lord Souls OR 1M+ Soul Memory in NG.\n5) Plan your route based on what you need.",
    howToObtain: "Navigate. Right path needs 4 Lord Souls or 1M Soul Memory for Shrine of Winter.",
  },

  // ─── DOORS OF PHARROS ───
  dp1: {
    itemId: "dp1",
    where: "Doors of Pharros — first bonfire",
    howToGetThere: "1) From Shaded Woods Ruined Fork Road, take the STRAIGHT path (not left into fog, not right to Shrine).\n2) You'll pass through a tunnel/area. Keep going.\n3) You'll reach Doors of Pharros — watery caves with Gyrm warriors.\n4) The first bonfire is near the entrance. Light it.",
    howToObtain: "Light the bonfire.",
  },
  dp2: {
    itemId: "dp2",
    where: "Throughout Doors of Pharros",
    howToGetThere: "1) Doors of Pharros has MANY Pharros contraptions — most are traps (enemies, blade traps).\n2) Save your lockstones. Only use on high-value ones.\n3) The best use: Santier's Spear (dp4) — 1 lockstone, underwater, 1st floor.\n4) Avoid: floor contraptions (often traps), alcoves that spawn Gyrm. Check the project's DOORS_OF_PHARROS_CONTRAPTIONS for trap list.",
    howToObtain: "Save lockstones. Prioritize Santier's Spear (underwater, 1st floor).",
  },
  dp3: {
    itemId: "dp3",
    where: "Corpse in area",
    howToGetThere: "1) From Doors of Pharros bonfire, explore the area.\n2) The Twisted Barricade hex is on a corpse somewhere in the caves.\n3) Check side passages and ledges. It's not behind a Pharros door.\n4) Pick it up when you find it.",
    howToObtain: "Pick up from corpse.",
    items: ["Twisted Barricade"],
  },
  dp4: {
    itemId: "dp4",
    where: "Big stone door — underwater contraption (1 lockstone opens bottom)",
    howToGetThere: "1) From Doors of Pharros bonfire, find the big stone door (there are several).\n2) In front of it, there's an underwater area with a Pharros contraption.\n3) Wade in. Use 1 Pharros Lockstone on the contraption.\n4) The BOTTOM of the stone door opens (not the whole door). A Primal Knight is inside but can't fit through the gap.\n5) You can squeeze through. Loot the chest — Santier's Spear, Gyrm Greatshield.",
    howToObtain: "Pharros Lockstone on contraption. Open chest.",
    items: ["Santier's Spear", "Gyrm Greatshield"],
  },
  dp5: {
    itemId: "dp5",
    where: "Gavlan's final location",
    howToGetThere: "1) Gavlan moves to Doors of Pharros after you meet him in Harvest Valley (and exhaust dialogue).\n2) From the bonfire, explore the area. He's in one of the rooms.\n3) He sits with his wheel. 'Gavlan wheel, Gavlan deal.'\n4) Talk to him. He sells Poison Arrows, buys your items. Final location.",
    howToObtain: "Talk to him. Sells Poison Arrows, buys your items.",
  },
  dp6: {
    itemId: "dp6",
    where: "Hidden cave in area",
    howToGetThere: "1) From Doors of Pharros bonfire, explore thoroughly.\n2) Darkdiver Grandahl is in a hidden cave — may require going through water or a side passage.\n3) Find the cave. He's in a wheelchair. Talk to him.\n4) This is his 2nd of 3 locations. Need all 3 for Pilgrims of Dark covenant.",
    howToObtain: "Talk to him for Pilgrims of Dark.",
  },
  dp7: {
    itemId: "dp7",
    where: "Boss arena — Royal Rat Authority",
    howToGetThere: "1) From Doors of Pharros bonfire, progress through the area.\n2) Fight or run past Gyrm warriors. Cross bridges.\n3) You'll reach a fog gate. Enter — Royal Rat Authority boss.\n4) CRITICAL: 4 small toxic rats spawn with him. Kill the SMALL RATS FIRST — they're toxic and will kill you fast.\n5) Once small rats are dead, fight the big rat.",
    howToObtain: "KILL SMALL RATS FIRST — they're toxic! Then fight the big rat.",
    items: ["Royal Rat Authority Soul"],
  },
  dp8: {
    itemId: "dp8",
    where: "Majula — Sweet Shalquoir",
    howToGetThere: "1) Kill BOTH rat bosses: Royal Rat Vanguard (Grave of Saints) AND Royal Rat Authority (Doors of Pharros).\n2) Warp or walk to Majula.\n3) Go to Sweet Shalquoir (the cat in the house).\n4) Her shop now includes Flying Feline Boots — reduces fall damage. Buy them if you want.",
    howToObtain: "Shalquoir now sells Flying Feline Boots (reduces fall damage).",
  },

  // ─── BRIGHTSTONE COVE ───
  bc1: {
    itemId: "bc1",
    where: "Royal Army Campsite — first bonfire",
    howToGetThere: "1) From Shaded Woods Ruined Fork Road, take the RIGHT path (toward Tseldora).\n2) You'll pass through a tunnel. Keep going.\n3) You'll reach Brightstone Cove Tseldora — spider area.\n4) The first bonfire (Royal Army Campsite) is near the entrance. Light it.",
    howToObtain: "Light the bonfire.",
  },
  bc2: {
    itemId: "bc2",
    where: "Before spider area",
    howToGetThere: "1) From Royal Army Campsite bonfire, progress forward.\n2) Before you hit the main spider-filled buildings, look for a corpse or chest.\n3) The Estus Shard is in this transition area — pick it up.\n4) It's easy to miss if you rush through.",
    howToObtain: "Pick up from corpse/chest.",
    items: ["Estus Flask Shard"],
  },
  bc12: {
    itemId: "bc12",
    where: "Prowling Magus boss room — left of entrance",
    howToGetThere: "1) Progress through Brightstone Cove toward Prowling Magus boss.\n2) You'll enter a room/chapel — this is the room right before the boss fog.\n3) As you enter, look to your LEFT. There's a wall.\n4) Walk up to it and press A/X (interact). Illusory wall opens — Estus Shard inside.",
    howToObtain: "Press A/X on the wall.",
    items: ["Estus Flask Shard"],
  },
  bc13: {
    itemId: "bc13",
    where: "Chamber past crystal pit bridge — pig clears mushrooms",
    howToGetThere: "1) In Brightstone Cove, there's an area with a crystal pit and a bridge.\n2) Cross the bridge. There's a chamber beyond.\n3) Mushrooms block some paths. A pig in the area can clear them (lure it or kill mushrooms).\n4) The Pickaxe is in this chamber — on a corpse or in a chest. Pick it up.",
    howToObtain: "Pick up Pickaxe.",
    items: ["Pickaxe"],
  },
  bc14: {
    itemId: "bc14",
    where: "Corpse in Brightstone Cove",
    howToGetThere: "1) Explore Brightstone Cove thoroughly.\n2) Great Fireball pyromancy is on a corpse somewhere in the area.\n3) Check buildings, side rooms, and ledges.\n4) Pick it up when you find it.",
    howToObtain: "Pick up from corpse.",
    items: ["Great Fireball"],
  },
  bc3: {
    itemId: "bc3",
    where: "Chest in area",
    howToGetThere: "1) From Royal Army Campsite, explore the spider-filled buildings.\n2) Sublime Bone Dust is in a chest in one of the rooms.\n3) Check each building. It's in a chest — open it.",
    howToObtain: "Open the chest.",
    items: ["Sublime Bone Dust"],
  },
  bc5: {
    itemId: "bc5",
    where: "Near campsite bonfire — Benhart summon sign",
    howToGetThere: "1) Benhart's summon sign is near the Royal Army Campsite bonfire.\n2) It's on the ground before you reach Prowling Magus.\n3) Be HUMAN (use Human Effigy). Summon him.\n4) Take him to Prowling Magus. He MUST survive — this is the easiest boss to keep him alive for the quest.",
    howToObtain: "Be human. Summon Benhart for Prowling Magus. He MUST survive — easiest fight for him.",
  },
  bc6: {
    itemId: "bc6",
    where: "Boss arena — Prowling Magus",
    howToGetThere: "1) From Royal Army Campsite, progress through the spider area.\n2) You'll reach a chapel-like building. Enter.\n3) Prowling Magus and Congregation — many enemies, a few mages. Kill the mages first.\n4) Summon Benhart from near the bonfire. Easy fight.",
    howToObtain: "Kill mages first. Easiest Benhart survival fight.",
    items: ["Prowling Magus Soul"],
  },
  bc4: {
    itemId: "bc4",
    where: "After Prowling Magus — Cromwell the Pardoner",
    howToGetThere: "1) After defeating Prowling Magus, exit the boss room.\n2) Continue forward. Cromwell the Pardoner is in the next area.\n3) He's an NPC. Talk to him.\n4) He pardons sins for souls (removes NPC aggro). Useful if you accidentally hit someone.",
    howToObtain: "Talk to him. Pardons sins for souls.",
  },
  bc7: {
    itemId: "bc7",
    where: "Building where Pate and Creighton fight",
    howToGetThere: "1) In Brightstone Cove, find the building where Pate and Creighton are fighting each other.\n2) They're NPCs from earlier — you met Pate in Forest of Fallen Giants, Creighton in Huntsman's Copse.\n3) You must choose: help Pate kill Creighton, or help Creighton kill Pate.\n4) Kill the one you don't want. The survivor gives you a reward. Quest progression.",
    howToObtain: "Help one kill the other. Quest progression.",
  },
  bc8: {
    itemId: "bc8",
    where: "Boss arena — Duke's Dear Freja",
    howToGetThere: "1) Progress through Brightstone Cove past Prowling Magus, Cromwell, Pate/Creighton.\n2) You'll need the Brightstone Key (found in the area) to progress.\n3) Reach the boss fog. Duke's Dear Freja — a giant two-headed spider.\n4) Damage ONLY the heads. Body shots do little. Attack when she lowers her heads.",
    howToObtain: "Damage the HEADS only. Defeat her.",
    items: ["Duke's Dear Freja Soul"],
  },
  bc9: {
    itemId: "bc9",
    where: "After Freja — Primal Bonfire",
    howToGetThere: "1) Defeat Duke's Dear Freja.\n2) Exit through the door that opens.\n3) The Primal Bonfire is in the next room.\n4) Light it. One of the four Great Souls done.",
    howToObtain: "Light the bonfire.",
  },
  bc10: {
    itemId: "bc10",
    where: "Lord's Private Chamber — needs Brightstone Key",
    howToGetThere: "1) Find the Brightstone Key in Brightstone Cove (in the area before or after Freja).\n2) Use it on the Lord's Private Chamber door.\n3) Enter. The chamber has Great Lightning Spear (miracle) and Fire Tempest (pyromancy).\n4) Pick both up.",
    howToObtain: "Open chamber. Contains Great Lightning Spear, Fire Tempest.",
    items: ["Great Lightning Spear", "Fire Tempest"],
  },
  bc11: {
    itemId: "bc11",
    where: "Vengarl's Body — in Brightstone Cove",
    howToGetThere: "1) Vengarl's Body is in Brightstone Cove — a headless armored knight. It's hostile.\n2) Find it (explore the area). Kill it.\n3) Warp to Shaded Woods. Go to Vengarl's Head (foggy area, left path).\n4) Talk to the Head with Ring of Whispers. He gives you his gear + War Cry gesture.",
    howToObtain: "Kill the body. Return to Vengarl's Head in Shaded Woods → get his gear + War Cry gesture.",
  },

  // ─── SINNER'S RISE ───
  sr1: {
    itemId: "sr1",
    where: "Sinner's Rise bonfire",
    howToGetThere: "1) Warp to Lost Bastille — Tower Apart or Exile Holding Cells bonfire.\n2) Find the elevator. It's in the Tower Apart area — take it DOWN.\n3) The elevator descends to Sinner's Rise — a watery prison area.\n4) When you exit the elevator, the bonfire is nearby. Light it.",
    howToObtain: "Light the bonfire.",
  },
  sr2: {
    itemId: "sr2",
    where: "Water area in Sinner's Rise",
    howToGetThere: "1) From Sinner's Rise bonfire, explore the water-filled corridors.\n2) There are cells and water. Sublime Bone Dust is in a chest in one of the water areas.\n3) Check each room. Open the chest when you find it.",
    howToObtain: "Open the chest.",
    items: ["Sublime Bone Dust"],
  },
  sr7: {
    itemId: "sr7",
    where: "Basement elevator — first alcove on RIGHT, wall facing entrance",
    howToGetThere: "1) From Sinner's Rise bonfire, take the elevator down (the one that goes deeper).\n2) When the elevator stops, step out. You'll see alcoves on the sides.\n3) Go to the FIRST alcove on your RIGHT.\n4) Face the wall (the one facing the entrance/corridor). Press A/X. Illusory wall opens — Estus Shard inside.",
    howToObtain: "Press A/X on the wall.",
    items: ["Estus Flask Shard"],
  },
  sr3: {
    itemId: "sr3",
    where: "Both sides of fog gate — oil trails",
    howToGetThere: "1) From the elevator bottom, progress toward the Lost Sinner fog gate.\n2) Before the fog gate, there are OIL TRAILS on the ground — on BOTH the left and right sides.\n3) Equip a torch. Light BOTH oil trails by walking near them with the torch.\n4) This lights the boss room. CRITICAL: Without this, the room is pitch dark and you CAN'T lock on to Lost Sinner.",
    howToObtain: "Light BOTH oil trails with torch. Enables lock-on in boss room.",
    warning: "Critical — without this, you can't lock on to Lost Sinner in the dark.",
  },
  sr4: {
    itemId: "sr4",
    where: "Bottom of elevator — Lucatiel summon sign",
    howToGetThere: "1) Take the elevator down to the bottom (same one that leads to Lost Sinner).\n2) Lucatiel's summon sign is at the bottom, on the ground, before you reach the boss fog.\n3) Be HUMAN. Summon her.\n4) Then light the oil trails (sr3) and enter the boss. Good fight for keeping her alive.",
    howToObtain: "Be human. Summon Lucatiel for Lost Sinner. Good survival fight.",
  },
  sr5: {
    itemId: "sr5",
    where: "Boss arena — Lost Sinner",
    howToGetThere: "1) From the elevator bottom, go forward. Light the oil trails (sr3) first.\n2) Reach the fog gate. Enter.\n3) Lost Sinner — aggressive humanoid boss. Parry works well.\n4) Fight her. She drops Lost Sinner Soul (Great Soul).",
    howToObtain: "Defeat Lost Sinner. Aggressive — parry effective.",
    items: ["Lost Sinner Soul"],
  },
  sr6: {
    itemId: "sr6",
    where: "After Lost Sinner — Primal Bonfire",
    howToGetThere: "1) Defeat Lost Sinner.\n2) A door opens behind her. Exit through it.\n3) The Primal Bonfire is in the next room.\n4) Light it. One of the four Great Souls done.",
    howToObtain: "Light the bonfire.",
  },

  // ─── DRANGLEIC CASTLE ───
  dc1: {
    itemId: "dc1",
    where: "Shrine of Winter — gate from Shaded Woods",
    howToGetThere: "1) From Shaded Woods Ruined Fork Road, take the RIGHT path.\n2) You'll reach the Shrine of Winter — a gate that blocks the path.\n3) The gate opens when you have 4 Great Souls (Old Iron King, Lost Sinner, Rotten, Freja) OR 1M+ Soul Memory in NG.\n4) Once open, walk through to Drangleic Castle.",
    howToObtain: "Collect 4 Great Souls or farm Soul Memory.",
  },
  dc2: {
    itemId: "dc2",
    where: "Castle entrance — golem doors",
    howToGetThere: "1) Past the Shrine of Winter, you'll reach the castle entrance.\n2) There are golem statues by the doors. They don't move.\n3) Kill enemies NEAR the golems — when enemies die, the golems absorb souls and the doors open.\n4) You may need to kill several. Each door has its own golem.",
    howToObtain: "Kill enemies near golems — they absorb souls and open doors.",
  },
  dc3: {
    itemId: "dc3",
    where: "King's Gate bonfire",
    howToGetThere: "1) After opening the golem doors, enter the castle.\n2) The first bonfire (King's Gate) is inside, in the main hall area.\n3) Light it. This is your base for the castle.",
    howToObtain: "Light the bonfire.",
  },
  dc4: {
    itemId: "dc4",
    where: "Chancellor Wellager — on the stairs",
    howToGetThere: "1) From King's Gate bonfire, progress through the castle.\n2) Chancellor Wellager is on the stairs in the main area — he's a ghostly NPC.\n3) Talk to him. Exhaust all dialogue.\n4) He gives the This One's Me gesture. In NG++, he sells unique spells (Great Lightning Spear, etc.).",
    howToObtain: "Exhaust dialogue → This One's Me gesture. NG++ sells unique spells.",
  },
  dc7: {
    itemId: "dc7",
    where: "In the castle",
    howToGetThere: "1) From King's Gate, explore the castle rooms.\n2) The Estus Shard is in one of the side rooms or corridors.\n3) Check each room. It's on a corpse or in a chest.\n4) Pick it up.",
    howToObtain: "Pick up from corpse/chest.",
    items: ["Estus Flask Shard"],
  },
  dc12: {
    itemId: "dc12",
    where: "Tower with kneeling knight statues — ladder down, right corner",
    howToGetThere: "1) Find the tower room with kneeling knight statues (armor sets on the ground).\n2) There's a ladder in the room. Climb DOWN it.\n3) At the bottom, turn around so the ladder is behind you.\n4) Look at the RIGHT corner of the room. There's a wall.\n5) Walk up and press A/X. Illusory wall opens — Faraam Set and Forgotten Chamber bonfire inside.",
    howToObtain: "Press A/X on the wall. Reveals Faraam Set and Forgotten Chamber bonfire.",
    items: ["Faraam Set", "Forgotten Chamber Bonfire"],
  },
  dc5: {
    itemId: "dc5",
    where: "Ruin Sentinel room — fragile floor, DROP THROUGH",
    howToGetThere: "1) In the castle, find the room with Ruin Sentinel enemies (the big armored knights).\n2) There are several doors. The LAST door on the LEFT has a fragile floor.\n3) Walk onto it — the floor breaks. You'll fall through.\n4) You land in a cave below. Darkdiver Grandahl is there — 3rd of 3 locations for Pilgrims of Dark.",
    howToObtain: "Fall through the breakable floor. Lands in Grandahl's cave (Pilgrims of Dark — 3rd location).",
  },
  dc6: {
    itemId: "dc6",
    where: "Grandahl's 3 locations",
    howToGetThere: "1) Talk to Grandahl at all 3 spots: Black Gulch cave, Shaded Woods cave, Drangleic Castle (drop through floor).\n2) At each location, he lets you enter a Dark Chasm. Costs 1 Human Effigy per entry.\n3) In each chasm: kill all enemies, light the sconce at the end.\n4) Complete all 3 chasms. On your next entry, Darklurker boss appears instead.",
    howToObtain: "Light sconce at end of each chasm. Complete all 3 → Darklurker boss.",
  },
  dc8: {
    itemId: "dc8",
    where: "Boss arena — Twin Dragonriders",
    howToGetThere: "1) Progress through the castle past the golems and Wellager.\n2) You'll reach a boss fog. Enter — Twin Dragonriders.\n3) One has a bow, one has melee weapons. KILL THE ARCHHER FIRST — he's annoying.\n4) Then fight the melee one. They share a health bar.",
    howToObtain: "Kill the archer first. Then the melee one.",
    items: ["Dragonrider Soul"],
  },
  dc9: {
    itemId: "dc9",
    where: "After Twin Dragonriders",
    howToGetThere: "1) Defeat Twin Dragonriders.\n2) Exit the boss room. Benhart of Jugo appears in the next area.\n3) Talk to him. Exhaust dialogue.\n4) Quest progression for his survival quest.",
    howToObtain: "Exhaust dialogue for quest progress.",
  },
  dc10: {
    itemId: "dc10",
    where: "Boss arena — Looking Glass Knight",
    howToGetThere: "1) Past the Twin Dragonriders and Benhart, continue forward.\n2) You'll reach another boss fog. Looking Glass Knight.\n3) He has a mirror shield. He can summon phantoms from it — kill them or focus him.\n4) Defeat him. Drops Looking Glass Knight Soul.",
    howToObtain: "Defeat him. He summons phantoms from his mirror.",
    items: ["Looking Glass Knight Soul"],
  },
  dc11: {
    itemId: "dc11",
    where: "After Looking Glass Knight",
    howToGetThere: "1) Defeat Looking Glass Knight.\n2) Exit through the door. The Key to King's Passage is in the next area — on the ground or in a chest.\n3) Pick it up.\n4) Use it to open the path to Shrine of Amana.",
    howToObtain: "Pick up Key to King's Passage. Opens path to Shrine of Amana.",
  },

  // ─── SHRINE OF AMANA ───
  sa1: {
    itemId: "sa1",
    where: "Crumbled Ruins bonfire",
    howToGetThere: "1) Use the Key to King's Passage (from after Looking Glass Knight) on the door.\n2) Walk through. You'll enter Shrine of Amana — watery area with priestesses who shoot homing soul arrows.\n3) The first bonfire (Crumbled Ruins) is soon after the entrance.\n4) Light it. TIP: Use a bow to snipe priestesses from range — they're dangerous up close.",
    howToObtain: "Light the bonfire. USE A BOW to snipe priestesses from range.",
  },
  sa2: {
    itemId: "sa2",
    where: "Water area",
    howToGetThere: "1) From Crumbled Ruins bonfire, wade through the water.\n2) Explore the water areas — there are multiple pools and paths.\n3) The Estus Shard is on a corpse or in a chest in one of the water sections.\n4) Snipe priestesses first, then pick it up.",
    howToObtain: "Pick up.",
    items: ["Estus Flask Shard"],
  },
  sa7: {
    itemId: "sa7",
    where: "Water near ramp — Crumbled Ruins, left of first priestess",
    howToGetThere: "1) From Crumbled Ruins bonfire, go forward. There's a ramp and water.\n2) The first priestess is ahead. To the LEFT of her, in the water near the ramp, there's a cliff wall.\n3) Look for a Pharros contraption (face-shaped) on the cliff.\n4) Use a Pharros Lockstone. A hidden cave opens. Enter — Helix Halberd inside.",
    howToObtain: "Use Pharros Lockstone. Reveals hidden cave with Helix Halberd.",
    items: ["Helix Halberd"],
  },
  sa3: {
    itemId: "sa3",
    where: "Chest past hidden path",
    howToGetThere: "1) Progress through Shrine of Amana. There's a hidden path — may require going through water or a side route.\n2) Past the main path, you'll find a chest.\n3) Sunlight Blade miracle is inside. Open the chest.\n4) Watch for priestesses — snipe them first.",
    howToObtain: "Open the chest.",
    items: ["Sunlight Blade"],
  },
  sa4: {
    itemId: "sa4",
    where: "Cave — Havel's Set",
    howToGetThere: "1) Explore the caves in Shrine of Amana.\n2) One cave has a chest with Havel's Set (armor).\n3) Find the cave — check side paths from the water areas.\n4) Open the chest.",
    howToObtain: "Open the chest.",
    items: ["Havel's Set"],
  },
  sa5: {
    itemId: "sa5",
    where: "Milfanito — singing woman",
    howToGetThere: "1) As you progress through Shrine of Amana, you'll hear singing.\n2) The Milfanito are NPCs — singing women. They're friendly.\n3) Talk to one of them. She'll give you a Smooth & Silky Stone.\n4) Don't attack them.",
    howToObtain: "Talk to her. Get Smooth & Silky Stone.",
  },
  sa6: {
    itemId: "sa6",
    where: "Boss arena — Demon of Song",
    howToGetThere: "1) Progress through Shrine of Amana — past the water, priestesses, and caves.\n2) You'll reach a fog gate. Enter — Demon of Song.\n3) She's a frog-like creature. Her face is hidden in a shell most of the time.\n4) Attack ONLY when her face is exposed (she opens the shell). Otherwise you'll do minimal damage.",
    howToObtain: "Attack when her face is exposed. Defeat her.",
    items: ["Demon of Song Soul"],
  },

  // ─── UNDEAD CRYPT ───
  uc1: {
    itemId: "uc1",
    where: "Undead Ditch bonfire",
    howToGetThere: "1) After defeating Demon of Song, exit through the door that opens.\n2) You'll enter Undead Crypt — a dark tomb area.\n3) The first bonfire (Undead Ditch) is soon after the entrance.\n4) Light it. CRITICAL: Do NOT light torches or ring bells in this area — see uc2.",
    howToObtain: "Light the bonfire.",
  },
  uc2: {
    itemId: "uc2",
    where: "Throughout Undead Crypt",
    howToGetThere: "1) In Undead Crypt, there are torches and bells.\n2) DO NOT light torches — they spawn Leydia enemies.\n3) DO NOT ring the bells — they spawn more enemies AND permanently aggro Agdayne.\n4) If you aggro Agdayne, you lose his quest, gesture, and shop. He won't forgive you.\n5) Walk through in the dark. Use a torch only if you must — but put it away before talking to Agdayne.",
    howToObtain: "DO NOT light torches or ring bells. Spawns enemies and PERMANENTLY aggros Agdayne.",
    warning: "Critical — aggroing Agdayne fails his quest and gesture.",
  },
  uc3: {
    itemId: "uc3",
    where: "Grave Warden Agdayne — main chamber",
    howToGetThere: "1) From Undead Ditch bonfire, progress through the crypt.\n2) Agdayne is in the main chamber — a large room. He's a tall NPC sitting in a chair.\n3) BEFORE approaching: put away your torch. Unequip it. He attacks if you have a torch.\n4) Walk up to him in the dark. Talk. Exhaust dialogue → Have Mercy! gesture. He sells hexes.",
    howToObtain: "Talk without torch. Exhaust dialogue → Have Mercy! gesture. He sells hexes.",
  },
  uc4: {
    itemId: "uc4",
    where: "Stairs room — right wall",
    howToGetThere: "1) In the Undead Crypt, find the room with stairs (near the Leydia Witch ledge area).\n2) Enter the room. There are stairs.\n3) Look at the RIGHT wall (as you enter or face the room).\n4) Walk up to it. Press A/X. Illusory wall opens — Avelyn (crossbow) and Heavy Bolt x15 inside.",
    howToObtain: "Press A/X on the right wall.",
    items: ["Avelyn", "Heavy Bolt x15"],
  },
  uc9: {
    itemId: "uc9",
    where: "Hallway with gray stripe on floor — illusory left, Pharros behind",
    howToGetThere: "1) Progress through the crypt. You'll pass a hole (drop down past double-shield Leydia guards).\n2) Continue. You'll reach a hallway with a GRAY STRIPE painted on the floor.\n3) Face the graves (the end of the hallway). The illusory wall is on your LEFT.\n4) Press A/X. Wall opens. Behind it: Pharros contraption. Use a lockstone. Then a chest with Great Lightning Spear and Olenford's Staff.",
    howToObtain: "Press A/X on left wall. Pharros contraption behind it. Then chest with spells.",
    items: ["Great Lightning Spear", "Olenford's Staff"],
  },
  uc5: {
    itemId: "uc5",
    where: "Boss arena — Velstadt",
    howToGetThere: "1) Progress through the crypt — past Agdayne, through the illusory areas.\n2) You'll reach a fog gate. Enter — Velstadt, the Royal Aegis.\n3) He's a dark-resistant knight. Use Lightning Mace or lightning damage.\n4) He has a 2nd phase where he buffs. Defeat him.",
    howToObtain: "Defeat Velstadt. Dark-resistant. Use Lightning Mace.",
    items: ["Velstadt Soul"],
  },
  uc6: {
    itemId: "uc6",
    where: "Vendrick's chamber — after Velstadt",
    howToGetThere: "1) Defeat Velstadt.\n2) A door opens. Enter Vendrick's chamber.\n3) Vendrick walks around as a hollow. The King's Ring is on the FLOOR — pick it up.\n4) Don't attack Vendrick yet. You need Giant Souls to fight him (each halves his defense).",
    howToObtain: "Pick up King's Ring from the floor.",
    items: ["King's Ring"],
  },
  uc7: {
    itemId: "uc7",
    where: "Vendrick — hollow king",
    howToGetThere: "1) Vendrick is in the same chamber as the King's Ring.\n2) He wanders around. He's hollow — no dialogue.\n3) To fight him later: get 5 Giant Souls (from Memories). Each one halves his defense. Without them, he's nearly invincible.\n4) Don't fight him now. Get the ring and leave.",
    howToObtain: "Need Giant Souls to fight him (each halves his defense). Don't fight yet.",
  },
  uc8: {
    itemId: "uc8",
    where: "Return to Agdayne",
    howToGetThere: "1) After getting the King's Ring (uc6), warp or walk back to Undead Crypt.\n2) Return to Grave Warden Agdayne (main chamber, no torch).\n3) Talk to him. He'll recognize the King's Ring.\n4) He gives you Darkdrift katana + Agdayne's Set.",
    howToObtain: "Talk to him. Get Darkdrift katana + Agdayne's Set.",
    items: ["Darkdrift", "Agdayne's Set"],
  },

  // ─── ALDIA'S KEEP ───
  ak1: {
    itemId: "ak1",
    where: "King's Gate in Shaded Woods — right path",
    howToGetThere: "1) You need the King's Ring (from Undead Crypt after Velstadt).\n2) Warp to Shaded Woods Ruined Fork Road.\n3) Take the RIGHT path (toward Shrine of Winter).\n4) Before the castle, there's a gate — the King's Gate. Use the King's Ring on it.\n5) The gate opens. Walk through to Aldia's Keep.",
    howToObtain: "Use King's Ring on the gate to open.",
  },
  ak2: {
    itemId: "ak2",
    where: "Foregarden bonfire",
    howToGetThere: "1) Enter Aldia's Keep through the King's Gate.\n2) The first bonfire (Foregarden) is in the entrance area.\n3) Light it. This is your base for the keep.",
    howToObtain: "Light the bonfire.",
  },
  ak3: {
    itemId: "ak3",
    where: "In the area",
    howToGetThere: "1) From Foregarden bonfire, explore Aldia's Keep.\n2) The Estus Shard is in one of the rooms or corridors.\n3) Check side rooms. It's on a corpse or in a chest.\n4) Pick it up.",
    howToObtain: "Pick up.",
    items: ["Estus Flask Shard"],
  },
  ak4: {
    itemId: "ak4",
    where: "Chest in area",
    howToGetThere: "1) Explore Aldia's Keep.\n2) The Soul Vessel is in a chest in one of the rooms.\n3) Check each room. Open the chest when you find it.",
    howToObtain: "Open the chest.",
    items: ["Soul Vessel"],
  },
  ak9: {
    itemId: "ak9",
    where: "Staircase to acid room — middle of wall, iron grating",
    howToGetThere: "1) Find the staircase that leads to the corrosive acid room.\n2) Before going down, look at the wall. There's a section with iron grating.\n3) The illusory wall is in the MIDDLE of that wall.\n4) Walk up to it. Press A/X. Wall opens — Malformed Shell inside.",
    howToObtain: "Press A/X on the wall.",
    items: ["Malformed Shell"],
  },
  ak10: {
    itemId: "ak10",
    where: "Long hallway with cages — chained door",
    howToGetThere: "1) In Aldia's Keep, there's a long hallway with cages.\n2) One branch has a door held shut by chains. An Ogre is nearby.\n3) Lure the Ogre to the door. When he attacks, he'll hit the door and break the chains.\n4) The door opens. Go through — Fire Seed and Steel Set inside.",
    howToObtain: "Ogre breaks the door. Loot Fire Seed and Steel Set.",
    items: ["Fire Seed", "Steel Set"],
  },
  ak11: {
    itemId: "ak11",
    where: "Long hall",
    howToGetThere: "1) In Aldia's Keep, find the long hall (dark corridor).\n2) There's a Pharros contraption on the wall.\n3) Use a Pharros Lockstone on it.\n4) It creates light — makes the hall easier to navigate.",
    howToObtain: "Use Pharros Lockstone. Creates light.",
  },
  ak5: {
    itemId: "ak5",
    where: "Small hut on LEFT exterior",
    howToGetThere: "1) From Foregarden bonfire, go outside. There's an exterior area.\n2) Look for a small hut on the LEFT side.\n3) Lucatiel is inside. CRITICAL: DO NOT talk to her until she has survived 3+ boss fights (Smelter, Lost Sinner, Rotten).\n4) If you talk too early, her questline fails permanently. Check your progress first.",
    howToObtain: "DO NOT talk until she has survived 3+ boss fights! Or her questline fails permanently.",
    warning: "Only talk after 3 boss survivals (Smelter, Lost Sinner, Rotten, etc.).",
  },
  ak6: {
    itemId: "ak6",
    where: "At the bonfire",
    howToGetThere: "1) Aldia appears at the Foregarden bonfire after you rest there.\n2) He's a floating face/fire. Talk to him.\n3) Exhaust his dialogue. This affects the ending.\n4) You need to talk to him at multiple bonfires for the alternate ending.",
    howToObtain: "Talk to him. Affects ending.",
  },
  ak7: {
    itemId: "ak7",
    where: "Behind barrier — Navlaan",
    howToGetThere: "1) Navlaan is in a cell behind a barrier. There's a lever nearby.\n2) DO NOT pull the lever while human — it kills him. Only pull when hollow if you want to fight him.\n3) To do his assassination quests: be HOLLOW. Talk to him through the barrier.\n4) He'll give you targets. Complete them for hex rewards.",
    howToObtain: "Do NOT pull the lever while human — it kills him. Talk hollow for quests.",
  },
  ak8: {
    itemId: "ak8",
    where: "Boss arena — Guardian Dragon",
    howToGetThere: "1) Progress through Aldia's Keep — past the cages, Navlaan, etc.\n2) You'll reach a boss fog. Enter — Guardian Dragon.\n3) He's a dragon. Use ranged attacks if possible. Fire breath is dangerous.\n4) Defeat him. The path beyond leads to Dragon Aerie.",
    howToObtain: "Defeat Guardian Dragon. Ranged helps. Leads to Dragon Aerie.",
    items: ["Guardian Dragon Soul"],
  },

  // ─── DRAGON AERIE ───
  da1: {
    itemId: "da1",
    where: "Dragon Aerie bonfire",
    howToGetThere: "1) After defeating Guardian Dragon in Aldia's Keep, exit through the door.\n2) You'll emerge in Dragon Aerie — bridges with dragons. The bonfire is at the start.\n3) Light it. There are 11 Crystal Lizards in this area — kill them all for upgrade materials before they escape.",
    howToObtain: "Light the bonfire. 11 Crystal Lizards in the area — kill all.",
  },
  da2: {
    itemId: "da2",
    where: "Throughout Dragon Aerie",
    howToGetThere: "1) Cross the bridges in Dragon Aerie. Petrified Dragon Bones and Twinkling Titanite are on corpses.\n2) Pick them up as you go. The Crystal Lizards are near each drake — use a bow or sorcery to one-shot them before they run.\n3) If a lizard escapes, rest at bonfire and it respawns. If you kill it, it's gone forever (until NG+).",
    howToObtain: "Pick up. Use bow/sorcery on lizards before they escape.",
  },
  da9: {
    itemId: "da9",
    where: "Dragon Shrine — under boxes behind first knight",
    howToGetThere: "1) Progress through Dragon Aerie to Dragon Shrine.\n2) In Dragon Shrine, you'll pass the first Dragon Knight (don't attack — they're friendly in SotFS).\n3) Behind him, there are boxes on the ground. Look UNDER them.\n4) There's a Pharros contraption. Use a lockstone. A wall opens — Judgement Set and Judgement Staff inside.",
    howToObtain: "Use Pharros Lockstone. Reveals Judgement Set and Judgement Staff.",
    items: ["Judgement Set", "Judgement Staff"],
  },
  da3: {
    itemId: "da3",
    where: "Dragon Shrine",
    howToGetThere: "1) In Dragon Shrine, the Dragon Knights line the path. They kneel or stand.\n2) In SotFS, they are HONORABLE — they won't attack unless you attack first.\n3) Walk past them. Don't hit them. Don't lock on. Just go through.\n4) If you attack, they all aggro and the area becomes very hard.",
    howToObtain: "DON'T attack Dragon Knights. In SotFS they're honorable — won't attack if you don't.",
    warning: "Attacking them makes the area much harder.",
  },
  da4: {
    itemId: "da4",
    where: "Dragon Shrine entrance",
    howToGetThere: "1) At the entrance to Dragon Shrine (after crossing the bridges), the Emerald Herald is there.\n2) Talk to her. She'll give you the Aged Feather.\n3) The Aged Feather works like an infinite Homeward Bone — use it to warp to the last bonfire.",
    howToObtain: "Talk to her. Get Aged Feather (infinite Homeward Bone).",
  },
  da5: {
    itemId: "da5",
    where: "Petrified Egg — in Dragon Shrine",
    howToGetThere: "1) In Dragon Shrine, the Petrified Egg is on the ground — pick it up.\n2) Warp to Iron Keep. Find Magerold of Lanafir (sits on crate).\n3) Give him the Petrified Egg. He'll let you join the Dragon Remnants covenant.\n4) You can then duel others for Dragon Scales.",
    howToObtain: "Give to Magerold (Iron Keep) to join Dragon Remnants covenant.",
  },
  da6: {
    itemId: "da6",
    where: "Ancient Dragon — top of shrine",
    howToGetThere: "1) Climb to the top of Dragon Shrine. The Ancient Dragon is there.\n2) He's huge. Talk to him — don't attack.\n3) He'll give you the Ashen Mist Heart. This lets you enter the Giant Memories.\n4) DON'T fight him yet — he's optional and extremely hard. Do the memories first.",
    howToObtain: "Talk to him. Get Ashen Mist Heart. DON'T fight him yet.",
    items: ["Ashen Mist Heart"],
  },
  da7: {
    itemId: "da7",
    where: "Chest in Dragon Shrine",
    howToGetThere: "1) Explore Dragon Shrine — the building and the path to the Ancient Dragon.\n2) The Estus Shard is in a chest somewhere in the shrine.\n3) Check side rooms or the main path. Open the chest.",
    howToObtain: "Open the chest.",
    items: ["Estus Flask Shard"],
  },
  da8: {
    itemId: "da8",
    where: "Ancient Dragon — optional fight",
    howToGetThere: "1) At the top of Dragon Shrine, the Ancient Dragon is there.\n2) If you attack him, the fight starts. He has massive HP and one-shot fire attacks.\n3) This is optional. He drops Soul of a Giant when killed.\n4) Only fight if you want the soul or the challenge. Get Ashen Mist Heart first.",
    howToObtain: "Optional. Huge HP, one-shot fire. Drops Soul of a Giant.",
    items: ["Soul of a Giant"],
  },

  // ─── MEMORIES ───
  mm1: {
    itemId: "mm1",
    where: "Giant trees — after Ancient Dragon",
    howToGetThere: "1) Get Ashen Mist Heart from Ancient Dragon (talk to him, don't fight).\n2) There are 3 giant trees: Forest of Fallen Giants (Place Unbeknownst), Brightstone Cove, Black Gulch.\n3) Each tree has a glowing interaction point. Use it with the Ashen Mist Heart.\n4) You'll enter a memory — a past version of the area. Complete the memory and you'll return.",
    howToObtain: "Interact with glowing trees to enter memories.",
  },
  mm2: {
    itemId: "mm2",
    where: "Memory of Vammar — Captain Drummond",
    howToGetThere: "1) Go to Forest of Fallen Giants. Find the Place Unbeknownst (giant tree near the Pursuer platform area).\n2) Use Ashen Mist Heart on the tree. Enter Memory of Vammar.\n3) Captain Drummond is inside. Talk to him. Exhaust all dialogue.\n4) He gives the Hurrah! gesture.",
    howToObtain: "Exhaust Captain Drummond's dialogue → Hurrah! gesture.",
  },
  mm3: {
    itemId: "mm3",
    where: "Memory of Vammar",
    howToGetThere: "1) Enter Memory of Vammar (Forest of Fallen Giants tree).\n2) Explore the memory. There's a Soul of a Giant on a corpse or in a chest.\n3) Pick it up. You need these for Vendrick (each halves his defense).\n4) Exit the memory when done.",
    howToObtain: "Pick up Soul of a Giant.",
    items: ["Soul of a Giant"],
  },
  mm4: {
    itemId: "mm4",
    where: "Memory of Orro",
    howToGetThere: "1) Go to Brightstone Cove Tseldora. Find the giant tree (in the area).\n2) Use Ashen Mist Heart on it. Enter Memory of Orro.\n3) Inside, find the Soul of a Giant. Benhart's summon sign is here — summon him for the area if you want.\n4) Pick up the soul. Exit when done.",
    howToObtain: "Pick up Soul of a Giant. Benhart can be summoned.",
    items: ["Soul of a Giant"],
  },
  mm8: {
    itemId: "mm8",
    where: "Memory of Orro — second floor, illusory + Pharros",
    howToGetThere: "1) In Memory of Orro, go to the second floor.\n2) There are 2 Pharros contraptions. One is a TRAP — skip it. The other reveals a wall.\n3) Use Pharros on the correct one. Or use the ILLUSORY wall next to it — press A/X on the wall beside the Pharros contraption.\n4) The illusory wall opens. Steel Set and Fire Seed inside.\n5) If you use the wrong Pharros, a trap activates. The illusory wall is safer.",
    howToObtain: "Press A/X on illusory wall. Use Pharros on correct contraption.",
    items: ["Steel Set", "Fire Seed"],
  },
  mm5: {
    itemId: "mm5",
    where: "Memory of Jeigh — Giant Lord",
    howToGetThere: "1) Go to Black Gulch. Find the giant tree (near the Rotten area or in the pit).\n2) Use Ashen Mist Heart on it. Enter Memory of Jeigh.\n3) Progress through. You'll reach the Giant Lord boss.\n4) Defeat him. Best soul farm in the game. Use a Bonfire Ascetic INSIDE the memory to respawn him — infinite souls.",
    howToObtain: "Defeat Giant Lord. Best soul farm. Ascetic inside memory = infinite.",
    items: ["Giant Lord Soul"],
  },
  mm6: {
    itemId: "mm6",
    where: "Memory of Jeigh — Benhart summon",
    howToGetThere: "1) In Memory of Jeigh, before the Giant Lord fog gate, Benhart's summon sign is on the ground.\n2) Be HUMAN. Summon Benhart.\n3) He MUST survive the Giant Lord fight for his quest. Do NOT summon Captain Drummond too — having both can cause issues.\n4) Fight Giant Lord. Keep Benhart alive.",
    howToObtain: "Summon Benhart. He MUST survive. Do NOT summon Drummond too (conflicts).",
  },
  mm7: {
    itemId: "mm7",
    where: "Giant Lord drops",
    howToGetThere: "1) Defeat the Giant Lord in Memory of Jeigh.\n2) He drops the Giant Lord Soul and a Soul of a Giant.\n3) Pick both up from the ground.\n4) The Soul of a Giant is used for Vendrick. The Giant Lord Soul can be traded.",
    howToObtain: "Pick up drops.",
    items: ["Giant Lord Soul", "Soul of a Giant"],
  },

  // ─── DARK CHASM ───
  ch1: {
    itemId: "ch1",
    where: "Grandahl's 3 locations",
    howToGetThere: "1) Grandahl is at 3 spots: Black Gulch (cave on right ledge), Shaded Woods (hidden cave), Drangleic Castle (drop through floor in Ruin Sentinel room).\n2) Talk to him at each. He'll let you enter a Dark Chasm.\n3) Each entry costs 1 Human Effigy. You must complete all 3 chasms (light sconce, kill enemies) to fight Darklurker.\n4) On your 4th entry (to any chasm), Darklurker appears instead of regular enemies.",
    howToObtain: "Costs 1 Human Effigy per entry.",
  },
  ch2: {
    itemId: "ch2",
    where: "Chasm 1 — Black Gulch",
    howToGetThere: "1) Go to Black Gulch. Find Grandahl's cave (right ledge).\n2) Talk to him. Choose to enter the chasm. Pay 1 Human Effigy.\n3) You'll be in a dark area. Kill all enemies. Find the sconce at the end.\n4) Light the sconce. You've completed chasm 1. Exit or die to leave.",
    howToObtain: "Light sconce at end. Kill all enemies.",
  },
  ch3: {
    itemId: "ch3",
    where: "Chasm 2 — Shaded Woods",
    howToGetThere: "1) Go to Shaded Woods. Find Grandahl's cave (explore the area).\n2) Talk to him. Enter the chasm. Pay 1 Human Effigy.\n3) This chasm is the easiest. Kill enemies, light the sconce at the end.\n4) Complete it. One more chasm to go.",
    howToObtain: "Easiest chasm. Light sconce at end.",
  },
  ch4: {
    itemId: "ch4",
    where: "Chasm 3 — Drangleic Castle",
    howToGetThere: "1) In Drangleic Castle, find the Ruin Sentinel room. Drop through the fragile floor (last door on left).\n2) You'll land in Grandahl's cave. Talk to him.\n3) Enter the chasm. Pay 1 Human Effigy.\n4) Complete it — kill enemies, light sconce. Now all 3 are done.",
    howToObtain: "Light sconce at end.",
  },
  ch5: {
    itemId: "ch5",
    where: "After completing all 3 chasms",
    howToGetThere: "1) After completing all 3 chasms (lighting all 3 sconces), enter ANY chasm again.\n2) Pay the Human Effigy. This time, instead of regular enemies, Darklurker will appear.\n3) He's a boss. Weak to FIRE. He splits in two — focus one and burst it down fast.\n4) Defeat him. Drops Darklurker Soul.",
    howToObtain: "Defeat Darklurker. Weak to FIRE. Splits in two — burst one fast.",
    items: ["Darklurker Soul"],
  },
  ch6: {
    itemId: "ch6",
    where: "Grandahl — after Darklurker",
    howToGetThere: "1) Defeat Darklurker.\n2) Return to Grandahl (any of his 3 locations). Talk to him.\n3) He'll give you covenant rewards based on rank: Rank 1 = Resonant Soul, Rank 2 = Great Resonant Soul, Rank 3 = Climax + Xanthous Set.\n4) You need to defeat Darklurker and turn in the soul to rank up.",
    howToObtain: "Rank 1: Resonant Soul. Rank 2: Great Resonant Soul. Rank 3: Climax + Xanthous Set.",
    items: ["Resonant Soul", "Great Resonant Soul", "Climax", "Xanthous Set"],
  },

  // ─── THRONE OF WANT ───
  tw1: {
    itemId: "tw1",
    where: "Boss arena — Throne Watcher & Defender",
    howToGetThere: "1) You need the King's Ring. Go through Shrine of Amana (use Key to King's Passage from after Looking Glass Knight).\n2) Past Demon of Song, through Undead Crypt to get the ring. Then return.\n3) The path to Throne of Want is through the King's Gate in Shrine of Amana.\n4) You'll reach the Throne of Want. First boss fog — Throne Watcher & Defender. Kill them close together or they revive each other.",
    howToObtain: "Kill them close together or they revive each other.",
    items: ["Watcher Soul", "Defender Soul"],
  },
  tw2: {
    itemId: "tw2",
    where: "Right of fog gate — Benhart summon",
    howToGetThere: "1) At the Throne Watcher & Defender fog gate, look to the RIGHT of the fog.\n2) Benhart's summon sign is on the ground. Be HUMAN.\n3) Summon him. He MUST survive this fight for his quest completion.\n4) Then enter the fog. Fight the bosses. Keep Benhart alive.",
    howToObtain: "Summon Benhart. He MUST survive for quest completion.",
  },
  tw3: {
    itemId: "tw3",
    where: "Boss arena — Nashandra",
    howToGetThere: "1) Defeat Throne Watcher & Defender.\n2) Nashandra, the final boss, appears. Enter her arena.\n3) She uses curse. Bring curse-curing items (Cursebite Ring, Holy Water, etc.).\n4) Defeat her. She drops Nashandra Soul.",
    howToObtain: "Defeat Nashandra. Bring curse-curing items.",
    items: ["Nashandra Soul"],
  },
  tw4: {
    itemId: "tw4",
    where: "After Nashandra — Aldia",
    howToGetThere: "1) If you exhausted ALL of Aldia's dialogue at his bonfire appearances, he appears after Nashandra.\n2) Don't sit on the throne yet. Aldia will show up as a boss.\n3) Defeat him. This unlocks the alternate SotFS ending.\n4) After beating him, you can choose to sit on the throne or walk away.",
    howToObtain: "Defeat Aldia for alternate SotFS ending.",
  },
  tw5: {
    itemId: "tw5",
    where: "Throne",
    howToGetThere: "1) After Nashandra (and Aldia if he appeared), the throne is there.\n2) Sit on the Throne = Link the Fire ending (standard).\n3) Walk away = SotFS alternate ending (if you beat Aldia).\n4) Choose based on what ending you want.",
    howToObtain: "Sit on Throne (Link Fire) OR Walk Away (SotFS ending with Aldia).",
  },

  // ─── DLC 1: SUNKEN KING ───
  d11: {
    itemId: "d11",
    where: "Primal Bonfire in Black Gulch",
    howToGetThere: "1) Defeat The Rotten in Black Gulch.\n2) Light the Primal Bonfire that appears after him.\n3) Interact with the bonfire. You'll see an option to warp to a new area.\n4) Select Shulva (Crown of the Sunken King). You'll warp to the DLC.",
    howToObtain: "Select Shulva. Warp to DLC.",
  },
  d12: {
    itemId: "d12",
    where: "Sanctum Walk bonfire",
    howToGetThere: "1) After warping to Shulva, you'll land in the DLC area.\n2) Progress forward. The first bonfire (Sanctum Walk) is early in the area.\n3) Light it. This is your base for the DLC.",
    howToObtain: "Light the bonfire.",
  },
  d13: {
    itemId: "d13",
    where: "Throughout Shulva",
    howToGetThere: "1) Explore Shulva thoroughly. The Eternal Sanctum Key and Dragon Stone are in the area.\n2) Check chests, corpses, and puzzle solutions. The key unlocks doors.\n3) The Dragon Stone is used for the covenant. Find both as you progress.",
    howToObtain: "Find and pick up.",
  },
  d14: {
    itemId: "d14",
    where: "Chests/corpses in Shulva",
    howToGetThere: "1) Explore Dragon's Sanctum — the main dungeon area.\n2) Focus Souls (sorcery) and Promised Walk of Peace (hex) are on corpses or in chests.\n3) Check each room. Pick them up when you find them.",
    howToObtain: "Pick up Focus Souls (sorcery), Promised Walk of Peace (hex).",
    items: ["Focus Souls", "Promised Walk of Peace"],
  },
  d19: {
    itemId: "d19",
    where: "Dragon's Sanctum — left wall after Black Drakeblood Knight drop",
    howToGetThere: "1) In Dragon's Sanctum, you'll reach an area with broken stairs. A Black Drakeblood Knight is there.\n2) Drop down from the broken stairs (or fight the knight).\n3) After the drop, look at the LEFT wall.\n4) Press A/X. Illusory wall opens — Sanctum Interior bonfire inside. Rest there.",
    howToObtain: "Press A/X on left wall. Reveals Sanctum Interior bonfire.",
    items: ["Sanctum Interior Bonfire"],
  },
  d15: {
    itemId: "d15",
    where: "Chest in Shulva",
    howToGetThere: "1) Explore Shulva. The Lightning Clutch Ring is in a chest.\n2) Check side rooms and optional paths.\n3) Open the chest when you find it.",
    howToObtain: "Open the chest.",
    items: ["Lightning Clutch Ring"],
  },
  d16: {
    itemId: "d16",
    where: "Boss arena — Elana",
    howToGetThere: "1) Progress through Shulva to the boss arena.\n2) Elana, the Squalid Queen — she summons a Velstadt phantom. Kill the phantom or focus her.\n3) Defeat her. She drops Elana Soul.",
    howToObtain: "Defeat Elana. She summons Velstadt phantom.",
    items: ["Elana Soul"],
  },
  d17: {
    itemId: "d17",
    where: "Boss arena — Sinh",
    howToGetThere: "1) After Elana, progress to Sinh, the Slumbering Dragon.\n2) He's a dragon boss. His attacks DESTROY weapon durability.\n3) Bring backup weapons or repair powder. Defeat him.\n4) Drops Sinh Soul.",
    howToObtain: "Defeat Sinh. Destroys weapon durability — bring backups.",
    items: ["Sinh Soul"],
  },
  d18: {
    itemId: "d18",
    where: "Optional boss — Graverobber, Varg, Cerah",
    howToGetThere: "1) In Shulva, there's an optional area that leads to a 3-NPC boss fight.\n2) Graverobber, Varg, and Cerah — all three attack at once.\n3) This is one of the hardest fights in the game. Optional.\n4) Only attempt if you want the challenge.",
    howToObtain: "Extremely hard. Optional.",
  },

  // ─── DLC 2: OLD IRON KING ───
  d21: {
    itemId: "d21",
    where: "Primal Bonfire in Iron Keep",
    howToGetThere: "1) Defeat Old Iron King in Iron Keep.\n2) Light the Primal Bonfire after him.\n3) Interact with it. Select Brume Tower (Crown of the Old Iron King).\n4) Warp to the DLC.",
    howToObtain: "Select Brume Tower. Warp to DLC.",
  },
  d22: {
    itemId: "d22",
    where: "Throne Floor bonfire",
    howToGetThere: "1) After warping to Brume Tower, you'll land in the DLC.\n2) The first bonfire (Throne Floor) is at the start.\n3) Light it. Your base for the DLC.",
    howToObtain: "Light the bonfire.",
  },
  d23: {
    itemId: "d23",
    where: "Throughout Brume Tower — 11 Smelter Wedges",
    howToGetThere: "1) Explore Brume Tower thoroughly. Smelter Wedges are scattered — on corpses, in chests, in side areas.\n2) There are 11 total. Find all of them.\n3) Use each wedge on an Ashen Idol (the statue things). They heal the Fume Knight.\n4) Destroy ALL idols before fighting Fume Knight. Critical.",
    howToObtain: "Destroy ALL Ashen Idols. Critical for Fume Knight fight.",
  },
  d28: {
    itemId: "d28",
    where: "After 2nd Ashen Idol — snowy ledge; Foyer elevator",
    howToGetThere: "1) Snowy ledge: After destroying the 2nd Ashen Idol, there's an outdoor snowy ledge. A wall has an illusory section — press A/X. Soul Vessel x2 and herbs inside.\n2) Foyer elevator: In the Foyer, take the SECOND elevator up. While it's moving, MASH A/X on the wall. An illusory wall opens during the ride. Hollow Skin inside.\n3) Both are easy to miss. Check carefully.",
    howToObtain: "Press A/X on ledge wall. Elevator: wall opens during ride.",
    items: ["Soul Vessel x2", "Herbs", "Hollow Skin"],
  },
  d24: {
    itemId: "d24",
    where: "Nadalia Soul fragments; corpse",
    howToGetThere: "1) Nadalia's Soul fragments are scattered in Brume Tower. Collect them.\n2) Combine them and trade for Outcry pyromancy (from Straid or similar).\n3) Dance of Fire is on a corpse elsewhere in the DLC. Explore to find it.\n4) Pick up both.",
    howToObtain: "Outcry from Nadalia Soul. Dance of Fire from corpse.",
    items: ["Outcry", "Dance of Fire"],
  },
  d25: {
    itemId: "d25",
    where: "Boss arena — Fume Knight",
    howToGetThere: "1) Progress through Brume Tower. Destroy ALL nearby Ashen Idols first — they heal him.\n2) Find the Fume Knight boss fog. Enter.\n3) One of the hardest bosses in Souls. Two phases. Defeat him.\n4) Drops Fume Knight Soul.",
    howToObtain: "One of hardest bosses. Defeat Fume Knight.",
    items: ["Fume Knight Soul"],
  },
  d26: {
    itemId: "d26",
    where: "Memory of Old Iron King",
    howToGetThere: "1) In Brume Tower, find the memory entrance (a coffin or nest you can interact with).\n2) Use it to enter the Memory of Old Iron King.\n3) Progress through. You'll reach Sir Alonne — a boss.\n4) He's a very fast samurai. Defeat him. Drops Sir Alonne Soul.",
    howToObtain: "Defeat Sir Alonne. Very fast samurai.",
    items: ["Sir Alonne Soul"],
  },
  d27: {
    itemId: "d27",
    where: "Iron Passage — Blue Smelter Demon",
    howToGetThere: "1) The Iron Passage is in Brume Tower — a gauntlet area.\n2) Fight through the passage. At the end is the Blue Smelter Demon.\n3) He's like the regular Smelter but does MAGIC damage instead of fire.\n4) Optional boss. Defeat him if you want.",
    howToObtain: "Optional. Defeat Blue Smelter Demon.",
  },

  // ─── DLC 3: IVORY KING ───
  d31: {
    itemId: "d31",
    where: "Shrine of Winter — Frozen Flower key",
    howToGetThere: "1) In Drangleic Castle, after defeating the 4 main bosses, find the Frozen Flower (key item).\n2) Go to the Shrine of Winter (the gate from Shaded Woods).\n3) Use the Frozen Flower on the shrine. A new path opens.\n4) Walk through to Frozen Eleum Loyce (DLC 3).",
    howToObtain: "Use key to enter Frozen Eleum Loyce.",
  },
  d32: {
    itemId: "d32",
    where: "Outer Wall bonfire",
    howToGetThere: "1) Enter Frozen Eleum Loyce through the Shrine of Winter.\n2) The first bonfire (Outer Wall) is at the start.\n3) Light it. Your base for the DLC.",
    howToObtain: "Light the bonfire.",
  },
  d33: {
    itemId: "d33",
    where: "Eye of the Priestess",
    howToGetThere: "1) Explore Eleum Loyce. The Eye of the Priestess is somewhere in the area.\n2) Find it and pick it up. It's a key item.\n3) Use it — it makes invisible enemies (like Aava) visible.\n4) You NEED this before fighting Aava or she's invisible.",
    howToObtain: "Pick up. Required before Aava fight.",
  },
  d34: {
    itemId: "d34",
    where: "Throughout Eleum Loyce",
    howToGetThere: "1) Before the Burnt Ivory King boss, you must find ALL 4 Loyce Knights.\n2) They're NPCs scattered in the area. Find each one and recruit them.\n3) Knight 1: near first bonfire. Knight 2: main castle. Knight 3: lower area past elevator. Knight 4: requires progression.\n4) When you fight the Ivory King, they close the portals in the arena. Without them, the fight is nearly impossible.",
    howToObtain: "They close the portals in the boss arena. Critical.",
    warning: "Without all 4, the fight is much harder.",
  },
  d35: { itemId: "d35", where: "Near first bonfire", howToGetThere: "1) From Outer Wall bonfire, explore the immediate area.\n2) The first Loyce Knight is nearby — look for him.\n3) Talk to him to recruit him.", howToObtain: "Find and recruit." },
  d36: { itemId: "d36", where: "Main castle area", howToGetThere: "1) Progress into the main castle. The second Loyce Knight is in this area.\n2) Find him and talk to recruit.", howToObtain: "Find and recruit." },
  d37: { itemId: "d37", where: "Lower area past elevator", howToGetThere: "1) Take the elevator down to the lower area.\n2) The third Loyce Knight is here. Find and recruit him.", howToObtain: "Find and recruit." },
  d38: { itemId: "d38", where: "Requires progression", howToGetThere: "1) The fourth Loyce Knight requires more area progression.\n2) Explore further. Find him and recruit.", howToObtain: "Find and recruit." },
  d314: {
    itemId: "d314",
    where: "Bridge with ballistas",
    howToGetThere: "1) In Eleum Loyce, find the bridge with ballistas.\n2) There's a Pharros contraption on or near the bridge.\n3) Use a Pharros Lockstone on it.\n4) A path opens. Durgo's Hat is inside. Pick it up.",
    howToObtain: "Use Pharros Lockstone. Get Durgo's Hat.",
    items: ["Durgo's Hat"],
  },
  d39: {
    itemId: "d39",
    where: "Boss arena — Aava",
    howToGetThere: "1) Get the Eye of the Priestess (d33) first. Use it.\n2) Without it, Aava is INVISIBLE and you can't fight her properly.\n3) Find her boss fog. Enter. She's a large tiger-like boss.\n4) Defeat her. Drops Aava Soul.",
    howToObtain: "Defeat Aava.",
    items: ["Aava Soul"],
  },
  d310: {
    itemId: "d310",
    where: "Grand Cathedral — Burnt Ivory King",
    howToGetThere: "1) With all 4 Loyce Knights recruited, go to the Grand Cathedral.\n2) Enter the boss arena. The Loyce Knights will close the portals.\n3) Enemies spawn from portals — knights close them. When all are closed, the Burnt Ivory King drops in.\n4) Epic fight. Defeat him. Drops Ivory King Soul.",
    howToObtain: "Loyce Knights close portals. King drops. Epic fight.",
    items: ["Ivory King Soul"],
  },
  d311: {
    itemId: "d311",
    where: "Grand Cathedral — Lucatiel summon",
    howToGetThere: "1) If you completed Lucatiel's dialogue at Aldia's Keep (after 3 boss survivals), her summon sign appears in the Grand Cathedral.\n2) It's for the Burnt Ivory King fight. Be human. Summon her.\n3) Optional. She can help with the boss.",
    howToObtain: "Optional. Summon for Ivory King.",
  },
  d312: {
    itemId: "d312",
    where: "Frigid Outskirts — Lud & Zallen",
    howToGetThere: "1) The Frigid Outskirts is a separate area — a blizzard run. The run is the challenge.\n2) You'll get lost in the snow. Reindeer spawn. It's brutal.\n3) At the end, Lud & Zallen (two tigers) are the boss. Optional.\n4) Only attempt if you want the challenge. The run is often harder than the boss.",
    howToObtain: "Optional. Defeat Lud & Zallen. Extremely hard area.",
  },
  d313: {
    itemId: "d313",
    where: "Chests in Eleum Loyce",
    howToGetThere: "1) Explore Eleum Loyce. Soul Flash and Blizzard sorceries are in chests or on corpses.\n2) Check each room and side path.\n3) Pick them up when you find them.",
    howToObtain: "Pick up from chests/corpses.",
    items: ["Soul Flash", "Blizzard"],
  },
};

/** Get detail for a checklist item. Falls back to parent for subItems (e.g. lb13a → lb13). */
export function getItemDetail(itemId: string): ChecklistItemDetail | undefined {
  const direct = AREA_ITEM_DETAILS[itemId];
  if (direct) return direct;
  const parentId = itemId.replace(/[a-z]$/, "");
  return AREA_ITEM_DETAILS[parentId];
}
