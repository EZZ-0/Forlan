import type { BuildTemplate } from "./types";
import raw from "./generated/buildData.json";
import { darkMeleeHexer } from "./darkMeleeHexer";
import { darkChaosAssassin } from "./darkChaosAssassin";
import { infernoReaper } from "./infernoReaper";
import { toFullBuildTemplate, isFullGuideBuild } from "./fullBuildEnrichment";

/** Hand-tuned templates — already full guides from the PDF + walkthrough */
const OVERRIDES: Record<string, BuildTemplate> = {
  "dark-melee-hexer": darkMeleeHexer,
  "dark-chaos-assassin": darkChaosAssassin,
  "inferno-reaper": infernoReaper,
};

const GENERATED: BuildTemplate[] = (raw as unknown as BuildTemplate[]).map((b) =>
  toFullBuildTemplate(b as BuildTemplate)
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
  return isFullGuideBuild(t);
}

export { isFullGuideBuild };
