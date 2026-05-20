import { GESTURES } from "../data/gestures";
import { COVENANTS } from "../data/covenants";

/** Collection dex progress — separate from area walkthrough %. */
export function computeCollectionProgress(checked: Record<string, boolean>): {
  gestures: { done: number; total: number; pct: number };
  covenants: { done: number; total: number; pct: number };
} {
  const gestureIds = GESTURES.map((g) => g.ref).filter((r): r is string => r != null);
  const covenantIds = COVENANTS.map((c) => c.ref);

  const count = (ids: string[]) => {
    const done = ids.filter((id) => checked[id]).length;
    const total = ids.length;
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
  };

  return {
    gestures: count(gestureIds),
    covenants: count(covenantIds),
  };
}
