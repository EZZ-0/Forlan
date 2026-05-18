import { ProgressBar } from "../components";
import { GESTURES, COVENANTS } from "../data";
import { computeStats } from "../utils/stats";
import { gold, ember, dimText, lightText } from "./viewStyles";

export function TrackersView({
  checked,
  toggle,
  stats,
}: {
  checked: Record<string, boolean>;
  toggle: (id: string) => void;
  stats: ReturnType<typeof computeStats>;
}) {
  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            fontFamily: "'Cinzel', Georgia, serif",
            fontSize: 15,
            color: gold,
            marginBottom: 10,
            letterSpacing: 1,
          }}
        >
          GESTURES ({stats.gesturesDone}/20)
        </div>
        <ProgressBar done={stats.gesturesDone} total={20} color={gold} height={6} />
        <div style={{ display: "grid", gap: 4, marginTop: 10 }}>
          {GESTURES.map((g) => {
            const done = g.ref ? checked[g.ref] : true;
            return (
              <div
                key={g.name}
                onClick={() => g.ref && toggle(g.ref)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 10px",
                  borderRadius: 16,
                  cursor: g.ref ? "pointer" : "default",
                  opacity: done ? (g.ref ? 0.5 : 0.65) : 1,
                  background: done ? "rgba(200,160,48,0.04)" : "transparent",
                }}
              >
                {g.ref ? (
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 10,
                      border: `2px solid ${done ? gold : "#3a342a"}`,
                      background: done ? gold : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: 10,
                      color: "#0c0b0a",
                      fontWeight: 700,
                    }}
                  >
                    {done && "✓"}
                  </div>
                ) : (
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 10,
                      background: "#2a2420",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: 10,
                      color: dimText,
                    }}
                  >
                    ✓
                  </div>
                )}
                <div>
                  <span
                    style={{
                      color: done ? dimText : lightText,
                      fontSize: 12,
                      textDecoration: done ? "line-through" : "none",
                    }}
                  >
                    {g.name}
                  </span>
                  <span
                    style={{
                      color: "#5a5040",
                      fontSize: 10,
                      marginLeft: 8,
                    }}
                  >
                    {g.source} — {g.location}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            fontFamily: "'Cinzel', Georgia, serif",
            fontSize: 15,
            color: "#8b5cf6",
            marginBottom: 10,
            letterSpacing: 1,
          }}
        >
          COVENANTS ({stats.covenantsDone}/9)
        </div>
        <ProgressBar
          done={stats.covenantsDone}
          total={9}
          color="#8b5cf6"
          height={6}
        />
        <div style={{ display: "grid", gap: 4, marginTop: 10 }}>
          {COVENANTS.map((c) => {
            const done = checked[c.ref];
            return (
              <div
                key={c.name}
                onClick={() => toggle(c.ref)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 10px",
                  borderRadius: 16,
                  cursor: "pointer",
                  opacity: done ? 0.5 : 1,
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 10,
                    border: `2px solid ${done ? "#8b5cf6" : "#3a342a"}`,
                    background: done ? "#8b5cf6" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: 10,
                    color: "#fff",
                    fontWeight: 700,
                  }}
                >
                  {done && "✓"}
                </div>
                <div>
                  <span
                    style={{
                      color: done ? dimText : lightText,
                      fontSize: 12,
                      textDecoration: done ? "line-through" : "none",
                    }}
                  >
                    {c.name}
                  </span>
                  <span
                    style={{
                      color: "#5a5040",
                      fontSize: 10,
                      marginLeft: 8,
                    }}
                  >
                    {c.location}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            fontFamily: "'Cinzel', Georgia, serif",
            fontSize: 15,
            color: ember,
            marginBottom: 10,
            letterSpacing: 1,
          }}
        >
          ESTUS SHARDS ({stats.estus}/12) & BONE DUST ({stats.boneDust}/5)
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 6 }}>
          <div style={{ flex: 1 }}>
            <ProgressBar done={stats.estus} total={12} color={ember} />
          </div>
          <div style={{ flex: 1 }}>
            <ProgressBar done={stats.boneDust} total={5} color="#c0c0c0" />
          </div>
        </div>
        <div
          style={{
            color: dimText,
            fontSize: 11,
            lineHeight: 1.7,
            fontFamily: "'Georgia', serif",
            marginTop: 8,
          }}
        >
          Tracked automatically when you check them in the area checklists.
        </div>
      </div>
    </div>
  );
}
