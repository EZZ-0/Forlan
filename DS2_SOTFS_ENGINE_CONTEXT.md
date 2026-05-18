# DS2 SotFS 100% Progression Engine — Complete Project Context

> **Purpose**: This document is the single source of truth for an AI agent (Cursor, Claude, etc.) to understand, maintain, and extend this project. It covers the product philosophy, technical architecture, all data models, the user's personal build context, game mechanics, design decisions, and known issues.

---

## 1. PROJECT OVERVIEW

### What This Is

A **standalone React web application** (single `.jsx` file, rendered via Claude.ai's artifact system) that serves as a **living companion tool** for a 100% completionist playthrough of **Dark Souls 2: Scholar of the First Sin (SotFS)** on **Xbox**.

It is NOT a guide you read — it is a **tool you play alongside** that thinks for you, tracking interconnected systems that would otherwise require cross-referencing multiple wikis, spreadsheets, and video guides simultaneously.

### Core File (Active)

- **`ds2-engine/`** — React + Vite application. Run with `npm run dev` (localhost:5173). Uses `localStorage` for persistence. Export/Import JSON for backup. Tabs: Overview, Areas, Quests, Trackers, Build, Farming. Hybrid + adaptive build system with END distributed earlier.

### Legacy / Supplementary Files

- **`DS2_Progression_Engine.jsx`** — Earlier React artifact (Claude.ai). Uses `window.storage`. No Build/Farming tabs.
- **`DS2_Engine_V4.html`** — Standalone HTML with vanilla JS, 139-level roadmap. Uses `localStorage`.
- **`ds2-python.py`** — Streamlit version. Saves to `ds2_progress.json`.
- **`DS2_Dark_Hexer_Build.pdf`** — Printable build guide. Standalone reference.

---

## 2. PRODUCT PHILOSOPHY

### Design Principles

1. **Cross-Referenced Everything**: Checking off one thing should ripple across systems. Visiting Lucatiel at No-Man's Wharf updates her questline tracker, gesture availability, boss summon options, and Aldia's Keep warning conditions — all from one checkbox.

2. **Progression-Aware**: Content is organized by the route you're actually walking, not alphabetically or by wiki category. The area order follows Fighting Cowboy's 100% walkthrough route exactly.

3. **Missable-First Warnings**: Red `⚠` warnings appear for permanently-missable content. DS2 has many "do X before Y or it's gone forever" traps (burn the windmill before Mytha, don't light torches in Undead Crypt, don't talk to Lucatiel at Aldia's Keep until 3 boss survivals).

4. **Dark Souls Aesthetic**: The UI uses a dark color palette inspired by the game's bonfires, ember, and gold. Cinzel font for headers (medieval/gothic), EB Garamond for body text. No bright whites, no cheerful colors. This is Drangleic.

5. **Persistence Without Servers**: Uses `localStorage` (key: `"ds2-progress"`). Save-on-change (no debounce). Export/Import JSON for backup and migration. No backend, no database, no auth.

6. **Mobile-First**: Max-width 640px, designed to sit next to a TV/monitor while playing. Touch-friendly tap targets. Scrollable containers.

### What This Is NOT

- Not a wiki replacement (doesn't explain every item's stats)
- Not a build optimizer/calculator (the build tab is a locked guide, not a sandbox)
- Not a PvP tool (this is PvE completionist only)
- Not multiplayer-aware (no SM tracking, no matchmaking advice)

---

## 3. THE USER'S PERSONAL CONTEXT

### Player Profile

- **Platform**: Xbox
- **Experience**: Has completed one full DS2 playthrough as a **pure hex caster** (Dark Orb spam). Felt locked into repetitive playstyle.
- **Goal**: 100% completion on a fresh playthrough with a build that feels more versatile and engaged
- **PvP Interest**: None — purely PvE
- **NG Cycle**: NG only (first clear, not NG+)
- **Soul Level Cap**: None (completionist, will level as high as needed)

### Build Decision History

The user originally wanted a **DEX/hex hybrid** — fast katana gameplay with hexes for ranged support. Rigorous mechanical analysis revealed this is a trap in DS2:

**Why pure DEX/hex fails:**
- Dark infusion (which you MUST use for hex scaling) **removes DEX scaling entirely**
- Investing 40 points in DEX for a dark-infused weapon gives zero damage benefit
- Those 40 points are wasted compared to putting them in VGR/END/ATN

**The solution:** Dark Melee Hexer — use katanas for their **moveset** (fast, versatile), not their DEX scaling. Dark-infuse everything. Only need 14 STR / 20 DEX for Uchigatana. Remaining 30+ levels go to VGR/END/ATN for survivability and spell variety.

### The Build: DARK MELEE HEXER

**Starting Class**: Sorcerer (SL 11) — Mathematically optimal. INT 14, ATN 12 (2 slots), Staff + Soul Arrow from the start. Zero wasted stat points reaching targets.

**Final Target Stats (SL 151 "Core Done")**:

| Stat | Base (Sorc) | Target | Points Invested | Rationale |
|------|-------------|--------|-----------------|-----------|
| VGR  | 5           | 25     | 20              | ~1,100 HP. Enough for NG PvE |
| END  | 6           | 20     | 14              | Comfortable stamina for katana combos + rolls |
| VIT  | 5           | 8      | 3               | Minimal — just enough for medium armor |
| ATN  | 12          | 43     | 31              | 7 spell slots + bonus casts. 43 is community breakpoint for extra Dark Orb cast |
| STR  | 3           | 14     | 11              | Uchigatana + Lightning Mace 1H requirement |
| DEX  | 7           | 20     | 13              | Uchigatana + decent weapon variety |
| ADP  | 8           | 13     | 5               | Only need 5 points! ATN 43 does most of the agility work |
| INT  | 14          | 30     | 16              | Dark soft cap. All sorceries + hexes available |
| FTH  | 4           | 30     | 26              | Dark soft cap. All miracles + pyromancies available |
| **TOTAL** | | | **140 points** | **SL 11 + 140 = SL 151** |

**Agility Math (Verified)**:
```
Formula: AGI = ((ATN + 3×ADP) / 4) + 80   (when ATN + 3×ADP ≤ 120)
With ATN 43, ADP 13: (43 + 39) / 4 + 80 = 100.5 → displays 100 AGI
100 AGI = 11 i-frames, hardcap for consumable use speed
```

**Why ATN 43 specifically**: Known community breakpoint. Adds a bonus cast to many spells including Dark Orb (goes from 20 → 24 casts). ATN 43 + ADP 13 = 100 AGI, meaning only 5 ADP investment needed (massive savings).

**Overflow Priorities (after SL 150)**: VGR → 35, END → 25, INT → 40, FTH → 40, ATN → 50

### Build Identity

> "You are NOT a caster who occasionally swings a sword. You are a **dark-buffed katana user** who happens to have access to **all four magic schools** for tactical flexibility."

Five damage types from one build:
1. **Dark** (primary) — Dark Uchigatana + Dark Orb
2. **Lightning** — Lightning Mace (swap for dark-resistant bosses)
3. **Fire** — Fire Longsword + pyromancies
4. **Magic** — Great Heavy Soul Arrow + Staff of Wisdom
5. **Physical** — Raw damage from uninfused weapons when needed

### Weapon Arsenal

| Weapon | Role | Infusion | Stats Required | Availability |
|--------|------|----------|----------------|--------------|
| Dark Uchigatana +10 | Primary melee | Dark | 14 STR / 20 DEX | Phase 4 (Huntsman's Copse) |
| Lightning Mace +10 | Dark-resistant swap | Lightning | 12 STR | Phase 1 (Lenigrast) |
| Fire Longsword +10 | Early game + fire backup | Fire | 10 STR / 9 DEX | Phase 1 (FoFG) |
| Sunset Staff +5 | Primary dark catalyst | Dark | 22 INT / 22 FTH (free at 20/20) | Phase 3 (Felkin) |
| Staff of Wisdom +5 | Pure sorcery catalyst | Magic | 50 INT (spiced) | Phase 6 (Dragon Shrine) |
| Pyromancy Flame +10 | Fire spells | N/A | None | Phase 3 (Rosabeth) |

### Spell Loadout (7 Slots at ATN 43)

| Slot | Spell | School | Purpose |
|------|-------|--------|---------|
| 1 | Dark Orb | Hex | Primary ranged. 24 casts at ATN 43. Best value hex. |
| 2 | Dark Weapon | Hex | Weapon buff. Huge damage boost on dark-infused weapons. |
| 3 | Great Heavy Soul Arrow | Sorcery | Backup ranged. Different element. |
| 4 | Flame Swathe | Pyromancy | Massive AoE nuke. |
| 5 | Resonant Soul / Great Resonant Soul | Hex | Costs souls. Great Resonant Soul (Grandahl Rank 2) = higher damage upgrade. |
| 6 | Great Fireball | Pyromancy | Fire AoE ranged. |
| 7 | Sunlight Blade | Miracle | Lightning weapon buff (spiced to lower FTH req). |

### Key Rings

| Ring | Effect | Source |
|------|--------|--------|
| Southern Ritual Band | +3 spell slots | Brightstone Cove |
| Southern Ritual Band +2 | +3 spell slots (upgrade) | NG+ Scorpioness Najka |
| Clear Bluestone Ring +2 | Cast speed | Skeleton Lords (NG+ or Ascetic) |
| Ring of Blades | Flat physical AR | Pursuer drop |
| Third Dragon Ring | HP/Stamina/Equip Load | Dragon Shrine |
| Chloranthy Ring | Stamina regen | FoFG |
| Dark Clutch Ring | Dark damage boost | DLC area |
| Abyss Seal | Hex damage +20%, HP drain per cast | Dark Chasm — Grandahl (Pilgrims Rank 2) |

### Boss Element Strategy

- **Dark-Weak (Most Bosses)**: Dark Uchi + Dark Orb. Default approach.
- **Dark-Resistant**: Pursuer, Velstadt, Darklurker, Nashandra → Lightning Mace + Sunlight Blade, or Fire Longsword
- **DLC Bosses**: Generally high all-round resistances. Use fastest weapon with best buff available. Fume Knight = dodging > damage.

### Build Cross-Check (Meta vs. This Guide)

Cross-referenced with Fextralife, community guides, and hex build meta (2024–2026):

| Aspect | This Build | Meta / Best Practice | Notes |
|--------|------------|----------------------|-------|
| **INT/FTH** | 30/30 | 30/30 or 50/50 | 30/30 = dark soft cap for NG. 50/50 for max PvP. |
| **ADP/AGI** | 13 → 100 AGI | 105 AGI for PvP | 100 AGI = 11 i-frames, sufficient for PvE. |
| **Sunset Staff** | Primary hex catalyst | Sunset Staff or Caitha's Chime | Sunset Staff best for staff hexes (Dark Orb). Caitha's for chime hexes (Resonant Soul). |
| **Great Resonant Soul** | Added (Rank 2) | Top-tier hex damage | Upgrade over Resonant Soul. Now in checklist. |
| **Abyss Seal** | Added to rings | +20% hex damage, HP drain | Meta ring. Use when soul cost acceptable. |
| **Southern Ritual Band +2** | Added | Same +3 slots, NG+ | Upgrade from Brightstone Cove base. |
| **Crypt Blacksword** | In buildConnections | Top-tier hex weapon | NG+ Rotten trade. Optional late-game. |
| **Duplicate SL 148** | Fixed | — | LEVELS had two entries at 148; corrected to 149, 150, 151. |

---

## 4. LEVEL-BY-LEVEL ROADMAP (140 Levels)

### Phase Structure

The build is divided into 6 phases that align with progression through the game world:

**Phase 1 — "Fire Longsword Online + Survive" (SL 11 → 24, 13 levels)**
Areas: Things Betwixt → FoFG
Priority: STR 3→7, VGR 5→10, DEX 7→9, ATN 12→14
Milestones: SL 15 (can 2H Fire Longsword), SL 20 (can 1H Fire Longsword)

**Phase 2 — "Felkin Shop Access" (SL 24 → 35, 11 levels)**
Areas: Heide's → No-Man's → Lost Bastille → Huntsman's Copse entrance
Priority: FTH 4→8, ATN 14→16, VGR 10→15
Milestones: SL 28 (Felkin hex shop open), SL 30 (3 spell slots)

**Phase 3 — "The 20/20 Rush" (SL 35 → 55, 20 levels)**
Areas: Huntsman's Copse → Harvest Valley → Earthen Peak
Priority: INT 14→20, FTH 8→20 (alternating), VGR 15→17
Milestones: SL 46 (INT 20 ✓), SL 53 (★ 20/20! FREE Sunset Staff + Hexer Set — build ignition point)

**Phase 4 — "Dark Melee Online" (SL 55 → 90, 35 levels)**
Areas: Iron Keep → The Pit → Gutter → Black Gulch → Shaded Woods
Priority: STR 7→14, DEX 9→20, INT 20→28, FTH 20→28, VGR 17→18
Milestones: SL 62 (STR target), SL 73 (★ Uchigatana wielded! Dark infuse at McDuff), SL 93 (INT 30), SL 94 (★ FTH 30 — DARK MAXIMIZED)

**Phase 5 — "Diversify Arsenal" (SL 90 → 120, 30 levels)**
Areas: Brightstone Cove → Sinner's Rise → Drangleic Castle → Shrine of Amana → Undead Crypt
Priority: INT to 30, FTH to 30, VGR 18→21, END 6→15, ADP 8→13, ATN 16→25
Milestones: SL 110 (ADP done, AGI 96), SL 114 (4 spell slots), SL 119 (5 spell slots)

**Phase 6 — "Complete Build" (SL 120 → 151, 31 levels)**
Areas: Aldia's Keep → Dragon Aerie → Memories → Throne of Want
Priority: ATN 25→43, VGR 21→25, END 15→20, VIT 5→8
Milestones: SL 125 (6 slots, AGI ~98), SL 129 (VGR target ~1100 HP), SL 134 (END target), SL 144 (7 slots, AGI ~99), SL 148 (VIT target), SL 151 (★★ BUILD COMPLETE — AGI 100)

### Level Data Format

The V4 HTML engine stores 139 individual level allocations as:
```javascript
[SL, statAbbreviation, newStatValue, phaseNumber, noteOrEmpty]
// Example: [15, "STR", 7, 1, "★ Can 2H Fire Longsword"]
```

> **NOTE**: The V2 React app does NOT yet have this 139-level individual roadmap. It has a generic Build Planner with class selection, archetype selection, and manual stat allocation. Porting the locked roadmap from V4 into V2 is a potential future task.

---

## 5. TECHNICAL ARCHITECTURE

### Technology Stack

- **Framework**: React (functional components, hooks)
- **Styling**: Inline styles (no CSS files, no Tailwind — must work as single .jsx artifact)
- **Fonts**: Google Fonts — `Cinzel` (headers), `EB Garamond` (body, imported in `<style>` tag)
- **Persistence**: `window.storage` API (Claude.ai's cloud KV store)
  - `get(key)` → `{key, value}` or throws if not found
  - `set(key, value)` → `{key, value}`
  - All values are JSON strings
  - Storage key: `"ds2-engine-v2"`
- **No build system**: Single file, no bundling, no npm, no external deps except React (provided by artifact runtime)
- **Available imports**: `react`, `recharts`, `lucide-react`, `lodash`, `d3`, `three`, `papaparse`, `sheetjs`, `shadcn/ui`, `chart.js`, `tone`, `mammoth`, `tensorflow`, `plotly`, `mathjs`

### State Shape

```javascript
// Persisted to storage
{
  ck: {},           // Checkbox state. Keys are item/step IDs like "fg1", "lucatiel:1", "nm4"
  buildClass: null, // Selected class ID ("sorcerer", "knight", etc.) or null
  buildArch: null,  // Selected archetype ID ("hexer", "quality", etc.) or null  
  statAlloc: {},    // Manual stat allocations {vgr: 5, str: 3, ...} (points ADDED, not totals)
  buildNotes: {},   // Unused currently, reserved for future build annotations
}

// Ephemeral (React state only, not persisted)
{
  view: "dashboard",    // Current tab: "dashboard"|"area"|"quests"|"trackers"|"build"|"farm"
  selArea: null,        // Selected area key for area detail view
  selQuest: null,       // Selected quest key for quest detail view
  loaded: false,        // Whether initial load from storage is complete
  saving: false,        // Whether currently saving (shows ember indicator)
  showReset: false,     // Whether reset confirmation modal is shown
  areaOpen: false,      // Whether area dropdown is expanded
  farmSub: "spots",     // Farming sub-tab: "spots"|"gear"
  farmOpen: {},         // Which farming phases are expanded {1: true, 2: false, ...}
  buildPhase: 1,        // Currently selected build phase (1-7)
}
```

### Color Palette

```javascript
const bg = "#0c0b0a";      // Background (near-black, warm)
const bgCard = "#1a1714";   // Card background (dark brown)
const gold = "#c8a030";      // Primary accent (bonfire gold)
const ember = "#d4652a";     // Secondary accent (ember orange)
const dim = "#8a7e6d";       // Muted text
const lt = "#e8dcc8";        // Light text (parchment)
const warnRed = "#c44040";   // Warning/danger
const green = "#6b9e3a";     // Success/completion
const qBlue = "#5e9ecf";     // Quest/info blue

// Phase colors (gradient from green to red as difficulty increases)
const phaseColors = {
  1: "#6b7c52",  // Early - muted green
  2: "#7a8c62",  // Early-mid - sage
  3: "#c8a030",  // Mid - gold
  4: "#d4862a",  // Mid-late - amber
  5: "#c45a30",  // Late - burnt orange
  6: "#a03030",  // Endgame - deep red
  7: "#8b5cf6",  // DLC - purple
};

// Stat colors (each stat has a unique identity color)
const statColors = {
  VGR: "#ef4444",  // Red (health/life)
  END: "#f97316",  // Orange (stamina/energy)
  VIT: "#a3a3a3",  // Gray (weight/physical)
  ATN: "#8b5cf6",  // Purple (magic/attunement)
  STR: "#d4652a",  // Ember (raw power)
  DEX: "#65a30d",  // Green (agility)
  ADP: "#06b6d4",  // Cyan (adaptability)
  INT: "#3b82f6",  // Blue (intelligence/sorcery)
  FTH: "#eab308",  // Yellow (faith/miracles)
};
```

---

## 6. DATA MODELS

### Areas (28 total, Fighting Cowboy route order)

```
AREA_ORDER = [
  "things_betwixt", "majula", "forest_of_fallen_giants", "heides_tower",
  "no_mans_wharf", "lost_bastille", "huntsmans_copse", "harvest_valley",
  "earthen_peak", "iron_keep", "the_pit", "the_gutter", "black_gulch",
  "shaded_woods", "doors_of_pharros", "brightstone_cove", "sinners_rise",
  "drangleic_castle", "shrine_of_amana", "undead_crypt", "aldias_keep",
  "dragon_aerie", "memories", "dark_chasm", "throne_of_want",
  "dlc_sunken", "dlc_iron", "dlc_ivory"
]
```

Each area object has:
```javascript
{
  name: "Forest of Fallen Giants",  // Display name
  lvl: "10–20",                      // Recommended SL range
  items: [                           // Array of trackable items
    [
      "fg1",                         // Unique ID (area prefix + number)
      "Crestfallen's Retreat bonfire", // Description
      "bonfire",                     // Type: boss|key|npc|bonfire|item|warn
      // Optional: quest ref string (e.g., "lucatiel:1")
      // Optional: array of cross-reference unlock IDs (e.g., ["estus:1", "gesture:welcome"])
    ]
  ]
}
```

Item types and their visual treatment:
- `boss` — Gold text, skull icon
- `key` — Gold text, key icon
- `npc` — Blue text, person icon
- `bonfire` — Ember text, fire icon
- `item` — Normal text
- `warn` — Red text, warning icon. These are the critical missable warnings.

### NPC Questlines (5 tracked)

```javascript
QUESTS = {
  lucatiel: {
    name: "Lucatiel of Mirrah",
    icon: "⚔", color: "#5e9ecf",
    reward: "Lucatiel's Set + Mirrah Greatsword",
    note: "Visit ALL 4 locations. Survive 3 boss fights. ONE playthrough.",
    steps: [...],              // Array of {id, ref, label, area}
    bossSurvivalNeeded: 3,     // How many bosses she must survive
    bosses: [...]              // Array of {id, ref, label, area} — available boss fights
  },
  // benhart, grandahl, gavlan, pate_creighton follow same structure
}
```

**Cross-reference system**: Quest steps have a `ref` field pointing to an area item ID. When that area item is checked, the quest step auto-completes (they share state via `ck`).

### Gestures (20 total)

```javascript
// [name, source, location, linked_item_id_or_null]
["Welcome", "Saulden", "Majula", "mj5"]
```

Gestures without a linked ID (4 default ones + 2 special ones) are always marked complete or require special conditions.

### Covenants (9 total)

```javascript
// [name, NPC, reward/rank info, linked_item_id]
["Way of Blue", "Saulden", "Kill 10 invaders", "mj5"]
```

### Starting Classes (8)

```javascript
{ id: "sorcerer", name: "Sorcerer", sl: 11, 
  s: {vgr:5, end:6, vit:5, atn:12, str:3, dex:7, adp:8, int:14, fth:4} }
```

### Archetypes (7)

```javascript
{ id: "hexer", name: "Hexer", 
  desc: "Dark magic — INT & FTH scaling. Very powerful in DS2", 
  icon: "🌑", color: "#8b5cf6",
  primary: ["int","fth","atn","vgr"],  // Stats to prioritize
  bestClass: "sorcerer",                // Recommended starting class
  tip: "20 INT/20 FTH for Felkin's free gear..." }
```

### Weapons (44 entries)

```javascript
// [name, weaponType, strReq, dexReq, intReq, fthReq, weight, phase, archetypeArray, whereToFind]
["Uchigatana", "Katana", 14, 20, 0, 0, 5, 3, ["dexterity","quality"], "Huntsman's Copse"]
```

### Farming Data (6 phases)

```javascript
FARM_PHASES = [{
  phase: 1,
  name: "Things Betwixt → FoFG",
  color: "#6b7c52",
  souls: [{ name, loc, yield, method, tags:["souls"|"infinite"|"ascetic"], best:boolean }],
  titanite: [{ name, loc, yield, method, tags:["titanite"|"infinite"|"ascetic"], best:boolean }],
  tips: "String with tactical advice for this phase"
}]
```

Soul-boosting gear and item discovery gear are separate flat arrays:
```javascript
SOUL_GEAR = [{ name, bonus, loc, phase }]
ITEM_DISC_GEAR = [{ name, bonus, loc, phase }]
```

### Shop Unlocks (canonical database)

Tracks when items unlock at merchants. Source: `ds2-engine/src/data/shopUnlocks.ts`.

```javascript
// Unlock condition types
UnlockConditionType =
  | "area"        // Reach area (e.g. FoFG, Lost Bastille)
  | "key"         // Obtain key (Lenigrast's Key, King's Ring)
  | "spend_souls" // Spend X souls at merchant
  | "stat"        // Meet stat requirement (8 INT+8 FTH, 20/20 BASE)
  | "boss"        // Defeat boss (Nashandra, etc.)
  | "item"        // Give item to merchant (Dull Ember)
  | "progression" // Stock grows with bosses (Chloanne)
  | "unpetrify"   // Unpetrify NPC (Straid, Rosabeth)
  | "covenant"    // Covenant rank (Grandahl)

ShopUnlock = {
  id: string,
  merchant: string,
  merchantAreaId: AreaId,
  item: string,           // Item or item category
  itemCategory?: "weapon" | "material" | "ring" | "spell" | "armor" | "key" | "catalyst" | "other",
  conditionType: UnlockConditionType,
  condition: string,      // Human-readable: "FoFG + Lenigrast key", "Spend 14,000 souls"
  detail?: string,
  progressIds?: string[],  // Checklist IDs that satisfy this unlock
  buildRef?: string       // Cross-link to build (e.g. "weapon:Lightning Mace")
}

// Helpers
getShopUnlocksForArea(areaId) → ShopUnlock[]
getShopUnlocksByMerchant(merchant) → ShopUnlock[]
getShopUnlocksForItem(itemName) → ShopUnlock[]
getShopUnlocksByConditionType(type) → ShopUnlock[]
```

**Integration**: Items tab has "Shop Unlocks" sub-tab. Areas NOTES section shows "Shop Unlocks in this area" when applicable. Build (Equip, Infusion, Farming) and Farming tab have "See Shop Unlocks →" links.

---

## 7. TAB-BY-TAB FEATURE SPECIFICATION

### Tab 1: Dashboard ("Overview")

- Overall completion percentage (total items checked / total items)
- Area-by-area progress bars (clickable → navigates to area)
- NPC questline summary cards with step/boss progress
- Gesture count (X/20) and covenant count (X/9)

### Tab 2: Areas

- Dropdown selector showing all 28 areas in route order
- Selected area shows full item checklist with type-colored indicators
- Each item has a checkbox that updates `ck` state
- Warning items (`warn` type) are always visible and highlighted red
- Area completion percentage shown in header

### Tab 3: Quests

- 5 NPC questline cards
- Each shows: step checklist, boss survival counter, progress bar
- Steps cross-reference area items (checking "nm4" in Areas also checks Lucatiel step 1)
- Visual warning when boss survival count is insufficient for final quest step

### Tab 4: Trackers

- **Gestures Grid**: 20 gestures in a grid, clickable, shows source and location
- **Covenants Grid**: 9 covenants, shows NPC, reward info, discovery status

### Tab 5: Build

Currently a **generic build planner** with 3 steps:
1. Class Selection (8 classes with stat displays)
2. Archetype Selection (7 archetypes with recommendations)
3. Stat Allocator + Phase-filtered weapon/armor/ring browser + Stat gates tracker

> **KNOWN GAP**: The Build tab is generic (any class/archetype). The locked Dark Melee Hexer build with 139 individual levels exists only in V4.html. Porting this into V2 as a dedicated hexer sub-tab or replacing the generic planner is a potential enhancement.

### Tab 6: Farming

- **Sub-tab: Farm Spots** — 6 collapsible phase sections, each with soul farming spots and titanite farming spots
  - Each spot shows: name, location pin, yield numbers, method description, tags
  - Tags: ★ BEST (green), ∞ Infinite (ember), 🔥 Ascetic (red), Souls (gold), Titanite (purple)
  - Phase tip at bottom of each section
  - Company of Champions tip banner at top

- **Sub-tab: Soul & Item Gear** — Reference tables for:
  - Max soul gear combo with multiplicative math
  - All soul-boosting equipment with % bonuses and locations
  - All item discovery equipment with locations
  - Key mechanics explanations (CoC, Ascetics, Despawn, Stacking)

---

## 8. GAME MECHANICS REFERENCE (For Agent Context)

### DS2-Specific Mechanics That Affect This App

**Soul Memory (SM)**: DS2 tracks TOTAL souls ever acquired (not just current). This affects matchmaking tiers. This app does NOT track SM because the user is PvE-only with no level cap.

**Enemy Despawn**: Normal enemies vanish after 12 kills. This is unique to DS2. Workarounds:
- Company of Champions covenant: prevents despawn, enemies ~20% tougher
- Bonfire Ascetic: resets area to NG+ intensity, re-adds 12 kill counts
- Some enemies are naturally infinite (Drangleic Stone Knights, Leydia Witches)

**Agility / ADP / i-frames**: Unlike DS1/DS3, DS2 roll i-frames are NOT tied to equip load. They're determined by the Agility stat, which is derived from ADP and ATN. This is the most misunderstood mechanic in DS2 and why the build carefully engineers ATN 43 + ADP 13 = 100 AGI.

**Infusion System**: DS2 lets you infuse weapons with elements. Dark infusion is key for hexers because dark damage scales with the LOWER of INT and FTH (dark bonus = min(INT, FTH)). At 30/30 INT/FTH, dark bonus is maximized for NG.

**Bonfire Ascetic**: Consumable that resets one bonfire's area to next NG+ intensity. Critical for farming (Giant Lord loop is self-sustaining — ascetic is inside the memory).

**SotFS vs Vanilla DS2**: Scholar of the First Sin has different enemy/item placements, added Aldia as a boss, and changed several NPC locations. All data in this app is SotFS-specific.

**Illusory Walls**: In DS2, illusory walls open with **Press A/X** (interact key). **Striking does NOT work** — unlike Demon's Souls and Dark Souls 1. Walk up to suspicious walls and press the interact button. Area items tagged `["illusory"]` indicate these. Breakable walls (firebomb, explosive barrels) use `["breakable"]`.

**Secrets Database**: `ds2-engine/src/data/ds2Database.ts` contains canonical data for:
- `ILLUSORY_WALLS` — area, location, items behind (Press A/X)
- `BREAKABLE_WALLS` — area, how to break, items
- `PHARROS_KEY_USES` — area, contraption location, effect, items
- `PHARROS_LOCATIONS` — where to find lockstones
- `CRYSTAL_LIZARDS` — area, location, drops

Area checklist items can be tagged `["illusory"]`, `["breakable"]`, `["pharros"]`, `["crystal_lizard"]`, `["secret"]` for filtering.

### Key NPC Interactions

**Felkin the Outcast**: Sells hexes. Requires 8 INT and 8 FTH for shop access. At 20/20 INT/FTH, gives FREE Sunset Staff + Hexer's Set (the build's ignition point).

**McDuff the Blacksmith**: Infusion smith. Requires Dull Ember. Located in Lost Bastille. Sells unlimited Large Titanite Shards.

**Stone Trader Chloanne**: Sells titanite. Moves to Majula after meeting in Harvest Valley. Stock increases as you beat bosses. Unlimited chunks after Nashandra.

**Merchant Hag Melentia**: Sells armor of killed NPCs. Spend 10k total → Covetous Silver Serpent Ring +1 (essential early-game soul boost).

---

## 9. AREA ROUTE & PROGRESSION ORDER

The route follows Fighting Cowboy's 100% SotFS walkthrough, which is the community-standard completionist order:

```
1.  Things Betwixt (tutorial)
2.  Majula (hub)
3.  Forest of Fallen Giants (first area, Last Giant + Pursuer)
4.  Heide's Tower of Flame (Dragonrider + Old Dragonslayer)
5.  No-Man's Wharf (Flexile Sentry → Lost Bastille access)
6.  The Lost Bastille (Ruin Sentinels, Belfry Luna, McDuff)
7.  Huntsman's Copse (Skeleton Lords, Chariot, Felkin)
8.  Harvest Valley (Covetous Demon, Gavlan, Heirs of Sun)
9.  Earthen Peak (★ BURN WINDMILL, Mytha)
10. Iron Keep / Belfry Sol (Smelter Demon, Old Iron King)
11. The Pit / Grave of Saints (Royal Rat Vanguard, Rat King)
12. The Gutter (navigation maze, Dark Pyro Flame)
13. Black Gulch (The Rotten, Lucatiel #4, Grandahl #1)
14. Shaded Woods (Najka, Vengarl, Benhart, 3-way fork)
15. Doors of Pharros (Royal Rat Authority, Gavlan final, Grandahl #2)
16. Brightstone Cove Tseldora (Prowling Magus, Freja, Pate/Creighton)
17. Sinner's Rise (Lost Sinner)
18. Drangleic Castle (Twin Dragonriders, Looking Glass Knight, Grandahl #3)
19. Shrine of Amana (Demon of Song, Sunlight Blade)
20. Undead Crypt (★ NO TORCHES, Velstadt, King's Ring)
21. Aldia's Keep (Guardian Dragon, Lucatiel final talk)
22. Dragon Aerie / Dragon Shrine (Ancient Dragon, Ashen Mist Heart)
23. Memories (Giant Lord, Benhart boss, Giant Souls)
24. Dark Chasm of Old (Darklurker)
25. Throne of Want (Watcher & Defender, Nashandra, Aldia)
26. DLC 1: Sunken King (Elana, Sinh, Graverobbers)
27. DLC 2: Old Iron King (Fume Knight, Sir Alonne, Blue Smelter)
28. DLC 3: Ivory King (Aava, Burnt Ivory King, Lud & Zallen)
```

---

## 10. KNOWN ISSUES & FUTURE WORK

### Known Issues

1. **Build tab is generic, not locked to hexer**: V2 has a generic class/archetype/stat-allocator. The locked 139-level hexer roadmap only exists in V4.html. User's actual build experience is the generic planner.

2. **No Estus/Bone Dust counter on dashboard**: The data tracks estus shards and bone dust via cross-reference tags (`estus:1`, `bone:1`) but there's no dedicated counter widget on the dashboard.

3. **Quest cross-references are one-way**: Checking an area item updates the quest. Checking a quest step does NOT update the area item (they share the same `ck` key via `ref`, so this actually works — but the UX could be clearer).

4. **No spell tracking**: The item data tags spells (`spell:sorcery`, `spell:hex`, etc.) but there's no dedicated spell collection tracker tab.

5. **Farming tab has no persistence**: Farm phase expand/collapse state is ephemeral. Not a big deal but could be saved.

### Potential Enhancements

- **Locked Hexer Build Tab**: Replace or supplement the generic Build Planner with the verified 139-level Dark Melee Hexer roadmap, including per-level checkboxes, phase filtering, milestone highlights, and quick-fill buttons (as implemented in V4.html).

- **Spell Collection Tracker**: A grid showing all sorceries, miracles, pyromancies, and hexes with discovery status.

- **Boss Damage Calculator**: Input your current stats → see estimated damage against specific bosses with different weapon/infusion combos.

- **"What Next?" Smart View**: Based on checked items and current area, surface what's available, what's urgent, and what you'd miss if you move on.

- **Achievement/Trophy Tracker**: Map all Xbox achievements to their completion requirements.

- **Import/Export**: JSON export of all progress for backup or migration.

---

## 11. STYLE GUIDE FOR AI AGENTS

### Writing Tone

- **In-app text**: Terse, direct, Dark Souls flavor. "BURN THE WINDMILL" not "Remember to burn the windmill before the boss fight". Commands, not suggestions.
- **Tips and methods**: Practical and specific. Include numbers. "~30k souls/run with soul gear" not "a lot of souls".
- **No hand-holding**: The user has beaten DS2 before. Don't explain what a bonfire is.

### Code Style

- Single file, no splitting into components/files
- Inline styles only (no CSS classes, no Tailwind)
- Compact data structures (arrays over objects where possible to save bytes)
- `useMemo` for computed values, `useCallback` where needed
- No `localStorage` or `sessionStorage` — use `window.storage` only
- Comments use `// ══════════ SECTION ══════════` format for major sections
- Helper functions before main component
- Data constants before component, after imports

### UI Patterns

- Cards: `background: bgCard, borderRadius: 8, padding: 14, border: "1px solid #2a2420"`
- Section titles: `fontFamily: "'Cinzel',Georgia,serif", color: gold, letterSpacing: 1-2`
- Buttons: No outlines, subtle background changes on active state
- Progress bars: 6px height, `#2a2420` track, colored fill
- Checkboxes: Custom styled (gold border, green fill when checked)
- Collapsible sections: Click header to toggle, `▶` arrow rotates to indicate state

---

## 12. FILE INVENTORY

| File | Type | Status | Description |
|------|------|--------|-------------|
| `ds2-engine/` | React + Vite | **ACTIVE** | Main application. Run `npm run dev`. All tabs, persistence, Export/Import, adaptive build, farming. |
| `DS2_Progression_Engine.jsx` | React | Legacy | Claude artifact. Uses window.storage. No Build/Farming. |
| `DS2_Engine_V4.html` | HTML | Archive | Standalone HTML with 139-level roadmap. |
| `ds2-python.py` | Streamlit | Archive | Python tracker. Saves to ds2_progress.json. |
| `DS2_Dark_Hexer_Build.pdf` | PDF | Archive | Printable build guide. |
| `DS2_SOTFS_ENGINE_CONTEXT.md` | Markdown | **THIS FILE** | Project context for AI agent handoff. |

---

*Last updated: March 2, 2026*
*Game: Dark Souls 2: Scholar of the First Sin (SotFS)*
*Platform: Xbox*
*Build: Dark Melee Hexer, Sorcerer class, SL 151 target*
