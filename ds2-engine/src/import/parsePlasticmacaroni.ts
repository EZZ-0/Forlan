/**
 * Community sheet import (CHK-09) — CSV/JSON with progressId columns or label matching.
 */
import {
  PROGRESS_ID_RE,
  allKnownProgressIds,
  buildChecklistLabelIndex,
  resolveAreaSlug,
} from "./plasticmacaroniMap";

export interface SheetImportResult {
  checked: Record<string, boolean>;
  unmappedColumns: string[];
  mappedCount: number;
}

const CHECKED_VALUES = new Set(["x", "1", "true", "yes", "done", "✓", "✔"]);

function parseCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else inQuotes = !inQuotes;
    } else if ((ch === "," || ch === ";") && !inQuotes) {
      out.push(cur.trim());
      cur = "";
    } else cur += ch;
  }
  out.push(cur.trim());
  return out;
}

function isChecked(cell: string): boolean {
  return CHECKED_VALUES.has(cell.trim().toLowerCase());
}

function parseCsv(raw: string): SheetImportResult | null {
  const lines = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length < 2) return null;

  const header = parseCsvLine(lines[0]);
  const labelIndex = buildChecklistLabelIndex();
  const knownIds = allKnownProgressIds();
  const checked: Record<string, boolean> = {};
  const unmapped: string[] = [];

  const colToId: (string | null)[] = header.map((h) => {
    const key = h.trim();
    const lower = key.toLowerCase();
    if (PROGRESS_ID_RE.test(lower) && knownIds.has(lower)) return lower;
    if (knownIds.has(lower)) return lower;
    const fromLabel = labelIndex.get(lower.replace(/['']/g, ""));
    if (fromLabel) return fromLabel;
    return null;
  });

  header.forEach((h, i) => {
    if (colToId[i] === null && h.trim()) unmapped.push(h.trim());
  });

  const areaCol = header.findIndex((h) => /area|location|zone/i.test(h));
  const labelCol = header.findIndex((h) => /item|task|check|label|name/i.test(h));

  for (let r = 1; r < lines.length; r++) {
    const cells = parseCsvLine(lines[r]);
    if (cells.every((c) => !c)) continue;

    let rowId: string | null = null;
    if (labelCol >= 0 && cells[labelCol]) {
      rowId = labelIndex.get(cells[labelCol].toLowerCase().replace(/['']/g, "")) ?? null;
    }

    for (let c = 0; c < cells.length; c++) {
      const id = colToId[c];
      if (id && isChecked(cells[c])) checked[id] = true;
    }

    if (rowId && cells.some(isChecked)) checked[rowId] = true;

    if (areaCol >= 0 && labelCol >= 0 && !rowId) {
      const area = resolveAreaSlug(cells[areaCol] ?? "");
      const label = cells[labelCol];
      if (area && label) {
        const id = labelIndex.get(label.toLowerCase().replace(/['']/g, ""));
        if (id && cells.some(isChecked)) checked[id] = true;
      }
    }
  }

  const mappedCount = Object.keys(checked).length;
  if (mappedCount === 0 && unmapped.length === header.length) return null;

  return { checked, unmappedColumns: [...new Set(unmapped)], mappedCount };
}

function parseJson(raw: string): SheetImportResult | null {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!data || typeof data !== "object") return null;

  const checked: Record<string, boolean> = {};
  const knownIds = allKnownProgressIds();

  const ingest = (id: string, val: unknown) => {
    if (!knownIds.has(id)) return;
    if (val === true || val === 1 || val === "x" || val === "done") checked[id] = true;
  };

  if (Array.isArray(data)) {
    for (const row of data) {
      if (row && typeof row === "object") {
        const o = row as Record<string, unknown>;
        const id = String(o.id ?? o.progressId ?? "");
        if (id) ingest(id, o.checked ?? o.done ?? true);
      }
    }
  } else {
    const o = data as Record<string, unknown>;
    if (o.checked && typeof o.checked === "object") {
      for (const [id, val] of Object.entries(o.checked as Record<string, unknown>)) {
        if (val) checked[id] = true;
      }
    } else {
      for (const [id, val] of Object.entries(o)) ingest(id, val);
    }
  }

  if (Object.keys(checked).length === 0) return null;
  return { checked, unmappedColumns: [], mappedCount: Object.keys(checked).length };
}

/** Parse exported CSV/JSON from plasticmacaroni-style checklist. */
export function parsePlasticmacaroni(raw: string, format: "csv" | "json"): SheetImportResult | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (format === "json") return parseJson(trimmed);
  return parseCsv(trimmed);
}
