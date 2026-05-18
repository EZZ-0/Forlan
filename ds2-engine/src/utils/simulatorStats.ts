/**
 * DS2 Build Simulator — Orchestrate all formulas into ComputedStats.
 */

import type { SimulatorState, ComputedStats, SlotId } from "../data/simulator/types";
import { getItemById } from "../data/simulator/items";
import {
  computeHP,
  computeStamina,
  computeEquipLoad,
  getRollType,
} from "../data/simulator/formulas/stats";
import {
  computeAgilityInvestment,
  investmentToDisplayAGI,
  getRollIframes,
  getBackstepIframes,
  getItemUseSpeedMultiplier,
} from "../data/simulator/formulas/agility";
import { computePoise } from "../data/simulator/formulas/poise";
import { computeResistances } from "../data/simulator/formulas/resistances";
import { computeWeaponAR } from "../data/simulator/formulas/damage";
import { WEAPON_SLOTS } from "../data/simulator/slots";

export function computeSimulatorStats(state: SimulatorState): ComputedStats {
  const { stats, equipped, weaponUpgrade, weaponInfusion } = state;

  const vgr = stats.VGR ?? 0;
  const end = stats.END ?? 0;
  const vit = stats.VIT ?? 0;
  const adp = stats.ADP ?? 0;
  const atn = stats.ATN ?? 0;

  const hp = computeHP(vgr);
  const stamina = computeStamina(end);
  const maxEquipLoad = computeEquipLoad(vit);

  let totalWeight = 0;
  for (const itemId of Object.values(equipped)) {
    if (itemId) {
      const item = getItemById(itemId);
      if (item) totalWeight += item.weight;
    }
  }

  const equipLoadPct = maxEquipLoad > 0 ? (totalWeight / maxEquipLoad) * 100 : 0;
  const rollType = getRollType(equipLoadPct);

  const agilityInvestment = computeAgilityInvestment(adp, atn);
  const agility = investmentToDisplayAGI(agilityInvestment);
  const rollIframes = getRollIframes(agilityInvestment);
  const backstepIframes = getBackstepIframes(agilityInvestment);
  const itemUseSpeed = getItemUseSpeedMultiplier(agility);

  const armorResistances: Partial<Record<"physical" | "magic" | "fire" | "lightning" | "dark", number>>[] = [];
  const armorPoise: (number | undefined)[] = [];
  for (const slot of ["helm", "chest", "gloves", "legs"] as const) {
    const itemId = equipped[slot];
    if (itemId) {
      const item = getItemById(itemId);
      if (item && item.type === "armor") {
        armorResistances.push(item.resistances);
        armorPoise.push(item.poise);
      }
    }
  }
  const poise = computePoise(armorPoise);
  const resistances = computeResistances(armorResistances);

  const weaponAR: Partial<Record<SlotId, { physical: number; magic?: number; fire?: number; lightning?: number; dark?: number } | null>> = {};
  const statMap = {
    str: stats.STR ?? 0,
    dex: stats.DEX ?? 0,
    int: stats.INT ?? 0,
    fth: stats.FTH ?? 0,
  };
  for (const slot of WEAPON_SLOTS) {
    const itemId = equipped[slot];
    if (itemId) {
      const item = getItemById(itemId);
      if (item?.type === "weapon") {
        const upg = weaponUpgrade[slot] ?? 0;
        const inf = weaponInfusion?.[slot] ?? null;
        weaponAR[slot] = computeWeaponAR(item, statMap, upg, inf);
      } else {
        weaponAR[slot] = null;
      }
    } else {
      weaponAR[slot] = null;
    }
  }

  return {
    hp,
    stamina,
    equipLoad: maxEquipLoad,
    equipLoadPct,
    rollType,
    agility,
    agilityInvestment,
    rollIframes,
    backstepIframes,
    itemUseSpeed,
    poise,
    resistances: {
      physical: resistances.physical,
      magic: resistances.magic,
      fire: resistances.fire,
      lightning: resistances.lightning,
      dark: resistances.dark,
    },
    weaponAR,
  };
}
