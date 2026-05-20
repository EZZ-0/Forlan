# plasticmacaroni / community sheet → engine progressId map

**Status:** Implemented (Wave 6C). Parser: `src/import/parsePlasticmacaroni.ts`, aliases: `plasticmacaroniMap.ts`.

## Area slug mapping

| Sheet section | Engine `AreaId` |
|---------------|-----------------|
| Things Betwixt | `things_betwixt` |
| Majula | `majula` |
| Forest of Fallen Giants | `forest_of_fallen_giants` |
| Heide's Tower of Flame | `heides_tower` |
| No-Man's Wharf | `no_mans_wharf` |
| Lost Bastille | `lost_bastille` |
| … | See `AREA_ORDER` in `areas.ts` |

## Column → progressId

Map each checkbox column label to an engine `progressId` (e.g. `fg17` = Last Giant).

Unmapped columns are reported in `SheetImportResult.unmappedColumns`.

## Engine export schema

See `PROGRESS_EXPORT_VERSION` in `src/import/types.ts`.
