# DS2 Guide — Multi-Agent Workflow

This project uses a **multi-agent workflow** for large updates. The orchestrator (Cursor/Composer) initiates subagents via `mcp_task` to work on parallel tracks.

## Master Plan

**[.cursor/plans/ds2_merged_multi_agent_workflow.plan.md](.cursor/plans/ds2_merged_multi_agent_workflow.plan.md)**

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

## Initiation

To execute the full workflow, say:

> **"Execute the DS2 merged plan"** or **"Run the multi-agent DS2 workflow"**

The orchestrator will:
1. Launch Agent A and Agent B in parallel
2. After both complete → Launch Agent C
3. After C completes → Launch Agent D and Agent E in parallel
4. Verify build and report completion

## Per-Agent Prompts

See Section 5 of the merged plan for copy-paste agent prompts.
