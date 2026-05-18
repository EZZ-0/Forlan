import { colors, radii, transition } from "../theme";

export function ProgressBar({
  done,
  total,
  color = colors.gold,
  height = 6,
  glow,
}: {
  done: number;
  total: number;
  color?: string;
  height?: number;
  glow?: boolean;
}) {
  return (
    <div
      style={{
        background: colors.border,
        borderRadius: radii.md,
        height,
        overflow: "hidden",
        flex: 1,
      }}
    >
      <div
        style={{
          width: `${total > 0 ? (done / total) * 100 : 0}%`,
          height: "100%",
          background: color,
          borderRadius: radii.md,
          transition: `width ${transition.slow}`,
          boxShadow: glow ? `0 0 10px ${color}40` : undefined,
        }}
      />
    </div>
  );
}
