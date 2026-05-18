import type { BuildItem, BuildItemSource } from "../buildItems";
import { BUILD_MATERIAL_FARMS } from "../buildItems";
import type { BuildStep } from "../buildChecklist";
import type { BuildTemplate } from "./types";
import { linkBuildSteps } from "./linkBuildSteps";

type MaterialFarm = NonNullable<BuildTemplate["buildMaterialFarms"]>[number];

const STR_BUILD_IDS = new Set([
  "the-destroyer",
  "tank-executioner",
  "pyro-warrior",
  "polearm-paladin",
]);

const PYRO_BUILD_IDS = new Set(["inferno-reaper", "flame-prince", "pyro-warrior"]);

const HEX_BUILD_IDS = new Set([
  "dark-melee-hexer",
  "dark-cleric",
  "dark-chaos-assassin",
  "chime-hammer-hexer",
  "quality-dark",
  "dark-red-mage",
]);

const DEX_BUILD_IDS = new Set([
  "master-dex",
  "oro-blacksteel",
  "ninja-warrior",
  "lacerating-blood",
  "belmont-family",
]);

const INT_BUILD_IDS = new Set(["pure-int-mlgs", "moonlight-battlemage", "blue-flame-mage"]);

const STR_MATERIAL_FARMS: MaterialFarm[] = [
  {
    item: "Titanite (Shards, Large, Chunks)",
    purpose: "Weapon +10",
    sources: [{ type: "vendor", location: "Lenigrast, McDuff, Chloanne", detail: "See Farming tab" }],
    farmOptions: [
      { enemy: "Alonne Knight", area: "Iron Keep", method: "Chunks. CoC.", unlock: "Iron Keep" },
      { enemy: "Crystal Lizard", area: "Black Gulch, Dragon Aerie", method: "Chunks / Twinkling", unlock: "Area access" },
    ],
  },
  {
    item: "Petrified Dragon Bone",
    purpose: "Boss weapons +5",
    sources: [{ type: "drop", location: "Various", detail: "Rare boss weapon upgrade" }],
    farmOptions: [{ enemy: "Crystal Lizard", area: "Multiple areas", method: "Rare drop", unlock: "—" }],
  },
];

const PYRO_MATERIAL_FARMS: MaterialFarm[] = [
  {
    item: "Fire Seeds",
    purpose: "Pyromancy Flame +10",
    sources: [
      { type: "vendor", location: "Straid, Chloanne", detail: "Limited stock" },
      { type: "chest", location: "FoFG, Iron Keep", detail: "Various chests" },
    ],
    farmOptions: [
      { enemy: "Fire Salamander", area: "FoFG", method: "Rare", unlock: "FoFG" },
      { enemy: "Desert Sorceress", area: "Earthen Peak", method: "Good rate. CoC.", unlock: "Earthen Peak" },
    ],
  },
  ...STR_MATERIAL_FARMS,
];

const HEX_MATERIAL_FARMS: MaterialFarm[] = [...BUILD_MATERIAL_FARMS];

const DEX_MATERIAL_FARMS: MaterialFarm[] = [
  {
    item: "Bleed Stone / Raw Stone",
    purpose: "Bleed or raw infusions",
    sources: [{ type: "vendor", location: "Chloanne", detail: "After King's Ring" }],
    farmOptions: [{ enemy: "Shadow Warrior", area: "Forest of Fallen Giants", method: "Rare", unlock: "FoFG" }],
  },
  ...STR_MATERIAL_FARMS,
];

function inferSourceType(source: string, name: string): BuildItemSource["type"] {
  const s = `${source} ${name}`.toLowerCase();
  if (s.includes("buy") || s.includes("lenigrast") || s.includes("vendor") || s.includes("felkin")) return "buy";
  if (s.includes("drop") || s.includes("pursuer") || s.includes("farm")) return "drop";
  if (s.includes("chest") || s.includes("corpse")) return "chest";
  if (s.includes("trade") || s.includes("ornifex")) return "trade";
  if (s.includes("boss") || s.includes("ng+")) return "boss";
  return "vendor";
}

function cleanItemName(name: string): string {
  return name
    .replace(/\s*\([^)]*\)\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stepToItemType(type: BuildStep["type"]): BuildItem["type"] {
  if (type === "key" || type === "upgrade" || type === "infusion") return "weapon";
  if (type === "spell" || type === "catalyst") return type === "catalyst" ? "catalyst" : "spell";
  return type as BuildItem["type"];
}

function buildItemsFromTemplate(t: BuildTemplate): BuildItem[] {
  const items: BuildItem[] = [];
  const seen = new Set<string>();

  const add = (entry: BuildItem) => {
    const key = entry.name.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    items.push(entry);
  };

  for (const step of t.buildSteps) {
    const name = cleanItemName(step.name);
    if (!name || name.length < 2) continue;
    add({
      name,
      type: stepToItemType(step.type),
      role: step.source,
      phase: step.phase,
      whereToFind: [
        {
          type: inferSourceType(step.source, step.name),
          location: step.source,
          detail: step.detail ?? step.name,
        },
      ],
      progressId: step.progressId.startsWith("build:") ? undefined : step.progressId,
    });
  }

  for (const w of t.weapons) {
    const name = cleanItemName(w.name);
    add({
      name,
      type: "weapon",
      role: w.role,
      phase: w.phase,
      whereToFind: [
        {
          type: "vendor",
          location: "See checklist",
          detail: `${w.infusion ?? "—"} · ${w.stats}`,
        },
      ],
    });
  }

  for (const r of t.keyRings) {
    add({
      name: cleanItemName(r.name),
      type: "ring",
      role: r.effect,
      phase: 5,
      whereToFind: [{ type: inferSourceType(r.source, r.name), location: r.source, detail: r.effect }],
    });
  }

  for (const s of t.spells) {
    add({
      name: cleanItemName(s.name),
      type: "spell",
      role: s.purpose,
      phase: 4,
      whereToFind: [{ type: "vendor", location: s.school, detail: s.purpose }],
    });
  }

  return items;
}

function ringsDetailFromTemplate(t: BuildTemplate): BuildTemplate["ringsDetail"] {
  if (!t.keyRings.length) return undefined;
  const names = t.keyRings.map((r) => cleanItemName(r.name));
  const coreCount = Math.min(3, names.length);
  return {
    priorityOrder: names,
    groups: [
      { label: "Core", ringNames: names.slice(0, coreCount) },
      { label: "Optional / NG+", ringNames: names.slice(coreCount) },
    ],
    rings: t.keyRings.map((r, i) => ({
      name: cleanItemName(r.name),
      priority: i < coreCount ? "core" : "optional",
      effect: r.effect,
      whereToGet: r.source,
      howToGet: r.source,
      phase: i < 2 ? 1 : i < 4 ? 3 : 6,
    })),
  };
}

function materialFarmsForBuild(id: string): MaterialFarm[] {
  if (PYRO_BUILD_IDS.has(id)) return PYRO_MATERIAL_FARMS;
  if (HEX_BUILD_IDS.has(id)) return HEX_MATERIAL_FARMS;
  if (DEX_BUILD_IDS.has(id)) return DEX_MATERIAL_FARMS;
  if (INT_BUILD_IDS.has(id)) return [...HEX_MATERIAL_FARMS];
  if (STR_BUILD_IDS.has(id)) return STR_MATERIAL_FARMS;
  return STR_MATERIAL_FARMS;
}

/** Turn PDF-generated template into a full guide (gear, rings panel, farming, linked checklist). */
export function toFullBuildTemplate(t: BuildTemplate): BuildTemplate {
  const buildSteps = linkBuildSteps(t.buildSteps ?? []);
  const withSteps = { ...t, buildSteps };
  const buildItems = t.buildItems?.length ? t.buildItems : buildItemsFromTemplate(withSteps);
  const buildMaterialFarms = t.buildMaterialFarms?.length
    ? t.buildMaterialFarms
    : materialFarmsForBuild(t.id);
  const ringsDetail = t.ringsDetail ?? ringsDetailFromTemplate(withSteps);

  return {
    ...withSteps,
    buildItems,
    buildMaterialFarms,
    ringsDetail,
  };
}

export function isFullGuideBuild(t: BuildTemplate): boolean {
  return (
    (t.levels?.length ?? 0) >= 100 &&
    (t.buildSteps?.length ?? 0) >= 5 &&
    (t.buildItems?.length ?? 0) >= 3
  );
}
