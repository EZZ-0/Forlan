"""
Dark Souls II: Scholar of the First Sin — 100% Progression Tracker
Run with: streamlit run ds2_tracker.py
Progress is auto-saved to ds2_progress.json in the same folder.
"""

import json
import os
import streamlit as st

# ─────────────────────────────────────────────────────────────────────────────
# CONFIG
# ─────────────────────────────────────────────────────────────────────────────
SAVE_FILE = "ds2_progress.json"

st.set_page_config(
    page_title="DS2 SotFS — 100% Tracker",
    page_icon="🔥",
    layout="wide",
    initial_sidebar_state="collapsed",
)

# ─────────────────────────────────────────────────────────────────────────────
# CUSTOM CSS  (dark souls palette, no white borders)
# ─────────────────────────────────────────────────────────────────────────────
st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap');

html, body, [data-testid="stAppViewContainer"], [data-testid="stApp"] {
    background-color: #0c0b0a !important;
    color: #e8dcc8 !important;
}
[data-testid="stHeader"], [data-testid="stToolbar"] { background: #0c0b0a !important; }
[data-testid="stSidebar"] { background: #1a1714 !important; }
section[data-testid="stMain"] { background: #0c0b0a !important; }

h1, h2, h3 { font-family: 'Cinzel', Georgia, serif !important; color: #c8a030 !important; }
.stCheckbox label { color: #e8dcc8 !important; font-family: Georgia, serif; }
.stCheckbox [data-testid="stCheckboxLabel"] { color: #e8dcc8 !important; }

/* progress bars */
.stProgress > div > div { background-color: #2a2420 !important; }
.stProgress > div > div > div { background-color: #c8a030 !important; }

/* tabs */
.stTabs [data-baseweb="tab-list"] { background: #1a1714; border-radius: 8px; }
.stTabs [data-baseweb="tab"] { color: #8a7e6d !important; background: transparent; }
.stTabs [aria-selected="true"] { color: #c8a030 !important; background: #2a2420 !important; border-radius: 6px; }
.stTabs [data-baseweb="tab-highlight"] { background: transparent !important; }

/* expanders */
details { background: #1a1714 !important; border: 1px solid #2a2420 !important; border-radius: 8px; }
summary { color: #c8a030 !important; font-family: 'Cinzel', Georgia, serif; }

/* metrics */
[data-testid="stMetric"] { background: #1a1714; border-radius: 8px; padding: 12px; border: 1px solid #2a2420; }
[data-testid="stMetricLabel"] { color: #8a7e6d !important; }
[data-testid="stMetricValue"] { color: #c8a030 !important; }

/* warning boxes */
.warn-box { background: rgba(196,64,64,0.15); border-left: 3px solid #c44040;
            border-radius: 6px; padding: 10px 14px; color: #e87070; margin: 8px 0;
            font-family: Georgia, serif; font-size: 13px; }
.ok-box   { background: rgba(107,158,58,0.15); border-left: 3px solid #6b9e3a;
            border-radius: 6px; padding: 10px 14px; color: #9dcc60; margin: 8px 0;
            font-family: Georgia, serif; font-size: 13px; }
.info-box { background: rgba(200,160,48,0.1); border-left: 3px solid #c8a030;
            border-radius: 6px; padding: 10px 14px; color: #c8a030; margin: 8px 0;
            font-family: Georgia, serif; font-size: 13px; }

/* hide streamlit branding */
#MainMenu, footer, header { visibility: hidden; }
.block-container { padding-top: 1rem !important; max-width: 100% !important; }
</style>
""", unsafe_allow_html=True)


# ─────────────────────────────────────────────────────────────────────────────
# SAVE / LOAD
# ─────────────────────────────────────────────────────────────────────────────
def load_progress():
    if os.path.exists(SAVE_FILE):
        with open(SAVE_FILE, "r") as f:
            return json.load(f)
    return {}

def save_progress(data: dict):
    with open(SAVE_FILE, "w") as f:
        json.dump(data, f, indent=2)

if "checked" not in st.session_state:
    st.session_state.checked = load_progress()

def toggle(item_id: str):
    st.session_state.checked[item_id] = not st.session_state.checked.get(item_id, False)
    save_progress(st.session_state.checked)

def is_done(item_id: str) -> bool:
    return st.session_state.checked.get(item_id, False)


# ─────────────────────────────────────────────────────────────────────────────
# DATA
# ─────────────────────────────────────────────────────────────────────────────
AREAS = {
    "things_betwixt": ("Things Betwixt", "1", [
        ("tb1","Rusted Coin (gap in wall, turn right)","item"),
        ("tb2","Talk to Milibeth & Old Firekeepers","npc"),
        ("tb3","Chest upstairs — Human Effigy","item"),
        ("tb4","Destroy cart outside — Soul of a Lost Undead + Torch","item"),
        ("tb5","Light bonfire","bonfire"),
        ("tb6","Hidden path below bridge — Small Smooth & Silky Stone","item"),
        ("tb7","Kill Ogre near bridge — Stone Ring","item"),
        ("tb8","Gold Pine Resin from corpse","item"),
        ("tb9","Tutorial: Dagger + Lifegem, drop Stone on bird nest","item"),
        ("tb10","Fog Gate 2: Amber Herbs (jump gap) + Cracked Red Eye Orb","item"),
        ("tb11","Push trees, kill 2 Ogres outside, sleep in Coffin (sex swap)","item"),
        ("tb12","Return to Milibeth — Handmaid's Ladle","npc"),
        ("tb13","Path to Majula: Morning Star, Cleric's Sacred Chime, Binoculars","item"),
    ]),
    "majula": ("Majula", "1–10", [
        ("mj1","Light bonfire, talk to Emerald Herald — get Estus Flask","bonfire"),
        ("mj2","Talk to Benhart of Jugo (path to Shaded Woods) — exhaust dialogue","npc"),
        ("mj3","Pick up Divine Blessing, Lifegems, Homeward Bones","item"),
        ("mj4","Building: kill Hollow, get Lloyd's Talismans","item"),
        ("mj5","Talk to Saulden → Welcome gesture, join Way of Blue","npc"),
        ("mj6","Hit rock at well — Estus Flask Shard ★","item"),
        ("mj7","Spiral stairs by pit — Crimson Parma (chest)","item"),
        ("mj8","Victor's Stone — Homeward Bones (Company of Champions here)","item"),
        ("mj9","Sweet Shalquoir shop — buy Silvercat Ring (13,400) & Ring of Whispers (5,800)","npc"),
        ("mj10","Talk to Maughlin the Armorer, buy gear","npc"),
        ("mj11","Ladder by Maughlin — Titanite Shard (chest)","item"),
        ("mj12","Path to FoFG: Rusted Coin, pull switch, Human Effigy, Homeward Bone","item"),
    ]),
    "forest_of_fallen_giants": ("Forest of Fallen Giants", "10–20", [
        ("fg1","Crestfallen's Retreat bonfire","bonfire"),
        ("fg2","River: Lifegem, Soul of a Lost Undead. Up ladders: jump gap → Shortsword","item"),
        ("fg3","Kill Heide Knight (sits by tree) — Heide Knight Sword","item"),
        ("fg4","Cardinal Tower bonfire","bonfire"),
        ("fg5","Talk to Merchant Hag Melentia — buy Lenigrast's Key (1000), Pharros Lockstone (4000)","npc"),
        ("fg6","Spend 10,000 with Melentia → Covetous Silver Serpent Ring +1. Exhaust → moves to Majula","npc"),
        ("fg7","Upstairs: break door → Small Leather Shield, Repair Powder, Hand Axe, Lifegem","item"),
        ("fg8","Ambush room chest — Estus Flask Shard + Small White Sign Soapstone ★","item"),
        ("fg9","Drop on branch: Divine Blessing. Scaffolding: Human Effigy","item"),
        ("fg10","Caves below: Hollow Soldier Helm, Soul of a Proud Knight","item"),
        ("fg11","Past Flame Salamander — Fire Longsword (chest) ★ great early weapon","key"),
        ("fg12","Return to Majula: upgrade Estus, open Lenigrast's shop, get Short Bow behind him","key"),
        ("fg13","Optional: Silvercat drop to salamander pit — Hawk Ring, Flame Quartz Ring +1","item"),
        ("fg14","Pursuer platform: bait firebomb hollow to break wall shortcut","item"),
        ("fg15","Early Pursuer fight (optional) — Ring of Blades, Soul of the Pursuer","boss"),
        ("fg16","Talk to Cale the Cartographer (cave) — get House Key for Majula mansion","npc"),
        ("fg17","BOSS: THE LAST GIANT — Summon: Pate (if trap done), Luet","boss"),
        ("fg18","Use Soldier Key: opens Pursuer door, Soldier's Rest, King's Gate","key"),
        ("fg19","BOSS: THE PURSUER (boss room) — bird nest after → Lost Bastille","boss"),
    ]),
    "heides_tower": ("Heide's Tower of Flame", "30–40", [
        ("ht1","Tower of Flame bonfire","bonfire"),
        ("ht2","Upper level: Human Effigy, Dark Torches, Soul of a Proud Knight, Old Knight Halberd","item"),
        ("ht3","Chest (Syan Knight guard) — Sublime Bone Dust ★","item"),
        ("ht4","Bottom of spiral: Monastery Charm","item"),
        ("ht5","BOSS: DRAGONRIDER — pull both levers for full platform","boss"),
        ("ht6","Talk to Licia of Lindeldt (after Dragonrider) — exhaust dialogue → moves to Majula rotunda","npc"),
        ("ht7","BOSS: OLD DRAGONSLAYER (Cathedral of Blue) — Old Leo Ring","boss"),
        ("ht8","Blue Sentinel Targray — need Token of Fidelity → join Blue Sentinels → Duel Bow gesture","npc"),
    ]),
    "no_mans_wharf": ("No-Man's Wharf", "35–45", [
        ("nm1","No-Man's Wharf bonfire","bonfire"),
        ("nm2","Pharros Lockstone: illuminates dark area","item"),
        ("nm3","Heavy Crossbow +3, Greatsword, Iron Arrows","item"),
        ("nm4","⚔ Talk to Lucatiel — IN A HOUSE LEFT OF FIRST STAIRS (SotFS moved!)","npc"),
        ("nm5","Pull bell lever on dock to call the ship","key"),
        ("nm6","BOSS: FLEXILE SENTRY — can summon Lucatiel (dock near ship)","boss"),
        ("nm7","Summon Lucatiel for Flexile Sentry (boss survival 1)","boss"),
        ("nm8","Ship takes you to Lost Bastille","key"),
    ]),
    "lost_bastille": ("The Lost Bastille", "55–65", [
        ("lb1","Tower Apart bonfire (from bird nest) / Exile Holding Cells (from ship)","bonfire"),
        ("lb2","Tower Apart: chests with Dull Ember ★ GIVE TO MCDUFF","key"),
        ("lb3","⚔ Talk to Lucatiel — tower ahead from McDuff's Workshop bonfire","npc"),
        ("lb4","Use Fragrant Branch on Straid of Olaphis (cell near Exile Holding) — boss soul trades","npc"),
        ("lb5","Exhaust Straid dialogue → Mock gesture","npc"),
        ("lb6","Estus Flask Shard — near Straid's area ★","item"),
        ("lb7","Give Dull Ember to McDuff → infusion blacksmith. Spend 14,000 → Titanite Slab","npc"),
        ("lb8","BOSS: RUIN SENTINELS (3) — fight first one on platform","boss"),
        ("lb9","Bastille Key (after Ruin Sentinels) — opens McDuff gate + other doors","key"),
        ("lb10","Belfry Luna — Pharros wall → Bell Keeper covenant (talk to dwarf)","key"),
        ("lb11","BOSS: BELFRY GARGOYLES (5) — Covetous Gold Serpent Ring +2 on roof after","boss"),
    ]),
    "huntsmans_copse": ("Huntsman's Copse", "55–65", [
        ("hc1","Pay Licia 2,000 souls at Majula rotunda to open path","key"),
        ("hc2","Undead Lockaway bonfire","bonfire"),
        ("hc3","Talk to Felkin the Outcast — hex merchant. 20 INT/FTH → Sunset Staff + Hexer's Set free","npc"),
        ("hc4","Free Creighton the Wanderer (Undead Lockaway Key) → Fist Pump gesture","npc"),
        ("hc5","Token of Fidelity + Pharros Lockstone (across bridge gap)","item"),
        ("hc6","Soul Spear sorcery (hut to the right)","item"),
        ("hc7","Estus Flask Shard — cave area ★","item"),
        ("hc8","BOSS: SKELETON LORDS — kill one at a time, clear adds","boss"),
        ("hc9","Undead Purgatory → BOSS: EXECUTIONER'S CHARIOT — hit lever to stop chariot","boss"),
        ("hc10","Brotherhood of Blood covenant (Titchy Gren, after Chariot)","npc"),
    ]),
    "harvest_valley": ("Harvest Valley", "60–70", [
        ("hv1","Harvest Valley bonfire","bonfire"),
        ("hv2","Fragrant Branch of Yore (cave with poison)","item"),
        ("hv3","Sublime Bone Dust — chest past poison pools ★","item"),
        ("hv4","Talk to Gavlan (poison building) — exhaust dialogue → moves later","npc"),
        ("hv5","Heirs of the Sun altar — across bridge, go left. Kneel → Praise the Sun gesture","key"),
        ("hv6","BOSS: COVETOUS DEMON — shoot pots to distract","boss"),
    ]),
    "earthen_peak": ("Earthen Peak", "65–75", [
        ("ep1","Lower Earthen Peak bonfire","bonfire"),
        ("ep2","⚔ Lucatiel — SotFS: go DOWN to poison water, follow passage RIGHT","npc"),
        ("ep3","Talk to Laddersmith Gilligan — pay 2,000 → Prostration gesture. Exhaust → moves to Majula","npc"),
        ("ep4","Mirrah Shield (chest above moving platform)","item"),
        ("ep5","🔥 BURN THE WINDMILL — Light torch → interact with windmill base. Drains ALL poison","warn"),
        ("ep6","Talk to Mild-Mannered Pate (if met before) — questline progress","npc"),
        ("ep7","BOSS: MYTHA, THE BANEFUL QUEEN — BURN WINDMILL FIRST. Summon: Jester Thomas","boss"),
        ("ep8","Estus Flask Shard — in the area ★","item"),
    ]),
    "iron_keep": ("Iron Keep / Belfry Sol", "80–90", [
        ("ik1","Threshold Bridge bonfire → Iron Keep proper","bonfire"),
        ("ik2","Covetous Gold Serpent Ring +1 (chest)","item"),
        ("ik3","Estus Flask Shard — platform jumps near lava ★","item"),
        ("ik4","Sublime Bone Dust — chest near lava ★","item"),
        ("ik5","Iron Key — opens doors in Forest of Fallen Giants","key"),
        ("ik6","Talk to Magerold of Lanafir — sells Branch, Lockstones, Warmth pyro","npc"),
        ("ik7","Optional: Summon Lucatiel for SMELTER DEMON (sign outside fog gate)","boss"),
        ("ik8","BOSS: SMELTER DEMON (optional) — very tough, fire damage","boss"),
        ("ik9","BOSS: OLD IRON KING — watch the lava hole! Lord Soul #2","boss"),
        ("ik10","Light Primal Bonfire","bonfire"),
        ("ik11","Belfry Sol — Pharros wall in Iron Keep. Bell Keeper area","key"),
    ]),
    "the_pit": ("The Pit / Grave of Saints", "45–55", [
        ("pt1","Majula Pit — buy ladder from Gilligan (12,000) or use Silvercat Ring","key"),
        ("pt2","Grave of Saints bonfire","bonfire"),
        ("pt3","Pharros Lockstones: reveal walls/traps throughout","item"),
        ("pt4","BOSS: ROYAL RAT VANGUARD — kill the mohawk rat","boss"),
        ("pt5","Talk to Rat King → join Rat King covenant","npc"),
    ]),
    "the_gutter": ("The Gutter", "65–75", [
        ("gt1","Upper Gutter bonfire","bonfire"),
        ("gt2","Light sconces as you go for navigation","item"),
        ("gt3","Fragrant Branch of Yore (on corpse)","item"),
        ("gt4","Dark Pyromancy Flame (hidden path)","item"),
        ("gt5","Navigate the wooden maze carefully → leads to Black Gulch","key"),
    ]),
    "black_gulch": ("Black Gulch", "65–75", [
        ("bg1","Black Gulch Mouth bonfire. BREAK POISON STATUES as you go","bonfire"),
        ("bg2","Fragrant Branch on corpse BEFORE entering — SAVE for hidden bonfire statue","item"),
        ("bg3","Scraps of Life hex (cave with worm enemies)","item"),
        ("bg4","⚔ Lucatiel — HIDDEN: from 1st bonfire go left, edge cliff, DROP DOWN near 3 poison statues","npc"),
        ("bg5","Hidden bonfire path: from fog gate hug LEFT wall → petrified statue (use Branch)","key"),
        ("bg6","Hidden Chamber bonfire + Lucatiel summon sign for The Rotten","bonfire"),
        ("bg7","Darkdiver Grandahl — cave on RIGHT ledge of Black Gulch","npc"),
        ("bg8","Optional: Summon Lucatiel for THE ROTTEN (easiest boss survival) ★","boss"),
        ("bg9","BOSS: THE ROTTEN — stay behind him, dodge AoE dark attack. Lord Soul","boss"),
        ("bg10","Light Primal Bonfire","bonfire"),
    ]),
    "shaded_woods": ("Shaded Woods", "80–90", [
        ("sw1","Use Fragrant Branch on Rosabeth of Melfia (petrified statue blocking path)","key"),
        ("sw2","Give Rosabeth clothing, exhaust dialogue → Joy gesture. Moves to Majula","npc"),
        ("sw3","Talk to Benhart again here — exhaust dialogue","npc"),
        ("sw4","Ruined Fork Road bonfire","bonfire"),
        ("sw5","Foggy area LEFT WALL → Head of Vengarl. Exhaust dialogue → Decapitate gesture","npc"),
        ("sw6","Equip Ring of Whispers → talk to Manscorpion Tark → Warmup gesture","npc"),
        ("sw7","BOSS: SCORPIONESS NAJKA — Tark can be summoned","boss"),
        ("sw8","Return to Tark after Najka (Ring of Whispers on) → Second Dragon Ring + Branch","npc"),
        ("sw9","Estus Flask Shard — in the ruins area ★","item"),
        ("sw10","Use Branch on Lion Warrior for Fang Key access","item"),
    ]),
    "doors_of_pharros": ("Doors of Pharros", "80–90", [
        ("dp1","Doors of Pharros bonfire","bonfire"),
        ("dp2","Save Pharros Lockstones — most contraptions here are traps/minor","item"),
        ("dp3","Twisted Barricade hex (corpse)","item"),
        ("dp4","Santier's Spear (chest), Gyrm Greatshield","item"),
        ("dp5","Gavlan — final location (moved from Harvest Valley)","npc"),
        ("dp6","Darkdiver Grandahl — hidden cave in the area","npc"),
        ("dp7","BOSS: ROYAL RAT AUTHORITY — KILL SMALL RATS FIRST (toxic!)","boss"),
        ("dp8","After both rat bosses → Shalquoir sells Flying Feline Boots","item"),
    ]),
    "brightstone_cove": ("Brightstone Cove Tseldora", "90–100", [
        ("bc1","Royal Army Campsite bonfire","bonfire"),
        ("bc2","Estus Flask Shard — before spider area ★","item"),
        ("bc3","Sublime Bone Dust (chest) ★","item"),
        ("bc4","Cromwell the Pardoner — after Prowling Magus. Pardons sins for souls","npc"),
        ("bc5","Summon Benhart for PROWLING MAGUS — sign near campsite bonfire. MUST SURVIVE","boss"),
        ("bc6","BOSS: PROWLING MAGUS AND CONGREGATION — easy, kill mages first","boss"),
        ("bc7","Pate & Creighton confrontation: find them fighting → help one kill the other","npc"),
        ("bc8","BOSS: THE DUKE'S DEAR FREJA — 2 heads, damage heads only. Lord Soul","boss"),
        ("bc9","Light Primal Bonfire","bonfire"),
        ("bc10","Brightstone Key → Lord's Private Chamber: Great Lightning Spear, Fire Tempest","key"),
        ("bc11","Kill Vengarl's Body → return to Head in Shaded Woods → gear + War Cry gesture","item"),
    ]),
    "sinners_rise": ("Sinner's Rise", "95–105", [
        ("sr1","Sinner's Rise bonfire","bonfire"),
        ("sr2","Sublime Bone Dust — in water area ★","item"),
        ("sr3","🔥 Light oil trails BOTH SIDES of fog gate with torch → enables lock-on in boss room","warn"),
        ("sr4","Summon Lucatiel (bottom of elevator) for Lost Sinner — good survival fight","boss"),
        ("sr5","BOSS: THE LOST SINNER — aggressive, parry effective. Lord Soul","boss"),
        ("sr6","Light Primal Bonfire","bonfire"),
    ]),
    "drangleic_castle": ("Drangleic Castle", "95–105", [
        ("dc1","Shrine of Winter → need 4 Lord Souls (or high Soul Memory)","key"),
        ("dc2","Kill enemies near golem doors to power them open","key"),
        ("dc3","King's Gate bonfire","bonfire"),
        ("dc4","Chancellor Wellager — exhaust dialogue → This One's Me gesture","npc"),
        ("dc5","Darkdiver Grandahl — DROP THROUGH fragile floor in Ruin Sentinel room → hidden cave","npc"),
        ("dc6","Join Pilgrims of Dark covenant now — enter Dark Chasms at all 3 Grandahl locations","key"),
        ("dc7","Estus Flask Shard — in the castle ★","item"),
        ("dc8","BOSS: TWIN DRAGONRIDERS — kill archer first","boss"),
        ("dc9","Benhart of Jugo — after Twin Dragonriders. Exhaust dialogue","npc"),
        ("dc10","BOSS: LOOKING GLASS KNIGHT — summons phantoms from mirror","boss"),
        ("dc11","Key to King's Passage","key"),
    ]),
    "shrine_of_amana": ("Shrine of Amana", "95–105", [
        ("sa1","Crumbled Ruins bonfire. USE A BOW to snipe priestesses","bonfire"),
        ("sa2","Estus Flask Shard — in the water area ★","item"),
        ("sa3","Sunlight Blade miracle (chest past hidden path)","item"),
        ("sa4","Havel's Set (chest in cave)","item"),
        ("sa5","Talk to Milfanito (singing woman) — Smooth & Silky Stone","npc"),
        ("sa6","BOSS: DEMON OF SONG — attack when face exposed","boss"),
    ]),
    "undead_crypt": ("Undead Crypt", "100–110", [
        ("uc1","Undead Ditch bonfire","bonfire"),
        ("uc2","💀 DO NOT LIGHT TORCHES OR RING BELLS — spawns enemies, PERMANENTLY aggros Agdayne","warn"),
        ("uc3","Talk to Grave Warden Agdayne WITHOUT torch → Have Mercy! gesture + hex vendor","npc"),
        ("uc4","Avelyn crossbow, Olenford's Staff","item"),
        ("uc5","BOSS: VELSTADT, THE ROYAL AEGIS — 2nd phase dark buff","boss"),
        ("uc6","Enter Vendrick's chamber — pick up King's Ring","key"),
        ("uc7","Vendrick walks around hollow — need Giant Souls to fight him later","npc"),
        ("uc8","Return to Agdayne with King's Ring → Darkdrift katana + Agdayne's Set","npc"),
    ]),
    "aldias_keep": ("Aldia's Keep", "100–110", [
        ("ak1","Use King's Ring on King's Gate in Shaded Woods to access","key"),
        ("ak2","Foregarden bonfire","bonfire"),
        ("ak3","Estus Flask Shard — in the area ★","item"),
        ("ak4","Soul Vessel (chest)","item"),
        ("ak5","⚠ LUCATIEL — small hut on LEFT exterior. ONLY after 3+ boss survivals!","npc"),
        ("ak6","Talk to Aldia at bonfire (affects ending)","npc"),
        ("ak7","Navlaan — talk while HOLLOW for assassination quests. Do NOT pull lever while human","npc"),
        ("ak8","BOSS: GUARDIAN DRAGON — ranged helps. Leads to Dragon Aerie","boss"),
    ]),
    "dragon_aerie": ("Dragon Aerie / Dragon Shrine", "105–115", [
        ("da1","Dragon Aerie bonfire. Crystal Lizards EVERYWHERE — kill all for upgrade mats","bonfire"),
        ("da2","Petrified Dragon Bones, Twinkling Titanite throughout","item"),
        ("da3","💡 Dragon Knights WON'T attack unless you attack first (SotFS) — just walk through","warn"),
        ("da4","Talk to Emerald Herald at entrance → Aged Feather (infinite Homeward Bone)","npc"),
        ("da5","Pick up Petrified Egg → give to Magerold (Iron Keep) → Dragon Remnants covenant","key"),
        ("da6","Talk to Ancient Dragon → Ashen Mist Heart (DON'T fight him yet)","npc"),
        ("da7","Estus Flask Shard — chest ★","item"),
        ("da8","Optional: BOSS: ANCIENT DRAGON — huge HP, one-shot fire. Drops Soul of a Giant","boss"),
    ]),
    "memories": ("Memories (Orro/Vammar/Jeigh)", "110–120", [
        ("mm1","Need Ashen Mist Heart to enter Giant Memories","key"),
        ("mm2","Memory of Vammar — Captain Drummond → Hurrah! gesture","npc"),
        ("mm3","Memory of Vammar: Soul of a Giant","item"),
        ("mm4","Memory of Orro: Soul of a Giant. Benhart summon available","item"),
        ("mm5","Memory of Jeigh: BOSS: GIANT LORD — great for soul farming","boss"),
        ("mm6","Summon Benhart for Giant Lord — MUST SURVIVE. Do NOT summon Drummond too","boss"),
        ("mm7","Giant Lord drops: Giant Lord Soul + Soul of a Giant","item"),
    ]),
    "dark_chasm": ("Dark Chasm of Old", "95–105", [
        ("ch1","Enter at each of Grandahl's 3 locations — costs 1 Human Effigy each","key"),
        ("ch2","Chasm 1: Black Gulch — light sconce at end, kill all enemies","key"),
        ("ch3","Chasm 2: Shaded Woods — light sconce at end (easiest chasm)","key"),
        ("ch4","Chasm 3: Drangleic Castle — light sconce at end","key"),
        ("ch5","BOSS: DARKLURKER — appears after 3rd chasm. Weak to FIRE","boss"),
        ("ch6","Talk to Grandahl after → Resonant Soul, Great Resonant Soul, Climax + Xanthous Set","npc"),
    ]),
    "throne_of_want": ("Throne of Want (Endgame)", "110–120", [
        ("tw1","BOSS: THRONE WATCHER & DEFENDER — kill close together or they revive","boss"),
        ("tw2","Summon Benhart — sign right of fog gate. MUST SURVIVE (questline!)","boss"),
        ("tw3","BOSS: NASHANDRA — final boss. Bring curse-curing items","boss"),
        ("tw4","BOSS: ALDIA (if all dialogue exhausted) — alternate ending available","boss"),
        ("tw5","Ending: Sit on Throne (Link Fire) OR Walk Away (SotFS ending with Aldia)","key"),
    ]),
    "dlc_sunken": ("DLC 1: Crown of the Sunken King", "DLC", [
        ("d11","Access via Primal Bonfire in Black Gulch → Shulva","key"),
        ("d12","Sanctum Walk bonfire","bonfire"),
        ("d13","Eternal Sanctum Key, Dragon Stone","key"),
        ("d14","Focus Souls sorcery, Promised Walk of Peace hex","item"),
        ("d15","Lightning Clutch Ring","item"),
        ("d16","BOSS: ELANA, THE SQUALID QUEEN — summons Velstadt phantom","boss"),
        ("d17","BOSS: SINH, THE SLUMBERING DRAGON — destroys weapon durability, bring backups","boss"),
        ("d18","Optional BOSS: GRAVEROBBER, VARG & CERAH — 3-NPC gank, extremely hard","boss"),
    ]),
    "dlc_iron": ("DLC 2: Crown of the Old Iron King", "DLC", [
        ("d21","Access via Primal Bonfire in Iron Keep → Brume Tower","key"),
        ("d22","Throne Floor bonfire","bonfire"),
        ("d23","Collect ALL Smelter Wedges (11) — destroy Ashen Idols","key"),
        ("d24","Outcry pyromancy (from Nadalia Soul fragments), Dance of Fire pyro","item"),
        ("d25","BOSS: FUME KNIGHT — one of the hardest in all Souls. Destroy nearby Idols first","boss"),
        ("d26","Optional BOSS: SIR ALONNE — Memory of Old Iron King. Very fast samurai","boss"),
        ("d27","Optional BOSS: BLUE SMELTER DEMON — Iron Passage. Magic damage version","boss"),
    ]),
    "dlc_ivory": ("DLC 3: Crown of the Ivory King", "DLC", [
        ("d31","Access via Shrine of Winter → Frozen Eleum Loyce","key"),
        ("d32","Outer Wall bonfire","bonfire"),
        ("d33","Get Eye of the Priestess — makes invisible enemies visible","key"),
        ("d34","★ Find ALL 4 Loyce Knights before Ivory King boss — they close portals in arena","warn"),
        ("d35","Loyce Knight 1: near first bonfire","item"),
        ("d36","Loyce Knight 2: main castle area","item"),
        ("d37","Loyce Knight 3: lower area past elevator","item"),
        ("d38","Loyce Knight 4: requires area progression","item"),
        ("d39","BOSS: AAVA, THE KING'S PET — get Eye of Priestess first or she's invisible","boss"),
        ("d310","BOSS: BURNT IVORY KING — Loyce Knights close portals, epic fight","boss"),
        ("d311","Optional: Lucatiel summon in Grand Cathedral (if Aldia's Keep dialogue done)","boss"),
        ("d312","Optional BOSS: LUD & ZALLEN — Frigid Outskirts. The run IS the boss","boss"),
        ("d313","Soul Flash sorcery, Blizzard sorcery","item"),
    ]),
}

AREA_ORDER = [
    "things_betwixt","majula","forest_of_fallen_giants","heides_tower","no_mans_wharf",
    "lost_bastille","huntsmans_copse","harvest_valley","earthen_peak","iron_keep",
    "the_pit","the_gutter","black_gulch","shaded_woods","doors_of_pharros",
    "brightstone_cove","sinners_rise","drangleic_castle","shrine_of_amana","undead_crypt",
    "aldias_keep","dragon_aerie","memories","dark_chasm","throne_of_want",
    "dlc_sunken","dlc_iron","dlc_ivory",
]

LUCATIEL_TALKS   = ["nm4","lb3","ep2","bg4","ak5"]
LUCATIEL_BOSSES  = ["nm7","sr4","ik7","bg8","d311"]
BENHART_TALKS    = ["mj2","sw3","dc9"]
BENHART_BOSSES   = ["bc5","mm6","tw2"]
GRANDAHL_LOCS    = ["bg7","dp6","dc5"]

GESTURES = [
    ("Welcome",       "Saulden",                 "Majula",                   "mj5"),
    ("Joy",           "Rosabeth",                "Shaded Woods (unpetrify)", "sw2"),
    ("Duel Bow",      "Blue Sentinel Targray",   "Cathedral of Blue",        "ht8"),
    ("Mock",          "Straid of Olaphis",       "Lost Bastille",            "lb5"),
    ("Fist Pump",     "Creighton",               "Huntsman's Copse",         "hc4"),
    ("Praise the Sun","Sun altar",               "Harvest Valley",           "hv5"),
    ("Prostration",   "Laddersmith Gilligan",    "Earthen Peak",             "ep3"),
    ("Decapitate",    "Head of Vengarl",         "Shaded Woods foggy area",  "sw5"),
    ("Warmup",        "Manscorpion Tark",        "Shaded Woods",             "sw6"),
    ("This One's Me", "Chancellor Wellager",     "Drangleic Castle",         "dc4"),
    ("Have Mercy!",   "Grave Warden Agdayne",    "Undead Crypt (NO TORCH!)", "uc3"),
    ("Hurrah!",       "Captain Drummond",        "Memory of Vammar",         "mm2"),
    ("War Cry",       "Vengarl's Head",          "After killing body",       "bc11"),
    ("Righty-ho!",    "Mild-Mannered Pate",      "Earthen Peak",             "ep6"),
]
DEFAULT_GESTURES = 4  # Point, Pump Up, Wave, No Way — always have these

COVENANTS = [
    ("Way of Blue",         "Saulden, Majula",           "Kill 10 invaders = max",           "mj5"),
    ("Blue Sentinels",      "Targray, Cathedral of Blue","Token of Fidelity to join",         "ht8"),
    ("Brotherhood of Blood","Titchy Gren, Undead Purgatory","PvP covenant",                  "hc10"),
    ("Heirs of the Sun",    "Altar, Harvest Valley",     "30 Sunlight Medals",               "hv5"),
    ("Bell Keepers",        "Dwarf, Belfry Luna",        "Kill 30 invaders",                 "lb10"),
    ("Rat King",            "Rat King, Grave of Saints", "Pull players into your world",     "pt5"),
    ("Company of Champions","Victor's Stone, Majula",    "Harder difficulty",                "mj8"),
    ("Pilgrims of Dark",    "Grandahl (3 locations)",    "Dark Chasm access → Darklurker",   "dc5"),
    ("Dragon Remnants",     "Magerold, Iron Keep",       "Give Petrified Egg",               "da5"),
]

# Estus / Bone Dust IDs in order
ESTUS_IDS  = ["mj6","fg8","hc7","ep8","ik3","lb6","sw9","bc2","dc7","sa2","ak3","da7"]
BONE_DUST_IDS = ["ht3","hv3","ik4","bc3","sr2"]

TYPE_ICON = {
    "boss":   "💀",
    "npc":    "👤",
    "bonfire":"🔥",
    "key":    "🗝",
    "warn":   "⚠️",
    "item":   "•",
}

# ─────────────────────────────────────────────────────────────────────────────
# COMPUTED STATS
# ─────────────────────────────────────────────────────────────────────────────
def compute_stats():
    c = st.session_state.checked
    all_ids = [i[0] for ak in AREA_ORDER for i in AREAS[ak][2]]
    total = len(all_ids)
    done  = sum(1 for i in all_ids if c.get(i))

    luc_talks  = sum(1 for i in LUCATIEL_TALKS  if c.get(i))
    luc_bosses = sum(1 for i in LUCATIEL_BOSSES if c.get(i))
    ben_talks  = sum(1 for i in BENHART_TALKS   if c.get(i))
    ben_bosses = sum(1 for i in BENHART_BOSSES  if c.get(i))
    gran_locs  = sum(1 for i in GRANDAHL_LOCS   if c.get(i))

    gestures   = DEFAULT_GESTURES + sum(1 for g in GESTURES if c.get(g[3]))
    covenants  = sum(1 for cv in COVENANTS if c.get(cv[3]))
    estus      = sum(1 for i in ESTUS_IDS    if c.get(i))
    bone_dust  = sum(1 for i in BONE_DUST_IDS if c.get(i))

    return {
        "total": total, "done": done, "pct": int(done / total * 100) if total else 0,
        "luc_talks": luc_talks, "luc_bosses": luc_bosses,
        "ben_talks": ben_talks, "ben_bosses": ben_bosses,
        "gran_locs": gran_locs,
        "gestures": gestures, "covenants": covenants,
        "estus": estus, "bone_dust": bone_dust,
    }

def area_pct(ak):
    items = AREAS[ak][2]
    done = sum(1 for i in items if st.session_state.checked.get(i[0]))
    return done, len(items)


# ─────────────────────────────────────────────────────────────────────────────
# UI HELPERS
# ─────────────────────────────────────────────────────────────────────────────
def render_item(item):
    iid, text, itype = item[0], item[1], item[2]
    done = is_done(iid)

    icon = TYPE_ICON.get(itype, "•")
    label = f"{icon} ~~{text}~~" if done and itype != "warn" else f"{icon} {text}"

    if itype == "warn":
        st.markdown(f'<div class="warn-box">{text}</div>', unsafe_allow_html=True)
    else:
        checked_val = st.checkbox(label, value=done, key=f"cb_{iid}")
        if checked_val != done:
            toggle(iid)
            st.rerun()

def section_header(title, subtitle=""):
    sub = f" <span style='color:#8a7e6d;font-size:11px;font-family:Georgia'>{subtitle}</span>" if subtitle else ""
    st.markdown(f"<h3 style='margin-bottom:2px'>{title}{sub}</h3>", unsafe_allow_html=True)


# ─────────────────────────────────────────────────────────────────────────────
# MAIN APP
# ─────────────────────────────────────────────────────────────────────────────
stats = compute_stats()

st.markdown("<h1 style='text-align:center;letter-spacing:3px;font-size:28px'>⚔ DARK SOULS II: SotFS — 100% Tracker</h1>", unsafe_allow_html=True)
st.markdown(f"<p style='text-align:center;color:#8a7e6d;font-size:12px;margin-top:-12px'>Progress auto-saved to <code style='color:#c8a030'>{os.path.abspath(SAVE_FILE)}</code></p>", unsafe_allow_html=True)

tab1, tab2, tab3, tab4 = st.tabs(["📊 Overview", "🗺 Areas", "⚔ Questlines", "🎭 Trackers"])

# ══════════════════════════════════════════════════════════════════════════════
# TAB 1: OVERVIEW
# ══════════════════════════════════════════════════════════════════════════════
with tab1:
    st.markdown(f"<h2 style='text-align:center;font-size:48px;margin:0'>{stats['pct']}%</h2>", unsafe_allow_html=True)
    st.markdown(f"<p style='text-align:center;color:#8a7e6d'>{stats['done']} / {stats['total']} tasks completed</p>", unsafe_allow_html=True)
    st.progress(stats["done"] / stats["total"] if stats["total"] else 0)

    st.divider()

    col1, col2, col3, col4 = st.columns(4)
    with col1: st.metric("🔥 Estus Shards",    f"{stats['estus']} / 12")
    with col2: st.metric("💀 Bone Dust",        f"{stats['bone_dust']} / 5")
    with col3: st.metric("🎭 Gestures",         f"{stats['gestures']} / 20")
    with col4: st.metric("⚔ Covenants Found",  f"{stats['covenants']} / 9")

    st.divider()
    st.markdown("<h3>NPC Questlines</h3>", unsafe_allow_html=True)

    luc_ok = stats["luc_bosses"] >= 3 and stats["luc_talks"] == 5
    ben_ok = stats["ben_bosses"] >= 3 and stats["ben_talks"] == 3
    gran_ok = stats["gran_locs"] == 3

    col_a, col_b, col_c = st.columns(3)
    with col_a:
        pct_l = int((stats["luc_talks"] + min(stats["luc_bosses"],3)) / 8 * 100)
        st.markdown(f"**⚔ Lucatiel** {'✅' if luc_ok else ''}")
        st.progress(pct_l / 100)
        st.caption(f"Talks: {stats['luc_talks']}/5 | Boss survivals: {stats['luc_bosses']}/3")
    with col_b:
        pct_b = int((stats["ben_talks"] + min(stats["ben_bosses"],3)) / 6 * 100)
        st.markdown(f"**🗡 Benhart** {'✅' if ben_ok else ''}")
        st.progress(pct_b / 100)
        st.caption(f"Talks: {stats['ben_talks']}/3 | Boss survivals: {stats['ben_bosses']}/3")
    with col_c:
        pct_g = int(stats["gran_locs"] / 3 * 100)
        st.markdown(f"**🌑 Grandahl** {'✅' if gran_ok else ''}")
        st.progress(pct_g / 100)
        st.caption(f"Locations visited: {stats['gran_locs']}/3")

    st.divider()
    st.markdown("<h3>Area Progress</h3>", unsafe_allow_html=True)
    for ak in AREA_ORDER:
        name, lvl, _ = AREAS[ak]
        d, t = area_pct(ak)
        pct = int(d / t * 100) if t else 0
        prefix = "✅ " if pct == 100 else ""
        col_name, col_pct, col_bar = st.columns([3, 0.7, 2])
        col_name.markdown(f"<span style='color:{'#6b9e3a' if pct==100 else '#e8dcc8'};font-size:13px'>{prefix}{name}</span>", unsafe_allow_html=True)
        col_pct.markdown(f"<span style='color:#8a7e6d;font-size:12px'>{pct}%</span>", unsafe_allow_html=True)
        col_bar.progress(pct / 100)

    st.divider()
    if st.button("☠ Reset All Progress", type="secondary"):
        if st.session_state.get("confirm_reset"):
            st.session_state.checked = {}
            save_progress({})
            st.session_state.confirm_reset = False
            st.success("Progress reset.")
            st.rerun()
        else:
            st.session_state.confirm_reset = True
            st.warning("Click Reset again to confirm. This cannot be undone!")

# ══════════════════════════════════════════════════════════════════════════════
# TAB 2: AREAS
# ══════════════════════════════════════════════════════════════════════════════
with tab2:
    area_names = {ak: AREAS[ak][0] for ak in AREA_ORDER}
    selected_ak = st.selectbox(
        "Select Area",
        options=AREA_ORDER,
        format_func=lambda ak: f"{area_names[ak]} ({AREAS[ak][1]}) — {area_pct(ak)[0]}/{area_pct(ak)[1]}",
    )

    name, lvl, items = AREAS[selected_ak]
    d, t = area_pct(selected_ak)
    pct = int(d / t * 100) if t else 0

    section_header(name, f"Lvl {lvl}")
    st.progress(pct / 100)
    st.caption(f"{d} / {t} completed ({pct}%)")

    # Lucatiel warning in Aldia's Keep
    if selected_ak == "aldias_keep":
        luc_sur = sum(1 for i in LUCATIEL_BOSSES if st.session_state.checked.get(i))
        if luc_sur < 3:
            st.markdown(f'<div class="warn-box">🚫 LUCATIEL WARNING: She has only survived {luc_sur}/3 boss fights. DO NOT talk to her here yet or her questline FAILS permanently!</div>', unsafe_allow_html=True)
        else:
            st.markdown(f'<div class="ok-box">✅ Lucatiel has survived {luc_sur}/3 boss fights — safe to talk to her here for her reward!</div>', unsafe_allow_html=True)

    st.divider()
    for item in items:
        render_item(item)


# ══════════════════════════════════════════════════════════════════════════════
# TAB 3: QUESTLINES
# ══════════════════════════════════════════════════════════════════════════════
with tab3:
    q_tab1, q_tab2, q_tab3, q_tab4, q_tab5 = st.tabs(["⚔ Lucatiel","🗡 Benhart","🌑 Grandahl","🍺 Gavlan","⚖ Pate & Creighton"])

    # ── Lucatiel ──────────────────────────────────────────────────────────────
    with q_tab1:
        st.markdown("### ⚔ Lucatiel of Mirrah")
        st.markdown('<div class="info-box">🏆 <b>Achievement:</b> Lucatiel of Mirrah<br>🎁 <b>Reward:</b> Lucatiel\'s Set + Mirrah Greatsword<br>⚠ Must visit ALL 4 locations AND she must survive 3 boss fights — in ONE playthrough. Don\'t talk to her at Aldia\'s Keep until 3 survivals are done!</div>', unsafe_allow_html=True)

        luc_sur = sum(1 for i in LUCATIEL_BOSSES if st.session_state.checked.get(i))
        if luc_sur >= 3:
            st.markdown('<div class="ok-box">✅ 3+ boss survivals done! Safe to complete questline.</div>', unsafe_allow_html=True)
        else:
            st.markdown(f'<div class="warn-box">⚠ Only {luc_sur}/3 boss survivals. Complete more before going to Aldia\'s Keep!</div>', unsafe_allow_html=True)

        st.markdown("**Dialogue Locations** (must visit all 4 before Aldia's Keep):")
        talks = [
            ("nm4","No-Man's Wharf — house LEFT of first stairs (SotFS moved!)"),
            ("lb3","Lost Bastille — tower ahead from McDuff's Workshop bonfire"),
            ("ep2","Earthen Peak — go DOWN to poison water, follow passage RIGHT"),
            ("bg4","Black Gulch — cliff edge LEFT of 1st bonfire, DROP DOWN near 3 poison statues"),
            ("ak5","Aldia's Keep — small hut on LEFT exterior ⚠ ONLY after 3 survivals!"),
        ]
        for iid, desc in talks:
            done = is_done(iid)
            v = st.checkbox(f"{'~~' if done else ''}{desc}{'~~' if done else ''}", value=done, key=f"lucq_{iid}")
            if v != done:
                toggle(iid)
                st.rerun()

        st.markdown("**Boss Survivals** (need 3 — The Rotten is easiest ★):")
        bosses = [
            ("nm7","Flexile Sentry (No-Man's Wharf)"),
            ("sr4","Lost Sinner (Sinner's Rise)"),
            ("ik7","Smelter Demon (Iron Keep) — risky"),
            ("bg8","The Rotten (Black Gulch) — easiest ★"),
            ("d311","Burnt Ivory King (DLC3)"),
        ]
        for iid, desc in bosses:
            done = is_done(iid)
            v = st.checkbox(f"💀 {'~~' if done else ''}{desc}{'~~' if done else ''}", value=done, key=f"lucb_{iid}")
            if v != done:
                toggle(iid)
                st.rerun()

    # ── Benhart ──────────────────────────────────────────────────────────────
    with q_tab2:
        st.markdown("### 🗡 Benhart of Jugo")
        st.markdown('<div class="info-box">🏆 <b>Achievement:</b> Benhart of Jugo<br>🎁 <b>Reward:</b> Benhart\'s Set + Moonlight Greatsword<br>⚠ Exhaust ALL dialogue at every location. Must survive 3+ boss fights.</div>', unsafe_allow_html=True)
        st.markdown("**Dialogue Locations:**")
        talks_b = [
            ("mj2","Majula — path toward Shaded Woods"),
            ("sw3","Shaded Woods — near the fork road"),
            ("dc9","Drangleic Castle — after Twin Dragonriders"),
        ]
        for iid, desc in talks_b:
            done = is_done(iid)
            v = st.checkbox(f"{'~~' if done else ''}{desc}{'~~' if done else ''}", value=done, key=f"benq_{iid}")
            if v != done:
                toggle(iid)
                st.rerun()

        st.markdown("**Boss Survivals** (need 3):")
        bosses_b = [
            ("bc5","Prowling Magus (Brightstone Cove) — easiest ★"),
            ("mm6","Giant Lord (Memory of Jeigh) — Do NOT summon Drummond too"),
            ("tw2","Throne Watcher & Defender (Endgame)"),
        ]
        for iid, desc in bosses_b:
            done = is_done(iid)
            v = st.checkbox(f"💀 {'~~' if done else ''}{desc}{'~~' if done else ''}", value=done, key=f"benb_{iid}")
            if v != done:
                toggle(iid)
                st.rerun()

    # ── Grandahl ──────────────────────────────────────────────────────────────
    with q_tab3:
        st.markdown("### 🌑 Darkdiver Grandahl")
        st.markdown('<div class="info-box">🏆 <b>Achievement:</b> Pilgrims of Dark Covenant<br>🎁 <b>Reward:</b> Climax hex, Xanthous Set, Resonant Soul chain<br>Visit all 3 locations → join covenant → complete all 3 Dark Chasms → fight Darklurker (weak to FIRE).</div>', unsafe_allow_html=True)
        locs_g = [
            ("bg7","Black Gulch — cave on RIGHT ledge of the gulch"),
            ("dp6","Doors of Pharros — hidden cave in the area"),
            ("dc5","Drangleic Castle — DROP THROUGH fragile floor in Ruin Sentinel room"),
        ]
        for iid, desc in locs_g:
            done = is_done(iid)
            v = st.checkbox(f"{'~~' if done else ''}{desc}{'~~' if done else ''}", value=done, key=f"gran_{iid}")
            if v != done:
                toggle(iid)
                st.rerun()

        st.markdown("**Dark Chasms (1 Human Effigy each):**")
        for iid, desc in [("ch2","Chasm 1: Black Gulch"),("ch3","Chasm 2: Shaded Woods (easiest)"),("ch4","Chasm 3: Drangleic Castle"),("ch5","BOSS: Darklurker — use fire!")]:
            done = is_done(iid)
            v = st.checkbox(f"{'💀 ' if iid=='ch5' else ''}{'~~' if done else ''}{desc}{'~~' if done else ''}", value=done, key=f"chasm_{iid}")
            if v != done:
                toggle(iid)
                st.rerun()

    # ── Gavlan ──────────────────────────────────────────────────────────────
    with q_tab4:
        st.markdown("### 🍺 Gavlan")
        st.markdown('<div class="info-box">🎁 <b>Reward:</b> Permanent buy/sell vendor at Doors of Pharros<br>Exhaust dialogue at each location to make him move. "Gavlan wheel, Gavlan deal!"</div>', unsafe_allow_html=True)
        for iid, desc in [("nm1","No-Man's Wharf — in a building (also his default location)"),("hv4","Harvest Valley — building in poison area"),("dp5","Doors of Pharros — FINAL location (permanent)")]:
            done = is_done(iid)
            v = st.checkbox(f"{'~~' if done else ''}{desc}{'~~' if done else ''}", value=done, key=f"gav_{iid}")
            if v != done:
                toggle(iid)
                st.rerun()

    # ── Pate & Creighton ──────────────────────────────────────────────────────
    with q_tab5:
        st.markdown("### ⚖ Pate & Creighton")
        st.markdown('<div class="info-box">🎁 <b>Reward:</b> Winner\'s gear + Crushed Eye Orb (invade Licia)<br>Meet both NPCs, progress encounters, choose a side at Tseldora.</div>', unsafe_allow_html=True)
        steps_pc = [
            ("fg16","Talk to Pate in FoFG (before gate trap), go through trap, talk again (get White Sign Soapstone from Pate)"),
            ("hc4","Free Creighton from Huntsman's Copse cell (Undead Lockaway Key) → Fist Pump gesture"),
            ("ep6","Talk to Pate in Earthen Peak"),
            ("bc7","Brightstone Cove Tseldora: find Pate & Creighton fighting → help one kill the other"),
        ]
        for iid, desc in steps_pc:
            done = is_done(iid)
            v = st.checkbox(f"{'~~' if done else ''}{desc}{'~~' if done else ''}", value=done, key=f"pc_{iid}")
            if v != done:
                toggle(iid)
                st.rerun()


# ══════════════════════════════════════════════════════════════════════════════
# TAB 4: TRACKERS
# ══════════════════════════════════════════════════════════════════════════════
with tab4:
    t_col1, t_col2 = st.columns(2)

    # ── Estus Shards ──────────────────────────────────────────────────────────
    with t_col1:
        st.markdown(f"### 🔥 Estus Flask Shards ({stats['estus']}/12)")
        st.progress(stats["estus"] / 12)
        estus_data = [
            ("mj6",  "Majula — hit rock at the well"),
            ("fg8",  "FoFG — ambush room chest"),
            ("hc7",  "Huntsman's Copse — cave area"),
            ("ep8",  "Earthen Peak — in the area"),
            ("ik3",  "Iron Keep — platform jumps near lava"),
            ("lb6",  "Lost Bastille — near Straid's area"),
            ("sw9",  "Shaded Woods — ruins area"),
            ("bc2",  "Brightstone Cove — before spider area"),
            ("dc7",  "Drangleic Castle — in the castle"),
            ("sa2",  "Shrine of Amana — water area"),
            ("ak3",  "Aldia's Keep — in the area"),
            ("da7",  "Dragon Aerie — chest"),
        ]
        for iid, desc in estus_data:
            done = is_done(iid)
            v = st.checkbox(f"🔥 {'~~' if done else ''}{desc}{'~~' if done else ''}", value=done, key=f"es_{iid}")
            if v != done:
                toggle(iid)
                st.rerun()

    # ── Sublime Bone Dust ──────────────────────────────────────────────────────
    with t_col2:
        st.markdown(f"### 💀 Sublime Bone Dust ({stats['bone_dust']}/5)")
        st.progress(stats["bone_dust"] / 5)
        st.caption("Burns at bonfire → increases Estus healing permanently")
        bone_data = [
            ("ht3","Heide's Tower — chest guarded by Syan Knight"),
            ("hv3","Harvest Valley — chest past poison pools"),
            ("ik4","Iron Keep — chest near lava"),
            ("bc3","Brightstone Cove — chest"),
            ("sr2","Sinner's Rise — water area"),
        ]
        for iid, desc in bone_data:
            done = is_done(iid)
            v = st.checkbox(f"💀 {'~~' if done else ''}{desc}{'~~' if done else ''}", value=done, key=f"bd_{iid}")
            if v != done:
                toggle(iid)
                st.rerun()

    st.divider()
    g_col, cv_col = st.columns(2)

    # ── Gestures ──────────────────────────────────────────────────────────────
    with g_col:
        earned = DEFAULT_GESTURES + sum(1 for g in GESTURES if is_done(g[3]))
        st.markdown(f"### 🎭 Gestures ({earned}/20)")
        st.progress(earned / 20)
        st.caption("Point, Pump Up, Wave, No Way — you start with these 4")
        for name_g, src, loc, ref in GESTURES:
            done = is_done(ref)
            v = st.checkbox(f"{'~~' if done else ''}{name_g} — {src} ({loc}){'~~' if done else ''}", value=done, key=f"gest_{ref}")
            if v != done:
                toggle(ref)
                st.rerun()

    # ── Covenants ──────────────────────────────────────────────────────────────
    with cv_col:
        st.markdown(f"### ⚔ Covenants ({stats['covenants']}/9)")
        st.progress(stats["covenants"] / 9)
        for cv_name, cv_loc, cv_note, cv_ref in COVENANTS:
            done = is_done(cv_ref)
            v = st.checkbox(f"{'~~' if done else ''}{cv_name} — {cv_loc}{'~~' if done else ''}", value=done, key=f"cv_{cv_ref}")
            if v != done:
                toggle(cv_ref)
                st.rerun()
            if not done:
                st.caption(f"  ↳ {cv_note}")
