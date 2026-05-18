/**
 * One-time generator: reads build-guides-pdf/DS2_ALL_BUILDS_A-Z.md
 * and writes src/data/buildTemplates/generated/buildData.json
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "..");
const mdPath = path.join(root, "build-guides-pdf", "DS2_ALL_BUILDS_A-Z.md");
const outDir = path.join(__dirname, "..", "src", "data", "buildTemplates", "generated");
const outPath = path.join(outDir, "buildData.json");

const md = fs.readFileSync(mdPath, "utf8");

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
  const phases = {};
  const p1 = {};
  const p2 = {};
  const p3 = {};
  const p4 = {};
  const p5 = {};
  const p6 = { ...targets };
  for (const s of STAT_KEYS) {
    const t = targets[s];
    const b = base[s] ?? 0;
    if (t === undefined) continue;
    const delta = t - b;
    if (delta <= 0) {
      p6[s] = t;
      continue;
    }
    p1[s] = b + Math.ceil(delta * 0.2);
    p2[s] = b + Math.ceil(delta * 0.4);
    p3[s] = b + Math.ceil(delta * 0.55);
    p4[s] = b + Math.ceil(delta * 0.75);
    p5[s] = b + Math.ceil(delta * 0.9);
    p6[s] = t;
  }
  return { 1: p1, 2: p2, 3: p3, 4: p4, 5: p5, 6: p6 };
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
    if (!line.startsWith("|") || line.includes("---")) continue;
    const cells = line
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean);
    if (cells.length < 2) break;
    if (cells[0].toLowerCase() === "ring" || cells[0].toLowerCase() === "weapon") continue;
    rows.push(cells);
    if (rows.length > 20) break;
  }
  return rows;
}

function parseChecklist(section) {
  const idx = section.indexOf("## A–Z Checklist");
  if (idx < 0) return [];
  const slice = section.slice(idx);
  const steps = [];
  let stepNum = 0;
  const areaMap = {
    "Things Betwixt": "things_betwixt",
    "Forest of Fallen Giants": "forest_of_fallen_giants",
    "Heide's Tower": "heides_tower",
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
    "Throne of Want": "throne_of_want",
    "DLC Ivory King": "dlc_ivory",
  };
  for (const line of slice.split("\n")) {
    const m = line.match(/^\*\*([^:*]+):\*\*\s*(.+)$/);
    if (!m) continue;
    const areaName = m[1].trim();
    const areaId = areaMap[areaName] ?? "majula";
    const items = m[2].split("·").map((s) => s.trim()).filter(Boolean);
    for (const item of items) {
      stepNum++;
      const pid = `build:${slugify(areaName)}:${stepNum}`;
      steps.push({
        id: pid,
        progressId: pid,
        name: item.replace(/\*\*/g, ""),
        areaId,
        phase: Math.min(6, Math.ceil(stepNum / 4)),
        type: "item",
        source: areaName,
      });
    }
  }
  return steps;
}

function generateLevels(startingClass, phaseTargets, phasePriority) {
  const baseStats = { ...CLASS_BASE[startingClass] };
  const startSl = STARTING_SL[startingClass];
  const stats = { ...baseStats };
  const entries = [];
  let sl = startSl + 1;
  const maxSl = 150;

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
    let stat = null;
    const targets = phaseTargets[phase] ?? phaseTargets[6] ?? {};
    for (const s of order) {
      if (targets[s] !== undefined && stats[s] < targets[s]) {
        stat = s;
        break;
      }
    }
    if (!stat) {
      for (const s of ["VGR", "END", "ATN", "STR", "DEX", "INT", "FTH", "ADP", "VIT"]) {
        if (stats[s] < 99) {
          stat = s;
          break;
        }
      }
    }
    if (!stat) stat = "VGR";
    stats[stat] += 1;
    entries.push({ sl, stat, value: stats[stat], phase, note: "" });
    sl++;
  }
  return entries;
}

const sections = md.split(/^# \d+\.\s+/m).slice(1);
const builds = [];

for (const section of sections) {
  const titleLine = section.split("\n")[0].trim();
  const id = slugify(titleLine);
  const descMatch = section.match(/\*\*([^*]+)\*\*/);
  const classMatch = section.match(/\*\*Starting Class\*\*:\s*(\w+)/i);
  const startingClass = CLASS_MAP[(classMatch?.[1] ?? "warrior").toLowerCase()] ?? "warrior";
  const statsBlock = section.slice(section.indexOf("## Final Target Stats"));
  const { base, targets } = parseStats(statsBlock);
  if (Object.keys(targets).length === 0) continue;

  const phaseTargets = phaseTargetsFromFinal(targets, base);
  const pri = defaultPriority(targets);
  const phasePriority = {
    1: pri,
    2: pri,
    3: pri,
    4: pri,
    5: pri,
    6: pri,
  };

  const weaponRows = parseTableRows(section, "## Weapon Arsenal");
  const spellRows = parseTableRows(section, "## Spell Loadout");
  const ringRows = parseTableRows(section, "## Key Rings");

  const phaseInfo = [
    { num: 1, name: "Early", range: "SL 1–30", color: "#6b7c52", areas: "Betwixt → FoFG" },
    { num: 2, name: "Mid", range: "SL 31–60", color: "#c8a030", areas: "Heide → Harvest" },
    { num: 3, name: "Core", range: "SL 61–90", color: "#d4862a", areas: "Iron Keep → Shaded" },
    { num: 4, name: "Late", range: "SL 91–120", color: "#c45a30", areas: "Brightstone → Castle" },
    { num: 5, name: "Endgame", range: "SL 121–140", color: "#a03030", areas: "Amana → Crypt" },
    { num: 6, name: "Complete", range: "SL 141–150", color: "#8b5cf6", areas: "Dragon Shrine → Throne" },
  ];

  builds.push({
    id,
    name: titleLine,
    description: (section.match(/^[^\n#].+/)?.[0] ?? descMatch?.[1] ?? titleLine).slice(0, 200),
    startingClass,
    baseStats: CLASS_BASE[startingClass],
    phaseTargets,
    phasePriority,
    phaseInfo,
    weapons: weaponRows.map((r) => ({
      name: r[0],
      role: r[1] ?? "",
      phase: 3,
      infusion: r[2],
      stats: r[3] ?? "",
    })),
    spells: spellRows.map((r) => ({ name: r[0], school: r[1] ?? "", purpose: r[2] ?? "" })),
    keyRings: ringRows.map((r) => ({ name: r[0], effect: r[1] ?? "", source: r[2] ?? "" })),
    buildSteps: parseChecklist(section),
    levels: generateLevels(startingClass, phaseTargets, phasePriority),
  });
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(builds, null, 2));
console.log(`Wrote ${builds.length} builds to ${outPath}`);
