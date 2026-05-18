/**
 * DS2 Build Simulator — Slot definitions and validation rules.
 * Full DS2 equipment slots: R1, R2, L1, L2, Helm, Chest, Gloves, Legs, Ring 1-4.
 */

import type { SlotId, SimulatorItem } from "./types";

export interface SlotConfig {
  accepts: string[];
  label: string;
}

export const SLOT_CONFIG: Record<SlotId, SlotConfig> = {
  r1: { accepts: ["weapon", "catalyst"], label: "Right Hand 1" },
  r2: { accepts: ["weapon", "catalyst"], label: "Right Hand 2" },
  l1: { accepts: ["weapon", "shield", "catalyst"], label: "Left Hand 1" },
  l2: { accepts: ["weapon", "shield", "catalyst"], label: "Left Hand 2" },
  helm: { accepts: ["armor"], label: "Head" },
  chest: { accepts: ["armor"], label: "Chest" },
  gloves: { accepts: ["armor"], label: "Hands" },
  legs: { accepts: ["armor"], label: "Legs" },
  ring1: { accepts: ["ring"], label: "Ring 1" },
  ring2: { accepts: ["ring"], label: "Ring 2" },
  ring3: { accepts: ["ring"], label: "Ring 3" },
  ring4: { accepts: ["ring"], label: "Ring 4" },
};

/** Weapon slots (R1, R2, L1, L2) */
export const WEAPON_SLOTS: SlotId[] = ["r1", "r2", "l1", "l2"];

/** Armor slots */
export const ARMOR_SLOTS: SlotId[] = ["helm", "chest", "gloves", "legs"];

/** Ring slots */
export const RING_SLOTS: SlotId[] = ["ring1", "ring2", "ring3", "ring4"];

/**
 * Get the item type for simulator items.
 */
function getItemType(item: SimulatorItem): string {
  switch (item.type) {
    case "weapon":
      return "weapon";
    case "armor":
      return "armor";
    case "ring":
      return "ring";
    case "shield":
      return "shield";
    case "catalyst":
      return "catalyst";
    case "spell":
      return "spell";
    default:
      return "unknown";
  }
}

/**
 * Check if an item can be equipped in a given slot.
 */
export function canEquipInSlot(item: SimulatorItem, slotId: SlotId): boolean {
  const config = SLOT_CONFIG[slotId];
  const itemType = getItemType(item);

  if (itemType === "spell") {
    return false;
  }

  if (itemType === "armor") {
    if (!("slot" in item)) return false;
    const armorSlotMap: Record<string, SlotId> = {
      helm: "helm",
      chest: "chest",
      gloves: "gloves",
      legs: "legs",
    };
    return armorSlotMap[item.slot] === slotId;
  }

  return config.accepts.includes(itemType);
}
