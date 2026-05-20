/** Canonical engine progress export (CHK-08). */
export const PROGRESS_EXPORT_VERSION = 1;

export interface EngineProgressExport {
  version: number;
  exportedAt: string;
  buildTemplateId?: string;
  checked: Record<string, boolean>;
  buildProgress?: Record<string, { levels: Record<number, boolean> }>;
}

export interface ImportPreview {
  checkedCount: number;
  newChecked: number;
  cleared: number;
}
