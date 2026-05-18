/**
 * DS2 Engine — Design tokens
 * Souls-inspired dark fantasy theme
 */

export const colors = {
  // Base
  bg: "#0c0b0a",
  bgCard: "#1a1714",
  border: "#2a2420",
  borderMuted: "#3a342a",

  // Surfaces
  surface: "#0c0b0a",
  surfaceRaised: "#1a1714",
  surfaceOverlay: "rgba(0,0,0,0.8)",

  // Accent
  gold: "#c8a030",
  goldMuted: "rgba(200,160,48,0.2)",
  goldHighlight: "#d4b040",
  ember: "#d4652a",

  // Text
  lightText: "#e8dcc8",
  dimText: "#8a7e6d",
  muted: "#6a6154",

  // Semantic
  warnRed: "#c44040",
  successGreen: "#6b9e3a",
  accent: "#c8a030",
} as const;

export const typography = {
  fontHeading: "'Cinzel', 'Palatino', Georgia, serif",
  fontBody: "'EB Garamond', Georgia, serif",

  size: {
    xs: "9px",
    sm: "10px",
    base: "12px",
    md: "13px",
    lg: "14px",
    xl: "16px",
    "2xl": "18px",
    "3xl": "20px",
  },

  weight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  letterSpacing: {
    tight: "0.5px",
    normal: "1px",
    wide: "1.5px",
    wider: "2px",
  },
} as const;

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 9999,
} as const;

export const shadows = {
  card: "0 2px 8px rgba(0,0,0,0.3)",
  cardHover: "0 4px 12px rgba(0,0,0,0.4)",
  modal: "0 8px 32px rgba(0,0,0,0.5)",
  glow: "0 0 12px rgba(200,160,48,0.15)",
} as const;

export const transition = {
  fast: "0.15s ease",
  normal: "0.2s ease",
  slow: "0.4s ease",
} as const;

export const theme = {
  colors,
  typography,
  spacing,
  radii,
  shadows,
  transition,
} as const;

export default theme;
