import type { ReactNode } from "react";
import { colors, radii, typography } from "../theme";

export function Badge({
  children,
  variant = "default",
  style = {},
}: {
  children: ReactNode;
  variant?: "default" | "success" | "warn" | "ember";
  style?: React.CSSProperties;
}) {
  const variants: Record<string, React.CSSProperties> = {
    default: {
      background: "rgba(0,0,0,0.2)",
      color: colors.dimText,
      border: `1px solid ${colors.border}`,
    },
    success: {
      background: `${colors.successGreen}22`,
      color: colors.successGreen,
      border: `1px solid ${colors.successGreen}33`,
    },
    warn: {
      background: `${colors.warnRed}22`,
      color: colors.warnRed,
      border: `1px solid ${colors.warnRed}44`,
    },
    ember: {
      background: `${colors.ember}22`,
      color: colors.ember,
      border: `1px solid ${colors.ember}35`,
    },
  };

  return (
    <span
      style={{
        padding: "2px 6px",
        borderRadius: radii.lg,
        fontSize: typography.size.sm,
        ...variants[variant],
        ...style,
      }}
    >
      {children}
    </span>
  );
}
