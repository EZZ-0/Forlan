import { colors, typography } from "../theme";
import type { AreaBulkMarkGroup } from "../data/areaProgress";

const dimText = colors.dimText;
const lightText = colors.lightText;

export function AreaBulkMarkButtons({
  groups,
  onMark,
  onClear,
  compact,
}: {
  groups: AreaBulkMarkGroup[];
  onMark: (ids: string[]) => void;
  onClear: (ids: string[]) => void;
  compact?: boolean;
}) {
  if (groups.length === 0) return null;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: compact ? 4 : 6,
        marginBottom: compact ? 0 : 10,
      }}
    >
      {groups.map((g) => (
        <div
          key={g.label}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: compact ? "2px 4px" : "3px 6px",
            background: "rgba(0,0,0,0.2)",
            borderRadius: 8,
            border: "1px solid #2a2420",
          }}
        >
          {!compact && (
            <span style={{ fontSize: 9, color: dimText, paddingLeft: 4 }}>{g.label}</span>
          )}
          <button
            type="button"
            title={`${g.markLabel} (${g.ids.length})`}
            onClick={(e) => {
              e.stopPropagation();
              onMark(g.ids);
            }}
            style={btnStyle}
          >
            {g.markLabel}
          </button>
          <button
            type="button"
            title={`${g.clearLabel} (${g.ids.length})`}
            onClick={(e) => {
              e.stopPropagation();
              onClear(g.ids);
            }}
            style={{ ...btnStyle, color: dimText }}
          >
            {g.clearLabel}
          </button>
        </div>
      ))}
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  padding: "3px 8px",
  fontSize: 9,
  fontFamily: typography.fontBody,
  background: "transparent",
  border: "none",
  color: lightText,
  cursor: "pointer",
  textDecoration: "underline",
  textUnderlineOffset: 2,
};
