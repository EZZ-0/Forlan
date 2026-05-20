import type { EngineProgressExport } from "./types";
import { PROGRESS_EXPORT_VERSION } from "./types";
import type { ProgressState } from "../types";
import { DEFAULT_BUILD_TEMPLATE_ID } from "../data/buildTemplates";

export function parseEngineExport(raw: unknown): ProgressState | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;

  if ("version" in o && typeof o.checked === "object" && o.checked !== null) {
    const exp = o as unknown as EngineProgressExport;
    return {
      checked: { ...(exp.checked as Record<string, boolean>) },
      buildProgress: exp.buildProgress ?? {},
      buildTemplateId: exp.buildTemplateId ?? DEFAULT_BUILD_TEMPLATE_ID,
      lastExport: exp.exportedAt,
    };
  }

  if ("checked" in o && typeof o.checked === "object") {
    return raw as ProgressState;
  }

  return null;
}

export function toEngineExport(state: ProgressState): EngineProgressExport {
  return {
    version: PROGRESS_EXPORT_VERSION,
    exportedAt: new Date().toISOString(),
    buildTemplateId: state.buildTemplateId,
    checked: { ...state.checked },
    buildProgress: state.buildProgress,
  };
}
