# DS2 SotFS — Soul & Item Farming: Mathematical Strategy

**Purpose**: Analytical, mathematically rigorous farming strategies for souls and items.  
**Sources**: Fextralife, project `farming.ts`, `buildItems.ts`, `ds2Database.ts`

---

## Part 1: Soul Bonus Stacking Model

### 1.1 Soul Gear Bonuses (Additive Stacking)

Soul bonuses stack **additively** on base souls. Formula:

```
Souls_received = Base_souls × (1 + Σ bonus_percent)
```

| Item | Bonus | Unlock |
|------|--------|--------|
| Covetous Silver Serpent Ring +1 | +20% | Melentia 10k spend (FoFG) |
| Covetous Silver Serpent Ring +2 | +30% | Mytha NG+ or Ascetic |
| Tseldora Set (4 pieces) | +2.5% each = +10% | Brightstone Cove |
| Symbol of Avarice | +50% | Mimic drop |
| Warlock Mask | +2.5% | Straid trade / drop |

### 1.2 Maximum Soul Multiplier

**Early game** (CSSR+1 only): `1 + 0.20 = 1.20×`

**Mid game** (CSSR+1 + Tseldora): `1 + 0.20 + 0.10 = 1.30×`

**Late game** (CSSR+2 + Tseldora): `1 + 0.30 + 0.10 = 1.40×`

**Optimal** (CSSR+2 + Tseldora + Symbol of Avarice): `1 + 0.30 + 0.10 + 0.50 = 1.90×`

**Absolute max** (+ Warlock Mask): `1 + 0.30 + 0.10 + 0.50 + 0.025 = 1.925×`

### 1.3 Soul Efficiency Per Run

Define: `E = Souls_received / Time_per_run` (souls per second or per minute).

**Strategy**: Maximize E by (1) higher base souls, (2) full soul gear, (3) shorter route. Early farms (Cardinal Tower) have low base but fast time; Giant Lord has high base but ~2–3 min/run.

---

## Part 2: Soul Farm Runs — Mathematical Analysis

### 2.1 Base Soul Values (Fextralife / Community)

| Enemy / Source | Base Souls | Notes |
|----------------|------------|-------|
| Hollow Soldier (FoFG) | ~250–350 | ~6 in Cardinal Tower room |
| Old Knight (Heide's) | 1,500 | 3 on main path |
| Explosive Hollow (Exile Holding) | ~600–800 | ~5 in cells |
| Bridge Hollow / Necromancer (Huntsman's) | ~400–600 | 5–8 total |
| Alonne Knight | ~1,000–1,200 | 5–6 on first bridge |
| Dark Giant (Black Gulch) | 5,000 each | 2 before Rotten fog |
| Spider Hollow (Brightstone) | ~600–800 | Pack of 5–6 |
| Giant Lord (boss) | 75,000 (NG) → 300,000 (NG+7) | See table below |

### 2.2 Giant Lord Soul Scaling (Fextralife)

| Bonfire Intensity | Base Souls |
|-------------------|------------|
| 1 | 75,000 |
| 2 | 150,000 |
| 3 | 187,500 |
| 4 | 206,250 |
| 5 | 225,000 |
| 6 | 243,750 |
| 7 | 262,500 |
| 8 | 300,000 |

**Formula** (approximate): Souls scale non-linearly with intensity. Intensity 2 = 2× base; beyond that, diminishing returns per ascetic.

### 2.3 Giant Lord Farm — Optimal Strategy

**Setup**:
1. Bonfire: Place Unbeknownst (Forest of Fallen Giants)
2. Ascetic inside memory (ledge left after fog) → self-sustaining loop
3. Soul gear: CSSR+2, Tseldora Set, Symbol of Avarice

**Math** (Intensity 1, full gear):
- Base: 75,000
- With 1.9×: **142,500 souls/run**

**Math** (Intensity 2, full gear):
- Base: 150,000
- With 1.9×: **285,000 souls/run**

**Math** (Intensity 8, full gear):
- Base: 300,000
- With 1.9×: **570,000 souls/run**

**Time estimate**: ~2–4 min/run (ascetic, run to tree, kill boss, grab ascetic, repeat). At 3 min/run:
- Intensity 1: **~2,850 souls/sec**
- Intensity 2: **~1,583 souls/sec**
- Intensity 8: **~3,167 souls/sec** (but requires 7 ascetics first)

**Recommendation**: Start at Intensity 1, build up runs. After 7 ascetics spent, Intensity 8 yields best souls/time. Hexer build (Great Resonant Soul, Dark Weapon) minimizes fight time.

---

## Part 3: Early–Mid Game Soul Farms — Comparative Analysis

### 3.1 Souls per Minute (SPM) Comparison

Assume ~1 min per run for early farms (rest, clear, rest). Project data + calculations:

| Farm | Base/Run | With CSSR+1 (1.2×) | With Full Gear (1.9×) | Est. Time | SPM (full gear) |
|------|----------|-------------------|------------------------|-----------|------------------|
| Cardinal Tower hollows | 2,000 | 2,400 | 3,800 | ~45 s | ~5,067 |
| Heide's Old Knights | 4,500 | 5,400 | 8,550 | ~60 s | ~8,550 |
| Exile Holding | 3,500 | 4,200 | 6,650 | ~50 s | ~7,980 |
| Huntsman's Bridge | 4,000 | 4,800 | 7,600 | ~60 s | ~7,600 |
| Iron Keep Alonne | 6,000 | 7,200 | 11,400 | ~90 s | ~7,600 |
| Black Gulch giants | 10,000 | 12,000 | 19,000 | ~60 s | **~19,000** |
| Brightstone spiders | 5,000 | 6,000 | 9,500 | ~75 s | ~7,600 |
| Giant Lord (Int 1) | 75,000 | 90,000 | 142,500 | ~180 s | **~47,500** |

**Conclusion**: Black Gulch is best pre-Giant Lord (if accessed). Giant Lord dominates once unlocked.

### 3.2 Despawn Economics

- **Despawn threshold**: 12 kills per enemy type per playthrough
- **Cardinal Tower**: ~6 hollows × 2 runs = 12 → despawn. CoC required for infinite.
- **Heide's**: 3 Old Knights × 4 runs = 12 → despawn. CoC required.
- **CoC cost**: Enemies +50% damage, player −20% damage. Factor into clear time.

### 3.3 Route Optimization

**Black Gulch** (highest pre-Giant Lord):
1. Break poison statues along path (one-time)
2. From Black Gulch Mouth → left path → 2 Dark Giants
3. ~5k each base → 10k/run; with gear 19k
4. Rest, repeat. Est. 60 s/run.

**Iron Keep** (best mid-game):
1. Threshold Bridge bonfire
2. First bridge: 5–6 Alonne Knights
3. ~1k each → 6k base, 11.4k with gear
4. Est. 90 s/run (longer due to bridge layout)

---

## Part 4: Item Discovery — Mathematical Model

### 4.1 Item Discovery Formula (Fextralife Mechanics Research)

- Random number: 0–10,000
- If random > your discovery total → **no drop**
- Higher discovery = more likely to get *some* drop; which item is random from enemy loot table
- Enemies have up to 10 drop slots; discovery affects **whether** you get a drop, not which item

### 4.2 Discovery Bonuses (Fextralife)

| Item | Bonus |
|------|-------|
| Prisoner's Hood | 10 |
| Traveling Merchant Hat | 25 |
| Jester's Cap | 50 |
| Symbol of Avarice | 100 |
| Prisoner's Tatters | 15 |
| Watchdragon Parma | 50 |
| Covetous Gold Serpent Ring | 50 |
| Covetous Gold Serpent Ring +1 | 75 |
| Covetous Gold Serpent Ring +2 | 100 |
| Rusted Coin | 100 (temporary) |
| Bonfire Intensity 2 | +150 |
| Bonfire Intensity 8 | +375 (cap) |

### 4.3 Optimal Discovery Stack

**Max from gear** (no Rusted Coin): CGSR+2 (100) + Watchdragon (50) + Jester's Cap (50) + Prisoner's Tatters (15) = **+275**

**With Rusted Coin**: 275 + 100 = **375** (Rusted Coin lasts ~5 min)

**With Bonfire Intensity 8**: 375 + 375 = **750** (formula total; display caps at 999)

### 4.4 Drop Rate Estimation

For a binary "drop or no drop" model:
- P(drop) increases monotonically with discovery
- At discovery 750, P(drop) is significantly higher than at 100
- Exact formula not published; use max discovery stack for rare farms

---

## Part 5: Item Farming — Strategic Recommendations

### 5.1 Twinkling Titanite

| Source | Method | Discovery Priority | Notes |
|--------|--------|--------------------|-------|
| Heide Knights | Heide's Tower, CoC | Max stack | Rare; despawn after 12 each. Multiple Knight types in SotFS. |
| Crystal Lizards | Dragon Aerie, Black Gulch | N/A (guaranteed if killed) | 11 in Aerie; kill before escape. |
| Chloanne | Majula | N/A | Unlimited after Nashandra |

**Heide Knight math**: 3,000 souls NG; 6,000 NG+; 12,000 NG+7. Drop Twinkling (rate unknown, ~5–10% est.). With CoC, infinite spawn. Optimal: max discovery, CoC, farm until full set + extras.

### 5.2 Petrified Dragon Bone

| Source | Method |
|--------|--------|
| Crystal Lizards | Dragon Aerie (11 lizards), Brightstone (2), others |
| Dragon Shrine | Corpse near lightning priest |
| Aldia's Keep | Ogre break door, chest |
| DLC | Multiple chests |

**Strategy**: Dragon Aerie full clear. Use bow/sorcery to one-shot lizards before escape. Rest to respawn if they escape.

### 5.3 Fire Seeds

| Source | Drop Rate | CoC |
|--------|-----------|-----|
| Fire Salamander (FoFG) | Rare | Yes |
| Alonne Knight | Decent | Yes |
| Desert Sorceress | Good | Yes |

**Recommendation**: Earthen Peak Desert Sorceresses — good rate, CoC for infinite. Route: Lower Earthen Peak → poison area → 2–3 sorceresses.

### 5.4 Darknight Stone (Dark Infusion)

| Source | Method |
|--------|--------|
| Chloanne | After King's Ring |
| Undead Crypt | Chest in boss corridor |
| Leydia Pyromancer | Farm, CoC |

**Leydia Pyromancer**: Undead Crypt. Keep tombstones, ring bell for infinite spawn. Max discovery.

### 5.5 Rare Weapon / Armor Drops

| Item | Enemy | Area | Strategy |
|------|-------|------|----------|
| Heide Set / Sword / Spear | Heide Knight | Heide's Tower | CoC, max discovery. SotFS: no longer 100% drop. |
| Uchigatana | Alonne Captain | Iron Keep | ~2% drop. CoC, max discovery. Or buy from McDuff (5k). |
| Black Witch Domino Mask | Grave Warden | Undead Crypt | Rare |
| Loyce Set | Charred Loyce Knight | Old Chaos (DLC) | Farm souls for Loyce Knights; trade 50 to Alsanna |

**Expected runs for rare drop** (2% base): At P=0.02, expected kills ≈ 1/0.02 = 50. With discovery doubling effective rate (approx.): ~25–35 kills. With 10% rate: ~10 kills.

---

## Part 6: Company of Champions (CoC) — Cost-Benefit

### 6.1 CoC Effects

- **Enemy damage**: +50%
- **Player damage**: −20%
- **Despawn**: Disabled — enemies respawn indefinitely
- **Summons**: Disabled (no NPC or player summons)

### 6.2 When to Use CoC

| Scenario | Use CoC? |
|----------|----------|
| Soul farming (enemy despawn) | Yes |
| Item farming (rare drop) | Yes |
| Boss fight (need NPC) | No |
| First playthrough (progression) | No |
| Early game (low damage) | Risky — 50% more damage hurts |

### 6.3 Effective DPS Impact

Player deals 0.8× damage, takes 1.5× damage. Effective time-to-kill (TTK) increases by ≈ 1.25× for same enemy. Factor into SPM: if base clear is 60 s, with CoC est. 75 s. Soul gain still positive if despawn would have stopped farming.

---

## Part 7: Summary Tables

### 7.1 Soul Farm Tier List (with Full Gear)

| Tier | Farm | Souls/Run (geared) | SPM (est.) | Unlock |
|------|------|--------------------|------------|--------|
| S | Giant Lord (Int 1+) | 142k–570k | ~47k+ | Ashen Mist Heart |
| A | Black Gulch giants | 19,000 | ~19,000 | Black Gulch |
| B | Heide's Old Knights | 8,550 | ~8,550 | Heide's Tower |
| B | Exile Holding | 6,650 | ~7,980 | Lost Bastille (ship) |
| B | Huntsman's Bridge | 7,600 | ~7,600 | Licia 2k |
| B | Brightstone spiders | 9,500 | ~7,600 | Brightstone Cove |
| B | Iron Keep Alonne | 11,400 | ~7,600 | Iron Keep |
| C | Cardinal Tower | 3,800 | ~5,067 | FoFG |

### 7.2 Item Farm Quick Reference

| Material | Best Source | Secondary |
|----------|-------------|-----------|
| Twinkling Titanite | Heide Knights (CoC) / Crystal Lizards | Chloanne (post-Nashandra) |
| Petrified Dragon Bone | Dragon Aerie lizards | DLC chests |
| Fire Seeds | Desert Sorceress (CoC) | Alonne Knights |
| Darknight Stone | Leydia Pyromancer (CoC) | Undead Crypt chest |
| Boltstone | Chloanne / Targray | Basilisk (very rare) |
| Titanite Chunks | Crystal Lizards / Chloanne | Various |

---

## Part 8: Implementation Notes for `farming.ts`

Recommended additions to project data:

1. **`soulMultiplier`** per run based on available gear tier (early / mid / late).
2. **`timeEstimateSeconds`** for SPM display.
3. **`spmOptimal`** — souls per minute with full gear.
4. **`discoveryRecommendation`** for item farms: "Max stack (CGSR+2, Watchdragon, Jester's, Tatters, Rusted Coin)".
5. **`cocRequired`** — boolean; already implied by tags.
6. **Giant Lord intensity table** in `bonfireAscetics.ts` or `farming.ts` for soul calculation.
