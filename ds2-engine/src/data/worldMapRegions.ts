import type { AreaId } from "./areas";

/** Map pin positions (% of viewBox) — full AREA_ORDER coverage for MAP-03 */
export const WORLD_MAP_REGIONS: {
  areaId: AreaId;
  label: string;
  x: number;
  y: number;
}[] = [
  { areaId: "things_betwixt", label: "Betwixt", x: 50, y: 6 },
  { areaId: "majula", label: "Majula", x: 50, y: 22 },
  { areaId: "forest_of_fallen_giants", label: "FoFG", x: 74, y: 28 },
  { areaId: "heides_tower", label: "Heide", x: 26, y: 34 },
  { areaId: "no_mans_wharf", label: "Wharf", x: 18, y: 46 },
  { areaId: "lost_bastille", label: "Bastille", x: 34, y: 48 },
  { areaId: "huntsmans_copse", label: "Copse", x: 64, y: 44 },
  { areaId: "harvest_valley", label: "Harvest", x: 80, y: 50 },
  { areaId: "earthen_peak", label: "Peak", x: 76, y: 58 },
  { areaId: "iron_keep", label: "Iron Keep", x: 68, y: 64 },
  { areaId: "the_pit", label: "Pit", x: 42, y: 56 },
  { areaId: "the_gutter", label: "Gutter", x: 38, y: 64 },
  { areaId: "black_gulch", label: "Gulch", x: 30, y: 72 },
  { areaId: "shaded_woods", label: "Shaded", x: 58, y: 52 },
  { areaId: "doors_of_pharros", label: "Pharros", x: 48, y: 50 },
  { areaId: "brightstone_cove", label: "Brightstone", x: 72, y: 72 },
  { areaId: "sinners_rise", label: "Sinner", x: 36, y: 42 },
  { areaId: "drangleic_castle", label: "Drangleic", x: 50, y: 58 },
  { areaId: "shrine_of_amana", label: "Amana", x: 56, y: 76 },
  { areaId: "undead_crypt", label: "Crypt", x: 44, y: 76 },
  { areaId: "aldias_keep", label: "Aldia", x: 50, y: 84 },
  { areaId: "dragon_aerie", label: "Aerie", x: 62, y: 82 },
  { areaId: "memories", label: "Memories", x: 28, y: 68 },
  { areaId: "dark_chasm", label: "Chasm", x: 22, y: 58 },
  { areaId: "throne_of_want", label: "Throne", x: 50, y: 92 },
  { areaId: "dlc_sunken", label: "Shulva", x: 10, y: 82 },
  { areaId: "dlc_iron", label: "Brume", x: 90, y: 68 },
  { areaId: "dlc_ivory", label: "Ivory", x: 90, y: 48 },
];
