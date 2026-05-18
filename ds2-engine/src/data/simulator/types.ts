/**
 * DS2 Build Simulator — Shared interfaces and slot IDs.
 * Schema for equipment, character state, and computed stats.
 */

// --- Source Attribution ---

export interface SourceAttribution {
  field: string;
  value: unknown;
  from: string;
  url?: string;
  checked?: string;
  resolved?: "fextralife" | "wikidot" | "manual";
}

// --- Slot IDs ---

export type SlotId =
  | "r1"
  | "r2"
  | "l1"
  | "l2"
  | "helm"
  | "chest"
  | "gloves"
  | "legs"
  | "ring1"
  | "ring2"
  | "ring3"
  | "ring4";

export const ALL_SLOT_IDS: SlotId[] = [
  "r1",
  "r2",
  "l1",
  "l2",
  "helm",
  "chest",
  "gloves",
  "legs",
  "ring1",
  "ring2",
  "ring3",
  "ring4",
];

// --- Base Item ---

export interface SimulatorItemBase {
  id: string;
  name: string;
  weight: number;
  sources?: SourceAttribution[];
}

// --- Infusion Variant (per-weapon infusion data) ---

export type InfusionType = "Fire" | "Magic" | "Lightning" | "Dark" | "Raw" | "Poison" | "Bleed" | "Enchanted";

export interface InfusionVariant {
  infusion: InfusionType;
  damage?: Partial<Record<"physical" | "magic" | "fire" | "lightning" | "dark", number>>;
  scaling?: Partial<Record<"str" | "dex" | "int" | "fth", string>>;
}

// --- Weapon ---

export type DamageType = "Strike" | "Slash" | "Thrust" | "Slash/Thrust";

export type UpgradeMaterial = "Titanite" | "Twinkling" | "Petrified Dragon Bone" | "Bone";

export interface SimulatorWeapon extends SimulatorItemBase {
  type: "weapon";
  weaponClass: string;
  damageType: DamageType;
  damage: Partial<Record<"physical" | "magic" | "fire" | "lightning" | "dark", number>>;
  scaling: Partial<Record<"str" | "dex" | "int" | "fth", string>>;
  requirements: Partial<Record<"str" | "dex" | "int" | "fth", number>>;
  durability?: number;
  counterStrength?: number;
  upgradeMaterial: UpgradeMaterial;
  maxUpgrade: number;
  infusions?: InfusionVariant[];
  specialEffect?: string;
  sotfs?: boolean;
}

// --- Armor ---

export type ArmorSlot = "helm" | "chest" | "gloves" | "legs";

export interface SimulatorArmor extends SimulatorItemBase {
  type: "armor";
  slot: ArmorSlot;
  resistances: Partial<Record<"physical" | "magic" | "fire" | "lightning" | "dark", number>>;
  poise?: number;
}

// --- Ring ---

export interface SimulatorRing extends SimulatorItemBase {
  type: "ring";
  effects: Record<string, number | string>;
}

// --- Shield ---

export interface SimulatorShield extends SimulatorItemBase {
  type: "shield";
  stability: number;
  damageReduction: {
    physical: number;
    magic?: number;
    fire?: number;
    lightning?: number;
    dark?: number;
  };
  requirements?: { str?: number };
}

// --- Catalyst ---

export type CatalystClass = "staff" | "chime" | "pyromancy" | "hex_chime";

export interface SimulatorCatalyst extends SimulatorItemBase {
  type: "catalyst";
  catalystClass: CatalystClass;
  spellDamage?: string;
  scaling: Partial<Record<"int" | "fth", string>>;
}

// --- Spell ---

export type SpellSchool = "sorcery" | "miracle" | "pyromancy" | "hex";

export interface SimulatorSpell extends SimulatorItemBase {
  type: "spell";
  school: SpellSchool;
  slots: number;
  uses: number;
  intReq?: number;
  fthReq?: number;
  effect?: string;
}

// --- Union ---

export type SimulatorItem =
  | SimulatorWeapon
  | SimulatorArmor
  | SimulatorRing
  | SimulatorShield
  | SimulatorCatalyst
  | SimulatorSpell;

// --- Character State ---

export type StatKey = "VGR" | "END" | "VIT" | "ATN" | "STR" | "DEX" | "ADP" | "INT" | "FTH";

/** "build" = use LEVELS from build roadmap (150 levels). "free" = manual +/- stats, no cap. */
export type LevelMode = "build" | "free";

export interface SimulatorState {
  sl: number;
  stats: Record<StatKey, number>;
  equipped: Partial<Record<SlotId, string>>;
  /** Upgrade level per weapon slot (0–10 Titanite, 0–5 Twinkling/PDB). Extensible. */
  weaponUpgrade: Partial<Record<SlotId, number>>;
  /** Infusion per weapon slot. null = uninfused. Extensible. */
  weaponInfusion: Partial<Record<SlotId, InfusionType | null>>;
  spellSlots: string[];
  sandboxMode: boolean;
  levelMode: LevelMode;
}

// --- Computed Stats ---

export type RollType = "fast" | "mid" | "fat";

export interface WeaponAR {
  physical: number;
  magic?: number;
  fire?: number;
  lightning?: number;
  dark?: number;
}

export interface ComputedStats {
  hp: number;
  stamina: number;
  equipLoad: number;
  equipLoadPct: number;
  rollType: RollType;
  agility: number;
  agilityInvestment: number;
  rollIframes: number;
  backstepIframes: number;
  itemUseSpeed: number;
  poise: number;
  resistances: {
    physical: number;
    magic: number;
    fire: number;
    lightning: number;
    dark: number;
  };
  weaponAR: Partial<Record<SlotId, WeaponAR | null>>;
  spellDamage?: number;
}
