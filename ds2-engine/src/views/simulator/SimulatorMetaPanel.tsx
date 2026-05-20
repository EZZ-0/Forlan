import { colors, typography, spacing } from "../../theme";
import {
  computeAgilityInvestment,
  getRollIframes,
  getItemUseSpeedMultiplier,
  investmentToDisplayAGI,
} from "../../data/simulator/formulas/agility";
import { estimateSoulMemoryFromSl, getSoulMemoryBand } from "../../data/simulator/soulMemory";
import type { StatKey } from "../../data/simulator/types";

export function SimulatorMetaPanel({ stats, sl }: { stats: Record<StatKey, number>; sl: number }) {
  const adp = stats.ADP ?? 0;
  const atn = stats.ATN ?? 0;
  const agiInv = computeAgilityInvestment(adp, atn);
  const displayAgi = investmentToDisplayAGI(agiInv);
  const rollFrames = getRollIframes(agiInv);
  const estusSpeed = getItemUseSpeedMultiplier(displayAgi);
  const sm = estimateSoulMemoryFromSl(sl);
  const band = getSoulMemoryBand(sm);

  return (
    <div
      style={{
        padding: spacing[3],
        background: "rgba(0,0,0,0.25)",
        border: `1px solid ${colors.border}`,
        borderRadius: 12,
        fontSize: typography.size.sm,
        color: colors.lightText,
        lineHeight: 1.6,
      }}
    >
      <div style={{ color: colors.gold, fontWeight: 600, marginBottom: 6 }}>Agility & co-op</div>
      <div>AGI investment: {agiInv} (display ~{displayAgi})</div>
      <div>Roll i-frames: {rollFrames}</div>
      <div>Estus/item speed: {(estusSpeed * 100).toFixed(0)}%</div>
      <div style={{ marginTop: 8 }}>
        Soul Memory (est.): {sm.toLocaleString()} — {band.label}
      </div>
      <div style={{ fontSize: typography.size.xs, color: colors.dimText, marginTop: 4 }}>
        SM is approximate from SL; damage formulas may differ slightly from in-game values.
      </div>
    </div>
  );
}

