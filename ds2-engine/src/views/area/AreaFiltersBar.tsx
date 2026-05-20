import { useState } from "react";
import { colors } from "../../theme";
import {
  ALL_CHECKLIST_CATEGORIES,
  getCategoryLabel,
  type AreaFilterState,
  type AreaViewMode,
  type ChecklistCategory,
  type NgFilter,
} from "../../data/checklistMetadata";

const gold = colors.gold;
const dimText = colors.dimText;
const lightText = colors.lightText;
const bgCard = colors.bgCard;

const VIEW_MODES: { id: AreaViewMode; label: string }[] = [
  { id: "full", label: "Full" },
  { id: "platinum", label: "Platinum" },
  { id: "mainPath", label: "Main path" },
  { id: "custom", label: "Custom" },
];

const NG_OPTIONS: { id: NgFilter; label: string }[] = [
  { id: "all", label: "All cycles" },
  { id: "ng1", label: "NG" },
  { id: "ng2", label: "NG+" },
  { id: "ng2plus", label: "NG++" },
  { id: "any", label: "Any cycle" },
];

export function AreaFiltersBar({
  filters,
  setViewMode,
  toggleHideCompleted,
  setNgFilter,
  toggleCategory,
  clearCategories,
  showLegend,
  onToggleLegend,
  defaultCollapsed = true,
}: {
  filters: AreaFilterState;
  setViewMode: (m: AreaViewMode) => void;
  toggleHideCompleted: () => void;
  setNgFilter: (n: NgFilter) => void;
  toggleCategory: (c: ChecklistCategory) => void;
  clearCategories: () => void;
  showLegend: boolean;
  onToggleLegend: () => void;
  defaultCollapsed?: boolean;
}) {
  const [filtersOpen, setFiltersOpen] = useState(!defaultCollapsed);
  const activeModeLabel = VIEW_MODES.find((m) => m.id === filters.viewMode)?.label ?? "Full";

  if (!filtersOpen) {
    return (
      <div
        className="area-filters-collapsed"
        style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", marginBottom: 10 }}
      >
        <span style={{ fontSize: 10, color: dimText }}>View: {activeModeLabel}</span>
        <Chip active={filters.hideCompleted} onClick={toggleHideCompleted} label="Hide done" />
        <button
          type="button"
          onClick={() => setFiltersOpen(true)}
          style={{
            padding: "4px 10px",
            fontSize: 10,
            background: bgCard,
            border: `1px solid ${gold}44`,
            borderRadius: 8,
            color: gold,
            cursor: "pointer",
          }}
        >
          Filters ▸
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 10 }}>
      <button
        type="button"
        onClick={() => setFiltersOpen(false)}
        style={{
          alignSelf: "flex-start",
          padding: "2px 8px",
          fontSize: 10,
          background: "none",
          border: "none",
          color: dimText,
          cursor: "pointer",
        }}
      >
        Filters ▾
      </button>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
        {VIEW_MODES.map((m) => (
          <Chip
            key={m.id}
            active={filters.viewMode === m.id}
            onClick={() => setViewMode(m.id)}
            label={m.label}
          />
        ))}
        <Chip active={filters.hideCompleted} onClick={toggleHideCompleted} label="Hide done" />
        <button
          type="button"
          onClick={onToggleLegend}
          style={{
            padding: "4px 10px",
            fontSize: 10,
            background: bgCard,
            border: `1px solid ${showLegend ? gold + "55" : "#2a2420"}`,
            borderRadius: 8,
            color: showLegend ? gold : dimText,
            cursor: "pointer",
          }}
        >
          Legend {showLegend ? "▾" : "▸"}
        </button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
        <span style={{ fontSize: 10, color: dimText }}>NG:</span>
        {NG_OPTIONS.map((o) => (
          <Chip key={o.id} active={filters.ngFilter === o.id} onClick={() => setNgFilter(o.id)} label={o.label} small />
        ))}
      </div>
      {filters.viewMode === "custom" && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, alignItems: "center" }}>
          <span style={{ fontSize: 10, color: dimText }}>Categories:</span>
          {ALL_CHECKLIST_CATEGORIES.filter((c) => c !== "warn").map((cat) => (
            <Chip
              key={cat}
              active={filters.categories.includes(cat)}
              onClick={() => toggleCategory(cat)}
              label={getCategoryLabel(cat)}
              small
            />
          ))}
          {filters.categories.length > 0 && (
            <button
              type="button"
              onClick={clearCategories}
              style={{
                fontSize: 10,
                color: dimText,
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Clear
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
  small,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: small ? "3px 8px" : "4px 10px",
        fontSize: small ? 9 : 10,
        background: active ? "rgba(200,160,48,0.18)" : bgCard,
        border: `1px solid ${active ? gold + "55" : "#2a2420"}`,
        borderRadius: 8,
        color: active ? gold : lightText,
        cursor: "pointer",
        fontWeight: active ? 600 : 400,
      }}
    >
      {label}
    </button>
  );
}

export function ChecklistLegend() {
  return (
    <div
      style={{
        fontSize: 10,
        color: dimText,
        lineHeight: 1.6,
        padding: "8px 10px",
        background: "rgba(0,0,0,0.2)",
        borderRadius: 8,
        border: "1px solid #2a2420",
      }}
    >
      <strong style={{ color: gold }}>Path</strong> = main progression ·{" "}
      <strong style={{ color: "#9a8a6a" }}>Opt</strong> = skippable ·{" "}
      <strong style={{ color: "#6a8a9e" }}>Loot</strong> = collectible ·{" "}
      <strong style={{ color: gold }}>Trophy</strong> / <strong style={{ color: warnRed }}>Miss</strong> = platinum-relevant ·{" "}
      Platinum view hides pure loot rows.
    </div>
  );
}

const warnRed = colors.warnRed;
