/**
 * Simulator View — Main build tab style.
 * Equipment + Stats (adaptive to level control) + Leveling below.
 * Ready for full data expansion.
 */

import { colors, typography, spacing } from "../theme";
import { useSimulator } from "../hooks/useSimulator";
import { getBuildTemplate, DEFAULT_BUILD_TEMPLATE_ID } from "../data/buildTemplates";
import { EquipmentPanel } from "./simulator/EquipmentPanel";
import { StatPanel } from "./simulator/StatPanel";
import { LevelControl } from "./simulator/LevelControl";
import { ItemDatabasePanel } from "./simulator/ItemDatabasePanel";
import { ProgressBar } from "../components";
import { BUILD_MAX_SL, FREE_MAX_SL } from "../data/simulator/constants";
import type { StatKey } from "../data/simulator/types";

export function SimulatorView({
  profileId,
  buildTemplateId = DEFAULT_BUILD_TEMPLATE_ID,
  checked,
  buildLevels,
  toggleBuildLevel,
  setBuildLevels,
}: {
  profileId: string | null;
  buildTemplateId?: string;
  checked: Record<string, boolean>;
  buildLevels: Record<number, boolean>;
  toggleBuildLevel: (sl: number) => void;
  setBuildLevels: (l: Record<number, boolean>) => void;
}) {
  const template = getBuildTemplate(buildTemplateId);
  const levels = template?.levels ?? [];

  const {
    state,
    effectiveState,
    computed,
    setEquipped,
    setStats,
    setSandboxMode,
    setWeaponUpgrade,
    setWeaponInfusion,
    setLevelMode,
    getAvailableItems,
    loadFromBuild,
    getItemById,
  } = useSimulator(profileId, checked, buildLevels, buildTemplateId);

  const maxSL = state.levelMode === "build" ? BUILD_MAX_SL : FREE_MAX_SL;
  const levelsCompleted = state.levelMode === "build"
    ? levels.filter((l) => buildLevels[l.sl]).length
    : effectiveState.sl - 11;

  return (
    <div
      style={{
        padding: spacing[4],
        display: "flex",
        flexDirection: "column",
        gap: spacing[4],
      }}
    >
      {/* Header — Build tab style */}
      <div
        style={{
          textAlign: "center",
          paddingBottom: spacing[4],
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <div style={{ fontFamily: typography.fontHeading, fontSize: typography.size.xl, color: colors.gold, fontWeight: 700 }}>
          BUILD SIMULATOR
        </div>
        <div style={{ fontSize: typography.size.sm, color: colors.dimText, marginTop: 4 }}>
          Equipment · Stats · Leveling — Level by level, all infusions
        </div>
        <div style={{ marginTop: spacing[3], fontSize: typography.size.lg, color: colors.gold, fontFamily: typography.fontHeading }}>
          SL {effectiveState.sl} / {maxSL}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "8px 12px",
            marginTop: spacing[2],
            padding: `${spacing[2]}px ${spacing[3]}px`,
            background: "rgba(0,0,0,0.2)",
            borderRadius: 10,
            maxWidth: 400,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {(["VGR", "END", "VIT", "ATN", "STR", "DEX", "ADP", "INT", "FTH"] as StatKey[]).map((stat) => (
            <span key={stat} style={{ fontSize: typography.size.sm, color: colors.lightText }}>
              <span style={{ color: colors.gold }}>{stat}</span> {effectiveState.stats[stat] ?? 0}
            </span>
          ))}
        </div>
        <div style={{ maxWidth: 220, margin: `${spacing[2]}px auto 0` }}>
          <ProgressBar done={levelsCompleted} total={state.levelMode === "build" ? levels.length : maxSL - 11} height={6} />
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: spacing[3] }}>
        <label style={{ display: "flex", alignItems: "center", gap: spacing[2], cursor: "pointer", fontSize: typography.size.base, color: colors.lightText }}>
          <input type="checkbox" checked={state.sandboxMode} onChange={(e) => setSandboxMode(e.target.checked)} />
          Sandbox (all items)
        </label>
        <button
          type="button"
          onClick={loadFromBuild}
          style={{
            padding: `${spacing[2]}px ${spacing[3]}px`,
            background: colors.gold,
            border: "none",
            borderRadius: 8,
            color: colors.bg,
            fontFamily: typography.fontHeading,
            fontSize: typography.size.base,
            cursor: "pointer",
          }}
        >
          Load from Build
        </button>
      </div>

      {/* Main: Equipment + Stats */}
      <div
        className="simulator-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing[4] }}
      >
        <EquipmentPanel
          equipped={state.equipped}
          weaponUpgrade={state.weaponUpgrade}
          weaponInfusion={state.weaponInfusion}
          getAvailableItems={getAvailableItems}
          getItemById={getItemById}
          onEquip={setEquipped}
          onWeaponUpgrade={setWeaponUpgrade}
          onWeaponInfusion={setWeaponInfusion}
        />
        <StatPanel
          state={effectiveState}
          computed={computed}
          sl={effectiveState.sl}
          onStatChange={(stat, value) => {
            if (state.levelMode === "build") {
              setLevelMode("free");
              setStats({ ...effectiveState.stats, [stat]: value });
            } else {
              setStats({ [stat]: value });
            }
          }}
        />
      </div>

      {/* Leveling — below, adaptive */}
      <LevelControl
        levelMode={state.levelMode}
        buildLevels={buildLevels}
        stats={state.stats}
        sl={effectiveState.sl}
        levels={levels}
        phaseInfo={template?.phaseInfo ?? []}
        baseStats={template?.baseStats}
        onToggleBuildLevel={toggleBuildLevel}
        onSetBuildLevels={setBuildLevels}
        onStatChange={(stat, delta) => {
          setStats((prev) => {
            const v = (prev[stat] ?? 0) + delta;
            return { [stat]: Math.max(0, Math.min(99, v)) };
          });
        }}
        onLevelModeChange={setLevelMode}
      />

      {/* Items Database — A–Z with hover tooltips */}
      <ItemDatabasePanel />
    </div>
  );
}
