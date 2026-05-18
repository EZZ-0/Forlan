/**
 * Shop unlock tracking — canonical database of when items unlock at merchants.
 * Aggregates data from farming.ts, infusionGuide.ts, buildItems.ts, etc.
 */

import type { AreaId } from "./areas";

export type UnlockConditionType =
  | "area" // Reach area (e.g. FoFG, Lost Bastille)
  | "key" // Obtain key (Lenigrast's Key, King's Ring)
  | "spend_souls" // Spend X souls at merchant
  | "stat" // Meet stat requirement (8 INT+8 FTH, 20/20 BASE)
  | "boss" // Defeat boss (Nashandra, etc.)
  | "item" // Give item to merchant (Dull Ember)
  | "progression" // Stock grows with bosses (Chloanne)
  | "unpetrify" // Unpetrify NPC (Straid, Rosabeth)
  | "covenant"; // Covenant rank (Grandahl)

export interface ShopUnlock {
  id: string;
  merchant: string;
  merchantAreaId: AreaId;
  item: string;
  itemCategory?: "weapon" | "material" | "ring" | "spell" | "armor" | "key" | "catalyst" | "other";
  conditionType: UnlockConditionType;
  condition: string;
  detail?: string;
  progressIds?: string[];
  buildRef?: string;
}

export const SHOP_UNLOCKS: ShopUnlock[] = [
  // Melentia (FoFG → Majula)
  {
    id: "su-melentia-1",
    merchant: "Melentia",
    merchantAreaId: "forest_of_fallen_giants",
    item: "Lenigrast's Key, Pharros Lockstone",
    itemCategory: "key",
    conditionType: "area",
    condition: "FoFG (Cardinal Tower)",
    detail: "Key 1,000 souls; Pharros 4,000 souls",
    progressIds: ["fg5"],
  },
  {
    id: "su-melentia-2",
    merchant: "Melentia",
    merchantAreaId: "forest_of_fallen_giants",
    item: "Covetous Silver Serpent Ring +1",
    itemCategory: "ring",
    conditionType: "spend_souls",
    condition: "Spend 10,000 souls",
    detail: "+20% souls. Exhaust dialogue to move her to Majula.",
    progressIds: ["fg6"],
  },
  // Lenigrast (Majula)
  {
    id: "su-lenigrast-1",
    merchant: "Lenigrast",
    merchantAreaId: "majula",
    item: "Shop (Mace, Titanite Shards, upgrades)",
    itemCategory: "weapon",
    conditionType: "key",
    condition: "FoFG + Lenigrast's Key",
    detail: "Buy key from Melentia, return to Majula to open shop",
    progressIds: ["fg5", "fg12"],
    buildRef: "weapon:Lightning Mace",
  },
  // McDuff (Lost Bastille)
  {
    id: "su-mcduff-1",
    merchant: "McDuff",
    merchantAreaId: "lost_bastille",
    item: "Infusion menu",
    itemCategory: "other",
    conditionType: "item",
    condition: "Give Dull Ember",
    detail: "Break explosive wall to reach him. Unlocks all infusions.",
    progressIds: ["lb7"],
    buildRef: "infusion:Dull Ember",
  },
  {
    id: "su-mcduff-2",
    merchant: "McDuff",
    merchantAreaId: "lost_bastille",
    item: "Titanite Slab",
    itemCategory: "material",
    conditionType: "spend_souls",
    condition: "Spend 14,000 souls total",
    detail: "After giving Dull Ember",
    progressIds: ["lb7"],
  },
  {
    id: "su-mcduff-3",
    merchant: "McDuff",
    merchantAreaId: "lost_bastille",
    item: "Large Titanite Shards (unlimited)",
    itemCategory: "material",
    conditionType: "area",
    condition: "Lost Bastille",
    detail: "Buy after reaching McDuff",
  },
  {
    id: "su-mcduff-4",
    merchant: "McDuff",
    merchantAreaId: "lost_bastille",
    item: "Uchigatana, infusion stones (limited)",
    itemCategory: "weapon",
    conditionType: "area",
    condition: "Lost Bastille",
    detail: "Uchigatana 5,000 souls. Firedrake, Raw limited.",
    buildRef: "weapon:Dark Uchigatana",
  },
  // Chloanne (Harvest Valley → Majula)
  {
    id: "su-chloanne-1",
    merchant: "Chloanne",
    merchantAreaId: "harvest_valley",
    item: "Shards, Large Shards, Chunks",
    itemCategory: "material",
    conditionType: "progression",
    condition: "Harvest Valley; stock grows with bosses",
    detail: "Cave after Covetous Demon. Moves to Majula after Earthen Peak.",
  },
  {
    id: "su-chloanne-2",
    merchant: "Chloanne",
    merchantAreaId: "majula",
    item: "Titanite Chunks (unlimited)",
    itemCategory: "material",
    conditionType: "boss",
    condition: "Nashandra defeated",
    detail: "Near monument toward the sea",
  },
  {
    id: "su-chloanne-3",
    merchant: "Chloanne",
    merchantAreaId: "majula",
    item: "Infusion stones (Darknight, Bolt, Faintstone, etc.)",
    itemCategory: "material",
    conditionType: "key",
    condition: "King's Ring",
    detail: "3 stones each, 7,500 souls. Undead Crypt for Firedrake.",
  },
  // Felkin (Huntsman's Copse)
  {
    id: "su-felkin-1",
    merchant: "Felkin",
    merchantAreaId: "huntsmans_copse",
    item: "Hex shop (Dark Orb, Dark Weapon, etc.)",
    itemCategory: "spell",
    conditionType: "stat",
    condition: "8 INT + 8 FTH (base stats; gear doesn't count)",
    detail: "Bridge Approach cave. Must meet stats to talk.",
    progressIds: ["hc3"],
    buildRef: "spell:Dark Orb",
  },
  {
    id: "su-felkin-2",
    merchant: "Felkin",
    merchantAreaId: "huntsmans_copse",
    item: "Sunset Staff, Hexer's Set",
    itemCategory: "catalyst",
    conditionType: "stat",
    condition: "20 INT + 20 FTH BASE stats (no gear)",
    detail: "FREE. Equipment/rings do NOT count.",
    progressIds: ["hc3"],
    buildRef: "catalyst:Sunset Staff",
  },
  // Straid (Lost Bastille)
  {
    id: "su-straid-1",
    merchant: "Straid",
    merchantAreaId: "lost_bastille",
    item: "Boss soul trades",
    itemCategory: "other",
    conditionType: "unpetrify",
    condition: "Unpetrify with Fragrant Branch",
    detail: "Sits in cell. Trades boss souls for weapons/spells.",
  },
  // Targray (Heide's Tower)
  {
    id: "su-targray-1",
    merchant: "Targray",
    merchantAreaId: "heides_tower",
    item: "Bolt Stone (unlimited)",
    itemCategory: "material",
    conditionType: "covenant",
    condition: "Blue Sentinels",
    detail: "7,000 souls each. Join covenant after Old Dragonslayer.",
  },
  // Maughlin (Majula)
  {
    id: "su-maughlin-1",
    merchant: "Maughlin",
    merchantAreaId: "majula",
    item: "Moonlight Butterfly Set",
    itemCategory: "armor",
    conditionType: "spend_souls",
    condition: "Spend 15,000 souls + 2–3 Bonfire Ascetics",
    detail: "Majula bonfire ascetic. Resets area.",
  },
  // Shalquoir (Majula)
  {
    id: "su-shalquoir-1",
    merchant: "Sweet Shalquoir",
    merchantAreaId: "majula",
    item: "Silvercat Ring, Ring of Whispers",
    itemCategory: "ring",
    conditionType: "area",
    condition: "Majula",
    detail: "Silvercat 13,400 souls; Whispers 5,800 souls",
    progressIds: ["mj9"],
  },
  // Rosabeth (Shaded Woods)
  {
    id: "su-rosabeth-1",
    merchant: "Rosabeth",
    merchantAreaId: "shaded_woods",
    item: "Pyromancy Flame",
    itemCategory: "catalyst",
    conditionType: "unpetrify",
    condition: "Unpetrify with Fragrant Branch",
    detail: "Sells pyromancies. Upgrades with Fire Seeds.",
    buildRef: "catalyst:Pyromancy Flame",
  },
  // Licia (Heide's → Majula)
  {
    id: "su-licia-1",
    merchant: "Licia",
    merchantAreaId: "heides_tower",
    item: "Huntsman's Copse path",
    itemCategory: "other",
    conditionType: "spend_souls",
    condition: "Spend 2,000 souls",
    detail: "Rotunda in Heide's. Unlocks path to Huntsman's Copse.",
  },
  // Ornifex (Brightstone Cove)
  {
    id: "su-ornifex-1",
    merchant: "Ornifex",
    merchantAreaId: "brightstone_cove",
    item: "Boss soul trades",
    itemCategory: "other",
    conditionType: "unpetrify",
    condition: "Unpetrify with Fragrant Branch",
    detail: "In room past Prowling Magus. Trades boss souls.",
  },
  // Gavlan (No-Man's Wharf → Harvest Valley → Doors of Pharros)
  {
    id: "su-gavlan-1",
    merchant: "Gavlan",
    merchantAreaId: "no_mans_wharf",
    item: "Poison arrows, poison throwing knives",
    itemCategory: "other",
    conditionType: "area",
    condition: "No-Man's Wharf",
    detail: "Exhaust dialogue to move him. Wheel and deal!",
  },
  // Carhillion (No-Man's Wharf → Majula)
  {
    id: "su-carhillion-1",
    merchant: "Carhillion",
    merchantAreaId: "no_mans_wharf",
    item: "Sorcery shop",
    itemCategory: "spell",
    conditionType: "stat",
    condition: "10 INT to talk",
    detail: "Moves to Majula after dialogue.",
  },
];

export function getShopUnlocksForArea(areaId: AreaId): ShopUnlock[] {
  return SHOP_UNLOCKS.filter((u) => u.merchantAreaId === areaId);
}

export function getShopUnlocksByMerchant(merchant: string): ShopUnlock[] {
  return SHOP_UNLOCKS.filter(
    (u) => u.merchant.toLowerCase() === merchant.toLowerCase()
  );
}

export function getShopUnlocksForItem(itemName: string): ShopUnlock[] {
  const q = itemName.toLowerCase();
  return SHOP_UNLOCKS.filter(
    (u) =>
      u.item.toLowerCase().includes(q) ||
      (u.detail?.toLowerCase().includes(q) ?? false)
  );
}

export function getShopUnlocksByConditionType(
  type: UnlockConditionType
): ShopUnlock[] {
  return SHOP_UNLOCKS.filter((u) => u.conditionType === type);
}
