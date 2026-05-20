import { useRef, useState } from "react";
import { colors, typography } from "../theme";
import { Button } from "./Button";
import { parseEngineExport } from "../import/parseEngineExport";
import { parsePlasticmacaroni } from "../import/parsePlasticmacaroni";
import type { ProgressState } from "../types";

export function ProgressImportCard({
  onExport,
  onImport,
  lastExport,
}: {
  onExport: () => void;
  onImport: (state: ProgressState) => void;
  lastExport?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const sheetRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [sheetNote, setSheetNote] = useState<string | null>(null);
  const [pending, setPending] = useState<ProgressState | null>(null);

  const applySheetResult = (checked: Record<string, boolean>) => {
    setPending({
      checked,
      buildProgress: {},
    });
  };

  const handleJsonFile = (file: File) => {
    setError(null);
    setSheetNote(null);
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = reader.result as string;
        const parsed = JSON.parse(text) as unknown;
        const sheet = parsePlasticmacaroni(text, "json");
        if (sheet && sheet.mappedCount > 0) {
          applySheetResult(sheet.checked);
          setSheetNote(
            `Community sheet: ${sheet.mappedCount} items mapped` +
              (sheet.unmappedColumns.length ? ` (${sheet.unmappedColumns.length} unmapped columns)` : "")
          );
          return;
        }
        const state = parseEngineExport(parsed);
        if (!state) {
          setError("Unrecognized JSON. Use engine export or a sheet export with progressId columns.");
          return;
        }
        setPending(state);
      } catch {
        setError("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const handleCsvFile = (file: File) => {
    setError(null);
    setSheetNote(null);
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      const sheet = parsePlasticmacaroni(text, "csv");
      if (!sheet || sheet.mappedCount === 0) {
        setError(
          "Could not map CSV columns. Use progressId headers (e.g. fg17) or Item labels matching the engine checklist."
        );
        return;
      }
      applySheetResult(sheet.checked);
      setSheetNote(
        `Sheet import: ${sheet.mappedCount} checkboxes` +
          (sheet.unmappedColumns.length
            ? `. Unmapped: ${sheet.unmappedColumns.slice(0, 5).join(", ")}${sheet.unmappedColumns.length > 5 ? "…" : ""}`
            : "")
      );
    };
    reader.readAsText(file);
  };

  return (
    <div
      style={{
        padding: 14,
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        borderRadius: 12,
      }}
    >
      <div style={{ fontFamily: typography.fontHeading, fontSize: 12, color: colors.gold, marginBottom: 8 }}>
        PROGRESS
      </div>
      <p style={{ fontSize: 11, color: colors.dimText, lineHeight: 1.5, margin: "0 0 10px" }}>
        Walkthrough checklist lives in Areas; collection (gestures, covenants) in Trackers. Export keeps both in one
        file. Import community CSV/JSON sheets when columns use engine progressIds or checklist labels.
      </p>
      {lastExport && (
        <p style={{ fontSize: 10, color: colors.dimText, marginBottom: 8 }}>
          Last export: {new Date(lastExport).toLocaleString()}
        </p>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <Button variant="secondary" onClick={onExport}>
          Export JSON
        </Button>
        <Button variant="secondary" onClick={() => fileRef.current?.click()}>
          Import JSON
        </Button>
        <Button variant="secondary" onClick={() => sheetRef.current?.click()}>
          Import sheet (CSV)
        </Button>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept=".json,application/json"
        style={{ display: "none" }}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleJsonFile(f);
          e.target.value = "";
        }}
      />
      <input
        ref={sheetRef}
        type="file"
        accept=".csv,text/csv"
        style={{ display: "none" }}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleCsvFile(f);
          e.target.value = "";
        }}
      />
      {sheetNote && <p style={{ fontSize: 11, color: colors.gold, marginTop: 8 }}>{sheetNote}</p>}
      {error && <p style={{ fontSize: 11, color: colors.warnRed, marginTop: 8 }}>{error}</p>}
      {pending && (
        <div
          style={{
            marginTop: 10,
            padding: 10,
            background: "rgba(200,160,48,0.08)",
            border: `1px solid ${colors.gold}44`,
            borderRadius: 8,
          }}
        >
          <p style={{ fontSize: 11, color: colors.lightText, margin: "0 0 8px" }}>
            Import {Object.keys(pending.checked).filter((k) => pending.checked[k]).length} checked items? This merges
            into your current progress on confirm (replaces checked map).
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            <Button
              onClick={() => {
                onImport(pending);
                setPending(null);
                setSheetNote(null);
              }}
            >
              Confirm import
            </Button>
            <Button variant="secondary" onClick={() => setPending(null)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
