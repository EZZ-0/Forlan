import type { BuildTemplate } from "./types";
import {
  ALL_BUILD_TEMPLATES,
  getBuildTemplateFromRegistry,
  getAllBuildTemplatesFromRegistry,
  isBuildTemplateReady,
  isFullGuideBuild,
  isHandcraftedBuild,
  countHandwrittenComplete,
  getNextGeneratedBuildId,
} from "./fromGenerated";

export type { BuildTemplate, StartingClass } from "./types";
export { CLASS_BASE_STATS } from "./types";
export { generateLevelRoadmap, STARTING_SL } from "./levelGenerator";
export {
  isBuildTemplateReady,
  isFullGuideBuild,
  isHandcraftedBuild,
  countHandwrittenComplete,
  getNextGeneratedBuildId,
};

export const BUILD_TEMPLATE_IDS = ALL_BUILD_TEMPLATES.map((t) => t.id) as readonly string[];

export type BuildTemplateId = (typeof BUILD_TEMPLATE_IDS)[number];

export const DEFAULT_BUILD_TEMPLATE_ID = "dark-melee-hexer";

export function getBuildTemplate(id: string): BuildTemplate | undefined {
  return getBuildTemplateFromRegistry(id);
}

export function getAllBuildTemplates(): BuildTemplate[] {
  return getAllBuildTemplatesFromRegistry();
}
