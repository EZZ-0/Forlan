import type { BuildTemplate } from "./types";
import raw from "./generated/buildData.json";
import { darkMeleeHexer } from "./darkMeleeHexer";
import { darkChaosAssassin } from "./darkChaosAssassin";
import { infernoReaper } from "./infernoReaper";
import { theDestroyer } from "./theDestroyer";
import { darkCleric } from "./darkCleric";
import { lordOfLightning } from "./lordOfLightning";
import { moonlightBattlemage } from "./moonlightBattlemage";
import { pureIntMlgs } from "./pureIntMlgs";
import { laceratingBlood } from "./laceratingBlood";
import { oroBlacksteel } from "./oroBlacksteel";
import { flamePrince } from "./flamePrince";
import { qualityDark } from "./qualityDark";
import { masterDex } from "./masterDex";
import { tankExecutioner } from "./tankExecutioner";
import { ninjaWarrior } from "./ninjaWarrior";
import { polearmPaladin } from "./polearmPaladin";
import { belmontFamily } from "./belmontFamily";
import { chimeHammerHexer } from "./chimeHammerHexer";
import { blueFlameMage } from "./blueFlameMage";
import { pyroWarrior } from "./pyroWarrior";
import { darkRedMage } from "./darkRedMage";
import { toFullBuildTemplate, isFullGuideBuild } from "./fullBuildEnrichment";
import { isHandcraftedBuild, countHandwrittenComplete, getNextGeneratedBuildId } from "./handwrittenBuildStatus";

/**
 * Hand-written overrides (see .cursor/plans/handwritten_builds_execution.plan.md).
 * When a build is complete, add it here — it replaces generated JSON + skips enrichment.
 */
const OVERRIDES: Record<string, BuildTemplate> = {
  "dark-melee-hexer": darkMeleeHexer,
  "dark-chaos-assassin": darkChaosAssassin,
  "inferno-reaper": infernoReaper,
  "the-destroyer": theDestroyer,
  "dark-cleric": darkCleric,
  "lord-of-lightning": lordOfLightning,
  "moonlight-battlemage": moonlightBattlemage,
  "pure-int-mlgs": pureIntMlgs,
  "lacerating-blood": laceratingBlood,
  "oro-blacksteel": oroBlacksteel,
  "flame-prince": flamePrince,
  "quality-dark": qualityDark,
  "master-dex": masterDex,
  "tank-executioner": tankExecutioner,
  "ninja-warrior": ninjaWarrior,
  "polearm-paladin": polearmPaladin,
  "belmont-family": belmontFamily,
  "chime-hammer-hexer": chimeHammerHexer,
  "blue-flame-mage": blueFlameMage,
  "pyro-warrior": pyroWarrior,
  "dark-red-mage": darkRedMage,
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

export { isFullGuideBuild, isHandcraftedBuild, countHandwrittenComplete, getNextGeneratedBuildId };
