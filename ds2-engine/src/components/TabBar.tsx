import { colors, radii, typography, transition } from "../theme";

export type TabItem<T extends string> = [T, string];

export function TabBar<T extends string>({
  tabs,
  active,
  onChange,
  underline,
}: {
  tabs: TabItem<T>[];
  active: T;
  onChange: (tab: T) => void;
  underline?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: underline ? 0 : 6,
        flexWrap: "wrap",
        ...(underline
          ? { borderBottom: `1px solid ${colors.border}` }
          : {}),
      }}
    >
      {tabs.map(([id, label]) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            style={{
              padding: underline ? "10px 14px" : "8px 12px",
              border: "none",
              borderRadius: underline ? 0 : radii.sm,
              cursor: "pointer",
              fontFamily: typography.fontHeading,
              fontSize: typography.size.base,
              fontWeight: isActive ? 700 : 400,
              background: underline
                ? "transparent"
                : isActive
                  ? colors.gold
                  : "transparent",
              color: isActive ? (underline ? colors.gold : colors.bg) : colors.dimText,
              borderBottom: underline
                ? `2px solid ${isActive ? colors.gold : "transparent"}`
                : undefined,
              transition: `all ${transition.normal}`,
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
