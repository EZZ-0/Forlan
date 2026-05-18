# Areas Tab + Overview Tab — Redesign (Implemented)

This document describes the implemented redesign of the Areas tab and Overview tab in the DS2 Engine.

---

## Areas Tab — Full-Screen Accordion Layout

### What Changed

- **Before:** Two-panel layout (checklist left, sticky details right). Content cramped; hard to view all data at once.
- **After:** Full-screen view with expandable accordion sections. Each section can be collapsed/expanded independently.

### Section Structure

| Section | Content | Data Sources |
|---------|---------|--------------|
| **CHECKLIST** | Core items (item/npc/boss/bonfire/key). Warn items always visible. | `AREAS[areaId].items` |
| **QUESTS** | Quest steps in this area with links to Quests tab. Boss survival items. | `getQuestStepsInArea`, `QUESTS` |
| **SUMMONS** | Boss + NPC list with quest tags (Lucatiel/Benhart). | `AREA_SUMMONS` |
| **SECRETS** | Illusory walls, Pharros lockstone uses, breakable walls in this area. | `ILLUSORY_WALLS`, `PHARROS_KEY_USES`, `BREAKABLE_WALLS` filtered by `areaId` |
| **WEAPONS & BUILD** | Build steps in this area (gear, upgrades, infusion). | `getBuildStepsForArea`, `BUILD_STEPS` |
| **NOTES** | Access, tips, boss tactics, key items, Lucatiel/other warnings. | `AREA_ACCESS`, `AREA_TIPS`, `WARNINGS` |

### Cross-Tab Links

- Quest badges in checklist and quest section → `setSelectedQuest` + `setView("quests")`
- Build section "Full Build →" → `setView("build")`
- Area links from Overview alerts → `setSelectedArea` + `setView("area")`

### Implementation Details

- `AreaSection` component: collapsible header + body. State: `areaSectionsOpen` with keys `checklist`, `quests`, `summons`, `secrets`, `build`, `notes`.
- Default: checklist, quests, summons, build, notes open; secrets closed (only shown when area has secrets).
- Layout: single column, `maxWidth: 800`, centered. Nav (area selector, prev/next) and progress bar retained.

---

## Overview Tab — Alerts, Go-Back, Build Tracker

### What Changed

- **Before:** What's Next, progress %, quest cards, tracker grid, area progress. No alerts, no go-back prompts, no detailed build tracker.
- **After:** Alerts section (Lucatiel warning, go-back prompts, missed items), condensed trackers, dedicated Build & Leveling subsection.

### Alerts Section

| Alert Type | Condition | Action |
|------------|-----------|--------|
| **Lucatiel critical** | Boss survivals < 3 AND `ak5` not checked | Link to Aldia's Keep area |
| **Go-back** | Trigger items checked, action item not checked | Link to action area. Rules from `goBackRules.ts`. |
| **Missed items** | Area has `pct > 0 && pct < 100` | "X items left in [Area]" — link to area |

### Go-Back Rules (Data Layer)

- **File:** `ds2-engine/src/data/goBackRules.ts`
- **Utility:** `getGoBackAlerts(checked)` in `ds2-engine/src/utils/goBackAlerts.ts`
- **Rules implemented:**
  - `lb2` (Dull Ember) → `lb7` (give to McDuff)
  - `fg5` + `fg11` → `fg12` (return to Majula)
  - `uc6` (King's Ring) → `uc8` (return to Agdayne)
  - `sw7` (Najka killed) → `sw8` (return to Tark)

### Condensed Trackers

- Estus, Bone Dust, Gestures, Covenants: compact inline bars (label + X/Y + progress bar).
- Build & Leveling: dedicated card with progress bar, next level (from `useBuildSuggest`), next build step (from `BUILD_STEPS`), "Full Build →" link.

### Build & Leveling Subsection

- Uses `useBuildSuggest(state)` for next suggested SL/stat.
- Uses `buildChecklistStats(checked)` for build progress.
- Shows: Build progress X/Y (Z%), next level (if applicable), next build step (if any), link to Build tab.

---

## Files Created/Modified

| Action | File |
|--------|------|
| Create | `ds2-engine/src/data/goBackRules.ts` |
| Create | `ds2-engine/src/utils/goBackAlerts.ts` |
| Modify | `ds2-engine/src/data/index.ts` (export goBackRules) |
| Modify | `ds2-engine/src/App.tsx` (AreaView refactor, DashboardView refactor) |
| Create | `ds2-engine/docs/AREAS_OVERVIEW_REDESIGN.md` |

---

## Responsive & Polish Notes

- Area view uses `maxWidth: 800`; accordion sections stack naturally on narrow viewports.
- Dashboard grid (`dashboard-grid`) remains 2-column on desktop, 1-column on mobile.
- Keyboard shortcuts: existing `useKeyboard` handles area/quest nav; section expand/collapse is click-only.
- Old `area-two-panel` CSS class is unused but kept for backwards compatibility; can be removed in a future cleanup.
