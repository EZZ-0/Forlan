import { useEffect, useCallback } from "react";
import { AREA_ORDER } from "../data/areas";
import type { AreaId } from "../data/areas";

const VIEWS = [
  "dashboard",
  "area",
  "quests",
  "trackers",
  "build",
  "farm",
  "items",
  "enemies",
  "simulator",
  "getop",
  "worldmap",
  "timer",
] as const;
export type View = (typeof VIEWS)[number];

function isTypingElement(el: EventTarget | null): boolean {
  if (!el || !(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  const role = el.getAttribute?.("role");
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    (el as HTMLElement).isContentEditable ||
    role === "textbox" ||
    role === "searchbox"
  );
}

export interface KeyboardHandlers {
  setView: (v: View) => void;
  setSelectedArea: (a: AreaId | null) => void;
  setSelectedQuest: (q: string | null) => void;
  setShowReset: (v: boolean) => void;
  setFocusMode?: (v: boolean | ((p: boolean) => boolean)) => void;
  setAreaFocusMode?: (v: boolean | ((p: boolean) => boolean)) => void;
  exportProgress: () => void;
  view: View;
  selectedArea: AreaId | null;
  selectedQuest: string | null;
  questKeys: string[];
  showReset: boolean;
}

export function useKeyboard(handlers: KeyboardHandlers) {
  const {
    setView,
    setSelectedArea,
    setSelectedQuest,
    setShowReset,
    setFocusMode,
    setAreaFocusMode,
    exportProgress,
    view,
    selectedArea,
    selectedQuest,
    questKeys,
    showReset,
  } = handlers;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isTypingElement(e.target)) return;

      // Escape — close modals
      if (e.key === "Escape") {
        if (showReset) {
          setShowReset(false);
          e.preventDefault();
        }
        return;
      }

      // 1–9 — switch tabs (0 = Overview, 9 = Get OP)
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 9) {
        setView(VIEWS[num - 1]);
        e.preventDefault();
        return;
      }

      // Arrow Left / Right or j / k — prev/next area; f — focus mode (when in Areas view)
      if (view === "area") {
        const current = selectedArea ?? AREA_ORDER[0];
        const idx = AREA_ORDER.indexOf(current);
        if (e.key === "ArrowLeft" || e.key === "j") {
          if (idx > 0) {
            setSelectedArea(AREA_ORDER[idx - 1]);
            e.preventDefault();
          }
        } else if (e.key === "ArrowRight" || e.key === "k") {
          if (idx >= 0 && idx < AREA_ORDER.length - 1) {
            setSelectedArea(AREA_ORDER[idx + 1]);
            e.preventDefault();
          }
        } else if (e.key === "f" && setAreaFocusMode) {
          setAreaFocusMode((p) => !p);
          e.preventDefault();
        }
        return;
      }

      // j / k — prev/next quest (when in Quests view)
      if (view === "quests" && questKeys.length > 0) {
        const current = selectedQuest ?? questKeys[0];
        const idx = questKeys.indexOf(current);
        if (e.key === "j" || e.key === "ArrowLeft") {
          if (idx > 0) {
            setSelectedQuest(questKeys[idx - 1]);
            e.preventDefault();
          }
        } else if (e.key === "k" || e.key === "ArrowRight") {
          if (idx >= 0 && idx < questKeys.length - 1) {
            setSelectedQuest(questKeys[idx + 1]);
            e.preventDefault();
          }
        }
        return;
      }

      // f — toggle focus mode (when on Overview)
      if (view === "dashboard" && e.key === "f" && setFocusMode) {
        setFocusMode((p) => !p);
        e.preventDefault();
      }

      // Ctrl+E — Export
      if (e.ctrlKey && e.key === "e") {
        exportProgress();
        e.preventDefault();
      }
    },
    [
      showReset,
      view,
      selectedArea,
      selectedQuest,
      questKeys,
      setView,
      setSelectedArea,
      setSelectedQuest,
      setShowReset,
      setFocusMode,
      setAreaFocusMode,
      exportProgress,
    ]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
