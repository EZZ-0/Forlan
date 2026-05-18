import { useState, useEffect, useMemo, useRef } from "react";

// ═══════════════════════════════════════════════════════════════════════════════
// DARK SOULS 2: SCHOLAR OF THE FIRST SIN — 100% PROGRESSION ENGINE (XBOX)
// ═══════════════════════════════════════════════════════════════════════════════

// --- AREA DATA: [id, text, type, questRef?, tags[]] ---
// type: item | npc | boss | bonfire | key | warn
// questRef: "questName:stepNum" | null
// tags: gesture:name, estus:N, bone:N, branch, covenant:name, spell:category

const A = {
  things_betwixt: { name: "Things Betwixt", lvl: "1", items: [
    ["tb1","Rusted Coin (gap in wall, turn right)","item"],
    ["tb2","Talk to Milibeth & Old Firekeepers","npc"],
    ["tb3","Chest upstairs — Human Effigy","item"],
    ["tb4","Destroy cart outside — Soul of a Lost Undead + Torch","item"],
    ["tb5","Light bonfire","bonfire"],
    ["tb6","Hidden path below bridge — Small Smooth & Silky Stone","item"],
    ["tb7","Kill Ogre near bridge — Stone Ring","item"],
    ["tb8","Gold Pine Resin from corpse","item"],
    ["tb9","Tutorial: Dagger + Lifegem, drop Stone on bird nest","item"],
    ["tb10","Fog Gate 2: Amber Herbs (jump gap) + Cracked Red Eye Orb","item"],
    ["tb11","Push trees, kill 2 Ogres outside, sleep in Coffin (sex swap)","item"],
    ["tb12","Return to Milibeth — Handmaid's Ladle","npc"],
    ["tb13","Path to Majula: Morning Star, Cleric's Sacred Chime, Binoculars","item"],
  ]},
  majula: { name: "Majula", lvl: "1–10", items: [
    ["mj1","Light bonfire, talk to Emerald Herald — get Estus Flask","bonfire"],
    ["mj2","Talk to Benhart of Jugo (path to Shaded Woods) — exhaust dialogue","npc","benhart:1"],
    ["mj3","Pick up Divine Blessing, Lifegems, Homeward Bones","item"],
    ["mj4","Building: kill Hollow, get Lloyd's Talismans","item"],
    ["mj5","Talk to Saulden → Welcome gesture, join Way of Blue","npc",null,["gesture:welcome","covenant:way_of_blue"]],
    ["mj6","Hit rock at well — Estus Flask Shard","item",null,["estus:1"]],
    ["mj7","Spiral stairs by pit — Crimson Parma (chest)","item"],
    ["mj8","Victor's Stone — Homeward Bones (Company of Champions here)","item",null,["covenant:company_of_champions"]],
    ["mj9","Sweet Shalquoir shop — buy Silvercat Ring (13,400) & Ring of Whispers (5,800)","npc"],
    ["mj10","Talk to Maughlin the Armorer, buy gear","npc"],
    ["mj11","Ladder by Maughlin — Titanite Shard (chest)","item"],
    ["mj12","Path to FoFG: Rusted Coin, pull switch, Human Effigy, Homeward Bone","item"],
  ]},
  forest_of_fallen_giants: { name: "Forest of Fallen Giants", lvl: "10–20", items: [
    ["fg1","Crestfallen's Retreat bonfire","bonfire"],
    ["fg2","River: Lifegem, Soul of a Lost Undead. Up ladders: jump gap → Shortsword","item"],
    ["fg3","Kill Heide Knight (sits by tree) — Heide Knight Sword","item"],
    ["fg4","Cardinal Tower bonfire","bonfire"],
    ["fg5","Talk to Merchant Hag Melentia — buy Lenigrast's Key (1000), Pharros Lockstone (4000)","npc"],
    ["fg6","Spend 10,000 with Melentia → Covetous Silver Serpent Ring +1. Exhaust dialogue (moves to Majula)","npc"],
    ["fg7","Upstairs: break door → Small Leather Shield, Repair Powder, Hand Axe, Lifegem","item"],
    ["fg8","Ambush room chest — Estus Flask Shard + Small White Sign Soapstone","item",null,["estus:2"]],
    ["fg9","Drop on branch: Divine Blessing. Scaffolding: Human Effigy","item"],
    ["fg10","Caves below: Hollow Soldier Helm, Soul of a Proud Knight","item"],
    ["fg11","Past Flame Salamander — Fire Longsword (chest) ★ great early weapon","key"],
    ["fg12","Return to Majula: upgrade Estus, open Lenigrast's shop, get Short Bow behind him","key"],
    ["fg13","Optional: Silvercat drop to salamander pit — Hawk Ring, Flame Quartz Ring +1, Rebel's Greatshield","item"],
    ["fg14","Pursuer platform: bait firebomb hollow to break wall shortcut","item"],
    ["fg15","Early Pursuer fight (optional) — Ring of Blades, Soul of the Pursuer","boss"],
    ["fg16","Talk to Cale the Cartographer (cave) — get House Key for Majula mansion","npc"],
    ["fg17","BOSS: THE LAST GIANT — Summon: Pate (if trap done), Luet","boss"],
    ["fg18","Use Soldier Key: opens Pursuer door, Soldier's Rest, King's Gate","key"],
    ["fg19","BOSS: THE PURSUER (boss room) — bird nest after → Lost Bastille","boss"],
  ]},
  heides_tower: { name: "Heide's Tower of Flame", lvl: "30–40", items: [
    ["ht1","Tower of Flame bonfire","bonfire"],
    ["ht2","Upper level: Human Effigy, Dark Torches, Soul of a Proud Knight, Old Knight Halberd","item"],
    ["ht3","Chest (Syan Knight guard) — Sublime Bone Dust","item",null,["bone:1"]],
    ["ht4","Bottom of spiral: Monastery Charm","item"],
    ["ht5","BOSS: DRAGONRIDER — pull both levers for full platform","boss"],
    ["ht6","Talk to Licia of Lindeldt (after Dragonrider) — exhaust dialogue → moves to Majula rotunda","npc"],
    ["ht7","BOSS: OLD DRAGONSLAYER (Cathedral of Blue) — Old Leo Ring","boss"],
    ["ht8","Blue Sentinel Targray — need Token of Fidelity → join Blue Sentinels → Duel Bow gesture","npc",null,["gesture:duel_bow","covenant:blue_sentinels"]],
  ]},
  no_mans_wharf: { name: "No-Man's Wharf", lvl: "35–45", items: [
    ["nm1","No-Man's Wharf bonfire","bonfire"],
    ["nm2","Pharros Lockstone: illuminates dark area","item"],
    ["nm3","Heavy Crossbow +3, Greatsword, Iron Arrows","item"],
    ["nm4","⚔ Talk to Lucatiel — IN A HOUSE LEFT OF FIRST STAIRS (SotFS moved!)","npc","lucatiel:1"],
    ["nm5","Pull bell lever on dock to call the ship","key"],
    ["nm6","BOSS: FLEXILE SENTRY — can summon Lucatiel (dock near ship)","boss"],
    ["nm7","Optional: Summon Lucatiel for Flexile Sentry (boss survival 1?)","boss","lucatiel_boss:flexile"],
    ["nm8","Ship takes you to Lost Bastille","key"],
  ]},
  lost_bastille: { name: "The Lost Bastille", lvl: "55–65", items: [
    ["lb1","Tower Apart bonfire (from bird nest) / Exile Holding Cells (from ship)","bonfire"],
    ["lb2","Tower Apart: chests with Dull Ember ★ GIVE TO MCDUFF","key"],
    ["lb3","⚔ Talk to Lucatiel — tower ahead from McDuff's Workshop bonfire","npc","lucatiel:2"],
    ["lb4","Use Fragrant Branch on Straid of Olaphis (cell near Exile Holding) — boss soul trades","npc",null,["branch"]],
    ["lb5","Exhaust Straid dialogue → Mock gesture","npc",null,["gesture:mock"]],
    ["lb6","Estus Flask Shard — near Straid's area","item",null,["estus:3"]],
    ["lb7","Give Dull Ember to McDuff → infusion blacksmith. Spend 14,000 → Titanite Slab","npc"],
    ["lb8","BOSS: RUIN SENTINELS (3) — fight first on platform","boss"],
    ["lb9","Bastille Key (after Ruin Sentinels) — opens McDuff gate + other doors","key"],
    ["lb10","Belfry Luna — Pharros wall → Bell Keeper covenant (talk to dwarf)","key",null,["covenant:bell_keepers"]],
    ["lb11","BOSS: BELFRY GARGOYLES (5) — Covetous Gold Serpent Ring +2 on roof after","boss"],
  ]},
  huntsmans_copse: { name: "Huntsman's Copse", lvl: "55–65", items: [
    ["hc1","Pay Licia 2,000 souls at Majula rotunda to open path","key"],
    ["hc2","Undead Lockaway bonfire","bonfire"],
    ["hc3","Talk to Felkin the Outcast — hex merchant. 20 INT/FTH → Sunset Staff + Hexer's Set free","npc"],
    ["hc4","Free Creighton the Wanderer (find Undead Lockaway Key) → Fist Pump gesture","npc","pate_creighton:2",["gesture:fist_pump"]],
    ["hc5","Token of Fidelity + Pharros Lockstone (across bridge gap)","item"],
    ["hc6","Soul Spear sorcery (hut to the right)","item",null,["spell:sorcery"]],
    ["hc7","Estus Flask Shard — cave area","item",null,["estus:4"]],
    ["hc8","BOSS: SKELETON LORDS — kill one at a time, clear adds","boss"],
    ["hc9","Undead Purgatory → BOSS: EXECUTIONER'S CHARIOT — hit lever to stop chariot","boss"],
    ["hc10","Brotherhood of Blood covenant (Titchy Gren, after Chariot)","npc",null,["covenant:brotherhood_of_blood"]],
  ]},
  harvest_valley: { name: "Harvest Valley", lvl: "60–70", items: [
    ["hv1","Harvest Valley bonfire","bonfire"],
    ["hv2","Fragrant Branch of Yore (cave with poison)","item",null,["branch"]],
    ["hv3","Sublime Bone Dust — chest past poison pools","item",null,["bone:2"]],
    ["hv4","Talk to Gavlan (poison building) — 'Gavlan wheel, Gavlan deal'. Exhaust dialogue → moves later","npc","gavlan:2"],
    ["hv5","Heirs of the Sun altar — across bridge, go left. Kneel → Praise the Sun gesture","key",null,["gesture:praise_the_sun","covenant:heirs_of_the_sun"]],
    ["hv6","BOSS: COVETOUS DEMON — shoot pots to distract","boss"],
  ]},
  earthen_peak: { name: "Earthen Peak", lvl: "65–75", items: [
    ["ep1","Lower Earthen Peak bonfire","bonfire"],
    ["ep2","⚔ Lucatiel — SotFS: go DOWN to poison water, follow passage RIGHT","npc","lucatiel:3"],
    ["ep3","Talk to Laddersmith Gilligan — pay 2,000 → Prostration gesture. Exhaust → moves to Majula","npc",null,["gesture:prostration"]],
    ["ep4","Mirrah Shield (chest above moving platform)","item"],
    ["ep5","★ BURN THE WINDMILL ★ Light torch → interact with windmill base. Drains ALL poison from boss arena","warn"],
    ["ep6","Talk to Mild-Mannered Pate (if met before) — questline progress","npc","pate_creighton:3"],
    ["ep7","BOSS: MYTHA, THE BANEFUL QUEEN — BURN WINDMILL FIRST. Summon: Jester Thomas","boss"],
    ["ep8","Estus Flask Shard — in the area","item",null,["estus:5"]],
  ]},
  iron_keep: { name: "Iron Keep / Belfry Sol", lvl: "80–90", items: [
    ["ik1","Threshold Bridge bonfire → Iron Keep proper","bonfire"],
    ["ik2","Covetous Gold Serpent Ring +1 (chest)","item"],
    ["ik3","Estus Flask Shard — platform jumps near lava","item",null,["estus:6"]],
    ["ik4","Sublime Bone Dust — chest near lava","item",null,["bone:3"]],
    ["ik5","Iron Key — opens doors in Forest of Fallen Giants","key"],
    ["ik6","Talk to Magerold of Lanafir — sells Branch, Lockstones, Warmth pyro","npc"],
    ["ik7","Optional: Summon Lucatiel for SMELTER DEMON (sign outside fog gate)","boss","lucatiel_boss:smelter"],
    ["ik8","BOSS: SMELTER DEMON (optional) — very tough, fire damage","boss"],
    ["ik9","BOSS: OLD IRON KING — watch the lava hole! Lord Soul #2","boss"],
    ["ik10","Light Primal Bonfire","bonfire"],
    ["ik11","Belfry Sol — Pharros wall in Iron Keep. Bell Keeper area","key"],
  ]},
  the_pit: { name: "The Pit / Grave of Saints", lvl: "45–55", items: [
    ["pt1","Majula Pit — buy ladder from Gilligan (12,000) or use Silvercat Ring","key"],
    ["pt2","Grave of Saints bonfire","bonfire"],
    ["pt3","Pharros Lockstones: reveal walls/traps throughout","item"],
    ["pt4","BOSS: ROYAL RAT VANGUARD — kill the mohawk rat","boss"],
    ["pt5","Talk to Rat King → join Rat King covenant","npc",null,["covenant:rat_king"]],
  ]},
  the_gutter: { name: "The Gutter", lvl: "65–75", items: [
    ["gt1","Upper Gutter bonfire","bonfire"],
    ["gt2","Light sconces as you go for navigation","item"],
    ["gt3","Fragrant Branch of Yore (on corpse)","item",null,["branch"]],
    ["gt4","Dark Pyromancy Flame (hidden path)","item"],
    ["gt5","Navigate the wooden maze carefully → leads to Black Gulch","key"],
  ]},
  black_gulch: { name: "Black Gulch", lvl: "65–75", items: [
    ["bg1","Black Gulch Mouth bonfire. BREAK POISON STATUES as you go","bonfire"],
    ["bg2","Fragrant Branch on corpse BEFORE entering — SAVE for hidden bonfire statue","item",null,["branch"]],
    ["bg3","Scraps of Life hex (cave with worm enemies)","item",null,["spell:hex"]],
    ["bg4","⚔ Lucatiel — HIDDEN: from 1st bonfire go left, edge cliff, DROP DOWN near 3 poison statues","npc","lucatiel:4"],
    ["bg5","Hidden bonfire path: from fog gate hug LEFT wall → narrow path → petrified statue (use Branch)","key"],
    ["bg6","Hidden Chamber bonfire + Lucatiel summon sign for The Rotten","bonfire"],
    ["bg7","Darkdiver Grandahl — cave on RIGHT ledge of Black Gulch","npc","grandahl:1"],
    ["bg8","Optional: Summon Lucatiel for THE ROTTEN (easiest boss survival)","boss","lucatiel_boss:rotten"],
    ["bg9","BOSS: THE ROTTEN — stay behind him, dodge AoE dark attack. Lord Soul","boss"],
    ["bg10","Light Primal Bonfire","bonfire"],
  ]},
  shaded_woods: { name: "Shaded Woods", lvl: "80–90", items: [
    ["sw1","Use Fragrant Branch on Rosabeth of Melfia (petrified statue blocking path)","key",null,["branch"]],
    ["sw2","Give Rosabeth clothing, exhaust dialogue → Joy gesture. She moves to Majula","npc",null,["gesture:joy"]],
    ["sw3","Talk to Benhart again here — exhaust dialogue","npc","benhart:2"],
    ["sw4","Ruined Fork Road bonfire","bonfire"],
    ["sw5","Foggy area LEFT WALL → Head of Vengarl. Exhaust dialogue → Decapitate gesture","npc",null,["gesture:decapitate"]],
    ["sw6","Equip Ring of Whispers → talk to Manscorpion Tark → Warmup gesture","npc",null,["gesture:warmup"]],
    ["sw7","BOSS: SCORPIONESS NAJKA — Tark can be summoned","boss"],
    ["sw8","Return to Tark after Najka (Ring of Whispers on) → Second Dragon Ring + Branch","npc"],
    ["sw9","Estus Flask Shard — in the ruins area","item",null,["estus:7"]],
    ["sw10","Use Branch on Lion Warrior for Fang Key access","item",null,["branch"]],
    ["sw11","Three-path fork: Left=fog/Vengarl, Straight=Pharros/Tseldora, Right=Shrine of Winter","key"],
  ]},
  doors_of_pharros: { name: "Doors of Pharros", lvl: "80–90", items: [
    ["dp1","Doors of Pharros bonfire","bonfire"],
    ["dp2","Save Pharros Lockstones — most contraptions here are traps/minor","item"],
    ["dp3","Twisted Barricade hex (corpse)","item",null,["spell:hex"]],
    ["dp4","Santier's Spear (chest), Gyrm Greatshield","item"],
    ["dp5","Gavlan — final location (moved from Harvest Valley)","npc","gavlan:3"],
    ["dp6","Darkdiver Grandahl — hidden cave in the area","npc","grandahl:2"],
    ["dp7","BOSS: ROYAL RAT AUTHORITY — KILL SMALL RATS FIRST (toxic!)","boss"],
    ["dp8","After both rat bosses → Shalquoir sells Flying Feline Boots","item"],
  ]},
  brightstone_cove: { name: "Brightstone Cove Tseldora", lvl: "90–100", items: [
    ["bc1","Royal Army Campsite bonfire","bonfire"],
    ["bc2","Estus Flask Shard — before spider area","item",null,["estus:8"]],
    ["bc3","Sublime Bone Dust (chest)","item",null,["bone:4"]],
    ["bc4","Cromwell the Pardoner — after Prowling Magus. Pardons sins for souls","npc"],
    ["bc5","Summon Benhart for PROWLING MAGUS — sign near campsite bonfire. MUST SURVIVE","boss","benhart_boss:magus"],
    ["bc6","BOSS: PROWLING MAGUS AND CONGREGATION — easy, kill mages first","boss"],
    ["bc7","Pate & Creighton confrontation: find them fighting → help one kill the other","npc","pate_creighton:4"],
    ["bc8","BOSS: THE DUKE'S DEAR FREJA — 2 heads, damage heads only. Lord Soul","boss"],
    ["bc9","Light Primal Bonfire","bonfire"],
    ["bc10","Brightstone Key → Lord's Private Chamber: Great Lightning Spear, Fire Tempest","key",null,["spell:miracle","spell:pyromancy"]],
    ["bc11","Kill Vengarl's Body → return to Head in Shaded Woods → gear + War Cry gesture","item",null,["gesture:war_cry"]],
  ]},
  sinners_rise: { name: "Sinner's Rise", lvl: "95–105", items: [
    ["sr1","Sinner's Rise bonfire","bonfire"],
    ["sr2","Sublime Bone Dust — in water area","item",null,["bone:5"]],
    ["sr3","★ Light oil trails BOTH SIDES of fog gate with torch → enables lock-on in boss room","warn"],
    ["sr4","Summon Lucatiel (bottom of elevator) for Lost Sinner — good survival fight","boss","lucatiel_boss:sinner"],
    ["sr5","BOSS: THE LOST SINNER — aggressive, parry effective. Lord Soul","boss"],
    ["sr6","Light Primal Bonfire","bonfire"],
  ]},
  drangleic_castle: { name: "Drangleic Castle", lvl: "95–105", items: [
    ["dc1","Shrine of Winter → need 4 Lord Souls (or high Soul Memory)","key"],
    ["dc2","Kill enemies near golem doors to power them open","key"],
    ["dc3","King's Gate bonfire","bonfire"],
    ["dc4","Chancellor Wellager — exhaust dialogue → This One's Me gesture","npc",null,["gesture:this_ones_me"]],
    ["dc5","Darkdiver Grandahl — DROP THROUGH fragile floor in Ruin Sentinel room → hidden cave","npc","grandahl:3",["covenant:pilgrims_of_dark"]],
    ["dc6","Join Pilgrims of Dark covenant now — enter Dark Chasms at all 3 Grandahl locations","key"],
    ["dc7","Estus Flask Shard — in the castle","item",null,["estus:9"]],
    ["dc8","BOSS: TWIN DRAGONRIDERS — kill archer first","boss"],
    ["dc9","Benhart of Jugo — after Twin Dragonriders. Exhaust dialogue","npc","benhart:3"],
    ["dc10","BOSS: LOOKING GLASS KNIGHT — summons phantoms from mirror","boss"],
    ["dc11","Key to King's Passage","key"],
  ]},
  shrine_of_amana: { name: "Shrine of Amana", lvl: "95–105", items: [
    ["sa1","Crumbled Ruins bonfire. USE A BOW to snipe priestesses","bonfire"],
    ["sa2","Estus Flask Shard — in the water area","item",null,["estus:10"]],
    ["sa3","Sunlight Blade miracle (chest past hidden path)","item",null,["spell:miracle"]],
    ["sa4","Havel's Set (chest in cave)","item"],
    ["sa5","Talk to Milfanito (singing woman) — Smooth & Silky Stone","npc"],
    ["sa6","BOSS: DEMON OF SONG — attack when face exposed","boss"],
  ]},
  undead_crypt: { name: "Undead Crypt", lvl: "100–110", items: [
    ["uc1","Undead Ditch bonfire","bonfire"],
    ["uc2","★ DO NOT LIGHT TORCHES OR RING BELLS — spawns enemies, PERMANENTLY aggros Agdayne","warn"],
    ["uc3","Talk to Grave Warden Agdayne WITHOUT torch → Have Mercy! gesture + hex vendor","npc",null,["gesture:have_mercy"]],
    ["uc4","Avelyn crossbow, Olenford's Staff","item"],
    ["uc5","BOSS: VELSTADT, THE ROYAL AEGIS — 2nd phase dark buff","boss"],
    ["uc6","Enter Vendrick's chamber — pick up King's Ring","key"],
    ["uc7","Vendrick walks around hollow — need Giant Souls to fight him later (each halves defense)","npc"],
    ["uc8","Return to Agdayne with King's Ring → Darkdrift katana + Agdayne's Set","npc"],
  ]},
  aldias_keep: { name: "Aldia's Keep", lvl: "100–110", items: [
    ["ak1","Use King's Ring on King's Gate in Shaded Woods to access","key"],
    ["ak2","Foregarden bonfire","bonfire"],
    ["ak3","Estus Flask Shard — in the area","item",null,["estus:11"]],
    ["ak4","Soul Vessel (chest)","item"],
    ["ak5","⚠ LUCATIEL — small hut on LEFT exterior. DO NOT TALK until 3+ boss survivals!","npc","lucatiel:5"],
    ["ak6","Talk to Aldia at bonfire (affects ending)","npc"],
    ["ak7","Navlaan (behind barrier) — talk while HOLLOW for assassination quests. Do NOT pull lever while human","npc"],
    ["ak8","BOSS: GUARDIAN DRAGON — ranged helps. Leads to Dragon Aerie","boss"],
  ]},
  dragon_aerie: { name: "Dragon Aerie / Dragon Shrine", lvl: "105–115", items: [
    ["da1","Dragon Aerie bonfire. Crystal Lizards EVERYWHERE — kill all for upgrade mats","bonfire"],
    ["da2","Petrified Dragon Bones, Twinkling Titanite throughout","item"],
    ["da3","Dragon Shrine: DON'T attack Dragon Knights — they're honorable in SotFS, won't attack","warn"],
    ["da4","Talk to Emerald Herald at entrance → Aged Feather (infinite Homeward Bone)","npc"],
    ["da5","Pick up Petrified Egg → give to Magerold (Iron Keep) → Dragon Remnants covenant","key",null,["covenant:dragon_remnants"]],
    ["da6","Talk to Ancient Dragon → Ashen Mist Heart (DON'T fight him yet)","npc"],
    ["da7","Estus Flask Shard — chest","item",null,["estus:12"]],
    ["da8","Optional: BOSS: ANCIENT DRAGON — huge HP, one-shot fire. Drops Soul of a Giant","boss"],
  ]},
  memories: { name: "Memories (Orro/Vammar/Jeigh)", lvl: "110–120", items: [
    ["mm1","Need Ashen Mist Heart to enter Giant Memories","key"],
    ["mm2","Memory of Vammar — Captain Drummond → Hurrah! gesture","npc",null,["gesture:hurrah"]],
    ["mm3","Memory of Vammar: Soul of a Giant","item"],
    ["mm4","Memory of Orro: Soul of a Giant. Benhart summon available","item"],
    ["mm5","Memory of Jeigh: BOSS: GIANT LORD — great for soul farming","boss"],
    ["mm6","Summon Benhart for Giant Lord — MUST SURVIVE. Do NOT summon Drummond too","boss","benhart_boss:giant_lord"],
    ["mm7","Giant Lord drops: Giant Lord Soul + Soul of a Giant","item"],
  ]},
  dark_chasm: { name: "Dark Chasm of Old", lvl: "95–105", items: [
    ["ch1","Enter at each of Grandahl's 3 locations — costs 1 Human Effigy each","key"],
    ["ch2","Chasm 1: Black Gulch — light sconce at end, kill all enemies","key"],
    ["ch3","Chasm 2: Shaded Woods — light sconce at end (easiest chasm)","key"],
    ["ch4","Chasm 3: Drangleic Castle — light sconce at end","key"],
    ["ch5","Complete all 3 → BOSS: DARKLURKER appears in next entry. Weak to FIRE","boss"],
    ["ch6","Talk to Grandahl after → Rank 1: Resonant Soul, Rank 2: Great Resonant Soul, Rank 3: Climax + Xanthous Set","npc",null,["spell:hex","spell:hex","spell:hex"]],
  ]},
  throne_of_want: { name: "Throne of Want (Endgame)", lvl: "110–120", items: [
    ["tw1","BOSS: THRONE WATCHER & DEFENDER — kill close together or they revive","boss"],
    ["tw2","Summon Benhart — sign right of fog gate. MUST SURVIVE (questline!)","boss","benhart_boss:throne"],
    ["tw3","BOSS: NASHANDRA — final boss. Bring curse-curing items","boss"],
    ["tw4","BOSS: ALDIA (if all dialogue exhausted) — alternate ending available","boss"],
    ["tw5","Ending: Sit on Throne (Link Fire) OR Walk Away (SotFS ending with Aldia)","key"],
  ]},
  dlc_sunken: { name: "DLC 1: Crown of the Sunken King", lvl: "DLC", items: [
    ["d11","Access via Primal Bonfire in Black Gulch → Shulva","key"],
    ["d12","Sanctum Walk bonfire","bonfire"],
    ["d13","Eternal Sanctum Key, Dragon Stone","key"],
    ["d14","Focus Souls sorcery, Promised Walk of Peace hex","item",null,["spell:sorcery","spell:hex"]],
    ["d15","Lightning Clutch Ring","item"],
    ["d16","BOSS: ELANA, THE SQUALID QUEEN — summons Velstadt phantom","boss"],
    ["d17","BOSS: SINH, THE SLUMBERING DRAGON — destroys weapon durability, bring backups","boss"],
    ["d18","Optional BOSS: GRAVEROBBER, VARG & CERAH — 3-NPC gank, extremely hard","boss"],
  ]},
  dlc_iron: { name: "DLC 2: Crown of the Old Iron King", lvl: "DLC", items: [
    ["d21","Access via Primal Bonfire in Iron Keep → Brume Tower","key"],
    ["d22","Throne Floor bonfire","bonfire"],
    ["d23","Collect ALL Smelter Wedges (11) — destroy Ashen Idols","key"],
    ["d24","Outcry pyromancy (from Nadalia Soul fragments), Dance of Fire pyro","item",null,["spell:pyromancy","spell:pyromancy"]],
    ["d25","BOSS: FUME KNIGHT — one of the hardest in all Souls. Destroy nearby Idols first","boss"],
    ["d26","Optional BOSS: SIR ALONNE — Memory of Old Iron King. Very fast samurai","boss"],
    ["d27","Optional BOSS: BLUE SMELTER DEMON — Iron Passage. Magic damage version","boss"],
  ]},
  dlc_ivory: { name: "DLC 3: Crown of the Ivory King", lvl: "DLC", items: [
    ["d31","Access via Shrine of Winter → Frozen Eleum Loyce","key"],
    ["d32","Outer Wall bonfire","bonfire"],
    ["d33","Get Eye of the Priestess — makes invisible enemies visible","key"],
    ["d34","★ Find ALL 4 Loyce Knights before Ivory King boss — they close portals in arena","warn"],
    ["d35","Loyce Knight 1: near first bonfire","item"],
    ["d36","Loyce Knight 2: main castle area","item"],
    ["d37","Loyce Knight 3: lower area past elevator","item"],
    ["d38","Loyce Knight 4: requires area progression","item"],
    ["d39","BOSS: AAVA, THE KING'S PET — get Eye of Priestess first or she's invisible","boss"],
    ["d310","BOSS: BURNT IVORY KING — Loyce Knights close portals, then King drops. Epic fight","boss"],
    ["d311","Optional: Lucatiel summon in Grand Cathedral (if Aldia's Keep dialogue done)","boss","lucatiel_boss:ivory_king"],
    ["d312","Optional BOSS: LUD & ZALLEN — Frigid Outskirts. The run IS the boss","boss"],
    ["d313","Soul Flash sorcery, Blizzard sorcery","item",null,["spell:sorcery","spell:sorcery"]],
  ]},
};

// --- NPC QUESTLINES ---
const QUESTS = {
  lucatiel: {
    name: "Lucatiel of Mirrah",
    icon: "⚔",
    color: "#5e9ecf",
    achievement: "Lucatiel (Achievement)",
    reward: "Lucatiel's Set + Mirrah Greatsword",
    note: "Must visit ALL 4 locations AND she must survive 3 boss fights. All in ONE playthrough.",
    steps: [
      { id: "lucatiel:1", ref: "nm4", label: "Talk at No-Man's Wharf (house LEFT of stairs)", area: "no_mans_wharf" },
      { id: "lucatiel:2", ref: "lb3", label: "Talk at Lost Bastille (tower from McDuff's)", area: "lost_bastille" },
      { id: "lucatiel:3", ref: "ep2", label: "Talk at Earthen Peak (DOWN to poison water, RIGHT)", area: "earthen_peak" },
      { id: "lucatiel:4", ref: "bg4", label: "Talk at Black Gulch (cliff drop near 3 poison statues)", area: "black_gulch" },
      { id: "lucatiel:5", ref: "ak5", label: "Talk at Aldia's Keep (ONLY after 3 boss survivals!)", area: "aldias_keep" },
    ],
    bossSurvivalNeeded: 3,
    bosses: [
      { id: "lucatiel_boss:flexile", ref: "nm7", label: "Flexile Sentry (No-Man's Wharf)", area: "no_mans_wharf" },
      { id: "lucatiel_boss:sinner", ref: "sr4", label: "Lost Sinner (Sinner's Rise)", area: "sinners_rise" },
      { id: "lucatiel_boss:smelter", ref: "ik7", label: "Smelter Demon (Iron Keep) — risky", area: "iron_keep" },
      { id: "lucatiel_boss:rotten", ref: "bg8", label: "The Rotten (Black Gulch) — easiest ★", area: "black_gulch" },
      { id: "lucatiel_boss:ivory_king", ref: "d311", label: "Burnt Ivory King (DLC3)", area: "dlc_ivory" },
    ],
  },
  benhart: {
    name: "Benhart of Jugo",
    icon: "🗡",
    color: "#c89b3c",
    achievement: "Benhart of Jugo (Achievement)",
    reward: "Benhart's Set + Moonlight Greatsword (Achievement)",
    note: "Exhaust dialogue at every location. Must survive 3+ boss fights (do 4 to be safe).",
    steps: [
      { id: "benhart:1", ref: "mj2", label: "Talk in Majula (path to Shaded Woods)", area: "majula" },
      { id: "benhart:2", ref: "sw3", label: "Talk in Shaded Woods (near fork)", area: "shaded_woods" },
      { id: "benhart:3", ref: "dc9", label: "Talk in Drangleic Castle (after Twin Dragonriders)", area: "drangleic_castle" },
    ],
    bossSurvivalNeeded: 3,
    bosses: [
      { id: "benhart_boss:magus", ref: "bc5", label: "Prowling Magus (Tseldora) — easy ★", area: "brightstone_cove" },
      { id: "benhart_boss:giant_lord", ref: "mm6", label: "Giant Lord (Memory of Jeigh)", area: "memories" },
      { id: "benhart_boss:throne", ref: "tw2", label: "Throne Watcher & Defender (Endgame)", area: "throne_of_want" },
    ],
  },
  grandahl: {
    name: "Darkdiver Grandahl",
    icon: "🌑",
    color: "#8b5cf6",
    achievement: "Abysmal Covenant",
    reward: "Pilgrims of Dark covenant → Dark Chasm → Darklurker → Hexes (Resonant Soul, Great Resonant Soul, Climax)",
    note: "Visit all 3 locations and talk to him. Then join covenant and complete Dark Chasms.",
    steps: [
      { id: "grandahl:1", ref: "bg7", label: "Black Gulch — cave on RIGHT ledge", area: "black_gulch" },
      { id: "grandahl:2", ref: "dp6", label: "Doors of Pharros — hidden cave", area: "doors_of_pharros" },
      { id: "grandahl:3", ref: "dc5", label: "Drangleic Castle — drop through fragile floor in Ruin Sentinel room", area: "drangleic_castle" },
    ],
    bossSurvivalNeeded: 0,
    bosses: [],
  },
  gavlan: {
    name: "Gavlan",
    icon: "🍺",
    color: "#65a30d",
    reward: "Permanent buy/sell vendor at Doors of Pharros",
    note: "Exhaust dialogue at each location to make him move to the next.",
    steps: [
      { id: "gavlan:1", label: "No-Man's Wharf — in a building", area: "no_mans_wharf" },
      { id: "gavlan:2", ref: "hv4", label: "Harvest Valley — poison building", area: "harvest_valley" },
      { id: "gavlan:3", ref: "dp5", label: "Doors of Pharros — final location (permanent)", area: "doors_of_pharros" },
    ],
    bossSurvivalNeeded: 0,
    bosses: [],
  },
  pate_creighton: {
    name: "Pate & Creighton",
    icon: "⚖",
    color: "#d97706",
    reward: "Winner's gear + Crushed Eye Orb (invade Licia)",
    note: "Meet both NPCs, progress their encounters, choose a side in Tseldora.",
    steps: [
      { id: "pate_creighton:1", label: "Talk to Pate in FoFG (before gate trap), go through trap, talk again", area: "forest_of_fallen_giants" },
      { id: "pate_creighton:2", ref: "hc4", label: "Free Creighton in Huntsman's Copse → Fist Pump gesture", area: "huntsmans_copse" },
      { id: "pate_creighton:3", ref: "ep6", label: "Talk to Pate in Earthen Peak", area: "earthen_peak" },
      { id: "pate_creighton:4", ref: "bc7", label: "Tseldora: Pate & Creighton fighting — help one kill the other", area: "brightstone_cove" },
    ],
    bossSurvivalNeeded: 0,
    bosses: [],
  },
};

// --- GESTURES (20 for Gesture Maestro achievement) ---
const GESTURES = [
  ["Point","Default","Start"],
  ["Pump Up","Default","Start"],
  ["Wave","Default","Start"],
  ["No Way","Default","Start"],
  ["Welcome","Saulden","Majula","mj5"],
  ["Joy","Rosabeth","Shaded Woods (after unpetrifying, give clothes)","sw2"],
  ["Duel Bow","Blue Sentinel Targray","Cathedral of Blue (join Blue Sentinels)","ht8"],
  ["Mock","Straid of Olaphis","Lost Bastille (unpetrify, exhaust dialogue)","lb5"],
  ["Fist Pump","Creighton","Huntsman's Copse (free from cell)","hc4"],
  ["Praise the Sun","Sun altar","Harvest Valley (kneel at altar)","hv5"],
  ["Prostration","Laddersmith Gilligan","Earthen Peak (pay 2,000 souls)","ep3"],
  ["Decapitate","Head of Vengarl","Shaded Woods foggy area (left wall)","sw5"],
  ["Warmup","Manscorpion Tark","Shaded Woods (equip Ring of Whispers)","sw6"],
  ["This One's Me","Chancellor Wellager","Drangleic Castle entrance","dc4"],
  ["Have Mercy!","Grave Warden Agdayne","Undead Crypt (NO TORCH!)","uc3"],
  ["Hurrah!","Captain Drummond","Memory of Vammar","mm2"],
  ["War Cry","Vengarl's Head","Return after killing Vengarl's Body","bc11"],
  ["Righty-ho!","Mild-Mannered Pate","After completing trap events","ep6"],
  ["Truce","Cromwell the Pardoner","Brightstone Cove Tseldora",null],
  ["Desperate","Various","Die repeatedly while hollow / exhaust NPCs",null],
];

// --- COVENANTS ---
const COVENANTS = [
  ["Way of Blue","Saulden, Majula","Kill 10 invaders = max rank","mj5"],
  ["Blue Sentinels","Targray, Cathedral of Blue","Token of Fidelity to join. PvP rank → spells","ht8"],
  ["Brotherhood of Blood","Titchy Gren, Undead Purgatory","PvP covenant. Rank → spells","hc10"],
  ["Heirs of the Sun","Altar, Harvest Valley","30 Sunlight Medals = max rank","hv5"],
  ["Bell Keepers","Dwarf, Belfry Luna","Kill 30 invaders → Hidden Weapon sorcery","lb10"],
  ["Rat King","Rat King, Grave of Saints","Pull players into your world","pt5"],
  ["Company of Champions","Victor's Stone, Majula","Harder difficulty. 50 Awestones → Vanquisher's Seal","mj8"],
  ["Pilgrims of Dark","Grandahl (3 locations)","Dark Chasm access → Darklurker → hex spells","dc5"],
  ["Dragon Remnants","Magerold, Iron Keep (give Petrified Egg)","Dragon duels → Dragon stones","da5"],
];

// --- AREA WARNINGS ---
const WARNINGS = {
  earthen_peak: ["🔥 BURN THE WINDMILL before Mytha — light torch, interact with windmill base. Drains ALL poison from boss arena. Miss this = nearly impossible boss fight."],
  undead_crypt: ["💀 DO NOT light any torches! DO NOT ring any bells! This spawns extra enemies and PERMANENTLY aggros Agdayne (hex vendor + Have Mercy gesture). Enter with no torch equipped."],
  aldias_keep: [],
  black_gulch: ["🗝 Save a Fragrant Branch for the hidden bonfire path (petrified statue). The Branch on the corpse BEFORE Black Gulch entrance is meant for this."],
  dragon_aerie: ["🐉 In SotFS, Dragon Knights are honorable — they WON'T attack unless you attack first. Just walk through. Only Drakekeepers near Ancient Dragon are hostile."],
  dlc_ivory: ["⚔ Find ALL 4 Loyce Knights before fighting the Burnt Ivory King — they seal the portals in the boss arena, making the fight much easier."],
};

// ══════════ AREA ORDER (Fighting Cowboy route) ══════════
const AREA_ORDER = [
  "things_betwixt","majula","forest_of_fallen_giants","heides_tower","no_mans_wharf",
  "lost_bastille","huntsmans_copse","harvest_valley","earthen_peak","iron_keep",
  "the_pit","the_gutter","black_gulch","shaded_woods","doors_of_pharros",
  "brightstone_cove","sinners_rise","drangleic_castle","shrine_of_amana","undead_crypt",
  "aldias_keep","dragon_aerie","memories","dark_chasm","throne_of_want",
  "dlc_sunken","dlc_iron","dlc_ivory"
];

// ══════════ MAIN COMPONENT ══════════
export default function DS2Engine() {
  const [checked, setChecked] = useState({});
  const [view, setView] = useState("dashboard");
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [areaListOpen, setAreaListOpen] = useState(false);

  // Load
  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get("ds2-progress");
        if (r?.value) setChecked(JSON.parse(r.value));
      } catch {}
      setLoaded(true);
    })();
  }, []);

  // Save
  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(async () => {
      try {
        setSaving(true);
        await window.storage.set("ds2-progress", JSON.stringify(checked));
        setTimeout(() => setSaving(false), 800);
      } catch { setSaving(false); }
    }, 500);
    return () => clearTimeout(t);
  }, [checked, loaded]);

  const toggle = (id) => setChecked(p => ({ ...p, [id]: !p[id] }));

  const resetAll = async () => {
    setChecked({});
    try { await window.storage.delete("ds2-progress"); } catch {}
    setShowReset(false);
  };

  // ── Computed Stats ──
  const stats = useMemo(() => {
    const allItems = AREA_ORDER.flatMap(a => A[a].items.map(i => i[0]));
    const checkedCount = allItems.filter(id => checked[id]).length;

    const questStats = {};
    Object.entries(QUESTS).forEach(([qk, q]) => {
      const stepsDone = q.steps.filter(s => checked[s.ref || s.id]).length;
      const bossesDone = q.bosses.filter(b => checked[b.ref || b.id]).length;
      questStats[qk] = { stepsDone, stepsTotal: q.steps.length, bossesDone, bossesNeeded: q.bossSurvivalNeeded };
    });

    const gesturesDone = GESTURES.filter(g => !g[3] || checked[g[3]]).length;
    const defaultGestures = GESTURES.filter(g => !g[3]).length;
    const trackableGestures = GESTURES.length - defaultGestures;
    const trackedGesturesDone = gesturesDone - defaultGestures;

    const covenantsDone = COVENANTS.filter(c => checked[c[3]]).length;

    const estus = Array.from({length:12}, (_,i) => {
      const tag = `estus:${i+1}`;
      for (const ak of AREA_ORDER) {
        for (const item of A[ak].items) {
          if (item[4] && item[4].includes(tag)) return checked[item[0]];
        }
      }
      return false;
    }).filter(Boolean).length;

    const boneDust = Array.from({length:5}, (_,i) => {
      const tag = `bone:${i+1}`;
      for (const ak of AREA_ORDER) {
        for (const item of A[ak].items) {
          if (item[4] && item[4].includes(tag)) return checked[item[0]];
        }
      }
      return false;
    }).filter(Boolean).length;

    return { total: allItems.length, checkedCount, questStats, gesturesDone, trackableGestures, trackedGesturesDone, covenantsDone, estus, boneDust };
  }, [checked]);

  // Lucatiel warning computation
  const lucBossSurvivals = useMemo(() => {
    return QUESTS.lucatiel.bosses.filter(b => checked[b.ref || b.id]).length;
  }, [checked]);

  // Dynamic warnings for Aldia's Keep
  const getDynamicWarnings = (areaId) => {
    const w = [...(WARNINGS[areaId] || [])];
    if (areaId === "aldias_keep") {
      if (lucBossSurvivals < 3) {
        w.push(`🚫 LUCATIEL WARNING: She has only survived ${lucBossSurvivals}/3 boss fights. DO NOT talk to her at Aldia's Keep yet or her questline FAILS permanently!`);
      } else {
        w.push(`✅ Lucatiel has survived ${lucBossSurvivals}/3 boss fights. Safe to talk to her at Aldia's Keep for her reward!`);
      }
    }
    return w;
  };

  const areaCompletion = (areaId) => {
    const items = A[areaId].items;
    const done = items.filter(i => checked[i[0]]).length;
    return { done, total: items.length, pct: Math.round((done / items.length) * 100) };
  };

  // ── Styles ──
  const bg = "#0c0b0a";
  const bgCard = "#1a1714";
  const bgHover = "#231f1a";
  const gold = "#c8a030";
  const ember = "#d4652a";
  const dimText = "#8a7e6d";
  const lightText = "#e8dcc8";
  const warnRed = "#c44040";
  const successGreen = "#6b9e3a";
  const questBlue = "#5e9ecf";

  const navBtn = (active) => ({
    padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer",
    fontFamily: "'Cinzel', 'Palatino', Georgia, serif", fontSize: "13px", fontWeight: active ? 700 : 400,
    background: active ? gold : "transparent", color: active ? "#0c0b0a" : dimText,
    transition: "all 0.2s",
  });

  if (!loaded) return (
    <div style={{ background: bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: gold, fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px" }}>
        🔥 Kindling the bonfire...
      </div>
    </div>
  );

  // ── Render Helpers ──
  const ProgressBar = ({ done, total, color = gold, height = 6 }) => (
    <div style={{ background: "#2a2420", borderRadius: 3, height, overflow: "hidden", flex: 1 }}>
      <div style={{ width: `${total > 0 ? (done/total)*100 : 0}%`, height: "100%", background: color, borderRadius: 3, transition: "width 0.4s ease" }} />
    </div>
  );

  const CheckItem = ({ item, areaId }) => {
    const [id, text, type, questRef, tags] = item;
    const done = checked[id];
    const isWarn = type === "warn";
    const isBoss = type === "boss";
    const isNpc = type === "npc";
    const isBonfire = type === "bonfire";
    const isKey = type === "key";

    // Find quest association
    let questBadge = null;
    if (questRef) {
      const qName = questRef.split(":")[0];
      const q = QUESTS[qName];
      if (q) questBadge = { icon: q.icon, color: q.color, name: q.name };
    }

    const typeIcon = isWarn ? "" : isBoss ? "💀" : isNpc ? "👤" : isBonfire ? "🔥" : isKey ? "🗝" : "•";

    return (
      <div onClick={() => !isWarn && toggle(id)}
        style={{
          display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 12px", borderRadius: 6,
          cursor: isWarn ? "default" : "pointer", transition: "background 0.15s",
          background: isWarn ? "rgba(196,64,64,0.12)" : done ? "rgba(200,160,48,0.06)" : "transparent",
          borderLeft: isWarn ? `3px solid ${warnRed}` : questBadge ? `3px solid ${questBadge.color}` : "3px solid transparent",
          opacity: done && !isWarn ? 0.55 : 1,
        }}>
        {!isWarn && (
          <div style={{
            width: 20, height: 20, borderRadius: 4, border: `2px solid ${done ? gold : "#3a342a"}`,
            background: done ? gold : "transparent", display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, marginTop: 1, transition: "all 0.2s",
          }}>
            {done && <span style={{ color: "#0c0b0a", fontSize: 12, fontWeight: 700 }}>✓</span>}
          </div>
        )}
        <div style={{ flex: 1 }}>
          <div style={{
            color: isWarn ? warnRed : done ? dimText : lightText,
            fontSize: 13, lineHeight: 1.5, textDecoration: done && !isWarn ? "line-through" : "none",
            fontFamily: "'Georgia', serif",
          }}>
            <span style={{ marginRight: 6 }}>{typeIcon}</span>
            {text}
          </div>
          {questBadge && (
            <span style={{
              fontSize: 10, color: questBadge.color, background: `${questBadge.color}18`,
              padding: "1px 6px", borderRadius: 3, marginTop: 3, display: "inline-block",
            }}>
              {questBadge.icon} {questBadge.name}
            </span>
          )}
        </div>
      </div>
    );
  };

  // ── VIEWS ──

  const DashboardView = () => {
    const pct = Math.round((stats.checkedCount / stats.total) * 100);
    return (
      <div style={{ padding: 20 }}>
        {/* Overall */}
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 32, color: gold, fontWeight: 700 }}>
            {pct}%
          </div>
          <div style={{ color: dimText, fontSize: 13, marginTop: 4 }}>{stats.checkedCount} / {stats.total} tasks completed</div>
          <div style={{ maxWidth: 300, margin: "12px auto 0" }}>
            <ProgressBar done={stats.checkedCount} total={stats.total} height={8} />
          </div>
        </div>

        {/* Quest Progress */}
        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 14, color: gold, marginBottom: 12, letterSpacing: 1 }}>NPC QUESTLINES</div>
        <div style={{ display: "grid", gap: 10, marginBottom: 24 }}>
          {Object.entries(QUESTS).map(([qk, q]) => {
            const s = stats.questStats[qk];
            const allSteps = s.stepsDone === s.stepsTotal;
            const bossOk = s.bossesDone >= s.bossesNeeded;
            const complete = allSteps && bossOk;
            return (
              <div key={qk} onClick={() => { setSelectedQuest(qk); setView("quests"); }}
                style={{ background: bgCard, borderRadius: 8, padding: 14, cursor: "pointer", border: `1px solid ${complete ? successGreen+"44" : "#2a2420"}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ color: q.color, fontSize: 14, fontWeight: 600 }}>{q.icon} {q.name}</span>
                  {complete && <span style={{ color: successGreen, fontSize: 11 }}>✅ COMPLETE</span>}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: dimText }}>
                  <span>Talks: {s.stepsDone}/{s.stepsTotal}</span>
                  {s.bossesNeeded > 0 && <span>|  Bosses: {s.bossesDone}/{s.bossesNeeded}</span>}
                  <ProgressBar done={s.stepsDone + s.bossesDone} total={s.stepsTotal + s.bossesNeeded} color={q.color} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Trackers Grid */}
        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 14, color: gold, marginBottom: 12, letterSpacing: 1 }}>TRACKERS</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
          {[
            ["🔥", "Estus Shards", stats.estus, 12, ember],
            ["💀", "Sublime Bone Dust", stats.boneDust, 5, "#c0c0c0"],
            ["🎭", "Gestures", stats.trackedGesturesDone + 4, 20, "#d4a828"],
            ["⚔", "Covenants Found", stats.covenantsDone, 9, "#8b5cf6"],
          ].map(([icon, label, done, total, color]) => (
            <div key={label} style={{ background: bgCard, borderRadius: 8, padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                <span>{icon}</span>
                <span style={{ color: lightText, fontSize: 12, fontWeight: 600 }}>{label}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color, fontSize: 18, fontWeight: 700, fontFamily: "'Cinzel', Georgia, serif" }}>{done}</span>
                <span style={{ color: dimText, fontSize: 12 }}>/ {total}</span>
                <ProgressBar done={done} total={total} color={color} />
              </div>
            </div>
          ))}
        </div>

        {/* Area Progress */}
        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 14, color: gold, marginBottom: 12, letterSpacing: 1 }}>AREA PROGRESS</div>
        <div style={{ display: "grid", gap: 6 }}>
          {AREA_ORDER.map(ak => {
            const c = areaCompletion(ak);
            return (
              <div key={ak} onClick={() => { setSelectedArea(ak); setView("area"); }}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 6, cursor: "pointer", background: bgCard }}>
                <span style={{ color: c.pct === 100 ? successGreen : lightText, fontSize: 12, flex: 1, fontFamily: "'Georgia', serif" }}>
                  {c.pct === 100 ? "✅ " : ""}{A[ak].name}
                </span>
                <span style={{ color: dimText, fontSize: 11, width: 44, textAlign: "right" }}>{c.pct}%</span>
                <div style={{ width: 80 }}><ProgressBar done={c.done} total={c.total} /></div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const AreaView = () => {
    const ak = selectedArea || AREA_ORDER[0];
    const area = A[ak];
    const c = areaCompletion(ak);
    const warnings = getDynamicWarnings(ak);
    const idx = AREA_ORDER.indexOf(ak);

    return (
      <div style={{ padding: 20 }}>
        {/* Area selector */}
        <div style={{ position: "relative", marginBottom: 16 }}>
          <button onClick={() => setAreaListOpen(!areaListOpen)}
            style={{
              width: "100%", padding: "12px 16px", background: bgCard, border: `1px solid #2a2420`,
              borderRadius: 8, color: lightText, fontSize: 14, fontFamily: "'Cinzel', Georgia, serif",
              cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
            <span>{area.name} <span style={{ color: dimText, fontSize: 11 }}>Lvl {area.lvl}</span></span>
            <span style={{ color: gold }}>{c.pct}% ▾</span>
          </button>
          {areaListOpen && (
            <div style={{
              position: "absolute", top: "100%", left: 0, right: 0, zIndex: 100, maxHeight: 350, overflowY: "auto",
              background: "#1e1a16", border: `1px solid #2a2420`, borderRadius: 8, marginTop: 4,
            }}>
              {AREA_ORDER.map(a => {
                const ac = areaCompletion(a);
                return (
                  <div key={a} onClick={() => { setSelectedArea(a); setAreaListOpen(false); }}
                    style={{
                      padding: "10px 16px", cursor: "pointer", display: "flex", justifyContent: "space-between",
                      borderBottom: "1px solid #2a2420", color: a === ak ? gold : lightText, fontSize: 12,
                      background: a === ak ? "rgba(200,160,48,0.08)" : "transparent",
                    }}>
                    <span>{ac.pct === 100 ? "✅ " : ""}{A[a].name}</span>
                    <span style={{ color: dimText }}>{ac.pct}%</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Prev/Next */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <button disabled={idx === 0} onClick={() => setSelectedArea(AREA_ORDER[idx - 1])}
            style={{ flex: 1, padding: 8, background: bgCard, border: `1px solid #2a2420`, borderRadius: 6, color: idx === 0 ? "#3a342a" : dimText, cursor: idx === 0 ? "default" : "pointer", fontSize: 11 }}>
            ← {idx > 0 ? A[AREA_ORDER[idx-1]].name : ""}
          </button>
          <button disabled={idx === AREA_ORDER.length - 1} onClick={() => setSelectedArea(AREA_ORDER[idx + 1])}
            style={{ flex: 1, padding: 8, background: bgCard, border: `1px solid #2a2420`, borderRadius: 6, color: idx === AREA_ORDER.length-1 ? "#3a342a" : dimText, cursor: idx === AREA_ORDER.length-1 ? "default" : "pointer", fontSize: 11, textAlign: "right" }}>
            {idx < AREA_ORDER.length-1 ? A[AREA_ORDER[idx+1]].name : ""} →
          </button>
        </div>

        {/* Completion */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <ProgressBar done={c.done} total={c.total} height={8} />
          <span style={{ color: dimText, fontSize: 12, whiteSpace: "nowrap" }}>{c.done}/{c.total}</span>
        </div>

        {/* Warnings */}
        {warnings.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            {warnings.map((w, i) => (
              <div key={i} style={{
                background: w.startsWith("✅") ? "rgba(107,158,58,0.12)" : "rgba(196,64,64,0.12)",
                border: `1px solid ${w.startsWith("✅") ? successGreen+"44" : warnRed+"44"}`,
                borderRadius: 8, padding: 12, marginBottom: 8,
                color: w.startsWith("✅") ? successGreen : warnRed,
                fontSize: 12, lineHeight: 1.6, fontFamily: "'Georgia', serif",
              }}>
                {w}
              </div>
            ))}
          </div>
        )}

        {/* Items */}
        <div style={{ display: "grid", gap: 4 }}>
          {area.items.map(item => <CheckItem key={item[0]} item={item} areaId={ak} />)}
        </div>
      </div>
    );
  };

  const QuestsView = () => {
    const qk = selectedQuest || Object.keys(QUESTS)[0];
    const q = QUESTS[qk];
    const s = stats.questStats[qk];

    return (
      <div style={{ padding: 20 }}>
        {/* Quest selector */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
          {Object.entries(QUESTS).map(([k, v]) => {
            const qs = stats.questStats[k];
            const complete = qs.stepsDone === qs.stepsTotal && qs.bossesDone >= qs.bossesNeeded;
            return (
              <button key={k} onClick={() => setSelectedQuest(k)}
                style={{
                  padding: "6px 12px", borderRadius: 6, border: `1px solid ${k === qk ? v.color : "#2a2420"}`,
                  background: k === qk ? `${v.color}18` : bgCard, color: k === qk ? v.color : dimText,
                  cursor: "pointer", fontSize: 12,
                }}>
                {v.icon} {v.name.split(" ")[0]} {complete ? "✅" : ""}
              </button>
            );
          })}
        </div>

        {/* Quest Detail */}
        <div style={{ background: bgCard, borderRadius: 12, padding: 20, border: `1px solid ${q.color}22` }}>
          <div style={{ fontSize: 20, color: q.color, fontFamily: "'Cinzel', Georgia, serif", fontWeight: 700, marginBottom: 4 }}>
            {q.icon} {q.name}
          </div>
          {q.achievement && <div style={{ color: gold, fontSize: 11, marginBottom: 4 }}>🏆 {q.achievement}</div>}
          <div style={{ color: dimText, fontSize: 12, marginBottom: 8, fontStyle: "italic" }}>{q.note}</div>
          <div style={{ color: successGreen, fontSize: 12, marginBottom: 16 }}>🎁 Reward: {q.reward}</div>

          {/* Steps */}
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 13, color: gold, marginBottom: 10 }}>
            LOCATIONS ({s.stepsDone}/{s.stepsTotal})
          </div>
          <div style={{ display: "grid", gap: 6, marginBottom: 20 }}>
            {q.steps.map((step, i) => {
              const done = checked[step.ref || step.id];
              return (
                <div key={step.id} onClick={() => toggle(step.ref || step.id)}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", borderRadius: 6,
                    cursor: "pointer", background: done ? "rgba(200,160,48,0.06)" : "#0c0b0a",
                    border: `1px solid ${done ? successGreen+"33" : "#2a2420"}`, opacity: done ? 0.65 : 1,
                  }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%", border: `2px solid ${done ? successGreen : q.color}`,
                    background: done ? successGreen : "transparent", display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: 1, fontSize: 11, fontWeight: 700,
                    color: done ? "#fff" : q.color,
                  }}>
                    {done ? "✓" : i + 1}
                  </div>
                  <div>
                    <div style={{ color: done ? dimText : lightText, fontSize: 13, textDecoration: done ? "line-through" : "none" }}>{step.label}</div>
                    <div style={{ color: dimText, fontSize: 10, marginTop: 2 }}>📍 {A[step.area]?.name || step.area}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Boss Survivals */}
          {q.bosses.length > 0 && (
            <>
              <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 13, color: ember, marginBottom: 10 }}>
                BOSS SURVIVALS ({s.bossesDone}/{s.bossesNeeded} needed)
              </div>
              {s.bossesDone >= s.bossesNeeded && (
                <div style={{ background: "rgba(107,158,58,0.12)", border: `1px solid ${successGreen}44`, borderRadius: 6, padding: 8, marginBottom: 10, color: successGreen, fontSize: 12 }}>
                  ✅ Enough boss survivals! Questline can be completed.
                </div>
              )}
              <div style={{ display: "grid", gap: 6 }}>
                {q.bosses.map(b => {
                  const done = checked[b.ref || b.id];
                  return (
                    <div key={b.id} onClick={() => toggle(b.ref || b.id)}
                      style={{
                        display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 6,
                        cursor: "pointer", background: done ? "rgba(212,101,42,0.08)" : "#0c0b0a",
                        border: `1px solid ${done ? ember+"44" : "#2a2420"}`,
                      }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: 4, border: `2px solid ${done ? ember : "#3a342a"}`,
                        background: done ? ember : "transparent", display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, color: "#fff", fontSize: 11,
                      }}>
                        {done && "✓"}
                      </div>
                      <div>
                        <div style={{ color: done ? dimText : lightText, fontSize: 13, textDecoration: done ? "line-through" : "none" }}>💀 {b.label}</div>
                        <div style={{ color: dimText, fontSize: 10 }}>📍 {A[b.area]?.name}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const TrackersView = () => (
    <div style={{ padding: 20 }}>
      {/* Gestures */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 15, color: gold, marginBottom: 10, letterSpacing: 1 }}>
          🎭 GESTURES ({stats.trackedGesturesDone + 4}/20)
        </div>
        <ProgressBar done={stats.trackedGesturesDone + 4} total={20} color={gold} height={6} />
        <div style={{ display: "grid", gap: 4, marginTop: 10 }}>
          {GESTURES.map(g => {
            const [name, src, loc, ref] = g;
            const done = ref ? checked[ref] : true;
            return (
              <div key={name} onClick={() => ref && toggle(ref)}
                style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 4,
                  cursor: ref ? "pointer" : "default", opacity: done ? (ref ? 0.5 : 0.65) : 1,
                  background: done ? "rgba(200,160,48,0.04)" : "transparent",
                }}>
                {ref ? (
                  <div style={{
                    width: 18, height: 18, borderRadius: 3, border: `2px solid ${done ? gold : "#3a342a"}`,
                    background: done ? gold : "transparent", display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, fontSize: 10, color: "#0c0b0a", fontWeight: 700,
                  }}>{done && "✓"}</div>
                ) : (
                  <div style={{ width: 18, height: 18, borderRadius: 3, background: "#2a2420", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 10, color: dimText }}>✓</div>
                )}
                <div>
                  <span style={{ color: done ? dimText : lightText, fontSize: 12, textDecoration: done ? "line-through" : "none" }}>{name}</span>
                  <span style={{ color: "#5a5040", fontSize: 10, marginLeft: 8 }}>{src} — {loc}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Covenants */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 15, color: "#8b5cf6", marginBottom: 10, letterSpacing: 1 }}>
          ⚔ COVENANTS ({stats.covenantsDone}/9)
        </div>
        <ProgressBar done={stats.covenantsDone} total={9} color="#8b5cf6" height={6} />
        <div style={{ display: "grid", gap: 4, marginTop: 10 }}>
          {COVENANTS.map(c => {
            const [name, loc, note, ref] = c;
            const done = checked[ref];
            return (
              <div key={name} onClick={() => toggle(ref)}
                style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 4,
                  cursor: "pointer", opacity: done ? 0.5 : 1,
                }}>
                <div style={{
                  width: 18, height: 18, borderRadius: 3, border: `2px solid ${done ? "#8b5cf6" : "#3a342a"}`,
                  background: done ? "#8b5cf6" : "transparent", display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, fontSize: 10, color: "#fff", fontWeight: 700,
                }}>{done && "✓"}</div>
                <div>
                  <span style={{ color: done ? dimText : lightText, fontSize: 12, textDecoration: done ? "line-through" : "none" }}>{name}</span>
                  <span style={{ color: "#5a5040", fontSize: 10, marginLeft: 8 }}>{loc}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Estus Shards */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 15, color: ember, marginBottom: 10, letterSpacing: 1 }}>
          🔥 ESTUS SHARDS ({stats.estus}/12) &nbsp;&nbsp; 💀 BONE DUST ({stats.boneDust}/5)
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 6 }}>
          <div style={{ flex: 1 }}><ProgressBar done={stats.estus} total={12} color={ember} /></div>
          <div style={{ flex: 1 }}><ProgressBar done={stats.boneDust} total={5} color="#c0c0c0" /></div>
        </div>
        <div style={{ color: dimText, fontSize: 11, lineHeight: 1.7, fontFamily: "'Georgia', serif", marginTop: 8 }}>
          Estus Shards and Sublime Bone Dust are tracked automatically when you check them off in the area checklists. Navigate to each area to mark them.
        </div>
      </div>
    </div>
  );

  // ══════════ MAIN RENDER ══════════
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700&display=swap');
        * { box-sizing: border-box; scrollbar-width: thin; scrollbar-color: #2a2420 transparent; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2a2420; border-radius: 3px; }
        body { margin: 0; }
      `}</style>
      <div style={{ background: bg, minHeight: "100vh", maxWidth: 640, margin: "0 auto", color: lightText, position: "relative" }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(180deg, #1a1510 0%, #0c0b0a 100%)",
          borderBottom: "1px solid #2a2420", padding: "16px 20px 12px", position: "sticky", top: 0, zIndex: 50,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div>
              <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 16, fontWeight: 700, color: gold, letterSpacing: 2 }}>
                DARK SOULS II
              </div>
              <div style={{ fontSize: 10, color: dimText, letterSpacing: 1.5, fontFamily: "'Cinzel', Georgia, serif" }}>
                SCHOLAR OF THE FIRST SIN — 100% ENGINE
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {saving && <span style={{ color: ember, fontSize: 11, animation: "pulse 1s infinite" }}>🔥 saving...</span>}
              <button onClick={() => setShowReset(true)}
                style={{ background: "none", border: `1px solid #3a342a`, borderRadius: 4, color: dimText, fontSize: 10, padding: "4px 8px", cursor: "pointer" }}>
                Reset
              </button>
            </div>
          </div>

          {/* Nav */}
          <div style={{ display: "flex", gap: 6 }}>
            {[
              ["dashboard", "Overview"],
              ["area", "Areas"],
              ["quests", "Quests"],
              ["trackers", "Trackers"],
            ].map(([v, label]) => (
              <button key={v} onClick={() => setView(v)} style={navBtn(view === v)}>{label}</button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ paddingBottom: 40 }}>
          {view === "dashboard" && <DashboardView />}
          {view === "area" && <AreaView />}
          {view === "quests" && <QuestsView />}
          {view === "trackers" && <TrackersView />}
        </div>

        {/* Reset Modal */}
        {showReset && (
          <div style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200,
          }}>
            <div style={{ background: bgCard, borderRadius: 12, padding: 24, maxWidth: 340, border: `1px solid ${warnRed}44` }}>
              <div style={{ color: warnRed, fontFamily: "'Cinzel', Georgia, serif", fontSize: 16, marginBottom: 12 }}>☠ Reset All Progress?</div>
              <div style={{ color: dimText, fontSize: 12, marginBottom: 20, lineHeight: 1.6 }}>
                This will erase ALL checked items, quest progress, and tracker data. This cannot be undone. Are you sure?
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setShowReset(false)}
                  style={{ flex: 1, padding: 10, background: "#2a2420", border: "none", borderRadius: 6, color: lightText, cursor: "pointer", fontSize: 13 }}>
                  Cancel
                </button>
                <button onClick={resetAll}
                  style={{ flex: 1, padding: 10, background: warnRed, border: "none", borderRadius: 6, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
                  Reset Everything
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
