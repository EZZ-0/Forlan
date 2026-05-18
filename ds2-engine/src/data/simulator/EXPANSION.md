# Simulator Data Expansion Guide

The simulator is structured for full data expansion. Add new items, infusions, and formulas without changing core logic.

## Extending Data

### Weapons
- Add entries to `items/weapons.ts` — `SIMULATOR_WEAPONS`
- Each weapon: `maxUpgrade` (10 Titanite, 5 Twinkling/PDB), `infusions[]` for variant damage/scaling
- Per-level damage tables: extend `formulas/damage.ts` `getUpgradeMultiplier()` or add `UPGRADE_TABLE[weaponId][level]`

### Infusions
- Add to `INFUSION_TYPES` in `constants.ts`
- Add `InfusionVariant` entries to weapon `infusions` arrays
- Extend `computeWeaponAR()` in `formulas/damage.ts` for infusion-specific logic

### Armor, Rings, Catalysts
- Add to `items/armor.ts`, `items/rings.ts`, `items/catalysts.ts`
- Map in `progressToItemMap.ts` for progress-linked availability

### Leveling
- **Build mode**: Edit `LEVELS` in `data/build.ts` — add phases, change targets
- **Free mode**: Stats 0–99, SL up to 838; no code changes needed

### Upgrade Materials
- `UpgradeMaterial` in `types.ts`: Titanite, Twinkling, Petrified Dragon Bone, Bone
- Per-material max: Titanite 10, Twinkling/PDB 5 — extend `getUpgradeMultiplier` if needed
