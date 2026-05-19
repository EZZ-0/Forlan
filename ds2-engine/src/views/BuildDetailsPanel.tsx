import { colors, typography } from "../theme";
import type { BuildTemplate } from "../data/buildTemplates/types";
import {
  getBuildDetailsProfile,
  getBuildMatchupBuckets,
  formatAffinityLabel,
  MATCHUP_TIER_META,
  type MatchupTier,
} from "../data/buildDetails";
import type { EnemyEntry } from "../data/enemies";

const gold = colors.gold;
const dimText = colors.dimText;
const lightText = colors.lightText;
const successGreen = colors.successGreen;
const warnRed = colors.warnRed;

const sectionStyle: React.CSSProperties = {
  padding: 12,
  background: "rgba(139,92,246,0.06)",
  border: "1px solid rgba(139,92,246,0.2)",
  borderRadius: 16,
  fontSize: 12,
  lineHeight: 1.6,
};

const headingStyle: React.CSSProperties = {
  fontFamily: typography.fontHeading,
  color: gold,
  marginBottom: 6,
  fontSize: 11,
  letterSpacing: typography.letterSpacing.wide,
  textTransform: "uppercase",
};

function EnemyNameList({ enemies, max = 8 }: { enemies: EnemyEntry[]; max?: number }) {
  if (enemies.length === 0) {
    return <span style={{ color: dimText, fontStyle: "italic" }}>None listed</span>;
  }
  const shown = enemies.slice(0, max);
  const rest = enemies.length - shown.length;
  return (
    <span style={{ color: lightText }}>
      {shown.map((e) => e.name).join(", ")}
      {rest > 0 ? ` (+${rest} more)` : ""}
    </span>
  );
}

function MatchupTierBlock({
  tier,
  enemies,
}: {
  tier: MatchupTier;
  enemies: EnemyEntry[];
}) {
  if (enemies.length === 0) return null;
  const meta = MATCHUP_TIER_META[tier];
  return (
    <div
      style={{
        padding: "8px 10px",
        background: meta.bg,
        borderRadius: 10,
        borderLeft: `3px solid ${meta.color}`,
      }}
    >
      <div style={{ fontSize: 10, fontWeight: 700, color: meta.color, marginBottom: 4 }}>
        {meta.label} ({enemies.length})
      </div>
      <div style={{ fontSize: 11, lineHeight: 1.5 }}>
        <EnemyNameList enemies={enemies} />
      </div>
    </div>
  );
}

export function BuildDetailsPanel({
  buildTemplate,
}: {
  buildTemplate: BuildTemplate;
}) {
  const profile = getBuildDetailsProfile(buildTemplate.id);
  const buckets = getBuildMatchupBuckets(buildTemplate.id);

  if (!profile) {
    return (
      <div style={{ ...sectionStyle, color: dimText }}>
        Build details for <strong style={{ color: gold }}>{buildTemplate.name}</strong> are not
        available yet.
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={sectionStyle}>
        <div style={headingStyle}>Damage strengths</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
          {profile.proDamage.map((d) => (
            <span
              key={d}
              style={{
                padding: "3px 8px",
                fontSize: 10,
                background: "rgba(107,158,58,0.2)",
                color: successGreen,
                borderRadius: 10,
                border: "1px solid rgba(107,158,58,0.35)",
              }}
            >
              {formatAffinityLabel(d)}
            </span>
          ))}
          {profile.conDamage.map((d) => (
            <span
              key={`weak-${d}`}
              style={{
                padding: "3px 8px",
                fontSize: 10,
                background: "rgba(196,64,64,0.15)",
                color: warnRed,
                borderRadius: 10,
                border: "1px solid rgba(196,64,64,0.3)",
              }}
            >
              Struggles vs {d}-resistant foes
            </span>
          ))}
        </div>
        <p style={{ margin: 0, color: dimText, fontSize: 11 }}>
          Enemies weak to these damage types are highlighted on the Enemies tab. Matchup tiers below
          use weakness and resistance data from the enemy database.
        </p>
      </div>

      <div style={sectionStyle}>
        <div style={headingStyle}>Philosophy</div>
        <p style={{ margin: 0, color: lightText }}>{profile.philosophy}</p>
      </div>

      <div style={sectionStyle}>
        <div style={headingStyle}>Weapons</div>
        <p style={{ margin: 0, color: lightText }}>{profile.weaponsSummary}</p>
        {buildTemplate.weapons.length > 0 && (
          <ul style={{ margin: "8px 0 0", paddingLeft: 18, color: dimText, fontSize: 11 }}>
            {buildTemplate.weapons.slice(0, 6).map((w) => (
              <li key={w.name}>
                <span style={{ color: lightText }}>{w.name}</span>
                {w.role ? ` — ${w.role}` : ""}
                {w.infusion ? ` (${w.infusion})` : ""}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={sectionStyle}>
        <div style={headingStyle}>Playstyle</div>
        <p style={{ margin: 0, color: lightText }}>{profile.playstyle}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={sectionStyle}>
          <div style={{ ...headingStyle, color: successGreen }}>Pros</div>
          <ul style={{ margin: 0, paddingLeft: 18, color: lightText }}>
            {profile.pros.map((p) => (
              <li key={p} style={{ marginBottom: 4 }}>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div style={sectionStyle}>
          <div style={{ ...headingStyle, color: warnRed }}>Cons</div>
          <ul style={{ margin: 0, paddingLeft: 18, color: lightText }}>
            {profile.cons.map((c) => (
              <li key={c} style={{ marginBottom: 4 }}>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {profile.notes && profile.notes.length > 0 && (
        <div style={sectionStyle}>
          <div style={headingStyle}>Notes</div>
          {profile.notes.map((n) => (
            <p key={n} style={{ margin: "0 0 6px", color: lightText }}>
              {n}
            </p>
          ))}
        </div>
      )}

      <div
        style={{
          padding: 14,
          background: "rgba(200,160,48,0.06)",
          border: "1px solid rgba(200,160,48,0.25)",
          borderRadius: 16,
        }}
      >
        <div
          style={{
            fontFamily: typography.fontHeading,
            color: gold,
            marginBottom: 10,
            fontSize: 12,
          }}
        >
          Enemy matchups (this build)
        </div>
        <div style={{ display: "grid", gap: 8 }}>
          <MatchupTierBlock tier="strong" enemies={buckets.strong} />
          <MatchupTierBlock tier="good" enemies={buckets.good} />
          <MatchupTierBlock tier="poor" enemies={buckets.poor} />
          <MatchupTierBlock tier="bad" enemies={buckets.bad} />
        </div>
        {buckets.neutral.length > 0 && (
          <p style={{ margin: "10px 0 0", fontSize: 10, color: dimText }}>
            {buckets.neutral.length} enemies are neutral for this build (no clear affinity match).
          </p>
        )}
      </div>
    </div>
  );
}
