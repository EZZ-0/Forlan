import type { ReactNode } from "react";
import { colors, radii, shadows } from "../theme";

export function Card({
  children,
  padding = 16,
  style = {},
  noBorder,
}: {
  children: ReactNode;
  padding?: number;
  style?: React.CSSProperties;
  noBorder?: boolean;
}) {
  return (
    <div
      style={{
        background: colors.bgCard,
        borderRadius: radii.lg,
        border: noBorder ? "none" : `1px solid ${colors.border}`,
        padding,
        boxShadow: shadows.card,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
