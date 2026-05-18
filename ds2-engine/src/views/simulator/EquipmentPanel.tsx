import { useState, useRef, useEffect } from "react";
import { colors, typography, spacing, shadows } from "../../theme";
import { SLOT_CONFIG, WEAPON_SLOTS } from "../../data/simulator/slots";
import { INFUSION_TYPES } from "../../data/simulator/constants";
import type { SlotId, SimulatorItem, SimulatorWeapon, InfusionType } from "../../data/simulator/types";

export function EquipmentPanel({
  equipped,
  weaponUpgrade,
  weaponInfusion,
  getAvailableItems,
  getItemById,
  onEquip,
  onWeaponUpgrade,
  onWeaponInfusion,
}: {
  equipped: Partial<Record<SlotId, string>>;
  weaponUpgrade: Partial<Record<SlotId, number>>;
  weaponInfusion: Partial<Record<SlotId, InfusionType | null>>;
  getAvailableItems: (slotId: SlotId) => SimulatorItem[];
  getItemById: (id: string) => SimulatorItem | undefined;
  onEquip: (slotId: SlotId, itemId: string | null) => void;
  onWeaponUpgrade: (slotId: SlotId, level: number) => void;
  onWeaponInfusion: (slotId: SlotId, infusion: InfusionType | null) => void;
}) {
  const [openSlot, setOpenSlot] = useState<SlotId | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenSlot(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const slotLayout: { row: number; col: number; slot: SlotId }[] = [
    { row: 0, col: 0, slot: "r1" },
    { row: 1, col: 0, slot: "r2" },
    { row: 0, col: 1, slot: "l1" },
    { row: 1, col: 1, slot: "l2" },
    { row: 0, col: 2, slot: "helm" },
    { row: 1, col: 2, slot: "chest" },
    { row: 2, col: 2, slot: "gloves" },
    { row: 3, col: 2, slot: "legs" },
    { row: 4, col: 0, slot: "ring1" },
    { row: 4, col: 1, slot: "ring2" },
    { row: 4, col: 2, slot: "ring3" },
    { row: 4, col: 3, slot: "ring4" },
  ];

  return (
    <div
      style={{
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        borderRadius: 16,
        padding: spacing[4],
      }}
    >
      <div
        style={{
          fontFamily: typography.fontHeading,
          fontSize: typography.size.lg,
          color: colors.gold,
          marginBottom: spacing[4],
        }}
      >
        EQUIPMENT
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gridTemplateRows: "auto auto auto auto auto",
          gap: spacing[2],
          alignItems: "center",
        }}
      >
        {slotLayout.map(({ row, col, slot }) => {
          const itemId = equipped[slot];
          const item = itemId ? getItemById(itemId) : undefined;
          const config = SLOT_CONFIG[slot];
          const isOpen = openSlot === slot;
          const available = getAvailableItems(slot);

          return (
            <div
              key={slot}
              ref={slot === openSlot ? dropdownRef : undefined}
              style={{
                gridRow: row + 1,
                gridColumn: col + 1,
                position: "relative",
              }}
            >
              <button
                type="button"
                onClick={() => setOpenSlot(isOpen ? null : slot)}
                style={{
                  width: "100%",
                  minHeight: 44,
                  padding: spacing[2],
                  background: colors.bg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 8,
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: typography.size.sm,
                  color: item ? colors.lightText : colors.dimText,
                  fontFamily: typography.fontBody,
                }}
              >
                <div style={{ fontWeight: typography.weight.medium, color: colors.dimText, fontSize: typography.size.xs }}>
                  {config.label}
                </div>
                <div style={{ marginTop: 2 }}>
                  {item
                    ? (() => {
                        const upg = weaponUpgrade[slot] ?? (item.type === "weapon" ? 0 : 0);
                        const inf = weaponInfusion[slot];
                        const suffix = item.type === "weapon" ? ` +${upg}${inf ? ` ${inf}` : ""}` : "";
                        return `${item.name}${suffix} (${item.weight})`;
                      })()
                    : "—"}
                </div>
              </button>

              {item?.type === "weapon" && WEAPON_SLOTS.includes(slot) && (
                <div style={{ display: "flex", gap: 4, marginTop: 4, flexWrap: "wrap" }}>
                  <select
                    value={weaponUpgrade[slot] ?? 0}
                    onChange={(e) => onWeaponUpgrade(slot, parseInt(e.target.value, 10))}
                    style={{
                      padding: "2px 6px",
                      fontSize: typography.size.xs,
                      background: colors.bg,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 6,
                      color: colors.lightText,
                    }}
                  >
                    {Array.from({ length: (item as SimulatorWeapon).maxUpgrade + 1 }, (_, i) => (
                      <option key={i} value={i}>+{i}</option>
                    ))}
                  </select>
                  <select
                    value={weaponInfusion[slot] ?? ""}
                    onChange={(e) => onWeaponInfusion(slot, e.target.value ? (e.target.value as InfusionType) : null)}
                    style={{
                      padding: "2px 6px",
                      fontSize: typography.size.xs,
                      background: colors.bg,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 6,
                      color: colors.lightText,
                    }}
                  >
                    <option value="">None</option>
                    {INFUSION_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              )}

              {isOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    marginTop: 4,
                    maxHeight: 200,
                    overflowY: "auto",
                    background: colors.bgCard,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    boxShadow: shadows.modal,
                    zIndex: 100,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      onEquip(slot, null);
                      setOpenSlot(null);
                    }}
                    style={{
                      width: "100%",
                      padding: spacing[2],
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontSize: typography.size.sm,
                      color: colors.dimText,
                      textAlign: "left",
                    }}
                  >
                    — Empty
                  </button>
                  {available.map((i) => (
                    <button
                      key={i.id}
                      type="button"
                      onClick={() => {
                        onEquip(slot, i.id);
                        setOpenSlot(null);
                      }}
                      style={{
                        width: "100%",
                        padding: spacing[2],
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        fontSize: typography.size.sm,
                        color: colors.lightText,
                        textAlign: "left",
                        borderTop: `1px solid ${colors.border}`,
                      }}
                    >
                      {i.name} ({i.weight})
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
