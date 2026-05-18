import type { StatKey } from "../simulator/types";
import type { LevelEntry } from "../build";
import type { BuildStep } from "../buildChecklist";
import type { BuildItem, BuildItemSource, BuildItemFarm } from "../buildItems";

export type StartingClass =
  | "sorcerer"
  | "knight"
  | "cleric"
  | "warrior"
  | "swordsman"
  | "bandit"
  | "explorer"
  | "deprived";

export interface BuildTemplate {
  id: string;
  name: string;
  description: string;
  source?: string;
  startingClass: StartingClass;
  baseStats: Record<StatKey, number>;
  levels: LevelEntry[];
  phaseInfo: { num: number; name: string; range: string; color: string; areas: string }[];
  phaseTargets: Record<number, Record<string, number>>;
  phasePriority: Record<number, string[]>;
  weapons: { name: string; role: string; phase: number; infusion?: string; stats: string }[];
  spells: { name: string; school: string; purpose: string }[];
  keyRings: { name: string; effect: string; source: string }[];
  /** Optional detailed Rings sub-box: priority order, groups (Core/Optional), and full how/where to get each. */
  ringsDetail?: {
    priorityOrder: string[];
    groups: { label: string; ringNames: string[] }[];
    rings: Array<{
      name: string;
      priority: "core" | "optional";
      effect: string;
      whereToGet: string;
      howToGet: string;
      phase?: number;
    }>;
  };
  buildSteps: BuildStep[];
  buildItems: BuildItem[];
  /** Per-build material farms (Fire Seeds, Titanite, etc.). Falls back to shared BUILD_MATERIAL_FARMS when absent. */
  buildMaterialFarms?: { item: string; purpose: string; sources: BuildItemSource[]; farmOptions: BuildItemFarm[] }[];
}

/** Base stats per starting class (Fextralife wiki). VGR, END, VIT, ATN, STR, DEX, ADP, INT, FTH */
export const CLASS_BASE_STATS: Record<StartingClass, Record<StatKey, number>> = {
  warrior: { VGR: 7, END: 6, VIT: 6, ATN: 5, STR: 15, DEX: 11, ADP: 5, INT: 5, FTH: 5 },
  knight: { VGR: 12, END: 6, VIT: 7, ATN: 9, STR: 11, DEX: 8, ADP: 3, INT: 6, FTH: 4 },
  swordsman: { VGR: 4, END: 8, VIT: 4, ATN: 6, STR: 9, DEX: 16, ADP: 7, INT: 5, FTH: 6 },
  bandit: { VGR: 9, END: 7, VIT: 11, ATN: 3, STR: 9, DEX: 14, ADP: 1, INT: 8, FTH: 2 },
  cleric: { VGR: 10, END: 3, VIT: 8, ATN: 4, STR: 11, DEX: 5, ADP: 4, INT: 12, FTH: 10 },
  sorcerer: { VGR: 5, END: 6, VIT: 5, ATN: 8, STR: 3, DEX: 7, ADP: 14, INT: 4, FTH: 12 },
  explorer: { VGR: 7, END: 6, VIT: 9, ATN: 12, STR: 6, DEX: 6, ADP: 5, INT: 5, FTH: 7 },
  deprived: { VGR: 6, END: 6, VIT: 6, ATN: 6, STR: 6, DEX: 6, ADP: 6, INT: 6, FTH: 6 },
};
