import { type Palette } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      // Backgrounds
      bgBase: string;
      bgPaper: string;
      bgElevated: string;
      bgSubtle: string;

      // Borders
      borderDefault: string;
      borderSubtle: string;
      borderFocus: string;

      // Amber tones (primary palette)
      amber300: string;
      amber400: string;
      amber500: string;
      amber700: string;
      amberMuted: string;
      amberGhost: string;

      // Text hints / feedback
      textHint: string;
      successMuted: string;
      errorMuted: string;
      warningMuted: string;
      infoMuted: string;

      // Semantic text roles
      textHeader: string;
      textSubHeader: string;
      textBody: string;
      textInfo: string;
      textWarning: string;
      textError: string;
      textSuccess: string;
    };
  }

  interface PaletteOptions {
    custom?: Palette["custom"];
  }
}

// DARK palette
export const DARK: Palette["custom"] = {
  // Backgrounds
  bgBase: "#0A0804",
  bgPaper: "#100D08",
  bgElevated: "#1A1408",
  bgSubtle: "#151009",

  // Borders
  borderDefault: "rgba(217,155,50,0.15)",
  borderSubtle: "rgba(255,255,255,0.07)",
  borderFocus: "rgba(217,155,50,0.6)",

  // Amber colors
  amber300: "#F5C842",
  amber400: "#E8AF4A",
  amber500: "#D99B32",
  amber700: "#B8741A",
  amberMuted: "rgba(217,155,50,0.15)",
  amberGhost: "rgba(217,155,50,0.06)",

  // Hints / feedback
  textHint: "rgba(217,155,50,0.5)",
  successMuted: "rgba(74,222,128,0.12)",
  errorMuted: "rgba(239,68,68,0.1)",
  warningMuted: "rgba(252,211,77,0.1)",
  infoMuted: "rgba(125,211,252,0.1)",

  // Semantic text
  textHeader: "#F0E6D0",
  textSubHeader: "rgba(240,230,208,0.55)",
  textBody: "#F0E6D0",
  textInfo: "#7DD3FC",
  textWarning: "#FCD34D",
  textError: "#EF4444",
  textSuccess: "#4ADE80",
};

// LIGHT palette
export const LIGHT: Palette["custom"] = {
  // Backgrounds
  bgBase: "#FAF8F3",
  bgPaper: "#FFFFFF",
  bgElevated: "#F5F1E8",
  bgSubtle: "#EFE8D9",

  // Borders
  borderDefault: "rgba(0,0,0,0.08)",
  borderSubtle: "rgba(0,0,0,0.05)",
  borderFocus: "#D99B32",

  // Amber colors
  amber300: "#F5C842",
  amber400: "#E8AF4A",
  amber500: "#D99B32",
  amber700: "#B8741A",
  amberMuted: "rgba(217,155,50,0.12)",
  amberGhost: "rgba(217,155,50,0.04)",

  // Hints / feedback
  textHint: "rgba(184,116,26,0.6)",
  successMuted: "rgba(22,163,74,0.12)",
  errorMuted: "rgba(220,38,38,0.12)",
  warningMuted: "rgba(217,119,6,0.12)",
  infoMuted: "rgba(2,132,199,0.12)",

  // Semantic text
  textHeader: "#1F1A12",
  textSubHeader: "rgba(31,26,18,0.6)",
  textBody: "#1F1A12",
  textInfo: "#0284C7",
  textWarning: "#D97706",
  textError: "#DC2626",
  textSuccess: "#16A34A",
};
