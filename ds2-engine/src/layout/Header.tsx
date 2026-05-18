import { useState, useRef, useEffect } from "react";
import { colors, typography, spacing } from "../theme";
import { Button } from "../components";

export type View =
  | "dashboard"
  | "area"
  | "quests"
  | "trackers"
  | "build"
  | "farm"
  | "items"
  | "enemies"
  | "simulator"
  | "getop";

const MAIN_TABS: [View, string][] = [
  ["dashboard", "Overview"],
  ["area", "Areas"],
  ["quests", "Quests"],
  ["trackers", "Trackers"],
  ["build", "Build"],
  ["farm", "Farming"],
  ["items", "Items"],
  ["enemies", "Enemies"],
  ["simulator", "Simulator"],
  ["getop", "Get OP"],
];

export function Header({
  view,
  setView,
  onExport,
  onImport,
  onReset,
  onShortcuts,
  fileInputRef,
  profiles,
  buildTemplateId,
  setBuildTemplateId,
  buildTemplates,
}: {
  view: View;
  setView: (v: View) => void;
  onExport: () => void;
  onImport: (file: File) => void;
  onReset: () => void;
  onShortcuts: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  profiles?: {
    profiles: { id: string; name: string }[];
    activeProfileId: string | null;
    createProfile: (name?: string) => string;
    switchProfile: (id: string) => void;
    deleteProfile: (id: string) => void;
    renameProfile: (id: string, name: string) => void;
  };
  buildTemplateId?: string;
  setBuildTemplateId?: (id: string) => void;
  buildTemplates?: { id: string; name: string }[];
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [buildOpen, setBuildOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const buildRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (buildRef.current && !buildRef.current.contains(e.target as Node)) setBuildOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const activeProfile = profiles?.profiles.find((p) => p.id === profiles?.activeProfileId);

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #1a1510 0%, #0c0b0a 100%)",
        borderBottom: `1px solid ${colors.border}`,
        padding: `${spacing[4]}px ${spacing[6]}px ${spacing[3]}px`,
        position: "sticky",
        top: 0,
        zIndex: 50,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: spacing[2],
        }}
      >
        <div>
          <div
            style={{
              fontFamily: typography.fontHeading,
              fontSize: typography.size.xl,
              fontWeight: typography.weight.bold,
              color: colors.gold,
              letterSpacing: typography.letterSpacing.wider,
            }}
          >
            DARK SOULS II
          </div>
          <div
            style={{
              fontSize: typography.size.sm,
              color: colors.dimText,
              letterSpacing: typography.letterSpacing.wide,
              fontFamily: typography.fontHeading,
            }}
          >
            SCHOLAR OF THE FIRST SIN — 100% ENGINE
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: spacing[2] }}>
          {profiles && (
            <div ref={profileRef} style={{ position: "relative" }}>
              <button
                onClick={() => setProfileOpen((o) => !o)}
                style={{
                  padding: `${spacing[2]}px ${spacing[3]}px`,
                  background: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 8,
                  color: colors.lightText,
                  fontSize: typography.size.sm,
                  fontFamily: typography.fontHeading,
                  cursor: "pointer",
                }}
              >
                {activeProfile?.name ?? "Run"} ▾
              </button>
              {profileOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    marginTop: 4,
                    minWidth: 180,
                    background: colors.bgCard,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    padding: spacing[2],
                    zIndex: 100,
                  }}
                >
                  {profiles.profiles.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => { profiles.switchProfile(p.id); setProfileOpen(false); }}
                      style={{
                        padding: `${spacing[2]}px ${spacing[3]}px`,
                        cursor: "pointer",
                        color: p.id === profiles.activeProfileId ? colors.gold : colors.lightText,
                        fontSize: typography.size.sm,
                      }}
                    >
                      {p.name}
                    </div>
                  ))}
                  <div
                    onClick={() => { profiles.createProfile(); setProfileOpen(false); }}
                    style={{
                      padding: `${spacing[2]}px ${spacing[3]}px`,
                      cursor: "pointer",
                      color: colors.gold,
                      fontSize: typography.size.sm,
                      borderTop: `1px solid ${colors.border}`,
                      marginTop: spacing[2],
                      paddingTop: spacing[2],
                    }}
                  >
                    + New Run
                  </div>
                </div>
              )}
            </div>
          )}
          {buildTemplates && buildTemplateId && setBuildTemplateId && (
            <div ref={buildRef} style={{ position: "relative" }}>
              <button
                onClick={() => setBuildOpen((o) => !o)}
                style={{
                  padding: `${spacing[2]}px ${spacing[3]}px`,
                  background: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 8,
                  color: colors.lightText,
                  fontSize: typography.size.sm,
                  fontFamily: typography.fontHeading,
                  cursor: "pointer",
                }}
              >
                {buildTemplates.find((b) => b.id === buildTemplateId)?.name ?? "Build"} ▾
              </button>
              {buildOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    marginTop: 4,
                    minWidth: 220,
                    maxHeight: 300,
                    overflowY: "auto",
                    background: colors.bgCard,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    padding: spacing[2],
                    zIndex: 100,
                  }}
                >
                  {buildTemplates.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => { setBuildTemplateId(b.id); setBuildOpen(false); }}
                      style={{
                        padding: `${spacing[2]}px ${spacing[3]}px`,
                        cursor: "pointer",
                        color: b.id === buildTemplateId ? colors.gold : colors.lightText,
                        fontSize: typography.size.sm,
                      }}
                    >
                      {b.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <Button onClick={onExport} variant="secondary" small>
            Export
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            style={{ display: "none" }}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onImport(f);
              e.target.value = "";
            }}
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="secondary"
            small
          >
            Import
          </Button>
          <Button onClick={onReset} variant="secondary" small>
            Reset
          </Button>
          <Button
            onClick={onShortcuts}
            variant="secondary"
            small
            title="Keyboard shortcuts (?)"
          >
            ?
          </Button>
        </div>
      </div>

      {/* Nav — grouped: Progress | Build | Tools */}
      <div
        style={{
          display: "flex",
          gap: spacing[2],
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: typography.size.xs,
            color: colors.muted,
            marginRight: spacing[1],
            letterSpacing: 1,
          }}
        >
          Progress
        </span>
        {MAIN_TABS.slice(0, 4).map(([v, label]) => (
          <NavButton
            key={v}
            active={view === v}
            onClick={() => setView(v)}
            label={label}
          />
        ))}
        <span
          style={{
            fontSize: typography.size.xs,
            color: colors.muted,
            marginLeft: spacing[2],
            marginRight: spacing[1],
            letterSpacing: 1,
          }}
        >
          |
        </span>
        {MAIN_TABS.slice(4, 5).map(([v, label]) => (
          <NavButton
            key={v}
            active={view === v}
            onClick={() => setView(v)}
            label={label}
          />
        ))}
        <span
          style={{
            fontSize: typography.size.xs,
            color: colors.muted,
            marginLeft: spacing[2],
            marginRight: spacing[1],
            letterSpacing: 1,
          }}
        >
          Tools
        </span>
        {MAIN_TABS.slice(5).map(([v, label]) => (
          <NavButton
            key={v}
            active={view === v}
            onClick={() => setView(v)}
            label={label}
          />
        ))}
      </div>
    </div>
  );
}

function NavButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: `${spacing[2]}px ${spacing[3]}px`,
        border: "none",
        borderRadius: 8,
        cursor: "pointer",
        fontFamily: typography.fontHeading,
        fontSize: typography.size.base,
        fontWeight: active ? 700 : 400,
        background: active ? colors.gold : "transparent",
        color: active ? colors.bg : colors.dimText,
        transition: "all 0.2s",
      }}
    >
      {label}
    </button>
  );
}
