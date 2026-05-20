import { colors } from "../../theme";
import type { AreaItem } from "../../data/areas";
import { QUESTS } from "../../data/quests";
import { getRowFlags } from "../../data/checklistMetadata";
import { getEffectiveTier } from "../../data/areaProgressTier";
import { getAchievementsForProgressId } from "../../data/achievements";

const gold = colors.gold;
const dimText = colors.dimText;
const lightText = colors.lightText;
const warnRed = colors.warnRed;

const TIER_BADGE: Record<string, { label: string; color: string }> = {
  route: { label: "Path", color: "#6b9e3a" },
  optional: { label: "Opt", color: "#9a8a6a" },
  collectible: { label: "Loot", color: "#6a8a9e" },
};

function typeIconFor(item: AreaItem): string {
  if (item.type === "warn") return "";
  if (item.type === "boss") return "†";
  if (item.type === "npc") return "◉";
  if (item.type === "bonfire") return "⊕";
  if (item.type === "key") return "※";
  return "•";
}

export function ChecklistRow({
  item,
  checked,
  onToggle,
  onQuestClick,
}: {
  item: AreaItem;
  checked: Record<string, boolean>;
  onToggle: (id: string) => void;
  onQuestClick?: (questKey: string) => void;
}) {
  const isWarn = item.type === "warn";
  const typeIcon = typeIconFor(item);

  if (item.subItems?.length) {
    const subDone = item.subItems.filter((s) => checked[s.id]).length;
    const subTotal = item.subItems.length;
    return (
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 13, color: dimText, marginBottom: 6, paddingLeft: 4, lineHeight: 1.6 }}>
          <RowBadges item={item} />
          <span style={{ marginRight: 6 }}>{typeIcon}</span>
          {item.text} <span style={{ fontSize: 12 }}>({subDone}/{subTotal})</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingLeft: 14, borderLeft: "2px solid #2a2420" }}>
          {item.subItems.map((s) => {
            const sDone = checked[s.id];
            return (
              <div
                key={s.id}
                onClick={() => onToggle(s.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 12px",
                  borderRadius: 8,
                  cursor: "pointer",
                  background: sDone ? "rgba(200,160,48,0.06)" : "transparent",
                  opacity: sDone ? 0.7 : 1,
                }}
              >
                <Checkbox done={sDone} />
                <span
                  style={{
                    color: sDone ? dimText : lightText,
                    fontSize: 13,
                    lineHeight: 1.6,
                    textDecoration: sDone ? "line-through" : "none",
                  }}
                >
                  {s.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const itemDone = checked[item.id];
  return (
    <div
      id={`progress-${item.id}`}
      onClick={() => !isWarn && onToggle(item.id)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "10px 14px",
        borderRadius: 10,
        cursor: isWarn ? "default" : "pointer",
        background: isWarn ? "rgba(196,64,64,0.12)" : itemDone ? "rgba(200,160,48,0.06)" : "transparent",
        borderLeft: isWarn ? `3px solid ${warnRed}` : "3px solid transparent",
        opacity: itemDone && !isWarn ? 0.55 : 1,
      }}
    >
      {!isWarn && <Checkbox done={itemDone} />}
      <div style={{ flex: 1 }}>
        <div
          style={{
            color: isWarn ? warnRed : itemDone ? dimText : lightText,
            fontSize: 14,
            lineHeight: 1.65,
            textDecoration: itemDone && !isWarn ? "line-through" : "none",
          }}
        >
          <RowBadges item={item} />
          <span style={{ marginRight: 6 }}>{typeIcon}</span>
          {item.text}
        </div>
        {item.questRef && onQuestClick && <QuestTags item={item} onQuestClick={onQuestClick} />}
      </div>
    </div>
  );
}

function RowBadges({ item }: { item: AreaItem }) {
  const tier = getEffectiveTier(item);
  const flags = getRowFlags(item);
  const tierMeta = TIER_BADGE[tier];
  const achievements = getAchievementsForProgressId(item.id);

  return (
    <span style={{ display: "inline-flex", flexWrap: "wrap", gap: 4, marginRight: 6, verticalAlign: "middle" }}>
      {tierMeta && (
        <span
          style={{
            fontSize: 9,
            padding: "1px 5px",
            borderRadius: 4,
            background: tierMeta.color + "33",
            color: tierMeta.color,
            fontWeight: 600,
          }}
        >
          {tierMeta.label}
        </span>
      )}
      {flags.achievement && <Badge label="Trophy" color={gold} />}
      {flags.missable && <Badge label="Miss" color={warnRed} />}
      {flags.npcKill && <Badge label="NPC" color="#c45" />}
      {flags.routeHint && <Badge label="Hint" color="#8af" />}
      {item.ngCycle && item.ngCycle !== "any" && (
        <Badge label={item.ngCycle.toUpperCase()} color="#a8a" />
      )}
      {achievements.length > 0 && (
        <Badge label="★" color={gold} title={achievements.map((a) => a.name).join(", ")} />
      )}
    </span>
  );
}

function Badge({ label, color, title }: { label: string; color: string; title?: string }) {
  return (
    <span
      title={title}
      style={{
        fontSize: 9,
        padding: "1px 5px",
        borderRadius: 4,
        background: color + "22",
        color,
        fontWeight: 600,
      }}
    >
      {label}
    </span>
  );
}

function Checkbox({ done }: { done: boolean }) {
  return (
    <div
      style={{
        width: 22,
        height: 22,
        borderRadius: 16,
        border: `2px solid ${done ? gold : "#3a342a"}`,
        background: done ? gold : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        marginTop: 1,
      }}
    >
      {done && <span style={{ color: "#0c0b0a", fontSize: 13, fontWeight: 700 }}>✓</span>}
    </div>
  );
}

function QuestTags({
  item,
  onQuestClick,
}: {
  item: AreaItem;
  onQuestClick: (questKey: string) => void;
}) {
  return (
    <div style={{ fontSize: 12, color: dimText, marginTop: 4, display: "flex", gap: 8, flexWrap: "wrap", lineHeight: 1.6 }}>
      {Object.entries(QUESTS).map(([qk, q]) => {
        const step =
          q.steps.find((s) => (s.ref ?? s.id) === item.id) || q.bosses.find((b) => b.ref === item.id);
        if (!step) return null;
        return (
          <span
            key={qk}
            onClick={(e) => {
              e.stopPropagation();
              onQuestClick(qk);
            }}
            style={{
              background: q.color + "22",
              color: q.color,
              padding: "2px 6px",
              borderRadius: 16,
              cursor: "pointer",
            }}
          >
            {q.icon} {q.name.split(" ")[0]}
          </span>
        );
      })}
    </div>
  );
}
