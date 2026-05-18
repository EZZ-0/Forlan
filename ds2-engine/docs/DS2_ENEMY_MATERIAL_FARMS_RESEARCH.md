# DS2 SotFS — Enemy Material Farms Research

**Purpose**: Document which enemies drop upgrade materials (beyond lizards and merchants).  
**Source**: Fextralife Wiki (Titanite Shard, Large Shard, Chunk, Twinkling, PDB, Fire Seed pages).

---

## Titanite Shard

| Enemy | Area | Rate | Notes |
|-------|------|------|-------|
| Undead Blacksmith | Harvest Valley / Earthen Peak | Common | Near 2nd bonfire. Best early farm. |
| Skeleton | Harvest Valley | Common | At area start. |
| Villager | Brightstone Cove | Lower | More spawns but lower rate. |
| Ogre | Forest of Fallen Giants | Common | Several in FoFG. |

---

## Large Titanite Shard

| Enemy | Area | Rate | Notes |
|-------|------|------|-------|
| Spider Hollow (Humanoid Spider) | Brightstone Cove | Good | Secret room — smash bookshelf, Chapel Threshold. |
| Undead Mage | Brightstone Cove | Good | — |
| Gyrm Warrior (smaller) | Doors of Pharros | Common | — |
| Ironclad Soldier | Iron Keep | Common | Turtle knights. |
| Darksucker (Coal Tar) | Black Gulch | ~10% Large, ~5% Chunk | Firebomb tar pits. 15 spawns per pool. |
| Great Basilisk | Huntsman's Copse | **Guaranteed 3** | Cave after first bonfire. CoC infinite. |

---

## Titanite Chunk

| Enemy | Area | Rate | Notes |
|-------|------|------|-------|
| Darksucker (Coal Tar) | Black Gulch | ~5% | Same as Large — best pre-Aldia. |
| Coal Tar | Aldia's Keep | Best efficiency | ~4.6 chunks/min. Fire arrows break pots. |
| Possessed Armor | Brume Tower (DLC) | Good | — |
| Large Gyrm | Doors of Pharros | ~3% | Max discovery. Low rate. |
| Undead Peasant | Brightstone Cove | ~3% or less | Not recommended. |

---

## Twinkling Titanite

| Enemy | Area | Rate | Notes |
|-------|------|------|-------|
| Heide Knight | Heide's Tower | ~5–10% | Max discovery, CoC. |
| Archdrake Pilgrim | Shrine of Amana | Good | Best non-ascetic. CoC. |
| Amana Priestess | Shrine of Amana | Good | Same area. |
| Pursuer | Lost Bastille (SotFS) | 1 per encounter | 4 encounters total. One-time. |
| Rampart Golem | Frozen Eleum Loyce (DLC) | Drops | — |
| Poison Statue Cluster | Shulva (DLC) | Rare | — |

---

## Petrified Dragon Bone

| Enemy | Area | Rate | Notes |
|-------|------|------|-------|
| Dragon Acolyte | Aldia's Keep | Random | Acid pool area. CoC. |
| The Imperfect | Lair of the Imperfect (DLC) | Relatively high | Also Twinkling, Slabs, Dragon Scales. |
| Wyvern | Dragon Aerie | Random | 11 lizards + drakes. |
| Great Basilisk | Aldia's Keep | Random | — |
| Frozen Reindeer | Frigid Outskirts (DLC) | Random | Difficult area. |

---

## Fire Seed

| Enemy | Area | Rate | Notes |
|-------|------|------|-------|
| Desert Sorceress | Earthen Peak | Good | Poison area. Best. |
| Alonne Knight | Iron Keep | Decent | — |
| Fire Salamander | FoFG | Rare | Salamander pit. |

---

## Infusion Stones

| Material | Enemy | Area | Notes |
|----------|-------|------|-------|
| Darknight Stone | Leydia Pyromancer | Undead Crypt | Ring bell, tombstones. Infinite spawn. |
| Boltstone | Basilisk | Brightstone / Shaded Woods | Very rare. Vendors easier. |

---

## Implementation

Data in `enemyMaterialFarms.ts`. Integrated into `materialLookup.ts` → Material Farm Spots.  
Shows in **Build → Farming → Materials** tab when filtering by material name.
