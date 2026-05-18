# DS2 SotFS — Research Evidence for Areas Notes Expansion

**Sources**: [Fextralife Dark Souls 2 Wiki](https://darksouls2.wiki.fextralife.com/), fetched 2025-03-02  
**Purpose**: Evidence supporting the Areas tab notes expansion (bonfires, ascetics, illusory walls, gestures, crystal lizards, Pharros).

---

## 1. Bonfire Ascetic — Boss → Bonfire Mapping (Fextralife)

Each boss is respawned by burning an ascetic at a specific bonfire. This maps to **bonfire notes** and **ascetic value**.

| Boss | Bonfire to Burn Ascetic At |
|------|----------------------------|
| The Last Giant | Forest of Fallen Giants — **Cardinal Tower** |
| Pursuer | Forest of Fallen Giants — **Cardinal Tower** |
| Giant Lord | Forest of Fallen Giants — **The Place Unbeknownst** |
| Dragonrider | Heide's Tower — Heide's Ruin |
| Old Dragonslayer | Cathedral of Blue — The Blue Cathedral |
| Flexile Sentry | No-Man's Wharf — Unseen Path to Heide |
| Ruin Sentinels | Lost Bastille — **McDuff's Workshop** |
| Lost Sinner | Sinners' Rise — The Saltfort |
| Belfry Gargoyles | Belfry Luna — Upper Ramparts |
| Executioner's Chariot | Undead Purgatory — Undead Purgatory (Bonfire) |
| The Skeleton Lords | Huntsman's Copse — **Undead Lockaway** |
| Covetous Demon | Harvest Valley — The Mines |
| Mytha, the Baneful Queen | Earthen Peak — **Upper Earthen Peak** |
| Looking Glass Knight | Drangleic Castle — Central Castle Drangleic |
| Smelter Demon | Iron Keep — **Threshold Bridge** |
| Old Iron King | Iron Keep — Eygil's Idol |
| Scorpioness Najka | Shaded Woods — Shaded Ruins |
| Royal Rat Vanguard | Grave of Saints — Grave Entrance |
| Royal Rat Authority | Doors of Pharros — Ordeal's End |
| Prowling Magus | Brightstone Cove — **Royal Army Campsite** |
| Duke's Dear Freja | Brightstone Cove — Lower Brightstone Cove |
| The Rotten | Black Gulch — **Hidden Chamber** |
| Throne Defender & Watcher | Drangleic Castle — King's Gate |
| Nashandra | Drangleic Castle — King's Gate |
| Darklurker | Drangleic Castle — Under Drangleic Castle |
| Twin Dragonriders | Drangleic Castle — Forgotten Chamber |
| Demon of Song | Shrine of Amana — Rhoy's Resting Place |
| Velstadt | Undead Crypt — **Undead Ditch** |
| Vendrick | Undead Crypt — Undead Ditch |
| Guardian Dragon | Aldia's Keep — Ritual Site |
| Ancient Dragon | Dragon Shrine — Shrine Entrance |
| Graverobber, Varg, Cerah | Shulva — Priestess' Chamber |
| Elana | Dragon's Sanctum — Sanctum Interior |
| Sinh | Dragon's Rest — Sanctum Nadir |
| Sir Alonne | Brume Tower — Smelter Throne |
| Blue Smelter Demon | Iron Passage — Iron Hallway Entrance |
| Fume Knight | Brume Tower — Lowermost Floor |
| Aava | Frozen Eleum Loyce — Outer Wall |
| Lud & Zallen | Frozen Eleum Loyce — Expulsion Chamber (Frigid Outskirts) |
| Burnt Ivory King | Grand Cathedral — Grand Cathedral |

---

## 2. Bonfire Ascetic — Valuable Rewards (Community + Wiki)

**Rings (NG+ / ascetic exclusive)**:
- **Skeleton Lords** (Undead Lockaway) → Clear Bluestone Ring +2 (faster casting)
- **Scorpioness Najka** (Shaded Ruins) → Southern Ritual Band +2 (3 extra spell slots)
- **Belfry Gargoyles** (Belfry Luna) → Covetous Gold Serpent Ring +2 (item discovery)
- **Mytha** (Upper Earthen Peak) → Covetous Silver Serpent Ring +2 (+30% souls)
- **Executioner's Chariot** (Undead Purgatory) → Chloranthy Ring +2 (stamina)
- **Velstadt** (Undead Ditch) → Royal Soldier's Ring +2 (equip load)
- **Looking Glass Knight** (Central Castle) → Ring of Steel Protection +2
- **Dual Pursuers** (post-Nashandra King's Gate) → Ring of Blades +2

**Other valuable uses**:
- **Majula** (2–3 ascetics) → Moonlight Butterfly Set from Maughlin (15k spent)
- **Shaded Woods / Shaded Ruins** (2nd bonfire, 1 ascetic) → Gower's Ring of Protection
- **Duke's Dear Freja** → Crystal Soul Spear (NG+ exclusive spell)
- **Giant Lord** (Place Unbeknownst) → ~300k souls/run, ascetic inside memory = infinite farm

**Ascetic farming** (Fextralife):
- Aldia's Keep Foregarden: Unpetrify hollow next to Basilisk; ascetic respawns him for 2 ascetics each time (SotFS).
- Memory of Jeigh: Ascetic respawns near entrance — self-sustaining with Giant Lord.
- Dragon's Sanctum (Tower of Prayer): Bonfire ascetic respawns wooden chest ( Sanctum Soldiers) — SotFS replaces ascetic with Dried Root.

---

## 3. Illusory Walls — Fextralife vs Project `ds2Database.ts`

**Mechanic** (Fextralife): Press A (Xbox) / X (PS) / Shift+Left Click (PC). **Striking does NOT open them** (unlike DS1).

| Area | Fextralife Location | Project `ILLUSORY_WALLS` | Match |
|------|---------------------|--------------------------|-------|
| Forest of Fallen Giants | Cardinal Tower — long stairway, right at bottom | ✓ ill_fg_stairway | ✓ |
| Forest of Fallen Giants | Pursuer ledge — breakable (kegs) | `BREAKABLE_WALLS` | ✓ |
| No-Man's Wharf | House shortcut — 2 walls | ✓ ill_nm_house1, ill_nm_house2 | ✓ |
| Lost Bastille | Ruin Sentinels room — 6 walls | ✓ 6 entries | ✓ |
| Lost Bastille | Antiquated Key area | ✓ ill_lb_antiquated | ✓ |
| Lost Bastille | Servants' Quarters | ✓ ill_lb_servants | ✓ |
| Sinner's Rise | Basement elevator, first alcove right | ✓ ill_sr_basement | ✓ |
| Huntsman's Copse | Bridge Approach cave — corner opposite chest, open on way OUT | ✓ ill_hc_cave | ✓ |
| Earthen Peak | Behind 3 poison jars; above boss left/right | ✓ 3 entries | ✓ |
| Iron Keep | Flaming bull room right wall; Belfry Sol return | ✓ 2 entries | ✓ |
| Brightstone Cove | Prowling Magus room, left of entrance | ✓ ill_bc_magus | ✓ |
| Drangleic Castle | Tower kneeling knights, ladder down, right corner | ✓ ill_dc_tower | ✓ |
| Undead Crypt | Stairs Leydia Witch; gray stripe hallway | ✓ 2 entries | ✓ |
| Aldia's Keep | Acid staircase; Ogre door (breakable) | ✓ + BREAKABLE | ✓ |
| Memory of Orro | Second floor, Pharros contraption | ✓ ill_mem_orro | ✓ |
| Shulva (DLC) | Dragon's Sanctum, after Black Drakeblood | ✓ ill_shulva_sanctum | ✓ |
| Brume Tower (DLC) | Snowy ledge after 2nd Idol; Foyer elevator (mash A) | ✓ 2 entries | ✓ |

**Conclusion**: Project `ds2Database.ts` aligns with Fextralife. Harvest Valley "board walls" are breakable (Dark Giant), not illusory — correct in `BREAKABLE_WALLS`.

---

## 4. Crystal Lizards — Fextralife vs Project

| Area | Fextralife | Project `CRYSTAL_LIZARDS` | Match |
|------|------------|----------------------------|-------|
| Forest of Fallen Giants | Room near elevator to Last Giant — 2 Titanite Shard | ✓ Room near elevator | ✓ |
| No-Man's Wharf | Behind poison jar hidden door — 2 Shard, 1 Large | ✓ breakable wall room | ✓ |
| Iron Keep | Near magma bucket traps, small staircase | ✓ | ✓ |
| Doors of Pharros | After axe-hurling Gyrm past Gavlan | ✓ | ✓ |
| Huntsman's Copse | Cliff path to Skeleton Lords, left branch; cave illusory | ✓ 2 entries | ✓ |
| Harvest Valley | After 4 Artificial Undead, boarded path to poison pit | ✓ | ✓ |
| Grave of Saints | Rope bridge to treasure chest | ✓ | ✓ |
| Shaded Woods | Ruins near Manscorpion Tark | ✓ | ✓ |
| Brightstone Cove | Pate/Creighton balcony; pillar below Magus chapel | ✓ 2 entries | ✓ |
| Drangleic Castle | Before long staircase to castle | ✓ | ✓ |
| Dragon Aerie | 11 lizards throughout drake encounters | ✓ | ✓ |
| Dragon's Sanctum (DLC) | Room with Drakeblood Knight, moving circles | Not in project | **Gap** |

**Strategy** (Fextralife): Lizards flee in ~6 sec. If they escape, rest at bonfire to respawn. If killed but you die before pickup, drops are lost. Use magic/bow to one-shot.

---

## 5. Pharros Lockstone — Key Uses (Fextralife)

| Area | Location | Effect | Project `PHARROS_KEY_USES` |
|------|----------|--------|----------------------------|
| Forest of Fallen Giants | Room under ballista (near Pate) | Titanite Slab, Chloranthy Ring | ✓ ph_fg_ballista |
| No-Man's Wharf | Second level, front of house | Light, scares Darkdwellers | ✓ ph_nm_light |
| Lost Bastille | Twinblade room | Soul Vessel | ✓ |
| Lost Bastille | Servants' Quarters, down ladder | Belfry Luna passage | ✓ ph_lb_belfry |
| Earthen Peak | Bottom poison room | Poisonbite Ring | ✓ ph_ep_poisonbite |
| Earthen Peak | Mushroom pool | Becomes healing after windmill | ✓ ph_ep_mushroom |
| Iron Keep | Various | Water pool, Belfry Sol + bonfire | ✓ ph_ik |
| Grave of Saints | Bridges | Poison Moss, Whisper of Despair, Torch | ✓ ph_tp_bridges |
| Shrine of Amana | Crumbled Ruins, water near ramp | Helix Halberd cave | ✓ ph_amana_helix |
| Undead Crypt | Behind illusory (double-shield hole) | Great Lightning Spear, Olenford's Staff | ✓ ph_uc_spells |
| Aldia's Keep | Long hall | Light | ✓ ph_aldia_light |
| Dragon Shrine | Under boxes, first knight | Judgement Set, Staff | ✓ ph_aerie_judgement |
| Memory of Orro | Second floor | Steel Set, Fire Seed (skip trap) | ✓ ph_mem_orro |
| Frozen Eleum Loyce | Bridge ballistas | Durgo's Hat | ✓ ph_dlc_durgo |
| Doors of Pharros | Multiple (10–20) | Most traps; Santier's Spear (1 lockstone) | `DOORS_OF_PHARROS_CONTRAPTIONS` |

---

## 6. Gestures — Fextralife vs Project `gestures.ts`

| Gesture | Fextralife Source/Location | Project `ref` |
|---------|----------------------------|---------------|
| Welcome | Saulden, Majula — exhaust dialogue | mj5 ✓ |
| Joy | Rosabeth — after unpetrify, give clothes | sw2 ✓ |
| Duel Bow | Blue Sentinel Targray, Cathedral of Blue — Token of Fidelity | ht8 ✓ |
| Mock | Straid, Lost Bastille — unpetrify, exhaust | lb5 ✓ |
| Fist Pump | Creighton, Huntsman's Copse — free from cell | hc4 ✓ |
| Praise the Sun | Sun altar, Harvest Valley — kneel | hv5 ✓ |
| Prostration | Laddersmith Gilligan, Earthen Peak — pay 2000 | ep3 ✓ |
| Decapitate | Head of Vengarl, Shaded Woods foggy (left wall) | sw5 ✓ |
| Warmup | Manscorpion Tark, Shaded Woods — Ring of Whispers, after Najka | sw6 ✓ |
| This One's Me | Chancellor Wellager, Drangleic Castle entrance | dc4 ✓ |
| Have Mercy! | Grave Warden Agdayne, Undead Crypt — NO TORCH | uc3 ✓ |
| Hurrah! | Captain Drummond, Memory of Vammar | mm2 ✓ |
| War Cry | Vengarl's Head — return after killing Body | bc11 ✓ |
| Righty-ho! | Pate — after trap events | ep6 ✓ |
| Truce | Cromwell the Pardoner, Brightstone Cove | null |
| Desperate | Die repeatedly hollow / exhaust NPCs | null |

**Note**: Fextralife lists "Joy" from Benhart after unpetrifying Rosabeth; project correctly has Joy from Rosabeth (give clothes). Fextralife may have a different ordering.

---

## 7. Soul Farming — Project vs Fextralife

| Run | Project `SOUL_FARM_RUNS` | Fextralife / Wiki |
|-----|--------------------------|-------------------|
| Cardinal Tower hollows | ✓ 2000/run, CoC | Matches — despawn after 12 |
| Heide's Old Knights | ✓ 4500/run | 3 Old Knights ~1.5k each |
| Exile Holding | ✓ 3500/run | Firebomb hollows |
| Huntsman's Bridge | ✓ 4000/run | Bridge hollows + necromancers |
| Iron Keep Alonne | ✓ 6000/run, best mid-game | First bridge knights |
| Black Gulch giants | ✓ 10000/run, 2 Dark Giants | ~5k each, very fast |
| Brightstone spiders | ✓ 5000/run | Spider hollows |
| Giant Lord ascetic | ✓ 300k/run, self-sustaining | Ascetic in memory; ~400k with gear |

**Fextralife extras**: Dragon's Sanctum — Yearn to lure, farm materials (Twinkling, PDB, etc.) with Tower of Prayer ascetic.

---

## 8. Bonfire Ascetic Locations (Pickups)

Fextralife lists where ascetics can be **found** (not necessarily where to burn):

- Aldia's Keep — iron chest (2)
- Undead Crypt — Leydia Witch platform (1)
- Shrine of Amana — past Rise of the Dead (1)
- Drangleic Castle — after Looking Glass Knight (3)
- Iron Keep — skeleton, first bonfire, halfway across bridge right (1; 3 in SotFS)
- Brightstone Cove — corpse after Prowling Magus church ladder (1)
- Lost Bastille — cage elevator ledge before Sinner's Rise bridge (1)
- Memory of Vammar — rooftop with 2 pyromancer giants (1)
- Memory of Orro — hidden area after crane (3)
- Memory of Jeigh — ledge left after fog (1)
- Dragon Shrine — iron chest near entrance (3)
- Brume Tower — Ashen Crawlers (farmable); chests; Cave of the Dead (3)
- Dragon's Sanctum — wooden chest (respawns with Tower of Prayer ascetic — Dried Root in SotFS)
- Frozen Eleum Loyce — mimic room (3)

---

## 9. Summary for Areas Notes Implementation

| Data Type | Source | Project Status | Action |
|-----------|--------|----------------|--------|
| Boss → Bonfire ascetic | Fextralife table | Not in project | Create `bonfireAscetics.ts` |
| Ascetic reward value | Community + Wiki | Not in project | Add reward strings to ascetic notes |
| Illusory walls | Fextralife | ✓ ds2Database | Use for item/shiny notes |
| Crystal lizards | Fextralife | ✓ mostly | Add Dragon's Sanctum lizard |
| Pharros uses | Fextralife | ✓ ds2Database | Use for item notes |
| Gestures | Fextralife | ✓ gestures.ts | Use for gesture-in-area notes |
| Soul farming | Project + Fextralife | ✓ farming.ts | Link bonfires to farming tab |

---

## 10. Fextralife URLs (Evidence)

- [Bonfire Ascetic](https://darksouls2.wiki.fextralife.com/Bonfire+Ascetic)
- [Illusory Walls](https://darksouls2.wiki.fextralife.com/Illusory+Walls)
- [Gestures](https://darksouls2.wiki.fextralife.com/Gestures)
- [Crystal Lizards](https://darksouls2.wiki.fextralife.com/Crystal+Lizards)
- [Pharros' Lockstone](https://darksouls2.wiki.fextralife.com/Pharros%27+Lockstone)
