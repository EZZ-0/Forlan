import { getArea, getBuildStepsForArea, buildChecklistStats, MAX_SL } from "../data";
import { useBuildSuggest } from "../hooks/useBuildSuggest";
import { ProgressBar, Button } from "../components";
import { gold, ember, dimText, lightText } from "../views/viewStyles";
import type { AreaId } from "../data/areas";

export function BuildContextPanel({
  selectedArea,
  buildSuggest,
  buildStats,
  checked,
  onOpenBuild,
  buildSteps: templateBuildSteps,
}: {
  selectedArea: AreaId;
  buildSuggest: ReturnType<typeof useBuildSuggest>;
  buildStats: ReturnType<typeof buildChecklistStats>;
  checked: Record<string, boolean>;
  onOpenBuild: () => void;
  buildSteps?: import("../data/buildChecklist").BuildStep[];
}) {
  const buildSteps = getBuildStepsForArea(selectedArea, templateBuildSteps);
  const area = getArea(selectedArea);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ fontSize: 13, color: dimText, lineHeight: 1.6 }}>
        SL {buildSuggest.currentSL} / {MAX_SL} · Phase {buildSuggest.currentPhase}
      </div>
      <ProgressBar done={buildStats.done} total={buildStats.total} height={6} />
      {buildSuggest.nextSuggestion && (
        <div style={{ fontSize: 12, color: ember, lineHeight: 1.5 }}>
          {"sl" in buildSuggest.nextSuggestion
            ? `Next: SL ${(buildSuggest.nextSuggestion as { sl: number }).sl} — ${(buildSuggest.nextSuggestion as { stat: string }).stat}`
            : `Next: ${(buildSuggest.nextSuggestion as { stat: string }).stat}`}
        </div>
      )}
      {buildSteps.length > 0 && (
        <div>
          <div style={{ fontSize: 12, color: gold, marginBottom: 8, lineHeight: 1.5 }}>In {area.name}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {buildSteps.slice(0, 6).map((s) => (
              <div
                key={s.id}
                style={{
                  fontSize: 12,
                  lineHeight: 1.6,
                  color: checked[s.progressId] ? dimText : lightText,
                  textDecoration: checked[s.progressId] ? "line-through" : "none",
                }}
              >
                {checked[s.progressId] ? "✓ " : ""}{s.name}
              </div>
            ))}
            {buildSteps.length > 6 && (
              <div style={{ fontSize: 12, color: dimText, lineHeight: 1.5 }}>+{buildSteps.length - 6} more</div>
            )}
          </div>
        </div>
      )}
      <Button onClick={onOpenBuild} variant="primary" style={{ marginTop: 8 }}>
        Open Build →
      </Button>
    </div>
  );
}

export function AreaContextPanel({
  selectedArea,
  getArea,
  areaCompletion,
  onOpenArea,
}: {
  selectedArea: AreaId;
  checked?: Record<string, boolean>;
  getArea: (id: AreaId) => { name: string; items: { id: string; type?: string }[] };
  areaCompletion: (id: AreaId) => { done: number; total: number; pct: number };
  onOpenArea: (a: AreaId) => void;
}) {
  const area = getArea(selectedArea);
  const ac = areaCompletion(selectedArea);
  const done = ac.done;
  const total = ac.total;
  const pct = ac.pct;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ fontSize: 12, color: gold, fontWeight: 600 }}>{area.name}</div>
      <ProgressBar done={done} total={total} height={6} />
      <div style={{ fontSize: 11, color: dimText }}>{done}/{total} ({pct}%)</div>
      <Button onClick={() => onOpenArea(selectedArea)} variant="primary" style={{ marginTop: 8 }}>
        Open Area →
      </Button>
    </div>
  );
}
