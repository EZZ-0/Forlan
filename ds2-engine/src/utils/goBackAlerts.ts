/**
 * Go-back alerts — computes which "return to area" prompts to show
 * based on checked state and GO_BACK_RULES.
 */

import { GO_BACK_RULES } from "../data/goBackRules";
import type { AreaId } from "../data/areas";

export interface GoBackAlert {
  message: string;
  actionArea: AreaId;
  actionId: string;
}

export function getGoBackAlerts(
  checked: Record<string, boolean>
): GoBackAlert[] {
  const alerts: GoBackAlert[] = [];

  for (const rule of GO_BACK_RULES) {
    const allTriggersChecked = rule.triggerIds.every((id) => checked[id]);
    const actionNotDone = !checked[rule.actionId];

    if (allTriggersChecked && actionNotDone) {
      alerts.push({
        message: rule.message,
        actionArea: rule.actionArea,
        actionId: rule.actionId,
      });
    }
  }

  return alerts;
}
