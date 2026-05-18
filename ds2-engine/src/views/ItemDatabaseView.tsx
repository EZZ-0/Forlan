/**
 * ItemDatabaseView — Full A–Z items database.
 * Shared by Simulator tab and Items tab. Filter by category, search, click for details.
 */

import { useState, useMemo } from "react";
import { getAllItems, searchItems, getItemDetail } from "../data/itemsDatabase";
import type { ItemCategory, ItemDatabaseEntry } from "../data/itemsDatabase";
import { colors, typography, spacing } from "../theme";

const CATEGORY_OPTIONS: { value: ItemCategory | ""; label: string }[] = [
  { value: "", label: "All" },
  { value: "weapon", label: "Weapons" },
  { value: "armor", label: "Armor" },
  { value: "ring", label: "Rings" },
  { value: "shield", label: "Shields" },
  { value: "catalyst", label: "Catalysts" },
  { value: "spell", label: "Spells" },
  { value: "consumable", label: "Consumables" },
  { value: "key", label: "Keys" },
  { value: "material", label: "Materials" },
];

function ItemDetailCard({ item }: { item: ItemDatabaseEntry }) {
  const g = item.guidance;
  const stats = item.stats;
  const effects = item.effects;
  const cost = item.cost;
  const farming = item.farming;
  const subLabel =
    item.subcategory?.weaponClass ??
    item.subcategory?.catalystClass ??
    item.subcategory?.school ??
    item.subcategory?.slot ??
    item.category;

  const vendorSources = g?.sources?.filter((s) => s.type === "vendor" || s.type === "buy") ?? [];
  const hasVendor = item.location?.vendor || vendorSources.length > 0;

  return (
    <div
      style={{
        padding: spacing[3],
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        borderRadius: 8,
        marginTop: spacing[2],
      }}
    >
      <div style={{ fontFamily: typography.fontHeading, fontSize: typography.size.base, color: colors.gold, fontWeight: 600, marginBottom: spacing[2] }}>
        {item.name}
      </div>
      <div style={{ color: colors.dimText, fontSize: typography.size.sm, marginBottom: spacing[2] }}>
        {subLabel}
        {item.weight != null && item.weight > 0 && ` · ${item.weight} units`}
        {item.durability != null && item.durability > 0 && ` · ${item.durability} dur`}
      </div>
      {item.description && (
        <div style={{ color: colors.ember, fontSize: typography.size.sm, marginBottom: spacing[2] }}>
          {item.description}
        </div>
      )}
      {cost && (cost.souls != null || cost.materials || cost.special) && (
        <div style={{ color: colors.ember, fontSize: typography.size.sm, marginBottom: spacing[2] }}>
          {cost.souls != null && <span>{cost.souls} souls</span>}
          {cost.materials && <span style={{ marginLeft: 8 }}>Materials: {cost.materials}</span>}
          {cost.special && <span style={{ marginLeft: 8 }}>Requires: {cost.special}</span>}
        </div>
      )}
      {hasVendor && (
        <div style={{ color: colors.gold, fontSize: typography.size.sm, marginBottom: spacing[2] }}>
          <span style={{ fontWeight: 600 }}>Vendor/NPC: </span>
          {[item.location?.vendor, ...vendorSources.map((s) => `${s.location} — ${s.detail}`)].filter(Boolean).join("; ")}
        </div>
      )}
      {farming?.farmable && (
        <div style={{ color: colors.successGreen, fontSize: typography.size.sm, marginBottom: spacing[2] }}>
          <span style={{ fontWeight: 600 }}>Farmable: </span>
          {farming.enemy && <span>{farming.enemy}</span>}
          {farming.area && <span> ({farming.area})</span>}
          {farming.dropRate && <span> — {farming.dropRate}</span>}
          {farming.method && <span> — {farming.method}</span>}
        </div>
      )}
      {stats &&
        (stats.requirements ||
          stats.damage ||
          (stats.scaling && Object.keys(stats.scaling).length > 0) ||
          stats.resistances ||
          stats.poise != null ||
          stats.stability != null) && (
        <div style={{ color: colors.muted, fontSize: typography.size.sm, marginBottom: spacing[2], display: "flex", flexWrap: "wrap", gap: spacing[2] }}>
          {stats.requirements && Object.keys(stats.requirements).length > 0 && (
            <span>Req: {Object.entries(stats.requirements).map(([k, v]) => `${k.toUpperCase()} ${v}`).join(" / ")}</span>
          )}
          {stats.damage && Object.keys(stats.damage).length > 0 && (
            <span>Dmg: {Object.entries(stats.damage).map(([k, v]) => `${k} ${v}`).join(" ")}</span>
          )}
          {stats.scaling && Object.keys(stats.scaling).length > 0 && (
            <span>Scale: {Object.entries(stats.scaling).map(([k, v]) => `${k.toUpperCase()} ${v}`).join(" ")}</span>
          )}
          {stats.resistances && Object.keys(stats.resistances).length > 0 && (
            <span>Resist: {Object.entries(stats.resistances).map(([k, v]) => `${k} ${v}`).join(" ")}</span>
          )}
          {stats.poise != null && <span>Poise: {stats.poise}</span>}
          {stats.stability != null && <span>Stability: {stats.stability}</span>}
        </div>
      )}
      {effects && Object.keys(effects).length > 0 && (
        <div style={{ color: colors.ember, fontSize: typography.size.sm, marginBottom: spacing[2] }}>
          {Object.entries(effects).map(([k, v]) => `${k}: ${v}`).join(" · ")}
        </div>
      )}
      {!g?.where &&
        !cost?.souls &&
        !cost?.special &&
        !farming?.farmable &&
        !(stats?.damage && Object.keys(stats.damage).length > 0) &&
        !(stats?.resistances && Object.keys(stats.resistances).length > 0) &&
        !(stats?.requirements && Object.keys(stats.requirements).length > 0) &&
        !(stats?.scaling && Object.keys(stats.scaling).length > 0) &&
        !(effects && Object.keys(effects).length > 0) && (
        <div style={{ color: colors.dimText, fontSize: typography.size.sm, fontStyle: "italic", marginTop: spacing[2] }}>
          No location or stats data yet. Data will be added from Fextralife/wiki.
        </div>
      )}
      {g && (
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[2] }}>
          {g.where && (
            <div>
              <div style={{ color: colors.gold, fontWeight: 600, marginBottom: 4, fontSize: typography.size.sm }}>Where</div>
              <div style={{ color: colors.lightText, fontSize: typography.size.sm }}>{g.where}</div>
            </div>
          )}
          {g.howToGetThere && (
            <div>
              <div style={{ color: colors.gold, fontWeight: 600, marginBottom: 4, fontSize: typography.size.sm }}>How to get there</div>
              <div style={{ color: colors.dimText, fontSize: typography.size.sm, whiteSpace: "pre-wrap" }}>{g.howToGetThere}</div>
            </div>
          )}
          {g.sources && g.sources.length > 0 && (
            <div>
              <div style={{ color: colors.gold, fontWeight: 600, marginBottom: 4, fontSize: typography.size.sm }}>Sources</div>
              <div style={{ color: colors.dimText, fontSize: typography.size.sm }}>
                {g.sources.map((s, i) => (
                  <div key={i}>{s.type}: {s.location} — {s.detail}{s.unlock ? ` (${s.unlock})` : ""}</div>
                ))}
              </div>
            </div>
          )}
          {g.warning && (
            <div style={{ color: colors.warnRed, fontSize: typography.size.sm }}>⚠ {g.warning}</div>
          )}
        </div>
      )}
    </div>
  );
}

export function ItemDatabaseView({
  showHeader = true,
  compact = false,
}: {
  showHeader?: boolean;
  compact?: boolean;
}) {
  const [category, setCategory] = useState<ItemCategory | "">("");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const setCategoryAndClear = (c: ItemCategory | "") => {
    setCategory(c);
    setSelectedId(null);
  };

  const items = useMemo(() => {
    const list = search ? searchItems(search, category || undefined) : getAllItems(category || undefined);
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, [category, search]);

  const categoryCounts = useMemo(() => {
    const counts = new Map<ItemCategory | "", number>();
    counts.set("", getAllItems().length);
    for (const opt of CATEGORY_OPTIONS) {
      if (opt.value) counts.set(opt.value, getAllItems(opt.value).length);
    }
    return counts;
  }, []);

  const selectedItem = selectedId && items.some((i) => i.id === selectedId) ? getItemDetail(selectedId) : null;

  return (
    <div
      style={{
        ...(compact ? {} : { borderTop: `1px solid ${colors.border}`, paddingTop: spacing[4], marginTop: spacing[4] }),
      }}
    >
      {showHeader && (
        <div
          style={{
            fontFamily: typography.fontHeading,
            fontSize: typography.size.lg,
            color: colors.gold,
            fontWeight: 600,
            marginBottom: spacing[3],
          }}
        >
          ITEMS DATABASE
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: spacing[2],
          marginBottom: spacing[3],
          alignItems: "center",
        }}
      >
        <select
          value={category}
          onChange={(e) => setCategoryAndClear((e.target.value || "") as ItemCategory | "")}
          style={{
            padding: `${spacing[1]}px ${spacing[2]}px`,
            background: colors.bg,
            color: colors.lightText,
            border: `1px solid ${colors.border}`,
            borderRadius: 6,
            fontSize: typography.size.sm,
            fontFamily: typography.fontBody,
            cursor: "pointer",
          }}
        >
          {CATEGORY_OPTIONS.map((c) => (
            <option key={c.value || "all"} value={c.value}>
              {c.label} ({categoryCounts.get(c.value) ?? 0})
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: `${spacing[1]}px ${spacing[2]}px`,
            background: colors.bg,
            border: `1px solid ${colors.border}`,
            borderRadius: 6,
            color: colors.lightText,
            fontSize: typography.size.sm,
            minWidth: 120,
          }}
        />
      </div>
      <div
        style={{
          maxHeight: compact ? 420 : 420,
          overflowY: "auto",
          display: "flex",
          flexWrap: "wrap",
          gap: spacing[2],
        }}
      >
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
            style={{
              padding: `${spacing[1]}px ${spacing[2]}px`,
              background: selectedId === item.id ? colors.gold : colors.bgCard,
              color: selectedId === item.id ? colors.bg : colors.lightText,
              border: `1px solid ${selectedId === item.id ? colors.gold : colors.border}`,
              borderRadius: 6,
              fontSize: typography.size.sm,
              cursor: "pointer",
              fontFamily: typography.fontBody,
            }}
          >
            {item.name}
          </button>
        ))}
      </div>
      {selectedItem && <ItemDetailCard item={selectedItem} />}
      {items.length === 0 && (
        <div style={{ color: colors.dimText, fontSize: typography.size.sm, padding: spacing[3] }}>
          No items match.
        </div>
      )}
    </div>
  );
}
