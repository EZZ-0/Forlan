import type { BuildTemplate } from "./types";
import { darkMeleeHexer } from "./darkMeleeHexer";
import { theDestroyer } from "./theDestroyer";
import { darkCleric } from "./darkCleric";
import { lordOfLightning } from "./lordOfLightning";
import { moonlightBattlemage } from "./moonlightBattlemage";
import { pureIntMlgs } from "./pureIntMlgs";
import { laceratingBlood } from "./laceratingBlood";
import { oroBlacksteel } from "./oroBlacksteel";
import { darkChaosAssassin } from "./darkChaosAssassin";
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
import { infernoReaper } from "./infernoReaper";

const TEMPLATES: Record<string, BuildTemplate> = {
  "dark-melee-hexer": darkMeleeHexer,
  "the-destroyer": theDestroyer,
  "dark-cleric": darkCleric,
  "lord-of-lightning": lordOfLightning,
  "moonlight-battlemage": moonlightBattlemage,
  "pure-int-mlgs": pureIntMlgs,
  "lacerating-blood": laceratingBlood,
  "oro-blacksteel": oroBlacksteel,
  "dark-chaos-assassin": darkChaosAssassin,
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
  "inferno-reaper": infernoReaper,
};

export const BUILD_TEMPLATE_IDS = [
  "dark-melee-hexer",
  "the-destroyer",
  "dark-cleric",
  "lord-of-lightning",
  "moonlight-battlemage",
  "pure-int-mlgs",
  "lacerating-blood",
  "oro-blacksteel",
  "dark-chaos-assassin",
  "flame-prince",
  "quality-dark",
  "master-dex",
  "tank-executioner",
  "ninja-warrior",
  "polearm-paladin",
  "belmont-family",
  "chime-hammer-hexer",
  "blue-flame-mage",
  "pyro-warrior",
  "dark-red-mage",
  "inferno-reaper",
] as const;

export type BuildTemplateId = (typeof BUILD_TEMPLATE_IDS)[number];

export const DEFAULT_BUILD_TEMPLATE_ID: BuildTemplateId = "dark-melee-hexer";

export function getBuildTemplate(id: string): BuildTemplate | undefined {
  return TEMPLATES[id];
}

export function getAllBuildTemplates(): BuildTemplate[] {
  return BUILD_TEMPLATE_IDS.map((id) => TEMPLATES[id]).filter(Boolean);
}
