# DS2 Guide — Multi-Agent Workflow

This project uses a **multi-agent workflow** for large updates. The orchestrator (Cursor/Composer) initiates subagents via `mcp_task` to work on parallel tracks.

## Master Plans

**Hand-written builds (one build per session):** [.cursor/plans/handwritten_builds_execution.plan.md](.cursor/plans/handwritten_builds_execution.plan.md) — tracker: `ds2-engine/src/data/buildTemplates/handwrittenBuildStatus.ts` (3/21 complete).

**Database + UI merge:** [.cursor/plans/ds2_merged_multi_agent_workflow.plan.md](.cursor/plans/ds2_merged_multi_agent_workflow.plan.md)

Merges:
1. **Weapons, Upgrades & Infusion Guides** — Build tab expansion, Arsenal cards, BUILD GEAR
2. **DS2 SotFS Thorough Database** — Illusory walls, breakable walls, Pharros, crystal lizards, missing items

## Agent Tracks

| Track | Agent | Depends On | Output |
|-------|-------|------------|--------|
| A | Database | — | ds2Database.ts (illusory, breakable, Pharros, lizards) |
| B | Build System | — | buildWeapons.ts, upgradeGuide.ts, infusionGuide.ts, buildConnections extended |
| C | Areas Merge | A, B | areas.ts merged with database + buildRef |
| D | UI Integration | B, C | App.tsx (Arsenal, Upgrades, Infusion tabs; BUILD GEAR) |
| E | Docs | A, B, C | Walkthrough + ENGINE_CONTEXT |

## Initiation — Hand-written builds

> **"Hand-write build #3 Destroyer"** or **"Continue handwritten builds plan"**

Uses the A–Z queue in `handwrittenBuildStatus.ts`. One build per session recommended.

## Initiation — Multi-agent merge

To execute the full workflow, say:

> **"Execute the DS2 merged plan"** or **"Run the multi-agent DS2 workflow"**

The orchestrator will:
1. Launch Agent A and Agent B in parallel
2. After both complete → Launch Agent C
3. After C completes → Launch Agent D and Agent E in parallel
4. Verify build and report completion

## Per-Agent Prompts

See Section 5 of the merged plan for copy-paste agent prompts.

## Competitive parity & one-stop shop (Waves 0–5)

**Plan:** [.cursor/plans/ds2_competitive_parity.plan.md](.cursor/plans/ds2_competitive_parity.plan.md)

- **Waves 0–4**: Data, filters, NG/collection, interconnection, full tagging — on **current UI shell**
- **Wave 5**: Full UI rework **after** Wave 4 exit criteria (feature freeze)
- **Product rule (strict)**: Build in-engine equivalents for external planners, wikis, and cheat sheets — see **Capability Parity Register** in plan
- **Governance**: Assess → discuss with user → **`Approve Wave N execution`** or **`Approve CPR-XXX`** — no implementation without approval
- Assessment only: **“Assess Wave N / CPR-XXX”**
- **User decisions (2026-05-19)**: Wave 3 subset sim OK → full DB Wave 6A; full world map Wave 6B; sheet import Wave 2 design + 6C; combat tiers + absorption %; bullet boss tips; timer Wave 6E; strip wiki UI Wave 5

Initiate with: **“Approve Wave N execution”** (N = 0–5) or **“Approve Parity Sprint 6A execution”**.
