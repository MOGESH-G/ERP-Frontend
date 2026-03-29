import { Navigate, Route, Routes } from "react-router-dom";
import PublicRoutes from "./routes/publicRoutes";
import PrivateRoutes from "./routes/privateRoutes";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material";
import type { RootState } from "./store";

declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      bgBase: string;
      bgElevated: string;
      bgSubtle: string;
      amberMuted: string;
      amberGhost: string;
      borderDefault: string;
      borderSubtle: string;
      borderFocus: string;
      textHint: string;
      successMuted: string;
      errorMuted: string;
      warningMuted: string;
      infoMuted: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      bgBase: string;
      bgElevated: string;
      bgSubtle: string;
      amberMuted: string;
      amberGhost: string;
      borderDefault: string;
      borderSubtle: string;
      borderFocus: string;
      textHint: string;
      successMuted: string;
      errorMuted: string;
      warningMuted: string;
      infoMuted: string;
    };
  }
}

const DARK = {
  bgBase: "#0A0804",
  bgPaper: "#100D08",
  bgElevated: "#1A1408",
  bgSubtle: "#151009",

  amber500: "#D99B32",
  amber400: "#E8AF4A",
  amber700: "#B8741A",
  amber300: "#F5C842",

  amberMuted: "rgba(217,155,50,0.15)",
  amberGhost: "rgba(217,155,50,0.06)",

  textPrimary: "#F0E6D0",
  textSecondary: "rgba(240,230,208,0.55)",
  textDisabled: "rgba(240,230,208,0.25)",
  textHint: "rgba(217,155,50,0.5)",

  borderDefault: "rgba(217,155,50,0.15)",
  borderSubtle: "rgba(255,255,255,0.07)",
  borderFocus: "rgba(217,155,50,0.6)",

  success: "#4ADE80",
  successMuted: "rgba(74,222,128,0.12)",
  error: "#EF4444",
  errorMuted: "rgba(239,68,68,0.1)",
  warning: "#FCD34D",
  warningMuted: "rgba(252,211,77,0.1)",
  info: "#7DD3FC",
  infoMuted: "rgba(125,211,252,0.1)",
};

const LIGHT = {
  bgBase: "#FAF8F3",
  bgPaper: "#FFFFFF",
  bgElevated: "#F5F1E8",
  bgSubtle: "#EFE8D9",

  amber500: "#D99B32",
  amber400: "#E8AF4A",
  amber700: "#B8741A",
  amber300: "#F5C842",

  amberMuted: "rgba(217,155,50,0.12)",
  amberGhost: "rgba(217,155,50,0.04)",

  textPrimary: "#1F1A12",
  textSecondary: "rgba(31,26,18,0.6)",
  textDisabled: "rgba(31,26,18,0.35)",
  textHint: "rgba(184,116,26,0.6)",

  borderDefault: "rgba(0,0,0,0.08)",
  borderSubtle: "rgba(0,0,0,0.05)",
  borderFocus: "#D99B32",

  success: "#16A34A",
  successMuted: "rgba(22,163,74,0.12)",
  error: "#DC2626",
  errorMuted: "rgba(220,38,38,0.12)",
  warning: "#D97706",
  warningMuted: "rgba(217,119,6,0.12)",
  info: "#0284C7",
  infoMuted: "rgba(2,132,199,0.12)",
};

const createAppTheme = (mode: "light" | "dark") => {
  const RAW = mode === "dark" ? DARK : LIGHT;

  return createTheme({
    palette: {
      mode,

      primary: {
        main: RAW.amber500,
        light: RAW.amber400,
        dark: RAW.amber700,
        contrastText: RAW.bgBase,
      },

      secondary: {
        main: RAW.amber300,
      },

      background: {
        default: RAW.bgBase,
        paper: RAW.bgPaper,
      },

      text: {
        primary: RAW.textPrimary,
        secondary: RAW.textSecondary,
        disabled: RAW.textDisabled,
      },

      success: { main: RAW.success },
      error: { main: RAW.error },
      warning: { main: RAW.warning },
      info: { main: RAW.info },

      divider: RAW.borderDefault,

      custom: {
        bgBase: RAW.bgBase,
        bgElevated: RAW.bgElevated,
        bgSubtle: RAW.bgSubtle,
        amberMuted: RAW.amberMuted,
        amberGhost: RAW.amberGhost,
        borderDefault: RAW.borderDefault,
        borderSubtle: RAW.borderSubtle,
        borderFocus: RAW.borderFocus,
        textHint: RAW.textHint,
        successMuted: RAW.successMuted,
        errorMuted: RAW.errorMuted,
        warningMuted: RAW.warningMuted,
        infoMuted: RAW.infoMuted,
      },
    },

    typography: {
      fontFamily: "'Fraunces','Segoe UI',system-ui,sans-serif",
      button: {
        textTransform: "none",
        fontWeight: 600,
      },
    },

    shape: {
      borderRadius: 8,
    },
  });
};

const App = () => {
  const mode = useSelector((state: RootState) => state.theme.mode);

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/auth/*" element={<PublicRoutes />} />
        <Route path="/app/*" element={<PrivateRoutes />} />
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
