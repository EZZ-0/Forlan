export type AreaWorkspacePanel =
  | "checklist"
  | "guide"
  | "quests"
  | "summons"
  | "secrets"
  | "build";

const TABS: { id: AreaWorkspacePanel; label: string }[] = [
  { id: "checklist", label: "Checklist" },
  { id: "guide", label: "Route guide" },
  { id: "quests", label: "Quests" },
  { id: "summons", label: "Summons" },
  { id: "secrets", label: "Secrets" },
  { id: "build", label: "Build" },
];

export function AreaWorkspaceTabs({
  active,
  onChange,
  badges,
  hidden = [],
}: {
  active: AreaWorkspacePanel;
  onChange: (p: AreaWorkspacePanel) => void;
  badges?: Partial<Record<AreaWorkspacePanel, string>>;
  hidden?: AreaWorkspacePanel[];
}) {
  const visible = TABS.filter((t) => !hidden.includes(t.id));

  return (
    <div className="area-workspace-tabs" role="tablist" aria-label="Area panels">
      {visible.map((tab) => {
        const selected = active === tab.id;
        const badge = badges?.[tab.id];
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(tab.id)}
            className={`area-workspace-tab${selected ? " area-workspace-tab--active" : ""}`}
          >
            {tab.label}
            {badge ? <span className="area-workspace-tab-badge">{badge}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
