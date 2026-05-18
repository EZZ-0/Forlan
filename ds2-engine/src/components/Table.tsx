import type { ReactNode } from "react";
import { colors, typography } from "../theme";

export function Table({
  headers,
  rows,
  renderRow,
}: {
  headers: string[];
  rows: unknown[];
  renderRow: (row: unknown, i: number) => ReactNode;
}) {
  return (
    <div
      style={{
        overflowX: "auto",
        border: `1px solid ${colors.border}`,
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                style={{
                  padding: "10px 12px",
                  textAlign: "left",
                  fontSize: typography.size.sm,
                  fontWeight: 600,
                  color: colors.gold,
                  background: colors.bg,
                  borderBottom: `1px solid ${colors.border}`,
                  fontFamily: typography.fontHeading,
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>{renderRow(row, i)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
