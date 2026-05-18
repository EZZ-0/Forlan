// [name, source, location, linked_item_id_or_null]
// 4 default gestures have no ref (always complete)
// 2 special (Truce, Desperate) have null ref

export interface Gesture {
  name: string;
  source: string;
  location: string;
  ref: string | null;
}

export const GESTURES: Gesture[] = [
  { name: "Point", source: "Default", location: "Start", ref: null },
  { name: "Pump Up", source: "Default", location: "Start", ref: null },
  { name: "Wave", source: "Default", location: "Start", ref: null },
  { name: "No Way", source: "Default", location: "Start", ref: null },
  { name: "Welcome", source: "Saulden", location: "Majula", ref: "mj5" },
  { name: "Joy", source: "Rosabeth", location: "Shaded Woods (after unpetrifying, give clothes)", ref: "sw2" },
  { name: "Duel Bow", source: "Blue Sentinel Targray", location: "Cathedral of Blue (join Blue Sentinels)", ref: "ht8" },
  { name: "Mock", source: "Straid of Olaphis", location: "Lost Bastille (unpetrify, exhaust dialogue)", ref: "lb5" },
  { name: "Fist Pump", source: "Creighton", location: "Huntsman's Copse (free from cell)", ref: "hc4" },
  { name: "Praise the Sun", source: "Sun altar", location: "Harvest Valley (kneel at altar)", ref: "hv5" },
  { name: "Prostration", source: "Laddersmith Gilligan", location: "Earthen Peak (pay 2,000 souls)", ref: "ep3" },
  { name: "Decapitate", source: "Head of Vengarl", location: "Shaded Woods foggy area (left wall)", ref: "sw5" },
  { name: "Warmup", source: "Manscorpion Tark", location: "Shaded Woods (equip Ring of Whispers)", ref: "sw6" },
  { name: "This One's Me", source: "Chancellor Wellager", location: "Drangleic Castle entrance", ref: "dc4" },
  { name: "Have Mercy!", source: "Grave Warden Agdayne", location: "Undead Crypt (NO TORCH!)", ref: "uc3" },
  { name: "Hurrah!", source: "Captain Drummond", location: "Memory of Vammar", ref: "mm2" },
  { name: "War Cry", source: "Vengarl's Head", location: "Return after killing Vengarl's Body", ref: "bc11" },
  { name: "Righty-ho!", source: "Mild-Mannered Pate", location: "After completing trap events", ref: "ep6" },
  { name: "Truce", source: "Cromwell the Pardoner", location: "Brightstone Cove Tseldora", ref: null },
  { name: "Desperate", source: "Various", location: "Die repeatedly while hollow / exhaust NPCs", ref: null },
];
