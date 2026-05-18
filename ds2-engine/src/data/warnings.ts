import type { AreaId } from "./areas";

export const WARNINGS: Partial<Record<AreaId, string[]>> = {
  earthen_peak: [
    "🔥 BURN THE WINDMILL before Mytha — light torch, interact with windmill base. Drains ALL poison from boss arena. Miss this = nearly impossible boss fight.",
  ],
  undead_crypt: [
    "💀 DO NOT light any torches! DO NOT ring any bells! This spawns extra enemies and PERMANENTLY aggros Agdayne (hex vendor + Have Mercy gesture). Enter with no torch equipped.",
  ],
  black_gulch: [
    "🗝 Save a Fragrant Branch for the hidden bonfire path (petrified statue). The Branch on the corpse BEFORE Black Gulch entrance is meant for this.",
  ],
  dragon_aerie: [
    "🐉 In SotFS, Dragon Knights are honorable — they WON'T attack unless you attack first. Just walk through. Only Drakekeepers near Ancient Dragon are hostile.",
  ],
  dlc_ivory: [
    "⚔ Find ALL 4 Loyce Knights before fighting the Burnt Ivory King — they seal the portals in the boss arena, making the fight much easier.",
  ],
};
