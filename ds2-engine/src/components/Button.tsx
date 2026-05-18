import type { ReactNode } from "react";
import { colors, radii, typography, transition } from "../theme";

type Variant = "primary" | "secondary" | "ghost" | "danger";

export function Button({
  children,
  onClick,
  variant = "secondary",
  disabled,
  small,
  style = {},
  title,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: Variant;
  disabled?: boolean;
  small?: boolean;
  style?: React.CSSProperties;
  title?: string;
}) {
  const base: React.CSSProperties = {
    padding: small ? "4px 8px" : "8px 12px",
    borderRadius: small ? radii.lg : radii.sm,
    border: "none",
    cursor: disabled ? "default" : "pointer",
    fontFamily: typography.fontHeading,
    fontSize: small ? typography.size.sm : typography.size.base,
    fontWeight: 400,
    transition: `all ${transition.normal}`,
    opacity: disabled ? 0.5 : 1,
  };

  const variants: Record<Variant, React.CSSProperties> = {
    primary: {
      background: colors.gold,
      color: colors.bg,
      fontWeight: 700,
    },
    secondary: {
      background: "transparent",
      border: `1px solid ${colors.borderMuted}`,
      color: colors.dimText,
    },
    ghost: {
      background: "none",
      border: "none",
      color: colors.dimText,
    },
    danger: {
      background: colors.warnRed,
      color: colors.lightText,
    },
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      title={title}
      style={{
        ...base,
        ...variants[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
}
