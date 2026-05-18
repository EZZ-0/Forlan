import type { ReactNode } from "react";
import { colors, radii, shadows } from "../theme";

export function Modal({
  children,
  onBackdropClick,
  maxWidth = 420,
  accentColor = colors.gold,
}: {
  children: ReactNode;
  onBackdropClick?: () => void;
  maxWidth?: number;
  accentColor?: string;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: colors.surfaceOverlay,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 200,
      }}
      onClick={onBackdropClick}
    >
      <div
        style={{
          background: colors.bgCard,
          borderRadius: radii.lg,
          padding: 24,
          maxWidth,
          width: "100%",
          margin: 16,
          border: `1px solid ${accentColor}44`,
          boxShadow: shadows.modal,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
