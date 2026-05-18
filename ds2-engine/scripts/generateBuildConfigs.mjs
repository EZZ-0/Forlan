/**
 * Reads build-guides-pdf/DS2_ALL_BUILDS_A-Z.md + areas.ts
 * Writes src/data/buildTemplates/generated/buildData.json
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "..");
const mdPath = path.join(root, "build-guides-pdf", "DS2_ALL_BUILDS_A-Z.md");
const areasPath = path.join(__dirname, "..", "src", "data", "areas.ts");
const outDir = path.join(__dirname, "..", "src", "data", "buildTemplates", "generated");
const outPath = path.join(outDir, "buildData.json");

const md = fs.readFileSync(mdPath, "utf8");
const areasSrc = fs.readFileSync(areasPath, "utf8");

const CLASS_MAP = {
  sorcerer: "sorcerer",
  warrior: "warrior",
  cleric: "cleric",
  knight: "knight",
  swordsman: "swordsman",
  bandit: "bandit",
  explorer: "explorer",
  deprived: "deprived",
};

const BUILD_ID_MAP = {
  "dark melee hexer": "dark-melee-hexer",
  "inferno reaper": "inferno-reaper",
  "the destroyer": "the-destroyer",
  "dark cleric": "dark-cleric",
  "lord of lightning and sunlight": "lord-of-lightning",
  "moonlight battlemage": "moonlight-battlemage",
  "pure int / moonlight greatsword": "pure-int-mlgs",
  "lacerating blood": "lacerating-blood",
  "oro's blacksteel katana": "oro-blacksteel",
  "dark chaos blade assassin": "dark-chaos-assassin",
  "flame prince of the deserts": "flame-prince",
  "quality dark": "quality-dark",
  "master dex build": "master-dex",
  "tank executioner": "tank-executioner",
  "ninja warrior": "ninja-warrior",
  "polearm paladin": "polearm-paladin",
  "belmont family": "belmont-family",
  "chime hammer hexer": "chime-hammer-hexer",
  "mastering the blue flame": "blue-flame-mage",
  "pyro warrior": "pyro-warrior",
  "dark red mage": "dark-red-mage",
};

const PHASE_COLORS = ["#6b7c52", "#c8a030", "#d4862a", "#c45a30", "#a03030", "#8b5cf6"];

const STARTING_SL = {
  warrior: 7,
  knight: 12,
  swordsman: 9,
  bandit: 11,
  cleric: 14,
  sorcerer: 11,
  explorer: 10,
  deprived: 1,
};

const CLASS_BASE = {
  warrior: { VGR: 7, END: 6, VIT: 6, ATN: 5, STR: 15, DEX: 11, ADP: 5, INT: 5, FTH: 5 },
  knight: { VGR: 12, END: 6, VIT: 7, ATN: 9, STR: 11, DEX: 8, ADP: 3, INT: 6, FTH: 4 },
  swordsman: { VGR: 4, END: 8, VIT: 4, ATN: 6, STR: 9, DEX: 16, ADP: 7, INT: 5, FTH: 6 },
  bandit: { VGR: 9, END: 7, VIT: 11, ATN: 3, STR: 9, DEX: 14, ADP: 1, INT: 8, FTH: 2 },
  cleric: { VGR: 10, END: 3, VIT: 8, ATN: 4, STR: 11, DEX: 5, ADP: 4, INT: 12, FTH: 10 },
  sorcerer: { VGR: 5, END: 6, VIT: 5, ATN: 8, STR: 3, DEX: 7, ADP: 14, INT: 4, FTH: 12 },
  explorer: { VGR: 7, END: 6, VIT: 9, ATN: 12, STR: 6, DEX: 6, ADP: 5, INT: 5, FTH: 7 },
  deprived: { VGR: 6, END: 6, VIT: 6, ATN: 6, STR: 6, DEX: 6, ADP: 6, INT: 6, FTH: 6 },
};

const STAT_KEYS = ["VGR", "END", "VIT", "ATN", "STR", "DEX", "ADP", "INT", "FTH"];

const AREA_NAME_MAP = {
  "Things Betwixt": "things_betwixt",
  Majula: "majula",
  "Forest of Fallen Giants": "forest_of_fallen_giants",
  "FoFG": "forest_of_fallen_giants",
  "Heide's Tower": "heides_tower",
  "Heide's": "heides_tower",
  "No-Man's Wharf": "no_mans_wharf",
  "Lost Bastille": "lost_bastille",
  "Huntsman's Copse": "huntsmans_copse",
  "Harvest Valley": "harvest_valley",
  "Earthen Peak": "earthen_peak",
  "Iron Keep": "iron_keep",
  "Shaded Woods": "shaded_woods",
  "The Gutter": "the_gutter",
  "Black Gulch": "black_gulch",
  "Brightstone Cove": "brightstone_cove",
  "Drangleic Castle": "drangleic_castle",
  "Shrine of Amana": "shrine_of_amana",
  "Undead Crypt": "undead_crypt",
  "Aldia's Keep": "aldias_keep",
  "Dragon Shrine": "dragon_aerie",
  "Dragon Aerie": "dragon_aerie",
  "Throne of Want": "throne_of_want",
  "Doors of Pharros": "doors_of_pharros",
  "Grave of Saints": "doors_of_pharros",
  "Belfry Luna": "lost_bastille",
  "DLC Ivory King": "dlc_ivory",
  "Memories": "memories",
  "Dark Chasm": "dark_chasm",
};

const MANUAL_LINKS = {
  "lenigrast's key": "fg5",
  "lenigrast key": "fg5",
  "open lenigrast": "fg12",
  "fire longsword": "fg11",
  "ring of blades": "fg15",
  "chloranthy ring": "fg21",
  "stone ring": "tb7",
  "dull ember": "lb2",
  "dark orb": "hc3",
  "great club": "gt1",
  "large club": "lb8",
  "heide knight sword": "ht4",
  "old leo ring": "ht6",
  "flexile sentry": "nm4",
  "ruin sentinels": "lb6",
};

const ATN_SLOT_NOTES = {
  14: "★ 2 spell slots",
  16: "★ 3 spell slots",
  20: "★ 4 spell slots",
  25: "★ 5 spell slots",
  30: "★ 6 spell slots",
  40: "★ 7 spell slots",
  43: "★ 7 slots + bonus casts",
};

// --- Area index from areas.ts ---
function normalize(s) {
  return s
    .toLowerCase()
    .replace(/\*\*/g, "")
    .replace(/\([^)]*\)/g, " ")
    .replace(/\+\d+/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildAreaIndex() {
  const index = [];
  let currentArea = null;
  for (const line of areasSrc.split("\n")) {
    const areaM = line.match(/^  ([a-z_]+): \{/);
    if (areaM) currentArea = areaM[1];
    const itemM = line.match(/item\("([^"]+)", "([^"]+)", "(\w+)"/);
    if (itemM && currentArea) {
      index.push({
        id: itemM[1],
        areaId: currentArea,
        text: itemM[2],
        norm: normalize(itemM[2]),
      });
    }
  }
  return index;
}

const AREA_INDEX = buildAreaIndex();

function scoreMatch(stepNorm, entry, preferArea) {
  let score = 0;
  if (preferArea && entry.areaId === preferArea) score += 3;
  if (entry.norm === stepNorm) score += 20;
  if (entry.norm.includes(stepNorm) || stepNorm.includes(entry.norm)) score += 12;
  for (const t of stepNorm.split(" ").filter((x) => x.length > 2)) {
    if (entry.norm.includes(t)) score += 2;
  }
  return score;
}

function findAreaProgressId(stepName, areaId) {
  const stepNorm = normalize(stepName);
  for (const [key, id] of Object.entries(MANUAL_LINKS)) {
    if (stepNorm.includes(key)) return id;
  }
  let best = null;
  let bestScore = 0;
  for (const entry of AREA_INDEX) {
    const s = scoreMatch(stepNorm, entry, areaId);
    if (s > bestScore) {
      bestScore = s;
      best = entry;
    }
  }
  if (bestScore < 6) {
    best = null;
    bestScore = 0;
    for (const entry of AREA_INDEX) {
      const s = scoreMatch(stepNorm, entry, undefined);
      if (s > bestScore) {
        bestScore = s;
        best = entry;
      }
    }
  }
  return bestScore >= 6 && best ? best.id : null;
}

function slugify(name) {
  const k = name.toLowerCase().replace(/\s+/g, " ").trim();
  return BUILD_ID_MAP[k] ?? k.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function parseStats(section) {
  const targets = {};
  const base = {};
  const re = /\|\s*(VGR|END|VIT|ATN|STR|DEX|ADP|INT|FTH)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|/g;
  let m;
  while ((m = re.exec(section))) {
    base[m[1]] = Number(m[2]);
    targets[m[1]] = Number(m[3]);
  }
  return { base, targets };
}

function phaseTargetsFromFinal(targets, base) {
  const phases = { 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: { ...targets } };
  for (const s of STAT_KEYS) {
    const t = targets[s];
    const b = base[s] ?? 0;
    if (t === undefined) continue;
    const delta = t - b;
    if (delta <= 0) {
      phases[6][s] = t;
      continue;
    }
    phases[1][s] = b + Math.ceil(delta * 0.2);
    phases[2][s] = b + Math.ceil(delta * 0.4);
    phases[3][s] = b + Math.ceil(delta * 0.55);
    phases[4][s] = b + Math.ceil(delta * 0.75);
    phases[5][s] = b + Math.ceil(delta * 0.9);
    phases[6][s] = t;
  }
  return phases;
}

function defaultPriority(targets) {
  const primary = [];
  for (const s of ["STR", "DEX", "INT", "FTH", "ATN", "VGR", "END", "ADP", "VIT"]) {
    if ((targets[s] ?? 0) > 15) primary.push(s);
  }
  return [...new Set([...primary, ...STAT_KEYS])];
}

function parseTableRows(section, headerPattern) {
  const idx = section.indexOf(headerPattern);
  if (idx < 0) return [];
  const slice = section.slice(idx);
  const lines = slice.split("\n").slice(2);
  const rows = [];
  for (const line of lines) {
    if (line.startsWith("## ")) break;
    if (!line.startsWith("|") || line.includes("---")) continue;
    const cells = line
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean);
    if (cells.length < 2) break;
    const head = cells[0].toLowerCase();
    if (["weapon", "ring", "spell", "stat", "phase", "slot", "school", "purpose", "effect", "source"].includes(head))
      continue;
    if (/^\d+$/.test(head)) continue;
    rows.push(cells);
    if (rows.length > 20) break;
  }
  return rows;
}

function parseAccessibilityRow(buildName) {
  const block = md.slice(md.indexOf("## By Accessibility"));
  const lines = block.split("\n").slice(3);
  const nameNorm = buildName.toLowerCase();
  for (const line of lines) {
    if (!line.startsWith("|") || line.includes("---")) continue;
    const cells = line
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean);
    if (cells[0].toLowerCase().includes(nameNorm.split(" ")[0])) {
      return {
        core70: cells[1],
        progress70: cells[2],
        full100: cells[3],
        progress100: cells[4],
      };
    }
  }
  return null;
}

function parseRoutePhaseInfo(section) {
  const idx = section.indexOf("## Route / Phase Overview");
  if (idx < 0) return null;
  const slice = section.slice(idx);
  const phases = [];
  for (const line of slice.split("\n")) {
    if (!line.startsWith("|") || line.includes("---") || line.includes("Phase")) continue;
    const cells = line
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean);
    if (cells.length < 4) break;
    const num = Number(cells[0]);
    if (!num) continue;
    phases.push({
      num,
      name: cells[1],
      range: `Phase ${num}`,
      color: PHASE_COLORS[num - 1] ?? "#8b5cf6",
      areas: cells[2],
      milestones: cells[3],
    });
  }
  return phases.length ? phases : null;
}

function parseTips(section) {
  const idx = section.indexOf("## Important Tips");
  if (idx < 0) return [];
  const tips = [];
  for (const line of section.slice(idx).split("\n")) {
    const m = line.match(/^- \*\*([^:*]+):\*\*\s*(.+)$/);
    if (m) tips.push({ item: m[1].trim(), note: m[2].trim() });
  }
  return tips;
}

function parseWeaponRequirements(weaponRows) {
  const reqs = [];
  for (const r of weaponRows) {
    const stats = r[3] ?? "";
    const name = r[0].replace(/ \+\d+$/, "");
    const strM = stats.match(/(\d+)\s*STR/i);
    const dexM = stats.match(/(\d+)\s*DEX/i);
    if (strM) reqs.push({ stat: "STR", value: Number(strM[1]), weapon: name, twoHand: stats.includes("2H") });
    if (dexM) reqs.push({ stat: "DEX", value: Number(dexM[1]), weapon: name });
  }
  return reqs;
}

function inferStepType(name) {
  const n = name.toLowerCase();
  if (n.includes("ring")) return "ring";
  if (n.includes("staff") || n.includes("chime")) return "catalyst";
  if (n.includes("orb") || n.includes("spell") || n.includes("spear")) return "spell";
  if (n.includes("ember") || n.includes("key")) return "key";
  if (n.includes("infus")) return "infusion";
  if (n.includes("+10") || n.includes("+5")) return "upgrade";
  if (n.match(/sword|katana|club|mace|bow|whip|lance|greatsword|hammer/)) return "weapon";
  return "weapon";
}

function parseChecklist(section, buildId) {
  const idx = section.search(/## A[\u2013-]Z Checklist/i);
  if (idx < 0) return [];
  const slice = section.slice(idx);
  const steps = [];
  let stepNum = 0;
  let phaseCounter = 0;

  for (const line of slice.split("\n")) {
    const clean = line.replace(/\r$/, "").trim();
    const m = clean.match(/^\*\*([^:*]+):\*\*\s*(.+)$/);
    if (!m) continue;
    phaseCounter++;
    const areaName = m[1].trim();
    const areaId = AREA_NAME_MAP[areaName] ?? "majula";
    const items = m[2].split("·").map((s) => s.trim()).filter(Boolean);
    for (const item of items) {
      stepNum++;
      const name = item.replace(/\*\*/g, "");
      const linked = findAreaProgressId(name, areaId);
      const progressId = linked ?? `build:${buildId}:${stepNum}`;
      steps.push({
        id: `build:${buildId}:${stepNum}`,
        progressId,
        name,
        areaId,
        phase: Math.min(6, phaseCounter),
        type: inferStepType(name),
        source: areaName,
        detail: linked ? "Linked to area checklist" : undefined,
      });
    }
  }
  return steps;
}

function generateLevels(startingClass, phaseTargets, phasePriority, ctx) {
  const { phaseInfo, weaponReqs, tips, accessibility, targets } = ctx;
  const stats = { ...CLASS_BASE[startingClass] };
  const startSl = STARTING_SL[startingClass];
  const entries = [];
  let sl = startSl + 1;
  const maxSl = 150;
  const phaseFirstSl = {};
  const notedTargets = new Set();

  while (sl <= maxSl) {
    let phase = 6;
    for (const p of [1, 2, 3, 4, 5, 6]) {
      const t = phaseTargets[p];
      if (!t) continue;
      for (const s of STAT_KEYS) {
        if (t[s] !== undefined && stats[s] < t[s]) {
          phase = p;
          break;
        }
      }
      if (phase !== 6) break;
    }

    const order = phasePriority[phase] ?? STAT_KEYS;
    const pTargets = phaseTargets[phase] ?? phaseTargets[6] ?? {};
    let stat = null;
    for (const s of order) {
      if (pTargets[s] !== undefined && stats[s] < pTargets[s]) {
        stat = s;
        break;
      }
    }
    if (!stat) {
      for (const s of STAT_KEYS) {
        if (stats[s] < 99) {
          stat = s;
          break;
        }
      }
    }
    if (!stat) stat = "VGR";

    const prevVal = stats[stat];
    stats[stat] += 1;
    const newVal = stats[stat];

    let note = "";

    if (!phaseFirstSl[phase]) {
      phaseFirstSl[phase] = sl;
      const pi = phaseInfo?.find((p) => p.num === phase);
      if (pi) note = `★ ${pi.name} — ${pi.milestones}`;
    }

    const targetKey = `${phase}:${stat}:${newVal}`;
    if (pTargets[stat] === newVal && !notedTargets.has(targetKey)) {
      notedTargets.add(targetKey);
      if (stat === "INT" && newVal === targets.INT) note = note || "★ INT soft cap";
      if (stat === "FTH" && newVal === targets.FTH) note = note || "★ FTH soft cap";
      if (stat === "ATN" && ATN_SLOT_NOTES[newVal]) note = note || ATN_SLOT_NOTES[newVal];
    }

    for (const req of weaponReqs) {
      if (req.stat === stat && req.value === newVal) {
        note = note || `★ ${req.weapon} (${req.value} ${stat}${req.twoHand ? ", 2H" : ""})`;
      }
    }

    for (const tip of tips) {
      const tipNorm = normalize(tip.item);
      if (normalize(stat).includes(tipNorm.slice(0, 4)) || tipNorm.includes(stat.toLowerCase())) continue;
      if (newVal >= 10 && tip.note.toLowerCase().includes(stat.toLowerCase())) {
        note = note || `★ ${tip.item}: ${tip.note}`;
        break;
      }
    }

    if (sl === maxSl) note = note || "★★ BUILD COMPLETE";
    if (sl === maxSl - 5 && accessibility?.full100) {
      note = note || `★ 100%: ${accessibility.full100}`;
    }

    entries.push({ sl, stat, value: newVal, phase, note: note.trim() });
    sl++;
  }

  return entries;
}

// Parse accessibility table once for all builds
const accessibilityByBuild = {};
const accBlock = md.slice(md.indexOf("## By Accessibility"));
for (const line of accBlock.split("\n")) {
  if (!line.startsWith("|") || line.includes("---") || line.includes("Build")) continue;
  const cells = line
    .split("|")
    .map((c) => c.trim())
    .filter(Boolean);
  if (cells.length < 4) continue;
  accessibilityByBuild[slugify(cells[0])] = {
    core70: cells[1],
    progress70: cells[2],
    full100: cells[3],
    progress100: cells[4],
  };
}

const sections = md.split(/^# \d+\.\s+/m).slice(1);
const builds = [];

for (const section of sections) {
  const titleLine = section.split("\n")[0].trim();
  const id = slugify(titleLine);
  const classMatch = section.match(/\*\*Starting Class\*\*:\s*(\w+)/i);
  const startingClass = CLASS_MAP[(classMatch?.[1] ?? "warrior").toLowerCase()] ?? "warrior";
  const statsBlock = section.slice(section.indexOf("## Final Target Stats"));
  const { base, targets } = parseStats(statsBlock);
  if (Object.keys(targets).length === 0) continue;

  const phaseTargets = phaseTargetsFromFinal(targets, base);
  const pri = defaultPriority(targets);
  const phasePriority = { 1: pri, 2: pri, 3: pri, 4: pri, 5: pri, 6: pri };

  const weaponRows = parseTableRows(section, "## Weapon Arsenal");
  const spellRows = parseTableRows(section, "## Spell Loadout");
  const ringRows = parseTableRows(section, "## Key Rings");
  const routePhases = parseRoutePhaseInfo(section);
  const phaseInfo =
    routePhases ??
    [
      { num: 1, name: "Early", range: "SL 1–30", color: "#6b7c52", areas: "Early game", milestones: "" },
      { num: 2, name: "Mid", range: "SL 31–60", color: "#c8a030", areas: "Mid game", milestones: "" },
      { num: 3, name: "Core", range: "SL 61–90", color: "#d4862a", areas: "Core", milestones: "" },
      { num: 4, name: "Late", range: "SL 91–120", color: "#c45a30", areas: "Late", milestones: "" },
      { num: 5, name: "Endgame", range: "SL 121–140", color: "#a03030", areas: "Endgame", milestones: "" },
      { num: 6, name: "Complete", range: "SL 141–150", color: "#8b5cf6", areas: "Finish", milestones: "" },
    ];

  const buildSteps = parseChecklist(section, id);

  const descLine =
    section
      .split("\n")
      .find((l) => l.startsWith("**") && !l.includes("Starting Class")) ?? "";

  builds.push({
    id,
    name: titleLine,
    description: descLine.replace(/\*\*/g, "").slice(0, 220) || titleLine,
    startingClass,
    baseStats: CLASS_BASE[startingClass],
    phaseTargets,
    phasePriority,
    phaseInfo: phaseInfo.map(({ num, name, range, color, areas }) => ({
      num,
      name,
      range,
      color,
      areas,
    })),
    weapons: weaponRows.map((r) => ({
      name: r[0],
      role: r[1] ?? "",
      phase: 3,
      infusion: r[2],
      stats: r[3] ?? "",
    })),
    spells: spellRows.map((r) => ({ name: r[0], school: r[1] ?? "", purpose: r[2] ?? "" })),
    keyRings: ringRows.map((r) => ({ name: r[0], effect: r[1] ?? "", source: r[2] ?? "" })),
    buildSteps,
    levels: generateLevels(startingClass, phaseTargets, phasePriority, {
      phaseInfo: routePhases,
      weaponReqs: parseWeaponRequirements(weaponRows),
      tips: parseTips(section),
      accessibility: accessibilityByBuild[id] ?? parseAccessibilityRow(titleLine),
      targets,
    }),
    accessibility: accessibilityByBuild[id] ?? null,
  });
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(builds, null, 2));

const stepCount = builds.reduce((sum, b) => sum + b.buildSteps.length, 0);
const linkedCount = builds.reduce(
  (sum, b) => sum + b.buildSteps.filter((s) => !/^build:[a-z0-9-]+:\d+$/.test(s.progressId)).length,
  0
);
const notedLevels = builds.reduce((sum, b) => sum + b.levels.filter((l) => l.note).length, 0);
console.log(`Wrote ${builds.length} builds to ${outPath}`);
console.log(`Checklist links: ${linkedCount}/${stepCount} (${stepCount ? Math.round((linkedCount / stepCount) * 100) : 0}% → area ids)`);
console.log(`Level milestones: ${notedLevels} SL rows with ★ notes`);
