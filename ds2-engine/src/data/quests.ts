import type { AreaId } from "./areas";

export interface QuestStep {
  id: string;
  ref?: string;
  label: string;
  area: AreaId;
}

export interface QuestBoss {
  id: string;
  ref: string;
  label: string;
  area: AreaId;
}

export interface Quest {
  id: string;
  name: string;
  icon: string;
  color: string;
  achievement?: string;
  reward: string;
  note: string;
  steps: QuestStep[];
  bossSurvivalNeeded: number;
  bosses: QuestBoss[];
}

export const QUESTS: Record<string, Quest> = {
  lucatiel: {
    id: "lucatiel",
    name: "Lucatiel of Mirrah",
    icon: "⚔",
    color: "#5e9ecf",
    achievement: "Lucatiel (Achievement)",
    reward: "Lucatiel's Set + Mirrah Greatsword",
    note: "Must visit ALL 4 locations AND she must survive 3 boss fights. All in ONE playthrough.",
    steps: [
      { id: "lucatiel:1", ref: "nm4", label: "Talk at No-Man's Wharf (house LEFT of stairs)", area: "no_mans_wharf" },
      { id: "lucatiel:2", ref: "lb3", label: "Talk at Lost Bastille (tower from McDuff's)", area: "lost_bastille" },
      { id: "lucatiel:3", ref: "ep2", label: "Talk at Earthen Peak (DOWN to poison water, RIGHT)", area: "earthen_peak" },
      { id: "lucatiel:4", ref: "bg4", label: "Talk at Black Gulch (cliff drop near 3 poison statues)", area: "black_gulch" },
      { id: "lucatiel:5", ref: "ak5", label: "Talk at Aldia's Keep (ONLY after 3 boss survivals!)", area: "aldias_keep" },
    ],
    bossSurvivalNeeded: 3,
    bosses: [
      { id: "lucatiel_boss:flexile", ref: "nm7", label: "Flexile Sentry (No-Man's Wharf)", area: "no_mans_wharf" },
      { id: "lucatiel_boss:sinner", ref: "sr4", label: "Lost Sinner (Sinner's Rise)", area: "sinners_rise" },
      { id: "lucatiel_boss:smelter", ref: "ik7", label: "Smelter Demon (Iron Keep) — risky", area: "iron_keep" },
      { id: "lucatiel_boss:rotten", ref: "bg8", label: "The Rotten (Black Gulch) — easiest ★", area: "black_gulch" },
      { id: "lucatiel_boss:ivory_king", ref: "d311", label: "Burnt Ivory King (DLC3)", area: "dlc_ivory" },
    ],
  },
  benhart: {
    id: "benhart",
    name: "Benhart of Jugo",
    icon: "⚔",
    color: "#c89b3c",
    achievement: "Benhart of Jugo (Achievement)",
    reward: "Benhart's Set + Moonlight Greatsword (Achievement)",
    note: "Exhaust dialogue at every location. Must survive 3+ boss fights (do 4 to be safe).",
    steps: [
      { id: "benhart:1", ref: "mj2", label: "Talk in Majula (path to Shaded Woods)", area: "majula" },
      { id: "benhart:2", ref: "sw3", label: "Talk in Shaded Woods (near fork)", area: "shaded_woods" },
      { id: "benhart:3", ref: "dc9", label: "Talk in Drangleic Castle (after Twin Dragonriders)", area: "drangleic_castle" },
    ],
    bossSurvivalNeeded: 3,
    bosses: [
      { id: "benhart_boss:magus", ref: "bc5", label: "Prowling Magus (Tseldora) — easy ★", area: "brightstone_cove" },
      { id: "benhart_boss:giant_lord", ref: "mm6", label: "Giant Lord (Memory of Jeigh)", area: "memories" },
      { id: "benhart_boss:throne", ref: "tw2", label: "Throne Watcher & Defender (Endgame)", area: "throne_of_want" },
    ],
  },
  grandahl: {
    id: "grandahl",
    name: "Darkdiver Grandahl",
    icon: "◈",
    color: "#8b5cf6",
    achievement: "Abysmal Covenant",
    reward: "Pilgrims of Dark covenant → Dark Chasm → Darklurker → Hexes (Resonant Soul, Great Resonant Soul, Climax)",
    note: "Visit all 3 locations and talk to him. Then join covenant and complete Dark Chasms.",
    steps: [
      { id: "grandahl:1", ref: "bg7", label: "Black Gulch — cave on RIGHT ledge", area: "black_gulch" },
      { id: "grandahl:2", ref: "dp6", label: "Doors of Pharros — hidden cave", area: "doors_of_pharros" },
      { id: "grandahl:3", ref: "dc5", label: "Drangleic Castle — drop through fragile floor in Ruin Sentinel room", area: "drangleic_castle" },
    ],
    bossSurvivalNeeded: 0,
    bosses: [],
  },
  gavlan: {
    id: "gavlan",
    name: "Gavlan",
    icon: "⊙",
    color: "#65a30d",
    reward: "Permanent buy/sell vendor at Doors of Pharros",
    note: "Exhaust dialogue at each location to make him move to the next.",
    steps: [
      { id: "gavlan:1", ref: "nm0", label: "No-Man's Wharf — in a building", area: "no_mans_wharf" },
      { id: "gavlan:2", ref: "hv4", label: "Harvest Valley — poison building", area: "harvest_valley" },
      { id: "gavlan:3", ref: "dp5", label: "Doors of Pharros — final location (permanent)", area: "doors_of_pharros" },
    ],
    bossSurvivalNeeded: 0,
    bosses: [],
  },
  pate_creighton: {
    id: "pate_creighton",
    name: "Pate & Creighton",
    icon: "⚖",
    color: "#d97706",
    reward: "Winner's gear + Crushed Eye Orb (invade Licia)",
    note: "Meet both NPCs, progress their encounters, choose a side in Tseldora.",
    steps: [
      { id: "pate_creighton:1", label: "Talk to Pate in FoFG (before gate trap), go through trap, talk again", area: "forest_of_fallen_giants" },
      { id: "pate_creighton:2", ref: "hc4", label: "Free Creighton in Huntsman's Copse → Fist Pump gesture", area: "huntsmans_copse" },
      { id: "pate_creighton:3", ref: "ep6", label: "Talk to Pate in Earthen Peak", area: "earthen_peak" },
      { id: "pate_creighton:4", ref: "bc7", label: "Tseldora: Pate & Creighton fighting — help one kill the other", area: "brightstone_cove" },
    ],
    bossSurvivalNeeded: 0,
    bosses: [],
  },
};
