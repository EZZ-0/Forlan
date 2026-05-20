/**
 * Propose progressTier / ngCycle / category for areas.ts rows (Wave 4 tooling).
 * Run: node scripts/inferAreaTags.mjs > tags-proposed.csv
 */
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = readFileSync(join(root, "src/data/areas.ts"), "utf8");

const itemRe = /item\("([^"]+)",\s*"([^"]+)",\s*"([^"]+)"/g;
let m;
console.log("id,text,type,suggestedTier,suggestedCategory");
while ((m = itemRe.exec(src)) !== null) {
  const [, id, text, type] = m;
  let tier = "collectible";
  if (type === "warn") tier = "optional";
  else if (type === "boss" || type === "bonfire" || type === "key" || type === "npc") tier = "route";
  else if (/optional/i.test(text)) tier = "optional";
  else if (/shard|titanite|coin|herb|ring|soul of/i.test(text)) tier = "collectible";
  const category = type === "item" ? "loot" : type;
  console.log(`"${id}","${text.replace(/"/g, '""')}","${type}","${tier}","${category}"`);
}
