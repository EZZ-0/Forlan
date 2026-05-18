import { colors, typography, spacing } from "../../theme";
import type { SimulatorState, ComputedStats, StatKey } from "../../data/simulator/types";

const gold = colors.gold;
const dimText = colors.dimText;
const lightText = colors.lightText;
const ember = colors.ember;

const STAT_LABELS: Record<StatKey, string> = {
  VGR: "Vigor",
  END: "Endurance",
  VIT: "Vitality",
  ATN: "Attunement",
  STR: "Strength",
  DEX: "Dexterity",
  ADP: "Adaptability",
  INT: "Intelligence",
  FTH: "Faith",
};

export function StatPanel({
  state,
  computed,
  sl,
  onStatChange,
}: {
  state: SimulatorState;
  computed: ComputedStats;
  sl: number;
  onStatChange: (stat: StatKey, value: number) => void;
}) {
  const { stats } = state;

  return (
    <div
      style={{
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        borderRadius: 16,
        padding: spacing[4],
        display: "flex",
        flexDirection: "column",
        gap: spacing[4],
      }}
    >
      <div
        style={{
          fontFamily: typography.fontHeading,
          fontSize: typography.size.lg,
          color: gold,
          marginBottom: spacing[2],
        }}
      >
        CHARACTER STATS
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: spacing[2] }}>
        <span style={{ fontSize: typography.size.base, color: dimText }}>SL</span>
        <span style={{ fontSize: typography.size.base, fontWeight: 600, color: gold }}>{sl}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing[2] }}>
        {(Object.keys(STAT_LABELS) as StatKey[]).map((key) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: spacing[2] }}>
            <span style={{ fontSize: typography.size.sm, color: dimText, minWidth: 70 }}>
              {STAT_LABELS[key]}
            </span>
            <input
              type="number"
              value={stats[key] ?? 0}
              onChange={(e) => onStatChange(key, parseInt(e.target.value, 10) || 0)}
              min={0}
              max={99}
              style={{
                width: 44,
                padding: 4,
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                borderRadius: 8,
                color: lightText,
                fontSize: typography.size.sm,
              }}
            />
          </div>
        ))}
      </div>

      <div
        style={{
          borderTop: `1px solid ${colors.border}`,
          paddingTop: spacing[4],
          display: "flex",
          flexDirection: "column",
          gap: spacing[2],
        }}
      >
        <div style={{ fontFamily: typography.fontHeading, fontSize: typography.size.md, color: gold }}>
          DERIVED
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing[2], fontSize: typography.size.sm }}>
          <div><span style={{ color: dimText }}>HP</span> <span style={{ color: lightText }}>{computed.hp}</span></div>
          <div><span style={{ color: dimText }}>Stamina</span> <span style={{ color: lightText }}>{computed.stamina}</span></div>
          <div><span style={{ color: dimText }}>Equip Load</span> <span style={{ color: lightText }}>{computed.equipLoad}</span></div>
          <div><span style={{ color: dimText }}>Equip %</span> <span style={{ color: lightText }}>{computed.equipLoadPct.toFixed(1)}%</span></div>
          <div><span style={{ color: dimText }}>Roll</span> <span style={{ color: ember }}>{computed.rollType}</span></div>
          <div><span style={{ color: dimText }}>Agility</span> <span style={{ color: lightText }}>{computed.agility}</span></div>
          <div><span style={{ color: dimText }}>Roll i-frames</span> <span style={{ color: lightText }}>{computed.rollIframes}</span></div>
          <div><span style={{ color: dimText }}>Backstep i-frames</span> <span style={{ color: lightText }}>{computed.backstepIframes}</span></div>
          <div><span style={{ color: dimText }}>Item speed</span> <span style={{ color: lightText }}>{(computed.itemUseSpeed * 100).toFixed(0)}%</span></div>
          <div><span style={{ color: dimText }}>Poise</span> <span style={{ color: lightText }}>{computed.poise}</span></div>
        </div>
      </div>

      <div style={{ fontSize: typography.size.sm }}>
        <div style={{ color: gold, marginBottom: spacing[2] }}>RESISTANCES</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: spacing[3] }}>
          <span style={{ color: dimText }}>Phys {computed.resistances.physical}</span>
          <span style={{ color: dimText }}>Mag {computed.resistances.magic}</span>
          <span style={{ color: dimText }}>Fire {computed.resistances.fire}</span>
          <span style={{ color: dimText }}>Lit {computed.resistances.lightning}</span>
          <span style={{ color: dimText }}>Dark {computed.resistances.dark}</span>
        </div>
      </div>

      {(computed.weaponAR?.r1 || computed.weaponAR?.r2 || computed.weaponAR?.l1 || computed.weaponAR?.l2) && (
        <div style={{ fontSize: typography.size.sm }}>
          <div style={{ color: gold, marginBottom: spacing[2] }}>WEAPON AR</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {(["r1", "r2", "l1", "l2"] as const).map((slot) => {
              const ar = computed.weaponAR?.[slot];
              if (!ar || ar === null) return null;
              const parts: (string | number)[] = [ar.physical];
              if (ar.magic != null) parts.push(`Mag ${ar.magic}`);
              if (ar.fire != null) parts.push(`Fire ${ar.fire}`);
              if (ar.lightning != null) parts.push(`Lit ${ar.lightning}`);
              if (ar.dark != null) parts.push(`Dark ${ar.dark}`);
              return (
                <div key={slot} style={{ color: lightText }}>
                  {slot.toUpperCase()}: {parts.join(" / ")}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
