import { AREA_ORDER, getArea, type AreaId } from "../data/areas";
import { getCheckableIdsFromItems } from "../data/areaProgress";

/** Sheet / community area labels → engine AreaId */
export const SHEET_AREA_ALIASES: Record<string, AreaId> = {
  "things betwixt": "things_betwixt",
  betwixt: "things_betwixt",
  majula: "majula",
  "forest of fallen giants": "forest_of_fallen_giants",
  fofg: "forest_of_fallen_giants",
  "heides tower of flame": "heides_tower",
  "heide's tower of flame": "heides_tower",
  heide: "heides_tower",
  "no mans wharf": "no_mans_wharf",
  "no-man's wharf": "no_mans_wharf",
  wharf: "no_mans_wharf",
  "lost bastille": "lost_bastille",
  bastille: "lost_bastille",
  "huntsmans copse": "huntsmans_copse",
  "huntsman's copse": "huntsmans_copse",
  copse: "huntsmans_copse",
  "harvest valley": "harvest_valley",
  "earthen peak": "earthen_peak",
  "iron keep": "iron_keep",
  "the pit": "the_pit",
  "the gutter": "the_gutter",
  "black gulch": "black_gulch",
  "shaded woods": "shaded_woods",
  "doors of pharros": "doors_of_pharros",
  pharros: "doors_of_pharros",
  "brightstone cove tseldora": "brightstone_cove",
  brightstone: "brightstone_cove",
  "sinners rise": "sinners_rise",
  "drangleic castle": "drangleic_castle",
  "shrine of amana": "shrine_of_amana",
  amana: "shrine_of_amana",
  "undead crypt": "undead_crypt",
  crypt: "undead_crypt",
  "aldias keep": "aldias_keep",
  "aldia's keep": "aldias_keep",
  "dragon aerie": "dragon_aerie",
  memories: "memories",
  "dark chasm": "dark_chasm",
  "throne of want": "throne_of_want",
  "crown of the sunken king": "dlc_sunken",
  shulva: "dlc_sunken",
  "crown of the old iron king": "dlc_iron",
  brume: "dlc_iron",
  "crown of the ivory king": "dlc_ivory",
  eleum: "dlc_ivory",
};

function normLabel(s: string): string {
  return s
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** progressId pattern used in areas.ts (fg8a, maj3, ik12, …) */
export const PROGRESS_ID_RE = /^[a-z]{2,6}\d+[a-z]?$/i;

export function resolveAreaSlug(raw: string): AreaId | null {
  const n = normLabel(raw);
  if ((AREA_ORDER as readonly string[]).includes(n)) return n as AreaId;
  return SHEET_AREA_ALIASES[n] ?? null;
}

/** Build label → progressId from all checklist item text */
export function buildChecklistLabelIndex(): Map<string, string> {
  const map = new Map<string, string>();
  for (const areaId of AREA_ORDER) {
    const area = getArea(areaId);
    for (const item of area.items) {
      if (item.subItems?.length) {
        for (const sub of item.subItems) {
          map.set(normLabel(sub.text), sub.id);
          map.set(sub.id.toLowerCase(), sub.id);
        }
      } else if (item.type !== "warn") {
        map.set(normLabel(item.text), item.id);
        map.set(item.id.toLowerCase(), item.id);
      }
    }
  }
  return map;
}

export function allKnownProgressIds(): Set<string> {
  const ids = new Set<string>();
  for (const areaId of AREA_ORDER) {
    for (const id of getCheckableIdsFromItems(getArea(areaId).items)) {
      ids.add(id);
    }
  }
  return ids;
}
