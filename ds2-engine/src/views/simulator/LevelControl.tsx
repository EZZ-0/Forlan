/**
 * Level control — Build mode (150 levels from roadmap) or Free mode (+/- stats, no cap).
 * Stats panel above adapts to the stats from this control.
 */

import { colors, typography, spacing } from "../../theme";
import { LEVELS, PHASE_INFO, BASE_STATS } from "../../data/build";
import { BUILD_MAX_SL, FREE_MAX_SL, MAX_STAT } from "../../data/simulator/constants";
import type { StatKey } from "../../data/simulator/types";

const STAT_ORDER: StatKey[] = ["VGR", "END", "VIT", "ATN", "STR", "DEX", "ADP", "INT", "FTH"];

export function LevelControl({
  levelMode,
  buildLevels,
  stats,
  sl,
  levels = LEVELS,
  phaseInfo = PHASE_INFO,
  baseStats = BASE_STATS,
  onToggleBuildLevel,
  onSetBuildLevels,
  onStatChange,
  onLevelModeChange,
}: {
  levelMode: "build" | "free";
  buildLevels: Record<number, boolean>;
  stats: Record<StatKey, number>;
  sl: number;
  levels?: { sl: number; stat: string; value: number; phase: number; note: string }[];
  phaseInfo?: { num: number; name: string; range: string; color: string; areas: string }[];
  baseStats?: Record<string, number>;
  onToggleBuildLevel: (sl: number) => void;
  onSetBuildLevels: (l: Record<number, boolean>) => void;
  onStatChange: (stat: StatKey, delta: number) => void;
  onLevelModeChange: (mode: "build" | "free") => void;
}) {
  const maxSL = levelMode === "build" ? BUILD_MAX_SL : FREE_MAX_SL;

  return (
    <div
      style={{
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        borderRadius: 16,
        padding: spacing[4],
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: spacing[3],
          flexWrap: "wrap",
          gap: spacing[2],
        }}
      >
        <div style={{ fontFamily: typography.fontHeading, fontSize: typography.size.lg, color: colors.gold }}>
          LEVELING
        </div>
        <div style={{ display: "flex", gap: spacing[2] }}>
          <button
            type="button"
            onClick={() => onLevelModeChange("build")}
            style={{
              padding: `${spacing[2]}px ${spacing[3]}px`,
              fontSize: typography.size.sm,
              background: levelMode === "build" ? colors.gold : "transparent",
              color: levelMode === "build" ? colors.bg : colors.dimText,
              border: `1px solid ${levelMode === "build" ? colors.gold : colors.border}`,
              borderRadius: 8,
              cursor: "pointer",
              fontFamily: typography.fontHeading,
            }}
          >
            Build (150)
          </button>
          <button
            type="button"
            onClick={() => onLevelModeChange("free")}
            style={{
              padding: `${spacing[2]}px ${spacing[3]}px`,
              fontSize: typography.size.sm,
              background: levelMode === "free" ? colors.gold : "transparent",
              color: levelMode === "free" ? colors.bg : colors.dimText,
              border: `1px solid ${levelMode === "free" ? colors.gold : colors.border}`,
              borderRadius: 8,
              cursor: "pointer",
              fontFamily: typography.fontHeading,
            }}
          >
            Free (no cap)
          </button>
        </div>
      </div>

      {levelMode === "build" && (
        <>
          <div
            style={{
              display: "flex",
              gap: 4,
              marginBottom: spacing[3],
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={() => onSetBuildLevels({})}
              style={{
                padding: "4px 10px",
                fontSize: 9,
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                borderRadius: 16,
                cursor: "pointer",
                color: colors.warnRed,
                fontFamily: typography.fontHeading,
              }}
            >
              Reset All
            </button>
            {phaseInfo.map((pi) => {
              const pLevels = levels.filter((l) => l.phase === pi.num);
              const pDone = pLevels.filter((l) => buildLevels[l.sl]).length;
              if (pDone >= pLevels.length) return null;
              return (
                <button
                  key={pi.num}
                  type="button"
                  onClick={() => {
                    const next: Record<number, boolean> = { ...buildLevels };
                    pLevels.forEach((l) => (next[l.sl] = true));
                    onSetBuildLevels(next);
                  }}
                  style={{
                    padding: "4px 10px",
                    fontSize: 9,
                    background: colors.bg,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 16,
                    cursor: "pointer",
                    color: pi.color,
                    fontFamily: typography.fontHeading,
                  }}
                >
                  Fill P{pi.num}
                </button>
              );
            })}
          </div>
          <div style={{ maxHeight: 280, overflowY: "auto", display: "grid", gap: 2 }}>
            {levels.map((l) => {
              const done = buildLevels[l.sl];
              const pi = phaseInfo[l.phase - 1];
              return (
                <div
                  key={l.sl}
                  onClick={() => onToggleBuildLevel(l.sl)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: spacing[2],
                    padding: "6px 10px",
                    borderRadius: 12,
                    cursor: "pointer",
                    background: done ? "rgba(107,158,58,0.08)" : "transparent",
                    border: `1px solid ${done ? colors.successGreen + "33" : "transparent"}`,
                  }}
                >
                  <span style={{ width: 36, fontSize: 10, color: colors.dimText }}>SL{l.sl}</span>
                  <span style={{ width: 4, height: 14, borderRadius: 10, background: pi?.color ?? colors.gold }} />
                  <span style={{ width: 32, fontSize: 11, fontWeight: 600 }}>{l.stat}</span>
                  <span style={{ color: colors.dimText, fontSize: 10 }}>→</span>
                  <span style={{ width: 24, fontSize: 11, fontWeight: 600 }}>{l.value}</span>
                  <span style={{ flex: 1, fontSize: 10, color: colors.dimText, overflow: "hidden", textOverflow: "ellipsis" }}>
                    {l.note}
                  </span>
                  <span style={{ color: done ? colors.successGreen : colors.dimText, fontSize: 12 }}>
                    {done ? "✓" : "·"}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}

      {levelMode === "free" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: spacing[2] }}>
          {STAT_ORDER.map((stat) => {
            const val = stats[stat] ?? baseStats[stat] ?? 0;
            return (
              <div
                key={stat}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: spacing[2],
                  padding: spacing[2],
                  background: colors.bg,
                  borderRadius: 8,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <span style={{ fontSize: typography.size.sm, color: colors.gold, minWidth: 36 }}>{stat}</span>
                <button
                  type="button"
                  onClick={() => onStatChange(stat, -1)}
                  disabled={val <= 0}
                  style={{
                    width: 28,
                    height: 28,
                    background: colors.bgCard,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 6,
                    color: colors.lightText,
                    fontSize: 16,
                    cursor: val <= 0 ? "not-allowed" : "pointer",
                    opacity: val <= 0 ? 0.4 : 1,
                  }}
                >
                  −
                </button>
                <span style={{ fontSize: typography.size.base, fontWeight: 600, minWidth: 24, textAlign: "center" }}>
                  {val}
                </span>
                <button
                  type="button"
                  onClick={() => onStatChange(stat, 1)}
                  disabled={val >= MAX_STAT}
                  style={{
                    width: 28,
                    height: 28,
                    background: colors.bgCard,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 6,
                    color: colors.lightText,
                    fontSize: 16,
                    cursor: val >= MAX_STAT ? "not-allowed" : "pointer",
                    opacity: val >= MAX_STAT ? 0.4 : 1,
                  }}
                >
                  +
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div style={{ marginTop: spacing[3], fontSize: typography.size.sm, color: colors.dimText }}>
        SL {sl} / {maxSL}
      </div>
    </div>
  );
}
