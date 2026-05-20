import { useEffect, useRef, useState } from "react";
import { SEMI_FAST_AREA_ORDER } from "../data/areaDependencies";
import { getArea } from "../data/areas";
import { colors, typography } from "../theme";

const SEMI_FAST_SPLITS = SEMI_FAST_AREA_ORDER.map((id) => ({
  areaId: id,
  label: getArea(id).name,
}));

/** Speedrun split timer (RTE-04) with semi-fast route presets. */
export function SplitTimerView() {
  const [running, setRunning] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [splits, setSplits] = useState<{ label: string; ms: number; deltaMs: number }[]>([]);
  const [presetIdx, setPresetIdx] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      if (startRef.current != null) setElapsedMs(Date.now() - startRef.current);
    }, 50);
    return () => clearInterval(id);
  }, [running]);

  const format = (ms: number) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    return `${h}:${String(m % 60).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  };

  const addSplit = (label: string) => {
    const prev = splits.length ? splits[splits.length - 1].ms : 0;
    setSplits((s) => [...s, { label, ms: elapsedMs, deltaMs: elapsedMs - prev }]);
    setPresetIdx((i) => Math.min(i + 1, SEMI_FAST_SPLITS.length));
  };

  const nextPresetLabel = SEMI_FAST_SPLITS[presetIdx]?.label ?? `Split ${splits.length + 1}`;

  return (
    <div style={{ padding: 20, maxWidth: 520, margin: "0 auto" }}>
      <h2 style={{ fontFamily: typography.fontHeading, color: colors.gold, fontSize: 18 }}>Split Timer</h2>
      <p style={{ fontSize: 12, color: colors.dimText, lineHeight: 1.5 }}>
        Semi-fast route presets use the same area order as Areas → Semi-Fast Run. Split advances through each segment
        name automatically.
      </p>
      <div style={{ fontSize: 32, fontFamily: typography.fontHeading, color: colors.gold, margin: "16px 0" }}>
        {format(elapsedMs)}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
        <button
          type="button"
          onClick={() => {
            if (running) setRunning(false);
            else {
              startRef.current = Date.now() - elapsedMs;
              setRunning(true);
            }
          }}
          style={btnStyle}
        >
          {running ? "Pause" : "Start"}
        </button>
        <button type="button" onClick={() => addSplit(nextPresetLabel)} style={btnStyle}>
          Split ({nextPresetLabel})
        </button>
        <button
          type="button"
          onClick={() => {
            setRunning(false);
            setElapsedMs(0);
            setSplits([]);
            setPresetIdx(0);
            startRef.current = null;
          }}
          style={btnStyle}
        >
          Reset
        </button>
      </div>
      <p style={{ fontSize: 11, color: colors.dimText, marginBottom: 16 }}>
        Next preset: {Math.min(presetIdx + 1, SEMI_FAST_SPLITS.length)}/{SEMI_FAST_SPLITS.length}
        <button
          type="button"
          onClick={() => {
            setPresetIdx(0);
            setSplits([]);
          }}
          style={{ ...btnStyle, marginLeft: 8 }}
        >
          Reset presets
        </button>
      </p>
      {splits.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 12, color: colors.lightText }}>
          {splits.map((sp, i) => (
            <li key={i} style={{ padding: "8px 0", borderBottom: `1px solid ${colors.border}` }}>
              <strong>{sp.label}</strong>
              <span style={{ color: colors.dimText, marginLeft: 8 }}>
                +{format(sp.deltaMs)} · total {format(sp.ms)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  padding: "8px 14px",
  background: colors.bgCard,
  border: `1px solid ${colors.border}`,
  borderRadius: 8,
  color: colors.lightText,
  cursor: "pointer",
  fontSize: 12,
};
