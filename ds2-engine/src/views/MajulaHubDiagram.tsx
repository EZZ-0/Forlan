import { AREA_ORDER, getArea, type AreaId } from "../data/areas";
import { colors } from "../theme";

/** Static region hub — stepping stone to full world map (MAP-01). */
const HUB_REGIONS: { areaId: AreaId; label: string; x: number; y: number }[] = [
  { areaId: "things_betwixt", label: "Betwixt", x: 50, y: 8 },
  { areaId: "majula", label: "Majula", x: 50, y: 28 },
  { areaId: "forest_of_fallen_giants", label: "FoFG", x: 72, y: 32 },
  { areaId: "heides_tower", label: "Heide", x: 28, y: 38 },
  { areaId: "no_mans_wharf", label: "Wharf", x: 22, y: 52 },
  { areaId: "lost_bastille", label: "Bastille", x: 38, y: 52 },
  { areaId: "huntsmans_copse", label: "Copse", x: 62, y: 48 },
  { areaId: "harvest_valley", label: "Harvest", x: 78, y: 55 },
  { areaId: "iron_keep", label: "Iron Keep", x: 70, y: 68 },
  { areaId: "drangleic_castle", label: "Drangleic", x: 50, y: 62 },
  { areaId: "shrine_of_amana", label: "Amana", x: 58, y: 78 },
  { areaId: "undead_crypt", label: "Crypt", x: 42, y: 78 },
  { areaId: "aldias_keep", label: "Aldia", x: 50, y: 88 },
  { areaId: "memories", label: "Memories", x: 30, y: 72 },
  { areaId: "throne_of_want", label: "Throne", x: 50, y: 95 },
  { areaId: "dlc_sunken", label: "Sunken", x: 12, y: 85 },
  { areaId: "dlc_iron", label: "Iron DLC", x: 88, y: 75 },
  { areaId: "dlc_ivory", label: "Ivory", x: 88, y: 55 },
];

export function MajulaHubDiagram({
  selectedArea,
  onSelectArea,
  areaCompletion,
}: {
  selectedArea?: AreaId | null;
  onSelectArea: (id: AreaId) => void;
  areaCompletion: (id: AreaId) => { pct: number };
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 420,
        aspectRatio: "1",
        margin: "0 auto",
        background: "radial-gradient(circle at 50% 40%, rgba(200,160,48,0.08), rgba(0,0,0,0.4))",
        border: `1px solid ${colors.border}`,
        borderRadius: 16,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "12%",
          border: "1px dashed rgba(200,160,48,0.2)",
          borderRadius: "50%",
        }}
      />
      {HUB_REGIONS.map((r) => {
        const pct = areaCompletion(r.areaId).pct;
        const selected = selectedArea === r.areaId;
        return (
          <button
            key={r.areaId}
            type="button"
            title={`${getArea(r.areaId).name} — ${pct}%`}
            onClick={() => onSelectArea(r.areaId)}
            style={{
              position: "absolute",
              left: `${r.x}%`,
              top: `${r.y}%`,
              transform: "translate(-50%, -50%)",
              padding: "6px 10px",
              fontSize: 10,
              fontWeight: selected ? 700 : 500,
              background: selected ? "rgba(200,160,48,0.25)" : "rgba(0,0,0,0.5)",
              border: `1px solid ${selected ? colors.gold : colors.border}`,
              borderRadius: 8,
              color: selected ? colors.gold : colors.lightText,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {r.label}
            {pct === 100 ? " ✓" : pct > 0 ? ` ${pct}%` : ""}
          </button>
        );
      })}
    </div>
  );
}

export function getHubCoverage(): number {
  return HUB_REGIONS.length;
}

export function allHubAreas(): AreaId[] {
  return [...new Set([...HUB_REGIONS.map((r) => r.areaId), ...AREA_ORDER])];
}
