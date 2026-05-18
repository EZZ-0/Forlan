/**
 * Import weapons from Fextralife Weapons Sortable table.
 * Reads fetched HTML content and outputs weaponsFull.ts
 * Run: node scripts/importWeapons.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Path to fetched content (or use inline)
const fetchedPath = join(
  __dirname,
  "../.cursor/projects/c-Users-cidma-OneDrive-Desktop-DS2-guide/agent-tools/f7f52b4e-cec0-4e5b-a27f-44084878f332.txt"
);

let content;
try {
  content = readFileSync(
    join(__dirname, "../../.cursor/projects/c-Users-cidma-OneDrive-Desktop-DS2-guide/agent-tools/f7f52b4e-cec0-4e5b-a27f-44084878f332.txt"),
    "utf8"
  );
} catch {
  // Fallback: use process.cwd relative
  content = readFileSync(
    join(process.cwd(), ".cursor/projects/c-Users-cidma-OneDrive-Desktop-DS2-guide/agent-tools/f7f52b4e-cec0-4e5b-a27f-44084878f332.txt"),
    "utf8"
  ).catch(() => "");
}

if (!content) {
  console.error("Could not read Fextralife content. Run fetch first.");
  process.exit(1);
}

function toId(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9_]/g, "");
}

const WEAPON_TYPE_MAP = {
  "Great Hammers": "Great Hammer",
  "Great Hammer": "Great Hammer",
  "Greataxes": "Great Axe",
  "Greataxe": "Great Axe",
  "Greataxes": "Great Axe",
  "Ultra Greatswords": "Ultra Greatsword",
  "Ultra Greatsword": "Ultra Greatsword",
  "Curved Greatswords": "Curved Greatsword",
  "Curved Greatsword": "Curved Greatsword",
  "Halberds": "Halberd",
  "Halberd": "Halberd",
  "Halberds": "Halberd",
  "Greatswords": "Greatsword",
  "Greatsword": "Greatsword",
  "Axes": "Axe",
  "Axe": "Axe",
  "Lances": "Lance",
  "Lance": "Lance",
  "Hammers": "Hammer",
  "Hammer": "Hammer",
  "Thrusting Swords": "Piercing Sword",
  "Piercing Swords": "Piercing Sword",
  "Twinblades": "Twinblade",
  "Twinblade": "Twinblade",
  "Whips": "Whip",
  "Whip": "Whip",
  "Crossbows": "Crossbow",
  "Crossbow": "Crossbow",
  "Greatbows": "Greatbow",
  "Greatbow": "Greatbow",
  "Reapers": "Reaper",
  "Reaper": "Reaper",
  "Repear": "Reaper",
  "Spears": "Spear",
  "Spear": "Spears",
  "Katanas": "Katana",
  "Katana": "Katana",
  "Curved Swords": "Curved Sword",
  "Curved Sword": "Curved Swords",
  "Straight Swords": "Straight Sword",
  "Straight Sword": "Straight Swords",
  "Daggers": "Dagger",
  "Dagger": "Daggers",
  "Claw": "Fist & Claws",
  "Claws": "Fist & Claws",
  "Fist": "Fist & Claws",
  "Fist Weapons": "Fist & Claws",
  "Bows": "Bow",
  "Bow": "Bows",
  "Staves": "Staff",
  "Staff": "Staves",
  "Staf": "Staff",
  "Sacred Chime": "Chime",
  "Chimes": "Chime",
  "Pyromancy Flame": "Flame",
  "Flames": "Flame",
};

const rows = content.split("\n").filter((line) => line.startsWith("| [") && line.includes("](https://darksouls2.wiki.fextralife.com/"));
const weapons = [];
const seen = new Set();

for (const row of rows) {
  const nameMatch = row.match(/\|\s*\[([^\]]+)\]\([^)]+\)/);
  if (!nameMatch) continue;
  const name = nameMatch[1].replace(/\+/g, " + ").trim();
  const id = toId(name);
  if (seen.has(id)) continue;
  seen.add(id);

  const cells = row.split("|").map((c) => c.trim()).filter(Boolean);
  if (cells.length < 3) continue;

  const rest = row.slice(nameMatch[0].length);
  const parts = rest.split("|").map((p) => p.trim()).filter(Boolean);

  let phy = 0,
    mag = 0,
    fir = 0,
    lit = 0,
    drk = 0;
  const scaling = {};
  const reqs = {};
  let weight = 0,
    durability = 0;
  let weaponType = "Weapon";
  let damageType = "Slash";
  let specialEffect = "";

  const scaleLetters = ["A", "B", "C", "D", "E", "S"];
  const scaleKeys = ["str", "dex", "int", "fth"];
  let idx = 0;
  const nums = [];
  const letters = [];
  for (const p of parts) {
    const n = parseInt(p, 10);
    if (!isNaN(n) && n < 1000) nums.push(n);
    else if (scaleLetters.includes(p)) letters.push(p);
  }

  const wtMatch = row.match(/\[(Great Hammer|Greataxe|Ultra Greatsword|Halberd|Greatsword|Axe|Hammer|Lance|Twinblade|Whip|Crossbow|Greatbow|Reaper|Spear|Katana|Curved Sword|Straight Sword|Dagger|Claw|Fist|Bow|Staff|Chime|Flame)s?\]/i);
  if (wtMatch) {
    const wt = wtMatch[1];
    weaponType = WEAPON_TYPE_MAP[wt] || wt;
  }

  const dtMatch = row.match(/\|\s*(Strike|Slash|Thrust|Slash\/Thrust|Slash\/ ?Thrust|Thrust\/Strike|Projectile\s*\/Strike|Spell\/Strike|Spell\/ ?Strike)\s*\|/);
  if (dtMatch) damageType = dtMatch[1].replace(/\s+/g, " ");

  if (nums.length >= 1) phy = nums[0];
  if (nums.length >= 2 && nums[1] < 200) mag = nums[1];
  if (nums.length >= 3 && nums[2] < 200) fir = nums[2];
  if (nums.length >= 4 && nums[3] < 200) lit = nums[3];
  if (nums.length >= 5 && nums[4] < 200) drk = nums[4];

  const lastNums = nums.slice(-4);
  if (lastNums.length >= 1) weight = lastNums[0] < 50 ? lastNums[0] : weight;
  if (lastNums.length >= 2) durability = lastNums[1] > 50 ? lastNums[1] : lastNums[0];

  if (letters.length >= 1) scaling.str = letters[0];
  if (letters.length >= 2) scaling.dex = letters[1];
  if (letters.length >= 3) scaling.int = letters[2];
  if (letters.length >= 4) scaling.fth = letters[3];

  const reqNums = nums.filter((n) => n >= 1 && n <= 99 && n !== phy && n !== mag && n !== fir && n !== lit && n !== drk);
  if (reqNums.length >= 1) reqs.str = reqNums[0];
  if (reqNums.length >= 2) reqs.dex = reqNums[1];
  if (reqNums.length >= 3) reqs.int = reqNums[2];
  if (reqNums.length >= 4) reqs.fth = reqNums[3];

  const damage = {};
  if (phy) damage.physical = phy;
  if (mag) damage.magic = mag;
  if (fir) damage.fire = fir;
  if (lit) damage.lightning = lit;
  if (drk) damage.dark = drk;

  const extrasMatch = row.match(/\|\s*(Yes|No)\s*\|([^|]*)$/);
  if (extrasMatch && extrasMatch[2]) specialEffect = extrasMatch[2].trim();

  weapons.push({
    id,
    name,
    weaponType,
    damage,
    scaling,
    reqs,
    weight: weight || 5,
    durability: durability || 60,
    damageType,
    specialEffect,
  });
}

const out = `/**
 * DS2 SotFS — Full weapons stats from Fextralife Weapons Sortable.
 * Source: https://darksouls2.wiki.fextralife.com/Weapons+Sortable
 * Merges with fullList; weapons.ts overrides for location/guidance.
 */

import type { ItemDatabaseEntry } from "../types";

function toId(name: string): string {
  return name
    .toLowerCase()
    .replace(/\\s+/g, "_")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9_]/g, "");
}

export const DB_WEAPONS_FULL: ItemDatabaseEntry[] = [
${weapons
  .map(
    (w) => `  {
    id: "${w.id}",
    name: "${w.name.replace(/"/g, '\\"')}",
    category: "weapon",
    subcategory: { weaponClass: "${w.weaponType}" },
    weight: ${w.weight},
    stats: {
      ${Object.keys(w.reqs).length ? `requirements: { ${Object.entries(w.reqs).map(([k, v]) => `${k}: ${v}`).join(", ")} },` : ""}
      ${Object.keys(w.damage).length ? `damage: { ${Object.entries(w.damage).map(([k, v]) => `${k}: ${v}`).join(", ")} },` : ""}
      ${Object.keys(w.scaling).length ? `scaling: { ${Object.entries(w.scaling).map(([k, v]) => `${k}: "${v}"`).join(", ")} }` : ""}
    },
    ${w.durability ? `durability: ${w.durability},` : ""}
    ${w.specialEffect ? `description: "${w.specialEffect.replace(/"/g, '\\"').slice(0, 80)}...",` : ""}
    source: "fextralife",
    sourceUrl: "https://darksouls2.wiki.fextralife.com/Weapons+Sortable",
  }`
  )
  .join(",\n")}
];
`;

const outPath = join(__dirname, "../src/data/itemsDatabase/items/weaponsFull.ts");
writeFileSync(outPath, out);
console.log(`Wrote ${weapons.length} weapons to ${outPath}`);
