/**
 * Go-back rules — when you've collected an item in a later area,
 * prompt to return to a previous area to complete an action.
 * Used by Overview tab alerts.
 */

import type { AreaId } from "./areas";

export interface GoBackRule {
  triggerIds: string[];
  actionId: string;
  message: string;
  actionArea: AreaId;
}

export const GO_BACK_RULES: GoBackRule[] = [
  {
    triggerIds: ["lb2"],
    actionId: "lb7",
    message: "Give Dull Ember to McDuff — unlocks infusion",
    actionArea: "lost_bastille",
  },
  {
    triggerIds: ["fg5", "fg11"],
    actionId: "fg12",
    message: "Return to Majula — upgrade Estus, open Lenigrast's shop, get Short Bow",
    actionArea: "majula",
  },
  {
    triggerIds: ["uc6"],
    actionId: "uc8",
    message: "Return to Agdayne with King's Ring — Darkdrift + Agdayne's Set",
    actionArea: "undead_crypt",
  },
  {
    triggerIds: ["sw7"],
    actionId: "sw8",
    message: "Return to Tark (Ring of Whispers on) — Second Dragon Ring + Branch",
    actionArea: "shaded_woods",
  },
];
