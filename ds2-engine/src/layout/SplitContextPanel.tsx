import type { ReactNode } from "react";
import { colors, typography, spacing, radii } from "../theme";

export function SplitContextPanel({
  mainContent,
  rightPanel,
  rightOpen,
  onRightToggle,
  rightPanelTitle,
}: {
  mainContent: ReactNode;
  rightPanel: ReactNode;
  rightOpen: boolean;
  onRightToggle: () => void;
  rightPanelTitle: string;
}) {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: rightOpen ? "1fr minmax(260px, 320px)" : "1fr",
          gap: spacing[6],
          width: "100%",
          maxWidth: 1400,
          margin: "0 auto",
          alignItems: "start",
        }}
      >
        <div style={{ minWidth: 0 }}>{mainContent}</div>
        {rightOpen && (
          <div
            style={{
              position: "sticky",
              top: 100,
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              borderRadius: radii.lg,
              overflow: "hidden",
              maxHeight: "calc(100vh - 120px)",
            }}
          >
            <button
              onClick={onRightToggle}
              style={{
                width: "100%",
                padding: `${spacing[3]}px ${spacing[4]}px`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "none",
                border: "none",
                borderBottom: `1px solid ${colors.border}`,
                color: colors.gold,
                fontSize: typography.size.md,
                fontFamily: typography.fontHeading,
                cursor: "pointer",
                letterSpacing: 1,
              }}
            >
              {rightPanelTitle}
              <span style={{ color: colors.dimText }}>▾</span>
            </button>
            <div style={{ padding: spacing[4], overflowY: "auto", maxHeight: "calc(100vh - 180px)" }}>
              {rightPanel}
            </div>
          </div>
        )}
      </div>
      {!rightOpen && (
        <button
          onClick={onRightToggle}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            padding: `${spacing[2]}px ${spacing[3]}px`,
            background: colors.bgCard,
            border: `1px solid ${colors.border}`,
            borderRight: "none",
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderRadius: radii.md,
            color: colors.dimText,
            fontSize: typography.size.sm,
            fontFamily: typography.fontHeading,
            cursor: "pointer",
          }}
        >
          {rightPanelTitle} ▸
        </button>
      )}
    </div>
  );
}
