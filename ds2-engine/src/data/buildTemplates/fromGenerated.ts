import type { BuildTemplate } from "./types";
import type { BuildStep } from "../buildChecklist";
import raw from "./generated/buildData.json";
import { darkMeleeHexer } from "./darkMeleeHexer";
import { darkChaosAssassin } from "./darkChaosAssassin";
import { infernoReaper } from "./infernoReaper";
import { linkBuildSteps } from "./linkBuildSteps";

/** Hand-tuned templates override PDF-generated data */
const OVERRIDES: Record<string, BuildTemplate> = {
  "dark-melee-hexer": darkMeleeHexer,
  "dark-chaos-assassin": darkChaosAssassin,
  "inferno-reaper": infernoReaper,
};

function enrichTemplate(b: BuildTemplate): BuildTemplate {
  const rawSteps = (b.buildSteps ?? []) as BuildStep[];
  const buildSteps = linkBuildSteps(rawSteps);
  let buildItems = b.buildItems ?? [];
  if (buildItems.length === 0 && b.weapons?.length) {
    buildItems = b.weapons.map((w) => ({
      name: w.name.replace(/ \+\d+$/, "").trim(),
      type: "weapon" as const,
      role: w.role,
      phase: w.phase,
      whereToFind: [{ type: "vendor", location: "Build tab checklist", detail: w.stats || w.infusion || "" }],
    }));
  }
  return { ...b, buildSteps, buildItems };
}

const GENERATED: BuildTemplate[] = (raw as unknown as BuildTemplate[]).map((b) =>
  enrichTemplate(b as BuildTemplate)
);

const BY_ID = new Map<string, BuildTemplate>();
for (const b of GENERATED) {
  BY_ID.set(b.id, OVERRIDES[b.id] ?? b);
}
for (const [id, t] of Object.entries(OVERRIDES)) {
  BY_ID.set(id, t);
}

export const ALL_BUILD_TEMPLATES: BuildTemplate[] = Array.from(BY_ID.values()).sort((a, b) =>
  a.name.localeCompare(b.name)
);

export function getBuildTemplateFromRegistry(id: string): BuildTemplate | undefined {
  return BY_ID.get(id);
}

export function getAllBuildTemplatesFromRegistry(): BuildTemplate[] {
  return ALL_BUILD_TEMPLATES;
}

export function isBuildTemplateReady(t: BuildTemplate): boolean {
  return (t.levels?.length ?? 0) > 0 && (t.buildSteps?.length ?? 0) > 0;
}
