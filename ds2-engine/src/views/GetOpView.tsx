/**
 * GetOpView — Get OP tab. Progression paths, early OP builds, soul duplication, leveling, video guides.
 */
import { colors } from "../theme";
import {
  GET_OP_PROGRESSION,
  GET_OP_EARLY_BUILDS,
  GET_OP_DUPING_METHODS,
  GET_OP_LEVELING_TIPS,
  GET_OP_VIDEO_GUIDES,
} from "../data/getOpData";

const bgCard = colors.bgCard;
const gold = colors.gold;
const ember = colors.ember;
const dimText = colors.dimText;
const lightText = colors.lightText;
const warnRed = colors.warnRed;
const successGreen = colors.successGreen;

type GetOpSub = "paths" | "builds" | "duping" | "leveling" | "videos";

export function GetOpView({
  getOpSub,
  setGetOpSub,
  onOpenBuild,
  onOpenFarm,
}: {
  getOpSub: GetOpSub;
  setGetOpSub: (v: GetOpSub) => void;
  onOpenBuild?: () => void;
  onOpenFarm?: () => void;
}) {
  const statusColor = (status: string) => {
    switch (status) {
      case "works": return successGreen;
      case "patched": return dimText;
      case "soft_ban_risk": return warnRed;
      case "offline_only": return ember;
      default: return dimText;
    }
  };

  return (
    <div style={{ padding: 20 }}>
      {/* Disclaimer */}
      <div
        style={{
          marginBottom: 20,
          padding: 14,
          background: "rgba(200,160,48,0.06)",
          border: "1px solid rgba(200,160,48,0.25)",
          borderRadius: 16,
          fontSize: 11,
          color: lightText,
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: gold }}>Get OP</strong> — Souls community concept for becoming overpowered early. Soul duplication and similar methods are part of the meta. Some methods are <strong style={{ color: dimText }}>patched</strong>; others may carry <strong style={{ color: warnRed }}>soft-ban risk</strong>. Documented for informational purposes; use at your own discretion.
      </div>

      {/* Sub-tabs */}
      <div
        style={{
          display: "flex",
          gap: 0,
          marginBottom: 20,
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        {[
          ["paths", "Paths"],
          ["builds", "Builds"],
          ["duping", "Duping"],
          ["leveling", "Leveling"],
          ["videos", "Videos"],
        ].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setGetOpSub(id as GetOpSub)}
            style={{
              flex: 1,
              padding: 10,
              fontSize: 12,
              background: "transparent",
              border: "none",
              borderBottom: `2px solid ${getOpSub === id ? gold : "transparent"}`,
              color: getOpSub === id ? gold : dimText,
              cursor: "pointer",
              fontFamily: "'Cinzel', Georgia, serif",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Paths */}
      {getOpSub === "paths" && (
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ fontSize: 11, color: gold, marginBottom: 6 }}>PROGRESSION PATH</div>
          <div style={{ fontSize: 10, color: dimText, marginBottom: 12 }}>
            Optimal early route. Cross-link: <button onClick={onOpenBuild} style={{ color: gold, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Build tab</button>
            {" · "}
            <button onClick={onOpenFarm} style={{ color: gold, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Farming tab</button>
          </div>
          {GET_OP_PROGRESSION.map((step) => (
            <div
              key={step.order}
              style={{
                padding: "12px 14px",
                background: bgCard,
                borderRadius: 12,
                border: "1px solid #2a2420",
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 700, color: gold, minWidth: 24 }}>{step.order}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: lightText }}>{step.area}</div>
                <div style={{ fontSize: 11, color: dimText, marginTop: 4 }}>{step.goal}</div>
                {step.soulsEstimate != null && step.soulsEstimate > 0 && (
                  <div style={{ fontSize: 10, color: gold, marginTop: 4 }}>
                    ~{(step.soulsEstimate / 1000).toFixed(0)}k souls
                  </div>
                )}
                {step.keyItems && step.keyItems.length > 0 && (
                  <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {step.keyItems.map((it) => (
                      <span key={it} style={{ padding: "2px 6px", background: "rgba(200,160,48,0.15)", color: gold, borderRadius: 16, fontSize: 9 }}>
                        {it}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Builds */}
      {getOpSub === "builds" && (
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ fontSize: 11, color: gold, marginBottom: 6 }}>EARLY OP BUILDS</div>
          {onOpenBuild && (
            <div style={{ fontSize: 10, color: dimText, marginBottom: 8 }}>
              <button onClick={onOpenBuild} style={{ color: gold, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Open Build tab for full roadmap →</button>
            </div>
          )}
          {GET_OP_EARLY_BUILDS.map((b) => (
            <div
              key={b.id}
              style={{
                padding: "14px 16px",
                background: bgCard,
                borderRadius: 12,
                border: "1px solid #2a2420",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: lightText }}>{b.name}</div>
              <div style={{ fontSize: 11, color: dimText, marginTop: 6, lineHeight: 1.5 }}>{b.description}</div>
              <div style={{ fontSize: 10, color: gold, marginTop: 8 }}>Weapons: {b.keyWeapons.join(", ")}</div>
              {b.keySpells && b.keySpells.length > 0 && (
                <div style={{ fontSize: 10, color: ember, marginTop: 4 }}>Spells: {b.keySpells.join(", ")}</div>
              )}
              <div style={{ fontSize: 10, color: dimText, marginTop: 4 }}>Stats: {b.stats}</div>
              {b.soulMemoryTarget != null && (
                <div style={{ fontSize: 10, color: successGreen, marginTop: 4 }}>Target SM: ~{(b.soulMemoryTarget / 1000000).toFixed(1)}M</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Duping */}
      {getOpSub === "duping" && (
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ fontSize: 11, color: gold, marginBottom: 6 }}>SOUL DUPLICATION</div>
          <div style={{ fontSize: 10, color: dimText, marginBottom: 12 }}>
            Status: works = functional; patched = no longer works; soft_ban_risk = may affect online; offline_only = safer offline.
          </div>
          {GET_OP_DUPING_METHODS.map((m) => (
            <div
              key={m.id}
              style={{
                padding: "14px 16px",
                background: bgCard,
                borderRadius: 12,
                border: "1px solid #2a2420",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: lightText }}>{m.name}</span>
                <span style={{ fontSize: 9, padding: "2px 6px", background: `${statusColor(m.status)}22`, color: statusColor(m.status), borderRadius: 16 }}>
                  {m.status.replace(/_/g, " ").toUpperCase()}
                </span>
                {m.platform && <span style={{ fontSize: 9, color: dimText }}>({m.platform})</span>}
              </div>
              <div style={{ fontSize: 11, color: dimText, lineHeight: 1.5 }}>{m.description}</div>
              {m.source && <div style={{ fontSize: 9, color: dimText, marginTop: 6 }}>Source: {m.source}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Leveling */}
      {getOpSub === "leveling" && (
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ fontSize: 11, color: gold, marginBottom: 6 }}>LEVELING STRATEGIES</div>
          {GET_OP_LEVELING_TIPS.map((t) => (
            <div
              key={t.id}
              style={{
                padding: "12px 14px",
                background: bgCard,
                borderRadius: 12,
                border: "1px solid #2a2420",
                display: "grid",
                gridTemplateColumns: "80px 1fr",
                gap: 8,
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 600, color: gold }}>{t.stat}</div>
              <div>
                <div style={{ fontSize: 11, color: lightText }}>{t.reason}</div>
                <div style={{ fontSize: 10, color: dimText, marginTop: 4 }}>
                  Priority: {t.priority} · Target: {t.target}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Videos */}
      {getOpSub === "videos" && (
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ fontSize: 11, color: gold, marginBottom: 6 }}>VIDEO GUIDES</div>
          {GET_OP_VIDEO_GUIDES.map((v) => (
            <a
              key={v.id}
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                padding: "14px 16px",
                background: bgCard,
                borderRadius: 12,
                border: "1px solid #2a2420",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 600, color: gold }}>{v.title}</div>
              <div style={{ fontSize: 10, color: dimText, marginTop: 4 }}>{v.channel}</div>
              {v.description && (
                <div style={{ fontSize: 11, color: lightText, marginTop: 6, lineHeight: 1.5 }}>{v.description}</div>
              )}
              <div style={{ fontSize: 9, color: ember, marginTop: 6 }}>
                {v.category} {v.duration && `· ${v.duration}`}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
