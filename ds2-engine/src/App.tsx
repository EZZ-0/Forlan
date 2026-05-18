import { useState, useRef, useEffect, useMemo } from "react";
import "./App.css";
import { useProfiles } from "./hooks/useProfiles";
import { useProgress } from "./hooks/useProgress";
import { useKeyboard } from "./hooks/useKeyboard";
import { useBuildSuggest } from "./hooks/useBuildSuggest";
import { computeStats, areaCompletion, areaCompletionFromItems } from "./utils/stats";
import { AppLayout, SplitContextPanel, BuildContextPanel, AreaContextPanel } from "./layout";
import { ProgressBar, Modal, Button, SectionPanel } from "./components";
import { colors, typography } from "./theme";
import { countCompletedLevels } from "./utils/buildProgress";
import { STARTING_SL } from "./data/buildTemplates/levelGenerator";
import {
  AREA_ORDER,
  getArea,
  WARNINGS,
  QUESTS,
  LEVELS,
  PHASE_INFO,
  INFUSION_UNLOCK,
  UPGRADE_TIERS,
  INFUSION_UNLOCK_STEPS,
  BUILD_INFUSIONS,
  INFUSION_STONES,
  DYNA_TILLO_TRADE,
  PALESTONE_NOTE,
  BUILD_ITEMS,
  BUILD_MATERIAL_FARMS,
  SOUL_FARM_RUNS,
  TITANITE_SOURCES,
  SOUL_GEAR,
  ITEM_DISC_GEAR,
  FARM_MECHANICS,
  AREA_TIPS,
  AREA_ACCESS,
  getAreaNotes,
  AREA_SUMMONS,
  BOSS_SOULS,
  GIANT_SOUL_DISCLAIMER,
  getBossSoulTradeDetails,
  getBuildStepsForArea,
  buildChecklistStats,
  getBuildTemplate,
  getAllBuildTemplates,
  getMaterialFarmSpots,
  getMaterialNames,
  BUILD_STEPS,
  isBossSoulRelevantForBuild,
  PHARROS_KEY_USES,
  PHARROS_LOCATIONS,
  DOORS_OF_PHARROS_CONTRAPTIONS,
  ILLUSORY_WALLS,
  BREAKABLE_WALLS,
  CRYSTAL_LIZARDS,
  AREAS_WITH_100_GUIDANCE,
  getItemDetail,
  ENEMY_WEAKNESSES,
  ELEMENTAL_BUFFS,
  getEnemyDropsFiltered,
  SHOP_UNLOCKS,
  getShopUnlocksForArea,
} from "./data";
import {
  getSkimmedKey,
  SEMI_FAST_AREA_ORDER,
  getSemiFastItems,
  isAreaUnlocked,
} from "./data/areaDependencies";
import { ENEMY_DROPS } from "./data/enemyDrops";
import type { UnlockConditionType } from "./data";
import { getQuestStepsInArea } from "./utils/questArea";
import { getGoBackAlerts } from "./utils/goBackAlerts";
import type { AreaId } from "./data/areas";
import { TrackersView, SimulatorView, ItemDatabaseView, GetOpView } from "./views";

const bg = colors.bg;
const bgCard = colors.bgCard;
const gold = colors.gold;
const ember = colors.ember;
const dimText = colors.dimText;
const lightText = colors.lightText;
const warnRed = colors.warnRed;
const successGreen = colors.successGreen;

type View = "dashboard" | "area" | "quests" | "trackers" | "build" | "farm" | "items" | "enemies" | "simulator" | "getop";

export default function App() {
  const profiles = useProfiles();
  const activeProfileId = profiles.activeProfileId;
  const {
    state,
    loaded,
    toggle,
    toggleBuildLevel,
    setBuildLevels,
    setBuildTemplateId,
    exportProgress,
    importProgress,
    resetAll,
    buildTemplateId,
    activeBuildLevels,
  } = useProgress(activeProfileId);
  const buildTemplate = getBuildTemplate(buildTemplateId);
  const buildSteps = buildTemplate?.buildSteps;

  const [view, setView] = useState<View>("dashboard");
  const [selectedArea, setSelectedArea] = useState<AreaId | null>(null);
  const [selectedQuest, setSelectedQuest] = useState<string | null>(null);
  const [showReset, setShowReset] = useState(false);
  const [farmSub, setFarmSub] = useState<"spots" | "materials" | "gear" | "mechanics" | "build-farming">("spots");
  const [materialFilter, setMaterialFilter] = useState("");
  const [farmBestOnly, setFarmBestOnly] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [buildOpenSub, setBuildOpenSub] = useState<"roadmap" | "checklist" | "equip" | "info" | "farming" | null>(null);
  const [enemiesSub, setEnemiesSub] = useState<"weaknesses" | "buffs" | "drops">("weaknesses");
  const [buildContextOpen, setBuildContextOpen] = useState(true);
  const [areaContextOpen, setAreaContextOpen] = useState(true);
  const [areaFocusMode, setAreaFocusMode] = useState(false);
  const [itemsOpenSub, setItemsOpenSub] = useState<"shop_unlocks" | null>(null);
  const [getOpSub, setGetOpSub] = useState<"paths" | "builds" | "duping" | "leveling" | "videos">("paths");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const buildSuggest = useBuildSuggest(state);

  useKeyboard({
    setView,
    setSelectedArea,
    setSelectedQuest,
    setShowReset,
    setFocusMode,
    setAreaFocusMode,
    exportProgress,
    view,
    selectedArea,
    selectedQuest,
    questKeys: Object.keys(QUESTS),
    showReset,
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "?" && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        setShowShortcuts((s) => !s);
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const stats = computeStats(state);
  const { checked } = state;

  if (!profiles.loaded || !loaded) {
    return (
      <div
        style={{
          background: bg,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="loading-kindle"
          style={{
            color: gold,
            fontFamily: typography.fontHeading,
            fontSize: typography.size["2xl"],
          }}
        >
          Kindling the bonfire...
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700&family=EB+Garamond:wght@400;600&display=swap');
        @keyframes milestonePulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
      `}</style>

      <AppLayout
        view={view}
        setView={setView}
        onExport={exportProgress}
        onImport={importProgress}
        onReset={() => setShowReset(true)}
        onShortcuts={() => setShowShortcuts((s) => !s)}
        fileInputRef={fileInputRef}
        profiles={profiles}
        buildTemplateId={buildTemplateId}
        setBuildTemplateId={setBuildTemplateId}
        buildTemplates={getAllBuildTemplates()}
      >
        {view === "dashboard" && (
          <DashboardView
            state={state}
            stats={stats}
            checked={checked}
            buildStats={buildChecklistStats(checked, buildSteps)}
            buildSteps={buildSteps}
            buildTemplate={buildTemplate}
            setView={setView}
            setSelectedArea={setSelectedArea}
            setSelectedQuest={setSelectedQuest}
            areaCompletion={(id) => areaCompletion(id, checked)}
            focusMode={focusMode}
            setFocusMode={setFocusMode}
          />
        )}
        {view === "area" && (
          <SplitContextPanel
            mainContent={
              <AreaView
                selectedArea={selectedArea ?? AREA_ORDER[0]}
                setSelectedArea={setSelectedArea}
                setView={setView}
                setSelectedQuest={setSelectedQuest}
                checked={checked}
                toggle={toggle}
                lucBossSurvivals={
                  ["nm7", "sr4", "ik7", "bg8", "d311"].filter((id) => checked[id])
                    .length
                }
                openBuildChecklist={() => { setBuildOpenSub("checklist"); setView("build"); }}
                buildSteps={buildSteps}
                areaFocusMode={areaFocusMode}
                setAreaFocusMode={setAreaFocusMode}
              />
            }
            rightPanel={
              <AreaRightFloatingPanels
                selectedArea={selectedArea ?? AREA_ORDER[0]}
                checked={checked}
                setView={setView}
                buildSuggest={buildSuggest}
                buildStats={buildChecklistStats(checked, buildSteps)}
                onOpenBuild={() => { setBuildOpenSub("roadmap"); setView("build"); }}
                buildSteps={buildSteps}
                openBuildFarming={() => { setBuildOpenSub("farming"); setView("build"); }}
                lucBossSurvivals={["nm7", "sr4", "ik7", "bg8", "d311"].filter((id) => checked[id]).length}
              />
            }
            rightOpen={buildContextOpen}
            onRightToggle={() => setBuildContextOpen((o) => !o)}
            rightPanelTitle="BUILD & AREA"
          />
        )}
        {view === "quests" && (
          <QuestsView
            selectedQuest={selectedQuest}
            setSelectedQuest={setSelectedQuest}
            setView={setView}
            setSelectedArea={setSelectedArea}
            checked={checked}
            toggle={toggle}
            stats={stats}
          />
        )}
        {view === "trackers" && (
          <TrackersView checked={checked} toggle={toggle} stats={stats} />
        )}
        {view === "build" && (
          <SplitContextPanel
            mainContent={
              <BuildView
                state={state}
                buildLevels={activeBuildLevels}
                buildTemplateId={buildTemplateId}
                setBuildTemplateId={setBuildTemplateId}
                buildTemplates={getAllBuildTemplates()}
                toggleBuildLevel={toggleBuildLevel}
                setBuildLevels={setBuildLevels}
                checked={checked}
                toggle={toggle}
                setView={setView}
                setSelectedArea={setSelectedArea}
                openSub={buildOpenSub}
                onOpenSubHandled={() => setBuildOpenSub(null)}
                onOpenShopUnlocks={() => { setItemsOpenSub("shop_unlocks"); setView("items"); }}
                buildTemplate={buildTemplate}
              />
            }
            rightPanel={
              <AreaContextPanel
                selectedArea={selectedArea ?? AREA_ORDER[0]}
                getArea={getArea}
                areaCompletion={(id) => areaCompletion(id, checked)}
                onOpenArea={(a) => { setSelectedArea(a); setView("area"); }}
              />
            }
            rightOpen={areaContextOpen}
            onRightToggle={() => setAreaContextOpen((o) => !o)}
            rightPanelTitle="AREA"
          />
        )}
        {view === "items" && (
          <ItemsView
            setView={setView}
            setSelectedArea={setSelectedArea}
            checked={checked}
            toggle={toggle}
            openSub={itemsOpenSub}
            onOpenSubHandled={() => setItemsOpenSub(null)}
            buildTemplateId={buildTemplateId}
          />
        )}
        {view === "farm" && (
          <FarmingView
            checked={checked}
            farmSub={farmSub}
            setFarmSub={setFarmSub}
            farmBestOnly={farmBestOnly}
            setFarmBestOnly={setFarmBestOnly}
            materialFilter={materialFilter}
            setMaterialFilter={setMaterialFilter}
            onOpenShopUnlocks={() => { setItemsOpenSub("shop_unlocks"); setView("items"); }}
            buildTemplate={buildTemplate}
          />
        )}
        {view === "enemies" && (
          <EnemiesView
            enemiesSub={enemiesSub}
            setEnemiesSub={setEnemiesSub}
          />
        )}
        {view === "simulator" && (
          <SimulatorView
            profileId={activeProfileId}
            buildTemplateId={buildTemplateId}
            checked={checked}
            buildLevels={activeBuildLevels}
            toggleBuildLevel={toggleBuildLevel}
            setBuildLevels={setBuildLevels}
          />
        )}
        {view === "getop" && (
          <GetOpView
            getOpSub={getOpSub}
            setGetOpSub={setGetOpSub}
            onOpenBuild={() => { setBuildOpenSub("roadmap"); setView("build"); }}
            onOpenFarm={() => setView("farm")}
          />
        )}
      </AppLayout>

      {/* Shortcuts Help Overlay */}
      {showShortcuts && (
        <Modal onBackdropClick={() => setShowShortcuts(false)} maxWidth={420} accentColor={gold}>
          <div style={{ fontFamily: typography.fontHeading, fontSize: typography.size.xl, color: gold, marginBottom: 16, letterSpacing: 1 }}>
            KEYBOARD SHORTCUTS
          </div>
          <div style={{ display: "grid", gap: 8, fontSize: typography.size.base, lineHeight: 1.8, color: lightText }}>
            <div><kbd style={{ background: colors.border, padding: "2px 6px", borderRadius: 8, marginRight: 8 }}>1</kbd>–<kbd style={{ background: colors.border, padding: "2px 6px", borderRadius: 8, marginRight: 8 }}>9</kbd> Switch tabs</div>
            <div><kbd style={{ background: colors.border, padding: "2px 6px", borderRadius: 8, marginRight: 8 }}>←</kbd> <kbd style={{ background: colors.border, padding: "2px 6px", borderRadius: 8, marginRight: 8 }}>→</kbd> or <kbd style={{ background: colors.border, padding: "2px 6px", borderRadius: 8, marginRight: 8 }}>j</kbd> <kbd style={{ background: colors.border, padding: "2px 6px", borderRadius: 8, marginRight: 8 }}>k</kbd> Prev/Next area or quest</div>
            <div><kbd style={{ background: colors.border, padding: "2px 6px", borderRadius: 8, marginRight: 8 }}>f</kbd> Toggle focus mode (Overview or Area)</div>
            <div><kbd style={{ background: colors.border, padding: "2px 6px", borderRadius: 8, marginRight: 8 }}>Ctrl</kbd>+<kbd style={{ background: colors.border, padding: "2px 6px", borderRadius: 8, marginRight: 8 }}>E</kbd> Export</div>
            <div><kbd style={{ background: colors.border, padding: "2px 6px", borderRadius: 8, marginRight: 8 }}>Esc</kbd> Close modal</div>
            <div><kbd style={{ background: colors.border, padding: "2px 6px", borderRadius: 8, marginRight: 8 }}>?</kbd> Show this help</div>
          </div>
          <div style={{ marginTop: 16, fontSize: typography.size.sm, color: dimText }}>
            Press ? or Esc to close
          </div>
        </Modal>
      )}

      {/* Reset Modal */}
      {showReset && (
        <Modal maxWidth={340} accentColor={warnRed}>
          <div style={{ color: warnRed, fontFamily: typography.fontHeading, fontSize: typography.size.xl, marginBottom: 12 }}>
            Reset All Progress?
          </div>
          <div style={{ color: dimText, fontSize: typography.size.base, marginBottom: 20, lineHeight: 1.6 }}>
            This will erase ALL checked items, quest progress, and build data.
            This cannot be undone. Are you sure?
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Button onClick={() => setShowReset(false)} variant="secondary" style={{ flex: 1 }}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                resetAll();
                setShowReset(false);
              }}
              variant="danger"
              style={{ flex: 1 }}
            >
              Reset Everything
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}

// Shared Build Farming content — used in Farm tab (Build Farming sub) and Build tab (Farming sub)
function BuildFarmingContent({
  buildTemplate,
}: {
  buildTemplate?: { id?: string; name: string; buildItems?: { name: string; type: string; role?: string; farmOptions?: { enemy: string; area: string; method?: string; unlock?: string }[] }[]; buildMaterialFarms?: { item: string; purpose: string; sources: { type: string; location: string; detail: string; unlock?: string }[]; farmOptions: { enemy: string; area: string; method?: string; unlock?: string }[] }[] };
}) {
  const materialFarms = buildTemplate?.buildMaterialFarms ?? BUILD_MATERIAL_FARMS;
  const buildItems = buildTemplate?.buildItems ?? BUILD_ITEMS;
  const farmableItems = buildItems.filter((it) => it.farmOptions && it.farmOptions.length > 0);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div
        style={{
          padding: 14,
          background: "rgba(139,92,246,0.08)",
          border: "1px solid rgba(139,92,246,0.3)",
          borderRadius: 16,
        }}
      >
        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 14, color: gold, marginBottom: 4 }}>
          BUILD FARMING — {buildTemplate?.name ?? "Dark Melee Hexer"}
        </div>
        <div style={{ fontSize: 11, color: dimText, marginBottom: 12 }}>
          All materials and gear farming for the selected build.
        </div>
      </div>
      <div>
        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 13, color: gold, marginBottom: 8 }}>
          MATERIAL FARMS (Seeds, Titanite, Stones)
        </div>
        {materialFarms.map((m) => (
          <div
            key={m.item}
            style={{
              padding: "10px 12px",
              background: bgCard,
              borderRadius: 10,
              marginBottom: 8,
              border: "1px solid #2a2420",
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 600 }}>{m.item}</div>
            <div style={{ fontSize: 10, color: dimText, marginBottom: 6 }}>{m.purpose}</div>
            <div style={{ fontSize: 11, color: lightText }}>
              <span style={{ color: gold }}>Where to find:</span>
              {m.sources.map((s, i) => (
                <div key={i} style={{ marginTop: 2 }}>· {s.location}: {s.detail}{s.unlock && ` (${s.unlock})`}</div>
              ))}
            </div>
            {m.farmOptions.length > 0 && (
              <div style={{ fontSize: 11, color: successGreen, marginTop: 8 }}>
                <span style={{ color: successGreen }}>Farming:</span>
                {m.farmOptions.map((f, i) => (
                  <div key={i} style={{ marginTop: 2 }}>· {f.enemy} — {f.area}{f.method && ` — ${f.method}`}{f.unlock && ` (${f.unlock})`}</div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 13, color: gold, marginBottom: 8 }}>
          BUILD GEAR TO FARM (Weapons, Catalysts)
        </div>
        {farmableItems.map((it) => (
          <div
            key={it.name}
            style={{
              padding: "10px 12px",
              background: bgCard,
              borderRadius: 10,
              marginBottom: 8,
              border: "1px solid #2a2420",
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 600 }}>{it.name}</div>
            {it.role && <div style={{ fontSize: 10, color: dimText, marginBottom: 6 }}>{it.role}</div>}
            <div style={{ fontSize: 11, color: successGreen }}>
              <span style={{ color: successGreen }}>Farming:</span>
              {it.farmOptions!.map((f, i) => (
                <div key={i} style={{ marginTop: 2 }}>· {f.enemy} — {f.area}{f.method && ` — ${f.method}`}{f.unlock && ` (${f.unlock})`}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Dashboard
function DashboardView({
  state,
  stats,
  checked,
  buildStats,
  buildSteps,
  buildTemplate,
  setView,
  setSelectedArea,
  setSelectedQuest,
  areaCompletion,
  focusMode,
  setFocusMode,
}: {
  state: import("./types").ProgressState;
  stats: ReturnType<typeof computeStats>;
  checked: Record<string, boolean>;
  buildStats: ReturnType<typeof buildChecklistStats>;
  buildSteps?: import("./data/buildChecklist").BuildStep[];
  buildTemplate?: import("./data/buildTemplates/types").BuildTemplate;
  setView: (v: View) => void;
  setSelectedArea: (a: AreaId | null) => void;
  setSelectedQuest: (q: string | null) => void;
  areaCompletion: (id: AreaId) => { done: number; total: number; pct: number };
  focusMode: boolean;
  setFocusMode: (v: boolean) => void;
}) {
  const buildSuggest = useBuildSuggest(state);
  const getAreaSkimmed = (a: AreaId) => !!checked[getSkimmedKey(a)];
  const steps = buildSteps ?? BUILD_STEPS;
  const phaseInfo = buildTemplate?.phaseInfo ?? PHASE_INFO;
  const nextSteps = useMemo(() => {
    const unchecked = steps.filter((s) => !checked[s.progressId]);
    const available = unchecked.filter((s) => isAreaUnlocked(s.areaId, checked, getAreaSkimmed));
    const locked = unchecked.filter((s) => !isAreaUnlocked(s.areaId, checked, getAreaSkimmed));
    return { available, locked };
  }, [steps, checked]);
  const orderedNext = useMemo(() => {
    const byPhase = (a: { phase: number }, b: { phase: number }) => a.phase - b.phase;
    const byArea = (a: { areaId: AreaId }, b: { areaId: AreaId }) => AREA_ORDER.indexOf(a.areaId) - AREA_ORDER.indexOf(b.areaId);
    return [...nextSteps.available].sort((a, b) => byPhase(a, b) || byArea(a, b)).slice(0, 5);
  }, [nextSteps.available]);
  const goBackAlerts = getGoBackAlerts(checked);
  const lucBossSurvivals = ["nm7", "sr4", "ik7", "bg8", "d311"].filter((id) => checked[id]).length;

  const areasToShow = focusMode
    ? AREA_ORDER.filter((ak) => {
        const c = areaCompletion(ak);
        return c.pct > 0 && c.pct < 100;
      }).slice(0, 3)
    : AREA_ORDER;

  return (
    <div className="dashboard-grid">
      {/* Left column: Alerts + What's Next + Progress */}
      <div>
      {/* Alerts: Lucatiel + Go-back + Missed items */}
      {(goBackAlerts.length > 0 || (lucBossSurvivals < 3 && !checked["ak5"]) || AREA_ORDER.some((ak) => { const c = areaCompletion(ak); return c.pct > 0 && c.pct < 100; })) && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 12, color: gold, marginBottom: 8, letterSpacing: 1 }}>ALERTS</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {lucBossSurvivals < 3 && !checked["ak5"] && (
              <div onClick={() => { setSelectedArea("aldias_keep"); setView("area"); }} style={{ padding: 12, background: "rgba(196,64,64,0.12)", border: `1px solid ${warnRed}44`, borderRadius: 16, color: warnRed, fontSize: 11, lineHeight: 1.5, cursor: "pointer" }}>
                Critical: Lucatiel has only survived {lucBossSurvivals}/3 bosses. Do NOT talk to her at Aldia's Keep yet!
              </div>
            )}
            {goBackAlerts.map((a, i) => (
              <div key={i} onClick={() => { setSelectedArea(a.actionArea); setView("area"); }} style={{ padding: 12, background: "rgba(212,101,42,0.1)", border: "1px solid rgba(212,101,42,0.35)", borderRadius: 16, color: ember, fontSize: 11, lineHeight: 1.5, cursor: "pointer" }}>
                Go back: {a.message} — {getArea(a.actionArea).name}
              </div>
            ))}
            {AREA_ORDER.filter((ak) => { const c = areaCompletion(ak); return c.pct > 0 && c.pct < 100; }).slice(0, 3).map((ak) => {
              const area = getArea(ak);
              const c = areaCompletion(ak);
              const left = c.total - c.done;
              if (left === 0) return null;
              return (
                <div key={ak} onClick={() => { setSelectedArea(ak); setView("area"); }} style={{ padding: 10, background: "rgba(200,160,48,0.06)", border: "1px solid rgba(200,160,48,0.25)", borderRadius: 16, cursor: "pointer", fontSize: 11, color: lightText }}>
                  <span style={{ color: gold }}>{left} items left</span> in {area.name}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* What's Next? — adaptive suggestions */}
      {stats.pct < 100 && (
        <div
          style={{
            marginBottom: 20,
            padding: 14,
            background: "rgba(94,158,207,0.08)",
            border: "1px solid rgba(94,158,207,0.25)",
            borderRadius: 16,
          }}
        >
          <div
            style={{
              fontFamily: "'Cinzel', Georgia, serif",
              fontSize: 12,
              color: "#5e9ecf",
              marginBottom: 8,
              letterSpacing: 1,
            }}
          >
            WHAT'S NEXT?
          </div>
          {(() => {
            const nextArea = AREA_ORDER.find((ak) => {
              const c = areaCompletion(ak);
              return c.pct > 0 && c.pct < 100;
            });
            if (!nextArea) {
              const firstIncomplete = AREA_ORDER.find((ak) => {
                const c = areaCompletion(ak);
                return c.pct < 100;
              });
              if (firstIncomplete) {
                const area = getArea(firstIncomplete);
                const unchecked = area.items
                  .filter((i) => i.type !== "warn" && !checked[i.id])
                  .slice(0, 3);
                return (
                  <div style={{ fontSize: 12, color: lightText, lineHeight: 1.6 }}>
                    <span style={{ color: gold }}>{area.name}</span> — don't
                    forget: {unchecked.map((i) => i.text.split("—")[0].trim()).join(", ")}
                  </div>
                );
              }
              return null;
            }
            const area = getArea(nextArea);
            const unchecked = area.items
              .filter((i) => i.type !== "warn" && !checked[i.id])
              .slice(0, 3);
            return (
              <div style={{ fontSize: 12, color: lightText, lineHeight: 1.6 }}>
                In <span style={{ color: gold }}>{area.name}</span> — don't
                forget: {unchecked.map((i) => i.text.split("—")[0].trim()).join(", ") || "check the list"}
              </div>
            );
          })()}
        </div>
      )}

      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <div
          style={{
            fontFamily: "'Cinzel', Georgia, serif",
            fontSize: 32,
            color: gold,
            fontWeight: 700,
            animation: [25, 50, 75, 100].includes(stats.pct)
              ? "milestonePulse 0.6s ease-out"
              : "none",
          }}
        >
          {stats.pct}%
        </div>
        <div style={{ color: dimText, fontSize: 13, marginTop: 4 }}>
          {stats.checkedCount} / {stats.total} tasks completed
        </div>
        <div style={{ maxWidth: 400, margin: "12px auto 0" }}>
          <ProgressBar done={stats.checkedCount} total={stats.total} height={8} glow />
        </div>
        <button
          onClick={() => setFocusMode(!focusMode)}
          style={{
            marginTop: 12,
            padding: "6px 12px",
            fontSize: 11,
            background: focusMode ? gold : "transparent",
            color: focusMode ? "#0c0b0a" : dimText,
            border: `1px solid ${focusMode ? gold : "#3a342a"}`,
            borderRadius: 16,
            cursor: "pointer",
          }}
        >
          {focusMode ? "Focus mode: ON" : "Focus mode: OFF"}
        </button>
      </div>
      </div>

      {/* Right column: Questlines + Trackers */}
      <div>
      <div
        style={{
          fontFamily: "'Cinzel', Georgia, serif",
          fontSize: 14,
          color: gold,
          marginBottom: 12,
          letterSpacing: 1,
        }}
      >
        NPC QUESTLINES
      </div>
      <div style={{ display: "grid", gap: 10, marginBottom: 24 }}>
        {Object.entries(stats.questStats).map(([qk, s]) => {
          const q = QUESTS[qk];
          const complete =
            s.stepsDone === s.stepsTotal && s.bossesDone >= s.bossesNeeded;
          return (
            <div
              key={qk}
              onClick={() => {
                setSelectedQuest(qk);
                setView("quests");
              }}
              style={{
                background: bgCard,
                borderRadius: 16,
                padding: 14,
                cursor: "pointer",
                border: `1px solid ${complete ? successGreen + "44" : "#2a2420"}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <span style={{ color: q.color, fontSize: 14, fontWeight: 600 }}>
                  {q.icon} {q.name}
                </span>
                {complete && (
                  <span style={{ color: successGreen, fontSize: 11 }}>
                    COMPLETE
                  </span>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 11,
                  color: dimText,
                }}
              >
                <span>
                  Talks: {s.stepsDone}/{s.stepsTotal}
                </span>
                {s.bossesNeeded > 0 && (
                  <span>
                    | Bosses: {s.bossesDone}/{s.bossesNeeded}
                  </span>
                )}
                <ProgressBar
                  done={s.stepsDone + s.bossesDone}
                  total={s.stepsTotal + s.bossesNeeded}
                  color={q.color}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 14, color: gold, marginBottom: 12, marginTop: 24, letterSpacing: 1 }}>TRACKERS</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {[
          ["Estus", stats.estus, 12, ember],
          ["Bone Dust", stats.boneDust, 5, "#c0c0c0"],
          ["Gestures", stats.gesturesDone, 20, "#d4a828"],
          ["Covenants", stats.covenantsDone, 9, "#8b5cf6"],
        ].map(([label, d, t, color]) => (
          <div key={String(label)} style={{ display: "flex", alignItems: "center", gap: 6, background: bgCard, padding: "8px 12px", borderRadius: 10, minWidth: 100 }}>
            <span style={{ color: dimText, fontSize: 11 }}>{label}</span>
            <span style={{ color: color as string, fontSize: 14, fontWeight: 700 }}>{d}/{t}</span>
            <ProgressBar done={d as number} total={t as number} color={color as string} height={4} />
          </div>
        ))}
      </div>

      {/* Build & Leveling tracker — hybrid: fill bar + phase timeline + next items (adaptive by area/phase/unlock) */}
      <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 14, color: "#8b5cf6", marginBottom: 10, letterSpacing: 1 }}>BUILD & LEVELING</div>
      <div
        onClick={() => setView("build")}
        style={{
          background: bgCard,
          borderRadius: 16,
          padding: 14,
          border: "1px solid rgba(139,92,246,0.3)",
          cursor: "pointer",
          marginBottom: 24,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ color: lightText, fontSize: 12 }}>Build: {buildStats.done}/{buildStats.total} ({buildStats.pct}%)</span>
          <span style={{ color: gold, fontSize: 10 }}>Full Build →</span>
        </div>
        <ProgressBar done={buildStats.done} total={buildStats.total} color="#8b5cf6" height={6} />
        {phaseInfo.length > 0 && (
          <div style={{ marginTop: 10, display: "flex", gap: 2, alignItems: "stretch", height: 6 }}>
            {phaseInfo.map((p) => {
              const phaseSteps = steps.filter((s) => s.phase === p.num);
              const phaseDone = phaseSteps.filter((s) => checked[s.progressId]).length;
              const phaseTotal = phaseSteps.length;
              const pct = phaseTotal > 0 ? (phaseDone / phaseTotal) * 100 : 0;
              return (
                <div
                  key={p.num}
                  title={`Phase ${p.num}: ${p.name} — ${phaseDone}/${phaseTotal}`}
                  style={{
                    flex: 1,
                    background: "#1a1714",
                    borderRadius: 3,
                    overflow: "hidden",
                    minWidth: 4,
                  }}
                >
                  <div
                    style={{
                      width: `${pct}%`,
                      height: "100%",
                      background: p.color,
                      borderRadius: 3,
                      minWidth: pct > 0 ? 2 : 0,
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
        {buildSuggest.nextSuggestion && "sl" in buildSuggest.nextSuggestion && (
          <div style={{ marginTop: 10, fontSize: 11, color: dimText }}>
            Next level: SL {buildSuggest.nextSuggestion.sl} ({buildSuggest.nextSuggestion.stat})
          </div>
        )}
        {orderedNext.length > 0 && (
          <div style={{ marginTop: 8, fontSize: 11, color: dimText }}>
            <span style={{ color: gold }}>Next:</span>{" "}
            {orderedNext.map((s, i) => {
              const area = getArea(s.areaId);
              return (
                <span key={s.id}>
                  {i > 0 && " · "}
                  <span style={{ color: lightText }}>{s.name}</span>
                  <span style={{ color: dimText }}> ({area.name})</span>
                </span>
              );
            })}
          </div>
        )}
        {nextSteps.available.length === 0 && nextSteps.locked.length > 0 && (
          <div style={{ marginTop: 8, fontSize: 10, color: warnRed }}>
            Next item locked — unlock area first: {getArea(nextSteps.locked[0].areaId).name}
          </div>
        )}
      </div>
      </div>

      {/* Full width: Area Progress */}
      <div style={{ gridColumn: "1 / -1" }}>
      <div
        style={{
          fontFamily: "'Cinzel', Georgia, serif",
          fontSize: 14,
          color: gold,
          marginBottom: 12,
          letterSpacing: 1,
        }}
      >
        AREA PROGRESS
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 6,
        }}
      >
        {areasToShow.map((ak) => {
          const c = areaCompletion(ak);
          const area = getArea(ak);
          return (
            <div
              key={ak}
              onClick={() => {
                setSelectedArea(ak);
                setView("area");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 12px",
                borderRadius: 10,
                cursor: "pointer",
                background: bgCard,
              }}
            >
              <span
                style={{
                  color: c.pct === 100 ? successGreen : lightText,
                  fontSize: 12,
                  flex: 1,
                  fontFamily: "'Georgia', serif",
                }}
              >
                {c.pct === 100 ? "✓ " : ""}
                {area.name}
              </span>
              <span
                style={{
                  color: dimText,
                  fontSize: 11,
                  width: 44,
                  textAlign: "right",
                }}
              >
                {c.pct}%
              </span>
              <div style={{ width: 80 }}>
                <ProgressBar done={c.done} total={c.total} />
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}

// Area Right Panel — BUILD + NOTES + FARMING + DROPS as floating boxes
function AreaRightFloatingPanels({
  selectedArea,
  checked,
  setView,
  buildSuggest,
  buildStats,
  onOpenBuild,
  buildSteps,
  openBuildFarming,
  lucBossSurvivals,
}: {
  selectedArea: AreaId;
  checked: Record<string, boolean>;
  setView: (v: View) => void;
  buildSuggest: ReturnType<typeof useBuildSuggest>;
  buildStats: ReturnType<typeof buildChecklistStats>;
  onOpenBuild: () => void;
  buildSteps?: import("./data/buildChecklist").BuildStep[];
  openBuildFarming: () => void;
  lucBossSurvivals: number;
}) {
  const tips = AREA_TIPS[selectedArea];
  const soulFarmHere = SOUL_FARM_RUNS.filter((r) => r.areaId === selectedArea);
  const titaniteHere = TITANITE_SOURCES.filter((t) => t.areaId === selectedArea);
  const crystalLizardsHere = CRYSTAL_LIZARDS.filter((c) => c.areaId === selectedArea);
  const pharrosLocsHere = PHARROS_LOCATIONS.filter((p) => p.areaId === selectedArea);
  const hasFarming = soulFarmHere.length > 0 || titaniteHere.length > 0 || crystalLizardsHere.length > 0 || pharrosLocsHere.length > 0;
  const shopUnlocksHere = getShopUnlocksForArea(selectedArea);
  const warnings = [...(WARNINGS[selectedArea] ?? [])];
  if (selectedArea === "aldias_keep") {
    if (lucBossSurvivals < 3) {
      warnings.push(`LUCATIEL WARNING: She has only survived ${lucBossSurvivals}/3 boss fights. DO NOT talk to her at Aldia's Keep yet or her questline FAILS permanently!`);
    } else {
      warnings.push(`Lucatiel has survived ${lucBossSurvivals}/3 boss fights. Safe to talk to her at Aldia's Keep for her reward!`);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div className="area-floating-box area-build-box">
      <BuildContextPanel
        selectedArea={selectedArea}
        buildSuggest={buildSuggest}
        buildStats={buildStats}
        checked={checked}
        onOpenBuild={onOpenBuild}
        buildSteps={buildSteps}
      />
      </div>
      <div className="area-floating-box">
        <SectionPanel title="NOTES">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <div style={{ fontSize: 13, color: gold, marginBottom: 6, fontWeight: 600 }}>1. How to get here</div>
              <div style={{ fontSize: 13, color: lightText, lineHeight: 1.7 }}>{AREA_ACCESS[selectedArea]}</div>
            </div>
            {(getAreaNotes(selectedArea)?.pathOrder || tips?.route) && (
              <div>
                <div style={{ fontSize: 13, color: gold, marginBottom: 6, fontWeight: 600 }}>2. Route / Path</div>
                <div style={{ fontSize: 13, color: lightText, lineHeight: 1.7, fontStyle: "italic" }}>{getAreaNotes(selectedArea)?.pathOrder || tips?.route}</div>
              </div>
            )}
            {getAreaNotes(selectedArea)?.bonfires && getAreaNotes(selectedArea)!.bonfires!.length > 0 && (
              <div>
                <div style={{ fontSize: 13, color: gold, marginBottom: 6, fontWeight: 600 }}>3. Bonfires</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {getAreaNotes(selectedArea)!.bonfires!.map((bf) => (
                    <div key={bf.itemId} style={{ fontSize: 12, color: lightText, lineHeight: 1.65 }}>
                      <span style={{ color: ember }}>{bf.name}:</span> {bf.howToReach}
                      {bf.farmingRef && (<span> <button onClick={openBuildFarming} style={{ fontSize: 12, color: gold, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>★ Soul farm: {bf.farmingRef}. See Farming →</button></span>)}
                      {bf.asceticValue && <div style={{ fontSize: 11, color: dimText, marginTop: 4, lineHeight: 1.5 }}>Ascetic: {bf.asceticValue}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {(getAreaNotes(selectedArea)?.bosses?.length || (tips?.bossTips && Object.keys(tips.bossTips).length > 0)) ? (
              <div>
                <div style={{ fontSize: 13, color: gold, marginBottom: 6, fontWeight: 600 }}>4. Boss tactics</div>
                {getAreaNotes(selectedArea)?.bosses && getAreaNotes(selectedArea)!.bosses!.length > 0 ? (
                  getAreaNotes(selectedArea)!.bosses!.map((b) => (
                    <div key={b.itemId} style={{ fontSize: 12, color: dimText, marginBottom: 6, lineHeight: 1.65 }}><span style={{ color: ember }}>{b.bossName}:</span> {b.tactics}</div>
                  ))
                ) : tips?.bossTips && Object.entries(tips.bossTips).map(([boss, tip]) => (
                  <div key={boss} style={{ fontSize: 12, color: dimText, marginBottom: 6, lineHeight: 1.65 }}><span style={{ color: ember }}>{boss}:</span> {tip}</div>
                ))}
              </div>
            ) : null}
            {(getAreaNotes(selectedArea)?.keyItems?.length || (tips?.keyItems && tips.keyItems.length > 0)) && (
              <div>
                <div style={{ fontSize: 13, color: gold, marginBottom: 6, fontWeight: 600 }}>5. Items & Collectibles</div>
                <div style={{ fontSize: 12, color: dimText, lineHeight: 1.65 }}>{(getAreaNotes(selectedArea)?.keyItems ?? tips?.keyItems ?? []).join(" • ")}</div>
              </div>
            )}
            {shopUnlocksHere.length > 0 && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: successGreen, fontWeight: 600 }}>6. Shop Unlocks</span>
                  <button onClick={() => setView("items")} style={{ fontSize: 12, color: gold, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>See all →</button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {shopUnlocksHere.map((u) => (
                    <div key={u.id} style={{ fontSize: 12, color: lightText, lineHeight: 1.65 }}><span style={{ color: gold }}>{u.merchant}:</span> {u.item} — <span style={{ color: successGreen }}>Unlock:</span> {u.condition}</div>
                  ))}
                </div>
              </div>
            )}
            {getAreaNotes(selectedArea)?.gestures && getAreaNotes(selectedArea)!.gestures!.length > 0 && (
              <div>
                <div style={{ fontSize: 13, color: gold, marginBottom: 6, fontWeight: 600 }}>Gestures</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {getAreaNotes(selectedArea)!.gestures!.map((g) => (
                    <div key={g.itemId} style={{ fontSize: 12, color: lightText, lineHeight: 1.6 }}><span style={{ color: ember }}>{g.gesture}:</span> {g.where}</div>
                  ))}
                </div>
              </div>
            )}
            {tips?.overview && (
              <div>
                <div style={{ fontSize: 13, color: gold, marginBottom: 6, fontWeight: 600 }}>Overview</div>
                <div style={{ fontSize: 13, color: lightText, lineHeight: 1.7 }}>{tips.overview}</div>
              </div>
            )}
            {warnings.length > 0 && (
              <div>
                <div style={{ fontSize: 13, color: gold, marginBottom: 6, fontWeight: 600 }}>Warnings</div>
                <div style={{ display: "grid", gap: 10 }}>
                  {warnings.map((w, i) => (
                    <div key={i} style={{ background: w.startsWith("Lucatiel has") ? "rgba(107,158,58,0.12)" : "rgba(196,64,64,0.12)", border: `1px solid ${w.startsWith("Lucatiel has") ? successGreen + "44" : warnRed + "44"}`, borderRadius: 16, padding: 14, color: w.startsWith("Lucatiel has") ? successGreen : warnRed, fontSize: 13, lineHeight: 1.7 }}>{w}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </SectionPanel>
      </div>
      <div className="area-floating-box">
        <SectionPanel title="FARMING" badge={hasFarming ? `${soulFarmHere.length + titaniteHere.length + crystalLizardsHere.length + pharrosLocsHere.length}` : "0"}>
          {hasFarming ? (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 12, color: dimText, lineHeight: 1.6 }}>Soul runs, titanite, lizards</span>
                <button onClick={() => setView("farm")} style={{ fontSize: 12, color: gold, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Full Farming →</button>
              </div>
              {soulFarmHere.length > 0 && (
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 13, color: ember, fontWeight: 600, marginBottom: 8, lineHeight: 1.5 }}>Soul farm runs</div>
                  {soulFarmHere.map((r, i) => (
                    <div key={i} style={{ padding: "10px 0", borderBottom: "1px solid #2a2420", fontSize: 12, lineHeight: 1.65 }}>
                      <div style={{ color: lightText, fontWeight: 500 }}>{r.name}</div>
                      <div style={{ color: dimText, marginTop: 2 }}>{r.bonfire} — {r.soulsPerRun.toLocaleString()} souls/run</div>
                      {r.howToGetThere && <div style={{ color: gold, marginTop: 4 }}>📍 {r.howToGetThere}</div>}
                      <div style={{ color: dimText, marginTop: 2 }}>{r.route}</div>
                      {r.best && <span style={{ color: successGreen }}> ★ Best</span>}
                    </div>
                  ))}
                </div>
              )}
              {titaniteHere.length > 0 && (
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 13, color: gold, fontWeight: 600, marginBottom: 8, lineHeight: 1.5 }}>Titanite / materials</div>
                  {titaniteHere.map((t, i) => (
                    <div key={i} style={{ padding: "10px 0", borderBottom: "1px solid #2a2420", fontSize: 12, lineHeight: 1.65 }}>
                      <div style={{ color: lightText, fontWeight: 500 }}>{t.name}: {t.material}</div>
                      <div style={{ color: dimText, marginTop: 2 }}>{t.loc} — {t.method}</div>
                      {t.howToGetThere && <div style={{ color: gold, marginTop: 4 }}>📍 {t.howToGetThere}</div>}
                    </div>
                  ))}
                </div>
              )}
              {crystalLizardsHere.length > 0 && (
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 13, color: "#5e9ecf", fontWeight: 600, marginBottom: 8, lineHeight: 1.5 }}>Crystal lizards</div>
                  {crystalLizardsHere.map((c, i) => (
                    <div key={i} style={{ padding: "10px 0", borderBottom: "1px solid #2a2420", fontSize: 12, lineHeight: 1.65 }}>
                      <div style={{ color: lightText }}>{c.location}</div>
                      {c.howToGetThere && <div style={{ color: gold, marginTop: 4 }}>📍 {c.howToGetThere}</div>}
                      <div style={{ color: dimText, marginTop: 2 }}>{c.drops}</div>
                    </div>
                  ))}
                </div>
              )}
              {pharrosLocsHere.length > 0 && (
                <div>
                  <div style={{ fontSize: 13, color: gold, fontWeight: 600, marginBottom: 8, lineHeight: 1.5 }}>Pharros lockstone</div>
                  {pharrosLocsHere.map((p, i) => (
                    <div key={i} style={{ padding: "10px 0", borderBottom: "1px solid #2a2420", fontSize: 12, lineHeight: 1.65 }}>
                      <div style={{ color: lightText }}>{p.location}</div>
                      {p.howToGetThere && <div style={{ color: gold, marginTop: 4 }}>📍 {p.howToGetThere}</div>}
                      {p.note && <div style={{ color: dimText, marginTop: 2 }}>{p.note}</div>}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div style={{ fontSize: 13, color: dimText, lineHeight: 1.6 }}>No farming in this area.</div>
          )}
        </SectionPanel>
      </div>
      <div className="area-floating-box">
        <SectionPanel title="ENEMY DROPS & LIZARDS" badge={`${ENEMY_DROPS.filter((e) => e.areaId === selectedArea).length + CRYSTAL_LIZARDS.filter((c) => c.areaId === selectedArea).length}`}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {ENEMY_DROPS.filter((e) => e.areaId === selectedArea).length > 0 && (
              <div>
                <div style={{ fontSize: 13, color: ember, fontWeight: 600, marginBottom: 10, lineHeight: 1.5 }}>Enemy drops</div>
                <div style={{ display: "grid", gap: 8 }}>
                  {ENEMY_DROPS.filter((e) => e.areaId === selectedArea).map((e) => (
                    <div key={e.id} style={{ padding: "10px 12px", background: "rgba(0,0,0,0.2)", borderRadius: 8, border: "1px solid #2a2420" }}>
                      <div style={{ fontSize: 13, color: lightText, fontWeight: 500, lineHeight: 1.5 }}>{e.name}</div>
                      <div style={{ fontSize: 12, color: dimText, marginTop: 6, lineHeight: 1.6 }}>{e.drops.map((d, i) => (<span key={i}>{d.item} ({d.rate}){i < e.drops.length - 1 ? ", " : ""}</span>))}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {CRYSTAL_LIZARDS.filter((c) => c.areaId === selectedArea).length > 0 && (
              <div>
                <div style={{ fontSize: 13, color: gold, fontWeight: 600, marginBottom: 10, lineHeight: 1.5 }}>Crystal lizards</div>
                <div style={{ display: "grid", gap: 8 }}>
                  {CRYSTAL_LIZARDS.filter((c) => c.areaId === selectedArea).map((c, i) => (
                    <div key={i} style={{ padding: "10px 12px", background: "rgba(0,0,0,0.2)", borderRadius: 8, border: "1px solid #2a2420" }}>
                      <div style={{ fontSize: 13, color: lightText, lineHeight: 1.5 }}>{c.location}</div>
                      <div style={{ fontSize: 12, color: dimText, marginTop: 4, lineHeight: 1.6 }}>Drops: {c.drops}</div>
                      {c.howToGetThere && <div style={{ fontSize: 12, color: gold, marginTop: 4, lineHeight: 1.5 }}>{c.howToGetThere}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {ENEMY_DROPS.filter((e) => e.areaId === selectedArea).length === 0 && CRYSTAL_LIZARDS.filter((c) => c.areaId === selectedArea).length === 0 && (
              <div style={{ fontSize: 13, color: dimText, lineHeight: 1.6 }}>No enemy drops or crystal lizards in this area.</div>
            )}
          </div>
        </SectionPanel>
      </div>
    </div>
  );
}

// Area View — hybrid layout: sidebar + 2x3 grid
function AreaView({
  selectedArea,
  setSelectedArea,
  setView,
  setSelectedQuest,
  checked,
  toggle,
  lucBossSurvivals,
  openBuildChecklist,
  buildSteps,
  areaFocusMode,
  setAreaFocusMode,
}: {
  selectedArea: AreaId;
  setSelectedArea: (a: AreaId | null) => void;
  setView: (v: View) => void;
  setSelectedQuest: (q: string | null) => void;
  checked: Record<string, boolean>;
  toggle: (id: string) => void;
  lucBossSurvivals: number;
  openBuildChecklist: () => void;
  buildSteps?: import("./data/buildChecklist").BuildStep[];
  areaFocusMode: boolean;
  setAreaFocusMode: (v: boolean | ((p: boolean) => boolean)) => void;
}) {
  const [areaSubTab, setAreaSubTab] = useState<"checklist" | "semi_fast">("checklist");
  const [areaSearchFilter, setAreaSearchFilter] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (areaSubTab === "semi_fast" && !SEMI_FAST_AREA_ORDER.includes(selectedArea)) {
      setSelectedArea(SEMI_FAST_AREA_ORDER[0]);
    }
  }, [areaSubTab, selectedArea, setSelectedArea]);

  const has100Guidance = AREAS_WITH_100_GUIDANCE.includes(selectedArea as (typeof AREAS_WITH_100_GUIDANCE)[number]);

  const area = getArea(selectedArea);
  const isSemiFast = areaSubTab === "semi_fast";
  const items = isSemiFast ? getSemiFastItems(area) : area.items;
  const ac = isSemiFast ? areaCompletionFromItems(items, checked) : areaCompletion(selectedArea, checked);
  const done = ac.done;
  const total = ac.total;
  const areaOrder = isSemiFast ? SEMI_FAST_AREA_ORDER : AREA_ORDER;
  const idx = areaOrder.indexOf(selectedArea);
  const questStepsHere = getQuestStepsInArea(selectedArea);
  const illusoryHere = ILLUSORY_WALLS.filter((w) => w.areaId === selectedArea);
  const pharrosHere = PHARROS_KEY_USES.filter((p) => p.areaId === selectedArea);
  const breakableHere = BREAKABLE_WALLS.filter((b) => b.areaId === selectedArea);
  const areaBuildSteps = getBuildStepsForArea(selectedArea, buildSteps);
  const bStats = buildChecklistStats(checked, buildSteps);
  const stepsForAccordion = areaBuildSteps;
  const areaFiltered = areaSearchFilter
    ? areaOrder.filter((a) =>
        getArea(a).name.toLowerCase().includes(areaSearchFilter.toLowerCase())
      )
    : areaOrder;

  const warnings = [...(WARNINGS[selectedArea] ?? [])];
  if (selectedArea === "aldias_keep") {
    if (lucBossSurvivals < 3) {
      warnings.push(
        `LUCATIEL WARNING: She has only survived ${lucBossSurvivals}/3 boss fights. DO NOT talk to her at Aldia's Keep yet or her questline FAILS permanently!`
      );
    } else {
      warnings.push(
        `Lucatiel has survived ${lucBossSurvivals}/3 boss fights. Safe to talk to her at Aldia's Keep for her reward!`
      );
    }
  }

  const hasSecrets = illusoryHere.length > 0 || pharrosHere.length > 0 || breakableHere.length > 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 1400 }}>
      {/* Sub-tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
        <button
          onClick={() => setAreaSubTab("checklist")}
          style={{
            padding: "8px 16px",
            background: areaSubTab === "checklist" ? "rgba(200,160,48,0.15)" : bgCard,
            border: `1px solid ${areaSubTab === "checklist" ? gold + "55" : "#2a2420"}`,
            borderRadius: 10,
            color: areaSubTab === "checklist" ? gold : dimText,
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          Checklist
        </button>
        <button
          onClick={() => setAreaSubTab("semi_fast")}
          style={{
            padding: "8px 16px",
            background: areaSubTab === "semi_fast" ? "rgba(200,160,48,0.15)" : bgCard,
            border: `1px solid ${areaSubTab === "semi_fast" ? gold + "55" : "#2a2420"}`,
            borderRadius: 10,
            color: areaSubTab === "semi_fast" ? gold : dimText,
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          Semi-Fast Run
        </button>
      </div>

      <div className="area-hybrid-layout">
        {/* Collapsible sidebar: area cards grid */}
        <div className={`area-sidebar-wrapper ${sidebarCollapsed ? "collapsed" : ""}`}>
          <aside className="area-sidebar">
          <button
            onClick={() => setSidebarCollapsed((c) => !c)}
            style={{
              width: sidebarCollapsed ? 40 : "100%",
              minWidth: sidebarCollapsed ? 40 : "auto",
              padding: sidebarCollapsed ? 8 : "6px 10px",
              background: bgCard,
              border: "1px solid #2a2420",
              borderRadius: 8,
              color: gold,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
            title={sidebarCollapsed ? "Expand areas sidebar" : "Collapse areas sidebar"}
          >
            {sidebarCollapsed ? "▸" : "▾"}
          </button>
          <input
            className="area-sidebar-input"
            type="text"
            placeholder="Filter areas..."
            value={areaSearchFilter}
            onChange={(e) => setAreaSearchFilter(e.target.value)}
            style={{
              width: "100%",
              marginBottom: 8,
              padding: "6px 10px",
              fontSize: 11,
              background: bgCard,
              border: "1px solid #2a2420",
              borderRadius: 8,
              color: lightText,
            }}
          />
          <div className="area-cards-grid">
            {areaFiltered.map((a) => {
              const acComp = areaCompletion(a, checked);
              const isSelected = a === selectedArea;
              return (
                <div
                  key={a}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedArea(a)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedArea(a); } }}
                  style={{
                    padding: "10px 12px",
                    cursor: "pointer",
                    borderRadius: 10,
                    border: `2px solid ${isSelected ? gold : "#2a2420"}`,
                    background: isSelected ? "rgba(200,160,48,0.12)" : bgCard,
                    color: isSelected ? gold : lightText,
                    fontSize: 12,
                    textAlign: "left",
                    lineHeight: 1.5,
                  }}
                >
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{acComp.pct === 100 ? "✓ " : ""}{getArea(a).name}</div>
                  <div style={{ color: dimText, fontSize: 11 }}>{acComp.pct}%</div>
                </div>
              );
            })}
          </div>
          </aside>
        </div>

        {/* Main content: sticky header + 2x2 quadrants */}
        <main className="area-main">
          <div style={{ position: "sticky", top: 0, zIndex: 10, background: bg, paddingBottom: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontSize: 15, fontFamily: "'Cinzel', Georgia, serif", color: gold }}>{area.name} <span style={{ color: dimText, fontSize: 13 }}>Lvl {area.lvl}</span></div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <button
                  onClick={() => setAreaFocusMode((p) => !p)}
                  style={{
                    padding: "4px 10px",
                    fontSize: 10,
                    background: areaFocusMode ? "rgba(200,160,48,0.2)" : bgCard,
                    border: `1px solid ${areaFocusMode ? gold + "55" : "#2a2420"}`,
                    borderRadius: 8,
                    color: areaFocusMode ? gold : dimText,
                    cursor: "pointer",
                  }}
                >
                  Focus {areaFocusMode ? "ON" : "OFF"}
                </button>
                <button
                  disabled={idx === 0}
                  onClick={() => setSelectedArea(areaOrder[idx - 1])}
                  style={{ padding: "4px 8px", background: bgCard, border: "1px solid #2a2420", borderRadius: 8, color: idx === 0 ? "#3a342a" : dimText, cursor: idx === 0 ? "default" : "pointer", fontSize: 10 }}
                >
                  ←
                </button>
                <button
                  disabled={idx === areaOrder.length - 1}
                  onClick={() => setSelectedArea(areaOrder[idx + 1])}
                  style={{ padding: "4px 8px", background: bgCard, border: "1px solid #2a2420", borderRadius: 8, color: idx === areaOrder.length - 1 ? "#3a342a" : dimText, cursor: idx === areaOrder.length - 1 ? "default" : "pointer", fontSize: 10 }}
                >
                  →
                </button>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <ProgressBar done={done} total={total} height={8} />
              <span style={{ color: dimText, fontSize: 12, whiteSpace: "nowrap" }}>{done}/{total}</span>
            </div>
          </div>

          <div className={`area-quadrants-grid ${areaFocusMode ? "area-focus-mode" : ""}`}>
            {/* 1. CHECKLIST */}
            <div className="area-quadrant">
              <SectionPanel title="CHECKLIST" badge={`${done}/${total}`}>
        <div style={{ display: "grid", gap: 8 }}>
          {/* Quest assignments — interconnected with Quest window & Quest tab */}
          {questStepsHere.length > 0 && (
            <div style={{ marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid #2a2420" }}>
              <div style={{ fontSize: 12, color: gold, fontWeight: 600, marginBottom: 8 }}>Quest assignments</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {questStepsHere.map((qs) => {
                  const qsDone = checked[qs.ref];
                  const q = QUESTS[qs.questKey];
                  return (
                    <div
                      key={qs.stepId}
                      onClick={() => { toggle(qs.ref); setSelectedQuest(qs.questKey); setView("quests"); }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "8px 12px",
                        borderRadius: 8,
                        cursor: "pointer",
                        background: qsDone ? "rgba(107,158,58,0.08)" : "rgba(0,0,0,0.15)",
                        border: `1px solid ${qsDone ? successGreen + "33" : q.color + "33"}`,
                      }}
                    >
                      <div style={{ width: 20, height: 20, borderRadius: 16, border: `2px solid ${qsDone ? successGreen : q.color}`, background: qsDone ? successGreen : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 11, color: qsDone ? "#fff" : q.color }}>
                        {qsDone ? "✓" : qs.isBoss ? "†" : "•"}
                      </div>
                      <span style={{ fontSize: 12, color: q.color }}>{q.icon}</span>
                      <span style={{ flex: 1, fontSize: 13, lineHeight: 1.5, color: qsDone ? dimText : lightText, textDecoration: qsDone ? "line-through" : "none" }}>
                        {qs.stepLabel}
                      </span>
                      <span style={{ fontSize: 11, color: dimText }}>{q.name.split(" ")[0]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {items.map((item) => {
            const isWarn = item.type === "warn";
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const typeIcon = isWarn ? "" : item.type === "boss" ? "†" : item.type === "npc" ? "◉" : item.type === "bonfire" ? "⊕" : item.type === "key" ? "※" : "•";
            if (hasSubItems) {
              const subDone = item.subItems!.filter((s) => checked[s.id]).length;
              const subTotal = item.subItems!.length;
              return (
                <div key={item.id} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 13, color: dimText, marginBottom: 6, paddingLeft: 4, lineHeight: 1.6 }}>
                    <span style={{ marginRight: 6 }}>{typeIcon}</span>
                    {item.text} <span style={{ fontSize: 12 }}>({subDone}/{subTotal})</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingLeft: 14, borderLeft: "2px solid #2a2420" }}>
                    {item.subItems!.map((s) => {
                      const sDone = checked[s.id];
                      return (
                        <div
                          key={s.id}
                          onClick={() => toggle(s.id)}
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
                          <div style={{ width: 20, height: 20, borderRadius: 16, border: `2px solid ${sDone ? gold : "#3a342a"}`, background: sDone ? gold : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            {sDone && <span style={{ color: "#0c0b0a", fontSize: 11, fontWeight: 700 }}>✓</span>}
                          </div>
                          <span style={{ color: sDone ? dimText : lightText, fontSize: 13, lineHeight: 1.6, textDecoration: sDone ? "line-through" : "none" }}>{s.text}</span>
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
                key={item.id}
                onClick={() => !isWarn && toggle(item.id)}
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
                {!isWarn && (
                  <div style={{ width: 22, height: 22, borderRadius: 16, border: `2px solid ${itemDone ? gold : "#3a342a"}`, background: itemDone ? gold : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    {itemDone && <span style={{ color: "#0c0b0a", fontSize: 13, fontWeight: 700 }}>✓</span>}
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ color: isWarn ? warnRed : itemDone ? dimText : lightText, fontSize: 14, lineHeight: 1.65, textDecoration: itemDone && !isWarn ? "line-through" : "none" }}>
                    <span style={{ marginRight: 6 }}>{typeIcon}</span>
                    {item.text}
                  </div>
                  {item.questRef && (
                    <div style={{ fontSize: 12, color: dimText, marginTop: 4, display: "flex", gap: 8, flexWrap: "wrap", lineHeight: 1.6 }}>
                      {Object.entries(QUESTS).map(([qk, q]) => {
                        const step = q.steps.find((s) => (s.ref ?? s.id) === item.id) || q.bosses.find((b) => b.ref === item.id);
                        if (!step) return null;
                        return (
                          <span key={qk} onClick={(e) => { e.stopPropagation(); setSelectedQuest(qk); setView("quests"); }} style={{ background: q.color + "22", color: q.color, padding: "2px 6px", borderRadius: 16, cursor: "pointer" }}>
                            {q.icon} {q.name.split(" ")[0]}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
              </SectionPanel>
            </div>

            {/* 2. 100% GUIDANCE (next to checklist, hidden in focus mode) */}
            {!areaFocusMode && (
            <div className="area-quadrant">
              <SectionPanel title="100% GUIDANCE" badge={has100Guidance ? `${items.flatMap((i) => i.subItems?.length ? i.subItems!.map((s) => s.id) : [i.id]).filter((id) => getItemDetail(id)).length}/${items.flatMap((i) => i.subItems?.length ? i.subItems!.map((s) => s.id) : [i.id]).length}` : "0"}>
          {has100Guidance ? (
          <>
          <div style={{ fontSize: 12, color: dimText, marginBottom: 14, lineHeight: 1.65 }}>
            Detailed per-item: where to find it, how to get there, how to obtain.
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            {items.flatMap((item) => {
              const ids = item.subItems?.length ? item.subItems!.map((s) => s.id) : [item.id];
              return ids.map((checkId) => {
                const detail = getItemDetail(checkId);
                if (!detail) return [];
                const itemDone = checked[checkId];
                const subItem = item.subItems?.find((s) => s.id === checkId);
                const label = subItem ? subItem.text : item.text;
                return [
                  <div
                    key={checkId}
                    onClick={() => item.type !== "warn" && toggle(checkId)}
                    style={{
                      padding: "12px 14px",
                      borderRadius: 10,
                      background: itemDone ? "rgba(200,160,48,0.06)" : "rgba(0,0,0,0.2)",
                      border: `1px solid ${itemDone ? gold + "33" : "#2a2420"}`,
                      cursor: item.type === "warn" ? "default" : "pointer",
                      opacity: itemDone && item.type !== "warn" ? 0.7 : 1,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                      {item.type !== "warn" && (
                        <div style={{ width: 20, height: 20, borderRadius: 16, border: `2px solid ${itemDone ? gold : "#3a342a"}`, background: itemDone ? gold : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                          {itemDone && <span style={{ color: "#0c0b0a", fontSize: 11, fontWeight: 700 }}>✓</span>}
                        </div>
                      )}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.5, color: itemDone && item.type !== "warn" ? dimText : lightText, textDecoration: itemDone && item.type !== "warn" ? "line-through" : "none" }}>
                          {label}
                        </div>
                        <div style={{ fontSize: 12, color: gold, marginTop: 6, lineHeight: 1.6 }}>📍 {detail.where}</div>
                        <div style={{ fontSize: 12, color: lightText, marginTop: 6, lineHeight: 1.7, whiteSpace: "pre-line", fontWeight: 500 }}>🪜 {detail.howToGetThere}</div>
                        {detail.howToObtain && (
                          <div style={{ fontSize: 12, color: ember, marginTop: 4, lineHeight: 1.6 }}>→ {detail.howToObtain}</div>
                        )}
                        {detail.items && detail.items.length > 0 && (
                          <div style={{ fontSize: 11, color: dimText, marginTop: 4, lineHeight: 1.6 }}>Items: {detail.items.join(", ")}</div>
                        )}
                        {detail.warning && (
                          <div style={{ fontSize: 12, color: warnRed, marginTop: 6, fontWeight: 600, lineHeight: 1.6 }}>⚠ {detail.warning}</div>
                        )}
                      </div>
                    </div>
                  </div>,
                ];
              }).flat();
            })}
          </div>
          </>
          ) : (
            <div style={{ fontSize: 13, color: dimText, lineHeight: 1.6 }}>No 100% guidance for this area.</div>
          )}
              </SectionPanel>
            </div>
            )}

            {/* 3. QUESTS (hidden in focus mode) */}
            {!areaFocusMode && (
            <div className="area-quadrant">
              <SectionPanel title="QUESTS" badge={questStepsHere.length > 0 ? `${questStepsHere.filter((qs) => checked[qs.ref]).length}/${questStepsHere.length}` : "0"}>
          {questStepsHere.length > 0 ? (
          <div style={{ display: "grid", gap: 8 }}>
            {questStepsHere.map((qs) => {
              const qsDone = checked[qs.ref];
              const q = QUESTS[qs.questKey];
              return (
                <div key={qs.stepId} onClick={() => { toggle(qs.ref); setSelectedQuest(qs.questKey); setView("quests"); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, cursor: "pointer", background: qsDone ? "rgba(107,158,58,0.08)" : "rgba(0,0,0,0.2)", border: `1px solid ${qsDone ? successGreen + "33" : "#2a2420"}` }}>
                  <div style={{ width: 20, height: 20, borderRadius: 16, border: `2px solid ${qsDone ? successGreen : q.color}`, background: qsDone ? successGreen : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: qsDone ? "#fff" : q.color }}>{qsDone ? "✓" : qs.isBoss ? "†" : "•"}</div>
                  <span style={{ fontSize: 13, color: q.color }}>{q.icon}</span>
                  <span style={{ flex: 1, fontSize: 13, lineHeight: 1.5, color: qsDone ? dimText : lightText, textDecoration: qsDone ? "line-through" : "none" }}>{qs.stepLabel}</span>
                </div>
              );
            })}
          </div>
          ) : (
            <div style={{ fontSize: 13, color: dimText, lineHeight: 1.6 }}>No quest steps in this area.</div>
          )}
              </SectionPanel>
            </div>
            )}

            {/* 4. SUMMONS (hidden in focus mode) */}
            {!areaFocusMode && (
            <div className="area-quadrant">
              <SectionPanel title="NPC SUMMONS" badge={AREA_SUMMONS[selectedArea]?.length ? `${AREA_SUMMONS[selectedArea]!.length}` : "0"}>
          {AREA_SUMMONS[selectedArea] && AREA_SUMMONS[selectedArea]!.length > 0 ? (
          <>
          <div style={{ fontSize: 12, color: dimText, marginBottom: 12, lineHeight: 1.65 }}>Use Human Effigy. Leave Company of Champions.</div>
          <div style={{ display: "grid", gap: 12 }}>
            {AREA_SUMMONS[selectedArea]!.map((s, i) => (
              <div key={i} style={{ padding: "12px 14px", background: "rgba(0,0,0,0.2)", borderRadius: 10, border: "1px solid #2a2420" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: ember, marginBottom: 8, lineHeight: 1.5 }}>† {s.boss}</div>
                {s.npcs.map((n, j) => (
                  <div key={j} style={{ fontSize: 12, color: lightText, lineHeight: 1.65, marginBottom: 6, paddingLeft: 10, borderLeft: n.quest ? `2px solid ${n.quest === "lucatiel" ? "#5e9ecf" : "#c89b3c"}` : "2px solid transparent" }}>
                    <span style={{ color: gold }}>{n.name}</span>
                    {n.quest && <span style={{ color: dimText, marginLeft: 4 }}>(quest)</span>}
                    {" — "}<span style={{ color: dimText }}>{n.location}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          </>
          ) : (
            <div style={{ fontSize: 13, color: dimText, lineHeight: 1.6 }}>No NPC summons in this area.</div>
          )}
              </SectionPanel>
            </div>
            )}

            {/* 5. SECRETS (hidden in focus mode) */}
            {!areaFocusMode && (
            <div className="area-quadrant">
              <SectionPanel title="SECRETS" badge={hasSecrets ? `${illusoryHere.length + pharrosHere.length + breakableHere.length}` : "0"}>
          {hasSecrets ? (
          <>
          <div style={{ fontSize: 12, color: dimText, marginBottom: 12, lineHeight: 1.65 }}>Illusory: press A/X. Breakable: attack or explosions.</div>
          {illusoryHere.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 13, color: "#5e9ecf", fontWeight: 600, marginBottom: 8, lineHeight: 1.5 }}>Illusory walls</div>
              {illusoryHere.map((w) => (
                <div key={w.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0", borderBottom: "1px solid #2a2420", lineHeight: 1.6 }}>
                  <input type="checkbox" checked={!!checked[w.id]} onChange={() => toggle(w.id)} style={{ marginTop: 4, accentColor: gold }} />
                  <div><div style={{ fontSize: 13, color: lightText }}>{w.location}</div>
                  {w.items?.length > 0 && <div style={{ fontSize: 12, color: dimText, marginTop: 2 }}>Items: {w.items.join(", ")}</div>}</div>
                </div>
              ))}
            </div>
          )}
          {pharrosHere.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 13, color: gold, fontWeight: 600, marginBottom: 8, lineHeight: 1.5 }}>Pharros lockstone</div>
              {pharrosHere.map((p) => (
                <div key={p.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0", borderBottom: "1px solid #2a2420", lineHeight: 1.6 }}>
                  <input type="checkbox" checked={!!checked[p.id]} onChange={() => toggle(p.id)} style={{ marginTop: 4, accentColor: gold }} />
                  <div><div style={{ fontSize: 13, color: lightText }}>{p.location}</div>
                  <div style={{ fontSize: 12, color: dimText, marginTop: 2 }}>{p.effect}</div>
                  {p.items?.length ? <div style={{ fontSize: 12, color: gold, marginTop: 2 }}>{p.items.join(", ")}</div> : null}</div>
                </div>
              ))}
            </div>
          )}
          {breakableHere.length > 0 && (
            <div>
              <div style={{ fontSize: 13, color: ember, fontWeight: 600, marginBottom: 8, lineHeight: 1.5 }}>Breakable walls</div>
              {breakableHere.map((w) => (
                <div key={w.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0", borderBottom: "1px solid #2a2420", lineHeight: 1.6 }}>
                  <input type="checkbox" checked={!!checked[w.id]} onChange={() => toggle(w.id)} style={{ marginTop: 4, accentColor: gold }} />
                  <div><div style={{ fontSize: 13, color: lightText }}>{w.location}</div>
                  <div style={{ fontSize: 12, color: dimText, marginTop: 2 }}>{w.howToBreak}</div>
                  <div style={{ fontSize: 12, color: ember, marginTop: 2 }}>{w.items.join(", ")}</div></div>
                </div>
              ))}
            </div>
          )}
          </>
          ) : (
            <div style={{ fontSize: 13, color: dimText, lineHeight: 1.6 }}>No illusory walls, Pharros, or breakable walls.</div>
          )}
              </SectionPanel>
            </div>
            )}

            {/* 6. BUILD (hidden in focus mode) */}
            {!areaFocusMode && (
            <div className="area-quadrant">
              <SectionPanel title="WEAPONS & BUILD" badge={stepsForAccordion.length > 0 ? `${stepsForAccordion.filter((s) => checked[s.progressId]).length}/${stepsForAccordion.length}` : "0"}>
          {stepsForAccordion.length > 0 ? (
          <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: dimText, lineHeight: 1.6 }}>Build: {bStats.done}/{bStats.total} ({bStats.pct}%)</span>
            <button onClick={openBuildChecklist} style={{ fontSize: 12, color: gold, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Full Build →</button>
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            {stepsForAccordion.map((s) => {
              const sDone = checked[s.progressId];
              return (
                <div key={s.id} onClick={() => toggle(s.progressId)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, cursor: "pointer", background: sDone ? "rgba(107,158,58,0.12)" : "rgba(139,92,246,0.08)", border: `1px solid ${sDone ? successGreen + "44" : "rgba(139,92,246,0.2)"}` }}>
                  <span style={{ color: sDone ? successGreen : dimText, fontSize: 13 }}>{sDone ? "✓" : "○"}</span>
                  <div><div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.5 }}>{s.name}{(s as { optional?: boolean }).optional ? " (Optional)" : ""}</div><div style={{ fontSize: 12, color: dimText, marginTop: 2, lineHeight: 1.5 }}>{s.source}</div></div>
                </div>
              );
            })}
          </div>
          </div>
          ) : (
            <div style={{ fontSize: 13, color: dimText, lineHeight: 1.6 }}>No build steps in this area.</div>
          )}
              </SectionPanel>
            </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}

// Quests View — interconnected with Areas
function QuestsView({
  selectedQuest,
  setSelectedQuest,
  setView,
  setSelectedArea,
  checked,
  toggle,
  stats,
}: {
  selectedQuest: string | null;
  setSelectedQuest: (q: string | null) => void;
  setView: (v: View) => void;
  setSelectedArea: (a: AreaId | null) => void;
  checked: Record<string, boolean>;
  toggle: (id: string) => void;
  stats: ReturnType<typeof computeStats>;
}) {
  const qk = selectedQuest ?? Object.keys(QUESTS)[0];
  const q = QUESTS[qk];
  const s = stats.questStats[qk];

  return (
    <div style={{ padding: 20 }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          marginBottom: 20,
        }}
      >
        {Object.entries(QUESTS).map(([k, v]) => {
          const qs = stats.questStats[k];
          const complete =
            qs.stepsDone === qs.stepsTotal &&
            qs.bossesDone >= qs.bossesNeeded;
          return (
            <button
              key={k}
              onClick={() => setSelectedQuest(k)}
              style={{
                padding: "6px 12px",
                borderRadius: 10,
                border: `1px solid ${k === qk ? v.color : "#2a2420"}`,
                background: k === qk ? `${v.color}18` : bgCard,
                color: k === qk ? v.color : dimText,
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              {v.icon} {v.name.split(" ")[0]} {complete ? "✓" : ""}
            </button>
          );
        })}
      </div>

      <div
        style={{
          background: bgCard,
          borderRadius: 16,
          padding: 20,
          border: `1px solid ${q.color}22`,
        }}
      >
        <div
          style={{
            fontSize: 20,
            color: q.color,
            fontFamily: "'Cinzel', Georgia, serif",
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          {q.icon} {q.name}
        </div>
        {q.achievement && (
          <div style={{ color: gold, fontSize: 11, marginBottom: 4 }}>
            {q.achievement}
          </div>
        )}
        <div
          style={{
            color: dimText,
            fontSize: 12,
            marginBottom: 8,
            fontStyle: "italic",
          }}
        >
          {q.note}
        </div>
        <div
          style={{
            color: successGreen,
            fontSize: 12,
            marginBottom: 16,
          }}
        >
          Reward: {q.reward}
        </div>

        <div
          style={{
            fontFamily: "'Cinzel', Georgia, serif",
            fontSize: 13,
            color: gold,
            marginBottom: 10,
          }}
        >
          LOCATIONS ({s.stepsDone}/{s.stepsTotal})
        </div>
        <div style={{ display: "grid", gap: 6, marginBottom: 20 }}>
          {q.steps.map((step, i) => {
            const ref = step.ref ?? step.id;
            const done = checked[ref];
            const area = getArea(step.area);
            return (
              <div
                key={step.id}
                onClick={() => toggle(ref)}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  padding: "10px 12px",
                  borderRadius: 10,
                  cursor: "pointer",
                  background: done ? "rgba(200,160,48,0.06)" : "#0c0b0a",
                  border: `1px solid ${done ? successGreen + "33" : "#2a2420"}`,
                  opacity: done ? 0.65 : 1,
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    border: `2px solid ${done ? successGreen : q.color}`,
                    background: done ? successGreen : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 1,
                    fontSize: 11,
                    fontWeight: 700,
                    color: done ? "#fff" : q.color,
                  }}
                >
                  {done ? "✓" : i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      color: done ? dimText : lightText,
                      fontSize: 13,
                      textDecoration: done ? "line-through" : "none",
                    }}
                  >
                    {step.label}
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedArea(step.area);
                      setView("area");
                    }}
                    style={{
                      color: dimText,
                      fontSize: 10,
                      marginTop: 2,
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    → {area.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {q.bosses.length > 0 && (
          <>
            <div
              style={{
                fontFamily: "'Cinzel', Georgia, serif",
                fontSize: 13,
                color: ember,
                marginBottom: 10,
              }}
            >
              BOSS SURVIVALS ({s.bossesDone}/{s.bossesNeeded} needed)
            </div>
            {s.bossesDone >= s.bossesNeeded && (
              <div
                style={{
                  background: "rgba(107,158,58,0.12)",
                  border: `1px solid ${successGreen}44`,
                  borderRadius: 10,
                  padding: 8,
                  marginBottom: 10,
                  color: successGreen,
                  fontSize: 12,
                }}
              >
                Enough boss survivals! Questline can be completed.
              </div>
            )}
            <div style={{ display: "grid", gap: 6 }}>
              {q.bosses.map((b) => {
                const done = checked[b.ref];
                const area = getArea(b.area);
                return (
                  <div
                    key={b.id}
                    onClick={() => toggle(b.ref)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 12px",
                      borderRadius: 10,
                      cursor: "pointer",
                      background: done ? "rgba(212,101,42,0.08)" : "#0c0b0a",
                      border: `1px solid ${done ? ember + "44" : "#2a2420"}`,
                    }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 16,
                        border: `2px solid ${done ? ember : "#3a342a"}`,
                        background: done ? ember : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: "#fff",
                        fontSize: 11,
                      }}
                    >
                      {done && "✓"}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          color: done ? dimText : lightText,
                          fontSize: 13,
                          textDecoration: done ? "line-through" : "none",
                        }}
                      >
                        💀 {b.label}
                      </div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedArea(b.area);
                          setView("area");
                        }}
                        style={{
                          color: dimText,
                          fontSize: 10,
                          marginTop: 2,
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        → {area.name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Build View
function BuildView({
  state,
  buildLevels,
  buildTemplateId,
  setBuildTemplateId,
  buildTemplates,
  toggleBuildLevel,
  setBuildLevels,
  checked,
  toggle,
  setView,
  setSelectedArea,
  openSub,
  onOpenSubHandled,
  onOpenShopUnlocks,
  buildTemplate,
}: {
  state: import("./types").ProgressState;
  buildLevels: Record<number, boolean>;
  buildTemplateId: string;
  setBuildTemplateId: (id: string) => void;
  buildTemplates: import("./data/buildTemplates/types").BuildTemplate[];
  toggleBuildLevel: (sl: number) => void;
  setBuildLevels: (l: Record<number, boolean>) => void;
  checked: Record<string, boolean>;
  toggle: (id: string) => void;
  setView: (v: View) => void;
  setSelectedArea: (a: AreaId | null) => void;
  openSub?: "roadmap" | "checklist" | "equip" | "info" | "farming" | null;
  onOpenSubHandled?: () => void;
  onOpenShopUnlocks?: () => void;
  buildTemplate?: import("./data/buildTemplates/types").BuildTemplate;
}) {
  const buildSuggest = useBuildSuggest(state);
  const levels = buildTemplate?.levels ?? LEVELS;
  const phaseInfo = buildTemplate?.phaseInfo ?? PHASE_INFO;
  const buildSteps = buildTemplate?.buildSteps;
  const startSl = buildTemplate?.startingClass ? STARTING_SL[buildTemplate.startingClass] : 11;
  const maxSL = startSl + levels.length;
  const levelSls = levels.map((l) => l.sl);
  const levelProgress = countCompletedLevels(buildLevels, levelSls);
  const bStats = buildChecklistStats(checked, buildSteps);

  const [buildSub, setBuildSub] = useState<"roadmap" | "checklist" | "equip" | "infusion" | "farming" | "info">("roadmap");

  useEffect(() => {
    if (openSub) {
      setBuildSub(openSub);
      onOpenSubHandled?.();
    }
  }, [openSub, onOpenSubHandled]);
  const [buildPhase, setBuildPhase] = useState(0);

  const filteredLevels = (() => {
    const base = buildPhase === 0 ? [...levels] : levels.filter((l) => l.phase === buildPhase);
    const suggested = buildSuggest.nextSuggestion && "sl" in buildSuggest.nextSuggestion
      ? (buildSuggest.nextSuggestion as { sl: number }).sl
      : null;
    if (!suggested) return base;
    const completed = base.filter((l) => buildLevels[l.sl]).sort((a, b) => a.sl - b.sl);
    const unchecked = base.filter((l) => !buildLevels[l.sl]);
    const suggestedLevel = unchecked.find((l) => l.sl === suggested);
    const rest = unchecked.filter((l) => l.sl !== suggested).sort((a, b) => a.sl - b.sl);
    return [...completed, ...(suggestedLevel ? [suggestedLevel, ...rest] : unchecked)];
  })();

  return (
    <div style={{ padding: 20 }}>
      <div
        style={{
          textAlign: "center",
          marginBottom: 16,
          paddingBottom: 16,
          borderBottom: "1px solid #2a2420",
        }}
      >
        <label
          htmlFor="build-template-select"
          style={{
            display: "block",
            fontSize: 11,
            color: dimText,
            marginBottom: 6,
            fontFamily: "'Cinzel', Georgia, serif",
            letterSpacing: "0.06em",
          }}
        >
          CHOOSE YOUR BUILD
        </label>
        <select
          id="build-template-select"
          value={buildTemplateId}
          onChange={(e) => setBuildTemplateId(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px",
            background: bgCard,
            border: `1px solid ${gold}44`,
            borderRadius: 8,
            color: lightText,
            fontSize: 14,
            fontFamily: "'EB Garamond', Georgia, serif",
            marginBottom: 10,
            cursor: "pointer",
          }}
        >
          {buildTemplates.map((t) => {
            const sls = t.levels.map((l) => l.sl);
            const saved = state.buildProgress?.[t.id]?.levels ?? {};
            const { done, total } = countCompletedLevels(
              t.id === buildTemplateId ? buildLevels : saved,
              sls
            );
            const pct = total > 0 ? Math.round((done / total) * 100) : 0;
            return (
              <option key={t.id} value={t.id}>
                {t.name}
                {total > 0 ? ` — ${pct}% levels` : ""}
                {t.buildSteps.length > 0 ? " · Full guide" : ""}
              </option>
            );
          })}
        </select>
        <p style={{ fontSize: 11, color: dimText, lineHeight: 1.45, margin: "0 0 12px" }}>
          Area checklists stay the same when you switch builds. Level roadmap progress is saved separately for each build.
        </p>
        <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: "'Cinzel', Georgia, serif",
            fontSize: 18,
            color: gold,
            fontWeight: 700,
          }}
        >
          {buildTemplate?.name ?? "DARK MELEE HEXER"}
        </div>
        <div
          style={{
            fontSize: 12,
            color: dimText,
            marginTop: 4,
          }}
        >
          {buildTemplate?.description ?? "Dark-buffed katana + all 4 magic schools"}
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 14,
            color: gold,
            fontFamily: "'Cinzel', Georgia, serif",
          }}
        >
          SL {buildSuggest.currentSL} / {maxSL}
          {levelProgress.total > 0 && (
            <span style={{ color: dimText, fontSize: 12 }}>
              {" "}
              · Levels {levelProgress.done}/{levelProgress.total}
            </span>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "8px 12px",
            marginTop: 8,
            padding: "8px 12px",
            background: "rgba(0,0,0,0.2)",
            borderRadius: 10,
            maxWidth: 360,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {["VGR", "END", "VIT", "ATN", "STR", "DEX", "ADP", "INT", "FTH"].map(
            (stat) => (
              <span
                key={stat}
                style={{
                  fontSize: 10,
                  color: lightText,
                  fontFamily: "'EB Garamond', Georgia, serif",
                }}
              >
                <span style={{ color: gold }}>{stat}</span>{" "}
                {buildSuggest.currentStats[stat] ?? 0}
              </span>
            )
          )}
        </div>
        <div style={{ maxWidth: 200, margin: "8px auto 0" }}>
          <ProgressBar
            done={buildSuggest.levelsCompleted}
            total={levels.length}
            height={6}
          />
        </div>
        {buildSuggest.nextSuggestion && (
          <div style={{ marginTop: 8 }}>
            <div
              style={{
                fontSize: 11,
                color: ember,
              }}
            >
              {"sl" in buildSuggest.nextSuggestion
                ? `Next: SL ${(buildSuggest.nextSuggestion as { sl: number }).sl} — ${(buildSuggest.nextSuggestion as { stat: string }).stat}`
                : `Next: ${(buildSuggest.nextSuggestion as { stat: string }).stat} (${(buildSuggest.nextSuggestion as { current: number }).current} → ${(buildSuggest.nextSuggestion as { target: number }).target})`}
            </div>
            {buildSuggest.allOptions.length > 1 && (
              <div
                style={{
                  marginTop: 4,
                  fontSize: 9,
                  color: dimText,
                }}
              >
                Or: {buildSuggest.allOptions.slice(1).map((o) => `${o.stat} (${o.current}/${o.target})`).join(" • ")}
              </div>
            )}
          </div>
        )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          borderBottom: "1px solid #2a2420",
          marginBottom: 16,
        }}
      >
        {[
          ["roadmap", "Levels"],
          ["checklist", "Checklist"],
          ["equip", "Weapons"],
          ["infusion", "Infusion"],
          ["farming", "Farming"],
          ["info", "Info"],
        ].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setBuildSub(id as "roadmap" | "checklist" | "equip" | "infusion" | "farming" | "info")}
            style={{
              flex: 1,
              padding: 8,
              fontSize: 11,
              background: "transparent",
              border: "none",
              borderBottom: `2px solid ${
                buildSub === id ? gold : "transparent"
              }`,
              color: buildSub === id ? gold : dimText,
              cursor: "pointer",
              fontFamily: "'Cinzel', Georgia, serif",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {buildSub === "checklist" && (
        <div style={{ display: "grid", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: 12,
              background: bgCard,
              borderRadius: 16,
              border: "1px solid #2a2420",
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 13, color: gold, marginBottom: 6 }}>
                BUILD PROGRESS
              </div>
              <ProgressBar done={bStats.done} total={bStats.total} height={8} color="#8b5cf6" />
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: lightText }}>
              {bStats.done}/{bStats.total} ({bStats.pct}%)
            </div>
          </div>
          {phaseInfo.map((p) => {
            const steps = (buildSteps ?? BUILD_STEPS).filter((s) => s.phase === p.num);
            if (steps.length === 0) return null;
            const doneCount = steps.filter((s) => checked[s.progressId]).length;
            return (
              <div key={p.num} style={{ marginBottom: 16 }}>
                <div
                  style={{
                    fontFamily: "'Cinzel', Georgia, serif",
                    fontSize: 12,
                    color: p.color,
                    marginBottom: 8,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  Phase {p.num}: {p.name} — {doneCount}/{steps.length}
                </div>
                <div style={{ display: "grid", gap: 6 }}>
                  {steps.map((s) => {
                    const done = checked[s.progressId];
                    const area = getArea(s.areaId);
                    return (
                      <div
                        key={s.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "10px 12px",
                          background: done ? "rgba(107,158,58,0.08)" : bgCard,
                          borderRadius: 10,
                          border: `1px solid ${done ? successGreen + "33" : "#2a2420"}`,
                        }}
                      >
                        <div
                          onClick={() => toggle(s.progressId)}
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 16,
                            border: `2px solid ${done ? successGreen : dimText}`,
                            background: done ? successGreen : "transparent",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: bg,
                            fontSize: 12,
                            flexShrink: 0,
                          }}
                        >
                          {done ? "✓" : ""}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 12, fontWeight: 600, color: done ? dimText : lightText }}>
                            {s.name}{(s as { optional?: boolean }).optional ? " (Optional)" : ""}
                          </div>
                          <div style={{ fontSize: 10, color: dimText }}>{s.source}</div>
                        </div>
                        <button
                          onClick={() => { setSelectedArea(s.areaId); setView("area"); }}
                          style={{
                            fontSize: 10,
                            color: gold,
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            textDecoration: "underline",
                            flexShrink: 0,
                          }}
                        >
                          → {area.name}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {buildSub === "roadmap" && (
        <>
          <div
            style={{
              display: "flex",
              gap: 0,
              borderBottom: "1px solid #2a2420",
              marginBottom: 12,
            }}
          >
            <button
              onClick={() => setBuildPhase(0)}
              style={{
                flex: 1,
                padding: "8px 4px",
                fontSize: 9,
                fontFamily: "'Cinzel', Georgia, serif",
                cursor: "pointer",
                borderBottom: `2px solid ${buildPhase === 0 ? gold : "transparent"}`,
                color: buildPhase === 0 ? gold : dimText,
                background: "transparent",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
              }}
            >
              ALL
            </button>
            {phaseInfo.map((p) => {
              const pLevels = levels.filter((l) => l.phase === p.num);
              const pDone = pLevels.filter((l) => buildLevels[l.sl]).length;
              return (
                <button
                  key={p.num}
                  onClick={() => setBuildPhase(p.num)}
                  style={{
                    flex: 1,
                    padding: "8px 4px",
                    fontSize: 9,
                    fontFamily: "'Cinzel', Georgia, serif",
                    cursor: "pointer",
                    borderBottom: `2px solid ${
                      buildPhase === p.num ? p.color : "transparent"
                    }`,
                    color: buildPhase === p.num ? p.color : dimText,
                    background: "transparent",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                  }}
                >
                  P{p.num} {pDone === pLevels.length ? "✓" : ""}
                </button>
              );
            })}
          </div>

          <div style={{ display: "grid", gap: 2 }}>
            {filteredLevels.map((l) => {
              const done = buildLevels[l.sl];
              const isMilestone = l.note.startsWith("★");
              const pi = phaseInfo[l.phase - 1];
              const isSuggested = !done && buildSuggest.nextSuggestion && "sl" in buildSuggest.nextSuggestion && (buildSuggest.nextSuggestion as { sl: number }).sl === l.sl;
              return (
                <div
                  key={l.sl}
                  onClick={() => toggleBuildLevel(l.sl)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 10px",
                    borderRadius: 16,
                    cursor: "pointer",
                    background: done
                      ? "rgba(107,158,58,0.08)"
                      : isSuggested
                      ? "rgba(26,42,74,0.4)"
                      : isMilestone
                      ? "rgba(200,160,48,0.06)"
                      : "transparent",
                    border: `1px solid ${
                      done ? successGreen + "33" : isSuggested ? "rgba(26,42,74,0.6)" : "transparent"
                    }`,
                    opacity: done ? 0.6 : 1,
                  }}
                >
                  <span
                    style={{
                      width: 36,
                      fontSize: 10,
                      color: dimText,
                      fontFamily: "'Cinzel', Georgia, serif",
                    }}
                  >
                    SL{l.sl}
                  </span>
                  <span
                    style={{
                      width: 4,
                      height: 16,
                      borderRadius: 10,
                      background: pi?.color ?? gold,
                    }}
                  />
                  <span style={{ width: 32, fontSize: 11, fontWeight: 600 }}>
                    {l.stat}
                  </span>
                  <span style={{ color: dimText, fontSize: 10 }}>→</span>
                  <span style={{ width: 24, fontSize: 11, fontWeight: 600 }}>
                    {l.value}
                  </span>
                  <span
                    style={{
                      flex: 1,
                      fontSize: 10,
                      color: isMilestone ? gold : dimText,
                      fontStyle: isMilestone ? "normal" : "italic",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {l.note}
                  </span>
                  <span
                    style={{
                      width: 20,
                      textAlign: "center",
                      color: done ? successGreen : dimText,
                      fontSize: 12,
                    }}
                  >
                    {done ? "✓" : "·"}
                  </span>
                </div>
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              gap: 6,
              padding: "12px 0",
              flexWrap: "wrap",
            }}
          >
            {phaseInfo.map((pi) => {
              const pLevels = levels.filter((l) => l.phase === pi.num);
              const pDone = pLevels.filter((l) => buildLevels[l.sl]).length;
              if (pDone >= pLevels.length) return null;
              return (
                <button
                  key={pi.num}
                  onClick={() => {
                    const next: Record<number, boolean> = { ...buildLevels };
                    pLevels.forEach((l) => (next[l.sl] = true));
                    setBuildLevels(next);
                  }}
                  style={{
                    padding: "4px 10px",
                    fontSize: 9,
                    background: bgCard,
                    border: `1px solid #2a2420`,
                    borderRadius: 16,
                    cursor: "pointer",
                    color: pi.color,
                    fontFamily: "'Cinzel', Georgia, serif",
                  }}
                >
                  Fill P{pi.num}
                </button>
              );
            })}
            <button
              onClick={() => setBuildLevels({})}
              style={{
                padding: "4px 10px",
                fontSize: 9,
                background: bgCard,
                border: "1px solid #3a1515",
                borderRadius: 16,
                cursor: "pointer",
                color: warnRed,
                fontFamily: "'Cinzel', Georgia, serif",
              }}
            >
              Reset All
            </button>
          </div>
        </>
      )}

      {buildSub === "equip" && (
        <div style={{ display: "grid", gap: 16 }}>
          <div
            style={{
              padding: 12,
              background: "rgba(139,92,246,0.06)",
              border: "1px solid rgba(139,92,246,0.2)",
              borderRadius: 10,
              fontSize: 12,
              color: lightText,
              lineHeight: 1.5,
              marginBottom: 4,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <span><span style={{ color: gold }}>Infusion unlock:</span> {INFUSION_UNLOCK.item} → {INFUSION_UNLOCK.location} → give to {INFUSION_UNLOCK.giveTo}</span>
            {onOpenShopUnlocks && (
              <button onClick={onOpenShopUnlocks} style={{ fontSize: 10, color: successGreen, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>See Shop Unlocks →</button>
            )}
          </div>
          {(buildTemplate?.id === "dark-melee-hexer" || buildTemplate?.id === "dark-chaos-assassin") && (
            <div
              style={{
                padding: 10,
                background: "rgba(196,64,64,0.08)",
                border: "1px solid rgba(196,64,64,0.3)",
                borderRadius: 10,
                fontSize: 11,
                color: lightText,
                lineHeight: 1.5,
                marginBottom: 12,
              }}
            >
              <span style={{ color: warnRed }}>⚠ Felkin (hex merchant):</span> Shop needs 8 INT + 8 FTH to talk. 20/20 gift (Sunset Staff) requires <strong>BASE stats only</strong> — Ring of Knowledge, Ring of Faith, and other gear do NOT count.
            </div>
          )}
          <div>
            <div
              style={{
                fontFamily: "'Cinzel', Georgia, serif",
                fontSize: 14,
                color: gold,
                marginBottom: 10,
              }}
            >
              BUILD ITEMS — Where to Find & Farming
            </div>
            {buildTemplate?.ringsDetail && (
              <div
                style={{
                  marginBottom: 20,
                  padding: 14,
                  background: "rgba(196,160,48,0.06)",
                  border: "1px solid rgba(196,160,48,0.35)",
                  borderRadius: 12,
                }}
              >
                <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 13, color: gold, marginBottom: 10 }}>
                  RINGS — Priority & Where to Get
                </div>
                <div style={{ fontSize: 11, color: dimText, marginBottom: 12 }}>
                  <strong style={{ color: gold }}>Priority order:</strong> {buildTemplate.ringsDetail.priorityOrder.join(" → ")}
                </div>
                {buildTemplate.ringsDetail.groups.map((grp, gi) => (
                  <div key={gi} style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: gold, marginBottom: 6 }}>{grp.label}</div>
                    <div style={{ fontSize: 11, color: lightText }}>{grp.ringNames.join(", ")}</div>
                  </div>
                ))}
                <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 11, color: gold, marginTop: 14, marginBottom: 8 }}>
                  Full info — how and where to get each
                </div>
                {buildTemplate.ringsDetail.rings.map((r) => (
                  <div
                    key={r.name}
                    style={{
                      padding: "10px 12px",
                      background: bgCard,
                      borderRadius: 8,
                      marginBottom: 8,
                      border: "1px solid #2a2420",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: lightText }}>{r.name}</span>
                      {r.phase != null && <span style={{ fontSize: 10, color: dimText }}>Phase {r.phase}+</span>}
                      <span style={{ fontSize: 10, color: r.priority === "core" ? successGreen : dimText }}>{r.priority}</span>
                    </div>
                    <div style={{ fontSize: 11, color: lightText, marginBottom: 4 }}>{r.effect}</div>
                    <div style={{ fontSize: 10, color: gold }}>Where:</div>
                    <div style={{ fontSize: 10, color: lightText, marginBottom: 2 }}>{r.whereToGet}</div>
                    <div style={{ fontSize: 10, color: gold }}>How to get:</div>
                    <div style={{ fontSize: 10, color: lightText }}>{r.howToGet}</div>
                  </div>
                ))}
              </div>
            )}
            {(["weapon", "catalyst", "ring", "spell"] as const).map((t) => {
              const items = (buildTemplate?.buildItems ?? BUILD_ITEMS).filter((i) => i.type === t);
              if (items.length === 0) return null;
              const label = t === "weapon" ? "WEAPONS" : t === "catalyst" ? "CATALYSTS" : t === "ring" ? "RINGS" : "SPELLS";
              return (
                <div key={t} style={{ marginBottom: 16 }}>
                  <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 12, color: gold, marginBottom: 8 }}>{label}</div>
                  {items.map((it) => {
                    const isOptionalCollapsed = it.optional && it.progressId && !checked[it.progressId];
                    return (
                    <div
                      key={it.name}
                      style={{
                        padding: isOptionalCollapsed ? "8px 12px" : "12px 14px",
                        background: bgCard,
                        borderRadius: 10,
                        marginBottom: 8,
                        border: "1px solid #2a2420",
                      }}
                    >
                      {isOptionalCollapsed ? (
                        <div style={{ fontSize: 12, color: dimText }}>
                          (Optional) {it.name} — check &quot;{it.name}&quot; in checklist to show where to find, upgrade path & materials.
                        </div>
                      ) : (
                        <>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <div style={{ width: 4, height: 20, borderRadius: 6, background: "#8b5cf6" }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: lightText }}>{it.name}</div>
                          <div style={{ fontSize: 11, color: dimText }}>{it.role} · Phase {it.phase}+</div>
                        </div>
                      </div>
                      <div style={{ fontSize: 11, color: lightText, lineHeight: 1.6, marginLeft: 12 }}>
                        <div style={{ color: gold, marginBottom: 4 }}>Where to find:</div>
                        {it.whereToFind.map((s, i) => (
                          <div key={i} style={{ marginBottom: 2 }}>
                            · {s.type === "buy" || s.type === "vendor" ? s.location : s.location}: {s.detail}
                            {s.unlock && <span style={{ color: dimText }}> ({s.unlock})</span>}
                          </div>
                        ))}
                        {it.farmOptions && it.farmOptions.length > 0 && (
                          <>
                            <div style={{ color: successGreen, marginTop: 8, marginBottom: 4 }}>Farming:</div>
                            {it.farmOptions.map((f, i) => (
                              <div key={i} style={{ marginBottom: 2 }}>
                                · {f.enemy} — {f.area}
                                {f.method && <span style={{ color: dimText }}> — {f.method}</span>}
                                {f.unlock && <span style={{ color: dimText }}> ({f.unlock})</span>}
                              </div>
                            ))}
                          </>
                        )}
                        {it.notes && (
                          <div style={{ marginTop: 6, fontStyle: "italic", color: dimText }}>{it.notes}</div>
                        )}
                      </div>
                        </>
                      )}
                    </div>
                  );})}
                </div>
              );
            })}
          </div>
          <div>
            <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 13, color: gold, marginBottom: 8 }}>
              MATERIAL FARMS (Fire Seeds, Titanite, Stones)
            </div>
            {(buildTemplate?.buildMaterialFarms ?? BUILD_MATERIAL_FARMS).map((m) => (
              <div
                key={m.item}
                style={{
                  padding: "10px 12px",
                  background: bgCard,
                  borderRadius: 10,
                  marginBottom: 8,
                  border: "1px solid #2a2420",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 600 }}>{m.item}</div>
                <div style={{ fontSize: 10, color: dimText, marginBottom: 6 }}>{m.purpose}</div>
                <div style={{ fontSize: 11, color: lightText }}>
                  <span style={{ color: gold }}>Where to find:</span>
                  {m.sources.map((s, i) => (
                    <div key={i} style={{ marginTop: 2 }}>· {s.location}: {s.detail}{s.unlock && ` (${s.unlock})`}</div>
                  ))}
                </div>
                {m.farmOptions.length > 0 && (
                  <div style={{ fontSize: 11, color: successGreen, marginTop: 8 }}>
                    <span style={{ color: successGreen }}>Farming:</span>
                    {m.farmOptions.map((f, i) => (
                      <div key={i} style={{ marginTop: 2 }}>· {f.enemy} — {f.area}{f.method && ` — ${f.method}`}{f.unlock && ` (${f.unlock})`}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 13, color: gold, marginBottom: 8 }}>
              UPGRADE TIERS
            </div>
            <div style={{ background: bgCard, borderRadius: 10, padding: 12, border: "1px solid #2a2420" }}>
              {UPGRADE_TIERS.map((t) => (
                <div key={t.tier} style={{ fontSize: 12, color: lightText, marginBottom: 6, lineHeight: 1.5 }}>
                  <span style={{ color: gold }}>{t.tier}</span> — {t.material} ({t.smith})
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {buildSub === "infusion" && (
        <div style={{ display: "grid", gap: 16 }}>
          <div
            style={{
              padding: 14,
              background: "rgba(139,92,246,0.08)",
              border: "1px solid rgba(139,92,246,0.3)",
              borderRadius: 16,
            }}
          >
            <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 14, color: gold, marginBottom: 10 }}>
              INFUSION UNLOCK
            </div>
            <div style={{ fontSize: 12, color: lightText, lineHeight: 1.6, marginBottom: 12 }}>
              <span style={{ color: gold }}>Dull Ember</span> → Lost Bastille (Tower Apart chest) → give to <span style={{ color: gold }}>McDuff</span>
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {INFUSION_UNLOCK_STEPS.map((s) => (
                <div key={s.step} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 12 }}>
                  <span style={{ color: gold, minWidth: 20 }}>{s.step}.</span>
                  <div>
                    <div style={{ color: lightText }}><strong>{s.action}</strong> — {s.location}</div>
                    {s.detail && <div style={{ fontSize: 11, color: dimText, marginTop: 2 }}>{s.detail}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 13, color: gold, marginBottom: 8 }}>
              BUILD WEAPONS TO INFUSE
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {BUILD_INFUSIONS.map((b) => (
                <div
                  key={b.weapon}
                  style={{
                    padding: "10px 12px",
                    background: bgCard,
                    borderRadius: 10,
                    border: "1px solid #2a2420",
                    fontSize: 12,
                  }}
                >
                  <div style={{ color: lightText, fontWeight: 600 }}>{b.weapon} → {b.stone}</div>
                  <div style={{ color: dimText, fontSize: 11, marginTop: 4 }}>Phase {b.phase} · {b.smith}</div>
                  {b.note && <div style={{ fontSize: 11, color: dimText, fontStyle: "italic", marginTop: 2 }}>{b.note}</div>}
                  {b.alt && <div style={{ fontSize: 10, color: dimText, marginTop: 2 }}>Alt: {b.alt}</div>}
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              padding: 12,
              background: "rgba(107,158,58,0.08)",
              border: "1px solid rgba(107,158,58,0.3)",
              borderRadius: 10,
              fontSize: 11,
              color: lightText,
            }}
          >
            <div style={{ color: gold, fontWeight: 600, marginBottom: 4 }}>Dyna & Tillo (bird nest)</div>
            <div>{DYNA_TILLO_TRADE.location}</div>
            <div style={{ color: dimText, marginTop: 4 }}>Trade Smooth & Silky for: {DYNA_TILLO_TRADE.stones}</div>
            <div style={{ fontSize: 10, color: dimText, marginTop: 2, fontStyle: "italic" }}>{DYNA_TILLO_TRADE.tip}</div>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 13, color: gold }}>
                INFUSION STONES — SOURCES & FARMING
              </div>
              {onOpenShopUnlocks && (
                <button onClick={onOpenShopUnlocks} style={{ fontSize: 10, color: successGreen, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>See Shop Unlocks →</button>
              )}
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              {INFUSION_STONES.filter((s) => s.infusion && s.infusion !== "—").map((s) => (
                <div
                  key={s.name}
                  style={{
                    padding: "12px 14px",
                    background: bgCard,
                    borderRadius: 10,
                    border: "1px solid #2a2420",
                  }}
                >
                  <div style={{ color: gold, fontWeight: 600, marginBottom: 6 }}>{s.name} — {s.infusion} ({s.scaling})</div>
                  <div style={{ fontSize: 11, color: lightText, marginBottom: 6 }}>
                    <span style={{ color: dimText }}>Purchase / find:</span>
                    {s.sources.map((src, i) => (
                      <div key={i} style={{ marginTop: 4, paddingLeft: 4, borderLeft: "2px solid #2a2420" }}>
                        <div style={{ color: gold }}>· {src.location}{src.detail && !(src.bonfire && src.path) ? `: ${src.detail}` : ""}</div>
                        {src.bonfire && src.path && (
                          <div style={{ fontSize: 10, color: dimText, marginTop: 2 }}>
                            <span style={{ color: ember }}>From {src.bonfire} bonfire:</span> {src.path}
                          </div>
                        )}
                        {src.unlock && <div style={{ fontSize: 10, color: dimText, marginTop: 1 }}>Unlock: {src.unlock}</div>}
                        {src.price && <div style={{ fontSize: 10, color: dimText, marginTop: 1 }}>{src.price.toLocaleString()} souls</div>}
                      </div>
                    ))}
                  </div>
                  {s.farmEnemies.length > 0 && (
                    <div style={{ fontSize: 11, color: lightText, borderTop: "1px solid #2a2420", paddingTop: 6 }}>
                      <span style={{ color: dimText }}>Farm drops:</span>
                      {s.farmEnemies.map((e, i) => (
                        <div key={i} style={{ marginTop: 2 }}>
                          · {e.enemy} — {e.area}
                          {e.method && <span style={{ color: successGreen }}> ({e.method})</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 10, color: dimText, fontStyle: "italic" }}>{PALESTONE_NOTE}</div>
        </div>
      )}

      {buildSub === "farming" && (
        <div style={{ display: "grid", gap: 16 }}>
          <button
            onClick={() => setView("farm")}
            style={{
              padding: 14,
              background: "rgba(139,92,246,0.1)",
              border: "1px solid rgba(139,92,246,0.3)",
              borderRadius: 16,
              color: gold,
              cursor: "pointer",
              fontSize: 13,
              fontFamily: "'Cinzel', Georgia, serif",
              textAlign: "left",
            }}
          >
            → Open full Farming tab
          </button>
          <BuildFarmingContent buildTemplate={buildTemplate} />
          <div>
            <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 13, color: gold, marginBottom: 8 }}>
              SOUL FARM RUNS
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {SOUL_FARM_RUNS.map((r) => (
                <div key={r.name} style={{ padding: 10, background: bgCard, borderRadius: 10, border: "1px solid #2a2420" }}>
                  <div style={{ color: gold, fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{r.name}{r.best ? " ★" : ""}</div>
                  <div style={{ fontSize: 11, color: lightText }}>~{(r.soulsPerRun / 1000).toFixed(r.soulsPerRun >= 1000 ? 1 : 0)}k/run · {r.bonfire}</div>
                  <div style={{ fontSize: 10, color: dimText, marginTop: 4 }}><span style={{ color: gold }}>Unlock:</span> {r.unlock}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 13, color: gold }}>TITANITE SOURCES</div>
              {onOpenShopUnlocks && (
                <button onClick={onOpenShopUnlocks} style={{ fontSize: 10, color: successGreen, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>See Shop Unlocks →</button>
              )}
            </div>
            <div style={{ fontSize: 12, color: lightText, lineHeight: 1.6 }}>
              <div style={{ marginBottom: 6 }}><span style={{ color: gold }}>Shards:</span> Lenigrast, Melentia</div>
              <div style={{ marginBottom: 6 }}><span style={{ color: gold }}>Large:</span> McDuff (unlimited)</div>
              <div style={{ marginBottom: 6 }}><span style={{ color: gold }}>Chunks:</span> Chloanne (unlocks with bosses)</div>
              <div style={{ marginBottom: 6 }}><span style={{ color: gold }}>Slab:</span> McDuff (14k spent), rare drops</div>
              <div><span style={{ color: gold }}>Twinkling:</span> Dragon Aerie lizards, Heide Knights</div>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 13, color: gold, marginBottom: 8 }}>
              KEY MECHANICS
            </div>
            <div style={{ fontSize: 11, color: lightText, lineHeight: 1.6 }}>
              <div style={{ marginBottom: 8 }}><span style={{ color: gold }}>Despawn:</span> 12 kills. Use CoC or Ascetic for infinite.</div>
              <div style={{ marginBottom: 8 }}><span style={{ color: gold }}>Giant Lord:</span> Ascetic in memory = self-sustaining ~300k/run</div>
              <div><span style={{ color: gold }}>Soul gear:</span> CSSR+1 (10k Melentia), Tseldora set, Symbol of Avarice</div>
            </div>
          </div>
        </div>
      )}

      {buildSub === "info" && (
        <div style={{ display: "grid", gap: 12 }}>
          <div
            style={{
              padding: 12,
              background: "rgba(139,92,246,0.06)",
              border: "1px solid rgba(139,92,246,0.2)",
              borderRadius: 16,
              fontSize: 12,
              lineHeight: 1.6,
            }}
          >
            <div
              style={{
                fontFamily: "'Cinzel', Georgia, serif",
                color: gold,
                marginBottom: 6,
              }}
            >
              BUILD PHILOSOPHY
            </div>
            You are a dark-buffed katana user with access to all 4 magic schools.
            Dark Orb is your ranged option, not your identity. The Uchigatana +
            Dark Weapon buff is primary damage.
          </div>
          <div
            style={{
              padding: 12,
              background: "rgba(139,92,246,0.06)",
              border: "1px solid rgba(139,92,246,0.2)",
              borderRadius: 16,
              fontSize: 12,
              lineHeight: 1.6,
            }}
          >
            <div
              style={{
                fontFamily: "'Cinzel', Georgia, serif",
                color: gold,
                marginBottom: 6,
              }}
            >
              AGILITY MATH
            </div>
            AGI = ((ATN + 3×ADP) / 4) + 80. ATN 43 + ADP 13 → 100 AGI = 11
            i-frames + fastest Estus.
          </div>
        </div>
      )}
    </div>
  );
}

// Items View — Boss Souls, Pharros Doors, Secret Paths, Shop Unlocks sub-tabs
function ItemsView({
  setView,
  setSelectedArea,
  checked,
  toggle,
  openSub,
  onOpenSubHandled,
  buildTemplateId,
}: {
  setView: (v: View) => void;
  setSelectedArea: (a: AreaId | null) => void;
  checked: Record<string, boolean>;
  toggle: (id: string) => void;
  openSub?: "shop_unlocks" | null;
  onOpenSubHandled?: () => void;
  buildTemplateId?: string;
}) {
  const [itemsSub, setItemsSub] = useState<"boss_souls" | "pharros" | "secret_paths" | "shop_unlocks" | "database">("boss_souls");

  useEffect(() => {
    if (openSub === "shop_unlocks") {
      setItemsSub("shop_unlocks");
      onOpenSubHandled?.();
    }
  }, [openSub, onOpenSubHandled]);
  const [bossFilter, setBossFilter] = useState<"all" | "trade" | "consume">("all");
  const [bossSearch, setBossSearch] = useState("");
  const [pharrosHideTraps, setPharrosHideTraps] = useState(false);
  const [secretFilter, setSecretFilter] = useState<"illusory" | "breakable" | "all">("illusory");
  const [secretSearch, setSecretSearch] = useState("");
  const [shopUnlockMerchant, setShopUnlockMerchant] = useState<string>("");
  const [shopUnlockCondition, setShopUnlockCondition] = useState<UnlockConditionType | "">("");
  const [shopUnlockSearch, setShopUnlockSearch] = useState("");

  const filteredSouls = BOSS_SOULS.filter((b) => {
    if (bossFilter === "trade") return b.trades.length > 0;
    if (bossFilter === "consume") return b.trades.length === 0;
    if (bossSearch) {
      const q = bossSearch.toLowerCase();
      const match =
        b.soulName.toLowerCase().includes(q) ||
        b.bossName.toLowerCase().includes(q) ||
        b.area.toLowerCase().includes(q) ||
        b.trades.some((t) => t.name.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const dpContraptions = pharrosHideTraps
    ? DOORS_OF_PHARROS_CONTRAPTIONS.filter((c) => !c.isTrap)
    : DOORS_OF_PHARROS_CONTRAPTIONS;

  return (
    <div style={{ padding: 20 }}>
      <div
        style={{
          marginBottom: 16,
          padding: 14,
          background: "rgba(139,92,246,0.08)",
          border: "1px solid rgba(139,92,246,0.2)",
          borderRadius: 16,
          fontSize: 12,
          color: lightText,
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: gold }}>Data source:</strong> Fextralife Wiki, IGN Wiki. Scholar of the First Sin (SotFS). Trade with Straid (Lost Bastille) or Ornifex (Brightstone Cove). Wait until you meet both before consuming.
      </div>

      <div
        style={{
          display: "flex",
          borderBottom: "1px solid #2a2420",
          marginBottom: 16,
        }}
      >
        {[
          ["boss_souls", "Boss Souls"],
          ["pharros", "Pharros Doors"],
          ["secret_paths", "Secret Paths"],
          ["shop_unlocks", "Shop Unlocks"],
          ["database", "Database"],
        ].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setItemsSub(id as typeof itemsSub)}
            style={{
              flex: 1,
              padding: 10,
              fontSize: 12,
              background: "transparent",
              border: "none",
              borderBottom: `2px solid ${itemsSub === id ? gold : "transparent"}`,
              color: itemsSub === id ? gold : dimText,
              cursor: "pointer",
              fontFamily: "'Cinzel', Georgia, serif",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {itemsSub === "database" && <ItemDatabaseView showHeader={true} compact={true} />}

      {itemsSub === "boss_souls" && (
        <>
          <div
            style={{
              marginBottom: 16,
              padding: 12,
              background: "rgba(196,64,64,0.08)",
              border: `1px solid ${warnRed}44`,
              borderRadius: 16,
              fontSize: 11,
              color: warnRed,
              lineHeight: 1.6,
            }}
          >
            {GIANT_SOUL_DISCLAIMER}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16, alignItems: "center" }}>
            <input
              type="text"
              placeholder="Search soul, boss, area..."
              value={bossSearch}
              onChange={(e) => setBossSearch(e.target.value)}
              style={{
                padding: "8px 12px",
                fontSize: 12,
                background: bgCard,
                border: `1px solid ${colors.border}`,
                borderRadius: 12,
                color: lightText,
                minWidth: 200,
              }}
            />
            {[
              ["all", "All"],
              ["trade", "Has trade"],
              ["consume", "Consume only"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setBossFilter(id as "all" | "trade" | "consume")}
                style={{
                  padding: "6px 12px",
                  fontSize: 11,
                  background: bossFilter === id ? gold : "transparent",
                  color: bossFilter === id ? "#0c0b0a" : dimText,
                  border: `1px solid ${bossFilter === id ? gold : "#2a2420"}`,
                  borderRadius: 10,
                  cursor: "pointer",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            {filteredSouls.map((b) => (
              <div
                key={b.id}
                style={{
                  background: bgCard,
                  borderRadius: 16,
                  padding: 16,
                  border: "1px solid #2a2420",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: 8,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'Cinzel', Georgia, serif",
                        fontSize: 14,
                        color: gold,
                        fontWeight: 600,
                      }}
                    >
                      {b.soulName}
                    </div>
                    <div style={{ fontSize: 11, color: dimText, marginTop: 2 }}>
                      {b.bossName} — {b.area}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: ember,
                      fontWeight: 600,
                      fontFamily: "'Cinzel', Georgia, serif",
                    }}
                  >
                    Consume: {b.consumeSouls.toLocaleString()} souls
                  </div>
                </div>

                {b.trades.length > 0 ? (
                  <div style={{ marginTop: 12 }}>
                    <div style={{ fontSize: 11, color: gold, marginBottom: 8 }}>Trade for</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {b.trades.map((t) => {
                        const details = getBossSoulTradeDetails(t.name);
                        const vendorColor = t.vendor === "straid" ? "#5e9ecf" : gold;
                        const vendorBg = t.vendor === "straid" ? "rgba(94,158,207,0.15)" : "rgba(200,160,48,0.15)";
                        return (
                          <div
                            key={t.name}
                            style={{
                              padding: 12,
                              background: "#0c0b0a",
                              borderRadius: 12,
                              border: "1px solid #2a2420",
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                              <span style={{ fontWeight: 600, fontSize: 12 }}>{t.name}</span>
                              <span style={{ fontSize: 10, color: dimText }}>({t.type})</span>
                              <span style={{ padding: "2px 6px", background: vendorBg, color: vendorColor, borderRadius: 8, fontSize: 10 }}>{t.vendor}</span>
                            </div>
                            {details ? (
                              <div style={{ marginTop: 10, fontSize: 10, color: lightText, lineHeight: 1.7 }}>
                                {details.type === "weapon" && (
                                  <>
                                    <div style={{ color: gold }}>{details.weaponClass}</div>
                                    {details.weaponClass === "Chime" || (details.damage.physical === 0 && !details.damage.magic && !details.damage.fire) ? (
                                      <div>Catalyst · Scaling: {Object.entries(details.scaling).filter(([, v]) => v).map(([k, v]) => `${k.toUpperCase()}: ${v}`).join(" · ")}</div>
                                    ) : (
                                      <div>
                                        Damage: {["physical", "magic", "fire", "lightning", "dark"]
                                          .map((k) => {
                                            const v = details.damage[k as keyof typeof details.damage];
                                            if (v == null || v === 0) return null;
                                            const lab = { physical: "Phys", magic: "Mag", fire: "Fire", lightning: "Ltng", dark: "Dark" }[k];
                                            return `${lab}: ${v}`;
                                          })
                                          .filter(Boolean)
                                          .join(" · ")}
                                        {details.damageMax?.physical != null && details.damageMax.physical > 0 && ` → +5 Phys: ${details.damageMax.physical}`}
                                      </div>
                                    )}
                                    <div>
                                      Scaling: {Object.entries(details.scaling)
                                        .filter(([, v]) => v)
                                        .map(([k, v]) => `${k.toUpperCase()}: ${v}`)
                                        .join(" · ")}
                                    </div>
                                    <div>
                                      Reqs: {Object.entries(details.requirements)
                                        .filter(([, v]) => v)
                                        .map(([k, v]) => `${k.toUpperCase()} ${v}`)
                                        .join(" · ")}
                                      {" · "}Wt: {details.weight}
                                      {details.durability != null && ` · Dur: ${details.durability}`}
                                      {details.counterStrength != null && ` · Counter: ${details.counterStrength}`}
                                    </div>
                                    {details.specialEffect && (
                                      <div style={{ color: ember, marginTop: 4 }}>⚠ {details.specialEffect}</div>
                                    )}
                                    {details.description && <div style={{ color: dimText, marginTop: 4, fontStyle: "italic" }}>{details.description}</div>}
                                    <div style={{ color: dimText, marginTop: 2 }}>Upgrade: {details.upgradeMaterial}</div>
                                  </>
                                )}
                                {details.type === "shield" && (
                                  <>
                                    <div style={{ color: gold }}>{details.shieldClass}</div>
                                    <div>
                                      Stability: {details.stability}{details.stabilityMax ? ` → ${details.stabilityMax} +5` : ""}
                                      {" · "}Block: Phys {details.damageReduction.physical}%
                                      {details.damageReduction.magic != null && ` · Mag ${details.damageReduction.magic}%`}
                                      {details.damageReduction.fire != null && ` · Fire ${details.damageReduction.fire}%`}
                                    </div>
                                    <div>
                                      {details.requirements && Object.keys(details.requirements).length > 0 && (
                                        <>Reqs: STR {details.requirements.str ?? "—"} · </>
                                      )}
                                      Wt: {details.weight}
                                      {details.damage?.physical != null && details.damage.physical > 0 && ` · Bash: ${details.damage.physical}`}
                                    </div>
                                    {details.description && <div style={{ color: dimText, marginTop: 4, fontStyle: "italic" }}>{details.description}</div>}
                                    <div style={{ color: dimText, marginTop: 2 }}>Upgrade: {details.upgradeMaterial}</div>
                                  </>
                                )}
                                {(details.type === "sorcery" || details.type === "miracle" || details.type === "pyromancy" || details.type === "hex") && (
                                  <>
                                    <div style={{ color: gold }}>{details.type}</div>
                                    <div>
                                      Slots: {details.slots} · Uses: {details.uses}
                                      {details.intReq != null && ` · INT ${details.intReq}`}
                                      {details.fthReq != null && ` · FTH ${details.fthReq}`}
                                    </div>
                                    {details.effect && <div style={{ marginTop: 4 }}>{details.effect}</div>}
                                    {details.description && <div style={{ color: dimText, marginTop: 4, fontStyle: "italic" }}>{details.description}</div>}
                                  </>
                                )}
                              </div>
                            ) : (
                              <div style={{ marginTop: 6, fontSize: 10, color: dimText }}>No detailed stats</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div style={{ marginTop: 12, fontSize: 11, color: dimText, fontStyle: "italic" }}>
                    No trade. Safe to consume for souls.
                  </div>
                )}

                {(() => {
                  const buildRelevant = isBossSoulRelevantForBuild(b.id, buildTemplateId);
                  if (buildRelevant) {
                    return (
                      <div
                        onClick={() => setView("build")}
                        style={{
                          marginTop: 10,
                          padding: 10,
                          background: "rgba(139,92,246,0.12)",
                          border: "1px solid rgba(139,92,246,0.35)",
                          borderRadius: 10,
                          fontSize: 11,
                          color: "#8b5cf6",
                          cursor: "pointer",
                        }}
                      >
                        <span style={{ fontWeight: 600 }}>⚔ Build-relevant:</span> {buildRelevant}
                        <div style={{ fontSize: 9, color: dimText, marginTop: 4 }}>Click to open Build tab</div>
                      </div>
                    );
                  }
                  return null;
                })()}

                {b.disclaimer && (
                  <div
                    style={{
                      marginTop: 10,
                      padding: 8,
                      background: "rgba(196,64,64,0.1)",
                      border: `1px solid ${warnRed}44`,
                      borderRadius: 10,
                      fontSize: 11,
                      color: warnRed,
                    }}
                  >
                    ⚠ {b.disclaimer}
                  </div>
                )}

                {b.note && !b.disclaimer && (
                  <div style={{ marginTop: 8, fontSize: 10, color: dimText, fontStyle: "italic" }}>
                    {b.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {itemsSub === "pharros" && (
        <>
          <div
            style={{
              marginBottom: 16,
              padding: 12,
              background: "rgba(200,160,48,0.08)",
              border: `1px solid ${gold}44`,
              borderRadius: 16,
              fontSize: 11,
              color: lightText,
              lineHeight: 1.6,
            }}
          >
            <strong style={{ color: gold }}>Pharros Lockstones</strong> — Save for high-value uses. Many Doors of Pharros contraptions are traps. Check boxes when you open a door.
          </div>

          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            <button
              onClick={() => setPharrosHideTraps(!pharrosHideTraps)}
              style={{
                padding: "6px 12px",
                fontSize: 11,
                background: pharrosHideTraps ? gold : "transparent",
                color: pharrosHideTraps ? "#0c0b0a" : dimText,
                border: `1px solid ${pharrosHideTraps ? gold : "#2a2420"}`,
                borderRadius: 10,
                cursor: "pointer",
              }}
            >
              {pharrosHideTraps ? "Show traps" : "Hide traps (Doors of Pharros)"}
            </button>
          </div>

          <div style={{ fontSize: 13, color: gold, fontWeight: 600, marginBottom: 10, fontFamily: "'Cinzel', Georgia, serif" }}>
            Key Uses — Other Areas
          </div>
          <div style={{ display: "grid", gap: 10, marginBottom: 24 }}>
            {PHARROS_KEY_USES.map((p) => (
              <div
                key={p.id}
                style={{
                  background: bgCard,
                  borderRadius: 16,
                  padding: 14,
                  border: "1px solid #2a2420",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                }}
              >
                <input
                  type="checkbox"
                  checked={!!checked[p.id]}
                  onChange={() => toggle(p.id)}
                  style={{ marginTop: 2, accentColor: gold }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: gold, fontWeight: 600 }}>{getArea(p.areaId).name}</div>
                  {p.items && p.items.length > 0 && (
                    <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {p.items.map((it) => (
                        <span key={it} style={{ padding: "4px 10px", background: "rgba(200,160,48,0.35)", color: gold, borderRadius: 16, fontSize: 12, fontWeight: 600 }}>
                          {it}
                        </span>
                      ))}
                    </div>
                  )}
                  <div style={{ fontSize: 11, color: lightText, marginTop: 6 }}>{p.location}</div>
                  {p.howToGetThere && <div style={{ fontSize: 10, color: gold, marginTop: 4 }}>📍 {p.howToGetThere}</div>}
                  <div style={{ fontSize: 10, color: dimText, marginTop: 2 }}>{p.effect}</div>
                  {p.note && <div style={{ marginTop: 4, fontSize: 10, color: dimText, fontStyle: "italic" }}>{p.note}</div>}
                </div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 13, color: gold, fontWeight: 600, marginBottom: 10, fontFamily: "'Cinzel', Georgia, serif" }}>
            Doors of Pharros — Every Contraption (Detailed)
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            {dpContraptions.map((c) => (
              <div
                key={c.id}
                style={{
                  background: bgCard,
                  borderRadius: 16,
                  padding: 14,
                  border: `1px solid ${c.isTrap ? "rgba(196,64,64,0.3)" : "#2a2420"}`,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                }}
              >
                <input
                  type="checkbox"
                  checked={!!checked[c.id]}
                  onChange={() => toggle(c.id)}
                  style={{ marginTop: 2, accentColor: gold }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 10, color: dimText }}>{c.floor} floor</span>
                    {c.isTrap && <span style={{ padding: "1px 5px", background: "rgba(196,64,64,0.2)", color: warnRed, borderRadius: 16, fontSize: 9 }}>TRAP</span>}
                  </div>
                  {c.items && c.items.length > 0 && (
                    <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {c.items.map((it) => (
                        <span key={it} style={{ padding: "4px 10px", background: "rgba(200,160,48,0.35)", color: gold, borderRadius: 16, fontSize: 12, fontWeight: 600 }}>
                          {it}
                        </span>
                      ))}
                    </div>
                  )}
                  <div style={{ fontSize: 11, color: lightText, marginTop: 6 }}>{c.location}</div>
                  <div style={{ fontSize: 10, color: dimText, marginTop: 2 }}>{c.effect}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {itemsSub === "secret_paths" && (
        <>
          <div
            style={{
              marginBottom: 16,
              padding: 12,
              background: "rgba(94,158,207,0.08)",
              border: "1px solid rgba(94,158,207,0.3)",
              borderRadius: 16,
              fontSize: 11,
              color: lightText,
              lineHeight: 1.6,
            }}
          >
            <strong style={{ color: "#5e9ecf" }}>Illusory walls:</strong> Press <strong>A/X</strong> (interact) — <em>striking does NOT work</em> in DS2. <strong>Breakable:</strong> attack or explosions (firebomb hollow, kegs).
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16, alignItems: "center" }}>
            <input
              type="text"
              placeholder="Search area, location, items..."
              value={secretSearch}
              onChange={(e) => setSecretSearch(e.target.value)}
              style={{
                padding: "8px 12px",
                fontSize: 12,
                background: bgCard,
                border: `1px solid ${colors.border}`,
                borderRadius: 12,
                color: lightText,
                minWidth: 220,
              }}
            />
            {(["illusory", "breakable", "all"] as const).map((id) => (
              <button
                key={id}
                onClick={() => setSecretFilter(id)}
                style={{
                  padding: "6px 12px",
                  fontSize: 11,
                  background: secretFilter === id ? "#5e9ecf" : "transparent",
                  color: secretFilter === id ? "#0c0b0a" : dimText,
                  border: `1px solid ${secretFilter === id ? "#5e9ecf" : "#2a2420"}`,
                  borderRadius: 10,
                  cursor: "pointer",
                }}
              >
                {id === "illusory" ? "Illusory only" : id === "breakable" ? "Breakable only" : "All"}
              </button>
            ))}
          </div>

          {(secretFilter === "illusory" || secretFilter === "all") && (
            <>
              <div style={{ fontSize: 13, color: "#5e9ecf", fontWeight: 600, marginBottom: 10, fontFamily: "'Cinzel', Georgia, serif" }}>
                Illusory Walls — Press A/X
              </div>
              <div style={{ display: "grid", gap: 10, marginBottom: secretFilter === "all" ? 24 : 0 }}>
                {ILLUSORY_WALLS.filter((w) => {
                  if (!secretSearch) return true;
                  const q = secretSearch.toLowerCase();
                  return (
                    getArea(w.areaId).name.toLowerCase().includes(q) ||
                    w.location.toLowerCase().includes(q) ||
                    w.items.some((i) => i.toLowerCase().includes(q))
                  );
                }).map((w) => (
                  <div
                    key={w.id}
                    style={{
                      background: bgCard,
                      borderRadius: 16,
                      padding: 14,
                      border: "1px solid #2a2420",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={!!checked[w.id]}
                      onChange={() => toggle(w.id)}
                      style={{ marginTop: 2, accentColor: gold }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, color: "#5e9ecf", fontWeight: 600 }}>{getArea(w.areaId).name}</div>
                      <div style={{ fontSize: 11, color: lightText, marginTop: 2 }}><strong>Where:</strong> {w.location}</div>
                      {w.description && (
                        <div style={{ fontSize: 10, color: dimText, marginTop: 4, lineHeight: 1.5 }}><strong>Path:</strong> {w.description}</div>
                      )}
                      <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {w.items.map((it) => (
                          <span key={it} style={{ padding: "2px 6px", background: "rgba(94,158,207,0.15)", color: "#5e9ecf", borderRadius: 16, fontSize: 10 }}>
                            {it}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {(secretFilter === "breakable" || secretFilter === "all") && (
            <>
              <div style={{ fontSize: 13, color: ember, fontWeight: 600, marginBottom: 10, marginTop: secretFilter === "all" ? 8 : 0, fontFamily: "'Cinzel', Georgia, serif" }}>
                Breakable Walls — Attack or Explosions
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                {BREAKABLE_WALLS.filter((w) => {
                  if (!secretSearch) return true;
                  const q = secretSearch.toLowerCase();
                  return (
                    getArea(w.areaId).name.toLowerCase().includes(q) ||
                    w.location.toLowerCase().includes(q) ||
                    w.items.some((i) => i.toLowerCase().includes(q))
                  );
                }).map((w) => (
                  <div
                    key={w.id}
                    style={{
                      background: bgCard,
                      borderRadius: 16,
                      padding: 14,
                      border: "1px solid #2a2420",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={!!checked[w.id]}
                      onChange={() => toggle(w.id)}
                      style={{ marginTop: 2, accentColor: gold }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, color: ember, fontWeight: 600 }}>{getArea(w.areaId).name}</div>
                      <div style={{ fontSize: 11, color: lightText, marginTop: 2 }}><strong>Where:</strong> {w.location}</div>
                      <div style={{ fontSize: 10, color: dimText, marginTop: 4, lineHeight: 1.5 }}><strong>How:</strong> {w.howToBreak}</div>
                      <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {w.items.map((it) => (
                          <span key={it} style={{ padding: "2px 6px", background: "rgba(212,101,42,0.15)", color: ember, borderRadius: 16, fontSize: 10 }}>
                            {it}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}

      {itemsSub === "shop_unlocks" && (
        <>
          <div
            style={{
              marginBottom: 16,
              padding: 12,
              background: "rgba(107,158,58,0.08)",
              border: "1px solid rgba(107,158,58,0.3)",
              borderRadius: 16,
              fontSize: 11,
              color: lightText,
              lineHeight: 1.6,
            }}
          >
            <strong style={{ color: successGreen }}>Shop Unlocks:</strong> When items become available at merchants — progression, keys, souls spent, stat requirements, etc.
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16, alignItems: "center" }}>
            <input
              type="text"
              placeholder="Search item, merchant..."
              value={shopUnlockSearch}
              onChange={(e) => setShopUnlockSearch(e.target.value)}
              style={{
                padding: "8px 12px",
                fontSize: 12,
                background: bgCard,
                border: `1px solid ${colors.border}`,
                borderRadius: 12,
                color: lightText,
                minWidth: 200,
              }}
            />
            <select
              value={shopUnlockMerchant}
              onChange={(e) => setShopUnlockMerchant(e.target.value)}
              style={{
                padding: "8px 12px",
                fontSize: 12,
                background: bgCard,
                border: `1px solid ${colors.border}`,
                borderRadius: 12,
                color: lightText,
                minWidth: 140,
              }}
            >
              <option value="">All merchants</option>
              {[...new Set(SHOP_UNLOCKS.map((u) => u.merchant))].sort().map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <select
              value={shopUnlockCondition}
              onChange={(e) => setShopUnlockCondition(e.target.value as UnlockConditionType | "")}
              style={{
                padding: "8px 12px",
                fontSize: 12,
                background: bgCard,
                border: `1px solid ${colors.border}`,
                borderRadius: 12,
                color: lightText,
                minWidth: 140,
              }}
            >
              <option value="">All unlock types</option>
              <option value="area">Area</option>
              <option value="key">Key</option>
              <option value="spend_souls">Spend souls</option>
              <option value="stat">Stat requirement</option>
              <option value="boss">Boss defeated</option>
              <option value="item">Give item</option>
              <option value="progression">Progression</option>
              <option value="unpetrify">Unpetrify</option>
              <option value="covenant">Covenant</option>
            </select>
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            {SHOP_UNLOCKS.filter((u) => {
              if (shopUnlockMerchant && u.merchant !== shopUnlockMerchant) return false;
              if (shopUnlockCondition && u.conditionType !== shopUnlockCondition) return false;
              if (shopUnlockSearch) {
                const q = shopUnlockSearch.toLowerCase();
                return (
                  u.merchant.toLowerCase().includes(q) ||
                  u.item.toLowerCase().includes(q) ||
                  u.condition.toLowerCase().includes(q) ||
                  (u.detail?.toLowerCase().includes(q) ?? false) ||
                  getArea(u.merchantAreaId).name.toLowerCase().includes(q)
                );
              }
              return true;
            }).map((u) => {
              const area = getArea(u.merchantAreaId);
              const progressDone = u.progressIds?.every((pid) => checked[pid]) ?? false;
              return (
                <div
                  key={u.id}
                  style={{
                    background: bgCard,
                    borderRadius: 16,
                    padding: 14,
                    border: "1px solid #2a2420",
                    opacity: progressDone ? 0.7 : 1,
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                      <div>
                        <span style={{ fontSize: 13, color: gold, fontWeight: 600 }}>{u.merchant}</span>
                        <span style={{ fontSize: 11, color: dimText, marginLeft: 6 }}>
                          — {u.item}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedArea(u.merchantAreaId);
                          setView("area");
                        }}
                        style={{
                          fontSize: 10,
                          color: gold,
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        {area.name} →
                      </button>
                    </div>
                    <div style={{ fontSize: 11, color: lightText }}>
                      <span style={{ color: successGreen }}>Unlock:</span> {u.condition}
                    </div>
                    {u.detail && (
                      <div style={{ fontSize: 10, color: dimText }}>{u.detail}</div>
                    )}
                    {u.itemCategory && (
                      <span
                        style={{
                          padding: "2px 6px",
                          background: "rgba(107,158,58,0.2)",
                          color: successGreen,
                          borderRadius: 8,
                          fontSize: 9,
                          alignSelf: "flex-start",
                        }}
                      >
                        {u.itemCategory}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

// Enemies View — weaknesses, counters, buffs, drops (boss focus, expanded coverage)
function EnemiesView({
  enemiesSub,
  setEnemiesSub,
}: {
  enemiesSub: "weaknesses" | "buffs" | "drops";
  setEnemiesSub: (v: "weaknesses" | "buffs" | "drops") => void;
}) {
  const [filterType, setFilterType] = useState<"all" | "boss" | "elite" | "common">("all");
  const [search, setSearch] = useState("");
  const [dropsSearch, setDropsSearch] = useState("");
  const [dropsFilterType, setDropsFilterType] = useState<"all" | "boss" | "elite" | "common">("all");

  const filtered = ENEMY_WEAKNESSES.filter((e) => {
    if (filterType !== "all" && e.type !== filterType) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        e.name.toLowerCase().includes(q) ||
        e.area.toLowerCase().includes(q) ||
        e.weaknesses.some((w) => w.toLowerCase().includes(q)) ||
        e.resistances.some((r) => r.toLowerCase().includes(q)) ||
        e.counters.some((c) => c.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div style={{ padding: 20 }}>
      <div
        style={{
          marginBottom: 16,
          padding: 14,
          background: "rgba(200,160,48,0.08)",
          border: "1px solid rgba(200,160,48,0.2)",
          borderRadius: 16,
          fontSize: 12,
          color: lightText,
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: gold }}>Enemy tactics:</strong> Boss-focused; coverage includes elites and common threats. Weaknesses show damage types that deal bonus damage. Counters are tactics and tips. Use Buffs tab for resins and spell buffs by element.
      </div>

      <div
        style={{
          display: "flex",
          borderBottom: "1px solid #2a2420",
          marginBottom: 16,
        }}
      >
        {[
          ["weaknesses", "Weaknesses & Counters"],
          ["buffs", "Buffs & Resins"],
          ["drops", "Drops"],
        ].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setEnemiesSub(id as "weaknesses" | "buffs" | "drops")}
            style={{
              flex: 1,
              padding: 10,
              fontSize: 12,
              background: "transparent",
              border: "none",
              borderBottom: `2px solid ${enemiesSub === id ? gold : "transparent"}`,
              color: enemiesSub === id ? gold : dimText,
              cursor: "pointer",
              fontFamily: "'Cinzel', Georgia, serif",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {enemiesSub === "weaknesses" && (
        <>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            <input
              type="text"
              placeholder="Search enemy, area, weakness..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: "8px 12px",
                fontSize: 12,
                background: "#1a1714",
                border: "1px solid #2a2420",
                borderRadius: 16,
                color: lightText,
                width: 200,
              }}
            />
            <div style={{ display: "flex", gap: 4 }}>
              {(["all", "boss", "elite", "common"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  style={{
                    padding: "4px 10px",
                    fontSize: 10,
                    background: filterType === t ? gold : "transparent",
                    color: filterType === t ? "#0c0b0a" : dimText,
                    border: `1px solid ${filterType === t ? gold : "#2a2420"}`,
                    borderRadius: 16,
                    cursor: "pointer",
                  }}
                >
                  {t === "all" ? "All" : t === "boss" ? "Bosses" : t === "elite" ? "Elites" : "Common"}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            {filtered.map((e) => (
              <div
                key={e.id}
                style={{
                  padding: 14,
                  background: bgCard,
                  borderRadius: 16,
                  border: "1px solid #2a2420",
                  borderLeft: `4px solid ${e.type === "boss" ? gold : e.type === "elite" ? ember : "#2a2420"}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 700, color: gold, fontSize: 14 }}>{e.name}</span>
                  <span style={{ fontSize: 10, color: dimText }}>{e.area}</span>
                  <span
                    style={{
                      fontSize: 9,
                      padding: "1px 6px",
                      background: e.type === "boss" ? "rgba(200,160,48,0.2)" : e.type === "elite" ? "rgba(212,101,42,0.2)" : "rgba(58,52,42,0.5)",
                      color: e.type === "boss" ? gold : e.type === "elite" ? ember : dimText,
                      borderRadius: 10,
                      textTransform: "capitalize",
                    }}
                  >
                    {e.type}
                  </span>
                  {e.optional && <span style={{ fontSize: 9, color: dimText }}>Optional</span>}
                </div>
                <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 8, fontSize: 11 }}>
                  <div>
                    <span style={{ color: successGreen }}>Weak:</span>{" "}
                    <span style={{ color: lightText }}>{e.weaknesses.join(", ") || "—"}</span>
                  </div>
                  {e.resistances.length > 0 && (
                    <div>
                      <span style={{ color: warnRed }}>Resist:</span>{" "}
                      <span style={{ color: lightText }}>{e.resistances.join(", ")}</span>
                    </div>
                  )}
                </div>
                <div style={{ marginTop: 6, fontSize: 11, color: dimText }}>
                  <span style={{ color: gold }}>Counters:</span> {e.counters.join(" · ")}
                </div>
                {e.buffs && e.buffs.length > 0 && (
                  <div style={{ marginTop: 6, fontSize: 10, color: ember }}>
                    Buffs: {e.buffs.join(", ")}
                  </div>
                )}
                {e.note && (
                  <div style={{ marginTop: 6, fontSize: 10, color: dimText, fontStyle: "italic" }}>
                    {e.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {enemiesSub === "buffs" && (
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ fontSize: 12, color: dimText, marginBottom: 4 }}>
            Resins and spell buffs by damage type. Use with weakness data from the Weaknesses tab.
          </div>
          {Object.entries(ELEMENTAL_BUFFS).map(([element, items]) => (
            <div
              key={element}
              style={{
                padding: 14,
                background: bgCard,
                borderRadius: 16,
                border: "1px solid #2a2420",
              }}
            >
              <div style={{ fontWeight: 700, color: gold, marginBottom: 8, fontSize: 13 }}>{element}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {items.map((item) => (
                  <span
                    key={item}
                    style={{
                      padding: "4px 8px",
                      background: "rgba(200,160,48,0.12)",
                      color: lightText,
                      borderRadius: 16,
                      fontSize: 11,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {enemiesSub === "drops" && (
        <>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            <input
              type="text"
              placeholder="Search enemy, area, or item..."
              value={dropsSearch}
              onChange={(e) => setDropsSearch(e.target.value)}
              style={{
                padding: "8px 12px",
                fontSize: 12,
                background: "#1a1714",
                border: "1px solid #2a2420",
                borderRadius: 16,
                color: lightText,
                width: 220,
              }}
            />
            <div style={{ display: "flex", gap: 4 }}>
              {(["all", "boss", "elite", "common"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setDropsFilterType(t)}
                  style={{
                    padding: "4px 10px",
                    fontSize: 10,
                    background: dropsFilterType === t ? gold : "transparent",
                    color: dropsFilterType === t ? "#0c0b0a" : dimText,
                    border: `1px solid ${dropsFilterType === t ? gold : "#2a2420"}`,
                    borderRadius: 16,
                    cursor: "pointer",
                  }}
                >
                  {t === "all" ? "All" : t === "boss" ? "Bosses" : t === "elite" ? "Elites" : "Common"}
                </button>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 11, color: dimText, marginBottom: 8 }}>
            Drops ordered by rarity (most common first). Source: Fextralife, ENEMY_MATERIAL_FARMS.
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            {getEnemyDropsFiltered({
              type: dropsFilterType === "all" ? undefined : dropsFilterType,
              search: dropsSearch || undefined,
            }).map((e) => (
              <div
                key={e.id}
                style={{
                  padding: 14,
                  background: bgCard,
                  borderRadius: 16,
                  border: "1px solid #2a2420",
                  borderLeft: `4px solid ${e.type === "boss" ? gold : e.type === "elite" ? ember : "#2a2420"}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, color: gold, fontSize: 14 }}>{e.name}</span>
                  <span style={{ fontSize: 10, color: dimText }}>{e.area}</span>
                  <span
                    style={{
                      fontSize: 9,
                      padding: "1px 6px",
                      background: e.type === "boss" ? "rgba(200,160,48,0.2)" : e.type === "elite" ? "rgba(212,101,42,0.2)" : "rgba(58,52,42,0.5)",
                      color: e.type === "boss" ? gold : e.type === "elite" ? ember : dimText,
                      borderRadius: 10,
                      textTransform: "capitalize",
                    }}
                  >
                    {e.type}
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {[...e.drops].sort((a, b) => a.rarityOrder - b.rarityOrder).map((d) => (
                    <div key={d.item} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, gap: 8 }}>
                      <span style={{ color: lightText }}>{d.item}</span>
                      <span
                        style={{
                          color: d.rarityOrder <= 2 ? successGreen : d.rarityOrder <= 3 ? dimText : warnRed,
                          fontSize: 10,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {d.rate}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Materials Lookup tab — filterable "Where do I farm X?"
function MaterialsLookupTab({
  materialFilter,
  setMaterialFilter,
  isAreaUnlocked,
}: {
  materialFilter: string;
  setMaterialFilter: (v: string) => void;
  isAreaUnlocked: (areaId: string) => boolean;
}) {
  const spots = getMaterialFarmSpots(
    materialFilter ? { materialContains: materialFilter } : undefined
  );
  const materialNames = getMaterialNames();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
        <input
          type="text"
          placeholder="Filter by material (e.g. Titanite, Darknight...)"
          value={materialFilter}
          onChange={(e) => setMaterialFilter(e.target.value)}
          style={{
            padding: "8px 12px",
            fontSize: 12,
            background: bgCard,
            border: `1px solid ${colors.border}`,
            borderRadius: 12,
            color: lightText,
            minWidth: 220,
          }}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {materialNames.slice(0, 12).map((name) => (
            <button
              key={name}
              onClick={() => setMaterialFilter(materialFilter === name ? "" : name)}
              style={{
                padding: "4px 8px",
                fontSize: 10,
                background: materialFilter === name ? gold : "transparent",
                color: materialFilter === name ? bg : dimText,
                border: `1px solid ${materialFilter === name ? gold : colors.border}`,
                borderRadius: 16,
                cursor: "pointer",
              }}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
      <div style={{ fontSize: 11, color: dimText }}>
        {spots.length} result{spots.length !== 1 ? "s" : ""}
      </div>
      <div style={{ display: "grid", gap: 6, maxHeight: 420, overflowY: "auto" }}>
        {spots.length === 0 ? (
          <div style={{ padding: 24, textAlign: "center", color: dimText, fontSize: 12 }}>
            Nothing matches. Try a different material or unlock more areas.
          </div>
        ) : (
          spots.map((s) => {
            const available = !s.areaId || isAreaUnlocked(s.areaId);
            return (
              <div
                key={s.id}
                style={{
                  padding: "10px 12px",
                  background: bgCard,
                  borderRadius: 10,
                  border: `1px solid ${colors.border}`,
                  borderLeft: available ? "3px solid transparent" : "3px solid #3a342a",
                  opacity: available ? 1 : 0.65,
                  fontSize: 11,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 600, color: gold }}>{s.material}</span>
                  {s.sourceType === "vendor" && <span style={{ fontSize: 9, color: dimText }}>Vendor</span>}
                  {s.sourceType === "crystal_lizard" && <span style={{ fontSize: 9, color: ember }}>Lizard</span>}
                </div>
                <div style={{ marginTop: 4, color: lightText }}>{s.name}</div>
                <div style={{ marginTop: 2, color: dimText, fontSize: 10 }}>
                  {s.areaName ?? "—"} — {s.method}
                </div>
                {s.howToGetThere && (
                  <div style={{ marginTop: 4, fontSize: 10, color: gold }}>📍 {s.howToGetThere}</div>
                )}
                <div style={{ marginTop: 2, fontSize: 9, color: dimText }}>Unlock: {s.unlock}</div>
                {s.purpose && <div style={{ marginTop: 2, fontSize: 9, color: colors.muted }}>{s.purpose}</div>}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

type FarmSub = "spots" | "materials" | "gear" | "mechanics" | "build-farming";

// Farming View — runs, titanite, gear, mechanics, materials lookup, build farming
function FarmingView({
  checked,
  farmSub,
  setFarmSub,
  farmBestOnly,
  setFarmBestOnly,
  materialFilter,
  setMaterialFilter,
  onOpenShopUnlocks,
  buildTemplate,
}: {
  checked: Record<string, boolean>;
  farmSub: FarmSub;
  setFarmSub: (v: FarmSub) => void;
  farmBestOnly: boolean;
  setFarmBestOnly: (v: boolean) => void;
  materialFilter: string;
  setMaterialFilter: (v: string) => void;
  onOpenShopUnlocks?: () => void;
  buildTemplate?: { id?: string; name: string; buildItems?: { name: string; type: string; farmOptions?: { enemy: string; area: string; method?: string; unlock?: string }[] }[]; buildMaterialFarms?: { item: string; purpose: string; sources: { type: string; location: string; detail: string; unlock?: string }[]; farmOptions: { enemy: string; area: string; method?: string; unlock?: string }[] }[] };
}) {
  const isAreaUnlocked = (areaId: string) => {
    const area = getArea(areaId as AreaId);
    return area.items.some((i) => checked[i.id]);
  };

  const isSpotAvailable = (spot: { areaId?: string }) => {
    if (!spot.areaId) return true;
    return isAreaUnlocked(spot.areaId);
  };

  return (
    <div style={{ padding: 20 }}>
      <div
        style={{
          marginBottom: 16,
          padding: 14,
          background: "rgba(200,160,48,0.08)",
          border: "1px solid rgba(200,160,48,0.2)",
          borderRadius: 16,
          fontSize: 12,
          color: lightText,
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: gold }}>Farming basics:</strong> Company of Champions prevents despawn (enemies vanish after 12 kills). Bonfire Ascetic resets area to NG+ intensity. Giant Lord loop is self-sustaining — ascetic is inside the memory.
      </div>

      <div
        style={{
          display: "flex",
          borderBottom: "1px solid #2a2420",
          marginBottom: 16,
        }}
      >
        {[
          ["spots", "Souls"],
          ["materials", "Materials"],
          ["gear", "Gear"],
          ["mechanics", "Mechanics"],
          ["build-farming", "Build Farming"],
        ].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setFarmSub(id as FarmSub)}
            style={{
              flex: 1,
              padding: 10,
              fontSize: 12,
              background: "transparent",
              border: "none",
              borderBottom: `2px solid ${
                farmSub === id ? gold : "transparent"
              }`,
              color: farmSub === id ? gold : dimText,
              cursor: "pointer",
              fontFamily: "'Cinzel', Georgia, serif",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {farmSub === "spots" && (
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <button
              onClick={() => setFarmBestOnly(!farmBestOnly)}
              style={{
                padding: "4px 8px",
                fontSize: 10,
                background: farmBestOnly ? gold : "transparent",
                color: farmBestOnly ? "#0c0b0a" : dimText,
                border: `1px solid ${farmBestOnly ? gold : "#2a2420"}`,
                borderRadius: 16,
                cursor: "pointer",
              }}
            >
              {farmBestOnly ? "✓ Best runs only" : "Show all runs"}
            </button>
          </div>
          <div style={{ fontSize: 11, color: gold, marginBottom: 6 }}>SOUL FARM RUNS</div>
          {(farmBestOnly
            ? SOUL_FARM_RUNS.filter((r) => r.best)
            : SOUL_FARM_RUNS
          )
            .map((r) => {
              const available = isSpotAvailable(r);
              return (
                <div
                  key={r.name}
                  style={{
                    padding: "10px 12px",
                    background: "#0c0b0a",
                    borderRadius: 10,
                    marginBottom: 6,
                    fontSize: 11,
                    borderLeft: available ? "3px solid transparent" : "3px solid #3a342a",
                    opacity: available ? 1 : 0.6,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontWeight: 600 }}>{r.name}</span>
                    {r.best && <span style={{ color: successGreen, fontSize: 10 }}>★ BEST</span>}
                    {r.tags.includes("infinite") && <span style={{ color: ember, fontSize: 9 }}>∞</span>}
                    {r.tags.includes("ascetic") && <span style={{ color: warnRed, fontSize: 9 }}>🔥</span>}
                  </div>
                  <div style={{ color: gold, fontSize: 10, marginTop: 2 }}>
                    ~{(r.soulsPerRun / 1000).toFixed(r.soulsPerRun >= 1000 ? 1 : 0)}k base
                    {r.soulsWithFullGear != null && ` → ${(r.soulsWithFullGear / 1000).toFixed(r.soulsWithFullGear >= 1000 ? 1 : 0)}k w/ gear`}
                    {r.timeEstimateSeconds != null && ` · ~${r.timeEstimateSeconds}s/run`}
                    {r.spmOptimal != null && ` · ${(r.spmOptimal / 1000).toFixed(1)}k SPM`}
                    {" · "}
                    {r.bonfire}
                  </div>
                  {r.howToGetThere && (
                    <div style={{ color: gold, fontSize: 10, marginTop: 4 }}>
                      📍 {r.howToGetThere}
                    </div>
                  )}
                  <div style={{ color: dimText, fontSize: 10, marginTop: 2 }}>
                    {r.route}
                  </div>
                  <div style={{ color: dimText, fontSize: 10, marginTop: 4 }}>
                    <span style={{ color: gold }}>Unlock:</span> {r.unlock}
                  </div>
                  {r.detail && (
                    <div style={{ color: dimText, fontSize: 10, marginTop: 4, fontStyle: "italic" }}>
                      {r.detail}
                    </div>
                  )}
                </div>
              );
            })}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, marginBottom: 6, flexWrap: "wrap", gap: 8 }}>
            <span style={{ fontSize: 11, color: gold }}>TITANITE SOURCES</span>
            {onOpenShopUnlocks && (
              <button onClick={onOpenShopUnlocks} style={{ fontSize: 10, color: successGreen, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>See Shop Unlocks →</button>
            )}
          </div>
          {TITANITE_SOURCES.map((t) => {
            const available = !t.areaId || isAreaUnlocked(t.areaId);
            return (
              <div
                key={`${t.name}-${t.material}`}
                style={{
                  padding: "8px 12px",
                  background: "#0c0b0a",
                  borderRadius: 10,
                  marginBottom: 6,
                  fontSize: 11,
                  borderLeft: available ? "3px solid transparent" : "3px solid #3a342a",
                  opacity: available ? 1 : 0.6,
                }}
              >
                <div style={{ fontWeight: 600 }}>{t.name}</div>
                <div style={{ color: gold, fontSize: 10, marginTop: 2 }}>{t.material}</div>
                <div style={{ color: dimText, fontSize: 10, marginTop: 2 }}>{t.loc} — {t.method}</div>
                {t.howToGetThere && (
                  <div style={{ color: gold, fontSize: 10, marginTop: 4 }}>📍 {t.howToGetThere}</div>
                )}
                <div style={{ color: dimText, fontSize: 9, marginTop: 2 }}>Unlock: {t.unlock}</div>
                {t.discoveryRecommendation && (
                  <div style={{ color: ember, fontSize: 9, marginTop: 4, fontStyle: "italic" }}>
                    Discovery: {t.discoveryRecommendation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {farmSub === "materials" && (
        <MaterialsLookupTab
          materialFilter={materialFilter}
          setMaterialFilter={setMaterialFilter}
          isAreaUnlocked={isAreaUnlocked}
        />
      )}

      {farmSub === "gear" && (
        <div style={{ display: "grid", gap: 16 }}>
          <div>
            <div
              style={{
                fontFamily: "'Cinzel', Georgia, serif",
                fontSize: 13,
                color: gold,
                marginBottom: 8,
              }}
            >
              SOUL-BOOSTING GEAR
            </div>
            <div style={{ fontSize: 10, color: dimText, marginBottom: 8, fontStyle: "italic" }}>
              Bonuses stack additively on base. Full gear (CSSR+2 + Tseldora + Symbol) ≈ 1.9× souls.
            </div>
            {SOUL_GEAR.map((g) => (
              <div
                key={g.name}
                style={{
                  padding: "10px 12px",
                  background: bgCard,
                  borderRadius: 10,
                  marginBottom: 6,
                  border: "1px solid #2a2420",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 600 }}>{g.name}</div>
                <div style={{ fontSize: 10, color: gold, marginTop: 2 }}>{g.bonus}</div>
                <div style={{ fontSize: 10, color: dimText, marginTop: 2 }}>{g.loc}</div>
                <div style={{ fontSize: 9, color: dimText, marginTop: 2 }}>Unlock: {g.unlock}</div>
              </div>
            ))}
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Cinzel', Georgia, serif",
                fontSize: 13,
                color: gold,
                marginBottom: 8,
              }}
            >
              ITEM DISCOVERY GEAR
            </div>
            <div style={{ fontSize: 10, color: dimText, marginBottom: 8, fontStyle: "italic" }}>
              Base discovery 100. Stack up to 999 cap.
            </div>
            {ITEM_DISC_GEAR.map((g) => (
              <div
                key={g.name}
                style={{
                  padding: "10px 12px",
                  background: bgCard,
                  borderRadius: 10,
                  marginBottom: 6,
                  border: "1px solid #2a2420",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 600 }}>{g.name}</div>
                <div style={{ fontSize: 10, color: gold, marginTop: 2 }}>{g.bonus}</div>
                <div style={{ fontSize: 10, color: dimText, marginTop: 2 }}>{g.loc}</div>
                <div style={{ fontSize: 9, color: dimText, marginTop: 2 }}>Unlock: {g.unlock}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {farmSub === "build-farming" && (
        <BuildFarmingContent buildTemplate={buildTemplate} />
      )}

      {farmSub === "mechanics" && (
        <div style={{ display: "grid", gap: 16 }}>
          <div
            style={{
              padding: 14,
              background: bgCard,
              borderRadius: 16,
              border: "1px solid #2a2420",
            }}
          >
            <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 13, color: gold, marginBottom: 10 }}>
              ENEMY DESPAWN
            </div>
            <div style={{ fontSize: 12, color: lightText, lineHeight: 1.7 }}>
              {FARM_MECHANICS.despawn}
            </div>
          </div>
          <div
            style={{
              padding: 14,
              background: bgCard,
              borderRadius: 16,
              border: "1px solid #2a2420",
            }}
          >
            <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 13, color: gold, marginBottom: 10 }}>
              COMPANY OF CHAMPIONS
            </div>
            <div style={{ fontSize: 12, color: lightText, lineHeight: 1.7 }}>
              {FARM_MECHANICS.coc}
            </div>
          </div>
          <div
            style={{
              padding: 14,
              background: bgCard,
              borderRadius: 16,
              border: "1px solid #2a2420",
            }}
          >
            <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 13, color: gold, marginBottom: 10 }}>
              BONFIRE ASCETIC
            </div>
            <div style={{ fontSize: 12, color: lightText, lineHeight: 1.7 }}>
              {FARM_MECHANICS.ascetic}
            </div>
          </div>
          <div
            style={{
              padding: 14,
              background: bgCard,
              borderRadius: 16,
              border: "1px solid #2a2420",
            }}
          >
            <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 13, color: gold, marginBottom: 10 }}>
              SOUL BONUS STACKING
            </div>
            <div style={{ fontSize: 12, color: lightText, lineHeight: 1.7 }}>
              {FARM_MECHANICS.soulStack}
            </div>
          </div>
          <div
            style={{
              padding: 14,
              background: bgCard,
              borderRadius: 16,
              border: "1px solid #2a2420",
            }}
          >
            <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 13, color: gold, marginBottom: 10 }}>
              ITEM DISCOVERY
            </div>
            <div style={{ fontSize: 12, color: lightText, lineHeight: 1.7 }}>
              {FARM_MECHANICS.itemDisc}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
