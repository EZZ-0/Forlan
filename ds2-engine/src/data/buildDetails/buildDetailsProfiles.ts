import type { BuildDetailsProfile } from "./types";

export const BUILD_DETAILS_PROFILES: Record<string, BuildDetailsProfile> = {
  "dark-melee-hexer": {
    philosophy:
      "You are a dark-buffed katana user with access to all four magic schools for tactical swaps — not a pure caster. Dark Uchigatana + Dark Weapon is your identity; spells cover resistances and range.",
    playstyle:
      "Buff with Dark Weapon, pressure with katana combos, and swap elements (Lightning Mace, Fire Longsword, magic staff) when bosses resist dark. Use Dark Orb for safe damage, not as your only plan.",
    weaponsSummary:
      "Dark Uchigatana (primary), Sunset Staff, Lightning Mace, Fire Longsword, Staff of Wisdom for magic-weak targets.",
    pros: [
      "Five damage types from one stat spread (dark, lightning, fire, magic, physical)",
      "Excellent agility via high ATN + moderate ADP",
      "Dark Weapon + katana moveset = strong sustained DPS",
      "Flexible spell toolkit for resist checks",
    ],
    cons: [
      "Spread stats mean slower peak power in any one element",
      "Dark-resistant bosses require gear/spell swaps",
      "High investment in INT, FTH, ATN, and melee stats",
      "Multiple weapons to upgrade and maintain",
    ],
    proDamage: ["Dark", "Lightning", "Fire", "Magic", "Strike"],
    conDamage: ["Dark"],
    notes: [
      "Agility: AGI = ((ATN + 3×ADP) / 4) + 80. ATN 43 + ADP 13 → 100 AGI (11 i-frames, fastest Estus).",
    ],
  },
  "inferno-reaper": {
    philosophy:
      "STR-focused pyro hybrid: power-stance Red Rust for fast dual-wield fire, Black Knight Greatsword for heavy hits, and pyromancy nukes (Forbidden Sun, Flame Swathe) with Flame Weapon on everything.",
    playstyle:
      "Open with Flame Weapon, use Red Rust power stance for trash and fast bosses, swap to BKGS for stagger/poise breaks, and save Forbidden Sun / Flame Swathe for burst windows.",
    weaponsSummary:
      "Red Rust Sword + Scimitar (fire power stance), Black Knight Greatsword +5, Alonne Greatbow, Pyromancy Flame +10.",
    pros: [
      "Huge burst damage with pyromancy and fire-infused melee",
      "Power stance covers speed; BKGS covers reach and stagger",
      "Forbidden Sun at ATN 43 gives two casts",
      "Strong throughout NG with early Red Rust access",
    ],
    cons: [
      "High STR/DEX/ATN spread — long road to completion",
      "Fire-resistant bosses (Smelter, Old Iron King) are painful",
      "Stamina-hungry power stance and greatsword swings",
      "Black Knight Greatsword is a rare farm drop",
    ],
    proDamage: ["Fire", "Strike", "Physical"],
    conDamage: ["Fire"],
  },
  "the-destroyer": {
    philosophy:
      "Pure STR strike tank: great hammers break poise and delete health bars. Heavy armor, high VIT/END, and unga-bunga aggression — block when you must, smash when you can.",
    playstyle:
      "Two-hand Great Club, trade hits when poise allows, use Stone Ring to break enemy poise, and face-tank with high VGR/VIT. Craftsman's Hammer for faster enemies.",
    weaponsSummary:
      "Great Club +10 (primary), Large Club (early), Craftsman's Hammer (fast strike), Tower Shield.",
    pros: [
      "Top-tier strike damage vs many bosses",
      "Excellent poise break with Stone Ring + hammers",
      "Simple stat line — mostly STR, VGR, END, VIT",
      "Very forgiving melee loop once online",
    ],
    cons: [
      "Slow swings — punished by fast bosses (Alonne, Sir Alonne)",
      "Strike-resistant enemies (Chariot, Rotten, Covetous Demon)",
      "Heavy equip load without ring investment",
      "Minimal ranged or spell options",
    ],
    proDamage: ["Strike", "Physical"],
    conDamage: ["Strike"],
  },
  "dark-cleric": {
    philosophy:
      "Faith-primary dark cleric: mace melee backed by dark miracles and hexes. Chime of Want endgame; Felkin hexes mid-game. Hybrid holy/dark fantasy with strike damage on the side.",
    playstyle:
      "Buff with Dark Weapon, poke with mace, cast Dark Orb and miracles at range. Use Heavenly Thunder for groups; heal with Great Heal between fights.",
    weaponsSummary:
      "Mace (lightning/dark), Archdrake Chime → Chime of Want, Pyromancy Flame backup.",
    pros: [
      "Strong dark damage with miracle support",
      "Mace strike damage vs armored knights",
      "Good sustain with healing miracles",
      "Chime of Want is best-in-slot dark catalyst",
    ],
    cons: [
      "Split INT/FTH for hexes and miracles",
      "Dark-resistant bosses need lightning swap",
      "Lower DEX — limited weapon variety",
      "Cast speed needs ring investment",
    ],
    proDamage: ["Dark", "Lightning", "Strike"],
    conDamage: ["Dark"],
  },
  "lord-of-lightning": {
    philosophy:
      "Faith knight paladin: Defender Greatsword self-buff, Sunlight Blade, and lightning miracles. Medium armor, high FTH, and lightning-infused melee.",
    playstyle:
      "Apply Sunlight Blade, use Defender GS 2H strong for self-buff when needed, mix Lightning Spear/GLS at range, and strafe in medium armor.",
    weaponsSummary:
      "Defender Greatsword +5, Heide Knight Sword, Dragon Chime, Lindelt Priest Chime.",
    pros: [
      "Excellent lightning damage scaling at 50 FTH",
      "Defender GS unique self-buff strong attack",
      "Strong against many armored bosses weak to lightning",
      "Good healing and buff toolkit",
    ],
    cons: [
      "Lightning-resistant enemies (Covetous Demon, Freja, Fume Knight)",
      "Defender GS locked behind Throne Defender",
      "Sunlight Blade hidden in Shrine of Amana",
      "Less strike coverage than hammer builds",
    ],
    proDamage: ["Lightning", "Strike"],
    conDamage: ["Lightning"],
  },
  "moonlight-battlemage": {
    philosophy:
      "INT/FTH hybrid battlemage: Moonlight Greatsword beams plus sorceries, with dark hex backup. Balanced caster-melee — magic primary, dark for resist checks.",
    playstyle:
      "MLGS 2H beams for bosses weak to magic; sorceries at range; Dark Orb when magic fails. Crystal Soul Spear for nukes after Freja.",
    weaponsSummary:
      "Moonlight Greatsword +5, Staff of Wisdom, Blue Flame backup.",
    pros: [
      "MLGS beams scale with INT — huge boss damage",
      "Sorcery + dark hex coverage",
      "No spell stat dump on STR/DEX beyond MLGS req",
      "Soul Greatsword for melee AoE",
    ],
    cons: [
      "Magic-resistant bosses (Najka, many DLC foes)",
      "Two boss souls from Freja route planning",
      "Split INT/FTH delays peak dark",
      "Lower VGR than pure melee builds",
    ],
    proDamage: ["Magic", "Dark"],
    conDamage: ["Magic"],
  },
  "pure-int-mlgs": {
    philosophy:
      "Pure INT glass cannon: Moonlight Greatsword melee and Crystal Soul Spear nukes. No FTH — maximize magic damage and spell slots.",
    playstyle:
      "Snipe with Crystal Soul Spear, follow with Homing Crystal Soulmass, MLGS beam on stagger. Stay at range vs dangerous bosses.",
    weaponsSummary:
      "Moonlight Greatsword +5, Staff of Wisdom +5, Witchtree Branch for fast casts.",
    pros: [
      "Highest magic damage in the roster",
      "Crystal Soul Spear one-shots many bosses",
      "ATN 50 for maximum casts and slots",
      "Lion Mage set boosts cast speed",
    ],
    cons: [
      "Fragile — low VGR/VIT",
      "Magic-resistant enemies are hard stops",
      "Limited melee when FP/spells dry up",
      "No miracles or pyromancy fallback",
    ],
    proDamage: ["Magic"],
    conDamage: ["Magic"],
  },
  "lacerating-blood": {
    philosophy:
      "Bleed proc specialist: Bandit's Knife speed, Notched Whip reach, Crest of Blood + Shadow Gauntlets. Stack bleed, proc for burst damage.",
    playstyle:
      "Rapid attacks to build bleed meter; power stance whips for bosses; riposte with Shadow Dagger. Infuse backup weapons with bleed.",
    weaponsSummary:
      "Bandit's Knife, Notched Whip (×2 power stance), Shadow Dagger, bleed-infused backups.",
    pros: [
      "Melts bleed-weak bosses (Vendrick, Demon of Song, Freja)",
      "Very fast attack speed with Bandit's Knife",
      "Crest of Blood + Shadow Gauntlets stack bleed hard",
      "High DEX scaling and agility",
    ],
    cons: [
      "Bleed-immune or resistant bosses (Lost Sinner, Velstadt, Sir Alonne)",
      "Lower raw AR than heavy weapons",
      "Requires stat investment in DEX and ADP",
      "Notched Whip easy to miss in Huntsman's Copse",
    ],
    proDamage: ["Bleed", "Slash"],
    conDamage: ["Bleed"],
  },
  "oro-blacksteel": {
    philosophy:
      "Pure DEX katana duelist: Blacksteel Katana quickdraw strong, S-scaling, Old Leo counter damage. Fast, precise, high agility.",
    playstyle:
      "Strafe and poke with katana; use quickdraw cancel (2H roll R1 R2); parry when confident. Power stance for aggressive bosses.",
    weaponsSummary:
      "Blacksteel Katana +10 (×2 optional), Uchigatana backup, Short Bow.",
    pros: [
      "Top DEX scaling and counter damage with Old Leo",
      "Unique quickdraw strong attack",
      "Excellent i-frames with high ADP",
      "Strong vs slash-weak and lightning-weak knights",
    ],
    cons: [
      "Blacksteel is a rare Iron Keep farm",
      "Slash-resistant armor (Mytha, Alonne)",
      "Low poise — mistakes are punished",
      "No elemental fallback without respec",
    ],
    proDamage: ["Slash", "Physical"],
    conDamage: ["Slash"],
  },
  "dark-chaos-assassin": {
    philosophy:
      "Chaos Blade assassin: massive physical DEX damage with Dark Weapon buff. High risk — Chaos Blade drains your HP per hit. 20/20 INT/FTH for hex access.",
    playstyle:
      "Dark Weapon buff always active; rush bosses with Chaos Blade combos; stock lifegems. Dark Orb for safe damage at range.",
    weaponsSummary:
      "Chaos Blade +5, Sunset Staff for Dark Weapon, Caitha's Chime backup.",
    pros: [
      "Among the highest single-target melee DPS in the game",
      "Dark Weapon adds dark damage on top of Chaos Blade",
      "Flexile Sentry soul unlocks Chaos Blade early",
      "Strong vs dark-weak and slash-weak targets",
    ],
    cons: [
      "50 HP self-damage per Chaos Blade hit",
      "Dark-resistant bosses hurt badly",
      "Requires 20/20 INT/FTH for Dark Weapon",
      "No shield — pure aggression",
    ],
    proDamage: ["Dark", "Slash", "Physical"],
    conDamage: ["Dark"],
  },
  "flame-prince": {
    philosophy:
      "Pyromancy prince: fire-infused weapons and pyro nukes. Explorer start for ADP. Forbidden Sun and Flame Swathe with ATN 43.",
    playstyle:
      "Flame Weapon buff melee; Forbidden Sun for burst; Great Chaos Fireball for AoE zones. Fire Longsword early, Fire BK Halberd late.",
    weaponsSummary:
      "Fire Longsword, Fire Black Knight Halberd, Pyromancy Flame +10.",
    pros: [
      "Strong AoE and burst pyromancy",
      "Fire infusion available early (Fire Longsword)",
      "Penal Handcuffs boost pyro damage",
      "Explorer ADP helps survivability",
    ],
    cons: [
      "Fire-resistant bosses are common (Smelter, Iron King, Guardian Dragon)",
      "ATN investment for spell casts",
      "Limited strike damage vs heavy armor",
      "Navlaan / Forbidden Sun easy to miss",
    ],
    proDamage: ["Fire"],
    conDamage: ["Fire"],
  },
  "quality-dark": {
    philosophy:
      "40/40 STR/DEX quality with dark infusion swaps. Versatile physical scaling plus Dark Weapon for dark-weak bosses. Sun Sword or dark longsword.",
    playstyle:
      "Run uninfused vs general enemies; swap dark-infused weapons vs dark-weak bosses. Dark Weapon buff for burst phases.",
    weaponsSummary:
      "Dark Longsword, Dark Sun Sword, Dark Mace (strike), Sunset Staff.",
    pros: [
      "Huge weapon variety at 40/40",
      "Dark infusion handles split-resist bosses",
      "Strong physical DPS when uninfused",
      "Tankier than pure caster builds",
    ],
    cons: [
      "Dark infusion removes STR/DEX scaling on that weapon",
      "20/20 INT/FTH tax for Dark Weapon",
      "Dark-resistant DLC bosses need physical mode",
      "Multiple weapons to upgrade",
    ],
    proDamage: ["Dark", "Physical", "Strike"],
    conDamage: ["Dark"],
  },
  "master-dex": {
    philosophy:
      "Master of DEX: rapiers, katanas, bows. Rapier counters, Ricard's R2 spam, Hunter's Blackbow. Old Leo Ring mandatory.",
    playstyle:
      "Rapier for counter-thrust loops; Ricard's for DPS; bow for pull safety. High END for stamina in long combos.",
    weaponsSummary:
      "Rapier, Ricard's Rapier, Blacksteel Katana, Hunter's Blackbow, Uchigatana.",
    pros: [
      "Best counter damage with Old Leo + rapier",
      "Extremely fast attacks and high agility",
      "Ranged option with Hunter's Blackbow",
      "Strong vs thrust-weak and bleed-weak foes",
    ],
    cons: [
      "Low poise and HP",
      "Thrust/slash-resistant enemies (skeletons, stone armor)",
      "Many weapons to farm and upgrade",
      "No magic fallback",
    ],
    proDamage: ["Thrust", "Slash", "Physical"],
    conDamage: ["Thrust", "Slash"],
  },
  "tank-executioner": {
    philosophy:
      "Ultra greatsword tank: Greatsword from FoFG/Wharf, heavy armor, face-tank with VGR 40. Poise through hits, trade damage confidently.",
    playstyle:
      "Two-hand Greatsword, block with Tower Shield when needed, use Ring of Giants for poise. Craftsman's Hammer for strike-weak armored foes.",
    weaponsSummary:
      "Greatsword +10, Tower Shield, Craftsman's Hammer.",
    pros: [
      "Massive HP and poise — forgiving mistakes",
      "Greatsword wide swings clear groups",
      "Strong physical damage with Ring of Blades",
      "Royal Soldier Ring +2 for heavy armor",
    ],
    cons: [
      "Slow attack speed — whiff punishable",
      "No elemental damage without infusion",
      "Stamina management on whiffs",
      "Magic/dark bosses need pure physical patience",
    ],
    proDamage: ["Physical", "Slash"],
    conDamage: [],
  },
  "ninja-warrior": {
    philosophy:
      "Dual katana ninja: Shadow Set aesthetic, power stance Uchigatana or Blacksteel, extreme DEX/ADP. Hit-and-run aggression.",
    playstyle:
      "Power stance katana flurries; use Shadow Set light weight; bow for pulls. High ADP for i-frames.",
    weaponsSummary:
      "Uchigatana ×2 power stance, Blacksteel alt, Shadow Dagger, Hunter's Blackbow.",
    pros: [
      "Fastest melee cadence in the guide",
      "Shadow Set looks great and stays light",
      "Excellent agility and stamina with Chloranthy",
      "Strong vs slash-weak humanoids",
    ],
    cons: [
      "Low poise — must dodge, not trade",
      "Two katanas to upgrade",
      "Flexile Sentry for full Shadow Set",
      "Armored knights resist slash",
    ],
    proDamage: ["Slash", "Physical"],
    conDamage: ["Slash"],
  },
  "polearm-paladin": {
    philosophy:
      "Faith polearm paladin: Heide Lance reach, lightning miracles, Sunlight Blade. Thrust counters with Old Leo Ring.",
    playstyle:
      "Buff with Sunlight Blade, poke with Heide Lance R2s, Lightning Spear at range. Halberd swap for narrow corridors.",
    weaponsSummary:
      "Heide Lance, Halberd, Old Knight Halberd (early), Dragon Chime.",
    pros: [
      "Excellent reach and thrust counter damage",
      "Lightning strong vs many armored bosses",
      "Faith heals and buffs",
      "Old Leo boosts thrust counters",
    ],
    cons: [
      "Heide Lance farm/drop RNG",
      "Tight corridors hurt halberd moveset",
      "Lightning-resistant enemies",
      "Higher STR req than pure DEX",
    ],
    proDamage: ["Lightning", "Thrust", "Strike"],
    conDamage: ["Lightning"],
  },
  "belmont-family": {
    philosophy:
      "Castlevania whip build: Old Whip or Notched Whip, throwing knives, firebombs, holy water. Reach and consumable pressure.",
    playstyle:
      "Whip poke from safety; throw knives and bombs for chip; Stone Ring for poise break. Notched Whip for bleed variant.",
    weaponsSummary:
      "Old Whip, Notched Whip, standard Whip, throwing knives, firebombs, holy water urns.",
    pros: [
      "Unique playstyle with whip reach",
      "Consumables handle resistant foes",
      "Stone Ring helps vs shield enemies",
      "Bleed whip option with Crest of Blood",
    ],
    cons: [
      "Old Whip rare and fragile (low durability)",
      "Lower DPS than standard melee builds",
      "Must stock consumables constantly",
      "Few elemental weaknesses exploited",
    ],
    proDamage: ["Slash", "Bleed", "Fire"],
    conDamage: [],
  },
  "chime-hammer-hexer": {
    philosophy:
      "Mace of the Insolent chime-hammer: cast hexes from the mace strong attack, strike with normal attacks. Archdrake Chime and dark hexes.",
    playstyle:
      "R1 bonk, R2 cast Dark Orb/Resonant Soul; Dark Weapon buff for melee phases. Belfry Luna for Mace of the Insolent.",
    weaponsSummary:
      "Mace of the Insolent, Archdrake Chime, Sunset Staff, Mace (early).",
    pros: [
      "Melee and hexes without weapon swap",
      "Strong dark damage at 30/30 INT/FTH",
      "Strike damage on mace swings",
      "Heavenly Thunder from mace chime",
    ],
    cons: [
      "Mace of the Insolent is covenant/invader gated",
      "Dark-resistant bosses need patience",
      "Split stats between STR and casting",
      "Slower than pure caster at range",
    ],
    proDamage: ["Dark", "Strike", "Lightning"],
    conDamage: ["Dark"],
  },
  "blue-flame-mage": {
    philosophy:
      "Blue Flame sword-catalyst: cast sorceries from the sword strong attack. INT 50 focus, Crystal Magic Weapon self-buff.",
    playstyle:
      "R1 melee, R2 cast Soul Spear; buff with Crystal Magic Weapon; Staff of Wisdom for heavy nukes.",
    weaponsSummary:
      "Blue Flame +5, Staff of Wisdom, Short Sword (early).",
    pros: [
      "One weapon slot for melee + casting",
      "High magic damage at 50 INT",
      "Crystal Magic Weapon boosts sword casts",
      "Flexible sorcery loadout",
    ],
    cons: [
      "Blue Flame farm in Undead Crypt",
      "Magic-resistant enemies",
      "Lower melee AR than dedicated swords",
      "No pyro/miracle fallback",
    ],
    proDamage: ["Magic"],
    conDamage: ["Magic"],
  },
  "pyro-warrior": {
    philosophy:
      "STR melee with pyromancy support: fire-infused Great Club, Flame Weapon, Warmth heal. Warrior start, 10/10 INT/FTH for pyro.",
    playstyle:
      "Two-hand fire Great Club; Flame Weapon buff; Warmth between fights; Flame Swathe boss nukes.",
    weaponsSummary:
      "Fire Great Club +10, Fire Bastard Sword, Pyromancy Flame.",
    pros: [
      "Tanky STR build with self-heal (Warmth)",
      "Fire infusion + pyro double-dip on weak foes",
      "Great Club stagger and damage",
      "Simpler than full pyro caster",
    ],
    cons: [
      "Fire-resistant bosses are rough",
      "Warmth requires Rat King covenant or Gren",
      "Slower than DEX builds",
      "Limited spell slots vs pure pyro",
    ],
    proDamage: ["Fire", "Strike", "Physical"],
    conDamage: ["Fire"],
  },
  "dark-red-mage": {
    philosophy:
      "Triple-threat caster: hexes, pyromancy, and dark-infused katana. 30/30 INT/FTH for maximum element coverage in one build.",
    playstyle:
      "Dark Uchigatana + Dark Weapon for melee; Dark Orb and pyro for range; swap spells per boss resist.",
    weaponsSummary:
      "Dark Uchigatana, Sunset Staff, Pyromancy Flame, Caitha's Chime.",
    pros: [
      "Fire, dark, and physical options in one loadout",
      "Dark Orb + Flame Swathe cover most bosses",
      "Katana moveset for agile melee",
      "ATN 43 for many spell slots",
    ],
    cons: [
      "Jack-of-all-trades — slower power spikes",
      "Many stats and spells to manage",
      "Dark + fire both resisted by some DLC bosses",
      "Multiple catalysts/weapons to upgrade",
    ],
    proDamage: ["Dark", "Fire", "Magic"],
    conDamage: ["Dark", "Fire"],
  },
};

export function getBuildDetailsProfile(buildId: string): BuildDetailsProfile | undefined {
  return BUILD_DETAILS_PROFILES[buildId];
}
