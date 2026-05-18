/**
 * ItemTooltip — DS2-style hover tooltip for items.
 * Shows name, category, stats, where, howToGetThere.
 */

import type { ReactNode } from "react";
import type { ItemDatabaseEntry } from "../data/itemsDatabase";
import { colors, typography, spacing, radii, shadows } from "../theme";

export function ItemTooltip({
  item,
  children,
}: {
  item: ItemDatabaseEntry;
  children: ReactNode;
}) {
  const g = item.guidance;
  const stats = item.stats;

  return (
    <div
      className="item-tooltip-wrapper"
      style={{
        position: "relative",
        display: "inline-block",
      }}
    >
      <style>{`
        .item-tooltip-wrapper:hover .item-tooltip-popup { opacity: 1; visibility: visible; }
      `}</style>
      {children}
      <div
        className="item-tooltip-popup"
        style={{
          position: "absolute",
          left: "50%",
          bottom: "100%",
          transform: "translateX(-50%) translateY(-8px)",
          minWidth: 260,
          maxWidth: 320,
          padding: spacing[3],
          background: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: radii.md,
          boxShadow: shadows.modal,
          zIndex: 1000,
          pointerEvents: "none",
          fontFamily: typography.fontBody,
          fontSize: typography.size.sm,
          color: colors.lightText,
          whiteSpace: "pre-wrap",
          opacity: 0,
          visibility: "hidden",
          transition: "opacity 0.15s, visibility 0.15s",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[2] }}>
          <div style={{ fontFamily: typography.fontHeading, fontSize: typography.size.base, color: colors.gold, fontWeight: 600 }}>
            {item.name}
          </div>
          <div style={{ color: colors.dimText, fontSize: typography.size.xs }}>
            {item.subcategory?.weaponClass ?? item.category}
            {item.weight != null && ` · ${item.weight} units`}
          </div>
          {stats && (
            <div style={{ color: colors.muted, fontSize: typography.size.xs }}>
              {stats.requirements && (
                <span>Req: {Object.entries(stats.requirements).map(([k, v]) => `${k.toUpperCase()} ${v}`).join(" / ")}</span>
              )}
              {stats.damage && (
                <span style={{ marginLeft: 8 }}>
                  {Object.entries(stats.damage).map(([k, v]) => `${k} ${v}`).join(" ")}
                </span>
              )}
            </div>
          )}
          {g && (
            <>
              <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: spacing[2], marginTop: spacing[1] }}>
                <div style={{ color: colors.gold, fontWeight: 600, marginBottom: 4 }}>Where</div>
                <div style={{ color: colors.lightText }}>{g.where}</div>
              </div>
              {g.howToGetThere && (
                <div>
                  <div style={{ color: colors.gold, fontWeight: 600, marginBottom: 4 }}>How to get there</div>
                  <div style={{ color: colors.dimText, maxHeight: 120, overflow: "auto" }}>{g.howToGetThere}</div>
                </div>
              )}
              {g.warning && (
                <div style={{ color: colors.warnRed, fontSize: typography.size.xs }}>⚠ {g.warning}</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
