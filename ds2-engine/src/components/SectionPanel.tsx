import type { ReactNode } from "react";
import { colors, typography } from "../theme";

export function SectionPanel({
  title,
  badge,
  children,
}: {
  title: string;
  badge?: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        borderBottom: `1px solid ${colors.border}`,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          padding: "8px 12px",
          background: colors.bgCard,
          borderBottom: `1px solid ${colors.border}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: typography.size.md,
          fontFamily: typography.fontHeading,
          color: colors.gold,
          letterSpacing: typography.letterSpacing.normal,
        }}
      >
        <span>{title}</span>
        {badge != null && (
          <span style={{ color: colors.dimText, fontSize: typography.size.sm }}>
            {badge}
          </span>
        )}
      </div>
      <div className="section-panel-content" style={{ padding: "10px 12px 12px" }}>{children}</div>
    </div>
  );
}
