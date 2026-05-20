import type { EnemyAbsorption } from "../data/enemies";

const WEAK_PCT = -30;
const RESIST_PCT = 25;

function norm(s: string): string {
  return s.toLowerCase().replace(/[^a-z]/g, "");
}

function pickElement(token: string): keyof EnemyAbsorption | null {
  const t = norm(token);
  if (t.includes("fire")) return "fire";
  if (t.includes("lightning")) return "lightning";
  if (t.includes("magic")) return "magic";
  if (t.includes("dark")) return "dark";
  if (t.includes("strike")) return "strike";
  if (t.includes("slash")) return "slash";
  if (t.includes("thrust")) return "thrust";
  if (t.includes("bleed")) return null;
  if (t.includes("poison") || t.includes("toxic")) return null;
  if (t.includes("parry") || t.includes("backstab")) return null;
  if (t.includes("physical")) return "strike";
  return null;
}

/** Infer numeric absorption from textual weakness/resistance lists (6D). */
export function inferAbsorption(
  weaknesses: string[],
  resistances: string[]
): EnemyAbsorption | undefined {
  const abs: EnemyAbsorption = {};

  for (const w of weaknesses) {
    for (const part of w.split(/[,/]/)) {
      const key = pickElement(part.trim());
      if (key) abs[key] = Math.min(abs[key] ?? 0, WEAK_PCT);
    }
  }

  for (const r of resistances) {
    for (const part of r.split(/[,/]/)) {
      const key = pickElement(part.trim());
      if (key) abs[key] = Math.max(abs[key] ?? 0, RESIST_PCT);
    }
  }

  return Object.keys(abs).length > 0 ? abs : undefined;
}
