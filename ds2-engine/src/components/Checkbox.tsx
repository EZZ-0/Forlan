import { colors, radii, transition } from "../theme";

export function Checkbox({
  checked,
  onChange,
  size = 20,
  color = colors.gold,
  disabled,
}: {
  checked: boolean;
  onChange: () => void;
  size?: number;
  color?: string;
  disabled?: boolean;
}) {
  return (
    <div
      role="checkbox"
      aria-checked={checked}
      tabIndex={disabled ? -1 : 0}
      onClick={disabled ? undefined : onChange}
      onKeyDown={(e) => {
        if (!disabled && (e.key === " " || e.key === "Enter")) {
          e.preventDefault();
          onChange();
        }
      }}
      style={{
        width: size,
        height: size,
        borderRadius: radii.full,
        border: `2px solid ${checked ? color : colors.borderMuted}`,
        background: checked ? color : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        cursor: disabled ? "default" : "pointer",
        transition: `all ${transition.fast}`,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {checked && (
        <span
          style={{
            color: colors.bg,
            fontSize: size * 0.55,
            fontWeight: 700,
          }}
        >
          ✓
        </span>
      )}
    </div>
  );
}
