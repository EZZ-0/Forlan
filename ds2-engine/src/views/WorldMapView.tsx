import { useMemo, useState } from "react";

import { AREA_ORDER, getArea, type AreaId } from "../data/areas";

import { WORLD_MAP_REGIONS } from "../data/worldMapRegions";

import { colors, typography } from "../theme";



/** Full world map (MAP-03) — region pins synced to checklist completion. */

export function WorldMapView({

  selectedArea,

  onSelectArea,

  areaCompletion,

  onOpenAreaChecklist,

}: {

  selectedArea: AreaId | null;

  onSelectArea: (id: AreaId) => void;

  areaCompletion: (id: AreaId) => { done: number; total: number; pct: number };

  onOpenAreaChecklist?: (id: AreaId) => void;

}) {

  const [hoverId, setHoverId] = useState<AreaId | null>(null);

  const focusId = hoverId ?? selectedArea;



  const pins = useMemo(

    () =>

      WORLD_MAP_REGIONS.map((r) => ({

        ...r,

        completion: areaCompletion(r.areaId),

      })),

    [areaCompletion]

  );



  return (

    <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 16, maxWidth: 960, margin: "0 auto" }}>

      <div>

        <h2 style={{ fontFamily: typography.fontHeading, color: colors.gold, margin: 0, fontSize: 18 }}>

          World Map

        </h2>

        <p style={{ fontSize: 12, color: colors.dimText, marginTop: 8, lineHeight: 1.5 }}>

          Click a region to jump to its area checklist. Pin color reflects completion; numbers show done/total.

        </p>

      </div>



      <div

        style={{

          position: "relative",

          width: "100%",

          maxWidth: 560,

          margin: "0 auto",

          aspectRatio: "5 / 6",

          background: "radial-gradient(ellipse at 50% 35%, rgba(200,160,48,0.1), rgba(8,6,4,0.95))",

          border: `1px solid ${colors.border}`,

          borderRadius: 16,

          overflow: "hidden",

        }}

      >

        <svg viewBox="0 0 100 120" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>

          <ellipse cx="50" cy="55" rx="38" ry="48" fill="none" stroke="rgba(200,160,48,0.15)" strokeWidth="0.4" strokeDasharray="2 2" />

          {pins.map((p) => {

            const selected = focusId === p.areaId;

            const pct = p.completion.pct;

            const fill =

              pct === 100 ? "rgba(80,200,120,0.35)" : pct > 0 ? "rgba(200,160,48,0.35)" : "rgba(40,36,32,0.8)";

            return (

              <g key={p.areaId}>

                <circle

                  cx={p.x}

                  cy={p.y}

                  r={selected ? 4.2 : 3.2}

                  fill={fill}

                  stroke={selected ? colors.gold : colors.border}

                  strokeWidth={selected ? 0.6 : 0.35}

                />

              </g>

            );

          })}

        </svg>

        {pins.map((p) => {

          const selected = focusId === p.areaId;

          const { done, total, pct } = p.completion;

          return (

            <button

              key={p.areaId}

              type="button"

              title={`${getArea(p.areaId).name} — ${done}/${total} (${pct}%)`}

              onMouseEnter={() => setHoverId(p.areaId)}

              onMouseLeave={() => setHoverId(null)}

              onClick={() => {

                onSelectArea(p.areaId);

                onOpenAreaChecklist?.(p.areaId);

              }}

              style={{

                position: "absolute",

                left: `${p.x}%`,

                top: `${(p.y / 120) * 100}%`,

                transform: "translate(-50%, -50%)",

                padding: "5px 8px",

                fontSize: 10,

                fontWeight: selected ? 700 : 500,

                background: selected ? "rgba(200,160,48,0.28)" : "rgba(0,0,0,0.72)",

                border: `1px solid ${selected ? colors.gold : colors.border}`,

                borderRadius: 8,

                color: selected ? colors.gold : colors.lightText,

                cursor: "pointer",

                whiteSpace: "nowrap",

                zIndex: selected ? 2 : 1,

              }}

            >

              {p.label}

              <span style={{ color: colors.dimText, marginLeft: 4 }}>

                {total > 0 ? `${done}/${total}` : "—"}

              </span>

            </button>

          );

        })}

      </div>



      {focusId && (

        <div

          style={{

            padding: 12,

            background: colors.bgCard,

            border: `1px solid ${colors.gold}44`,

            borderRadius: 10,

            fontSize: 12,

            color: colors.lightText,

          }}

        >

          <strong style={{ color: colors.gold }}>{getArea(focusId).name}</strong>

          {" — "}

          {areaCompletion(focusId).pct}% complete

          {onOpenAreaChecklist && (

            <button

              type="button"

              onClick={() => onOpenAreaChecklist(focusId)}

              style={{

                marginLeft: 12,

                padding: "4px 10px",

                fontSize: 11,

                background: "rgba(200,160,48,0.15)",

                border: `1px solid ${colors.gold}55`,

                borderRadius: 6,

                color: colors.gold,

                cursor: "pointer",

              }}

            >

              Open checklist →

            </button>

          )}

        </div>

      )}



      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 8 }}>

        {AREA_ORDER.map((id) => {

          const c = areaCompletion(id);

          return (

            <button

              key={id}

              type="button"

              onClick={() => onSelectArea(id)}

              style={{

                padding: 10,

                textAlign: "left",

                background: selectedArea === id ? "rgba(200,160,48,0.12)" : colors.bgCard,

                border: `1px solid ${selectedArea === id ? colors.gold + "55" : colors.border}`,

                borderRadius: 10,

                color: colors.lightText,

                cursor: "pointer",

                fontSize: 11,

              }}

            >

              <div style={{ fontWeight: 600 }}>{getArea(id).name}</div>

              <div style={{ color: colors.dimText, marginTop: 4 }}>

                {c.done}/{c.total} · {c.pct}%

              </div>

            </button>

          );

        })}

      </div>

    </div>

  );

}


