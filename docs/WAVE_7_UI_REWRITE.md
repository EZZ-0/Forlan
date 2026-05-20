# Wave 7 — Areas UI Rewrite (Discussion)

**Status:** Implemented (2026-05-19). Revert: `git revert <wave-7-commit>` or restore classes from `ds2-engine/src/styles/area-layout-legacy.css`.

**Problem (from live UI):** The Areas tab shows **seven competing surfaces** at once: area grid sidebar, filter bar (~6 chip rows + NG cycle), four fixed-height quadrants (Checklist, 100% Guidance, Quests, NPC Summons), and a right rail (Build & Area + Notes). On a typical laptop this forces **nested scrolling inside 340px cells** and makes filters feel like a second header.

Reference screenshot: Iron Keep / Belfry Sol — checklist filters + 2×2 grid + BUILD/NOTES rail.

---

## Design goals

1. **One primary task per screen** — checklist OR guidance OR quests, not all four equally.
2. **Progressive disclosure** — filters collapsed by default; right rail optional.
3. **Readable typography** — 14px body in main column; chips only when filters open.
4. **Preserve parity features** — nothing removed; reorganized (tabs, drawers, focus mode).

---

## Proposed information architecture

```
Areas tab
├── Top bar (unchanged): Checklist | Semi-Fast, area title, progress, Focus
├── Row 1: Area picker (horizontal scroll chips OR collapsible sidebar — user choice)
├── Row 2: Primary workspace (flex 1, min-height 0)
│   └── Tab strip: Checklist | Route guide | Quests | Summons
│       └── Single scrollable panel (full width)
└── Optional right drawer: Build & Area | Notes (collapsed by default, pin open)
```

### Tab mapping (current quadrants → tabs)

| Tab | Current quadrant | Default? |
|-----|------------------|----------|
| Checklist | CHECKLIST + filters | Yes |
| Route guide | 100% GUIDANCE | No |
| Quests | QUESTS | No |
| Summons | NPC SUMMONS | No |

Filters move **inside** Checklist tab as a collapsible “Filters” row (chevron), not above all four panels.

### Focus mode

When Focus ON: hide area picker + right drawer; only Checklist tab + minimal top bar (area name, progress).

---

## Layout sketch (desktop)

```
┌─────────────────────────────────────────────────────────────┐
│ [Checklist] [Semi-Fast]     IRON KEEP          0/16  Focus  │
├──────────┬──────────────────────────────────────────────────┤
│ Area     │ [Checklist][Route][Quests][Summons]              │
│ chips    │ ┌──────────────────────────────────────────────┐ │
│ (collap- │ │ Filters ▾  (collapsed: tier + hide done only) │ │
│ sible)   │ │ □ Threshold Bridge bonfire                   │ │
│          │ │ □ …                                          │ │
│          │ └──────────────────────────────────────────────┘ │
│          │                                    [Build ▸]     │
└──────────┴──────────────────────────────────────────────────┘
```

`[Build ▸]` opens a **slide-over drawer** (320px) with today’s BUILD & AREA + NOTES — same content as current right rail.

---

## CSS / component plan

| Step | Work |
|------|------|
| 1 | Extract `AreaView` from `App.tsx` → `views/area/AreaView.tsx` |
| 2 | Add `AreaWorkspaceTabs.tsx` + state `areaPanel: 'checklist' \| 'guide' \| …` |
| 3 | Replace `.area-quadrants-grid` with single `.area-workspace` |
| 4 | Move `.area-hybrid-layout` right column to `AreaContextDrawer.tsx` |
| 5 | Collapse filters via `AreaFiltersBar` `defaultCollapsed` |
| 6 | Responsive: &lt;900px area chips become horizontal strip above tabs |

Delete or repurpose:

- `grid-template-rows: repeat(3, 340px)` in `App.css`
- Duplicate scroll containers in quadrants

---

## Alternative considered: “Guidance-first”

Some users want route text while checking boxes. **Split view** (optional): Checklist 60% | Route guide 40% when width &gt; 1400px only. Not default — avoids returning to cramped 2×2.

---

## Migration / risk

- **Keyboard shortcuts** (`useKeyboard`) must target active tab panel.
- **Deep links** (`#progress-fg17`) scroll Checklist tab and flash row.
- **Semi-Fast** sub-tab keeps separate area order; tabs content unchanged.

---

## Success metrics

- No quadrant with `overflow-y` until content exceeds **viewport − header** (one outer scroll).
- Filter bar ≤ 48px when collapsed.
- Right build/notes hidden by default; user can pin.

---

## Next step (when approved)

Implement Phase 1 only: tabs + single column + drawer (no redesign of checklist row). Estimated touch: `App.tsx` AreaView block, `App.css`, new `views/area/*` files.
