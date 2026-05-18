import type { ReactNode } from "react";
import { colors, radii, typography } from "../theme";

export function Accordion({
  title,
  open,
  onToggle,
  children,
  badge,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
  badge?: string;
}) {
  return (
    <div
      style={{
        background: colors.bgCard,
        borderRadius: radii.lg,
        border: `1px solid ${colors.border}`,
        overflow: "hidden",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          padding: "12px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "none",
          border: "none",
          color: colors.lightText,
          fontSize: typography.size.md,
          fontFamily: typography.fontHeading,
          cursor: "pointer",
          letterSpacing: typography.letterSpacing.normal,
        }}
      >
        <span style={{ color: colors.gold }}>{title}</span>
        {badge && (
          <span style={{ color: colors.dimText, fontSize: typography.size.sm }}>
            {badge}
          </span>
        )}
        <span style={{ color: colors.dimText }}>{open ? "▾" : "▸"}</span>
      </button>
      {open && (
        <div
          style={{
            padding: "12px 16px 16px",
            borderTop: `1px solid ${colors.border}`,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
